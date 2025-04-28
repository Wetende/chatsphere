from pinecone import Pinecone
import time
import uuid
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from config import get_google_api_key, get_pinecone_api_key

# --- Constants ---
# Replace with your actual Pinecone index name
# You need to create this index in your Pinecone account first.
# Choose dimensions appropriate for the embedding model (e.g., 768 for Google's default embedding-001)
# Choose metric='cosine' or 'dotproduct' based on the embedding model recommendation
PINECONE_INDEX_NAME = "chatsphere-context"
EMBEDDING_MODEL_NAME = "models/embedding-001"

# --- Globals ---
_pinecone_client = None
_pinecone_index_instance = None
_embedding_model = None

def _get_embedding_model():
    """Initializes and returns the embedding model singleton."""
    global _embedding_model
    if _embedding_model is None:
        try:
            google_api_key = get_google_api_key()
            _embedding_model = GoogleGenerativeAIEmbeddings(
                model=EMBEDDING_MODEL_NAME,
                google_api_key=google_api_key
            )
            print(f"Initialized embedding model: {EMBEDDING_MODEL_NAME}")
        except ValueError as e:
            print(f"Error initializing embedding model: {e}")
            raise
        except Exception as e:
            print(f"An unexpected error occurred initializing embedding model: {e}")
            raise
    return _embedding_model

def _initialize_pinecone_client():
    """Initializes the Pinecone client singleton."""
    global _pinecone_client
    if _pinecone_client is None:
        try:
            api_key = get_pinecone_api_key()
            _pinecone_client = Pinecone(api_key=api_key)
            print(f"Pinecone client initialized.")
            return True
        except ValueError as e:
            print(f"Error initializing Pinecone client (check API key in .env): {e}")
        except Exception as e:
            print(f"An unexpected error occurred initializing Pinecone client: {e}")
        return False
    return True

def get_pinecone_index():
    """Gets the Pinecone index instance, initializing client and connecting to index if necessary."""
    global _pinecone_index_instance

    if _pinecone_index_instance:
        return _pinecone_index_instance

    if not _initialize_pinecone_client():
        print("Failed to initialize Pinecone client.")
        return None

    try:
        # Correct way to get the list of index names
        index_info_list = _pinecone_client.list_indexes()
        existing_index_names = [index_info['name'] for index_info in index_info_list] # Extract names

        if PINECONE_INDEX_NAME not in existing_index_names:
            print(f"Error: Pinecone index '{PINECONE_INDEX_NAME}' not found.")
            print(f"Available indexes: {existing_index_names}")
            print("Please ensure the index exists in your Pinecone project.")
            return None
    except Exception as e:
        print(f"Error listing Pinecone indexes: {e}")
        return None

    # Connect to the specific index
    try:
        _pinecone_index_instance = _pinecone_client.Index(PINECONE_INDEX_NAME)
        print(f"Connected to Pinecone index: {PINECONE_INDEX_NAME}")
        return _pinecone_index_instance
    except Exception as e:
        print(f"Error connecting to Pinecone index '{PINECONE_INDEX_NAME}': {e}")
        _pinecone_index_instance = None
        return None

def add_conversation_turn(text: str, role: str, session_id: str = "default_session"):
    """Embeds and adds a single conversation turn to the Pinecone index."""
    index_instance = get_pinecone_index()
    embed_model = _get_embedding_model()
    if not index_instance or not embed_model:
        print("Pinecone index instance or embedding model not available. Skipping add.")
        return

    try:
        vector = embed_model.embed_query(text)
        doc_id = str(uuid.uuid4())
        metadata = {
            "role": role,
            "text": text,
            "session_id": session_id,
            "timestamp": time.time()
        }

        index_instance.upsert([(doc_id, vector, metadata)])
        print(f"Added {role} turn to Pinecone (ID: {doc_id})")

    except Exception as e:
        print(f"Error embedding or upserting to Pinecone: {e}")

def retrieve_relevant_context(query: str, session_id: str = "default_session", top_k: int = 3):
    """Retrieves the most relevant conversation turns from Pinecone."""
    index_instance = get_pinecone_index()
    embed_model = _get_embedding_model()
    if not index_instance or not embed_model:
        print("Pinecone index instance or embedding model not available. Cannot retrieve.")
        return []

    try:
        query_vector = embed_model.embed_query(query)

        results = index_instance.query(
            vector=query_vector,
            top_k=top_k,
            include_metadata=True
        )

        context = []
        if results.matches:
            for match in results.matches:
                if 'metadata' in match and 'text' in match.metadata:
                    context.append(match.metadata['text'])
                    print(f"Retrieved context (Score: {match.score:.4f}): {match.metadata['text'][:80]}...")
                else:
                     print(f"Retrieved match without text metadata: {match.id}")

        return context

    except Exception as e:
        print(f"Error retrieving from Pinecone: {e}")
        return []

# --- Example Usage (for testing) ---
if __name__ == "__main__":
    print("Testing Pinecone Integration...")
    # Ensure you have set your .env variables correctly

    # Test initialization (will test client and index connection)
    test_index_instance = get_pinecone_index()
    if not test_index_instance:
        print("Failed to initialize Pinecone index instance. Exiting test.")
    else:
        try:
            print(f"Index stats: {test_index_instance.describe_index_stats()}")
        except Exception as e:
            print(f"Could not get index stats: {e}")

        # Test Adding Data
        print("\nTesting adding data...")
        add_conversation_turn("Hello there!", "user", session_id="test_session")
        time.sleep(1) # Pinecone index might take a moment to update
        add_conversation_turn("General Kenobi! You are a bold one.", "agent", session_id="test_session")
        time.sleep(1)

        # Test Retrieval
        print("\nTesting retrieval...")
        query = "Who is bold?"
        retrieved = retrieve_relevant_context(query, session_id="test_session")
        print(f"\nRetrieved context for '{query}':")
        for item in retrieved:
            print(f"- {item}")

        query2 = "Greetings program"
        retrieved2 = retrieve_relevant_context(query2, session_id="test_session")
        print(f"\nRetrieved context for '{query2}':")
        for item in retrieved2:
            print(f"- {item}") 