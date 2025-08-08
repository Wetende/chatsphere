from typing import Dict, List, Optional
import os

try:
    import google.generativeai as genai
except Exception:  # pragma: no cover
    genai = None

class GeminiGenerator:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if genai and self.api_key:
            genai.configure(api_key=self.api_key)
            self.models = {
                "flash": genai.GenerativeModel("gemini-2.0-flash-exp"),
                "pro": genai.GenerativeModel("gemini-1.5-pro"),
            }
        else:
            self.models = {}

    async def chat_response(
        self,
        user_message: str,
        bot_config: Dict,
        conversation_history: List[Dict],
        retrieved_context: Optional[str] = None,
    ) -> str:
        system_prompt = bot_config.get("system_prompt") or "You are a helpful assistant."
        if retrieved_context:
            system_prompt = f"{system_prompt}\nUse this context when helpful:\n{retrieved_context}"

        # Fallback when no API key available
        if not genai or not self.api_key:
            return f"[DEV RESPONSE] {user_message}"

        generation_config = genai.GenerationConfig(
            temperature=bot_config.get("temperature", 0.7),
            max_output_tokens=bot_config.get("max_tokens", 512),
            top_p=0.95,
        )
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        if conversation_history:
            messages.extend(conversation_history[-10:])
        messages.append({"role": "user", "content": user_message})

        model_key = "flash" if bot_config.get("model_type", "gemini-2.0-flash-exp").startswith("gemini-2.0-flash") else "pro"
        model_instance = self.models.get(model_key) or next(iter(self.models.values()), None)
        if not model_instance:
            return f"[DEV RESPONSE] {user_message}"

        response = await model_instance.generate_content_async(messages, generation_config=generation_config)
        return getattr(response, "text", "") or ""