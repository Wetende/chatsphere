from langchain_community.utilities import SQLDatabase
from langchain.tools import Tool
from config import get_database_uri

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
            raise ImportError(
                "psycopg2 not installed. Please install it: pip install psycopg2-binary"
            )
        except ValueError as e:
            print(f"Error getting DB URI (check .env): {e}")
            raise
        except Exception as e:
            print(f"Error connecting to SQLDatabase: {e}")
            raise # Re-raise to prevent agent from starting with bad DB connection
    return _db

def create_sql_query_tool():
    """Creates a LangChain tool for querying the SQL database."""
    try:
        db = get_sql_database_connection()
        return Tool.from_function(
            func=lambda query: db.run(query),
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
        # try:
        #     result = tool.run("SELECT value FROM user_preferences WHERE user_id = 'user123' AND key = 'favorite_color';")
        #     print(f"Test query result: {result}")
        # except Exception as e:
        #     print(f"Test query failed: {e}")
    else:
        print("SQL Query Tool creation failed.") 