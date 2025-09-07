"""
Infrastructure - Webhook Service Implementation

Delivers webhook events with retry and exponential backoff using httpx.
"""

from __future__ import annotations

import asyncio
from typing import Dict, Any

import httpx

from application.interfaces.webhook_service import IWebhookService


class HttpxWebhookService(IWebhookService):
    def __init__(self, timeout_seconds: int = 10, max_attempts: int = 3) -> None:
        self._timeout = timeout_seconds
        self._max_attempts = max_attempts

    async def deliver(self, url: str, event: str, payload: Dict[str, Any]) -> bool:
        attempt = 0
        backoff = 1.0
        async with httpx.AsyncClient(timeout=self._timeout) as client:
            while attempt < self._max_attempts:
                attempt += 1
                try:
                    resp = await client.post(
                        url,
                        json=payload,
                        headers={
                            "Content-Type": "application/json",
                            "X-Kyro-Event": event,
                        },
                    )
                    if 200 <= resp.status_code < 300:
                        return True
                except Exception:
                    pass
                await asyncio.sleep(backoff)
                backoff *= 2
        return False





