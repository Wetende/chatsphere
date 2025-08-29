"""
Conversation ID Value Object

Represents a unique conversation identifier in the domain layer.
Ensures type safety and validation for conversation identifiers.

Key Features:
- Type-safe conversation ID handling
- UUID validation and normalization
- Immutable value object
- Clear business meaning
"""

import uuid
from dataclasses import dataclass


@dataclass(frozen=True)
class ConversationId:
    """
    Conversation ID value object.
    
    Immutable identifier for conversations in the system.
    Uses UUID format for uniqueness and consistency.
    """
    
    value: str
    
    def __post_init__(self):
        """Validate conversation ID format."""
        if not self.value:
            raise ValueError("Conversation ID cannot be empty")
        
        # Validate UUID format
        try:
            uuid.UUID(self.value)
        except ValueError:
            raise ValueError(f"Invalid conversation ID format: {self.value}")
    
    def __str__(self) -> str:
        """String representation of conversation ID."""
        return self.value
    
    def __eq__(self, other) -> bool:
        """Check equality with another ConversationId."""
        if not isinstance(other, ConversationId):
            return False
        return self.value == other.value
    
    def __hash__(self) -> int:
        """Hash for use in sets and dictionaries."""
        return hash(self.value)
    
    @classmethod
    def generate(cls) -> 'ConversationId':
        """Generate a new conversation ID."""
        return cls(str(uuid.uuid4()))
    
    @classmethod 
    def from_string(cls, value: str) -> 'ConversationId':
        """Create ConversationId from string value."""
        return cls(value)
