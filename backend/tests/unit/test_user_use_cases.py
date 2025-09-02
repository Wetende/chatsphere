"""
Unit Tests for User Use Cases

Tests user management use cases in isolation using mocks.
Verifies business logic and error handling without database dependencies.
"""

import pytest
from unittest.mock import AsyncMock, Mock
from datetime import datetime

from application.use_cases.user.create_user_use_case import CreateUserUseCase
from application.use_cases.user.update_user_profile_use_case import (
    UpdateUserProfileUseCase,
    UpdateUserProfileRequest
)
from application.use_cases.user.change_password_use_case import (
    ChangePasswordUseCase,
    ChangePasswordRequest
)
from application.dtos.user_dtos import CreateUserRequestDTO, CreateUserResponseDTO
from application.exceptions.application_exceptions import (
    UserAlreadyExistsException,
    ValidationException,
    UserNotFoundException
)
from domain.entities.user import User
from domain.value_objects.user_id import UserId
from domain.value_objects.email import Email
from domain.value_objects.username import Username


@pytest.mark.unit
class TestCreateUserUseCase:
    """Test cases for CreateUserUseCase."""

    def setup_method(self):
        """Set up test dependencies."""
        self.mock_user_repository = AsyncMock()
        self.mock_email_service = AsyncMock()
        self.mock_password_service = AsyncMock()
        self.mock_unit_of_work = AsyncMock()
        
        self.use_case = CreateUserUseCase(
            user_repository=self.mock_user_repository,
            email_service=self.mock_email_service,
            password_service=self.mock_password_service,
            unit_of_work=self.mock_unit_of_work
        )
    
    @pytest.mark.asyncio
    async def test_create_user_success(self):
        """Test successful user creation."""
        # Arrange
        request = CreateUserRequestDTO(
            email="test@example.com",
            username="testuser",
            password="testpassword123",
            first_name="Test",
            last_name="User"
        )
        
        # Mock repository responses
        self.mock_user_repository.email_exists.return_value = False
        self.mock_user_repository.username_exists.return_value = False
        self.mock_password_service.hash_password.return_value = "hashed_password"
        
        # Mock user creation
        created_user = User(
            id=UserId(1),
            email=Email("test@example.com"),
            username=Username("testuser"),
            first_name="Test",
            last_name="User",
            is_verified=False
        )
        self.mock_user_repository.save.return_value = created_user
        
        # Mock email service
        self.mock_email_service.send_verification_email.return_value = True
        
        # Act
        result = await self.use_case.execute(request)
        
        # Assert
        assert isinstance(result, CreateUserResponseDTO)
        assert result.user_id == 1
        assert result.email == "test@example.com"
        assert result.username == "testuser"
        assert not result.is_verified
        
        # Verify repository calls
        self.mock_user_repository.email_exists.assert_called_once()
        self.mock_user_repository.username_exists.assert_called_once()
        self.mock_user_repository.save.assert_called_once()
        self.mock_unit_of_work.commit.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_create_user_email_exists(self):
        """Test user creation with existing email."""
        # Arrange
        request = CreateUserRequestDTO(
            email="existing@example.com",
            username="testuser",
            password="testpassword123",
            first_name="Test",
            last_name="User"
        )
        
        self.mock_user_repository.email_exists.return_value = True
        
        # Act & Assert
        with pytest.raises(UserAlreadyExistsException):
            await self.use_case.execute(request)
    
    @pytest.mark.asyncio
    async def test_create_user_username_exists(self):
        """Test user creation with existing username."""
        # Arrange
        request = CreateUserRequestDTO(
            email="test@example.com",
            username="existinguser",
            password="testpassword123",
            first_name="Test",
            last_name="User"
        )
        
        self.mock_user_repository.email_exists.return_value = False
        self.mock_user_repository.username_exists.return_value = True
        
        # Act & Assert
        with pytest.raises(UserAlreadyExistsException):
            await self.use_case.execute(request)


@pytest.mark.unit
class TestUpdateUserProfileUseCase:
    """Test cases for UpdateUserProfileUseCase."""
    
    def setup_method(self):
        """Set up test dependencies."""
        self.mock_user_repository = AsyncMock()
        self.mock_unit_of_work = AsyncMock()
        
        self.use_case = UpdateUserProfileUseCase(
            user_repository=self.mock_user_repository,
            unit_of_work=self.mock_unit_of_work
        )
    
    @pytest.mark.asyncio
    async def test_update_profile_success(self):
        """Test successful profile update."""
        # Arrange
        request = UpdateUserProfileRequest(
            user_id=1,
            requesting_user_id=1,
            first_name="Updated",
            last_name="Name"
        )
        
        # Mock existing user
        existing_user = User(
            id=UserId(1),
            email=Email("test@example.com"),
            username=Username("testuser"),
            first_name="Test",
            last_name="User",
            is_active=True
        )
        self.mock_user_repository.get_by_id.return_value = existing_user
        self.mock_user_repository.update.return_value = existing_user
        
        # Act
        result = await self.use_case.execute(request)
        
        # Assert
        assert result.user_id == 1
        assert result.first_name == "Updated"
        assert result.last_name == "Name"
        
        # Verify repository calls
        self.mock_user_repository.get_by_id.assert_called_once()
        self.mock_user_repository.update.assert_called_once()
        self.mock_unit_of_work.commit.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_update_profile_unauthorized(self):
        """Test profile update with unauthorized access."""
        # Arrange
        request = UpdateUserProfileRequest(
            user_id=1,
            requesting_user_id=2,  # Different user
            first_name="Updated",
            last_name="Name"
        )
        
        # Act & Assert
        with pytest.raises(Exception):  # Would be AuthorizationException in real implementation
            await self.use_case.execute(request)


@pytest.mark.unit
class TestChangePasswordUseCase:
    """Test cases for ChangePasswordUseCase."""
    
    def setup_method(self):
        """Set up test dependencies."""
        self.mock_user_repository = AsyncMock()
        self.mock_password_service = AsyncMock()
        self.mock_unit_of_work = AsyncMock()
        
        self.use_case = ChangePasswordUseCase(
            user_repository=self.mock_user_repository,
            password_service=self.mock_password_service,
            unit_of_work=self.mock_unit_of_work
        )
    
    @pytest.mark.asyncio
    async def test_change_password_success(self):
        """Test successful password change."""
        # Arrange
        request = ChangePasswordRequest(
            user_id=1,
            requesting_user_id=1,
            current_password="oldpassword",
            new_password="newpassword123",
            confirm_password="newpassword123"
        )
        
        # Mock existing user
        existing_user = User(
            id=UserId(1),
            email=Email("test@example.com"),
            username=Username("testuser"),
            password_hash="old_hashed_password",
            is_active=True
        )
        self.mock_user_repository.get_by_id.return_value = existing_user
        
        # Mock password service
        self.mock_password_service.verify_password.side_effect = [True, False]  # First call returns True (current password valid), second returns False (new password different)
        self.mock_password_service.hash_password.return_value = "new_hashed_password"
        
        # Act
        result = await self.use_case.execute(request)
        
        # Assert
        assert result.success is True
        assert "successfully" in result.message
        
        # Verify password service calls - verify_password is called twice (current password + check if new is same)
        assert self.mock_password_service.verify_password.call_count == 2
        self.mock_password_service.hash_password.assert_called_once()
        self.mock_user_repository.update.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_change_password_incorrect_current(self):
        """Test password change with incorrect current password."""
        # Arrange
        request = ChangePasswordRequest(
            user_id=1,
            requesting_user_id=1,
            current_password="wrongpassword",
            new_password="newpassword123",
            confirm_password="newpassword123"
        )
        
        existing_user = User(
            id=UserId(1),
            email=Email("test@example.com"),
            username=Username("testuser"),
            password_hash="old_hashed_password",
            is_active=True
        )
        self.mock_user_repository.get_by_id.return_value = existing_user
        
        # Mock incorrect password
        self.mock_password_service.verify_password.return_value = False
        
        # Act & Assert
        with pytest.raises(ValidationException):
            await self.use_case.execute(request)
    
    @pytest.mark.asyncio
    async def test_change_password_mismatch(self):
        """Test password change with password confirmation mismatch."""
        # Arrange
        request = ChangePasswordRequest(
            user_id=1,
            requesting_user_id=1,
            current_password="oldpassword",
            new_password="newpassword123",
            confirm_password="differentpassword"
        )
        
        # Act & Assert
        with pytest.raises(ValidationException):
            await self.use_case.execute(request)
