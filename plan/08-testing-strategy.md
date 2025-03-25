# ChatSphere Testing Strategy

This document outlines the comprehensive testing strategy for the ChatSphere platform, ensuring reliability, performance, and security across all components.

## Testing Architecture

### Overview

```
tests/
├── unit/                  # Unit tests
│   ├── models/           # Database model tests
│   ├── services/         # Service layer tests
│   └── utils/            # Utility function tests
├── integration/          # Integration tests
│   ├── api/             # API endpoint tests
│   ├── database/        # Database interaction tests
│   └── external/        # External service tests
├── e2e/                 # End-to-end tests
│   ├── flows/           # User flow tests
│   └── scenarios/       # Complex scenario tests
├── performance/         # Performance tests
│   ├── load/            # Load testing scripts
│   └── stress/          # Stress testing scripts
├── security/            # Security tests
└── ai/                  # AI/ML specific tests
```

## Test Categories

### 1. Unit Testing

```python
# tests/unit/models/test_chatbot.py
import pytest
from django.test import TestCase
from apps.chatbots.models import Chatbot, TrainingSource
from apps.users.models import User

class TestChatbotModel(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email="test@example.com",
            subscription_tier="basic"
        )
        
    def test_chatbot_creation(self):
        chatbot = Chatbot.objects.create(
            user=self.user,
            name="Test Bot",
            language="en"
        )
        self.assertEqual(chatbot.name, "Test Bot")
        self.assertEqual(chatbot.language, "en")
        self.assertTrue(chatbot.is_active)
        
    def test_unique_name_constraint(self):
        Chatbot.objects.create(
            user=self.user,
            name="Test Bot"
        )
        with self.assertRaises(Exception):
            Chatbot.objects.create(
                user=self.user,
                name="Test Bot"
            )

# tests/unit/services/test_embedding.py
import pytest
import numpy as np
from services.ai.embeddings import EmbeddingGenerator

class TestEmbeddingGenerator:
    @pytest.fixture
    def embedding_generator(self):
        return EmbeddingGenerator()
    
    def test_create_embeddings(self, embedding_generator):
        text = "Test content for embedding"
        result = embedding_generator.create_embeddings([text])
        
        assert len(result) == 1
        assert isinstance(result[0], np.ndarray)
        assert result[0].shape == (1536,)  # OpenAI embedding size
```

### 2. Integration Testing

```python
# tests/integration/api/test_chatbot_api.py
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from apps.chatbots.models import Chatbot

@pytest.mark.django_db
class TestChatbotAPI:
    @pytest.fixture
    def api_client(self):
        return APIClient()
    
    @pytest.fixture
    def authenticated_client(self, api_client, user):
        api_client.force_authenticate(user=user)
        return api_client
    
    def test_create_chatbot(self, authenticated_client):
        url = reverse('chatbot-list')
        data = {
            'name': 'Test Bot',
            'language': 'en',
            'model_config': {'temperature': 0.7}
        }
        
        response = authenticated_client.post(url, data, format='json')
        assert response.status_code == 201
        assert response.data['name'] == 'Test Bot'
        
    def test_list_user_chatbots(self, authenticated_client, user):
        Chatbot.objects.create(user=user, name='Bot 1')
        Chatbot.objects.create(user=user, name='Bot 2')
        
        url = reverse('chatbot-list')
        response = authenticated_client.get(url)
        
        assert response.status_code == 200
        assert len(response.data) == 2

# tests/integration/database/test_vector_store.py
import pytest
from services.vector_store import PineconeClient
from services.ai.embeddings import EmbeddingGenerator

class TestVectorStore:
    @pytest.fixture
    def vector_store(self):
        return PineconeClient()
    
    @pytest.fixture
    def embedding_generator(self):
        return EmbeddingGenerator()
    
    async def test_store_and_query(self, vector_store, embedding_generator):
        # Test data
        text = "Test content for vector store"
        chatbot_id = "test_bot_123"
        
        # Generate and store embedding
        embedding = await embedding_generator.create_embeddings([text])
        await vector_store.upsert_vectors(
            vectors=[embedding],
            metadata=[{
                'chatbot_id': chatbot_id,
                'content': text
            }],
            namespace='test'
        )
        
        # Query the vector store
        results = await vector_store.query_vectors(
            query_vector=embedding,
            namespace='test',
            top_k=1
        )
        
        assert len(results) == 1
        assert results[0]['metadata']['content'] == text
```

### 3. End-to-End Testing

```python
# tests/e2e/flows/test_chatbot_creation.py
import pytest
from playwright.sync_api import Page, expect

class TestChatbotCreation:
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        self.page = page
        
    def test_complete_chatbot_creation_flow(self):
        # Login
        self.page.goto("/login")
        self.page.fill("[data-test=email]", "test@example.com")
        self.page.fill("[data-test=password]", "password123")
        self.page.click("[data-test=login-button]")
        
        # Navigate to chatbot creation
        self.page.click("[data-test=create-chatbot]")
        
        # Fill chatbot details
        self.page.fill("[data-test=chatbot-name]", "Customer Service Bot")
        self.page.select_option("[data-test=language]", "en")
        
        # Upload training data
        self.page.set_input_files(
            "[data-test=file-upload]",
            "test_data/sample.pdf"
        )
        
        # Wait for processing
        self.page.wait_for_selector("[data-test=processing-complete]")
        
        # Verify creation
        expect(self.page.locator("[data-test=success-message]")).to_be_visible()
        expect(self.page.locator("[data-test=chatbot-name]")).to_have_text(
            "Customer Service Bot"
        )

# tests/e2e/scenarios/test_chat_interaction.py
from playwright.sync_api import Page, expect

class TestChatInteraction:
    def test_chat_conversation_flow(self, page: Page):
        # Navigate to chat interface
        page.goto("/chat/customer-service-bot")
        
        # Send message
        page.fill("[data-test=chat-input]", "How do I reset my password?")
        page.click("[data-test=send-button]")
        
        # Wait for response
        response = page.wait_for_selector("[data-test=bot-response]")
        
        # Verify response contains relevant information
        expect(response).to_contain_text("password reset")
        
        # Test follow-up question
        page.fill("[data-test=chat-input]", "Where do I find the reset link?")
        page.click("[data-test=send-button]")
        
        # Verify context awareness
        response = page.wait_for_selector("[data-test=bot-response]")
        expect(response).to_contain_text("email")
```

### 4. Performance Testing

```python
# tests/performance/load/test_chat_performance.py
import asyncio
import aiohttp
from locust import HttpUser, task, between

class ChatUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Login and setup
        self.client.post("/api/login", {
            "email": f"user_{self.user_id}@example.com",
            "password": "test123"
        })
    
    @task
    def send_chat_message(self):
        self.client.post(
            "/api/chat/message",
            json={
                "chatbot_id": "test_bot",
                "message": "Test message for load testing"
            }
        )

# tests/performance/stress/test_concurrent_training.py
import asyncio
import aiohttp
from typing import List

async def train_chatbot(session, chatbot_id: str, data: List[str]):
    async with session.post(
        f"/api/chatbots/{chatbot_id}/train",
        json={"training_data": data}
    ) as response:
        return await response.json()

async def stress_test_training():
    async with aiohttp.ClientSession() as session:
        # Create multiple training tasks
        tasks = [
            train_chatbot(
                session,
                f"bot_{i}",
                ["Test data for stress testing"]
            )
            for i in range(100)
        ]
        
        # Run concurrently
        results = await asyncio.gather(*tasks)
        
        # Analyze results
        success_count = sum(1 for r in results if r.get('status') == 'success')
        return success_count
```

### 5. Security Testing

```python
# tests/security/test_authentication.py
import pytest
from rest_framework.test import APIClient

class TestAuthentication:
    @pytest.fixture
    def api_client(self):
        return APIClient()
    
    def test_invalid_api_key(self, api_client):
        api_client.credentials(HTTP_X_API_KEY='invalid_key')
        response = api_client.get('/api/chatbots/')
        assert response.status_code == 401
    
    def test_expired_token(self, api_client):
        api_client.credentials(
            HTTP_AUTHORIZATION='Bearer expired_token_here'
        )
        response = api_client.get('/api/chatbots/')
        assert response.status_code == 401
    
    def test_rate_limiting(self, api_client, user):
        api_client.force_authenticate(user=user)
        
        # Send requests up to limit
        for _ in range(user.usage_limit):
            response = api_client.post('/api/chat/message', {
                'message': 'test'
            })
            assert response.status_code == 200
        
        # Next request should be blocked
        response = api_client.post('/api/chat/message', {
            'message': 'test'
        })
        assert response.status_code == 429

# tests/security/test_data_privacy.py
class TestDataPrivacy:
    def test_pii_detection(self):
        text = "My email is test@example.com and phone is 123-456-7890"
        detected_pii = detect_pii(text)
        
        assert 'email' in detected_pii
        assert 'phone' in detected_pii
        
    def test_data_isolation(self, api_client, user1, user2):
        # Create chatbot for user1
        chatbot = create_test_chatbot(user1)
        
        # Try to access with user2
        api_client.force_authenticate(user=user2)
        response = api_client.get(f'/api/chatbots/{chatbot.id}/')
        
        assert response.status_code == 403
```

### 6. AI/ML Testing

```python
# tests/ai/test_model_performance.py
from services.ai import AIService
from metrics import calculate_metrics

class TestModelPerformance:
    def test_response_quality(self):
        ai_service = AIService()
        test_cases = [
            {
                'prompt': 'How do I reset my password?',
                'context': ['Users can reset passwords through email'],
                'expected_keywords': ['email', 'reset', 'link']
            }
        ]
        
        for case in test_cases:
            response = ai_service.generate_response(
                case['prompt'],
                case['context']
            )
            
            # Check for expected information
            for keyword in case['expected_keywords']:
                assert keyword.lower() in response.lower()
    
    def test_embedding_quality(self):
        embedding_service = EmbeddingGenerator()
        
        # Test semantic similarity
        text1 = "How do I reset my password?"
        text2 = "I need to change my password"
        
        emb1 = embedding_service.create_embeddings([text1])[0]
        emb2 = embedding_service.create_embeddings([text2])[0]
        
        similarity = calculate_cosine_similarity(emb1, emb2)
        assert similarity > 0.8  # High similarity threshold
```

## Test Automation

### 1. CI/CD Integration

```yaml
# .github/workflows/test.yml
name: ChatSphere Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
        ports:
          - 5432:5432
      
      redis:
        image: redis:6
        ports:
          - 6379:6379
    
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
        run: pytest tests/unit/
      
      - name: Run integration tests
        run: pytest tests/integration/
      
      - name: Run E2E tests
        run: pytest tests/e2e/
      
      - name: Run security tests
        run: pytest tests/security/
```

### 2. Test Data Management

```python
# tests/conftest.py
import pytest
from typing import Dict, Any
from pathlib import Path

class TestDataManager:
    @staticmethod
    def load_test_data(category: str) -> Dict[str, Any]:
        data_file = Path(f"tests/data/{category}.json")
        return json.loads(data_file.read_text())
    
    @staticmethod
    def generate_test_vectors(count: int) -> List[np.ndarray]:
        return [
            np.random.rand(1536)  # OpenAI embedding size
            for _ in range(count)
        ]

@pytest.fixture
def test_data_manager():
    return TestDataManager()

@pytest.fixture
def mock_openai(monkeypatch):
    def mock_completion(*args, **kwargs):
        return {
            'choices': [{
                'message': {
                    'content': 'Mocked AI response'
                }
            }]
        }
    
    monkeypatch.setattr(
        'openai.ChatCompletion.create',
        mock_completion
    )
```

## Test Coverage Requirements

1. **Unit Tests**
   - Minimum 90% code coverage
   - All models and services
   - Critical utility functions

2. **Integration Tests**
   - All API endpoints
   - Database operations
   - External service interactions

3. **E2E Tests**
   - Critical user flows
   - Payment processing
   - Bot creation and training

4. **Performance Tests**
   - Response time < 500ms
   - Support 1000 concurrent users
   - Handle 100 requests/second

5. **Security Tests**
   - Authentication/Authorization
   - Data privacy
   - Input validation

6. **AI/ML Tests**
   - Model accuracy > 90%
   - Response relevance
   - Context awareness

## Monitoring and Reporting

1. **Test Results**
   - Automated reports
   - Failure analysis
   - Trend tracking

2. **Coverage Reports**
   - Code coverage
   - Feature coverage
   - API coverage

3. **Performance Metrics**
   - Response times
   - Error rates
   - Resource usage

## Next Steps

For details on how this testing strategy supports our deployment and continuous integration processes, refer to the [Deployment Strategy](./09-deployment-strategy.md) document. 