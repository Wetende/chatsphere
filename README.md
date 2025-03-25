# ChatSphere

A comprehensive AI-powered chatbot platform that enables users to create, deploy, and manage intelligent chatbots without writing code.

## Features

- **Custom Chatbot Creation**: Build chatbots trained on your specific data
- **Multiple Data Sources**: Upload various document types including PDFs, Word docs, text files, and websites
- **Advanced AI Models**: Powered by cutting-edge language models for natural conversations
- **User Authentication**: Secure login and user management system
- **Conversation Management**: Save, review, and analyze chat conversations
- **Analytics Dashboard**: Track chatbot performance and user engagement
- **API Integration**: Connect your chatbots with external platforms
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Vue.js 3 with Vue Router and Pinia state management
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **AI Integration**: LangChain, OpenAI, and custom AI services
- **Authentication**: JWT-based auth system
- **Containerization**: Docker and Docker Compose

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized setup)
- Git

### Installation

#### Clone the Repository

```bash
# PowerShell
git clone https://github.com/Wetende/chatsphere.git
cd chatsphere
```

#### Backend Setup

```bash
# PowerShell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Run migrations
cd ..
python manage.py migrate

# Start Django server
python manage.py runserver
```

#### Frontend Setup

```bash
# PowerShell
# In a new terminal window, from the project root
cd frontend

# Install dependencies
npm install

# Start development server
npm run serve
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/chatsphere
OPENAI_API_KEY=your_openai_api_key

# Optional settings
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:8080
```

### Docker Setup (Alternative)

```bash
# PowerShell
# Build and start all services
docker compose up -d

# Check running containers
docker ps

# View logs
docker compose logs -f
```

## Development

After setup, you can access:
- Frontend: http://localhost:8080
- Backend API: http://localhost:8000/api/
- Admin interface: http://localhost:8000/admin/

### Testing API Connection

To verify the API connection is working:
1. Navigate to http://localhost:8080/test-api
2. You should see a success message with connection details
3. If you see an error, check that both servers are running

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for their language models
- All the open-source libraries that made this project possible 