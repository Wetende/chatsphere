# Sub-PRD: Direct AI Integration System (Onion Architecture)

## Overview
This Sub-PRD outlines the direct AI integration system for KyroChat using onion architecture principles, implementing Google Gemini and Pinecone API integration without frameworks, following agentic patterns with clean separation of concerns.

## User Stories
- **As a user**, I want my bot to generate intelligent responses so that it can help visitors effectively
- **As a user**, I want my bot to use my training data so that answers are relevant to my content
- **As a user**, I want fast response times so that conversations feel natural
- **As a user**, I want my bot to maintain context so that conversations flow smoothly
- **As a user**, I want reliable AI performance so that my bot works consistently
- **As a developer**, I want direct API control so that I can optimize performance and costs
- **As a user**, I want my bot to handle different conversation types so that it's versatile
- **As a developer**, I want clean architecture separation so that AI logic is testable and maintainable

## Functional Requirements

### Domain Layer (Core Business Rules)
- Define **AI service interfaces** in domain layer for dependency inversion
- Create **conversation entities** with context management business rules
- Establish **message value objects** with content validation
- Define **bot configuration entities** with AI parameter constraints

### Application Layer (Use Cases & Orchestration)
- Implement **send message use case** orchestrating AI response generation
- Create **train bot use case** managing document processing and embedding
- Build **conversation management use cases** with context handling
- Develop **streaming response use cases** for real-time chat

### Infrastructure Layer (External Integrations)
- Implement **direct Google Gemini integration** for text generation
- Create **direct Pinecone integration** for vector storage and retrieval
- Build **embedding generation services** with Google AI models
- Develop **caching adapters** using Redis for performance

### Presentation Layer (API Endpoints)
- Create **chat endpoints** with streaming response support
- Build **training endpoints** for document upload and processing
- Implement **WebSocket handlers** for real-time communication
- Develop **bot configuration endpoints** with validation

## Acceptance Criteria

### Domain Layer
- AI service interfaces defined with no implementation dependencies
- Business rules for conversation flow encapsulated in entities
- Message content validation through value objects
- Bot configuration constraints enforced in domain

### Application Layer  
- Use cases orchestrate domain entities without infrastructure knowledge
- DTOs provide clean data contracts between layers
- Command/Query separation (CQRS) for read/write operations
- Unit of Work pattern ensures transaction consistency

### Infrastructure Layer
- Direct API calls to Google Gemini without any AI frameworks
- Vector embeddings generated and stored in Pinecone with proper metadata
- Context retrieval finds relevant chunks within 200ms
- Redis caching for frequent queries and embeddings
- Repository implementations map domain entities to/from persistence

### Presentation Layer
- Streaming responses provide word-by-word output via WebSocket/SSE
- HTTP endpoints delegate to application use cases only
- Request/response validation using Pydantic schemas
- Error handling with proper HTTP status codes

## Technical Specifications

### Architecture Layers
```
backend/
├── domain/                    # 🏛️ INNERMOST (Business Rules)
│   ├── entities/             # Conversation, Bot, Message entities
│   ├── value_objects/        # MessageContent, AIParameters
│   ├── repositories/         # IConversationRepository, IBotRepository
│   └── services/             # IAIService interface
├── application/              # 🔄 APPLICATION (Use Cases)
│   ├── use_cases/           # SendMessageUseCase, TrainBotUseCase
│   ├── dtos/                # ChatRequestDTO, ChatResponseDTO
│   └── interfaces/          # Port contracts for AI services
├── infrastructure/          # 🔌 INFRASTRUCTURE (External)
│   ├── ai/                  # GeminiAIService, PineconeClient
│   ├── repositories/        # SqlAlchemyConversationRepository
│   └── caching/             # RedisCache implementation
└── presentation/           # 🌐 OUTERMOST (HTTP/WebSocket)
    ├── api/                # ChatRouter, BotRouter
    └── websockets/         # StreamingChatHandler
```

### AI Service Implementation
- **Domain Interface**: `IAIService` with `generate_response()`, `embed_text()` methods
- **Infrastructure Implementation**: `GeminiAIService` with direct API calls
- **Models**: Google Gemini 2.0 Flash Exp for generation, text-embedding-004 for embeddings
- **Vector Storage**: `PineconeVectorRepository` implementing `IVectorRepository`
- **Streaming**: Async generators through application layer use cases
- **Context Management**: Domain entities manage conversation context
- **Caching**: Infrastructure layer Redis adapter for performance

### Dependency Flow
- Presentation → Application → Domain ← Infrastructure
- All dependencies point inward toward domain
- Infrastructure implements domain interfaces
- Application orchestrates domain services
- Presentation handles HTTP/WebSocket concerns only

## AI Coding Prompt
Implement onion architecture AI system with clean separation of concerns. Create domain interfaces for AI services without implementation details. Build application use cases that orchestrate AI operations. Implement infrastructure adapters for Google Gemini and Pinecone with direct API calls (no frameworks). Create presentation layer endpoints that delegate to use cases. Use dependency injection for loose coupling. Follow SOLID principles throughout. Ensure domain layer has zero infrastructure dependencies. Test each layer independently with proper mocking.