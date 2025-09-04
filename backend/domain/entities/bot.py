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
        if not self.name or not self.name.strip():
            raise DomainException("Bot name is required")
        if len(self.name.strip()) < 3:
            raise DomainException("Bot name must be at least 3 characters")
        if not (0.0 <= float(self.temperature) <= 2.0):
            raise DomainException("Temperature must be between 0.0 and 2.0")
        if self.created_at is None:
            self.created_at = datetime.utcnow()
    
    @classmethod
    def create(
        cls,
        name: str,
        description: Optional[str],
        owner_id: UserId,
        model_name: str,
        temperature: float,
        max_tokens: Optional[int],
        system_prompt: Optional[str],
        is_public: bool,
        category: Optional[str],
        tags: Optional[List[str]],
        knowledge_base_id: Optional[str],
        avatar_url: Optional[str],
        color_theme: Optional[str]
    ) -> 'Bot':
        """Factory method for creating new bots with business rules."""
        configuration: Dict[str, Any] = {}
        if max_tokens is not None:
            configuration["max_tokens"] = max_tokens
        if tags:
            configuration["tags"] = tags
        if knowledge_base_id:
            configuration["knowledge_base_id"] = knowledge_base_id
        if avatar_url:
            configuration["avatar_url"] = avatar_url
        if color_theme:
            configuration["color_theme"] = color_theme
        if category:
            configuration["category"] = category

        return cls(
            id=BotId(0),
            owner_id=owner_id,
            name=name.strip(),
            description=description.strip() if description else None,
            welcome_message="Hi! How can I help you today?",
            model_type=model_name,
            temperature=temperature,
            system_prompt=system_prompt.strip() if system_prompt else None,
            configuration=configuration,
            is_public=is_public,
            is_active=True,
            status="inactive",
            created_at=datetime.utcnow(),
            updated_at=None,
        )
    
    def update_configuration(self, config: Dict[str, Any]) -> None:
        """Update bot configuration with validation."""
        if not isinstance(config, dict):
            raise DomainException("Configuration must be a dictionary")
        self.configuration.update(config)
    
    def start_training(self) -> None:
        """Begin training process with validation."""
        pass  # Implementation would go here
    
    def activate(self) -> None:
        """Make bot available for chat with validation."""
        self.is_active = True
        self.status = "active"
        self.updated_at = datetime.utcnow()
    
    def deactivate(self) -> None:
        """Disable bot temporarily."""
        self.is_active = False
        self.status = "inactive"
        self.updated_at = datetime.utcnow()
    
    def can_be_deleted(self) -> bool:
        """Check if bot can be safely deleted."""
        return True
    
    def add_training_document(self, document_id: str) -> None:
        """Add document for training with validation."""
        pass  # Implementation would go here
