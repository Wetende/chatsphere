#!/bin/bash

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Create superuser if it doesn't exist
echo "Creating superuser if not exists..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email=os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@chatsphere.com'),
        password=os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin')
    )
    print(f'Superuser {username} created successfully')
else:
    print(f'Superuser {username} already exists')
"

# Start the Django development server
echo "Starting server..."
exec "$@" 