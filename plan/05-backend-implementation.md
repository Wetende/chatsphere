# ChatSphere Backend Implementation

This document outlines the detailed backend implementation strategy for the ChatSphere platform, focusing on creating a scalable, maintainable, and high-performance server-side architecture using FastAPI and SQLAlchemy. It also details the integration with an internal agent module for AI functionalities.

## Technology Stack

- **Framework**: FastAPI
- **API Framework**: Built-in FastAPI features
- **Authentication**: JWT with dependencies
- **Task Queue**: Celery with Redis **(Recommended for background embedding)**
- **Caching**: Redis (Optional)
- **ORM**: SQLAlchemy with PostgreSQL
- **HTTP Client**: httpx (for external calls if needed)
- **AI Agent Module**: Integrated in FastAPI, LangChain, Google Gemini, Pinecone
- **Testing**: pytest
- **Documentation**: OpenAPI/Swagger (built-in)
- **Containerization**: Docker
- **Code Quality**: Black, isort, flake8 *(Ref: @chatsphere-code-quality.mdc)*

## Project Structure

```
backend/
├── agent/                # Isolated AI/agent logic (extractable)
│   ├── chains/           # LangChain chains (e.g., rag_chain.py)
│   ├── generation/       # LLM generation (e.g., agent_factory.py, chain_factory.py)
│   ├── ingestion/        # Document processing/embedding (e.g., chunkers.py, parsers.py, vectorization.py)
│   ├── models/           # Pydantic models for AI requests (e.g., chat.py, embed.py)
│   ├── retrieval/        # Vector retrieval (e.g., pinecone_retriever.py, unified_retriever.py)
│   ├── routing/          # AI-specific routers (e.g., chat_router.py, ingestion_router.py)
│   ├── tools/            # Custom tools (e.g., sql_tool.py)
│   ├── tests/            # AI tests (e.g., test_chain_factory.py)
│   ├── config.py         # AI configs (e.g., Google API keys, model settings)
│   └── main.py           # Optional standalone entry for agent
├── app/                  # Core application logic
│   ├── __init__.py
│   ├── config.py         # App configs (e.g., FastAPI settings, PostgreSQL URL, env vars)
│   ├── core/             # Shared utilities (e.g., dependencies.py, lifespan.py, database.py for SQLAlchemy session)
│   ├── models/           # SQLAlchemy models (e.g., user.py, bot.py, conversation.py)
│   ├── routers/          # API routers (e.g., auth_router.py, bots_router.py)
│   ├── schemas/          # Pydantic schemas (e.g., user_schema.py, bot_schema.py)
│   ├── services/         # Business logic (e.g., bot_service.py calling agent/ and DB)
│   ├── utils/            # Helpers (e.g., auth_utils.py, error_handlers.py)
│   └── tests/            # Core tests (e.g., test_routers.py, test_models.py)
├── database/              # PostgreSQL-specific (e.g., init scripts, if not in root postgres/)
│   ├── init.sql          # Initial DB setup script (e.g., create extensions like pgvector)
│   └── schema.sql        # Optional schema definitions (though Alembic will handle most)
├── migrations/           # Alembic migrations for PostgreSQL
│   ├── env.py            # Alembic environment config
│   ├── script.py.mako    # Migration script template
│   └── versions/          # Generated migration files (e.g., 0001_initial.py)
├── documents/            # Uploaded user docs (e.g., test_file.txt)
├── main.py               # Main FastAPI app entry (mounts routers, integrates agent, sets up DB)
├── alembic.ini           # Alembic config file for migrations
├── requirements.txt      # Deps (e.g., fastapi, uvicorn, langchain, sqlalchemy, psycopg2, alembic)
└── .env                  # Env vars (e.g., DATABASE_URL=postgresql://user:pass@localhost/db)
```

## Application Components (FastAPI Backend)

### 1. User Management (`app/routers/auth_router.py`)

- **Models**: SQLAlchemy `User`, extended attributes in same model or related (with subscription status, Stripe ID etc.), `SubscriptionPlan`.
- **Schemas**: Pydantic for User, SubscriptionPlan. Handle registration (`RegisterSchema`).
- **Routers**: APIRouter for auth endpoints (register, login, me, etc.).
- **Authentication**: Uses JWT with FastAPI dependencies.
- **Authorization**: Custom dependencies based on roles.

```python
# app/models/user.py
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    price = Column(Float)
    description = Column(String)
    features = Column(JSON)
    stripe_price_id = Column(String)

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    is_staff = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    date_joined = Column(DateTime, default=func.now())
    subscription_status = Column(String, default='free')
    subscription_plan_id = Column(String, ForeignKey('subscription_plans.id'))
    stripe_customer_id = Column(String)
    subscription_plan = relationship("SubscriptionPlan")
```

### 2. Bot Management (`app/routers/bots_router.py`)

- **Models**: `Bot` (config, owner), `Document` (metadata, status), `Chunk` (content, `pinecone_vector_id`), `Conversation` (metadata), `Message` (role, content).
- **Schemas**: Pydantic for each model (`BotSchema`, `DocumentSchema`, etc.).
- **Routers**: APIRouter for bots, documents, conversations, messages. Use dependencies for authentication.
    - Document endpoints: Handle file uploads and text training. After creating `Document` and `Chunk` records, call agent module to trigger embedding and storage.
    - Chat Endpoint: Receives user messages, calls agent module to get the AI response, saves messages, returns response.
- **Authorization**: Dependencies to ensure users only access their own data.
- **Note**: The `configuration` field on the `Bot` model is crucial for enabling different agent behaviors. It can store parameters like specific system prompts, temperature settings, agent type identifiers (e.g., 'rag', 'react'), or tool configurations to be passed to the Agent module during chat interactions.

```python
# app/routers/bots_router.py
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.bot import BotCreate, Bot

from app.services.bot_service import create_bot, get_bots, get_bot, update_bot, delete_bot

router = APIRouter(prefix="/bots", tags=["bots"])

@router.post("/", response_model=Bot)
def create_bot_endpoint(bot: BotCreate, db: Session = Depends(get_db)):
    return create_bot(db, bot)

@router.get("/")
def get_bots_endpoint(db: Session = Depends(get_db)):
    return get_bots(db)

# Similar for get, update, delete
```

### 3. Document Processing Service (`app/services/document_service.py`)

- Responsible for taking an uploaded file or text content.
- Extracts text (using libraries like `PyPDF2`, `python-magic` if needed).
- Chunks the text using a suitable strategy (e.g., `RecursiveCharacterTextSplitter` from LangChain or custom logic).
- Creates the `Document` and `Chunk` records in the PostgreSQL database.
- Calls agent module for embedding.

```python
# app/services/document_service.py
import logging
from sqlalchemy.orm import Session
from app.models.document import Document, Chunk
from app.agent.ingestion import process_and_embed

logger = logging.getLogger(__name__)

def create_document_from_file(db: Session, bot_id: str, file: UploadFile, name: str) -> Document | None:
    logger.info(f"Processing file '{name}' for bot {bot_id}")
    # 1. Create Document record with status 'processing'
    # 2. Extract text content from file (handle different types: pdf, txt)
    # 3. If extraction fails, update status to 'error', return None
    # 4. Chunk the extracted text
    # 5. Create Chunk records in DB, linking to the Document
    # 6. Call agent.process_and_embed(chunks, bot_id, document_id)
    # 7. Update Document status to 'ready'
    # 8. Return the Document object
    pass # Replace with actual implementation

# Similar for create_document_from_text
```

### 4. Agent Module Integration

- Internal module calls to agent functions for AI tasks.
- Handles request formatting and response parsing.
- Implements robust error handling.

### 5. API Endpoints (`main.py`)

- Define routers and include them in the main app.
- Include specific paths for authentication endpoints.
- Ensure proper namespacing and versioning (e.g., `/api/v1/...`).

### 6. Authentication and Authorization

- Use FastAPI dependencies for JWT.
- Use dependencies in routers for permissions.

### 7. Middleware (`main.py`)

- Include FastAPI middleware (CORS, etc.).
- Add custom middleware for logging requests/responses or specific error handling if needed.

## Key Implementation Notes

- **Decoupling**: The core app logic never directly imports or calls code from the `agent` module beyond defined interfaces.
- **Asynchronous Operations**: Use async for calls to agent, especially for embedding, to avoid blocking.
- **Error Handling**: Implement robust error handling in both core and agent module.
- **Configuration**: Centralize configuration (API keys, URLs) in `.env` file, accessed by both core and agent.
- **Testing**: Write integration tests that mock agent calls using libraries like `respx` or `pytest-httpx`.