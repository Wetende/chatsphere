from sqlalchemy import String, Boolean, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from .base import Base, TimestampMixin
from typing import Optional

class Bot(Base, TimestampMixin):
    __tablename__ = "bots"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    owner_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(500))
    avatar: Mapped[Optional[str]] = mapped_column(String(255))
    welcome_message: Mapped[str] = mapped_column(String(200), default="Hi! How can I help you today?", nullable=False)
    model_type: Mapped[str] = mapped_column(String(50), default="gemini-2.0-flash-exp", nullable=False)
    temperature: Mapped[float] = mapped_column(Float, default=0.7, nullable=False)
    system_prompt: Mapped[Optional[str]] = mapped_column(String(1000))
    is_public: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="active", nullable=False)
    configuration: Mapped[dict] = mapped_column(JSON, default=dict)

    owner = relationship("User", back_populates="bots")
    documents = relationship("Document", back_populates="bot", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="bot", cascade="all, delete-orphan")

class Document(Base, TimestampMixin):
    __tablename__ = "documents"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    bot_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("bots.id"))
    name: Mapped[str] = mapped_column(String(255))
    file: Mapped[Optional[str]] = mapped_column(String(200))
    url: Mapped[Optional[str]] = mapped_column(String(2000))
    content_type: Mapped[str] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(20), default="processing", nullable=False)
    error_message: Mapped[Optional[str]] = mapped_column(String)
    metadata: Mapped[dict] = mapped_column(JSON, default=dict)

    bot = relationship("Bot", back_populates="documents")
    chunks = relationship("Chunk", back_populates="document", cascade="all, delete-orphan")

class Chunk(Base):
    __tablename__ = "chunks"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    document_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("documents.id"))
    content: Mapped[str] = mapped_column(String)
    pinecone_vector_id: Mapped[Optional[str]] = mapped_column(String(100))
    metadata: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    document = relationship("Document", back_populates="chunks")

class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    bot_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("bots.id"))
    user_id: Mapped[Optional[str]] = mapped_column(String(255))
    title: Mapped[str] = mapped_column(String(255), default="New Conversation")
    metadata: Mapped[dict] = mapped_column(JSON, default=dict)
    started_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    ended_at: Mapped[Optional[DateTime]] = mapped_column(DateTime(timezone=True))

    bot = relationship("Bot", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = "messages"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    conversation_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("conversations.id"))
    message_type: Mapped[str] = mapped_column(String(10))  # user or assistant
    content: Mapped[str] = mapped_column(String)
    metadata: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    conversation = relationship("Conversation", back_populates="messages")