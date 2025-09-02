"""
Presentation - Conversation Router

Conversation endpoints using integer IDs and GET/POST pattern:
- POST /conversations/{id}: id=0 create/start, id>0 update
- GET /conversations/{id}: retrieve single conversation
- GET /conversations: list conversations
- GET /conversations/delete/{id}: delete conversation by id
"""

from typing import Optional, List
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

router = APIRouter(
    prefix="/conversations",
    tags=["conversations"]
)


class ConversationPayload(BaseModel):
    title: Optional[str] = Field(None, max_length=200)
    bot_id: int = Field(..., ge=1)


class ConversationResponse(BaseModel):
    id: int
    title: Optional[str]
    bot_id: int
    is_active: bool


@router.post("/{conversation_id}", response_model=ConversationResponse, status_code=status.HTTP_200_OK)
async def upsert_conversation(conversation_id: int, payload: ConversationPayload) -> ConversationResponse:
    """
    Create or update a conversation.
    - conversation_id=0 → create new
    - conversation_id>0 → update existing
    """
    if conversation_id < 0:
        raise HTTPException(status_code=400, detail="conversation_id must be >= 0")
    new_id = 1 if conversation_id == 0 else conversation_id
    # TODO: wire to use cases and repository
    return ConversationResponse(
        id=new_id,
        title=payload.title,
        bot_id=payload.bot_id,
        is_active=True,
    )


@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(conversation_id: int) -> ConversationResponse:
    """Retrieve a conversation by id."""
    if conversation_id <= 0:
        raise HTTPException(status_code=400, detail="conversation_id must be > 0")
    return ConversationResponse(
        id=conversation_id,
        title=None,
        bot_id=1,
        is_active=True,
    )


@router.get("", response_model=List[ConversationResponse])
async def list_conversations(limit: int = 20, offset: int = 0) -> List[ConversationResponse]:
    """List conversations with pagination."""
    return []


@router.get("/delete/{conversation_id}")
async def delete_conversation(conversation_id: int) -> dict:
    """Delete a conversation by id (GET pattern as requested)."""
    if conversation_id <= 0:
        raise HTTPException(status_code=400, detail="conversation_id must be > 0")
    return {"deleted": True, "id": conversation_id}

