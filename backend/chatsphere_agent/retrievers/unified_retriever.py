from typing import Any, Dict, List, Optional

from langchain_core.callbacks import CallbackManagerForRetrieverRun
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings
from langchain_core.retrievers import BaseRetriever
# from pinecone import Index  # Using pinecone-client v3+ Index type hint
from pinecone.data.index import Index as PineconeDataIndex # More specific type hint
import logging

logger = logging.getLogger(__name__)

class UnifiedPineconeRetriever(BaseRetriever):
    """Retriever that fetches context from Pinecone based on vector similarity and metadata filters."""

    # index: Index
    index: PineconeDataIndex # Use the more specific type
    """Pinecone index client instance."""
    embeddings: Embeddings
    """Embeddings model to convert query text to vectors."""
    search_k: int = 4
    """Number of documents to retrieve."""
    text_key: str = "text"
    """Metadata key where the original text chunk is stored."""
    namespace: Optional[str] = None
    """Optional Pinecone namespace to query within."""
    filter: Optional[Dict[str, Any]] = None
    """Optional metadata filter to apply during search (Pinecone v3+ format)."""
    score_threshold: float = 0.0
    """Minimum similarity score threshold (0.0 to 1.0). Higher values mean more relevant results."""

    def _invoke(self, input_query: Any, config: Optional[Dict[str, Any]] = None, **kwargs: Any) -> List[Document]:
        """Implementation of the invoke method to avoid recursion issues."""
        # Process input_query to get the query string
        if isinstance(input_query, str):
            query = input_query
        elif isinstance(input_query, dict) and "query" in input_query:
            query = input_query["query"]
        else:
            raise ValueError(f"Input must be string or dict with 'query' key, got {type(input_query)}")
            
        # Handle retriever kwargs from config
        if config and "configurable" in config and "retriever_kwargs" in config["configurable"]:
            retriever_kwargs = config["configurable"]["retriever_kwargs"]
            kwargs.update(retriever_kwargs)
            
        # Use the _get_relevant_documents method directly to avoid recursive loop
        return self._get_relevant_documents(query, run_manager=None, **kwargs)
    
    @property
    def invoke(self):
        """Returns a callable that invokes the retriever - this is needed for the newer LCEL interface."""
        return self._invoke
    
    def _get_relevant_documents(
        self, query: str, *, run_manager: CallbackManagerForRetrieverRun, **kwargs: Any
    ) -> List[Document]:
        """Retrieve relevant documents from Pinecone.

        Args:
            query: The user's query string.
            run_manager: The callback manager for the retriever run.
            **kwargs: Additional keyword arguments, supporting 'filter' and 'namespace'
                      to override instance defaults for this specific call.

        Returns:
            A list of relevant documents that meet the similarity threshold.
        """
        logger.info(f"Processing retrieval query: '{query[:100]}...' if len(query) > 100 else query")
        
        try:
            query_embedding = self.embeddings.embed_query(query)
        except Exception as e:
            logger.error(f"Error during query embedding: {e}", exc_info=True)
            raise

        # Allow overriding filter and namespace per call via kwargs
        call_filter = kwargs.get("filter", self.filter)
        call_namespace = kwargs.get("namespace", self.namespace)

        pinecone_query_kwargs: Dict[str, Any] = {
            "vector": query_embedding,
            "top_k": self.search_k,
            "include_metadata": True,
            "include_values": False,
        }
        if call_filter:
            pinecone_query_kwargs["filter"] = call_filter
        if call_namespace:
            pinecone_query_kwargs["namespace"] = call_namespace

        # Perform the query
        try:
            results = self.index.query(**pinecone_query_kwargs)
            if "matches" in results:
                logger.info(f"Retrieved {len(results['matches'])} matches from Pinecone")
            else:
                logger.warning("No matches found in Pinecone response")
                return []
        except Exception as e:
            logger.error(f"Error querying Pinecone: {e}", exc_info=True)
            return []

        # Process results and apply score threshold
        documents = []
        for match in results.get("matches", []):
            if match.get("score", 0) < self.score_threshold:
                continue

            metadata = match.get("metadata", {})
            page_content = metadata.pop(self.text_key, None)
            if page_content is None:
                logger.warning(f"Document {match.get('id')} missing '{self.text_key}' in metadata")
                continue

            metadata["similarity_score"] = match.get("score", 0)
            documents.append(Document(page_content=page_content, metadata=metadata))
            
        logger.info(f"Returning {len(documents)} documents after filtering")
        return documents

# Example Usage (Illustrative - requires actual index, embeddings, etc.)
# if __name__ == "__main__":
#     # This block would contain setup code for Pinecone connection,
#     # initializing the embeddings model, and creating the retriever instance.
#     # Then, it would demonstrate calling retriever.get_relevant_documents()
#     # with a sample query and potentially filters.
#     print("UnifiedPineconeRetriever class defined.") 