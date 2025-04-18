from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.utils import timezone
from .models import (
    ChatRoom, LegacyMessage, SubscriptionPlan, UserProfile, 
    Bot, Document, Chunk, Conversation, Message
)
from .serializers import (
    UserSerializer, ChatRoomSerializer, LegacyMessageSerializer,
    SubscriptionPlanSerializer, UserProfileSerializer, BotSerializer,
    DocumentSerializer, ChunkSerializer, ConversationSerializer, MessageSerializer,
    RegisterSerializer
)
import os
import json
import logging
from datetime import datetime
import openai
from .services.document_service import DocumentService
from .services.openai_service import OpenAIService
from .services.vector_service import VectorService
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.db import transaction

# Configure logger
logger = logging.getLogger(__name__)

# Configure OpenAI API key from environment variable
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY
else:
    logger.warning("OpenAI API key not found in environment variables")

# Initialize services
document_service = DocumentService()
openai_service = OpenAIService()
vector_service = VectorService()

# Registration view
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

# Current user view
class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# Simple test endpoint to verify API connection
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def test_connection(request):
    print("---------- TEST CONNECTION REQUEST ----------")
    print(f"Request META: {request.META}")
    print(f"Host header: {request.META.get('HTTP_HOST', 'Not present')}")
    print(f"Origin header: {request.META.get('HTTP_ORIGIN', 'Not present')}")
    print(f"Referer header: {request.META.get('HTTP_REFERER', 'Not present')}")
    print(f"Debug info: {request.META.get('HTTP_X_DEBUG_INFO', 'Not present')}")
    print("--------------------------------------------")
    
    return Response({
        'status': 'success', 
        'message': 'API connection successful!',
        'data': {
            'timestamp': timezone.now().isoformat(),
            'server': 'Django',
            'request_headers': {
                'host': request.META.get('HTTP_HOST', 'Not present'),
                'origin': request.META.get('HTTP_ORIGIN', 'Not present'),
                'referer': request.META.get('HTTP_REFERER', 'Not present')
            }
        }
    })


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing users"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get the current user's profile"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class SubscriptionPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing subscription plans"""
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for UserProfile model"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter profiles to only show the user's own profile"""
        user = self.request.user
        if user.is_staff:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=user)


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'bot'):
            return obj.bot.user == request.user
        return False


class BotViewSet(viewsets.ModelViewSet):
    """
    API endpoint for bots
    """
    serializer_class = BotSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Bot.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ConversationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for conversations
    """
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Conversation.objects.filter(bot__user=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for messages
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Message.objects.filter(conversation__bot__user=self.request.user)


class DocumentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for documents
    """
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        queryset = Document.objects.filter(bot__user=self.request.user)
        # Filter by bot if provided
        bot_id = self.request.query_params.get('bot', None)
        if bot_id:
            queryset = queryset.filter(bot_id=bot_id)
        return queryset
    
    def perform_create(self, serializer):
        # Handle file upload
        bot_id = self.request.data.get('bot_id')
        bot = get_object_or_404(Bot, id=bot_id)
        
        # Check if user has permission to add documents to this bot
        if bot.user != self.request.user:
            raise PermissionDenied("You don't have permission to add documents to this bot.")
        
        # Get the uploaded file
        file = self.request.FILES.get('file')
        if not file:
            return Response(
                {"error": "No file was provided."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        name = self.request.data.get('name', file.name)
        
        try:
            # Initialize services
            vector_service = VectorService()
            openai_service = OpenAIService()
            document_service = DocumentService(vector_service, openai_service)
            
            # Create document from file
            document = document_service.create_document_from_file(
                bot=bot,
                file=file,
                name=name
            )
            
            # Return serialized document
            serializer = self.get_serializer(document)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error processing document: {str(e)}")
            return Response(
                {"error": f"Error processing document: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def train_text(self, request):
        """
        Custom action to upload text for training a bot
        """
        # Get required parameters
        bot_id = request.data.get('bot_id')
        name = request.data.get('name')
        text = request.data.get('text')
        
        # Validate parameters
        if not bot_id:
            return Response(
                {"error": "bot_id is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not text:
            return Response(
                {"error": "text is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not name:
            name = "Text Training"
        
        # Get the bot
        bot = get_object_or_404(Bot, id=bot_id)
        
        # Check if user has permission to add documents to this bot
        if bot.user != request.user:
            raise PermissionDenied("You don't have permission to add documents to this bot.")
        
        try:
            # Initialize services
            vector_service = VectorService()
            openai_service = OpenAIService()
            document_service = DocumentService(vector_service, openai_service)
            
            # Create document from text
            document = document_service.create_document_from_text(
                bot=bot, 
                name=name, 
                text=text
            )
            
            # Return serialized document
            serializer = self.get_serializer(document)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error processing text document: {str(e)}")
                return Response(
                {"error": f"Error processing text document: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ChunkViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for chunks (read-only)
    """
    serializer_class = ChunkSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return Chunk.objects.filter(document__bot__user=self.request.user)


# Legacy ViewSets for backward compatibility

class ChatRoomViewSet(viewsets.ModelViewSet):
    """ViewSet for ChatRoom model (legacy)"""
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """Get messages for a specific chat room"""
        room = self.get_object()
        messages = room.legacy_messages.all()
        serializer = LegacyMessageSerializer(messages, many=True)
        return Response(serializer.data)


class LegacyMessageViewSet(viewsets.ModelViewSet):
    """ViewSet for LegacyMessage model (legacy)"""
    queryset = LegacyMessage.objects.all()
    serializer_class = LegacyMessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter messages by room if provided in query params"""
        queryset = LegacyMessage.objects.all()
        room_id = self.request.query_params.get('room', None)
        if room_id is not None:
            queryset = queryset.filter(room_id=room_id)
        return queryset 
 