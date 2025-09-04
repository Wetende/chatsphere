"""
Bot Import/Export API Router

Allows exporting a bot's configuration and importing a configuration
to update an existing bot. Uses POST for import, GET for export.
"""

from __future__ import annotations

from typing import Dict, Any

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from presentation.api.user_router import get_current_user_id
from composition_root import get_update_bot_use_case, get_get_bot_use_case
from application.use_cases.bot.update_bot_use_case import UpdateBotUseCase, UpdateBotRequest
from application.use_cases.bot.get_bot_use_case import GetBotUseCase, GetBotRequest
from application.exceptions.application_exceptions import (
    ValidationException,
    AuthorizationException,
    BotNotFoundException,
)


router = APIRouter(
    prefix="/bots/import-export",
    tags=["bots"],
    responses={
        401: {"description": "Authentication required"},
        403: {"description": "Insufficient permissions"},
        404: {"description": "Bot not found"},
        422: {"description": "Validation error"},
    },
)


@router.get("/export/{bot_id}", status_code=status.HTTP_200_OK)
async def export_bot(
    bot_id: int,
    current_user_id: int = Depends(get_current_user_id),
    get_uc: GetBotUseCase = Depends(get_get_bot_use_case),
) -> Dict[str, Any]:
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        result = await get_uc.execute(GetBotRequest(bot_id=bot_id, requesting_user_id=current_user_id))
        # Return subset as exportable config
        return {
            "name": result.name,
            "description": result.description,
            "model_name": result.model_name,
            "temperature": result.temperature,
            "system_prompt": result.system_prompt,
            "is_public": result.is_public,
            "configuration": result.configuration,
        }
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


class ImportPayload(BaseModel):
    name: str | None = None
    description: str | None = None
    model_name: str | None = None
    temperature: float | None = None
    system_prompt: str | None = None
    is_public: bool | None = None
    configuration: Dict[str, Any] | None = None


@router.post("/import/{bot_id}", status_code=status.HTTP_200_OK)
async def import_bot(
    bot_id: int,
    payload: ImportPayload,
    current_user_id: int = Depends(get_current_user_id),
    update_uc: UpdateBotUseCase = Depends(get_update_bot_use_case),
) -> Dict[str, Any]:
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        req = UpdateBotRequest(
            bot_id=bot_id,
            requesting_user_id=current_user_id,
            name=payload.name,
            description=payload.description,
            model_name=payload.model_name,
            temperature=payload.temperature,
            system_prompt=payload.system_prompt,
            is_public=payload.is_public,
            configuration=payload.configuration or {},
        )
        result = await update_uc.execute(req)
        return {
            "bot_id": result.bot_id,
            "message": "Bot configuration imported",
        }
    except BotNotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except AuthorizationException as e:
        raise HTTPException(status_code=403, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))



