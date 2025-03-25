# 002 - Docker Setup

## Understanding Docker Concepts

Before we continue, let's understand the key Docker concepts we're using:

1. **Dockerfile**: A text file containing instructions to build a Docker image
2. **Image**: A lightweight, standalone, executable package that includes everything needed to run a piece of software
3. **Container**: A running instance of an image
4. **Docker Compose**: A tool for defining and running multi-container Docker applications

## Docker Compose File Explained

Let's break down our `docker-compose.yml` file:

```yaml
version: '3.8'  # Docker Compose file format version
```

This specifies the version of the Docker Compose file format we're using.

### Services

Services are the containers that make up our application:

```yaml
services:
  # Backend service (Django)
  backend:
    build: ./backend  # Build using the Dockerfile in the ./backend directory
    volumes:
      - ./backend:/app  # Mount local ./backend directory to /app in container
    ports:
      - "8000:8000"  # Map host port 8000 to container port 8000
    environment:  # Environment variables for the container
      - DEBUG=1
      - SECRET_KEY=dev_secret_key
      - DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
    depends_on:
      - db  # This service depends on the db service
    command: python manage.py runserver 0.0.0.0:8000  # Command to run
```

We define our backend service with:
- A build context (where the Dockerfile is located)
- Volume mapping for development (changes on host are reflected in container)
- Port mapping to access the service from our host
- Environment variables for configuration
- Dependencies on other services
- Command to run when the container starts

We set up the frontend and database services similarly.

### Volumes

```yaml
volumes:
  postgres_data:  # Named volume for PostgreSQL data persistence
```

Volumes allow data to persist even when containers are stopped or removed. Here, we create a named volume for our PostgreSQL data.

## Next Steps

Before we can use Docker Compose to build and run our services, we need to create Dockerfiles for our frontend and backend services. We'll do this next by setting up our Django backend and Vue.js frontend environments.

### Backend Dockerfile

We'll need to create a Dockerfile in the backend directory that:
1. Starts from a Python base image
2. Installs dependencies
3. Sets up the working directory
4. Copies the source code
5. Exposes the necessary port

### Frontend Dockerfile

Similarly, we'll create a Dockerfile in the frontend directory that:
1. Starts from a Node.js base image
2. Installs dependencies
3. Sets up the working directory
4. Copies the source code
5. Builds the Vue.js application
6. Exposes the necessary port 