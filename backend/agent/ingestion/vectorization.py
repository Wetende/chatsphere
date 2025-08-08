from typing import List, Dict
import os

try:
    import google.generativeai as genai
except Exception:  # pragma: no cover
    genai = None

from agent.retrieval.pinecone_client import PineconeClient

class VectorizationService:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if genai and self.api_key:
            genai.configure(api_key=self.api_key)
        self.model_name = os.getenv("EMBEDDING_MODEL", "text-embedding-004")
        self.vector_store = PineconeClient()

    async def vectorize_document(self, document_id: str, chunks: List[str], metadata: Dict, bot_id: str) -> List[str]:
        embeddings = await self._embed_texts(chunks)
        vectors = []
        vector_ids: List[str] = []
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            vector_id = f"{document_id}-chunk-{i}"
            vector_ids.append(vector_id)
            vectors.append({
                "id": vector_id,
                "values": embedding,
                "metadata": {**metadata, "document_id": document_id, "bot_id": bot_id, "chunk_index": i, "text": chunk},
            })
        await self.vector_store.upsert_vectors(vectors=vectors, namespace=bot_id)
        return vector_ids

    async def _embed_texts(self, texts: List[str]) -> List[List[float]]:
        if not genai or not self.api_key:
            # Dev fallback: zero vectors of dimension 384
            return [[0.0] * 384 for _ in texts]
        # The python SDK is async for generate_content but embed_content may not be; use run_in_executor if needed.
        # For simplicity, call sync API here.
        results: List[List[float]] = []
        for t in texts:
            try:
                resp = genai.embed_content(model=f"models/{self.model_name}", content=t, task_type="retrieval_document")
                emb = resp.get("embedding") or resp.get("data", [{}])[0].get("embedding")
                results.append(emb or [0.0] * 384)
            except Exception:
                results.append([0.0] * 384)
        return results