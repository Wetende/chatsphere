"""
Get Bot Use Case

Retrieves bot information for display and management.
Handles bot data access with proper authorization and privacy controls.

Business Flow:
1. Validate user authentication/authorization
2. Retrieve bot by ID from repository
3. Check ownership or public access permissions
4. Convert bot entity to response DTO
5. Return bot data

Business Rules Enforced:
- Users can access their own bots
- Public bots can be accessed by any authenticated user
- Private bots require ownership
- Inactive bots may have restricted access
- Bot data excludes sensitive configuration details for non-owners

Security Considerations:
- Bot ownership validation and authorization
- Sensitive data filtering for non-owners
- Audit logging for bot access
- Rate limiting for bot requests

Error Scenarios:
- Bot not found -> BotNotFoundException
- Unauthorized access -> AuthorizationException
- Bot inactive -> BotInactiveException (unless owner)
"""

import logging
from dataclasses import dataclass
from typing import Optional

from domain.repositories.bot_repository import IBotRepository
from domain.value_objects.bot_id import BotId
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.bot_dtos import BotResponseDTO
from application.exceptions.application_exceptions import (
    BotNotFoundException,
    AuthorizationException,
    ValidationException
)

logger = logging.getLogger(__name__)


@dataclass
class GetBotRequest:
    """Request DTO for getting bot information."""
    bot_id: int
    requesting_user_id: int  # For authorization checks


@dataclass
class GetBotUseCase:
    """Use case for retrieving bot information."""
    
    bot_repository: IBotRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: GetBotRequest) -> BotResponseDTO:
        """
        Execute get bot use case.
        
        Args:
            request: Bot retrieval request data
            
        Returns:
            Bot response data
            
        Raises:
            BotNotFoundException: If bot doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If input validation fails
        """
        try:
            # Validate input
            if not request.bot_id or not request.requesting_user_id:
                raise ValidationException("Bot ID and requesting user ID are required")
            
            # Create value objects
            try:
                bot_id = BotId(request.bot_id)
                requesting_user_id = UserId(request.requesting_user_id)
            except ValueError as e:
                raise ValidationException(f"Invalid ID format: {str(e)}")
            
            async with self.unit_of_work:
                # Retrieve bot from repository
                bot = await self.bot_repository.get_by_id(bot_id)
                if not bot:
                    logger.warning(f"Bot access failed: bot {bot_id} not found")
                    raise BotNotFoundException(f"Bot {bot_id} not found")
                
                # Check authorization
                is_owner = bot.owner_id == requesting_user_id
                is_public = bot.is_public
                
                if not is_owner and not is_public:
                    logger.warning(f"Unauthorized bot access attempt: user {requesting_user_id} tried to access private bot {bot_id}")
                    raise AuthorizationException("You can only access your own private bots")
                
                # Check if bot is active (unless owner)
                if not bot.is_active and not is_owner:
                    logger.warning(f"Bot access failed: bot {bot_id} is inactive")
                    raise BotNotFoundException("Bot is not available")
                
                # Convert bot entity to response DTO
                # Filter sensitive information for non-owners
                bot_response = BotResponseDTO(
                    bot_id=bot.id.value,
                    name=bot.name,
                    description=bot.description,
                    owner_id=bot.owner_id.value,
                    model_name=bot.model_type,
                    temperature=bot.temperature,
                    system_prompt=bot.system_prompt if is_owner else None,  # Sensitive data
                    is_public=bot.is_public,
                    is_active=bot.is_active,
                    status=bot.status,
                    welcome_message=bot.welcome_message,
                    configuration=bot.configuration if is_owner else {},  # Sensitive data
                    created_at=bot.created_at,
                    updated_at=bot.updated_at,
                    is_owner=is_owner
                )
                
                logger.info(f"Bot retrieved successfully: {bot_id} by user {requesting_user_id}")
                return bot_response
                
        except (BotNotFoundException, AuthorizationException, ValidationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during bot retrieval: {e}")
            raise ValidationException("Failed to retrieve bot")
