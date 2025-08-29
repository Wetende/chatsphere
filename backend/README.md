# ChatSphere Backend

A high-performance FastAPI backend for the ChatSphere AI-powered chatbot platform, built with **Onion Architecture** principles for maximum testability, maintainability, and separation of concerns.

## 🏗️ Onion Architecture Overview

This backend implements **Onion Architecture** (also known as **Hexagonal Architecture** or **Ports & Adapters**), where the domain logic is at the center and dependencies point inward:

- **🎯 Domain Layer** (Innermost) - Pure business logic, entities, and repository interfaces
- **🔄 Application Layer** - Use cases, application services, and DTOs
- **🔌 Infrastructure Layer** - External concerns (database, APIs, frameworks)
- **🌐 Presentation Layer** (Outermost) - HTTP/API layer with FastAPI routers

### Key Benefits:
- **Testability** - Domain logic is isolated and easily testable
- **Maintainability** - Clear separation of concerns and dependency inversion
- **Flexibility** - Easy to swap implementations (e.g., database, external APIs)
- **Scalability** - Clean architecture supports growth and refactoring

## 📁 Project Structure

```
backend/
├── domain/                    # 🎯 Core Business Logic (Innermost Layer)
│   ├── entities/             # Pure business objects (User, Bot, Conversation)
│   ├── value_objects/        # Immutable value types (Email, UserId)
│   └── repositories/         # Repository interfaces (contracts)
├── application/              # 🔄 Use Cases & Application Logic
│   ├── use_cases/           # Business use cases (CreateUser, etc.)
│   └── dtos/                # Data Transfer Objects (request/response models)
├── infrastructure/          # 🔌 External Concerns (Database, APIs)
│   └── repositories/        # Repository implementations (SQLAlchemy)
├── presentation/            # 🌐 HTTP/API Layer (Outermost Layer)
│   └── api/                # FastAPI routers and HTTP concerns
├── composition_root.py      # 🔧 Dependency Injection Container
├── main.py                 # 🚀 FastAPI Application Entry Point
├── alembic.ini            # Database migration configuration
├── requirements.txt       # Python dependencies
├── ONION_ARCHITECTURE_SUMMARY.md # Architecture documentation
└── documents/             # Uploaded user documents storage
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
# Run all tests (organized by layer)
pytest

# Run tests by layer
pytest domain/tests/        # Domain layer tests (entities, value objects)
pytest application/tests/   # Application layer tests (use cases, DTOs)
pytest infrastructure/tests/ # Infrastructure layer tests (repositories)
pytest presentation/tests/   # Presentation layer tests (routers)

# Run with coverage
pytest --cov=domain --cov=application --cov=infrastructure --cov=presentation

# Run specific test module
pytest domain/tests/test_entities.py
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
- Model selection and parameters in `infrastructure/config/`
- Embedding model configuration (Infrastructure layer)
- Vector database settings (Infrastructure layer)
- Rate limiting and timeout settings (Application/Infrastructure layers)

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