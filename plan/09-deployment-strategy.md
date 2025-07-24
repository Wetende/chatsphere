# ChatSphere Deployment Strategy

This document outlines the deployment strategy for the ChatSphere platform, starting with a Docker-based approach for initial deployment, with a clear path to Kubernetes when scale demands it.

## Infrastructure Architecture

```
infrastructure/
├── docker/              # Docker configurations
│   ├── docker-compose.yml     # Main compose file
│   ├── docker-compose.prod.yml  # Production overrides
│   ├── backend/         # Backend service
│   ├── frontend/        # Frontend application
│   └── ai/             # AI services
├── nginx/              # Nginx configurations
├── scripts/            # Deployment and maintenance scripts
└── monitoring/         # Monitoring configurations
```

## Initial Deployment Strategy (Docker)

### 1. Docker Compose Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY}
    depends_on:
      - db
      - redis
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      - REACT_APP_API_URL=http://backend:8000
    depends_on:
      - backend
    restart: unless-stopped

  db:
    image: postgres:13-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    restart: unless-stopped

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### 2. Production Configuration

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  backend:
    environment:
      - ENVIRONMENT=production
      - DEBUG=0
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G

  frontend:
    environment:
      - NODE_ENV=production
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

  db:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

### 3. Nginx Configuration

```nginx
# nginx/conf.d/default.conf
upstream backend {
    server backend:8000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name chatsphere.com;

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Deployment Scripts

### 1. Setup Script

```bash
#!/bin/bash
# scripts/setup.sh

# Generate secure passwords
DB_PASSWORD=$(openssl rand -base64 32)
SECRET_KEY=$(openssl rand -base64 32)

# Create .env file
cat << EOF > .env
DB_NAME=chatsphere
DB_USER=chatsphere_user
DB_PASSWORD=$DB_PASSWORD
SECRET_KEY=$SECRET_KEY
EOF

# Create necessary directories
mkdir -p nginx/ssl
mkdir -p backups
```

### 2. Deploy Script

```bash
#!/bin/bash
# scripts/deploy.sh

# Pull latest changes
git pull origin main

# Build and start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Run migrations
docker-compose exec backend alembic upgrade head

# Check deployment
docker-compose ps
```

### 3. Backup Script

```bash
#!/bin/bash
# scripts/backup.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups"

# Backup database
docker-compose exec -T db pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/db_$TIMESTAMP.sql

# Backup redis
docker-compose exec redis redis-cli SAVE
docker cp $(docker-compose ps -q redis):/data/dump.rdb $BACKUP_DIR/redis_$TIMESTAMP.rdb
```

## Monitoring

### 1. Basic Monitoring Setup

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

volumes:
  grafana_data:
```

## Scaling Strategy

### Current Setup (Docker)
- Vertical scaling by increasing container resources
- Load balancing through Nginx
- Connection pooling for database
- Redis caching

### When to Consider Kubernetes Migration
Migrate to Kubernetes when:
1. Active users exceed 10,000
2. Need for auto-scaling becomes critical
3. Require zero-downtime deployments
4. Need multi-region deployment

## Security Measures

1. Environment variables for sensitive data
2. SSL/TLS configuration
3. Regular security updates
4. Network isolation via Docker networks

## Deployment Checklist

1. **Pre-deployment**
   - Run tests
   - Backup data
   - Check disk space
   - Update documentation

2. **Deployment**
   - Pull latest code
   - Build containers
   - Run migrations
   - Update services

3. **Post-deployment**
   - Verify health checks
   - Monitor logs
   - Test critical features
   - Check backup systems

## Rollback Procedure

```bash
#!/bin/bash
# scripts/rollback.sh

VERSION=$1

# Checkout specific version
git checkout $VERSION

# Rebuild and restart
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Rollback database if needed
docker-compose exec backend alembic downgrade -1
```

## Next Steps

For details on monitoring capabilities with this setup, refer to the [Analytics & Monitoring](./10-analytics-monitoring.md) document. 