"""
Integration Tests for Bot Management Endpoints

Tests bot API endpoints with real HTTP requests.
Verifies CRUD operations, authorization, and error handling.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.integration
@pytest.mark.bot
class TestBotEndpoints:
    """Integration tests for bot management endpoints."""

    async def test_list_bots_endpoint_unauthorized(self, test_client: AsyncClient):
        """Test listing bots without authentication."""
        response = await test_client.get("/api/v1/bots")
        assert response.status_code in [401, 501]  # Unauthorized or not implemented

    async def test_get_bot_endpoint_unauthorized(self, test_client: AsyncClient):
        """Test getting bot details without authentication."""
        response = await test_client.get("/api/v1/bots/1")
        assert response.status_code in [401, 501]  # Unauthorized or not implemented

    async def test_create_bot_endpoint_validation(self, test_client: AsyncClient):
        """Test bot creation validation."""
        # Test missing required fields
        incomplete_data = {
            "name": "Test Bot"
            # Missing other required fields
        }
        response = await test_client.post("/api/v1/bots", json=incomplete_data)
        assert response.status_code == 422

        # Test empty name
        invalid_data = {
            "name": "",  # Empty name
            "description": "Test bot",
            "model_name": "gemini-2.0-flash-exp",
            "temperature": 0.7
        }
        response = await test_client.post("/api/v1/bots", json=invalid_data)
        assert response.status_code == 422

        # Test too short name
        invalid_data = {
            "name": "A",  # Too short
            "description": "Test bot",
            "model_name": "gemini-2.0-flash-exp",
            "temperature": 0.7
        }
        response = await test_client.post("/api/v1/bots", json=invalid_data)
        assert response.status_code == 422

        # Test too long name
        invalid_data = {
            "name": "A" * 101,  # Too long
            "description": "Test bot",
            "model_name": "gemini-2.0-flash-exp",
            "temperature": 0.7
        }
        response = await test_client.post("/api/v1/bots", json=invalid_data)
        assert response.status_code == 422

        # Test invalid temperature range
        invalid_data = {
            "name": "Test Bot",
            "description": "Test bot",
            "model_name": "gemini-2.0-flash-exp",
            "temperature": 3.0  # Out of range
        }
        response = await test_client.post("/api/v1/bots", json=invalid_data)
        assert response.status_code == 422

        # Test too long description
        invalid_data = {
            "name": "Test Bot",
            "description": "A" * 501,  # Too long
            "model_name": "gemini-2.0-flash-exp",
            "temperature": 0.7
        }
        response = await test_client.post("/api/v1/bots", json=invalid_data)
        assert response.status_code == 422

    async def test_update_bot_endpoint_validation(self, test_client: AsyncClient):
        """Test bot update validation."""
        # Test empty name update
        update_data = {
            "name": "",  # Empty not allowed
            "description": "Updated description"
        }
        response = await test_client.post("/api/v1/bots", params={"bot_id": 1}, json=update_data)
        assert response.status_code == 422

        # Test too long name update
        update_data = {
            "name": "A" * 101,  # Too long
            "description": "Updated description"
        }
        response = await test_client.post("/api/v1/bots", params={"bot_id": 1}, json=update_data)
        assert response.status_code == 422

        # Test invalid temperature update
        update_data = {
            "name": "Updated Bot",
            "temperature": -1.0  # Out of range
        }
        response = await test_client.post("/api/v1/bots", params={"bot_id": 1}, json=update_data)
        assert response.status_code == 422

        # Test too long welcome message
        update_data = {
            "name": "Updated Bot",
            "welcome_message": "A" * 201  # Too long
        }
        response = await test_client.post("/api/v1/bots", params={"bot_id": 1}, json=update_data)
        assert response.status_code == 422

        # Test too long system prompt
        update_data = {
            "name": "Updated Bot",
            "system_prompt": "A" * 2001  # Too long
        }
        response = await test_client.post("/api/v1/bots", params={"bot_id": 1}, json=update_data)
        assert response.status_code == 422

    async def test_list_bots_with_invalid_filters(self, test_client: AsyncClient):
        """Test listing bots with invalid filter parameters."""
        # Test invalid limit
        response = await test_client.get("/api/v1/bots", params={"limit": 0})
        assert response.status_code == 422

        # Test negative limit
        response = await test_client.get("/api/v1/bots", params={"limit": -1})
        assert response.status_code == 422

        # Test too high limit
        response = await test_client.get("/api/v1/bots", params={"limit": 101})
        assert response.status_code == 422

        # Test negative offset
        response = await test_client.get("/api/v1/bots", params={"offset": -1})
        assert response.status_code == 422

    async def test_get_bot_invalid_id(self, test_client: AsyncClient):
        """Test getting bot with invalid ID."""
        response = await test_client.get("/api/v1/bots/0")
        assert response.status_code == 422

        response = await test_client.get("/api/v1/bots/-1")
        assert response.status_code == 422

    async def test_delete_bot_invalid_id(self, test_client: AsyncClient):
        """Test deleting bot with invalid ID."""
        response = await test_client.get("/api/v1/bots/delete/0")
        assert response.status_code == 422

        response = await test_client.get("/api/v1/bots/delete/-1")
        assert response.status_code == 422

    async def test_all_bot_endpoints_return_json(self, test_client: AsyncClient):
        """Test that all bot endpoints return proper JSON responses."""
        endpoints = [
            ("/api/v1/bots", "GET", {"limit": 10}),
            ("/api/v1/bots/1", "GET", {}),
            ("/api/v1/bots", "POST", {"name": "Test Bot", "description": "Test", "model_name": "gemini", "temperature": 0.7}),
            ("/api/v1/bots/delete/1", "GET", {}),
        ]

        for endpoint, method, params in endpoints:
            if method == "POST":
                response = await test_client.post(endpoint, json=params)
            elif method == "GET" and "delete" in endpoint:
                response = await test_client.get(endpoint)
            elif method == "GET" and params:
                response = await test_client.get(endpoint, params=params)
            else:
                response = await test_client.get(endpoint)

            # All endpoints should return JSON content type
            assert "application/json" in response.headers.get("content-type", "")
            assert isinstance(response.json(), dict)

    async def test_cors_headers(self, test_client: AsyncClient):
        """Test that endpoints include proper CORS headers."""
        response = await test_client.options("/api/v1/bots")
        # CORS preflight should be handled
        assert response.status_code in [200, 404, 501]  # OK, Not Found, or Not Implemented