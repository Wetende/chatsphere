"""
Infrastructure - SQLAlchemy Unit of Work

Concrete implementation of the `IUnitOfWork` interface using SQLAlchemy's
AsyncSession. Coordinates transactions and repository lifecycles.

Key Features:
- Async SQLAlchemy session management
- Transaction control (begin, commit, rollback)
- Context manager support
- Connection pooling with session factory
- Error handling and cleanup
"""

import logging
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy.exc import SQLAlchemyError

from application.interfaces.unit_of_work import (
    IUnitOfWork,
    UnitOfWorkError,
    TransactionError
)

logger = logging.getLogger(__name__)


class SqlAlchemyUnitOfWork(IUnitOfWork):
    """
    SQLAlchemy implementation of Unit of Work pattern.
    
    Manages database transactions and session lifecycle using session factory.
    Provides transactional boundaries for application operations.
    """
    
    def __init__(self, session_factory: async_sessionmaker):
        """
        Initialize Unit of Work with a session factory.
        
        Args:
            session_factory: SQLAlchemy async session maker
        """
        self.session_factory = session_factory
        self._session: Optional[AsyncSession] = None
        self._is_active = False
        self._is_in_transaction = False
        self._transaction = None
    
    @property
    def session(self) -> AsyncSession:
        """
        Get the current session.
        
        Returns:
            Current SQLAlchemy async session
            
        Raises:
            UnitOfWorkError: If no active session
        """
        if not self._session:
            raise UnitOfWorkError("No active session. Call begin() first.")
        return self._session
    
    async def begin(self) -> None:
        """
        Begin a new transaction and create session.
        
        Raises:
            TransactionError: If transaction cannot be started
        """
        try:
            if self._is_in_transaction:
                logger.warning("Transaction already active, skipping begin")
                return
            
            # Create new session if needed
            if not self._session:
                self._session = self.session_factory()
                self._is_active = True
            
            # Begin transaction
            self._transaction = await self._session.begin()
            self._is_in_transaction = True
            
            logger.debug("Transaction started")
            
        except SQLAlchemyError as e:
            logger.error(f"Failed to begin transaction: {e}")
            await self._cleanup_session()
            raise TransactionError(f"Failed to begin transaction: {str(e)}", e)
        except Exception as e:
            logger.error(f"Unexpected error beginning transaction: {e}")
            await self._cleanup_session()
            raise UnitOfWorkError(f"Unexpected error beginning transaction: {str(e)}", e)
    
    async def commit(self) -> None:
        """
        Commit the current transaction.
        
        Raises:
            TransactionError: If commit fails
        """
        try:
            if not self._is_in_transaction:
                logger.warning("No active transaction to commit")
                return
            
            if self._transaction:
                await self._transaction.commit()
                self._transaction = None
            else:
                # Fallback to session commit
                if self._session:
                    await self._session.commit()
            
            self._is_in_transaction = False
            
            logger.debug("Transaction committed")
            
        except SQLAlchemyError as e:
            logger.error(f"Failed to commit transaction: {e}")
            await self._safe_rollback()
            raise TransactionError(f"Failed to commit transaction: {str(e)}", e)
        except Exception as e:
            logger.error(f"Unexpected error committing transaction: {e}")
            await self._safe_rollback()
            raise UnitOfWorkError(f"Unexpected error committing transaction: {str(e)}", e)
    
    async def rollback(self) -> None:
        """
        Rollback the current transaction.
        
        Raises:
            TransactionError: If rollback fails
        """
        try:
            if not self._is_in_transaction:
                logger.warning("No active transaction to rollback")
                return
            
            if self._transaction:
                await self._transaction.rollback()
                self._transaction = None
            else:
                # Fallback to session rollback
                if self._session:
                    await self._session.rollback()
            
            self._is_in_transaction = False
            
            logger.debug("Transaction rolled back")
            
        except SQLAlchemyError as e:
            logger.error(f"Failed to rollback transaction: {e}")
            raise TransactionError(f"Failed to rollback transaction: {str(e)}", e)
        except Exception as e:
            logger.error(f"Unexpected error rolling back transaction: {e}")
            raise UnitOfWorkError(f"Unexpected error rolling back transaction: {str(e)}", e)
    
    async def close(self) -> None:
        """
        Close the Unit of Work and clean up resources.
        
        Raises:
            UnitOfWorkError: If cleanup fails
        """
        try:
            # Rollback any active transaction
            if self._is_in_transaction:
                await self._safe_rollback()
            
            # Close the session
            await self._cleanup_session()
            
            logger.debug("Unit of Work closed")
            
        except Exception as e:
            logger.error(f"Error closing Unit of Work: {e}")
            raise UnitOfWorkError(f"Error closing Unit of Work: {str(e)}", e)
    
    def is_active(self) -> bool:
        """
        Check if the Unit of Work is active.
        
        Returns:
            True if active, False otherwise
        """
        return (
            self._is_active 
            and self._session is not None 
            and not self._session.is_closed
        )
    
    def is_in_transaction(self) -> bool:
        """
        Check if currently in a transaction.
        
        Returns:
            True if in transaction, False otherwise
        """
        return self._is_in_transaction
    
    async def _safe_rollback(self) -> None:
        """Safely rollback without raising exceptions."""
        try:
            await self.rollback()
        except Exception as e:
            logger.error(f"Error during safe rollback: {e}")
    
    async def _cleanup_session(self) -> None:
        """Clean up session resources."""
        if self._session and not self._session.is_closed:
            try:
                await self._session.close()
            except Exception as e:
                logger.error(f"Error closing session: {e}")
        
        self._session = None
        self._is_active = False
        self._is_in_transaction = False
        self._transaction = None
    
    # Context manager support
    async def __aenter__(self):
        """Enter async context manager."""
        await self.begin()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Exit async context manager."""
        try:
            if exc_type is not None:
                # Exception occurred, rollback
                await self.rollback()
            else:
                # No exception, commit
                await self.commit()
        finally:
            # Always close
            await self.close()
        
        # Don't suppress exceptions
        return False
    
    def __repr__(self) -> str:
        """String representation of Unit of Work."""
        return (
            f"<SqlAlchemyUnitOfWork("
            f"active={self.is_active()}, "
            f"in_transaction={self.is_in_transaction()}"
            f")>"
        )