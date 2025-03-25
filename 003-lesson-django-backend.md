# 003 - Django Backend Setup

## Django Project Structure

We've set up our Django backend with the following structure:

```
backend/
├── config/                  # Project settings and configuration
│   ├── __init__.py
│   ├── asgi.py             # ASGI config for async
│   ├── settings.py         # Main settings file
│   ├── urls.py             # Main URL configuration
│   └── wsgi.py             # WSGI config for deployment
├── chatsphere/              # Our main application
│   ├── __init__.py
│   ├── apps.py             # App configuration
│   ├── models.py           # Database models
│   ├── serializers.py      # REST serializers
│   ├── urls.py             # App URL configuration
│   └── views.py            # API views
├── Dockerfile              # Docker configuration
├── manage.py               # Django command-line utility
└── requirements.txt        # Python dependencies
```

## Django Concepts Explained

### Settings (settings.py)

This file contains all the configuration for our Django project, including:
- Database configuration
- Installed apps
- Middleware
- Authentication
- Static files
- CORS (Cross-Origin Resource Sharing) settings

Key settings we've configured:
- Database URL from environment variables
- REST Framework authentication and permissions
- CORS settings to allow the frontend to connect

### URLs (urls.py)

The URL configuration files define how HTTP requests are routed to views. We have two URL files:
- `config/urls.py`: The main URL configuration that includes our app URLs
- `chatsphere/urls.py`: App-specific URL patterns using Django REST Framework's router

### Models (models.py)

Models define the data structure and are mapped to database tables. We've created:
- `ChatRoom`: Represents a chat room
- `Message`: Represents a message in a chat room, linked to a user and room

### Serializers (serializers.py)

Serializers convert complex data (like model instances) to and from Python datatypes that can be rendered into JSON. We've defined:
- `UserSerializer`: For user data
- `ChatRoomSerializer`: For chat room data
- `MessageSerializer`: For message data

### Views (views.py)

Views handle HTTP requests and return responses. We're using Django REST Framework's `ViewSets` to provide CRUD operations:
- `UserViewSet`: Read-only access to users
- `ChatRoomViewSet`: Full CRUD for chat rooms
- `MessageViewSet`: Full CRUD for messages

## REST API Endpoints

Our API will provide the following endpoints:

- `GET /api/users/`: List all users
- `GET /api/users/{id}/`: Get a specific user

- `GET /api/rooms/`: List all chat rooms
- `POST /api/rooms/`: Create a new chat room
- `GET /api/rooms/{id}/`: Get a specific chat room
- `PUT /api/rooms/{id}/`: Update a chat room
- `DELETE /api/rooms/{id}/`: Delete a chat room
- `GET /api/rooms/{id}/messages/`: Get all messages for a specific chat room

- `GET /api/messages/`: List all messages
- `POST /api/messages/`: Create a new message
- `GET /api/messages/{id}/`: Get a specific message
- `PUT /api/messages/{id}/`: Update a message
- `DELETE /api/messages/{id}/`: Delete a message

## Django and Docker Integration

In our Docker setup, the Django application:
1. Uses PostgreSQL as the database
2. Exposes port 8000 for API access
3. Mounts the backend directory for live code updates during development

With this setup, any change to the Django code will be immediately available without needing to rebuild the Docker container. 