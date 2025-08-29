"""
Application Interface - AI Service

Defines the contract for AI/LLM operations in the application layer.
This is part of the Application layer in the Onion Architecture.

Key Features:
- Text generation abstraction
- Conversation management
- Model configuration
- Async operations
- Error handling

Dependency Direction:
- Application layer defines the interface
- Infrastructure layer implements it
- Domain layer has no knowledge of AI services
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional, AsyncGenerator
from dataclasses import dataclass


@dataclass
class ChatMessage:
    """Chat message data structure."""

    role: str  # "user", "assistant", "system"
    content: str
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class ChatRequest:
    """Chat request data structure."""

    messages: List[ChatMessage]
    model: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    stream: bool = False
    context: Optional[Dict[str, Any]] = None


@dataclass
class ChatResponse:
    """Chat response data structure."""

    content: str
    model: str
    usage: Optional[Dict[str, int]] = None
    finish_reason: Optional[str] = None


class IAIService(ABC):
    """
    AI service interface.

    Defines the contract for AI/LLM operations.
    Infrastructure layer will provide concrete implementations.
    """

    @abstractmethod
    async def initialize(self) -> None:
        """
        Initialize the AI service.

        Raises:
            AIServiceError: If initialization fails
        """
        pass

    @abstractmethod
    async def chat_completion(self, request: ChatRequest) -> ChatResponse:
        """
        Generate a chat completion response.

        Args:
            request: The chat request with messages and parameters

        Returns:
            The chat response from the AI model

        Raises:
            AIServiceError: If chat completion fails
        """
        pass

    @abstractmethod
    async def chat_completion_stream(
        self, request: ChatRequest
    ) -> AsyncGenerator[str, None]:
        """
        Generate a streaming chat completion response.

        Args:
            request: The chat request with messages and parameters

        Yields:
            Chunks of the response content

        Raises:
            AIServiceError: If streaming fails
        """
        pass

    @abstractmethod
    async def embed_text(self, text: str, model: Optional[str] = None) -> List[float]:
        """
        Generate embeddings for the given text.

        Args:
            text: The text to embed
            model: Optional model to use for embedding

        Returns:
            List of embedding vectors (floats)

        Raises:
            AIServiceError: If embedding fails
        """
        pass

    @abstractmethod
    async def embed_texts(
        self, texts: List[str], model: Optional[str] = None
    ) -> List[List[float]]:
        """
        Generate embeddings for multiple texts.

        Args:
            texts: List of texts to embed
            model: Optional model to use for embedding

        Returns:
            List of embedding vectors

        Raises:
            AIServiceError: If embedding fails
        """
        pass

    @abstractmethod
    def get_available_models(self) -> List[str]:
        """
        Get list of available AI models.

        Returns:
            List of available model names
        """
        pass

    @abstractmethod
    def validate_model(self, model_name: str) -> bool:
        """
        Validate if a model name is supported.

        Args:
            model_name: Name of the model to validate

        Returns:
            True if model is supported, False otherwise
        """
        pass

    @abstractmethod
    async def check_service_health(self) -> bool:
        """
        Check if the AI service is healthy and accessible.

        Returns:
            True if service is healthy, False otherwise
        """
        pass


class AIServiceError(Exception):
    """Base exception for AI service errors."""

    def __init__(self, message: str, original_error: Optional[Exception] = None):
        super().__init__(message)
        self.original_error = original_error


class AIModelError(AIServiceError):
    """Exception raised when AI model operations fail."""
    pass


class AIConfigurationError(AIServiceError):
    """Exception raised when AI service is misconfigured."""
    pass


class AIQuotaExceededError(AIServiceError):
    """Exception raised when AI service quota is exceeded."""
    pass
