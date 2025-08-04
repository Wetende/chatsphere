# ChatSphere Testing Strategy

This document outlines the comprehensive testing strategy for the ChatSphere platform, ensuring reliability, performance, and security across all components.

## Testing Architecture

```
tests/
├── unit/                  # Unit tests
│   ├── models/           # Database model tests
│   ├── services/         # Service layer tests
│   └── utils/            # Utility function tests
├── integration/          # Integration tests
│   ├── api/             # API endpoint tests
│   ├── database/        # Database interaction tests
│   └── external/        # External service tests (DB)
├── e2e/                 # End-to-end tests
│   ├── flows/           # User flow tests
│   └── scenarios/       # Complex scenario tests
├── performance/         # Performance tests
│   ├── load/            # Load testing scripts
│   └── stress/          # Stress testing scripts
├── security/            # Security tests
└── ai/                  # AI/ML specific tests (in agent module)
```

## Test Categories

### 1. Unit Testing

```python
# tests/unit/models/test_bot.py - FastAPI + AsyncSQLAlchemy Testing
import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.models.bot import Bot, Base
from app.core.database import get_async_db
import uuid

@pytest_asyncio.fixture
async def async_session():
    engine = create_async_engine('sqlite+aiosqlite:///:memory:')
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession)
    async with AsyncSessionLocal() as session:
        yield session

@pytest.mark.asyncio
async def test_bot_creation(async_session):
    bot = Bot(
        name="Test Bot", 
        model_type="gemini-2.0-flash-exp",
        owner_id=str(uuid.uuid4())
    )
    async_session.add(bot)
    await async_session.commit()
    await async_session.refresh(bot)
    
    assert bot.name == "Test Bot"
    assert bot.model_type == "gemini-2.0-flash-exp"
    assert bot.is_active
    assert bot.status == "active"
```

### 2. Integration Testing

```python
# tests/integration/api/test_bot_api.py - FastAPI Async Testing
import pytest
import pytest_asyncio
from httpx import AsyncClient
from fastapi import status
from main import app
from app.core.database import get_async_db
from app.models.user import User
from app.core.auth import create_access_token

@pytest_asyncio.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

@pytest_asyncio.fixture
async def authenticated_user_token():
    # Create test user and return token
    user_id = "test-user-id"
    token = create_access_token(data={"sub": user_id})
    return token

@pytest.mark.asyncio
async def test_create_bot(async_client: AsyncClient, authenticated_user_token: str):
    headers = {"Authorization": f"Bearer {authenticated_user_token}"}
    response = await async_client.post(
        "/api/v1/bots",
        json={
            "name": "Test Bot", 
            "description": "A test chatbot",
            "model_type": "gemini-2.0-flash-exp",
            "temperature": 0.7
        },
        headers=headers
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["name"] == "Test Bot"
    assert data["model_type"] == "gemini-2.0-flash-exp"
    assert data["status"] == "active"

@pytest.mark.asyncio
async def test_get_bots_with_pagination(async_client: AsyncClient, authenticated_user_token: str):
    headers = {"Authorization": f"Bearer {authenticated_user_token}"}
    response = await async_client.get(
        "/api/v1/bots?skip=0&limit=10",
        headers=headers
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "bots" in data
    assert "total" in data
    assert "skip" in data
    assert "limit" in data
```

### 3. End-to-End Testing

```javascript
// tests/e2e/test_chatbot_creation.js
import { test, expect } from '@playwright/test';

test('chatbot creation flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-test=email]', 'test@example.com');
  await page.fill('[data-test=password]', 'password123');
  await page.click('[data-test=login-button]');
  await expect(page.locator('.dashboard')).toBeVisible();

  await page.click('[data-test=create-chatbot]');
  await page.fill('[data-test=chatbot-name]', 'Customer Service Bot');
  await page.selectOption('[data-test=language]', 'en');
  await page.setInputFiles('[data-test=file-upload]', 'test_data/sample.pdf');
  await page.waitForSelector('[data-test=processing-complete]', { timeout: 60000 });
  await expect(page.locator('[data-test=success-message]')).toBeVisible();
});
```

### 4. Performance Testing

```javascript
// tests/performance/message_load.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  let res = http.post('http://localhost:8000/api/messages', JSON.stringify({
    content: 'Test message',
    channel_id: 'test-channel'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 201': (r) => r.status === 201,
    'duration < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

## Test Execution

- **Unit & Integration Tests**: Run via `pytest`.
- **E2E Tests**: Run via `playwright test`.
- **Performance Tests**: Run via `k6 run`.
- **CI/CD**: Integrate into GitHub Actions.

## Mocking Dependencies

- **External APIs**: Use `respx` for httpx.
- **Databases**: Use test databases (SQLite for unit, test Postgres for integration).

```python
# Example mocking
@pytest.fixture
def mock_pinecone(monkeypatch):
    def mock_query(self, *args, **kwargs):
        return {'matches': [{'metadata': {'text': 'mock text'}}]}
    monkeypatch.setattr('pinecone.Index.query', mock_query)
```
