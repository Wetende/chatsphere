"""
Infrastructure Repository - SQLAlchemyBotRepository

Concrete implementation of the `IBotRepository` using SQLAlchemy AsyncSession.
Maps between domain `Bot` entities and ORM `BotModel`.
"""

import json
import logging
from typing import Optional, Sequence, Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from domain.repositories.bot_repository import IBotRepository
from domain.entities.bot import Bot
from domain.value_objects.bot_id import BotId
from domain.value_objects.user_id import UserId
from infrastructure.database.models.bot import BotModel


logger = logging.getLogger(__name__)


class SqlAlchemyBotRepository(IBotRepository):
    """SQLAlchemy implementation for Bot persistence."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, bot_id: Any) -> Optional[Bot]:
        try:
            normalized_id = bot_id.value if hasattr(bot_id, "value") else int(bot_id)
            stmt = select(BotModel).where(BotModel.id == normalized_id)
            result = await self.session.execute(stmt)
            model: Optional[BotModel] = result.scalar_one_or_none()
            return self._to_domain(model) if model else None
        except Exception as e:
            logger.error("Error fetching bot by id %s: %s", bot_id, e)
            return None

    async def get_by_owner(self, owner_id: Any, limit: int = 50, offset: int = 0) -> Sequence[Bot]:
        try:
            normalized_owner = owner_id.value if hasattr(owner_id, "value") else int(owner_id)
            stmt = (
                select(BotModel)
                .where(BotModel.owner_id == normalized_owner)
                .order_by(BotModel.created_at.desc())
                .limit(limit)
                .offset(offset)
            )
            result = await self.session.execute(stmt)
            models = list(result.scalars().all())
            return [self._to_domain(m) for m in models]
        except Exception as e:
            logger.error("Error fetching bots by owner %s: %s", owner_id, e)
            return []

    async def add(self, bot: Bot) -> Bot:
        try:
            model = self._to_model(bot)
            self.session.add(model)
            await self.session.flush()
            await self.session.refresh(model)
            return self._to_domain(model)
        except SQLAlchemyError as e:
            logger.error("Error adding bot: %s", e)
            await self.session.rollback()
            raise

    async def update(self, bot: Bot) -> Bot:
        try:
            normalized_id = bot.id.value if hasattr(bot.id, "value") else int(bot.id)
            stmt = select(BotModel).where(BotModel.id == normalized_id)
            result = await self.session.execute(stmt)
            model: Optional[BotModel] = result.scalar_one_or_none()
            if not model:
                raise ValueError(f"Bot {normalized_id} not found")

            # Update fields
            model.name = bot.name
            model.description = bot.description
            model.model_name = bot.model_type
            model.temperature = bot.temperature
            model.system_prompt = bot.system_prompt
            model.is_public = bot.is_public
            model.is_active = bot.is_active
            # Optional fields
            model.max_tokens = bot.configuration.get("max_tokens") if bot.configuration else model.max_tokens
            if bot.configuration:
                if "avatar_url" in bot.configuration:
                    model.avatar_url = bot.configuration.get("avatar_url")
                if "color_theme" in bot.configuration:
                    model.color_theme = bot.configuration.get("color_theme")

            await self.session.flush()
            await self.session.refresh(model)
            return self._to_domain(model)
        except SQLAlchemyError as e:
            logger.error("Error updating bot: %s", e)
            await self.session.rollback()
            raise

    async def delete(self, bot_id: Any) -> None:
        try:
            normalized_id = bot_id.value if hasattr(bot_id, "value") else int(bot_id)
            stmt = select(BotModel).where(BotModel.id == normalized_id)
            result = await self.session.execute(stmt)
            model: Optional[BotModel] = result.scalar_one_or_none()
            if model:
                await self.session.delete(model)
                await self.session.flush()
        except SQLAlchemyError as e:
            logger.error("Error deleting bot %s: %s", bot_id, e)
            await self.session.rollback()
            raise

    def _to_domain(self, model: BotModel) -> Bot:
        """Map ORM model to domain entity."""
        config: dict[str, Any] = {}
        if model.max_tokens is not None:
            config["max_tokens"] = model.max_tokens
        # Parse tags/capabilities if JSON strings
        try:
            if model.capabilities:
                config["capabilities"] = json.loads(model.capabilities)
            if model.tags:
                config["tags"] = json.loads(model.tags)
        except Exception:
            pass
        if model.avatar_url:
            config["avatar_url"] = model.avatar_url
        if model.color_theme:
            config["color_theme"] = model.color_theme

        return Bot(
            id=BotId(model.id),
            owner_id=UserId(model.owner_id),
            name=model.name,
            description=model.description,
            welcome_message="Hi! How can I help you today?",
            model_type=model.model_name,
            temperature=model.temperature,
            system_prompt=model.system_prompt,
            configuration=config,
            is_public=model.is_public,
            is_active=model.is_active,
            status="active" if model.is_active else "inactive",
            created_at=model.created_at,
            updated_at=model.updated_at,
        )

    def _to_model(self, bot: Bot) -> BotModel:
        """Map domain entity to ORM model."""
        max_tokens = None
        avatar_url = None
        color_theme = None
        if bot.configuration and isinstance(bot.configuration, dict):
            max_tokens = bot.configuration.get("max_tokens")
            avatar_url = bot.configuration.get("avatar_url")
            color_theme = bot.configuration.get("color_theme")

        model = BotModel(
            name=bot.name,
            description=bot.description,
            owner_id=bot.owner_id.value if hasattr(bot.owner_id, "value") else int(bot.owner_id),
            model_name=bot.model_type,
            temperature=bot.temperature,
            max_tokens=max_tokens,
            system_prompt=bot.system_prompt,
            is_public=bot.is_public,
            is_active=bot.is_active,
            knowledge_base_id=None,
            capabilities=None,
            usage_count=0,
            max_daily_usage=None,
            avatar_url=avatar_url,
            color_theme=color_theme,
            category=None,
            tags=None,
            total_conversations=0,
            average_rating=None,
            total_ratings=0,
        )

        # Set id if present
        if bot.id and not bot.id.is_new():
            model.id = bot.id.value

        return model