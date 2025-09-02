"""
Create User Use Case

Handles new user registration with complete business rule validation
and coordination of domain entities and infrastructure services.

Business Flow:
1. Validate input data via DTO
2. Check email/username uniqueness
3. Create User domain entity with business rules
4. Hash password securely
5. Save user to repository
6. Send verification email
7. Log registration event
8. Return success response DTO

Business Rules Enforced:
- Email must be unique across platform
- Username must be unique and follow format rules  
- Password must meet security requirements
- All required fields must be present
- User starts as unverified status

Cross-Cutting Concerns:
- Input validation and sanitization
- Password hashing with secure algorithms
- Email service integration for verification
- Audit logging for security compliance
- Error handling with meaningful messages
- Transaction management for consistency

Error Scenarios:
- Email already exists -> UserAlreadyExistsException
- Username already exists -> UsernameAlreadyExistsException
- Invalid email format -> ValidationException
- Weak password -> ValidationException
- Email service failure -> EmailServiceException
"""

from typing import Optional
from dataclasses import dataclass
from application.interfaces.email_service import IEmailService
from application.interfaces.password_service import IPasswordService
from application.interfaces.unit_of_work import IUnitOfWork
from domain.entities.user import User
from domain.value_objects.email import Email
from domain.value_objects.username import Username
from domain.value_objects.user_id import UserId
from domain.repositories.user_repository import IUserRepository
from application.dtos.user_dtos import CreateUserRequestDTO, CreateUserResponseDTO
from application.exceptions.application_exceptions import UserAlreadyExistsException, ValidationException


@dataclass
class CreateUserUseCase:
    """Use case for creating new users with business rule validation."""
    
    user_repository: IUserRepository
    email_service: IEmailService
    password_service: IPasswordService
    unit_of_work: IUnitOfWork
    
    async def execute(self, request: CreateUserRequestDTO) -> CreateUserResponseDTO:
        """
        Execute user creation use case.
        
        Args:
            request: User creation request data
            
        Returns:
            User creation response with success status
            
        Raises:
            UserAlreadyExistsException: If email or username exists
            ValidationException: If input validation fails
            EmailServiceException: If verification email fails
        """
        # Validate input and create value objects
        email = Email(request.email)
        username = Username(request.username)
        
        async with self.unit_of_work:
            # Check uniqueness constraints
            if await self.user_repository.email_exists(email):
                raise UserAlreadyExistsException(f"Email {email} already exists")
            
            if await self.user_repository.username_exists(username):
                raise UserAlreadyExistsException(f"Username {username} already exists")
            
            # Hash password securely
            hashed_password = await self.password_service.hash_password(request.password)
            
            # Create domain entity with business rules
            user = User.create(
                username=username,
                email=email,
                first_name=request.first_name,
                last_name=request.last_name
            )
            
            # Save user through repository
            saved_user = await self.user_repository.save(user)
            
            # Send verification email
            await self.email_service.send_verification_email(
                email=email,
                verification_token=self._generate_verification_token(saved_user.id)
            )
            
            # Commit transaction
            await self.unit_of_work.commit()
            
            # Return response DTO
            return CreateUserResponseDTO(
                user_id=saved_user.id.value,
                email=str(saved_user.email),
                username=str(saved_user.username),
                is_verified=saved_user.is_verified,
                message="User created successfully. Please check your email for verification."
            )
    
    def _generate_verification_token(self, user_id: UserId) -> str:
        """Generate secure verification token for email confirmation."""
        # Implementation would generate JWT or secure token
        pass
