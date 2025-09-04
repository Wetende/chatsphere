"""
Analytics API Router

Provides endpoints to retrieve conversation and message analytics for
users and bots. Follows GET/POST-only constraint (GET for retrieval).
"""

from typing import Dict, Any, Optional

from fastapi import APIRouter, Depends, Query, HTTPException, status

from application.exceptions.application_exceptions import ValidationException
from application.interfaces.analytics_service import IAnalyticsService
from composition_root import get_composition_root, get_analytics_service
from presentation.api.user_router import get_current_user_id


router = APIRouter(
    prefix="/analytics",
    tags=["analytics"],
    responses={
        401: {"description": "Authentication required"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"},
    },
)


async def _get_analytics_service(service: IAnalyticsService = Depends(get_analytics_service)) -> IAnalyticsService:
    return service


@router.get("/bot/{bot_id}", status_code=status.HTTP_200_OK)
async def get_bot_analytics(
    bot_id: int,
    current_user_id: int = Depends(get_current_user_id),
    svc: IAnalyticsService = Depends(_get_analytics_service),
) -> Dict[str, Any]:
    if bot_id <= 0:
        raise HTTPException(status_code=422, detail="bot_id must be > 0")
    try:
        data = await svc.get_bot_analytics(bot_id)
        # Authorization filtering would be inside service/repo layer
        return data
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.get("/overview", status_code=status.HTTP_200_OK)
async def get_user_overview(
    days: int = Query(7, ge=1, le=90),
    current_user_id: int = Depends(get_current_user_id),
    svc: IAnalyticsService = Depends(_get_analytics_service),
) -> Dict[str, Any]:
    try:
        return await svc.get_user_overview(current_user_id, days)
    except ValidationException as e:
        raise HTTPException(status_code=422, detail=str(e))


