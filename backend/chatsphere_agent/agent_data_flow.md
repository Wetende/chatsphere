```mermaid
graph TD
    subgraph Ingestion Flow
        A[Django Backend Request (POST /embed_and_store)] --> B(Routing: Validate Request);
        B --> C(ingestion.core: Parse/Load Data);
        C --> D(ingestion.chunkers: Chunk Text);
        D --> E(ingestion.vectorization: Generate Embeddings - Google AI);
        E --> F(ingestion.vectorization: Prepare Vectors + Metadata);
        F --> G(ingestion.vectorization: Upload to Pinecone);
        G --> H(Routing: Format Success/Error Response w/ Vector IDs);
        H --> I[Django Backend Response];
    end

    subgraph Chat Flow
        J[Django Backend Request (POST /chat w/ Query, History, Config)] --> K(Routing: Validate Request);
        K --> L(vector_store: Embed Query - Google AI);
        L --> M(vector_store: Query Pinecone w/ Namespace/Filter);
        M --> N(agent: Retrieve Relevant Text Chunks);
        N --> O(agent: Get LLM Instance w/ Config);
        O --> P(agent: Build Prompt w/ Context, History, Query);
        P --> Q(agent: Invoke LLM - Google Gemini);
        Q --> R(agent: Extract Response Text & Metadata - Tokens/Sources);
        R --> S(Routing: Format Success/Error Response);
        S --> T[Django Backend Response];
    end

``` 