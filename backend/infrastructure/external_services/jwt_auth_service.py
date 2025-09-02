"""
Infrastructure Implementation - JWT Authentication Service

JWT token generation and validation service for user authentication.
This module belongs to the Infrastructure layer.

Key Features:
- JWT access and refresh token generation
- Token validation and expiration checking
- User claims extraction from tokens
- Configurable token expiration times
- Secure token signing with HS256/RS256
"""

import logging
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional

import jwt

from application.interfaces.auth_service import (
    IAuthService,
    AuthServiceError,
    TokenGenerationError,
    TokenValidationError
)

logger = logging.getLogger(__name__)


class JWTAuthService(IAuthService):
    """JWT-based authentication service implementation."""
    
    def __init__(
        self,
        secret_key: str,
        algorithm: str = "HS256",
        access_token_expire_minutes: int = 30,
        refresh_token_expire_days: int = 7,
        issuer: str = "kyrochat-api"
    ):
        """
        Initialize JWT authentication service.
        
        Args:
            secret_key: Secret key for signing tokens
            algorithm: JWT signing algorithm (HS256, RS256, etc.)
            access_token_expire_minutes: Access token expiration in minutes
            refresh_token_expire_days: Refresh token expiration in days
            issuer: Token issuer identifier
        """
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_expire_minutes = access_token_expire_minutes
        self.refresh_token_expire_days = refresh_token_expire_days
        self.issuer = issuer
    
    def generate_access_token(
        self, 
        user_id: str, 
        email: str, 
        additional_claims: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Generate a JWT access token for a user.
        
        Args:
            user_id: User identifier
            email: User email address
            additional_claims: Optional additional claims to include
            
        Returns:
            JWT access token string
            
        Raises:
            TokenGenerationError: If token generation fails
        """
        try:
            now = datetime.now(timezone.utc)
            expire = now + timedelta(minutes=self.access_token_expire_minutes)
            
            payload = {
                "sub": user_id,  # Subject (user ID)
                "email": email,
                "type": "access",
                "iat": now,  # Issued at
                "exp": expire,  # Expiration
                "iss": self.issuer,  # Issuer
                "aud": "kyrochat-users"  # Audience
            }
            
            # Add any additional claims
            if additional_claims:
                payload.update(additional_claims)
            
            token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
            
            logger.info(f"Generated access token for user {user_id}")
            return token
            
        except Exception as e:
            logger.error(f"Failed to generate access token for user {user_id}: {e}")
            raise TokenGenerationError(f"Failed to generate access token: {str(e)}", e)
    
    def generate_refresh_token(self, user_id: str) -> str:
        """
        Generate a JWT refresh token for a user.
        
        Args:
            user_id: User identifier
            
        Returns:
            JWT refresh token string
            
        Raises:
            TokenGenerationError: If token generation fails
        """
        try:
            now = datetime.now(timezone.utc)
            expire = now + timedelta(days=self.refresh_token_expire_days)
            
            payload = {
                "sub": user_id,
                "type": "refresh",
                "iat": now,
                "exp": expire,
                "iss": self.issuer,
                "aud": "kyrochat-users"
            }
            
            token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
            
            logger.info(f"Generated refresh token for user {user_id}")
            return token
            
        except Exception as e:
            logger.error(f"Failed to generate refresh token for user {user_id}: {e}")
            raise TokenGenerationError(f"Failed to generate refresh token: {str(e)}", e)
    
    def validate_token(self, token: str, token_type: str = "access") -> Dict[str, Any]:
        """
        Validate a JWT token and return its claims.
        
        Args:
            token: JWT token to validate
            token_type: Expected token type ("access" or "refresh")
            
        Returns:
            Token payload/claims dictionary
            
        Raises:
            TokenValidationError: If token validation fails
        """
        try:
            # Decode and validate token
            payload = jwt.decode(
                token,
                self.secret_key,
                algorithms=[self.algorithm],
                audience="kyrochat-users",
                issuer=self.issuer
            )
            
            # Check token type
            if payload.get("type") != token_type:
                raise TokenValidationError(f"Invalid token type. Expected {token_type}")
            
            # Check if token is expired
            exp = payload.get("exp")
            if exp and datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(timezone.utc):
                raise TokenValidationError("Token has expired")
            
            return payload
            
        except jwt.ExpiredSignatureError:
            raise TokenValidationError("Token has expired")
        except jwt.InvalidTokenError as e:
            raise TokenValidationError(f"Invalid token: {str(e)}")
        except Exception as e:
            logger.error(f"Token validation error: {e}")
            raise TokenValidationError(f"Token validation failed: {str(e)}", e)
    
    def extract_user_id(self, token: str) -> str:
        """
        Extract user ID from a valid JWT token.
        
        Args:
            token: JWT token
            
        Returns:
            User ID string
            
        Raises:
            TokenValidationError: If token is invalid or user ID missing
        """
        payload = self.validate_token(token)
        user_id = payload.get("sub")
        
        if not user_id:
            raise TokenValidationError("Token does not contain user ID")
        
        return user_id
    
    def refresh_access_token(self, refresh_token: str) -> str:
        """
        Generate a new access token from a valid refresh token.
        
        Args:
            refresh_token: Valid refresh token
            
        Returns:
            New access token string
            
        Raises:
            TokenValidationError: If refresh token is invalid
            TokenGenerationError: If new token generation fails
        """
        try:
            # Validate refresh token
            payload = self.validate_token(refresh_token, token_type="refresh")
            user_id = payload.get("sub")
            
            if not user_id:
                raise TokenValidationError("Refresh token does not contain user ID")
            
            # For a new access token, we'd typically need to get fresh user data
            # For now, we'll generate with minimal claims
            # In a real implementation, you'd fetch current user email/claims from DB
            return self.generate_access_token(
                user_id=user_id,
                email=payload.get("email", ""),  # Fallback if email not in refresh token
                additional_claims={}
            )
            
        except TokenValidationError:
            raise
        except Exception as e:
            logger.error(f"Failed to refresh access token: {e}")
            raise TokenGenerationError(f"Failed to refresh access token: {str(e)}", e)
    
    def is_token_expired(self, token: str) -> bool:
        """
        Check if a token is expired without full validation.
        
        Args:
            token: JWT token to check
            
        Returns:
            True if token is expired, False otherwise
        """
        try:
            # Decode without verification to check expiration
            payload = jwt.decode(token, options={"verify_signature": False})
            exp = payload.get("exp")
            
            if exp:
                return datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(timezone.utc)
            
            return False
            
        except Exception:
            return True  # If we can't decode, consider it expired
    
    def get_token_expiration(self, token: str) -> Optional[datetime]:
        """
        Get the expiration datetime of a token.
        
        Args:
            token: JWT token
            
        Returns:
            Expiration datetime or None if not available
        """
        try:
            payload = jwt.decode(token, options={"verify_signature": False})
            exp = payload.get("exp")
            
            if exp:
                return datetime.fromtimestamp(exp, tz=timezone.utc)
            
            return None
            
        except Exception:
            return None
