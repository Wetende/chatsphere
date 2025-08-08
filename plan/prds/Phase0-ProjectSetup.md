# Sub-PRD: Phase 0 - Project Setup and Foundation

## Overview
This Sub-PRD outlines the foundation setup for ChatSphere, establishing development environment, project structure, and core architecture without Docker.

## User Stories
- **As a developer**, I want to set up the development environment quickly so that I can start building features immediately
- **As a developer**, I want the backend to auto-reload on changes so that I can see updates without manual restarts
- **As a developer**, I want clear API documentation so that I can understand all available endpoints
- **As a developer**, I want database migrations to work seamlessly so that schema changes are tracked properly
- **As a team member**, I want consistent code formatting so that code reviews focus on logic rather than style

## Functional Requirements
- Set up **local development environment** without Docker containers
- Create **FastAPI backend** with proper async architecture
- Initialize **React.js frontend** with modern tooling
- Establish **PostgreSQL database** with async SQLAlchemy
- Configure **development workflow** with proper tooling

## Acceptance Criteria
- Local development environment runs with `./scripts/setup-dev.sh`
- FastAPI backend serves at `http://localhost:8000` with auto-reload
- React frontend serves at `http://localhost:3000` with hot reload
- Database migrations work with Alembic
- API documentation available at `http://localhost:8000/docs`
- Environment variables loaded from `.env` file

## Technical Specifications
- **Backend**: FastAPI with uvicorn, async/await patterns
- **Frontend**: React 18+ with TypeScript, Vite for build
- **Database**: PostgreSQL with asyncpg driver
- **ORM**: SQLAlchemy 2.0 with async sessions
- **Authentication**: JWT preparation (no implementation yet)
- **Code Quality**: Black, isort, mypy, ruff for Python; ESLint, Prettier for TypeScript

## AI Coding Prompt
Create development setup scripts and project structure following the exact folder layout from `plan/05-backend-implementation.md`. Ensure no Docker dependencies and focus on local development with virtual environments.