from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import (
    ChatRoom, LegacyMessage, SubscriptionPlan, UserProfile, 
    Bot, Document, Chunk, Conversation, Message
)
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        
        # Create user profile
        UserProfile.objects.create(user=user)
        
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')
        read_only_fields = ('id', 'is_staff')


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    """Serializer for SubscriptionPlan model"""
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'name', 'price', 'description', 'features']


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile model"""
    user = UserSerializer(read_only=True)
    subscription_plan = SubscriptionPlanSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'subscription_status', 'subscription_plan', 'stripe_customer_id']


class BotSerializer(serializers.ModelSerializer):
    """Serializer for Bot model"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Bot
        fields = [
            'id', 'user', 'name', 'description', 'avatar', 'welcome_message', 
            'model_type', 'configuration', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document model"""
    bot = serializers.PrimaryKeyRelatedField(queryset=Bot.objects.all())
    
    class Meta:
        model = Document
        fields = [
            'id', 'bot', 'name', 'file', 'url', 'content_type', 
            'upload_date', 'status', 'error_message'
        ]
        read_only_fields = ['id', 'upload_date', 'status', 'error_message']


class ChunkSerializer(serializers.ModelSerializer):
    """Serializer for Chunk model"""
    document = serializers.PrimaryKeyRelatedField(queryset=Document.objects.all())
    
    class Meta:
        model = Chunk
        fields = ['id', 'document', 'content', 'embedding_id', 'metadata']
        read_only_fields = ['id', 'embedding_id']


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model"""
    
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'role', 'content', 'timestamp', 'metadata']
        read_only_fields = ['id', 'timestamp']


class ConversationSerializer(serializers.ModelSerializer):
    """Serializer for Conversation model"""
    messages = MessageSerializer(many=True, read_only=True)
    bot = serializers.PrimaryKeyRelatedField(queryset=Bot.objects.all())
    
    class Meta:
        model = Conversation
        fields = ['id', 'bot', 'user', 'title', 'created_at', 'is_active', 'messages']
        read_only_fields = ['id', 'created_at']
    
    def create(self, validated_data):
        # Set the user from request if not provided
        if 'user' not in validated_data and self.context['request'].user.is_authenticated:
            validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['bot'] = BotSerializer(instance.bot).data
        representation['messages_count'] = instance.messages.count()
        return representation


# Legacy serializers for backward compatibility

class LegacyMessageSerializer(serializers.ModelSerializer):
    """Serializer for LegacyMessage model"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = LegacyMessage
        fields = ['id', 'room', 'user', 'content', 'timestamp']
        read_only_fields = ['user', 'timestamp']
    
    def create(self, validated_data):
        # Set the user from request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class ChatRoomSerializer(serializers.ModelSerializer):
    """Serializer for ChatRoom model"""
    legacy_messages = LegacyMessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'created_at', 'legacy_messages']
        read_only_fields = ['created_at'] 