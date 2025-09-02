"""
User SQLAlchemy Model

Database model for users in the KyroChat application.
Represents the user table with all necessary fields and constraints.
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import String, Boolean, DateTime, Text, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class UserModel(BaseModel):
    """
    SQLAlchemy model for users.
    
    Maps to the 'users' table in the database.
    """
    __tablename__ = "users"
    
    # Core user information
    email: Mapped[str] = mapped_column(
        String(320),  # RFC 5322 max email length
        unique=True,
        nullable=False,
        index=True
    )
    
    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )
    
    password_hash: Mapped[str] = mapped_column(
        String(255),  # Bcrypt hash length
        nullable=False
    )
    
    # Personal information
    first_name: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True
    )
    
    last_name: Mapped[Optional[str]] = mapped_column(
        String(100),
        nullable=True
    )
    
    # Account status
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
        server_default="true"
    )
    
    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        server_default="false"
    )
    
    # Subscription and usage
    subscription_status: Mapped[str] = mapped_column(
        String(20),
        default="free",
        nullable=False,
        server_default="'free'"
    )
    
    # Authentication tracking
    last_login: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )
    
    failed_login_attempts: Mapped[int] = mapped_column(
        default=0,
        nullable=False,
        server_default="0"
    )
    
    locked_until: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )
    
    # Verification
    verification_token: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
        index=True
    )
    
    verification_token_expires: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )
    
    # Password reset
    reset_token: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
        index=True
    )
    
    reset_token_expires: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )
    
    # Profile information
    bio: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    
    profile_image_url: Mapped[Optional[str]] = mapped_column(
        String(500),
        nullable=True
    )
    
    timezone: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True
    )
    
    # Preferences (stored as JSON in real implementation)
    preferences: Mapped[Optional[str]] = mapped_column(
        Text,  # Would be JSON type in real implementation
        nullable=True
    )
    
    # Relationships
    bots: Mapped[list["BotModel"]] = relationship(
        "BotModel", 
        back_populates="owner", 
        cascade="all, delete-orphan"
    )
    
    conversations: Mapped[list["ConversationModel"]] = relationship(
        "ConversationModel", 
        back_populates="user", 
        cascade="all, delete-orphan"
    )
    
    # Database indexes for performance
    __table_args__ = (
        Index('idx_users_email_active', 'email', 'is_active'),
        Index('idx_users_username_active', 'username', 'is_active'),
        Index('idx_users_subscription', 'subscription_status'),
        Index('idx_users_verification', 'verification_token'),
        Index('idx_users_reset_token', 'reset_token'),
        Index('idx_users_last_login', 'last_login'),
    )
    
    def __repr__(self) -> str:
        """String representation of the user."""
        return f"<UserModel(id={self.id}, email={self.email}, username={self.username})>"
    
    def is_account_locked(self) -> bool:
        """Check if the account is locked."""
        if not self.locked_until:
            return False
        return datetime.now(timezone=self.locked_until.tzinfo) < self.locked_until
    
    def clear_failed_attempts(self) -> None:
        """Clear failed login attempts."""
        self.failed_login_attempts = 0
        self.locked_until = None
