from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_db
from app.core.auth import get_current_user
from app.schemas.bot import BotCreate, BotUpdate, BotResponse, BotList
from app.services.bot_service import BotService
from app.models.user import User
from uuid import UUID
from app.core.dependencies import rate_limit_user, require_permission
from app.utils.audit import audit_log
from app.utils.rbac import Resource, Permission

@router.get("/", response_model=BotList, dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.BOT, Permission.READ))])
async def get_bots(skip: int = 0, limit: int = 20, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bots, total = await service.get_user_bots(user_id=current_user.id, skip=skip, limit=limit)
    return BotList(bots=bots, total=total, skip=skip, limit=limit)

@router.post("/", response_model=BotResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.BOT, Permission.WRITE))])
async def create_bot(payload: BotCreate, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bot = await service.create_bot(owner_id=current_user.id, data=payload.model_dump(exclude_none=True))
    audit_log("bot_create", str(current_user.id), "bot", {"bot_id": str(bot.id)})
    return bot

@router.get("/{bot_id}", response_model=BotResponse, dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.BOT, Permission.READ))])
async def get_bot(bot_id: UUID, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bot = await service.get_bot_by_id(bot_id=bot_id, owner_id=current_user.id)
    if not bot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")
    return bot

@router.put("/{bot_id}", response_model=BotResponse, dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.BOT, Permission.WRITE))])
async def update_bot(bot_id: UUID, payload: BotUpdate, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bot = await service.update_bot(bot_id=bot_id, owner_id=current_user.id, updates=payload.model_dump(exclude_none=True))
    if not bot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")
    audit_log("bot_update", str(current_user.id), "bot", {"bot_id": str(bot.id)})
    return bot

@router.delete("/{bot_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(rate_limit_user), Depends(require_permission(Resource.BOT, Permission.DELETE))])
async def delete_bot(bot_id: UUID, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    ok = await service.delete_bot(bot_id=bot_id, owner_id=current_user.id)
    if not ok:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")
    audit_log("bot_delete", str(current_user.id), "bot", {"bot_id": str(bot_id)})
    return None
