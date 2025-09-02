"""
Simple test to verify pytest-asyncio setup.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_async_works():
    """Simple test to verify async testing works."""
    assert True


@pytest.mark.asyncio
async def test_simple_http_client():
    """Test basic HTTP client functionality."""
    # This is just to test if httpx works in async context
    assert AsyncClient is not None


@pytest.mark.asyncio
async def test_domain_entities():
    """Test that domain entities can be imported."""
    from domain.value_objects.email import Email
    from domain.value_objects.username import Username
    from domain.value_objects.user_id import UserId

    # Test value objects
    email = Email("test@example.com")
    username = Username("testuser")
    user_id = UserId(1)

    assert str(email) == "test@example.com"
    assert str(username) == "testuser"
    assert user_id.value == 1
