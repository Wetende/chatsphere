"""
Application Use Case - Authenticate User

Encapsulates the logic to authenticate a user given credentials. Delegates
password verification to the password service and user retrieval to the
user repository via the unit of work.

Business Flow:
1. Validate input credentials
2. Retrieve user by email from repository
3. Verify password against stored hash
4. Generate JWT tokens if authentication succeeds
5. Update user's last login timestamp
6. Return authentication result with tokens

Error Scenarios:
- User not found -> AuthenticationFailedException
- Invalid password -> AuthenticationFailedException  
- User account disabled -> AuthenticationFailedException
- User not verified -> AuthenticationFailedException (configurable)
"""

import logging
from datetime import datetime, timezone
from dataclasses import dataclass
from typing import Optional

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.email import Email
from application.interfaces.password_service import IPasswordService
from application.interfaces.auth_service import IAuthService
from application.interfaces.unit_of_work import IUnitOfWork
from application.exceptions.application_exceptions import (
    AuthenticationFailedException,
    ValidationException
)

logger = logging.getLogger(__name__)


@dataclass
class AuthenticateUserRequest:
    """Authentication request data."""
    email: str
    password: str
    remember_me: bool = False


@dataclass  
class AuthenticateUserResponse:
    """Authentication response data."""
    success: bool
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    user_id: Optional[str] = None
    expires_at: Optional[datetime] = None
    message: Optional[str] = None


class AuthenticateUserUseCase:
    """Use case for authenticating users with credentials."""
    
    def __init__(
        self,
        user_repository: IUserRepository,
        password_service: IPasswordService,
        auth_service: IAuthService,
        unit_of_work: IUnitOfWork,
        require_email_verification: bool = True
    ):
        """
        Initialize authenticate user use case.
        
        Args:
            user_repository: User repository interface
            password_service: Password hashing/verification service
            auth_service: JWT token generation service
            unit_of_work: Transaction management
            require_email_verification: Whether to require email verification
        """
        self.user_repository = user_repository
        self.password_service = password_service
        self.auth_service = auth_service
        self.unit_of_work = unit_of_work
        self.require_email_verification = require_email_verification
    
    async def execute(self, request: AuthenticateUserRequest) -> AuthenticateUserResponse:
        """
        Execute user authentication use case.
        
        Args:
            request: Authentication request with credentials
            
        Returns:
            Authentication response with tokens if successful
            
        Raises:
            AuthenticationFailedException: If authentication fails
            ValidationException: If input validation fails
        """
        try:
            # Validate input
            if not request.email or not request.password:
                raise ValidationException("Email and password are required")
            
            # Create email value object (validates email format)
            try:
                email = Email(request.email)
            except ValueError as e:
                raise ValidationException(f"Invalid email format: {str(e)}")
            
            async with self.unit_of_work:
                # Retrieve user by email
                user = await self.user_repository.get_by_email(email)
                if not user:
                    logger.warning(f"Authentication failed: user not found for email {request.email}")
                    raise AuthenticationFailedException("Invalid email or password")
                
                # Check if user account is active
                if not user.is_active:
                    logger.warning(f"Authentication failed: inactive account for user {user.id}")
                    raise AuthenticationFailedException("Account is disabled")
                
                # Check email verification if required
                if self.require_email_verification and not user.is_verified:
                    logger.warning(f"Authentication failed: unverified account for user {user.id}")
                    raise AuthenticationFailedException("Please verify your email address before logging in")
                
                # Get stored password hash (this would come from user entity in real implementation)
                # For now, we'll assume password is stored in user entity
                stored_password_hash = getattr(user, 'password_hash', None)
                if not stored_password_hash:
                    logger.error(f"No password hash found for user {user.id}")
                    raise AuthenticationFailedException("Authentication error")
                
                # Verify password
                try:
                    is_valid = await self.password_service.verify_password(
                        request.password, 
                        stored_password_hash
                    )
                    
                    if not is_valid:
                        logger.warning(f"Authentication failed: invalid password for user {user.id}")
                        raise AuthenticationFailedException("Invalid email or password")
                        
                except Exception as e:
                    logger.error(f"Password verification error for user {user.id}: {e}")
                    raise AuthenticationFailedException("Authentication error")
                
                # Generate JWT tokens
                try:
                    access_token = self.auth_service.generate_access_token(
                        user_id=str(user.id),
                        email=str(user.email),
                        additional_claims={
                            "username": str(user.username),
                            "subscription_status": user.subscription_status
                        }
                    )
                    
                    refresh_token = self.auth_service.generate_refresh_token(str(user.id))
                    
                    # Get token expiration
                    expires_at = self.auth_service.get_token_expiration(access_token)
                    
                except Exception as e:
                    logger.error(f"Token generation error for user {user.id}: {e}")
                    raise AuthenticationFailedException("Authentication error")
                
                # Update last login timestamp
                try:
                    user.last_login = datetime.now(timezone.utc)
                    await self.user_repository.save(user)
                    await self.unit_of_work.commit()
                    
                except Exception as e:
                    logger.error(f"Failed to update last login for user {user.id}: {e}")
                    # Don't fail authentication for this, but log it
                
                logger.info(f"User {user.id} authenticated successfully")
                
                return AuthenticateUserResponse(
                    success=True,
                    access_token=access_token,
                    refresh_token=refresh_token,
                    user_id=str(user.id),
                    expires_at=expires_at,
                    message="Authentication successful"
                )
                
        except (AuthenticationFailedException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during authentication: {e}")
            raise AuthenticationFailedException("Authentication failed")


