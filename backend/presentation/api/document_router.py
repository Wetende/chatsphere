"""
Document Upload API Router

Provides endpoints for uploading documents to train bots.
"""

import os
import uuid
import logging
from typing import Dict, Any

from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends

from presentation.api.user_router import get_current_user_id
from composition_root import get_database_session
from infrastructure.external_services.document_processor_service import DocumentProcessorService
from presentation.api.websocket_router import manager as ws_manager
from sqlalchemy.ext.asyncio import AsyncSession

from infrastructure.repositories.sqlalchemy_document_repository import SqlAlchemyDocumentRepository


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/documents",
    tags=["documents"],
)


ALLOWED_EXTS = {".pdf", ".txt", ".md"}
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "documents", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", status_code=status.HTTP_200_OK)
async def upload_document(
    file: UploadFile = File(...),
    current_user_id: int = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_database_session),
) -> Dict[str, Any]:
    # Validate file
    _, ext = os.path.splitext(file.filename or "")
    ext = ext.lower()
    if ext not in ALLOWED_EXTS:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")

    # Persist file to disk
    file_id = str(uuid.uuid4())
    safe_name = f"{current_user_id}_{file_id}{ext}"
    dest_path = os.path.join(UPLOAD_DIR, safe_name)
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty file")
    with open(dest_path, "wb") as f:
        f.write(content)

    # Save metadata
    repo = SqlAlchemyDocumentRepository(session)
    model = await repo.add(
        {
            "owner_id": current_user_id,
            "bot_id": None,
            "file_name": file.filename or safe_name,
            "file_path": dest_path,
            "file_type": ext,
            "file_size_bytes": len(content),
            "status": "uploaded",
            "error_message": None,
        }
    )

    # Kick off lightweight processing (synchronous for demo)
    processor = DocumentProcessorService()
    extracted = None
    if ext == ".pdf":
        extracted = await processor.extract_text_from_pdf(dest_path)
    elif ext in {".txt", ".md"}:
        extracted = content.decode("utf-8", errors="ignore")
    chunks = processor.chunk_text(extracted or "") if extracted else []
    await repo.update_status(model.id, "processed", None)
    await ws_manager.send_to_user(current_user_id, f"document:{model.id}:processed:{len(chunks)}")

    return {
        "document_id": model.id,
        "file_name": model.file_name,
        "status": "processed",
        "chunks": len(chunks),
        "message": "Document uploaded and processed",
    }


