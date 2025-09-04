"""
Infrastructure Repository - SqlAlchemyConversationRepository

Concrete implementation of the `IConversationRepository` using SQLAlchemy AsyncSession.
Maps between domain `Conversation` entities and ORM `ConversationModel`.
"""

import logging
from typing import Optional, Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from domain.repositories.conversation_repository import IConversationRepository
from domain.entities.conversation import Conversation
from domain.value_objects.conversation_id import ConversationId
from domain.value_objects.bot_id import BotId
from infrastructure.database.models.conversation import ConversationModel


logger = logging.getLogger(__name__)


class SqlAlchemyConversationRepository(IConversationRepository):
    """SQLAlchemy implementation for Conversation persistence."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, conversation_id) -> Optional[Conversation]:
        try:
            normalized_id = int(conversation_id.value) if hasattr(conversation_id, "value") else int(conversation_id)
            stmt = select(ConversationModel).where(ConversationModel.id == normalized_id)
            result = await self.session.execute(stmt)
            model: Optional[ConversationModel] = result.scalar_one_or_none()
            return self._to_domain(model) if model else None
        except Exception as e:
            logger.error("Error fetching conversation by id %s: %s", conversation_id, e)
            return None

    async def list_by_user(self, user_id, limit: int = 50, offset: int = 0) -> Sequence[Conversation]:
        try:
            normalized_user = int(getattr(user_id, "value", user_id))
            stmt = (
                select(ConversationModel)
                .where(ConversationModel.user_id == normalized_user)
                .order_by(ConversationModel.created_at.desc())
                .limit(limit)
                .offset(offset)
            )
            result = await self.session.execute(stmt)
            models = list(result.scalars().all())
            return [self._to_domain(m) for m in models]
        except Exception as e:
            logger.error("Error listing conversations for user %s: %s", user_id, e)
            return []

    async def add(self, conversation: Conversation) -> Conversation:
        try:
            model = self._to_model(conversation)
            self.session.add(model)
            await self.session.flush()
            await self.session.refresh(model)
            return self._to_domain(model)
        except SQLAlchemyError as e:
            logger.error("Error adding conversation: %s", e)
            await self.session.rollback()
            raise

    async def update(self, conversation: Conversation) -> Conversation:
        try:
            normalized_id = int(getattr(conversation.id, "value", conversation.id))
            stmt = select(ConversationModel).where(ConversationModel.id == normalized_id)
            result = await self.session.execute(stmt)
            model: Optional[ConversationModel] = result.scalar_one_or_none()
            if not model:
                raise ValueError(f"Conversation {normalized_id} not found")

            model.title = conversation.title
            model.is_active = conversation.is_active
            model.message_count = conversation.message_count
            model.context_summary = conversation.metadata.get("context_summary") if conversation.metadata else None
            # last_message_at / ended_at handled by use case timestamps
            model.rating = None
            model.feedback = None

            await self.session.flush()
            await self.session.refresh(model)
            return self._to_domain(model)
        except SQLAlchemyError as e:
            logger.error("Error updating conversation: %s", e)
            await self.session.rollback()
            raise

    async def delete(self, conversation_id) -> None:
        try:
            normalized_id = conversation_id.value if hasattr(conversation_id, "value") else int(conversation_id)
            stmt = select(ConversationModel).where(ConversationModel.id == normalized_id)
            result = await self.session.execute(stmt)
            model: Optional[ConversationModel] = result.scalar_one_or_none()
            if model:
                await self.session.delete(model)
                await self.session.flush()
        except SQLAlchemyError as e:
            logger.error("Error deleting conversation %s: %s", conversation_id, e)
            await self.session.rollback()
            raise

    def _to_domain(self, model: ConversationModel) -> Conversation:
        return Conversation(
            id=ConversationId(model.id),
            bot_id=BotId(model.bot_id),
            user_session_id=str(model.user_id),
            title=model.title or "New Conversation",
            metadata={"context_summary": model.context_summary} if model.context_summary else {},
            is_active=model.is_active,
            is_archived=False,  # model doesn't have explicit archived flag
            message_count=model.message_count,
            started_at=model.created_at,
            ended_at=None,
            last_message_at=None,
        )

    def _to_model(self, conversation: Conversation) -> ConversationModel:
        return ConversationModel(
            title=conversation.title,
            user_id=int(conversation.user_session_id) if conversation.user_session_id else 0,
            bot_id=int(conversation.bot_id.value) if hasattr(conversation.bot_id, "value") else int(conversation.bot_id),
            is_active=conversation.is_active,
            is_pinned=False,
            message_count=conversation.message_count,
            total_tokens_used=0,
            context_summary=conversation.metadata.get("context_summary") if conversation.metadata else None,
            settings=None,
            rating=None,
            feedback=None,
        )


