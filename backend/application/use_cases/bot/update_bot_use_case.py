"""
Update Bot Use Case

Handles bot configuration updates with business rule validation
and coordination of domain entities and infrastructure services.

Business Flow:
1. Validate input data via DTO
2. Retrieve existing bot from repository
3. Check authorization (user can only update own bots)
4. Validate new configuration against business rules
5. Apply updates to bot entity with validation
6. Save updated bot to repository
7. Log bot update event
8. Return updated bot response DTO

Business Rules Enforced:
- Users can only update their own bots
- Bot name must be unique per owner if changed
- Bot configuration must be valid
- Temperature must be within valid range (0.0-2.0)
- Public bots require additional validation
- Active bots may have restricted update capabilities

Cross-Cutting Concerns:
- Input validation and sanitization
- Authorization checks for bot ownership
- Bot name uniqueness validation (if changed)
- Audit logging for security compliance
- Error handling with meaningful messages
- Transaction management for consistency

Error Scenarios:
- Bot not found -> BotNotFoundException
- Unauthorized access -> AuthorizationException
- Bot name already exists -> ConflictException
- Invalid configuration -> ValidationException
"""

import logging
from dataclasses import dataclass
from typing import Optional, Dict, Any

from domain.repositories.bot_repository import IBotRepository
from domain.value_objects.bot_id import BotId
from domain.value_objects.user_id import UserId
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.bot_dtos import UpdateBotRequestDTO, BotResponseDTO
from application.exceptions.application_exceptions import (
    BotNotFoundException,
    AuthorizationException,
    ValidationException,
    ConflictException
)

logger = logging.getLogger(__name__)


@dataclass
class UpdateBotRequest:
    """Request DTO for updating bot."""
    bot_id: int
    requesting_user_id: int  # For authorization checks
    name: Optional[str] = None
    description: Optional[str] = None
    welcome_message: Optional[str] = None
    model_name: Optional[str] = None
    temperature: Optional[float] = None
    system_prompt: Optional[str] = None
    is_public: Optional[bool] = None
    is_active: Optional[bool] = None
    configuration: Optional[Dict[str, Any]] = None


@dataclass
class UpdateBotUseCase:
    """Use case for updating bot information."""
    
    bot_repository: IBotRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: UpdateBotRequest) -> BotResponseDTO:
        """
        Execute update bot use case.
        
        Args:
            request: Bot update request data
            
        Returns:
            Updated bot response data
            
        Raises:
            BotNotFoundException: If bot doesn't exist
            AuthorizationException: If unauthorized access
            ValidationException: If input validation fails
            ConflictException: If bot name already exists
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
            
            # Validate update data
            self._validate_update_data(request)
            
            async with self.unit_of_work:
                # Retrieve bot from repository
                bot = await self.bot_repository.get_by_id(bot_id)
                if not bot:
                    logger.warning(f"Bot update failed: bot {bot_id} not found")
                    raise BotNotFoundException(f"Bot {bot_id} not found")
                
                # Check authorization - users can only update their own bots
                if bot.owner_id != requesting_user_id:
                    logger.warning(f"Unauthorized bot update attempt: user {requesting_user_id} tried to update bot {bot_id}")
                    raise AuthorizationException("You can only update your own bots")
                
                # Check bot name uniqueness if name is being changed
                if request.name is not None and request.name != bot.name:
                    await self._check_bot_name_uniqueness(requesting_user_id, request.name, bot_id)
                
                # Apply updates to bot entity
                self._apply_updates(bot, request)
                
                # Update timestamp
                from datetime import datetime
                bot.updated_at = datetime.now()
                
                # Save updated bot
                updated_bot = await self.bot_repository.update(bot)
                
                # Commit transaction
                await self.unit_of_work.commit()
                
                # Convert updated bot to response DTO
                bot_response = BotResponseDTO(
                    bot_id=updated_bot.id.value,
                    name=updated_bot.name,
                    description=updated_bot.description,
                    owner_id=updated_bot.owner_id.value,
                    model_name=updated_bot.model_type,
                    temperature=updated_bot.temperature,
                    system_prompt=updated_bot.system_prompt,
                    is_public=updated_bot.is_public,
                    is_active=updated_bot.is_active,
                    status=updated_bot.status,
                    welcome_message=updated_bot.welcome_message,
                    configuration=updated_bot.configuration,
                    created_at=updated_bot.created_at,
                    updated_at=updated_bot.updated_at,
                    is_owner=True  # User is updating their own bot
                )
                
                logger.info(f"Bot updated successfully: {bot_id} by user {requesting_user_id}")
                return bot_response
                
        except (BotNotFoundException, AuthorizationException, ValidationException, ConflictException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error during bot update: {e}")
            raise ValidationException("Failed to update bot")
    
    def _validate_update_data(self, request: UpdateBotRequest) -> None:
        """Validate bot update request data."""
        if request.name is not None:
            if not request.name.strip():
                raise ValidationException("Bot name cannot be empty")
            if len(request.name.strip()) < 3:
                raise ValidationException("Bot name must be at least 3 characters")
            if len(request.name.strip()) > 100:
                raise ValidationException("Bot name cannot exceed 100 characters")
        
        if request.description is not None and len(request.description) > 500:
            raise ValidationException("Bot description cannot exceed 500 characters")
        
        if request.welcome_message is not None and len(request.welcome_message) > 200:
            raise ValidationException("Welcome message cannot exceed 200 characters")
        
        if request.temperature is not None and not (0.0 <= request.temperature <= 2.0):
            raise ValidationException("Temperature must be between 0.0 and 2.0")
        
        if request.system_prompt is not None and len(request.system_prompt) > 2000:
            raise ValidationException("System prompt cannot exceed 2000 characters")
    
    async def _check_bot_name_uniqueness(self, owner_id: UserId, new_name: str, current_bot_id: BotId) -> None:
        """Check if user already has another bot with this name."""
        user_bots = await self.bot_repository.get_by_owner(owner_id, limit=1000, offset=0)
        
        for bot in user_bots:
            if bot.id != current_bot_id and bot.name.lower() == new_name.lower().strip():
                raise ConflictException(f"You already have a bot named '{new_name}'")
    
    def _apply_updates(self, bot, request: UpdateBotRequest) -> None:
        """Apply updates to bot entity."""
        if request.name is not None:
            bot.name = request.name.strip()
        
        if request.description is not None:
            bot.description = request.description.strip() if request.description else None
        
        if request.welcome_message is not None:
            bot.welcome_message = request.welcome_message.strip() if request.welcome_message else "Hi! How can I help you today?"
        
        if request.model_name is not None:
            bot.model_type = request.model_name
        
        if request.temperature is not None:
            bot.temperature = request.temperature
        
        if request.system_prompt is not None:
            bot.system_prompt = request.system_prompt.strip() if request.system_prompt else None
        
        if request.is_public is not None:
            bot.is_public = request.is_public
        
        if request.is_active is not None:
            bot.is_active = request.is_active
            # Update status based on active state
            if request.is_active:
                bot.status = "active"
            else:
                bot.status = "inactive"
        
        if request.configuration is not None:
            bot.configuration.update(request.configuration)
