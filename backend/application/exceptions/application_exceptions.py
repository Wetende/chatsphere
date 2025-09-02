"""
Application Exceptions

Application-specific exceptions that represent application service errors.
These exceptions are part of the application layer.
"""


class ApplicationException(Exception):
    """Base application exception."""
    
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class ValidationException(ApplicationException):
    """Exception raised when validation fails."""
    pass


class UserAlreadyExistsException(ApplicationException):
    """Exception raised when user already exists."""
    pass


class AuthenticationFailedException(ApplicationException):
    """Exception raised when authentication fails."""
    pass


class ResourceNotFoundException(ApplicationException):
    """Exception raised when a requested resource is not found."""
    pass


class ConflictException(ApplicationException):
    """Exception raised when a resource conflict occurs."""
    pass


class BusinessRuleViolationException(ApplicationException):
    """Exception raised when a business rule is violated."""
    pass


class ExternalServiceException(ApplicationException):
    """Exception raised when external service operations fail."""
    pass


class UserNotFoundException(ApplicationException):
    """Exception raised when user is not found."""
    pass


class AuthorizationException(ApplicationException):
    """Exception raised for unauthorized access."""
    pass


class BotNotFoundException(ApplicationException):
    """Exception raised when bot is not found."""
    pass


class EmailServiceException(ApplicationException):
    """Exception raised when email service operations fail."""
    pass