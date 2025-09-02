"""
Bot Entity - Chatbot Business Logic

Pure domain entity representing a KyroChat chatbot.
Contains all business rules and behavior related to bot management.

Business Rules:
- Bot must have a unique name per owner
- Bot configuration must be valid JSON
- Bot cannot be deleted if it has active conversations (within 24h)
- Bot training status affects availability for chat
- Bot model parameters must be within valid ranges
- Public bots require approval process
- Bot must have at least one training document before activation

Key Methods:
- update_configuration(): Update bot settings with validation
- start_training(): Begin training process with validation
- activate(): Make bot available for chat
- deactivate(): Disable bot temporarily
- can_be_deleted(): Check if bot can be safely deleted
- add_training_document(): Add document for training
- get_conversation_count(): Get active conversation count

No Infrastructure Dependencies:
- No SQLAlchemy models
- No database concerns
- No AI framework dependencies
- Pure business logic only
"""

from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Dict, Any, List
from ..value_objects.bot_id import BotId
from ..value_objects.user_id import UserId
from ..exceptions.domain_exceptions import DomainException


@dataclass
class Bot:
    """Pure domain entity for Bot with business logic and invariants."""
    
    # Identity
    id: BotId
    owner_id: UserId
    
    # Core attributes
    name: str
    description: Optional[str] = None
    welcome_message: str = "Hi! How can I help you today?"
    
    # AI Configuration
    model_type: str = "gemini-2.0-flash-exp"
    temperature: float = 0.7
    system_prompt: Optional[str] = None
    configuration: Dict[str, Any] = None
    
    # Status attributes
    is_public: bool = False
    is_active: bool = True
    status: str = "inactive"  # inactive, training, active, error
    
    # Timestamps
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    def __post_init__(self):
        """Validate business invariants after initialization."""
        if self.configuration is None:
            self.configuration = {}
        pass  # Implementation would go here
    
    @classmethod
    def create(
        cls,
        owner_id: UserId,
        name: str,
        description: Optional[str] = None
    ) -> 'Bot':
        """Factory method for creating new bots with business rules."""
        pass  # Implementation would go here
    
    def update_configuration(self, config: Dict[str, Any]) -> None:
        """Update bot configuration with validation."""
        pass  # Implementation would go here
    
    def start_training(self) -> None:
        """Begin training process with validation."""
        pass  # Implementation would go here
    
    def activate(self) -> None:
        """Make bot available for chat with validation."""
        pass  # Implementation would go here
    
    def deactivate(self) -> None:
        """Disable bot temporarily."""
        pass  # Implementation would go here
    
    def can_be_deleted(self) -> bool:
        """Check if bot can be safely deleted."""
        pass  # Implementation would go here
    
    def add_training_document(self, document_id: str) -> None:
        """Add document for training with validation."""
        pass  # Implementation would go here
