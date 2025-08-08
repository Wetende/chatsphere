from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_async_db
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, UserResponse
from app.services.user_service import UserService
from app.core.auth import jwt_handler, get_current_user as get_user_dep

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_async_db)):
    service = UserService(db)
    existing = await service.get_by_username(payload.username)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    existing = await service.get_by_email(payload.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    user = await service.create_user(
        username=payload.username,
        email=payload.email,
        password=payload.password,
        first_name=payload.first_name,
        last_name=payload.last_name,
    )
    return user

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_async_db)):
    service = UserService(db)
    username_or_email = payload.username or (payload.email or "")
    user = await service.authenticate(username_or_email=username_or_email, password=payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = jwt_handler.generate_token(str(user.id))
    return TokenResponse(access_token=token)

@router.post("/logout")
async def logout():
    return {"message": "Logged out"}

@router.get("/me", response_model=UserResponse)
async def me(current_user = Depends(get_user_dep)):
    return current_user 