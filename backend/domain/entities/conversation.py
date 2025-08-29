"""
Conversation Entity - Chat Session Business Logic

Pure domain entity representing a chat conversation between a user and bot.
Contains all business rules and behavior related to conversation management.

Business Rules:
- Conversation must belong to an active bot
- Conversation cannot exceed maximum message limit (configurable)
- Conversation auto-ends after inactivity period
- Message order must be maintained chronologically
- User can have multiple concurrent conversations
- Conversation metadata tracks important session info
- Archived conversations cannot accept new messages

Key Methods:
- add_message(): Add new message with validation
- end_conversation(): Properly close conversation
- archive(): Archive old conversation
- can_accept_messages(): Check if conversation is active
- get_message_count(): Get total message count
- is_expired(): Check if conversation has expired
- update_metadata(): Update session metadata

No Infrastructure Dependencies:
- No SQLAlchemy models
- No database concerns
- No WebSocket concerns
- Pure business logic only
"""

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from ..value_objects.conversation_id import ConversationId
from ..value_objects.bot_id import BotId
from ..exceptions.domain_exceptions import DomainException


@dataclass
class Conversation:
    """Pure domain entity for Conversation with business logic and invariants."""
    
    # Identity
    id: ConversationId
    bot_id: BotId
    
    # Session attributes
    user_session_id: Optional[str] = None
    title: str = "New Conversation"
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    # Status attributes
    is_active: bool = True
    is_archived: bool = False
    message_count: int = 0
    
    # Timestamps
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    last_message_at: Optional[datetime] = None
    
    # Configuration
    max_messages: int = 1000
    inactivity_timeout_hours: int = 24
    
    def __post_init__(self):
        """Validate business invariants after initialization."""
        if self.started_at is None:
            self.started_at = datetime.utcnow()
        pass  # Implementation would go here
    
    @classmethod
    def create(
        cls,
        bot_id: BotId,
        user_session_id: Optional[str] = None,
        title: str = "New Conversation"
    ) -> 'Conversation':
        """Factory method for creating new conversations with business rules."""
        pass  # Implementation would go here
    
    def add_message(self, message_content: str, is_from_user: bool) -> None:
        """Add new message with validation."""
        pass  # Implementation would go here
    
    def end_conversation(self) -> None:
        """Properly close conversation."""
        pass  # Implementation would go here
    
    def archive(self) -> None:
        """Archive old conversation."""
        pass  # Implementation would go here
    
    def can_accept_messages(self) -> bool:
        """Check if conversation is active and can accept messages."""
        pass  # Implementation would go here
    
    def is_expired(self) -> bool:
        """Check if conversation has expired due to inactivity."""
        pass  # Implementation would go here
    
    def update_metadata(self, metadata: Dict[str, Any]) -> None:
        """Update session metadata with validation."""
        pass  # Implementation would go here
