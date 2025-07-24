from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

@router.post("/")
async def chat_with_bot():
    """Chat with AI bot endpoint"""
    return {"message": "AI chat endpoint - to be implemented"}

@router.post("/stream")
async def chat_stream():
    """Streaming chat with AI bot"""
    return {"message": "AI streaming chat endpoint - to be implemented"} 