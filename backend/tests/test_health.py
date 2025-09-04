import pytest


@pytest.mark.api
async def test_root_endpoint(test_client):
    resp = await test_client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("message") == "Welcome to KyroChat API"
    assert data.get("health") == "/health"


@pytest.mark.api
async def test_health_endpoint(test_client):
    resp = await test_client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("status") == "healthy"


@pytest.mark.api
async def test_health_ready_endpoint(test_client):
    resp = await test_client.get("/health/ready")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("status") == "ready"


@pytest.mark.api
async def test_health_live_endpoint(test_client):
    resp = await test_client.get("/health/live")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("status") == "alive"


