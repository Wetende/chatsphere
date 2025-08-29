"""
Presentation - Bot Router

FastAPI router for bot CRUD operations and management endpoints.
Delegates to application use cases and returns HTTP-friendly responses.

Minimal stub for import success.
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/bots",
    tags=["bots"]
)


