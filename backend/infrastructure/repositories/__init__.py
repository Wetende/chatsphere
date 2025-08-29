"""
Repository Implementations

Concrete implementations of repository interfaces using SQLAlchemy ORM.
Maps between domain entities and database models.

Key Responsibilities:
- Implement domain repository interfaces
- Handle ORM-specific operations and queries
- Map domain entities to/from database models
- Manage database connections and transactions
- Optimize queries for performance
- Handle database-specific error scenarios

Implementation Patterns:
- Async SQLAlchemy for non-blocking database operations
- Explicit mapping between domain and ORM models
- Query optimization with indexes and joins
- Proper exception handling and logging
- Connection pooling for scalability

Repository Classes:
- SqlAlchemyUserRepository: User persistence operations
- SqlAlchemyBotRepository: Bot management and queries
- SqlAlchemyConversationRepository: Conversation storage
- SqlAlchemyDocumentRepository: Document management
- SqlAlchemyMessageRepository: Message operations

Mapping Strategy:
- Domain entities remain pure (no ORM annotations)
- Separate ORM models in infrastructure layer
- Explicit mapping methods between domain and ORM
- Value object conversion in mapping layer
- Lazy loading configuration for performance

Transaction Management:
- Unit of Work pattern implementation
- Automatic rollback on exceptions
- Nested transaction support
- Distributed transaction handling
- Connection lifecycle management
"""
