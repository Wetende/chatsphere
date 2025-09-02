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

from dataclasses import dataclass


@dataclass(frozen=True)
class ConversationId:
    """Conversation ID value object using integers (0 for new)."""
    value: int

    def __post_init__(self):
        if not isinstance(self.value, int) or self.value < 0:
            raise ValueError("Conversation ID must be a non-negative integer")

    def __str__(self) -> str:
        return str(self.value)

    def __eq__(self, other) -> bool:
        if not isinstance(other, ConversationId):
            return False
        return self.value == other.value

    def __hash__(self) -> int:
        return hash(self.value)

    @classmethod
    def new(cls) -> 'ConversationId':
        return cls(0)
