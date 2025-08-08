"""
ChatSphere Agent Package

This package contains all AI/agent-specific logic including:
"""
Agent module for AI functionality.

Guiding principle: keep it simple. We integrate AI via direct API calls (e.g., Google
Generative AI, Pinecone) without orchestration frameworks such as LangChain.
"""
- Document ingestion and processing
- Vector embeddings and retrieval
- LLM generation and responses
- AI-specific API routes

The agent package is designed to be extractable as a separate service if needed.
"""

__version__ = "1.0.0" 