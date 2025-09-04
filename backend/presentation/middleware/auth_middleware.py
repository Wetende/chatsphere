"""
Presentation Middleware - Authentication

ASGI middleware for JWT-based authentication and request context population.

Responsibilities:
- Validate JWT on protected routes
- Populate request.state with user context
- Handle missing/invalid tokens with consistent JSON errors
- Allow public paths to bypass authentication
"""

import logging
from typing import List

from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

from application.interfaces.auth_service import IAuthService, TokenValidationError


logger = logging.getLogger(__name__)


class AuthMiddleware(BaseHTTPMiddleware):
    """JWT authentication middleware with public path bypass."""

    def __init__(self, app, auth_service: IAuthService, public_paths: List[str] | None = None):
        super().__init__(app)
        self._auth_service = auth_service
        self._public_paths = public_paths or [
            "/docs",
            "/redoc",
            "/openapi.json",
            "/health",
            "/api/v1/auth/",
        ]

    async def dispatch(self, request: Request, call_next):
        path: str = request.url.path

        # Bypass auth for public paths
        if any(path.startswith(p) for p in self._public_paths):
            return await call_next(request)

        # Extract Bearer token
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={
                    "error": "MISSING_TOKEN",
                    "message": "Authorization header with Bearer token is required",
                },
            )

        token = auth_header[7:]

        try:
            claims = self._auth_service.validate_token(token, token_type="access")

            # Populate request state
            sub = claims.get("sub")
            email = claims.get("email")
            username = claims.get("username")

            try:
                request.state.user_id = int(sub) if sub is not None else None
            except Exception:
                request.state.user_id = sub  # fallback to raw
            request.state.user_email = email
            request.state.username = username
            request.state.token_claims = claims

            return await call_next(request)

        except TokenValidationError as e:
            logger.warning("Invalid token on %s: %s", path, e)
            return JSONResponse(
                status_code=401,
                content={
                    "error": "INVALID_TOKEN",
                    "message": "Invalid or expired token",
                },
            )
        except Exception as e:
            logger.error("Authentication error on %s: %s", path, e)
            return JSONResponse(
                status_code=500,
                content={
                    "error": "AUTH_ERROR",
                    "message": "Authentication service error",
                },
            )


