"""
Bot Data Transfer Objects

DTOs for bot-related operations in the application layer.
Facilitates data transfer between presentation and application layers.

Key Features:
- Request/response DTOs for bot operations
- Validation and serialization
- Clear separation from domain entities
- API contract definitions
"""

from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime


@dataclass
class CreateBotRequestDTO:
    """Request DTO for creating a new bot."""
    name: str
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    model_name: str = "gemini-pro"
    temperature: float = 0.7
    max_tokens: Optional[int] = None
    is_public: bool = False
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    knowledge_base_id: Optional[str] = None
    avatar_url: Optional[str] = None
    color_theme: Optional[str] = None


@dataclass
class CreateBotResponseDTO:
    """Response DTO for bot creation."""
    bot_id: str
    name: str
    description: Optional[str]
    owner_id: str
    model_name: str
    temperature: float
    is_public: bool
    is_active: bool
    created_at: datetime
    message: str


@dataclass
class UpdateBotRequestDTO:
    """Request DTO for updating a bot."""
    name: Optional[str] = None
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    model_name: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    is_public: Optional[bool] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    avatar_url: Optional[str] = None
    color_theme: Optional[str] = None


@dataclass
class UpdateBotResponseDTO:
    """Response DTO for bot update."""
    bot_id: str
    name: str
    description: Optional[str]
    updated_at: datetime
    message: str


@dataclass
class BotDetailsDTO:
    """DTO for bot details."""
    bot_id: str
    name: str
    description: Optional[str]
    owner_id: str
    owner_username: str
    model_name: str
    temperature: float
    max_tokens: Optional[int]
    system_prompt: Optional[str]
    is_public: bool
    is_active: bool
    category: Optional[str]
    tags: Optional[List[str]]
    knowledge_base_id: Optional[str]
    avatar_url: Optional[str]
    color_theme: Optional[str]
    usage_count: int
    total_conversations: int
    average_rating: Optional[float]
    total_ratings: int
    created_at: datetime
    updated_at: Optional[datetime]


@dataclass
class BotSummaryDTO:
    """DTO for bot summary in lists."""
    bot_id: str
    name: str
    description: Optional[str]
    owner_username: str
    category: Optional[str]
    avatar_url: Optional[str]
    is_public: bool
    usage_count: int
    average_rating: Optional[float]
    created_at: datetime


@dataclass
class ListBotsRequestDTO:
    """Request DTO for listing bots."""
    owner_id: Optional[str] = None
    category: Optional[str] = None
    is_public: Optional[bool] = None
    search_query: Optional[str] = None
    limit: int = 20
    offset: int = 0
    sort_by: str = "created_at"  # created_at, name, usage_count, rating
    sort_order: str = "desc"  # asc, desc


@dataclass
class ListBotsResponseDTO:
    """Response DTO for listing bots."""
    bots: List[BotSummaryDTO]
    total_count: int
    limit: int
    offset: int
    has_more: bool


@dataclass
class DeleteBotRequestDTO:
    """Request DTO for deleting a bot."""
    bot_id: str
    confirmation: bool = False


@dataclass
class DeleteBotResponseDTO:
    """Response DTO for bot deletion."""
    bot_id: str
    message: str
    conversations_deleted: int
