import pytest


@pytest.mark.api
@pytest.mark.auth
async def test_register_success(test_client, test_user_data):
    resp = await test_client.post("/api/v1/auth/register", json=test_user_data)
    assert resp.status_code == 201
    data = resp.json()
    assert data["success"] is True
    assert data["user_id"] == 123


@pytest.mark.api
@pytest.mark.auth
async def test_login_success(test_client):
    payload = {"email": "test@example.com", "password": "pass123456", "remember_me": True}
    resp = await test_client.post("/api/v1/auth/login", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert data["access_token"]
    assert data["user_id"] == 1


@pytest.mark.api
@pytest.mark.auth
async def test_forgot_password_success(test_client):
    resp = await test_client.post("/api/v1/auth/forgot-password", json={"email": "test@example.com"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True


@pytest.mark.api
@pytest.mark.auth
async def test_reset_password_success(test_client):
    resp = await test_client.post(
        "/api/v1/auth/reset-password",
        json={"reset_token": "abc", "new_password": "pass123456", "confirm_password": "pass123456"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True


@pytest.mark.api
@pytest.mark.auth
async def test_verify_email_success(test_client):
    resp = await test_client.get("/api/v1/auth/verify-email", params={"user_id": 1, "token": "xyz"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert data["already_verified"] is False


@pytest.mark.api
@pytest.mark.auth
async def test_resend_verification_success(test_client):
    resp = await test_client.post("/api/v1/auth/resend-verification", json={"email": "test@example.com"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True


