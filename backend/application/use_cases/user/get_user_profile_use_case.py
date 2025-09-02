"""
Get User Profile Use Case

Retrieves user profile information for display and management.
Handles user data access with proper authorization and privacy controls.

Business Flow:
1. Validate user authentication/authorization
2. Retrieve user by ID from repository
3. Convert user entity to response DTO
4. Return user profile data

Business Rules Enforced:
- Only authenticated users can access profiles
- Users can only access their own profile (unless admin)
- Profile data excludes sensitive information (password hash, etc.)
- Inactive/deleted users should not return profile data

Security Considerations:
- User ID validation and authorization
- Sensitive data filtering
- Audit logging for profile access
- Rate limiting for profile requests

Error Scenarios:
- User not found -> UserNotFoundException
- Unauthorized access -> AuthorizationException
- User inactive -> UserInactiveException
"""

import logging
from dataclasses import dataclass
from typing import Optional

from domain.repositories.user_repository import IUserRepository
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.user_dtos import UserProfileResponseDTO
from application.exceptions.application_exceptions import (
    UserNotFoundException,
    AuthorizationException,
    ValidationException
)

logger = logging.getLogger(__name__)


@dataclass
class GetUserProfileRequest:
    """Request DTO for getting user profile."""
    user_id: int
    requesting_user_id: int  # For authorization checks


@dataclass
class GetUserProfileUseCase:
    """Use case for retrieving user profile information."""
    
    user_repository: IUserRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: GetUserProfileRequest) -> UserProfileResponseDTO:
        """
        Execute get user profile use case.
        
        Args:
            request: User profile request data
            
        Returns:
            User profile response data
            
        Raises:
            UserNotFoundException: If user doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If input validation fails
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
            
            # Authorization check - users can only access their own profile
            # (In a real system, admins might have broader access)
            if user_id != requesting_user_id:
                logger.warning(f"Unauthorized profile access attempt: user {requesting_user_id} tried to access {user_id}")
                raise AuthorizationException("You can only access your own profile")
            
            async with self.unit_of_work:
                # Retrieve user from repository
                user = await self.user_repository.get_by_id(user_id)
                if not user:
                    logger.warning(f"Profile access failed: user {user_id} not found")
                    raise UserNotFoundException(f"User {user_id} not found")
                
                # Check if user is active
                if not user.is_active:
                    logger.warning(f"Profile access failed: user {user_id} is inactive")
                    raise UserNotFoundException("User account is inactive")
                
                # Convert user entity to response DTO
                profile_response = UserProfileResponseDTO(
                    user_id=user.id.value,
                    email=str(user.email),
                    username=str(user.username),
                    first_name=user.first_name,
                    last_name=user.last_name,
                    is_active=user.is_active,
                    is_verified=user.is_verified,
                    subscription_status=user.subscription_status,
                    created_at=user.created_at,
                    last_login=user.last_login
                )
                
                logger.info(f"Profile retrieved successfully for user {user_id}")
                return profile_response
                
        except (UserNotFoundException, AuthorizationException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during profile retrieval: {e}")
            raise ValidationException("Failed to retrieve user profile")



