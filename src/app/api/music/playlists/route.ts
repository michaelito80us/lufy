import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createPlaylistSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  artistId: z.string(),
  trackIds: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
  coverArt: z.string().url().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const artistId = searchParams.get('artistId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      )
    }

    // Check if user has access to this artist's playlists
    const artist = await prisma.artist.findFirst({
      where: {
        id: artistId,
        OR: [
          { userId: session.user.id },
          {
            subscriptions: {
              some: {
                userId: session.user.id,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
    })

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found or access denied' },
        { status: 404 }
      )
    }

    const isOwner = artist.userId === session.user.id

    const where = {
      artistId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      // Non-owners can only see public playlists
      ...(!isOwner && { isPublic: true }),
    }

    const [playlists, total] = await Promise.all([
      prisma.playlist.findMany({
        where,
        include: {
          tracks: {
            include: {
              artist: {
                select: {
                  id: true,
                  stageName: true,
                  logo: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
          artist: {
            select: {
              id: true,
              stageName: true,
              logo: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.playlist.count({ where }),
    ])

    return NextResponse.json({
      playlists,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
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

    const body = await request.json()
    const validatedData = createPlaylistSchema.parse(body)

    // Verify user owns the artist
    const artist = await prisma.artist.findFirst({
      where: {
        id: validatedData.artistId,
        userId: session.user.id,
      },
    })

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found or access denied' },
        { status: 404 }
      )
    }

    // Verify all tracks belong to the artist (if trackIds provided)
    if (validatedData.trackIds && validatedData.trackIds.length > 0) {
      const trackCount = await prisma.track.count({
        where: {
          id: { in: validatedData.trackIds },
          artistId: validatedData.artistId,
        },
      })

      if (trackCount !== validatedData.trackIds.length) {
        return NextResponse.json(
          { error: 'Some tracks do not belong to this artist' },
          { status: 400 }
        )
      }
    }

    // Create playlist
    const playlist = await prisma.playlist.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        artistId: validatedData.artistId,
        isPublic: validatedData.isPublic,
        coverArt: validatedData.coverArt,
        tracks: validatedData.trackIds
          ? {
              connect: validatedData.trackIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        tracks: {
          include: {
            artist: {
              select: {
                id: true,
                stageName: true,
                logo: true,
              },
            },
          },
        },
        artist: {
          select: {
            id: true,
            stageName: true,
            logo: true,
          },
        },
      },
    })

    return NextResponse.json(playlist, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating playlist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
