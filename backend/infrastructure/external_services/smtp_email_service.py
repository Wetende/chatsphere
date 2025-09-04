"""
Infrastructure Implementation - SMTP Email Service

Concrete implementation of the email service interface using SMTP.
This is part of the Infrastructure layer in the Onion Architecture.

Key Features:
- SMTP email sending
- Template support
- Async operations
- Connection pooling
- Error handling

Dependency Direction:
- Infrastructure layer implements Application interfaces
- No dependencies on Application or Domain layers
- Uses external SMTP libraries
"""

import asyncio
import logging
from typing import Dict, Any, Optional
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiosmtplib
from jinja2 import Template

from application.interfaces.email_service import (
    IEmailService,
    EmailMessage,
    EmailServiceError,
    EmailSendingError,
    EmailConfigurationError
)

logger = logging.getLogger(__name__)


class SmtpEmailService(IEmailService):
    """
    SMTP-based email service implementation.

    Uses aiosmtplib for async SMTP operations and Jinja2 for templating.
    """

    def __init__(
        self,
        smtp_host: str,
        smtp_port: int = 587,
        smtp_username: Optional[str] = None,
        smtp_password: Optional[str] = None,
        use_tls: bool = True,
        default_from_email: str = "",
        connection_timeout: int = 30,
        templates: Optional[Dict[str, str]] = None
    ):
        """
        Initialize SMTP email service.

        Args:
            smtp_host: SMTP server hostname
            smtp_port: SMTP server port
            smtp_username: SMTP authentication username
            smtp_password: SMTP authentication password
            use_tls: Whether to use TLS encryption
            default_from_email: Default sender email address
            connection_timeout: Connection timeout in seconds
            templates: Dictionary of email templates
        """
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.smtp_username = smtp_username
        self.smtp_password = smtp_password
        self.use_tls = use_tls
        self.default_from_email = default_from_email
        self.connection_timeout = connection_timeout
        self.templates = templates or {}

        # Validate configuration
        if not self.smtp_host:
            raise EmailConfigurationError("SMTP host is required")

        if not self.default_from_email:
            raise EmailConfigurationError("Default from email is required")

    async def send_email(self, message: EmailMessage) -> bool:
        """
        Send an email message via SMTP.

        Args:
            message: The email message to send

        Returns:
            True if email was sent successfully

        Raises:
            EmailSendingError: If email sending fails
        """
        try:
            # Create message
            msg = self._create_email_message(message)

            # Send email
            success = await self._send_via_smtp(msg)

            if success:
                logger.info(f"Email sent successfully to {message.to_email}")
            else:
                logger.error(f"Failed to send email to {message.to_email}")

            return success

        except Exception as e:
            logger.error(f"Error sending email to {message.to_email}: {str(e)}")
            raise EmailSendingError(f"Failed to send email: {str(e)}", e)

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
            True if email was sent successfully

        Raises:
            EmailSendingError: If email sending fails
        """
        try:
            # Get template
            template_content = self.templates.get(template_name)
            if not template_content:
                raise EmailSendingError(f"Template '{template_name}' not found")

            # Render template
            template = Template(template_content)
            html_body = template.render(**template_data)

            # Create plain text version (basic conversion)
            plain_body = html_body.replace('<br>', '\n').replace('<p>', '').replace('</p>', '\n')

            # Create message
            message = EmailMessage(
                to_email=to_email,
                subject=subject,
                body=plain_body,
                html_body=html_body,
                from_email=self.default_from_email
            )

            return await self.send_email(message)

        except Exception as e:
            logger.error(f"Error sending template email: {str(e)}")
            raise EmailSendingError(f"Failed to send template email: {str(e)}", e)

    async def send_welcome_email(self, to_email: str, user_name: str) -> bool:
        """
        Send a welcome email to a new user.

        Args:
            to_email: New user's email address
            user_name: New user's name

        Returns:
            True if email was sent successfully
        """
        template_data = {
            "user_name": user_name,
            "email": to_email
        }

        return await self.send_template_email(
            to_email=to_email,
            template_name="welcome",
            template_data=template_data,
            subject="Welcome to KyroChat!"
        )

    async def _send_password_reset_email_str(self, to_email: str, reset_token: str) -> bool:
        template_data = {
            "email": to_email,
            "reset_token": reset_token,
            "reset_url": f"https://yourapp.com/reset-password?token={reset_token}"
        }
        return await self.send_template_email(
            to_email=to_email,
            template_name="password_reset",
            template_data=template_data,
            subject="Reset Your Password"
        )

    async def send_verification_email(self, email, verification_token: str, user_name: Optional[str] = None) -> bool:
        """
        Send an email verification message.

        Args:
            email: Email value object or string
            verification_token: Verification token
            user_name: Optional user name for personalization

        Returns:
            True if sent successfully
        """
        to_email = str(email)
        template_data = {
            "user_name": user_name or to_email,
            "email": to_email,
            "verification_token": verification_token,
            "verification_url": f"https://yourapp.com/verify-email?token={verification_token}&email={to_email}"
        }
        return await self.send_template_email(
            to_email=to_email,
            template_name="verify_email",
            template_data=template_data,
            subject="Verify Your Email"
        )

    async def send_password_reset_email(self, email, reset_token: str, user_name: Optional[str] = None) -> bool:  # type: ignore[override]
        """Interface-compatible method signature delegating to string-based implementation."""
        return await self._send_password_reset_email_str(str(email), reset_token)

    def _create_email_message(self, message: EmailMessage) -> MIMEMultipart:
        """Create email message object."""
        msg = MIMEMultipart('alternative')
        msg['From'] = message.from_email or self.default_from_email
        msg['To'] = message.to_email
        msg['Subject'] = message.subject

        # Add plain text part
        text_part = MIMEText(message.body, 'plain')
        msg.attach(text_part)

        # Add HTML part if provided
        if message.html_body:
            html_part = MIMEText(message.html_body, 'html')
            msg.attach(html_part)

        return msg

    async def _send_via_smtp(self, msg: MIMEMultipart) -> bool:
        """Send email via SMTP."""
        try:
            # Create SMTP client
            smtp_client = aiosmtplib.SMTP(
                hostname=self.smtp_host,
                port=self.smtp_port,
                timeout=self.connection_timeout
            )

            # Connect
            await smtp_client.connect()

            # Start TLS if required
            if self.use_tls:
                await smtp_client.starttls()

            # Login if credentials provided
            if self.smtp_username and self.smtp_password:
                await smtp_client.login(self.smtp_username, self.smtp_password)

            # Send email
            await smtp_client.sendmail(msg['From'], [msg['To']], msg.as_string())

            # Quit
            await smtp_client.quit()

            return True

        except Exception as e:
            logger.error(f"SMTP error: {str(e)}")
            raise EmailSendingError(f"SMTP error: {str(e)}", e)

    def add_template(self, name: str, template_content: str) -> None:
        """
        Add an email template.

        Args:
            name: Template name
            template_content: Jinja2 template content
        """
        self.templates[name] = template_content

    def load_templates_from_directory(self, template_dir: str) -> None:
        """
        Load email templates from a directory.

        Args:
            template_dir: Directory containing template files
        """
        import os

        for filename in os.listdir(template_dir):
            if filename.endswith('.html') or filename.endswith('.txt'):
                template_name = os.path.splitext(filename)[0]
                template_path = os.path.join(template_dir, filename)

                with open(template_path, 'r', encoding='utf-8') as f:
                    self.templates[template_name] = f.read()
