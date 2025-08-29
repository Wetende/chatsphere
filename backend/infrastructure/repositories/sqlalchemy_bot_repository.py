"""
Infrastructure Repository - SQLAlchemyBotRepository

Minimal stub implementation of the `IBotRepository` interface.
The full implementation will map domain `Bot` entities to ORM models.

Stub for import success.
"""

from typing import Optional, Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from domain.repositories.bot_repository import IBotRepository
from domain.entities.bot import Bot

class SqlAlchemyBotRepository(IBotRepository):
    """Stub bot repository."""
    
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_by_id(self, bot_id: str) -> Optional[Bot]:
        return None
    
    async def get_by_owner(self, owner_id: str, limit: int = 50, offset: int = 0) -> Sequence[Bot]:
        return []
    
    async def add(self, bot: Bot) -> Bot:
        return bot
    
    async def update(self, bot: Bot) -> Bot:
        return bot
    
    async def delete(self, bot_id: str) -> None:
        pass


