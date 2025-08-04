# Sub-PRD: Frontend Phase 2 - Bot Creation Flow

## Overview
This Sub-PRD outlines the chatbot creation wizard and training interface for ChatSphere frontend, providing users with an intuitive flow to create and configure their chatbots.

## User Stories
- **As a user**, I want a guided bot creation wizard so that I can easily set up my chatbot
- **As a user**, I want to configure my bot's personality and behavior so that it matches my needs
- **As a user**, I want to upload training documents so that my bot can learn from my content
- **As a user**, I want to see training progress in real-time so that I know when my bot is ready
- **As a user**, I want to test my bot before deployment so that I can ensure it works correctly
- **As a user**, I want to customize my chat widget so that it matches my brand
- **As a user**, I want to preview my widget so that I can see how it will look on my website

## Functional Requirements
- Create **bot creation wizard** with step-by-step flow
- Build **bot configuration interface** for model settings and personality
- Implement **document upload system** with drag-and-drop functionality
- Develop **training progress visualization** with real-time updates
- Create **bot testing interface** for conversation testing
- Build **basic widget customization** for appearance and behavior

## Acceptance Criteria
- Wizard guides user through bot creation in 4 clear steps
- Bot configuration allows setting name, description, model type, and temperature
- Document upload supports TXT, PDF, DOCX files up to 10MB
- Progress bar shows training status with percentage completion
- Testing interface allows real-time conversation with the bot
- Widget customization includes colors, position, and welcome message
- Live preview shows widget appearance changes in real-time
- All forms have proper validation and error handling
- Navigation between wizard steps works smoothly

## Technical Specifications
- **Wizard Components**: Multi-step form with progress indicator
- **File Upload**: Drag-and-drop with file validation and progress
- **Real-time Updates**: WebSocket connection for training progress
- **Form Management**: React Hook Form with complex validation schemas
- **State Management**: Redux slices for bot creation and training state
- **Preview System**: Iframe or modal for widget preview
- **API Integration**: RTK Query mutations for bot creation and updates
- **Testing Interface**: WebSocket chat implementation

## AI Coding Prompt
Build bot creation wizard using multi-step form pattern with React Hook Form. Implement file upload with drag-and-drop using react-dropzone. Create real-time progress tracking with WebSocket connection. Build chat testing interface with streaming responses. Implement widget customization with live preview. Use Redux Toolkit for state management across wizard steps.