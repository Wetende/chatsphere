# Sub-PRD: Real-time Chat System

## Overview
This Sub-PRD outlines the real-time chat system for KyroChat, implementing WebSocket connections for streaming conversations with bots using FastAPI WebSocket support.

## User Stories
- **As a user**, I want to chat with my bot in real-time so that the experience feels natural
- **As a user**, I want to see responses as they're generated so that I don't wait for complete answers
- **As a user**, I want my conversation history saved so that I can reference previous exchanges
- **As a user**, I want typing indicators so that I know the bot is processing my message
- **As a user**, I want to continue conversations where I left off so that context is maintained
- **As a website visitor**, I want to interact with embedded bots so that I can get help instantly
- **As a user**, I want to handle multiple conversations simultaneously so that I can multitask

## Functional Requirements
- Implement **WebSocket connections** for real-time communication
- Create **streaming responses** that display text as it's generated
- Build **conversation persistence** with message history
- Develop **typing indicators** and connection status
- Establish **context continuity** across conversation sessions
- Create **embedded widget** for external websites

## Acceptance Criteria
- WebSocket connection establishes within 100ms
- Messages stream in real-time with sub-second latency
- Conversation history persists and loads on reconnection
- Connection status clearly indicates online/offline state
- Context maintained across browser sessions
- Widget embeds easily with minimal JavaScript
- Multiple concurrent conversations supported
- Graceful fallback to HTTP polling if WebSocket fails

## Technical Specifications
- **WebSocket**: FastAPI WebSocket with connection management
- **Streaming**: Async generators for real-time text delivery
- **Persistence**: Conversation and Message models in PostgreSQL via Async SQLAlchemy
- **Context**: Session management with conversation threading
- **Widget**: Lightweight JavaScript for website embedding
- **Connection Pool**: Efficient WebSocket connection handling
- **Error Handling**: Reconnection logic and fallback mechanisms
- **Endpoints**: `/api/v1/chat/ws/{bot_id}` (WebSocket), `/api/v1/chat` (HTTP), `/api/v1/chat/stream` (HTTP streaming)

## AI Coding Prompt
Implement WebSocket chat system with FastAPI WebSocket endpoints. Create conversation and message persistence with Async SQLAlchemy. Build streaming response system using async generators. Include connection management and error handling. Routes in `agent/routing/chat_router.py` for chat, and `app/routers/conversations_router.py` for conversation management. Ensure proper user authorization and message validation.