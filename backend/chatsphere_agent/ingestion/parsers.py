"""
Text parsing functions for different file formats.
"""
import logging
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import fitz # PyMuPDF
import os

logger = logging.getLogger(__name__)

def load_pdf(file_path: str) -> str:
    """Loads text content from a PDF file using PyMuPDF."""
    if not os.path.exists(file_path):
        logger.error(f"PDF file not found: {file_path}")
        raise FileNotFoundError(f"PDF file not found: {file_path}")
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        logger.info(f"Successfully loaded text from PDF: {file_path}")
        return text
    except Exception as e:
        logger.error(f"Error loading PDF {file_path}: {e}", exc_info=True)
        raise

def load_txt(file_path: str) -> str:
    """Loads text content from a TXT file."""
    if not os.path.exists(file_path):
        logger.error(f"TXT file not found: {file_path}")
        raise FileNotFoundError(f"TXT file not found: {file_path}")
    try:
        # Try common encodings
        encodings_to_try = ['utf-8', 'latin-1', 'windows-1252']
        text = None
        for encoding in encodings_to_try:
            try:
                with open(file_path, 'r', encoding=encoding) as f:
                    text = f.read()
                logger.info(f"Successfully loaded TXT file {file_path} with encoding {encoding}")
                break # Stop if successful
            except UnicodeDecodeError:
                logger.warning(f"Failed to decode {file_path} with encoding {encoding}, trying next...")
                continue
            except Exception as inner_e: # Catch other potential file reading errors
                logger.error(f"Error reading TXT file {file_path} with encoding {encoding}: {inner_e}", exc_info=True)
                raise inner_e # Re-raise specific error if it's not decoding

        if text is None:
             raise ValueError(f"Could not decode TXT file {file_path} with attempted encodings.")

        return text
    except Exception as e:
        logger.error(f"Error loading TXT file {file_path}: {e}", exc_info=True)
        raise

def scrape_web(url: str) -> str:
    """Scrapes text content from a web page using requests and BeautifulSoup."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)

        soup = BeautifulSoup(response.content, 'html.parser')

        # Remove script and style elements
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()

        # Get text, trying to preserve structure somewhat
        # lines = [line.strip() for line in soup.get_text(separator='\\n').splitlines() if line.strip()]
        # text = "\\n".join(lines)

        # Alternative: Extract text from common content tags
        main_content_tags = ['main', 'article', 'div'] # Add others if needed
        text_parts = []
        content_found = False
        for tag_name in main_content_tags:
            content_elements = soup.find_all(tag_name)
            if content_elements:
                for element in content_elements:
                     # Crude check to prioritize potentially larger content blocks
                     if len(element.get_text(strip=True)) > 200:
                          text_parts.append(element.get_text(separator='\\n', strip=True))
                          content_found = True
                if content_found: break # Stop if we found content in a major tag

        # Fallback to body if no main content found or if main content is short
        if not content_found or len(" ".join(text_parts)) < 500 :
             body = soup.find('body')
             if body:
                 text = body.get_text(separator='\\n', strip=True)
             else: # Very basic fallback
                 text = soup.get_text(separator='\\n', strip=True)
        else:
            text = "\\n\\n".join(text_parts) # Join parts found in main tags

        logger.info(f"Successfully scraped text content from URL: {url}")
        return text.strip()

    except requests.exceptions.RequestException as e:
        logger.error(f"HTTP Error scraping URL {url}: {e}", exc_info=True)
        raise
    except Exception as e:
        logger.error(f"Error scraping URL {url}: {e}", exc_info=True)
        raise 