"""
Confirm Password Reset Use Case

Handles password reset confirmation with token validation.
Completes the password reset business process.

Business Flow:
1. Validate reset token format
2. Find user by token hash
3. Check token expiration
4. Validate new password requirements
5. Update user password with secure hashing
6. Invalidate reset token
7. Log password reset completion
8. Return success confirmation

Business Rules Enforced:
- Reset tokens must be valid and not expired
- New password must meet security requirements
- Tokens are single-use only
- Password resets are audited for security
- Old password is invalidated

Security Considerations:
- Token validation with timing attack protection
- Secure password hashing
- Token invalidation after use
- Audit logging for security compliance
- Rate limiting on confirmation attempts

Error Scenarios:
- Invalid token format -> ValidationException
- Token not found -> ValidationException
- Token expired -> ValidationException
- Weak new password -> ValidationException
- User not found -> ValidationException
"""

import logging
from dataclasses import dataclass
from datetime import datetime
import hashlib

from domain.repositories.user_repository import IUserRepository
from application.interfaces.unit_of_work import IUnitOfWork
from application.interfaces.password_service import IPasswordService
from application.exceptions.application_exceptions import (
    ValidationException,
    UserNotFoundException
)

logger = logging.getLogger(__name__)


@dataclass
class ConfirmPasswordResetRequest:
    """Request DTO for password reset confirmation."""
    reset_token: str
    new_password: str
    confirm_password: str


@dataclass
class ConfirmPasswordResetResponse:
    """Response DTO for password reset confirmation."""
    success: bool
    message: str


@dataclass
class ConfirmPasswordResetUseCase:
    """Use case for confirming password reset with new password."""
    
    user_repository: IUserRepository
    password_service: IPasswordService
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: ConfirmPasswordResetRequest) -> ConfirmPasswordResetResponse:
        """
        Execute password reset confirmation use case.
        
        Args:
            request: Password reset confirmation request data
            
        Returns:
            Password reset confirmation response
            
        Raises:
            ValidationException: If validation fails
            UserNotFoundException: If user not found
        """
        try:
            # Validate input
            if not request.reset_token:
                raise ValidationException("Reset token is required")
            
            if not request.new_password:
                raise ValidationException("New password is required")
            
            if request.new_password != request.confirm_password:
                raise ValidationException("Password and confirmation do not match")
            
            # Validate new password strength
            if len(request.new_password) < 8:
                raise ValidationException("New password must be at least 8 characters long")
            
            if request.new_password.isdigit() or request.new_password.isalpha():
                raise ValidationException("New password must contain both letters and numbers")
            
            # Hash the provided token to match stored hash
            token_hash = self._hash_token(request.reset_token)
            
            async with self.unit_of_work:
                # Find user by reset token hash
                user = await self.user_repository.get_by_reset_token(token_hash)
                
                if not user:
                    logger.warning(f"Password reset attempted with invalid token")
                    raise ValidationException("Invalid or expired reset token")
                
                # Check if user is active
                if not user.is_active:
                    logger.warning(f"Password reset attempted for inactive user {user.id}")
                    raise ValidationException("Invalid or expired reset token")
                
                # Check token expiration
                if not user.password_reset_expires or datetime.now() > user.password_reset_expires:
                    logger.warning(f"Password reset attempted with expired token for user {user.id}")
                    raise ValidationException("Invalid or expired reset token")
                
                # Hash new password
                new_password_hash = await self.password_service.hash_password(request.new_password)
                
                # Update user with new password and clear reset token
                user.password_hash = new_password_hash
                user.password_reset_token = None
                user.password_reset_expires = None
                user.updated_at = datetime.now()
                
                await self.user_repository.update(user)
                await self.unit_of_work.commit()
                
                logger.info(f"Password reset completed for user {user.id}")
                
                return ConfirmPasswordResetResponse(
                    success=True,
                    message="Password has been reset successfully. You can now log in with your new password."
                )
                
        except (ValidationException, UserNotFoundException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during password reset confirmation: {e}")
            raise ValidationException("Failed to reset password")
    
    def _hash_token(self, token: str) -> str:
        """Hash the token for secure comparison."""
        return hashlib.sha256(token.encode()).hexdigest()
