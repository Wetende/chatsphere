"""
User Entity - Core User Business Logic

Pure domain entity representing a KyroChat user.
Contains all business rules and behavior related to user management.

Business Rules:
- Email must be unique across the platform
- Username must be 3-50 characters, alphanumeric with underscores/hyphens
- Password must meet security requirements
- User can have multiple bots but within subscription limits
- User verification status affects platform access
- Subscription status determines feature availability

Key Methods:
- verify_email(): Mark user as verified
- change_subscription(): Update subscription with validation
- can_create_bot(): Check if user can create more bots
- deactivate(): Safely deactivate user account
- update_profile(): Update profile with validation

No Infrastructure Dependencies:
- No SQLAlchemy models
- No database concerns
- No HTTP concerns
- Pure business logic only
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from ..value_objects.user_id import UserId
from ..value_objects.email import Email
from ..value_objects.username import Username
from ..exceptions.domain_exceptions import DomainException


@dataclass
class User:
    """Pure domain entity for User with business logic and invariants."""
    
    # Identity
    id: Optional[UserId] = None
    
    # Core attributes
    username: Username = None
    email: Email = None
    password_hash: str = ""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    
    # Status attributes
    is_active: bool = True
    is_verified: bool = False
    subscription_status: str = "free"
    
    # Authentication tracking
    last_login: Optional[datetime] = None
    failed_login_attempts: int = 0
    locked_until: Optional[datetime] = None
    
    # Timestamps
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    def __post_init__(self):
        """Validate business invariants after initialization."""
        pass  # Implementation would go here
    
    @classmethod
    def create(
        cls,
        username: Username,
        email: Email,
        first_name: str,
        last_name: str
    ) -> 'User':
        """Factory method for creating new users with business rules."""
        return cls(
            id=UserId(0),  # New user starts with ID 0, will get auto-assigned
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_active=True,
            is_verified=False,
            subscription_status="free",
            created_at=datetime.now()
        )
    
    def verify_email(self) -> None:
        """Mark user as verified following business rules."""
        pass  # Implementation would go here
    
    def change_subscription(self, new_status: str) -> None:
        """Change subscription status with validation."""
        pass  # Implementation would go here
    
    def can_create_bot(self) -> bool:
        """Check if user can create more bots based on subscription."""
        pass  # Implementation would go here
    
    def deactivate(self) -> None:
        """Deactivate user account with business rule validation."""
        pass  # Implementation would go here
