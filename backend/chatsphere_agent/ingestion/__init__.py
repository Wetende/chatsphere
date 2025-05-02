"""Initialize the ingestion package"""

from .core import ingest_data
from .parsers import load_pdf, load_txt, scrape_web
from .chunkers import chunk_text
from .vectorization import initialize_vectorization, generate_embeddings, upload_to_pinecone 