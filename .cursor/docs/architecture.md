# Technical Architecture Document

## Overview

This document outlines the full technical architecture for the Lufy platform, incorporating recent updates and best practices to ensure scalability, security, and maintainability. The architecture emphasizes explicit analytics handling, robust background job processing, strict rate limiting, secure authentication, and efficient media delivery.

## Technology Stack

- **Frontend:** React with Next.js (app directory), TailwindCSS for styling, and PWA support with Workbox.
- **Backend:** Next.js API routes, Node.js runtime.
- **Database:** PostgreSQL with JSONB columns for analytics storage, Row-Level Security (RLS) policies enabled.
- **Cache & Queues:** Redis with BullMQ for background job processing.
- **Authentication:** Better Auth integrated with Resend for email services.
- **Storage:** AWS S3 for media and static assets.
- **Media Delivery:** HLS streaming via CloudFront private distributions with JWT token authentication.
- **Analytics:** Explicit sink storing JSONB events in Postgres, materialized views for dashboard metrics updated via BullMQ jobs.
- **Rate Limiting:** Implemented with @upstash/ratelimit/ioredis using Redis backend.

## API Design

The API routes are designed to support modular features and scale efficiently:

- `/api/auth/*` - Authentication endpoints using Better Auth.
- `/api/dashboard/*` - Dashboard data and metrics endpoints.
- `/api/music/upload/action.ts` - Music upload actions and processing.
- `/api/analytics/*` - Analytics event ingestion and querying.
- `/api/rate-limit/*` - Rate limiting checks and status.
- Additional routes follow RESTful conventions and are protected with authentication and rate limiting middleware.

## Module Architectures

### Analytics

- Events are ingested via API routes and stored explicitly in PostgreSQL JSONB columns.
- Materialized views are created to aggregate and summarize analytics data for dashboard snapshots.
- BullMQ background jobs are scheduled to refresh materialized views periodically, ensuring up-to-date metrics.

### Background Jobs

- Redis is used as the message broker with BullMQ managing job queues.
- Queues are explicitly named, e.g., `analytics-refresh`, `email-send`, `media-processing`.
- Jobs include analytics materialized view refresh, email notifications via Resend, and media transcoding.
- Worker processes consume jobs asynchronously to offload heavy processing from the request cycle.

### Rate Limiting

- Implemented using the `@upstash/ratelimit/ioredis` package connected to Redis.
- Thresholds are defined per route and user type (e.g., 100 requests per minute for authenticated users, 20 for guests).
- Rate limiting middleware is applied globally to protect API endpoints from abuse.

### Authentication

- Better Auth is the chosen authentication library, integrated with Resend for email-based flows.
- Authentication tokens are securely managed and verified on API routes.
- Session management leverages JWT tokens with appropriate claims.

### Database and Security

- PostgreSQL is configured with Row-Level Security (RLS) policies.
- Example RLS policy enforcing user-based access:

  ```sql
  CREATE POLICY "Users can access their own records" ON music_tracks
  USING (user_id = current_setting('app.current_user_id')::uuid);
  ```

- Session variables are set at connection time to enforce RLS policies.
- Environment variable `DATABASE_URL` is used for secure database connection configuration.

### PWA and Offline Support

- The frontend is a Progressive Web App with an offline shell implemented using Workbox.
- Service workers cache essential assets and API responses to enable offline usage and fast loading.
- Workbox strategies include stale-while-revalidate for API data and cache-first for static assets.

### Media Delivery

- HLS streams are secured using JWT tokens signed with HS256.
- JWT claims include user ID, stream ID, and expiration.
- CloudFront private distributions serve media content, validating JWT tokens on edge.
- Tokens are generated server-side with secret keys stored securely in environment variables.

## Environment Variables

The following environment variables are defined and used across the system:

- `DATABASE_URL` - PostgreSQL connection string.
- `REDIS_URL` - Redis connection string.
- `ANALYTICS_SAMPLE_RATE` - Sampling rate for analytics event ingestion.
- `S3_BUCKET_NAME` - AWS S3 bucket for media storage.
- `STRIPE_SECRET_KEY` - Stripe API key for payments.
- `APP_URL` - Base URL for the application.
- `JWT_SECRET` - Secret key for signing JWT tokens.
- `CLOUDFRONT_PRIVATE_KEY` - Private key for CloudFront signed URLs.

## Security

- All API routes are protected with authentication and rate limiting middleware.
- RLS policies enforce data access restrictions at the database level.
- JWT tokens secure media streaming and user sessions.
- Environment secrets are managed securely using encrypted storage and CI/CD secrets management.

## Development Workflow

- Code is organized with clear separation between frontend and backend modules.
- Background jobs are developed as separate worker processes consuming BullMQ queues.
- Testing includes unit, integration, and end-to-end tests with mock Redis and Postgres instances.
- Continuous Integration pipelines validate code quality, run tests, and deploy to staging and production.
- Monitoring includes logging of background jobs, API request metrics, and analytics ingestion rates.

---

This architecture ensures a robust, scalable, and secure platform aligned with the product requirements and milestone deliverables.
