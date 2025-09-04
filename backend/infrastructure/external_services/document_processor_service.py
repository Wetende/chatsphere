"""
Document Processing Service

Extracts text/content from uploaded documents. Minimal implementation with graceful fallbacks.
"""

import logging
from typing import Optional


logger = logging.getLogger(__name__)


class DocumentProcessorService:
    def __init__(self) -> None:
        pass

    async def extract_text_from_pdf(self, file_path: str) -> Optional[str]:
        try:
            try:
                import PyPDF2  # type: ignore
            except Exception:
                logger.warning("PyPDF2 not available; skipping PDF extraction")
                return None

            text_parts = []
            with open(file_path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    try:
                        text_parts.append(page.extract_text() or "")
                    except Exception:
                        continue
            return "\n".join(text_parts).strip() or None
        except Exception as e:
            logger.error("PDF extraction error: %s", e)
            return None

    def chunk_text(self, text: str, max_chars: int = 1200, overlap: int = 150) -> list[str]:
        if not text:
            return []
        chunks: list[str] = []
        start = 0
        n = len(text)
        while start < n:
            end = min(start + max_chars, n)
            chunk = text[start:end]
            chunks.append(chunk)
            if end == n:
                break
            start = max(0, end - overlap)
        return chunks


