-- ChatSphere Database Initialization Script
-- This script sets up the basic database structure and extensions

-- Create database if it doesn't exist
-- Note: This should be run as postgres superuser

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- Create initial schema
CREATE SCHEMA IF NOT EXISTS chatsphere;

-- Grant permissions
GRANT ALL PRIVILEGES ON SCHEMA chatsphere TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA chatsphere TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA chatsphere TO postgres; 