import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateSubscriptionSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELLED']).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscriptionId = params.id

    const subscription = await prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
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
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Error fetching subscription:', error)
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

    const subscriptionId = params.id
    const body = await request.json()
    const { status } = updateSubscriptionSchema.parse(body)

    // Verify user owns the subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
        userId: session.user.id,
      },
    })

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Update subscription
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: status || existingSubscription.status,
        updatedAt: new Date(),
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
    })

    // TODO: In production, handle payment processor updates:
    // 1. Cancel recurring billing if status is CANCELLED
    // 2. Reactivate billing if status changes back to ACTIVE
    // 3. Send confirmation emails
    // 4. Update payment processor subscription status

    return NextResponse.json({
      subscription: updatedSubscription,
      message: 'Subscription updated successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating subscription:', error)
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

    const subscriptionId = params.id

    // Verify user owns the subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
        userId: session.user.id,
      },
      include: {
        artist: {
          select: {
            stageName: true,
          },
        },
      },
    })

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Instead of deleting, mark as cancelled to preserve history
    const cancelledSubscription = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    })

    // TODO: In production:
    // 1. Cancel recurring billing immediately
    // 2. Send cancellation confirmation email
    // 3. Optionally provide access until current billing period ends
    // 4. Update payment processor

    return NextResponse.json({
      message: `Subscription to ${existingSubscription.artist.stageName} cancelled successfully`,
    })
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
