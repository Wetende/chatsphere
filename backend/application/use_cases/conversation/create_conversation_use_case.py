"""
Create Conversation Use Case

Handles new conversation creation with business rule validation
and coordination of domain entities and infrastructure services.

Business Flow:
1. Validate input data via DTO
2. Verify bot exists and is accessible
3. Check user permissions for bot access
4. Create conversation entity with business rules
5. Send initial message if provided
6. Save conversation to repository
7. Log conversation creation event
8. Return conversation details

Business Rules Enforced:
- User must have access to the bot (public or owned)
- Bot must be active to start new conversations
- User can have multiple conversations with same bot
- Conversation starts with proper metadata
- Initial message processed if provided

Cross-Cutting Concerns:
- Input validation and sanitization
- Bot accessibility checks
- User authorization validation
- Audit logging for conversation tracking
- Error handling with meaningful messages
- Transaction management for consistency

Error Scenarios:
- Bot not found -> BotNotFoundException
- Bot inactive -> ValidationException
- Unauthorized bot access -> AuthorizationException
- Invalid input data -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional
from datetime import datetime

from domain.repositories.conversation_repository import IConversationRepository
from domain.repositories.bot_repository import IBotRepository
from domain.value_objects.conversation_id import ConversationId
from domain.value_objects.bot_id import BotId
from domain.value_objects.user_id import UserId
from domain.entities.conversation import Conversation
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.conversation_dtos import (
    CreateConversationRequestDTO,
    CreateConversationResponseDTO
)
from application.exceptions.application_exceptions import (
    BotNotFoundException,
    AuthorizationException,
    ValidationException
)

logger = logging.getLogger(__name__)


@dataclass
class CreateConversationUseCase:
    """Use case for creating new conversations."""
    
    conversation_repository: IConversationRepository
    bot_repository: IBotRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: CreateConversationRequestDTO) -> CreateConversationResponseDTO:
        """
        Execute create conversation use case.
        
        Args:
            request: Conversation creation request data
            
        Returns:
            Conversation creation response data
            
        Raises:
            BotNotFoundException: If bot doesn't exist
            AuthorizationException: If unauthorized bot access
            ValidationException: If input validation fails
        """
        try:
            # Validate input
            if not request.bot_id or not request.user_id:
                raise ValidationException("Bot ID and user ID are required")
            
            # Create value objects
            try:
                bot_id = BotId(request.bot_id)
                user_id = UserId(request.user_id)
            except ValueError as e:
                raise ValidationException(f"Invalid ID format: {str(e)}")
            
            async with self.unit_of_work:
                # Verify bot exists and is accessible
                bot = await self.bot_repository.get_by_id(bot_id)
                if not bot:
                    logger.warning(f"Conversation creation failed: bot {bot_id} not found")
                    raise BotNotFoundException(f"Bot {bot_id} not found")
                
                # Check bot accessibility
                is_owner = bot.owner_id == user_id
                is_public = bot.is_public
                
                if not is_owner and not is_public:
                    logger.warning(f"Unauthorized conversation creation: user {user_id} tried to access private bot {bot_id}")
                    raise AuthorizationException("You can only create conversations with your own bots or public bots")
                
                # Check if bot is active
                if not bot.is_active:
                    logger.warning(f"Conversation creation failed: bot {bot_id} is inactive")
                    raise ValidationException("Cannot start conversation with inactive bot")
                
                # Create conversation entity
                conversation = Conversation.create(
                    bot_id=bot_id,
                    user_session_id=str(user_id),  # Simple session tracking
                    title=request.title or f"Chat with {bot.name}"
                )
                
                # Set conversation ID (would be auto-generated in real implementation)
                conversation.id = ConversationId(0)  # Placeholder
                
                # Save conversation
                saved_conversation = await self.conversation_repository.add(conversation)
                
                # TODO: Process initial message if provided
                if request.initial_message:
                    # This would use SendMessageUseCase internally
                    logger.info(f"Initial message provided for conversation {saved_conversation.id}")
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                logger.info(f"Conversation created successfully: {saved_conversation.id} for user {user_id} with bot {bot_id}")
                
                return CreateConversationResponseDTO(
                    conversation_id=saved_conversation.id.value,
                    bot_id=saved_conversation.bot_id.value,
                    title=saved_conversation.title,
                    created_at=saved_conversation.started_at or datetime.now(),
                    message="Conversation created successfully"
                )
                
        except (BotNotFoundException, AuthorizationException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during conversation creation: {e}")
            raise ValidationException("Failed to create conversation")
