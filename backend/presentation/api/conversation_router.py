"""
Presentation - Conversation Router

FastAPI router for conversation endpoints (start, list, send message).
Delegates to application use cases and returns HTTP-friendly responses.

Minimal stub for import success.
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/conversations",
    tags=["conversations"]
)


