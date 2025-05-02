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
│   └── external/        # External service tests (Agent Service, DB)
├── e2e/                 # End-to-end tests
│   ├── flows/           # User flow tests
│   └── scenarios/       # Complex scenario tests
├── performance/         # Performance tests
│   ├── load/            # Load testing scripts
│   └── stress/          # Stress testing scripts
├── security/            # Security tests
└── ai/                  # AI/ML specific tests (in agent service project)
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

# backend/chatsphere_agent/tests/unit/test_embeddings.py (Example in Agent Service)
import pytest
import numpy as np
from chatsphere_agent.vector_store import generate_embeddings # Example function

class TestEmbeddingGenerator:
    
    @pytest.mark.asyncio
    async def test_create_embeddings(self):
        # This test would likely need mocking for the Google API call
        text = "Test content for embedding"
        result = await generate_embeddings([text]) # Assuming an async function
        
        assert len(result) == 1
        assert isinstance(result[0], np.ndarray)
        # Check shape based on the specific Google model used (e.g., 768 for embedding-001)
        assert result[0].shape == (768,) 
```

### 2. Integration Testing

```python
# backend/chatsphere/tests/integration/api/test_chatbot_api.py
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

# backend/chatsphere/tests/integration/external/test_agent_client.py
import pytest
import httpx
from respx import mock
from chatsphere.services.agent_client import call_chat, call_embed_and_store

AGENT_SERVICE_URL = "http://test-agent-service:8001" # Use a test URL

@pytest.mark.asyncio
async def test_call_chat_success(respx_mock):
    respx_mock.post(f"{AGENT_SERVICE_URL}/chat").mock(return_value=httpx.Response(200, json={"response": "Test AI response"}))
    
    response = await call_chat(
        bot_id="test_bot", 
        message="Hello", 
        history=[], 
        user_id="test_user"
    )
    assert response == "Test AI response"

@pytest.mark.asyncio
async def test_call_embed_success(respx_mock):
    respx_mock.post(f"{AGENT_SERVICE_URL}/embed_and_store").mock(return_value=httpx.Response(200, json={
        "status": "success", 
        "document_id": "doc123", 
        "stored_vector_count": 1
    }))
    
    success = await call_embed_and_store(document_id="doc123", chunks=["chunk 1"])
    assert success is True

# backend/chatsphere_agent/tests/integration/test_vector_store.py (Example in Agent Service)
import pytest
import asyncio
from unittest.mock import patch, AsyncMock # Import mocking tools
from chatsphere_agent.vector_store import embed_and_store_chunks, get_relevant_chunks
# Requires setting up a test Pinecone index or, more commonly, mocking the Pinecone client

# Example Mocking setup (adapt as needed)
@pytest.fixture
def mock_pinecone_index():
    mock_index = AsyncMock() # Use AsyncMock for async methods
    # Mock specific methods like upsert, query
    mock_index.upsert.return_value = None # Or mock return value if needed
    mock_query_response = AsyncMock()
    mock_match = AsyncMock()
    mock_match.metadata = {'text': 'mocked relevant text'}
    mock_query_response.matches = [mock_match]
    mock_index.query.return_value = mock_query_response
    return mock_index

@pytest.fixture
def mock_embedding_model():
    mock_model = AsyncMock()
    # Mock embed_query and embed_documents
    mock_model.embed_query.return_value = [0.1] * 768 # Return vector of correct dimension
    mock_model.embed_documents.return_value = [[0.2] * 768] # Return list of vectors
    return mock_model

@pytest.mark.asyncio
@patch('chatsphere_agent.vector_store.get_embedding_model') # Patch the function that returns the model
@patch('chatsphere_agent.vector_store.get_pinecone_index') # Patch the function that returns the index
async def test_store_and_query_mocked(mock_get_index, mock_get_model, mock_pinecone_index, mock_embedding_model):
    # Assign return values to the patched functions
    mock_get_index.return_value = mock_pinecone_index
    mock_get_model.return_value = mock_embedding_model

    doc_id = "test_doc_integration"
    chunks = ["This is test content for Pinecone integration."]
    metadata = {"bot_id": "test_bot_mock"}

    # Store
    await embed_and_store_chunks(doc_id, chunks, metadata, mock_pinecone_index)
    # Assert that index.upsert was called correctly
    mock_pinecone_index.upsert.assert_called_once()

    # Query
    results = await get_relevant_chunks("test_bot_mock", "test query", index=mock_pinecone_index)
    # Assert that index.query was called correctly
    mock_pinecone_index.query.assert_called_once()
    assert len(results) == 1
    assert results[0] == "mocked relevant text"
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
        
        # Wait for processing (adjust timeout/selector based on actual UI feedback)
        # This implicitly tests the call to the agent service for embedding
        self.page.wait_for_selector("[data-test=processing-complete]", timeout=60000)
        
        # Verify creation
        expect(self.page.locator("[data-test=success-message]")).to_be_visible()
        expect(self.page.locator("[data-test=chatbot-name]")).to_have_text(
            "Customer Service Bot"
        )

# tests/e2e/scenarios/test_chat_interaction.py
from playwright.sync_api import Page, expect

class TestChatInteraction:
    def test_chat_conversation_flow(self, page: Page):
        # Navigate to chat interface for a pre-trained bot
        page.goto("/chat/customer-service-bot")
        
        # Send message
        page.fill("[data-test=chat-input]", "How do I reset my password?")
        page.click("[data-test=send-button]")
        
        # Wait for response (which involves call to agent service)
        response_locator = page.locator("[data-test=bot-response]")
        expect(response_locator).to_be_visible(timeout=30000)
        
        # Verify response contains relevant information
        expect(response_locator).to_contain_text("password reset")
        
        # Test follow-up question
        page.fill("[data-test=chat-input]", "Where do I find the reset link?")
        page.click("[data-test=send-button]")
        
        # Verify context awareness
        expect(response_locator.last).to_be_visible(timeout=30000)
        expect(response_locator.last).to_contain_text("email")
```

### 4. Performance Testing

```python
# tests/performance/load/test_chat_performance.py
import asyncio
import aiohttp
from locust import HttpUser, task, between

# Note: This test targets the Django backend API endpoint for chat.
# It indirectly tests the performance of the Django -> Agent service call.
# Separate Locust tests could target the Agent service directly if needed.

class ChatUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://localhost:8000" # Target the Django backend
    
    def on_start(self):
        # Perform login to get JWT token
        self.token = self._login()
        self.headers = {'Authorization': f'Bearer {self.token}'}

    def _login(self):
        # Replace with actual login logic
        response = self.client.post("/api/token/", json={"username": "loadtestuser", "password": "password"})
        if response.status_code == 200:
            return response.json().get('access')
        return None

    @task
    def send_chat_message(self):
        if not self.token:
            self._login()
            if not self.token:
                return # Skip task if login failed
                
        bot_id = "your_test_bot_id" # Replace with a valid bot ID
        chat_endpoint = f"/api/chat/{bot_id}/send/" # Example endpoint
        payload = {
            "message": "Tell me about performance testing."
        }
        self.client.post(
            chat_endpoint,
            json=payload,
            headers=self.headers,
            name="/api/chat/{bot_id}/send/"
        )

# tests/performance/stress/test_embedding_stress.py
# This would target the agent service's /embed_and_store endpoint directly
# using Locust or another tool like k6.

# Example using k6 (JavaScript):
# import http from 'k6/http';
# import { check, sleep } from 'k6';
# 
# export let options = {
#   stages: [
#     { duration: '1m', target: 50 }, // ramp up to 50 users
#     { duration: '3m', target: 50 }, // stay at 50 users
#     { duration: '1m', target: 0 }, // ramp down
#   ],
# };
# 
# const AGENT_URL = 'http://localhost:8001/embed_and_store';
# 
# export default function () {
#   const payload = JSON.stringify({
#     document_id: `doc-${__VU}-${__ITER}`,
#     chunks: [
#       `This is test chunk 1 for stress testing user ${__VU} iteration ${__ITER}.`,
#       `This is test chunk 2 for stress testing user ${__VU} iteration ${__ITER}.`
#     ],
#   });
# 
#   const params = {
#     headers: {
#       'Content-Type': 'application/json',
#     },
#   };
# 
#   const res = http.post(AGENT_URL, payload, params);
#   check(res, { 'status was 200': (r) => r.status == 200 });
#   sleep(1);
# }
```

### 5. Security Testing

- **Tools**: OWASP ZAP, Bandit (Python), Snyk (Dependencies)
- **Focus Areas**:
    - Input validation (API endpoints, chat inputs)
    - Authentication & Authorization checks (Django & potentially agent service if needed)
    - Dependency scanning
    - Sensitive data exposure (API keys, logs)
    - Rate limiting on API endpoints

### 6. AI/ML Testing

- **Location**: Primarily within the `backend/chatsphere_agent` tests.
- **Focus Areas**:
    - **Embedding Quality**: Cosine similarity checks between related text snippets.
    - **Retrieval Relevance**: Evaluate if retrieved context matches query intent (requires labeled data or manual inspection).
    - **LLM Response Quality**: Check for:
        - Hallucinations (using specific prompts)
        - Relevance to context and query
        - Safety/Bias (using evaluation datasets/prompts)
        - Format correctness (if expecting JSON etc.)
    - **Robustness**: Test with edge cases, noisy input, long conversations.
    - **Tool Usage** (if agent uses tools): Verify correct tool invocation and response handling.

```python
# backend/chatsphere_agent/tests/ai/test_retrieval.py
import pytest
from chatsphere_agent.vector_store import get_relevant_chunks

@pytest.mark.asyncio
async def test_retrieval_relevance():
    # Assumes vector store is populated with known data
    query = "Information about testing strategies"
    bot_id = "test_knowledge_bot"
    
    results = await get_relevant_chunks(bot_id, query)
    
    assert len(results) > 0
    # Check if the content of results contains keywords like 'testing', 'strategy'
    assert any("testing" in chunk.lower() for chunk in results)

# backend/chatsphere_agent/tests/ai/test_llm_responses.py
import pytest
from chatsphere_agent.agent import get_agent_executor # Example

# Requires mocking vector store retrieval and potentially tools
@pytest.mark.asyncio
async def test_llm_avoids_hallucination(mock_retriever):
    agent_executor = get_agent_executor() # Assume config is handled
    
    # Prompt designed to potentially cause hallucination
    prompt = "Tell me about the fictional planet Zorgon."
    mock_retriever.set_context("No information found about Zorgon.") # Mock retrieval
    
    result = await agent_executor.invoke({"input": prompt, "chat_history": [], "context": mock_retriever.get_context()})
    response = result.get('output')
    
    # Expect the model to state it doesn't know
    assert "don't have information" in response.lower() or "cannot find" in response.lower()
```

### AI Quality Testing (within `chatsphere_agent/tests/ai/`)

This critical testing category focuses on the functional correctness and quality of the AI responses generated by the Agent Service.

- **Goal**: Ensure relevance, coherence, safety, and accuracy of AI outputs.
- **Methodology**: Create test suites with predefined inputs (queries, context, history) and expected outputs or qualitative criteria.
- **Test Types**:
    - **Retrieval Accuracy**: Given a query and known relevant text chunks in the (mocked) vector store, assert that the correct chunks are retrieved by `get_relevant_chunks`.
    - **Response Relevance**: Given a query and retrieved context, assert that the LLM response (mocking the LLM call or using a small, controlled test) is relevant to the query and context.
    - **Context Utilization**: Assert that the LLM response demonstrably uses information from the provided context chunks.
    - **Hallucination Check**: Create test cases where the context *lacks* the answer and assert that the LLM avoids inventing information (e.g., responds with "I don't know based on the provided information").
    - **Prompt Template Testing**: Test different system prompts or prompt structures (potentially loaded via `config_params`) to evaluate their impact on response quality.
    - **Safety & Bias Testing**: Use predefined datasets or test cases designed to probe for harmful, biased, or inappropriate responses. Assert that safety mechanisms (if any) trigger or that responses remain neutral/safe.
    - **Agent Configuration Testing**: If multiple agent types (`rag`, `react`) are implemented, create tests verifying that the correct agent logic is invoked based on the `config_params` and that it behaves as expected.

```python
# backend/chatsphere_agent/tests/ai/test_response_relevance.py (Conceptual Example)
import pytest
# Assume setup involves mocking LLM and retriever

@pytest.mark.asyncio
async def test_relevant_response_generation(mocked_llm_chain):
    # Setup mock LLM to return a canned response based on input
    # Setup context
    context = "The capital of France is Paris."
    query = "What is the capital of France?"
    history = []
    config = {"agent_type": "rag"}
    
    # Invoke the chat logic (similar to main.py /chat endpoint)
    # response = await invoke_chat_logic(query, history, context, config)
    response = "Paris is the capital of France."

    # Assertions
    assert "Paris" in response
    assert "France" in response
    # Add negative assertions if needed
    assert "Berlin" not in response 
```

## Test Execution

- **Unit & Integration Tests**: Run via `pytest` within the respective service directories (`backend/` and `backend/chatsphere_agent/`).
- **E2E Tests**: Run via `playwright test` against a running instance of the full application (Docker Compose recommended).
- **Performance Tests**: Run via `locust` (Python) or `k6` (JavaScript) against running service endpoints.
- **CI/CD**: Integrate test execution into GitHub Actions (or similar) for automated testing on pushes and pull requests.

## Mocking Dependencies

- **External APIs (Google, Pinecone)**: Use libraries like `respx` (for `httpx`), `pytest-mock`, or specific SDK mocks.
- **Databases**: Use test databases (in-memory like SQLite for simple unit tests, separate test Postgres instance for integration tests).
- **Inter-service Communication (Django <-> Agent)**: Use `respx` in Django tests to mock HTTP calls to the agent service.

```python
# Example mocking OpenAI/Google API calls
@pytest.fixture
def mock_google_llm(monkeypatch):
    class MockChatGoogle:
        async def invoke(self, *args, **kwargs):
            return {'output': 'Mocked Gemini Response'}
            
    monkeypatch.setattr(
        'langchain_google_genai.ChatGoogleGenerativeAI',
        MockChatGoogle 
    )

# Example mocking Pinecone client
@pytest.fixture
def mock_pinecone_index(monkeypatch):
    class MockPineconeIndex:
        async def upsert(self, *args, **kwargs):
            return {'upserted_count': 1}
        async def query(self, *args, **kwargs):
            # Return mock query results
            return {'matches': [{'id': 'vec1', 'score': 0.9, 'metadata': {'text': 'mocked text'}}]}
            
    class MockPinecone:
        def Index(self, *args, **kwargs):
            return MockPineconeIndex()
            
    monkeypatch.setattr('pinecone.Pinecone', MockPinecone)
```