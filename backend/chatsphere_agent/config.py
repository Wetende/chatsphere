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

# --- Ingestion Settings ---

class Settings:
    """Loads settings from environment variables with defaults."""
    # API Keys
    GOOGLE_API_KEY: str = get_google_api_key()
    PINECONE_API_KEY: str = get_pinecone_api_key()

    # Database
    DATABASE_URI: str = get_database_uri()

    # Vector Store (Pinecone)
    PINECONE_ENVIRONMENT: str = os.getenv("PINECONE_ENVIRONMENT")
    PINECONE_INDEX_NAME: str = os.getenv("PINECONE_INDEX_NAME")

    # Embeddings
    EMBEDDING_MODEL_NAME: str = os.getenv("EMBEDDING_MODEL_NAME", "models/embedding-001")

    # Generative Model
    GENERATIVE_MODEL_NAME: str = os.getenv("GENERATIVE_MODEL_NAME", "gemini-1.5-flash")

    # Retriever Settings
    RETRIEVER_SEARCH_K: int = int(os.getenv("RETRIEVER_SEARCH_K", 5))

    # Ingestion Parameters
    INGESTION_CHUNK_SIZE: int = int(os.getenv("INGESTION_CHUNK_SIZE", 1000))
    INGESTION_CHUNK_OVERLAP: int = int(os.getenv("INGESTION_CHUNK_OVERLAP", 150))

    def __init__(self):
        """Validate critical settings after loading."""
        if not self.PINECONE_ENVIRONMENT:
            raise ValueError("PINECONE_ENVIRONMENT not found or not set in environment variables.")
        if not self.PINECONE_INDEX_NAME:
            raise ValueError("PINECONE_INDEX_NAME not found or not set in environment variables.")
        # Add any other critical validation checks here

# Create a single instance of settings to be imported elsewhere
settings = Settings() 