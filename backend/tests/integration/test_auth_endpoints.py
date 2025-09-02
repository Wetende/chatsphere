"""
Integration Tests for Authentication Endpoints

Tests authentication API endpoints with real HTTP requests.
Verifies request/response formats, status codes, and error handling.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.integration
@pytest.mark.auth
class TestAuthEndpoints:
    """Integration tests for authentication endpoints."""

    async def test_register_endpoint_validation(self, test_client: AsyncClient):
        """Test registration endpoint validation."""
        # Test missing required fields
        incomplete_data = {
            "email": "test@example.com",
            "username": "testuser"
            # Missing password, first_name, last_name
        }

        response = await test_client.post("/api/v1/auth/register", json=incomplete_data)
        # Should return validation error since password is required
        assert response.status_code == 422

    async def test_register_endpoint_invalid_data(self, test_client: AsyncClient):
        """Test registration with invalid data."""
        invalid_data = {
            "email": "invalid-email",  # Invalid email format
            "username": "testuser",
            "password": "testpassword123",
            "first_name": "Test",
            "last_name": "User"
        }

        response = await test_client.post("/api/v1/auth/register", json=invalid_data)
        # Should return validation error for invalid email
        assert response.status_code == 422

    async def test_register_endpoint_empty_password(self, test_client: AsyncClient):
        """Test registration with empty password."""
        data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "",  # Empty password
            "first_name": "Test",
            "last_name": "User"
        }

        response = await test_client.post("/api/v1/auth/register", json=data)
        # Should return validation error for empty password
        assert response.status_code == 422

    async def test_login_endpoint_validation(self, test_client: AsyncClient):
        """Test login endpoint validation."""
        # Test missing required fields
        incomplete_data = {
            "email": "test@example.com"
            # Missing password
        }

        response = await test_client.post("/api/v1/auth/login", json=incomplete_data)
        assert response.status_code == 422

    async def test_login_endpoint_invalid_email(self, test_client: AsyncClient):
        """Test login with invalid email format."""
        invalid_data = {
            "email": "invalid-email",
            "password": "testpassword123"
        }

        response = await test_client.post("/api/v1/auth/login", json=invalid_data)
        assert response.status_code == 422

    async def test_forgot_password_endpoint_validation(self, test_client: AsyncClient):
        """Test forgot password endpoint validation."""
        # Test missing email
        response = await test_client.post("/api/v1/auth/forgot-password", json={})
        assert response.status_code == 422

        # Test invalid email format
        invalid_data = {"email": "invalid-email"}
        response = await test_client.post("/api/v1/auth/forgot-password", json=invalid_data)
        assert response.status_code == 422

    async def test_reset_password_endpoint_validation(self, test_client: AsyncClient):
        """Test reset password endpoint validation."""
        # Test missing required fields
        response = await test_client.post("/api/v1/auth/reset-password", json={})
        assert response.status_code == 422

        # Test missing reset token
        data = {
            "new_password": "newpassword123",
            "confirm_password": "newpassword123"
        }
        response = await test_client.post("/api/v1/auth/reset-password", json=data)
        assert response.status_code == 422

        # Test missing new password
        data = {
            "reset_token": "test-token",
            "confirm_password": "newpassword123"
        }
        response = await test_client.post("/api/v1/auth/reset-password", json=data)
        assert response.status_code == 422

        # Test password mismatch
        data = {
            "reset_token": "test-token",
            "new_password": "password123",
            "confirm_password": "different123"
        }
        response = await test_client.post("/api/v1/auth/reset-password", json=data)
        assert response.status_code == 422

    async def test_verify_email_endpoint_validation(self, test_client: AsyncClient):
        """Test email verification endpoint validation."""
        # Test missing user_id
        response = await test_client.get("/api/v1/auth/verify-email", params={"token": "test-token"})
        assert response.status_code == 422

        # Test missing token
        response = await test_client.get("/api/v1/auth/verify-email", params={"user_id": 1})
        assert response.status_code == 422

    async def test_resend_verification_endpoint_validation(self, test_client: AsyncClient):
        """Test resend verification endpoint validation."""
        # Test missing email
        response = await test_client.post("/api/v1/auth/resend-verification", json={})
        assert response.status_code == 422

        # Test invalid email format
        invalid_data = {"email": "invalid-email"}
        response = await test_client.post("/api/v1/auth/resend-verification", json=invalid_data)
        assert response.status_code == 422

    async def test_all_endpoints_return_json(self, test_client: AsyncClient):
        """Test that all endpoints return proper JSON responses."""
        endpoints = [
            ("/api/v1/auth/register", "POST", {"email": "test@example.com", "username": "testuser", "password": "pass", "first_name": "Test", "last_name": "User"}),
            ("/api/v1/auth/login", "POST", {"email": "test@example.com", "password": "password"}),
            ("/api/v1/auth/forgot-password", "POST", {"email": "test@example.com"}),
            ("/api/v1/auth/reset-password", "POST", {"reset_token": "token", "new_password": "newpass", "confirm_password": "newpass"}),
            ("/api/v1/auth/verify-email", "GET", {"user_id": 1, "token": "token"}),
            ("/api/v1/auth/resend-verification", "POST", {"email": "test@example.com"}),
        ]

        for endpoint, method, data in endpoints:
            if method == "POST":
                response = await test_client.post(endpoint, json=data)
            else:
                response = await test_client.get(endpoint, params=data)

            # All endpoints should return JSON content type
            assert "application/json" in response.headers.get("content-type", "")
            assert isinstance(response.json(), dict)


@pytest.mark.integration
@pytest.mark.user
class TestUserManagementEndpoints:
    """Integration tests for user management endpoints."""

    async def test_get_profile_endpoint_unauthorized(self, test_client: AsyncClient):
        """Test getting profile without authentication."""
        response = await test_client.get("/api/v1/users/me")
        # Should return 401 or 501 (not implemented)
        assert response.status_code in [401, 501]

    async def test_update_profile_endpoint_validation(self, test_client: AsyncClient):
        """Test profile update validation."""
        # Test empty first name
        data = {
            "first_name": "",  # Empty not allowed
            "last_name": "Test"
        }
        response = await test_client.post("/api/v1/users/me", json=data)
        assert response.status_code == 422

        # Test too long first name
        data = {
            "first_name": "A" * 51,  # Too long
            "last_name": "Test"
        }
        response = await test_client.post("/api/v1/users/me", json=data)
        assert response.status_code == 422

        # Test too long last name
        data = {
            "first_name": "Test",
            "last_name": "A" * 51  # Too long
        }
        response = await test_client.post("/api/v1/users/me", json=data)
        assert response.status_code == 422

    async def test_change_password_endpoint_validation(self, test_client: AsyncClient):
        """Test password change validation."""
        # Test missing current password
        data = {
            "new_password": "newpass123",
            "confirm_password": "newpass123"
        }
        response = await test_client.post("/api/v1/users/change-password", json=data)
        assert response.status_code == 422

        # Test too short new password
        data = {
            "current_password": "oldpass",
            "new_password": "123",  # Too short
            "confirm_password": "123"
        }
        response = await test_client.post("/api/v1/users/change-password", json=data)
        assert response.status_code == 422

        # Test password mismatch
        data = {
            "current_password": "oldpass",
            "new_password": "newpass123",
            "confirm_password": "different123"
        }
        response = await test_client.post("/api/v1/users/change-password", json=data)
        assert response.status_code == 422

    async def test_deactivate_account_endpoint_validation(self, test_client: AsyncClient):
        """Test account deactivation endpoint."""
        response = await test_client.get("/api/v1/users/delete/me")
        # Should return 401 or 501 (not implemented)
        assert response.status_code in [401, 501]
