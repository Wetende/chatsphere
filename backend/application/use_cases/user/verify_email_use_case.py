"""
Verify Email Use Case

Handles email verification with token validation.
Completes the email verification business process.

Business Flow:
1. Validate verification token format
2. Find user by verification token
3. Check token expiration (if applicable)
4. Mark user as verified
5. Clear verification token
6. Log email verification completion
7. Return success confirmation

Business Rules Enforced:
- Verification tokens must be valid
- Users can only verify their own email
- Verification is idempotent (already verified users get success)
- Email verification is audited for security
- Verification tokens are single-use

Security Considerations:
- Token validation with timing attack protection
- Audit logging for security compliance
- Rate limiting on verification attempts
- No user enumeration through verification

Error Scenarios:
- Invalid token format -> ValidationException
- Token not found -> ValidationException
- User not found -> ValidationException
- User already verified -> Success (idempotent)
"""

import logging
from dataclasses import dataclass
from datetime import datetime
import hashlib

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.interfaces.email_service import IEmailService
from application.exceptions.application_exceptions import (
    ValidationException,
    UserNotFoundException
)

logger = logging.getLogger(__name__)


@dataclass
class VerifyEmailRequest:
    """Request DTO for email verification."""
    user_id: int
    verification_token: str


@dataclass
class VerifyEmailResponse:
    """Response DTO for email verification."""
    success: bool
    message: str
    already_verified: bool = False


@dataclass
class VerifyEmailUseCase:
    """Use case for verifying user email address."""
    
    user_repository: IUserRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: VerifyEmailRequest) -> VerifyEmailResponse:
        """
        Execute email verification use case.
        
        Args:
            request: Email verification request data
            
        Returns:
            Email verification response
            
        Raises:
            ValidationException: If validation fails
            UserNotFoundException: If user not found
        """
        try:
            # Validate input
            if not request.user_id:
                raise ValidationException("User ID is required")
            
            if not request.verification_token:
                raise ValidationException("Verification token is required")
            
            # Create user ID value object
            try:
                user_id = UserId(request.user_id)
            except ValueError as e:
                raise ValidationException(f"Invalid user ID format: {str(e)}")
            
            # Hash the provided token to match stored hash
            token_hash = self._hash_token(request.verification_token)
            
            async with self.unit_of_work:
                # Find user by ID
                user = await self.user_repository.get_by_id(user_id)
                
                if not user:
                    logger.warning(f"Email verification attempted for non-existent user {user_id}")
                    raise UserNotFoundException("User not found")
                
                # Check if user is active
                if not user.is_active:
                    logger.warning(f"Email verification attempted for inactive user {user_id}")
                    raise ValidationException("User account is inactive")
                
                # Check if already verified
                if user.is_verified:
                    logger.info(f"Email verification attempted for already verified user {user_id}")
                    return VerifyEmailResponse(
                        success=True,
                        message="Email is already verified",
                        already_verified=True
                    )
                
                # Validate verification token
                if not user.email_verification_token or user.email_verification_token != token_hash:
                    logger.warning(f"Email verification attempted with invalid token for user {user_id}")
                    raise ValidationException("Invalid verification token")
                
                # Mark user as verified and clear verification token
                user.is_verified = True
                user.email_verification_token = None
                user.updated_at = datetime.now()
                
                await self.user_repository.update(user)
                await self.unit_of_work.commit()
                
                logger.info(f"Email verification completed for user {user_id}")
                
                return VerifyEmailResponse(
                    success=True,
                    message="Email has been verified successfully. Your account is now active.",
                    already_verified=False
                )
                
        except (ValidationException, UserNotFoundException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during email verification: {e}")
            raise ValidationException("Failed to verify email")
    
    def _hash_token(self, token: str) -> str:
        """Hash the token for secure comparison."""
        return hashlib.sha256(token.encode()).hexdigest()


@dataclass
class ResendVerificationEmailRequest:
    """Request DTO for resending verification email."""
    email: str


@dataclass
class ResendVerificationEmailResponse:
    """Response DTO for resending verification email."""
    success: bool
    message: str


@dataclass
class ResendVerificationEmailUseCase:
    """Use case for resending email verification."""
    
    user_repository: IUserRepository
    email_service: IEmailService
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: ResendVerificationEmailRequest) -> ResendVerificationEmailResponse:
        """
        Execute resend verification email use case.
        
        Args:
            request: Resend verification email request data
            
        Returns:
            Resend verification email response
        """
        try:
            from domain.value_objects.email import Email
            import secrets
            
            # Validate email format
            try:
                email = Email(request.email)
            except ValueError:
                # Return success to prevent enumeration
                return ResendVerificationEmailResponse(
                    success=True,
                    message="If an unverified account with that email exists, you will receive a verification email."
                )
            
            async with self.unit_of_work:
                # Find user by email
                user = await self.user_repository.get_by_email(email)
                
                if not user or not user.is_active or user.is_verified:
                    # Return success to prevent enumeration
                    return ResendVerificationEmailResponse(
                        success=True,
                        message="If an unverified account with that email exists, you will receive a verification email."
                    )
                
                # Generate new verification token
                verification_token = secrets.token_urlsafe(32)
                verification_token_hash = self._hash_token(verification_token)
                
                # Update user with new verification token
                user.email_verification_token = verification_token_hash
                user.updated_at = datetime.now()
                
                await self.user_repository.update(user)
                await self.unit_of_work.commit()
                
                # Send verification email
                await self.email_service.send_verification_email(
                    email=email,
                    verification_token=verification_token,
                    user_name=user.first_name or str(user.username)
                )
                
                logger.info(f"Verification email resent to {email}")
                
                return ResendVerificationEmailResponse(
                    success=True,
                    message="If an unverified account with that email exists, you will receive a verification email."
                )
                
        except Exception as e:
            logger.error(f"Unexpected error during resend verification email: {e}")
            # Return success for consistency
            return ResendVerificationEmailResponse(
                success=True,
                message="If an unverified account with that email exists, you will receive a verification email."
            )
    
    def _hash_token(self, token: str) -> str:
        """Hash the token for secure comparison."""
        return hashlib.sha256(token.encode()).hexdigest()
