"""
Update User Profile Use Case

Handles user profile updates with business rule validation
and coordination of domain entities and infrastructure services.

Business Flow:
1. Validate input data via DTO
2. Retrieve existing user from repository
3. Check authorization (user can only update own profile)
4. Validate new username uniqueness if changed
5. Apply updates to user entity with business rules
6. Save updated user to repository
7. Log profile update event
8. Return updated profile response DTO

Business Rules Enforced:
- Username must be unique across platform if changed
- Users can only update their own profile
- Username must follow format rules if provided
- First/last name must meet length requirements
- Profile changes are audited for security

Cross-Cutting Concerns:
- Input validation and sanitization
- Authorization checks for profile access
- Username uniqueness validation
- Audit logging for security compliance
- Error handling with meaningful messages
- Transaction management for consistency

Error Scenarios:
- User not found -> UserNotFoundException
- Unauthorized access -> AuthorizationException
- Username already exists -> UsernameAlreadyExistsException
- Invalid input data -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.user_id import UserId
from domain.value_objects.username import Username
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.user_dtos import UpdateUserProfileRequestDTO, UserProfileResponseDTO
from application.exceptions.application_exceptions import (
    UserNotFoundException,
    AuthorizationException,
    ValidationException,
    UserAlreadyExistsException
)

logger = logging.getLogger(__name__)


@dataclass
class UpdateUserProfileRequest:
    """Request DTO for updating user profile."""
    user_id: int
    requesting_user_id: int  # For authorization checks
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None


@dataclass
class UpdateUserProfileUseCase:
    """Use case for updating user profile information."""
    
    user_repository: IUserRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: UpdateUserProfileRequest) -> UserProfileResponseDTO:
        """
        Execute update user profile use case.
        
        Args:
            request: User profile update request data
            
        Returns:
            Updated user profile response data
            
        Raises:
            UserNotFoundException: If user doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If input validation fails
            UserAlreadyExistsException: If username already exists
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
            
            # Authorization check - users can only update their own profile
            if user_id != requesting_user_id:
                logger.warning(f"Unauthorized profile update attempt: user {requesting_user_id} tried to update {user_id}")
                raise AuthorizationException("You can only update your own profile")
            
            # Validate input data
            if request.first_name is not None and (len(request.first_name.strip()) == 0 or len(request.first_name) > 50):
                raise ValidationException("First name must be between 1 and 50 characters")
            
            if request.last_name is not None and (len(request.last_name.strip()) == 0 or len(request.last_name) > 50):
                raise ValidationException("Last name must be between 1 and 50 characters")
            
            async with self.unit_of_work:
                # Retrieve user from repository
                user = await self.user_repository.get_by_id(user_id)
                if not user:
                    logger.warning(f"Profile update failed: user {user_id} not found")
                    raise UserNotFoundException(f"User {user_id} not found")
                
                # Check if user is active
                if not user.is_active:
                    logger.warning(f"Profile update failed: user {user_id} is inactive")
                    raise UserNotFoundException("User account is inactive")
                
                # Check username uniqueness if username is being changed
                if request.username is not None and request.username != str(user.username):
                    try:
                        new_username = Username(request.username)
                        if await self.user_repository.username_exists(new_username):
                            raise UserAlreadyExistsException(f"Username {request.username} already exists")
                        user.username = new_username
                    except ValueError as e:
                        raise ValidationException(f"Invalid username format: {str(e)}")
                
                # Update user profile fields
                if request.first_name is not None:
                    user.first_name = request.first_name.strip()
                
                if request.last_name is not None:
                    user.last_name = request.last_name.strip()
                
                # Update timestamp
                from datetime import datetime
                user.updated_at = datetime.now()
                
                # Save updated user
                updated_user = await self.user_repository.update(user)
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                # Convert updated user to response DTO
                profile_response = UserProfileResponseDTO(
                    user_id=updated_user.id.value,
                    email=str(updated_user.email),
                    username=str(updated_user.username),
                    first_name=updated_user.first_name,
                    last_name=updated_user.last_name,
                    is_active=updated_user.is_active,
                    is_verified=updated_user.is_verified,
                    subscription_status=updated_user.subscription_status,
                    created_at=updated_user.created_at,
                    last_login=updated_user.last_login
                )
                
                logger.info(f"Profile updated successfully for user {user_id}")
                return profile_response
                
        except (UserNotFoundException, AuthorizationException, ValidationException, UserAlreadyExistsException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during profile update: {e}")
            raise ValidationException("Failed to update user profile")
