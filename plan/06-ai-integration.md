# ChatSphere AI Integration

This document outlines the AI integration strategy for ChatSphere, following modern agentic development practices inspired by Claude Code best practices. We build direct AI integrations without frameworks for maximum control and performance.

## Technology Stack

- **Large Language Models**: Google Gemini (gemini-2.0-flash-exp, gemini-1.5-pro)
- **Embeddings**: Google Generative AI Embeddings (text-embedding-004)
- **Vector Database**: Pinecone
- **AI Architecture**: Direct API integration with agentic patterns
- **Caching**: Redis (for embeddings and responses)
- **Queue System**: FastAPI Background Tasks + Celery
- **Monitoring**: FastAPI metrics + Prometheus

## Architecture Overview

Following Claude Code best practices, we implement direct AI integration with agentic patterns. No frameworks - just pure API calls with intelligent orchestration.

```
backend/agent/
├── core/                  # Core AI utilities
│   ├── __init__.py
│   ├── client.py         # Google AI client wrapper
│   ├── prompts.py        # System prompts and templates
│   ├── context.py        # Context management
│   └── cache.py          # Response caching
├── generation/            # Direct LLM generation
│   ├── __init__.py
│   ├── gemini.py         # Gemini API integration
│   ├── embeddings.py     # Embedding generation
│   └── streaming.py      # Streaming responses
├── ingestion/             # Document processing
│   ├── __init__.py
│   ├── processors.py     # File processors (PDF, TXT, etc)
│   ├── chunking.py       # Text chunking strategies
│   └── vectorization.py  # Embedding and storage
├── retrieval/             # Vector search and retrieval
│   ├── __init__.py
│   ├── pinecone_client.py # Pinecone operations
│   ├── search.py         # Similarity search
│   └── ranking.py        # Result ranking and filtering
├── agents/                # Agentic behavior patterns
│   ├── __init__.py
│   ├── conversation.py   # Conversational agent
│   ├── rag.py           # Retrieval-augmented generation
│   └── tools.py         # Tool-using agent patterns
├── routing/               # FastAPI AI endpoints
│   ├── __init__.py
│   ├── chat_router.py    # Chat endpoints
│   ├── training_router.py # Document training
│   └── admin_router.py   # AI admin functions
├── monitoring/            # AI performance tracking
│   ├── __init__.py
│   ├── metrics.py        # Performance metrics
│   └── logging.py        # Structured AI logging
├── config.py              # AI configuration
└── claude_instructions.md # CLAUDE.md for AI development
```

## Core Components - Direct AI Integration

### 1. Google Gemini Direct Integration

Following Claude Code principles, we implement direct API calls for maximum control and transparency:

```python
# backend/agent/core/client.py
import google.generativeai as genai
from typing import Dict, List, Optional, AsyncGenerator
from ..config import settings
import asyncio
import json

class GeminiClient:
    """Direct Gemini API client with agentic patterns"""
    
    def __init__(self):
        genai.configure(api_key=settings.google_api_key)
        self.models = {
            'flash': genai.GenerativeModel('gemini-2.0-flash-exp'),
            'pro': genai.GenerativeModel('gemini-1.5-pro'),
        }
    
    async def generate_response(
        self,
        prompt: str,
        model: str = 'flash',
        temperature: float = 0.7,
        max_tokens: int = 4096,
        system_prompt: Optional[str] = None,
        context: Optional[List[Dict]] = None
    ) -> str:
        """Generate single response with context awareness"""
        
        # Build conversation history
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        
        if context:
            messages.extend(context)
        
        messages.append({"role": "user", "content": prompt})
        
        # Configure generation
        generation_config = genai.GenerationConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
            top_p=0.95,
        )
        
        # Generate response
        model_instance = self.models.get(model, self.models['flash'])
        response = await model_instance.generate_content_async(
            messages,
            generation_config=generation_config
        )
        
        return response.text
    
    async def stream_response(
        self,
        prompt: str,
        model: str = 'flash',
        **kwargs
    ) -> AsyncGenerator[str, None]:
        """Stream response for real-time chat"""
        
        model_instance = self.models.get(model, self.models['flash'])
        response = await model_instance.generate_content_async(
            prompt,
            stream=True,
            **kwargs
        )
        
        async for chunk in response:
            if chunk.text:
                yield chunk.text

# backend/agent/generation/gemini.py
from typing import Dict, List, Optional
from ..core.client import GeminiClient
from ..core.prompts import PromptManager
from ..core.cache import ResponseCache

class GeminiGenerator:
    """High-level Gemini response generation with agentic patterns"""
    
    def __init__(self):
        self.client = GeminiClient()
        self.prompts = PromptManager()
        self.cache = ResponseCache()
    
    async def chat_response(
        self,
        user_message: str,
        bot_config: Dict,
        conversation_history: List[Dict],
        retrieved_context: Optional[str] = None
    ) -> str:
        """Generate contextual chat response using agentic patterns"""
        
        # Build system prompt based on bot configuration
        system_prompt = self.prompts.build_system_prompt(
            bot_name=bot_config.get('name', 'Assistant'),
            instructions=bot_config.get('instructions', ''),
            personality=bot_config.get('personality', 'helpful'),
            context=retrieved_context
        )
        
        # Check cache first
        cache_key = self._build_cache_key(user_message, system_prompt, conversation_history)
        cached_response = await self.cache.get(cache_key)
        if cached_response:
            return cached_response
        
        # Generate new response
        response = await self.client.generate_response(
            prompt=user_message,
            model=bot_config.get('model', 'flash'),
            temperature=bot_config.get('temperature', 0.7),
            system_prompt=system_prompt,
            context=conversation_history[-10:]  # Last 10 messages for context
        )
        
        # Cache the response
        await self.cache.set(cache_key, response, ttl=3600)  # 1 hour cache
        
        return response
```

### 2. Direct Embedding Generation

```python
# backend/agent/generation/embeddings.py
import google.generativeai as genai
from typing import List, Dict, Optional
from ..core.cache import EmbeddingCache
from ..config import settings
import asyncio
import hashlib

class EmbeddingGenerator:
    """Direct Google AI embedding generation with caching"""
    
    def __init__(self):
        genai.configure(api_key=settings.google_api_key)
        self.model_name = "text-embedding-004"
        self.cache = EmbeddingCache()
    
    async def generate_embeddings(
        self,
        texts: List[str],
        task_type: str = "semantic_similarity",
        batch_size: int = 100
    ) -> List[List[float]]:
        """Generate embeddings with batching and caching"""
        
        results = []
        
        # Process in batches for efficiency
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            batch_embeddings = await self._process_batch(batch, task_type)
            results.extend(batch_embeddings)
        
        return results
    
    async def _process_batch(
        self, 
        texts: List[str], 
        task_type: str
    ) -> List[List[float]]:
        """Process a batch of texts with caching"""
        
        embeddings = []
        uncached_texts = []
        uncached_indices = []
        
        # Check cache for each text
        for i, text in enumerate(texts):
            cache_key = self._get_cache_key(text, task_type)
            cached_embedding = await self.cache.get(cache_key)
            
            if cached_embedding:
                embeddings.append(cached_embedding)
            else:
                embeddings.append(None)  # Placeholder
                uncached_texts.append(text)
                uncached_indices.append(i)
        
        # Generate embeddings for uncached texts
        if uncached_texts:
            new_embeddings = await self._generate_batch(uncached_texts, task_type)
            
            # Cache and insert new embeddings
            for idx, embedding in zip(uncached_indices, new_embeddings):
                cache_key = self._get_cache_key(texts[idx], task_type)
                await self.cache.set(cache_key, embedding)
                embeddings[idx] = embedding
        
        return embeddings
    
    async def _generate_batch(
        self, 
        texts: List[str], 
        task_type: str
    ) -> List[List[float]]:
        """Generate embeddings using Google AI API"""
        
        try:
            # Use the embedding model directly
            response = await genai.embed_content_async(
                model=f"models/{self.model_name}",
                content=texts,
                task_type=task_type,
                output_dimensionality=768  # Standard dimension
            )
            
            return [embedding for embedding in response['embedding']]
            
        except Exception as e:
            # Fallback to individual requests if batch fails
            embeddings = []
            for text in texts:
                try:
                    response = await genai.embed_content_async(
                        model=f"models/{self.model_name}",
                        content=text,
                        task_type=task_type,
                        output_dimensionality=768
                    )
                    embeddings.append(response['embedding'])
                except Exception as individual_error:
                    # Return zero vector as fallback
                    embeddings.append([0.0] * 768)
                    print(f"Failed to embed text: {individual_error}")
            
            return embeddings
    
    def _get_cache_key(self, text: str, task_type: str) -> str:
        """Generate cache key for text and task type"""
        content = f"{task_type}:{text}"
        return hashlib.md5(content.encode()).hexdigest()

# backend/agent/ingestion/vectorization.py
from typing import List, Dict, Optional
from ..generation.embeddings import EmbeddingGenerator
from ..retrieval.pinecone_client import PineconeClient
from ..core.cache import ResponseCache
import uuid

class VectorizationService:
    """Handle document vectorization and storage"""
    
    def __init__(self):
        self.embedding_generator = EmbeddingGenerator()
        self.vector_store = PineconeClient()
        self.cache = ResponseCache()
    
    async def vectorize_document(
        self,
        document_id: str,
        chunks: List[str],
        metadata: Dict,
        bot_id: str
    ) -> List[str]:
        """Vectorize document chunks and store in Pinecone"""
        
        # Generate embeddings
        embeddings = await self.embedding_generator.generate_embeddings(
            texts=chunks,
            task_type="retrieval_document"
        )
        
        # Prepare vectors for storage
        vectors = []
        vector_ids = []
        
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            vector_id = f"{document_id}-chunk-{i}"
            vector_ids.append(vector_id)
            
            vector_metadata = {
                **metadata,
                "document_id": document_id,
                "bot_id": bot_id,
                "chunk_index": i,
                "text": chunk,
                "chunk_id": vector_id
            }
            
            vectors.append({
                "id": vector_id,
                "values": embedding,
                "metadata": vector_metadata
            })
        
        # Store in Pinecone with bot_id namespace
        await self.vector_store.upsert_vectors(
            vectors=vectors,
            namespace=bot_id
        )
        
        return vector_ids
```

### 3. Direct Pinecone Integration

```python
# backend/agent/retrieval/pinecone_client.py
from pinecone import Pinecone, Index
from typing import List, Dict, Any, Optional
from ..generation.embeddings import EmbeddingGenerator
from ..config import settings
import asyncio

class PineconeClient:
    """Direct Pinecone API client for vector operations"""
    
    def __init__(self):
        self.client = Pinecone(api_key=settings.pinecone_api_key)
        self.index = self.client.Index(settings.pinecone_index_name)
        self.embedding_generator = EmbeddingGenerator()
    
    async def upsert_vectors(
        self,
        vectors: List[Dict],
        namespace: Optional[str] = None
    ) -> Dict:
        """Upsert vectors to Pinecone index"""
        
        try:
            # Convert vectors to Pinecone format
            pinecone_vectors = []
            for vector in vectors:
                pinecone_vectors.append({
                    "id": vector["id"],
                    "values": vector["values"],
                    "metadata": vector["metadata"]
                })
            
            # Upsert in batches
            batch_size = 100
            results = []
            
            for i in range(0, len(pinecone_vectors), batch_size):
                batch = pinecone_vectors[i:i + batch_size]
                result = self.index.upsert(
                    vectors=batch,
                    namespace=namespace
                )
                results.append(result)
            
            return {"success": True, "upserted_count": len(pinecone_vectors)}
            
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    async def query_vectors(
        self,
        query: str,
        namespace: str,
        top_k: int = 5,
        filter_metadata: Optional[Dict] = None
    ) -> List[Dict]:
        """Query vectors by text similarity"""
        
        try:
            # Generate query embedding
            query_embeddings = await self.embedding_generator.generate_embeddings(
                texts=[query],
                task_type="retrieval_query"
            )
            query_vector = query_embeddings[0]
            
            # Query Pinecone
            results = self.index.query(
                vector=query_vector,
                top_k=top_k,
                include_metadata=True,
                namespace=namespace,
                filter=filter_metadata
            )
            
            # Format results
            formatted_results = []
            for match in results.matches:
                formatted_results.append({
                    "id": match.id,
                    "score": match.score,
                    "text": match.metadata.get("text", ""),
                    "metadata": match.metadata
                })
            
            return formatted_results
            
        except Exception as e:
            print(f"Error querying vectors: {e}")
            return []
    
    async def delete_vectors(
        self,
        vector_ids: List[str],
        namespace: Optional[str] = None
    ) -> Dict:
        """Delete vectors from index"""
        
        try:
            result = self.index.delete(
                ids=vector_ids,
                namespace=namespace
            )
            return {"success": True, "deleted_count": len(vector_ids)}
            
        except Exception as e:
            return {"success": False, "error": str(e)}
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
