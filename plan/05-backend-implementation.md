# ChatSphere Backend Implementation

This document outlines the detailed backend implementation strategy for the ChatSphere platform, focusing on creating a scalable, maintainable, and high-performance server-side architecture using FastAPI and SQLAlchemy. It also details the integration with an internal agent module for AI functionalities.

## Technology Stack

- **Framework**: FastAPI with async/await patterns
- **Authentication**: JWT with FastAPI dependencies
- **Task Queue**: FastAPI Background Tasks + Celery with Redis
- **Caching**: Redis for embeddings and responses
- **ORM**: Async SQLAlchemy 2.0 with PostgreSQL
- **HTTP Client**: httpx for external API calls
- **AI Integration**: Direct Google AI API integration (no frameworks)
- **Vector Storage**: Direct Pinecone API integration
- **Testing**: pytest with async support
- **Documentation**: OpenAPI/Swagger (built-in FastAPI)
- **Development**: Agentic patterns following Claude Code best practices
- **Code Quality**: Black, isort, mypy, ruff

## Project Structure

```
backend/
├── agent/                # Isolated AI/agent logic (extractable)
│   ├── agents/          # Agentic behavior patterns (e.g., rag_agent.py, conversation_agent.py)
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
├── requirements.txt      # Deps (e.g., fastapi, uvicorn, google-generativeai, pinecone-client, sqlalchemy, psycopg2, alembic)
└── .env                  # Env vars (e.g., DATABASE_URL=postgresql://user:pass@localhost/db)
```

## Application Components (FastAPI Backend)

### 1. User Management (`app/routers/auth_router.py`)

- **Models**: SQLAlchemy `User`, extended attributes in same model or related (with subscription status, Stripe ID etc.), `SubscriptionPlan`.
- **Schemas**: Pydantic models with proper validation for User, SubscriptionPlan. Handle registration with comprehensive validation.
- **Routers**: APIRouter with async endpoints, proper error handling, and status codes.
- **Authentication**: JWT with FastAPI dependencies using async patterns.
- **Authorization**: Custom async dependencies based on roles and permissions.

```python
# app/models/user.py
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from .base import Base
import uuid

class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String(500))
    features = Column(JSON, default=dict)
    stripe_price_id = Column(String(100), unique=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    is_staff = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    date_joined = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True))
    subscription_status = Column(String(20), default='free', nullable=False)
    subscription_plan_id = Column(UUID(as_uuid=True), ForeignKey('subscription_plans.id'))
    stripe_customer_id = Column(String(100), unique=True)
    
    # Relationships
    subscription_plan = relationship("SubscriptionPlan", back_populates="users")
    bots = relationship("Bot", back_populates="owner", cascade="all, delete-orphan")

# Add back_populates to SubscriptionPlan
SubscriptionPlan.users = relationship("User", back_populates="subscription_plan")
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
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_async_db
from app.schemas.bot import BotCreate, BotUpdate, BotResponse, BotList
from app.core.auth import get_current_user
from app.models.user import User
from app.services.bot_service import BotService

router = APIRouter(prefix="/bots", tags=["bots"])

@router.post("/", response_model=BotResponse, status_code=status.HTTP_201_CREATED)
async def create_bot(
    bot_data: BotCreate,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
) -> BotResponse:
    """Create a new chatbot"""
    bot_service = BotService(db)
    return await bot_service.create_bot(bot_data, current_user.id)

@router.get("/", response_model=BotList)
async def get_bots(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
) -> BotList:
    """Get user's bots with pagination"""
    bot_service = BotService(db)
    bots, total = await bot_service.get_user_bots(
        user_id=current_user.id,
        skip=skip,
        limit=limit
    )
    return BotList(bots=bots, total=total, skip=skip, limit=limit)

@router.get("/{bot_id}", response_model=BotResponse)
async def get_bot(
    bot_id: str,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
) -> BotResponse:
    """Get specific bot by ID"""
    bot_service = BotService(db)
    bot = await bot_service.get_bot_by_id(bot_id, current_user.id)
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    return bot

@router.put("/{bot_id}", response_model=BotResponse)
async def update_bot(
    bot_id: str,
    bot_update: BotUpdate,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
) -> BotResponse:
    """Update bot configuration"""
    bot_service = BotService(db)
    bot = await bot_service.update_bot(bot_id, bot_update, current_user.id)
    if not bot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
    return bot

@router.delete("/{bot_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_bot(
    bot_id: str,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
) -> None:
    """Delete a bot"""
    bot_service = BotService(db)
    success = await bot_service.delete_bot(bot_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bot not found"
        )
```

### 3. Pydantic Schemas with Validation (`app/schemas/`)

Following FastAPI best practices for data validation and serialization:

```python
# app/schemas/bot.py
from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class BotStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive" 
    TRAINING = "training"
    ERROR = "error"

class BotCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Bot name")
    description: Optional[str] = Field(None, max_length=500, description="Bot description")
    welcome_message: str = Field(
        default="Hi! How can I help you today?",
        max_length=200,
        description="Welcome message"
    )
    model_type: str = Field(
        default="gemini-2.0-flash-exp",
        regex="^(gemini-2.0-flash-exp|gemini-1.5-pro)$",
        description="AI model type"
    )
    temperature: float = Field(
        default=0.7,
        ge=0.0,
        le=2.0,
        description="Response randomness (0.0-2.0)"
    )
    
    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()

class BotResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    welcome_message: str
    model_type: str
    temperature: float
    is_public: bool
    status: BotStatus
    created_at: datetime
    updated_at: datetime
    owner_id: str
    
    class Config:
        from_attributes = True

class BotList(BaseModel):
    bots: List[BotResponse]
    total: int
    skip: int
    limit: int
```

### 4. Document Processing Service (`app/services/document_service.py`)

- Responsible for taking an uploaded file or text content.
- Extracts text (using libraries like `PyPDF2`, `python-magic` if needed).
- Chunks the text using custom chunking algorithms optimized for the specific content type.
- Creates the `Document` and `Chunk` records in the PostgreSQL database.
- Calls agent module for embedding.

```python
# app/core/database.py - Async Database Configuration
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from typing import AsyncGenerator
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost/chatsphere")

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=os.getenv("ENVIRONMENT") == "development",
    pool_pre_ping=True,
    pool_recycle=300
)

# Create async session maker
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_async_db() -> AsyncGenerator[AsyncSession, None]:
    """Async database dependency for FastAPI"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

# app/services/document_service.py - Async Document Processing
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.document import Document, Chunk
from agent.ingestion import process_and_embed
from fastapi import UploadFile, HTTPException, BackgroundTasks
from typing import Optional

logger = logging.getLogger(__name__)

class DocumentService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_document_from_file(
        self,
        bot_id: str,
        file: UploadFile,
        name: str,
        background_tasks: BackgroundTasks
    ) -> Document:
        """Create document from uploaded file with async processing"""
        
        # Validate file
        if file.size > 10 * 1024 * 1024:  # 10MB limit
            raise HTTPException(status_code=413, detail="File too large")
        
        # Create Document record with status 'processing'
        document = Document(
            bot_id=bot_id,
            name=name,
            file=file.filename,
            content_type=file.content_type,
            status="processing"
        )
        
        self.db.add(document)
        await self.db.commit()
        await self.db.refresh(document)
        
        # Process file in background
        background_tasks.add_task(
            self._process_document_async,
            document.id,
            file
        )
        
        return document
    
    async def _process_document_async(self, document_id: str, file: UploadFile):
        """Background task for document processing"""
        async with AsyncSessionLocal() as db:
            try:
                # Get document
                result = await db.execute(
                    select(Document).where(Document.id == document_id)
                )
                document = result.scalar_one_or_none()
                
                if not document:
                    return
                
                # Extract and process document
                content = await self._extract_text(file)
                chunks = await self._chunk_text(content)
                
                # Create Chunk records and process embeddings
                chunk_objects = []
                for i, chunk_text in enumerate(chunks):
                    chunk = Chunk(
                        document_id=document.id,
                        content=chunk_text,
                        chunk_index=i
                    )
                    chunk_objects.append(chunk)
                
                db.add_all(chunk_objects)
                await db.commit()
                
                # Process embeddings via agent
                await process_and_embed(chunks, document.bot_id, document.id)
                
                # Update status to ready
                document.status = "ready"
                await db.commit()
                
            except Exception as e:
                logger.error(f"Document processing failed: {e}")
                if document:
                    document.status = "error"
                    document.error_message = str(e)
                    await db.commit()
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