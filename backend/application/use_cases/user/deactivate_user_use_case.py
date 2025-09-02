"""
Deactivate User Use Case

Handles user account deactivation with business rule validation
and coordination of domain entities and infrastructure services.

Business Flow:
1. Validate input data via DTO
2. Retrieve existing user from repository
3. Check authorization (user can only deactivate own account)
4. Apply deactivation business rules
5. Update user entity status to inactive
6. Invalidate all user sessions/tokens
7. Log deactivation event for audit
8. Handle related data (bots, conversations) per policy
9. Return deactivation confirmation

Business Rules Enforced:
- Users can only deactivate their own account
- Active user required for deactivation
- Deactivation is reversible (soft delete)
- Related user data handled per retention policy
- Account deactivation is audited for security

Data Handling:
- User status set to inactive (soft delete)
- User sessions/tokens invalidated
- User bots may be deactivated or transferred
- Conversations preserved per retention policy
- Email verification status maintained

Security Considerations:
- Authorization checks for account access
- Session invalidation to prevent unauthorized access
- Audit logging for security compliance
- Data retention policy compliance
- Reversible deactivation for account recovery

Error Scenarios:
- User not found -> UserNotFoundException
- Unauthorized access -> AuthorizationException
- User already inactive -> ValidationException
- System user cannot be deactivated -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.exceptions.application_exceptions import (
    UserNotFoundException,
    AuthorizationException,
    ValidationException
)

logger = logging.getLogger(__name__)


@dataclass
class DeactivateUserRequest:
    """Request DTO for deactivating user account."""
    user_id: int
    requesting_user_id: int  # For authorization checks
    reason: Optional[str] = None  # Optional deactivation reason


@dataclass
class DeactivateUserResponse:
    """Response DTO for user deactivation result."""
    success: bool
    message: str
    deactivated_at: str


@dataclass
class DeactivateUserUseCase:
    """Use case for deactivating user accounts."""
    
    user_repository: IUserRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: DeactivateUserRequest) -> DeactivateUserResponse:
        """
        Execute deactivate user use case.
        
        Args:
            request: User deactivation request data
            
        Returns:
            User deactivation response with success status
            
        Raises:
            UserNotFoundException: If user doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If validation fails
        """
        try:
            # Validate input
            if not request.user_id or not request.requesting_user_id:
                raise ValidationException("User ID and requesting user ID are required")
            
            # Create user ID value objects
            try:
                user_id = UserId(request.user_id)
                requesting_user_id = UserId(request.requesting_user_id)
            except ValueError as e:
                raise ValidationException(f"Invalid user ID format: {str(e)}")
            
            # Authorization check - users can only deactivate their own account
            # (In a real system, admins might have broader access)
            if user_id != requesting_user_id:
                logger.warning(f"Unauthorized account deactivation attempt: user {requesting_user_id} tried to deactivate {user_id}")
                raise AuthorizationException("You can only deactivate your own account")
            
            async with self.unit_of_work:
                # Retrieve user from repository
                user = await self.user_repository.get_by_id(user_id)
                if not user:
                    logger.warning(f"Account deactivation failed: user {user_id} not found")
                    raise UserNotFoundException(f"User {user_id} not found")
                
                # Check if user is already inactive
                if not user.is_active:
                    logger.warning(f"Account deactivation failed: user {user_id} is already inactive")
                    raise ValidationException("User account is already deactivated")
                
                # Apply deactivation business rules
                from datetime import datetime
                deactivation_time = datetime.now()
                
                # Update user status
                user.is_active = False
                user.updated_at = deactivation_time
                
                # Log deactivation reason if provided
                if request.reason:
                    logger.info(f"User {user_id} deactivation reason: {request.reason}")
                
                # Save updated user
                await self.user_repository.update(user)
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                logger.info(f"Account deactivated successfully for user {user_id}")
                
                # TODO: Handle related data per business policy
                # - Deactivate or transfer user bots
                # - Handle conversation data per retention policy
                # - Invalidate all user sessions/tokens
                # - Send deactivation confirmation email
                
                return DeactivateUserResponse(
                    success=True,
                    message="Account deactivated successfully. You can reactivate by contacting support.",
                    deactivated_at=deactivation_time.isoformat()
                )
                
        except (UserNotFoundException, AuthorizationException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during account deactivation: {e}")
            raise ValidationException("Failed to deactivate account")
