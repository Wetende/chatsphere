# Backend Restructuring Plan: FastAPI Agent Integration

## 1. Objective

To refactor the AI functionality into a separate, self-contained FastAPI service located within `backend/chatsphere_agent`. The existing Django backend (`backend/chatsphere`) will handle core application logic (users, bots, documents, conversations) and communicate with the FastAPI agent service via HTTP requests for all AI-related tasks (embedding, vector search, chat completion using Gemini and Pinecone).

This approach decouples the AI logic, allowing it to be scaled and updated independently.

## 2. Prerequisite Steps (Assumed Completed Based on Prior Session)

- **Directory Structure:** `chatsphere_agent` moved to `backend/chatsphere_agent`.
- **Dependency Cleanup:** AI-related dependencies (pgvector, openai, langchain, etc.) removed from `backend/requirements.txt` and `backend/requirements-no-hashes.txt`.
- **Django Code Cleanup:**
    - Removed `VectorField` and OpenAI model types from `backend/chatsphere/models.py`.
    - Deleted `openai_service.py` and `vector_service.py`.
    - Modified `document_service.py` to only handle chunking.
    - Removed direct AI service calls from `backend/chatsphere/views.py`.
    - Updated migration files (`0001_initial.py`, deleted `add_vector_field.py`).
    - Removed `OPENAI_API_KEY` from `.env.example` and added `GOOGLE_API_KEY` and Pinecone variables.
- **Model Update:** Corrected Gemini model name to `gemini-2.0-flash` in `models.py` and `0001_initial.py`.

## 3. FastAPI Agent Service Setup (`backend/chatsphere_agent/`)

### 3.1. Install FastAPI Dependencies

- Add FastAPI-specific dependencies to `backend/chatsphere_agent/requirements.txt`:
  ```
  fastapi>=0.100.0,<1.0.0
  uvicorn[standard]>=0.20.0,<1.0.0
  pydantic>=2.0,<3.0
  httpx>=0.25.0,<1.0.0 # For making external calls if needed by agent tools
  python-dotenv>=1.0.0,<2.0.0
  # Keep existing agent dependencies:
  langchain
  langchain-google-genai
  langchain-pinecone
  # etc. (Ensure all necessary agent libs are listed)
  ```
- **Action:** Manually edit `backend/chatsphere_agent/requirements.txt` and install using `pip install -r backend/chatsphere_agent/requirements.txt` (within the appropriate virtual environment).

### 3.2. Create FastAPI Application (`backend/chatsphere_agent/main.py`)

- **Action:** Create a `main.py` file inside `backend/chatsphere_agent/`.
- **Content:**
  ```python
  import os
  import logging
  from fastapi import FastAPI, HTTPException, Depends
  from pydantic import BaseModel, Field
  from typing import List, Dict, Any
  from dotenv import load_dotenv
  
  # Assuming your agent logic is refactored into callable functions/classes
  from .agent import get_agent_executor # Example import
  from .vector_store import embed_and_store_chunks, get_relevant_chunks # Example import
  from .config import load_agent_config
  
  # Configure logging
  logging.basicConfig(level=logging.INFO)
  logger = logging.getLogger(__name__)
  
  # Load environment variables from .env file in the root
  load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env')) 
  
  # Load Agent Configuration (adapt config.py if needed)
  # agent_config = load_agent_config() 
  # Example: Directly load required keys
  pinecone_api_key = os.getenv("PINECONE_API_KEY")
  google_api_key = os.getenv("GOOGLE_API_KEY")
  # ... load other necessary configs
  
  # --- FastAPI App Initialization ---
  app = FastAPI(
      title="ChatSphere Agent Service",
      description="Handles AI interactions, embeddings, and vector search.",
      version="0.1.0"
  )
  
  # --- Pydantic Models for Request/Response ---
  class ChunkInput(BaseModel):
      document_id: str
      chunks: List[str]
  
  class EmbedStoreResponse(BaseModel):
      status: str
      document_id: str
      stored_vector_count: int
      error_message: str | None = None
  
  class ChatHistoryItem(BaseModel):
      role: str # 'user' or 'assistant'
      content: str
  
  class ChatInput(BaseModel):
      bot_id: str # Or other identifier for context filtering
      user_id: str | None = None
      message: str
      history: List[ChatHistoryItem] = []
  
  class ChatResponse(BaseModel):
      response: str
      error_message: str | None = None
      
  # --- Placeholder for Agent Initialization ---
  # This might involve loading models, initializing clients, etc.
  # Consider using FastAPI's lifespan events for setup/teardown
  # agent_executor = get_agent_executor(agent_config)
  
  # --- API Endpoints ---
  @app.get("/health")
  async def health_check():
      logger.info("Health check endpoint called.")
      return {"status": "ok"}
  
  @app.post("/embed_and_store", response_model=EmbedStoreResponse)
  async def api_embed_and_store(payload: ChunkInput):
      logger.info(f"Received request to embed and store chunks for doc: {payload.document_id}")
      try:
          # Replace with actual call to your vector store function
          # vector_ids = embed_and_store_chunks(payload.document_id, payload.chunks, agent_config)
          vector_count = len(payload.chunks) # Placeholder
          logger.info(f"Successfully processed {vector_count} chunks for doc: {payload.document_id}")
          return EmbedStoreResponse(
              status="success", 
              document_id=payload.document_id, 
              stored_vector_count=vector_count
          )
      except Exception as e:
          logger.error(f"Error embedding/storing chunks for doc {payload.document_id}: {e}", exc_info=True)
          raise HTTPException(status_code=500, detail=f"Failed to process chunks: {e}")
          
  @app.post("/chat", response_model=ChatResponse)
  async def api_chat(payload: ChatInput):
      logger.info(f"Received chat request for bot: {payload.bot_id}")
      try:
          # 1. Get relevant context (example, adapt as needed)
          # context_chunks = get_relevant_chunks(payload.bot_id, payload.message, agent_config)
          context_str = "Placeholder context based on relevant chunks." # Placeholder
          
          # 2. Format history and input for the agent
          formatted_history = [(item.role, item.content) for item in payload.history]
          agent_input = {
              "input": payload.message,
              "chat_history": formatted_history, # Adapt key based on your agent prompt
              "context": context_str # Add context if your agent uses it
          }
          
          # 3. Invoke the agent (replace with actual agent call)
          # result = agent_executor.invoke(agent_input)
          # ai_response = result.get('output', "Agent did not return an output.") # Adapt key based on agent output
          ai_response = f"Placeholder response to: {payload.message}" # Placeholder
          
          logger.info(f"Successfully generated chat response for bot: {payload.bot_id}")
          return ChatResponse(response=ai_response)
      except Exception as e:
          logger.error(f"Error during chat processing for bot {payload.bot_id}: {e}", exc_info=True)
          raise HTTPException(status_code=500, detail=f"Chat processing failed: {e}")

  # Add other endpoints like /get_context if needed
  
  # --- Optional: Run directly for simple testing ---
  # if __name__ == "__main__":
  #     uvicorn.run(app, host="0.0.0.0", port=8001)
  ```

### 3.3. Define API Endpoints
- Covered by the `main.py` example above. Ensure the Pydantic models match the expected data structures for requests and responses.

### 3.4. Update Agent Logic (`agent.py`, `vector_store.py`, `config.py`)
- **Action:** Refactor the existing agent code:
    - Modify `config.py` to load necessary API keys (Google, Pinecone) and settings from environment variables (using `os.getenv`).
    - Modify `vector_store.py` to contain functions like `embed_and_store_chunks(doc_id, chunks, config)` and `get_relevant_chunks(bot_id, query, config)`. Initialize the Pinecone client within these functions or globally.
    - Modify `agent.py` to contain a function like `get_agent_executor(config)` that initializes and returns the LangChain agent executor. Ensure it uses the Gemini LLM and the Pinecone retriever correctly.

## 4. Django Backend Integration (`backend/chatsphere/`)

### 4.1. Add HTTP Client Dependency

- **Action:** Add `httpx>=0.25.0,<1.0.0` to `backend/requirements.txt` and `backend/requirements-no-hashes.txt`. Install using `pip install -r backend/requirements.txt`.

### 4.2. Create Agent API Client (`backend/chatsphere/services/agent_client.py`)

- **Action:** Create a new file `agent_client.py` inside `backend/chatsphere/services/`.
- **Content:**
  ```python
  import httpx
  import os
  import logging
  from typing import List, Dict, Any, Optional
  
  logger = logging.getLogger(__name__)
  
  AGENT_SERVICE_URL = os.getenv("AGENT_SERVICE_URL", "http://localhost:8001") # Default for local dev
  
  # Configure httpx client (consider sharing a client instance)
  # Use async client if calling from async Django views
  client = httpx.Client(base_url=AGENT_SERVICE_URL, timeout=30.0) 
  
  def call_embed_and_store(document_id: str, chunks: List[str]) -> bool:
      """Calls the agent service to embed and store document chunks."""
      endpoint = "/embed_and_store"
      payload = {"document_id": document_id, "chunks": chunks}
      try:
          response = client.post(endpoint, json=payload)
          response.raise_for_status() # Raise exception for 4xx/5xx errors
          result = response.json()
          if result.get("status") == "success":
              logger.info(f"Agent successfully processed {result.get('stored_vector_count')} chunks for doc {document_id}")
              return True
          else:
              logger.error(f"Agent service returned error for doc {document_id}: {result.get('error_message')}")
              return False
      except httpx.RequestError as e:
          logger.error(f"HTTP request error calling agent service at {endpoint} for doc {document_id}: {e}")
          return False
      except Exception as e:
          logger.error(f"Unexpected error calling agent service for doc {document_id}: {e}", exc_info=True)
          return False
  
  def call_chat(bot_id: str, message: str, history: List[Dict[str, str]], user_id: Optional[str] = None) -> Optional[str]:
      """Calls the agent service to get a chat response."""
      endpoint = "/chat"
      payload = {
          "bot_id": bot_id,
          "message": message,
          "history": history,
          "user_id": user_id
      }
      try:
          response = client.post(endpoint, json=payload)
          response.raise_for_status()
          result = response.json()
          if result.get("response"):
              logger.info(f"Agent successfully returned chat response for bot {bot_id}")
              return result["response"]
          else:
              logger.error(f"Agent service chat endpoint returned error for bot {bot_id}: {result.get('error_message')}")
              return None
      except httpx.RequestError as e:
          logger.error(f"HTTP request error calling agent chat service at {endpoint} for bot {bot_id}: {e}")
          return None
      except Exception as e:
          logger.error(f"Unexpected error calling agent chat service for bot {bot_id}: {e}", exc_info=True)
          return None

  # Add functions for other agent endpoints if needed
  ```

### 4.3. Modify Django Views (`backend/chatsphere/views.py`)

- **Action:** Import the new client functions and call them at the appropriate points.
- **Example Snippets:**
  ```python
  # In views.py
  from .services import document_service, agent_client # Import the new client
  
  # Inside DocumentViewSet.perform_create or train_text 
  # After document and chunks are created by document_service...
  try:
      document = document_service.create_document_from_file(...) # Or create_document_from_text
      if document and document.status == 'ready':
          chunks_content = [chunk.content for chunk in document.chunks.all()]
          if chunks_content:
              logger.info(f"Calling agent service to embed {len(chunks_content)} chunks for doc {document.id}")
              success = agent_client.call_embed_and_store(str(document.id), chunks_content)
              if not success:
                  # Handle embedding failure - maybe update doc status
                  logger.error(f"Agent service failed to embed chunks for doc {document.id}")
                  # Optionally update document status to 'embedding_error'
              # ... rest of the view logic ...
          else:
              logger.warning(f"No chunks found to embed for document {document.id}")
      # ... handle document creation failure ...
  except Exception as e:
      logger.error(f"Error during document creation/embedding process: {e}")
      # Return appropriate error response
  
  # Inside the Chat view/endpoint
  # After retrieving conversation history...
  history_list = [{'role': msg.message_type.lower(), 'content': msg.content} for msg in conversation_history]
  ai_response_content = agent_client.call_chat(
      bot_id=str(bot.id),
      message=user_message_content,
      history=history_list,
      user_id= # Optional: pass user identifier if needed by agent
  )
  
  if ai_response_content:
      # Save user message and AI response to DB
      Message.objects.create(conversation=conv, message_type='USER', content=user_message_content)
      Message.objects.create(conversation=conv, message_type='BOT', content=ai_response_content)
      # Return ai_response_content to the frontend
  else:
      # Handle error from agent service
      return Response({"error": "Failed to get response from AI agent."}, status=500)
  ```

### 4.4. Update Environment (`.env.example`)

- **Action:** Add `AGENT_SERVICE_URL=http://localhost:8001` to `.env.example` (and the actual `.env` file).

## 5. Database Migrations (Final Check)

- **Action:** Run `python backend/manage.py makemigrations chatsphere` and `python backend/manage.py migrate` to ensure the Django schema is up-to-date.

## 6. Running the Services

- **Development:**
    - Run the Django backend: `python backend/manage.py runserver`
    - Run the FastAPI agent service: `cd backend/chatsphere_agent && uvicorn main:app --reload --port 8001`
- **Production (Example using Docker Compose):**
    - Create a `Dockerfile` for the FastAPI service in `backend/chatsphere_agent/`.
    - Add a new service definition for `agent` in `docker-compose.yml`, building from the agent's Dockerfile and exposing its port.
    - Ensure the Django service (`backend`) can reach the `agent` service using the service name (e.g., `AGENT_SERVICE_URL=http://agent:8001`).

## 7. Verification

- **Dependencies:** Run `pip check` in both the main backend and agent environments.
- **Static Analysis:** Run `mypy` and linters (`flake8`) on both `backend/chatsphere` and `backend/chatsphere_agent`.
- **API Tests:**
    - Test the FastAPI agent endpoints directly using tools like `curl` or Postman.
    - Test the Django views that interact with the agent service.
- **Integration Tests:** Write tests that simulate the full flow (e.g., upload document -> Django calls agent -> agent embeds -> user chats -> Django calls agent -> agent responds).
- **Manual Testing:** Test the document upload and chat functionality through the frontend application.