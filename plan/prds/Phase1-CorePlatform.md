# Sub-PRD: Phase 1 - Core Platform

## Overview
This Sub-PRD outlines the core platform implementation for ChatSphere, focusing on user authentication, basic bot creation, and direct AI integration without frameworks.

## User Stories
- **As a new user**, I want to register for an account so that I can create and manage my own chatbots
- **As a returning user**, I want to log in securely so that I can access my existing bots and data
- **As a user**, I want to create a new chatbot with custom settings so that it fits my specific use case
- **As a user**, I want to upload documents to train my bot so that it can answer questions about my content
- **As a user**, I want to chat with my bot in real-time so that I can test its responses immediately
- **As a user**, I want to see my bot's processing status so that I know when it's ready to use
- **As a user**, I want to manage my bots (edit, delete) so that I can maintain my bot collection

## Functional Requirements
- Implement **JWT-based authentication** with registration and login
- Create **bot management system** with CRUD operations
- Establish **direct Google AI integration** without LangChain
- Build **vector storage** with direct Pinecone API integration
- Implement **real-time chat** with WebSocket streaming
- Create **document processing pipeline** for training data

## Acceptance Criteria
- User registration/login with JWT tokens working
- Bot creation with name, description, model configuration
- Document upload triggers embedding and Pinecone storage
- Chat endpoint returns streaming AI responses
- WebSocket connection for real-time communication
- Error handling with proper HTTP status codes
- All endpoints documented in OpenAPI/Swagger

## Technical Specifications
- **Authentication**: FastAPI JWT dependencies with `HTTPBearer`
- **AI Integration**: Direct Google Gemini API calls (no frameworks)
- **Vector Storage**: Direct Pinecone client integration
- **Database**: Async SQLAlchemy with UUID primary keys
- **Streaming**: FastAPI WebSocket with async generators
- **File Processing**: Background tasks for document embedding
- **Validation**: Pydantic schemas with comprehensive validation

## AI Coding Prompt
Implement core FastAPI endpoints following agentic patterns from Claude Code best practices. Use direct API integrations for Google AI and Pinecone, avoiding any AI frameworks. Ensure all database operations use async patterns with proper error handling.