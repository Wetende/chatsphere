# ChatSphere Database Design

This document outlines the database design and data storage strategy for ChatSphere, focusing on scalability, performance, and data integrity.

## Technology Stack

- **Primary Database**: PostgreSQL 15+
- **Vector Store**: Pinecone
- **Cache Layer**: Redis
- **Search Engine**: Elasticsearch
- **Message Queue**: Redis (for Celery)
- **Session Store**: Redis

## Database Architecture

### Overview

```
databases/
├── postgresql/           # Primary relational database
│   ├── users/           # User-related schemas
│   ├── chatbots/        # Chatbot configurations
│   ├── training/        # Training data
│   └── analytics/       # Usage and metrics
├── pinecone/            # Vector embeddings
├── elasticsearch/       # Full-text search
└── redis/              # Caching and queues
```

## Schema Design

### 1. User Management

```sql
-- User Account Management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    company_name VARCHAR(200),
    subscription_tier VARCHAR(50) NOT NULL,
    api_key VARCHAR(100) UNIQUE NOT NULL,
    usage_limit INTEGER DEFAULT 1000,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_api_key ON users(api_key);

-- User Subscription Management
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    plan_name VARCHAR(50) NOT NULL,
    price_id VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- API Usage Tracking
CREATE TABLE api_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    endpoint VARCHAR(255) NOT NULL,
    tokens_used INTEGER NOT NULL,
    response_time INTEGER NOT NULL, -- in milliseconds
    status_code INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_usage_user_id_timestamp ON api_usage(user_id, timestamp);
```

### 2. Chatbot Management

```sql
-- Chatbot Configuration
CREATE TABLE chatbots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    language VARCHAR(10) DEFAULT 'en',
    model_config JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_name_per_user UNIQUE (user_id, name)
);

CREATE INDEX idx_chatbots_user_id ON chatbots(user_id);
CREATE INDEX idx_chatbots_is_active ON chatbots(is_active);

-- Training Sources
CREATE TABLE training_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id),
    source_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending',
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_sources_chatbot_id ON training_sources(chatbot_id);
CREATE INDEX idx_training_sources_status ON training_sources(status);

-- Chat Sessions
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id),
    user_identifier VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_session_user UNIQUE (chatbot_id, user_identifier, started_at)
);

CREATE INDEX idx_chat_sessions_chatbot_id ON chat_sessions(chatbot_id);

-- Chat Messages
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tokens_used INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);
```

### 3. Vector Store Schema (Pinecone)

```python
# Vector store schema definition
vector_schema = {
    "dimension": 1536,  # OpenAI ada-002 embedding size
    "metadata_config": {
        "indexed": [
            {"name": "chatbot_id", "type": "string"},
            {"name": "source_id", "type": "string"},
            {"name": "chunk_index", "type": "integer"},
            {"name": "language", "type": "string"}
        ]
    }
}

# Example vector record
vector_record = {
    "id": "vec_123",
    "values": [...],  # 1536-dimensional vector
    "metadata": {
        "chatbot_id": "chat_abc",
        "source_id": "src_xyz",
        "chunk_index": 1,
        "language": "en",
        "content": "Text chunk content",
        "created_at": "2024-03-20T10:00:00Z"
    }
}
```

### 4. Analytics & Metrics

```sql
-- Usage Analytics
CREATE TABLE analytics_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id),
    metric_type VARCHAR(50) NOT NULL,
    value INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_usage_chatbot_id_timestamp 
ON analytics_usage(chatbot_id, timestamp);

-- Performance Metrics
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id),
    metric_name VARCHAR(100) NOT NULL,
    value FLOAT NOT NULL,
    labels JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_performance_metrics_chatbot_id_timestamp 
ON performance_metrics(chatbot_id, timestamp);

-- Error Tracking
CREATE TABLE error_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chatbot_id UUID REFERENCES chatbots(id),
    error_type VARCHAR(100) NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_error_logs_chatbot_id_created_at 
ON error_logs(chatbot_id, created_at);
```

## Data Access Patterns

### 1. Query Optimization

```sql
-- Commonly used queries with optimized indexes

-- Get user's active chatbots with usage metrics
CREATE MATERIALIZED VIEW user_chatbot_metrics AS
SELECT 
    c.id AS chatbot_id,
    c.name,
    c.user_id,
    COUNT(DISTINCT cs.id) AS total_sessions,
    COUNT(cm.id) AS total_messages,
    SUM(cm.tokens_used) AS total_tokens
FROM chatbots c
LEFT JOIN chat_sessions cs ON c.id = cs.chatbot_id
LEFT JOIN chat_messages cm ON cs.id = cm.session_id
WHERE c.is_active = true
GROUP BY c.id, c.name, c.user_id;

-- Refresh materialized view
CREATE OR REPLACE FUNCTION refresh_user_chatbot_metrics()
RETURNS trigger AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_chatbot_metrics;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh metrics
CREATE TRIGGER refresh_metrics_trigger
AFTER INSERT OR UPDATE OR DELETE ON chat_messages
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_user_chatbot_metrics();
```

### 2. Partitioning Strategy

```sql
-- Partition chat messages by month
CREATE TABLE chat_messages_partitioned (
    id UUID NOT NULL,
    session_id UUID NOT NULL,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tokens_used INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE chat_messages_y2024m01 PARTITION OF chat_messages_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE chat_messages_y2024m02 PARTITION OF chat_messages_partitioned
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Function to create future partitions
CREATE OR REPLACE FUNCTION create_message_partition(
    start_date DATE
)
RETURNS void AS $$
DECLARE
    partition_name TEXT;
    start_timestamp TIMESTAMP;
    end_timestamp TIMESTAMP;
BEGIN
    partition_name := 'chat_messages_y' || 
                     TO_CHAR(start_date, 'YYYY') ||
                     'm' || TO_CHAR(start_date, 'MM');
    start_timestamp := start_date::TIMESTAMP;
    end_timestamp := (start_date + INTERVAL '1 month')::TIMESTAMP;
    
    EXECUTE format(
        'CREATE TABLE IF NOT EXISTS %I PARTITION OF chat_messages_partitioned
         FOR VALUES FROM (%L) TO (%L)',
        partition_name,
        start_timestamp,
        end_timestamp
    );
END;
$$ LANGUAGE plpgsql;
```

## Caching Strategy

### 1. Redis Cache Configuration

```python
# cache_config.py
REDIS_CONFIG = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://localhost:6379/0',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'RETRY_ON_TIMEOUT': True,
            'MAX_CONNECTIONS': 1000,
            'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
            'SERIALIZER': 'django_redis.serializers.json.JSONSerializer',
        }
    }
}

CACHE_TTL = {
    'chatbot_config': 3600,        # 1 hour
    'user_profile': 1800,          # 30 minutes
    'session_data': 7200,          # 2 hours
    'api_response': 300,           # 5 minutes
    'analytics_dashboard': 600,     # 10 minutes
}
```

### 2. Cache Invalidation

```python
# cache_invalidation.py
from django.core.cache import cache
from typing import List

class CacheInvalidator:
    @staticmethod
    def invalidate_chatbot_cache(chatbot_id: str):
        keys_to_delete = [
            f'chatbot:{chatbot_id}:config',
            f'chatbot:{chatbot_id}:metrics',
            f'chatbot:{chatbot_id}:sessions'
        ]
        cache.delete_many(keys_to_delete)
    
    @staticmethod
    def invalidate_user_cache(user_id: str):
        keys_to_delete = [
            f'user:{user_id}:profile',
            f'user:{user_id}:chatbots',
            f'user:{user_id}:usage'
        ]
        cache.delete_many(keys_to_delete)
```

## Data Migration Strategy

### 1. Migration Scripts

```python
# migrations/0001_initial.py
from django.db import migrations

class Migration(migrations.Migration):
    dependencies = []
    
    operations = [
        migrations.RunSQL(
            # Forward migration
            """
            -- Create extensions
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE EXTENSION IF NOT EXISTS "pg_trgm";
            
            -- Enable row level security
            ALTER TABLE users ENABLE ROW LEVEL SECURITY;
            ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;
            
            -- Create RLS policies
            CREATE POLICY user_isolation_policy ON users
                FOR ALL
                TO authenticated_users
                USING (id = current_user_id());
                
            CREATE POLICY chatbot_isolation_policy ON chatbots
                FOR ALL
                TO authenticated_users
                USING (user_id = current_user_id());
            """,
            
            # Rollback
            """
            DROP POLICY IF EXISTS chatbot_isolation_policy ON chatbots;
            DROP POLICY IF EXISTS user_isolation_policy ON users;
            ALTER TABLE chatbots DISABLE ROW LEVEL SECURITY;
            ALTER TABLE users DISABLE ROW LEVEL SECURITY;
            """
        )
    ]
```

## Backup and Recovery

### 1. Backup Strategy

```bash
# backup_script.sh
#!/bin/bash

# PostgreSQL backup
pg_dump -Fc -f "/backups/postgres/chatsphere_$(date +%Y%m%d).dump" chatsphere_db

# Redis backup
redis-cli SAVE
cp /var/lib/redis/dump.rdb "/backups/redis/redis_$(date +%Y%m%d).rdb"

# Vector store backup (Pinecone API)
python manage.py backup_vectors --output="/backups/vectors/vectors_$(date +%Y%m%d).json"
```

### 2. Recovery Procedures

```python
# recovery.py
from typing import Optional
import subprocess
from datetime import datetime

class DatabaseRecovery:
    @staticmethod
    def restore_postgres(backup_date: Optional[datetime] = None):
        if backup_date is None:
            # Get latest backup
            backup_file = subprocess.check_output(
                "ls -t /backups/postgres/*.dump | head -1",
                shell=True
            ).decode().strip()
        else:
            backup_file = f"/backups/postgres/chatsphere_{backup_date:%Y%m%d}.dump"
            
        subprocess.run([
            "pg_restore",
            "-d", "chatsphere_db",
            "-c",  # Clean (drop) database objects before recreating
            backup_file
        ])
```

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