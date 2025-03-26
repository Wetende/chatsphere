# ChatSphere Architecture

This document outlines the architecture of the ChatSphere platform, detailing the components, their interactions, and the overall system design.

## System Overview

ChatSphere is a multi-container application built with a microservices architecture, consisting of:

1. **Frontend**: Vue.js single-page application
2. **Backend API**: Django REST Framework
3. **Database**: PostgreSQL
4. **AI Integration**: OpenAI GPT models for chatbot capabilities

## Architecture Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │     │  Backend    │     │  Database   │     │    OpenAI   │
│   (Vue.js)  │◄───►│   (Django)  │◄───►│ (PostgreSQL)│     │     API     │
└─────────────┘     └──────┬──────┘     └─────────────┘     └──────▲──────┘
                           │                                       │
                           └───────────────────────────────────────┘
```

## Component Details

### Frontend (Vue.js)

The frontend is a Vue.js application that provides the user interface for the ChatSphere platform.

- **Technology**: Vue.js 3, Pinia for state management
- **Structure**:
  - `src/views`: Page components
  - `src/components`: Reusable UI components
  - `src/stores`: State management 
  - `src/services`: API clients for backend communication
  - `src/router`: Application routing

### Backend (Django)

The backend provides the API for the frontend and handles business logic, database access, and external integrations.

- **Technology**: Django 5.1, Django REST Framework
- **Structure**:
  - `config`: Project settings
  - `chatsphere`: Main application module
    - `models.py`: Database models
    - `views.py`: API endpoints
    - `serializers.py`: Data validation and transformation
    - `urls.py`: API routing

### Database (PostgreSQL)

PostgreSQL serves as the primary data store for the application.

- **Key Tables**:
  - `User`: User accounts
  - `UserProfile`: Extended user information
  - `Bot`: Chatbot configurations
  - `Document`: Training materials for bots
  - `Chunk`: Document fragments with embeddings
  - `Conversation`: User-bot conversations
  - `Message`: Individual messages within conversations

### AI Integration

The platform integrates with OpenAI's GPT models for natural language processing and generation.

- **Components**:
  - Text embedding for knowledge base indexing
  - Chat completion for conversational responses
  - Context management for maintaining conversation flow

## Data Flow

1. **User Interaction**: User interacts with the frontend
2. **API Request**: Frontend sends requests to the Django backend
3. **Data Processing**: Backend processes requests, interacts with the database
4. **AI Processing**: For chatbot interactions, the backend communicates with OpenAI
5. **Response**: Data flows back through the stack to the user

## Deployment Architecture

The application is containerized using Docker and orchestrated with Docker Compose:

- Each component runs in its own container
- Services communicate over a Docker network
- Environment-specific configurations are managed through environment variables
- Persistence is maintained through Docker volumes

## Security Architecture

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **Data Protection**: TLS for all communications
- **Secrets Management**: Environment variables and Docker secrets

## Scalability Considerations

- Horizontal scaling of backend services
- Database connection pooling
- Caching layer for frequently accessed data
- Asynchronous processing for long-running tasks

---

For more detailed information, refer to the specific component documentation:
- [Frontend Architecture](./frontend.md)
- [Backend Architecture](./backend.md)
- [Database Schema](./database.md)
- [AI Integration](./ai_integration.md) 