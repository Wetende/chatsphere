# ChatSphere Backend

A high-performance FastAPI backend for the ChatSphere AI-powered chatbot platform, designed with clean architecture principles and separation of concerns.

## 🏗️ Architecture Overview

This backend follows a modular architecture that separates core application logic from AI/agent-specific functionality:

- **`app/`** - Core application logic (authentication, user management, bot management, conversations)
- **`agent/`** - Isolated AI/agent logic (LLM integrations, embeddings, retrieval, chains)
- **Clean separation** - AI components can be extracted as microservices if needed
- **PostgreSQL** - Primary database for application data
- **Pinecone** - Vector database for embeddings and semantic search
- **FastAPI** - Modern, fast web framework with automatic API documentation

## 📁 Project Structure

```
backend/
├── agent/                # Isolated AI/agent logic (extractable)
│   ├── chains/          # Chat/RAG pipelines (direct API integration; no LangChain)
│   ├── generation/      # LLM generation logic and factories
│   ├── ingestion/       # Document processing, chunking, embedding
│   ├── models/          # Pydantic models for AI requests/responses
│   ├── retrieval/       # Vector retrieval (Pinecone, local vectors)
│   ├── routing/         # AI-specific FastAPI routers
│   ├── tools/           # Custom AI tools (SQL, web search, etc.)
│   ├── tests/           # AI component tests
│   ├── config.py        # AI configurations (API keys, model settings)
│   └── main.py          # Optional standalone agent entry point
├── app/                 # Core application logic
│   ├── core/           # Shared utilities and dependencies
│   │   ├── database.py  # SQLAlchemy session management
│   │   ├── dependencies.py # FastAPI dependencies
│   │   └── lifespan.py  # App lifecycle management
│   ├── models/         # SQLAlchemy ORM models
│   │   ├── user.py     # User model
│   │   ├── bot.py      # Bot model
│   │   └── conversation.py # Conversation models
│   ├── routers/        # FastAPI routers for API endpoints
│   │   ├── auth_router.py    # Authentication endpoints
│   │   ├── bots_router.py    # Bot management endpoints
│   │   └── conversations_router.py # Conversation endpoints
│   ├── schemas/        # Pydantic schemas for request/response validation
│   ├── services/       # Business logic layer
│   │   ├── bot_service.py    # Bot business logic
│   │   └── user_service.py   # User business logic
│   ├── utils/          # Utility functions
│   │   ├── auth_utils.py     # Authentication utilities
│   │   └── error_handlers.py # Error handling
│   ├── tests/          # Core application tests
│   └── config.py       # App configurations
├── database/           # Database-specific files
│   ├── init.sql        # Initial DB setup (pgvector extension)
│   └── schema.sql      # Optional schema definitions
├── migrations/         # Alembic database migrations
│   ├── versions/       # Migration files
│   ├── env.py         # Alembic environment config
│   └── script.py.mako # Migration template
├── documents/          # Uploaded user documents storage
├── main.py            # Main FastAPI application entry point
├── alembic.ini        # Alembic configuration
├── requirements.txt   # Python dependencies
└── .env              # Environment variables
```

## 🚀 Tech Stack

### Core Framework
- **FastAPI** - Modern, fast web framework with automatic OpenAPI docs
- **Python 3.10+** - Latest Python features and performance improvements
- **Uvicorn** - Lightning-fast ASGI server

### Database & ORM
- **PostgreSQL** - Robust relational database
- **pgvector** - Vector similarity search extension
- **SQLAlchemy 2.0** - Modern Python ORM with async support
- **Alembic** - Database migration tool

### AI & Machine Learning
Note: We intentionally avoid orchestration frameworks like LangChain. All AI is integrated via direct API calls for simplicity, control, and performance.
- **Google Gemini** - Advanced language model for chat generation
- **Pinecone** - Vector database for semantic search
- **Sentence Transformers** - Text embedding models

### Authentication & Security
- **JWT** - JSON Web Tokens for stateless authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Rate limiting** - API protection

### Development & Testing
- **pytest** - Testing framework
- **Black** - Code formatting
- **isort** - Import sorting
- **mypy** - Static type checking

## 🌟 Key Features

### Core Application Features
- **User Management** - Registration, authentication, profile management
- **Bot Creation & Management** - Create, configure, and deploy chatbots
- **Multi-source Training** - Train bots on PDFs, websites, text files
- **Conversation Management** - Track and manage chat conversations
- **Analytics** - Usage tracking and performance metrics
- **Permissions** - Role-based access control

### AI Agent Features
- **Document Ingestion** - Parse and chunk various document formats
- **Vector Embeddings** - Convert text to searchable vectors
- **Semantic Search** - Find relevant information using vector similarity
- **RAG (Retrieval-Augmented Generation)** - Combine search with generation
- **Multi-model Support** - Support for various LLM providers
- **Custom Tools** - Extensible tool system for specialized tasks

### API Features
- **RESTful API** - Clean, consistent API design
- **Auto-generated Documentation** - Swagger/OpenAPI docs
- **Request Validation** - Automatic request/response validation
- **Error Handling** - Comprehensive error responses
- **Rate Limiting** - Protect against abuse
- **CORS Support** - Frontend integration

## 🛠️ Development Setup

### Prerequisites
- Python 3.10+
- PostgreSQL 14+ with pgvector extension
- Virtual environment tool (venv/conda)

### Installation

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   # Run initial database setup
   psql -U postgres -f database/init.sql
   
   # Run migrations
   alembic upgrade head
   ```

5. **Start Development Server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov=agent

# Run specific test module
pytest app/tests/test_routers.py
```

## 📦 Deployment

### Production Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost/chatsphere
SECRET_KEY=your-secret-key
GOOGLE_API_KEY=your-google-api-key
PINECONE_API_KEY=your-pinecone-api-key
ENVIRONMENT=production
```

### Docker Deployment
```bash
# Build image
docker build -t chatsphere-backend .

# Run container
docker run -p 8000:8000 chatsphere-backend
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT signing key
- `GOOGLE_API_KEY` - Google Gemini API key
- `PINECONE_API_KEY` - Pinecone vector database key
- `ENVIRONMENT` - deployment environment (development/production)

### AI Configuration
- Model selection and parameters in `agent/config.py`
- Embedding model configuration
- Vector database settings
- Rate limiting and timeout settings

## 📈 Performance Considerations

- **Async/Await** - Non-blocking I/O operations
- **Connection Pooling** - Efficient database connections
- **Caching** - Redis for session and query caching
- **Vector Indexing** - Optimized similarity search
- **Background Tasks** - Async document processing

## 🔒 Security Features

- **JWT Authentication** - Stateless token-based auth
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Pydantic schema validation
- **SQL Injection Protection** - ORM-based queries
- **CORS Configuration** - Controlled cross-origin access
- **Rate Limiting** - API abuse prevention

## 🤝 Contributing

1. Follow the established directory structure
2. Write tests for new features
3. Use type hints throughout
4. Follow PEP 8 style guidelines
5. Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 