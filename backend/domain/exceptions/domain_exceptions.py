"""
Domain Exceptions

Domain-specific exceptions that represent business rule violations.
These exceptions are part of the domain layer and should not depend
on infrastructure concerns.
"""


class DomainException(Exception):
    """Base domain exception."""
    
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class BusinessRuleViolationException(DomainException):
    """Exception raised when a business rule is violated."""
    pass


class EntityNotFoundException(DomainException):
    """Exception raised when an entity is not found."""
    pass


class InvalidEntityStateException(DomainException):
    """Exception raised when an entity is in an invalid state."""
    pass
