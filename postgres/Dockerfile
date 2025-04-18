FROM postgres:14

# Install build dependencies and pgvector
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       postgresql-server-dev-14 \
       git \
       ca-certificates \
    && git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git \
    && cd pgvector \
    && make \
    && make install \
    && cd .. \
    && rm -rf pgvector \
    && apt-get remove -y build-essential postgresql-server-dev-14 git \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=chatsphere

# Add custom initialization scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/ 