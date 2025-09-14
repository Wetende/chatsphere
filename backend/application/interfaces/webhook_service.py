"""
Application Interface - Webhook Service

Defines contract for delivering webhook events with retries and
backoff. Implementations live in infrastructure using httpx.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Dict, Any


class IWebhookService(ABC):
    @abstractmethod
    async def deliver(self, url: str, event: str, payload: Dict[str, Any]) -> bool:
        """Send a webhook POST to url with event headers and JSON payload."""








