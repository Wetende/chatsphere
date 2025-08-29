"""
Data Transfer Objects (DTOs)

DTOs are simple data containers used to transfer data between application layers.
They provide a stable interface for external communication and decouple the 
domain model from external representations.

Key Characteristics:
- Simple data containers (no business logic)
- Validation attributes for input DTOs
- Serialization-friendly (JSON, etc.)
- Version-stable contracts
- Clear separation of request/response DTOs
- Framework-agnostic data structures

DTO Categories:

Request DTOs:
- Input validation and sanitization
- Required field enforcement  
- Format validation (email, phone, etc.)
- Business rule constraints
- Type conversion and parsing

Response DTOs:
- Consistent output format
- Selective field exposure
- Computed field inclusion
- Pagination metadata
- Error details and codes

Event DTOs:
- Inter-service communication
- Message queue payloads
- Audit event data
- Notification content

Naming Conventions:
- *RequestDTO: Input data for operations
- *ResponseDTO: Output data from operations  
- *ListDTO: Collection responses with metadata
- *EventDTO: Event data for messaging

Benefits:
- Stable API contracts
- Input validation centralization
- Reduced coupling between layers
- Easy testing with known data structures
- Clear documentation of expected data
"""
