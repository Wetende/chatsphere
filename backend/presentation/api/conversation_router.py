"""
Presentation - Conversation Router

Conversation endpoints using integer IDs and GET/POST pattern:
- POST /conversations/{id}: id=0 create/start, id>0 update
- GET /conversations/{id}: retrieve single conversation
- GET /conversations: list conversations
- GET /conversations/delete/{id}: delete conversation by id
"""

from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException, status, Depends, Query
from pydantic import BaseModel, Field
from presentation.api.user_router import get_current_user_id
from application.use_cases.conversation.create_conversation_use_case import CreateConversationUseCase
from application.use_cases.conversation.list_conversations_use_case import ListConversationsUseCase
from application.use_cases.conversation.update_conversation_use_case import UpdateConversationUseCase
from application.use_cases.conversation.delete_conversation_use_case import DeleteConversationUseCase
from application.dtos.conversation_dtos import (
    CreateConversationRequestDTO,
    ListConversationsRequestDTO,
    UpdateConversationRequestDTO,
    DeleteConversationRequestDTO,
)
from application.exceptions.application_exceptions import ValidationException, AuthorizationException
from composition_root import (
    get_create_conversation_use_case,
    get_list_conversations_use_case,
    get_update_conversation_use_case,
    get_delete_conversation_use_case,
)

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
async def upsert_conversation(
    conversation_id: int,
    payload: ConversationPayload,
    current_user_id: int = Depends(get_current_user_id),
    create_uc: CreateConversationUseCase = Depends(get_create_conversation_use_case),
    update_uc: UpdateConversationUseCase = Depends(get_update_conversation_use_case),
) -> ConversationResponse:
    """
    Create or update a conversation.
    - conversation_id=0 → create new
    - conversation_id>0 → update existing
    """
    if conversation_id < 0:
        raise HTTPException(status_code=400, detail="conversation_id must be >= 0")
    if conversation_id == 0:
        try:
            result = await create_uc.execute(
                CreateConversationRequestDTO(
                    bot_id=payload.bot_id,
                    user_id=current_user_id,
                    title=payload.title,
                    initial_message=None,
                )
            )
            return ConversationResponse(
                id=result.conversation_id,
                title=result.title,
                bot_id=result.bot_id,
                is_active=True,
            )
        except (ValidationException, AuthorizationException) as e:
            raise HTTPException(status_code=422, detail=str(e))
    else:
        try:
            update_result = await update_uc.execute(
                UpdateConversationRequestDTO(
                    conversation_id=conversation_id,
                    user_id=current_user_id,
                    title=payload.title,
                    is_archived=None,
                )
            )
            return ConversationResponse(
                id=update_result.conversation_id,
                title=update_result.title,
                bot_id=payload.bot_id,
                is_active=not update_result.is_archived,
            )
        except (ValidationException, AuthorizationException) as e:
            raise HTTPException(status_code=422, detail=str(e))


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
async def list_conversations(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user_id: int = Depends(get_current_user_id),
    use_case: ListConversationsUseCase = Depends(get_list_conversations_use_case),
) -> List[ConversationResponse]:
    try:
        req = ListConversationsRequestDTO(user_id=current_user_id, limit=limit, offset=offset)
        result = await use_case.execute(req)
        items: List[ConversationResponse] = []
        for c in result.conversations:
            items.append(ConversationResponse(id=c.conversation_id, title=c.title, bot_id=c.bot_id, is_active=c.is_active))
        return items
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.get("/delete/{conversation_id}")
async def delete_conversation(
    conversation_id: int,
    current_user_id: int = Depends(get_current_user_id),
    use_case: DeleteConversationUseCase = Depends(get_delete_conversation_use_case),
) -> Dict[str, Any]:
    if conversation_id <= 0:
        raise HTTPException(status_code=422, detail="conversation_id must be > 0")
    try:
        result = await use_case.execute(
            DeleteConversationRequestDTO(conversation_id=conversation_id, user_id=current_user_id, soft_delete=True)
        )
        return {"deleted": True, "deleted_at": result.deleted_at, "messages_deleted": result.messages_deleted}
    except (ValidationException, AuthorizationException) as e:
        raise HTTPException(status_code=422, detail=str(e))

