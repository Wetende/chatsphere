"""
User Repository Interface

Contract for user persistence operations.
Defines domain-focused methods for user management without implementation details.

Business Operations:
- User creation and updates
- User authentication queries
- Email and username uniqueness validation
- User profile management
- Subscription status tracking
- User deactivation and reactivation

Query Patterns:
- By ID (primary lookup)
- By email (login authentication)
- By username (profile lookup)
- Active users filtering
- Subscription-based filtering
- Registration date ranges

Key Responsibilities:
- Ensure email uniqueness across platform
- Handle user status transitions
- Support efficient user queries
- Maintain referential integrity with bots
- Provide audit trail capabilities

Implementation Notes:
- Infrastructure layer provides actual implementation
- Should return domain entities, not ORM models
- Error handling through domain exceptions
- Async operations for scalability
"""

from abc import ABC, abstractmethod
from typing import Optional, List
from ..entities.user import User
from ..value_objects.user_id import UserId
from ..value_objects.email import Email
from ..value_objects.username import Username


class IUserRepository(ABC):
    """Interface contract for user persistence operations."""
    
    @abstractmethod
    async def get_by_id(self, user_id: UserId) -> Optional[User]:
        """
        Retrieve user by ID.
        
        Args:
            user_id: User identifier
            
        Returns:
            User entity if found, None otherwise
        """
        pass
    
    @abstractmethod
    async def get_by_email(self, email: Email) -> Optional[User]:
        """
        Retrieve user by email address.
        
        Args:
            email: User email address
            
        Returns:
            User entity if found, None otherwise
        """
        pass
    
    @abstractmethod
    async def get_by_username(self, username: Username) -> Optional[User]:
        """
        Retrieve user by username.
        
        Args:
            username: User username
            
        Returns:
            User entity if found, None otherwise
        """
        pass
    
    @abstractmethod
    async def save(self, user: User) -> User:
        """
        Persist user entity (create or update).
        
        Args:
            user: User entity to persist
            
        Returns:
            Saved user entity with updated timestamps
            
        Raises:
            DomainException: If business rules are violated
        """
        pass
    
    @abstractmethod
    async def delete(self, user_id: UserId) -> bool:
        """
        Delete user by ID.
        
        Args:
            user_id: User identifier
            
        Returns:
            True if deleted, False if not found
        """
        pass
    
    @abstractmethod
    async def email_exists(self, email: Email) -> bool:
        """
        Check if email already exists.
        
        Args:
            email: Email to check
            
        Returns:
            True if email exists, False otherwise
        """
        pass
    
    @abstractmethod
    async def username_exists(self, username: Username) -> bool:
        """
        Check if username already exists.
        
        Args:
            username: Username to check
            
        Returns:
            True if username exists, False otherwise
        """
        pass
    
    @abstractmethod
    async def find_active_users(self, limit: int = 100, offset: int = 0) -> List[User]:
        """
        Find active users with pagination.
        
        Args:
            limit: Maximum number of users to return
            offset: Number of users to skip
            
        Returns:
            List of active user entities
        """
        pass
    
    @abstractmethod
    async def find_by_subscription_status(self, status: str) -> List[User]:
        """
        Find users by subscription status.
        
        Args:
            status: Subscription status to filter by
            
        Returns:
            List of users with specified subscription status
        """
        pass
