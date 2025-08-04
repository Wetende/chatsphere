# ChatSphere Project Setup

This document provides setup instructions for the ChatSphere project.

## Prerequisites

- Python 3.10+ 
- Node.js 18+ and npm
- Docker and Docker Compose (optional)
- PostgreSQL 14+ (only if running manually)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatsphere.git
cd chatsphere
```

### 2. Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
# PowerShell
Copy-Item .env.example .env
# Bash
cp .env.example .env
```

Edit the `.env` file and fill in the required values, especially:
- `SECRET_KEY`
- `DATABASE_URL` (adjust if not using Docker default)
- `GOOGLE_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_ENVIRONMENT`
- `PINECONE_INDEX_NAME`
- `AGENT_SERVICE_URL` (defaults to `http://localhost:8001` for local dev, change if needed)

### 3. Docker Setup (Recommended)

#### Build and Start the Containers

```bash
docker-compose up -d --build
```

This will start:
- PostgreSQL database
- Django backend service
- FastAPI agent service
- Vue.js frontend service

Refer to the main `README.md` for more Docker details.

### 4. Manual Setup (Alternative)

Refer to the main `README.md` for detailed steps on setting up the Django backend, FastAPI agent, and Vue.js frontend manually without Docker.

## Vector Search Setup

The application uses a separate FastAPI service (`agent`) which utilizes **Pinecone** for vector storage and search. This replaces the previous `pgvector` implementation.

The FastAPI service handles:
- Generating embeddings using Google Gemini models.
- Storing embeddings in a specified Pinecone index.
- Performing similarity searches against the Pinecone index to retrieve context for the AI agent.

### Required Packages

The project requires the following key packages:

1. **FastAPI Backend (`backend/requirements.txt`):**
   - FastAPI, uvicorn, SQLAlchemy, psycopg2-binary
   - Python-jose, passlib (for authentication)
   - httpx (for external API calls)

2. **AI Agent (included in main backend):**
   - langchain, langchain-google-genai, langchain-community
   - pinecone-client, sentence-transformers
   - python-dotenv

3. **Frontend (`frontend/package.json`):**
   - React.js, React Router, Redux Toolkit
   - Axios
   - TailwindCSS

## Running the Application

Refer to the main `README.md` for instructions on running via Docker or manually.

### Accessing the Application

- Frontend: http://localhost:3000 (or your configured frontend port)
- Backend API: http://localhost:8000/api/ (or your configured backend port)
- API Documentation: http://localhost:8000/docs (Swagger UI)
- Alternative API Docs: http://localhost:8000/redoc (ReDoc)

## Testing Vector Search

Vector search is now handled internally by the agent service when you chat with a bot.

1. Create a bot in the application.
2. Upload documents or text through the training interface (this will trigger calls to the agent service's `/embed_and_store` endpoint).
3. Start a chat with the bot (this will trigger calls to the agent service's `/chat` endpoint, which performs the similarity search).
4. Ask questions related to the uploaded content.

## Troubleshooting

### Pinecone Issues

- Verify your Pinecone API key, environment, and index name in the `.env` file.
- Check the agent service logs (`docker-compose logs -f agent` or console output) for connection or indexing errors.
- Ensure the specified Pinecone index exists and is configured correctly (e.g., correct dimension for Gemini embeddings).

### Google Gemini API Issues

- Ensure your Google API key is correctly set in the `.env` file.
- Check the agent service logs for API authentication or rate limit errors.

### Agent Service Communication Issues

- Ensure the agent service is running.
- Verify the `AGENT_SERVICE_URL` in the Django backend's environment is correct.
- Check backend logs for errors when calling the agent service.
- Check agent service logs for errors when receiving requests from the backend.

## Additional Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Google AI for Developers](https://ai.google.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [Django Documentation](https://docs.djangoproject.com/)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html) 