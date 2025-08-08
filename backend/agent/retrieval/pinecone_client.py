from typing import List, Dict, Any, Optional
import os

try:
    from pinecone import Pinecone
except Exception:  # pragma: no cover
    Pinecone = None

try:
    import google.generativeai as genai
except Exception:  # pragma: no cover
    genai = None

class PineconeClient:
    def __init__(self):
        self.api_key = os.getenv("PINECONE_API_KEY")
        self.index_name = os.getenv("PINECONE_INDEX_NAME", "chatsphere-embeddings")
        self.client = Pinecone(api_key=self.api_key) if (Pinecone and self.api_key) else None
        self.index = self.client.Index(self.index_name) if self.client else None
        self.google_api_key = os.getenv("GOOGLE_API_KEY")
        self.embedding_model = os.getenv("EMBEDDING_MODEL", "text-embedding-004")
        if genai and self.google_api_key:
            genai.configure(api_key=self.google_api_key)

    async def upsert_vectors(self, vectors: List[Dict], namespace: Optional[str] = None) -> Dict:
        if not self.index:
            return {"success": True, "upserted_count": len(vectors), "note": "Pinecone not configured (dev mode)"}
        result = self.index.upsert(vectors=vectors, namespace=namespace)
        return {"success": True, "result": result}

    async def query_vectors(
        self,
        query: str,
        namespace: str,
        top_k: int = 5,
        filter_metadata: Optional[Dict] = None,
    ) -> List[Dict]:
        if not self.index or not genai or not self.google_api_key:
            return []
        # Generate query embedding
        try:
            resp = genai.embed_content(model=f"models/{self.embedding_model}", content=query, task_type="retrieval_query")
            embedding = resp.get("embedding") or resp.get("data", [{}])[0].get("embedding")
        except Exception:
            embedding = None
        if not embedding:
            return []
        # Query Pinecone
        try:
            result = self.index.query(
                vector=embedding,
                top_k=top_k,
                include_metadata=True,
                namespace=namespace,
                filter=filter_metadata,
            )
            matches = getattr(result, "matches", []) or result.get("matches", [])
            formatted = []
            for m in matches:
                item = {
                    "id": getattr(m, "id", None) or m.get("id"),
                    "score": getattr(m, "score", None) or m.get("score"),
                    "text": getattr(m, "metadata", {}).get("text") if hasattr(m, "metadata") else (m.get("metadata", {}) or {}).get("text", ""),
                    "metadata": getattr(m, "metadata", {}) if hasattr(m, "metadata") else (m.get("metadata", {}) or {}),
                }
                formatted.append(item)
            return formatted
        except Exception:
            return []

    async def delete_vectors(self, vector_ids: List[str], namespace: Optional[str] = None) -> Dict:
        if not self.index:
            return {"success": True, "deleted_count": len(vector_ids), "note": "Pinecone not configured (dev mode)"}
        result = self.index.delete(ids=vector_ids, namespace=namespace)
        return {"success": True, "result": result}
