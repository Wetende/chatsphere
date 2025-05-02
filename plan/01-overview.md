# ChatSphere Overview

## Project Vision

ChatSphere aims to revolutionize how businesses create, deploy, and manage AI-powered chatbots. By offering a platform that outperforms Chatbase in speed, functionality, customization, and user experience, ChatSphere will become the preferred solution for businesses seeking to enhance customer engagement through intelligent chat interfaces.

Our platform will empower users to create sophisticated chatbots in minutes without coding expertise, while offering advanced customization and integration options for technical users.

## Core Values

1. **User-Centric Design**: Every feature and interface is designed with the user's experience as the priority.
2. **Exceptional Performance**: Fast bot creation, training, and response times are non-negotiable.
3. **Deep Customization**: Flexibility in appearance, behavior, and integration options.
4. **Semantic Understanding**: Superior comprehension of content and user queries.
5. **Data Privacy & Security**: Rigorous protection of user and training data.
6. **Scalability**: Architecture designed to grow from individual users to enterprise deployments.
7. **Continuous Innovation**: Regular integration of emerging AI technologies and features.

## Target Audience

- **Small to Medium Businesses**: Seeking cost-effective customer support solutions
- **Enterprise Organizations**: Needing customizable, scalable chatbot solutions
- **Content Creators**: Looking to engage with audiences through interactive AI
- **Educational Institutions**: Providing information and guidance to students
- **Technical Users**: Developers integrating chatbots into existing applications

## Competitive Advantages

| Feature | ChatSphere | Chatbase |
|---------|------------|----------|
| Bot Creation Time | < 3 minutes | 5+ minutes |
| Language Support | 200+ languages | 150+ languages |
| Data Sources | URLs, PDFs, text, live scraping | Limited sources |
| Widget Customization | Extensive with live preview | Basic |
| AI Models | Google Gemini (and potentially others) | Limited |
| Analytics | Comprehensive with actionable insights | Basic |
| Integration Options | Wide range of platforms and APIs | Limited |
| Mobile Optimization | Fully responsive experience | Partial |

## High-Level Architecture

ChatSphere follows a layered architecture with a separated AI Agent Service:

```
┌─────────────┐    ┌─────────────┐   ┌─────────────┐
│  Frontend   │ ◄─►│   Backend   │───►│ Agent Svc   │
│  (Vue.js)   │    │  (Django)   │   │  (FastAPI)  │
└─────────────┘    └──────┬──────┘   └──────┬──────┘
       ▲                  │                  │
       │                  │ HTTP Call        │ Pinecone API
       │                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  User Data  │    │ App Data DB │    │  Vector DB  │
│ (PostgreSQL)│    │ (PostgreSQL)│    │ (Pinecone)  │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Key Components

1. **Frontend Layer**
   - Vue.js framework for reactive UI
   - User dashboard, bot configuration, chat interface

2. **Backend Layer (Django)**
   - Main API for frontend interaction
   - User auth, bot/doc management
   - Orchestrates calls to Agent Service
   - Stores application data in PostgreSQL

3. **Agent Service Layer (FastAPI)**
   - Internal API for AI tasks
   - Integrates with Google Gemini (LLM & Embeddings)
   - Integrates with Pinecone (Vector Store)
   - Uses LangChain for orchestration

4. **Database Layer**
   - PostgreSQL for relational application data (users, bots, etc.)
   - Pinecone for vector embeddings
   - Redis (optional) for caching/queues

5. **Infrastructure**
   - Docker containerization
   - Scalable cloud deployment (e.g., Kubernetes)
   - Load balancing

## Key Features

### Chatbot Creation and Training
- No-code chatbot creation interface
- Multi-source knowledge base creation (Docs processed by Django, embedded by Agent)
- Real-time training progress indicators

### Widget Customization
- Visual customization interface with live preview
- Theme templates, layout options, custom CSS
- Behavior customization

### Dashboard and Analytics
- User-friendly dashboard
- Conversation analytics and insights
- Performance metrics

### Integration Options
- JavaScript snippet for web embedding
- Webhook support (handled by Django)
- API access (via Django backend)

### AI Features (Powered by Agent Service)
- Context-aware conversations using Pinecone retrieval
- Multi-turn dialogue support via LangChain memory
- Potential for entity recognition, sentiment analysis (added to Agent Service)
- Multi-language support (handled by Gemini model)
- **Flexible Agent Types**: The decoupled agent service allows for implementing various LangChain agent types (e.g., conversational, ReAct, tool-using) in the future, configured via the main backend.

## Technical Foundations

- **Modern JavaScript Framework**: Vue.js 3
- **Robust Backend**: Django 4.x with REST Framework
- **AI Service**: FastAPI
- **Database**: PostgreSQL 14+
- **Vector Storage**: Pinecone
- **AI Integration**: Google Gemini API, LangChain
- **Containerization**: Docker
- **Authentication**: JWT-based auth
- **Testing**: Jest/Vitest (Frontend), Pytest (Backend & Agent)
- **CI/CD**: GitHub Actions

## Success Metrics

1. **User Acquisition**: Target of 1,000 users in first three months
2. **Retention Rate**: 85%+ retention after 30 days
3. **Chatbot Creation Time**: Average under 3 minutes (including embedding via agent)
4. **Response Quality**: 90%+ satisfaction rate from end users
5. **System Performance**: 99.9% uptime, <500ms average API response time (incl. agent call)
6. **Conversion Rate**: 10%+ free-to-paid conversion

## Next Steps

Refer to the [Project Phases](./02-project-phases.md) document for detailed implementation timeline and milestones. 