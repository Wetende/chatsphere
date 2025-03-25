from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from django.contrib.auth.models import User
from django.utils import timezone
from .models import (
    ChatRoom, LegacyMessage, SubscriptionPlan, UserProfile, 
    Bot, Document, Chunk, Conversation, Message
)
from .serializers import (
    UserSerializer, ChatRoomSerializer, LegacyMessageSerializer,
    SubscriptionPlanSerializer, UserProfileSerializer, BotSerializer,
    DocumentSerializer, ChunkSerializer, ConversationSerializer, MessageSerializer
)


# Simple test endpoint to verify API connection
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def test_connection(request):
    return Response({
        'status': 'success', 
        'message': 'API connection successful!',
        'data': {
            'timestamp': timezone.now().isoformat(),
            'server': 'Django'
        }
    })


class UserViewSet(viewsets.ReadOnlyModelViewSet): 