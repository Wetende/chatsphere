# ChatSphere

A comprehensive AI-powered chatbot platform that enables users to create, deploy, and manage intelligent chatbots without writing code.

## Features

- **Custom Chatbot Creation**: Build chatbots trained on your specific data
- **Multiple Data Sources**: Upload various document types including PDFs, Word docs, text files, and websites
- **Advanced AI Models**: Powered by cutting-edge language models (like Gemini) for natural conversations
- **User Authentication**: Secure login and user management system
- **Conversation Management**: Save, review, and analyze chat conversations
- **Analytics Dashboard**: Track chatbot performance and user engagement
- **API Integration**: Connect your chatbots with external platforms
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Vue.js 3 with Vue Router and Pinia state management
- **Backend**: Django REST Framework
- **Database**: PostgreSQL (for application data)
- **AI Integration**: Separate FastAPI service using LangChain, Google Gemini, and Pinecone for vector storage.
- **Authentication**: JWT-based auth system
- **Containerization**: Docker and Docker Compose

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized setup)
- Git

### Installation

#### Option 1: Docker Setup (Recommended)

The easiest way to get ChatSphere running is with Docker, which ensures all services work together properly without configuration issues.

##### 1. Install Docker

- **Windows**: Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- **macOS**: Install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
- **Linux**: Install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

Verify installation with:
```bash
docker --version
docker-compose --version
```

##### 2. Clone the Repository

```bash
# PowerShell or Bash
git clone https://github.com/Wetende/chatsphere.git
cd chatsphere
```

##### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example` and filling in your API keys:

```bash
# PowerShell
Copy-Item .env.example .env
# Bash
cp .env.example .env
```

Edit the `.env` file and add your `GOOGLE_API_KEY`, `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, and `PINECONE_INDEX_NAME`.

##### 4. Start the Application

```bash
# PowerShell or Bash
# Build and start all services
docker-compose up -d --build
```

Docker will automatically:
- Build all necessary container images (Django backend, Vue frontend, FastAPI agent, Postgres DB).
- Install all dependencies inside containers.
- Set up the database with proper configuration.
- Start all services in the correct order.

##### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Agent Service (if exposed): Check `docker-compose.yml` (e.g., http://localhost:8001)
- Admin interface: http://localhost:8000/admin/

##### 6. Useful Docker Commands

```bash
# View logs from all containers
docker-compose logs -f

# View logs from a specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f agent # Added agent service
docker-compose logs -f db

# Stop all services
docker-compose down

# Rebuild and restart all services (after code changes)
docker-compose up -d --build

# Run a command in a container (e.g., Django migrations)
docker-compose exec backend python manage.py migrate

# Create a superuser account
docker-compose exec backend python manage.py createsuperuser
```

#### Option 2: Manual Setup

If you prefer to set up services individually (more advanced):

##### Backend Setup

```bash
# PowerShell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Run migrations
cd ..
python manage.py migrate

# Start Django server
python manage.py runserver
```

##### Agent Service Setup

```bash
# PowerShell
# In a new terminal window, ensure backend venv is active or create a separate one
cd backend\chatsphere_agent

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8001
```

##### Frontend Setup

```bash
# PowerShell
# In a new terminal window, from the project root
cd frontend

# Install dependencies
npm install

# Start development server
npm run serve
```

### Environment Variables (Manual Setup)

Ensure your `.env` file in the root directory is configured with:

```
# Django
DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/chatsphere # Adjust if DB runs elsewhere
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000 # Or your frontend dev server port

# Agent
AGENT_SERVICE_URL=http://localhost:8001
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=your_pinecone_index_name
```

## Testing API Connection

To verify the API connection is working:
1. Ensure Django backend, FastAPI agent, and Frontend dev servers are running.
2. Navigate to the frontend URL (e.g., http://localhost:3000).
3. Test core features like login, bot creation, document upload, and chat.

## Docker Volumes and Persistence

ChatSphere uses Docker volumes for data persistence. The following data is preserved between container restarts:

- **PostgreSQL data**: Stored in the `postgres_data` volume
- **Backend code**: Mounted from your local `backend` directory
- **Frontend code**: Mounted from your local `frontend` directory
- **Agent code**: Mounted from your local `backend/chatsphere_agent` directory

This means:
- You can edit code files locally, and changes will appear in the containers (requires rebuild or dev server reload).
- Your database data persists even if you restart or rebuild containers.
- `node_modules` are stored in an anonymous volume for best performance.

## Troubleshooting Docker Setup

If you encounter issues with the Docker setup:

1. **Container won't start**:
   - Check logs: `docker-compose logs -f <service_name>`
   - Verify port availability: Make sure ports (e.g., 3000, 8000, 8001, 5432) are not in use.

2. **Database connection issues**:
   - Verify environment variables in docker-compose.yml and the `.env` file.
   - Ensure the database container is running: `docker-compose ps`

3. **Agent service connection issues**:
   - Check agent logs: `docker-compose logs -f agent`
   - Verify `AGENT_SERVICE_URL` in Django's environment.
   - Ensure the agent container is running and accessible from the backend container.

4. **Frontend development server issues**:
   - Check frontend logs: `docker-compose logs -f frontend`
   - Verify volume mounts in docker-compose.yml

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google for Gemini language models
- Pinecone for vector database services
- All the open-source libraries that made this project possible 