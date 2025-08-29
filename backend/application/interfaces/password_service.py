"""
Application Interface - Password Service

Defines the contract for password hashing and verification.
This is part of the Application layer in the Onion Architecture.

Key Features:
- Password hashing abstraction
- Password verification
- Secure password policies
- Async operations
- Error handling

Dependency Direction:
- Application layer defines the interface
- Infrastructure layer implements it
- Domain layer has no knowledge of password hashing
"""

from abc import ABC, abstractmethod
from typing import Optional


class IPasswordService(ABC):
    """
    Password service interface.

    Defines the contract for password operations.
    Infrastructure layer will provide concrete implementations.
    """

    @abstractmethod
    async def hash_password(self, plain_password: str) -> str:
        """
        Hash a plain text password.

        Args:
            plain_password: The plain text password to hash

        Returns:
            The hashed password string

        Raises:
            PasswordServiceError: If password hashing fails
        """
        pass

    @abstractmethod
    async def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """
        Verify a plain text password against a hash.

        Args:
            plain_password: The plain text password
            hashed_password: The hashed password to verify against

        Returns:
            True if password matches, False otherwise

        Raises:
            PasswordServiceError: If password verification fails
        """
        pass

    @abstractmethod
    def validate_password_strength(self, password: str) -> tuple[bool, Optional[str]]:
        """
        Validate password strength according to security policies.

        Args:
            password: The password to validate

        Returns:
            Tuple of (is_valid, error_message)
            - is_valid: True if password meets requirements
            - error_message: None if valid, error message if invalid
        """
        pass

    @abstractmethod
    def generate_secure_password(self, length: int = 12) -> str:
        """
        Generate a secure random password.

        Args:
            length: Desired length of the password (default: 12)

        Returns:
            A secure random password string

        Raises:
            PasswordServiceError: If password generation fails
        """
        pass


class PasswordServiceError(Exception):
    """Base exception for password service errors."""

    def __init__(self, message: str, original_error: Optional[Exception] = None):
        super().__init__(message)
        self.original_error = original_error


class PasswordHashingError(PasswordServiceError):
    """Exception raised when password hashing fails."""
    pass


class PasswordVerificationError(PasswordServiceError):
    """Exception raised when password verification fails."""
    pass


class WeakPasswordError(PasswordServiceError):
    """Exception raised when password doesn't meet strength requirements."""
    pass
