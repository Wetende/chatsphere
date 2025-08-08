from typing import Dict
import time
import redis
from dataclasses import dataclass

@dataclass
class RateLimit:
    requests: int
    window: int  # seconds

class RateLimiter:
    def __init__(self, redis_url: str):
        self.redis = redis.from_url(redis_url)
        self.default_limits = {
            'user': RateLimit(1000, 3600),
            'moderator': RateLimit(5000, 3600),
            'admin': RateLimit(10000, 3600),
        }

    def is_allowed(self, user_id: str, role: str = 'user') -> bool:
        key = f"rate_limit:{user_id}"
        limit = self.default_limits.get(role, self.default_limits['user'])
        current = int(time.time())
        window_start = current - limit.window
        # Remove old
        self.redis.zremrangebyscore(key, 0, window_start)
        count = self.redis.zcard(key)
        if count >= limit.requests:
            return False
        self.redis.zadd(key, {str(current): current})
        self.redis.expire(key, limit.window)
        return True
