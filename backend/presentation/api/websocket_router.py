"""
WebSocket Router

Connection manager to broadcast training/progress events to clients per user.
"""

import asyncio
from typing import Dict, Set

from fastapi import APIRouter, WebSocket, WebSocketDisconnect


router = APIRouter(prefix="/ws", tags=["websocket"], include_in_schema=False)


class WebSocketManager:
    def __init__(self) -> None:
        self._user_connections: Dict[int, Set[WebSocket]] = {}
        self._lock = asyncio.Lock()

    async def connect(self, user_id: int, ws: WebSocket) -> None:
        await ws.accept()
        async with self._lock:
            self._user_connections.setdefault(user_id, set()).add(ws)

    async def disconnect(self, user_id: int, ws: WebSocket) -> None:
        async with self._lock:
            conns = self._user_connections.get(user_id)
            if not conns:
                return
            conns.discard(ws)
            if not conns:
                self._user_connections.pop(user_id, None)

    async def send_to_user(self, user_id: int, message: str) -> None:
        conns = list(self._user_connections.get(user_id, set()))
        for ws in conns:
            try:
                await ws.send_text(message)
            except Exception:
                await self.disconnect(user_id, ws)

    async def broadcast(self, message: str) -> None:
        users = list(self._user_connections.keys())
        for uid in users:
            await self.send_to_user(uid, message)


manager = WebSocketManager()


@router.websocket("/training/{user_id}")
async def training_progress(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        await manager.send_to_user(user_id, "connected")
        while True:
            # keepalive / wait for client pings
            await websocket.receive_text()
    except WebSocketDisconnect:
        await manager.disconnect(user_id, websocket)


