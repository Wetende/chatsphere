"""
Message ID Value Object

Represents a unique message identifier in the domain layer.
Ensures type safety and validation for message identifiers.

Key Features:
- Type-safe message ID handling
- UUID validation and normalization
- Immutable value object
- Clear business meaning
"""

import uuid
from dataclasses import dataclass


@dataclass(frozen=True)
class MessageId:
    """
    Message ID value object.
    
    Immutable identifier for messages in the system.
    Uses UUID format for uniqueness and consistency.
    """
    
    value: str
    
    def __post_init__(self):
        """Validate message ID format."""
        if not self.value:
            raise ValueError("Message ID cannot be empty")
        
        # Validate UUID format
        try:
            uuid.UUID(self.value)
        except ValueError:
            raise ValueError(f"Invalid message ID format: {self.value}")
    
    def __str__(self) -> str:
        """String representation of message ID."""
        return self.value
    
    def __eq__(self, other) -> bool:
        """Check equality with another MessageId."""
        if not isinstance(other, MessageId):
            return False
        return self.value == other.value
    
    def __hash__(self) -> int:
        """Hash for use in sets and dictionaries."""
        return hash(self.value)
    
    @classmethod
    def generate(cls) -> 'MessageId':
        """Generate a new message ID."""
        return cls(str(uuid.uuid4()))
    
    @classmethod 
    def from_string(cls, value: str) -> 'MessageId':
        """Create MessageId from string value."""
        return cls(value)
