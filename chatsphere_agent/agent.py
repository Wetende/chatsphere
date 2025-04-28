import sys
import time
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import Tool
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.messages import AIMessage, HumanMessage

from config import get_google_api_key
from vector_store import add_conversation_turn, retrieve_relevant_context, get_pinecone_index
from tools.sql_tool import create_sql_query_tool # Import the SQL tool creator

# --- Agent Setup ---

def create_agent_executor(llm, tools):
    """Creates the LangChain agent executor."""
    # Define the prompt template
    # Includes history, input, and agent_scratchpad for tool use intermediate steps
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant. You have access to a database containing user preferences via the 'sql_database_query' tool. \
When a user asks about preferences for a specific person (e.g., 'What is Bob's favorite color?'), extract the person's identifier (e.g., 'Bob') directly from the user's input. \
Construct a complete SQL query using that identifier in the WHERE clause (e.g., `SELECT value FROM user_preferences WHERE user_id = 'Bob' AND key = 'favorite_color';`). \
Input the complete SQL query into the 'sql_database_query' tool. Do not ask the user for the ID separately if it's mentioned in their request. \
Only use tables 'users' and 'user_preferences'. Be conversational in your final response."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])

    # Create the agent using the LLM, tools, and prompt
    agent = create_tool_calling_agent(llm, tools, prompt)

    # Create the AgentExecutor
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    return agent_executor

# --- Main Execution ---
if __name__ == "__main__":
    print("Initializing ChatSphere Agent (Phase 3 - PostgreSQL Tool)...")

    # --- Initialize LLM ---
    try:
        google_api_key = get_google_api_key()
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=google_api_key)
    except ValueError as e:
        print(f"Error initializing LLM: {e}")
        print("Please ensure GOOGLE_API_KEY is set correctly in your .env file.")
        sys.exit(1) # Exit if LLM fails
    except Exception as e:
        print(f"Unexpected error initializing LLM: {e}")
        sys.exit(1)

    # --- Initialize Pinecone (Optional for this phase, but needed for indexing) ---
    pinecone_initialized = False
    try:
        pinecone_index = get_pinecone_index()
        if pinecone_index:
            pinecone_initialized = True
            print("Pinecone initialized successfully.")
        else:
            print("Continuing without Pinecone context storage.")
    except Exception as e:
        print(f"Error initializing Pinecone: {e}. Continuing without Pinecone context.")

    # --- Initialize Tools ---
    tools = []
    try:
        sql_tool = create_sql_query_tool()
        if sql_tool:
            tools.append(sql_tool)
            print("SQL Tool created successfully.")
        else:
            print("SQL Tool creation failed. Agent will not have DB access.")
    except Exception as e:
        print(f"Error creating SQL Tool (check DB connection & schema): {e}")
        # Decide whether to exit or continue without the tool
        # sys.exit(1)

    # TODO: Add Pinecone retriever as a tool in a later step if desired
    # Example: retriever_tool = create_pinecone_retriever_tool()
    # if retriever_tool: tools.append(retriever_tool)

    if not tools:
        print("No tools were successfully initialized. Agent may have limited functionality.")
        # Decide if tools are essential
        # sys.exit(1)

    # --- Create Agent Executor ---
    try:
        agent_executor = create_agent_executor(llm, tools)
        print("Agent Executor created successfully.")
    except Exception as e:
        print(f"Error creating Agent Executor: {e}")
        sys.exit(1)

    # --- Main Loop ---
    print("Agent ready. Type 'exit' to quit.")
    print("-----------------------------------------")
    chat_history = []
    session_id = "chat_session_001" # Example session ID

    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Exiting chat.")
            break

        # Add user input to Pinecone (if initialized)
        if pinecone_initialized:
            add_conversation_turn(text=user_input, role="user", session_id=session_id)

        try:
            # Invoke the agent executor
            response = agent_executor.invoke({
                "input": user_input,
                "chat_history": chat_history
            })

            agent_response_text = response['output']
            print(f"Agent: {agent_response_text}")

            # Add interaction to chat history for the agent
            chat_history.append(HumanMessage(content=user_input))
            chat_history.append(AIMessage(content=agent_response_text))
            # Keep history reasonable length (optional)
            if len(chat_history) > 10: chat_history = chat_history[-10:]

            # Add agent response to Pinecone (if initialized)
            if pinecone_initialized:
                add_conversation_turn(text=agent_response_text, role="agent", session_id=session_id)

        except Exception as e:
            print(f"An error occurred during agent execution: {e}")
            # Consider adding logic to reset history or inform user

        print("-----------------------------------------") 