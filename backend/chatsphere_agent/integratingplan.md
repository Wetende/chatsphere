# ChatSphere Agent Service Integration Plan

## 1. Objective

To finalize the integration of the `chatsphere_agent` (FastAPI) service with the main ChatSphere Django backend, ensuring clear API contracts, robust communication, internal consistency, and removal of code duplication. This plan focuses on the Agent Service side and its interaction points.

## 2. Phase 1: Internal Refactoring & Consistency (Agent Service)

**Goal:** Consolidate initialization logic and ensure consistent use of shared components.

**Tasks:**

*   **Centralize Initialization:**
    *   Implement FastAPI's `lifespan` context manager (e.g., in `main.py` or `core/lifespan.py`).
    *   Within the `lifespan` startup:
        *   Initialize the `Pinecone` client and `Index` instance using the robust logic from `ingestion/vectorization.py` (including API key checks, environment loading, index existence check). Store globally (e.g., in `core/dependencies.py`).
        *   Initialize the `GoogleGenerativeAIEmbeddings` model using settings from `config.py`. Store globally.
        *   Initialize the `ChatGoogleGenerativeAI` LLM instance. Store globally.
*   **Implement Dependency Injection:**
    *   Create provider functions (e.g., `get_pinecone_index()`, `get_embedding_model()`, `get_llm()`) in `core/dependencies.py` that return the globally initialized instances.
    *   Refactor all functions/endpoints currently initializing or accessing these clients directly (in `ingestion/vectorization.py`, `vector_store.py`, `agent.py`, `routing/` endpoints) to use FastAPI's `Depends` with these providers (`index: Index = Depends(get_pinecone_index)`).
*   **Refactor `vector_store.py`:**
    *   Remove all client initialization logic.
    *   Rename if desired (e.g., `retrieval.py` or `pinecone_ops.py`) if its primary purpose shifts solely to Pinecone query/upsert operations using injected clients. Ensure `retrieve_relevant_context` uses the injected index/embedding model. (Keep name `vector_store.py` for now unless functionality significantly narrows). Functions like `add_conversation_turn` might be deprecated if chat history isn't stored directly in Pinecone this way.
*   **Refactor `ingestion/vectorization.py`:**
    *   Remove all client initialization logic.
    *   Ensure `generate_embeddings` and `upload_to_pinecone` use injected dependencies.

## 3. Phase 2: API Endpoint Finalization (Agent Service)

**Goal:** Define and implement stable, well-documented API contracts for communication with the Django backend.

**Tasks:**

*   **Define Pydantic Models (`models/`)**:
    *   Finalize request models (`EmbedRequest`, `ChatRequest`) ensuring they include all necessary fields (`document_id`, `chunks`, `metadata` including `bot_id` for embed; `bot_id`, `message`, `history`, `config_params` for chat).
    *   Finalize response models (`EmbedResponse`, `ChatResponse`) ensuring they return required data (`status`, `error_message`, `stored_vector_ids` for embed; `response_text`, `metadata` including `tokens_used`, `source_chunk_ids` for chat).
*   **Implement `/embed_and_store` Endpoint (`routing/`):**
    *   Accepts `EmbedRequest`.
    *   Calls `ingestion.core.ingest_data` (which now uses injected dependencies).
    *   Handles exceptions gracefully, returning appropriate HTTP status codes (e.g., 200/201 for success, 400 for bad input, 500 for internal errors).
    *   Returns `EmbedResponse` with status, vector IDs, and detailed error messages on failure.
*   **Implement `/chat` Endpoint (`routing/`):**
    *   Accepts `ChatRequest` including `config_params`.
    *   Calls retrieval logic (`vector_store.retrieve_relevant_context` or similar).
    *   Calls agent/chain execution logic (`agent.py` or `chains/`), passing `config_params` to dynamically configure the LLM, retriever, prompt, agent type etc.
    *   Handles exceptions gracefully (e.g., LLM errors, Pinecone errors).
    *   Returns `ChatResponse` with the text response and extracted metadata (token counts, source IDs).
*   **Implement `/health` Endpoint (`routing/`):**
    *   Simple endpoint returning `{"status": "ok"}` for health checks.

## 4. Phase 3: Finalize Communication Flow (Django <> Agent)

**Goal:** Ensure the mechanisms for triggering agent tasks and receiving results back in Django are correctly implemented (primarily affects Django side, but Agent API must support it).

**Tasks (Agent Service Support):**

*   **Confirm API Stability:** Ensure the finalized API endpoints (Phase 2) provide all necessary information for Django.
*   **Error Reporting:** Ensure error responses from the Agent API are detailed enough for Django to log meaningful errors (e.g., distinguishing Pinecone errors from LLM errors).

**Tasks (Django Backend Implementation - for context):**

*   Refine `services/agent_client.py` to call the finalized Agent API endpoints and handle the defined responses/errors.
*   Implement the chosen async embedding flow:
    *   Celery task calls `/embed_and_store`.
    *   Celery task receives `EmbedResponse`.
    *   Celery task updates PostgreSQL `Chunk` records with `pinecone_vector_id` on success.
    *   Celery task updates `Document` status to `ready` or `embedding_error` based on the response.
*   Ensure the synchronous chat flow in Django views correctly passes `config_params` to `/chat` and saves returned metadata.

## 5. Phase 4: Integration Testing

**Goal:** Verify the end-to-end communication and functionality between Django and the Agent service.

**Tasks:**

*   **Agent Service Tests:** Write integration tests mocking external calls (Google AI, Pinecone) using tools like `unittest.mock` or specific libraries, verifying endpoint logic with different inputs and `config_params`. Include AI Quality tests (relevance, hallucination checks). (Ref: `plan/08-testing-strategy.md`).
*   **Django Backend Tests:** Write integration tests mocking the Agent Service API calls using `respx` or `pytest-httpx`, ensuring `agent_client.py` handles responses correctly and triggers appropriate DB updates.
*   **End-to-End Tests (Manual/Automated):** Test the full flow: Uploading a document via the frontend -> verifying `Document`/`Chunk` creation in Django -> verifying successful embedding via agent call -> verifying `Chunk` update in Django -> Performing a chat interaction -> verifying context retrieval and response generation.

## 6. Phase 5: Documentation

**Goal:** Document the internal architecture and API of the Agent Service.

**Tasks:**

*   Update/Generate OpenAPI documentation for the Agent Service API endpoints (`/embed_and_store`, `/chat`, `/health`).
*   Add internal documentation (READMEs, code comments) explaining the refactored initialization, dependency injection, and core logic flow within the agent service.
*   Ensure `scaling.md` reflects the final architecture. 