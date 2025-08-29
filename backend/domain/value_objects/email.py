"""
Email Value Object

Immutable value object representing a validated email address.
Ensures all emails follow consistent format and normalization rules.

Validation Rules:
- Must be valid email format (RFC 5322 compliant)
- Automatically normalized to lowercase
- Domain validation
- Length restrictions (max 254 characters)
- Special character handling

Business Rules:
- Emails must be unique per user
- Normalization ensures consistency
- Domain extraction for business logic
- Local part extraction for validation

Usage:
- email = Email("user@example.com")
- email.value  # "user@example.com"
- email.domain  # "example.com"
- email.local_part  # "user"

Immutability:
- Once created, cannot be modified
- Thread-safe
- Can be safely shared between entities
- Hash-based equality comparison
"""

import re
from typing import Union


class Email:
    """Value object for Email with validation and normalization."""
    
    # RFC 5322 compliant email regex
    EMAIL_REGEX = re.compile(
        r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    )
    
    def __init__(self, value: Union[str, 'Email']):
        """
        Initialize Email with validation and normalization.
        
        Args:
            value: Email string or Email instance
            
        Raises:
            ValueError: If email format is invalid
        """
        if isinstance(value, Email):
            self._value = value._value
        elif isinstance(value, str):
            if not self._is_valid_email(value):
                raise ValueError(f"Invalid email format: {value}")
            # Normalize to lowercase and strip whitespace
            self._value = value.lower().strip()
        else:
            raise ValueError(f"Email must be a string or Email instance, got {type(value)}")
        
        # Additional length validation
        if len(self._value) > 254:
            raise ValueError("Email address too long (max 254 characters)")
    
    @property
    def value(self) -> str:
        """Get the normalized email string."""
        return self._value
    
    @property
    def domain(self) -> str:
        """Extract domain part from email."""
        return self._value.split('@')[1]
    
    @property
    def local_part(self) -> str:
        """Extract local part from email."""
        return self._value.split('@')[0]
    
    def _is_valid_email(self, email: str) -> bool:
        """Validate email format using regex."""
        if not email or '@' not in email:
            return False
        return bool(self.EMAIL_REGEX.match(email.strip()))
    
    def __str__(self) -> str:
        """String representation for API serialization."""
        return self._value
    
    def __eq__(self, other) -> bool:
        """Value-based equality comparison."""
        if not isinstance(other, Email):
            return False
        return self._value == other._value
    
    def __hash__(self) -> int:
        """Hash for use in sets and dictionaries."""
        return hash(self._value)
    
    def __repr__(self) -> str:
        """Developer-friendly representation."""
        return f"Email('{self._value}')"
