"""
Infrastructure Implementation - SQLAlchemy User Repository

Concrete implementation of the `IUserRepository` interface using SQLAlchemy.
This module belongs to the Infrastructure layer.

Key Features:
- Async SQLAlchemy operations
- Domain entity to ORM model mapping
- Query optimization with proper indexes
- Error handling and logging
- Bulk operations support
"""

import logging
import uuid
from typing import Optional, List

from sqlalchemy import select, func, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from domain.repositories.user_repository import IUserRepository
from domain.entities.user import User
from domain.value_objects.email import Email
from domain.value_objects.username import Username
from domain.value_objects.user_id import UserId
from infrastructure.database.models.user import UserModel

logger = logging.getLogger(__name__)


class SqlAlchemyUserRepository(IUserRepository):
    """SQLAlchemy implementation of user repository."""
    
    def __init__(self, session: AsyncSession):
        """
        Initialize user repository with SQLAlchemy session.
        
        Args:
            session: SQLAlchemy async session
        """
        self.session = session
    
    async def get_by_id(self, user_id: UserId) -> Optional[User]:
        """
        Get user by ID.
        
        Args:
            user_id: User ID value object
            
        Returns:
            User domain entity or None if not found
        """
        try:
            # Convert value object to UUID
            id_value = uuid.UUID(str(user_id))
            
            # Query for user model
            stmt = select(UserModel).where(UserModel.id == id_value)
            result = await self.session.execute(stmt)
            user_model = result.scalar_one_or_none()
            
            if not user_model:
                return None
            
            # Convert to domain entity
            return self._model_to_domain(user_model)
            
        except Exception as e:
            logger.error(f"Error getting user by ID {user_id}: {e}")
            return None
    
    async def get_by_email(self, email: Email) -> Optional[User]:
        """
        Get user by email.
        
        Args:
            email: Email value object
            
        Returns:
            User domain entity or None if not found
        """
        try:
            # Query for user model by email
            stmt = select(UserModel).where(UserModel.email == str(email))
            result = await self.session.execute(stmt)
            user_model = result.scalar_one_or_none()
            
            if not user_model:
                return None
            
            # Convert to domain entity
            return self._model_to_domain(user_model)
            
        except Exception as e:
            logger.error(f"Error getting user by email {email}: {e}")
            return None
    
    async def get_by_username(self, username: Username) -> Optional[User]:
        """
        Get user by username.
        
        Args:
            username: Username value object
            
        Returns:
            User domain entity or None if not found
        """
        try:
            # Query for user model by username
            stmt = select(UserModel).where(UserModel.username == str(username))
            result = await self.session.execute(stmt)
            user_model = result.scalar_one_or_none()
            
            if not user_model:
                return None
            
            # Convert to domain entity
            return self._model_to_domain(user_model)
            
        except Exception as e:
            logger.error(f"Error getting user by username {username}: {e}")
            return None
    
    async def save(self, user: User) -> User:
        """
        Save user (create or update).
        
        Args:
            user: User domain entity
            
        Returns:
            Saved user domain entity
        """
        try:
            # Check if user exists
            existing_model = None
            if user.id:
                stmt = select(UserModel).where(UserModel.id == uuid.UUID(str(user.id)))
                result = await self.session.execute(stmt)
                existing_model = result.scalar_one_or_none()
            
            if existing_model:
                # Update existing
                self._update_model_from_domain(existing_model, user)
                user_model = existing_model
            else:
                # Create new
                user_model = self._domain_to_model(user)
                self.session.add(user_model)
            
            # Flush to get ID if new
            await self.session.flush()
            
            # Convert back to domain entity with updated ID
            return self._model_to_domain(user_model)
            
        except SQLAlchemyError as e:
            logger.error(f"Error saving user: {e}")
            await self.session.rollback()
            raise
        except Exception as e:
            logger.error(f"Unexpected error saving user: {e}")
            raise
    
    async def delete(self, user_id: UserId) -> bool:
        """
        Delete user by ID.
        
        Args:
            user_id: User ID value object
            
        Returns:
            True if deleted, False if not found
        """
        try:
            # Convert value object to UUID
            id_value = uuid.UUID(str(user_id))
            
            # Query for user
            stmt = select(UserModel).where(UserModel.id == id_value)
            result = await self.session.execute(stmt)
            user_model = result.scalar_one_or_none()
            
            if not user_model:
                return False
            
            # Delete the user
            await self.session.delete(user_model)
            await self.session.flush()
            
            return True
            
        except Exception as e:
            logger.error(f"Error deleting user {user_id}: {e}")
            await self.session.rollback()
            raise
    
    async def email_exists(self, email: Email) -> bool:
        """
        Check if email already exists.
        
        Args:
            email: Email value object
            
        Returns:
            True if email exists, False otherwise
        """
        try:
            stmt = select(func.count(UserModel.id)).where(UserModel.email == str(email))
            result = await self.session.execute(stmt)
            count = result.scalar() or 0
            return count > 0
            
        except Exception as e:
            logger.error(f"Error checking email exists {email}: {e}")
            return False
    
    async def username_exists(self, username: Username) -> bool:
        """
        Check if username already exists.
        
        Args:
            username: Username value object
            
        Returns:
            True if username exists, False otherwise
        """
        try:
            stmt = select(func.count(UserModel.id)).where(UserModel.username == str(username))
            result = await self.session.execute(stmt)
            count = result.scalar() or 0
            return count > 0
            
        except Exception as e:
            logger.error(f"Error checking username exists {username}: {e}")
            return False
    
    async def find_active_users(self, limit: int = 100, offset: int = 0) -> List[User]:
        """
        Find active users with pagination.
        
        Args:
            limit: Maximum number of users to return
            offset: Number of users to skip
            
        Returns:
            List of active user domain entities
        """
        try:
            # Query with pagination
            stmt = (
                select(UserModel)
                .where(UserModel.is_active == True)
                .order_by(UserModel.created_at.desc())
                .limit(limit)
                .offset(offset)
            )
            
            result = await self.session.execute(stmt)
            user_models = result.scalars().all()
            
            # Convert to domain entities
            return [self._model_to_domain(model) for model in user_models]
            
        except Exception as e:
            logger.error(f"Error finding active users: {e}")
            return []
    
    async def find_by_subscription_status(self, status: str) -> List[User]:
        """
        Find users by subscription status.
        
        Args:
            status: Subscription status
            
        Returns:
            List of user domain entities with matching subscription
        """
        try:
            stmt = (
                select(UserModel)
                .where(
                    and_(
                        UserModel.is_active == True,
                        UserModel.subscription_status == status
                    )
                )
                .order_by(UserModel.created_at.desc())
            )
            
            result = await self.session.execute(stmt)
            user_models = result.scalars().all()
            
            return [self._model_to_domain(model) for model in user_models]
            
        except Exception as e:
            logger.error(f"Error finding users by subscription status {status}: {e}")
            return []
    
    async def search(self, query: str, limit: int = 20) -> List[User]:
        """
        Search users by email or username.
        
        Args:
            query: Search query
            limit: Maximum results
            
        Returns:
            List of matching user entities
        """
        try:
            # Search in email and username fields
            search_term = f"%{query.lower()}%"
            stmt = (
                select(UserModel)
                .where(
                    and_(
                        UserModel.is_active == True,
                        or_(
                            func.lower(UserModel.email).like(search_term),
                            func.lower(UserModel.username).like(search_term),
                            func.lower(UserModel.first_name).like(search_term),
                            func.lower(UserModel.last_name).like(search_term)
                        )
                    )
                )
                .order_by(UserModel.username)
                .limit(limit)
            )
            
            result = await self.session.execute(stmt)
            user_models = result.scalars().all()
            
            return [self._model_to_domain(model) for model in user_models]
            
        except Exception as e:
            logger.error(f"Error searching users: {e}")
            return []
    
    def _model_to_domain(self, model: UserModel) -> User:
        """Convert SQLAlchemy model to domain entity."""
        return User(
            id=UserId(str(model.id)),
            email=Email(model.email),
            username=Username(model.username),
            password_hash=model.password_hash,
            first_name=model.first_name,
            last_name=model.last_name,
            is_active=model.is_active,
            is_verified=model.is_verified,
            subscription_status=model.subscription_status,
            last_login=model.last_login,
            failed_login_attempts=model.failed_login_attempts,
            locked_until=model.locked_until,
            created_at=model.created_at,
            updated_at=model.updated_at
        )
    
    def _domain_to_model(self, user: User) -> UserModel:
        """Convert domain entity to SQLAlchemy model."""
        model = UserModel(
            email=str(user.email),
            username=str(user.username),
            password_hash=user.password_hash,
            first_name=user.first_name,
            last_name=user.last_name,
            is_active=user.is_active,
            is_verified=user.is_verified,
            subscription_status=user.subscription_status,
            last_login=user.last_login,
            failed_login_attempts=user.failed_login_attempts,
            locked_until=user.locked_until
        )
        
        # Set ID if provided
        if user.id:
            model.id = uuid.UUID(str(user.id))
        
        return model
    
    def _update_model_from_domain(self, model: UserModel, user: User) -> None:
        """Update SQLAlchemy model from domain entity."""
        model.email = str(user.email)
        model.username = str(user.username)
        model.password_hash = user.password_hash
        model.first_name = user.first_name
        model.last_name = user.last_name
        model.is_active = user.is_active
        model.is_verified = user.is_verified
        model.subscription_status = user.subscription_status
        model.last_login = user.last_login
        model.failed_login_attempts = user.failed_login_attempts
        model.locked_until = user.locked_until