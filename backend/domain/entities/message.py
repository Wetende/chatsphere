"""
Message Entity - Core Message Business Logic

Pure domain entity representing a message within a conversation.
Contains all business rules and behavior related to message management.

Business Rules:
- Message content cannot be empty for user/assistant messages
- System messages can have empty content
- Message role determines behavior and validation
- Token usage tracking for cost management
- Processing time tracking for performance monitoring

Key Methods:
- mark_as_helpful(): User feedback on message quality
- update_feedback(): Update user feedback
- calculate_cost(): Calculate message cost based on tokens
- validate_content(): Validate message content based on role

No Infrastructure Dependencies:
- No SQLAlchemy models
- No database concerns
- No HTTP concerns
- Pure business logic only
"""

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from enum import Enum

from ..value_objects.message_id import MessageId
from ..value_objects.conversation_id import ConversationId
from ..exceptions.domain_exceptions import DomainException


class MessageRole(str, Enum):
    """Message role enumeration."""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


@dataclass
class Message:
    """Pure domain entity for Message with business logic and invariants."""
    
    # Identity
    id: Optional[MessageId] = None
    conversation_id: ConversationId = None
    
    # Core content
    content: str = ""
    role: MessageRole = MessageRole.USER
    
    # AI metadata
    tokens_used: Optional[int] = None
    processing_time_ms: Optional[int] = None
    model_name: Optional[str] = None
    temperature: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = field(default_factory=dict)
    
    # Error tracking
    error_message: Optional[str] = None
    
    # User feedback
    is_helpful: Optional[bool] = None
    user_feedback: Optional[str] = None
    
    # Timestamps
    created_at: Optional[datetime] = None
    
    def __post_init__(self):
        """Validate business invariants after initialization."""
        self.validate_content()
        self.validate_role()
        if self.created_at is None:
            self.created_at = datetime.now(timezone.utc)
    
    @classmethod
    def create(
        cls,
        conversation_id: ConversationId,
        content: str,
        role: MessageRole,
        tokens_used: Optional[int] = None,
        processing_time_ms: Optional[int] = None,
        model_name: Optional[str] = None,
        temperature: Optional[float] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> 'Message':
        """Factory method for creating new messages with business rules."""
        message_id = MessageId.generate()
        
        return cls(
            id=message_id,
            conversation_id=conversation_id,
            content=content.strip() if content else "",
            role=role,
            tokens_used=tokens_used,
            processing_time_ms=processing_time_ms,
            model_name=model_name,
            temperature=temperature,
            metadata=metadata or {},
            created_at=datetime.now(timezone.utc)
        )
    
    def validate_content(self) -> None:
        """Validate message content based on business rules."""
        if self.role in [MessageRole.USER, MessageRole.ASSISTANT]:
            if not self.content or not self.content.strip():
                raise DomainException(f"{self.role.value.title()} messages cannot be empty")
        
        if self.content and len(self.content) > 100000:  # 100k character limit
            raise DomainException("Message content exceeds maximum length")
    
    def validate_role(self) -> None:
        """Validate message role."""
        if not isinstance(self.role, MessageRole):
            raise DomainException("Invalid message role")
    
    def mark_as_helpful(self, is_helpful: bool, feedback: Optional[str] = None) -> None:
        """Mark message as helpful or not helpful with optional feedback."""
        if self.role != MessageRole.ASSISTANT:
            raise DomainException("Only assistant messages can be marked as helpful")
        
        self.is_helpful = is_helpful
        if feedback:
            self.user_feedback = feedback.strip()
    
    def update_feedback(self, feedback: str) -> None:
        """Update user feedback on the message."""
        if self.role != MessageRole.ASSISTANT:
            raise DomainException("Only assistant messages can receive feedback")
        
        self.user_feedback = feedback.strip() if feedback else None
    
    def calculate_cost(self, cost_per_token: float = 0.001) -> float:
        """Calculate message cost based on token usage."""
        if not self.tokens_used:
            return 0.0
        
        return self.tokens_used * cost_per_token
    
    def set_error(self, error_message: str) -> None:
        """Set error message for failed message generation."""
        self.error_message = error_message.strip() if error_message else None
    
    def clear_error(self) -> None:
        """Clear error message."""
        self.error_message = None
    
    def is_from_user(self) -> bool:
        """Check if message is from user."""
        return self.role == MessageRole.USER
    
    def is_from_assistant(self) -> bool:
        """Check if message is from assistant."""
        return self.role == MessageRole.ASSISTANT
    
    def is_system_message(self) -> bool:
        """Check if message is a system message."""
        return self.role == MessageRole.SYSTEM
    
    def has_error(self) -> bool:
        """Check if message has an error."""
        return self.error_message is not None
    
    def get_display_content(self, max_length: int = 100) -> str:
        """Get display content with optional truncation."""
        if not self.content:
            return ""
        
        if len(self.content) <= max_length:
            return self.content
        
        return self.content[:max_length] + "..."
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert message to dictionary representation."""
        return {
            "id": str(self.id) if self.id else None,
            "conversation_id": str(self.conversation_id) if self.conversation_id else None,
            "content": self.content,
            "role": self.role.value,
            "tokens_used": self.tokens_used,
            "processing_time_ms": self.processing_time_ms,
            "model_name": self.model_name,
            "temperature": self.temperature,
            "metadata": self.metadata,
            "error_message": self.error_message,
            "is_helpful": self.is_helpful,
            "user_feedback": self.user_feedback,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
