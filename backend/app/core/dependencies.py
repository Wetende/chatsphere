from fastapi import Depends, HTTPException, status, Request
import os
from app.core.auth import get_current_user
from app.utils.rate_limiter import RateLimiter

_rate_limiter = None

def get_rate_limiter() -> RateLimiter:
    global _rate_limiter
    if _rate_limiter is None:
        redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        try:
            _rate_limiter = RateLimiter(redis_url)
        except Exception:
            _rate_limiter = None
    return _rate_limiter

async def rate_limit_user(request: Request, current_user = Depends(get_current_user)):
    limiter = get_rate_limiter()
    if not limiter:
        return  # no-op if redis not available
    user_id = str(current_user.id)
    # naive role extraction
    roles = current_user.roles if isinstance(current_user.roles, list) else ["user"]
    role = roles[0] if roles else "user"
    if not limiter.is_allowed(user_id, role):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Rate limit exceeded")