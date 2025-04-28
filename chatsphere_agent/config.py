import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_google_api_key():
    """Gets the Google AI API key from environment variables."""
    api_key = os.getenv("GOOGLE_API_KEY")
    # Reverted to simpler check: ensure key exists and is not the initial placeholder
    if not api_key or api_key == 'YOUR_GOOGLE_API_KEY_HERE':
        raise ValueError("GOOGLE_API_KEY not found or not set in environment variables. Please set it in your .env file.")
    return api_key

def get_pinecone_api_key():
    """Gets the Pinecone API key from environment variables."""
    api_key = os.getenv("PINECONE_API_KEY")
    if not api_key or api_key == 'YOUR_PINECONE_API_KEY_HERE':
        raise ValueError("PINECONE_API_KEY not found or not set in environment variables. Please set it in your .env file.")
    return api_key

def get_database_uri():
    """Constructs the PostgreSQL connection URI from environment variables."""
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_PORT", "5432")
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    dbname = os.getenv("DB_NAME")

    if not user or user == 'your_db_user':
        raise ValueError("DB_USER not found or not set. Please set PostgreSQL credentials in .env")
    if not password or password == 'your_db_password':
        raise ValueError("DB_PASSWORD not found or not set. Please set PostgreSQL credentials in .env")
    if not dbname or dbname == 'your_db_name':
        raise ValueError("DB_NAME not found or not set. Please set PostgreSQL credentials in .env")

    # Format: postgresql+psycopg2://user:password@host:port/dbname
    uri = f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}"
    return uri

# Removed get_pinecone_environment as it's not used by Pinecone client init 