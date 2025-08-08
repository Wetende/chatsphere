from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_db
from app.services.document_service import DocumentService

router = APIRouter()

@router.post("/upload")
async def upload_document(background_tasks: BackgroundTasks, bot_id: str = File(...), file: UploadFile = File(...), db: AsyncSession = Depends(get_async_db)):
    service = DocumentService(db)
    doc = await service.create_document_from_file(bot_id=bot_id, file=file, name=file.filename, background_tasks=background_tasks)
    return {"document_id": str(doc.id), "status": doc.status}

@router.post("/url")
async def ingest_url():
    return {"message": "URL ingestion endpoint - todo"}

@router.get("/status/{job_id}")
async def get_ingestion_status(job_id: str):
    return {"message": f"Ingestion status for job {job_id}"} 