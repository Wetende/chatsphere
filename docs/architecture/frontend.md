# Frontend Architecture

This document provides a detailed overview of the ChatSphere frontend architecture.

## Technology Stack

- **Framework**: Vue.js 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **UI Components**: Custom components
- **CSS**: CSS Modules with SCSS
- **Build Tool**: Vue CLI

## Directory Structure

```
frontend/
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Generic UI components
│   │   ├── layout/       # Layout components
│   │   ├── bot/          # Bot-related components
│   │   └── chat/         # Chat-related components
│   ├── router/           # Vue Router configuration
│   ├── services/         # API clients and services
│   │   ├── api.js        # Axios instance and API endpoints
│   │   └── auth.js       # Authentication service
│   ├── stores/           # Pinia state management
│   │   ├── auth.js       # Authentication state
│   │   ├── bots.js       # Bots state
│   │   └── conversations.js # Conversations state
│   ├── views/            # Page components
│   │   ├── HomeView.vue  # Home page
│   │   ├── LoginView.vue # Login page
│   │   ├── BotsView.vue  # Bots listing page
│   │   └── ...           # Other pages
│   ├── App.vue           # Root component
│   └── main.js           # Application entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── babel.config.js       # Babel configuration
├── vue.config.js         # Vue CLI configuration
└── Dockerfile            # Container definition
```

## Core Components

### State Management

Pinia is used for state management with these main stores:

1. **Auth Store**: User authentication state and operations
   - Login/logout functionality
   - Current user information
   - Authentication status

2. **Bots Store**: Chatbot management
   - List of user's bots
   - Bot creation, editing, deletion
   - Bot configuration

3. **Conversations Store**: Chat conversations
   - Conversation history
   - Message sending and receiving
   - Conversation listing and filtering

### Routing

Vue Router handles navigation with these main routes:

- `/`: Home page
- `/login`: Login page
- `/bots`: Bot listing page
- `/bots/:id`: Bot detail/edit page
- `/conversations`: Conversation listing page
- `/conversations/:id`: Conversation detail/chat page

### API Integration

The frontend communicates with the backend through Axios with these main services:

- **Authentication**: Login, logout, user info
- **Bots**: Bot CRUD operations
- **Documents**: Document upload and management
- **Conversations**: Conversation history and messaging
- **Settings**: User profile and preferences

### Component Structure

The application follows a hierarchical component structure:

1. **Page Components** (`/views`): Full pages activated by routes
2. **Layout Components**: Page structure (header, sidebar, footer)
3. **Feature Components**: Feature-specific (bot editor, chat interface)
4. **Common Components**: Reusable UI elements (buttons, forms, cards)

### Authentication Flow

1. User enters credentials → 
2. Frontend sends login request → 
3. Backend validates and returns user data/token → 
4. Frontend stores authentication state → 
5. Protected routes become accessible

### Chat Interface

The chat interface is built with these components:

1. **ConversationList**: List of available conversations
2. **ConversationHeader**: Shows bot name and controls
3. **MessageList**: Displays conversation history
4. **MessageInput**: Allows user to send messages
5. **Message**: Individual message display

## Responsiveness

The frontend is designed to be responsive with:

- Mobile-first approach
- Flexbox and Grid layouts
- Responsive breakpoints
- Adaptable UI components

## Performance Optimizations

- Lazy-loaded routes for code splitting
- Optimized asset loading
- Efficient re-rendering through Vue's reactivity system
- Debounced input handling for search and text inputs
- Pagination for large datasets

## Security Considerations

- Sensitive data is never stored in localStorage
- Authentication tokens are handled securely
- Input sanitization for user-generated content
- Prevention of XSS through Vue's template escaping

## Accessibility

- Semantic HTML elements
- ARIA attributes where appropriate
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

## Testing Strategy

- Unit tests for components using Vue Test Utils
- Integration tests for key user flows
- Mock API responses for consistent testing

## Build and Deployment

- Environment-specific configurations
- Docker-based build process
- Optimized production builds

## Future Enhancements

- Implement server-side rendering for improved SEO
- Add support for offline functionality with service workers
- Enhance accessibility features
- Implement real-time updates with WebSockets 