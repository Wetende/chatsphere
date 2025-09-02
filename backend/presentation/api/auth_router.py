"""
Authentication API Router

FastAPI router for authentication operations including login, password reset,
and email verification endpoints. Delegates to application use cases.

Endpoints (GET and POST only as requested):
- POST /auth/login: User authentication
- POST /auth/register: User registration
- POST /auth/forgot-password: Password reset initiation
- POST /auth/reset-password: Password reset confirmation
- GET /auth/verify-email: Email verification
- POST /auth/resend-verification: Resend verification email

Key Features:
- Comprehensive error handling
- OpenAPI documentation
- Request/response validation with Pydantic
- Security best practices (no user enumeration)
- Rate limiting considerations
"""

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel, EmailStr, Field

from application.use_cases.user.create_user_use_case import (
    CreateUserUseCase
)
from application.dtos.user_dtos import CreateUserRequestDTO
from application.use_cases.user.authenticate_user_use_case import (
    AuthenticateUserUseCase
)
from application.dtos.user_dtos import AuthenticateUserRequestDTO
from application.use_cases.user.reset_password_use_case import (
    ResetPasswordUseCase,
    ResetPasswordRequest
)
from application.use_cases.user.confirm_password_reset_use_case import (
    ConfirmPasswordResetUseCase,
    ConfirmPasswordResetRequest
)
from application.use_cases.user.verify_email_use_case import (
    VerifyEmailUseCase,
    VerifyEmailRequest,
    ResendVerificationEmailUseCase,
    ResendVerificationEmailRequest
)
from application.exceptions.application_exceptions import (
    UserNotFoundException,
    AuthorizationException,
    ValidationException,
    UserAlreadyExistsException
)

# Import dependency providers from composition root
from composition_root import (
    get_create_user_use_case,
    get_authenticate_user_use_case,
    get_reset_password_use_case,
    get_confirm_password_reset_use_case,
    get_verify_email_use_case,
    get_resend_verification_email_use_case
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
class RegisterRequest(BaseModel):
    """User registration request model."""
    email: EmailStr = Field(..., description="User email address")
    username: str = Field(..., min_length=3, max_length=50, description="Username")
    password: str = Field(..., min_length=8, description="Password (minimum 8 characters)")
    first_name: str = Field(..., min_length=1, max_length=50, description="First name")
    last_name: str = Field(..., min_length=1, max_length=50, description="Last name")


class RegisterResponse(BaseModel):
    """User registration response model."""
    success: bool = Field(..., description="Registration success status")
    user_id: int = Field(..., description="Created user ID")
    message: str = Field(..., description="Success message")


class LoginRequest(BaseModel):
    """User login request model."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., description="User password")
    remember_me: bool = Field(False, description="Remember login session")


class LoginResponse(BaseModel):
    """User login response model."""
    success: bool = Field(..., description="Login success status")
    access_token: str = Field(..., description="JWT access token")
    refresh_token: Optional[str] = Field(None, description="JWT refresh token")
    expires_at: str = Field(..., description="Token expiration timestamp")
    user_id: int = Field(..., description="Authenticated user ID")


class ForgotPasswordRequest(BaseModel):
    """Forgot password request model."""
    email: EmailStr = Field(..., description="User email address")


class ResetPasswordRequest(BaseModel):
    """Reset password request model."""
    reset_token: str = Field(..., description="Password reset token")
    new_password: str = Field(..., min_length=8, description="New password (minimum 8 characters)")
    confirm_password: str = Field(..., description="Confirm new password")


class ResendVerificationRequest(BaseModel):
    """Resend verification email request model."""
    email: EmailStr = Field(..., description="User email address")


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register new user account",
    description="Create a new user account with email verification",
    responses={
        201: {"description": "User registered successfully"},
        400: {"description": "Validation error"},
        409: {"description": "Email or username already exists"}
    }
)
async def register(
    request: RegisterRequest,
    create_user_use_case: CreateUserUseCase = Depends(get_create_user_use_case)
) -> RegisterResponse:
    """
    Register a new user account.
    
    Business Logic:
    - Validates user input data
    - Checks email and username uniqueness
    - Creates new user account with secure password hashing
    - Sends email verification link
    - Returns registration confirmation
    
    Args:
        request: User registration data
        create_user_use_case: Injected create user use case
        
    Returns:
        User registration response with user ID
        
    Raises:
        HTTPException: If validation fails or user already exists
    """
    try:
        # Create user creation request
        create_request = CreateUserRequestDTO(
            email=request.email,
            username=request.username,
            password=request.password,
            first_name=request.first_name,
            last_name=request.last_name
        )
        
        # Execute create user use case
        response = await create_user_use_case.execute(create_request)
        
        return RegisterResponse(
            success=True,
            user_id=response.user_id,
            message=response.message
        )
        
    except UserAlreadyExistsException as e:
        logger.warning(f"Registration failed - user exists: {e}")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )
    except ValidationException as e:
        logger.warning(f"Registration validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register user"
        )


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="User authentication",
    description="Authenticate user and return access tokens",
    responses={
        200: {"description": "Authentication successful"},
        401: {"description": "Invalid credentials"},
        400: {"description": "Validation error"}
    }
)
async def login(
    request: LoginRequest,
    authenticate_user_use_case: AuthenticateUserUseCase = Depends(get_authenticate_user_use_case)
) -> LoginResponse:
    """
    Authenticate user and return access tokens.
    
    Business Logic:
    - Validates user credentials
    - Generates JWT access and refresh tokens
    - Updates last login timestamp
    - Returns authentication tokens
    
    Args:
        request: User login data
        authenticate_user_use_case: Injected authenticate user use case
        
    Returns:
        Authentication response with tokens
        
    Raises:
        HTTPException: If authentication fails
    """
    try:
        # Create authentication request
        auth_request = AuthenticateUserRequestDTO(
            email=request.email,
            password=request.password,
            remember_me=request.remember_me
        )
        
        # Execute authentication use case
        response = await authenticate_user_use_case.execute(auth_request)
        
        if not response.success:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        return LoginResponse(
            success=response.success,
            access_token=response.access_token,
            refresh_token=response.refresh_token,
            expires_at=response.expires_at.isoformat(),
            user_id=response.user_id
        )
        
    except ValidationException as e:
        logger.warning(f"Login validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to authenticate user"
        )


@router.post(
    "/forgot-password",
    status_code=status.HTTP_200_OK,
    summary="Request password reset",
    description="Request password reset email for account recovery",
    responses={
        200: {"description": "Password reset email sent (if account exists)"},
        400: {"description": "Validation error"}
    }
)
async def forgot_password(
    request: ForgotPasswordRequest,
    reset_password_use_case: ResetPasswordUseCase = Depends(get_reset_password_use_case)
) -> dict:
    """
    Request password reset email.
    
    Business Logic:
    - Validates email format
    - Generates secure reset token if user exists
    - Sends password reset email
    - Returns consistent response (no user enumeration)
    
    Args:
        request: Forgot password request data
        reset_password_use_case: Injected reset password use case
        
    Returns:
        Password reset request confirmation
    """
    try:
        # Create reset password request
        reset_request = ResetPasswordRequest(email=request.email)
        
        # Execute reset password use case
        response = await reset_password_use_case.execute(reset_request)
        
        return {
            "success": response.success,
            "message": response.message
        }
        
    except ValidationException as e:
        logger.warning(f"Forgot password validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected forgot password error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process password reset request"
        )


@router.post(
    "/reset-password",
    status_code=status.HTTP_200_OK,
    summary="Confirm password reset",
    description="Reset password using verification token",
    responses={
        200: {"description": "Password reset successfully"},
        400: {"description": "Invalid token or validation error"}
    }
)
async def reset_password(
    request: ResetPasswordRequest,
    confirm_password_reset_use_case: ConfirmPasswordResetUseCase = Depends(get_confirm_password_reset_use_case)
) -> dict:
    """
    Confirm password reset with new password.
    
    Business Logic:
    - Validates reset token and expiration
    - Validates new password requirements
    - Updates user password with secure hashing
    - Invalidates reset token
    - Returns reset confirmation
    
    Args:
        request: Password reset confirmation data
        confirm_password_reset_use_case: Injected confirm password reset use case
        
    Returns:
        Password reset confirmation
        
    Raises:
        HTTPException: If token is invalid or validation fails
    """
    try:
        # Create confirm password reset request
        confirm_request = ConfirmPasswordResetRequest(
            reset_token=request.reset_token,
            new_password=request.new_password,
            confirm_password=request.confirm_password
        )
        
        # Execute confirm password reset use case
        response = await confirm_password_reset_use_case.execute(confirm_request)
        
        return {
            "success": response.success,
            "message": response.message
        }
        
    except ValidationException as e:
        logger.warning(f"Password reset confirmation validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected password reset confirmation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reset password"
        )


@router.get(
    "/verify-email",
    status_code=status.HTTP_200_OK,
    summary="Verify email address",
    description="Verify user email address using verification token",
    responses={
        200: {"description": "Email verified successfully"},
        400: {"description": "Invalid token or validation error"}
    }
)
async def verify_email(
    user_id: int = Query(..., description="User ID"),
    token: str = Query(..., description="Email verification token"),
    verify_email_use_case: VerifyEmailUseCase = Depends(get_verify_email_use_case)
) -> dict:
    """
    Verify user email address.
    
    Business Logic:
    - Validates verification token
    - Marks user email as verified
    - Clears verification token
    - Returns verification confirmation
    
    Args:
        user_id: User ID from verification link
        token: Email verification token
        verify_email_use_case: Injected verify email use case
        
    Returns:
        Email verification confirmation
        
    Raises:
        HTTPException: If token is invalid or validation fails
    """
    try:
        # Create verify email request
        verify_request = VerifyEmailRequest(
            user_id=user_id,
            verification_token=token
        )
        
        # Execute verify email use case
        response = await verify_email_use_case.execute(verify_request)
        
        return {
            "success": response.success,
            "message": response.message,
            "already_verified": response.already_verified
        }
        
    except (ValidationException, UserNotFoundException) as e:
        logger.warning(f"Email verification validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected email verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to verify email"
        )


@router.post(
    "/resend-verification",
    status_code=status.HTTP_200_OK,
    summary="Resend verification email",
    description="Resend email verification link to user",
    responses={
        200: {"description": "Verification email sent (if account exists)"},
        400: {"description": "Validation error"}
    }
)
async def resend_verification(
    request: ResendVerificationRequest,
    resend_verification_use_case: ResendVerificationEmailUseCase = Depends(get_resend_verification_email_use_case)
) -> dict:
    """
    Resend email verification link.
    
    Business Logic:
    - Validates email format
    - Generates new verification token if user exists and is unverified
    - Sends verification email
    - Returns consistent response (no user enumeration)
    
    Args:
        request: Resend verification request data
        resend_verification_use_case: Injected resend verification use case
        
    Returns:
        Verification email sent confirmation
    """
    try:
        # Create resend verification request
        resend_request = ResendVerificationEmailRequest(email=request.email)
        
        # Execute resend verification use case
        response = await resend_verification_use_case.execute(resend_request)
        
        return {
            "success": response.success,
            "message": response.message
        }
        
    except ValidationException as e:
        logger.warning(f"Resend verification validation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected resend verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to resend verification email"
        )