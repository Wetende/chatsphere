from pydantic_settings import BaseSettings
from typing import Optional, Dict, Any

class AgentSettings(BaseSettings):
    """AI Agent settings and configuration"""
    
    # Google AI Configuration
    google_api_key: Optional[str] = None
    google_model: str = "gemini-pro"
    google_temperature: float = 0.7
    google_max_tokens: int = 1000
    
    # Pinecone Configuration
    pinecone_api_key: Optional[str] = None
    pinecone_environment: str = "gcp-starter"
    pinecone_index_name: str = "chatsphere-embeddings"
    pinecone_dimension: int = 384
    
    # Embedding Configuration
    embedding_model: str = "all-MiniLM-L6-v2"
    embedding_dimension: int = 384
    chunk_size: int = 1000
    chunk_overlap: int = 200
    
    # RAG Configuration
    retrieval_k: int = 5
    similarity_threshold: float = 0.7
    max_context_length: int = 4000
    
    # LLM Generation Settings
    default_temperature: float = 0.7
    max_tokens: int = 1000
    top_p: float = 0.9
    frequency_penalty: float = 0.0
    presence_penalty: float = 0.0
    
    # Rate Limiting
    requests_per_minute: int = 60
    tokens_per_minute: int = 40000
    
    # Timeout Settings
    llm_timeout: int = 30  # seconds
    embedding_timeout: int = 10  # seconds
    retrieval_timeout: int = 5  # seconds
    
    # System Prompts
    default_system_prompt: str = """
    You are a helpful AI assistant for ChatSphere. You provide accurate, 
    helpful responses based on the context provided. If you don't know 
    something, say so clearly.
    """
    
    rag_system_prompt: str = """
    You are a knowledgeable AI assistant. Use the provided context to answer 
    questions accurately. If the context doesn't contain enough information 
    to answer the question, say so clearly.
    """
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Global agent settings instance
agent_settings = AgentSettings() 