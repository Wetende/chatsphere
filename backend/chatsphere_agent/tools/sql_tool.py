from langchain_community.utilities import SQLDatabase
from langchain.tools import Tool
from ..config import get_database_uri
import sqlalchemy.exc
import re

_db = None

def get_sql_database_connection():
    """Initializes and returns the SQLDatabase singleton."""
    global _db
    if _db is None:
        try:
            uri = get_database_uri()
            _db = SQLDatabase.from_uri(
                uri,
                # Include specific tables if you want to limit the agent's access
                # include_tables=['users', 'user_preferences'],
                # Sample rows are helpful for the LLM to understand table structure
                sample_rows_in_table_info=3
            )
            print("SQLDatabase connection initialized.")
        except ImportError:
            error_msg = "Required database package not installed. Please install psycopg2-binary."
            print(error_msg)
            raise ImportError(error_msg)
        except ValueError as e:
            error_msg = f"Error getting database URI (check .env): {e}"
            print(error_msg)
            raise ValueError(error_msg)
        except Exception as e:
            error_msg = f"Error connecting to database: {e}"
            print(error_msg)
            raise ConnectionError(error_msg)
    return _db

def execute_sql_query(query: str) -> str:
    """
    Executes an SQL query with comprehensive error handling.
    
    Args:
        query: The SQL query to execute
        
    Returns:
        The query results as a string, or an error message
    """
    try:
        # Validate query for basic safety
        if not is_safe_query(query):
            return "ERROR: This query contains potentially unsafe operations. Only SELECT queries on the users and user_preferences tables are allowed."
        
        db = get_sql_database_connection()
        results = db.run(query)
        
        # Handle empty results more gracefully
        if not results or results.strip() == "":
            # Try to extract what the query was looking for
            match = re.search(r'SELECT .+ FROM .+ WHERE .+ = [\'"]?([^\'"]+)[\'"]?', query)
            entity = match.group(1) if match else "the requested information"
            return f"No results found for {entity}. The information may not exist in the database."
        
        return results
    
    except ConnectionError as e:
        return f"ERROR: Database connection failed. Please check the database configuration. Details: {str(e)}"
    
    except sqlalchemy.exc.SQLAlchemyError as e:
        # Handle SQLAlchemy specific errors
        error_msg = str(e)
        
        if "syntax error" in error_msg.lower():
            return f"ERROR: SQL syntax error in your query. Please check the query format. Details: {error_msg}"
        elif "does not exist" in error_msg.lower() and "relation" in error_msg.lower():
            return "ERROR: The requested table does not exist. Only 'users' and 'user_preferences' tables are available."
        elif "permission denied" in error_msg.lower():
            return "ERROR: Permission denied for this database operation."
        else:
            return f"ERROR: Database query failed. Details: {error_msg}"
    
    except Exception as e:
        return f"ERROR: An unexpected error occurred while executing the query. Details: {str(e)}"

def is_safe_query(query: str) -> bool:
    """
    Basic validation to ensure the query is safe.
    
    Args:
        query: The SQL query to validate
        
    Returns:
        True if the query appears safe, False otherwise
    """
    query = query.strip().lower()
    
    # Only allow SELECT statements
    if not query.startswith("select "):
        return False
    
    # Block potentially dangerous operations
    dangerous_patterns = [
        r'\bdelete\b', r'\bdrop\b', r'\bcreate\b', r'\balter\b', r'\bupdate\b', 
        r'\binsert\b', r'\bexec\b', r'\bexecute\b', r';.*select'
    ]
    
    for pattern in dangerous_patterns:
        if re.search(pattern, query):
            return False
    
    # Only allow access to specific tables
    allowed_tables = ['users', 'user_preferences']
    tables_in_query = re.findall(r'from\s+([a-zA-Z0-9_]+)', query)
    
    for table in tables_in_query:
        if table.lower() not in allowed_tables:
            return False
    
    return True

def create_sql_query_tool():
    """Creates a LangChain tool for querying the SQL database."""
    try:
        # We don't immediately connect, connection happens at query time
        return Tool.from_function(
            func=execute_sql_query,
            name="sql_database_query",
            description="""
            Input to this tool is a detailed and correct SQL query, output is a result from the database.
            If the query is not correct, an error message will be returned.
            Only use tables named users, user_preferences.
            Use this tool to answer questions about user preferences, user settings, or specific user data stored in the database.
            Example Input: SELECT value FROM user_preferences WHERE user_id = 'user123' AND key = 'favorite_color';
            """
        )
    except Exception as e:
        print(f"Failed to create SQL query tool: {e}")
        return None

# Optional: Tool for listing tables (can be useful for the agent)
# def create_sql_list_tables_tool():
#     try:
#         db = get_sql_database_connection()
#         return Tool.from_function(
#             func=lambda _: db.get_usable_table_names(),
#             name="sql_database_list_tables",
#             description="Input is an empty string, output is a comma separated list of tables in the database. Use this to see what tables are available."
#         )
#     except Exception as e:
#         print(f"Failed to create SQL list tables tool: {e}")
#         return None

# --- Test --- #
if __name__ == '__main__':
    print("Testing SQL Tool creation...")
    # Ensure DB details are in .env and the database/tables exist
    tool = create_sql_query_tool()
    if tool:
        print("SQL Query Tool created successfully.")
        print(f"Tool Name: {tool.name}")
        print(f"Tool Description: {tool.description}")
        # Example run (requires dummy data and correct connection)
        try:
            result = tool.run("SELECT value FROM user_preferences WHERE user_id = 'user123' AND key = 'favorite_color';")
            print(f"Test query result: {result}")
        except Exception as e:
            print(f"Test query failed: {e}")
    else:
        print("SQL Query Tool creation failed.") 