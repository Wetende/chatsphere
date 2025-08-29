"""
Application Layer - Use Cases and Orchestration

This layer contains the application-specific business logic and orchestrates 
domain entities to fulfill use cases. It acts as a bridge between the domain 
and the outside world.

Contains:
- Use Cases: Application-specific business flows
- Commands: Write operations with handlers (CQRS pattern)
- Queries: Read operations with handlers (CQRS pattern)  
- DTOs: Data Transfer Objects for external communication
- Application Services: Orchestration of domain services
- Interfaces: Port contracts for external dependencies
- Events: Application events and handlers

Key Principles:
- Orchestrates domain entities and services
- Contains application-specific business logic
- Uses repository interfaces from domain layer
- Returns DTOs, not domain entities
- Handles cross-cutting concerns (logging, validation)
- Manages transactions through Unit of Work pattern

CQRS Implementation:
- Commands: Handle state changes (create, update, delete)
- Queries: Handle data retrieval (read-only operations)
- Separation allows different optimization strategies
- Event-driven architecture support

Transaction Management:
- Use Unit of Work pattern for consistency
- Rollback on business rule violations  
- Atomic operations across multiple aggregates
"""
