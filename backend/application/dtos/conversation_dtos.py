"""
Conversation Data Transfer Objects

DTOs for conversation and message operations in the application layer.
Facilitates data transfer between presentation and application layers.

Key Features:
- Request/response DTOs for conversation operations
- Message DTOs for chat functionality  
- AI integration data structures
- Validation and serialization
"""

from dataclasses import dataclass
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


class MessageRole(str, Enum):
    """Message role enumeration."""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


@dataclass
class MessageDTO:
    """DTO for a single message."""
    id: Optional[str] = None
    content: str = ""
    role: MessageRole = MessageRole.USER
    tokens_used: Optional[int] = None
    processing_time_ms: Optional[int] = None
    model_name: Optional[str] = None
    temperature: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    is_helpful: Optional[bool] = None
    user_feedback: Optional[str] = None
    created_at: Optional[datetime] = None


@dataclass
class SendMessageRequestDTO:
    """Request DTO for sending a message."""
    conversation_id: Optional[str] = None  # None for new conversation
    bot_id: str = ""
    message: str = ""
    stream_response: bool = False
    include_context: bool = True
    max_tokens: Optional[int] = None
    temperature: Optional[float] = None


@dataclass
class SendMessageResponseDTO:
    """Response DTO for sending a message."""
    conversation_id: str
    message_id: str
    bot_response: str
    tokens_used: int
    processing_time_ms: int
    model_name: str
    temperature: float
    conversation_title: Optional[str] = None
    is_new_conversation: bool = False
    message: str = "Message sent successfully"


@dataclass
class CreateConversationRequestDTO:
    """Request DTO for creating a new conversation."""
    bot_id: str
    title: Optional[str] = None
    initial_message: Optional[str] = None


@dataclass
class CreateConversationResponseDTO:
    """Response DTO for conversation creation."""
    conversation_id: str
    bot_id: str
    title: str
    is_active: bool
    created_at: datetime
    message: str = "Conversation created successfully"


@dataclass
class ConversationSummaryDTO:
    """DTO for conversation summary in lists."""
    conversation_id: str
    title: str
    bot_id: str
    bot_name: str
    message_count: int
    created_at: datetime
    last_message: Optional[str] = None
    last_message_time: Optional[datetime] = None
    is_pinned: bool = False


@dataclass
class ConversationDetailsDTO:
    """DTO for detailed conversation information."""
    conversation_id: str
    title: str
    bot_id: str
    bot_name: str
    bot_avatar_url: Optional[str]
    user_id: str
    is_active: bool
    is_pinned: bool
    message_count: int
    total_tokens_used: int
    created_at: datetime
    rating: Optional[float] = None
    feedback: Optional[str] = None
    settings: Optional[Dict[str, Any]] = None
    updated_at: Optional[datetime] = None


@dataclass
class ListConversationsRequestDTO:
    """Request DTO for listing conversations."""
    user_id: str
    bot_id: Optional[str] = None
    is_active: Optional[bool] = True
    is_pinned: Optional[bool] = None
    limit: int = 20
    offset: int = 0
    sort_by: str = "updated_at"  # updated_at, created_at, title
    sort_order: str = "desc"  # asc, desc


@dataclass
class ListConversationsResponseDTO:
    """Response DTO for listing conversations."""
    conversations: List[ConversationSummaryDTO]
    total_count: int
    limit: int
    offset: int
    has_more: bool


@dataclass
class GetConversationMessagesRequestDTO:
    """Request DTO for getting conversation messages."""
    conversation_id: str
    limit: int = 50
    offset: int = 0
    include_metadata: bool = False


@dataclass
class GetConversationMessagesResponseDTO:
    """Response DTO for conversation messages."""
    conversation_id: str
    messages: List[MessageDTO]
    total_count: int
    limit: int
    offset: int
    has_more: bool


@dataclass
class UpdateConversationRequestDTO:
    """Request DTO for updating conversation."""
    title: Optional[str] = None
    is_pinned: Optional[bool] = None
    rating: Optional[float] = None
    feedback: Optional[str] = None
    settings: Optional[Dict[str, Any]] = None


@dataclass
class UpdateConversationResponseDTO:
    """Response DTO for conversation update."""
    conversation_id: str
    title: str
    is_pinned: bool
    updated_at: datetime
    message: str = "Conversation updated successfully"


@dataclass
class DeleteConversationRequestDTO:
    """Request DTO for deleting conversation."""
    conversation_id: str
    confirmation: bool = False


@dataclass
class DeleteConversationResponseDTO:
    """Response DTO for conversation deletion."""
    conversation_id: str
    message: str = "Conversation deleted successfully"
    messages_deleted: int = 0


@dataclass
class StreamingMessageChunk:
    """DTO for streaming message chunks."""
    conversation_id: str
    message_id: str
    chunk: str
    is_complete: bool = False
    tokens_used: Optional[int] = None
    processing_time_ms: Optional[int] = None
    error: Optional[str] = None


@dataclass
class MessageFeedbackRequestDTO:
    """Request DTO for message feedback."""
    message_id: str
    is_helpful: bool
    feedback: Optional[str] = None


@dataclass
class MessageFeedbackResponseDTO:
    """Response DTO for message feedback."""
    message_id: str
    message: str = "Feedback recorded successfully"
