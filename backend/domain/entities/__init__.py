"""
Domain Entities

Pure business entities that represent the core business concepts.
These are objects with identity that encapsulate business behavior and rules.

Key Characteristics:
- Have unique identity (ID)
- Contain business logic and invariants
- No framework dependencies
- No persistence concerns
- Rich behavior, not just data containers

Example Entities:
- User: Represents a platform user with authentication and profile management
- Bot: Represents a chatbot with configuration and behavior rules
- Conversation: Represents a chat session with messages and metadata
- Document: Represents training material with processing status
- Message: Represents a single chat interaction

Business Rules Examples:
- A User must have a unique email address
- A Bot cannot be deleted if it has active conversations
- A Conversation must belong to a valid Bot
- A Document must be validated before training begins
"""
