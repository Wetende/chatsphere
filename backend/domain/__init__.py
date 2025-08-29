"""
Domain Layer - The Heart of Onion Architecture

This is the innermost layer containing the core business logic and rules.
It should have no dependencies on external frameworks or infrastructure concerns.

Contains:
- Entities: Core business objects with identity
- Value Objects: Immutable objects that describe characteristics
- Domain Services: Business logic that doesn't belong to a single entity
- Repository Interfaces: Contracts for data access (implemented in infrastructure)
- Domain Events: Events that represent business occurrences
- Specifications: Business rule implementations

Key Principles:
- No dependencies on outer layers
- Pure business logic only
- Framework-agnostic
- Database-agnostic
- Infrastructure-agnostic
"""
