"""
Service for handling vector operations with PostgreSQL.

This service provides methods for:
1. Checking if pgvector extension is available
2. Storing embeddings
3. Performing similarity searches
"""

import logging
import psycopg2
import numpy as np
from django.db import connection, transaction
from django.conf import settings
from chatsphere.models import Chunk, Document, Bot

logger = logging.getLogger(__name__)

class VectorService:
    """Service for handling vector operations with PostgreSQL."""
    
    def __init__(self):
        """Initialize the vector service."""
        self.vector_dimension = 1536  # Default for text-embedding-ada-002
    
    def check_pgvector_available(self):
        """
        Check if pgvector extension is available in the current PostgreSQL instance.
        
        Returns:
            bool: True if available, False otherwise.
        """
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM pg_extension WHERE extname = 'vector'")
                result = cursor.fetchone()[0]
                return result > 0
        except Exception as e:
            logger.error(f"Error checking pgvector availability: {str(e)}")
            return False
    
    def store_embedding(self, chunk_id, embedding):
        """
        Store an embedding vector for a specific chunk.
        
        Args:
            chunk_id (int): The ID of the chunk.
            embedding (list): The embedding vector.
            
        Returns:
            bool: True if successful, False otherwise.
        """
        if not embedding or not isinstance(embedding, list):
            logger.error(f"Invalid embedding format for chunk {chunk_id}")
            return False
            
        if len(embedding) != self.vector_dimension:
            logger.error(f"Embedding dimension mismatch for chunk {chunk_id}. "
                        f"Expected {self.vector_dimension}, got {len(embedding)}")
            return False
            
        try:
            with transaction.atomic():
                chunk = Chunk.objects.get(id=chunk_id)
                
                # Convert embedding to a format suitable for PostgreSQL
                embedding_str = self._format_vector_for_postgres(embedding)
                
                # Update the embedding using a raw SQL query
                with connection.cursor() as cursor:
                    cursor.execute(
                        "UPDATE chatsphere_chunk SET embedding = %s WHERE id = %s",
                        [embedding_str, chunk_id]
                    )
                    
                return True
        except Chunk.DoesNotExist:
            logger.error(f"Chunk with ID {chunk_id} does not exist")
            return False
        except Exception as e:
            logger.error(f"Error storing embedding for chunk {chunk_id}: {str(e)}")
            return False
    
    def search_similar_chunks(self, query_embedding, bot_id=None, limit=5, threshold=0.7):
        """
        Search for chunks similar to the query embedding.
        
        Args:
            query_embedding (list): The query embedding vector.
            bot_id (int, optional): The ID of the bot to search within. If None, search all.
            limit (int, optional): Maximum number of results to return. Defaults to 5.
            threshold (float, optional): Similarity threshold (0-1). Defaults to 0.7.
            
        Returns:
            list: List of dictionaries containing chunk data and similarity scores.
        """
        if not query_embedding or not isinstance(query_embedding, list):
            logger.error("Invalid query embedding format")
            return []
            
        if len(query_embedding) != self.vector_dimension:
            logger.error(f"Query embedding dimension mismatch. "
                        f"Expected {self.vector_dimension}, got {len(query_embedding)}")
            return []
            
        try:
            # Format the query vector for PostgreSQL
            query_vector = self._format_vector_for_postgres(query_embedding)
            
            # Build the SQL query based on whether bot_id is provided
            sql_query = """
                SELECT c.id, c.content, c.metadata, d.title, 
                       1 - (c.embedding <=> %s) as similarity
                FROM chatsphere_chunk c
                JOIN chatsphere_document d ON c.document_id = d.id
            """
            
            params = [query_vector]
            
            if bot_id:
                sql_query += " JOIN chatsphere_document_bots db ON d.id = db.document_id WHERE db.bot_id = %s"
                params.append(bot_id)
                
            sql_query += f" AND (c.embedding <=> %s) <= (1 - {threshold})"
            params.append(query_vector)
            
            sql_query += " ORDER BY similarity DESC LIMIT %s"
            params.append(limit)
            
            results = []
            with connection.cursor() as cursor:
                cursor.execute(sql_query, params)
                columns = [col[0] for col in cursor.description]
                for row in cursor.fetchall():
                    results.append(dict(zip(columns, row)))
                    
            return results
            
        except Exception as e:
            logger.error(f"Error searching for similar chunks: {str(e)}")
            return []
    
    def _format_vector_for_postgres(self, vector):
        """
        Format a vector for PostgreSQL.
        
        Args:
            vector (list): The vector to format.
            
        Returns:
            str: Formatted vector string.
        """
        return f"[{','.join(str(x) for x in vector)}]"

    def delete_embeddings(self, chunk_ids):
        """
        Delete embeddings for specified chunks.
        
        Args:
            chunk_ids: List of chunk UUIDs to delete embeddings for
            
        Returns:
            Boolean indicating success or failure
        """
        if not self.is_available:
            logger.error("Cannot delete embeddings: pgvector extension not available")
            return False
            
        if not chunk_ids:
            return True
            
        try:
            # Convert UUIDs to strings
            chunk_id_strings = [str(chunk_id) for chunk_id in chunk_ids]
            placeholders = ', '.join(['%s'] * len(chunk_id_strings))
            
            with connection.cursor() as cursor:
                cursor.execute(
                    f"UPDATE chatsphere_chunk SET embedding = NULL WHERE id IN ({placeholders})",
                    chunk_id_strings
                )
            return True
        except Exception as e:
            logger.error(f"Error deleting embeddings: {str(e)}")
            return False 