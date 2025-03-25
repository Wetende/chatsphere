# ChatSphere Technical Architecture

This document outlines the detailed technical architecture, system design, and component interactions for the ChatSphere platform.

## System Architecture Overview

ChatSphere follows a modern microservices-inspired architecture with clearly defined layers:

```
┌───────────────────────────────────────────────────────────────┐
│                      Client Applications                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ Web Frontend │  │ Embedded     │  │ API Consumers        │ │
│  │ (Vue.js)     │  │ Widget       │  │ (3rd Party Services) │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
                             ▲
                             │
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                         API Gateway                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ Auth &       │  │ Rate         │  │ Request              │ │
│  │ Security     │  │ Limiting     │  │ Validation           │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
          ▲                   ▲                   ▲
          │                   │                   │
          ▼                   ▼                   ▼
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│   User         │   │   Chatbot      │   │   AI           │
│   Service      │   │   Service      │   │   Service      │
└────────────────┘   └────────────────┘   └────────────────┘
          ▲                   ▲                   ▲
          │                   │                   │
          ▼                   ▼                   ▼
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│  User DB       │   │  Content DB    │   │  Vector DB     │
│  (PostgreSQL)  │   │  (PostgreSQL)  │   │  (Pinecone)    │
└────────────────┘   └────────────────┘   └────────────────┘
```

## Component Details

### 1. Client Applications

#### Web Frontend (Vue.js)
- **Framework**: Vue.js 3 with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Framework**: Custom components inspired by BrightData, with Tailwind CSS
- **API Communication**: Axios with interceptors
- **Key Features**:
  - Responsive dashboard
  - Chatbot configuration interface
  - Analytics visualization
  - Widget customization
  - User account management

#### Embedded Widget
- **Technologies**: Vanilla JavaScript, CSS
- **Implementation**: Self-contained, minimal dependencies
- **Loading Strategy**: Asynchronous loading to minimize impact on host sites
- **Features**:
  - Customizable appearance
  - Real-time chat interface
  - Mobile responsiveness
  - Accessibility compliance
  - Localization support

#### API Consumers
- **Documentation**: OpenAPI/Swagger specification
- **Authentication**: JWT-based authentication
- **Rate Limiting**: Tier-based access controls

### 2. API Gateway

- **Implementation**: Django with custom middleware
- **Responsibilities**:
  - Request routing
  - Authentication and authorization
  - Rate limiting
  - Request validation
  - Response formatting
  - Logging and monitoring

### 3. Core Services

#### User Service
- **Functionality**:
  - User registration and authentication
  - Profile management
  - Subscription handling
  - Permissions and role management
- **Key Endpoints**:
  - `/api/v1/auth/*` - Authentication endpoints
  - `/api/v1/users/*` - User management
  - `/api/v1/subscriptions/*` - Subscription management

#### Chatbot Service
- **Functionality**:
  - Chatbot creation and configuration
  - Training data management
  - Conversation history
  - Analytics processing
- **Key Endpoints**:
  - `/api/v1/chatbots/*` - Chatbot CRUD operations
  - `/api/v1/training/*` - Training data management
  - `/api/v1/conversations/*` - Conversation history
  - `/api/v1/analytics/*` - Analytics data

#### AI Service
- **Functionality**:
  - Model selection and configuration
  - Training pipeline
  - Response generation
  - Vector storage management
- **Key Endpoints**:
  - `/api/v1/chat/*` - Chat completion endpoints
  - `/api/v1/embeddings/*` - Vector embedding management
  - `/api/v1/models/*` - AI model management

### 4. Database Layer

#### User Database (PostgreSQL)
- **Tables**:
  - `users` - User accounts and profiles
  - `subscriptions` - Subscription details
  - `billing` - Billing information
  - `audit_logs` - System audit logs

#### Content Database (PostgreSQL)
- **Tables**:
  - `chatbots` - Chatbot configurations
  - `training_sources` - Training data sources
  - `training_data` - Processed training content
  - `conversations` - Conversation history
  - `analytics` - Usage and performance metrics

#### Vector Database (Pinecone)
- **Collections**:
  - Namespace per chatbot
  - Document embeddings
  - Metadata for retrieval context

### 5. External Service Integrations

#### OpenAI API
- **Purpose**: AI model access
- **Models Used**:
  - GPT-3.5 Turbo
  - GPT-4
  - Embeddings models
- **Integration Pattern**: Adapter pattern with fallback options

#### LangChain
- **Purpose**: AI workflow orchestration
- **Features Used**:
  - Document loaders
  - Text splitters
  - Vector stores
  - Retrieval chains
- **Integration Pattern**: Service wrapper with caching

#### Pinecone
- **Purpose**: Vector database for semantic search
- **Features Used**:
  - Vector indexing
  - Similarity search
  - Metadata filtering
- **Integration Pattern**: Repository pattern with connection pooling

## Data Flow Diagrams

### Chatbot Creation Flow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│  User      │     │  Frontend  │     │  Backend   │     │  AI        │
│  Action    │────▶│  App       │────▶│  API       │────▶│  Service   │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
                                             │                  │
                                             ▼                  ▼
                                      ┌────────────┐     ┌────────────┐
                                      │  Content   │     │  Vector    │
                                      │  Database  │     │  Database  │
                                      └────────────┘     └────────────┘
```

### Chat Interaction Flow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│  End User  │     │  Widget    │     │  Backend   │     │  AI        │
│  Query     │────▶│  Interface │────▶│  API       │────▶│  Service   │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
      ▲                                      │                  │
      │                                      │                  ▼
      │                                      │           ┌────────────┐
      │                                      │           │  Vector    │
      │                                      │           │  Database  │
      │                                      │           └────────────┘
      │                                      │                  │
      │                               ┌────────────┐           │
      └───────────────────────────────│  Response  │◀──────────┘
                                      │  Generation│
                                      └────────────┘
```

## Security Architecture

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Granular permissions system
- OAuth integration for social login

### Data Protection
- Encryption at rest for sensitive data
- TLS for all connections
- API key rotation mechanisms
- PII data minimization

### Infrastructure Security
- Docker container security
- Regular security scanning
- WAF implementation
- DDoS protection

## Scalability Considerations

### Horizontal Scaling
- Stateless API services for easy replication
- Load balancing across multiple instances
- Database read replicas

### Vertical Scaling
- Resource optimization for compute-intensive tasks
- Memory management for large training jobs

### Caching Strategy
- Redis for frequent queries
- CDN for static assets
- Response caching with appropriate invalidation

## Monitoring and Observability

### Metrics Collection
- Application performance monitoring
- Resource utilization tracking
- Business KPI dashboards

### Logging
- Structured logging
- Centralized log management
- Error aggregation and alerting

### Alerting
- Threshold-based alerts
- Anomaly detection
- On-call rotation

## Deployment Architecture

### Development Environment
- Local Docker Compose setup
- Mocked external services
- Development database instances

### Staging Environment
- Cloud-based deployment
- Integration with test accounts of external services
- Automated testing

### Production Environment
- Kubernetes orchestration
- High availability configuration
- Automated scaling
- Disaster recovery procedures

## API Documentation

The ChatSphere API follows RESTful design principles and uses OpenAPI 3.0 for documentation:

- All endpoints return JSON responses
- Standard HTTP status codes are used
- Authentication is handled via Bearer tokens
- Error responses follow a consistent format

The full API documentation will be available at `/api/docs` and includes:
- Endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests

## Next Steps

For implementation details of specific components, refer to the following documents:
- [Frontend Implementation](./04-frontend-implementation.md)
- [Backend Implementation](./05-backend-implementation.md)
- [AI Integration](./06-ai-integration.md)
- [Database Design](./07-database-design.md) 