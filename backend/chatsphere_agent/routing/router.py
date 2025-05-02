"""
Router module for the ChatSphere agent.

This module contains the Router class which analyzes user input and determines
which component (RAG Chain, Tool Agent, or direct LLM) should handle the request.
"""

import re
from enum import Enum
from typing import Dict, Any, Optional, Union, List, Tuple

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate

# Define the routing targets as an Enum for type safety
class RoutingTarget(str, Enum):
    """Possible targets for routing a user query."""
    RAG = "rag_chain"
    TOOL = "tool_agent"
    DIRECT = "direct_llm"

class Router:
    """
    Routes user queries to the appropriate component based on intent analysis.
    
    This router uses a combination of:
    1. LLM-based classification for sophisticated intent recognition
    2. Regular expression patterns for quick routing of obvious cases
    """
    
    def __init__(self, llm: Optional[ChatGoogleGenerativeAI] = None):
        """
        Initialize the router.
        
        Args:
            llm: Optional LLM for intent classification. If not provided, will use a 
                 simpler rule-based approach only.
        """
        self.llm = llm
        
        # Compile regex patterns for faster matching
        # Updated patterns with stricter ordering to ensure database/tool patterns take precedence
        self._db_patterns = [
            re.compile(r'database', re.IGNORECASE),
            re.compile(r'(user|customer).*preference', re.IGNORECASE),
            re.compile(r'(user|customer).*setting', re.IGNORECASE),
            re.compile(r'settings', re.IGNORECASE),           # Added explicit settings pattern
            re.compile(r'preferences', re.IGNORECASE),        # Added explicit preferences pattern
            re.compile(r'(what|which|who).*prefer', re.IGNORECASE),
            re.compile(r'(what|which|who).*favorite', re.IGNORECASE),
            re.compile(r'sql', re.IGNORECASE),
            re.compile(r'query', re.IGNORECASE),
        ]
        
        self._knowledge_patterns = [
            re.compile(r'(pdf|document|article|text|source)', re.IGNORECASE),
            re.compile(r'(in|from) the (context|document|pdf)', re.IGNORECASE),
            re.compile(r'according to', re.IGNORECASE),
            # Lower precedence general knowledge patterns
            re.compile(r'(what|explain|define|tell me about|describe)', re.IGNORECASE),
        ]
        
        # Define the LLM-based router prompt
        self._router_prompt = ChatPromptTemplate.from_template("""
        You are a routing classifier for an AI assistant. Your job is to determine which component should handle a user query.
        
        Based on the user query, classify it into ONE of these categories:
        - "RAG_CHAIN": For questions seeking information from documents or knowledge base, factual questions, or general inquiries that require looking up information.
        - "TOOL_AGENT": For requests to perform actions using tools, especially database queries about user preferences or settings.
        - "DIRECT_LLM": For simple conversational exchanges, clarifications, or follow-ups that don't need external knowledge or tools.
        
        Return ONLY one of these three category names without explanation.
        
        User query: {query}
        """)

    def _rule_based_classification(self, query: str) -> Optional[RoutingTarget]:
        """
        Apply simple rule-based classification based on regex patterns.
        
        Args:
            query: The user query text
            
        Returns:
            The determined routing target or None if no clear match
        """
        # Check for database/tool patterns first (higher priority)
        for pattern in self._db_patterns:
            if pattern.search(query):
                return RoutingTarget.TOOL
                
        # Then check for knowledge-seeking patterns
        for pattern in self._knowledge_patterns:
            if pattern.search(query):
                return RoutingTarget.RAG
                
        # If no clear match, return None to use LLM-based routing
        return None

    async def _llm_based_classification(self, query: str) -> RoutingTarget:
        """
        Use LLM to classify the intent of the query.
        
        Args:
            query: The user query text
            
        Returns:
            The determined routing target
        """
        if not self.llm:
            # Fallback to DIRECT if no LLM is available
            return RoutingTarget.DIRECT
            
        result = await self.llm.ainvoke(
            self._router_prompt.format_messages(query=query)
        )
        
        response_text = result.content.strip().upper()
        
        if "RAG" in response_text:
            return RoutingTarget.RAG
        elif "TOOL" in response_text:
            return RoutingTarget.TOOL
        else:
            return RoutingTarget.DIRECT

    def route(self, query: str, conversation_history: Optional[List] = None) -> Tuple[RoutingTarget, Dict[str, Any]]:
        """
        Route the user query to the appropriate component.
        
        Args:
            query: The user query text
            conversation_history: Optional conversation history for context
            
        Returns:
            A tuple of (routing_target, additional_params) where additional_params
            contains any extracted parameters or metadata for the target component
        """
        # Try rule-based classification first for efficiency
        target = self._rule_based_classification(query)
        
        # If rule-based classification is inconclusive, use LLM if available
        if target is None and self.llm is not None:
            # For synchronous usage, adapt the async function
            import asyncio
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
            target = loop.run_until_complete(self._llm_based_classification(query))
        elif target is None:
            # Default to RAG if no LLM and no clear rule match
            target = RoutingTarget.RAG
        
        # Prepare any additional parameters or instructions for the target component
        additional_params = {
            "query": query,
            "conversation_history": conversation_history or []
        }
        
        # For RAG, convert the query to appropriate input format
        if target == RoutingTarget.RAG:
            additional_params["question"] = query
        
        # For Tool Agent, prepare the input format it expects
        elif target == RoutingTarget.TOOL:
            additional_params["input"] = query
            additional_params["chat_history"] = conversation_history or []
        
        return target, additional_params

# Synchronous helper function for quick usage
def determine_routing(query: str, llm: Optional[ChatGoogleGenerativeAI] = None) -> RoutingTarget:
    """
    Quick helper to determine routing without the full router initialization.
    
    Args:
        query: The user query
        llm: Optional LLM for intent classification
        
    Returns:
        The routing target enum value
    """
    router = Router(llm)
    target, _ = router.route(query)
    return target 