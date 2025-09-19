import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createSubscriptionSchema = z.object({
  artistId: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { artistId } = createSubscriptionSchema.parse(body)

    // Check if artist exists
    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      select: {
        id: true,
        stageName: true,
        subscriptionPrice: true,
        userId: true,
      },
    })

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }

    // Prevent self-subscription
    if (artist.userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot subscribe to yourself' },
        { status: 400 }
      )
    }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        artistId: artistId,
        status: 'ACTIVE',
      },
    })

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Already subscribed to this artist' },
        { status: 400 }
      )
    }

    // Create new subscription
    // Note: In a real application, you would integrate with a payment processor here
    // For now, we'll create an active subscription directly
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        artistId: artistId,
        status: 'ACTIVE',
        startDate: new Date(),
        // Set expiry to 1 month from now
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        amount: artist.subscriptionPrice,
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

    // TODO: In production, integrate with payment processor:
    // 1. Create payment intent with Stripe/PayPal
    // 2. Set up recurring billing
    // 3. Handle payment webhooks
    // 4. Update subscription status based on payment status

    return NextResponse.json({
      subscription,
      message: 'Subscription created successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all user's subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        artist: {
          select: {
            id: true,
            stageName: true,
            logo: true,
            tier: true,
            subscriptionPrice: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ subscriptions })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
