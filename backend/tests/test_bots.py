import pytest


@pytest.mark.api
@pytest.mark.bot
async def test_list_bots_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/bots", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 1
    assert isinstance(data["bots"], list)


@pytest.mark.api
@pytest.mark.bot
async def test_get_bot_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/bots/1", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["bot_id"] == 1


@pytest.mark.api
@pytest.mark.bot
async def test_create_bot_success(test_client, authenticated_headers):
    payload = {
        "name": "New Bot",
        "description": "desc",
        "model_name": "gemini-pro",
        "temperature": 0.5,
        "is_public": False,
    }
    resp = await test_client.post("/api/v1/bots/0", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["bot_id"] == 2


@pytest.mark.api
@pytest.mark.bot
async def test_update_bot_success(test_client, authenticated_headers):
    payload = {"name": "Updated Bot", "description": "desc2", "model_name": "gemini-pro", "temperature": 0.9}
    resp = await test_client.post("/api/v1/bots/1", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["bot_id"] == 1


@pytest.mark.api
@pytest.mark.bot
async def test_delete_bot_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/bots/delete/1", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True


