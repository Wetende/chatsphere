from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class BotStatus(str, Enum):
    active = "active"
    inactive = "inactive"
    training = "training"
    error = "error"

class BotCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    welcome_message: str = Field(default="Hi! How can I help you today?", max_length=200)
    model_type: str = Field(default="gemini-2.0-flash-exp", description="AI model type")
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    system_prompt: Optional[str] = Field(None, max_length=1000)
    is_public: bool = False
    configuration: dict = {}

class BotUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    welcome_message: Optional[str] = Field(None, max_length=200)
    model_type: Optional[str] = None
    temperature: Optional[float] = Field(None, ge=0.0, le=2.0)
    system_prompt: Optional[str] = Field(None, max_length=1000)
    is_public: Optional[bool] = None
    configuration: Optional[dict] = None

class BotResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    welcome_message: str
    model_type: str
    temperature: float
    is_public: bool
    status: BotStatus
    created_at: datetime
    updated_at: datetime
    owner_id: str

    class Config:
        from_attributes = True

class BotList(BaseModel):
    bots: List[BotResponse]
    total: int
    skip: int
    limit: int
