"""
Presentation Middleware - Rate Limiting

ASGI middleware that enforces simple rate limiting policies.

Minimal stub for import success.
"""

from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitingMiddleware(BaseHTTPMiddleware):
    """Stub rate limiting middleware."""
    
    async def dispatch(self, request, call_next):
        return await call_next(request)


