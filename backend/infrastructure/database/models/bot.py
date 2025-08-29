"""
Bot SQLAlchemy Model

Database model for AI bots in the ChatSphere application.
Represents the bot table with configuration and metadata.
"""

import uuid
from typing import Optional

from sqlalchemy import String, Boolean, Text, ForeignKey, Index, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class BotModel(BaseModel):
    """
    SQLAlchemy model for AI bots.
    
    Maps to the 'bots' table in the database.
    """
    __tablename__ = "bots"
    
    # Core bot information
    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True
    )
    
    description: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    # Owner relationship
    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # Bot configuration
    model_name: Mapped[str] = mapped_column(
        String(100),
        default="gemini-pro",
        nullable=False
    )
    
    temperature: Mapped[float] = mapped_column(
        default=0.7,
        nullable=False
    )
    
    max_tokens: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )
    
    system_prompt: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    # Bot behavior settings
    is_public: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        server_default="false"
    )
    
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
        server_default="true"
    )
    
    # Knowledge base and capabilities
    knowledge_base_id: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
        index=True
    )
    
    capabilities: Mapped[Optional[str]] = mapped_column(
        Text,  # JSON string of capabilities list
        nullable=True
    )
    
    # Usage and limits
    usage_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
        server_default="0"
    )
    
    max_daily_usage: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )
    
    # Appearance and branding
    avatar_url: Mapped[Optional[str]] = mapped_column(
        String(500),
        nullable=True
    )
    
    color_theme: Mapped[Optional[str]] = mapped_column(
        String(7),  # Hex color code
        nullable=True
    )
    
    # Bot metadata
    category: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
        index=True
    )
    
    tags: Mapped[Optional[str]] = mapped_column(
        Text,  # JSON string of tags array
        nullable=True
    )
    
    # Statistics and ratings
    total_conversations: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
        server_default="0"
    )
    
    average_rating: Mapped[Optional[float]] = mapped_column(
        nullable=True
    )
    
    total_ratings: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
        server_default="0"
    )
    
    # Relationships
    owner: Mapped["UserModel"] = relationship(
        "UserModel",
        back_populates="bots",
        foreign_keys=[owner_id]
    )
    
    conversations: Mapped[list["ConversationModel"]] = relationship(
        "ConversationModel", 
        back_populates="bot", 
        cascade="all, delete-orphan"
    )
    
    # Database indexes for performance
    __table_args__ = (
        Index('idx_bots_owner_active', 'owner_id', 'is_active'),
        Index('idx_bots_public_active', 'is_public', 'is_active'),
        Index('idx_bots_category', 'category'),
        Index('idx_bots_name_owner', 'name', 'owner_id'),
        Index('idx_bots_knowledge_base', 'knowledge_base_id'),
        Index('idx_bots_usage_count', 'usage_count'),
    )
    
    def __repr__(self) -> str:
        """String representation of the bot."""
        return f"<BotModel(id={self.id}, name={self.name}, owner_id={self.owner_id})>"
    
    def increment_usage(self) -> None:
        """Increment the bot usage count."""
        self.usage_count += 1
    
    def is_usage_limit_reached(self) -> bool:
        """Check if daily usage limit is reached."""
        if not self.max_daily_usage:
            return False
        # In a real implementation, you'd check daily usage from conversations
        return self.usage_count >= self.max_daily_usage
    
    def add_rating(self, rating: float) -> None:
        """Add a new rating and update average."""
        if self.total_ratings == 0:
            self.average_rating = rating
        else:
            total_score = (self.average_rating or 0) * self.total_ratings
            self.average_rating = (total_score + rating) / (self.total_ratings + 1)
        
        self.total_ratings += 1
