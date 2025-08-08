from fastapi.testclient import TestClient
from main import app

def test_root():
    client = TestClient(app)
    r = client.get("/")
    assert r.status_code == 200
    assert "message" in r.json()

def test_health():
    client = TestClient(app)
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json().get("status") == "healthy"
