# Use the official PostgreSQL 17 image as the base image
FROM postgres:17

# Install build dependencies and pgvector
RUN apt-get update \
    && apt-get install -y \
        build-essential \
        git \
        postgresql-server-dev-17 \
    && git clone https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make \
    && make install \
    && cd .. \
    && rm -rf pgvector \
    && apt-get remove -y \
        build-essential \
        git \
        postgresql-server-dev-17 \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment variable to enable pgvector extension
ENV POSTGRES_EXTENSIONS=vector

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=chatsphere

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/01-init.sql
COPY init-pgvector.sql /docker-entrypoint-initdb.d/02-init-pgvector.sql 