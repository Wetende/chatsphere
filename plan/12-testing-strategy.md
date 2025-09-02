# KyroChat Testing Strategy

This document outlines our comprehensive approach to testing and quality assurance for the KyroChat platform.

## Testing Framework

### 1. Unit Testing

```python
# tests/unit/test_message_service.py
import pytest
from unittest.mock import Mock, patch
from services.message import MessageService
from models.message import Message

class TestMessageService:
    @pytest.fixture
    def message_service(self):
        return MessageService()
    
    def test_create_message(self, message_service):
        # Arrange
        content = "Test message"
        user_id = "user123"
        channel_id = "channel456"
        
        # Act
        message = message_service.create_message(
            content=content,
            user_id=user_id,
            channel_id=channel_id
        )
        
        # Assert
        assert message.content == content
        assert message.user_id == user_id
        assert message.channel_id == channel_id
        assert message.id is not None
    
    @patch('services.message.NotificationService')
    def test_message_notifications(self, mock_notification):
        # Arrange
        message_service = MessageService()
        mock_notify = Mock()
        mock_notification.return_value.notify = mock_notify
        
        # Act
        message_service.send_message(
            content="Hello",
            user_id="user123",
            channel_id="channel456"
        )
        
        # Assert
        mock_notify.assert_called_once()

# tests/unit/test_user_service.py
import pytest
from services.user import UserService
from models.user import User

class TestUserService:
    @pytest.fixture
    def user_service(self):
        return UserService()
    
    def test_user_registration(self, user_service):
        # Arrange
        email = "test@example.com"
        password = "securepass123"
        
        # Act
        user = user_service.register(
            email=email,
            password=password
        )
        
        # Assert
        assert user.email == email
        assert user.password != password  # Should be hashed
        assert user.id is not None
    
    def test_user_authentication(self, user_service):
        # Arrange
        email = "test@example.com"
        password = "securepass123"
        user_service.register(email=email, password=password)
        
        # Act
        result = user_service.authenticate(email=email, password=password)
        
        # Assert
        assert result is not None
        assert result.email == email
```

### 2. Integration Testing

```python
# tests/integration/test_message_flow.py
import pytest
from fastapi.testclient import TestClient
from main import app
from services.message import MessageService
from services.user import UserService

class TestMessageFlow:
    @pytest.fixture
    def client(self):
        return TestClient(app)
    
    @pytest.fixture
    def auth_headers(self, client):
        # Login and get token
        response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "testpass123"
        })
        token = response.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_message_creation_flow(self, client, auth_headers):
        # Create channel
        channel_response = client.post(
            "/channels",
            json={"name": "test-channel"},
            headers=auth_headers
        )
        assert channel_response.status_code == 201
        channel_id = channel_response.json()["id"]
        
        # Send message
        message_response = client.post(
            f"/channels/{channel_id}/messages",
            json={"content": "Hello, world!"},
            headers=auth_headers
        )
        assert message_response.status_code == 201
        
        # Get channel messages
        messages_response = client.get(
            f"/channels/{channel_id}/messages",
            headers=auth_headers
        )
        assert messages_response.status_code == 200
        messages = messages_response.json()
        assert len(messages) == 1
        assert messages[0]["content"] == "Hello, world!"

# tests/integration/test_user_flow.py
import pytest
from fastapi.testclient import TestClient
from main import app

class TestUserFlow:
    @pytest.fixture
    def client(self):
        return TestClient(app)
    
    def test_user_registration_flow(self, client):
        # Register user
        register_response = client.post(
            "/auth/register",
            json={
                "email": "test@example.com",
                "password": "testpass123",
                "name": "Test User"
            }
        )
        assert register_response.status_code == 201
        
        # Login
        login_response = client.post(
            "/auth/login",
            json={
                "email": "test@example.com",
                "password": "testpass123"
            }
        )
        assert login_response.status_code == 200
        assert "token" in login_response.json()
        
        # Get profile
        token = login_response.json()["token"]
        profile_response = client.get(
            "/users/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert profile_response.status_code == 200
        assert profile_response.json()["email"] == "test@example.com"
```

### 3. End-to-End Testing

```python
# tests/e2e/test_chat_flow.py
from playwright.sync_api import Page, expect
import pytest

class TestChatFlow:
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        # Setup: Login user
        page.goto("/login")
        page.fill("input[name=email]", "test@example.com")
        page.fill("input[name=password]", "testpass123")
        page.click("button[type=submit]")
        
        # Wait for dashboard to load
        page.wait_for_selector(".dashboard")
    
    def test_send_message(self, page: Page):
        # Create new channel
        page.click("button.new-channel")
        page.fill("input[name=channel-name]", "test-channel")
        page.click("button.create-channel")
        
        # Send message
        page.fill("textarea.message-input", "Hello, world!")
        page.click("button.send-message")
        
        # Verify message appears
        message = page.wait_for_selector(".message-content")
        expect(message).to_have_text("Hello, world!")
    
    def test_message_reactions(self, page: Page):
        # Find message
        message = page.wait_for_selector(".message")
        
        # Add reaction
        message.hover()
        page.click(".reaction-button")
        page.click("[data-emoji='👍']")
        
        # Verify reaction appears
        reaction = page.wait_for_selector(".message-reaction")
        expect(reaction).to_have_text("👍 1")

# tests/e2e/test_user_settings.py
from playwright.sync_api import Page, expect
import pytest

class TestUserSettings:
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        # Setup: Login user
        page.goto("/login")
        page.fill("input[name=email]", "test@example.com")
        page.fill("input[name=password]", "testpass123")
        page.click("button[type=submit]")
        
        # Navigate to settings
        page.click("button.user-menu")
        page.click("a.settings-link")
    
    def test_update_profile(self, page: Page):
        # Update name
        page.fill("input[name=display-name]", "New Name")
        page.click("button.save-profile")
        
        # Verify success message
        success = page.wait_for_selector(".success-message")
        expect(success).to_be_visible()
        
        # Verify name updated in header
        username = page.wait_for_selector(".user-display-name")
        expect(username).to_have_text("New Name")
    
    def test_change_theme(self, page: Page):
        # Switch to dark theme
        page.click("button.theme-toggle")
        
        # Verify body has dark theme class
        body = page.wait_for_selector("body")
        expect(body).to_have_class("dark-theme")
```

### 4. Performance Testing

```python
# tests/performance/test_message_load.py
import asyncio
import aiohttp
import pytest
from statistics import mean, median
from typing import List, Dict

class TestMessagePerformance:
    @pytest.fixture
    async def session(self):
        async with aiohttp.ClientSession() as session:
            yield session
    
    async def send_message(self, 
                          session: aiohttp.ClientSession,
                          channel_id: str,
                          token: str) -> float:
        start_time = asyncio.get_event_loop().time()
        
        async with session.post(
            f"/api/channels/{channel_id}/messages",
            json={"content": "Test message"},
            headers={"Authorization": f"Bearer {token}"}
        ) as response:
            assert response.status == 201
        
        return asyncio.get_event_loop().time() - start_time
    
    async def test_message_throughput(self, session: aiohttp.ClientSession):
        # Setup
        channel_id = "test-channel"
        token = "test-token"
        num_messages = 1000
        
        # Send messages concurrently
        tasks = [
            self.send_message(session, channel_id, token)
            for _ in range(num_messages)
        ]
        
        response_times = await asyncio.gather(*tasks)
        
        # Analyze results
        avg_response_time = mean(response_times)
        med_response_time = median(response_times)
        throughput = num_messages / sum(response_times)
        
        # Assert performance requirements
        assert avg_response_time < 0.1  # 100ms average
        assert med_response_time < 0.05  # 50ms median
        assert throughput > 1000  # 1000 messages per second

# tests/performance/test_search_performance.py
import asyncio
import aiohttp
import pytest
from statistics import mean
from typing import List, Dict

class TestSearchPerformance:
    @pytest.fixture
    async def session(self):
        async with aiohttp.ClientSession() as session:
            yield session
    
    async def search_messages(self,
                            session: aiohttp.ClientSession,
                            query: str,
                            token: str) -> float:
        start_time = asyncio.get_event_loop().time()
        
        async with session.get(
            "/api/messages/search",
            params={"q": query},
            headers={"Authorization": f"Bearer {token}"}
        ) as response:
            assert response.status == 200
            results = await response.json()
        
        duration = asyncio.get_event_loop().time() - start_time
        return duration, len(results)
    
    async def test_search_performance(self, session: aiohttp.ClientSession):
        # Setup
        token = "test-token"
        queries = [
            "hello",
            "project",
            "meeting",
            "urgent",
            "question"
        ]
        
        # Run searches concurrently
        tasks = [
            self.search_messages(session, query, token)
            for query in queries
        ]
        
        results = await asyncio.gather(*tasks)
        durations = [r[0] for r in results]
        result_counts = [r[1] for r in results]
        
        # Analyze results
        avg_duration = mean(durations)
        avg_results = mean(result_counts)
        
        # Assert performance requirements
        assert avg_duration < 0.5  # 500ms average search time
        assert max(durations) < 1.0  # 1s maximum search time
```

## Test Automation

### 1. CI/CD Pipeline

```yaml
# .github/workflows/test.yml
name: KyroChat Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: kyrochat_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:6
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements/test.txt
    
    - name: Run unit tests
      run: |
        pytest tests/unit/
    
    - name: Run integration tests
      run: |
        pytest tests/integration/
    
    - name: Run E2E tests
      run: |
        npm install
        npm run build
        python -m http.server &
        playwright install
        pytest tests/e2e/
    
    - name: Run performance tests
      run: |
        pytest tests/performance/
    
    - name: Upload test results
      uses: actions/upload-artifact@v2
      with:
        name: test-results
        path: test-results/

# .github/workflows/coverage.yml
name: Coverage Report

on:
  push:
    branches: [main]

jobs:
  coverage:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements/test.txt
        pip install coverage
    
    - name: Generate coverage report
      run: |
        coverage run -m pytest
        coverage xml
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v2
      with:
        file: ./coverage.xml
        fail_ci_if_error: true
```

### 2. Test Data Management

```python
# tests/fixtures/data_generator.py
from typing import Dict, Any
import faker
import random
from datetime import datetime, timedelta

class TestDataGenerator:
    def __init__(self):
        self.fake = faker.Faker()
    
    def generate_user(self) -> Dict[str, Any]:
        return {
            "id": self.fake.uuid4(),
            "email": self.fake.email(),
            "name": self.fake.name(),
            "created_at": self.fake.date_time_this_year()
        }
    
    def generate_message(self, user_id: str, channel_id: str) -> Dict[str, Any]:
        return {
            "id": self.fake.uuid4(),
            "content": self.fake.text(max_nb_chars=200),
            "user_id": user_id,
            "channel_id": channel_id,
            "created_at": self.fake.date_time_this_month()
        }
    
    def generate_channel(self, creator_id: str) -> Dict[str, Any]:
        return {
            "id": self.fake.uuid4(),
            "name": self.fake.word(),
            "creator_id": creator_id,
            "created_at": self.fake.date_time_this_year()
        }
    
    def generate_test_dataset(self,
                            num_users: int = 10,
                            num_channels: int = 3,
                            messages_per_channel: int = 100) -> Dict[str, Any]:
        users = [self.generate_user() for _ in range(num_users)]
        
        channels = [
            self.generate_channel(
                creator_id=random.choice(users)["id"]
            )
            for _ in range(num_channels)
        ]
        
        messages = []
        for channel in channels:
            channel_messages = [
                self.generate_message(
                    user_id=random.choice(users)["id"],
                    channel_id=channel["id"]
                )
                for _ in range(messages_per_channel)
            ]
            messages.extend(channel_messages)
        
        return {
            "users": users,
            "channels": channels,
            "messages": messages
        }
```

## Quality Assurance

### 1. Code Quality Checks

```python
# scripts/quality/code_analyzer.py
import ast
import astroid
from typing import List, Dict, Any
from pylint.lint import Run
from mypy import api

class CodeQualityChecker:
    def check_code_quality(self, path: str) -> Dict[str, Any]:
        return {
            "lint_results": self._run_pylint(path),
            "type_check_results": self._run_mypy(path),
            "complexity_metrics": self._calculate_complexity(path)
        }
    
    def _run_pylint(self, path: str) -> Dict[str, Any]:
        results = Run([path], do_exit=False)
        return {
            "score": results.linter.stats["global_note"],
            "messages": results.linter.stats["by_msg"]
        }
    
    def _run_mypy(self, path: str) -> List[str]:
        result = api.run([path])
        return result[0].split("\n")
    
    def _calculate_complexity(self, path: str) -> Dict[str, Any]:
        with open(path) as f:
            tree = ast.parse(f.read())
        
        metrics = {
            "num_functions": len([
                node for node in ast.walk(tree)
                if isinstance(node, ast.FunctionDef)
            ]),
            "num_classes": len([
                node for node in ast.walk(tree)
                if isinstance(node, ast.ClassDef)
            ]),
            "max_depth": self._get_max_depth(tree)
        }
        
        return metrics
    
    def _get_max_depth(self, tree: ast.AST) -> int:
        max_depth = 0
        current_depth = 0
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.For, ast.While, ast.If)):
                current_depth += 1
                max_depth = max(max_depth, current_depth)
            else:
                current_depth = 0
        
        return max_depth
```

### 2. Test Coverage Analysis

```python
# scripts/quality/coverage_analyzer.py
from typing import Dict, Any
import coverage
import json
import os

class CoverageAnalyzer:
    def __init__(self):
        self.cov = coverage.Coverage()
    
    def analyze_coverage(self, 
                        source_dir: str,
                        test_dir: str) -> Dict[str, Any]:
        self.cov.start()
        
        # Run tests
        import pytest
        pytest.main([test_dir])
        
        self.cov.stop()
        self.cov.save()
        
        # Generate reports
        self.cov.html_report(directory="coverage_report")
        
        return {
            "total_coverage": self.cov.report(),
            "file_coverage": self._get_file_coverage(),
            "uncovered_lines": self._get_uncovered_lines()
        }
    
    def _get_file_coverage(self) -> Dict[str, float]:
        coverage_data = {}
        for filename in self.cov.get_data().measured_files():
            file_coverage = self.cov.analysis(filename)
            coverage_data[filename] = (
                len(file_coverage[0]) /
                (len(file_coverage[0]) + len(file_coverage[1])) * 100
            )
        return coverage_data
    
    def _get_uncovered_lines(self) -> Dict[str, List[int]]:
        uncovered = {}
        for filename in self.cov.get_data().measured_files():
            file_coverage = self.cov.analysis(filename)
            if file_coverage[1]:  # Missing lines
                uncovered[filename] = file_coverage[1]
        return uncovered
```

## Next Steps

For details on how we'll handle documentation and knowledge sharing across the platform, refer to the [Documentation Strategy](./13-documentation-strategy.md) document. 