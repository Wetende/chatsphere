# Phase 4 PRD — Chatbase Parity (Non‑AI Backend Features)

Reference product: features inspired by Chatbase [https://www.chatbase.co/](https://www.chatbase.co/).

## Overview
Phase 4 delivers non‑AI backend features to bring KyroChat closer to Chatbase parity while preserving our onion architecture. This PRD defines scope, user stories, functional requirements, high‑level API (GET/POST only), data model outline, security/compliance, acceptance criteria, and implementation notes. It builds on existing foundation (auth, bots, conversations, documents, analytics stubs, DI, routers, middleware) without changing AI generation.

## Goals
- Multi‑tenant organizations with role‑based access control (RBAC)
- API keys and scoped access per user/bot with audit trail
- Production‑grade rate limiting and usage quotas (Redis‑backed)
- Actions framework (configurable actions, secure execution, audit)
- Integrations/Connectors registry (generic HTTP + inbound/outbound webhooks)
- Smart escalation to human (ticketing) with channels (email/webhook)
- Expanded analytics (time windows, breakdowns, KPIs)
- Activity/Audit log for compliance
- Message‑level feedback and QA signals
- Widget/whitelabel configuration management
- Sources and data‑sync scaffolding (URLs, documents, webhooks) without embeddings
- Export/compliance utilities (data export, retention policies)
- Observability and readiness endpoints (DB + Redis)

## Non‑Goals
- AI model selection, embeddings, retrieval or vector DB (handled in separate phases)
- Full helpdesk UI; this focuses on backend APIs and contracts

## User Stories
- As an org owner, I manage members and roles so data is scoped to my org.
- As a developer, I issue/revoke API keys to integrate bots with my systems.
- As a platform admin, I enforce per‑org and per‑bot rate limits and daily quotas.
- As a bot owner, I configure safe actions the bot can invoke with parameters.
- As a developer, I configure integrations (HTTP/webhooks) and test connectivity.
- As a support agent, I receive escalations when the bot cannot resolve an issue.
- As a business user, I view KPIs and trends for bot usage and escalations.
- As a security lead, I audit key issuance, action runs, and permission changes.
- As an end user, I can rate and provide feedback on bot responses.
- As a brand owner, I configure whitelabel widget defaults per org and per bot.
- As a data owner, I register sources (URLs/docs), kick off syncs, and monitor status.
- As a compliance officer, I export conversation and document data and enforce retention.
- As an SRE, I rely on health/ready endpoints and structured metrics.

## Functional Requirements

### 1) Organizations & RBAC
- Entities: Organization, Membership (user_id, org_id, role), Role (owner/admin/agent/viewer)
- Scope: Bots, Conversations, Actions, Integrations, Analytics, Sources belong to an org
- Policies: Owner/admin manage org; agent operates bots; viewer read‑only
- Enforcement: Central authorization service; all routers enforce policy

### 2) API Keys & Scopes
- Entities: ApiKey (hashed secret, name, owner user_id, org_id, optional bot_id, scopes, expires_at, last_used_at)
- Lifecycle: Issue, list, rotate, revoke; server never returns raw secret after creation
- Scopes: read:bots, write:bots, run:actions, read:analytics, admin:org
- Storage: Hash (strong KDF); show prefix + last 4 only

### 3) Rate Limiting & Quotas
- Redis‑backed middleware (per user/org/bot) using windowed counters
- Quotas: daily ceilings per org and per bot; warnings and hard blocks
- Config from settings; observability counters; 429 responses include metadata

### 4) Actions Framework
- Entities: Action (type, name, param_schema, allowed_bots, org_id), ActionRun (status, input, output, error, latency_ms)
- Types: HTTP webhook, email (via existing SMTP), internal ops (future)
- Security: per‑action allowlist; param validation; masked secrets; audit runs

### 5) Integrations/Connectors Registry
- Entities: Integration (kind, credentials_ref, status), Connection, WebhookEndpoint (slug, secret)
- Generic HTTP connector (API key or basic); health checks; test endpoint
- Inbound webhooks: signed secret verification; event ingestion

### 6) Smart Escalation (Ticketing)
- Entities: Ticket (org_id, bot_id, status, priority, channel, assignee_id, transcript_ref)
- Create manually (initial); deliver via email/webhook; audit lifecycle

### 7) Analytics Expansion
- Metrics: conversations/day, resolution rate, escalations, avg messages, uploads, ratings
- Windows: today, 7/30/90 days; breakdown by bot/org
- Storage: SQL aggregations and views later if needed

### 8) Activity/Audit Log
- Entities: AuditEvent (who, what, when, where, context)
- Events: auth, key issued/revoked, action run, escalation created, policy change, widget update
- Redact secrets; filter by org/bot/user/time

### 9) Message Feedback & QA
- Use MessageModel fields (is_helpful, user_feedback); endpoints to submit/update/list feedback

### 10) Widget & Whitelabel
- Org‑level defaults; bot‑level overrides; domain allowlist; whitelabel flags
- Preview endpoint; enforce allowed domains for embed config

### 11) Sources & Data Sync (Non‑AI)
- Entities: Source (type=URL|DOC|WEBHOOK), SyncJob (source_id, status, stats)
- Use DocumentProcessorService and WebScraperService; no embeddings

### 12) Export & Compliance
- Export conversations/doc metadata/activity logs as JSON/CSV; signed URLs for download
- Retention policies: soft delete windows per org; purge jobs

### 13) Observability & Health
- Readiness endpoint checks DB and Redis; counters for rate‑limit blocks and errors

## API (GET/POST Only)
- Organizations & RBAC: GET /orgs, GET /orgs/{id}, POST /orgs/{id}/members
- API Keys: POST /auth/api-keys, GET /auth/api-keys, GET /auth/api-keys/delete/{id}
- Rate Limits: GET /limits (self usage)
- Actions: POST /actions, GET /actions, GET /actions/{id}, POST /actions/test, POST /actions/run
- Integrations: POST /integrations, GET /integrations, GET /integrations/{id}, POST /integrations/{id}/test, POST /webhooks/{slug}
- Escalations: POST /escalations, GET /escalations, GET /escalations/{id}, POST /escalations/{id}
- Analytics: GET /analytics/overview?days=7, GET /analytics/bot/{bot_id}?days=7
- Activity/Audit: GET /activity?since=...&event=...
- Feedback: POST /conversations/{id}/messages/{message_id}/feedback, GET /conversations/{id}/messages/{message_id}/feedback
- Widget/Whitelabel: GET /widgets, POST /widgets, GET /widgets/preview/{bot_id}
- Sources/Sync: POST /sources, GET /sources, GET /sources/{id}, POST /sources/{id}/sync, GET /sources/{id}/status
- Export: POST /export, GET /export/{job_id}
- Observability: GET /health/ready

## Data Model (High‑Level)
- Organization( id, name, created_at )
- Membership( id, org_id, user_id, role, created_at )
- ApiKey( id, org_id, user_id, bot_id?, name, hashed_secret, scopes[], expires_at?, last_used_at )
- Action( id, org_id, type, name, param_schema, allowed_bots[], created_at, updated_at )
- ActionRun( id, action_id, status, input, output, error, latency_ms, created_at )
- Integration( id, org_id, kind, credentials_ref, status, created_at )
- WebhookEndpoint( id, org_id, slug, secret, created_at )
- Ticket( id, org_id, bot_id, status, priority, assignee_id?, channel, transcript_ref, created_at, updated_at )
- AuditEvent( id, org_id, user_id?, actor_type, event_type, resource, resource_id, metadata, created_at )
- Source( id, org_id, type, url_or_path, status, last_synced_at, error )
- SyncJob( id, source_id, started_at, completed_at?, status, stats, error )

## Security & Compliance
- RBAC via central policy; default‑deny
- API keys: show once on creation; hashed at rest; scope checks; audit usage
- Webhook verification with HMAC and timestamp tolerance
- Secrets redacted from logs and audit
- Quotas and rate limits per org/bot/user
- GDPR support: export endpoints, soft‑delete windows, purge tasks

## Performance & Error Handling
- Redis for rate‑limit counters and hot lookups
- Paginated endpoints with safe limits and indexes
- Consistent error envelope; 401/403/422/404/429 semantics

## Acceptance Criteria
- RBAC enforced across all protected routes; membership flows work
- API keys: issue/list/revoke, scope checks, audit entries
- Rate limiting: Redis‑backed buckets and quotas; 429 with metadata
- Actions: create/test/run with validation and auditing; allowlist honored
- Integrations: register/test; inbound webhooks verified and stored
- Escalations: ticket lifecycle; email/webhook dispatch; audited
- Analytics: overview and per‑bot windows with KPIs; performant queries
- Activity log: filterable by org/time/type; secrets redacted
- Feedback: endpoints working and persisted
- Widget: org defaults, domain allowlist, preview works
- Sources/Sync: register/sync/status flows without embeddings
- Export: jobs and downloads; PII‑safe handling
- Observability: readiness checks DB+Redis; counters logged

## Dependencies & Risks
- Requires Redis
- Multiple migrations; careful rollout and backfill
- Policy regressions risk; needs extensive integration tests

## Implementation Notes (Onion Architecture)
- Domain: entities/value objects (Organization, Membership, ApiKey, Action, Integration, WebhookEndpoint, Ticket, AuditEvent, Source, SyncJob)
- Application: use cases and DTOs (issue_api_key, revoke_api_key, create_action, run_action, create_escalation, list_analytics, etc.)
- Infrastructure: SQLAlchemy repositories, Redis adapters, SMTP/httpx clients, webhook verification helpers
- Presentation: FastAPI routers (GET/POST only), Pydantic models, middleware wiring
- DI: extend composition_root with factories/providers

## Implementation Prompt
Implement the above non‑AI features following onion architecture, FastAPI advanced patterns, and GET/POST‑only routing. Define pure domain entities and application use cases with DTOs; implement repositories and services in infrastructure; expose endpoints in presentation with proper validation, RBAC enforcement, and error handling.



