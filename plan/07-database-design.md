# ChatSphere Database Design

This document outlines the database design and data storage strategy for ChatSphere, focusing on scalability, performance, and data integrity.

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

```sql
-- User Accounts
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(150) UNIQUE NOT NULL, -- Standard Django User
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL, -- Handled by Django Auth
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    is_staff BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    date_joined TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    -- Add other Django User fields if needed
);

-- Extended User Profile
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_status VARCHAR(20) NOT NULL DEFAULT 'free', -- e.g., free, active, trialing
    subscription_plan_id UUID REFERENCES subscription_plans(id) ON DELETE SET NULL,
    stripe_customer_id VARCHAR(100) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Plans
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    features JSONB DEFAULT '{}', -- e.g., {"max_bots": 5, "max_docs_per_bot": 10}
    stripe_price_id VARCHAR(100) NULL -- For Stripe integration
);

-- (Consider tables for API Keys, Usage Limits if needed separately)
```

### 2. Chatbot Management (PostgreSQL)

```sql
-- Chatbots
CREATE TABLE bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    avatar VARCHAR(200) NULL, -- Path to avatar file
    welcome_message TEXT DEFAULT 'Hi! How can I help you today?',
    model_type VARCHAR(50) NOT NULL DEFAULT 'gemini-2.0-flash', -- e.g., gemini-2.0-flash
    configuration JSONB DEFAULT '{}', -- e.g., temperature, prompt instructions
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    -- Removed unique constraint on (user_id, name) unless required
);
CREATE INDEX idx_bots_user_id ON bots(user_id);

-- Documents (Training Sources)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file VARCHAR(200) NULL, -- Path to uploaded file
    url VARCHAR(2000) NULL,
    content_type VARCHAR(100) NOT NULL, -- e.g., application/pdf, text/plain
    status VARCHAR(20) NOT NULL DEFAULT 'processing', -- processing, ready, embedding, error
    error_message TEXT NULL,
    metadata JSONB DEFAULT '{}', -- e.g., original filename, source URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_documents_bot_id ON documents(bot_id);
CREATE INDEX idx_documents_status ON documents(status);

-- Document Chunks (Content only, embedding is in Pinecone)
CREATE TABLE chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    pinecone_vector_id VARCHAR(100) NULL, -- Populated after successful embedding via Agent Service. Potentially unique per document.
    metadata JSONB DEFAULT '{}', -- e.g., chunk index, position in doc
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_chunks_document_id ON chunks(document_id);
CREATE INDEX idx_chunks_pinecone_vector_id ON chunks(pinecone_vector_id);

-- Conversations
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NULL, -- Identifier for the end-user chatting (can be anonymous ID)
    title VARCHAR(255) DEFAULT 'New Conversation',
    metadata JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE NULL
);
CREATE INDEX idx_conversations_bot_id ON conversations(bot_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);

-- Messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    message_type VARCHAR(10) NOT NULL, -- USER, BOT, SYSTEM
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}', -- e.g., tokens used, latency, sources cited
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

### 3. Vector Store Schema (Pinecone)

Pinecone configuration happens in the Pinecone console and via the client initialization in the agent service.

- **Index Name**: Defined by `PINECONE_INDEX_NAME` (e.g., `chatsphere-embeddings`).
- **Dimension**: Must match the output dimension of the Google embedding model used (e.g., **768** for `models/embedding-001`).
- **Metric**: Typically `cosine` or `dotproduct`.
- **Metadata Indexing**: Configure Pinecone to index relevant metadata fields for filtering during search.

```python
# Example Metadata stored with each vector in Pinecone:
metadata_example = {
    "bot_id": "uuid-of-the-bot",
    "document_id": "uuid-of-the-document",
    "chunk_id": "uuid-of-the-chunk-in-postgres", # Useful for linking back
    # Add other filterable fields as needed, e.g.:
    # "user_id": "uuid-of-bot-owner", 
    # "created_at_unix": 1679306400 
}

# Example vector upsert structure (using pinecone-client):
# vectors_to_upsert = [
#    ("pinecone-vector-id-1", [0.1, 0.2, ...], {"bot_id": "...", "document_id": "...", "chunk_id": "..."}),
#    ("pinecone-vector-id-2", [0.3, 0.4, ...], {"bot_id": "...", "document_id": "...", "chunk_id": "..."}),
# ]
# index.upsert(vectors=vectors_to_upsert, namespace="optional-namespace") 
```

### 4. Analytics & Metrics (PostgreSQL)

```sql
-- Usage Analytics (Example: Track message counts per bot)
CREATE TABLE analytics_usage (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
    metric_type VARCHAR(50) NOT NULL, -- e.g., 'messages_processed', 'documents_embedded', 'api_calls'
    value INTEGER NOT NULL DEFAULT 1,
    metadata JSONB NULL -- e.g., {"user_id": "...", "conversation_id": "..."}
);
CREATE INDEX idx_analytics_usage_bot_id_timestamp ON analytics_usage(bot_id, timestamp);
CREATE INDEX idx_analytics_usage_metric_type_timestamp ON analytics_usage(metric_type, timestamp);

-- Conversation Quality Feedback (Example)
CREATE TABLE conversation_feedback (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    message_id UUID NULL REFERENCES messages(id) ON DELETE SET NULL, -- Optional: link to specific message
    rating SMALLINT NULL, -- e.g., 1-5 stars
    feedback_text TEXT NULL,
    user_id VARCHAR(255) NULL -- End-user identifier
);
CREATE INDEX idx_conv_feedback_conv_id ON conversation_feedback(conversation_id);

-- Training Source Usage (Example)
CREATE TABLE training_source_stats (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    retrieval_count INTEGER NOT NULL DEFAULT 0, -- Incremented when chunk is retrieved
    last_retrieved TIMESTAMPTZ NULL
);
CREATE INDEX idx_training_source_doc_id ON training_source_stats(document_id);

-- Error Tracking (Simplified)
CREATE TABLE error_logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    service VARCHAR(50) NOT NULL, -- e.g., 'backend', 'agent'
    error_type VARCHAR(100) NOT NULL,
    error_message TEXT NOT NULL,
    details JSONB NULL, -- e.g., stack trace, request info
    bot_id UUID NULL REFERENCES bots(id) ON DELETE SET NULL
);
CREATE INDEX idx_error_logs_timestamp ON error_logs(timestamp);
CREATE INDEX idx_error_logs_service ON error_logs(service);
CREATE INDEX idx_error_logs_error_type ON error_logs(error_type);
```

## Data Access Patterns

### 1. Query Optimization

- **Indexing**: Ensure appropriate indexes are created on foreign keys (`*_id` fields) and frequently queried columns (e.g., `status`, `timestamp`, `user_id`).
- **Pinecone Filtering**: Utilize Pinecone's metadata filtering capabilities during similarity search to retrieve context only for the relevant `bot_id`.
- **Caching**: Cache frequently accessed, rarely changing data (e.g., subscription plans, bot configurations) using Redis.
- **Materialized Views**: Consider for complex analytics queries that don't need real-time data (less likely needed initially).

```sql
-- Example query for retrieving messages for a conversation
SELECT * FROM messages 
WHERE conversation_id = 'uuid-of-conversation' 
ORDER BY created_at ASC;
-- Ensure idx_messages_conversation_id and idx_messages_created_at exist

-- Example Pinecone query structure (conceptual)
# query_vector = get_embedding("user query")
# results = index.query(
#   vector=query_vector,
#   top_k=5, 
#   include_metadata=True,
#   filter={"bot_id": "uuid-of-current-bot"},
#   namespace="optional-namespace"
# )
```

### 2. Data Integrity

- **Foreign Keys**: Use `ON DELETE CASCADE` or `ON DELETE SET NULL` appropriately to maintain referential integrity.
- **Constraints**: Use `NOT NULL` and `UNIQUE` constraints where applicable.
- **Transactions**: Wrap related database operations (e.g., creating Document and Chunk records) within atomic transactions in the Django backend.

### 3. Scalability Considerations

- **Connection Pooling**: Use a connection pooler like PgBouncer if database connections become a bottleneck.
- **Read Replicas**: Set up PostgreSQL read replicas for read-heavy workloads (e.g., analytics).
- **Database Sharding**: Complex, consider only if single-node PostgreSQL performance limits are reached (unlikely for most initial use cases).
- **Pinecone Scaling**: Pinecone scales independently. Choose the appropriate pod type and size based on expected vector count and query load.

## Data Migration Strategy

- **Initial Setup**: Use Django migrations (`manage.py makemigrations`, `manage.py migrate`) to create the PostgreSQL schema.
- **Schema Changes**: Continue using Django migrations for evolving the PostgreSQL schema.
- **Pinecone**: Schema (dimension, metric) is defined at index creation. Changes typically require creating a new index and re-embedding data.
- **Data Backfilling**: If significant schema changes occur or data needs reprocessing (e.g., changing embedding models), write custom Django management commands or scripts to handle the backfilling process.

## Backup and Recovery

- **PostgreSQL**: Implement regular backups (e.g., using `pg_dump` or managed database provider tools).
- **Pinecone**: Pinecone manages its own infrastructure resilience. Consider application-level strategies if you need point-in-time recovery of specific vectors (e.g., storing chunk content in Postgres allows re-embedding).
- **Disaster Recovery**: Plan for cross-region backups or failover depending on availability requirements.

## Security Measures

1. **Data Encryption**
   - Encryption at rest using PostgreSQL encryption
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