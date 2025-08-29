"""
Domain Repository Interfaces

Contracts that define how domain entities are persisted and retrieved.
These are interfaces only - implementations live in the infrastructure layer.

Key Principles:
- Define what operations are needed, not how they're implemented
- Domain-focused method names (not database-focused)
- Return domain entities, not database models
- Use domain value objects in method signatures
- Async-first for scalability
- Clear error handling contracts

Repository Pattern Benefits:
- Decouples domain from persistence concerns
- Enables easy testing with mock implementations
- Allows switching data stores without changing domain logic
- Provides consistent interface for data access
- Supports unit of work pattern

Example Repositories:
- IUserRepository: User persistence and retrieval
- IBotRepository: Bot management and queries
- IConversationRepository: Conversation storage and history
- IDocumentRepository: Training document management
- IMessageRepository: Message storage and retrieval

Common Operations:
- get_by_id(): Retrieve entity by identifier
- save(): Persist entity (create or update)
- delete(): Remove entity
- find_by_*(): Query entities by criteria
- exists(): Check entity existence
"""
