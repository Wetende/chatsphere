"""
Test Configuration and Fixtures

Provides shared fixtures and configuration for all tests.
Sets up test database, mock services, and common test utilities.
"""

import pytest
from typing import AsyncGenerator, Any
from datetime import datetime, timedelta
from httpx import AsyncClient, ASGITransport
from fastapi import HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy import select

# Import the FastAPI app directly to avoid dependency issues during testing
from fastapi import FastAPI
from presentation.api.user_router import (
    router as user_router,
    get_current_user_id as _get_current_user_id,
    get_current_user_id_optional as _get_current_user_id_optional,
)
from presentation.api.auth_router import router as auth_router
from presentation.api.bot_router import router as bot_router
from presentation.api.conversation_router import router as conversation_router
from presentation.api.document_router import router as document_router
from presentation.api.analytics_router import router as analytics_router
from presentation.api.widget_router import router as widget_router
from presentation.api.import_export_router import router as import_export_router
from presentation.api.websocket_router import router as websocket_router
from composition_root import composition_root

# Dependency providers to override
from composition_root import (
    get_create_user_use_case,
    get_authenticate_user_use_case,
    get_reset_password_use_case,
    get_confirm_password_reset_use_case,
    get_verify_email_use_case,
    get_resend_verification_email_use_case,
    get_get_user_profile_use_case,
    get_update_user_profile_use_case,
    get_change_password_use_case,
    get_deactivate_user_use_case,
    get_get_bot_use_case,
    get_list_bots_use_case,
    get_create_bot_use_case,
    get_update_bot_use_case,
    get_delete_bot_use_case,
    get_create_conversation_use_case,
    get_list_conversations_use_case,
    get_update_conversation_use_case,
    get_delete_conversation_use_case,
    get_database_session,
    get_analytics_service,
)


# Remove custom event_loop fixture - let pytest-asyncio handle it


@pytest.fixture(scope="session")
async def test_app():
    """Create a test FastAPI application."""
    app = FastAPI(
        title="KyroChat Test API",
        description="Test API for KyroChat backend",
        version="1.0.0"
    )

    # Include routers
    app.include_router(auth_router, prefix="/api/v1", tags=["authentication"])
    app.include_router(user_router, prefix="/api/v1", tags=["users"])
    app.include_router(bot_router, prefix="/api/v1", tags=["bots"])
    app.include_router(conversation_router, prefix="/api/v1", tags=["conversations"])
    app.include_router(document_router, prefix="/api/v1", tags=["documents"])
    app.include_router(analytics_router, prefix="/api/v1", tags=["analytics"])
    app.include_router(widget_router, prefix="/api/v1", tags=["widgets"])
    app.include_router(import_export_router, prefix="/api/v1", tags=["bots"])
    app.include_router(websocket_router)

    # Add permissive CORS for tests (preflight OPTIONS)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Generic OPTIONS handler for CORS preflight in tests
    @app.options("/{path:path}")
    async def options_handler(path: str) -> Response:  # pragma: no cover
        return Response(status_code=204)

    # Health and root endpoints (replicate production endpoints for testing)
    @app.get("/health")
    async def _health():
        return {"status": "healthy", "service": "kyrochat-api", "version": "1.0.0", "architecture": "onion"}

    @app.get("/health/ready")
    async def _ready():
        return {"status": "ready", "checks": {"database": "healthy", "external_services": "healthy", "dependencies": "healthy"}}

    @app.get("/health/live")
    async def _live():
        return {"status": "alive"}

    @app.get("/")
    async def _root():
        return {"message": "Welcome to KyroChat API", "version": "1.0.0", "architecture": "onion", "documentation": "/docs", "health": "/health"}

    # ---- Stubs ----
    class _Stub:
        def __init__(self, **kwargs: Any) -> None:
            self.__dict__.update(kwargs)

    # Auth use cases
    class StubCreateUserUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(user_id=123, message="User registered")

    class StubAuthenticateUserUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(
                success=True,
                access_token="test-access",
                refresh_token="test-refresh",
                expires_at=datetime.utcnow() + timedelta(hours=1),
                user_id=1,
            )

    class StubResetPasswordUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Reset email sent")

    class StubConfirmPasswordResetUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Password reset successful")

    class StubVerifyEmailUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Email verified", already_verified=False)

    class StubResendVerificationEmailUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Verification email resent")

    # User use cases
    class StubGetUserProfileUseCase:
        async def execute(self, req: Any) -> Any:
            now = datetime.utcnow()
            return _Stub(
                user_id=1,
                email="test@example.com",
                username="testuser",
                first_name="Test",
                last_name="User",
                is_active=True,
                is_verified=True,
                subscription_status="free",
                created_at=now,
                last_login=now,
            )

    class StubUpdateUserProfileUseCase(StubGetUserProfileUseCase):
        pass

    class StubChangePasswordUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Password changed")

    class StubDeactivateUserUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Deactivated", deactivated_at=datetime.utcnow().isoformat())

    # Bot use cases
    class StubGetBotUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(
                bot_id=getattr(req, "bot_id", 1),
                name="Bot",
                description="Test bot",
                owner_id=1,
                model_name="gemini-pro",
                temperature=0.7,
                system_prompt=None,
                is_public=False,
                configuration={"avatar_url": None, "color_theme": None},
                status="ready",
                welcome_message="Hi",
            )

    class StubListBotsUseCase:
        async def execute(self, req: Any) -> Any:
            bot = _Stub(
                bot_id=1,
                name="Bot",
                description="Test bot",
                owner_id=1,
                model_name="gemini-pro",
                temperature=0.7,
                is_public=False,
                status="ready",
                welcome_message="Hi",
                created_at=datetime.utcnow().isoformat(),
                is_owner=True,
            )
            return _Stub(bots=[bot], total_count=1, has_next=False, has_previous=False)

    class StubCreateBotUseCase:
        async def execute(self, req: Any, owner_id: str) -> Any:
            return _Stub(bot_id=2, name=req.name, description=req.description, owner_id=int(owner_id), model_name=req.model_name, temperature=req.temperature, is_public=req.is_public, message="created")

    class StubUpdateBotUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(
                bot_id=getattr(req, "bot_id", 1),
                name=getattr(req, "name", "Bot"),
                description=getattr(req, "description", "Test bot"),
                model_name=getattr(req, "model_name", "gemini-pro"),
                temperature=getattr(req, "temperature", 0.7),
                configuration=getattr(req, "configuration", {}),
            )

    class StubDeleteBotUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(success=True, message="Deleted", deleted_at=datetime.utcnow().isoformat())

    # Conversation use cases
    class StubCreateConversationUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(conversation_id=10, title=req.title, bot_id=req.bot_id)

    class StubListConversationsUseCase:
        async def execute(self, req: Any) -> Any:
            item = _Stub(conversation_id=10, title="Test Conversation", bot_id=1, is_active=True)
            return _Stub(conversations=[item])

    class StubUpdateConversationUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(conversation_id=req.conversation_id, title=req.title, is_archived=False)

    class StubDeleteConversationUseCase:
        async def execute(self, req: Any) -> Any:
            return _Stub(deleted_at=datetime.utcnow().isoformat(), messages_deleted=0)

    # Analytics service stub
    class StubAnalyticsService:
        async def get_bot_analytics(self, bot_id: int) -> dict:
            return {"bot_id": bot_id, "messages": 5}

        async def get_user_overview(self, user_id: int, days: int) -> dict:
            return {"user_id": user_id, "days": days, "conversations": 1}

    # Document repository stub injection for document router
    class StubDocumentRepository:
        def __init__(self, session: Any) -> None:  # session unused
            self._store: dict[int, Any] = {}
            self._next_id = 1

        async def add(self, data: dict[str, Any]) -> Any:
            model = _Stub(id=self._next_id, **data)
            self._store[self._next_id] = model
            self._next_id += 1
            return model

        async def update_status(self, doc_id: int, status: str, error_message: str | None = None) -> Any:
            model = self._store.get(doc_id)
            if not model:
                return None
            model.status = status
            model.error_message = error_message
            return model

    # Monkeypatch the repository used by the router
    import presentation.api.document_router as _doc_router  # type: ignore
    _doc_router.SqlAlchemyDocumentRepository = StubDocumentRepository  # type: ignore[attr-defined]

    async def _stub_current_user_id(request: Request) -> int:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Authorization token required")
        return 1

    async def _stub_current_user_id_optional(request: Request) -> int | None:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None
        return 1

    async def _stub_db_session() -> AsyncGenerator[Any, None]:
        # Not used because we stub the repository inside the router
        yield object()

    async def _stub_analytics_service() -> StubAnalyticsService:
        return StubAnalyticsService()

    # Dependency overrides
    app.dependency_overrides[_get_current_user_id] = _stub_current_user_id
    app.dependency_overrides[_get_current_user_id_optional] = _stub_current_user_id_optional
    app.dependency_overrides[get_create_user_use_case] = StubCreateUserUseCase
    app.dependency_overrides[get_authenticate_user_use_case] = StubAuthenticateUserUseCase
    app.dependency_overrides[get_reset_password_use_case] = StubResetPasswordUseCase
    app.dependency_overrides[get_confirm_password_reset_use_case] = StubConfirmPasswordResetUseCase
    app.dependency_overrides[get_verify_email_use_case] = StubVerifyEmailUseCase
    app.dependency_overrides[get_resend_verification_email_use_case] = StubResendVerificationEmailUseCase
    app.dependency_overrides[get_get_user_profile_use_case] = StubGetUserProfileUseCase
    app.dependency_overrides[get_update_user_profile_use_case] = StubUpdateUserProfileUseCase
    app.dependency_overrides[get_change_password_use_case] = StubChangePasswordUseCase
    app.dependency_overrides[get_deactivate_user_use_case] = StubDeactivateUserUseCase
    app.dependency_overrides[get_get_bot_use_case] = StubGetBotUseCase
    app.dependency_overrides[get_list_bots_use_case] = StubListBotsUseCase
    app.dependency_overrides[get_create_bot_use_case] = StubCreateBotUseCase
    app.dependency_overrides[get_update_bot_use_case] = StubUpdateBotUseCase
    app.dependency_overrides[get_delete_bot_use_case] = StubDeleteBotUseCase
    app.dependency_overrides[get_create_conversation_use_case] = StubCreateConversationUseCase
    app.dependency_overrides[get_list_conversations_use_case] = StubListConversationsUseCase
    app.dependency_overrides[get_update_conversation_use_case] = StubUpdateConversationUseCase
    app.dependency_overrides[get_delete_conversation_use_case] = StubDeleteConversationUseCase
    app.dependency_overrides[get_database_session] = _stub_db_session
    app.dependency_overrides[get_analytics_service] = _stub_analytics_service

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
    from infrastructure.database.models.base import Base
    # Ensure all models are imported
    import infrastructure.database.models.user  # noqa: F401
    import infrastructure.database.models.bot  # noqa: F401
    import infrastructure.database.models.conversation  # noqa: F401
    import infrastructure.database.models.document  # noqa: F401

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
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
        try:
            # Clean users table to ensure test isolation
            from sqlalchemy import delete
            from infrastructure.database.models.user import UserModel
            await session.execute(delete(UserModel))
            await session.commit()
            yield session
        finally:
            try:
                await session.rollback()
            except Exception:
                pass
            await session.close()


# ----- Integration fixtures expected by tests -----
@pytest.fixture(scope="session")
def auth_service():
    from infrastructure.external_services.jwt_auth_service import JWTAuthService
    return JWTAuthService(secret_key="testsecret", access_token_expire_minutes=60)


@pytest.fixture(scope="session")
def password_service():
    from infrastructure.external_services.bcrypt_password_service import BcryptPasswordService
    return BcryptPasswordService(rounds=4)


@pytest.fixture
def user_factory(password_service):
    from domain.entities.user import User
    from domain.value_objects.email import Email
    from domain.value_objects.username import Username

    class _UserFactory:
        def create_user(self, email: str, username: str, password_hash: str | None = None, **kwargs):
            return User(
                id=None,
                email=Email(email),
                username=Username(username),
                password_hash=password_hash or "",
                first_name=kwargs.get("first_name"),
                last_name=kwargs.get("last_name"),
                is_active=kwargs.get("is_active", True),
                is_verified=kwargs.get("is_verified", False),
                subscription_status=kwargs.get("subscription_status", "free"),
            )

        async def create_user_in_db(self, session: AsyncSession, email: str, username: str, password_hash: str | None = None, **kwargs):
            from infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
            from infrastructure.database.models.user import UserModel
            # Clean up existing conflicting user (email/username unique)
            existing = await session.execute(select(UserModel).where((UserModel.email == email) | (UserModel.username == username)))
            existing_user = existing.scalar_one_or_none()
            if existing_user:
                await session.delete(existing_user)
                await session.flush()
            repo = SqlAlchemyUserRepository(session)
            # Use a strong default password to satisfy strength rules
            strong_default = await password_service.hash_password("StrongPass1!")
            user = self.create_user(email=email, username=username, password_hash=password_hash or strong_default, **kwargs)
            saved = await repo.save(user)
            await session.commit()
            return saved

    return _UserFactory()


@pytest.fixture
def test_unit_of_work(test_session_maker):
    from infrastructure.database.unit_of_work import SqlAlchemyUnitOfWork
    return SqlAlchemyUnitOfWork(test_session_maker)


@pytest.fixture
def authenticate_user_use_case(test_session_maker, auth_service, password_service):
    from infrastructure.database.unit_of_work import SqlAlchemyUnitOfWork
    from infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
    from application.use_cases.user.authenticate_user_use_case import AuthenticateUserUseCase

    uow = SqlAlchemyUnitOfWork(test_session_maker)

    # Create a repository bound to the managed session lazily
    # The use case will open/close transactions via uow
    class _RepoProxy:
        def __init__(self, uow):
            self._uow = uow

        def _repo(self):
            from infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
            return SqlAlchemyUserRepository(self._uow.session)

        async def get_by_email(self, email):
            return await self._repo().get_by_email(email)

        async def save(self, user):
            return await self._repo().save(user)

    repo = _RepoProxy(uow)
    return AuthenticateUserUseCase(user_repository=repo, password_service=password_service, auth_service=auth_service, unit_of_work=uow, require_email_verification=True)


@pytest.fixture
async def test_client(test_app) -> AsyncGenerator[AsyncClient, None]:
    """Create a test HTTP client using ASGITransport (httpx>=0.24)."""
    transport = ASGITransport(app=test_app)  # type: ignore[arg-type]
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client


@pytest.fixture
def mock_composition_root():
    """Create a mock composition root for testing."""
    # This would be implemented to return mock services
    # For now, return the real composition root
    return composition_root


@pytest.fixture
def mock_app():
    """Provide a dummy app fixture for tests that only assert expectations."""
    from unittest.mock import MagicMock
    return MagicMock()


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
    }