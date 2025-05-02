"""
Core orchestration logic for the data ingestion pipeline.
"""
import logging
import time
import uuid
import os
from typing import Dict, Any, Optional

from .parsers import load_pdf, load_txt, scrape_web
from .chunkers import chunk_text
from .vectorization import generate_embeddings, upload_to_pinecone, initialize_vectorization
from ..config import settings # Assuming config holds chunk_size, chunk_overlap etc.

logger = logging.getLogger(__name__)

# Ensure vectorization components are initialized (ideally call this at app startup)
# For simplicity here, we might call it on first ingest if not already done,
# but a dedicated app initialization is better practice.
_vectorization_initialized = False
def ensure_vectorization_initialized():
    global _vectorization_initialized
    if not _vectorization_initialized:
        logger.info("Initializing vectorization components for ingestion...")
        initialize_vectorization() # Assumes it uses settings from config
        _vectorization_initialized = True

def ingest_data(
    source: str, # File path or URL
    source_type: str, # 'pdf', 'txt', 'web'
    document_id: Optional[str] = None,
    extra_metadata: Optional[Dict[str, Any]] = None,
    namespace: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Processes a data source, chunks it, generates embeddings, and uploads to Pinecone.

    Args:
        source: The file path or URL of the data source.
        source_type: The type of the source ('pdf', 'txt', 'web'). Case-insensitive.
        document_id: Optional explicit document ID. If None, generated from source path/URL.
        extra_metadata: Optional dictionary of additional metadata to attach to all chunks from this source.
        namespace: Optional Pinecone namespace to upsert into.

    Returns:
        A dictionary containing statistics about the ingestion process (e.g., chunks processed, vectors uploaded).
    """
    ensure_vectorization_initialized() # Ensure Pinecone/Embeddings are ready

    start_time = time.time()
    logger.info(f"Starting ingestion for {source_type}: {source}")
    source_type = source_type.lower()
    processed_text = None
    base_doc_id = document_id

    # 1. Load Data based on source_type
    try:
        if source_type == 'pdf':
            processed_text = load_pdf(source)
            if base_doc_id is None: base_doc_id = os.path.basename(source)
        elif source_type == 'txt':
            processed_text = load_txt(source)
            if base_doc_id is None: base_doc_id = os.path.basename(source)
        elif source_type == 'web':
            processed_text = scrape_web(source)
            if base_doc_id is None: base_doc_id = source # Use URL as doc ID if not provided
        else:
            raise ValueError(f"Unsupported source_type: {source_type}. Must be 'pdf', 'txt', or 'web'.")

        if not processed_text:
             logger.warning(f"No text content extracted from {source}. Skipping further processing.")
             return {"status": "warning", "message": "No text content extracted", "chunks_processed": 0, "vectors_uploaded": 0}

    except FileNotFoundError as e:
        logger.error(f"Ingestion failed: Source file not found - {e}")
        return {"status": "error", "message": f"Source file not found: {e}"}
    except Exception as e:
        logger.error(f"Ingestion failed during data loading: {e}", exc_info=True)
        return {"status": "error", "message": f"Data loading failed: {e}"}

    # 2. Chunk Text
    try:
        # Use chunk settings from config
        text_chunks = chunk_text(
            processed_text,
            chunk_size=settings.INGESTION_CHUNK_SIZE,
            chunk_overlap=settings.INGESTION_CHUNK_OVERLAP
        )
        if not text_chunks:
            logger.warning(f"Text content from {source} resulted in zero chunks after splitting. Check content and chunking parameters.")
            return {"status": "warning", "message": "No chunks generated", "chunks_processed": 0, "vectors_uploaded": 0}
        logger.info(f"Split content into {len(text_chunks)} chunks.")
    except Exception as e:
        logger.error(f"Ingestion failed during text chunking: {e}", exc_info=True)
        return {"status": "error", "message": f"Text chunking failed: {e}"}

    # 3. Generate Embeddings
    try:
        embeddings = generate_embeddings(text_chunks)
        if len(embeddings) != len(text_chunks):
            # This shouldn't happen with current implementation but good sanity check
            raise RuntimeError(f"Mismatch between number of chunks ({len(text_chunks)}) and generated embeddings ({len(embeddings)}).")
    except Exception as e:
        logger.error(f"Ingestion failed during embedding generation: {e}", exc_info=True)
        return {"status": "error", "message": f"Embedding generation failed: {e}"}

    # 4. Prepare Vectors for Pinecone
    vectors_to_upload = []
    current_timestamp = time.time()
    for i, (chunk, embedding) in enumerate(zip(text_chunks, embeddings)):
        chunk_id = f"{base_doc_id}_chunk_{i}" # Simple unique ID for the chunk
        metadata = {
            "source_type": source_type,
            "document_id": base_doc_id,
            "chunk_seq_id": i,
            "text": chunk, # Include text in metadata for potential future use
            "timestamp": current_timestamp,
        }
        if source_type == 'web':
            metadata['url'] = source # Add URL specifically for web sources

        # Add any extra metadata provided
        if extra_metadata:
            metadata.update(extra_metadata)

        vectors_to_upload.append({
            "id": chunk_id,
            "values": embedding,
            "metadata": metadata
        })

    # 5. Upload to Pinecone
    try:
        upload_result = upload_to_pinecone(
            vectors=vectors_to_upload,
            namespace=namespace # Pass namespace if provided
        )
        uploaded_count = upload_result.get("upserted_count", 0)
        logger.info(f"Upload attempt finished. Reported upserted count: {uploaded_count}")

    except Exception as e:
        logger.error(f"Ingestion failed during Pinecone upload: {e}", exc_info=True)
        return {"status": "error", "message": f"Pinecone upload failed: {e}"}

    end_time = time.time()
    duration = end_time - start_time
    logger.info(f"Ingestion completed for {source} in {duration:.2f} seconds. Processed {len(text_chunks)} chunks, attempted upload for {len(vectors_to_upload)}, reported upserted: {uploaded_count}.")

    return {
        "status": "success" if uploaded_count == len(vectors_to_upload) else "partial_success",
        "message": f"Ingestion completed. Uploaded {uploaded_count}/{len(vectors_to_upload)} vectors.",
        "chunks_processed": len(text_chunks),
        "vectors_uploaded": uploaded_count,
        "duration_seconds": duration,
        "document_id": base_doc_id
    } 