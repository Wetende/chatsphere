"""
Application Interface - Authentication Service

Defines the contract for JWT token operations in the application layer.
This is part of the Application layer in the Onion Architecture.

Key Features:
- Token generation abstraction
- Token validation
- User authentication state management
- Token refresh capabilities
- Error handling

Dependency Direction:
- Application layer defines the interface
- Infrastructure layer implements it
- Domain layer has no knowledge of authentication tokens
"""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import Dict, Any, Optional


class IAuthService(ABC):
    """
    Authentication service interface.

    Defines the contract for JWT token operations.
    Infrastructure layer will provide concrete implementations.
    """

    @abstractmethod
    def generate_access_token(
        self, 
        user_id: str, 
        email: str, 
        additional_claims: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generate a JWT access token for a user.

        Args:
            user_id: User identifier
            email: User email address
            additional_claims: Optional additional claims to include

        Returns:
            JWT access token string

        Raises:
            TokenGenerationError: If token generation fails
        """
        pass

    @abstractmethod
    def generate_refresh_token(self, user_id: str) -> str:
        """
        Generate a JWT refresh token for a user.

        Args:
            user_id: User identifier

        Returns:
            JWT refresh token string

        Raises:
            TokenGenerationError: If token generation fails
        """
        pass

    @abstractmethod
    def validate_token(self, token: str, token_type: str = "access") -> Dict[str, Any]:
        """
        Validate a JWT token and return its claims.

        Args:
            token: JWT token to validate
            token_type: Expected token type ("access" or "refresh")

        Returns:
            Token payload/claims dictionary

        Raises:
            TokenValidationError: If token validation fails
        """
        pass

    @abstractmethod
    def extract_user_id(self, token: str) -> str:
        """
        Extract user ID from a valid JWT token.

        Args:
            token: JWT token

        Returns:
            User ID string

        Raises:
            TokenValidationError: If token is invalid or user ID missing
        """
        pass

    @abstractmethod
    def refresh_access_token(self, refresh_token: str) -> str:
        """
        Generate a new access token from a valid refresh token.

        Args:
            refresh_token: Valid refresh token

        Returns:
            New access token string

        Raises:
            TokenValidationError: If refresh token is invalid
            TokenGenerationError: If new token generation fails
        """
        pass

    @abstractmethod
    def is_token_expired(self, token: str) -> bool:
        """
        Check if a token is expired without full validation.

        Args:
            token: JWT token to check

        Returns:
            True if token is expired, False otherwise
        """
        pass

    @abstractmethod
    def get_token_expiration(self, token: str) -> Optional[datetime]:
        """
        Get the expiration datetime of a token.

        Args:
            token: JWT token

        Returns:
            Expiration datetime or None if not available
        """
        pass


class AuthServiceError(Exception):
    """Base exception for authentication service errors."""

    def __init__(self, message: str, original_error: Optional[Exception] = None):
        super().__init__(message)
        self.original_error = original_error


class TokenGenerationError(AuthServiceError):
    """Exception raised when token generation fails."""
    pass


class TokenValidationError(AuthServiceError):
    """Exception raised when token validation fails."""
    pass


class TokenExpiredError(TokenValidationError):
    """Exception raised when token has expired."""
    pass
