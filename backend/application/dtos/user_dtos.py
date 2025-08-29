"""
User Data Transfer Objects

DTOs for user-related operations including registration, authentication,
profile management, and user queries.

Input Validation:
- Email format validation
- Password strength requirements
- Username format constraints
- Required field enforcement
- Length limitations

Output Formatting:
- Sensitive data exclusion (passwords, tokens)
- Consistent timestamp formatting
- Optional field handling
- Nested object serialization
"""

from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime


@dataclass
class CreateUserRequestDTO:
    """Request DTO for user creation with validation rules."""
    
    email: str  # Must be valid email format
    username: str  # 3-50 chars, alphanumeric with underscore/hyphen
    password: str  # Min 8 chars, complexity requirements
    first_name: str  # Required, max 50 chars
    last_name: str  # Required, max 50 chars
    
    def __post_init__(self):
        """Validate input data after initialization."""
        # Implementation would include validation logic
        pass


@dataclass  
class CreateUserResponseDTO:
    """Response DTO for user creation result."""
    
    user_id: str
    email: str
    username: str
    is_verified: bool
    message: str
    created_at: Optional[datetime] = None


@dataclass
class AuthenticateUserRequestDTO:
    """Request DTO for user authentication."""
    
    email: str  # Email or username
    password: str  # Plain text password for validation
    remember_me: bool = False


@dataclass
class AuthenticateUserResponseDTO:
    """Response DTO for authentication result."""
    
    success: bool
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    user_id: Optional[str] = None
    expires_at: Optional[datetime] = None
    message: Optional[str] = None


@dataclass
class UpdateUserProfileRequestDTO:
    """Request DTO for user profile updates."""
    
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None  # Must be unique if provided


@dataclass
class UserProfileResponseDTO:
    """Response DTO for user profile information."""
    
    user_id: str
    email: str
    username: str
    first_name: str
    last_name: str
    is_active: bool
    is_verified: bool
    subscription_status: str
    created_at: datetime
    last_login: Optional[datetime] = None


@dataclass
class UserListResponseDTO:
    """Response DTO for paginated user lists."""
    
    users: List[UserProfileResponseDTO]
    total_count: int
    page: int
    page_size: int
    has_next: bool
    has_previous: bool


@dataclass
class ChangePasswordRequestDTO:
    """Request DTO for password changes."""
    
    current_password: str
    new_password: str  # Must meet complexity requirements
    confirm_password: str  # Must match new_password


@dataclass
class VerifyEmailRequestDTO:
    """Request DTO for email verification."""
    
    user_id: str
    verification_token: str


@dataclass
class DeactivateUserRequestDTO:
    """Request DTO for user deactivation."""
    
    user_id: str
    reason: Optional[str] = None  # Optional deactivation reason
