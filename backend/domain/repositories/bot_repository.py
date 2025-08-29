"""
Domain Repository Interface - BotRepository

Defines the contract for persisting and retrieving `Bot` domain entities.
This interface lives in the Domain layer and must not depend on infrastructure.

Responsibilities:
- Abstract CRUD operations for `Bot`
- Keep domain pure and infrastructure-agnostic
- Enable dependency inversion via interface
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Optional, Sequence

from domain.entities.bot import Bot


class IBotRepository(ABC):
    """Interface for `Bot` persistence operations."""

    @abstractmethod
    async def get_by_id(self, bot_id: str) -> Optional[Bot]:
        """Return a `Bot` by its identifier, or None if not found."""

    @abstractmethod
    async def get_by_owner(self, owner_id: str, limit: int = 50, offset: int = 0) -> Sequence[Bot]:
        """Return bots owned by a specific user, with pagination."""

    @abstractmethod
    async def add(self, bot: Bot) -> Bot:
        """Persist a new `Bot` and return the stored entity."""

    @abstractmethod
    async def update(self, bot: Bot) -> Bot:
        """Persist changes to an existing `Bot` and return it."""

    @abstractmethod
    async def delete(self, bot_id: str) -> None:
        """Delete a `Bot` by id. No-op if not found."""


