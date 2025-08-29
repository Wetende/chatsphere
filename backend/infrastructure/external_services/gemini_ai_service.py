"""
Infrastructure Implementation - Google Gemini AI Service

Concrete implementation of the `IAIService` interface using Google Gemini.
This module belongs to the Infrastructure layer.

Minimal stub for import success.
"""

from typing import List, Optional, AsyncGenerator
from application.interfaces.ai_service import IAIService, ChatRequest, ChatResponse

class GeminiAIService(IAIService):
    """Stub Gemini AI service."""
    
    def __init__(self, api_key: str, model_name: str):
        self.api_key = api_key
        self.model_name = model_name
    
    async def initialize(self) -> None:
        pass
    
    async def chat_completion(self, request: ChatRequest) -> ChatResponse:
        return ChatResponse(content="AI response", model=self.model_name)
    
    async def chat_completion_stream(self, request: ChatRequest) -> AsyncGenerator[str, None]:
        yield "AI"
        yield " response"
    
    async def embed_text(self, text: str, model: Optional[str] = None) -> List[float]:
        return [0.1, 0.2, 0.3]
    
    async def embed_texts(self, texts: List[str], model: Optional[str] = None) -> List[List[float]]:
        return [[0.1, 0.2, 0.3] for _ in texts]
    
    def get_available_models(self) -> List[str]:
        return ["gemini-pro"]
    
    def validate_model(self, model_name: str) -> bool:
        return True
    
    async def check_service_health(self) -> bool:
        return True


