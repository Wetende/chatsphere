# ChatSphere 🌐

A modern real-time chat application with AI integration, built with Django and Vue.js.

## Features 🚀

- Real-time messaging using WebSocket
- AI-powered chat assistance using LangChain and OpenAI
- Vector search capabilities with Pinecone
- User authentication and authorization
- Message history and search
- File sharing capabilities
- Responsive design

## Tech Stack 💻

### Backend
- Django 4.2+
- Django REST Framework
- Channels for WebSocket
- PostgreSQL
- Redis
- LangChain & OpenAI for AI features
- Pinecone for vector search

### Frontend
- Vue.js
- Vuex for state management
- Vue Router
- Axios for HTTP requests
- Socket.io for real-time communication

## Getting Started 🏁

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- Redis
- OpenAI API key
- Pinecone API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Wetende/chatsphere.git
cd ChatSphere
```

2. Set up backend:
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
```

3. Set up frontend:
```bash
cd ../frontend
npm install
```

4. Configure environment variables:
- Copy `.env.example` to `.env` in both backend and frontend directories
- Update the variables with your configuration

5. Run migrations:
```bash
cd ../backend
python manage.py migrate
```

6. Start the development servers:
```bash
# Terminal 1 (Backend)
python manage.py runserver

# Terminal 2 (Frontend)
cd ../frontend
npm run serve
```

Visit http://localhost:3000 to see the application running.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- OpenAI for GPT integration
- Pinecone for vector search capabilities
- All contributors who help improve the project 