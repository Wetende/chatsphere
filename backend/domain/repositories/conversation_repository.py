"""
Domain Repository Interface - ConversationRepository

Defines the contract for persisting and retrieving `Conversation` domain entities
and their messages. This interface belongs to the Domain layer and must not
depend on infrastructure concerns.

Responsibilities:
- Abstract CRUD operations for conversations
- Append and retrieve messages by conversation
- Pagination and filtering contracts
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Optional, Sequence

from domain.entities.conversation import Conversation


class IConversationRepository(ABC):
    """Interface for `Conversation` persistence operations."""

    @abstractmethod
    async def get_by_id(self, conversation_id: int) -> Optional[Conversation]:
        """Return a conversation by id, or None if not found."""

    @abstractmethod
    async def list_by_user(self, user_id: int, limit: int = 50, offset: int = 0) -> Sequence[Conversation]:
        """Return conversations for a user, with pagination."""

    @abstractmethod
    async def add(self, conversation: Conversation) -> Conversation:
        """Persist a new conversation and return it."""

    @abstractmethod
    async def update(self, conversation: Conversation) -> Conversation:
        """Persist changes to a conversation and return it."""

    @abstractmethod
    async def delete(self, conversation_id: int) -> None:
        """Delete a conversation by id. No-op if not found."""


