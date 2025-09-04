import pytest


@pytest.mark.api
@pytest.mark.conversation
async def test_create_conversation_success(test_client, authenticated_headers):
    payload = {"title": "Hello", "bot_id": 1}
    resp = await test_client.post("/api/v1/conversations/0", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == 10


@pytest.mark.api
@pytest.mark.conversation
async def test_update_conversation_success(test_client, authenticated_headers):
    payload = {"title": "Renamed", "bot_id": 1}
    resp = await test_client.post("/api/v1/conversations/10", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == 10


@pytest.mark.api
@pytest.mark.conversation
async def test_get_conversation_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/conversations/10", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == 10


@pytest.mark.api
@pytest.mark.conversation
async def test_list_conversations_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/conversations", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert data and data[0]["id"] == 10


@pytest.mark.api
@pytest.mark.conversation
async def test_delete_conversation_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/conversations/delete/10", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["deleted"] is True


