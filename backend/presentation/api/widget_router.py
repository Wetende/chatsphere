"""
Widget Customization API Router

Allows owners to update and preview bot widget appearance settings such as
avatar_url and color_theme by delegating to UpdateBotUseCase.
"""

from typing import Dict, Any, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from composition_root import get_update_bot_use_case
from application.use_cases.bot.update_bot_use_case import UpdateBotUseCase, UpdateBotRequest
from application.exceptions.application_exceptions import (
    ValidationException,
    AuthorizationException,
    BotNotFoundException,
)
from presentation.api.user_router import get_current_user_id


router = APIRouter(
    prefix="/widgets",
    tags=["widgets"],
    responses={
        401: {"description": "Authentication required"},
        403: {"description": "Insufficient permissions"},
        404: {"description": "Bot not found"},
        422: {"description": "Validation error"},
    },
)


class WidgetSettingsPayload(BaseModel):
    avatar_url: Optional[str] = Field(None, max_length=500)
    color_theme: Optional[str] = Field(None, min_length=4, max_length=7)


@router.post("/{bot_id}", status_code=status.HTTP_200_OK)
async def update_widget(
    bot_id: int,
    payload: WidgetSettingsPayload,
    current_user_id: int = Depends(get_current_user_id),
    update_uc: UpdateBotUseCase = Depends(get_update_bot_use_case),
) -> Dict[str, Any]:
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        req = UpdateBotRequest(
            bot_id=bot_id,
            requesting_user_id=current_user_id,
            configuration={
                "avatar_url": payload.avatar_url,
                "color_theme": payload.color_theme,
            },
        )
        result = await update_uc.execute(req)
        return {
            "bot_id": result.bot_id,
            "avatar_url": result.configuration.get("avatar_url"),
            "color_theme": result.configuration.get("color_theme"),
            "message": "Widget settings updated",
        }
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.get("/preview/{bot_id}", status_code=status.HTTP_200_OK)
async def preview_widget(
    bot_id: int,
    current_user_id: int = Depends(get_current_user_id),
    update_uc: UpdateBotUseCase = Depends(get_update_bot_use_case),
) -> Dict[str, Any]:
    # Reuse get endpoint from bots via update use case's repo lookup (lightweight)
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        # No update, just fetch by issuing a no-op update request to retrieve DTO
        req = UpdateBotRequest(bot_id=bot_id, requesting_user_id=current_user_id)
        result = await update_uc.execute(req)
        config = result.configuration or {}
        return {
            "bot_id": result.bot_id,
            "avatar_url": config.get("avatar_url"),
            "color_theme": config.get("color_theme"),
        }
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


