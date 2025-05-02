import os
from operator import itemgetter
import logging

from langchain_core.prompts import ChatPromptTemplate, PromptTemplate, format_document, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda, RunnableParallel
from langchain_google_genai import ChatGoogleGenerativeAI
from pinecone import Pinecone
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Assuming retriever and config setup are handled elsewhere or passed in
# This is just defining the chain structure
from ..retrievers.unified_retriever import UnifiedPineconeRetriever
from ..config import settings # Import the settings instance

# Get logger
logger = logging.getLogger(__name__)

# Load configuration (ensure .env is accessible)
# config = load_config()
config = settings # Use the imported settings object

# --- Default Prompt Template --- 
# This combines the retrieved documents into a single string for the LLM context
DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="Context:\n{page_content}\nMetadata: {metadata}")

def _combine_documents(docs, document_separator="\n\n"):
    """Formats multiple documents into a string including metadata."""
    doc_strings = []
    for doc in docs:
        metadata_str = str(doc.metadata)
        doc_strings.append(f"Context:\n{doc.page_content}\nMetadata: {metadata_str}")
    
    return document_separator.join(doc_strings)

# --- RAG Prompt Template --- 
_template = """You are an AI assistant that answers questions based on the provided context and chat history.
You must only respond based on the context and history provided below. If the context doesn't contain the information needed to answer the question, 
you MUST say "I don't have information about that in my knowledge base" - do NOT try to make up an answer or use any prior knowledge.
Use the chat history to understand the context of the current question.

Chat History:
{chat_history}

Context:
{context}

Question: {question}

Answer:"""
# ANSWER_PROMPT = ChatPromptTemplate.from_template(_template) # Old way

# New prompt using MessagesPlaceholder for history
ANSWER_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """You are an AI assistant that answers questions based on the provided context and chat history.
You must only respond based on the context and history provided below. If the context doesn't contain the information needed to answer the question, 
you MUST say "I don't have information about that in my knowledge base" - do NOT try to make up an answer or use any prior knowledge.
Use the chat history to understand the context of the current question."""),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", """Context:
{context}

Question: {question}

Answer:""")
])

# Custom wrapper to debug retriever invocation
def _debug_retriever_wrapper(retriever):
    """Wraps the retriever to add debugging."""
    # Check if the retriever has an invoke method or property
    if hasattr(retriever, 'invoke'):
        # If it's a property that returns a callable
        if isinstance(retriever.invoke, property):
            original_invoke_getter = retriever.__class__.invoke.fget
            
            def debug_invoke_getter(self):
                original_invoke_callable = original_invoke_getter(self)
                
                def debug_invoke_wrapper(query, **kwargs):
                    logger.info(f"Retriever invoke property called with query: {query}")
                    logger.info(f"Retriever invoke kwargs: {kwargs}")
                    try:
                        result = original_invoke_callable(query, **kwargs)
                        logger.info(f"Retriever returned {len(result)} documents")
                        return result
                    except Exception as e:
                        logger.error(f"Error in retriever invoke: {e}", exc_info=True)
                        raise
                
                return debug_invoke_wrapper
            
            # Replace the property with our debug version
            setattr(retriever.__class__, 'invoke', property(debug_invoke_getter))
        
        # If it's a callable method
        elif callable(retriever.invoke):
            original_invoke = retriever.invoke
            
            def debug_invoke(query, **kwargs):
                logger.info(f"Retriever invoke method called with query: {query}")
                logger.info(f"Retriever invoke kwargs: {kwargs}")
                result = original_invoke(query, **kwargs)
                logger.info(f"Retriever returned {len(result)} documents")
                return result
            
            retriever.invoke = debug_invoke
    
    return retriever

# --- RAG Chain Definition --- 
def create_rag_chain(retriever, llm):
    """Creates the RAG chain using LCEL, incorporating chat history."""
    # Function to retrieve context based on the question
    def retrieve_context(inputs, config=None):
        question = inputs.get("question", "")
        if not question:
            logger.warning("No question provided to retrieve_context function")
            return []
        
        retriever_kwargs = {}
        if config and "configurable" in config:
            retriever_kwargs = config.get("configurable", {}).get("retriever_kwargs", {})
        
        try:
            docs = retriever.get_relevant_documents(question, **retriever_kwargs)
            return docs
        except Exception as e:
            logger.error(f"Error in retrieval: {e}", exc_info=True)
            return []
    
    # Prepare the input for the RAG chain
    # We need question, context (from retriever), and chat_history (passed through)
    rag_chain_input = RunnableParallel(
        context=RunnableLambda(retrieve_context) | RunnableLambda(_combine_documents),
        question=RunnablePassthrough(), # Pass the original input dict through
        chat_history=RunnablePassthrough() # Pass the original input dict through
    ).assign(
        # Extract only the needed keys for the final prompt
        question=lambda x: x['question']['question'], 
        chat_history=lambda x: x['chat_history']['chat_history']
    )

    # Combine components into the final RAG chain
    rag_chain = (
        rag_chain_input 
        | ANSWER_PROMPT
        | llm
        | StrOutputParser()
    )
    
    return rag_chain

# --- Example Instantiation (for illustration/potential direct use) --- 
def get_default_rag_chain():
    """Helper function to create a RAG chain with default settings from config."""
    if not config.PINECONE_API_KEY or not config.PINECONE_INDEX_NAME or not config.GOOGLE_API_KEY:
        raise ValueError("Missing required API keys or index name in configuration.")

    pc = Pinecone(api_key=config.PINECONE_API_KEY)
    pinecone_index = pc.Index(config.PINECONE_INDEX_NAME)
    embeddings = GoogleGenerativeAIEmbeddings(
        model=config.EMBEDDING_MODEL_NAME, 
        google_api_key=config.GOOGLE_API_KEY
    )
    llm = ChatGoogleGenerativeAI(
        model=settings.GENERATIVE_MODEL_NAME,
        google_api_key=config.GOOGLE_API_KEY,
        temperature=0.7
    )

    retriever = UnifiedPineconeRetriever(
        index=pinecone_index,
        embeddings=embeddings,
        search_k=settings.RETRIEVER_SEARCH_K,
        text_key="text",
        score_threshold=0.3
    )

    return create_rag_chain(retriever=retriever, llm=llm)

# Example of how to potentially invoke the chain:
# if __name__ == "__main__":
#     rag_chain = get_default_rag_chain()
#     
#     # Example query (requires data in Pinecone)
#     question = "What is love based on the provided article?"
#     
#     # Invoke requires a dictionary with the 'question' key
#     # If the retriever needs specific namespace/filter, they'd be passed during invoke
#     # E.g., rag_chain.invoke({"question": question}, config={"metadata": {"namespace": "ingestion-test-web-love"}})
#     # The exact invoke mechanism depends on how retriever handles runtime args

#     try:
#         answer = rag_chain.invoke({"question": question})
#         print("Question:", question)
#         print("\nAnswer:", answer)
#     except Exception as e:
#         print(f"Error invoking RAG chain: {e}") 