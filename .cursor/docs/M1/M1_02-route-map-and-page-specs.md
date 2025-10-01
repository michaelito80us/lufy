# Milestone 1 — Route Map & Page Specs

## Authentication & Onboarding

/auth/login
 • UI: Neon/glass card with Google, Spotify, and Magic Link buttons.
 • Behavior:
 • Google/Spotify OAuth → redirect back with token.
 • Magic Link → send email, link opens session. Resend supported.
 • Acceptance:
 • Login succeeds with Google, Spotify, Magic Link.
 • Invalid/expired magic link shows error + resend option.

/onboarding/membership
 • UI: Membership selection form (set subscription terms & prices).
 • Behavior:
 • Musician sets prices for 1w, 1m, 3m, 6m, 12m (toggle on/off).
 • Confirm → Stripe “$0 checkout” (just to create Stripe customer).
 • Redirect → /dashboard.
 • Acceptance:
 • Musician must complete membership setup before dashboard access.
 • Stripe customer record created.

## Musician Dashboard

/dashboard
 • UI: Feature cards (Catalogue, Sharing, Mini-site, Subscriptions, Analytics).
 • Mini-site Preview: Embedded live iframe.
 • Snapshot: plays, top track, share link opens, followers, subscribers.
 • Acceptance:
 • Dashboard loads modules the musician is entitled to.
 • Metrics update from backend.
 • Preview displays live mini-site.

## Music Catalogue

/dashboard/music
 • UI: Library view (grid/list toggle, filters, sort).
 • Upload: Drag-drop area, ≤100MB, MP3/WAV/FLAC/AAC/M4A.
 • Metadata Form: title, desc, genre, mood, BPM, key, ISRC, explicit flag.
 • Cover art upload + preview.
 • Playlists/Sets: Create, drag-drop order, add/remove tracks.
 • Inline audio player.
 • Acceptance:
 • Upload rejects invalid files.
 • Metadata saves persist.
 • Explicit flag shown in library.
 • Playlists can be created & ordered.
 • Tracks preview correctly.

## Sharing

/dashboard/sharing
 • UI: Table of generated links (type, TTL, status, plays, expiry).
 • Create flow: choose one-time / expiring / permanent, TTL, metadata visibility (full/limited/hidden).
 • Audit: Opens & plays increment counters.
 • Abuse control: Rate-limit triggered → CAPTCHA prompt.
 • Acceptance:
 • Links function per type.
 • Expired & one-time links invalidate.
 • Audit metrics visible.
 • CAPTCHA triggers under abuse conditions.

## Mini-site Builder

/dashboard/site
 • UI: Glass/neon preview with controls for:
 • Logo upload
 • Accent color picker
 • Artist name
 • About page text
 • Nav order drag-drop
 • Access defaults (public vs members-only)
 • Global gate toggle
 • Acceptance:
 • Customizations reflect in preview.
 • Global gate locks all content.
 • New uploads inherit default access setting.

## Mini-site (Fan-facing)

/site/:artist
 • UI:
 • Glass/neon theme.
 • Persistent bottom mini-player.
 • Mobile: expand → full-screen player.
 • Desktop: expand → medium panel with metadata.
 • Modules visible: Music (others disabled with “coming soon”).
 • Behavior:
 • Public tracks playable.
 • Members-only tracks show locked state + subscribe CTA.
 • Subscriptions integrate with Stripe checkout.
 • Acceptance:
 • Playback seamless across nav.
 • Expansion/collapse works without stopping audio.
 • Gated tracks stay locked until subscription confirmed.

## Subscriptions

/dashboard/subscriptions
 • UI: Config panel for subscription prices per duration (1w, 1m, 3m, 6m, 12m).
 • Acceptance:
 • Musician can enable/disable terms & set price.
 • Prices reflected instantly on mini-site subscribe CTA.

## Fan Profile

/profile
 • UI:
 • Account info (display name, email).
 • Table grouped by artist: active subs (renewal date, price), past purchases.
 • “Download invoice” link → Stripe-hosted invoice.
 • “Manage payment methods” → Stripe customer portal.
 • Acceptance:
 • Fan sees subscriptions per artist.
 • Invoices downloadable.
 • Payment method mgmt redirects to Stripe.

## Analytics

 • Available on: /dashboard snapshot, /dashboard/music (plays, top tracks), /dashboard/sharing (link opens).
 • Acceptance:
 • Metrics update near real time.
 • Followers/subscribers counts visible.

⸻

Deliverables for Milestone 1

✅ Working auth (Google, Spotify, Magic Link).
✅ Musician onboarding → membership → dashboard.
✅ Music catalogue + advanced sharing.
✅ Spotify-style mini-site player.
✅ Per-artist subscriptions live (OnlyFans-style).
✅ Fan profile aggregating all subscriptions + invoices.
✅ Analytics snapshot (plays, links, subs, followers).
