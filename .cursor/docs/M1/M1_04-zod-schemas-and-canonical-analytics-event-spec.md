# Zod Schemas (v1)

## File: src/lib/zod/music.ts

```typescript
import { z } from 'zod'

export const TrackAccess = z.enum(['public','members'])
export const AudioMime = z.enum(['audio/mpeg','audio/wav','audio/flac','audio/aac','audio/mp4']) // mp3,wav,flac,aac,m4a

export const TrackCreateSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().int().positive().max(100 *1024* 1024), // 100MB
  mimeType: AudioMime,
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  genre: z.string().max(64).optional(),
  mood: z.string().max(64).optional(),
  bpm: z.number().int().min(40).max(250).optional(),
  key: z.string().max(16).optional(),          // e.g., "A#m"
  camelot: z.string().max(4).optional(),       // e.g., "1A"
  isrc: z.string().max(15).optional(),
  explicit: z.boolean().default(false),
  coverUrl: z.string().url().optional(),
  access: TrackAccess.default('public'),
})

export const TrackUpdateSchema = TrackCreateSchema.partial().extend({
  id: z.string().min(1),
})

export const PlaylistCreateSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  trackIds: z.array(z.string()).min(1),
})

export const PlaylistReorderSchema = z.object({
  playlistId: z.string().min(1),
  order: z.array(z.object({ trackId: z.string(), position: z.number().int().min(0) })).min(1),
})
```

## File: src/lib/zod/sharing.ts

```typescript
import { z } from 'zod'
export const ShareType = z.enum(['one-time','expiring','permanent'])
export const ShareVisibility = z.enum(['full','limited','hidden'])

export const ShareLinkCreateSchema = z.object({
  targetId: z.string().min(1), // track or playlist id
  type: ShareType,
  ttlHours: z.number().int().min(1).max(24*30).optional(), // required if type=expiring
  visibility: ShareVisibility.default('full'),
}).refine(d => d.type !== 'expiring' || !!d.ttlHours, { message: 'ttlHours required for expiring links' })
```

## File: src/lib/zod/subscription.ts

```typescript
import { z } from 'zod'
export const Term = z.enum(['1w','1m','3m','6m','12m'])

export const SubscriptionPriceConfigSchema = z.object({
  enabled: z.array(Term).default([]),
  '1w': z.number().nonnegative().optional(),
  '1m': z.number().nonnegative().optional(),
  '3m': z.number().nonnegative().optional(),
  '6m': z.number().nonnegative().optional(),
  '12m': z.number().nonnegative().optional(),
})

export const SubscribeCheckoutSchema = z.object({
  artistId: z.string().min(1),
  term: Term,
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
})
```

## File: src/lib/zod/site.ts

```typescript
import { z } from 'zod'

export const SiteSettingsSchema = z.object({
  artistName: z.string().min(1).max(120),
  logoUrl: z.string().url().optional(),
  accentColor: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i),
  aboutMarkdown: z.string().max(5000).optional(),
  nav: z.array(z.object({ key: z.string(), label: z.string(), enabled: z.boolean() })).min(1),
  defaultAccess: z.enum(['public','members']).default('public'),
  globalGate: z.boolean().default(false),
})
```

## File: src/lib/zod/profile.ts

```typescript
import { z } from 'zod'
export const FanProfileUpdateSchema = z.object({
  displayName: z.string().min(1).max(120),
})
```

## File: src/lib/zod/auth.ts

```typescript
import { z } from 'zod'
export const LoginMethodSchema = z.object({
  method: z.enum(['google','spotify','magic']),
  email: z.string().email().optional(), // required for magic
}).refine(d => d.method !== 'magic' || !!d.email, { message: 'email required for magic link' })
```

## Analytics Event Spec (v1)

Conventions
 • name: area.action.result (dot-separated, lowercase).
 • ts: server time in ISO 8601.
 • context: { userId, orgId, artistId, page, ua } (as available).
 • pii: never send raw emails, never send card data; use ids.
 • versioning: include v: 1 and only add new optional fields; never break existing.

## File: src/lib/analytics/events.ts

```typescript
export type Ctx = { userId?: string; orgId?: string; artistId?: string; page?: string; ua?: string }

export type Event =
  | { v:1; name:'auth.login.start'        ; ts:string; ctx:Ctx; method:'google'|'spotify'|'magic' }
  | { v:1; name:'auth.login.success'      ; ts:string; ctx:Ctx; method:'google'|'spotify'|'magic' }
  | { v:1; name:'auth.login.error'        ; ts:string; ctx:Ctx; method:'google'|'spotify'|'magic'; code?:string }

  | { v:1; name:'onboarding.membership.view'   ; ts:string; ctx:Ctx }
  | { v:1; name:'onboarding.membership.save'   ; ts:string; ctx:Ctx; enabled:string[]; prices:Record<string,number> }

  | { v:1; name:'catalog.upload.start'    ; ts:string; ctx:Ctx; count:number; totalBytes:number }
  | { v:1; name:'catalog.upload.success'  ; ts:string; ctx:Ctx; trackIds:string[] }
  | { v:1; name:'catalog.upload.error'    ; ts:string; ctx:Ctx; code?:string }
  | { v:1; name:'catalog.track.update'    ; ts:string; ctx:Ctx; trackId:string; fields:string[] }
  | { v:1; name:'catalog.playlist.create' ; ts:string; ctx:Ctx; playlistId:string; trackCount:number }
  | { v:1; name:'catalog.playlist.reorder'; ts:string; ctx:Ctx; playlistId:string; trackCount:number }

  | { v:1; name:'sharing.link.create'     ; ts:string; ctx:Ctx; linkId:string; targetType:'track'|'playlist'; type:'one-time'|'expiring'|'permanent'; ttlHours?:number; visibility:'full'|'limited'|'hidden' }
  | { v:1; name:'sharing.link.open'       ; ts:string; ctx:Ctx; linkId:string; uaHash?:string }
  | { v:1; name:'sharing.link.play'       ; ts:string; ctx:Ctx; linkId:string; trackId:string; ms:number }

  | { v:1; name:'stream.token.issue'      ; ts:string; ctx:Ctx; trackId:string; ttlSec:number }
  | { v:1; name:'player.play'             ; ts:string; ctx:Ctx; trackId:string; source:'mini-site'|'share'|'dashboard' }
  | { v:1; name:'player.pause'            ; ts:string; ctx:Ctx; trackId:string; posMs:number }
  | { v:1; name:'player.complete'         ; ts:string; ctx:Ctx; trackId:string; durationMs:number }

  | { v:1; name:'site.settings.save'      ; ts:string; ctx:Ctx; changed:string[]; globalGate:boolean; defaultAccess:'public'|'members' }

  | { v:1; name:'subs.config.update'      ; ts:string; ctx:Ctx; enabled:string[]; prices:Record<string,number> }
  | { v:1; name:'subs.checkout.start'     ; ts:string; ctx:Ctx; artistId:string; term:'1w'|'1m'|'3m'|'6m'|'12m' }
  | { v:1; name:'subs.checkout.success'   ; ts:string; ctx:Ctx; artistId:string; term:'1w'|'1m'|'3m'|'6m'|'12m'; stripeSessionId:string }
  | { v:1; name:'subs.renewal'            ; ts:string; ctx:Ctx; artistId:string; term:'1w'|'1m'|'3m'|'6m'|'12m' } // from webhook

  | { v:1; name:'fan.profile.view'        ; ts:string; ctx:Ctx }
  | { v:1; name:'fan.invoice.download'    ; ts:string; ctx:Ctx; artistId:string; invoiceId:string }
```

## File: src/lib/analytics/client.ts

```typescript
export async function track(e: Event) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(e),
      keepalive: true,
    })
  } catch { /*swallow*/ }
}

export const now = () => new Date().toISOString()

```

## File: src/app/api/analytics/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server'
// TODO: write to your events sink (DB, PostHog, Segment, Kafka, whatever)
export async function POST(req: NextRequest) {
  const evt = await req.json()
  // Basic validation opportunity here if you want
  // await saveEvent(evt)
  return NextResponse.json({ ok: true })
}

```

⸻

Who fires what (don’t overthink it)
 • Client (UI)
 • auth.login.start|success|error
 • onboarding.membership.view|save
 • catalog.upload.start (client), catalog.upload.success|error (server confirms)
 • catalog.track.update, catalog.playlist.*
 • sharing.link.create (server echoes details), sharing.link.open|play
 • player.play|pause|complete
 • site.settings.save
 • subs.config.update
 • subs.checkout.start (before redirect)
 • fan.profile.view, fan.invoice.download
 • Server (webhooks/secure ops)
 • stream.token.issue
 • subs.checkout.success (post-redirect validation)
 • subs.renewal (Stripe webhook)

⸻

Minimal context helper

## File: src/lib/analytics/context.ts

```typescript
import { cookies } from 'next/headers'

export async function buildCtx() {
  // depends on your auth; this is a placeholder
  const userId = cookies().get('uid')?.value
  const orgId = cookies().get('org')?.value
  const artistId = orgId // 1 org == 1 artist in v1
  return { userId, orgId, artistId }
}
```

⸻

## Strong guidance (follow this)

 • Don’t log raw email, card data, file URLs, or signed stream tokens.
 • Do log ids, sizes, durations, and booleans; that’s enough for funnels.
 • Keep event names stable; only add optional fields.
 • Put event firing right next to the action (button handlers, server actions, webhook handlers).
 • Add a feature flag to disable client analytics in privacy requests.
