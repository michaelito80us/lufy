import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateTrackSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  genre: z.string().max(50).optional(),
  mood: z.string().max(50).optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  lyrics: z.string().max(10000).optional(),
  releaseDate: z.string().optional(),
  bpm: z.number().int().min(1).max(300).optional(),
  key: z.string().max(10).optional(),
  isExclusive: z.boolean().optional(),
  coverArt: z.string().url().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const trackId = params.id

    const track = await prisma.track.findFirst({
      where: {
        id: trackId,
        OR: [
          // User owns the track
          {
            artist: {
              userId: session.user.id,
            },
          },
          // User has access to the track (public or subscribed)
          {
            AND: [
              {
                OR: [
                  { isExclusive: false },
                  {
                    artist: {
                      subscriptions: {
                        some: {
                          userId: session.user.id,
                          status: 'ACTIVE',
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      include: {
        artist: {
          select: {
            id: true,
            stageName: true,
            logo: true,
            userId: true,
          },
        },
      },
    })

    if (!track) {
      return NextResponse.json(
        { error: 'Track not found or access denied' },
        { status: 404 }
      )
    }

    // Remove sensitive data for non-owners
    const isOwner = track.artist.userId === session.user.id
    if (!isOwner) {
      // Remove sensitive fields for non-owners
      const { artist, ...trackData } = track
      const { userId, ...artistData } = artist
      return NextResponse.json({
        ...trackData,
        artist: artistData,
      })
    }

    return NextResponse.json(track)
  } catch (error) {
    console.error('Error fetching track:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const trackId = params.id
    const body = await request.json()
    const validatedData = updateTrackSchema.parse(body)

    // Verify user owns the track
    const existingTrack = await prisma.track.findFirst({
      where: {
        id: trackId,
        artist: {
          userId: session.user.id,
        },
      },
      include: {
        artist: true,
      },
    })

    if (!existingTrack) {
      return NextResponse.json(
        { error: 'Track not found or access denied' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {}

    if (validatedData.title !== undefined)
      updateData.title = validatedData.title
    if (validatedData.description !== undefined)
      updateData.description = validatedData.description
    if (validatedData.genre !== undefined)
      updateData.genre = validatedData.genre
    if (validatedData.mood !== undefined) updateData.mood = validatedData.mood
    if (validatedData.tags !== undefined) updateData.tags = validatedData.tags
    if (validatedData.lyrics !== undefined)
      updateData.lyrics = validatedData.lyrics
    if (validatedData.bpm !== undefined) updateData.bpm = validatedData.bpm
    if (validatedData.key !== undefined) updateData.key = validatedData.key
    if (validatedData.isExclusive !== undefined)
      updateData.isExclusive = validatedData.isExclusive
    if (validatedData.coverArt !== undefined)
      updateData.coverArt = validatedData.coverArt

    // Handle release date
    if (validatedData.releaseDate !== undefined) {
      updateData.releaseDate = validatedData.releaseDate
        ? new Date(validatedData.releaseDate)
        : null
    }

    // Update the track
    const updatedTrack = await prisma.track.update({
      where: { id: trackId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        artist: {
          select: {
            id: true,
            stageName: true,
            logo: true,
          },
        },
      },
    })

    return NextResponse.json(updatedTrack)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating track:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const trackId = params.id

    // Verify user owns the track
    const existingTrack = await prisma.track.findFirst({
      where: {
        id: trackId,
        artist: {
          userId: session.user.id,
        },
      },
    })

    if (!existingTrack) {
      return NextResponse.json(
        { error: 'Track not found or access denied' },
        { status: 404 }
      )
    }

    // Delete the track (this will also remove it from playlists due to cascade)
    await prisma.track.delete({
      where: { id: trackId },
    })

    // Note: In a production environment, you might also want to:
    // 1. Delete the physical audio file from storage
    // 2. Delete the cover art file if it exists
    // 3. Update any analytics or statistics
    // 4. Notify subscribers if it was an exclusive track

    return NextResponse.json({
      message: 'Track deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting track:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
