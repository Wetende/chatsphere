"""
Application Use Case - Send Message

Encapsulates the logic to send a message in a conversation. Coordinates with
conversation repository, AI service for response generation, and handles 
conversation state management.

Business Flow:
1. Validate input and get/create conversation
2. Add user message to conversation
3. Generate AI response using configured model
4. Add AI response to conversation  
5. Update conversation metadata
6. Return response with message details

Error Scenarios:
- Invalid conversation/bot -> ResourceNotFoundException
- AI service failure -> ExternalServiceException
- Rate limiting -> RateLimitExceededException
- Invalid message content -> ValidationException
"""

import logging
import time
from datetime import datetime, timezone
from typing import Optional, List

from domain.repositories.conversation_repository import IConversationRepository
from domain.repositories.bot_repository import IBotRepository
from domain.entities.conversation import Conversation
from domain.entities.message import Message
from domain.value_objects.user_id import UserId
from domain.value_objects.bot_id import BotId
from application.interfaces.ai_service import IAIService
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.conversation_dtos import (
    SendMessageRequestDTO, 
    SendMessageResponseDTO
)
from application.exceptions.application_exceptions import (
    ValidationException,
    ResourceNotFoundException,
    ExternalServiceException,
    BusinessRuleViolationException
)

logger = logging.getLogger(__name__)


class SendMessageUseCase:
    """Use case for sending messages in conversations."""
    
    def __init__(
        self,
        conversation_repository: IConversationRepository,
        bot_repository: IBotRepository,
        ai_service: IAIService,
        unit_of_work: IUnitOfWork
    ):
        """
        Initialize send message use case.
        
        Args:
            conversation_repository: Conversation repository interface
            bot_repository: Bot repository interface
            ai_service: AI service interface
            unit_of_work: Transaction management
        """
        self.conversation_repository = conversation_repository
        self.bot_repository = bot_repository
        self.ai_service = ai_service
        self.unit_of_work = unit_of_work
    
    async def execute(
        self, 
        request: SendMessageRequestDTO,
        user_id: str
    ) -> SendMessageResponseDTO:
        """
        Execute send message use case.
        
        Args:
            request: Message sending request
            user_id: ID of the user sending the message
            
        Returns:
            Response with conversation and message details
            
        Raises:
            ValidationException: If input validation fails
            ResourceNotFoundException: If conversation/bot not found
            ExternalServiceException: If AI service fails
        """
        start_time = time.time()
        
        try:
            # Validate request
            self._validate_request(request)
            
            async with self.unit_of_work:
                # For now, return a mock response since we need full entity implementations
                # In a real implementation, this would handle the full conversation flow
                
                processing_time = int((time.time() - start_time) * 1000)
                
                return SendMessageResponseDTO(
                    conversation_id=request.conversation_id or "new-conversation-id",
                    message_id="new-message-id",
                    bot_response="This is a mock AI response. Full implementation pending.",
                    tokens_used=50,
                    processing_time_ms=processing_time,
                    model_name="gemini-pro",
                    temperature=0.7,
                    conversation_title="New Conversation",
                    is_new_conversation=request.conversation_id is None,
                    message="Message sent successfully (mock implementation)"
                )
                
        except ValidationException:
            raise
        except Exception as e:
            logger.error(f"Unexpected error sending message: {e}")
            raise ExternalServiceException("Failed to send message due to internal error")
    
    def _validate_request(self, request: SendMessageRequestDTO) -> None:
        """Validate message request."""
        if not request.bot_id:
            raise ValidationException("Bot ID is required")
        
        if not request.message or not request.message.strip():
            raise ValidationException("Message content is required")
        
        if len(request.message.strip()) > 10000:
            raise ValidationException("Message content cannot exceed 10,000 characters")
        
        if request.temperature is not None and not (0.0 <= request.temperature <= 2.0):
            raise ValidationException("Temperature must be between 0.0 and 2.0")
        
        if request.max_tokens is not None and request.max_tokens <= 0:
            raise ValidationException("Max tokens must be positive")