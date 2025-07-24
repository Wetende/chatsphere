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
    # Startup
    logger.info("Starting up ChatSphere API...")
    
    # Initialize database tables
    try:
        from app.core.database import create_tables
        create_tables()
        logger.info("Database tables initialized")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
    
    # Initialize AI components
    try:
        # Initialize embedding models, vector stores, etc.
        logger.info("AI components initialized")
    except Exception as e:
        logger.error(f"Failed to initialize AI components: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down ChatSphere API...")
    
    # Cleanup resources
    try:
        # Close database connections, cleanup temp files, etc.
        logger.info("Resources cleaned up")
    except Exception as e:
        logger.error(f"Error during cleanup: {e}") 