```mermaid
graph TD
    subgraph Ingestion Trigger Flow (e.g., File Upload)
        A[Frontend Request (POST /api/.../documents/)] --> B(Django API View: DocumentViewSet);
        B --> C(Models: Create Document Record - status: processing);
        C --> D(services.document_processor: Process File/Text);
        D --> E(services.document_processor: Chunk Text);
        E --> F(Models: Create Chunk Records - text only);
        F --> G(Models: Update Document Record - status: chunked);
        G --> H{Trigger Async Embedding Task - Celery};
        H --> I(Celery Task: Get Document/Chunks);
        I --> J(services.agent_client: Call Agent /embed_and_store);
        J --> K[Agent Service];
        K -- Response (Vector IDs / Error) --> J;
        J --> L{Handle Agent Response};
        L -- Success --> M(Models: Update Chunks w/ Vector IDs);
        M --> N(Models: Update Document - status: ready);
        L -- Failure --> O(Models: Update Document - status: error);
        O --> P(Log Error);
    end

    subgraph Chat Request Flow
        Q[Widget Request (POST /api/.../conversations/{id}/send_message/)] --> R(Django API View: ConversationViewSet);
        R --> S(Models: Save User Message);
        S --> T(Models: Get Conversation/Bot/History/Config);
        T --> U(services.agent_client: Call Agent /chat w/ Config);
        U --> V[Agent Service];
        V -- Response (Text + Metadata) --> U;
        U --> W{Handle Agent Response};
        W -- Success --> X(Models: Save Bot Message w/ Metadata);
        X --> Y(API View: Return Response Text);
        W -- Failure --> Z(Log Error);
        Z --> AA(API View: Return Error Response);
        Y --> BB[Widget Response];
        AA --> BB;
    end
``` 