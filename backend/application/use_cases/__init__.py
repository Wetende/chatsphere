"""
Application Use Cases

Use cases represent the application-specific business flows that orchestrate
domain entities and services to fulfill user requirements.

Key Characteristics:
- Single responsibility per use case
- Clear input/output contracts via DTOs
- Orchestrate domain entities and services
- Handle cross-cutting concerns
- Return application-specific results
- Error handling and logging

Use Case Categories:

User Management:
- CreateUserUseCase: Register new users with validation
- AuthenticateUserUseCase: Handle user login
- UpdateUserProfileUseCase: Update user information
- DeactivateUserUseCase: Safely deactivate accounts

Bot Management:
- CreateBotUseCase: Create new chatbots
- UpdateBotConfigurationUseCase: Modify bot settings
- TrainBotUseCase: Process training documents
- DeleteBotUseCase: Safely remove bots

Conversation Management:
- StartConversationUseCase: Initialize chat sessions
- SendMessageUseCase: Process incoming messages
- EndConversationUseCase: Close chat sessions
- GetConversationHistoryUseCase: Retrieve chat history

Document Management:
- UploadDocumentUseCase: Handle document uploads
- ProcessDocumentUseCase: Extract and chunk content
- EmbedDocumentUseCase: Generate vector embeddings
- DeleteDocumentUseCase: Remove training documents

Pattern:
Each use case follows the same structure:
1. Input validation via DTOs
2. Business rule enforcement
3. Domain entity orchestration
4. Result mapping to output DTOs
5. Error handling and logging
"""
