from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_db
from app.core.auth import get_current_user
from app.schemas.bot import BotCreate, BotUpdate, BotResponse, BotList
from app.services.bot_service import BotService
from app.models.user import User
from uuid import UUID

@router.get("/", response_model=BotList)
async def get_bots(skip: int = 0, limit: int = 20, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bots, total = await service.get_user_bots(user_id=current_user.id, skip=skip, limit=limit)
    return BotList(bots=bots, total=total, skip=skip, limit=limit)

@router.post("/", response_model=BotResponse, status_code=status.HTTP_201_CREATED)
async def create_bot(payload: BotCreate, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bot = await service.create_bot(owner_id=current_user.id, data=payload.model_dump(exclude_none=True))
    return bot

@router.get("/{bot_id}", response_model=BotResponse)
async def get_bot(bot_id: UUID, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bot = await service.get_bot_by_id(bot_id=bot_id, owner_id=current_user.id)
    if not bot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")
    return bot

@router.put("/{bot_id}", response_model=BotResponse)
async def update_bot(bot_id: UUID, payload: BotUpdate, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    bot = await service.update_bot(bot_id=bot_id, owner_id=current_user.id, updates=payload.model_dump(exclude_none=True))
    if not bot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")
    return bot

@router.delete("/{bot_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_bot(bot_id: UUID, db: AsyncSession = Depends(get_async_db), current_user: User = Depends(get_current_user)):
    service = BotService(db)
    ok = await service.delete_bot(bot_id=bot_id, owner_id=current_user.id)
    if not ok:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot not found")
    return None 