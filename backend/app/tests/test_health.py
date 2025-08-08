import os
import sys

# Use SQLite for tests to avoid requiring Postgres
os.environ["DATABASE_URL"] = "sqlite:////tmp/chatsphere_test.db"

# Ensure backend root is on sys.path for imports
BACKEND_ROOT = "/workspace/backend"
if BACKEND_ROOT not in sys.path:
    sys.path.insert(0, BACKEND_ROOT)

from fastapi.testclient import TestClient
from main import app


client = TestClient(app, base_url="http://localhost")


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data.get("status") == "healthy"
    assert data.get("service") == "chatsphere-backend"