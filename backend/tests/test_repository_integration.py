"""
Repository Integration Tests

Tests the repository implementations with real database operations:
- SQLAlchemy repository implementations
- Database CRUD operations
- Transaction handling
- Domain entity mapping
- Query performance
"""

import pytest
import pytest_asyncio
import uuid
from datetime import datetime, timezone

from domain.entities.user import User
from domain.value_objects.user_id import UserId
from domain.value_objects.email import Email
from domain.value_objects.username import Username
from infrastructure.repositories.sqlalchemy_user_repository import SqlAlchemyUserRepository


class TestUserRepository:
    """Test user repository database operations."""
    
    @pytest_asyncio.fixture(autouse=True)
    async def setup(self, test_session, user_factory, password_service):
        """Setup test environment."""
        self.session = test_session
        self.repository = SqlAlchemyUserRepository(test_session)
        self.user_factory = user_factory
        self.password_service = password_service
    
    @pytest.mark.asyncio
    async def test_save_new_user(self):
        """Test saving a new user to database."""
        # Arrange
        user = self.user_factory.create_user(
            email="new@example.com",
            username="newuser"
        )
        user.id = None  # New user shouldn't have ID
        
        # Act
        saved_user = await self.repository.save(user)
        
        # Assert
        assert saved_user.id is not None
        assert str(saved_user.email) == "new@example.com"
        assert str(saved_user.username) == "newuser"
        assert saved_user.is_active is True
    
    @pytest.mark.asyncio
    async def test_get_user_by_id(self):
        """Test retrieving user by ID."""
        # Arrange
        created_user = await self.user_factory.create_user_in_db(
            self.session,
            email="byid@example.com",
            username="byiduser"
        )
        user_id = UserId(str(created_user.id))
        
        # Act
        retrieved_user = await self.repository.get_by_id(user_id)
        
        # Assert
        assert retrieved_user is not None
        assert str(retrieved_user.id) == str(created_user.id)
        assert str(retrieved_user.email) == "byid@example.com"
        assert str(retrieved_user.username) == "byiduser"
    
    @pytest.mark.asyncio
    async def test_get_user_by_email(self):
        """Test retrieving user by email."""
        # Arrange
        created_user = await self.user_factory.create_user_in_db(
            self.session,
            email="byemail@example.com",
            username="byemailuser"
        )
        email = Email("byemail@example.com")
        
        # Act
        retrieved_user = await self.repository.get_by_email(email)
        
        # Assert
        assert retrieved_user is not None
        assert str(retrieved_user.email) == "byemail@example.com"
        assert str(retrieved_user.id) == str(created_user.id)
    
    @pytest.mark.asyncio
    async def test_get_user_by_username(self):
        """Test retrieving user by username."""
        # Arrange
        created_user = await self.user_factory.create_user_in_db(
            self.session,
            email="byusername@example.com",
            username="byusernameuser"
        )
        username = Username("byusernameuser")
        
        # Act
        retrieved_user = await self.repository.get_by_username(username)
        
        # Assert
        assert retrieved_user is not None
        assert str(retrieved_user.username) == "byusernameuser"
        assert str(retrieved_user.id) == str(created_user.id)
    
    @pytest.mark.asyncio
    async def test_update_existing_user(self):
        """Test updating an existing user."""
        # Arrange
        created_user = await self.user_factory.create_user_in_db(
            self.session,
            email="update@example.com",
            username="updateuser",
            first_name="Original"
        )
        
        # Get user from repository
        user_id = UserId(str(created_user.id))
        user = await self.repository.get_by_id(user_id)
        
        # Modify user
        user.first_name = "Updated"
        user.last_name = "Name"
        
        # Act
        updated_user = await self.repository.save(user)
        
        # Assert
        assert updated_user.first_name == "Updated"
        assert updated_user.last_name == "Name"
        assert str(updated_user.id) == str(created_user.id)
        
        # Verify in database
        db_user = await self.repository.get_by_id(user_id)
        assert db_user.first_name == "Updated"
        assert db_user.last_name == "Name"
    
    @pytest.mark.asyncio
    async def test_delete_user(self):
        """Test deleting a user."""
        # Arrange
        created_user = await self.user_factory.create_user_in_db(
            self.session,
            email="delete@example.com",
            username="deleteuser"
        )
        user_id = UserId(str(created_user.id))
        
        # Act
        deleted = await self.repository.delete(user_id)
        
        # Assert
        assert deleted is True
        
        # Verify user is gone
        retrieved_user = await self.repository.get_by_id(user_id)
        assert retrieved_user is None
    
    @pytest.mark.asyncio
    async def test_delete_nonexistent_user(self):
        """Test deleting a non-existent user."""
        # Arrange
        fake_id = UserId(str(uuid.uuid4()))
        
        # Act
        deleted = await self.repository.delete(fake_id)
        
        # Assert
        assert deleted is False
    
    @pytest.mark.asyncio
    async def test_email_exists(self):
        """Test checking if email exists."""
        # Arrange
        await self.user_factory.create_user_in_db(
            self.session,
            email="exists@example.com",
            username="existsuser"
        )
        
        existing_email = Email("exists@example.com")
        nonexistent_email = Email("notexists@example.com")
        
        # Act
        exists = await self.repository.email_exists(existing_email)
        not_exists = await self.repository.email_exists(nonexistent_email)
        
        # Assert
        assert exists is True
        assert not_exists is False
    
    @pytest.mark.asyncio
    async def test_username_exists(self):
        """Test checking if username exists."""
        # Arrange
        await self.user_factory.create_user_in_db(
            self.session,
            email="userexists@example.com",
            username="existsusername"
        )
        
        existing_username = Username("existsusername")
        nonexistent_username = Username("notexistsusername")
        
        # Act
        exists = await self.repository.username_exists(existing_username)
        not_exists = await self.repository.username_exists(nonexistent_username)
        
        # Assert
        assert exists is True
        assert not_exists is False
    
    @pytest.mark.asyncio
    async def test_find_active_users(self):
        """Test finding active users with pagination."""
        # Arrange - create multiple users
        for i in range(5):
            await self.user_factory.create_user_in_db(
                self.session,
                email=f"active{i}@example.com",
                username=f"activeuser{i}",
                is_active=True
            )
        
        # Create an inactive user
        await self.user_factory.create_user_in_db(
            self.session,
            email="inactive@example.com",
            username="inactiveuser",
            is_active=False
        )
        
        # Act
        active_users = await self.repository.find_active_users(limit=3, offset=0)
        
        # Assert
        assert len(active_users) == 3
        for user in active_users:
            assert user.is_active is True
    
    @pytest.mark.asyncio
    async def test_find_by_subscription_status(self):
        """Test finding users by subscription status."""
        # Arrange
        await self.user_factory.create_user_in_db(
            self.session,
            email="free1@example.com",
            username="freeuser1",
            subscription_status="free"
        )
        await self.user_factory.create_user_in_db(
            self.session,
            email="premium@example.com",
            username="premiumuser",
            subscription_status="premium"
        )
        await self.user_factory.create_user_in_db(
            self.session,
            email="free2@example.com",
            username="freeuser2",
            subscription_status="free"
        )
        
        # Act
        free_users = await self.repository.find_by_subscription_status("free")
        premium_users = await self.repository.find_by_subscription_status("premium")
        
        # Assert
        assert len(free_users) == 2
        assert len(premium_users) == 1
        
        for user in free_users:
            assert user.subscription_status == "free"
        
        for user in premium_users:
            assert user.subscription_status == "premium"
    
    @pytest.mark.asyncio
    async def test_search_users(self):
        """Test searching users by various fields."""
        # Arrange
        await self.user_factory.create_user_in_db(
            self.session,
            email="john.doe@example.com",
            username="johndoe",
            first_name="John",
            last_name="Doe"
        )
        await self.user_factory.create_user_in_db(
            self.session,
            email="jane.smith@example.com",
            username="janesmith",
            first_name="Jane",
            last_name="Smith"
        )
        
        # Act - search by email
        email_results = await self.repository.search("john.doe", limit=10)
        
        # Act - search by username
        username_results = await self.repository.search("jane", limit=10)
        
        # Act - search by first name
        name_results = await self.repository.search("John", limit=10)
        
        # Assert
        assert len(email_results) == 1
        assert str(email_results[0].email) == "john.doe@example.com"
        
        assert len(username_results) == 1
        assert str(username_results[0].username) == "janesmith"
        
        assert len(name_results) == 1
        assert name_results[0].first_name == "John"


class TestUnitOfWork:
    """Test unit of work transaction management."""
    
    @pytest.mark.asyncio
    async def test_successful_transaction(self, test_unit_of_work, user_factory):
        """Test successful transaction commit."""
        # Arrange
        user = user_factory.create_user(
            email="transaction@example.com",
            username="transactionuser"
        )
        user.id = None
        
        # Act
        async with test_unit_of_work as uow:
            repository = SqlAlchemyUserRepository(uow.session)
            saved_user = await repository.save(user)
            # Transaction should commit automatically
        
        # Assert - create new UoW to verify persistence
        async with test_unit_of_work as uow:
            repository = SqlAlchemyUserRepository(uow.session)
            retrieved_user = await repository.get_by_email(Email("transaction@example.com"))
            assert retrieved_user is not None
    
    @pytest.mark.asyncio
    async def test_failed_transaction_rollback(self, test_unit_of_work, user_factory):
        """Test transaction rollback on exception."""
        # Arrange
        user = user_factory.create_user(
            email="rollback@example.com",
            username="rollbackuser"
        )
        user.id = None
        
        # Act & Assert
        try:
            async with test_unit_of_work as uow:
                repository = SqlAlchemyUserRepository(uow.session)
                await repository.save(user)
                # Force an exception to trigger rollback
                raise Exception("Test exception")
        except Exception:
            pass  # Expected
        
        # Verify rollback - user should not exist
        async with test_unit_of_work as uow:
            repository = SqlAlchemyUserRepository(uow.session)
            retrieved_user = await repository.get_by_email(Email("rollback@example.com"))
            assert retrieved_user is None
    
    @pytest.mark.asyncio
    async def test_manual_transaction_control(self, test_unit_of_work, user_factory):
        """Test manual transaction control."""
        # Arrange
        user = user_factory.create_user(
            email="manual@example.com",
            username="manualuser"
        )
        user.id = None
        
        # Act
        await test_unit_of_work.begin()
        try:
            repository = SqlAlchemyUserRepository(test_unit_of_work.session)
            await repository.save(user)
            await test_unit_of_work.commit()
        except Exception:
            await test_unit_of_work.rollback()
            raise
        finally:
            await test_unit_of_work.close()
        
        # Assert - verify user was saved
        async with test_unit_of_work as uow:
            repository = SqlAlchemyUserRepository(uow.session)
            retrieved_user = await repository.get_by_email(Email("manual@example.com"))
            assert retrieved_user is not None
