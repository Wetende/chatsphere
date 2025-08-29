"""
User Management API Router (Stub)

Minimal router to allow application startup/imports. Full endpoints will be
implemented as use cases and DTOs are finalized.
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["users"],
)
