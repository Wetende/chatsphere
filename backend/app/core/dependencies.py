from fastapi import Depends, HTTPException, status, Request
import os
from app.core.auth import get_current_user, get_user_roles
from app.utils.rate_limiter import RateLimiter
from app.utils.rbac import RBACManager, Resource, Permission

_rate_limiter = None
_rbac = RBACManager()

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
    roles = current_user.roles if isinstance(current_user.roles, list) else ["user"]
    role = roles[0] if roles else "user"
    if not limiter.is_allowed(user_id, role):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Rate limit exceeded")

# RBAC requirement factory

def require_permission(resource: Resource, permission: Permission):
    async def _checker(roles = Depends(get_user_roles)):
        if not _rbac.has_permission(roles, resource, permission):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    return _checker
