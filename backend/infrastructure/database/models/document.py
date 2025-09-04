"""
Document SQLAlchemy Model

Stores metadata for uploaded documents used for bot training.
"""

from typing import Optional

from sqlalchemy import String, Integer, Text, Index
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class DocumentModel(BaseModel):
    """SQLAlchemy model for uploaded documents."""

    __tablename__ = "documents"

    owner_id: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    bot_id: Mapped[Optional[int]] = mapped_column(Integer, index=True, nullable=True)

    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(1024), nullable=False)
    file_type: Mapped[str] = mapped_column(String(50), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)

    status: Mapped[str] = mapped_column(String(50), nullable=False, default="uploaded")
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    __table_args__ = (
        Index("idx_documents_owner", "owner_id"),
        Index("idx_documents_bot", "bot_id"),
        Index("idx_documents_status", "status"),
    )

    def __repr__(self) -> str:
        return f"<DocumentModel(id={self.id}, owner_id={self.owner_id}, file='{self.file_name}')>"


