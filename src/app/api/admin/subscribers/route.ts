import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// GET /api/admin/subscribers - Get artist's subscribers
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is an artist
    const artist = await prisma.artist.findUnique({
      where: { userId: session.user.id },
    })

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      artistId: artist.id,
    }

    if (status && ['ACTIVE', 'INACTIVE', 'CANCELLED'].includes(status)) {
      where.status = status
    }

    // Get subscribers with user info
    const [subscribers, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.subscription.count({ where }),
    ])

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/subscribers - Update subscriber status (bulk operations)
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is an artist
    const artist = await prisma.artist.findUnique({
      where: { userId: session.user.id },
    })

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    const updateSchema = z.object({
      subscriptionIds: z.array(z.string()),
      status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELLED']),
      reason: z.string().optional(),
    })

    const body = await request.json()
    const { subscriptionIds, status, reason } = updateSchema.parse(body)

    // Verify all subscriptions belong to this artist
    const subscriptions = await prisma.subscription.findMany({
      where: {
        id: { in: subscriptionIds },
        artistId: artist.id,
      },
    })

    if (subscriptions.length !== subscriptionIds.length) {
      return NextResponse.json(
        { error: 'Some subscriptions not found or unauthorized' },
        { status: 403 }
      )
    }

    // Update subscriptions
    const updatedSubscriptions = await prisma.subscription.updateMany({
      where: {
        id: { in: subscriptionIds },
        artistId: artist.id,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    })

    // TODO: Send notification emails to affected users
    // TODO: Handle payment processor updates (cancel/reactivate)

    return NextResponse.json({
      message: `Updated ${updatedSubscriptions.count} subscriptions`,
      updated: updatedSubscriptions.count,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating subscribers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
