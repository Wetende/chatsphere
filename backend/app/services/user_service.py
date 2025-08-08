from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from app.models.user import User
from app.core.auth import hash_password, verify_password

class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_username(self, username: str) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.username == username))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def create_user(self, username: str, email: str, password: str, first_name: str, last_name: str) -> User:
        user = User(
            username=username,
            email=email,
            hashed_password=hash_password(password),
            first_name=first_name,
            last_name=last_name,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def authenticate(self, username_or_email: str, password: str) -> Optional[User]:
        user = await self.get_by_username(username_or_email)
        if not user:
            user = await self.get_by_email(username_or_email)
        if user and verify_password(password, user.hashed_password):
            return user
        return None
