"""
OpenAI service for text embeddings and completions.
"""
import logging
import os
import openai
from django.conf import settings

logger = logging.getLogger(__name__)

class OpenAIService:
    """
    Service for interacting with OpenAI APIs.
    Handles embedding generation and chat completions.
    """
    
    def __init__(self):
        """Initialize the OpenAI service with API key."""
        self.api_key = settings.OPENAI_API_KEY if hasattr(settings, 'OPENAI_API_KEY') else os.environ.get('OPENAI_API_KEY')
        if self.api_key:
            openai.api_key = self.api_key
        else:
            logger.warning("OpenAI API key not found in settings or environment variables")
    
    def create_embedding(self, text):
        """
        Generate embedding vector for a given text.
        
        Args:
            text: Text to generate embedding for
            
        Returns:
            List of embedding values or None if error
        """
        if not self.api_key:
            logger.error("Cannot create embedding: OpenAI API key not configured")
            return None
            
        if not text or not text.strip():
            logger.warning("Cannot create embedding for empty text")
            return None
            
        try:
            response = openai.Embedding.create(
                model="text-embedding-ada-002",
                input=text
            )
            return response['data'][0]['embedding']
        except Exception as e:
            logger.error(f"Error creating embedding: {str(e)}")
            return None
    
    def generate_chat_completion(self, messages, model="gpt-3.5-turbo", temperature=0.7, max_tokens=1000):
        """
        Generate chat completion using OpenAI API.
        
        Args:
            messages: List of message dictionaries (role, content)
            model: Model to use (default: gpt-3.5-turbo)
            temperature: Temperature parameter (0-1)
            max_tokens: Maximum tokens in response
            
        Returns:
            Generated text response or None if error
        """
        if not self.api_key:
            logger.error("Cannot generate completion: OpenAI API key not configured")
            return None
            
        if not messages:
            logger.warning("Cannot generate completion with empty messages")
            return None
            
        try:
            response = openai.ChatCompletion.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating chat completion: {str(e)}")
            return None 