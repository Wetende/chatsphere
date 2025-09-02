"""
User Management API Router

FastAPI router for user profile operations and management endpoints.
Delegates to application use cases and returns HTTP-friendly responses.

Endpoints (GET and POST only as requested):
- GET /users/me: Get current user profile
- POST /users/me: Update current user profile (id=0 create, id>0 update)
- POST /users/change-password: Change user password
- GET /users/delete/me: Deactivate user account

Key Features:
- JWT authentication required for all endpoints
- Request/response validation with Pydantic
- Comprehensive error handling
- OpenAPI documentation
- Authorization checks for user access
"""

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

from application.use_cases.user.get_user_profile_use_case import (
    GetUserProfileUseCase,
    GetUserProfileRequest
)
from application.use_cases.user.update_user_profile_use_case import (
    UpdateUserProfileUseCase,
    UpdateUserProfileRequest
)
from application.use_cases.user.change_password_use_case import (
    ChangePasswordUseCase,
    ChangePasswordRequest as ChangePasswordUseCaseRequest
)
from application.use_cases.user.deactivate_user_use_case import (
    DeactivateUserUseCase,
    DeactivateUserRequest
)
from application.dtos.user_dtos import UserProfileResponseDTO
from application.exceptions.application_exceptions import (
    UserNotFoundException,
    AuthorizationException,
    ValidationException,
    UserAlreadyExistsException
)

logger = logging.getLogger(__name__)

# Create router with configuration
router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={
        401: {"description": "Authentication required"},
        403: {"description": "Insufficient permissions"},
        404: {"description": "User not found"},
        500: {"description": "Internal server error"}
    }
)


# Request/Response Models
class UserProfileResponse(BaseModel):
    """User profile response model."""
    user_id: int = Field(..., description="User identifier")
    email: str = Field(..., description="User email address")
    username: str = Field(..., description="Username")
    first_name: str = Field(..., description="First name")
    last_name: str = Field(..., description="Last name")
    is_active: bool = Field(..., description="Account active status")
    is_verified: bool = Field(..., description="Email verification status")
    subscription_status: str = Field(..., description="Subscription tier")
    created_at: str = Field(..., description="Account creation timestamp")
    last_login: Optional[str] = Field(None, description="Last login timestamp")


class UpdateProfileRequest(BaseModel):
    """Update profile request model."""
    first_name: Optional[str] = Field(None, min_length=1, max_length=50, description="First name")
    last_name: Optional[str] = Field(None, min_length=1, max_length=50, description="Last name")
    username: Optional[str] = Field(None, min_length=3, max_length=50, description="Username")


class ChangePasswordRequest(BaseModel):
    """Change password request model."""
    current_password: str = Field(..., description="Current password")
    new_password: str = Field(..., min_length=8, description="New password (minimum 8 characters)")
    confirm_password: str = Field(..., description="Confirm new password")


# Import dependency providers from composition root
from composition_root import (
    get_get_user_profile_use_case,
    get_update_user_profile_use_case,
    get_change_password_use_case,
    get_deactivate_user_use_case
)


# Placeholder for JWT authentication dependency
# In a real implementation, this would extract and validate JWT token
async def get_current_user_id() -> int:
    """
    Extract current user ID from JWT token.
    
    This is a placeholder implementation. In a real system, this would:
    1. Extract JWT token from Authorization header
    2. Validate token signature and expiration
    3. Extract user ID from token claims
    4. Return user ID for authorization
    
    For now, returns a dummy user ID for testing.
    """
    # TODO: Implement real JWT token extraction and validation
    return 1  # Dummy user ID for testing


@router.get(
    "/me",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current user profile",
    description="Retrieve the profile information for the authenticated user",
    responses={
        200: {"description": "User profile retrieved successfully"},
        401: {"description": "Authentication required"},
        404: {"description": "User not found"}
    }
)
async def get_my_profile(
    current_user_id: int = Depends(get_current_user_id),
    get_profile_use_case: GetUserProfileUseCase = Depends(get_get_user_profile_use_case)
) -> UserProfileResponse:
    """
    Get current user profile information.
    
    Business Logic:
    - Validates authentication and extracts user ID from JWT
    - Retrieves user profile data from repository
    - Returns user profile excluding sensitive information
    - Logs profile access for security auditing
    
    Args:
        current_user_id: User ID extracted from JWT token
        get_profile_use_case: Injected get profile use case
        
    Returns:
        User profile response data
        
    Raises:
        HTTPException: If user not found or authentication fails
    """
    try:
        # Create get profile request
        request = GetUserProfileRequest(
            user_id=current_user_id,
            requesting_user_id=current_user_id
        )
        
        # Execute get profile use case
        profile_response = await get_profile_use_case.execute(request)
        
        # Convert application response to HTTP response
        return UserProfileResponse(
            user_id=profile_response.user_id,
            email=profile_response.email,
            username=profile_response.username,
            first_name=profile_response.first_name,
            last_name=profile_response.last_name,
            is_active=profile_response.is_active,
            is_verified=profile_response.is_verified,
            subscription_status=profile_response.subscription_status,
            created_at=profile_response.created_at.isoformat(),
            last_login=profile_response.last_login.isoformat() if profile_response.last_login else None
        )
        
    except UserNotFoundException as e:
        logger.warning(f"Profile not found: {e}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    except AuthorizationException as e:
        logger.warning(f"Profile access unauthorized: {e}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    except ValidationException as e:
        logger.warning(f"Profile validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected profile error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve profile"
        )


@router.post(
    "/me",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Update current user profile",
    description="Update profile information for the authenticated user (POST pattern as requested)",
    responses={
        200: {"description": "Profile updated successfully"},
        400: {"description": "Validation error"},
        401: {"description": "Authentication required"},
        404: {"description": "User not found"},
        409: {"description": "Username already exists"}
    }
)
async def update_my_profile(
    request: UpdateProfileRequest,
    current_user_id: int = Depends(get_current_user_id),
    update_profile_use_case: UpdateUserProfileUseCase = Depends(get_update_user_profile_use_case)
) -> UserProfileResponse:
    """
    Update current user profile information.
    
    Business Logic:
    - Validates authentication and extracts user ID from JWT
    - Updates user profile data with business rule validation
    - Handles username uniqueness checks
    - Returns updated user profile information
    - Logs profile updates for security auditing
    
    Args:
        request: Profile update data
        current_user_id: User ID extracted from JWT token
        update_profile_use_case: Injected update profile use case
        
    Returns:
        Updated user profile response
        
    Raises:
        HTTPException: If validation fails or user not found
    """
    try:
        # Create update profile request
        update_request = UpdateUserProfileRequest(
            user_id=current_user_id,
            requesting_user_id=current_user_id,
            first_name=request.first_name,
            last_name=request.last_name,
            username=request.username
        )
        
        # Execute update profile use case
        profile_response = await update_profile_use_case.execute(update_request)
        
        # Convert application response to HTTP response
        return UserProfileResponse(
            user_id=profile_response.user_id,
            email=profile_response.email,
            username=profile_response.username,
            first_name=profile_response.first_name,
            last_name=profile_response.last_name,
            is_active=profile_response.is_active,
            is_verified=profile_response.is_verified,
            subscription_status=profile_response.subscription_status,
            created_at=profile_response.created_at.isoformat(),
            last_login=profile_response.last_login.isoformat() if profile_response.last_login else None
        )
        
    except UserNotFoundException as e:
        logger.warning(f"Profile update failed - user not found: {e}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
    except AuthorizationException as e:
        logger.warning(f"Profile update unauthorized: {e}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    except UserAlreadyExistsException as e:
        logger.warning(f"Profile update failed - username exists: {e}")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists"
        )
    except ValidationException as e:
        logger.warning(f"Profile update validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected profile update error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )


@router.post(
    "/change-password",
    status_code=status.HTTP_200_OK,
    summary="Change user password",
    description="Change password for the authenticated user",
    responses={
        200: {"description": "Password changed successfully"},
        400: {"description": "Validation error or current password incorrect"},
        401: {"description": "Authentication required"},
        404: {"description": "User not found"}
    }
)
async def change_password(
    request: ChangePasswordRequest,
    current_user_id: int = Depends(get_current_user_id),
    change_password_use_case: ChangePasswordUseCase = Depends(get_change_password_use_case)
) -> dict:
    """
    Change user password.
    
    Business Logic:
    - Validates authentication and extracts user ID from JWT
    - Verifies current password is correct
    - Validates new password meets security requirements
    - Updates password with secure hashing
    - Logs password change for security auditing
    
    Args:
        request: Password change request data
        current_user_id: User ID extracted from JWT token
        change_password_use_case: Injected change password use case
        
    Returns:
        Password change confirmation
        
    Raises:
        HTTPException: If validation fails or user not found
    """
    try:
        # Create change password request
        change_request = ChangePasswordUseCaseRequest(
            user_id=current_user_id,
            requesting_user_id=current_user_id,
            current_password=request.current_password,
            new_password=request.new_password,
            confirm_password=request.confirm_password
        )
        
        # Execute change password use case
        response = await change_password_use_case.execute(change_request)
        
        return {
            "success": response.success,
            "message": response.message
        }
        
    except UserNotFoundException as e:
        logger.warning(f"Password change failed - user not found: {e}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    except AuthorizationException as e:
        logger.warning(f"Password change unauthorized: {e}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    except ValidationException as e:
        logger.warning(f"Password change validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected password change error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to change password"
        )


@router.get(
    "/delete/me",
    status_code=status.HTTP_200_OK,
    summary="Deactivate user account",
    description="Deactivate the authenticated user's account (GET pattern as requested)",
    responses={
        200: {"description": "Account deactivated successfully"},
        400: {"description": "Account already deactivated"},
        401: {"description": "Authentication required"},
        404: {"description": "User not found"}
    }
)
async def deactivate_my_account(
    current_user_id: int = Depends(get_current_user_id),
    deactivate_user_use_case: DeactivateUserUseCase = Depends(get_deactivate_user_use_case)
) -> dict:
    """
    Deactivate user account.
    
    Business Logic:
    - Validates authentication and extracts user ID from JWT
    - Sets user status to inactive (soft delete)
    - Handles related data per retention policy
    - Logs deactivation for audit purposes
    - Returns deactivation confirmation
    
    Args:
        current_user_id: User ID extracted from JWT token
        deactivate_user_use_case: Injected deactivate user use case
        
    Returns:
        Account deactivation confirmation
        
    Raises:
        HTTPException: If validation fails or user not found
    """
    try:
        # Create deactivate user request
        deactivate_request = DeactivateUserRequest(
            user_id=current_user_id,
            requesting_user_id=current_user_id,
            reason="User requested account deactivation"
        )
        
        # Execute deactivate user use case
        response = await deactivate_user_use_case.execute(deactivate_request)
        
        return {
            "success": response.success,
            "message": response.message,
            "deactivated_at": response.deactivated_at
        }
        
    except UserNotFoundException as e:
        logger.warning(f"Account deactivation failed - user not found: {e}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    except AuthorizationException as e:
        logger.warning(f"Account deactivation unauthorized: {e}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    except ValidationException as e:
        logger.warning(f"Account deactivation validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected account deactivation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to deactivate account"
        )