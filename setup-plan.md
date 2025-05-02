# ChatSphere Setup Guide for Windows 🚀

This guide will walk you through setting up ChatSphere on your Windows computer. Each step is explained in detail so you understand what you're doing.

## Step 1: Installing Required Tools 🛠️

Before we can run ChatSphere, we need to install several important tools:
- Git: For downloading and managing code
- Python: The programming language for our backend server and agent
- Node.js: For running our frontend application
- Docker: For creating containers that make our app work the same way on all computers (optional but recommended)
- PostgreSQL: Our database for storing messages and user information
- Redis: For temporary data storage and real-time features (optional)
- VS Code: A program that helps us write and edit code

### 1️⃣ Open PowerShell as Administrator
We need administrator rights to install software on your computer:
- Press the Windows key on your keyboard
- Type "PowerShell"
- Right-click on "Windows PowerShell"
- Click "Run as administrator"
- Click "Yes" if asked for permission

### 2️⃣ Install Chocolatey
Chocolatey is a tool that makes installing other programs easier. This command sets up Chocolatey on your computer:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

The command will run for about 2-3 minutes. When you see the PowerShell prompt again, Chocolatey is ready.

### 3️⃣ Install Required Software
This command uses Chocolatey to install all the programs we need:
```powershell
choco install git python nodejs docker-desktop postgresql redis vscode -y
```

This process takes about 10-15 minutes because it's downloading and installing several large programs.

### 4️⃣ Verify Installations
These commands check if the programs installed correctly by showing their version numbers:
```powershell
git --version
python --version
node --version
docker --version
```

Each command should display a version number (like "3.10.0" or "v18.0.0"). If you see version numbers, the installations were successful.

## Step 2: Setting Up ChatSphere 🌟

### 1️⃣ Create Project Directory
These commands create a special folder for ChatSphere and move into it:
```powershell
cd ~
mkdir Projects
cd Projects
```

The `cd ~` command goes to your home folder, then we create and enter a 'Projects' folder to keep things organized.

### 2️⃣ Download ChatSphere Code
This command downloads all the ChatSphere code from GitHub:
```powershell
git clone https://github.com/Wetende/chatsphere.git
cd ChatSphere
```

### 3️⃣ Set Up Backend Environment (Django & Agent)
These commands create a special environment and install all required packages for both the Django backend and the FastAPI agent service.
```powershell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install Django backend dependencies
cd backend
# Ensure requirements.txt has httpx added
pip install -r requirements.txt 
cd .. # Back to root

# Install FastAPI agent dependencies
cd backend\chatsphere_agent
# Ensure requirements.txt has fastapi, uvicorn, langchain-google-genai etc.
pip install -r requirements.txt
cd ..\.. # Back to root
```

### 4️⃣ Set Up PostgreSQL Admin (Optional, for manual DB management)
Follow these steps to set up PostgreSQL admin interface:
```powershell
# Install pgAdmin 4
choco install pgadmin4 -y

# Start PostgreSQL service (if running manually, Docker handles this otherwise)
net start postgresql-x64-14 

# Set up PostgreSQL password
psql -U postgres
# In the PostgreSQL prompt, type:
\password postgres
# Enter your desired password twice
# Type \q to exit
```

To access pgAdmin 4:
1. Open pgAdmin from Start Menu
2. First time setup:
   - Enter a master password you'll remember
   - Click 'Add New Server'
   - In General tab: Name it 'LocalDB'
   - In Connection tab:
     - Host: localhost
     - Port: 5432
     - Username: postgres
     - Password: [the one you set above]

### 5️⃣ Configure Database (if running manually)
If you are *not* using Docker, you'll need to create the database. Docker Compose handles this automatically.
```powershell
# Create database (only if NOT using Docker)
createdb -U postgres chatsphere 

# Apply Django migrations (activate backend venv first if needed)
cd backend
# .\..\venv\Scripts\activate # Activate venv if not already active
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
cd ..
```

### 6️⃣ Set Up Frontend (Vue.js)
```powershell
# Install Vue CLI globally (if not already installed)
# npm install -g @vue/cli 

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install additional required packages (if needed, check package.json)
# npm install axios vuex vue-router @mdi/font @vue/composition-api 
```

### 7️⃣ Configure Environment Variables
Copy the `.env.example` file in the project root to `.env` and fill in your details:
```powershell
# From the project root directory
Copy-Item .env.example .env 
```
Edit the `.env` file with a text editor (like VS Code) and ensure these are set:
```plaintext
# General
DEBUG=True
SECRET_KEY=generate_a_strong_secret_key_here

# Database (Adjust if running DB manually/differently)
DATABASE_URL=postgres://user:password@db:5432/chatsphere # 'db' is the service name in docker-compose

# Django Server
ALLOWED_HOSTS=localhost,127.0.0.1,backend # Add 'backend' for Docker networking
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://frontend:3000 # Add frontend service name

# Agent Service
AGENT_SERVICE_URL=http://agent:8001 # 'agent' is the service name in docker-compose

# API Keys
GOOGLE_API_KEY=your_google_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_pinecone_environment_here
PINECONE_INDEX_NAME=your_pinecone_index_name_here
```

### 8️⃣ Review AI Integration Code (`backend/chatsphere_agent/`)
The core AI logic is now in the `backend/chatsphere_agent/` directory, likely using files like `main.py`, `agent.py`, `vector_store.py`, `config.py`. Ensure these files correctly:
- Load API keys and settings from the `.env` file using `python-dotenv`.
- Initialize the Google Generative AI client (`ChatGoogleGenerativeAI`) for the LLM.
- Initialize the Google Generative AI Embeddings client.
- Initialize the Pinecone client and connect to your index.
- Set up LangChain components (vector store retriever, agent executor) using Gemini and Pinecone.
- Expose the functionality via FastAPI endpoints in `main.py`.

Example structure (refer to `restructuring.md` for more details):
```python
# backend/chatsphere_agent/config.py (Example snippet)
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
# ... other settings

# backend/chatsphere_agent/agent.py (Example snippet)
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
# ... other imports

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=config.GOOGLE_API_KEY)
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=config.GOOGLE_API_KEY) 
# Note: Ensure Pinecone index dimension matches embedding dimension (e.g., 768 for embedding-001)

# ... vector store setup using Pinecone and embeddings ...
# ... agent setup using llm and retriever ...

# backend/chatsphere_agent/main.py (Example snippet)
# ... FastAPI setup ...
# Endpoints call functions using the configured llm, embeddings, vector store, agent ...
```

### 9️⃣ Start Services

**Using Docker (Recommended):**
```powershell
# From the project root directory
docker-compose up -d --build 
```

**Manually (Requires 3 separate PowerShell windows):**

Window 1 (Backend - Django):
```powershell
cd ~\Projects\ChatSphere\backend
# .\..\venv\Scripts\activate # Activate venv if not already active
python manage.py runserver 0.0.0.0:8000 
```

Window 2 (Agent - FastAPI):
```powershell
cd ~\Projects\ChatSphere\backend\chatsphere_agent
# .\..\venv\Scripts\activate # Activate venv if not already active
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

Window 3 (Frontend - Vue):
```powershell
cd ~\Projects\ChatSphere\frontend
npm run serve 
```

## Accessing ChatSphere
1. Frontend App: http://localhost:3000 (or the port shown by `npm run serve`)
2. Backend Admin: http://localhost:8000/admin
3. Agent API Docs: http://localhost:8001/docs
4. pgAdmin (if installed): http://localhost/pgadmin4

## Additional Setup Steps

### Initialize Pinecone Index
You need to create your index manually in the Pinecone console ([https://app.pinecone.io/](https://app.pinecone.io/)) before running the application.
- Create an index with the name specified in your `.env` file (`PINECONE_INDEX_NAME`).
- **Crucially**, set the **dimension** of the index to match the output dimension of the Google embedding model you are using (e.g., `768` for `models/embedding-001`).
- Choose an appropriate metric (e.g., `cosine`).

## Troubleshooting

### Common Issues
- **API Key Errors**: Double-check `GOOGLE_API_KEY`, `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT` in your `.env` file.
- **Connection Errors (Django <-> Agent)**: Ensure `AGENT_SERVICE_URL` is correct and both services are running and accessible to each other (check Docker networking if applicable). Check logs for `httpx` errors.
- **Pinecone Errors**: Verify index name, environment, and dimension match between your code/`.env` file and the Pinecone console. Check agent logs.
- **Embedding Dimension Mismatch**: Ensure the Pinecone index dimension matches the Google embedding model's output dimension (e.g., 768).
- **Port Conflicts**: Make sure ports 3000, 8000, 8001, 5432 (if running Postgres manually) are not already in use.
- **Dependency Issues**: Ensure you have run `pip install -r requirements.txt` in both `backend` and `backend/chatsphere_agent`, and `npm install` in `frontend`.

### Checking Logs
- **Docker**: `docker-compose logs -f <service_name>` (e.g., `backend`, `agent`, `frontend`, `db`)
- **Manual**: Check the console output in each PowerShell window where a service is running.

## Stopping ChatSphere 🛑
To stop the servers:
1. Press Ctrl+C in each PowerShell window (this stops the servers)
2. Close the PowerShell windows (this exits the command line)

The servers must be stopped properly to avoid port conflicts when starting ChatSphere again.

## Additional Troubleshooting

### PostgreSQL Issues:
- Error 'password authentication failed': Reset password using psql command
- Database connection failed: Check if service is running using `services.msc`
- Port 5432 in use: Check for other PostgreSQL instances

### AI Integration Issues:
- OpenAI API errors: Verify API key and request format
- Pinecone connection issues: Check API key and environment
- Embedding errors: Ensure text input is properly formatted

### Frontend Build Issues:
- Node modules errors: Delete node_modules folder and run `npm install` again
- Vue CLI errors: Update Vue CLI using `npm update -g @vue/cli`

Remember to keep your API keys secure and never commit them to version control. 