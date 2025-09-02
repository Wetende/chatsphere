"""
Test Configuration and Fixtures

Provides shared fixtures and configuration for all tests.
Sets up test database, mock services, and common test utilities.
"""

import pytest
import asyncio
from typing import AsyncGenerator, Generator
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy import event

# Import the FastAPI app directly to avoid dependency issues during testing
from fastapi import FastAPI
from presentation.api.user_router import router as user_router
from presentation.api.auth_router import router as auth_router
from presentation.api.bot_router import router as bot_router
from composition_root import composition_root


# Remove custom event_loop fixture - let pytest-asyncio handle it


@pytest.fixture(scope="session")
async def test_app():
    """Create a test FastAPI application."""
    from fastapi import FastAPI

    app = FastAPI(
        title="KyroChat Test API",
        description="Test API for KyroChat backend",
        version="1.0.0"
    )

    # Include routers
    app.include_router(auth_router, prefix="/api/v1", tags=["authentication"])
    app.include_router(user_router, prefix="/api/v1", tags=["users"])
    app.include_router(bot_router, prefix="/api/v1", tags=["bots"])

    return app


@pytest.fixture(scope="session")
async def test_engine():
    """Create test database engine."""
    engine = create_async_engine(
        "sqlite+aiosqlite:///./test_kyrochat.db",
        echo=False,
        pool_pre_ping=True
    )
    
    # Create tables
    # In a real implementation, we would run migrations here
    # For now, we'll use a placeholder
    
    yield engine
    
    # Cleanup
    await engine.dispose()


@pytest.fixture(scope="session")
async def test_session_maker(test_engine):
    """Create test session maker."""
    return async_sessionmaker(
        test_engine,
        class_=AsyncSession,
        expire_on_commit=False
    )


@pytest.fixture
async def test_session(test_session_maker) -> AsyncGenerator[AsyncSession, None]:
    """Create a test database session."""
    async with test_session_maker() as session:
        # Start a transaction
        transaction = await session.begin()
        
        yield session
        
        # Rollback the transaction to clean up
        await transaction.rollback()


@pytest.fixture
async def test_client(test_app) -> AsyncGenerator[AsyncClient, None]:
    """Create a test HTTP client."""
    async with AsyncClient(app=test_app, base_url="http://test") as client:
        yield client


@pytest.fixture
def mock_composition_root():
    """Create a mock composition root for testing."""
    # This would be implemented to return mock services
    # For now, return the real composition root
    return composition_root


@pytest.fixture
async def test_user_data():
    """Create test user data."""
    return {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123",
        "first_name": "Test",
        "last_name": "User"
    }


@pytest.fixture
async def test_bot_data():
    """Create test bot data."""
    return {
        "name": "Test Bot",
        "description": "A test bot for unit testing",
        "model_name": "gemini-2.0-flash-exp",
        "temperature": 0.7,
        "is_public": False
    }


@pytest.fixture
async def test_conversation_data():
    """Create test conversation data."""
    return {
        "title": "Test Conversation",
        "initial_message": "Hello, test bot!"
    }


@pytest.fixture
def authenticated_headers():
    """Create headers for authenticated requests."""
    # In a real implementation, this would generate a valid JWT token
    return {
        "Authorization": "Bearer test-jwt-token",
        "Content-Type": "application/json"
    }