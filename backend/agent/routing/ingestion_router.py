from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_db
from app.services.document_service import DocumentService
from agent.ingestion.vectorization import VectorizationService
from app.core.dependencies import rate_limit_user, require_permission
from app.utils.rbac import Resource, Permission

router = APIRouter()

@router.post("/upload", dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.DOCUMENT, Permission.WRITE))])
async def upload_document(background_tasks: BackgroundTasks, bot_id: str = File(...), file: UploadFile = File(...), db: AsyncSession = Depends(get_async_db)):
    """Upload a file to be ingested and vectorized for a bot."""
    service = DocumentService(db)
    doc = await service.create_document_from_file(bot_id=bot_id, file=file, name=file.filename, background_tasks=background_tasks)
    return {"document_id": str(doc.id), "status": doc.status}

@router.post("/url", dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.DOCUMENT, Permission.WRITE))])
async def ingest_url(background_tasks: BackgroundTasks, bot_id: str, url: str, name: str | None = None, db: AsyncSession = Depends(get_async_db)):
    """Schedule ingestion of a URL. Extracted content will be chunked and vectorized."""
    service = DocumentService(db)
    doc = await service.create_document_from_url(bot_id=bot_id, url=url, name=name, background_tasks=background_tasks)
    return {"document_id": str(doc.id), "status": doc.status}

@router.get("/status/{job_id}", dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.DOCUMENT, Permission.READ))])
async def get_ingestion_status(job_id: str):
    """Return ingestion status placeholder (extend with actual job tracking)."""
    return {"message": f"Ingestion status for job {job_id}"}
