import pytest
from starlette.websockets import WebSocketDisconnect


@pytest.mark.api
async def test_websocket_training_connect(test_app):
    from starlette.testclient import TestClient

    # Use Starlette's sync TestClient for WebSocket testing
    with TestClient(test_app) as client:
        with client.websocket_connect("/ws/training/1") as ws:
            # Server sends an initial "connected" message
            msg = ws.receive_text()
            assert msg == "connected"
            # Send a ping and ensure connection stays open
            ws.send_text("ping")

