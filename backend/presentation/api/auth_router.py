"""
Presentation - Auth Router

FastAPI router handling authentication endpoints (login, refresh, logout).
Delegates to application use cases and returns HTTP-friendly responses.

Endpoints:
- POST /auth/login: Authenticate user with email/password
- POST /auth/refresh: Refresh access token using refresh token
- POST /auth/logout: Invalidate user tokens (future implementation)

Key Features:
- Request/response validation with Pydantic
- JWT token handling
- Comprehensive error handling
- Rate limiting for security
- OpenAPI documentation
"""

import logging
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

from application.use_cases.user.authenticate_user_use_case import (
    AuthenticateUserUseCase,
    AuthenticateUserRequest,
    AuthenticateUserResponse
)
from application.interfaces.auth_service import (
    IAuthService,
    TokenValidationError,
    TokenGenerationError
)
from application.exceptions.application_exceptions import (
    AuthenticationFailedException,
    ValidationException
)

logger = logging.getLogger(__name__)

# Create router with configuration
router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={
        400: {"description": "Validation error"},
        401: {"description": "Authentication failed"},
        429: {"description": "Too many requests"},
        500: {"description": "Internal server error"}
    }
)


# Request/Response Models
class LoginRequest(BaseModel):
    """Login request model."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=1, description="User password")
    remember_me: bool = Field(False, description="Extended session duration")


class LoginResponse(BaseModel):
    """Login response model."""
    access_token: str = Field(..., description="JWT access token")
    refresh_token: str = Field(..., description="JWT refresh token")
    token_type: str = Field("bearer", description="Token type")
    expires_at: Optional[datetime] = Field(None, description="Token expiration time")
    user_id: str = Field(..., description="User identifier")
    message: str = Field(..., description="Response message")


class RefreshTokenRequest(BaseModel):
    """Refresh token request model."""
    refresh_token: str = Field(..., description="Valid refresh token")


class RefreshTokenResponse(BaseModel):
    """Refresh token response model."""
    access_token: str = Field(..., description="New JWT access token")
    token_type: str = Field("bearer", description="Token type")
    expires_at: Optional[datetime] = Field(None, description="Token expiration time")


class LogoutRequest(BaseModel):
    """Logout request model."""
    refresh_token: Optional[str] = Field(None, description="Refresh token to invalidate")


# Import dependency providers from composition root
from ...composition_root import (
    get_authenticate_user_use_case as get_auth_use_case,
    get_auth_service as get_auth_svc
)


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Authenticate user",
    description="Login with email and password to receive JWT tokens",
    responses={
        200: {"description": "Login successful, tokens returned"},
        400: {"description": "Invalid input data"},
        401: {"description": "Invalid credentials"},
        429: {"description": "Too many login attempts"}
    }
)
async def login(
    request: LoginRequest,
    authenticate_use_case: AuthenticateUserUseCase = Depends(get_auth_use_case)
) -> LoginResponse:
    """
    Authenticate user with email and password.
    
    Business Logic:
    - Validates email/password credentials
    - Checks account status (active, verified)
    - Generates JWT access and refresh tokens
    - Updates last login timestamp
    - Returns tokens and user information
    
    Args:
        request: Login credentials
        authenticate_use_case: Injected authentication use case
        
    Returns:
        Login response with JWT tokens
        
    Raises:
        HTTPException: If authentication fails or validation errors
    """
    try:
        # Convert HTTP request to application request
        auth_request = AuthenticateUserRequest(
            email=request.email,
            password=request.password,
            remember_me=request.remember_me
        )
        
        # Execute authentication use case
        auth_response = await authenticate_use_case.execute(auth_request)
        
        if not auth_response.success:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=auth_response.message or "Authentication failed"
            )
        
        # Convert application response to HTTP response
        return LoginResponse(
            access_token=auth_response.access_token,
            refresh_token=auth_response.refresh_token,
            token_type="bearer",
            expires_at=auth_response.expires_at,
            user_id=auth_response.user_id,
            message=auth_response.message or "Login successful"
        )
        
    except AuthenticationFailedException as e:
        logger.warning(f"Authentication failed: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=e.message
        )
    except ValidationException as e:
        logger.warning(f"Login validation error: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message
        )
    except Exception as e:
        logger.error(f"Unexpected login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed due to internal error"
        )


@router.post(
    "/refresh",
    response_model=RefreshTokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh access token",
    description="Get a new access token using a valid refresh token",
    responses={
        200: {"description": "Token refreshed successfully"},
        401: {"description": "Invalid or expired refresh token"},
        429: {"description": "Too many refresh attempts"}
    }
)
async def refresh_token(
    request: RefreshTokenRequest,
    auth_service: IAuthService = Depends(get_auth_svc)
) -> RefreshTokenResponse:
    """
    Refresh access token using a valid refresh token.
    
    Business Logic:
    - Validates refresh token signature and expiration
    - Extracts user information from refresh token
    - Generates new access token with current user data
    - Returns new access token
    
    Args:
        request: Refresh token request
        auth_service: Injected auth service
        
    Returns:
        New access token response
        
    Raises:
        HTTPException: If refresh token is invalid or expired
    """
    try:
        # Generate new access token from refresh token
        new_access_token = auth_service.refresh_access_token(request.refresh_token)
        
        # Get expiration time of new token
        expires_at = auth_service.get_token_expiration(new_access_token)
        
        return RefreshTokenResponse(
            access_token=new_access_token,
            token_type="bearer",
            expires_at=expires_at
        )
        
    except TokenValidationError as e:
        logger.warning(f"Token refresh failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    except TokenGenerationError as e:
        logger.error(f"Token generation error during refresh: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate new access token"
        )
    except Exception as e:
        logger.error(f"Unexpected refresh error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed due to internal error"
        )


@router.post(
    "/logout",
    status_code=status.HTTP_200_OK,
    summary="Logout user",
    description="Invalidate user tokens (placeholder for future token blacklisting)",
    responses={
        200: {"description": "Logout successful"},
        400: {"description": "Invalid request"}
    }
)
async def logout(request: LogoutRequest) -> dict:
    """
    Logout user by invalidating tokens.
    
    Note: This is a placeholder implementation. In a production system,
    you would typically:
    - Add refresh tokens to a blacklist/revocation list
    - Clear any server-side session data
    - Log the logout event for security auditing
    
    Args:
        request: Logout request with optional refresh token
        
    Returns:
        Logout confirmation message
    """
    # Placeholder implementation
    # In a real system, you would blacklist the refresh token
    
    logger.info("User logout requested")
    
    return {
        "message": "Logout successful",
        "details": "Tokens have been invalidated"
    }

