# Backend Architecture

This document provides a detailed overview of the ChatSphere backend architecture.

## Technology Stack

- **Framework**: Django 5.1.x
- **API**: Django REST Framework
- **Database**: PostgreSQL 13+
- **Authentication**: Django's built-in auth + JWT tokens
- **AI Integration**: OpenAI Python SDK
- **Task Queue**: Celery (planned for background processing)

## Directory Structure

```
backend/
├── config/                 # Project configuration
│   ├── __init__.py
│   ├── settings.py         # Django settings
│   ├── urls.py             # Main URL routing
│   ├── wsgi.py             # WSGI config
│   └── asgi.py             # ASGI config
├── chatsphere/             # Main application
│   ├── __init__.py
│   ├── admin.py            # Admin site configuration
│   ├── apps.py             # App configuration
│   ├── models.py           # Database models
│   ├── serializers.py      # DRF serializers
│   ├── urls.py             # API routing
│   ├── views.py            # API endpoints
│   ├── permissions.py      # Custom permissions
│   ├── ai/                 # AI integration modules
│   ├── utils/              # Utility functions
│   └── migrations/         # Database migrations
├── manage.py               # Django management script
├── requirements.txt        # Python dependencies
└── Dockerfile              # Container definition
```

## Core Components

### Models

The data model is built around these key entities:

1. **User & UserProfile**: User accounts and extended user information
2. **SubscriptionPlan**: Subscription tiers with different features
3. **Bot**: Chatbot configurations and properties
4. **Document**: Training materials for bots
5. **Chunk**: Document fragments with embeddings for retrieval
6. **Conversation**: User-bot conversations
7. **Message**: Individual messages within conversations

#### Entity Relationships

```
User 1──1 UserProfile
User 1──N Bot
Bot 1──N Document
Document 1──N Chunk
Bot 1──N Conversation
User 1──N Conversation
Conversation 1──N Message
```

### API Endpoints

The API follows REST principles with these main resource endpoints:

- `/api/users/`: User management
- `/api/profiles/`: User profiles
- `/api/subscription-plans/`: Subscription plans
- `/api/bots/`: Chatbot management
- `/api/documents/`: Training documents
- `/api/chunks/`: Document chunks and embeddings
- `/api/conversations/`: Conversation history
- `/api/messages/`: Individual messages

### Authentication & Permissions

- JWT-based authentication for API access
- Permission classes based on object ownership
- Subscription-based feature access control

### AI Integration

Interaction with AI models happens through the OpenAI SDK:

1. **Text Embedding**: Converts document chunks to vector embeddings for search
2. **Chat Completion**: Generates responses based on conversation context
3. **Context Management**: Maintains conversation history and state

### Data Processing Pipeline

For document training:
1. Document uploaded → 
2. Split into chunks → 
3. Process chunks (text extraction) → 
4. Generate embeddings → 
5. Store in database for retrieval

For chat interactions:
1. User message received → 
2. Relevant context retrieved → 
3. Context combined with conversation history → 
4. Sent to LLM → 
5. Response processed and stored → 
6. Delivered to user

## Configuration

The backend is configured primarily through environment variables:

- `DEBUG`: Development mode toggle
- `SECRET_KEY`: Django secret key
- `DATABASE_URL`: Database connection string
- `ALLOWED_HOSTS`: Allowed hostnames
- `CORS_ALLOWED_ORIGINS`: Origins allowed for CORS
- `OPENAI_API_KEY`: API key for OpenAI services

## Scalability Considerations

The backend is designed with scalability in mind:

- Stateless API design allows for horizontal scaling
- Database connection pooling for efficient resource usage
- Planned: Background task queue for long-running operations
- Planned: Caching layer for frequently accessed data

## Security Measures

- Input validation via serializers
- SQL injection protection via ORM
- CSRF protection for browser clients
- Authentication required for all sensitive endpoints
- Permissions enforcement based on ownership
- Environment-based secrets management

## Performance Optimization

- Database query optimization
- Efficient pagination for list endpoints
- Database indexes for frequently queried fields
- Planned: Caching for read-heavy endpoints
- Planned: Asynchronous processing for document handling 