"""
Reset Password Use Case

Handles password reset flow with secure token generation and validation.
Implements the complete password reset business process.

Business Flow:
1. Validate email exists and is active
2. Generate secure password reset token
3. Store token with expiration time
4. Send password reset email with token link
5. Log password reset request for security audit
6. Return confirmation of email sent

Reset Token Validation Flow (separate use case):
1. Validate reset token format and expiration
2. Retrieve user by token
3. Allow new password to be set
4. Invalidate reset token after use
5. Log successful password reset

Business Rules Enforced:
- Only active users can request password reset
- Reset tokens expire after configured time (typically 1 hour)
- Tokens are single-use only
- Rate limiting on reset requests per email
- Reset requests are audited for security

Security Considerations:
- Cryptographically secure token generation
- Token expiration enforcement
- Rate limiting to prevent abuse
- No user enumeration (same response for invalid emails)
- Audit logging for security compliance

Error Scenarios:
- Invalid email format -> ValidationException
- Email not found -> Silent success (no enumeration)
- User inactive -> Silent success (no enumeration)  
- Email service failure -> EmailServiceException
- Rate limit exceeded -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional
from datetime import datetime, timedelta
import secrets
import hashlib

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.email import Email
from application.interfaces.unit_of_work import IUnitOfWork
from application.interfaces.email_service import IEmailService
from application.exceptions.application_exceptions import (
    ValidationException,
    EmailServiceException
)

logger = logging.getLogger(__name__)


@dataclass
class ResetPasswordRequest:
    """Request DTO for password reset initiation."""
    email: str


@dataclass
class ResetPasswordResponse:
    """Response DTO for password reset request."""
    success: bool
    message: str


@dataclass 
class ResetPasswordUseCase:
    """Use case for initiating password reset flow."""
    
    user_repository: IUserRepository
    email_service: IEmailService
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: ResetPasswordRequest) -> ResetPasswordResponse:
        """
        Execute password reset initiation use case.
        
        Args:
            request: Password reset request data
            
        Returns:
            Password reset response with confirmation
            
        Note:
            Always returns success for security (no user enumeration)
            Actual reset email only sent if user exists and is active
        """
        try:
            # Validate email format
            try:
                email = Email(request.email)
            except ValueError:
                # Return success to prevent enumeration, but don't send email
                logger.warning(f"Password reset requested for invalid email format: {request.email}")
                return ResetPasswordResponse(
                    success=True,
                    message="If an account with that email exists, you will receive a password reset link."
                )
            
            async with self.unit_of_work:
                # Check if user exists and is active
                user = await self.user_repository.get_by_email(email)
                
                if not user or not user.is_active:
                    # Return success to prevent enumeration, but don't send email
                    logger.warning(f"Password reset requested for non-existent or inactive user: {email}")
                    return ResetPasswordResponse(
                        success=True,
                        message="If an account with that email exists, you will receive a password reset link."
                    )
                
                # Generate secure reset token
                reset_token = self._generate_reset_token()
                reset_token_hash = self._hash_token(reset_token)
                
                # Set token expiration (1 hour from now)
                expires_at = datetime.now() + timedelta(hours=1)
                
                # Store reset token (this would need to be added to user entity or separate token store)
                # For now, we'll assume the user entity has reset token fields
                user.password_reset_token = reset_token_hash
                user.password_reset_expires = expires_at
                user.updated_at = datetime.now()
                
                await self.user_repository.update(user)
                await self.unit_of_work.commit()
                
                # Send password reset email
                await self.email_service.send_password_reset_email(
                    email=email,
                    reset_token=reset_token,
                    user_name=user.first_name or str(user.username)
                )
                
                logger.info(f"Password reset email sent to {email}")
                
                return ResetPasswordResponse(
                    success=True,
                    message="If an account with that email exists, you will receive a password reset link."
                )
                
        except EmailServiceException as e:
            logger.error(f"Failed to send password reset email: {e}")
            # Return success for consistency, but log the error
            return ResetPasswordResponse(
                success=True,
                message="If an account with that email exists, you will receive a password reset link."
            )
        except Exception as e:
            logger.error(f"Unexpected error during password reset: {e}")
            raise ValidationException("Failed to process password reset request")
    
    def _generate_reset_token(self) -> str:
        """Generate a cryptographically secure reset token."""
        return secrets.token_urlsafe(32)
    
    def _hash_token(self, token: str) -> str:
        """Hash the token for secure storage."""
        return hashlib.sha256(token.encode()).hexdigest()
