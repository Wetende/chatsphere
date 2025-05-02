"""
Text chunking logic.
"""
import logging
from typing import List
from langchain_text_splitters import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)

def chunk_text(
    text: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 150,
    separators: List[str] = None, # Optional: Defaults work well
    keep_separator: bool = True,
    strip_whitespace: bool = True,
) -> List[str]:
    """
    Splits text into chunks using RecursiveCharacterTextSplitter.

    Args:
        text: The input text to chunk.
        chunk_size: The target size for each chunk (in characters).
        chunk_overlap: The overlap between consecutive chunks (in characters).
        separators: Optional list of separators to use.
        keep_separator: Whether to keep the separators in the chunks.
        strip_whitespace: Whether to strip whitespace from the start and end of chunks.

    Returns:
        A list of text chunks.
    """
    if not text:
        logger.warning("Attempted to chunk empty or None text.")
        return []

    if separators is None:
        # LangChain's default separators are often good enough
        # ["\\n\\n", "\\n", " ", ""]
        # Explicitly defining them here for clarity, can be customized
        separators = ["\\n\\n", "\\n", ". ", "? ", "! ", "; ", ": ", ", ", " ", ""]

    try:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            is_separator_regex=False, # Using string separators
            separators=separators,
            keep_separator=keep_separator,
            strip_whitespace=strip_whitespace,
        )

        chunks = splitter.split_text(text)
        logger.info(f"Successfully split text into {len(chunks)} chunks (size={chunk_size}, overlap={chunk_overlap})")
        # Optional: Add a check for very small chunks if needed
        # chunks = [chunk for chunk in chunks if len(chunk) > min_chunk_length]
        return chunks
    except Exception as e:
        logger.error(f"Error chunking text: {e}", exc_info=True)
        # Depending on desired behavior, either raise or return empty list/original text
        raise # Re-raise the exception by default 