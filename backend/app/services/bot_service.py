from typing import Tuple, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.bot import Bot
from sqlalchemy.dialects.postgresql import UUID as PGUUID

class BotService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_bot(self, owner_id: PGUUID, data: dict) -> Bot:
        bot = Bot(owner_id=owner_id, **data)
        self.db.add(bot)
        await self.db.commit()
        await self.db.refresh(bot)
        return bot

    async def get_user_bots(self, user_id: PGUUID, skip: int, limit: int) -> Tuple[List[Bot], int]:
        total_result = await self.db.execute(select(func.count()).select_from(Bot).where(Bot.owner_id == user_id))
        total = total_result.scalar_one()
        result = await self.db.execute(
            select(Bot).where(Bot.owner_id == user_id).offset(skip).limit(limit)
        )
        bots = result.scalars().all()
        return bots, total

    async def get_bot_by_id(self, bot_id: PGUUID, owner_id: PGUUID) -> Optional[Bot]:
        result = await self.db.execute(select(Bot).where(Bot.id == bot_id, Bot.owner_id == owner_id))
        return result.scalar_one_or_none()

    async def update_bot(self, bot_id: PGUUID, owner_id: PGUUID, updates: dict) -> Optional[Bot]:
        bot = await self.get_bot_by_id(bot_id, owner_id)
        if not bot:
            return None
        for key, value in updates.items():
            if value is not None and hasattr(bot, key):
                setattr(bot, key, value)
        await self.db.commit()
        await self.db.refresh(bot)
        return bot

    async def delete_bot(self, bot_id: PGUUID, owner_id: PGUUID) -> bool:
        bot = await self.get_bot_by_id(bot_id, owner_id)
        if not bot:
            return False
        await self.db.delete(bot)
        await self.db.commit()
        return True
