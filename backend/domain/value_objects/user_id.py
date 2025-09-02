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


class UserId:
    """Value object for User ID with validation and immutability."""
    
    def __init__(self, value: Union[int, str, None] = None):
        """
        Initialize UserId with validation.
        
        Args:
            value: Integer ID, string representation of ID, or None (defaults to 0 for new users)
            
        Raises:
            ValueError: If value is not a valid integer or convertible to integer
        """
        if value is None:
            self._value = 0  # Default for new users
        elif isinstance(value, int):
            if value < 0:
                raise ValueError(f"Invalid UserId: must be non-negative integer, got {value}")
            self._value = value
        elif isinstance(value, str):
            try:
                parsed_value = int(value)
                if parsed_value < 0:
                    raise ValueError(f"Invalid UserId: must be non-negative integer, got {parsed_value}")
                self._value = parsed_value
            except ValueError as e:
                raise ValueError(f"Invalid UserId string format: {value}") from e
        else:
            raise ValueError(f"Invalid UserId type: {type(value)}")
    
    @property
    def value(self) -> int:
        """Get the integer value."""
        return self._value
    
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
        return self._value == 0
