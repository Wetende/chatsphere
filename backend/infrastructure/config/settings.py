"""
Infrastructure Configuration - Settings Management

Centralized configuration management for the infrastructure layer.
Uses Pydantic settings for validation and environment variable support.

Key Features:
- Environment-based configuration
- Validation and type safety
- Database connection settings
- External service configurations
- Feature flags and toggles
- Security settings

Configuration Sources (Priority Order):
1. Environment variables
2. .env file
3. Default values
4. Configuration validation
"""

import os
from typing import List, Optional
from pydantic import Field
from pydantic_settings import BaseSettings
from pydantic.networks import HttpUrl


class DatabaseSettings(BaseSettings):
    """Database configuration settings."""

    url: str = Field("sqlite:///./test.db", env="DATABASE_URL")  # Sync URL for migrations
    pool_size: int = Field(10, env="DB_POOL_SIZE")
    max_overflow: int = Field(20, env="DB_MAX_OVERFLOW")
    pool_timeout: int = Field(30, env="DB_POOL_TIMEOUT")
    pool_recycle: int = Field(300, env="DB_POOL_RECYCLE")

    class Config:
        env_file = ".env"
        extra = "ignore"


class AISettings(BaseSettings):
    """AI service configuration settings."""

    google_ai_api_key: str = Field("default-key", env="GOOGLE_API_KEY")
    default_ai_model: str = Field("gemini-pro", env="DEFAULT_AI_MODEL")
    max_tokens: int = Field(2048, env="MAX_TOKENS")
    temperature: float = Field(0.7, env="AI_TEMPERATURE")

    class Config:
        env_file = ".env"
        extra = "ignore"


class EmailSettings(BaseSettings):
    """Email service configuration settings."""

    smtp_host: str = Field("localhost", env="SMTP_HOST")
    smtp_port: int = Field(587, env="SMTP_PORT")
    smtp_username: Optional[str] = Field(None, env="SMTP_USERNAME")
    smtp_password: Optional[str] = Field(None, env="SMTP_PASSWORD")
    smtp_use_tls: bool = Field(True, env="SMTP_USE_TLS")
    default_from_email: str = Field("test@example.com", env="DEFAULT_FROM_EMAIL")

    class Config:
        env_file = ".env"
        extra = "ignore"


class SecuritySettings(BaseSettings):
    """Security configuration settings."""

    secret_key: str = Field("default-secret-key", env="SECRET_KEY")
    jwt_algorithm: str = Field("HS256", env="JWT_ALGORITHM")
    jwt_expiration_hours: int = Field(24, env="JWT_EXPIRATION_HOURS")
    bcrypt_rounds: int = Field(12, env="BCRYPT_ROUNDS")

    class Config:
        env_file = ".env"
        extra = "ignore"


class VectorDatabaseSettings(BaseSettings):
    """Vector database configuration settings."""

    pinecone_api_key: str = Field("default-pinecone-key", env="PINECONE_API_KEY")
    pinecone_environment: str = Field("us-west1-gcp", env="PINECONE_ENVIRONMENT")
    pinecone_index_name: str = Field("default-index", env="PINECONE_INDEX_NAME")
    pinecone_dimension: int = Field(768, env="PINECONE_DIMENSION")

    class Config:
        env_file = ".env"
        extra = "ignore"


class CacheSettings(BaseSettings):
    """Cache configuration settings."""

    redis_url: Optional[str] = Field(None, env="REDIS_URL")
    cache_ttl: int = Field(3600, env="CACHE_TTL")  # 1 hour default

    class Config:
        env_file = ".env"
        extra = "ignore"


class MonitoringSettings(BaseSettings):
    """Monitoring and observability settings."""

    enable_metrics: bool = Field(True, env="ENABLE_METRICS")
    enable_tracing: bool = Field(False, env="ENABLE_TRACING")
    log_level: str = Field("INFO", env="LOG_LEVEL")

    class Config:
        env_file = ".env"
        extra = "ignore"


class Settings(BaseSettings):
    """
    Main application settings.

    Central configuration class that aggregates all settings categories.
    Provides a single point of access for all configuration values.
    """

    # Core application settings
    debug: bool = Field(False, env="DEBUG")
    environment: str = Field("development", env="ENVIRONMENT")
    service_name: str = Field("kyrochat-api", env="SERVICE_NAME")
    service_version: str = Field("1.0.0", env="SERVICE_VERSION")

    # CORS settings
    allowed_origins: List[str] = Field(
        ["http://localhost:3000", "http://localhost:8000"],
        env="ALLOWED_ORIGINS"
    )
    allowed_hosts: Optional[List[str]] = Field(None, env="ALLOWED_HOSTS")

    # Rate limiting
    rate_limit_requests: int = Field(100, env="RATE_LIMIT_REQUESTS")
    rate_limit_window_seconds: int = Field(60, env="RATE_LIMIT_WINDOW_SECONDS")

    # File upload settings
    max_upload_size_mb: int = Field(10, env="MAX_UPLOAD_SIZE_MB")
    allowed_file_types: List[str] = Field(
        [".pdf", ".txt", ".docx", ".md"],
        env="ALLOWED_FILE_TYPES"
    )

    # Sub-settings groups
    database: DatabaseSettings = Field(default_factory=DatabaseSettings)
    ai: AISettings = Field(default_factory=AISettings)
    email: EmailSettings = Field(default_factory=EmailSettings)
    security: SecuritySettings = Field(default_factory=SecuritySettings)
    vector_db: VectorDatabaseSettings = Field(default_factory=VectorDatabaseSettings)
    cache: CacheSettings = Field(default_factory=CacheSettings)
    monitoring: MonitoringSettings = Field(default_factory=MonitoringSettings)

    class Config:
        env_file = ".env"
        extra = "ignore"
        case_sensitive = False

    @property
    def is_development(self) -> bool:
        """Check if running in development environment."""
        return self.environment.lower() == "development"

    @property
    def is_production(self) -> bool:
        """Check if running in production environment."""
        return self.environment.lower() == "production"

    @property
    def database_url(self) -> str:
        """Get the database URL from database settings."""
        return self.database.url

    @property
    def google_ai_api_key(self) -> str:
        """Get the Google AI API key."""
        return self.ai.google_ai_api_key

    @property
    def default_ai_model(self) -> str:
        """Get the default AI model name."""
        return self.ai.default_ai_model


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """Get the global settings instance."""
    return settings


# Environment validation
def validate_environment() -> None:
    """
    Validate that all required environment variables are set.

    Raises:
        ValueError: If any required environment variables are missing
    """
    required_vars = [
        "DATABASE_URL",
        "SECRET_KEY",
        "GOOGLE_API_KEY",
        "PINECONE_API_KEY",
        "DEFAULT_FROM_EMAIL",
    ]

    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)

    if missing_vars:
        raise ValueError(
            f"Missing required environment variables: {', '.join(missing_vars)}"
        )
