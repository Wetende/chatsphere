# ChatSphere Agent Service Scaling Plan

This document outlines the strategy for scaling the `chatsphere_agent` (FastAPI) service to handle increasing load and ensure optimal performance and cost-efficiency.

## Goals

- Maintain low latency for chat responses and embedding requests.
- Handle a growing number of concurrent users and API calls.
- Optimize resource utilization (CPU, Memory, GPU if applicable, external API calls).
- Ensure cost-effectiveness of underlying AI services (Google AI, Pinecone).
- Maintain high availability and reliability.

## Approach

Scaling will be approached in phases, starting with baseline optimization and progressing to horizontal scaling and advanced techniques.

---

## Phase 1: Baseline Optimization & Monitoring (Initial Deployment - Month 1-2)

### Focus
Establish performance baseline, optimize core logic, and implement basic monitoring.

### Tasks
1.  **Establish Baselines:**
    *   Use load testing tools (Locust, k6) to measure baseline latency and throughput for `/chat` and `/embed_and_store` endpoints under simulated load.
    *   Monitor CPU, memory usage of the agent service container(s) under load.
    *   Track average response times from external services (Pinecone query/upsert, Google AI embedding/chat completion).
2.  **Code & Query Optimization:**
    *   Review `agent.py` and `vector_store.py` for inefficient operations.
    *   Ensure efficient use of async/await for I/O-bound tasks (Pinecone, Google AI calls).
    *   Optimize Pinecone queries: Ensure metadata filters are used correctly (e.g., querying within the `bot_id` namespace), experiment with `top_k`.
    *   Implement batching for Pinecone `upsert` operations within `embed_and_store_chunks` if processing multiple chunks simultaneously.
    *   Review LangChain usage: Ensure chains/agents are constructed efficiently and unnecessary steps are avoided.
3.  **Configuration Tuning:**
    *   Tune default settings in `config.py` (e.g., default LLM temperature, default `top_k` for retrieval) based on initial testing.
    *   Adjust default timeouts for `httpx` calls to external services.
4.  **Basic Monitoring Setup:**
    *   Integrate a FastAPI monitoring library (e.g., `prometheus-fastapi-instrumentator`) to expose basic metrics (request counts, latency histograms, error counts per endpoint).
    *   Ensure structured logging provides sufficient detail for debugging performance issues.

### Success Metrics
- Baseline performance metrics documented.
- Average `/chat` latency under moderate load < 1-2 seconds (excluding external API time).
- Average `/embed_and_store` latency acceptable for user experience (depends on chunk count).
- Basic Prometheus metrics dashboard created.

---

## Phase 2: Horizontal Scaling & Caching (Month 2-4)

### Focus
Handle increased concurrent load by running multiple instances and introducing caching where appropriate.

### Tasks
1.  **Containerization Review:**
    *   Ensure `backend/chatsphere_agent/Dockerfile` is optimized for build time and image size.
    *   Verify resource requests/limits are appropriately set in deployment configurations (Docker Compose, Kubernetes).
2.  **Implement Horizontal Scaling:**
    *   Configure deployment (Kubernetes Deployment, Docker Compose service replicas) to run multiple instances of the agent service.
    *   Set up Horizontal Pod Autoscaling (HPA) in Kubernetes based on CPU/memory usage or custom metrics (e.g., request queue length).
3.  **Load Balancing:**
    *   Ensure a load balancer (Nginx, cloud provider LB, Kubernetes Ingress) is distributing traffic evenly across agent service instances.
4.  **Implement Caching (Optional but Recommended):**
    *   Integrate Redis for caching.
    *   **Embedding Cache:** Cache embeddings for identical text chunks (`key = hash(chunk_text)`). Check cache before calling `generate_embeddings`.
    *   **LLM Response Cache (Use with caution):** Potentially cache `/chat` responses based on a hash of `(bot_id, message, history, relevant_context_hash, config_params)`. Requires careful key design and invalidation strategy. Might only be suitable for very common, non-personalized queries.
    *   **Vector Store Results Cache:** Cache results from `get_relevant_chunks` based on `(bot_id, query)`. Useful if the same queries are frequent for a bot.

### Success Metrics
- Service maintains target latency under increased load (e.g., 2x baseline load).
- Autoscaling successfully adds/removes instances based on load.
- Cache hit rates demonstrate effectiveness (if caching implemented).
- No single instance becomes a bottleneck.

---

## Phase 3: Advanced Strategies & Cost Optimization (Month 4+)

### Focus
Further optimize performance, reliability, and cost using more advanced techniques.

### Tasks
1.  **Asynchronous Embedding Confirmation:**
    *   If embedding is offloaded to Celery (managed by Django), ensure the Agent Service's `/embed_and_store` endpoint is robust but lightweight (just receives data, triggers task). Ensure the mechanism for updating PostgreSQL (`chunks.pinecone_vector_id`, `documents.status`) via the Celery task is implemented and reliable.
2.  **Rate Limiting & Cost Control:**
    *   Implement rate limiting within FastAPI (e.g., using `slowapi`) to prevent abuse and manage costs, potentially tied to user subscription tiers (information passed from Django).
    *   Monitor Google AI and Pinecone costs closely.
    *   Dynamically select cheaper/faster models (e.g., Gemini Flash vs. Pro) based on `bot.configuration` or inferred task complexity where appropriate.
3.  **Advanced Retrieval:**
    *   Explore more advanced retrieval strategies in `retrievers/` if basic vector search becomes insufficient (e.g., hybrid search, re-ranking).
4.  **GPU Acceleration (If Applicable):**
    *   If self-hosting embedding or LLM models in the future, configure deployments to utilize GPU resources effectively. (Less relevant initially with Google AI/Pinecone SaaS).
5.  **Queueing High Load:**
    *   For embedding, if Celery isn't used or load spikes exceed capacity, consider an internal queue within the agent service (e.g., FastAPI background tasks, `arq`) to process embedding requests sequentially or with controlled concurrency, providing immediate feedback to Django while processing occurs.
6.  **Refined Monitoring & Alerting:**
    *   Set up alerts based on key metrics (high latency, high error rates, high resource usage, excessive external API costs).
    *   Implement distributed tracing (e.g., OpenTelemetry) to track requests across Django -> Agent -> External services.

### Success Metrics
- Cost per X chat interactions / embeddings remains within target.
- System reliably handles load spikes without significant latency degradation.
- Rate limiting effectively prevents abuse.
- End-to-end request tracing implemented.

---

## Considerations

- **Statelessness:** Ensure the agent service remains stateless to facilitate horizontal scaling. Any necessary state (like conversation history for complex agents) should be passed in requests or managed externally (e.g., using LangChain memory backed by Redis/DB).
- **Configuration Management:** Scaling requires robust management of environment variables and configurations across multiple instances.
- **Dependencies:** Scaling might impact external dependencies (Pinecone tier limits, Google AI quotas). Monitor these closely. 