"""
Value Object - BotId

Represents a validated bot identifier within the domain.
Immutable and compared by value, not identity.
"""

from __future__ import annotations


class BotId:
    """Bot ID value object using integers (0 for new, >0 existing)."""

    def __init__(self, value: int | str | None = None):
        if value is None:
            self._value = 0
        elif isinstance(value, int):
            if value < 0:
                raise ValueError("Bot ID must be a non-negative integer")
            self._value = value
        elif isinstance(value, str):
            try:
                parsed = int(value)
            except ValueError as e:
                raise ValueError("Bot ID string must be an integer") from e
            if parsed < 0:
                raise ValueError("Bot ID must be a non-negative integer")
            self._value = parsed
        else:
            raise ValueError("Bot ID must be int, str, or None")

    @property
    def value(self) -> int:
        return self._value

    def __str__(self) -> str:
        return str(self._value)

    def __repr__(self) -> str:
        return f"BotId({self._value})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, BotId):
            return False
        return self._value == other._value

    def __hash__(self) -> int:
        return hash(self._value)

    def is_new(self) -> bool:
        return self._value == 0
