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

# Configure logger
logger = logging.getLogger(__name__)

# Configure OpenAI API key from environment variable
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY
else:
    logger.warning("OpenAI API key not found in environment variables")

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


class BotViewSet(viewsets.ModelViewSet):
    """ViewSet for Bot model"""
    queryset = Bot.objects.all()
    serializer_class = BotSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter bots to only show the user's own bots"""
        user = self.request.user
        if user.is_staff:
            return Bot.objects.all()
        return Bot.objects.filter(user=user)
    
    @action(detail=True, methods=['get'])
    def conversations(self, request, pk=None):
        """Get conversations for a specific bot"""
        bot = self.get_object()
        conversations = bot.conversations.all()
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)


class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for Document model"""
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter documents to only show those belonging to the user's bots"""
        user = self.request.user
        if user.is_staff:
            return Document.objects.all()
        return Document.objects.filter(bot__user=user)


class ChunkViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Chunk model (read-only)"""
    queryset = Chunk.objects.all()
    serializer_class = ChunkSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter chunks to only show those belonging to the user's documents"""
        user = self.request.user
        if user.is_staff:
            return Chunk.objects.all()
        return Chunk.objects.filter(document__bot__user=user)


class ConversationViewSet(viewsets.ModelViewSet):
    """ViewSet for Conversation model"""
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter conversations to only show those belonging to the user"""
        user = self.request.user
        if user.is_staff:
            return Conversation.objects.all()
        
        # Include both conversations where user is the owner and anonymous conversations
        # with the user's bots that match the current session
        return Conversation.objects.filter(
            bot__user=user
        ) | Conversation.objects.filter(
            user=user
        )
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """Get messages for a specific conversation"""
        conversation = self.get_object()
        messages = conversation.messages.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


class MessageViewSet(viewsets.ModelViewSet):
    """ViewSet for Message model"""
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Filter messages by conversation if provided in query params"""
        user = self.request.user
        queryset = Message.objects.all()
        
        # Staff can see all messages
        if not user.is_staff:
            # Regular users can only see messages in conversations they own or
            # conversations with bots they own
            queryset = queryset.filter(
                conversation__user=user
            ) | queryset.filter(
                conversation__bot__user=user
            )
        
        # Filter by conversation if specified
        conversation_id = self.request.query_params.get('conversation', None)
        if conversation_id is not None:
            queryset = queryset.filter(conversation_id=conversation_id)
            
        return queryset
    
    def create(self, request, *args, **kwargs):
        """Override create to handle AI responses automatically for user messages"""
        data = request.data
        conversation_id = data.get('conversation')
        role = data.get('role')
        
        # First, save the user's message
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save()
        
        # If this is a user message, generate an AI response
        if role == 'user' and OPENAI_API_KEY:
            try:
                # Get the conversation
                conversation = Conversation.objects.get(id=conversation_id)
                bot = conversation.bot
                
                # Get conversation history (limit to last 10 messages for context)
                history = Message.objects.filter(conversation=conversation).order_by('timestamp')[:10]
                
                # Format messages for OpenAI
                messages = []
                
                # Add system message with bot configuration
                system_message = f"You are {bot.name}, an AI assistant. "
                if bot.description:
                    system_message += bot.description
                
                messages.append({"role": "system", "content": system_message})
                
                # Add conversation history
                for msg in history:
                    messages.append({"role": msg.role, "content": msg.content})
                
                # Call OpenAI API
                logger.info(f"Sending request to OpenAI for conversation {conversation_id}")
                
                response = openai.ChatCompletion.create(
                    model=bot.model_type,
                    messages=messages,
                    temperature=bot.configuration.get('temperature', 0.7),
                    max_tokens=bot.configuration.get('max_tokens', 1000)
                )
                
                # Extract the response content
                ai_response = response.choices[0].message.content.strip()
                
                # Save the AI response as a new message
                ai_message = Message.objects.create(
                    conversation=conversation,
                    role="assistant",
                    content=ai_response,
                    metadata={
                        "model": bot.model_type,
                        "tokens": response.usage.total_tokens
                    }
                )
                
                # Return both the user message and AI response
                return Response(
                    {
                        "user_message": serializer.data,
                        "ai_response": self.get_serializer(ai_message).data
                    },
                    status=status.HTTP_201_CREATED
                )
                
            except Exception as e:
                logger.error(f"Error generating AI response: {str(e)}")
                # Return just the user message if AI response generation fails
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # For non-user messages or when OpenAI is not configured, just return the created message
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
 