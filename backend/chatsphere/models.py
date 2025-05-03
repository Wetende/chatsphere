from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid
import json


class SubscriptionPlan(models.Model):
    """Subscription plan model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    features = models.JSONField(default=dict)
    stripe_price_id = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return self.name


class UserProfile(models.Model):
    """Extended user profile model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"


class Bot(models.Model):
    """AI bot model"""
    MODEL_TYPE_CHOICES = [
        ('gemini-2.0-flash', 'Gemini 2.0 Flash'),
        ('claude-2', 'Claude 2'),
        ('claude-instant', 'Claude Instant'),
        ('mistral-7b', 'Mistral 7B'),
        ('llama-2', 'Llama 2'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bots')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='bot_avatars/', blank=True, null=True)
    welcome_message = models.TextField(default="Hi! How can I help you today?")
    model_type = models.CharField(max_length=50, choices=MODEL_TYPE_CHOICES, default='gemini-2.0-flash')
    configuration = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['user']),
        ]


class Document(models.Model):
    """Document model for bot knowledge base"""
    STATUS_CHOICES = [
        ('PROCESSING', 'Processing'),
        ('READY', 'Ready'),
        ('ERROR', 'Error'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/', null=True, blank=True)
    url = models.URLField(max_length=2000, null=True, blank=True)
    content_type = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PROCESSING')
    error_message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['bot', 'status']),
        ]


class Chunk(models.Model):
    """Document chunk model for storing embeddings"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='chunks')
    content = models.TextField()
    # Consider adding a field to store the Pinecone vector ID if needed later:
    pinecone_vector_id = models.CharField(max_length=100, null=True, blank=True, db_index=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Chunk {self.id} from {self.document.name}"

    class Meta:
        indexes = [
            models.Index(fields=['document', 'pinecone_vector_id']),
        ]


class Conversation(models.Model):
    """Conversation model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bot = models.ForeignKey(Bot, on_delete=models.CASCADE, related_name='conversations')
    user_id = models.CharField(max_length=255, blank=True)  # Anonymous user identifier
    title = models.CharField(max_length=255, default="New Conversation")
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    def __str__(self):
        return f"{self.title} ({self.bot.name})"
    
    class Meta:
        ordering = ['-started_at']
        indexes = [
            models.Index(fields=['bot', 'user_id']),
        ]


class Message(models.Model):
    """Message model for storing chat messages"""
    MESSAGE_TYPE_CHOICES = [
        ('USER', 'User'),
        ('BOT', 'Bot'),
        ('SYSTEM', 'System'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    def __str__(self):
        return f"{self.message_type} message: {self.content[:50]}..."
    
    class Meta:
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['conversation', 'created_at']),
        ]




class AnalyticsUsage(models.Model):
    """Model for tracking analytics usage"""
    id = models.BigAutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    bot = models.ForeignKey(Bot, on_delete=models.SET_NULL, null=True, blank=True)
    metric_type = models.CharField(max_length=100, db_index=True)
    value = models.FloatField(default=0.0)
    metadata = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.metric_type} for {self.bot.name if self.bot else 'N/A'} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['bot', 'timestamp']),
            models.Index(fields=['metric_type', 'timestamp']),
        ]


class ConversationFeedback(models.Model):
    """Model for storing conversation feedback"""
    id = models.BigAutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='feedback')
    message = models.ForeignKey(Message, on_delete=models.SET_NULL, null=True, blank=True, related_name='feedback')
    rating = models.IntegerField(null=True, blank=True) # e.g., 1-5 stars, or thumbs up/down (1/-1)
    feedback_text = models.TextField(blank=True)
    user_id = models.CharField(max_length=255, blank=True) # Corresponds to Conversation.user_id

    def __str__(self):
        return f"Feedback for Conversation {self.conversation.id} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['conversation']),
        ]


class TrainingSourceStats(models.Model):
    """Model for tracking statistics about training sources"""
    id = models.BigAutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='stats')
    retrieval_count = models.PositiveIntegerField(default=0)
    last_retrieved = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Stats for Document {self.document.name}"

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['document']),
        ]


class ErrorLog(models.Model):
    """Model for logging errors across services"""
    id = models.BigAutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    service = models.CharField(max_length=100, db_index=True) # e.g., 'backend', 'agent', 'frontend'
    error_type = models.CharField(max_length=255, db_index=True)
    error_message = models.TextField()
    details = models.JSONField(default=dict, blank=True) # Stack trace, request info, etc.
    bot = models.ForeignKey(Bot, on_delete=models.SET_NULL, null=True, blank=True, related_name='errors')

    def __str__(self):
        return f"{self.error_type} in {self.service} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['timestamp', 'service', 'error_type']),
        ]

