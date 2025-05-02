"""
Handles embedding generation and uploading to Pinecone.
"""
import logging
from typing import List, Dict, Any, Optional
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from pinecone import Pinecone, Index
# Import the specific exception class if available, otherwise catch broader PineconeError
# from pinecone.exceptions import ApiException # Try this if direct import fails
# If the above fails, we might need to catch a more general Pinecone exception
from ..config import settings # Assuming config holds API keys, env, index name
import time

logger = logging.getLogger(__name__)

# Global variables to hold initialized clients
embedding_model = None
pinecone_index = None
pinecone_client: Optional[Pinecone] = None # Add type hint

def initialize_vectorization():
    """Initializes embedding model and Pinecone connection based on config."""
    global embedding_model, pinecone_index, pinecone_client
    try:
        if settings.GOOGLE_API_KEY is None:
            raise ValueError("Google API Key not configured in settings.")

        embedding_model = GoogleGenerativeAIEmbeddings(
            model=settings.EMBEDDING_MODEL_NAME, # e.g., "models/embedding-001"
            google_api_key=settings.GOOGLE_API_KEY
        )
        logger.info(f"Initialized embedding model: {settings.EMBEDDING_MODEL_NAME}")

        if not all([settings.PINECONE_API_KEY, settings.PINECONE_ENVIRONMENT, settings.PINECONE_INDEX_NAME]):
            raise ValueError("Pinecone API Key, Environment, or Index Name not configured in settings.")

        pinecone_client = Pinecone(
            api_key=settings.PINECONE_API_KEY,
            # environment=settings.PINECONE_ENVIRONMENT # Environment might be deprecated for init
        )
        logger.info(f"Initialized Pinecone client.")

        # Check if index exists using the modern Pinecone client approach
        index_exists = False
        try:
            index_list = pinecone_client.list_indexes()
            # Iterate through the IndexDescription objects in the list
            for index_description in index_list: # index_list is often IndexList containing .indexes
                 # Handle potential variations: index_description might be the list itself in older versions
                 current_name = getattr(index_description, 'name', None)
                 if current_name == settings.PINECONE_INDEX_NAME:
                     index_exists = True
                     break
            # Fallback check if index_list was maybe just a list of names directly
            if not index_exists and isinstance(index_list, list) and settings.PINECONE_INDEX_NAME in index_list:
                 index_exists = True

        except Exception as e:
            logger.error(f"Error checking Pinecone index list: {e}", exc_info=True)
            raise ValueError(f"Could not verify existence of Pinecone index '{settings.PINECONE_INDEX_NAME}'.")

        if not index_exists:
             logger.error(f"Pinecone index '{settings.PINECONE_INDEX_NAME}' does not exist. Please create it first.")
             # You might want to log the actual list received for debugging:
             # logger.debug(f"Received index list structure: {index_list}")
             raise ValueError(f"Pinecone index '{settings.PINECONE_INDEX_NAME}' not found.")

        pinecone_index = pinecone_client.Index(settings.PINECONE_INDEX_NAME)
        logger.info(f"Connected to Pinecone index: {settings.PINECONE_INDEX_NAME}")

        # Optional: Check index stats
        stats = pinecone_index.describe_index_stats()
        logger.info(f"Pinecone index stats: {stats}")

    except ImportError as e:
        logger.error(f"Failed to import required libraries. Ensure 'langchain-google-genai' and 'pinecone' are installed: {e}")
        raise
    except ValueError as e:
        logger.error(f"Configuration error: {e}")
        raise
    # Catch a potentially broader Pinecone exception first
    except Exception as e:
        # Check if it's likely a Pinecone API error based on its type name or message
        # This is a less precise way if direct import fails
        if 'pinecone' in str(type(e)).lower() or 'pinecone' in str(e).lower():
            logger.error(f"Pinecone API error during initialization: {e}", exc_info=True)
        else:
            logger.error(f"Unexpected error during vectorization initialization: {e}", exc_info=True)
        raise

def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """Generates embeddings for a list of texts."""
    if embedding_model is None:
        logger.error("Embedding model not initialized. Call initialize_vectorization() first.")
        raise RuntimeError("Embedding model not initialized.")
    if not texts:
        logger.warning("generate_embeddings called with empty list of texts.")
        return []

    try:
        logger.info(f"Generating embeddings for {len(texts)} text chunks...")
        # The embed_documents method handles batching internally if the provider supports it.
        embeddings = embedding_model.embed_documents(texts)
        logger.info(f"Successfully generated {len(embeddings)} embeddings.")
        return embeddings
    except Exception as e:
        logger.error(f"Error generating embeddings: {e}", exc_info=True)
        raise

def upload_to_pinecone(
    vectors: List[Dict[str, Any]], # Expects list of {'id': str, 'values': List[float], 'metadata': Dict}
    namespace: Optional[str] = None,
    batch_size: int = 100 # Pinecone recommended batch size
) -> Dict[str, Any]:
    """Uploads vectors to Pinecone index in batches."""
    if pinecone_index is None:
        logger.error("Pinecone index not initialized. Call initialize_vectorization() first.")
        raise RuntimeError("Pinecone index not initialized.")
    if not vectors:
        logger.warning("upload_to_pinecone called with empty list of vectors.")
        return {"upserted_count": 0}

    upserted_count = 0
    total_vectors = len(vectors)
    start_time = time.time()
    logger.info(f"Starting upload of {total_vectors} vectors to Pinecone index '{settings.PINECONE_INDEX_NAME}'" + (f" in namespace '{namespace}'." if namespace else "."))

    try:
        for i in range(0, total_vectors, batch_size):
            batch = vectors[i : i + batch_size]
            logger.debug(f"Uploading batch {i // batch_size + 1}/{(total_vectors + batch_size - 1) // batch_size} (size {len(batch)}) to namespace '{namespace or 'default'}'")
            try:
                upsert_response = pinecone_index.upsert(
                    vectors=batch,
                    namespace=namespace
                )
                batch_upserted = upsert_response.get('upserted_count', 0)
                upserted_count += batch_upserted
                logger.debug(f"Batch upsert response: {upsert_response}")
            except Exception as e:
                # Check if it's likely a Pinecone API error
                if 'pinecone' in str(type(e)).lower() or 'pinecone' in str(e).lower():
                    logger.error(f"Pinecone API error during batch upsert (batch starting index {i}): {e}", exc_info=True)
                    # Decide if you want to continue or raise
                    continue # Log and continue for now
                else:
                    logger.error(f"Unexpected error during batch upsert (batch starting index {i}): {e}", exc_info=True)
                    raise # Reraise other unexpected errors

        end_time = time.time()
        logger.info(f"Finished uploading vectors. Total upserted: {upserted_count}/{total_vectors}. Time taken: {end_time - start_time:.2f} seconds.")
        if upserted_count < total_vectors:
            logger.warning(f"Only {upserted_count} out of {total_vectors} vectors were successfully upserted due to errors.")

        return {"upserted_count": upserted_count, "total_vectors": total_vectors}

    except Exception as e:
        if 'pinecone' in str(type(e)).lower() or 'pinecone' in str(e).lower():
            logger.error(f"Pinecone error during upload process: {e}", exc_info=True)
        else:
            logger.error(f"Unexpected error uploading vectors to Pinecone: {e}", exc_info=True)
        raise 