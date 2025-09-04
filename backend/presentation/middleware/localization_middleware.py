"""
Localization Middleware

Parses Accept-Language header and stores the preferred locale on
request.state.locale for downstream handlers. Provides a simple
fallback to 'en'.
"""

from __future__ import annotations

from typing import List
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


SUPPORTED_LOCALES: List[str] = ["en", "es", "fr", "de"]


def _negotiate_locale(accept_language: str | None) -> str:
    if not accept_language:
        return "en"
    # Very simple parsing: split by comma and dash, prefer primary tag
    parts = [p.strip() for p in accept_language.split(",") if p.strip()]
    for p in parts:
        primary = p.split(";")[0].split("-")[0].lower()
        if primary in SUPPORTED_LOCALES:
            return primary
    return "en"


class LocalizationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        locale = _negotiate_locale(request.headers.get("Accept-Language"))
        request.state.locale = locale
        response = await call_next(request)
        response.headers["Content-Language"] = locale
        return response



