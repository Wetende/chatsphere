"""
Application Interface - Unit of Work

Defines the contract for transaction management and repository coordination.
This is part of the Application layer in the Onion Architecture.

Key Features:
- Transaction management abstraction
- Repository coordination
- Rollback capabilities
- Async context management
- Session lifecycle management

Dependency Direction:
- Application layer defines the interface
- Infrastructure layer implements it
- Domain layer has no knowledge of transactions
"""

from abc import ABC, abstractmethod
from contextlib import asynccontextmanager
from typing import AsyncGenerator, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession


class IUnitOfWork(ABC):
    """
    Unit of Work interface.

    Defines the contract for transaction management and repository coordination.
    Infrastructure layer will provide concrete implementations.
    """

    @property
    @abstractmethod
    def session(self) -> AsyncSession:
        """Get the database session for this unit of work."""
        pass

    @abstractmethod
    async def begin(self) -> None:
        """
        Begin a new transaction.

        Raises:
            UnitOfWorkError: If transaction cannot be started
        """
        pass

    @abstractmethod
    async def commit(self) -> None:
        """
            Commit the current transaction.

            Raises:
                UnitOfWorkError: If transaction cannot be committed
            """
        pass

    @abstractmethod
    async def rollback(self) -> None:
        """
        Rollback the current transaction.

        Raises:
            UnitOfWorkError: If transaction cannot be rolled back
        """
        pass

    @abstractmethod
    async def close(self) -> None:
        """
        Close the unit of work and release resources.

        Raises:
            UnitOfWorkError: If unit of work cannot be closed
        """
        pass

    @abstractmethod
    def is_active(self) -> bool:
        """
        Check if the unit of work is currently active.

        Returns:
            True if the unit of work is active, False otherwise
        """
        pass

    @abstractmethod
    def is_in_transaction(self) -> bool:
        """
        Check if the unit of work is currently in a transaction.

        Returns:
            True if in a transaction, False otherwise
        """
        pass


class UnitOfWorkError(Exception):
    """Base exception for unit of work errors."""

    def __init__(self, message: str, original_error: Optional[Exception] = None):
        super().__init__(message)
        self.original_error = original_error


class TransactionError(UnitOfWorkError):
    """Exception raised when transaction operations fail."""
    pass


class ConnectionError(UnitOfWorkError):
    """Exception raised when database connection fails."""
    pass
