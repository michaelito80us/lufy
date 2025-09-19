import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      )
    }

    // Check if user has an active subscription to this artist
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        artistId: artistId,
        status: 'ACTIVE',
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
      include: {
        artist: {
          select: {
            id: true,
            stageName: true,
            logo: true,
            tier: true,
          },
        },
      },
    })

    // Also check if the user is the artist themselves
    const isArtistOwner = await prisma.artist.findFirst({
      where: {
        id: artistId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      hasAccess: !!subscription || !!isArtistOwner,
      subscription: subscription,
      isOwner: !!isArtistOwner,
    })
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
