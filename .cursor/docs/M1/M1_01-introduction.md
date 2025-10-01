# Milestone 1 - Introduction

## Authentication & Tenancy

 • Providers: Google, Spotify, Magic Link (with resend).
 • No passwords.
 • Tenant = 1 musician = 1 org (single-user v1).
 • Flow: Login → Membership Selection (choose durations/pricing) → Payment (Stripe, all $0 at launch) → Dashboard.

## Subscriptions (OnlyFans-style, now in M1)

 • Each musician sets price per term: 1 week, 1 month, 3 months, 6 months, 12 months.
 • All terms auto-renew, including 12 months.
 • Fan subscribes per artist; multiple subscriptions possible.
 • Stripe stores payment methods + invoices; Lufy stores entitlements + audit.
 • Platform fee: 2%.
 • Out of scope now: trials, coupons, promos, proration, refunds.

Acceptance Criteria
 • Musician can configure prices for each term (toggle on/off per term).
 • Fan can subscribe to one or more musicians.
 • Renewals charge automatically; subscription status updates in real time after webhook.
 • Platform fee is applied and visible in revenue stats.
 • Fans see “Subscribe” CTA on gated content; subscription instantly unlocks access after success.

## Musician Dashboard

 • Feature cards: Catalogue, Sharing, Mini-site, Subscriptions, Analytics Snapshot.
 • Mini-site preview iframe embedded.
 • Snapshot metrics: plays, top track, share link opens, followers, subscribers.

Acceptance Criteria
 • Musician sees active modules and entitlements.
 • Analytics snapshot updates with real data.
 • Mini-site preview reflects latest published state.

## Music Catalogue

 • Upload: ≤100MB, MP3/WAV/FLAC/AAC/M4A.
 • Metadata: title, description, genre, mood, BPM, key, ISRC (optional), explicit flag.
 • Cover art upload + preview.
 • Playlists/sets, drag-drop ordering.
 • Grid/list view + filters.
 • Inline preview player.

## Advanced Sharing

 • Link types: one-time, expiring (TTL), permanent.
 • Metadata visibility: full / limited / hidden.
 • Audit trail: opens, plays, expiry countdown.
 • Abuse: rate-limit, CAPTCHA fallback.

## Streaming

 • HLS with signed URLs + expiring tokens.
 • Player always present (Spotify-style):
 • Persistent bottom mini-player.
 • Mobile full-screen expansion.
 • Desktop medium expansion with metadata.
 • Seamless playback across navigation.
 • Download disabled.

## Mini-site Builder

 • Theme locked (glass/neon).
 • Customization: accent color, logo, name, about page, nav order.
 • Global access controls:
 • Default for new content (public/members-only).
 • Emergency “Gate All” toggle.
 • Per-content access configured in each module’s admin.

## Fan Profile (cross-artist aggregation)

 • Shows all subscriptions + spending across all musicians.
 • Grouped by artist: active subs, history, next renewal.
 • Invoice download link (Stripe-hosted).
 • Link to Stripe Customer Portal for payment method management.
 • Display name editable.

## Analytics (M1 scope)

 • Per musician: plays, unique listeners, top tracks, share link opens, followers, subscribers.
 • Dashboard snapshot updates in near real-time.
 • Fan profile shows aggregated spend per artist.

## Non-Functional

 • p95 TTI < 2s on 4G.
 • 99.9% uptime target.
 • WCAG 2.1 AA baseline.
 • GDPR/Stripe compliance, EU residency OK.

## ✅ After M1

A musician can register, set up pricing, upload music, generate advanced share links, stream securely, customize their mini-site, and fans can subscribe (auto-renew), view/play via a Spotify-like player, and manage subscriptions + invoices in their profile.
