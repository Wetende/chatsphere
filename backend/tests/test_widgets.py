import pytest


@pytest.mark.api
async def test_update_widget_success(test_client, authenticated_headers):
    payload = {"avatar_url": "https://example.com/a.png", "color_theme": "#ff0000"}
    resp = await test_client.post("/api/v1/widgets/1", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["bot_id"] == 1
    assert data["message"] == "Widget settings updated"


@pytest.mark.api
async def test_preview_widget_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/widgets/preview/1", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["bot_id"] == 1

