"""
Shared Test Fixtures and Configuration

Provides common test setup, fixtures, and utilities for the test suite.
Includes database setup, mock services, and test data factories.
"""

import asyncio
import pytest
import pytest_asyncio
from typing import AsyncGenerator, Generator
from unittest.mock import AsyncMock, MagicMock

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy import event

# Import our models and base
from infrastructure.database.models.base import Base
from infrastructure.database.models.user import UserModel
from infrastructure.database.models.bot import BotModel
from infrastructure.database.models.conversation import ConversationModel, MessageModel

# Import domain entities and value objects
from domain.entities.user import User
from domain.value_objects.user_id import UserId
from domain.value_objects.email import Email
from domain.value_objects.username import Username

# Import services and repositories
from infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
from infrastructure.external_services.bcrypt_password_service import BcryptPasswordService
from infrastructure.external_services.jwt_auth_service import JWTAuthService
from infrastructure.database.unit_of_work import SqlAlchemyUnitOfWork

# Import use cases
from application.use_cases.user.authenticate_user_use_case import AuthenticateUserUseCase

# Import settings
from infrastructure.config.settings import Settings


@pytest.fixture(scope="session")
def event_loop() -> Generator[asyncio.AbstractEventLoop, None, None]:
    """Create event loop for session scope."""
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest_asyncio.fixture(scope="function")
async def test_engine():
    """Create test database engine with in-memory SQLite."""
    engine = create_async_engine(
        "sqlite+aiosqlite:///:memory:",
        echo=False,
        pool_pre_ping=True
    )
    
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield engine
    
    # Cleanup
    await engine.dispose()


@pytest_asyncio.fixture(scope="function")
async def test_session_maker(test_engine):
    """Create test session maker."""
    return async_sessionmaker(
        test_engine,
        class_=AsyncSession,
        expire_on_commit=False
    )


@pytest_asyncio.fixture(scope="function")
async def test_session(test_session_maker) -> AsyncGenerator[AsyncSession, None]:
    """Create test database session."""
    async with test_session_maker() as session:
        yield session


@pytest_asyncio.fixture(scope="function")
async def test_unit_of_work(test_session_maker):
    """Create test unit of work."""
    return SqlAlchemyUnitOfWork(test_session_maker)


@pytest.fixture
def test_settings():
    """Create test settings."""
    return Settings(
        database=Settings.DatabaseSettings(
            url="sqlite+aiosqlite:///:memory:",
            pool_size=1,
            max_overflow=0
        ),
        security=Settings.SecuritySettings(
            secret_key="test-secret-key",
            algorithm="HS256"
        ),
        ai=Settings.AISettings(
            google_ai_api_key="test-api-key",
            default_ai_model="gemini-pro"
        ),
        email=Settings.EmailSettings(
            smtp_host="localhost",
            smtp_port=587,
            smtp_username="test@example.com",
            smtp_password="test-password"
        )
    )


# Repository fixtures
@pytest_asyncio.fixture
async def user_repository(test_session) -> SqlAlchemyUserRepository:
    """Create test user repository."""
    return SqlAlchemyUserRepository(test_session)


# Service fixtures
@pytest.fixture
def password_service() -> BcryptPasswordService:
    """Create test password service with faster rounds."""
    return BcryptPasswordService(rounds=4)  # Faster for tests


@pytest.fixture
def auth_service() -> JWTAuthService:
    """Create test auth service."""
    return JWTAuthService(
        secret_key="test-secret-key",
        algorithm="HS256",
        access_token_expire_minutes=30,
        refresh_token_expire_days=7
    )


# Mock services for external dependencies
@pytest.fixture
def mock_email_service():
    """Create mock email service."""
    mock = AsyncMock()
    mock.send_email.return_value = True
    mock.send_welcome_email.return_value = True
    return mock


@pytest.fixture
def mock_ai_service():
    """Create mock AI service."""
    mock = AsyncMock()
    mock.initialize.return_value = None
    mock.chat_completion.return_value = "Mock AI response"
    mock.embed_text.return_value = [0.1, 0.2, 0.3]  # Mock embedding
    return mock


# Use case fixtures
@pytest_asyncio.fixture
async def authenticate_user_use_case(
    user_repository, 
    password_service, 
    auth_service, 
    test_unit_of_work
):
    """Create authenticate user use case with real dependencies."""
    return AuthenticateUserUseCase(
        user_repository=user_repository,
        password_service=password_service,
        auth_service=auth_service,
        unit_of_work=test_unit_of_work
    )


# Test data factories
class UserFactory:
    """Factory for creating test users."""
    
    @staticmethod
    def create_user(
        email: str = "test@example.com",
        username: str = "testuser",
        password_hash: str = "hashed_password",
        is_active: bool = True,
        is_verified: bool = True
    ) -> User:
        """Create a test user entity."""
        return User(
            id=UserId("550e8400-e29b-41d4-a716-446655440000"),
            email=Email(email),
            username=Username(username),
            password_hash=password_hash,
            first_name="Test",
            last_name="User",
            is_active=is_active,
            is_verified=is_verified,
            subscription_status="free"
        )
    
    @staticmethod
    async def create_user_in_db(session: AsyncSession, **kwargs) -> UserModel:
        """Create a test user in the database."""
        user_data = {
            "email": kwargs.get("email", "test@example.com"),
            "username": kwargs.get("username", "testuser"),
            "password_hash": kwargs.get("password_hash", "hashed_password"),
            "first_name": kwargs.get("first_name", "Test"),
            "last_name": kwargs.get("last_name", "User"),
            "is_active": kwargs.get("is_active", True),
            "is_verified": kwargs.get("is_verified", True),
            "subscription_status": kwargs.get("subscription_status", "free")
        }
        
        user_model = UserModel(**user_data)
        session.add(user_model)
        await session.commit()
        await session.refresh(user_model)
        return user_model


@pytest.fixture
def user_factory():
    """Provide user factory."""
    return UserFactory


# Helper functions for tests
def assert_user_equals(user1: User, user2: User):
    """Assert that two users are equal."""
    assert str(user1.email) == str(user2.email)
    assert str(user1.username) == str(user2.username)
    assert user1.is_active == user2.is_active
    assert user1.is_verified == user2.is_verified


@pytest.fixture
def assert_helpers():
    """Provide test helper functions."""
    return {
        "assert_user_equals": assert_user_equals
    }
