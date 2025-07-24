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
# tests/unit/models/test_bot.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.bot import Bot, Base
from app.core.database import get_db

@pytest.fixture
def session():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    return Session()

def test_bot_creation(session):
    bot = Bot(name="Test Bot", language="en")
    session.add(bot)
    session.commit()
    assert bot.name == "Test Bot"
    assert bot.language == "en"
    assert bot.is_active
```

### 2. Integration Testing

```python
# tests/integration/api/test_bot_api.py
import pytest
from fastapi.testclient import TestClient
from main import app

from app.core.database import get_db

client = TestClient(app)

@pytest.mark.asyncio
async def test_create_bot(override_get_db):
    response = client.post(
        "/api/v1/bots",
        json={"name": "Test Bot", "language": "en"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Test Bot"
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
