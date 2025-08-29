"""
Application Use Case - Create Bot

Encapsulates the business logic for creating a new AI bot. Validates input,
checks permissions, coordinates with the bot repository, and integrates with
AI services for model validation.

Business Flow:
1. Validate input data and user permissions
2. Check subscription limits for bot creation
3. Validate AI model availability
4. Create bot entity with business rules
5. Save bot to repository
6. Return success response

Error Scenarios:
- User not found -> ValidationException
- Subscription limit exceeded -> BusinessRuleViolationException  
- Invalid model name -> ValidationException
- Duplicate bot name (per user) -> ConflictException
"""

import logging
from datetime import datetime, timezone
from typing import Optional

from domain.repositories.user_repository import IUserRepository
from domain.repositories.bot_repository import IBotRepository
from domain.entities.bot import Bot
from domain.value_objects.user_id import UserId
from domain.value_objects.bot_id import BotId
from application.interfaces.ai_service import IAIService
from application.interfaces.unit_of_work import IUnitOfWork
from application.dtos.bot_dtos import CreateBotRequestDTO, CreateBotResponseDTO
from application.exceptions.application_exceptions import (
    ValidationException,
    ResourceNotFoundException,
    ConflictException,
    BusinessRuleViolationException
)

logger = logging.getLogger(__name__)


class CreateBotUseCase:
    """Use case for creating new AI bots."""
    
    def __init__(
        self,
        bot_repository: IBotRepository,
        user_repository: IUserRepository,
        ai_service: IAIService,
        unit_of_work: IUnitOfWork
    ):
        """
        Initialize create bot use case.
        
        Args:
            bot_repository: Bot repository interface
            user_repository: User repository interface
            ai_service: AI service interface
            unit_of_work: Transaction management
        """
        self.bot_repository = bot_repository
        self.user_repository = user_repository
        self.ai_service = ai_service
        self.unit_of_work = unit_of_work
    
    async def execute(
        self, 
        request: CreateBotRequestDTO, 
        owner_id: str
    ) -> CreateBotResponseDTO:
        """
        Execute bot creation use case.
        
        Args:
            request: Bot creation request data
            owner_id: ID of the user creating the bot
            
        Returns:
            Bot creation response with bot details
            
        Raises:
            ValidationException: If input validation fails
            ResourceNotFoundException: If user not found
            ConflictException: If bot name already exists for user
            BusinessRuleViolationException: If subscription limits exceeded
        """
        try:
            # Validate input
            self._validate_request(request)
            
            async with self.unit_of_work:
                # Get and validate owner
                owner_user_id = UserId(owner_id)
                owner = await self.user_repository.get_by_id(owner_user_id)
                if not owner:
                    raise ResourceNotFoundException(f"User not found: {owner_id}")
                
                if not owner.is_active:
                    raise ValidationException("User account is not active")
                
                # Check subscription limits
                await self._check_subscription_limits(owner)
                
                # Validate AI model
                await self._validate_ai_model(request.model_name)
                
                # Check for duplicate bot name (per user)
                await self._check_duplicate_bot_name(owner_id, request.name)
                
                # Create bot entity
                bot = self._create_bot_entity(request, owner_id)
                
                # Save bot
                saved_bot = await self.bot_repository.save(bot)
                await self.unit_of_work.commit()
                
                logger.info(f"Bot created successfully: {saved_bot.id} by user {owner_id}")
                
                return CreateBotResponseDTO(
                    bot_id=str(saved_bot.id),
                    name=saved_bot.name,
                    description=saved_bot.description,
                    owner_id=str(saved_bot.owner_id),
                    model_name=saved_bot.model_name,
                    temperature=saved_bot.temperature,
                    is_public=saved_bot.is_public,
                    is_active=saved_bot.is_active,
                    created_at=saved_bot.created_at,
                    message="Bot created successfully"
                )
                
        except (ValidationException, ResourceNotFoundException, ConflictException, BusinessRuleViolationException):
            raise
        except Exception as e:
            logger.error(f"Unexpected error creating bot: {e}")
            raise ValidationException("Failed to create bot due to internal error")
    
    def _validate_request(self, request: CreateBotRequestDTO) -> None:
        """Validate bot creation request."""
        if not request.name or not request.name.strip():
            raise ValidationException("Bot name is required")
        
        if len(request.name.strip()) < 3:
            raise ValidationException("Bot name must be at least 3 characters")
        
        if len(request.name.strip()) > 100:
            raise ValidationException("Bot name cannot exceed 100 characters")
        
        if request.description and len(request.description) > 500:
            raise ValidationException("Bot description cannot exceed 500 characters")
        
        if not (0.0 <= request.temperature <= 2.0):
            raise ValidationException("Temperature must be between 0.0 and 2.0")
        
        if request.max_tokens and request.max_tokens <= 0:
            raise ValidationException("Max tokens must be positive")
        
        if request.system_prompt and len(request.system_prompt) > 2000:
            raise ValidationException("System prompt cannot exceed 2000 characters")
    
    async def _check_subscription_limits(self, owner) -> None:
        """Check if user can create more bots based on subscription."""
        # Get user's current bot count
        user_bots = await self.bot_repository.get_by_owner(
            str(owner.id), 
            limit=1000,  # High limit to count all
            offset=0
        )
        current_bot_count = len(user_bots)
        
        # Define subscription limits
        subscription_limits = {
            "free": 3,
            "basic": 10,
            "premium": 50,
            "enterprise": 1000
        }
        
        max_bots = subscription_limits.get(owner.subscription_status, 3)
        
        if current_bot_count >= max_bots:
            raise BusinessRuleViolationException(
                f"Bot limit reached. {owner.subscription_status.title()} subscription allows {max_bots} bots"
            )
    
    async def _validate_ai_model(self, model_name: str) -> None:
        """Validate that the AI model is available."""
        try:
            available_models = await self.ai_service.get_available_models()
            if model_name not in available_models:
                raise ValidationException(f"AI model '{model_name}' is not available")
        except Exception as e:
            logger.warning(f"Could not validate AI model {model_name}: {e}")
            # Continue - don't block bot creation if AI service is temporarily unavailable
    
    async def _check_duplicate_bot_name(self, owner_id: str, bot_name: str) -> None:
        """Check if user already has a bot with this name."""
        user_bots = await self.bot_repository.get_by_owner(owner_id, limit=1000, offset=0)
        
        for bot in user_bots:
            if bot.name.lower() == bot_name.lower().strip():
                raise ConflictException(f"You already have a bot named '{bot_name}'")
    
    def _create_bot_entity(self, request: CreateBotRequestDTO, owner_id: str) -> Bot:
        """Create bot domain entity from request."""
        return Bot.create(
            name=request.name.strip(),
            description=request.description.strip() if request.description else None,
            owner_id=UserId(owner_id),
            model_name=request.model_name,
            temperature=request.temperature,
            max_tokens=request.max_tokens,
            system_prompt=request.system_prompt.strip() if request.system_prompt else None,
            is_public=request.is_public,
            category=request.category.strip() if request.category else None,
            tags=request.tags or [],
            knowledge_base_id=request.knowledge_base_id,
            avatar_url=request.avatar_url,
            color_theme=request.color_theme
        )