"""
Conversation SQLAlchemy Model

Database model for conversations and messages in the KyroChat application.
Represents conversations between users and AI bots.
"""

from typing import Optional
from enum import Enum

from sqlalchemy import String, Text, ForeignKey, Index, Integer, Float
from sqlalchemy import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class MessageRole(str, Enum):
    """Message role enumeration."""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class ConversationModel(BaseModel):
    """
    SQLAlchemy model for conversations.
    
    Maps to the 'conversations' table in the database.
    Represents a conversation session between a user and a bot.
    """
    __tablename__ = "conversations"
    
    # Core conversation information
    title: Mapped[Optional[str]] = mapped_column(
        String(200),
        nullable=True
    )
    
    # Relationships
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    bot_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("bots.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # Conversation metadata
    is_active: Mapped[bool] = mapped_column(
        default=True,
        nullable=False,
        server_default="true"
    )
    
    is_pinned: Mapped[bool] = mapped_column(
        default=False,
        nullable=False,
        server_default="false"
    )
    
    # Statistics
    message_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
        server_default="0"
    )
    
    total_tokens_used: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
        server_default="0"
    )
    
    # Context and settings
    context_summary: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    settings: Mapped[Optional[dict]] = mapped_column(
        JSON,  # Use generic JSON for cross-dialect support
        nullable=True
    )
    
    # User feedback
    rating: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True
    )
    
    feedback: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    # Relationships
    user: Mapped["UserModel"] = relationship(
        "UserModel",
        back_populates="conversations",
        foreign_keys=[user_id]
    )
    
    bot: Mapped["BotModel"] = relationship(
        "BotModel", 
        back_populates="conversations",
        foreign_keys=[bot_id]
    )
    
    messages: Mapped[list["MessageModel"]] = relationship(
        "MessageModel",
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="MessageModel.created_at"
    )
    
    # Database indexes for performance
    __table_args__ = (
        Index('idx_conversations_user_active', 'user_id', 'is_active'),
        Index('idx_conversations_bot_active', 'bot_id', 'is_active'),
        Index('idx_conversations_user_pinned', 'user_id', 'is_pinned'),
        Index('idx_conversations_created_at', 'created_at'),
        Index('idx_conversations_rating', 'rating'),
    )
    
    def __repr__(self) -> str:
        """String representation of the conversation."""
        return f"<ConversationModel(id={self.id}, user_id={self.user_id}, bot_id={self.bot_id})>"
    
    def increment_message_count(self) -> None:
        """Increment the message count."""
        self.message_count += 1
    
    def add_tokens_used(self, tokens: int) -> None:
        """Add to the total tokens used."""
        self.total_tokens_used += tokens


class MessageModel(BaseModel):
    """
    SQLAlchemy model for messages within conversations.
    
    Maps to the 'messages' table in the database.
    """
    __tablename__ = "messages"
    
    # Message content
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
    
    role: Mapped[MessageRole] = mapped_column(
        String(20),
        nullable=False,
        index=True
    )
    
    # Conversation relationship
    conversation_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # Message metadata
    tokens_used: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )
    
    processing_time_ms: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True
    )
    
    # AI model information (for assistant messages)
    model_name: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True
    )
    
    temperature: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True
    )
    
    # Message context and metadata
    message_metadata: Mapped[Optional[dict]] = mapped_column(
        JSON,
        nullable=True
    )
    
    # Error tracking
    error_message: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    # User feedback on individual messages
    is_helpful: Mapped[Optional[bool]] = mapped_column(
        nullable=True
    )
    
    user_feedback: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    # Relationships
    conversation: Mapped["ConversationModel"] = relationship(
        "ConversationModel",
        back_populates="messages",
        foreign_keys=[conversation_id]
    )
    
    # Database indexes for performance
    __table_args__ = (
        Index('idx_messages_conversation_created', 'conversation_id', 'created_at'),
        Index('idx_messages_role', 'role'),
        Index('idx_messages_tokens', 'tokens_used'),
        Index('idx_messages_processing_time', 'processing_time_ms'),
    )
    
    def __repr__(self) -> str:
        """String representation of the message."""
        content_preview = self.content[:50] + "..." if len(self.content) > 50 else self.content
        return f"<MessageModel(id={self.id}, role={self.role}, content='{content_preview}')>"
    
    def is_from_user(self) -> bool:
        """Check if message is from user."""
        return self.role == MessageRole.USER
    
    def is_from_assistant(self) -> bool:
        """Check if message is from assistant."""
        return self.role == MessageRole.ASSISTANT
