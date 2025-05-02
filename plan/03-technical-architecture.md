# ChatSphere Technical Architecture

This document outlines the detailed technical architecture, system design, and component interactions for the ChatSphere platform.

## System Architecture Overview

ChatSphere follows a layered architecture with a distinct separation between the core backend (Django) and the AI processing service (FastAPI).

```
┌───────────────────────────────────────────────────────────────┐
│                      Client Applications                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ Web Frontend │  │ Embedded     │  │ API Consumers        │ │
│  │ (Vue.js)     │  │ Widget (JS)  │  │ (3rd Party Services) │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
                             ▲
                             │ HTTPS/REST (via Nginx/Gateway)
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                     Backend Service (Django)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ User Mgmt &  │  │ Bot & Doc    │  │ Agent Client         │ │
│  │ Auth (JWT)   │  │ Mgmt APIs    │  │ (HTTP to Agent Svc)  │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└─────────────────────────────┬────────────────────┬──────────────┘
                              │                    │
                              │ DB Connection      │ HTTP/REST (Internal)
                              ▼                    ▼
┌──────────────────────────────────┐  ┌──────────────────────────────┐
│    Application Database          │  │    Agent Service (FastAPI)   │
│    (PostgreSQL)                  │  │ ┌────────────┐┌───────────┐ │
│ ┌─────────┐ ┌─────────┐ ┌──────┐ │  │ │ Embeddings ││ Chat/LLM  │ │
│ │ Users   │ │ Bots    │ │ Docs │ │  │ │ (Google)   ││ (Gemini)  │ │
│ │ Convos  │ │ Chunks  │ │ ...  │ │  │ └─────┬──────┘└───┬─────┘ │
│ └─────────┘ └─────────┘ └──────┘ │  │       │           │         │
└──────────────────────────────────┘  │       ▼           ▼         │
                                      │    ┌───────────────────┐    │
                                      │    │ Vector DB Client  │    │
                                      │    │ (Pinecone)        │    │
                                      │    └─────────┬─────────┘    │
                                      └──────────────│───────────────┘
                                                     │ Pinecone API
                                                     ▼
                                         ┌─────────────────────────┐
                                         │ Vector Database         │
                                         │ (Pinecone Service)      │
                                         └─────────────────────────┘
```

## Component Details

### 1. Client Applications

#### Web Frontend (Vue.js)
- **Framework**: Vue.js 3 with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Framework**: Custom components (e.g., Tailwind CSS or a UI library like Vuetify)
- **API Communication**: Axios (or fetch) communicating with the Django Backend API.
- **Key Features**:
  - User authentication (Login/Register)
  - Dashboard for managing bots
  - Interface for creating/configuring bots
  - Document upload/management interface
  - Real-time chat interface (potentially using WebSockets connected to Django)
  - Displaying conversation history

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
  - (If implemented) Vanilla JS or lightweight framework, communicates with Django Backend API.

#### API Consumers
- External services interacting directly with the Django Backend API (using API keys or JWT).

### 2. Backend Service (Django)

- **Framework**: Django 4.x + Django REST Framework (DRF)
- **Responsibilities**:
  - Handles all client requests (Web Frontend, Widget, API Consumers).
  - User authentication (JWT via DRF Simple JWT) and management.
  - CRUD operations for Bots, Documents, Chunks (text content only), Conversations, Messages.
  - Serves as the primary API gateway for clients.
  - **Orchestration**: When AI operations are needed (embedding, chat), it makes HTTP requests to the Agent Service via the `AgentAPIClient`.
  - Manages application data persistence in PostgreSQL.
  - **Real-time Handling**: WebSocket implementation using Django Channels should be used. This involves setting up ASGI, Channels routing, consumers, authentication for WebSocket connections, and a mechanism (e.g., Redis pub/sub or Channels layers) for the Agent Service (via Django) to push responses back to the correct socket. 
- **Key Modules**: `apps/users`, `apps/bots`, `services/document_processor`, `services/agent_client`, `config`.

### 3. Agent Service (FastAPI)

- **Framework**: FastAPI
- **Responsibilities**:
  - Exposes internal HTTP endpoints for specific AI tasks.
  - Handles requests *only* from the Django Backend Service.
  - Loads AI models (Gemini LLM, Google Embeddings).
  - Interacts with the Pinecone API (via `pinecone-client` or LangChain integration) to store and retrieve vector embeddings.
  - Executes LangChain agent logic for chat responses, incorporating retrieved context.
  - Manages its own configuration (API keys, etc.) loaded from the shared `.env` file.
  - Handles different agent configurations based on parameters from Django.
- **Key Modules**: `main.py` (FastAPI app & endpoints), `agent.py`, `vector_store.py`, `config.py`.
- **Endpoints (Examples)**:
    - `/health` (GET)
    - `/embed_and_store` (POST)
    - `/chat` (POST)

### Bot Configuration Schema (`Bot.configuration` field in Django)

To enable flexible agent behavior controlled by the Django backend, the `configuration` JSONB field on the `Bot` model should adhere to a defined schema. The Agent Service will expect parameters within this structure. Example schema:

```json
{
  "agent_type": "rag", // e.g., 'rag', 'react', 'tool_using' (default: 'rag')
  "llm_model": "gemini-2.0-flash", // Specific model override
  "temperature": 0.7, // LLM temperature override (0.0 - 1.0)
  "system_prompt": "You are a helpful AI assistant for Contoso Inc. Be polite and concise.", // Custom system prompt
  "retriever_k": 5, // Number of chunks to retrieve
  "chat_history_length": 10, // Max number of past messages to include in context
  "tools": [] // List of enabled tools for tool-using agents (if applicable)
}
```
*Note: The Agent Service should use sensible defaults if specific keys are missing.*

### 4. Database Layer

#### Application Database (PostgreSQL)
- Managed by Django ORM.
- Stores core relational data: `User`, `UserProfile`, `Bot`, `Document`, `Chunk` (text content, Pinecone ID link), `Conversation`, `Message`, `SubscriptionPlan`, etc.
- **Does NOT store vector embeddings.**

#### Vector Database (Pinecone Service)
- External SaaS managed by Pinecone.
- Accessed *only* by the FastAPI Agent Service.
- Stores dense vector embeddings generated by the Google embedding model.
- Indexed metadata includes `bot_id`, `document_id`, `chunk_id` for filtering and linking back to PostgreSQL data.

### 5. External Service Integrations (within Agent Service)

#### Google AI (Gemini & Embeddings)
- **Purpose**: LLM for chat, embedding model for vector generation.
- **SDK**: `langchain-google-genai`.
- **Integration Pattern**: Initialized within the Agent Service, potentially using LangChain wrappers.

#### Pinecone API
- **Purpose**: Vector database for semantic search.
- **SDK**: `pinecone-client` and/or `langchain-pinecone`.
- **Integration Pattern**: Client initialized within the Agent Service, used directly or via LangChain `PineconeVectorStore`.

#### LangChain
- **Purpose**: Framework for orchestrating AI components (LLM, vector store, prompts, agents).
- **Usage**: Primarily within the Agent Service to structure chat logic, retrieval, and potentially embedding workflows. Enables the implementation of various agent types (conversational retrieval QA, ReAct, tool-using agents) within the decoupled Agent Service.

## Data Flow Diagrams

### Document Processing Flow

```
┌────────────┐   ┌───────────┐   ┌──────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│ User       │   │ Frontend  │   │ Django Backend   │   │ Agent Service     │   │ Pinecone Service  │
│ Uploads    │──▶│ Upload UI │──▶│ DocumentViewSet  │──▶│ /embed_and_store  │──▶│ Store Vectors     │
│ Document   │   └───────────┘   │ (Save Doc/Chunks)│   │ (Embeds Chunks)   │   └───────────────────┘
└────────────┘                   └─────────┬────────┘   └─────────┬─────────┘
                                           │                      │
                                           │ Store Doc/Chunk Text │ Calls Client       │
                                           ▼                      ▼
                                       ┌───────────┐      ┌──────────────────┐
                                       │ Postgres  │      │ AgentAPIClient   │
                                       └───────────┘      └──────────────────┘
```

### Chat Interaction Flow

```
┌────────────┐   ┌───────────┐   ┌──────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│ User       │   │ Frontend  │   │ Django Backend   │   │ Agent Service     │   │ Pinecone Service  │
│ Sends Msg  │──▶│ Chat UI   │──▶│ Chat Endpoint    │──▶│ /chat Endpoint    │──▶│ Retrieve Context  │
└────────────┘   └───────────┘   │ (Calls Agent)    │   │ (Retrieves Context│   └────────────▲──────┘
      ▲                          └─────────┬────────┘   │  Invokes LLM)     │              │
      │                                    │            └─────────┬─────────┘              │
      │ Displays Response                  │                      │                        │
      │                                    │ Calls Client         │ Uses Vector Store      │
      │                                    ▼                      ▼                        │
      │                                ┌──────────────────┐   ┌───────────────────┐        │
      └────────────────────────────────│ AgentAPIClient   │◀──│ AI Response       │◀───────┘
                                       └──────────────────┘   └───────────────────┘
```

## Security Architecture

### Authentication & Authorization
- **Frontend <-> Backend**: JWT-based authentication handled by Django.
- **Backend <-> Agent Service**: Service-to-service authentication will use a pre-shared secret key passed via a custom HTTP header (e.g., `X-Internal-API-Key`). This key must be generated securely, stored in environment variables for both services (`INTERNAL_API_KEY`), and rotated periodically. The Agent service firewall/network configuration should restrict incoming traffic to only allow requests from the Backend service's IP address range or internal network.
- **Authorization**: Handled within Django using DRF permissions (e.g., user owns the bot).

### Data Protection
- Encryption at rest (handled by PostgreSQL and Pinecone).
- TLS/HTTPS required for all external connections (Frontend <-> Backend).
- TLS should be used for internal connections if services run on different networks (Backend <-> Agent, Agent <-> Pinecone).
- API keys (Google, Pinecone, Internal) managed securely via environment variables (e.g., `.env` file, secrets manager), loaded only by the services that need them (primarily Agent Service, `INTERNAL_API_KEY` also needed by Django).

### Infrastructure Security
- Docker container security best practices.
- Network policies (e.g., in Kubernetes or Docker Compose) to restrict communication between services.

## Scalability Considerations

### Horizontal Scaling
- Both Django Backend and FastAPI Agent services are designed to be stateless (session state potentially stored in Redis/DB) and can be scaled horizontally by running multiple instances behind a load balancer.
- Pinecone scales independently based on the chosen pod configuration.
- PostgreSQL can be scaled using read replicas.

### Caching Strategy
- **Django**: Cache database queries, computed properties, or full API responses using Redis.
- **Agent Service**: Caching LLM responses for identical inputs might be possible but complex due to context variations. Caching embeddings for identical text chunks is feasible.

## Monitoring and Observability

- **Metrics**: Expose metrics (e.g., request count, latency, error rates) from both Django and FastAPI services (using libraries like `django-prometheus` and `prometheus-fastapi-instrumentator`).
- **Logging**: Structured logging in both services, potentially aggregated to a central system (e.g., ELK/Loki).
- **Tracing**: Implement distributed tracing (e.g., OpenTelemetry) to track requests across Django -> Agent -> Pinecone/Google AI.
- **External Services**: Monitor Pinecone and Google AI platform dashboards for usage, performance, and errors.

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