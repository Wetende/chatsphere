"""
Presentation Middleware - Authentication

ASGI middleware for JWT-based authentication and request context population.

Minimal stub for import success.
"""

from starlette.middleware.base import BaseHTTPMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    """Stub auth middleware."""
    
    async def dispatch(self, request, call_next):
        return await call_next(request)


