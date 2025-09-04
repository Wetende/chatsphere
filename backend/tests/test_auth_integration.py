"""
Authentication Integration Tests

Tests the complete authentication flow including:
- User registration and password hashing
- Login with JWT token generation
- Token validation and refresh
- Repository operations
- Use case orchestration
"""

import pytest
import pytest_asyncio
from datetime import datetime, timezone

from application.use_cases.user.authenticate_user_use_case import (
    AuthenticateUserRequest,
    AuthenticateUserResponse
)
from application.exceptions.application_exceptions import (
    AuthenticationFailedException,
    ValidationException
)
from domain.value_objects.email import Email
from domain.value_objects.username import Username


class TestAuthenticationFlow:
    """Test complete authentication flow."""
    
    @pytest_asyncio.fixture(autouse=True)
    async def setup(self, test_session, user_factory, password_service):
        """Setup test data."""
        self.session = test_session
        self.user_factory = user_factory
        self.password_service = password_service
        
        # Create test user with hashed password
        self.test_password = "SecurePassword123!"
        self.hashed_password = await self.password_service.hash_password(self.test_password)
        
        self.test_user = await self.user_factory.create_user_in_db(
            self.session,
            email="auth@example.com",
            username="authuser",
            password_hash=self.hashed_password,
            is_active=True,
            is_verified=True
        )
    
    @pytest.mark.asyncio
    async def test_successful_authentication(self, authenticate_user_use_case):
        """Test successful user authentication."""
        # Arrange
        request = AuthenticateUserRequest(
            email="auth@example.com",
            password=self.test_password,
            remember_me=False
        )
        
        # Act
        response = await authenticate_user_use_case.execute(request)
        
        # Assert
        assert response.success is True
        assert response.access_token is not None
        assert response.refresh_token is not None
        assert str(response.user_id) == str(self.test_user.id)
        assert response.expires_at is not None
        assert "successful" in response.message.lower()
    
    @pytest.mark.asyncio
    async def test_invalid_email_authentication(self, authenticate_user_use_case):
        """Test authentication with invalid email."""
        # Arrange
        request = AuthenticateUserRequest(
            email="nonexistent@example.com",
            password=self.test_password,
            remember_me=False
        )
        
        # Act & Assert
        with pytest.raises(AuthenticationFailedException) as exc_info:
            await authenticate_user_use_case.execute(request)
        
        assert "Invalid email or password" in str(exc_info.value)
    
    @pytest.mark.asyncio
    async def test_invalid_password_authentication(self, authenticate_user_use_case):
        """Test authentication with invalid password."""
        # Arrange
        request = AuthenticateUserRequest(
            email="auth@example.com",
            password="WrongPassword123!",
            remember_me=False
        )
        
        # Act & Assert
        with pytest.raises(AuthenticationFailedException) as exc_info:
            await authenticate_user_use_case.execute(request)
        
        assert "Invalid email or password" in str(exc_info.value)
    
    @pytest.mark.asyncio
    async def test_inactive_user_authentication(self, authenticate_user_use_case):
        """Test authentication with inactive user."""
        # Arrange - create inactive user
        inactive_user = await self.user_factory.create_user_in_db(
            self.session,
            email="inactive@example.com",
            username="inactiveuser",
            password_hash=self.hashed_password,
            is_active=False,
            is_verified=True
        )
        
        request = AuthenticateUserRequest(
            email="inactive@example.com",
            password=self.test_password,
            remember_me=False
        )
        
        # Act & Assert
        with pytest.raises(AuthenticationFailedException) as exc_info:
            await authenticate_user_use_case.execute(request)
        
        assert "disabled" in str(exc_info.value).lower()
    
    @pytest.mark.asyncio
    async def test_unverified_user_authentication(self, authenticate_user_use_case):
        """Test authentication with unverified user."""
        # Arrange - create unverified user
        unverified_user = await self.user_factory.create_user_in_db(
            self.session,
            email="unverified@example.com",
            username="unverifieduser",
            password_hash=self.hashed_password,
            is_active=True,
            is_verified=False
        )
        
        request = AuthenticateUserRequest(
            email="unverified@example.com",
            password=self.test_password,
            remember_me=False
        )
        
        # Act & Assert
        with pytest.raises(AuthenticationFailedException) as exc_info:
            await authenticate_user_use_case.execute(request)
        
        assert "verify" in str(exc_info.value).lower()
    
    @pytest.mark.asyncio
    async def test_empty_credentials_validation(self, authenticate_user_use_case):
        """Test validation with empty credentials."""
        # Arrange
        request = AuthenticateUserRequest(
            email="",
            password="",
            remember_me=False
        )
        
        # Act & Assert
        with pytest.raises(ValidationException) as exc_info:
            await authenticate_user_use_case.execute(request)
        
        assert "required" in str(exc_info.value).lower()
    
    @pytest.mark.asyncio
    async def test_invalid_email_format_validation(self, authenticate_user_use_case):
        """Test validation with invalid email format."""
        # Arrange
        request = AuthenticateUserRequest(
            email="invalid-email",
            password=self.test_password,
            remember_me=False
        )
        
        # Act & Assert
        with pytest.raises(ValidationException) as exc_info:
            await authenticate_user_use_case.execute(request)
        
        assert "email format" in str(exc_info.value).lower()


class TestJWTTokenFlow:
    """Test JWT token generation and validation."""
    
    @pytest.mark.asyncio
    async def test_jwt_token_generation(self, auth_service):
        """Test JWT token generation."""
        # Arrange
        user_id = "550e8400-e29b-41d4-a716-446655440000"
        email = "test@example.com"
        
        # Act
        access_token = auth_service.generate_access_token(user_id, email)
        refresh_token = auth_service.generate_refresh_token(user_id)
        
        # Assert
        assert access_token is not None
        assert refresh_token is not None
        assert isinstance(access_token, str)
        assert isinstance(refresh_token, str)
    
    @pytest.mark.asyncio
    async def test_jwt_token_validation(self, auth_service):
        """Test JWT token validation."""
        # Arrange
        user_id = "550e8400-e29b-41d4-a716-446655440000"
        email = "test@example.com"
        access_token = auth_service.generate_access_token(user_id, email)
        
        # Act
        payload = auth_service.validate_token(access_token, "access")
        
        # Assert
        assert payload["sub"] == user_id
        assert payload["email"] == email
        assert payload["type"] == "access"
    
    @pytest.mark.asyncio
    async def test_jwt_token_refresh(self, auth_service):
        """Test JWT token refresh flow."""
        # Arrange
        user_id = "550e8400-e29b-41d4-a716-446655440000"
        refresh_token = auth_service.generate_refresh_token(user_id)
        
        # Act
        new_access_token = auth_service.refresh_access_token(refresh_token)
        
        # Assert
        assert new_access_token is not None
        payload = auth_service.validate_token(new_access_token, "access")
        assert payload["sub"] == user_id
    
    @pytest.mark.asyncio
    async def test_jwt_token_expiration_check(self, auth_service):
        """Test JWT token expiration checking."""
        # Arrange
        user_id = "550e8400-e29b-41d4-a716-446655440000"
        email = "test@example.com"
        access_token = auth_service.generate_access_token(user_id, email)
        
        # Act
        is_expired = auth_service.is_token_expired(access_token)
        expiration = auth_service.get_token_expiration(access_token)
        
        # Assert
        assert is_expired is False
        assert expiration is not None
        assert expiration > datetime.now(timezone.utc)


class TestPasswordService:
    """Test password hashing and verification."""
    
    @pytest.mark.asyncio
    async def test_password_hashing(self, password_service):
        """Test password hashing."""
        # Arrange
        password = "SecurePassword123!"
        
        # Act
        hashed = await password_service.hash_password(password)
        
        # Assert
        assert hashed is not None
        assert hashed != password
        assert len(hashed) > 50  # Bcrypt hashes are typically 60 chars
    
    @pytest.mark.asyncio
    async def test_password_verification(self, password_service):
        """Test password verification."""
        # Arrange
        password = "SecurePassword123!"
        hashed = await password_service.hash_password(password)
        
        # Act
        is_valid = await password_service.verify_password(password, hashed)
        is_invalid = await password_service.verify_password("WrongPassword", hashed)
        
        # Assert
        assert is_valid is True
        assert is_invalid is False
    
    def test_password_strength_validation(self, password_service):
        """Test password strength validation."""
        # Test valid passwords
        valid_passwords = [
            "SecurePass123!",
            "AnotherGood1@",
            "ComplexPassword99#"
        ]
        
        for password in valid_passwords:
            is_valid, error = password_service.validate_password_strength(password)
            assert is_valid is True, f"Password {password} should be valid"
            assert error is None
        
        # Test invalid passwords
        invalid_passwords = [
            ("short", "8 characters"),
            ("nouppercase123!", "uppercase"),
            ("NOLOWERCASE123!", "lowercase"),
            ("NoDigitsHere!", "digit"),
            ("NoSpecialChars123", "special"),
            ("password123!", "common")
        ]
        
        for password, expected_error in invalid_passwords:
            is_valid, error = password_service.validate_password_strength(password)
            assert is_valid is False, f"Password {password} should be invalid"
            assert expected_error.lower() in error.lower()
    
    def test_secure_password_generation(self, password_service):
        """Test secure password generation."""
        # Act
        password = password_service.generate_secure_password(12)
        
        # Assert
        assert len(password) == 12
        
        # Validate generated password meets strength requirements
        is_valid, error = password_service.validate_password_strength(password)
        assert is_valid is True, f"Generated password should be valid: {error}"
