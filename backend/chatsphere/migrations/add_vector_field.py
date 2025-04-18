from django.db import migrations

class Migration(migrations.Migration):
    """
    Migration to add vector field to Chunk model using pgvector extension.
    """
    
    dependencies = [
        ('chatsphere', '0001_initial'),
    ]
    
    operations = [
        # Enable pgvector extension if not already enabled
        migrations.RunSQL(
            "CREATE EXTENSION IF NOT EXISTS vector;",
            "DROP EXTENSION IF EXISTS vector;"
        ),
        
        # Add vector column to chunks table
        migrations.RunSQL(
            "ALTER TABLE chatsphere_chunk ADD COLUMN IF NOT EXISTS embedding vector(1536);",
            "ALTER TABLE chatsphere_chunk DROP COLUMN IF EXISTS embedding;"
        ),
        
        # Create index for similarity search (using HNSW index for better performance)
        migrations.RunSQL(
            """
            CREATE INDEX IF NOT EXISTS chunks_embedding_idx 
            ON chatsphere_chunk 
            USING hnsw (embedding vector_cosine_ops)
            WITH (m = 16, ef_construction = 64);
            """,
            "DROP INDEX IF EXISTS chunks_embedding_idx;"
        )
    ] 