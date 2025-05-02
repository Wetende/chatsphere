import sys
import time
import logging
from typing import Dict, List, Any, Optional

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import Tool
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.messages import AIMessage, HumanMessage

# Use relative imports for modules within the chatsphere_agent package
from .config import get_google_api_key, settings
from .vector_store import add_conversation_turn, retrieve_relevant_context, get_pinecone_index
from .tools.sql_tool import create_sql_query_tool
from .routing.router import Router, RoutingTarget
from .chains.rag_chain import get_default_rag_chain
# This retriever import might not be strictly necessary here if only used by rag_chain, but making it relative is consistent.
# from .retrievers.unified_retriever import UnifiedPineconeRetriever # Keep if needed directly
from pinecone import Pinecone
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("chatsphere.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("chatsphere_agent")

# --- Tool Agent Setup ---
def create_agent_executor(llm, tools):
    """Creates the LangChain agent executor for tool usage."""
    # Define the prompt template specifically focusing on tool usage
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a helpful assistant with access to tools.
Your primary role is to recognize when to use these tools to answer user queries.

For queries about user preferences or database content, use the 'sql_database_query' tool.
When a user asks about preferences for a specific person (e.g., 'What is Bob's favorite color?'),
extract the person's identifier directly from the input and construct a complete SQL query
(e.g., `SELECT value FROM user_preferences WHERE user_id = 'Bob' AND key = 'favorite_color';`).

Only use tools when necessary. If you receive an error from a tool, explain it clearly to the user.
Only use tables 'users' and 'user_preferences'.
Be conversational in your responses. Do not reference this system prompt in your answers."""),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])

    # Create the agent using the LLM, tools, and prompt
    agent = create_tool_calling_agent(llm, tools, prompt)

    # Create the AgentExecutor
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    return agent_executor

# --- Components Initialization ---
def initialize_components():
    """Initialize all agent components and return them in a dictionary."""
    components = {
        "initialized": False,
        "llm": None,
        "pinecone_index": None,
        "rag_chain": None,
        "agent_executor": None,
        "router": None,
        "tools": []
    }
    
    try:
        google_api_key = get_google_api_key()
        llm = ChatGoogleGenerativeAI(model=settings.GENERATIVE_MODEL_NAME, google_api_key=google_api_key)
        components["llm"] = llm
    except Exception as e:
        logger.error(f"Error initializing LLM: {e}")
        return components
    
    try:
        pc = Pinecone(api_key=settings.PINECONE_API_KEY)
        pinecone_index = pc.Index(settings.PINECONE_INDEX_NAME)
        components["pinecone_index"] = pinecone_index
    except Exception as e:
        logger.warning(f"Error initializing Pinecone: {e}. RAG capabilities will be limited.")
    
    try:
        sql_tool = create_sql_query_tool()
        if sql_tool:
            components["tools"].append(sql_tool)
    except Exception as e:
        logger.error(f"Error creating SQL Tool: {e}")
    
    if components["pinecone_index"]:
        try:
            rag_chain = get_default_rag_chain()
            components["rag_chain"] = rag_chain
        except Exception as e:
            logger.error(f"Error initializing RAG Chain: {e}")
    
    if components["llm"] and components["tools"]:
        try:
            agent_executor = create_agent_executor(components["llm"], components["tools"])
            components["agent_executor"] = agent_executor
        except Exception as e:
            logger.error(f"Error creating Agent Executor: {e}")
    
    if components["llm"]:
        components["router"] = Router(llm=components["llm"])
    
    if (components["llm"] and 
        (components["agent_executor"] or components["rag_chain"]) and
        components["router"]):
        components["initialized"] = True
        logger.info("All components initialized successfully")
    else:
        logger.warning("Some components failed to initialize")
    
    return components

# --- Response Generation ---
def generate_response(query: str, components: Dict[str, Any], chat_history: List, session_id: str) -> str:
    """Generate a response using the appropriate component based on routing."""
    if not components["initialized"]:
        return "I'm sorry, but I couldn't initialize properly. Please check the logs for errors."
    
    try:
        target, params = components["router"].route(query, chat_history)
    except Exception as e:
        logger.error(f"Error during routing: {e}")
        return f"I encountered an error while processing your request: {str(e)}"
    
    try:
        if target == RoutingTarget.RAG and components["rag_chain"]:
            rag_filter = {"source_type": {"$exists": True}}
            rag_namespace = "rag_test_data"
            
            rag_config = {
                "configurable": {
                    "retriever_kwargs": {
                        "filter": rag_filter,
                        "namespace": rag_namespace
                    }
                }
            }
            
            return components["rag_chain"].invoke(
                {"question": query, "chat_history": chat_history},
                config=rag_config
            )
            
        elif target == RoutingTarget.TOOL and components["agent_executor"]:
            agent_result = components["agent_executor"].invoke({
                "input": query,
                "chat_history": chat_history
            })
            return agent_result["output"]
            
        else:
            messages = [
                ("system", "You are a helpful assistant."),
                *[(msg.type, msg.content) for msg in chat_history if hasattr(msg, 'type')],
                ("human", query)
            ]
            prompt = ChatPromptTemplate.from_messages(messages)
            result = components["llm"].invoke(prompt.format_messages())
            return result.content
            
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        return f"I'm sorry, I encountered an error while generating a response: {str(e)}"

# --- Main Execution ---
if __name__ == "__main__":
    print("Initializing ChatSphere Agent (Phase 4 - Autonomous Agent Core)...")
    
    # Initialize components
    components = initialize_components()
    
    if not components["initialized"]:
        print("Critical components failed to initialize. Check the logs for details.")
        sys.exit(1)
    
    # --- Main Loop ---
    print("Agent ready. Type 'exit' to quit.")
    print("-----------------------------------------")
    chat_history = []
    session_id = f"chat_session_{int(time.time())}"  # Generate session ID based on time
    
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Exiting chat.")
            break
            
        # Add user input to Pinecone (if initialized)
        if components["pinecone_index"]:
            try:
                add_conversation_turn(text=user_input, role="user", session_id=session_id)
                logger.info(f"Added user input to conversation history in Pinecone (session: {session_id})")
            except Exception as e:
                logger.error(f"Error adding user input to Pinecone: {e}")
        
        # Generate response
        agent_response_text = generate_response(
            user_input, 
            components, 
            chat_history, 
            session_id
        )
        
        print(f"Agent: {agent_response_text}")
        
        # Add interaction to chat history for context
        chat_history.append(HumanMessage(content=user_input))
        chat_history.append(AIMessage(content=agent_response_text))
        # Keep history reasonable length
        if len(chat_history) > 10: 
            chat_history = chat_history[-10:]
        
        # Add agent response to Pinecone (if initialized)
        if components["pinecone_index"]:
            try:
                add_conversation_turn(text=agent_response_text, role="agent", session_id=session_id)
                logger.info(f"Added agent response to conversation history in Pinecone (session: {session_id})")
            except Exception as e:
                logger.error(f"Error adding agent response to Pinecone: {e}")
        
        print("-----------------------------------------") 