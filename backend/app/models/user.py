from sqlalchemy import String, Boolean, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from .base import Base, TimestampMixin, UUIDMixin
from typing import Optional

class SubscriptionPlan(Base, TimestampMixin):
    __tablename__ = "subscription_plans"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    price: Mapped[float] = mapped_column(Float)
    description: Mapped[Optional[str]] = mapped_column(String(500))
    features: Mapped[dict] = mapped_column(JSON, default=dict)
    stripe_price_id: Mapped[Optional[str]] = mapped_column(String(100), unique=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    users = relationship("User", back_populates="subscription_plan")

class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[PGUUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(50))
    last_name: Mapped[str] = mapped_column(String(50))
    is_staff: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    date_joined: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    last_login: Mapped[Optional[DateTime]] = mapped_column(DateTime(timezone=True))
    subscription_status: Mapped[str] = mapped_column(String(20), default="free", nullable=False)
    subscription_plan_id: Mapped[Optional[PGUUID]] = mapped_column(PGUUID(as_uuid=True), ForeignKey("subscription_plans.id"))
    stripe_customer_id: Mapped[Optional[str]] = mapped_column(String(100), unique=True)
    roles: Mapped[dict] = mapped_column(JSON, default=lambda: ["user"])  # list of roles

    subscription_plan = relationship("SubscriptionPlan", back_populates="users")
    bots = relationship("Bot", back_populates="owner", cascade="all, delete-orphan")