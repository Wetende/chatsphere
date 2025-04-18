-- Initialize pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Verify the extension is available
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'vector'
    ) THEN
        RAISE NOTICE 'pgvector extension is successfully enabled.';
    ELSE
        RAISE EXCEPTION 'Failed to enable pgvector extension!';
    END IF;
END
$$; 