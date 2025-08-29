"""
Value Object - BotId

Represents a validated bot identifier within the domain.
Immutable and compared by value, not identity.
"""

from __future__ import annotations


class BotId:
    """Bot ID value object with basic validation."""

    def __init__(self, value: str):
        if not isinstance(value, str) or not value.strip():
            raise ValueError("Bot ID must be a non-empty string")
        self._value = value

    def __str__(self) -> str:
        return self._value

    def __repr__(self) -> str:
        return f"BotId({self._value!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, BotId):
            return False
        return self._value == other._value

    def __hash__(self) -> int:
        return hash(self._value)
