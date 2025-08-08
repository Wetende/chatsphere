from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from agent.generation.gemini import GeminiGenerator

router = APIRouter()

@router.websocket("/ws")
async def websocket_chat(ws: WebSocket):
    await ws.accept()
    generator = GeminiGenerator()
    history = []
    try:
        while True:
            data = await ws.receive_text()
            history.append({"role": "user", "content": data})
            # Generate full response (fallback-safe), then stream chunks to client
            response_text = await generator.chat_response(
                user_message=data,
                bot_config={},
                conversation_history=history,
                retrieved_context=None,
            )
            # naive chunking
            chunk_size = 128
            for i in range(0, len(response_text), chunk_size):
                await ws.send_text(response_text[i : i + chunk_size])
            history.append({"role": "assistant", "content": response_text})
    except WebSocketDisconnect:
        return
