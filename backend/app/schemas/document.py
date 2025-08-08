from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

class DocumentCreate(BaseModel):
    name: str
    content_type: str
    url: Optional[str] = None

class DocumentResponse(BaseModel):
    id: str
    bot_id: str
    name: str
    file: Optional[str]
    url: Optional[str]
    content_type: str
    status: str
    error_message: Optional[str]
    metadata: Dict
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ChunkResponse(BaseModel):
    id: str
    document_id: str
    content: str
    pinecone_vector_id: Optional[str]
    metadata: Dict
    created_at: datetime

    class Config:
        from_attributes = True