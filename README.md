# ChatSphere

A comprehensive AI-powered chatbot platform that enables users to create, deploy, and manage intelligent chatbots without writing code.

## Features

- **Custom Chatbot Creation**: Build chatbots trained on your specific data
- **Multiple Data Sources**: Upload various document types including PDFs, Word docs, text files, and websites
- **Advanced AI Models**: Powered by cutting-edge language models for natural conversations
- **User Authentication**: Secure login and user management system
- **Conversation Management**: Save, review, and analyze chat conversations
- **Analytics Dashboard**: Track chatbot performance and user engagement
- **API Integration**: Connect your chatbots with external platforms
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Vue.js 3 with Vue Router and Pinia state management
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **AI Integration**: LangChain, OpenAI, and custom AI services
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

##### 3. Start the Application

```bash
# PowerShell or Bash
# Build and start all services
docker-compose up -d
```

That's it! Docker will automatically:
- Build all necessary container images
- Install all dependencies inside containers
- Set up the database with proper configuration
- Start all services in the correct order

##### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin interface: http://localhost:8000/admin/

##### 5. Useful Docker Commands

```bash
# View logs from all containers
docker-compose logs -f

# View logs from a specific service
docker-compose logs -f frontend
docker-compose logs -f backend
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

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/chatsphere
OPENAI_API_KEY=your_openai_api_key

# Optional settings
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8080
```

## Testing API Connection

To verify the API connection is working:
1. Navigate to http://localhost:3000/test-api
2. You should see a success message with connection details
3. If you see an error, check that both servers are running

## Docker Volumes and Persistence

ChatSphere uses Docker volumes for data persistence. The following data is preserved between container restarts:

- **PostgreSQL data**: Stored in the `postgres_data` volume
- **Backend code**: Mounted from your local `backend` directory
- **Frontend code**: Mounted from your local `frontend` directory

This means:
- You can edit code files locally, and changes will appear in the containers
- Your database data persists even if you restart or rebuild containers
- `node_modules` are stored in an anonymous volume for best performance

## Troubleshooting Docker Setup

If you encounter issues with the Docker setup:

1. **Container won't start**:
   - Check logs: `docker-compose logs -f <service_name>`
   - Verify port availability: Make sure ports 3000, 8000, and 5432 are not in use

2. **Database connection issues**:
   - Verify environment variables in docker-compose.yml
   - Ensure the database container is running: `docker-compose ps`

3. **Frontend development server issues**:
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

- OpenAI for their language models
- All the open-source libraries that made this project possible 