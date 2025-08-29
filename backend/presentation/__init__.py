"""
Presentation Layer - External Interface

This is the outermost layer responsible for handling external communication
and user interface concerns. It translates between external requests and 
internal application use cases.

Contains:
- API Routers: FastAPI endpoint definitions
- WebSocket Handlers: Real-time communication
- Middleware: Cross-cutting HTTP concerns
- Serializers: Response formatting and transformation
- Validators: Request validation and sanitization
- Error Handlers: HTTP error response formatting

Key Principles:
- Handle HTTP-specific concerns only
- Delegate business logic to application layer
- Convert between HTTP and application DTOs
- Manage authentication and authorization
- Provide consistent error responses
- Support API versioning and documentation

FastAPI Integration:
- Async route handlers for scalability
- Automatic OpenAPI documentation
- Request/response validation with Pydantic
- Dependency injection for services
- Middleware for cross-cutting concerns
- WebSocket support for real-time features

API Design:
- RESTful resource-based endpoints
- Consistent response formats
- Proper HTTP status codes
- Pagination for collection endpoints
- Filtering and sorting support
- Rate limiting and throttling

Security Concerns:
- Input validation and sanitization
- Authentication token handling
- Authorization middleware
- CORS configuration
- Request size limits
- SQL injection prevention

Error Handling:
- Global exception handlers
- Consistent error response format
- Detailed validation error messages
- Logging of errors and requests
- User-friendly error messages
"""
