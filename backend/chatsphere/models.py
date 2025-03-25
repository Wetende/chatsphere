from django.db import models
from django.contrib.auth.models import User
import uuid
import json


class SubscriptionPlan(models.Model):
    """Subscription plan model"""
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    features = models.JSONField(default=dict)
    
    def __str__(self):
        return self.name


class UserProfile(models.Model):
    """Extended user profile model"""
    SUBSCRIPTION_STATUS_CHOICES = [
        ('free', 'Free'),
        ('active', 'Active'),
        ('canceled', 'Canceled'),
        ('trialing', 'Trialing'),
        ('past_due', 'Past Due'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    subscription_status = models.CharField(max_length=20, choices=SUBSCRIPTION_STATUS_CHOICES, default='free')
    subscription_plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"


class Bot(models.Model):
    """AI bot model"""
    MODEL_TYPE_CHOICES = [
        ('gpt-3.5-turbo', 'GPT-3.5 Turbo'),
        ('gpt-4', 'GPT-4'),
        ('claude-2', 'Claude 2'),
        ('claude-instant', 'Claude Instant'),
        ('mistral-7b', 'Mistral 7B'),
        ('llama-2', 'Llama 2'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bots')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='bot_avatars/', blank=True, null=True)
    welcome_message = models.TextField(default="Hi! How can I help you today?")
    model_type = models.CharField(max_length=50, choices=MODEL_TYPE_CHOICES, default='gpt-3.5-turbo')
    configuration = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class Document(models.Model):
    """Document model for bot knowledge base"""
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('ready', 'Ready'),
        ('error', 'Error'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/', null=True, blank=True)
    url = models.URLField(max_length=2000, null=True, blank=True)
    content_type = models.CharField(max_length=50)
    upload_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    error_message = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name


class Chunk(models.Model):
    """Document chunk model for storing embeddings"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='chunks')
    content = models.TextField()
    embedding_id = models.CharField(max_length=100, null=True, blank=True)
    metadata = models.JSONField(default=dict)
    
    def __str__(self):
        return f"Chunk {self.id} of {self.document.name}"


class Conversation(models.Model):
    """Conversation model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE, related_name='conversations')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='conversations')
    title = models.CharField(max_length=255, default="New Conversation")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.title} ({self.bot.name})"
    
    class Meta:
        ordering = ['-created_at']


class Message(models.Model):
    """Message model for storing chat messages"""
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict)
    
    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."
    
    class Meta:
        ordering = ['timestamp']


class ChatRoom(models.Model):
    """Legacy Chat room model - will be deprecated"""
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class LegacyMessage(models.Model):
    """Legacy Message model - will be deprecated"""
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='legacy_messages')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='legacy_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        return f"{self.user.username}: {self.content[:20]}..." 