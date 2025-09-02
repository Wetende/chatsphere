"""
# KyroChat Backend Implementation - Onion Architecture

This document outlines the detailed backend implementation strategy for KyroChat using onion architecture principles, ensuring clean separation of concerns, testability, and maintainability.

## Onion Architecture Overview

### Core Principles
- **Dependency Inversion**: All dependencies point inward toward the domain
- **Clean Separation**: Each layer has distinct responsibilities 
- **Framework Independence**: Domain logic is pure and framework-agnostic
- **Testability**: Each layer can be tested in isolation
- **Maintainability**: Changes in outer layers don't affect inner layers

### Layer Structure
```
┌─────────────────────────────────────┐
│        Presentation Layer           │  ← FastAPI, WebSocket, HTTP concerns
│  ┌─────────────────────────────────┐ │
│  │      Application Layer          │ │  ← Use cases, DTOs, orchestration
│  │  ┌─────────────────────────────┐│ │
│  │  │      Domain Layer           ││ │  ← Entities, business rules, interfaces
│  │  │   (Business Logic Core)     ││ │
│  │  └─────────────────────────────┘│ │
│  └─────────────────────────────────┘ │
│           Infrastructure Layer       │  ← Database, external APIs, frameworks
└─────────────────────────────────────┘
```

## Layer Implementations

### 1. Domain Layer (Innermost - Business Rules)

**Location**: `backend/domain/`

**Responsibilities**:
- Pure business entities with invariants
- Value objects with validation
- Repository and service interfaces (contracts only)
- Domain events and specifications
- Business rule enforcement

**Key Components**:

#### Entities (`domain/entities/`)
```python
# user.py - Pure business entity
class User:
    """User entity with business rules and behavior"""
    def __init__(self, id: UserId, email: Email, username: Username):
        self._validate_business_rules()
    
    def change_subscription(self, new_status: str) -> None:
        """Change subscription with business rule validation"""
        if not self._can_change_subscription(new_status):
            raise DomainException("Invalid subscription change")
    
    def can_create_bot(self) -> bool:
        """Business rule: Check if user can create more bots"""
        return self.subscription_status in ['pro', 'enterprise'] or self.bot_count < 3

# bot.py - Bot entity with AI configuration rules  
class Bot:
    """Bot entity with AI parameter validation"""
    def update_configuration(self, config: Dict[str, Any]) -> None:
        """Update AI configuration with business rule validation"""
        if config.get('temperature', 0) > 2.0:
            raise DomainException("Temperature must be <= 2.0")

# conversation.py - Conversation entity with context management
class Conversation:
    """Conversation entity managing chat session rules"""
    def add_message(self, content: str, is_from_user: bool) -> None:
        """Add message with business rule validation"""
        if not self.can_accept_messages():
            raise DomainException("Conversation is closed")
```

#### Value Objects (`domain/value_objects/`)
```python
# email.py - Email validation
class Email:
    """Email value object with validation"""
    def __init__(self, value: str):
        if not self._is_valid_email(value):
            raise ValueError("Invalid email format")
        self._value = value.lower().strip()

# message_content.py - Message content validation
class MessageContent:
    """Message content with business rule validation"""
    def __init__(self, content: str):
        if len(content.strip()) == 0:
            raise ValueError("Message cannot be empty")
        if len(content) > 4000:
            raise ValueError("Message too long")
        self._value = content.strip()
```

#### Repository Interfaces (`domain/repositories/`)
```python
# user_repository.py - Repository contract
class IUserRepository(ABC):
    """User repository interface"""
    @abstractmethod
    async def get_by_id(self, user_id: UserId) -> Optional[User]:
        pass
    
    @abstractmethod
    async def save(self, user: User) -> User:
        pass
    
    @abstractmethod
    async def email_exists(self, email: Email) -> bool:
        pass

# conversation_repository.py - Conversation persistence contract
class IConversationRepository(ABC):
    """Conversation repository interface"""
    @abstractmethod
    async def get_by_id(self, conv_id: ConversationId) -> Optional[Conversation]:
        pass
    
    @abstractmethod
    async def save(self, conversation: Conversation) -> Conversation:
        pass
```

#### Domain Services (`domain/services/`)
```python
# ai_service.py - AI service interface
class IAIService(ABC):
    """AI service contract for infrastructure implementation"""
    @abstractmethod
    async def generate_response(
        self, 
        prompt: str, 
        context: List[str],
        config: Dict[str, Any]
    ) -> str:
        pass
    
    @abstractmethod
    async def embed_text(self, text: str) -> List[float]:
        pass
    
    @abstractmethod
    async def stream_response(
        self, 
        prompt: str, 
        context: List[str]
    ) -> AsyncGenerator[str, None]:
        pass
```

### 2. Application Layer (Use Cases & Orchestration)

**Location**: `backend/application/`

**Responsibilities**:
- Orchestrate domain entities and services
- Handle application-specific business flows
- Convert between DTOs and domain objects
- Manage transactions via Unit of Work
- Coordinate cross-cutting concerns

**Key Components**:

#### Use Cases (`application/use_cases/`)
```python
# send_message_use_case.py - Chat message handling
@dataclass
class SendMessageUseCase:
    """Use case for sending chat messages with AI response generation"""
    conversation_repository: IConversationRepository
    ai_service: IAIService
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: SendMessageRequestDTO) -> SendMessageResponseDTO:
        """Execute message sending with AI response generation"""
        async with self.unit_of_work:
            # Get conversation
            conversation = await self.conversation_repository.get_by_id(
                ConversationId(request.conversation_id)
            )
            
            # Add user message (domain business rules)
            conversation.add_message(request.content, is_from_user=True)
            
            # Generate AI response using domain service
            context = conversation.get_recent_context()
            ai_response = await self.ai_service.generate_response(
                prompt=request.content,
                context=context,
                config=conversation.bot.get_ai_config()
            )
            
            # Add AI response
            conversation.add_message(ai_response, is_from_user=False)
            
            # Save changes
            await self.conversation_repository.save(conversation)
            await self.unit_of_work.commit()
            
            return SendMessageResponseDTO(
                message_id=str(conversation.get_last_message().id),
                content=ai_response,
                timestamp=datetime.utcnow()
            )

# create_bot_use_case.py - Bot creation orchestration
@dataclass
class CreateBotUseCase:
    """Use case for creating new bots with validation"""
    bot_repository: IBotRepository
    user_repository: IUserRepository
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: CreateBotRequestDTO) -> CreateBotResponseDTO:
        """Execute bot creation with business rule validation"""
        async with self.unit_of_work:
            # Get user and validate permissions
            user = await self.user_repository.get_by_id(UserId(request.user_id))
            if not user.can_create_bot():
                raise ApplicationException("User cannot create more bots")
            
            # Create bot entity (business rules enforced)
            bot = Bot.create(
                owner_id=user.id,
                name=request.name,
                description=request.description
            )
            
            # Save bot
            saved_bot = await self.bot_repository.save(bot)
            await self.unit_of_work.commit()
            
            return CreateBotResponseDTO(
                bot_id=str(saved_bot.id),
                name=saved_bot.name,
                status=saved_bot.status
            )
```

#### DTOs (`application/dtos/`)
```python
# chat_dtos.py - Chat operation DTOs
@dataclass
class SendMessageRequestDTO:
    """Request DTO for sending messages"""
    conversation_id: str
    content: str
    user_session_id: Optional[str] = None

@dataclass  
class SendMessageResponseDTO:
    """Response DTO for message sending"""
    message_id: str
    content: str
    timestamp: datetime
    is_from_ai: bool = True

# bot_dtos.py - Bot operation DTOs
@dataclass
class CreateBotRequestDTO:
    """Request DTO for bot creation"""
    user_id: str
    name: str
    description: Optional[str] = None
    model_type: str = "gemini-2.0-flash-exp"
    temperature: float = 0.7
```

#### Interfaces (`application/interfaces/`)
```python
# unit_of_work.py - Transaction management interface
class IUnitOfWork(ABC):
    """Unit of work pattern for transaction management"""
    @abstractmethod
    async def __aenter__(self):
        pass
    
    @abstractmethod
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        pass
    
    @abstractmethod
    async def commit(self) -> None:
        pass
    
    @abstractmethod
    async def rollback(self) -> None:
        pass

# email_service.py - Email service interface  
class IEmailService(ABC):
    """Email service interface"""
    @abstractmethod
    async def send_verification_email(self, email: Email, token: str) -> None:
        pass
```

### 3. Infrastructure Layer (External Concerns)

**Location**: `backend/infrastructure/`

**Responsibilities**:
- Implement domain and application interfaces
- Handle external API integrations
- Manage database persistence
- Provide caching and messaging
- Handle framework-specific concerns

**Key Components**:

#### Repository Implementations (`infrastructure/repositories/`)
```python
# sqlalchemy_user_repository.py - Database implementation
class SqlAlchemyUserRepository(IUserRepository):
    """SQLAlchemy implementation of user repository"""
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_by_id(self, user_id: UserId) -> Optional[User]:
        """Get user by ID with ORM mapping"""
        query = select(UserORM).where(UserORM.id == str(user_id))
        result = await self.session.execute(query)
        user_orm = result.scalar_one_or_none()
        
        return self._to_domain(user_orm) if user_orm else None
    
    async def save(self, user: User) -> User:
        """Save user with ORM mapping"""
        user_orm = self._to_orm(user)
        self.session.add(user_orm)
        await self.session.flush()
        await self.session.refresh(user_orm)
        return self._to_domain(user_orm)
    
    def _to_domain(self, user_orm: UserORM) -> User:
        """Map ORM model to domain entity"""
        return User(
            id=UserId(user_orm.id),
            email=Email(user_orm.email),
            username=Username(user_orm.username),
            # ... other mappings
        )
```

#### AI Service Implementation (`infrastructure/ai/`)
```python
# gemini_ai_service.py - Direct Gemini API implementation
class GeminiAIService(IAIService):
    """Direct Google Gemini API implementation"""
    def __init__(self, api_key: str, model_name: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)
    
    async def generate_response(
        self, 
        prompt: str, 
        context: List[str],
        config: Dict[str, Any]
    ) -> str:
        """Generate AI response using direct API calls"""
        # Build conversation context
        conversation_context = self._build_context(context)
        
        # Configure generation parameters
        generation_config = genai.GenerationConfig(
            temperature=config.get('temperature', 0.7),
            max_output_tokens=config.get('max_tokens', 4096)
        )
        
        # Generate response
        response = await self.model.generate_content_async(
            f"{conversation_context}\n\nUser: {prompt}\nAssistant:",
            generation_config=generation_config
        )
        
        return response.text
    
    async def stream_response(
        self, 
        prompt: str, 
        context: List[str]
    ) -> AsyncGenerator[str, None]:
        """Stream AI response for real-time chat"""
        conversation_context = self._build_context(context)
        
        response = await self.model.generate_content_async(
            f"{conversation_context}\n\nUser: {prompt}\nAssistant:",
            stream=True
        )
        
        async for chunk in response:
            if chunk.text:
                yield chunk.text

# pinecone_vector_repository.py - Vector storage implementation
class PineconeVectorRepository(IVectorRepository):
    """Pinecone implementation for vector storage"""
    def __init__(self, api_key: str, index_name: str):
        self.client = Pinecone(api_key=api_key)
        self.index = self.client.Index(index_name)
    
    async def store_embeddings(
        self, 
        documents: List[str], 
        metadata: List[Dict[str, Any]]
    ) -> List[str]:
        """Store document embeddings in Pinecone"""
        # Generate embeddings
        embeddings = await self._generate_embeddings(documents)
        
        # Prepare vectors for upsert
        vectors = []
        for i, (doc, embedding, meta) in enumerate(zip(documents, embeddings, metadata)):
            vector_id = f"{meta['bot_id']}-{meta['document_id']}-{i}"
            vectors.append({
                "id": vector_id,
                "values": embedding,
                "metadata": {**meta, "text": doc}
            })
        
        # Upsert to Pinecone
        await self.index.upsert(vectors=vectors)
        return [v["id"] for v in vectors]
```

#### External Service Adapters (`infrastructure/external_services/`)
```python
# smtp_email_service.py - Email service implementation
class SmtpEmailService(IEmailService):
    """SMTP email service implementation"""
    def __init__(self, smtp_config: SmtpConfig):
        self.smtp_config = smtp_config
    
    async def send_verification_email(self, email: Email, token: str) -> None:
        """Send verification email via SMTP"""
        message = self._build_verification_message(email, token)
        
        async with aiosmtplib.SMTP(
            hostname=self.smtp_config.host,
            port=self.smtp_config.port,
            use_tls=self.smtp_config.use_tls
        ) as smtp:
            await smtp.login(self.smtp_config.username, self.smtp_config.password)
            await smtp.send_message(message)
```

### 4. Presentation Layer (External Interface)

**Location**: `backend/presentation/`

**Responsibilities**:
- Handle HTTP requests and responses
- WebSocket connections for real-time features
- Request validation and response serialization
- Authentication and authorization
- Error handling and logging

**Key Components**:

#### API Routers (`presentation/api/`)
```python
# chat_router.py - Chat endpoints
router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/message", response_model=SendMessageResponse)
async def send_message(
    request: SendMessageRequest,
    send_message_use_case: SendMessageUseCase = Depends(get_send_message_use_case),
    current_user: str = Depends(get_current_user)
) -> SendMessageResponse:
    """Send chat message and get AI response"""
    try:
        # Convert HTTP request to application DTO
        dto = SendMessageRequestDTO(
            conversation_id=request.conversation_id,
            content=request.content,
            user_session_id=current_user
        )
        
        # Execute use case
        result = await send_message_use_case.execute(dto)
        
        # Convert to HTTP response
        return SendMessageResponse(
            message_id=result.message_id,
            content=result.content,
            timestamp=result.timestamp
        )
        
    except DomainException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ApplicationException as e:
        raise HTTPException(status_code=422, detail=str(e))

# bot_router.py - Bot management endpoints
@router.post("/bots", response_model=CreateBotResponse)
async def create_bot(
    request: CreateBotRequest,
    create_bot_use_case: CreateBotUseCase = Depends(get_create_bot_use_case),
    current_user: str = Depends(get_current_user)
) -> CreateBotResponse:
    """Create new chatbot"""
    dto = CreateBotRequestDTO(
        user_id=current_user,
        name=request.name,
        description=request.description,
        model_type=request.model_type,
        temperature=request.temperature
    )
    
    result = await create_bot_use_case.execute(dto)
    
    return CreateBotResponse(
        bot_id=result.bot_id,
        name=result.name,
        status=result.status
    )
```

#### WebSocket Handlers (`presentation/websockets/`)
```python
# streaming_chat_handler.py - Real-time chat
class StreamingChatHandler:
    """WebSocket handler for streaming chat responses"""
    def __init__(self, stream_message_use_case: StreamMessageUseCase):
        self.stream_message_use_case = stream_message_use_case
    
    async def handle_connection(self, websocket: WebSocket):
        """Handle WebSocket chat connections"""
        await websocket.accept()
        
        try:
            while True:
                # Receive message from client
                data = await websocket.receive_json()
                
                # Convert to DTO and execute use case
                request = StreamMessageRequestDTO(**data)
                
                # Stream AI response
                async for chunk in self.stream_message_use_case.execute(request):
                    await websocket.send_json({
                        "type": "message_chunk",
                        "content": chunk.content,
                        "is_complete": chunk.is_complete
                    })
                    
        except WebSocketDisconnect:
            pass
        except Exception as e:
            await websocket.send_json({
                "type": "error",
                "message": str(e)
            })
            await websocket.close()
```

## Dependency Injection & Composition

### Composition Root (`composition_root.py`)
```python
class CompositionRoot:
    """Central dependency injection container"""
    
    def __init__(self):
        self.settings = Settings()
        self._repositories = {}
        self._services = {}
    
    # Repository factories
    def get_user_repository(self, session: AsyncSession) -> IUserRepository:
        return SqlAlchemyUserRepository(session)
    
    def get_bot_repository(self, session: AsyncSession) -> IBotRepository:
        return SqlAlchemyBotRepository(session)
    
    # Service factories  
    @lru_cache()
    def get_ai_service(self) -> IAIService:
        return GeminiAIService(
            api_key=self.settings.google_ai_api_key,
            model_name=self.settings.default_ai_model
        )
    
    @lru_cache()
    def get_email_service(self) -> IEmailService:
        return SmtpEmailService(self.settings.smtp_config)
    
    # Use case factories
    def get_send_message_use_case(self) -> SendMessageUseCase:
        unit_of_work = self.get_unit_of_work()
        return SendMessageUseCase(
            conversation_repository=self.get_conversation_repository(unit_of_work.session),
            ai_service=self.get_ai_service(),
            unit_of_work=unit_of_work
        )
```

### FastAPI Integration (`main.py`)
```python
# Dependency providers for FastAPI
async def get_send_message_use_case() -> SendMessageUseCase:
    return composition_root.get_send_message_use_case()

async def get_create_bot_use_case() -> CreateBotUseCase:
    return composition_root.get_create_bot_use_case()

# FastAPI app with onion architecture
app = FastAPI(title="KyroChat API - Onion Architecture")

# Include routers
app.include_router(chat_router, prefix="/api/v1")
app.include_router(bot_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")
```

## Benefits of Onion Architecture

### 1. **Testability**
- Each layer can be tested in isolation
- Domain logic tested without infrastructure concerns
- Mock implementations for external dependencies
- Clear test boundaries and responsibilities

### 2. **Maintainability**
- Changes in outer layers don't affect inner layers
- Clear separation of concerns
- Easy to understand and modify
- Reduced coupling between components

### 3. **Flexibility** 
- Can swap infrastructure implementations
- Framework independence in domain layer
- Easy to add new features without breaking existing code
- Support for different deployment scenarios

### 4. **Performance**
- Clear boundaries for caching strategies
- Optimized database access patterns
- Efficient dependency injection
- Scalable async patterns throughout

### 5. **Security**
- Business rules enforced in domain layer
- Clear validation boundaries
- Centralized authentication/authorization
- Input sanitization at presentation layer

## Implementation Guidelines

### Development Workflow
1. **Start with Domain**: Define entities, value objects, and interfaces
2. **Add Application**: Create use cases that orchestrate domain logic
3. **Implement Infrastructure**: Build concrete implementations of interfaces
4. **Add Presentation**: Create HTTP/WebSocket endpoints that delegate to use cases
5. **Wire Dependencies**: Configure dependency injection in composition root

### Testing Strategy
- **Domain Tests**: Pure unit tests with no external dependencies
- **Application Tests**: Test use cases with mocked repositories and services
- **Infrastructure Tests**: Integration tests with real external services
- **Presentation Tests**: API endpoint tests with mocked use cases
- **End-to-End Tests**: Full system tests through HTTP interface

### Migration from Current Architecture
1. Extract business logic into domain entities and value objects
2. Create repository interfaces and move data access to infrastructure
3. Convert services to use cases with dependency injection
4. Update routers to delegate to use cases instead of services
5. Configure composition root for dependency injection

This onion architecture implementation provides a solid foundation for KyroChat that is testable, maintainable, and scalable while maintaining clean separation of concerns.
"""
