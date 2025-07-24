from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    """Application settings and configuration"""
    
    # Application
    app_name: str = "ChatSphere"
    version: str = "1.0.0"
    environment: str = "development"
    debug: bool = True
    api_v1_str: str = "/api/v1"
    
    # Database
    database_url: str = "postgresql://postgres:password@localhost:5432/chatsphere"
    database_test_url: str = "postgresql://postgres:password@localhost:5432/chatsphere_test"
    
    # Security
    secret_key: str = "your-super-secret-key-change-this-in-production"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    algorithm: str = "HS256"
    
    # CORS
    allowed_origins: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    allowed_methods: List[str] = ["GET", "POST", "PUT", "DELETE"]
    allowed_headers: List[str] = ["*"]
    
    # File Upload
    max_file_size: int = 10485760  # 10MB
    upload_dir: str = "documents"
    allowed_file_types: List[str] = [".pdf", ".txt", ".docx", ".md"]
    
    # Redis
    redis_url: str = "redis://localhost:6379/0"
    
    # Celery
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/0"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Global settings instance
settings = Settings() 