from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import (
    SubscriptionPlan, UserProfile, 
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
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)


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
        fields = ['id', 'name', 'description', 'model_type', 'configuration', 
                 'user', 'created_at', 'updated_at', 'is_active']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document model"""
    bot = serializers.PrimaryKeyRelatedField(queryset=Bot.objects.all())
    chunks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = ['id', 'name', 'content_type', 'bot', 'file', 'status', 
                 'error_message', 'created_at', 'updated_at', 'metadata', 'chunks_count']
        read_only_fields = ['created_at', 'updated_at', 'status', 'error_message', 'content_type']
    
    def get_chunks_count(self, obj):
        return obj.chunks.count()


class ChunkSerializer(serializers.ModelSerializer):
    """Serializer for Chunk model"""
    document = serializers.PrimaryKeyRelatedField(queryset=Document.objects.all())
    
    class Meta:
        model = Chunk
        fields = ['id', 'document', 'content', 'metadata', 'created_at']
        read_only_fields = ['created_at']


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for Message model"""
    
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'message_type', 'content', 'created_at', 'metadata']
        read_only_fields = ['created_at']


class ConversationSerializer(serializers.ModelSerializer):
    """Serializer for Conversation model"""
    messages = MessageSerializer(many=True, read_only=True)
    bot = serializers.PrimaryKeyRelatedField(queryset=Bot.objects.all())
    
    class Meta:
        model = Conversation
        fields = ['id', 'bot', 'user_id', 'started_at', 'ended_at', 'metadata']
        read_only_fields = ['started_at', 'ended_at']
    
    def create(self, validated_data):
        # Set the user from request if not provided
        if 'user_id' not in validated_data and self.context['request'].user.is_authenticated:
            validated_data['user_id'] = self.context['request'].user.id
        return super().create(validated_data)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['bot'] = BotSerializer(instance.bot).data
        representation['messages_count'] = instance.messages.count()
        return representation


# Legacy serializers removed as models were deleted 