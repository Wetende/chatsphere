from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class MessageCreate(BaseModel):
    conversation_id: str
    message_type: str  # 'user' or 'assistant'
    content: str
    metadata: Dict = {}

class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    message_type: str
    content: str
    metadata: Dict
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationCreate(BaseModel):
    bot_id: str
    title: Optional[str] = None
    metadata: Dict = {}

class ConversationResponse(BaseModel):
    id: str
    bot_id: str
    user_id: Optional[str]
    title: str
    metadata: Dict
    started_at: datetime
    ended_at: Optional[datetime]

    class Config:
        from_attributes = True