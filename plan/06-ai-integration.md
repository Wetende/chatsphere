# ChatSphere AI Integration

This document outlines the AI integration strategy for ChatSphere, detailing how we leverage various AI technologies to create powerful, context-aware chatbots.

## Technology Stack

- **Large Language Models**: OpenAI GPT-3.5/4
- **Embeddings**: OpenAI text-embedding-ada-002
- **Vector Database**: Pinecone
- **AI Framework**: LangChain
- **Caching**: Redis
- **Queue System**: Celery
- **Monitoring**: Prometheus + Grafana

## Architecture Overview

```
ai_services/
├── llm/                    # LLM integration
│   ├── openai_client.py    # OpenAI API client
│   ├── prompts.py         # System prompts
│   └── config.py          # LLM configuration
├── embeddings/             # Embedding generation
│   ├── generator.py       # Embedding creation
│   └── optimizer.py       # Embedding optimization
├── vector_store/          # Vector database
│   ├── pinecone_client.py # Pinecone integration
│   └── indexing.py        # Vector indexing
├── training/              # Training pipeline
│   ├── processor.py       # Content processing
│   ├── chunker.py        # Text chunking
│   └── validator.py      # Training validation
├── chat/                  # Chat functionality
│   ├── context.py        # Context management
│   ├── memory.py         # Conversation memory
│   └── response.py       # Response generation
└── utils/                 # Utility functions
    ├── tokenizer.py      # Text tokenization
    └── cache.py          # AI response caching
```

## Core Components

### 1. LLM Integration

```python
# ai_services/llm/openai_client.py
from typing import Dict, List
import openai
from .config import LLMConfig
from .prompts import SystemPrompts

class OpenAIClient:
    def __init__(self, config: LLMConfig):
        self.config = config
        self.model = config.model_name
        openai.api_key = config.api_key
        
    async def generate_response(
        self,
        prompt: str,
        context: List[str],
        system_prompt: str = SystemPrompts.DEFAULT,
        temperature: float = 0.7
    ) -> str:
        messages = [
            {"role": "system", "content": system_prompt},
            *[{"role": "user", "content": ctx} for ctx in context],
            {"role": "user", "content": prompt}
        ]
        
        response = await openai.ChatCompletion.acreate(
            model=self.model,
            messages=messages,
            temperature=temperature,
            max_tokens=self.config.max_tokens,
            presence_penalty=0.6,
            frequency_penalty=0.0
        )
        
        return response['choices'][0]['message']['content']

# ai_services/llm/prompts.py
class SystemPrompts:
    DEFAULT = """You are a helpful AI assistant trained to provide accurate and relevant information 
                based on the provided context. Always maintain a professional and friendly tone."""
                
    CUSTOMER_SERVICE = """You are a customer service representative helping users with their questions. 
                         Be polite, professional, and solution-oriented."""
```

### 2. Embedding Generation

```python
# ai_services/embeddings/generator.py
from typing import List
import numpy as np
import openai
from .optimizer import EmbeddingOptimizer

class EmbeddingGenerator:
    def __init__(self, model: str = "text-embedding-ada-002"):
        self.model = model
        self.optimizer = EmbeddingOptimizer()
        
    async def create_embeddings(self, texts: List[str]) -> List[np.ndarray]:
        embeddings = []
        
        for text in texts:
            response = await openai.Embedding.acreate(
                input=text,
                model=self.model
            )
            embedding = response['data'][0]['embedding']
            optimized = self.optimizer.optimize(embedding)
            embeddings.append(optimized)
            
        return embeddings

# ai_services/embeddings/optimizer.py
import numpy as np
from typing import List

class EmbeddingOptimizer:
    def optimize(self, embedding: List[float]) -> np.ndarray:
        # Convert to numpy array for efficient operations
        arr = np.array(embedding)
        
        # Normalize the embedding
        norm = np.linalg.norm(arr)
        if norm > 0:
            arr = arr / norm
            
        return arr
```

### 3. Vector Store Integration

```python
# ai_services/vector_store/pinecone_client.py
from typing import Dict, List
import pinecone
from .indexing import VectorIndex

class PineconeClient:
    def __init__(self, api_key: str, environment: str):
        pinecone.init(api_key=api_key, environment=environment)
        self.index = VectorIndex()
        
    async def upsert_vectors(
        self,
        vectors: List[List[float]],
        metadata: List[Dict],
        namespace: str
    ):
        vector_ids = [f"vec_{i}" for i in range(len(vectors))]
        
        # Batch upsert to Pinecone
        self.index.upsert(
            vectors=list(zip(vector_ids, vectors, metadata)),
            namespace=namespace
        )
        
    async def query_vectors(
        self,
        query_vector: List[float],
        namespace: str,
        top_k: int = 5
    ) -> List[Dict]:
        results = self.index.query(
            vector=query_vector,
            namespace=namespace,
            top_k=top_k
        )
        
        return [
            {
                'id': match.id,
                'score': match.score,
                'metadata': match.metadata
            }
            for match in results.matches
        ]
```

### 4. Training Pipeline

```python
# ai_services/training/processor.py
from typing import List, Dict
from .chunker import TextChunker
from .validator import TrainingValidator
from ..embeddings.generator import EmbeddingGenerator
from ..vector_store.pinecone_client import PineconeClient

class TrainingProcessor:
    def __init__(
        self,
        embedding_generator: EmbeddingGenerator,
        vector_store: PineconeClient
    ):
        self.chunker = TextChunker()
        self.validator = TrainingValidator()
        self.embedding_generator = embedding_generator
        self.vector_store = vector_store
        
    async def process_training_data(
        self,
        content: str,
        metadata: Dict,
        namespace: str
    ):
        # Validate and clean content
        cleaned_content = self.validator.validate_and_clean(content)
        
        # Split into chunks
        chunks = self.chunker.split_text(cleaned_content)
        
        # Generate embeddings
        embeddings = await self.embedding_generator.create_embeddings(chunks)
        
        # Store in vector database
        chunk_metadata = [
            {**metadata, 'chunk_index': i, 'content': chunk}
            for i, chunk in enumerate(chunks)
        ]
        
        await self.vector_store.upsert_vectors(
            vectors=embeddings,
            metadata=chunk_metadata,
            namespace=namespace
        )
```

### 5. Chat Context Management

```python
# ai_services/chat/context.py
from typing import List, Dict
from ..vector_store.pinecone_client import PineconeClient
from ..embeddings.generator import EmbeddingGenerator

class ContextManager:
    def __init__(
        self,
        vector_store: PineconeClient,
        embedding_generator: EmbeddingGenerator,
        max_context_length: int = 2000
    ):
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.max_context_length = max_context_length
        
    async def get_relevant_context(
        self,
        query: str,
        namespace: str,
        top_k: int = 5
    ) -> List[str]:
        # Generate query embedding
        query_embedding = (await self.embedding_generator.create_embeddings([query]))[0]
        
        # Query vector store
        results = await self.vector_store.query_vectors(
            query_vector=query_embedding,
            namespace=namespace,
            top_k=top_k
        )
        
        # Extract and format context
        context = []
        current_length = 0
        
        for result in results:
            content = result['metadata']['content']
            content_length = len(content)
            
            if current_length + content_length > self.max_context_length:
                break
                
            context.append(content)
            current_length += content_length
            
        return context
```

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