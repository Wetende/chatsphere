import pytest


@pytest.mark.api
async def test_get_bot_analytics_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/analytics/bot/1", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["bot_id"] == 1


@pytest.mark.api
async def test_get_user_overview_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/analytics/overview?days=7", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["user_id"] == 1

