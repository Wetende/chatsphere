# ChatSphere Setup Guide for Windows 🚀

This guide will walk you through setting up ChatSphere on your Windows computer. Each step is explained in detail so you understand what you're doing.

## Step 1: Installing Required Tools 🛠️

Before we can run ChatSphere, we need to install several important tools:
- Git: For downloading and managing code
- Python: The programming language for our backend server
- Node.js: For running our frontend application
- Docker: For creating containers that make our app work the same way on all computers
- PostgreSQL: Our database for storing messages and user information
- Redis: For temporary data storage and real-time features
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

### 3️⃣ Set Up Backend Server (Django)
These commands create a special environment for Django and install all required packages:
```powershell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install Django and other backend dependencies
cd backend
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install python-dotenv
pip install psycopg2
pip install channels
pip install daphne
pip install -r requirements/local.txt

# Install AI-related packages
pip install langchain
pip install pinecone-client
pip install openai
pip install python-dotenv
```

### 4️⃣ Set Up PostgreSQL Admin
Follow these steps to set up PostgreSQL admin interface:
```powershell
# Install pgAdmin 4
choco install pgadmin4 -y

# Start PostgreSQL service
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

### 5️⃣ Configure Database
```powershell
# Create database
createdb -U postgres chatsphere

# Apply Django migrations
cd ~\Projects\ChatSphere\backend
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 6️⃣ Set Up Frontend (Vue.js)
```powershell
# Install Vue CLI globally
npm install -g @vue/cli

# Navigate to frontend directory
cd ~\Projects\ChatSphere\frontend

# Install dependencies
npm install

# Install additional required packages
npm install axios
npm install vuex
npm install vue-router
npm install @mdi/font
npm install @vue/composition-api
```

### 7️⃣ Configure Environment Variables
Create `.env` files for both backend and frontend:

Backend `.env` (create in backend folder):
```plaintext
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgres://postgres:your-password@localhost:5432/chatsphere
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGIN_WHITELIST=http://localhost:3000

# AI Configuration
OPENAI_API_KEY=your-openai-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=your-index-name
```

Frontend `.env` (create in frontend folder):
```plaintext
VUE_APP_API_URL=http://localhost:8000
VUE_APP_WS_URL=ws://localhost:8000
```

### 8️⃣ Set Up AI Integration
Create a new file `backend/ai_config.py`:
```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
import pinecone
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Pinecone
pinecone.init(
    api_key=os.getenv('PINECONE_API_KEY'),
    environment=os.getenv('PINECONE_ENVIRONMENT')
)

# Initialize OpenAI
embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))
chat = ChatOpenAI(openai_api_key=os.getenv('OPENAI_API_KEY'))

# Set up vector store
index_name = os.getenv('PINECONE_INDEX_NAME')
vectorstore = Pinecone.from_existing_index(index_name, embeddings)

# Create retrieval chain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=chat,
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)
```

### 9️⃣ Start Services
In first PowerShell window (Backend):
```powershell
cd ~\Projects\ChatSphere\backend
.\venv\Scripts\activate
python manage.py runserver
```

In second PowerShell window (Frontend):
```powershell
cd ~\Projects\ChatSphere\frontend
npm run serve
```

## Accessing ChatSphere
1. Backend Admin: http://localhost:8000/admin
2. Frontend App: http://localhost:3000
3. pgAdmin: http://localhost/pgadmin4

## Additional Setup Steps

### Initialize Pinecone Index
Run these commands in the Python shell:
```powershell
cd ~\Projects\ChatSphere\backend
python manage.py shell
```

Then in the Python shell:
```python
import pinecone
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Pinecone
pinecone.init(
    api_key=os.getenv('PINECONE_API_KEY'),
    environment=os.getenv('PINECONE_ENVIRONMENT')
)

# Create index if it doesn't exist
if os.getenv('PINECONE_INDEX_NAME') not in pinecone.list_indexes():
    pinecone.create_index(
        name=os.getenv('PINECONE_INDEX_NAME'),
        dimension=1536,  # OpenAI embeddings dimension
        metric='cosine'
    )
```

## Troubleshooting Guide 🔧

### Command Errors:
- Directory Error: Make sure you're in the correct folder (use `pwd` to check your location)
- Permission Error: Run PowerShell as Administrator
- Copy/Paste Error: Make sure to copy the entire command, including any hidden characters

### Common Issues:
- Database Connection Error: Make sure PostgreSQL is running (check Services in Task Manager)
- Docker Error: Ensure Docker Desktop is running (look for whale icon in taskbar)
- Port Already in Use: Check if another program is using ports 3000 or 8000

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