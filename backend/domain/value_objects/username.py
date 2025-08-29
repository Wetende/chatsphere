"""
Value Object - Username

Represents a validated username within the domain.
Immutable and compared by value, not identity.
"""

from __future__ import annotations


class Username:
    """Username value object with basic validation."""

    def __init__(self, value: str):
        if not isinstance(value, str) or not value.strip():
            raise ValueError("Username must be a non-empty string")
        if len(value) < 3:
            raise ValueError("Username must be at least 3 characters long")
        self._value = value

    def __str__(self) -> str:
        return self._value

    def __repr__(self) -> str:
        return f"Username({self._value!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Username):
            return False
        return self._value == other._value

    def __hash__(self) -> int:
        return hash(self._value)


