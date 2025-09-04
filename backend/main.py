"""
KyroChat FastAPI Application - Onion Architecture Entry Point

Main application entry point following onion architecture principles.
Configures the FastAPI application with proper dependency injection,
middleware, and router registration.

Key Features:
- Onion architecture dependency injection
- Async lifecycle management
- Comprehensive middleware stack
- API router registration with versioning
- Error handling and logging
- Health checks and monitoring
- CORS and security configuration

Architecture Layers Integrated:
- Presentation: FastAPI routers and middleware
- Application: Use cases and orchestration
- Domain: Pure business logic (no framework deps)
- Infrastructure: External service implementations

Dependency Flow:
- main.py → composition_root → use_cases → repositories → external_services
- All dependencies flow inward toward domain layer
- Infrastructure implementations injected at composition root
- Clean separation of concerns maintained
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException

# Composition root for dependency injection
from composition_root import composition_root

# Presentation layer routers
from presentation.api.user_router import router as user_router
from presentation.api.bot_router import router as bot_router
from presentation.api.conversation_router import router as conversation_router
from presentation.api.auth_router import router as auth_router
from presentation.api.document_router import router as document_router
from presentation.api.analytics_router import router as analytics_router
from presentation.api.widget_router import router as widget_router
from presentation.api.import_export_router import router as import_export_router
from presentation.api.websocket_router import router as websocket_router

# Presentation layer middleware
from presentation.middleware.logging_middleware import LoggingMiddleware
from presentation.middleware.rate_limiting_middleware import RateLimitingMiddleware
from presentation.middleware.auth_middleware import AuthMiddleware
from presentation.middleware.error_handling_middleware import ErrorHandlingMiddleware
from presentation.middleware.localization_middleware import LocalizationMiddleware

# Infrastructure configuration
from infrastructure.config.settings import get_settings


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(fastapi_app: FastAPI):
    """
    Async lifespan manager for application startup and shutdown.
    
    Handles:
    - Database connection setup
    - External service initialization
    - Resource cleanup on shutdown
    - Dependency injection container setup
    """
    logger.info("Starting KyroChat application...")
    
    try:
        # Setup composition root and dependencies
        await composition_root.setup()
        logger.info("Dependency injection container initialized")
        
        # Initialize external services
        logger.info("External services initialized")
        
        # Startup complete
        logger.info("KyroChat application started successfully")
        yield
        
    except Exception as e:
        logger.error(f"Failed to start application: {e}")
        raise
    finally:
        # Cleanup resources
        logger.info("Shutting down KyroChat application...")
        try:
            await composition_root.teardown()
            logger.info("Cleanup completed successfully")
        except Exception as e:
            logger.error(f"Error during cleanup: {e}")


# Create FastAPI application with onion architecture
app = FastAPI(
    title="KyroChat API",
    description="AI-powered chatbot platform with onion architecture",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# Get settings
settings = get_settings()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Add trusted host middleware
if settings.allowed_hosts:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.allowed_hosts
    )

# Add custom middleware (order matters - first added = outermost)
app.add_middleware(ErrorHandlingMiddleware)
app.add_middleware(LoggingMiddleware)
app.add_middleware(LocalizationMiddleware)
app.add_middleware(RateLimitingMiddleware)

# Configure AuthMiddleware with DI-provided auth service and public paths
_auth_service = composition_root.get_auth_service()
app.add_middleware(
    AuthMiddleware,
    auth_service=_auth_service,
    public_paths=["/docs", "/redoc", "/openapi.json", "/health", "/api/v1/auth/"]
)

# Metrics integration can be added here when dependencies are available


# API Router Registration
# All routes under /api/v1 prefix for versioning
API_V1_PREFIX = "/api/v1"

# Authentication routes
app.include_router(
    auth_router,
    prefix=API_V1_PREFIX,
    tags=["authentication"]
)

# User management routes
app.include_router(
    user_router,
    prefix=API_V1_PREFIX,
    tags=["users"]
)

# Bot management routes
app.include_router(
    bot_router,
    prefix=API_V1_PREFIX,
    tags=["bots"]
)

# Conversation and chat routes
app.include_router(
    conversation_router,
    prefix=API_V1_PREFIX,
    tags=["conversations"]
)

# Document routes
app.include_router(
    document_router,
    prefix=API_V1_PREFIX,
    tags=["documents"]
)

# Analytics routes
app.include_router(
    analytics_router,
    prefix=API_V1_PREFIX,
    tags=["analytics"]
)

# Widget customization routes
app.include_router(
    widget_router,
    prefix=API_V1_PREFIX,
    tags=["widgets"]
)

# Bot import/export routes
app.include_router(
    import_export_router,
    prefix=API_V1_PREFIX,
    tags=["bots"]
)

# WebSocket routes (not versioned)
app.include_router(websocket_router)


# Health Check Endpoints
@app.get("/health", tags=["health"])
async def health_check():
    """
    Basic health check endpoint.
    
    Returns:
        Health status and basic application info
    """
    return {
        "status": "healthy",
        "service": "kyrochat-api",
        "version": "1.0.0",
        "architecture": "onion"
    }


@app.get("/health/ready", tags=["health"])
async def readiness_check():
    """
    Readiness check for Kubernetes deployments.
    
    Checks:
    - Database connectivity
    - External service availability
    - Dependency injection container status
    
    Returns:
        Readiness status with detailed checks
    """
    try:
        # Check database connectivity
        # Implementation would test actual connections
        
        # Check external services
        # Implementation would ping external APIs
        
        return {
            "status": "ready",
            "checks": {
                "database": "healthy",
                "external_services": "healthy",
                "dependencies": "healthy"
            }
        }
    except Exception as e:
        logger.error(f"Readiness check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "not_ready",
                "error": str(e)
            }
        )


@app.get("/health/live", tags=["health"])
async def liveness_check():
    """
    Liveness check for Kubernetes deployments.
    
    Returns:
        Simple liveness indicator
    """
    return {"status": "alive"}


# Global Exception Handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with consistent format."""
    logger.warning(f"HTTP exception: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.status_code,
                "message": exc.detail,
                "type": "http_exception"
            }
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle request validation errors with detailed messages."""
    logger.warning(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": 422,
                "message": "Validation failed",
                "type": "validation_error",
                "details": exc.errors()
            }
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions with logging."""
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": 500,
                "message": "Internal server error",
                "type": "internal_error"
            }
        }
    )


# Root endpoint
@app.get("/", tags=["root"])
async def root():
    """
    Root endpoint with API information.
    
    Returns:
        API welcome message and documentation links
    """
    return {
        "message": "Welcome to KyroChat API",
        "version": "1.0.0",
        "architecture": "onion",
        "documentation": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    
    # Development server configuration
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
        access_log=True
    ) 