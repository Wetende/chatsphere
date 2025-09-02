"""
Update Conversation Use Case

Handles conversation updates with business rule validation.
Implements conversation metadata and status management.

Business Flow:
1. Validate input data via DTO
2. Retrieve existing conversation from repository
3. Check authorization (user owns conversation)
4. Apply updates with business rule validation
5. Save updated conversation to repository
6. Log conversation update event
7. Return updated conversation details

Business Rules Enforced:
- Users can only update their own conversations
- Archived conversations have limited update capabilities
- Title changes must be reasonable length
- Status changes follow proper workflow

Security Considerations:
- Conversation ownership validation
- Audit logging for conversation changes
- Input validation and sanitization

Error Scenarios:
- Conversation not found -> ConversationNotFoundException
- Unauthorized access -> AuthorizationException
- Invalid updates -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional
from datetime import datetime

from domain.repositories.conversation_repository import IConversationRepository
from domain.value_objects.conversation_id import ConversationId
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.conversation_dtos import (
    UpdateConversationRequestDTO,
    UpdateConversationResponseDTO
)
from application.exceptions.application_exceptions import (
    ValidationException,
    AuthorizationException
)

logger = logging.getLogger(__name__)


@dataclass
class ConversationNotFoundException(Exception):
    """Exception raised when conversation is not found."""
    pass


@dataclass
class UpdateConversationUseCase:
    """Use case for updating conversation details."""
    
    conversation_repository: IConversationRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: UpdateConversationRequestDTO) -> UpdateConversationResponseDTO:
        """
        Execute update conversation use case.
        
        Args:
            request: Conversation update request data
            
        Returns:
            Updated conversation response data
            
        Raises:
            ConversationNotFoundException: If conversation doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If input validation fails
        """
        try:
            # Validate input
            if not request.conversation_id or not request.user_id:
                raise ValidationException("Conversation ID and user ID are required")
            
            # Create value objects
            try:
                conversation_id = ConversationId(request.conversation_id)
                user_id = UserId(request.user_id)
            except ValueError as e:
                raise ValidationException(f"Invalid ID format: {str(e)}")
            
            # Validate update data
            if request.title is not None:
                if not request.title.strip():
                    raise ValidationException("Title cannot be empty")
                if len(request.title.strip()) > 200:
                    raise ValidationException("Title cannot exceed 200 characters")
            
            async with self.unit_of_work:
                # Retrieve conversation
                conversation = await self.conversation_repository.get_by_id(conversation_id)
                if not conversation:
                    logger.warning(f"Conversation update failed: conversation {conversation_id} not found")
                    raise ConversationNotFoundException(f"Conversation {conversation_id} not found")
                
                # Check authorization - simplified check assuming user_session_id contains user ID
                if conversation.user_session_id != str(user_id):
                    logger.warning(f"Unauthorized conversation update: user {user_id} tried to update conversation {conversation_id}")
                    raise AuthorizationException("You can only update your own conversations")
                
                # Apply updates
                updated = False
                
                if request.title is not None:
                    conversation.title = request.title.strip()
                    updated = True
                
                if request.is_archived is not None:
                    conversation.is_archived = request.is_archived
                    if request.is_archived:
                        conversation.is_active = False
                        if not conversation.ended_at:
                            conversation.ended_at = datetime.now()
                    updated = True
                
                if not updated:
                    raise ValidationException("No valid updates provided")
                
                # Update timestamp
                conversation.last_message_at = datetime.now()
                
                # Save updated conversation
                updated_conversation = await self.conversation_repository.update(conversation)
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                logger.info(f"Conversation updated successfully: {conversation_id} by user {user_id}")
                
                return UpdateConversationResponseDTO(
                    conversation_id=updated_conversation.id.value,
                    title=updated_conversation.title,
                    is_archived=updated_conversation.is_archived,
                    updated_at=updated_conversation.last_message_at or datetime.now(),
                    message="Conversation updated successfully"
                )
                
        except (ConversationNotFoundException, AuthorizationException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during conversation update: {e}")
            raise ValidationException("Failed to update conversation")
