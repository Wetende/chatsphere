# ChatSphere

A comprehensive AI-powered chatbot platform that enables users to create, deploy, and manage intelligent chatbots without writing code.

## Features

- **Custom Chatbot Creation**: Build chatbots trained on your specific data
- **Multiple Data Sources**: Upload various document types including PDFs, Word docs, text files, and websites
- **Advanced AI Models**: Powered by cutting-edge language models (like Gemini) for natural conversations
- **User Authentication**: Secure login and user management system
- **Conversation Management**: Save, review, and analyze chat conversations
- **Analytics Dashboard**: Track chatbot performance and user engagement
- **API Integration**: Connect your chatbots with external platforms
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js
- **Backend**: FastAPI
- **AI Integration**: Direct Google Gemini and Pinecone API integration following agentic patterns.
- **Authentication**: JWT-based auth system
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+ and npm (for frontend, when implemented)
- Git

### Installation

#### Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Unix-like systems
# Or on Windows: venv\Scripts\activate

# Install dependencies (when requirements.txt is ready)
cd backend
pip install -r requirements.txt

# Start FastAPI server (once main.py is implemented)
uvicorn main:app --reload
```

#### Frontend Setup

The frontend folder is currently empty. When ready:

```bash
cd frontend
# Install dependencies (after setting up React.js)
npm install
# Start development server
npm start
```

### Environment Variables

Create a `.env` file in the root directory and add your keys:

```
DEBUG=True
SECRET_KEY=your_secret_key
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=your_pinecone_index_name
```

## Testing API Connection

To verify the API connection (once implemented):
1. Ensure FastAPI server is running.
2. Test endpoints via tools like curl or Postman.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google for Gemini language models
- Pinecone for vector database services
- All the open-source libraries that made this project possible 