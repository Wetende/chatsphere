"""
Document processing service for handling document uploads and text extraction.
"""
import logging
import re
import uuid
import tempfile
import os
from django.db import transaction
from ..models import Document, Chunk
from .vector_service import VectorService
from .openai_service import OpenAIService

logger = logging.getLogger(__name__)

class DocumentService:
    """
    Service for processing documents, extracting text, and managing chunking.
    """
    
    def __init__(self):
        """Initialize document service with related services."""
        self.vector_service = VectorService()
        self.openai_service = OpenAIService()
    
    @transaction.atomic
    def create_document_from_text(self, bot_id, name, text_content):
        """
        Create a document from plain text and process it.
        
        Args:
            bot_id: UUID of the bot
            name: Name of the document
            text_content: Text content to process
            
        Returns:
            Created document object or None if error
        """
        try:
            # Create document record
            document = Document.objects.create(
                bot_id=bot_id,
                name=name,
                content_type='text/plain',
                status='processing',
                metadata={'text_content': text_content[:100] + '...' if len(text_content) > 100 else text_content}
            )
            
            # Process text content
            self._process_text_content(document, text_content)
            
            return document
        except Exception as e:
            logger.error(f"Error creating document from text: {str(e)}")
            return None
    
    @transaction.atomic
    def create_document_from_file(self, bot_id, file, name=None):
        """
        Create a document from an uploaded file and process it.
        
        Args:
            bot_id: UUID of the bot
            file: Uploaded file object
            name: Optional name (defaults to filename)
            
        Returns:
            Created document object or None if error
        """
        try:
            # Determine content type
            content_type = self._get_content_type(file)
            
            # Use filename if name not provided
            if not name:
                name = file.name
            
            # Create document record
            document = Document.objects.create(
                bot_id=bot_id,
                name=name,
                file=file,
                content_type=content_type,
                status='processing'
            )
            
            # Extract text from file
            text_content = self._extract_text_from_file(document)
            
            if text_content:
                # Process extracted text
                self._process_text_content(document, text_content)
            else:
                # Update status to error if text extraction failed
                document.status = 'error'
                document.error_message = 'Failed to extract text from file'
                document.save()
            
            return document
        except Exception as e:
            logger.error(f"Error creating document from file: {str(e)}")
            return None
    
    def _process_text_content(self, document, text_content):
        """
        Process text content by chunking and creating embeddings.
        
        Args:
            document: Document object
            text_content: Text content to process
        """
        try:
            # Chunk the text
            chunks = self._chunk_text(text_content)
            
            # Process each chunk
            for i, chunk_text in enumerate(chunks):
                # Create chunk in database
                chunk = Chunk.objects.create(
                    document=document,
                    content=chunk_text,
                    metadata={
                        'chunk_index': i,
                        'total_chunks': len(chunks)
                    }
                )
                
                # Generate embedding
                embedding = self.openai_service.create_embedding(chunk_text)
                
                # Store embedding if generated successfully
                if embedding:
                    self.vector_service.store_embedding(chunk.id, embedding)
            
            # Update document status
            document.status = 'ready'
            document.save()
            
        except Exception as e:
            logger.error(f"Error processing document content: {str(e)}")
            document.status = 'error'
            document.error_message = str(e)
            document.save()
    
    def _extract_text_from_file(self, document):
        """
        Extract text from a file based on its content type.
        
        Args:
            document: Document object with file
            
        Returns:
            Extracted text or None if extraction failed
        """
        if not document.file:
            return None
        
        content_type = document.content_type
        
        # For plain text files
        if content_type in ['text/plain', 'text/markdown']:
            try:
                return document.file.read().decode('utf-8')
            except UnicodeDecodeError:
                # Try with different encoding if UTF-8 fails
                try:
                    return document.file.read().decode('latin-1')
                except Exception as e:
                    logger.error(f"Error decoding text file: {str(e)}")
                    return None
            
        # For PDF files - would need to use a PDF extraction library
        # This is a placeholder - you would need to install a library like PyPDF2 or pdfminer
        elif content_type == 'application/pdf':
            try:
                # Placeholder for PDF extraction
                # In a real implementation, you would use a PDF library like:
                # import PyPDF2
                # pdf_reader = PyPDF2.PdfReader(document.file)
                # text = ""
                # for page in pdf_reader.pages:
                #     text += page.extract_text()
                # return text
                
                logger.warning("PDF extraction not implemented yet")
                return None
            except Exception as e:
                logger.error(f"Error extracting text from PDF: {str(e)}")
                return None
        
        # Add support for other file types as needed
        
        return None
    
    def _chunk_text(self, text, chunk_size=1000, overlap=200):
        """
        Split text into chunks with overlap.
        
        Args:
            text: Text to split
            chunk_size: Maximum chunk size in characters
            overlap: Overlap between chunks in characters
            
        Returns:
            List of text chunks
        """
        # Clean text: remove excessive whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        # If text is shorter than chunk_size, return as single chunk
        if len(text) <= chunk_size:
            return [text]
        
        chunks = []
        start = 0
        
        while start < len(text):
            # Get chunk of appropriate size
            end = start + chunk_size
            
            # If we're not at the end, try to break at a sentence or paragraph
            if end < len(text):
                # Try to find a paragraph break
                paragraph_break = text.rfind('\n\n', start, end)
                if paragraph_break != -1 and paragraph_break > start + chunk_size/2:
                    end = paragraph_break
                else:
                    # Try to find a sentence break (period + space)
                    sentence_break = text.rfind('. ', start, end)
                    if sentence_break != -1 and sentence_break > start + chunk_size/2:
                        end = sentence_break + 1  # Include the period
            
            # Add chunk to list
            chunks.append(text[start:end].strip())
            
            # Move to next chunk with overlap
            start = end - overlap if end < len(text) else len(text)
        
        return chunks
    
    def _get_content_type(self, file):
        """
        Determine content type from file extension.
        
        Args:
            file: Uploaded file object
            
        Returns:
            Content type string
        """
        # Get file extension
        _, ext = os.path.splitext(file.name.lower())
        
        # Map extensions to content types
        content_types = {
            '.txt': 'text/plain',
            '.md': 'text/markdown',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
        
        return content_types.get(ext, 'application/octet-stream') 