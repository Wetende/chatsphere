**Status:** Design ready for implementation - nothing implemented yet 

# KyroChat Database Design

This document outlines the database design and data storage strategy for KyroChat, focusing on scalability, performance, and data integrity.

## Technology Stack

- **Primary Database**: PostgreSQL 15+ (for core application data)
- **Vector Store**: Pinecone (for embeddings and similarity search)
- **Cache Layer**: Redis (optional, for caching frequent queries)
- **Search Engine**: Elasticsearch (optional, for advanced text search beyond vector similarity)
- **Message Queue**: Redis (for Celery background tasks, e.g., document processing coordination)
- **Session Store**: Redis or Database (depending on scale)

## Database Architecture

### Overview

- **PostgreSQL**: Stores relational data like users, chatbot configurations, training source metadata, conversation history, and analytics.
- **Pinecone**: Stores the vector embeddings generated from training data chunks. Each vector is associated with metadata linking it back to the chatbot, document, and chunk in PostgreSQL.
- **Redis**: Used for caching API responses, user sessions, and potentially as a Celery message broker.
- **Elasticsearch**: Can be added later if complex keyword search, filtering, or aggregations on text content are required beyond vector similarity.

```
data_stores/
├── postgresql/           # Primary relational database
│   ├── users/           # User accounts, profiles, subscriptions
│   ├── chatbots/        # Bot definitions, configurations
│   ├── documents/       # Document metadata, chunk text (content)
│   ├── conversations/   # Session info, messages
│   └── analytics/       # Usage stats, error logs
├── pinecone/            # Vector embeddings store
│   └── chatbot_embeddings/ # Namespace/Index for vectors
├── redis/              # Caching, Session store, Celery Broker
└── elasticsearch/       # Optional: Full-text search indexing
```

## Schema Design

### 1. User Management (PostgreSQL)

```python
# app/models/user.py - FastAPI + AsyncSQLAlchemy Models
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
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
    is_active = Column(Boolean, default=True, nullable=False)
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
    
    # Async SQLAlchemy relationships
    subscription_plan = relationship("SubscriptionPlan", back_populates="users")
    bots = relationship("Bot", back_populates="owner", cascade="all, delete-orphan")

# Add back_populates to SubscriptionPlan
SubscriptionPlan.users = relationship("User", back_populates="subscription_plan")
```

### 2. Chatbot Management (PostgreSQL)

```python
# app/models/bot.py - FastAPI + AsyncSQLAlchemy Models
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from .base import Base
import uuid

class Bot(Base):
    __tablename__ = "bots"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    avatar = Column(String(255))
    welcome_message = Column(String(200), default='Hi! How can I help you today?', nullable=False)
    model_type = Column(String(50), default='gemini-2.0-flash-exp', nullable=False)
    temperature = Column(Float, default=0.7, nullable=False)
    system_prompt = Column(String(1000))
    is_public = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    status = Column(String(20), default='active', nullable=False)  # active, inactive, training, error
    configuration = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Async SQLAlchemy relationships
    owner = relationship("User", back_populates="bots")
    documents = relationship("Document", back_populates="bot", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="bot", cascade="all, delete-orphan")

class Document(Base):
    __tablename__ = "documents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=func.uuid_generate_v4())
    bot_id = Column(UUID(as_uuid=True), ForeignKey('bots.id'), nullable=False)
    name = Column(String(255), nullable=False)
    file = Column(String(200))
    url = Column(String(2000))
    content_type = Column(String(100), nullable=False)
    status = Column(String(20), default='processing', nullable=False)
    error_message = Column(String)
    metadata = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
    bot = relationship("Bot", back_populates="documents")

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=func.uuid_generate_v4())
    document_id = Column(UUID(as_uuid=True), ForeignKey('documents.id'), nullable=False)
    content = Column(String, nullable=False)
    pinecone_vector_id = Column(String(100))
    metadata = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), default=func.now())
    document = relationship("Document", back_populates="chunks")

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=func.uuid_generate_v4())
    bot_id = Column(UUID(as_uuid=True), ForeignKey('bots.id'), nullable=False)
    user_id = Column(String(255))
    title = Column(String(255), default='New Conversation')
    metadata = Column(JSON, default=dict)
    started_at = Column(DateTime(timezone=True), default=func.now())
    ended_at = Column(DateTime(timezone=True))
    bot = relationship("Bot", back_populates="conversations")

class Message(Base):
    __tablename__ = "messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=func.uuid_generate_v4())
    conversation_id = Column(UUID(as_uuid=True), ForeignKey('conversations.id'), nullable=False)
    message_type = Column(String(10), nullable=False)
    content = Column(String, nullable=False)
    metadata = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), default=func.now())
    conversation = relationship("Conversation", back_populates="messages")
```

### 3. Vector Store Schema (Pinecone)

Pinecone configuration happens in the Pinecone console and via the client initialization in the agent module.

- **Index Name**: Defined by `PINECONE_INDEX_NAME` (e.g., `kyrochat-embeddings`).
- **Dimension**: Must match the output dimension of the Google embedding model used (e.g., **768** for `models/embedding-001`).
- **Metric**: Typically `cosine` or `dotproduct`.
- **Metadata Indexing**: Configure Pinecone to index relevant metadata fields for filtering during search.

```python
# Example Metadata stored with each vector in Pinecone:
metadata_example = {
    "bot_id": "uuid-of-the-bot",
    "document_id": "uuid-of-the-document",
    "chunk_id": "uuid-of-the-chunk-in-postgres",
}
```

### 4. Analytics & Metrics (PostgreSQL)

```python
# app/models/analytics.py
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from .base import Base

class AnalyticsUsage(Base):
    __tablename__ = "analytics_usage"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    bot_id = Column(UUID(as_uuid=True), ForeignKey('bots.id'))
    metric_type = Column(String(50), nullable=False)
    value = Column(Integer, default=1, nullable=False)
    metadata = Column(JSON)

class ConversationFeedback(Base):
    __tablename__ = "conversation_feedback"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey('conversations.id'), nullable=False)
    message_id = Column(UUID(as_uuid=True), ForeignKey('messages.id'))
    rating = Column(Integer)
    feedback_text = Column(String)
    user_id = Column(String(255))

class TrainingSourceStats(Base):
    __tablename__ = "training_source_stats"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    document_id = Column(UUID(as_uuid=True), ForeignKey('documents.id'), nullable=False)
    retrieval_count = Column(Integer, default=0, nullable=False)
    last_retrieved = Column(DateTime(timezone=True))

class ErrorLog(Base):
    __tablename__ = "error_logs"
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    service = Column(String(50), nullable=False)
    error_type = Column(String(100), nullable=False)
    error_message = Column(String, nullable=False)
    details = Column(JSON)
    bot_id = Column(UUID(as_uuid=True), ForeignKey('bots.id'))
```

## Data Access Patterns

### 1. Query Optimization

- **Indexing**: Ensure appropriate indexes on foreign keys and queried columns.
- **Pinecone Filtering**: Use metadata filtering during similarity search.
- **Caching**: Cache frequently accessed data using Redis.
- **Materialized Views**: For complex analytics.

### 2. Data Integrity

- **Foreign Keys**: Use appropriate delete behaviors.
- **Constraints**: NOT NULL, UNIQUE where applicable.
- **Transactions**: Use atomic transactions for related operations.

### 3. Scalability Considerations

- **Connection Pooling**: Use a connection pooler like PgBouncer.
- **Read Replicas**: For read-heavy workloads.
- **Database Sharding**: If needed later.
- **Pinecone Scaling**: Choose appropriate pod type.

## Data Migration Strategy

- **Initial Setup**: Use Alembic migrations to create the PostgreSQL schema.
- **Schema Changes**: Use Alembic for evolving the schema.
- **Pinecone**: Changes require new index and re-embedding.
- **Data Backfilling**: Use custom scripts for reprocessing.

## Backup and Recovery

- **PostgreSQL**: Regular backups using pg_dump.
- **Pinecone**: Application-level re-embedding if needed.
- **Disaster Recovery**: Cross-region backups.

## Security Measures

1. **Data Encryption**
   - At rest using PostgreSQL encryption
   - TLS for data in transit
   - API key encryption

2. **Access Control**
   - Row-level security policies
   - Role-based access control
   - Object-level permissions

3. **Audit Logging**
   - Database activity monitoring
   - Access logs
   - Change tracking

## Performance Optimization

1. **Query Optimization**
   - Proper indexing
   - Materialized views
   - Query planning

2. **Connection Pooling**
   - PgBouncer configuration
   - Connection limits
   - Timeout settings

3. **Caching Strategy**
   - Multi-level caching
   - Cache invalidation
   - Cache warming

## Monitoring and Maintenance

1. **Health Checks**
   - Database connectivity
   - Replication lag
   - Cache hit rates

2. **Performance Metrics**
   - Query performance
   - Resource utilization
   - Cache efficiency

3. **Maintenance Tasks**
   - Index maintenance
   - Vacuum operations
   - Statistics updates

## Next Steps

For details on how this database design supports our testing strategy and quality assurance processes, refer to the [Testing Strategy](./08-testing-strategy.md) document. 