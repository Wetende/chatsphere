# Sub-PRD: Admin Order Management API

## Overview
This sub-PRD outlines FastAPI endpoints for admins to manage orders, allowing listing, updating status, and cancellation.

## Functional Requirements
- Provide **GET, PATCH, and DELETE** endpoints.
- DELETE sets status to `cancelled`.
- Require `manage_orders` permission.

## Acceptance Criteria
- Routes in `api/routers/admin_orders.py` with endpoints `/api/v1/admin/orders` and `/api/v1/admin/orders/{order_id}`.
- Use async SQLAlchemy transactions.

## Technical Specifications
- Ensure atomic updates with `async_session.begin()`.
- Dependencies: FastAPI, fastapi-users.

## AI Coding Prompt
Generate routes accordingly.