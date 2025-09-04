"""
Web Scraper Service

Minimal async HTTP fetcher with BeautifulSoup extraction (optional dependency).
"""

import logging
from typing import Optional


logger = logging.getLogger(__name__)


class WebScraperService:
    def __init__(self, timeout: int = 15):
        self._timeout = timeout

    async def scrape_url(self, url: str) -> Optional[str]:
        # Basic validation and normalization
        if not isinstance(url, str) or not url.strip():
            return None
        url = url.strip()
        if not (url.startswith("http://") or url.startswith("https://")):
            url = "https://" + url
        try:
            try:
                import httpx  # type: ignore
            except Exception:
                logger.warning("httpx not available; skipping scrape")
                return None
            async with httpx.AsyncClient(timeout=self._timeout, headers={"User-Agent": "KyroChatBot/1.0"}) as client:
                resp = await client.get(url)
                resp.raise_for_status()
                content = resp.text
            try:
                from bs4 import BeautifulSoup  # type: ignore
                soup = BeautifulSoup(content, "html.parser")
                # Remove script/style
                for tag in soup(["script", "style", "noscript"]):
                    tag.decompose()
                text = soup.get_text(" ", strip=True)
                return text
            except Exception:
                return content
        except Exception as e:
            logger.error("Web scrape error for %s: %s", url, e)
            return None


