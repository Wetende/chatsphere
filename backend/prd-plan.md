# KyroChat Backend Implementation Plan

This document outlines the phased development plan for the KyroChat backend, based on the PRDs in `plan/prds`. It tracks completed tasks and defines the roadmap for project completion.

---

## Current Status Summary

- **Architecture**: Onion Architecture foundation is in place.
- **Database**: Models are defined, and migrations are set up with Alembic. All primary and foreign keys have been successfully converted to `Integer` types.
- **API**: All endpoints have been standardized to use only `GET` and `POST` methods as requested. Placeholder routers for core features are implemented.
- **Authentication**: Basic user registration and login are functional.
- **Server**: The FastAPI server runs successfully.

---

## Phase 1: Core Platform Foundation

**Objective**: Solidify the core application logic, fully implement user and bot management, and establish a testing framework.

-   [x] **Project Setup** (`Phase0-ProjectSetup.md`)
    -   [x] FastAPI backend with Onion Architecture.
    -   [x] PostgreSQL database with async SQLAlchemy.
    -   [x] Alembic for database migrations.
    -   [x] Integer IDs for all entities.
    -   [x] Standardized GET/POST methods for all API endpoints.

-   [ ] **Complete User Management** (`Component-UserAuthentication.md`)
    -   [x] User Registration (`/auth/register`).
    -   [x] User Login (`/auth/login`).
    -   [ ] **Implement `UpdateUserProfileUseCase`** and wire to `POST /users/me`.
    -   [ ] **Implement `ChangePasswordUseCase`** and wire to `POST /users/change-password`.
    -   [ ] **Implement `DeactivateUserUseCase`** and wire to `GET /users/delete/me`.
    -   [ ] Implement Password Reset flow (forgot password, email sending).
    -   [ ] Implement Email Verification flow.

-   [ ] **Implement Bot Management** (`Component-BotManagement.md`)
    -   [ ] Implement `CreateBotUseCase` and `UpdateBotUseCase` and wire to `POST /bots/{id}`.
    -   [ ] Implement `GetBotUseCase` and wire to `GET /bots/{id}`.
    -   [ ] Implement `ListBotsUseCase` and wire to `GET /bots`.
    -   [ ] Implement `DeleteBotUseCase` and wire to `GET /bots/delete/{id}`.
    -   [ ] Implement `SqlAlchemyBotRepository` with full CRUD logic.
    -   [ ] Enforce authorization (users can only manage their own bots).

-   [ ] **Implement Conversation Management** (`Component-ChatSystem.md`)
    -   [ ] Implement `CreateConversationUseCase`, `UpdateConversationUseCase`, etc.
    -   [ ] Implement `SqlAlchemyConversationRepository` with full CRUD logic.
    -   [ ] Wire up all conversation endpoints in `conversation_router.py`.

-   [ ] **Establish Testing Foundation** (`Component-TestingQA.md`)
    -   [ ] Configure `pytest` with `pytest-asyncio` and `httpx`.
    -   [ ] Write integration tests for all existing User, Bot, and Conversation endpoints.
    -   [ ] Set up code quality tools (`black`, `isort`, `mypy`).

---

## Phase 2: AI Integration & Core Chat Functionality

**Objective**: Integrate AI services for intelligence, enable bot training through document processing, and launch the real-time chat feature.

-   [ ] **Direct AI Integration** (`Component-AIIntegration.md`)
    -   [ ] Define `IAIService` (for generation) and `IVectorService` (for embeddings) interfaces in the `domain` layer.
    -   [ ] Implement `GeminiService` in `infrastructure` for direct Google Gemini API calls.
    -   [ ] Implement `PineconeService` in `infrastructure` for direct Pinecone API calls.
    -   [ ] Wire services into the dependency injection container (`composition_root.py`).

-   [ ] **Document Processing Pipeline** (`Component-DocumentProcessing.md`)
    -   [ ] Create `POST /ingestion/upload` endpoint.
    -   [ ] Implement file validation (TXT, PDF).
    -   [ ] Implement text extraction logic.
    -   [ ] Implement intelligent text chunking.
    -   [ ] Use FastAPI `BackgroundTasks` to process uploads asynchronously.
    -   [ ] Integrate with `PineconeService` to create and store embeddings.
    -   [ ] Create `GET /ingestion/status/{job_id}` to track processing status.

-   [ ] **Real-time Chat System** (`Component-ChatSystem.md`)
    -   [ ] Implement WebSocket endpoint: `GET /chat/ws/{bot_id}`.
    -   [ ] Implement `SendMessageUseCase` that:
        -   Takes a user message.
        -   Retrieves relevant context from Pinecone.
        -   Generates a response using Gemini.
        -   Streams the response back over the WebSocket.
    -   [ ] Persist conversations and messages to the database.

---

## Phase 3: Advanced Features & Developer Experience

**Objective**: Enhance the platform with advanced training, analytics, and better developer tools.

-   [ ] **Enhanced Training** (`Phase2-EnhancedTraining.md`)
    -   [ ] Add URL scraping as a data source for bot training.
-   [ ] **Analytics & Monitoring** (`Component-MonitoringAnalytics.md`)
    -   [ ] Implement basic conversation analytics (e.g., message count, user feedback).
    -   [ ] Add Prometheus metrics for API performance monitoring.
-   [ ] **API Documentation & DX** (`Component-APIDocs.md`)
    -   [ ] Enhance autogenerated OpenAPI docs with detailed summaries, descriptions, and examples for all endpoints.
-   [ ] **Security Hardening** (`Component-SecurityCompliance.md`)
    -   [ ] Implement rate limiting on sensitive endpoints like login and password reset.

---

## Phase 4: Production Readiness & Launch

**Objective**: Ensure the platform is secure, performant, well-tested, and ready for deployment.

-   [ ] **Comprehensive Testing** (`Component-TestingQA.md`)
    -   [ ] Increase test coverage to >90% for all critical components.
    -   [ ] Implement end-to-end tests for key user flows.
-   [ ] **Performance Optimization** (`Component-PerformanceOptimization.md`)
    -   [ ] Implement Redis caching for frequently accessed data.
    -   [ ] Optimize critical database queries.
-   [ ] **Deployment & DevOps** (`Component-DeploymentDevOps.md`)
    -   [ ] Create scripts and systemd service files for production deployment.
    -   [ ] Set up CI/CD pipeline with GitHub Actions to automate testing.
-   [ ] **Final Polish** (`Phase4-PolishAndLaunch.md`)
    -   [ ] Conduct a final security audit.
    -   [ ] Complete all user-facing documentation.
