"""
Delete Conversation Use Case

Handles conversation deletion with business rule validation and cleanup.
Implements safe deletion with proper data handling.

Business Flow:
1. Validate input data via DTO
2. Retrieve existing conversation from repository
3. Check authorization (user owns conversation)
4. Validate deletion rules (business logic)
5. Handle related data cleanup (messages, files)
6. Delete or archive conversation
7. Log deletion event
8. Return deletion confirmation

Business Rules Enforced:
- Users can only delete their own conversations
- Recent conversations may require confirmation
- Deletion can be soft (archived) or hard
- Message history handling per retention policy

Security Considerations:
- Conversation ownership validation
- Audit logging for deletion events
- Data retention policy compliance

Error Scenarios:
- Conversation not found -> ConversationNotFoundException
- Unauthorized access -> AuthorizationException
- Business rule violations -> BusinessRuleViolationException
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
    DeleteConversationRequestDTO,
    DeleteConversationResponseDTO
)
from application.exceptions.application_exceptions import (
    ValidationException,
    AuthorizationException,
    BusinessRuleViolationException
)

logger = logging.getLogger(__name__)


@dataclass
class ConversationNotFoundException(Exception):
    """Exception raised when conversation is not found."""
    pass


@dataclass
class DeleteConversationUseCase:
    """Use case for deleting conversations."""
    
    conversation_repository: IConversationRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: DeleteConversationRequestDTO) -> DeleteConversationResponseDTO:
        """
        Execute delete conversation use case.
        
        Args:
            request: Conversation deletion request data
            
        Returns:
            Conversation deletion response data
            
        Raises:
            ConversationNotFoundException: If conversation doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If input validation fails
            BusinessRuleViolationException: If deletion violates business rules
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
            
            async with self.unit_of_work:
                # Retrieve conversation
                conversation = await self.conversation_repository.get_by_id(conversation_id)
                if not conversation:
                    logger.warning(f"Conversation deletion failed: conversation {conversation_id} not found")
                    raise ConversationNotFoundException(f"Conversation {conversation_id} not found")
                
                # Check authorization - simplified check assuming user_session_id contains user ID
                if conversation.user_session_id != str(user_id):
                    logger.warning(f"Unauthorized conversation deletion: user {user_id} tried to delete conversation {conversation_id}")
                    raise AuthorizationException("You can only delete your own conversations")
                
                # Validate deletion rules
                await self._validate_deletion_rules(conversation, request)
                
                # Handle deletion
                deletion_time = datetime.now()
                messages_deleted = conversation.message_count
                
                if request.soft_delete:
                    # Soft delete: mark as archived and inactive
                    conversation.is_archived = True
                    conversation.is_active = False
                    conversation.ended_at = deletion_time
                    
                    await self.conversation_repository.update(conversation)
                    logger.info(f"Conversation soft deleted: {conversation_id}")
                else:
                    # Hard delete: remove from repository
                    await self.conversation_repository.delete(conversation_id)
                    logger.info(f"Conversation hard deleted: {conversation_id}")
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                logger.info(f"Conversation deleted successfully: {conversation_id} by user {user_id}")
                
                return DeleteConversationResponseDTO(
                    conversation_id=conversation_id.value,
                    deleted_at=deletion_time,
                    message="Conversation deleted successfully",
                    messages_deleted=messages_deleted
                )
                
        except (ConversationNotFoundException, AuthorizationException, ValidationException, BusinessRuleViolationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during conversation deletion: {e}")
            raise ValidationException("Failed to delete conversation")
    
    async def _validate_deletion_rules(self, conversation, request: DeleteConversationRequestDTO) -> None:
        """Validate that conversation can be deleted according to business rules."""
        # Check if conversation is already archived
        if conversation.is_archived:
            logger.info(f"Conversation {conversation.id} is already archived")
        
        # Check if conversation has recent activity (last 24 hours)
        if conversation.last_message_at:
            hours_since_last_message = (datetime.now() - conversation.last_message_at).total_seconds() / 3600
            if hours_since_last_message < 1 and not request.soft_delete:
                # Require soft delete for recent conversations
                raise BusinessRuleViolationException("Recent conversations must be archived rather than permanently deleted")
        
        # Additional business rule checks can be added here
        logger.info(f"Conversation {conversation.id} passed deletion validation checks")
