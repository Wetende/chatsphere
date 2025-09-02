"""
Application Interface - Email Service

Defines the contract for email functionality in the application layer.
This is part of the Application layer in the Onion Architecture.

Key Features:
- Email sending abstraction
- Template support
- Async operations
- Error handling
- Configuration flexibility

Dependency Direction:
- Application layer defines the interface
- Infrastructure layer implements it
- Domain layer has no knowledge of email
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from dataclasses import dataclass


@dataclass
class EmailMessage:
    """Email message data structure."""

    to_email: str
    subject: str
    body: str
    from_email: Optional[str] = None
    html_body: Optional[str] = None
    template_data: Optional[Dict[str, Any]] = None


class IEmailService(ABC):
    """
    Email service interface.

    Defines the contract for email operations.
    Infrastructure layer will provide concrete implementations.
    """

    @abstractmethod
    async def send_email(self, message: EmailMessage) -> bool:
        """
        Send an email message.

        Args:
            message: The email message to send

        Returns:
            True if email was sent successfully, False otherwise

        Raises:
            EmailServiceError: If email sending fails
        """
        pass

    @abstractmethod
    async def send_template_email(
        self,
        to_email: str,
        template_name: str,
        template_data: Dict[str, Any],
        subject: str
    ) -> bool:
        """
        Send an email using a template.

        Args:
            to_email: Recipient email address
            template_name: Name of the email template
            template_data: Data to populate the template
            subject: Email subject line

        Returns:
            True if email was sent successfully, False otherwise

        Raises:
            EmailServiceError: If email sending fails
        """
        pass

    @abstractmethod
    async def send_welcome_email(self, to_email: str, user_name: str) -> bool:
        """
        Send a welcome email to a new user.

        Args:
            to_email: New user's email address
            user_name: New user's name

        Returns:
            True if email was sent successfully, False otherwise
        """
        pass

    @abstractmethod
    async def send_password_reset_email(self, email, reset_token: str, user_name: str) -> bool:
        """
        Send a password reset email.

        Args:
            email: User's email address (Email value object)
            reset_token: Password reset token
            user_name: User's name for personalization

        Returns:
            True if email was sent successfully, False otherwise
        """
        pass

    @abstractmethod
    async def send_verification_email(self, email, verification_token: str, user_name: str = None) -> bool:
        """
        Send an email verification email.

        Args:
            email: User's email address (Email value object)
            verification_token: Email verification token
            user_name: User's name for personalization

        Returns:
            True if email was sent successfully, False otherwise
        """
        pass


class EmailServiceError(Exception):
    """Base exception for email service errors."""

    def __init__(self, message: str, original_error: Optional[Exception] = None):
        super().__init__(message)
        self.original_error = original_error


class EmailSendingError(EmailServiceError):
    """Exception raised when email sending fails."""
    pass


class EmailConfigurationError(EmailServiceError):
    """Exception raised when email service is misconfigured."""
    pass
