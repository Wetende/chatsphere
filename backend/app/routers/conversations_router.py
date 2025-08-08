from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_db
from app.core.auth import get_current_user
from app.services.conversation_service import ConversationService
from app.schemas.conversation import ConversationResponse
from app.models.user import User
from typing import List
from uuid import UUID

router = APIRouter()

@router.get("/", response_model=List[ConversationResponse])
async def get_conversations(db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    # TODO: implement filtering by user's bots; return empty for now
    return []

@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(conversation_id: UUID, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = ConversationService(db)
    convo = await service.get_conversation(conversation_id, str(current_user.id))
    if not convo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    return convo

@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(conversation_id: UUID, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = ConversationService(db)
    ok = await service.delete_conversation(conversation_id)
    if not ok:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    return None 