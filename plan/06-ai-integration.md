# ChatSphere AI Integration

This document outlines the AI integration strategy for ChatSphere, detailing how we leverage various AI technologies to create powerful, context-aware chatbots.

## Technology Stack

- **Large Language Models**: Google Gemini (e.g., gemini-2.0-flash)
- **Embeddings**: Google Generative AI Embeddings (e.g., models/embedding-001)
- **Vector Database**: Pinecone
- **AI Framework**: LangChain
- **Caching**: Redis (Optional)
- **Queue System**: Celery (Optional, for background embedding)
- **Monitoring**: Prometheus + Grafana (Optional)

## Architecture Overview

All AI logic resides within the `backend/chatsphere_agent` FastAPI service.

```
backend/chatsphere_agent/
├── main.py               # FastAPI app definition and endpoints
├── agent.py              # LangChain agent setup (LLM, tools, executor)
├── vector_store.py       # Pinecone integration (embedding, storage, retrieval)
├── config.py             # Configuration loading (API keys, settings)
├── requirements.txt      # Agent service dependencies
├── tools/                # Optional: Custom agent tools
└── tests/                # Unit and integration tests for the agent service
    ├── unit/
    ├── integration/
    └── ai/               # AI-specific quality tests
```

## Core Components (within Agent Service)

### 1. LLM Integration (using LangChain)

```python
# backend/chatsphere_agent/agent.py (Conceptual Snippet)
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_react_agent # Or other agent types
from langchain.prompts import PromptTemplate # Or ChatPromptTemplate
from .config import settings # Use a settings object

def get_llm(config_params: dict | None = None):
    """Initializes the Google Gemini LLM, potentially using overrides."""
    config = config_params or {}
    model_name = config.get('llm_model', settings.DEFAULT_GEMINI_MODEL)
    temperature = config.get('temperature', settings.DEFAULT_TEMPERATURE)
    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=temperature,
        # ... other params ...
    )

def setup_agent(llm, retriever, tools, config_params: dict | None = None):
    """Sets up the LangChain agent executor based on configuration."""
    config = config_params or {}
    agent_type = config.get('agent_type', 'rag') # Default to RAG
    custom_prompt_template = config.get('system_prompt')

    # TODO: Implement logic to select/create agent and prompt based on agent_type
    if agent_type == 'rag':
        # Setup RAG agent (e.g., ConversationalRetrievalChain or custom)
        prompt = PromptTemplate(...) # Define RAG prompt
        if custom_prompt_template:
             # Modify prompt based on custom_prompt_template
             pass
        # chain = ConversationalRetrievalChain.from_llm(...)
        # return chain # Return the chain directly if not using AgentExecutor
        pass # Replace with actual RAG setup
    elif agent_type == 'react':
        prompt = PromptTemplate(...) # Define ReAct prompt
        agent = create_react_agent(llm, tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)
        return agent_executor
    # Add other agent types as needed
    else:
        raise ValueError(f"Unsupported agent type: {agent_type}")

# In main.py or where agent is invoked:
# llm = get_llm()
# retriever = vector_store.get_retriever(...) # From vector_store.py
# tools = [...] # Define tools if any
# agent_executor = setup_agent(llm, retriever, tools)
# result = agent_executor.invoke({"input": ..., "context": ..., "chat_history": ...})
```

### 2. Embedding Generation (using LangChain)

```python
# backend/chatsphere_agent/vector_store.py (Conceptual Snippet)
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from .config import settings # Use a settings object
import numpy as np
from typing import List

def get_embedding_model():
    """Initializes the Google embedding model."""
    return GoogleGenerativeAIEmbeddings(
        model=settings.EMBEDDING_MODEL_NAME,
        google_api_key=settings.GOOGLE_API_KEY
    )

async def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """Generates embeddings for a list of texts."""
    embedding_model = get_embedding_model()
    # Use async embedding if available and needed, otherwise use embed_documents
    # embeddings = await embedding_model.aembed_documents(texts)
    embeddings = embedding_model.embed_documents(texts)
    return embeddings

# Normalization might not be strictly necessary as Pinecone handles normalization
# based on the metric chosen (e.g., cosine normalizes automatically).
# Check Pinecone and LangChain Pinecone integration docs for best practices.
```

### 3. Vector Store Integration (using LangChain + Pinecone)

```python
# backend/chatsphere_agent/vector_store.py (Conceptual Snippet)
import pinecone
from langchain_pinecone import PineconeVectorStore
from .config import settings # Use a settings object
from contextlib import asynccontextmanager
from fastapi import Depends
from pinecone import Pinecone, Index

# Global Pinecone client (initialized during lifespan)
_pinecone_client: Pinecone | None = None
_pinecone_index: Index | None = None

def get_pinecone_index() -> Index:
    if _pinecone_index is None:
        # This should ideally not happen if lifespan is used correctly
        raise RuntimeError("Pinecone index not initialized.")
    return _pinecone_index

# --- Lifespan function for FastAPI startup/shutdown ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Pinecone client and get index
    global _pinecone_client, _pinecone_index
    _pinecone_client = Pinecone(api_key=settings.PINECONE_API_KEY, environment=settings.PINECONE_ENVIRONMENT)
    # TODO: Add check/creation logic for the index if it might not exist
    _pinecone_index = _pinecone_client.Index(settings.PINECONE_INDEX_NAME)
    print("Pinecone client initialized.")
    yield
    # Shutdown: Cleanup (optional, Pinecone client might not need explicit closing)
    print("Pinecone client shutting down.")
    # _pinecone_client.deinit() # Check if deinit is needed/available

# --- Embedding Model (can also be initialized once) ---
_embedding_model = None
def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = GoogleGenerativeAIEmbeddings(
            model=settings.EMBEDDING_MODEL_NAME,
            google_api_key=settings.GOOGLE_API_KEY
        )
    return _embedding_model


async def embed_and_store_chunks(doc_id: str, chunks: List[str], metadata_base: Dict[str, Any], index: Index = Depends(get_pinecone_index)):
    """Embeds chunks and stores them in Pinecone."""
    embedding_model = get_embedding_model()
    # Generate embeddings
    embeddings = await generate_embeddings(chunks)
    
    # Prepare metadata for each chunk
    metadatas = []
    vector_ids = []
    for i, chunk_content in enumerate(chunks):
        chunk_id = f"{doc_id}-chunk-{i}" # Example ID generation
        vector_ids.append(chunk_id)
        meta = metadata_base.copy()
        meta.update({
            "document_id": doc_id,
            "chunk_index": i,
            "text": chunk_content # Store original text in metadata
        })
        metadatas.append(meta)
        
    # Upsert using the native pinecone client (obtained via dependency injection)
    # Consider batching upserts for large numbers of chunks
    index.upsert(vectors=zip(vector_ids, embeddings, metadatas), namespace=metadata_base.get("bot_id")) # Use bot_id as namespace

    # Return IDs for potential DB update in Django
    return vector_ids

def get_vector_store(index: Index = Depends(get_pinecone_index)) -> PineconeVectorStore:
    """Initializes and returns the LangChain Pinecone vector store using injected index."""
    embedding_model = get_embedding_model()
    # Note: LangChain's from_existing_index might re-initialize client internally.
    # Using the native client directly for upsert/query might be more efficient
    # if Pinecone client is managed globally via lifespan/dependency injection.
    # Alternatively, pass the initialized index object if LangChain wrapper supports it.
    vectorstore = PineconeVectorStore(
        index=index, # Pass the index dependency
        embedding=embedding_model,
        text_key="text", # Assuming 'text' is in metadata for LangChain compatibility
        namespace=None # Namespace handled during query
    )
    return vectorstore

async def get_relevant_chunks(bot_id: str, query: str, top_k: int = 5, index: Index = Depends(get_pinecone_index)) -> List[str]:
    """Retrieves relevant chunks directly using Pinecone client and metadata filtering."""
    embedding_model = get_embedding_model()
    query_vector = embedding_model.embed_query(query)

    # Query Pinecone using the injected index dependency
    results = index.query(
        vector=query_vector,
        top_k=top_k,
        include_metadata=True,
        namespace=bot_id, # Query within the specific bot's namespace
        # filter={'bot_id': bot_id} # Filter might be redundant if using namespace correctly
    )

    # Extract text from metadata
    return [match.metadata.get('text', '') for match in results.matches]
```

### 4. Training Pipeline (Coordination)

- The Django backend's `DocumentService` handles file processing and basic chunking.
- Django views call the FastAPI agent's `/embed_and_store` endpoint via the `agent_client.py`.
- The FastAPI endpoint receives chunks and metadata, calls `vector_store.embed_and_store_chunks` to generate embeddings (using Google model) and upsert to Pinecone.
- **Optional**: For very large documents, this embedding step could be pushed to a background task queue (Celery) managed by either Django or the Agent service.

```python
# backend/chatsphere/services/document_service.py (Existing, simplified)
# ... processes file, extracts text, calls _chunk_text ...

# backend/chatsphere/views.py (Conceptual Snippet)
# ... after document and chunks are created ...
 chunks_content = [chunk.content for chunk in document.chunks.all()]
 metadata_base = {"bot_id": str(document.bot_id)} # Pass necessary filterable metadata
 success = agent_client.call_embed_and_store(str(document.id), chunks_content, metadata_base)
 # ... handle success/failure ...

# backend/chatsphere_agent/main.py (Conceptual Snippet)
@app.post("/embed_and_store")
async def api_embed_and_store(payload: ChunkInput, index: Index = Depends(get_pinecone_index)):
    metadata_base = {"bot_id": payload.metadata.get("bot_id")} # Ensure bot_id is passed
    if not metadata_base.get("bot_id"):
        raise HTTPException(status_code=400, detail="bot_id missing in metadata")
    try:
        vector_ids = await embed_and_store_chunks(
            doc_id=payload.document_id,
            chunks=payload.chunks,
            metadata_base=metadata_base,
            index=index # Pass the index dependency
        )
        # **Vector ID Synchronization Note:**
        # The Django backend needs these vector_ids to update its Chunk records.
        # If using Celery, the task should update the Django DB upon completion.
        # If synchronous, Django can update immediately after this call returns.
        # Consider adding a separate Agent endpoint or a Django-side mechanism
        # to confirm embedding success and update DB if async.
        return {"status": "success", "stored_vector_ids": vector_ids}
    except Exception as e:
        logger.exception(f"Embedding failed for doc {payload.document_id}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def api_chat(payload: ChatInput, index: Index = Depends(get_pinecone_index)):
    try:
        # 1. Retrieve context relevant to the bot_id and message
        retriever_k = payload.config_params.get('retriever_k', 5)
        context_chunks = await get_relevant_chunks(
            payload.bot_id,
            payload.message,
            top_k=retriever_k,
            index=index # Pass index dependency
        )
        context_str = "\n".join(context_chunks)

        # 2. Format history & Prepare Agent Input
        # ... (ensure history length uses config_params.get('chat_history_length', 10)) ...

        # 3. Initialize LLM & Agent based on config_params
        llm = get_llm(payload.config_params)
        # retriever = get_vector_store(index).as_retriever(...) # Pass config to retriever if needed
        # tools = [] # Define tools based on config_params
        # agent_executor = setup_agent(llm, retriever, tools, payload.config_params)
        # For simpler RAG, might directly use an LLMChain with context:
        prompt = PromptTemplate(...) # Define prompt using context, history, input
        chain = LLMChain(llm=llm, prompt=prompt)
        result = await chain.ainvoke(agent_input) # Use async invoke
        ai_response = result.get('text', "Error: No output from chain.")

        return ChatResponse(response=ai_response)
    except Exception as e:
        logger.exception(f"Chat failed for bot {payload.bot_id}")
        raise HTTPException(status_code=500, detail=str(e))
```

### 5. Chat Context Management

- When the Django backend receives a chat message, it calls the FastAPI agent's `/chat` endpoint via `agent_client.py`, passing the message, history, and `bot_id`.
- The FastAPI `/chat` endpoint:
    - Calls `vector_store.get_relevant_chunks` using the `bot_id` for filtering and the user message for similarity search.
    - Constructs the prompt for the LangChain agent, including the retrieved context and conversation history.
    - Invokes the `agent_executor`.
    - Returns the generated response back to the Django backend.

```python
# backend/chatsphere_agent/main.py (Conceptual Snippet)
@app.post("/chat")
async def api_chat(payload: ChatInput, index: Index = Depends(get_pinecone_index)):
    try:
        # 1. Retrieve context relevant to the bot_id and message
        retriever_k = payload.config_params.get('retriever_k', 5)
        context_chunks = await get_relevant_chunks(
            payload.bot_id,
            payload.message,
            top_k=retriever_k,
            index=index # Pass index dependency
        )
        context_str = "\n".join(context_chunks)
        
        # 2. Format history
        formatted_history = [...] 
        
        # 3. Prepare agent input
        agent_input = {
            "input": payload.message,
            "chat_history": formatted_history,
            "context": context_str 
        }
        
        # 4. Invoke Agent (Get agent_executor instance)
        llm = get_llm(payload.config_params)
        # retriever = get_vector_store(index).as_retriever(...) # Pass config to retriever if needed
        # tools = [] # Define tools based on config_params
        # agent_executor = setup_agent(llm, retriever, tools, payload.config_params)
        # For simpler RAG, might directly use an LLMChain with context:
        prompt = PromptTemplate(...) # Define prompt using context, history, input
        chain = LLMChain(llm=llm, prompt=prompt)
        result = await chain.ainvoke(agent_input) # Use async invoke
        ai_response = result.get('text', "Error: No output from chain.")
        
        return ChatResponse(response=ai_response)
    except Exception as e:
        logger.exception(f"Chat failed for bot {payload.bot_id}")
        raise HTTPException(status_code=500, detail=str(e))
```

## Error Handling & Monitoring

- Implement robust error handling in both Django and FastAPI services.
- Use structured logging in both services.
- Centralize logs if possible (e.g., using EFK/Loki stack).
- Monitor API endpoints (latency, error rates) for both services using Prometheus/Grafana or similar.
- Monitor Pinecone usage and performance via the Pinecone console.
- Monitor Google AI Platform usage and potential quota issues.

## Performance Optimization

### 1. Caching Strategy

```python
# ai_services/utils/cache.py
from typing import Any, Optional
from redis import Redis
import json

class AICache:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
        self.default_ttl = 3600  # 1 hour
        
    async def get_cached_response(
        self,
        key: str,
        namespace: str
    ) -> Optional[Any]:
        cache_key = f"{namespace}:{key}"
        cached = self.redis.get(cache_key)
        
        if cached:
            return json.loads(cached)
        return None
        
    async def cache_response(
        self,
        key: str,
        namespace: str,
        value: Any,
        ttl: Optional[int] = None
    ):
        cache_key = f"{namespace}:{key}"
        self.redis.setex(
            cache_key,
            ttl or self.default_ttl,
            json.dumps(value)
        )
```

### 2. Request Batching

```python
# ai_services/utils/batcher.py
from typing import List, Any, Callable, Awaitable
import asyncio

class RequestBatcher:
    def __init__(
        self,
        batch_size: int = 10,
        wait_time: float = 0.1
    ):
        self.batch_size = batch_size
        self.wait_time = wait_time
        self.queue: List[Any] = []
        self.lock = asyncio.Lock()
        
    async def add_to_batch(
        self,
        item: Any,
        process_fn: Callable[[List[Any]], Awaitable[List[Any]]]
    ) -> Any:
        async with self.lock:
            self.queue.append(item)
            
            if len(self.queue) >= self.batch_size:
                return await self._process_batch(process_fn)
                
            # Wait for more items or timeout
            try:
                await asyncio.wait_for(
                    self._wait_for_batch_size(),
                    timeout=self.wait_time
                )
            except asyncio.TimeoutError:
                if self.queue:
                    return await self._process_batch(process_fn)
                    
    async def _process_batch(
        self,
        process_fn: Callable[[List[Any]], Awaitable[List[Any]]]
    ) -> List[Any]:
        batch = self.queue[:]
        self.queue.clear()
        return await process_fn(batch)
```

## Monitoring and Analytics

### 1. Performance Metrics

```python
# ai_services/monitoring/metrics.py
from prometheus_client import Counter, Histogram
import time

class AIMetrics:
    def __init__(self):
        self.response_time = Histogram(
            'ai_response_time_seconds',
            'Time spent generating AI responses',
            ['model', 'endpoint']
        )
        self.token_usage = Counter(
            'ai_token_usage_total',
            'Total number of tokens used',
            ['model', 'type']
        )
        self.error_count = Counter(
            'ai_error_total',
            'Total number of AI-related errors',
            ['model', 'error_type']
        )
        
    def track_response_time(self, model: str, endpoint: str):
        start_time = time.time()
        def callback():
            duration = time.time() - start_time
            self.response_time.labels(model, endpoint).observe(duration)
        return callback
```

## Error Handling and Retry Logic

```python
# ai_services/utils/retry.py
from typing import Callable, Any
import asyncio
from functools import wraps

def async_retry(
    retries: int = 3,
    delay: float = 1.0,
    backoff: float = 2.0,
    exceptions: tuple = (Exception,)
):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            last_exception = None
            current_delay = delay
            
            for attempt in range(retries):
                try:
                    return await func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < retries - 1:
                        await asyncio.sleep(current_delay)
                        current_delay *= backoff
                        
            raise last_exception
            
        return wrapper
    return decorator
```

## Security Considerations

1. **API Key Management**
   - Secure storage in environment variables
   - Key rotation policies
   - Access logging and monitoring

2. **Data Privacy**
   - Content filtering and sanitization
   - PII detection and handling
   - Data retention policies

3. **Rate Limiting**
   - Per-user limits
   - Concurrent request limits
   - Cost control measures

## Deployment Strategy

1. **Scaling**
   - Horizontal scaling of AI services
   - Load balancing across multiple instances
   - Auto-scaling based on demand

2. **Monitoring**
   - Response time tracking
   - Error rate monitoring
   - Token usage tracking
   - Cost monitoring

3. **Failover**
   - Fallback models
   - Circuit breakers
   - Graceful degradation

## Next Steps

For details on how this AI integration interfaces with our database design and data storage strategy, refer to the [Database Design](./07-database-design.md) document.

### Supporting Different Bot Types

The FastAPI agent service architecture allows for future expansion to support various bot types beyond simple RAG. By passing configuration parameters (like `agent_type`, `tool_list`, `system_prompt`) from the Django backend during the `/chat` call, the agent service can dynamically initialize different LangChain agents (e.g., ReAct agents for tool use, specialized conversational agents). This requires extending the `ChatInput` model and the agent initialization logic within the FastAPI service.

## Error Handling & Monitoring

- Implement robust error handling in both Django and FastAPI services.

## Multi-language Considerations

While Gemini models handle multiple languages, consider:
- **Prompting:** Ensure system prompts are either language-agnostic or potentially translated/adapted based on detected user language if specific instructions are needed.
- **Retrieval:** Embeddings are generally multi-lingual, but retrieval performance might vary. Test effectiveness across target languages.
- **UI:** Ensure the frontend (chat widget, dashboard) supports i18n for labels and messages.
