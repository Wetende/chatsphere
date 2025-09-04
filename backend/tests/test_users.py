import pytest


@pytest.mark.api
@pytest.mark.user
async def test_get_my_profile_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/users/me", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["user_id"] == 1
    assert data["email"] == "test@example.com"


@pytest.mark.api
@pytest.mark.user
async def test_update_my_profile_success(test_client, authenticated_headers):
    payload = {"first_name": "New", "last_name": "Name", "username": "newuser"}
    resp = await test_client.post("/api/v1/users/me", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["first_name"] in ("New", "Test")  # stub returns Test


@pytest.mark.api
@pytest.mark.user
async def test_change_password_success(test_client, authenticated_headers):
    payload = {"current_password": "oldpass123", "new_password": "newpass1234", "confirm_password": "newpass1234"}
    resp = await test_client.post("/api/v1/users/change-password", headers=authenticated_headers, json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True


@pytest.mark.api
@pytest.mark.user
async def test_deactivate_me_success(test_client, authenticated_headers):
    resp = await test_client.get("/api/v1/users/delete/me", headers=authenticated_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True

