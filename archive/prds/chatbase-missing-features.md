# Plan — Chatbase Parity Missing Features (Non‑AI)

This plan sequences non‑AI backend features (inspired by https://www.chatbase.co/) to extend the current KyroChat backend. It aligns with onion architecture and FastAPI advanced practices, using GET/POST‑only routing.

## Current Backend (Summary)
- FastAPI app with lifespan, CORS, routers, middleware; DI via composition_root
- Auth, users, bots, conversations, documents, analytics (basic), widget, import/export, websocket
- SQLAlchemy async models and repositories; Unit of Work
- External services: JWT auth, bcrypt, SMTP email, analytics service, webhook service, document processor; Gemini stub
- Middleware: auth/error/logging/localization; rate limit is stubbed

## Principles
- Onion architecture separation and dependency rules
- DTOs for all use cases; Pydantic models at presentation
- Async SQLAlchemy; transactions per use case
- Consistent error envelope; OpenAPI‑first DX
- GET/POST‑only routing; id=0 create, id>0 update/retrieve; GET for deletes (project constraint)

## Phase A — Foundations: Redis, Rate Limiting, Audit Log, API Keys
Objectives: production rate limiting/quotas, auditable API keys, baseline audit log.

- Domain
  - Entities: ApiKey, AuditEvent
  - Value objects: KeyScope, HashedSecret
- Application
  - Use cases: issue_api_key, list_api_keys, revoke_api_key; record_audit_event
  - DTOs: ApiKeyIssueRequest/Response, ApiKeyListResponse, ApiKeyRevokeResponse
- Infrastructure
  - Redis client provider in composition_root; rate limit adapter
  - ApiKeyRepository (SQLAlchemy, hashed secrets)
  - AuditEventRepository; structured logging sink
  - RateLimitingMiddleware (replace stub) using Redis buckets per user/org/bot
- Presentation
  - Router: /auth/api-keys (POST create, GET list, GET delete/{id})
  - Router: /limits (GET) for self usage view
  - Wire middleware; enrich error responses with rate‑limit metadata
- Migrations
  - Tables: api_keys, audit_events; indexes on org_id, user_id, created_at
- Tests
  - Unit tests for key hashing and scope checking
  - Integration tests for issuance/list/revoke; 429 behavior; audit logging

## Phase B — Organizations & RBAC (Multi‑Tenant)
Objectives: org scoping and role enforcement everywhere.

- Domain
  - Entities: Organization, Membership, Role
  - Policy service: authorize(resource, action, actor, org)
- Application
  - Use cases: create_org, invite_member, update_member_role, list_orgs
- Infrastructure
  - Repositories: OrganizationRepository, MembershipRepository
  - Policy adapter using repositories
- Presentation
  - Router: /orgs (GET list mine), /orgs/{id} (GET details), /orgs/{id}/members (POST add/update)
  - Inject policy checks into existing routers (bots, conversations, analytics)
- Migrations
  - Tables: organizations, memberships; add org_id to bots, conversations, actions, etc.
- Tests
  - Policy tests; endpoint authorization tests

## Phase C — Actions Framework
Objectives: configurable actions with secure execution and audit.

- Domain
  - Entities: Action, ActionRun; enums for type and status
  - Validation of param schema and allowlisted bots
- Application
  - Use cases: create_action, list_actions, get_action, test_action, run_action
- Infrastructure
  - Repos: ActionRepository, ActionRunRepository
  - Services: HttpActionExecutor (httpx), EmailActionExecutor (SMTP)
- Presentation
  - Router: /actions (POST upsert, GET list, GET {id})
  - Router: /actions/test (POST), /actions/run (POST)
  - Audit all runs
- Migrations
  - Tables: actions, action_runs
- Tests
  - Param validation; execution happy‑path and error‑path; audit entries

## Phase D — Integrations Registry + Inbound Webhooks
Objectives: generic connectors and inbound webhook ingestion.

- Domain
  - Entities: Integration, WebhookEndpoint
- Application
  - Use cases: register_integration, test_integration, register_webhook, verify_webhook_event
- Infrastructure
  - Repos: IntegrationRepository, WebhookEndpointRepository
  - Services: Connector (generic HTTP), WebhookVerifier (HMAC + timestamp)
- Presentation
  - Router: /integrations (POST, GET, GET {id}, POST {id}/test)
  - Public: /webhooks/{slug} (POST) with signature verification
- Migrations
  - Tables: integrations, webhook_endpoints
- Tests
  - Signature verification; connector tests; permissions

## Phase E — Smart Escalations (Ticketing)
Objectives: create and manage human escalation tickets.

- Domain
  - Entity: Ticket; status state machine (open, assigned, resolved, closed)
- Application
  - Use cases: create_ticket, list_tickets, get_ticket, update_ticket
- Infrastructure
  - Repos: TicketRepository
  - Services: EscalationNotifier (email/webhook)
- Presentation
  - Router: /escalations (POST create, GET list, GET {id}, POST {id} update)
- Migrations
  - Table: tickets
- Tests
  - Lifecycle, notifications, auditing

## Phase F — Analytics Expansion
Objectives: KPI windows and breakdowns by bot and org.

- Domain
  - KPIs defined; DTOs for windows and breakdowns
- Application
  - Use cases: get_overview_analytics, get_bot_analytics_window
- Infrastructure
  - SQL queries; optional materialized views later
- Presentation
  - Router: /analytics/overview?days=7, /analytics/bot/{bot_id}?days=7
- Tests
  - Aggregations correctness; performance limits

## Phase G — Activity/Audit Log
Objectives: immutable, filterable activity feed.

- Domain
  - Entity: AuditEvent; redaction rules
- Application
  - Use cases: list_activity
- Infrastructure
  - Repo: AuditEventRepository
- Presentation
  - Router: /activity (GET list with filters)
- Tests
  - Redaction and filtering

## Phase H — Message Feedback & QA Endpoints
Objectives: expose endpoints to record and view message feedback.

- Presentation
  - Router: /conversations/{id}/messages/{message_id}/feedback (POST, GET)
- Tests
  - Validation and persistence; analytics linkage

## Phase I — Widget & Whitelabel Management
Objectives: org defaults, domain allowlist, preview.

- Domain
  - Entity: WidgetConfig (org‑level), overrides at bot‑level
- Application
  - Use cases: update_widget_defaults, get_widget_defaults
- Infrastructure
  - Repos: WidgetConfigRepository
- Presentation
  - Router: /widgets (GET, POST), /widgets/preview/{bot_id} (GET)
- Migrations
  - Table: widget_configs; add fields to bots if needed
- Tests
  - Domain allowlist enforcement; preview responses

## Phase J — Sources & Data Sync (Non‑AI)
Objectives: register sources (URL/DOC/WEBHOOK) and run sync jobs.

- Domain
  - Entities: Source, SyncJob; enums for type and status
- Application
  - Use cases: register_source, list_sources, get_source, start_sync, get_sync_status
- Infrastructure
  - Repos: SourceRepository, SyncJobRepository
  - Services: WebScraperService (existing), DocumentProcessorService (existing)
- Presentation
  - Router: /sources (POST, GET), /sources/{id} (GET), /sources/{id}/sync (POST), /sources/{id}/status (GET)
- Migrations
  - Tables: sources, sync_jobs
- Tests
  - Sync flows and status handling

## Phase K — Export & Compliance
Objectives: data export jobs and retention policies.

- Domain
  - Entities: ExportJob; RetentionPolicy
- Application
  - Use cases: start_export, get_export_status
- Infrastructure
  - Repo: ExportJobRepository; SignedURL service (local)
- Presentation
  - Router: /export (POST), /export/{job_id} (GET)
- Migrations
  - Table: export_jobs
- Tests
  - PII safety; job lifecycle

## Phase L — Observability & Readiness
Objectives: readiness checks and metrics counters.

- Presentation
  - Router: /health/ready (GET) validating DB and Redis
- Infrastructure
  - Health checker services; counters in logs for rate‑limit blocks and errors
- Tests
  - Simulated outages; proper status codes

## Cross‑Cutting Tasks (per phase)
- Extend composition_root with new factories/providers (repos, services)
- Add Pydantic request/response models in presentation layer
- Alembic migrations with repeatable scripts; rollback strategy
- Consistent error responses; add OpenAPI docs and examples
- Integration tests for routers; unit tests for use cases and services
- Security reviews for API keys, webhooks, and secrets handling

## Rollout & Sequencing
1) Phase A (Foundations) → 2) Phase B (RBAC) → 3) Phase C (Actions) → 4) Phase D (Integrations) → 5) Phase E (Escalations) → 6) Phase F (Analytics) → 7) Phase G (Activity) → 8) Phase H (Feedback) → 9) Phase I (Widget) → 10) Phase J (Sources) → 11) Phase K (Export) → 12) Phase L (Observability)

## Risks & Mitigations
- Data model churn: incremental migrations, feature flags
- Policy regression: add policy integration tests across routers
- Rate‑limit accuracy: validate Redis clock drift and windowing
- Webhook security: strict signature verification and short tolerance windows

## Definition of Done (per phase)
- Migrations applied and reversible
- Use cases covered by unit tests (happy/error paths)
- Routers covered by integration tests with auth and policy
- OpenAPI endpoints documented with examples
- Lints and type checks pass; no new critical issues



