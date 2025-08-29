"""
UserId Value Object

Immutable value object representing a unique user identifier.
Ensures all user IDs follow consistent format and validation rules.

Validation Rules:
- Must be a valid UUID v4
- Cannot be None or empty
- Automatically generates new UUID if not provided
- Provides string representation for API serialization

Usage:
- user_id = UserId()  # Generates new UUID
- user_id = UserId("existing-uuid-string")  # From existing ID
- str(user_id)  # Get string representation
- user_id.value  # Get UUID object

Immutability:
- Once created, cannot be modified
- Thread-safe
- Can be safely shared between entities
- Hash-based equality comparison
"""

import uuid
from typing import Union


class UserId:
    """Value object for User ID with validation and immutability."""
    
    def __init__(self, value: Union[str, uuid.UUID, None] = None):
        """
        Initialize UserId with validation.
        
        Args:
            value: UUID string, UUID object, or None (generates new UUID)
            
        Raises:
            ValueError: If value is not a valid UUID
        """
        if value is None:
            self._value = uuid.uuid4()
        elif isinstance(value, str):
            try:
                self._value = uuid.UUID(value)
            except ValueError as e:
                raise ValueError(f"Invalid UserId string format: {value}") from e
        elif isinstance(value, uuid.UUID):
            self._value = value
        else:
            raise ValueError(f"Invalid UserId type: {type(value)}")
    
    @property
    def value(self) -> uuid.UUID:
        """Get the UUID value."""
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
        return f"UserId('{self._value}')"
