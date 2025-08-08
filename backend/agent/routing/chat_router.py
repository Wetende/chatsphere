from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Optional
from agent.generation.gemini import GeminiGenerator
from agent.retrieval.pinecone_client import PineconeClient

router = APIRouter()

class ChatRequest(BaseModel):
    bot_id: str
    message: str
    history: List[Dict] = []
    config: Optional[Dict] = None

@router.post("/")
async def chat_with_bot(payload: ChatRequest):
    retriever = PineconeClient()
    context_matches = await retriever.query_vectors(query=payload.message, namespace=payload.bot_id, top_k=5)
    context_text = "\n".join([m.get("text", "") for m in context_matches])

    generator = GeminiGenerator()
    response = await generator.chat_response(
        user_message=payload.message,
        bot_config=payload.config or {},
        conversation_history=payload.history,
        retrieved_context=context_text,
    )
    return {"response": response, "context": context_matches}

@router.post("/stream")
async def chat_stream(payload: ChatRequest):
    return await chat_with_bot(payload) 