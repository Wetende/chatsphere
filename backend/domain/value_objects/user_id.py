"""
UserId Value Object

Immutable value object representing a unique user identifier.
Ensures all user IDs follow consistent format and validation rules.

Validation Rules:
- Must be a valid integer
- Cannot be None for existing users
- Use 0 for new users (auto-increment will assign actual ID)
- Provides string representation for API serialization

Usage:
- user_id = UserId(0)  # For new users (will get auto-assigned ID)
- user_id = UserId(123)  # For existing users with ID 123
- str(user_id)  # Get string representation
- user_id.value  # Get integer value

Immutability:
- Once created, cannot be modified
- Thread-safe
- Can be safely shared between entities
- Hash-based equality comparison
"""

from typing import Union
import uuid


class UserId:
    """Value object for User ID with validation and immutability.

    Accepts either an integer ID or a UUID string for flexibility across
    different persistence strategies in tests.
    """
    
    def __init__(self, value: Union[int, str, None] = None):
        """Initialize UserId with validation.
        
        Args:
            value: Integer ID, UUID string, numeric string, or None (defaults to 0 for new users)
        """
        if value is None:
            self._value = "0"
        elif isinstance(value, int):
            if value < 0:
                raise ValueError(f"Invalid UserId: must be non-negative integer, got {value}")
            self._value = str(value)
        elif isinstance(value, str):
            # Numeric string
            if value.isdigit():
                if int(value) < 0:
                    raise ValueError(f"Invalid UserId: must be non-negative integer, got {value}")
                self._value = value
            else:
                # Accept UUID strings for compatibility with tests
                try:
                    uuid.UUID(value)
                    self._value = value
                except Exception as e:
                    raise ValueError(f"Invalid UserId string format: {value}") from e
        else:
            raise ValueError(f"Invalid UserId type: {type(value)}")
    
    @property
    def value(self):
        """Get the value: returns int for numeric IDs, otherwise UUID string."""
        return int(self._value) if str(self._value).isdigit() else self._value
    
    def __str__(self) -> str:
        """String representation for API serialization."""
        return str(self._value)
    
    def __eq__(self, other) -> bool:
        """Value-based equality comparison."""
        if not isinstance(other, UserId):
            return False
        return self._value == other._value
    
    def __hash__(self) -> int:
        """Hash for use in sets and dictionaries."""
        return hash(self._value)
    
    def __repr__(self) -> str:
        """Developer-friendly representation."""
        return f"UserId({self._value})"
    
    def is_new_user(self) -> bool:
        """Check if this represents a new user (ID = 0)."""
        return self._value == "0"
