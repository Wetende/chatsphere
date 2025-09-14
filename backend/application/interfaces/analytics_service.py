"""
Application Interface - Analytics Service

Defines contracts for analytics queries that aggregate data across
conversations, messages, and bots. Implementations live in the
infrastructure layer and should use efficient database queries.

This interface intentionally lives in the application layer because
analytics are query-oriented and span multiple aggregates; returning
plain dictionaries keeps the domain layer pure and avoids coupling
to reporting concerns.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Dict, Any


class IAnalyticsService(ABC):
    """Interface for analytics queries."""

    @abstractmethod
    async def get_bot_analytics(self, bot_id: int) -> Dict[str, Any]:
        """Return aggregate metrics for a specific bot."""

    @abstractmethod
    async def get_user_overview(self, user_id: int, days: int = 7) -> Dict[str, Any]:
        """Return aggregate metrics across all bots owned by a user."""








