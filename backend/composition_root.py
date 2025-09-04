"""
Composition Root - Dependency Injection Container

Central place for configuring and wiring up all dependencies in the onion architecture.
Follows the dependency injection pattern to maintain loose coupling between layers.

Key Responsibilities:
- Configure all service dependencies
- Wire up repository implementations
- Set up external service adapters
- Manage singleton vs transient lifetimes
- Provide factory methods for use cases
- Handle configuration and settings injection

Dependency Graph:
- Presentation → Application → Domain ← Infrastructure
- All dependencies flow inward toward domain
- Infrastructure implements domain interfaces
- Application orchestrates domain services
- Presentation handles HTTP concerns only

Lifetime Management:
- Singleton: Database connections, caches, configuration
- Scoped: Repository instances, database sessions, HTTP requests
- Transient: Use cases, services, value objects

Configuration Sources:
- Environment variables
- Configuration files
- Feature flags
- External configuration services

Service Categories:
- Repositories: Data access implementations
- External Services: Third-party API clients
- Application Services: Use case orchestration
- Infrastructure Services: Cross-cutting concerns
- Domain Services: Pure business logic
"""

from __future__ import annotations

from typing import Dict, Any, AsyncGenerator
from functools import lru_cache
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

# Domain interfaces
from domain.repositories.user_repository import IUserRepository
from domain.repositories.bot_repository import IBotRepository
from domain.repositories.conversation_repository import IConversationRepository

# Application interfaces
from application.interfaces.email_service import IEmailService
from application.interfaces.password_service import IPasswordService
from application.interfaces.unit_of_work import IUnitOfWork
from application.interfaces.ai_service import IAIService
from application.interfaces.auth_service import IAuthService
from application.interfaces.analytics_service import IAnalyticsService

# Application use cases
from application.use_cases.user.create_user_use_case import CreateUserUseCase
from application.use_cases.user.authenticate_user_use_case import AuthenticateUserUseCase
from application.use_cases.user.get_user_profile_use_case import GetUserProfileUseCase
from application.use_cases.user.update_user_profile_use_case import UpdateUserProfileUseCase
from application.use_cases.user.change_password_use_case import ChangePasswordUseCase
from application.use_cases.user.deactivate_user_use_case import DeactivateUserUseCase
from application.use_cases.user.reset_password_use_case import ResetPasswordUseCase
from application.use_cases.user.confirm_password_reset_use_case import ConfirmPasswordResetUseCase
from application.use_cases.user.verify_email_use_case import VerifyEmailUseCase, ResendVerificationEmailUseCase
from application.use_cases.bot.create_bot_use_case import CreateBotUseCase
from application.use_cases.bot.get_bot_use_case import GetBotUseCase
from application.use_cases.bot.list_bots_use_case import ListBotsUseCase
from application.use_cases.bot.update_bot_use_case import UpdateBotUseCase
from application.use_cases.bot.delete_bot_use_case import DeleteBotUseCase
from application.use_cases.conversation.send_message_use_case import SendMessageUseCase
from application.use_cases.conversation.create_conversation_use_case import CreateConversationUseCase
from application.use_cases.conversation.list_conversations_use_case import ListConversationsUseCase
from application.use_cases.conversation.update_conversation_use_case import UpdateConversationUseCase
from application.use_cases.conversation.delete_conversation_use_case import DeleteConversationUseCase

# Infrastructure implementations
from infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository
from infrastructure.repositories.sqlalchemy_bot_repository import SqlAlchemyBotRepository
from infrastructure.external_services.smtp_email_service import SmtpEmailService
from infrastructure.external_services.bcrypt_password_service import BcryptPasswordService
from infrastructure.external_services.gemini_ai_service import GeminiAIService
from infrastructure.external_services.jwt_auth_service import JWTAuthService
from infrastructure.external_services.analytics_service import SqlAlchemyAnalyticsService
from application.interfaces.webhook_service import IWebhookService
from infrastructure.external_services.webhook_service import HttpxWebhookService
from infrastructure.database.unit_of_work import SqlAlchemyUnitOfWork
from infrastructure.config.settings import Settings


class CompositionRoot:
    """Dependency injection container for the application."""
    
    def __init__(self):
        """Initialize composition root with configuration."""
        self.settings = Settings()
        self._async_engine = None
        self._session_maker = None
        self._repositories: Dict[str, Any] = {}
        self._services: Dict[str, Any] = {}
        self._use_cases: Dict[str, Any] = {}
    
    async def setup(self) -> None:
        """Setup async resources and connections."""
        # Initialize database engine and session maker
        # Convert sync URL to async for SQLAlchemy
        async_url = self.settings.database.url.replace("sqlite://", "sqlite+aiosqlite://")
        
        self._async_engine = create_async_engine(
            async_url,
            echo=False,  # Can be configured from settings later
            pool_pre_ping=True,
            pool_recycle=300
        )
        
        self._session_maker = async_sessionmaker(
            self._async_engine,
            class_=AsyncSession,
            expire_on_commit=False
        )
        
        # Setup other async resources
        await self._setup_external_services()
    
    async def teardown(self) -> None:
        """Cleanup async resources."""
        if self._async_engine:
            await self._async_engine.dispose()
    
    # Repository Factory Methods
    
    def get_user_repository(self, session: AsyncSession) -> IUserRepository:
        """Create user repository with database session."""
        return SqlAlchemyUserRepository(session)
    
    def get_bot_repository(self, session: AsyncSession) -> IBotRepository:
        """Create bot repository with database session."""
        return SqlAlchemyBotRepository(session)
    
    def get_conversation_repository(self, session: AsyncSession) -> IConversationRepository:
        """Create conversation repository with database session."""
        from infrastructure.repositories.sqlalchemy_conversation_repository import SqlAlchemyConversationRepository
        return SqlAlchemyConversationRepository(session)
    
    # Service Factory Methods
    
    @lru_cache()
    def get_email_service(self) -> IEmailService:
        """Get email service singleton."""
        if 'email_service' not in self._services:
            self._services['email_service'] = SmtpEmailService(
                smtp_host=self.settings.email.smtp_host,
                smtp_port=self.settings.email.smtp_port,
                smtp_username=self.settings.email.smtp_username,
                smtp_password=self.settings.email.smtp_password,
                use_tls=self.settings.email.smtp_use_tls,
                default_from_email=self.settings.email.default_from_email
            )
        return self._services['email_service']
    
    @lru_cache()
    def get_password_service(self) -> IPasswordService:
        """Get password service singleton."""
        if 'password_service' not in self._services:
            self._services['password_service'] = BcryptPasswordService()
        return self._services['password_service']
    
    @lru_cache()
    def get_ai_service(self) -> IAIService:
        """Get AI service singleton."""
        if 'ai_service' not in self._services:
            self._services['ai_service'] = GeminiAIService(
                api_key=self.settings.ai.google_ai_api_key,
                model_name=self.settings.ai.default_ai_model
            )
        return self._services['ai_service']

    @lru_cache()
    def get_webhook_service(self) -> IWebhookService:
        """Get webhook delivery service singleton."""
        if 'webhook_service' not in self._services:
            self._services['webhook_service'] = HttpxWebhookService()
        return self._services['webhook_service']
    
    @lru_cache()
    def get_auth_service(self) -> IAuthService:
        """Get auth service singleton."""
        if 'auth_service' not in self._services:
            self._services['auth_service'] = JWTAuthService(
                secret_key=self.settings.security.secret_key,
                algorithm="HS256",
                access_token_expire_minutes=30,
                refresh_token_expire_days=7
            )
        return self._services['auth_service']
    
    def get_unit_of_work(self) -> IUnitOfWork:
        """Create unit of work with session factory (stub)."""
        return SqlAlchemyUnitOfWork(self._session_maker)  # type: ignore
    
    # Analytics service factory (scoped per request)
    def get_analytics_service(self) -> 'IAnalyticsService':
        # Provide a short-lived service bound to a session
        # Caller should ensure it's used within request scope
        session = self._session_maker()
        return SqlAlchemyAnalyticsService(session)  # type: ignore[arg-type]
    
    # Use Case Factory Methods
    
    def get_create_user_use_case(self) -> CreateUserUseCase:
        """Create user creation use case with all dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return CreateUserUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            email_service=self.get_email_service(),
            password_service=self.get_password_service(),
            unit_of_work=unit_of_work
        )
    
    def get_authenticate_user_use_case(self) -> AuthenticateUserUseCase:
        """Create user authentication use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return AuthenticateUserUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            password_service=self.get_password_service(),
            auth_service=self.get_auth_service(),
            unit_of_work=unit_of_work
        )
    
    def get_create_bot_use_case(self) -> CreateBotUseCase:
        """Create bot creation use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return CreateBotUseCase(
            bot_repository=self.get_bot_repository(unit_of_work.session),
            user_repository=self.get_user_repository(unit_of_work.session),
            ai_service=self.get_ai_service(),
            unit_of_work=unit_of_work
        )
    
    def get_send_message_use_case(self) -> SendMessageUseCase:
        """Create message sending use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return SendMessageUseCase(
            conversation_repository=self.get_conversation_repository(unit_of_work.session),
            bot_repository=self.get_bot_repository(unit_of_work.session),
            ai_service=self.get_ai_service(),
            unit_of_work=unit_of_work
        )
    
    def get_get_user_profile_use_case(self) -> GetUserProfileUseCase:
        """Create get user profile use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return GetUserProfileUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_update_user_profile_use_case(self) -> UpdateUserProfileUseCase:
        """Create update user profile use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return UpdateUserProfileUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_change_password_use_case(self) -> ChangePasswordUseCase:
        """Create change password use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return ChangePasswordUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            password_service=self.get_password_service(),
            unit_of_work=unit_of_work
        )
    
    def get_deactivate_user_use_case(self) -> DeactivateUserUseCase:
        """Create deactivate user use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return DeactivateUserUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_reset_password_use_case(self) -> ResetPasswordUseCase:
        """Create reset password use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return ResetPasswordUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            email_service=self.get_email_service(),
            unit_of_work=unit_of_work
        )
    
    def get_confirm_password_reset_use_case(self) -> ConfirmPasswordResetUseCase:
        """Create confirm password reset use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return ConfirmPasswordResetUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            password_service=self.get_password_service(),
            unit_of_work=unit_of_work
        )
    
    def get_verify_email_use_case(self) -> VerifyEmailUseCase:
        """Create verify email use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return VerifyEmailUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_resend_verification_email_use_case(self) -> ResendVerificationEmailUseCase:
        """Create resend verification email use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return ResendVerificationEmailUseCase(
            user_repository=self.get_user_repository(unit_of_work.session),
            email_service=self.get_email_service(),
            unit_of_work=unit_of_work
        )
    
    def get_get_bot_use_case(self) -> GetBotUseCase:
        """Create get bot use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return GetBotUseCase(
            bot_repository=self.get_bot_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_list_bots_use_case(self) -> ListBotsUseCase:
        """Create list bots use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return ListBotsUseCase(
            bot_repository=self.get_bot_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_update_bot_use_case(self) -> UpdateBotUseCase:
        """Create update bot use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return UpdateBotUseCase(
            bot_repository=self.get_bot_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_delete_bot_use_case(self) -> DeleteBotUseCase:
        """Create delete bot use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return DeleteBotUseCase(
            bot_repository=self.get_bot_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_create_conversation_use_case(self) -> CreateConversationUseCase:
        """Create conversation creation use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return CreateConversationUseCase(
            conversation_repository=self.get_conversation_repository(unit_of_work.session),
            bot_repository=self.get_bot_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_list_conversations_use_case(self) -> ListConversationsUseCase:
        """Create list conversations use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return ListConversationsUseCase(
            conversation_repository=self.get_conversation_repository(unit_of_work.session),
            bot_repository=self.get_bot_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_update_conversation_use_case(self) -> UpdateConversationUseCase:
        """Create update conversation use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return UpdateConversationUseCase(
            conversation_repository=self.get_conversation_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    def get_delete_conversation_use_case(self) -> DeleteConversationUseCase:
        """Create delete conversation use case with dependencies."""
        unit_of_work = self.get_unit_of_work()
        
        return DeleteConversationUseCase(
            conversation_repository=self.get_conversation_repository(unit_of_work.session),
            unit_of_work=unit_of_work
        )
    
    # Database Session Management
    
    async def get_database_session(self) -> AsyncGenerator[AsyncSession, None]:
        """Create new database session."""
        async with self._session_maker() as session:
            yield session
    
    # Private Setup Methods
    
    async def _setup_external_services(self) -> None:
        """Setup external service connections."""
        # Initialize AI service
        ai_service = self.get_ai_service()
        await ai_service.initialize()
        
        # Setup other external services
        # ...


# Global composition root instance
composition_root = CompositionRoot()


# Dependency provider functions for FastAPI
async def get_composition_root() -> CompositionRoot:
    """Get the global composition root instance."""
    return composition_root


async def get_database_session() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency for database sessions."""
    async with composition_root._session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# Dependency for analytics service bound to a managed session
async def get_analytics_service() -> 'IAnalyticsService':
    async with composition_root._session_maker() as session:  # type: ignore[attr-defined]
        service = SqlAlchemyAnalyticsService(session)  # type: ignore[arg-type]
        try:
            yield service
        finally:
            pass


# Use case dependency providers
async def get_create_user_use_case() -> CreateUserUseCase:
    """FastAPI dependency for create user use case."""
    return composition_root.get_create_user_use_case()


async def get_authenticate_user_use_case() -> AuthenticateUserUseCase:
    """FastAPI dependency for authenticate user use case."""
    return composition_root.get_authenticate_user_use_case()


async def get_create_bot_use_case() -> CreateBotUseCase:
    """FastAPI dependency for create bot use case."""
    return composition_root.get_create_bot_use_case()


async def get_send_message_use_case() -> SendMessageUseCase:
    """FastAPI dependency for send message use case."""
    return composition_root.get_send_message_use_case()


async def get_auth_service() -> IAuthService:
    """FastAPI dependency for auth service."""
    return composition_root.get_auth_service()


async def get_get_user_profile_use_case() -> GetUserProfileUseCase:
    """FastAPI dependency for get user profile use case."""
    return composition_root.get_get_user_profile_use_case()


async def get_update_user_profile_use_case() -> UpdateUserProfileUseCase:
    """FastAPI dependency for update user profile use case."""
    return composition_root.get_update_user_profile_use_case()


async def get_change_password_use_case() -> ChangePasswordUseCase:
    """FastAPI dependency for change password use case."""
    return composition_root.get_change_password_use_case()


async def get_deactivate_user_use_case() -> DeactivateUserUseCase:
    """FastAPI dependency for deactivate user use case."""
    return composition_root.get_deactivate_user_use_case()


async def get_reset_password_use_case() -> ResetPasswordUseCase:
    """FastAPI dependency for reset password use case."""
    return composition_root.get_reset_password_use_case()


async def get_confirm_password_reset_use_case() -> ConfirmPasswordResetUseCase:
    """FastAPI dependency for confirm password reset use case."""
    return composition_root.get_confirm_password_reset_use_case()


async def get_verify_email_use_case() -> VerifyEmailUseCase:
    """FastAPI dependency for verify email use case."""
    return composition_root.get_verify_email_use_case()


async def get_resend_verification_email_use_case() -> ResendVerificationEmailUseCase:
    """FastAPI dependency for resend verification email use case."""
    return composition_root.get_resend_verification_email_use_case()


async def get_get_bot_use_case() -> GetBotUseCase:
    """FastAPI dependency for get bot use case."""
    return composition_root.get_get_bot_use_case()


async def get_list_bots_use_case() -> ListBotsUseCase:
    """FastAPI dependency for list bots use case."""
    return composition_root.get_list_bots_use_case()


async def get_update_bot_use_case() -> UpdateBotUseCase:
    """FastAPI dependency for update bot use case."""
    return composition_root.get_update_bot_use_case()


async def get_delete_bot_use_case() -> DeleteBotUseCase:
    """FastAPI dependency for delete bot use case."""
    return composition_root.get_delete_bot_use_case()


async def get_create_conversation_use_case() -> CreateConversationUseCase:
    """FastAPI dependency for create conversation use case."""
    return composition_root.get_create_conversation_use_case()


async def get_list_conversations_use_case() -> ListConversationsUseCase:
    """FastAPI dependency for list conversations use case."""
    return composition_root.get_list_conversations_use_case()


async def get_update_conversation_use_case() -> UpdateConversationUseCase:
    """FastAPI dependency for update conversation use case."""
    return composition_root.get_update_conversation_use_case()


async def get_delete_conversation_use_case() -> DeleteConversationUseCase:
    """FastAPI dependency for delete conversation use case."""
    return composition_root.get_delete_conversation_use_case()
