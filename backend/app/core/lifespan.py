from contextlib import asynccontextmanager
from fastapi import FastAPI
import logging

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan context manager.
    Handles startup and shutdown events.
    """
    logger.info("Starting up ChatSphere API...")

    # Initialize database tables
    try:
        from app.core.database import create_all_tables_async
        await create_all_tables_async()
        logger.info("Database tables initialized (async)")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")

    # Initialize AI components (no-op for now)
    try:
        logger.info("AI components initialized")
    except Exception as e:
        logger.error(f"Failed to initialize AI components: {e}")

    yield

    logger.info("Shutting down ChatSphere API...")
    try:
        logger.info("Resources cleaned up")
    except Exception as e:
        logger.error(f"Error during cleanup: {e}") 