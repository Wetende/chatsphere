"""
Infrastructure Implementation - Bcrypt Password Service

Concrete implementation of the `IPasswordService` interface using bcrypt.
This module belongs to the Infrastructure layer.

Key Features:
- Secure password hashing with bcrypt
- Configurable cost factor for performance tuning
- Password strength validation
- Secure random password generation
- Async operations for non-blocking performance
"""

import asyncio
import re
import secrets
import string
from typing import Optional

import bcrypt

from application.interfaces.password_service import (
    IPasswordService,
    PasswordServiceError,
    PasswordHashingError,
    PasswordVerificationError,
    WeakPasswordError
)


class BcryptPasswordService(IPasswordService):
    """Bcrypt-based password service implementation."""
    
    def __init__(self, rounds: int = 12):
        """
        Initialize bcrypt password service.
        
        Args:
            rounds: Number of bcrypt rounds (4-31, default 12)
        """
        if not 4 <= rounds <= 31:
            raise ValueError("Bcrypt rounds must be between 4 and 31")
        self.rounds = rounds
    
    async def hash_password(self, plain_password: str) -> str:
        """
        Hash a plain text password using bcrypt.
        
        Args:
            plain_password: The plain text password to hash
            
        Returns:
            The hashed password string
            
        Raises:
            PasswordHashingError: If password hashing fails
        """
        try:
            # Validate password strength first
            is_valid, error_msg = self.validate_password_strength(plain_password)
            if not is_valid:
                raise WeakPasswordError(error_msg or "Password does not meet strength requirements")
            
            # Hash password in thread pool to avoid blocking
            password_bytes = plain_password.encode('utf-8')
            salt = bcrypt.gensalt(rounds=self.rounds)
            
            # Run bcrypt in thread pool since it's CPU intensive
            loop = asyncio.get_event_loop()
            hashed = await loop.run_in_executor(
                None, 
                bcrypt.hashpw, 
                password_bytes, 
                salt
            )
            
            return hashed.decode('utf-8')
            
        except WeakPasswordError:
            raise
        except Exception as e:
            raise PasswordHashingError(f"Failed to hash password: {str(e)}", e)
    
    async def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """
        Verify a plain text password against a hash.
        
        Args:
            plain_password: The plain text password
            hashed_password: The hashed password to verify against
            
        Returns:
            True if password matches, False otherwise
            
        Raises:
            PasswordVerificationError: If password verification fails
        """
        try:
            password_bytes = plain_password.encode('utf-8')
            hash_bytes = hashed_password.encode('utf-8')
            
            # Run bcrypt verification in thread pool
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                None,
                bcrypt.checkpw,
                password_bytes,
                hash_bytes
            )
            
            return result
            
        except Exception as e:
            raise PasswordVerificationError(f"Failed to verify password: {str(e)}", e)
    
    def validate_password_strength(self, password: str) -> tuple[bool, Optional[str]]:
        """
        Validate password strength according to security policies.
        
        Password Requirements:
        - At least 8 characters long
        - Contains at least one uppercase letter
        - Contains at least one lowercase letter  
        - Contains at least one digit
        - Contains at least one special character
        - No common passwords
        
        Args:
            password: The password to validate
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        if not password:
            return False, "Password cannot be empty"
        
        if len(password) < 8:
            return False, "Password must be at least 8 characters long"
        
        if len(password) > 128:
            return False, "Password cannot be longer than 128 characters"
        
        # Check against common passwords first so 'common' takes precedence in messaging
        common_passwords = {
            'password', 'password123', '123456', '123456789', 'qwerty',
            'abc123', 'password1', 'admin', 'letmein', 'welcome',
            'monkey', '1234567890', 'dragon', 'master', 'superman',
            'password123!'
        }
        
        if password.lower() in common_passwords:
            return False, "Password is too common, please choose a different one"
        
        # Check for at least one uppercase letter
        if not re.search(r'[A-Z]', password):
            return False, "Password must contain at least one uppercase letter"
        
        # Check for at least one lowercase letter
        if not re.search(r'[a-z]', password):
            return False, "Password must contain at least one lowercase letter"
        
        # Check for at least one digit
        if not re.search(r'\d', password):
            return False, "Password must contain at least one digit"
        
        # Check for at least one special character
        if not re.search(r'[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>/?]', password):
            return False, "Password must contain at least one special character"
        
        return True, None
    
    def generate_secure_password(self, length: int = 12) -> str:
        """
        Generate a secure random password.
        
        Args:
            length: Desired length of the password (default: 12)
            
        Returns:
            A secure random password string
            
        Raises:
            PasswordServiceError: If password generation fails
        """
        if length < 8:
            raise PasswordServiceError("Generated password must be at least 8 characters")
        
        if length > 128:
            raise PasswordServiceError("Generated password cannot be longer than 128 characters")
        
        try:
            # Character sets for password generation
            uppercase = string.ascii_uppercase
            lowercase = string.ascii_lowercase
            digits = string.digits
            special = "!@#$%^&*()_+-=[]{}|;:,.<>?"
            
            # Ensure at least one character from each required set
            password_chars = [
                secrets.choice(uppercase),
                secrets.choice(lowercase), 
                secrets.choice(digits),
                secrets.choice(special)
            ]
            
            # Fill remaining length with random characters from all sets
            all_chars = uppercase + lowercase + digits + special
            for _ in range(length - 4):
                password_chars.append(secrets.choice(all_chars))
            
            # Shuffle the password characters
            secrets.SystemRandom().shuffle(password_chars)
            
            return ''.join(password_chars)
            
        except Exception as e:
            raise PasswordServiceError(f"Failed to generate password: {str(e)}", e)


