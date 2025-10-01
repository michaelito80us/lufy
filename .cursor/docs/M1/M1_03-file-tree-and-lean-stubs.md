# File tree and lean stubs for Milestone 1 exactly as specced

This is scaffolding, not finished code—names, routes, and responsibilities are fixed so the team can build without inventing structure.

## File tree (Milestone 1)

```text
src/
  app/
    (auth)/
      auth/
        login/
          page.tsx
      onboarding/
        membership/
          page.tsx
    (app)/
      dashboard/
        page.tsx
        _components/
          DashboardCards.tsx
          Snapshot.tsx
          MiniSitePreview.tsx
      dashboard/
        music/
          page.tsx
          upload/
            action.ts
          _components/
            UploadDropzone.tsx
            LibraryTable.tsx
            PlaylistPanel.tsx
      dashboard/
        sharing/
          page.tsx
          create-link.action.ts
      dashboard/
        subscriptions/
          page.tsx
          update-prices.action.ts
      dashboard/
        site/
          page.tsx
      profile/
        page.tsx
    site/
      [artist]/
        layout.tsx
        page.tsx
        _components/
          PlayerBar.tsx
          PlayerExpanded.tsx
          TrackList.tsx
    s/
      [token]/
        page.tsx            # share-link consumption
    api/
      music/
        upload-url/route.ts # S3/GCS presigned URL
      share/
        create/route.ts
        audit/route.ts
      stream/
        sign/route.ts       # short-lived HLS token
      stripe/
        webhook/route.ts
      auth/
        callback/route.ts   # optional, Better Auth callback if needed
  components/
    ui/
      Button.tsx
      Input.tsx
      GlassCard.tsx
      Badge.tsx
      Toggle.tsx
      Tabs.tsx
    layout/
      AppShell.tsx
      Nav.tsx
    media/
      Waveform.tsx          # optional stub
  lib/
    auth/
      better-auth.server.ts
      better-auth.client.ts
      org.ts                # tenant helpers
    stripe/
      client.ts
      helpers.ts
    storage/
      s3.ts                 # or gcs.ts
    streaming/
      hls.ts                # token signing helpers
    share/
      links.ts
    analytics/
      events.ts
    zod/
      music.ts
      sharing.ts
      subscription.ts
    db/
      index.ts              # data access abstraction (swap impl later)
      types.ts
  styles/
    globals.css
  types/
    common.ts
    auth.ts
    music.ts
    share.ts
    subscriptions.ts
  middleware.ts            # auth/route protection if needed
  env.d.ts
```

## Environment variables (M1)

```text
# Better Auth

BETTER_AUTH_SECRET=
BETTER_AUTH_SPOTIFY_ID=
BETTER_AUTH_SPOTIFY_SECRET=
BETTER_AUTH_GOOGLE_ID=
BETTER_AUTH_GOOGLE_SECRET=
MAGIC_LINK_EMAIL_FROM=
MAGIC_LINK_PROVIDER= # e.g. Resend
RESEND_API_KEY=

# Stripe

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=
PLATFORM_FEE_BPS=200   # 2% = 200 basis points

# Storage / CDN

S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
CDN_BASE_URL=

# App

APP_URL=              # <https://app.lufy.xyz>
PUBLIC_SITE_URL=      # https://*.lufy.page
JWT_SIGNING_KEY=      # for stream/share tokens
```

## Core stubs (representative)

- /src/app/(auth)/auth/login/page.tsx

```typescript
'use client'
import { Button } from '@/components/ui/Button'
import { authClient } from '@/lib/auth/better-auth.client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const q = useSearchParams()
  const emailQ = q.get('email') || ''
  const [loading, setLoading] = useState<'google'|'spotify'|'magic'|null>(null)
  const [email, setEmail] = useState(emailQ)

  const social = async (provider: 'google'|'spotify') => {
    try {
      setLoading(provider)
      await authClient.signIn.social({ provider, callbackURL: '/dashboard' })
    } finally { setLoading(null) }
  }

  const magic = async () => {
    setLoading('magic')
    await authClient.signIn.magicLink({ email, callbackURL: '/dashboard' })
    setLoading(null)
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md space-y-6 glass-card rounded-2xl p-8">
        <h1 className="text-2xl font-semibold">Continue</h1>

        <Button onClick={() => social('google')} disabled={!!loading} className="w-full">
          {loading==='google' ? 'Connecting…' : 'Continue with Google'}
        </Button>
        <Button onClick={() => social('spotify')} disabled={!!loading} className="w-full" variant="secondary">
          {loading==='spotify' ? 'Connecting…' : 'Continue with Spotify'}
        </Button>

        <div className="h-px bg-white/10" />
        <div className="flex gap-2">
          <input className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2"
                 placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <Button onClick={magic} disabled={!email || !!loading}>Send link</Button>
        </div>
      </div>
    </main>
  )
}
```

- /src/app/(auth)/onboarding/membership/page.tsx

```typescript
'use client'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { updatePrices } from '@/app/(app)/dashboard/subscriptions/update-prices.action'

const PriceSchema = z.object({
  '1w': z.number().nonnegative().optional(),
  '1m': z.number().nonnegative().optional(),
  '3m': z.number().nonnegative().optional(),
  '6m': z.number().nonnegative().optional(),
  '12m': z.number().nonnegative().optional(),
  enabled: z.array(z.enum(['1w','1m','3m','6m','12m']))
})

export default function MembershipOnboarding() {
  const [state, setState] = useState<{[k:string]: string|number|boolean}>({})
  const onSave = async () => {
    const enabled = ['1w','1m','3m','6m','12m'].filter(k=>Boolean(state[`en_${k}`]))
    const payload = {
      '1w': Number(state['1w']||0), '1m': Number(state['1m']||0), '3m': Number(state['3m']||0),
      '6m': Number(state['6m']||0), '12m': Number(state['12m']||0), enabled
    }
    PriceSchema.parse(payload)
    await updatePrices(payload) // creates Stripe products/prices; stores mapping
    location.href = '/dashboard'
  }
  // … render 5 rows (1w..12m) with price input + enable toggle …
  return <main className="max-w-3xl mx-auto p-8">/*form + Save -> onSave*/</main>
}
```

- /src/app/(app)/dashboard/page.tsx

```typescript
import { MiniSitePreview } from './_components/MiniSitePreview'
import { Snapshot } from './_components/Snapshot'
import { DashboardCards } from './_components/DashboardCards'

export default async function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <Snapshot />
      <DashboardCards />
      <MiniSitePreview />
    </main>
  )
}
```

- /src/app/(app)/dashboard/music/page.tsx

```typescript
import UploadDropzone from './_components/UploadDropzone'
import LibraryTable from './_components/LibraryTable'
import PlaylistPanel from './_components/PlaylistPanel'

export default function Music() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <UploadDropzone />
        <LibraryTable />
      </div>
      <PlaylistPanel />
    </div>
  )
}
```

- /src/app/(app)/dashboard/sharing/create-link.action.ts

```typescript
'use server'
import { z } from 'zod'
import { createShareLink } from '@/lib/share/links'
import { requireOrg } from '@/lib/auth/better-auth.server'

const schema = z.object({
  targetId: z.string(),                      // track or playlist id
  type: z.enum(['one-time','expiring','permanent']),
  ttlHours: z.number().int().min(1).max(24*30).optional(),
  visibility: z.enum(['full','limited','hidden'])
})

export async function createLink(input: unknown) {
  const org = await requireOrg()
  const data = schema.parse(input)
  return createShareLink(org.id, data)
}
```

- /src/app/api/stream/sign/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { signStreamToken } from '@/lib/streaming/hls'
import { requireOrg } from '@/lib/auth/better-auth.server'

export async function POST(req: NextRequest) {
  const org = await requireOrg()
  const { trackId } = await req.json()
  const token = await signStreamToken({ orgId: org.id, trackId, ttlSec: 300 })
  return NextResponse.json({ token })
}
```

- /src/app/api/stripe/webhook/route.ts

```typescript
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { handleStripeEvent } from '@/lib/stripe/helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(req: Request) {
  const sig = headers().get('stripe-signature')!
  const raw = await req.text()
  const evt = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  await handleStripeEvent(evt) // subscription created/renewed -> set entitlements
  return new Response('ok')
}
```

- /src/app/site/[artist]/layout.tsx

```typescript
'use client'
import PlayerBar from './_components/PlayerBar'
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
      <PlayerBar /> {/*persistent bottom player*/}
    </div>
  )
}
```

- /src/app/site/[artist]/_components/PlayerBar.tsx

```typescript
'use client'
import { useState } from 'react'
import PlayerExpanded from './PlayerExpanded'

export default function PlayerBar() {
  const [open, setOpen] = useState(false)
  // wire to a PlayerContext for play/pause/queue
  return (
    <>
      <div className="fixed bottom-0 inset-x-0 h-16 glass-card flex items-center px-4">
        {/*cover, title, play/pause, seek, expand*/}
        <button onClick={()=>setOpen(true)} className="ml-auto">Expand</button>
      </div>
      {open && <PlayerExpanded onClose={()=>setOpen(false)} />}
    </>
  )
}
```

## Data & types (minimal, not binding to a DB)

- /src/types/music.ts

```typescript
export type Track = {
  id: string; orgId: string; title: string; description?: string;
  genre?: string; mood?: string; bpm?: number; key?: string; camelot?: string;
  isrc?: string; explicit?: boolean; coverUrl?: string;
  fileUrl: string; durationSec?: number; createdAt: string;
  access: 'public'|'members'; // gating
}
```

- /src/types/subscriptions.ts

```typescript
export type Term = '1w'|'1m'|'3m'|'6m'|'12m'
export type SubPrice = { term: Term; price: number; enabled: boolean; stripePriceId?: string }
```

- /src/lib/share/links.ts (token creation idea)

```typescript
import { randomUUID } from 'crypto'
export async function createShareLink(orgId: string, { targetId, type, ttlHours, visibility }:{
  targetId: string; type: 'one-time'|'expiring'|'permanent'; ttlHours?: number; visibility: 'full'|'limited'|'hidden'
}) {
  const token = randomUUID().replace(/-/g,'')
  // persist: orgId, targetId, type, visibility, token, expiresAt, remainingUses
  return { url: `${process.env.APP_URL}/s/${token}` }
}
```

## ✅ Build order (M1)

 1. Auth (/auth/login) → Onboarding (/onboarding/membership)
 2. Dashboard shell + snapshot + preview
 3. Music (upload → library → playlists)
 4. Sharing (create + audit + /s/[token])
 5. Streaming (sign, tokenized HLS) + Player (bar + expanded)
 6. Mini-site Builder (defaults + global gate + preview)
 7. Subscriptions (config + mini-site Subscribe CTA + Stripe webhook)
 8. Fan Profile (aggregation + invoices + Stripe customer portal link)
 9. Analytics (events plumbing → snapshot)
