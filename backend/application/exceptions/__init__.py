"""
Application exceptions module.
"""

from .application_exceptions import (
    ApplicationException,
    ValidationException,
    UserAlreadyExistsException,
    AuthenticationFailedException
)

__all__ = [
    "ApplicationException",
    "ValidationException",
    "UserAlreadyExistsException", 
    "AuthenticationFailedException"
]
