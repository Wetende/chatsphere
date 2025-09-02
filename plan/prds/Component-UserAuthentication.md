# Sub-PRD: User Authentication System

## Overview
This Sub-PRD outlines the user authentication and authorization system for KyroChat, implementing JWT-based security with FastAPI dependencies.

## User Stories
- **As a new user**, I want to register with email and password so that I can create an account
- **As a returning user**, I want to log in securely so that I can access my data
- **As a user**, I want my session to persist so that I don't need to log in repeatedly
- **As a user**, I want to reset my password if I forget it so that I can regain access
- **As a user**, I want to update my profile information so that it stays current
- **As a security-conscious user**, I want my password to be securely stored so that my account is protected

## Functional Requirements
- Implement **user registration** with email verification
- Create **JWT-based login** with token refresh
- Build **password reset** functionality via email
- Develop **profile management** endpoints
- Establish **role-based permissions** system
- Create **session management** with secure token handling

## Acceptance Criteria
- User can register with email, username, and password
- Email verification required before account activation
- JWT tokens issued on successful login with 1-hour expiry
- Refresh tokens valid for 30 days with rotation
- Password reset sends secure email link
- Profile updates require authentication
- Role-based access controls protect admin endpoints
- All authentication endpoints return proper HTTP status codes

## Technical Specifications
- **Framework**: FastAPI with `HTTPBearer` security scheme and `Depends`
- **Password Hashing**: bcrypt with appropriate work factor
- **JWT Implementation**: `python-jose` with RS256 (asymmetric) or HS256 (symmetric for dev)
- **Database**: Async SQLAlchemy models with proper relationships and indexes
- **Email**: SMTP with HTML templates for verification/reset
- **Validation**: Pydantic schemas with field constraints and custom validators
- **Dependencies**: `get_current_user`, `get_current_active_user` for route protection
- **Responses**: Use `response_model` on all endpoints and consistent error schema
- **Status Codes**: 201 for register, 200 for login/refresh, 204 for logout

## AI Coding Prompt
Implement FastAPI authentication system (initially with sync SQLAlchemy session helper). Use HTTPBearer for JWT tokens and create proper dependencies for route protection. Include email verification and password reset with secure token generation. Add `response_model` types for token and user responses. Routes in `app/routers/auth_router.py` under `/api/v1/auth`:
- `POST /register` (201)
- `POST /login` (200)
- `POST /refresh` (200)
- `POST /reset-password` (200)