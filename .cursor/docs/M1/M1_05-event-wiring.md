# 🔧 Event wiring

## /auth/login/page.tsx

```typescript
import { track, now } from '@/lib/analytics/client'

const social = async (provider: 'google'|'spotify') => {
  track({ v:1, name:'auth.login.start', ts:now(), ctx:{ page:'/auth/login' }, method:provider })
  try {
    await authClient.signIn.social({ provider, callbackURL: '/dashboard' })
    track({ v:1, name:'auth.login.success', ts:now(), ctx:{ page:'/auth/login' }, method:provider })
  } catch (e:any) {
    track({ v:1, name:'auth.login.error', ts:now(), ctx:{ page:'/auth/login' }, method:provider, code:e?.code })
    throw e
  }
}

const magic = async () => {
  track({ v:1, name:'auth.login.start', ts:now(), ctx:{ page:'/auth/login' }, method:'magic' })
  try {
    await authClient.signIn.magicLink({ email, callbackURL: '/dashboard' })
    track({ v:1, name:'auth.login.success', ts:now(), ctx:{ page:'/auth/login' }, method:'magic' })
  } catch (e:any) {
    track({ v:1, name:'auth.login.error', ts:now(), ctx:{ page:'/auth/login' }, method:'magic', code:e?.code })
  }
}
```

## /dashboard/music/page.tsx

```typescript
import { track, now } from '@/lib/analytics/client'

async function handleUpload(files: File[]) {
  track({ v:1, name:'catalog.upload.start', ts:now(), ctx:{ page:'/dashboard/music' }, count:files.length, totalBytes:files.reduce((a,f)=>a+f.size,0) })
  try {
    const ids = await doUpload(files) // your upload logic
    track({ v:1, name:'catalog.upload.success', ts:now(), ctx:{ page:'/dashboard/music' }, trackIds:ids })
  } catch (e:any) {
    track({ v:1, name:'catalog.upload.error', ts:now(), ctx:{ page:'/dashboard/music' }, code:e?.code })
  }
}

function onTrackUpdate(trackId: string, fields: string[]) {
  track({ v:1, name:'catalog.track.update', ts:now(), ctx:{ page:'/dashboard/music' }, trackId, fields })
}

function onPlaylistCreate(id: string, count: number) {
  track({ v:1, name:'catalog.playlist.create', ts:now(), ctx:{ page:'/dashboard/music' }, playlistId:id, trackCount:count })
}

function onPlaylistReorder(id: string, orderCount: number) {
  track({ v:1, name:'catalog.playlist.reorder', ts:now(), ctx:{ page:'/dashboard/music' }, playlistId:id, trackCount:orderCount })
}
```

## /dashboard/sharing/page.tsx

```typescript
import { track, now } from '@/lib/analytics/client'

async function createLink(input) {
  const link = await createLinkServer(input)
  track({
    v:1, name:'sharing.link.create', ts:now(), ctx:{ page:'/dashboard/sharing' },
    linkId:link.id, targetType:input.targetType, type:input.type, ttlHours:input.ttlHours, visibility:input.visibility
  })
  return link
}

// In share link public page (/s/[token]/page.tsx):
useEffect(() => {
  track({ v:1, name:'sharing.link.open', ts:now(), ctx:{ page:`/s/${token}` }, linkId:token })
}, [token])

function onLinkPlay(linkId:string, trackId:string, ms:number) {
  track({ v:1, name:'sharing.link.play', ts:now(), ctx:{ page:`/s/${linkId}` }, linkId, trackId, ms })
}
```

## /site/[artist]/_components/PlayerBar.tsx (Fan-facing player)

```typescript
import { track, now } from '@/lib/analytics/client'

function onPlay(trackId:string) {
  track({ v:1, name:'player.play', ts:now(), ctx:{ page:'/site/[artist]' }, trackId, source:'mini-site' })
}

function onPause(trackId:string, posMs:number) {
  track({ v:1, name:'player.pause', ts:now(), ctx:{ page:'/site/[artist]' }, trackId, posMs })
}

function onComplete(trackId:string, durationMs:number) {
  track({ v:1, name:'player.complete', ts:now(), ctx:{ page:'/site/[artist]' }, trackId, durationMs })
}
```

## ✅ With these snippets

 • Login events record every attempt + result.
 • Catalogue events capture uploads, edits, playlists.
 • Sharing events cover link creation, opens, plays.
 • Player events give play/pause/complete telemetry.
