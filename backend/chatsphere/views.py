from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import (
    ChatRoom, LegacyMessage, SubscriptionPlan, UserProfile, 
    Bot, Document, Chunk, Conversation, Message
)
from .serializers import (
    UserSerializer, ChatRoomSerializer, LegacyMessageSerializer,
    SubscriptionPlanSerializer, UserProfileSerializer, BotSerializer,
    DocumentSerializer, ChunkSerializer, ConversationSerializer, MessageSerializer
)


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
 