from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.sql import func
from .base import Base

class AnalyticsUsage(Base):
    __tablename__ = "analytics_usage"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    timestamp: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    bot_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey('bots.id'))
    metric_type: Mapped[str] = mapped_column(String(50), nullable=False)
    value: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    metadata: Mapped[dict] = mapped_column(JSON)

class ConversationFeedback(Base):
    __tablename__ = "conversation_feedback"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    timestamp: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    conversation_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey('conversations.id'), nullable=False)
    message_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey('messages.id'))
    rating: Mapped[int] = mapped_column(Integer)
    feedback_text: Mapped[str] = mapped_column(String)
    user_id: Mapped[str] = mapped_column(String(255))

class TrainingSourceStats(Base):
    __tablename__ = "training_source_stats"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    timestamp: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    document_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey('documents.id'), nullable=False)
    retrieval_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    last_retrieved: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

class ErrorLog(Base):
    __tablename__ = "error_logs"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    timestamp: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    service: Mapped[str] = mapped_column(String(50), nullable=False)
    error_type: Mapped[str] = mapped_column(String(100), nullable=False)
    error_message: Mapped[str] = mapped_column(String, nullable=False)
    details: Mapped[dict] = mapped_column(JSON)
    bot_id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey('bots.id'))