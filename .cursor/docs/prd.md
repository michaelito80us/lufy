# Lufy — Product Requirements Document

## Overview

Lufy is a multi-tenant SaaS where each musician = one organization. Musicians register, select membership, and manage their own artist dashboard and mini-site. Fans interact only through per-artist mini-sites. Payments flow through Stripe with a platform fee.

## Users

 • Musician (Org owner): Registers, selects membership, manages catalogue, sharing, beats, merch, events, membership tiers, mini-site.
 • Fan (End-user): Visits mini-site, streams/purchases content, subscribes.
 • Admin (internal only): Support, billing oversight.

No multi-user orgs at launch (1 musician = 1 org = 1 login).

## Principles

 • Strict separation: Dashboard (B2B) vs Mini-site (B2C).
 • Entitlements: Membership defines which modules are available.
 • Design: Glass/neon aesthetic (consistent across app).
 • PWA-first: Offline shell, push notifications.
 • Streaming: Non-downloadable (download toggle disabled in v1).

## Features by Module

### Authentication & Tenancy

 • Providers: Google, Spotify, Magic Link (resend).
 • Tenant = musician org (single-user only v1).
 • Flow: Login → Membership selection → Payment (all $0 initially) → Dashboard.

### Music Catalogue

 • File upload (≤100MB; MP3, WAV, FLAC, AAC, M4A).
 • Metadata: title, description, genre, mood, BPM, key (Camelot + musical), ISRC (optional), explicit flag.
 • Organization: playlists/sets, grid/list, sorting, filtering, drag-drop ordering.
 • Player: inline preview, waveform optional.

### Sharing & Streaming

 • Share links: one-time, expiring (TTL), permanent.
 • Controls: metadata visibility (full/limited/hidden).
 • Audit: opens, plays, expiries.
 • Abuse: rate-limit, CAPTCHA fallback.
 • Streaming: HLS with signed URLs, expiring tokens.

### Mini-Site Builder

 • Theme: fixed neon/glass style.
 • Customization: main color, logo, name, about page, nav order.
 • Modules: toggle visibility of Music, Beats, Merch, Events, Memberships.
 • Gating: public vs members-only content at launch.

### Mini-Site Player (Spotify-style)

 • Behavior:
  • Persistent bottom mini-player on all pages.
  • Mobile: expand to full-screen player (cover art + metadata, queue, transport).
  • Desktop: expand to a normal-sized player panel with full metadata and queue.
  • Seamless playback during navigation (no reloads).
  • Gated items: show locked state with subscribe CTA.

 • Acceptance Criteria:
  • Mini-player always visible; play state persists across route changes.
  • Expand/collapse works smoothly; no audio interruption.
  • Locked tracks display a gated state; subscribe flow unlocks without page reload.
  • HLS with signed tokens; no direct file URLs.

### Memberships / Subscriptions (per-artist, OnlyFans-style)

 • Scope: Each musician configures their own subscription pricing and terms.
 • Model:
  • Per-artist subscription (fan subscribes to a specific musician).
  • Durations: 1 week, 1 month, 3 months, 6 months, 12 months.
  • Pricing: musician sets a price for each duration (any can be disabled).
  • Auto-renew: on by default for renewable periods (weekly, monthly, etc.).
  • Stripe: Stripe stores the customer + payment method; we keep only references.
  • Platform fee: 2% applied to each purchase (configurable later by tier).
 • UI/Flows:
  • Mini-site shows a Subscribe CTA with available durations and prices.
  • Checkout = Stripe (hosted or embedded).
  • Post-purchase: immediate entitlement for that artist’s gated content.

 • Acceptance Criteria:
  • Musician can set and update prices per duration.
  • Fan can subscribe to one or more musicians independently.
  • Renewals charge automatically (except fixed 12-month if you want non-renewable—confirm).
  • Platform fee applied and reported.
  • Entitlements update near-real-time after Stripe success webhook.

### Beats Store

 • Licensing tiers: lease, exclusive.
 • Deliverables: MP3/WAV only at launch.
 • Checkout: Stripe, per-artist only (no aggregation).

### Fan Profile (cross-site aggregation)

 • Scope: One place to view all subscriptions and spending across all Lufy mini-sites.
 • Data shown (by musician)
  • Active subscriptions: term, next renewal date, price.
  • Past purchases: amount, date, item type (subscription/beat/merch/event when those exist).
  • Invoices: “Download Stripe invoice” link (Stripe-hosted invoice PDFs).
  • Payment methods: managed in Stripe (link to Stripe customer portal).

 • Acceptance Criteria:
  • Fan sees a table grouped by musician with totals and current status.
  • Each charge row links to “Download invoice” (Stripe-hosted).
  • “Manage payment methods” opens Stripe’s customer portal.

### Content Gating — where is it configured?

 • Primary gating at content level inside each module’s admin (track/playlist/post/product).
 • Global overrides in Mini-site Builder:
  • “Default access” for new items (public vs members-only).
  • Emergency switch: “Temporarily gate all content” (maintenance/promo).

 • Acceptance Criteria:
  • Each content item has an Access control (Public / Members-only).
  • Mini-site Builder has a Default Access setting and a Global Gate toggle.
  • Mini-site honors item-level access unless Global Gate is enabled.

### Moderation & Rights

 • Explicit content flag → hide/show toggle.
 • Takedown/reporting deferred post-launch.

### Analytics

 • Launch metrics:
 • Streams/plays
 • Unique listeners
 • Top tracks
 • Share link stats
 • Followers
 • Subscribers
 • Per-artist: Followers count and Subscribers count.
 • Fan Profile: total spend and active subscriptions by artist.
 • Dashboard snapshot shows: plays, top track, share link opens, followers, subscribers.

### Analytics Event Wiring

 • **Auth (/auth/login):** `auth.login.start|success|error` fired on each login attempt.
 • **Music Catalogue (/dashboard/music):** events `catalog.upload.start|success|error`, `catalog.track.update`, `catalog.playlist.create|reorder` fired on respective actions.
 • **Sharing (/dashboard/sharing & /s/[token]):** `sharing.link.create` fired on server and UI when a link is created; `sharing.link.open` fired when a link is opened; `sharing.link.play` fired when a fan plays content via a share link.
 • **Mini-site Player (/site/[artist]):** `player.play`, `player.pause`, `player.complete` fired for fan playback telemetry.
 • **Subscriptions:** `subs.checkout.start` fired when a fan clicks subscribe; `subs.checkout.success` fired after Stripe success redirect; `subs.renewal` fired via webhook on subscription renewal.

## Payments

 • Stripe only at launch (subs + one-offs).
 • Stripe Tax handles taxes.
 • Platform fee: 2% (configurable, varies by membership tier later).
 • Payouts managed by Stripe (standard schedule).

## Non-Functional

 • Target: p95 TTI < 2s on 4G.
 • Accessibility: WCAG 2.1 AA.
 • Uptime: ≥99.9%.
 • Data residency: EU storage compliance.

## Milestones

### Milestone 1 — Core Launch

 • Auth (Google, Spotify, Magic Link).
 • Membership selection + free payment step.
 • Musician dashboard (feature overview, management links, mini-site preview).
 • Music Catalogue (upload, metadata, playlists/sets).
 • Advanced Sharing (expiring/permanent links, visibility, audit).
 • Streaming (HLS, tokenized).
 • Mini-site builder (basic customization, public vs members-only).
 • Mini-site player (Spotify-style, persistent bottom mini-player).
 • Memberships / Subscriptions (per-artist, OnlyFans-style).
 • Fan profile (login + settings).

### Milestone 2 — Engagement & Beats

 • Beats store (lease/exclusive, MP3/WAV, Stripe checkout).
 • Order management (view/update).
 • Membership tiers (basic/premium, content gating, discounts).

### Milestone 3 — Merch, Events, Membership

 • Merch shop (catalog, variants, orders, fulfillment).
 • Events module (ticket sales, attendee list).

### Milestone 4 — Add-ons & Advanced

 • Custom domains.
 • Branded email.
 • File conversion (beats).
 • Advanced analytics, automation, SEO, multi-language.

## Success Metrics

 • ≥60% musicians enable ≥2 modules in 30 days.
 • ≥12% free→paid conversion in 60 days.
 • ≥25% fan notification opt-in.
 • ≥15% fan→subscriber conversion per mini-site.
 • ≥95% successful payments.
