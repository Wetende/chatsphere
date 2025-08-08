from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Optional
from agent.generation.gemini import GeminiGenerator
from agent.retrieval.pinecone_client import PineconeClient
from fastapi.responses import StreamingResponse

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
    retriever = PineconeClient()
    context_matches = await retriever.query_vectors(query=payload.message, namespace=payload.bot_id, top_k=5)
    context_text = "\n".join([m.get("text", "") for m in context_matches])
    generator = GeminiGenerator()

    async def event_generator():
        text = await generator.chat_response(
            user_message=payload.message,
            bot_config=payload.config or {},
            conversation_history=payload.history,
            retrieved_context=context_text,
        )
        chunk_size = 128
        for i in range(0, len(text), chunk_size):
            yield f"data: {text[i:i+chunk_size]}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream") 