import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Implement playlists when Playlist model is added to schema
    return NextResponse.json({
      playlists: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
      },
    })
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Implement playlist creation when Playlist model is added to schema
    return NextResponse.json(
      { error: 'Playlist creation not yet implemented' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Error creating playlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
