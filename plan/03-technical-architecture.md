# ChatSphere Technical Architecture

This document outlines the detailed technical architecture, system design, and component interactions for the ChatSphere platform.

## System Architecture Overview

ChatSphere follows a layered architecture with a distinct separation between the core backend (FastAPI) and the AI processing module (integrated in FastAPI).

```
┌───────────────────────────────────────────────────────────────┐
│                      Client Applications                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ Web Frontend │  │ Embedded     │  │ API Consumers        │ │
│  │ (React.js)   │  │ Widget (JS)  │  │ (3rd Party Services) │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
                             ▲
                             │ HTTPS/REST (via Nginx/Gateway)
                             ▼
┌───────────────────────────────────────────────────────────────┐
│                     Backend Service (FastAPI)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │ User Mgmt &  │  │ Bot & Doc    │  │ Agent Module         │ │
│  │ Auth (JWT)   │  │ Mgmt APIs    │  │ (AI Processing)      │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
└─────────────────────────────┬────────────────────┬──────────────┘
                              │                    │
                              │ DB Connection      │ Internal Calls
                              ▼                    ▼
┌──────────────────────────────────┐  ┌──────────────────────────────┐
│    Application Database          │  │    Vector Database (Pinecone)│ │
│    (PostgreSQL)                  │  │ └────────────┬─────────────┘ │
│ ┌─────────┐ ┌─────────┐ ┌──────┐ │  │              │                │
│ │ Users   │ │ Bots    │ │ Docs │ │  │              │ Pinecone API   │
│ │ Convos  │ │ Chunks  │ │ ...  │ │  │              └────────────────┘ │
│ └─────────┘ └─────────┘ └──────┘ │  └────────────────────────────────┘
└──────────────────────────────────┘
```

## Component Details

### 1. Client Applications

#### Web Frontend (React.js)
- **Framework**: React.js with Redux
- **State Management**: Redux
- **Routing**: React Router
- **UI Framework**: Custom components (e.g., Tailwind CSS or a UI library like Material-UI)
- **API Communication**: Axios (or fetch) communicating with the FastAPI Backend API.
- **Key Features**:
  - User authentication (Login/Register)
  - Dashboard for managing bots
  - Interface for creating/configuring bots
  - Document upload/management interface
  - Real-time chat interface (potentially using WebSockets connected to FastAPI)
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
  - (If implemented) Vanilla JS or lightweight framework, communicates with FastAPI Backend API.

#### API Consumers
- External services interacting directly with the FastAPI Backend API (using API keys or JWT).

### 2. Backend Service (FastAPI)

- **Framework**: FastAPI with Pydantic, SQLAlchemy
- **Responsibilities**:
  - Handles all client requests (Web Frontend, Widget, API Consumers).
  - User authentication (JWT) and management.
  - CRUD operations for Bots, Documents, Chunks (text content only), Conversations, Messages.
  - Serves as the primary API gateway for clients.
  - **Orchestration**: When AI operations are needed (embedding, chat), it calls the integrated agent module.
  - Manages application data persistence in PostgreSQL.
  - **Real-time Handling**: WebSocket implementation using FastAPI WebSockets.
- **Key Modules**: `app/routers/`, `app/services/`, `app/models/`, `app/config.py`, `agent/` module.

### 3. Agent Module (Integrated in FastAPI)

- **Framework**: FastAPI module
- **Responsibilities**:
  - Handles internal AI tasks.
  - Loads AI models (Gemini LLM, Google Embeddings).
  - Interacts with the Pinecone API (via `pinecone-client` or LangChain integration) to store and retrieve vector embeddings.
  - Executes LangChain agent logic for chat responses, incorporating retrieved context.
  - Manages its own configuration (API keys, etc.) loaded from `.env`.
  - Handles different agent configurations based on parameters from core app.
- **Key Modules**: `agent/main.py` (if separate), `agent/agent.py`, `agent/vector_store.py`, `agent/config.py`.
- **Endpoints (Examples)**:
    - `/health` (GET)
    - `/embed_and_store` (POST)
    - `/chat` (POST)

### Bot Configuration Schema (`Bot.configuration` field in PostgreSQL)

To enable flexible agent behavior, the `configuration` JSONB field on the `Bot` model should adhere to a defined schema. The Agent module will expect parameters within this structure. Example schema:

```json
{
  "agent_type": "rag",
  "llm_model": "gemini-2.0-flash",
  "temperature": 0.7,
  "system_prompt": "You are a helpful AI assistant for Contoso Inc. Be polite and concise.",
  "retriever_k": 5,
  "chat_history_length": 10,
  "tools": []
}
```
*Note: The Agent module should use sensible defaults if specific keys are missing.*

### 4. Database Layer

#### Application Database (PostgreSQL)
- Managed by SQLAlchemy ORM.
- Stores core relational data: `User`, `UserProfile`, `Bot`, `Document`, `Chunk` (text content, vector ID link), `Conversation`, `Message`, `SubscriptionPlan`, etc.

#### Vector Database (Pinecone Service)
- External SaaS managed by Pinecone.
- Accessed *only* by the FastAPI Agent module.
- Stores dense vector embeddings generated by the Google embedding model.
- Indexed metadata includes `bot_id`, `document_id`, `chunk_id` for filtering and linking back to PostgreSQL data.

### 5. External Service Integrations (within Agent Module)

#### Google AI (Gemini & Embeddings)
- **Purpose**: LLM for chat, embedding model for vector generation.
- **SDK**: `langchain-google-genai`.
- **Integration Pattern**: Initialized within the Agent module, potentially using LangChain wrappers.

#### Pinecone API
- **Purpose**: Vector database for semantic search.
- **SDK**: `pinecone-client` and/or `langchain-pinecone`.
- **Integration Pattern**: Client initialized within the Agent module, used directly or via LangChain `PineconeVectorStore`.

#### LangChain
- **Purpose**: Framework for orchestrating AI components (LLM, vector store, prompts, agents).
- **Usage**: Primarily within the Agent module to structure chat logic, retrieval, and potentially embedding workflows. Enables the implementation of various agent types (conversational retrieval QA, ReAct, tool-using agents) within the decoupled Agent module.

## Data Flow Diagrams

### Document Processing Flow

```
┌────────────┐   ┌───────────┐   ┌──────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│ User       │   │ Frontend  │   │ FastAPI Backend  │   │ Agent Module      │   │ Pinecone Service  │
│ Uploads    │──▶│ Upload UI │──▶│ Document Router  │──▶│ embed_and_store   │──▶│ Store Vectors     │
│ Document   │   └───────────┘   │ (Save Doc/Chunks)│   │ (Embeds Chunks)   │   └───────────────────┘
└────────────┘                   └─────────┬────────┘   └─────────┬─────────┘
                                           │                      │
                                           │ Store Doc/Chunk Text │ Internal Call      │
                                           ▼                      ▼
                                       ┌───────────┐      ┌──────────────────┐
                                       │ PostgreSQL│      │ Agent Logic      │
                                       └───────────┘      └──────────────────┘
```

### Chat Interaction Flow

```
┌────────────┐   ┌───────────┐   ┌──────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│ User       │   │ Frontend  │   │ FastAPI Backend  │   │ Agent Module      │   │ Pinecone Service  │
│ Sends Msg  │──▶│ Chat UI   │──▶│ Chat Endpoint    │──▶│ /chat Endpoint    │──▶│ Retrieve Context  │
└────────────┘   └───────────┘   │ (Calls Agent)    │   │ (Retrieves Context│   └────────────▲──────┘
      ▲                          └─────────┬────────┘   │  Invokes LLM)     │              │
      │                                    │            └─────────┬─────────┘              │
      │ Displays Response                  │                      │                        │
      │                                    │ Internal Call        │ Uses Vector Store      │
      │                                    ▼                      ▼                        │
      │                                ┌──────────────────┐   ┌───────────────────┐        │
      └────────────────────────────────│ Agent Logic       │◀──│ AI Response       │◀───────┘
                                       └──────────────────┘   └───────────────────┘
```

## Security Architecture

### Authentication & Authorization
- **Frontend <-> Backend**: JWT-based authentication handled by FastAPI.
- **Backend <-> External Services**: API keys for Pinecone and Google AI.
- **Authorization**: Handled within FastAPI using dependencies and scopes.

### Data Protection
- Encryption at rest (handled by PostgreSQL and Pinecone).
- TLS/HTTPS required for all external connections (Frontend <-> Backend).
- TLS should be used for internal connections if services run on different networks (Backend <-> Pinecone/Google AI).
- API keys (Google, Pinecone) managed securely via environment variables (e.g., `.env` file, secrets manager), loaded only by the services that need them (primarily Agent module).

### Infrastructure Security
- Docker container security best practices.
- Network policies (e.g., in Kubernetes or Docker Compose) to restrict communication between services.

## Scalability Considerations

### Horizontal Scaling
- FastAPI Backend is stateless and can be scaled horizontally by running multiple instances behind a load balancer.
- Pinecone scales independently based on the chosen pod configuration.
- PostgreSQL can be scaled using read replicas.

### Caching Strategy
- **FastAPI**: Cache database queries, computed properties, or full API responses using Redis.
- **Agent Module**: Caching LLM responses for identical inputs might be possible but complex due to context variations. Caching embeddings for identical text chunks is feasible.

## Monitoring and Observability

- **Metrics**: Expose metrics (e.g., request count, latency, error rates) from FastAPI (using `prometheus-fastapi-instrumentator`).
- **Logging**: Structured logging in FastAPI, potentially aggregated to a central system (e.g., ELK/Loki).
- **Tracing**: Implement distributed tracing (e.g., OpenTelemetry) to track requests across FastAPI -> Pinecone/Google AI.
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

The full API documentation will be available at `/docs` and includes:
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