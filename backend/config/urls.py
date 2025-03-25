"""URL Configuration for ChatSphere"""

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from datetime import datetime
import socket

# Simple test connection view
def test_connection(request):
    """Simple endpoint to test API connectivity"""
    return JsonResponse({
        'status': 'success',
        'message': 'Successfully connected to Django backend',
        'data': {
            'timestamp': datetime.now().isoformat(),
            'server': socket.gethostname()
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('chatsphere.urls')),
    path('api/test-connection/', test_connection, name='test-connection'),
] 