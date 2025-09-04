import pytest


@pytest.mark.api
async def test_export_bot_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/bots/import-export/export/1", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["name"]
    assert "model_name" in data


@pytest.mark.api
async def test_import_bot_success(test_client, authenticated_headers):
    payload = {"name": "Imported", "description": "desc", "configuration": {"avatar_url": None}}
    resp = await test_client.post("/api/v1/bots/import-export/import/1", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["message"] == "Bot configuration imported"

