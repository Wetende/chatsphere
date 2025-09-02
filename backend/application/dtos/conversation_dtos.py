"""
Conversation Data Transfer Objects

DTOs for conversation-related operations in the application layer.
Facilitates data transfer between presentation and application layers.

Key Features:
- Request/response DTOs for conversation operations
- Message handling and formatting
- Validation and serialization
- Clear separation from domain entities
- API contract definitions
"""

from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime


@dataclass
class MessageDTO:
    """DTO for individual messages."""
    message_id: int
    conversation_id: int
    content: str
    is_from_user: bool
    timestamp: datetime
    metadata: Optional[dict] = None


@dataclass
class CreateConversationRequestDTO:
    """Request DTO for creating a new conversation."""
    bot_id: int
    user_id: int
    title: Optional[str] = None
    initial_message: Optional[str] = None


@dataclass
class CreateConversationResponseDTO:
    """Response DTO for conversation creation."""
    conversation_id: int
    bot_id: int
    title: str
    created_at: datetime
    message: str


@dataclass
class SendMessageRequestDTO:
    """Request DTO for sending a message."""
    conversation_id: int
    user_id: int
    message_content: str
    message_type: str = "text"  # text, image, file, etc.


@dataclass
class SendMessageResponseDTO:
    """Response DTO for sending a message."""
    message_id: int
    conversation_id: int
    user_message: MessageDTO
    bot_response: MessageDTO
    conversation_active: bool


@dataclass
class ConversationDTO:
    """DTO for conversation details."""
    conversation_id: int
    bot_id: int
    bot_name: str
    user_id: int
    title: str
    message_count: int
    is_active: bool
    is_archived: bool
    started_at: datetime
    last_message_at: Optional[datetime]
    ended_at: Optional[datetime]


@dataclass
class ConversationWithMessagesDTO:
    """DTO for conversation with message history."""
    conversation: ConversationDTO
    messages: List[MessageDTO]
    total_messages: int
    has_more: bool


@dataclass
class ListConversationsRequestDTO:
    """Request DTO for listing conversations."""
    user_id: int
    bot_id: Optional[int] = None
    is_active: Optional[bool] = None
    limit: int = 20
    offset: int = 0
    sort_by: str = "last_message_at"  # last_message_at, started_at, title
    sort_order: str = "desc"  # asc, desc


@dataclass
class ListConversationsResponseDTO:
    """Response DTO for listing conversations."""
    conversations: List[ConversationDTO]
    total_count: int
    limit: int
    offset: int
    has_more: bool


@dataclass
class UpdateConversationRequestDTO:
    """Request DTO for updating a conversation."""
    conversation_id: int
    user_id: int
    title: Optional[str] = None
    is_archived: Optional[bool] = None


@dataclass
class UpdateConversationResponseDTO:
    """Response DTO for conversation update."""
    conversation_id: int
    title: str
    is_archived: bool
    updated_at: datetime
    message: str


@dataclass
class DeleteConversationRequestDTO:
    """Request DTO for deleting a conversation."""
    conversation_id: int
    user_id: int
    soft_delete: bool = True  # Soft delete by default


@dataclass
class DeleteConversationResponseDTO:
    """Response DTO for conversation deletion."""
    conversation_id: int
    deleted_at: datetime
    message: str
    messages_deleted: int


@dataclass
class GetConversationHistoryRequestDTO:
    """Request DTO for retrieving conversation history."""
    conversation_id: int
    user_id: int
    limit: int = 50
    offset: int = 0
    message_type: Optional[str] = None  # Filter by message type


@dataclass
class GetConversationHistoryResponseDTO:
    """Response DTO for conversation history."""
    conversation_id: int
    messages: List[MessageDTO]
    total_messages: int
    limit: int
    offset: int
    has_more: bool