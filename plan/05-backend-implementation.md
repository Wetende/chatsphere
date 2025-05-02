# ChatSphere Backend Implementation

This document outlines the detailed backend implementation strategy for the ChatSphere platform, focusing on creating a scalable, maintainable, and high-performance server-side architecture using Django and Django REST Framework. It also details the integration with a separate FastAPI service for AI functionalities.

## Technology Stack

- **Framework**: Django 4.x
- **API Framework**: Django REST Framework
- **Authentication**: JWT with refresh tokens
- **Task Queue**: Celery with Redis **(Recommended for background embedding)**
- **Caching**: Redis (Optional)
- **ORM**: Django ORM with PostgreSQL
- **HTTP Client**: `httpx` (for communication with Agent Service)
- **AI Agent Service**: FastAPI, LangChain, Google Gemini, Pinecone
- **Testing**: pytest
- **Documentation**: OpenAPI/Swagger (for both Django and Agent APIs)
- **Containerization**: Docker
- **Code Quality**: Black, isort, flake8 *(Ref: @chatsphere-code-quality.mdc)*

## Project Structure

```
backend/
├── config/                 # Django project configuration
│   ├── settings/          # Environment-specific settings
│   ├── urls.py            # Main URL routing
│   └── celery.py         # Celery configuration (if used)
├── apps/                  # Django applications (renamed for clarity)
│   ├── users/            # User management, profiles, auth
│   ├── bots/             # Bot configuration, documents, conversations, messages
│   └── webhooks/         # Webhook handling (if needed)
├── core/                  # Core Django functionality (shared across apps)
│   ├── middleware/       # Custom middleware (e.g., logging, error handling)
│   ├── permissions/      # Custom DRF permission classes
│   ├── pagination/       # Custom DRF pagination
│   └── exceptions/       # Custom DRF exception handling
├── services/             # Django-side Business logic services
│   ├── document_processor.py # Handles file processing, chunking (calls agent for embedding)
│   └── agent_client.py      # Client for communicating with the FastAPI Agent Service
├── utils/                # Utility functions (specific to Django backend)
├── tests/                # Test suite for the Django backend
│   ├── unit/
│   ├── integration/
│   └── external/          # Tests mocking the Agent Service
├── requirements/         # Dependencies by environment
└── chatsphere_agent/       # Separate FastAPI service for AI
    ├── main.py
    ├── agent.py
    ├── vector_store.py
    ├── config.py
    ├── requirements.txt
    └── tests/
```

## Application Components (Django Backend)

### 1. User Management (`apps/users`)

- **Models**: Standard Django `User`, extended `UserProfile` (with subscription status, Stripe ID etc.), `SubscriptionPlan`.
- **Serializers**: For User, UserProfile, SubscriptionPlan. Handle registration (`RegisterSerializer`).
- **Views**: ViewSets for User (read-only, plus `/me` action), UserProfile, SubscriptionPlan. `RegisterView` (generics.CreateAPIView), `CurrentUserView`.
- **Authentication**: Uses DRF Simple JWT for token generation (`/api/token/`, `/api/token/refresh/`). Configure `settings.py` accordingly.
- **Authorization**: Standard DRF permissions (`IsAuthenticated`), potentially custom permissions based on subscription tiers.

```python
# Example: apps/users/models.py
from django.contrib.auth.models import User
from django.db import models

class SubscriptionPlan(models.Model):
    # ... fields ...
    pass

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    subscription_status = models.CharField(max_length=20, default='free')
    subscription_plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True)
    # ... other fields ...
```

### 2. Bot Management (`apps/bots`)

- **Models**: `Bot` (config, owner), `Document` (metadata, status), `Chunk` (content, `pinecone_vector_id`), `Conversation` (metadata), `Message` (role, content).
- **Serializers**: For each model (`BotSerializer`, `DocumentSerializer`, etc.).
- **Views**: ViewSets for `Bot`, `Document`, `Conversation`, `Message`. Use custom permissions (`IsOwnerOrReadOnly`) to ensure users only access their own data.
    - `DocumentViewSet`: Handles file uploads (`perform_create`) and text training (`train_text` action). **Crucially, after creating `Document` and `Chunk` records, these methods must call the `AgentAPIClient` to trigger embedding and storage in the agent service.**
    - Chat Endpoint (e.g., within `ConversationViewSet` or a dedicated view): Receives user messages, calls `AgentAPIClient` to get the AI response, saves messages, returns response.
- **Authorization**: Custom `IsOwnerOrReadOnly` permission ensures data isolation.
- **Note**: The `configuration` field on the `Bot` model is crucial for enabling different agent behaviors. It can store parameters like specific system prompts, temperature settings, agent type identifiers (e.g., 'rag', 'react'), or tool configurations to be passed to the Agent Service during chat interactions.

```python
# Example: apps/bots/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Bot, Document, Chunk, Conversation, Message
from .serializers import BotSerializer # ... other serializers
from core.permissions import IsOwnerOrReadOnly
from services.document_processor import process_document_file, process_document_text
from services.agent_client import call_chat, call_embed_and_store # Import agent client

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    # ... get_queryset ...

    def perform_create(self, serializer):
        # ... permission checks, get file ...
        try:
            document = process_document_file(bot_id=bot.id, file=file, name=name)
            if document and document.status == 'ready':
                # **Recommendation:** Use Celery for asynchronous embedding
                # Trigger Celery task here instead of calling agent_client directly
                # task_id = embed_document_task.delay(document.id)
                # document.embedding_task_id = task_id # Optional: Store task ID
                # document.save()

                # Synchronous call (alternative, blocks request):
                chunks_content = [chunk.content for chunk in document.chunks.all()]
                if chunks_content:
                    metadata_base = {"bot_id": str(document.bot_id)}
                    success, error_msg = call_embed_and_store(str(document.id), chunks_content, metadata_base)
                    if not success:
                         # Log detailed error
                         logger.error(f"Embedding failed for doc {document.id}: {error_msg}")
                         document.status = 'embedding_error'
                         document.error_message = error_msg[:255] # Store truncated error
                         document.save()
                # ... save serializer, return success ...
            else:
                # Handle processing error
                return Response({"error": "Failed to process document"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # Handle exceptions
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'])
    def train_text(self, request):
        # ... validation, permission checks ...
        try:
            document = process_document_text(bot_id=bot_id, name=name, text_content=text)
            if document and document.status == 'ready':
                # **Recommendation:** Use Celery for asynchronous embedding
                # task_id = embed_document_task.delay(document.id)
                # document.embedding_task_id = task_id
                # document.save()

                # Synchronous call:
                chunks_content = [chunk.content for chunk in document.chunks.all()]
                if chunks_content:
                    metadata_base = {"bot_id": str(document.bot_id)}
                    success, error_msg = call_embed_and_store(str(document.id), chunks_content, metadata_base)
                    if not success:
                         logger.error(f"Embedding failed for text doc {document.id}: {error_msg}")
                         document.status = 'embedding_error'
                         document.error_message = error_msg[:255]
                         document.save()
                serializer = DocumentSerializer(document)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            # ... handle errors ...
        except Exception as e:
            # ... handle exceptions ...

class ConversationViewSet(viewsets.ModelViewSet):
    # ... queryset, serializer_class, permissions ...

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        conversation = self.get_object() # Ensure user owns this conversation
        bot = conversation.bot
        user_message_content = request.data.get('message')
        if not user_message_content:
            return Response({"error": "Message content is required."}, status=400)

        # Retrieve history - **Limit should be configurable**
        history_length = bot.configuration.get('chat_history_length', 10) # Get limit from bot config or default
        history_qs = Message.objects.filter(conversation=conversation).order_by('created_at')[:history_length]
        history_list = [{'role': msg.message_type.lower(), 'content': msg.content} for msg in history_qs]

        # Call agent service
        ai_response_content, error_msg = call_chat(
            bot_id=str(bot.id),
            message=user_message_content,
            history=history_list,
            user_id=str(request.user.id), # Or an anonymous ID
            config_params=bot.configuration
        )

        if ai_response_content:
            # Save messages
            with transaction.atomic():
                Message.objects.create(conversation=conversation, message_type='USER', content=user_message_content)
                ai_msg = Message.objects.create(conversation=conversation, message_type='BOT', content=ai_response_content)
            serializer = MessageSerializer(ai_msg) # Return the bot message
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Log specific error from agent client
            logger.error(f"Agent chat call failed for convo {conversation.id}: {error_msg}")
            # Return more specific error to frontend if desired
            return Response({"error": f"Failed to get response from AI agent. Details: {error_msg}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

### 3. Document Processing Service (`services/document_processor.py`)

- Responsible for taking an uploaded file or text content.
- Extracts text (using libraries like `PyPDF2`, `python-magic` if needed).
- Chunks the text using a suitable strategy (e.g., `RecursiveCharacterTextSplitter` from LangChain or custom logic).
- Creates the `Document` and `Chunk` records in the PostgreSQL database.
- **Does NOT perform embedding or vector storage.**

```python
# services/document_processor.py
import logging
from django.db import transaction
from apps.bots.models import Document, Chunk, Bot
# from langchain.text_splitter import RecursiveCharacterTextSplitter # Example splitter

logger = logging.getLogger(__name__)

@transaction.atomic
def process_document_file(bot_id: str, file, name: str) -> Document | None:
    logger.info(f"Processing file '{name}' for bot {bot_id}")
    # 1. Create Document record with status 'processing'
    # 2. Extract text content from file (handle different types: pdf, txt)
    # 3. If extraction fails, update status to 'error', return None
    # 4. Chunk the extracted text
    # 5. Create Chunk records in DB, linking to the Document
    # 6. Update Document status to 'ready'
    # 7. Return the Document object
    pass # Replace with actual implementation

@transaction.atomic
def process_document_text(bot_id: str, name: str, text_content: str) -> Document | None:
    logger.info(f"Processing text content '{name}' for bot {bot_id}")
    # 1. Create Document record with status 'processing'
    # 2. Chunk the text content
    # 3. Create Chunk records in DB, linking to the Document
    # 4. Update Document status to 'ready'
    # 5. Return the Document object
    pass # Replace with actual implementation

def _extract_text(file, content_type):
    # ... implementation for text extraction ...
    pass

def _chunk_text(text):
    # text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    # return text_splitter.split_text(text)
    pass # Replace with actual implementation
```

### 4. Agent API Client (`services/agent_client.py`)

- Uses `httpx` to make POST requests to the FastAPI agent service endpoints (`/embed_and_store`, `/chat`).
- Retrieves the agent service URL from environment variables (`AGENT_SERVICE_URL`).
- Handles request formatting (JSON payloads) and response parsing.
- Implements robust error handling for network issues (timeouts, connection errors), non-200 status codes from the agent service, and potential JSON parsing errors. Returns a tuple `(result, error_message)` or raises specific exceptions.
- Potentially uses an async `httpx` client if called from async Django views.

```python
# services/agent_client.py
import httpx
import os
import logging
# ... (Implementation similar to the one in restructuring.md) ...
```

### 5. API Endpoints (`config/urls.py`, `apps/*/urls.py`)

- Define URL patterns using DRF Routers for the ViewSets.
- Include specific paths for authentication endpoints (`/api/token/`, etc.).
- Ensure proper namespacing and versioning (e.g., `/api/v1/...`).

### 6. Authentication and Authorization

- Configure `settings.py` for `djangorestframework-simplejwt`.
- Use `permission_classes` in ViewSets (`IsAuthenticated`, custom `IsOwnerOrReadOnly`).

### 7. Middleware (`core/middleware/`)

- Include Django/DRF defaults (`SecurityMiddleware`, `CorsMiddleware`, etc.).
- Add custom middleware for logging requests/responses or specific error handling if needed.

## Key Implementation Notes

- **Decoupling**: The core principle is that the Django backend *never* directly imports or calls code from the `chatsphere_agent` directory. All interaction happens via HTTP calls orchestrated by `agent_client.py`.
- **Asynchronous Operations**: Consider making the calls from Django views to the agent service asynchronous, especially for embedding, to avoid blocking the Django request thread. This might involve using Celery or Django async views with `httpx.AsyncClient`.
- **Error Handling**: Implement robust error handling in both the Django `agent_client.py` (for network issues) and the FastAPI agent service (for AI/embedding/Pinecone issues). Propagate errors back to the user appropriately.
- **Configuration**: Centralize configuration (API keys, URLs) in the root `.env` file, accessed by both Django and FastAPI services.
- **Testing**: Write integration tests for the Django backend that mock the `agent_client.py` calls using libraries like `respx` or `pytest-httpx`.