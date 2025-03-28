# ChatSphere Frontend

A modern Vue.js-based frontend for the ChatSphere application, built with Vite for improved performance and developer experience.

## Project Structure

```
frontend/
├── dist/            # Built files (generated after build)
├── node_modules/    # Dependencies
├── public/          # Public assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # Reusable Vue components
│   ├── router/      # Vue Router configuration
│   ├── services/    # API services
│   ├── stores/      # Pinia stores for state management
│   ├── styles/      # Global styles and CSS variables
│   ├── views/       # Page components
│   ├── App.vue      # Root component
│   └── main.js      # Entry point
├── .env             # Environment variables
├── index.html       # HTML entry point
├── package.json     # Project metadata and dependencies
├── vite.config.js   # Vite configuration
└── ...
```

## Development Setup

### Prerequisites

- Node.js (v16+)
- npm (v8+)

### Installation

```bash
# Install dependencies
npm install
```

### Running for Development

```bash
# Start the development server
npm run dev
```

The application will be available at http://localhost:5173 or http://localhost:5174.

### Building for Production

```bash
# Build the application
npm run build
```

This will generate optimized files in the `dist` directory.

### Linting

```bash
# Lint and fix files
npm run lint
```

## Configuration

Environment variables are stored in `.env` files:

- `.env`: Default environment variables
- `.env.local`: Local overrides (not committed to source control)

## Docker Support

The frontend can be built and run using Docker:

```bash
# Build the Docker image
docker build -t chatsphere-frontend .

# Run the container
docker run -p 80:80 chatsphere-frontend
```

## API Connectivity

The frontend connects to the backend API using the service defined in `src/services/api.js`. You can test the API connection by navigating to the "Test API" page in the application.
