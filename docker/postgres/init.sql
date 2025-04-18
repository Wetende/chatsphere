-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the database if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'chatsphere') THEN
        CREATE DATABASE chatsphere;
    END IF;
END
$$; 