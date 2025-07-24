from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from app.core.database import engine
from app.core.lifespan import lifespan
from app.routers import auth_router, bots_router, conversations_router
from agent.routing import chat_router, ingestion_router

# Load environment variables
load_dotenv()

# Create FastAPI app with lifespan management
app = FastAPI(
    title="ChatSphere API",
    description="A comprehensive AI-powered chatbot platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Trusted Host Middleware
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "*.chatsphere.com"]
)

# API Routes
api_v1_prefix = os.getenv("API_V1_STR", "/api/v1")

# Core application routes
app.include_router(auth_router.router, prefix=f"{api_v1_prefix}/auth", tags=["authentication"])
app.include_router(bots_router.router, prefix=f"{api_v1_prefix}/bots", tags=["bots"])
app.include_router(conversations_router.router, prefix=f"{api_v1_prefix}/conversations", tags=["conversations"])

# AI agent routes
app.include_router(chat_router.router, prefix=f"{api_v1_prefix}/chat", tags=["ai-chat"])
app.include_router(ingestion_router.router, prefix=f"{api_v1_prefix}/ingestion", tags=["ai-ingestion"])

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to ChatSphere API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "chatsphere-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if os.getenv("ENVIRONMENT") == "development" else False
    ) 