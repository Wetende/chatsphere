from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from fastapi import UploadFile, HTTPException, BackgroundTasks
from app.models.bot import Document, Chunk
import uuid

CHUNK_SIZE = 800
CHUNK_OVERLAP = 150

class DocumentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_document_from_file(
        self,
        bot_id: uuid.UUID,
        file: UploadFile,
        name: str,
        background_tasks: BackgroundTasks,
    ) -> Document:
        if file.size and file.size > 10 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="File too large")

        document = Document(
            bot_id=bot_id,
            name=name,
            file=file.filename,
            content_type=file.content_type or "application/octet-stream",
            status="processing",
        )
        self.db.add(document)
        await self.db.commit()
        await self.db.refresh(document)

        background_tasks.add_task(self._process_document_async, document.id, file)
        return document

    async def _process_document_async(self, document_id: uuid.UUID, file: UploadFile) -> None:
        from app.core.database import AsyncSessionLocal
        from agent.ingestion.vectorization import VectorizationService

        async with AsyncSessionLocal() as db:
            result = await db.execute(select(Document).where(Document.id == document_id))
            document: Document = result.scalar_one_or_none()
            if not document:
                return

            content = (await file.read()).decode(errors="ignore")
            chunks = self._chunk_text(content)

            chunk_objects: List[Chunk] = []
            for i, text in enumerate(chunks):
                chunk = Chunk(document_id=document.id, content=text, metadata={"chunk_index": i})
                chunk_objects.append(chunk)
            db.add_all(chunk_objects)
            await db.commit()

            vector_service = VectorizationService()
            vector_ids = await vector_service.vectorize_document(
                document_id=str(document.id),
                chunks=chunks,
                metadata={"document_name": document.name},
                bot_id=str(document.bot_id),
            )

            # Update stored vector ids
            result = await db.execute(select(Chunk).where(Chunk.document_id == document.id))
            saved_chunks = result.scalars().all()
            for sc, vid in zip(saved_chunks, vector_ids):
                sc.pinecone_vector_id = vid
            document.status = "ready"
            await db.commit()

    def _chunk_text(self, text: str) -> List[str]:
        words = text.split()
        chunks: List[str] = []
        start = 0
        while start < len(words):
            end = min(start + CHUNK_SIZE, len(words))
            chunk = " ".join(words[start:end])
            chunks.append(chunk)
            if end == len(words):
                break
            start = end - CHUNK_OVERLAP
            if start < 0:
                start = 0
        return chunks