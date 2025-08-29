"""
Domain Value Objects

Immutable objects that describe characteristics of entities without identity.
Value objects encapsulate validation logic and ensure data integrity.

Key Characteristics:
- Immutable once created
- No identity (compared by value, not ID)
- Contain validation logic
- Can be safely shared between entities
- Should be small and focused

Examples:
- UserId: Unique identifier for users with validation
- Email: Email address with format validation
- Username: Username with length and character validation
- BotId: Unique identifier for bots
- ConversationId: Unique identifier for conversations
- DocumentId: Unique identifier for documents

Validation Rules:
- Email: Must be valid email format, normalized to lowercase
- Username: 3-50 chars, alphanumeric with underscores/hyphens only
- IDs: Must be valid UUIDs or follow specific format rules

Benefits:
- Centralized validation
- Type safety
- Self-documenting code
- Prevents primitive obsession
- Ensures consistent data format
"""
