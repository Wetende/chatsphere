"""
Change Password Use Case

Handles user password changes with security validation
and coordination of domain entities and infrastructure services.

Business Flow:
1. Validate input data via DTO
2. Retrieve existing user from repository
3. Check authorization (user can only change own password)
4. Verify current password is correct
5. Validate new password meets security requirements
6. Hash new password securely
7. Update user entity with new password hash
8. Invalidate existing sessions/tokens (future enhancement)
9. Log password change event for security audit
10. Return success confirmation

Business Rules Enforced:
- Current password must be verified before change
- New password must meet complexity requirements
- Confirm password must match new password
- Users can only change their own password
- Password changes are audited for security

Security Considerations:
- Current password verification prevents unauthorized changes
- New password hashing with secure algorithms
- Session invalidation to prevent hijacking
- Audit logging for security compliance
- Rate limiting for password change attempts

Error Scenarios:
- User not found -> UserNotFoundException
- Unauthorized access -> AuthorizationException
- Current password incorrect -> ValidationException
- New password too weak -> ValidationException
- Password confirmation mismatch -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.interfaces.password_service import IPasswordService
from application.dtos.user_dtos import ChangePasswordRequestDTO
from application.exceptions.application_exceptions import (
    UserNotFoundException,
    AuthorizationException,
    ValidationException
)

logger = logging.getLogger(__name__)


@dataclass
class ChangePasswordRequest:
    """Request DTO for changing user password."""
    user_id: int
    requesting_user_id: int  # For authorization checks
    current_password: str
    new_password: str
    confirm_password: str


@dataclass
class ChangePasswordResponse:
    """Response DTO for password change result."""
    success: bool
    message: str


@dataclass
class ChangePasswordUseCase:
    """Use case for changing user password."""
    
    user_repository: IUserRepository
    password_service: IPasswordService
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: ChangePasswordRequest) -> ChangePasswordResponse:
        """
        Execute change password use case.
        
        Args:
            request: Password change request data
            
        Returns:
            Password change response with success status
            
        Raises:
            UserNotFoundException: If user doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If validation fails
        """
        try:
            # Validate input
            if not request.user_id or not request.requesting_user_id:
                raise ValidationException("User ID and requesting user ID are required")
            
            if not request.current_password:
                raise ValidationException("Current password is required")
            
            if not request.new_password:
                raise ValidationException("New password is required")
            
            if not request.confirm_password:
                raise ValidationException("Password confirmation is required")
            
            # Create user ID value objects
            try:
                user_id = UserId(request.user_id)
                requesting_user_id = UserId(request.requesting_user_id)
            except ValueError as e:
                raise ValidationException(f"Invalid user ID format: {str(e)}")
            
            # Authorization check - users can only change their own password
            if user_id != requesting_user_id:
                logger.warning(f"Unauthorized password change attempt: user {requesting_user_id} tried to change password for {user_id}")
                raise AuthorizationException("You can only change your own password")
            
            # Validate new password confirmation
            if request.new_password != request.confirm_password:
                raise ValidationException("New password and confirmation do not match")
            
            # Validate new password strength
            if len(request.new_password) < 8:
                raise ValidationException("New password must be at least 8 characters long")
            
            # Additional password complexity checks could be added here
            if request.new_password.isdigit() or request.new_password.isalpha():
                raise ValidationException("New password must contain both letters and numbers")
            
            async with self.unit_of_work:
                # Retrieve user from repository
                user = await self.user_repository.get_by_id(user_id)
                if not user:
                    logger.warning(f"Password change failed: user {user_id} not found")
                    raise UserNotFoundException(f"User {user_id} not found")
                
                # Check if user is active
                if not user.is_active:
                    logger.warning(f"Password change failed: user {user_id} is inactive")
                    raise UserNotFoundException("User account is inactive")
                
                # Verify current password
                is_current_password_valid = await self.password_service.verify_password(
                    request.current_password, 
                    user.password_hash
                )
                
                if not is_current_password_valid:
                    logger.warning(f"Password change failed: incorrect current password for user {user_id}")
                    raise ValidationException("Current password is incorrect")
                
                # Check if new password is different from current
                is_same_password = await self.password_service.verify_password(
                    request.new_password,
                    user.password_hash
                )
                
                if is_same_password:
                    raise ValidationException("New password must be different from current password")
                
                # Hash new password
                new_password_hash = await self.password_service.hash_password(request.new_password)
                
                # Update user with new password hash
                user.password_hash = new_password_hash
                
                # Update timestamp
                from datetime import datetime
                user.updated_at = datetime.now()
                
                # Save updated user
                await self.user_repository.update(user)
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                logger.info(f"Password changed successfully for user {user_id}")
                
                # TODO: Invalidate existing sessions/tokens for security
                # This would involve clearing sessions, invalidating JWT tokens, etc.
                
                return ChangePasswordResponse(
                    success=True,
                    message="Password changed successfully"
                )
                
        except (UserNotFoundException, AuthorizationException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during password change: {e}")
            raise ValidationException("Failed to change password")
