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

All AI logic resides within the `backend/agent` module.

```
backend/agent/
├── chains/                # LangChain chains
├── generation/            # LLM generation logic
├── ingestion/             # Document ingestion
├── models/                # AI models
├── retrieval/             # Vector retrieval
├── routing/               # FastAPI routers for AI
├── tools/                 # Custom tools
├── tests/                 # AI tests
├── config.py              # Configuration
└── main.py                # Optional entry
```

## Core Components (within Agent Module)

### 1. LLM Integration (using LangChain)

```python
# backend/agent/generation/agent_factory.py

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_react_agent
from langchain.prompts import PromptTemplate
from ..config import agent_settings

def get_llm(config_params: dict | None = None):
    config = config_params or {}
    model_name = config.get('llm_model', agent_settings.google_model)
    temperature = config.get('temperature', agent_settings.google_temperature)
    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=agent_settings.google_api_key,
        temperature=temperature,
    )

def setup_agent(llm, retriever, tools, config_params: dict | None = None):
    config = config_params or {}
    agent_type = config.get('agent_type', 'rag')
    custom_prompt_template = config.get('system_prompt')

    if agent_type == 'rag':
        prompt = PromptTemplate(...)
        if custom_prompt_template:
            pass
        pass
    elif agent_type == 'react':
        prompt = PromptTemplate(...)
        agent = create_react_agent(llm, tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)
        return agent_executor
    else:
        raise ValueError(f"Unsupported agent type: {agent_type}")
```

### 2. Embedding Generation (using LangChain)

```python
# backend/agent/ingestion/vectorization.py
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from ..config import agent_settings
import numpy as np
from typing import List

def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model=agent_settings.embedding_model,
        google_api_key=agent_settings.google_api_key
    )

async def generate_embeddings(texts: List[str]) -> List[List[float]]:
    embedding_model = get_embedding_model()
    embeddings = embedding_model.embed_documents(texts)
    return embeddings
```

### 3. Vector Store Integration (using LangChain + Pinecone)

```python
# backend/agent/retrieval/pinecone_retriever.py
import pinecone
from langchain_pinecone import PineconeVectorStore
from ..config import agent_settings
from contextlib import asynccontextmanager
from fastapi import Depends
from pinecone import Pinecone, Index

_pinecone_client: Pinecone | None = None
_pinecone_index: Index | None = None

def get_pinecone_index() -> Index:
    if _pinecone_index is None:
        raise RuntimeError("Pinecone index not initialized.")
    return _pinecone_index

@asynccontextmanager
async def lifespan(app):
    global _pinecone_client, _pinecone_index
    _pinecone_client = Pinecone(api_key=agent_settings.pinecone_api_key, environment=agent_settings.pinecone_environment)
    _pinecone_index = _pinecone_client.Index(agent_settings.pinecone_index_name)
    yield

_embedding_model = None
def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = GoogleGenerativeAIEmbeddings(
            model=agent_settings.embedding_model,
            google_api_key=agent_settings.google_api_key
        )
    return _embedding_model

async def embed_and_store_chunks(doc_id: str, chunks: List[str], metadata_base: Dict[str, Any], index: Index = Depends(get_pinecone_index)):
    embedding_model = get_embedding_model()
    embeddings = await generate_embeddings(chunks)
    metadatas = []
    vector_ids = []
    for i, chunk_content in enumerate(chunks):
        chunk_id = f"{doc_id}-chunk-{i}"
        vector_ids.append(chunk_id)
        meta = metadata_base.copy()
        meta.update({
            "document_id": doc_id,
            "chunk_index": i,
            "text": chunk_content
        })
        metadatas.append(meta)
    index.upsert(vectors=zip(vector_ids, embeddings, metadatas), namespace=metadata_base.get("bot_id"))
    return vector_ids

def get_vector_store(index: Index = Depends(get_pinecone_index)) -> PineconeVectorStore:
    embedding_model = get_embedding_model()
    vectorstore = PineconeVectorStore(
        index=index,
        embedding=embedding_model,
        text_key="text",
        namespace=None
    )
    return vectorstore

async def get_relevant_chunks(bot_id: str, query: str, top_k: int = 5, index: Index = Depends(get_pinecone_index)) -> List[str]:
    embedding_model = get_embedding_model()
    query_vector = embedding_model.embed_query(query)
    results = index.query(
        vector=query_vector,
        top_k=top_k,
        include_metadata=True,
        namespace=bot_id
    )
    return [match.metadata.get('text', '') for match in results.matches]
```

### 4. Training Pipeline (Coordination)

- The core backend's `document_service` handles file processing and basic chunking.
- Calls agent module for embedding.

```python
# app/services/document_service.py
import logging
from sqlalchemy.orm import Session
from app.models.document import Document, Chunk
from agent.ingestion import process_and_embed

logger = logging.getLogger(__name__)

def create_document_from_file(db: Session, bot_id: str, file: UploadFile, name: str) -> Document | None:
    logger.info(f"Processing file '{name}' for bot {bot_id}")
    # Create Document, extract text, chunk, create Chunks, call process_and_embed
    pass
```

### 5. Chat Context Management

- Backend receives message, calls agent module with history and bot_id.
- Agent retrieves context, constructs prompt, invokes agent, returns response.

```python
# backend/agent/routing/chat_router.py
from fastapi import APIRouter, Depends
from ..generation import setup_agent
from ..retrieval import get_relevant_chunks

router = APIRouter()

@router.post("/")
async def api_chat(payload, index=Depends(get_pinecone_index)):
    context_chunks = await get_relevant_chunks(payload.bot_id, payload.message)
    context_str = "\n".join(context_chunks)
    # Format history, prepare input, invoke agent
    return {"response": ai_response}
```

## Error Handling & Monitoring

- Robust error handling in FastAPI and agent.
- Structured logging.
- Monitor endpoints with Prometheus/Grafana.

## Performance Optimization

### 1. Caching Strategy

```python
# agent/utils/cache.py
from redis import Redis
import json

class AICache:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
    
    async def get_cached_response(self, key: str, namespace: str) -> Optional[Any]:
        cache_key = f"{namespace}:{key}"
        cached = self.redis.get(cache_key)
        if cached:
            return json.loads(cached)
        return None
```

### 2. Request Batching

```python
# agent/utils/batcher.py
from typing import List, Callable, Awaitable
import asyncio

class RequestBatcher:
    def __init__(self, batch_size: int = 10, wait_time: float = 0.1):
        self.batch_size = batch_size
        self.wait_time = wait_time

    async def add_to_batch(self, item: Any, process_fn: Callable[[List[Any]], Awaitable[List[Any]]]) -> Any:
        # Batch logic
        pass
```

## Monitoring and Analytics

### 1. Performance Metrics

```python
# agent/monitoring/metrics.py
from prometheus_client import Counter, Histogram

class AIMetrics:
    def __init__(self):
        self.response_time = Histogram('ai_response_time_seconds', 'Time spent generating AI responses', ['model', 'endpoint'])
```

## Alerting & Notification

- Use Alertmanager with Slack/PagerDuty.

## Reporting & Analysis

- Automated reports with visualizations.

## Next Steps

For details on how this AI integration interfaces with our database design and data storage strategy, refer to the [Database Design](./07-database-design.md) document.
