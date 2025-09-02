"""
SQLAlchemy Base Model

Provides base functionality for all database models including:
- Primary key fields
- Audit timestamps
- Common SQLAlchemy configurations
"""

from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Integer, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""
    pass


class BaseModel(Base):
    """
    Abstract base model with common fields.
    
    Provides:
    - Integer primary key with auto-increment
    - Audit timestamps (created_at, updated_at)
    - Common functionality
    """
    __abstract__ = True
    
    # Primary key - auto-incrementing integer
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        nullable=False
    )
    
    # Audit timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        server_default=func.now()
    )
    
    updated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=True
    )
    
    def __repr__(self) -> str:
        """String representation of the model."""
        return f"<{self.__class__.__name__}(id={self.id})>"
