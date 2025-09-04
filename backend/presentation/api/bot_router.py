"""
Bot Management API Router

FastAPI router for bot operations including creation, retrieval, updates,
and deletion. Delegates to application use cases and returns HTTP-friendly responses.

Endpoints (GET and POST only as requested):
- GET /bots: List bots with filtering and pagination
- GET /bots/{id}: Get specific bot details
- POST /bots: Create new bot (id=0) or update existing bot (id>0)
- GET /bots/delete/{id}: Delete bot

Key Features:
- JWT authentication required for all endpoints
- Request/response validation with Pydantic
- Comprehensive error handling
- OpenAPI documentation
- Authorization checks for bot ownership
- Pagination support for bot lists
"""

import logging
from typing import Optional, List, Dict, Any

from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel, Field

from application.exceptions.application_exceptions import (
    BotNotFoundException,
    AuthorizationException,
    ValidationException,
    ConflictException,
    BusinessRuleViolationException
)
from application.use_cases.bot.get_bot_use_case import GetBotUseCase, GetBotRequest
from application.use_cases.bot.list_bots_use_case import ListBotsUseCase, ListBotsRequest
from application.use_cases.bot.create_bot_use_case import CreateBotUseCase
from application.use_cases.bot.update_bot_use_case import UpdateBotUseCase, UpdateBotRequest
from application.use_cases.bot.delete_bot_use_case import DeleteBotUseCase, DeleteBotRequest
from application.dtos.bot_dtos import CreateBotRequestDTO
from composition_root import (
    get_get_bot_use_case,
    get_list_bots_use_case,
    get_create_bot_use_case,
    get_update_bot_use_case,
    get_delete_bot_use_case
)

# Import current user dependency
from presentation.api.user_router import get_current_user_id_optional

logger = logging.getLogger(__name__)

# Create router with configuration
router = APIRouter(
    prefix="/bots",
    tags=["bots"],
    responses={
        401: {"description": "Authentication required"},
        403: {"description": "Insufficient permissions"},
        404: {"description": "Bot not found"},
        500: {"description": "Internal server error"}
    }
)


# Request/Response Models
class BotResponse(BaseModel):
    """Bot response model."""
    bot_id: int = Field(..., description="Bot identifier")
    name: str = Field(..., description="Bot name")
    description: Optional[str] = Field(None, description="Bot description")
    owner_id: int = Field(..., description="Bot owner ID")
    model_name: str = Field(..., description="AI model name")
    temperature: float = Field(..., description="AI model temperature")
    is_public: bool = Field(..., description="Public visibility")
    is_active: bool = Field(..., description="Active status")
    status: str = Field(..., description="Bot status")
    welcome_message: str = Field(..., description="Welcome message")
    created_at: str = Field(..., description="Creation timestamp")
    is_owner: bool = Field(..., description="Whether current user owns this bot")


@router.get(
    "",
    status_code=status.HTTP_200_OK,
    summary="List bots",
    description="Retrieve list of bots with pagination",
)
async def list_bots(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    owner_only: bool = Query(True),
    current_user_id: Optional[int] = Depends(get_current_user_id_optional),
    use_case: ListBotsUseCase = Depends(get_list_bots_use_case)
) -> Dict[str, Any]:
    request = ListBotsRequest(
        requesting_user_id=current_user_id,
        owner_only=owner_only,
        limit=limit,
        offset=offset,
    )
    try:
        if current_user_id is None:
            raise HTTPException(status_code=401, detail="Authorization token required")
        result = await use_case.execute(request)
        return {
            "bots": [r.__dict__ for r in result.bots],
            "total": result.total_count,
            "limit": limit,
            "offset": offset,
            "has_next": result.has_next,
            "has_previous": result.has_previous,
        }
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.get(
    "/{bot_id}",
    status_code=status.HTTP_200_OK,
    summary="Get bot details",
    description="Retrieve bot information",
)
async def get_bot(
    bot_id: int,
    current_user_id: Optional[int] = Depends(get_current_user_id_optional),
    use_case: GetBotUseCase = Depends(get_get_bot_use_case)
) -> Dict[str, Any]:
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        if current_user_id is None:
            raise HTTPException(status_code=401, detail="Authorization token required")
        result = await use_case.execute(GetBotRequest(bot_id=bot_id, requesting_user_id=current_user_id))
        return result.__dict__
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


class CreateBotPayload(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    model_name: str = Field(...)
    temperature: float = Field(..., ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(None, ge=1)
    system_prompt: Optional[str] = Field(None, max_length=2000)
    is_public: bool = False
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    avatar_url: Optional[str] = None
    color_theme: Optional[str] = None


@router.post(
    "/{bot_id}",
    status_code=status.HTTP_200_OK,
    summary="Create or update bot",
    description="Create (bot_id=0) or update (bot_id>0) a bot",
)
async def upsert_bot(
    bot_id: int,
    payload: CreateBotPayload,
    current_user_id: Optional[int] = Depends(get_current_user_id_optional),
    create_uc: CreateBotUseCase = Depends(get_create_bot_use_case),
    update_uc: UpdateBotUseCase = Depends(get_update_bot_use_case),
) -> Dict[str, Any]:
    if bot_id < 0:
        raise HTTPException(status_code=422, detail="bot_id must be >= 0")
    try:
        if current_user_id is None:
            raise HTTPException(status_code=401, detail="Authorization token required")
        if bot_id == 0:
            # Create
            from types import SimpleNamespace
            req = SimpleNamespace(
                name=payload.name,
                description=payload.description,
                system_prompt=payload.system_prompt,
                model_name=payload.model_name,
                temperature=payload.temperature,
                max_tokens=payload.max_tokens,
                is_public=payload.is_public,
                category=payload.category,
                tags=payload.tags,
                knowledge_base_id=None,
                avatar_url=payload.avatar_url,
                color_theme=payload.color_theme,
            )
            result = await create_uc.execute(req, owner_id=str(current_user_id))
            return result.__dict__
        else:
            # Update
            update_req = UpdateBotRequest(
                bot_id=bot_id,
                requesting_user_id=current_user_id,
                name=payload.name,
                description=payload.description,
                welcome_message=None,
                model_name=payload.model_name,
                temperature=payload.temperature,
                system_prompt=payload.system_prompt,
                is_public=payload.is_public,
                is_active=None,
                configuration={
                    "avatar_url": payload.avatar_url,
                    "color_theme": payload.color_theme,
                },
            )
            result = await update_uc.execute(update_req)
            return result.__dict__
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except (ValidationException, ConflictException, BusinessRuleViolationException) as e:
        raise HTTPException(status_code=422, detail=str(e))


# Compat alias to support tests posting to /bots with bot_id in query params
@router.post(
    "",
    status_code=status.HTTP_200_OK,
    summary="Create or update bot (query param variant)",
    description="Create (bot_id=0) or update (bot_id>0) a bot using query parameter",
)
async def upsert_bot_query(
    payload: CreateBotPayload,
    bot_id: int = Query(0, ge=0),
    current_user_id: Optional[int] = Depends(get_current_user_id_optional),
    create_uc: CreateBotUseCase = Depends(get_create_bot_use_case),
    update_uc: UpdateBotUseCase = Depends(get_update_bot_use_case),
) -> Dict[str, Any]:
    if current_user_id is None:
        raise HTTPException(status_code=401, detail="Authorization token required")
    return await upsert_bot(
        bot_id=bot_id,
        payload=payload,
        current_user_id=current_user_id,
        create_uc=create_uc,
        update_uc=update_uc,
    )


@router.get(
    "/delete/{bot_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete bot",
    description="Delete bot by id (GET pattern)",
)
async def delete_bot(
    bot_id: int,
    current_user_id: Optional[int] = Depends(get_current_user_id_optional),
    use_case: DeleteBotUseCase = Depends(get_delete_bot_use_case)
) -> Dict[str, Any]:
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        if current_user_id is None:
            raise HTTPException(status_code=401, detail="Authorization token required")
        result = await use_case.execute(DeleteBotRequest(bot_id=bot_id, requesting_user_id=current_user_id))
        return {
            "success": result.success,
            "message": result.message,
            "deleted_at": result.deleted_at,
        }
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))