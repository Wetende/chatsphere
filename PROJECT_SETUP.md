# ChatSphere Project Setup

This document provides setup instructions for the ChatSphere project with vector search capabilities.

## Prerequisites

- Python 3.9+ 
- Node.js 16+ and npm
- Docker and Docker Compose
- PostgreSQL 14+

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatsphere.git
cd chatsphere
```

### 2. Backend Setup

#### Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Environment Variables

Create a `.env` file in the backend directory:

```
DEBUG=True
SECRET_KEY=your_secret_key_here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Database
DB_NAME=chatsphere
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Docker Setup

#### Build and Start the Containers

```bash
docker-compose build
docker-compose up -d
```

This will start:
- PostgreSQL with pgvector extension
- Django backend
- Vue.js frontend
- Nginx for serving static files

## Vector Search Setup

The application uses pgvector extension for PostgreSQL to enable vector search functionality. The Docker setup includes:

1. Custom PostgreSQL image with pgvector extension
2. Initialization script for enabling the extension
3. Database migration for adding vector fields and indexes

### PostgreSQL with pgvector

Here's the Dockerfile for the PostgreSQL container:

```dockerfile
FROM postgres:14

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    postgresql-server-dev-14

# Clone and build pgvector
RUN git clone --branch v0.4.0 https://github.com/pgvector/pgvector.git && \
    cd pgvector && \
    make && \
    make install

# Clean up
RUN apt-get remove -y build-essential git postgresql-server-dev-14 && \
    apt-get autoremove -y && \
    rm -rf /pgvector
```

### Required Packages

The project requires the following key packages:

1. **Django & REST Framework:**
   - Django
   - djangorestframework
   - django-cors-headers
   - djangorestframework-simplejwt

2. **Database:**
   - psycopg2-binary
   - pgvector

3. **OpenAI Integration:**
   - openai

4. **File Processing:**
   - python-magic
   - PyPDF2

5. **Frontend:**
   - Vue.js
   - Axios
   - TailwindCSS

## Running the Application

### Start the Development Servers

#### Backend

```bash
cd backend
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm run dev
```

### Accessing the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/
- Admin Interface: http://localhost:8000/admin/

## Testing Vector Search

1. Create a bot in the application
2. Upload documents or text through the training interface
3. Start a chat with the bot
4. Ask questions related to the uploaded content

## Troubleshooting

### pgvector Extension Issues

If you encounter issues with the pgvector extension, you can check if it's properly installed:

```sql
SELECT * FROM pg_extension WHERE extname = 'vector';
```

### OpenAI API Issues

Ensure your OpenAI API key is correctly set in the environment variables and that you have sufficient credits for API calls.

### Database Migration Issues

If the vector field migration fails, you may need to manually create the extension:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Additional Resources

- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Django Documentation](https://docs.djangoproject.com/)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html) 