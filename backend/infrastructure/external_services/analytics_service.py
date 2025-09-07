"""
Infrastructure - Analytics Service Implementation

Implements IAnalyticsService using SQLAlchemy models for efficient
aggregation queries. Returns plain dicts for presentation.
"""

from __future__ import annotations

from typing import Dict, Any
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from application.interfaces.analytics_service import IAnalyticsService
from infrastructure.database.models.bot import BotModel
from infrastructure.database.models.conversation import ConversationModel, MessageModel


class SqlAlchemyAnalyticsService(IAnalyticsService):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_bot_analytics(self, bot_id: int) -> Dict[str, Any]:
        # Conversations count
        conv_count_stmt = select(func.count()).select_from(ConversationModel).where(ConversationModel.bot_id == bot_id)
        conv_count = (await self._session.execute(conv_count_stmt)).scalar_one()

        # Messages count and tokens
        msg_count_stmt = select(func.count(), func.coalesce(func.sum(MessageModel.tokens_used), 0)).where(
            MessageModel.conversation_id.in_(
                select(ConversationModel.id).where(ConversationModel.bot_id == bot_id)
            )
        )
        msg_count, total_tokens = (await self._session.execute(msg_count_stmt)).one()

        # Average rating
        rating_stmt = select(func.coalesce(func.avg(ConversationModel.rating), 0.0)).where(
            ConversationModel.bot_id == bot_id
        )
        avg_rating = float((await self._session.execute(rating_stmt)).scalar_one())

        return {
            "bot_id": bot_id,
            "conversations": int(conv_count or 0),
            "messages": int(msg_count or 0),
            "tokens_used": int(total_tokens or 0),
            "average_rating": avg_rating,
        }

    async def get_user_overview(self, user_id: int, days: int = 7) -> Dict[str, Any]:
        # Bots owned
        bots_stmt = select(func.count()).select_from(BotModel).where(BotModel.owner_id == user_id)
        bot_count = (await self._session.execute(bots_stmt)).scalar_one()

        # Conversations in window
        conv_stmt = select(func.count()).select_from(ConversationModel).where(ConversationModel.user_id == user_id)
        conv_count = (await self._session.execute(conv_stmt)).scalar_one()

        # Messages in window
        msg_stmt = select(func.count()).where(
            MessageModel.conversation_id.in_(
                select(ConversationModel.id).where(ConversationModel.user_id == user_id)
            )
        )
        msg_count = (await self._session.execute(msg_stmt)).scalar_one()

        return {
            "user_id": user_id,
            "bots": int(bot_count or 0),
            "conversations": int(conv_count or 0),
            "messages": int(msg_count or 0),
            "window_days": days,
        }





