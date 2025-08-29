"""
FastAPI Routers - HTTP Endpoint Definitions

RESTful API endpoints that handle HTTP requests and responses.
Translates between HTTP protocol and application use cases.

Key Responsibilities:
- Define HTTP endpoints with proper methods and paths
- Handle request validation and response serialization
- Manage authentication and authorization
- Provide OpenAPI documentation
- Convert between HTTP DTOs and application DTOs
- Implement proper error handling and status codes

Router Categories:

Authentication Routers:
- /auth/register: User registration
- /auth/login: User authentication  
- /auth/refresh: Token refresh
- /auth/logout: Session termination
- /auth/verify: Email verification

User Management Routers:
- /users: User profile operations
- /users/{id}: Individual user operations
- /users/me: Current user profile
- /users/settings: User preferences

Bot Management Routers:
- /bots: Bot CRUD operations
- /bots/{id}/train: Bot training
- /bots/{id}/config: Bot configuration
- /bots/{id}/status: Bot status monitoring

Conversation Routers:
- /conversations: Chat session management
- /conversations/{id}/messages: Message operations
- /chat: Real-time chat endpoint
- /chat/stream: WebSocket streaming

Document Routers:
- /documents: Document upload and management
- /documents/{id}/status: Processing status
- /documents/{id}/chunks: Content chunks

Common Patterns:
- Dependency injection for use cases
- Request/response DTO validation
- Error handling with proper HTTP codes
- Pagination for collection endpoints
- Filtering and sorting parameters
"""
