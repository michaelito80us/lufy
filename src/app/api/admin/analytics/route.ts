import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/admin/analytics - Get artist analytics
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
    const timeframe = searchParams.get('timeframe') || '30d' // 7d, 30d, 90d, 1y

    // Calculate date range
    const now = new Date()
    let startDate: Date

    switch (timeframe) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default: // 30d
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    // Get basic counts
    const [totalTracks, activeSubscribers, totalSubscribers] =
      await Promise.all([
        prisma.track.count({
          where: { artistId: artist.id },
        }),
        prisma.subscription.count({
          where: {
            artistId: artist.id,
            status: 'ACTIVE',
          },
        }),
        prisma.subscription.count({
          where: { artistId: artist.id },
        }),
      ])

    // Get tracks with play and like counts
    const tracks = await prisma.track.findMany({
      where: { artistId: artist.id },
      select: {
        id: true,
        plays: true,
        likes: true,
      },
    })

    const totalPlays = tracks.reduce((sum, track) => sum + track.plays, 0)
    const totalLikes = tracks.reduce((sum, track) => sum + track.likes, 0)

    // Calculate monthly revenue from active subscriptions
    const activeSubscriptionsWithAmount = await prisma.subscription.findMany({
      where: {
        artistId: artist.id,
        status: 'ACTIVE',
      },
      select: {
        amount: true,
      },
    })

    const monthlyRevenue = activeSubscriptionsWithAmount.reduce(
      (sum, sub) => sum + parseFloat(sub.amount.toString()),
      0
    )

    // Get recent plays data (mock data for now - would need play tracking table)
    const recentPlays = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      recentPlays.push({
        date: date.toISOString().split('T')[0],
        plays: Math.floor(Math.random() * 100) + 10, // Mock data
      })
    }

    // Get top tracks
    const topTracks = await prisma.track.findMany({
      where: { artistId: artist.id },
      orderBy: {
        plays: 'desc',
      },
      take: 10,
      select: {
        id: true,
        title: true,
        plays: true,
        likes: true,
        coverArt: true,
        createdAt: true,
      },
    })

    // Get subscriber growth data
    const subscriberGrowth = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayStart = new Date(date.setHours(0, 0, 0, 0))
      const dayEnd = new Date(date.setHours(23, 59, 59, 999))

      const newSubscribers = await prisma.subscription.count({
        where: {
          artistId: artist.id,
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      })

      subscriberGrowth.push({
        date: dayStart.toISOString().split('T')[0],
        subscribers: newSubscribers,
      })
    }

    // Get revenue breakdown by subscription tier (if applicable)
    const revenueBreakdown = await prisma.subscription.groupBy({
      by: ['amount'],
      where: {
        artistId: artist.id,
        status: 'ACTIVE',
      },
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    })

    // Get geographic data (mock for now)
    const geographicData = [
      {
        country: 'United States',
        subscribers: Math.floor(activeSubscribers * 0.4),
      },
      {
        country: 'United Kingdom',
        subscribers: Math.floor(activeSubscribers * 0.2),
      },
      { country: 'Canada', subscribers: Math.floor(activeSubscribers * 0.15) },
      {
        country: 'Australia',
        subscribers: Math.floor(activeSubscribers * 0.1),
      },
      { country: 'Germany', subscribers: Math.floor(activeSubscribers * 0.08) },
      { country: 'Other', subscribers: Math.floor(activeSubscribers * 0.07) },
    ]

    // Calculate engagement metrics
    const avgPlaysPerTrack =
      totalTracks > 0 ? Math.round(totalPlays / totalTracks) : 0
    const avgLikesPerTrack =
      totalTracks > 0 ? Math.round(totalLikes / totalTracks) : 0
    const engagementRate =
      totalPlays > 0 ? ((totalLikes / totalPlays) * 100).toFixed(2) : '0'

    // Get recent activity
    const recentActivity = await prisma.track.findMany({
      where: {
        artistId: artist.id,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      select: {
        id: true,
        title: true,
        createdAt: true,
        plays: true,
        likes: true,
      },
    })

    return NextResponse.json({
      // Overview metrics
      totalTracks,
      totalPlays,
      totalLikes,
      totalSubscribers: activeSubscribers,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,

      // Engagement metrics
      avgPlaysPerTrack,
      avgLikesPerTrack,
      engagementRate: parseFloat(engagementRate),

      // Time series data
      recentPlays,
      subscriberGrowth,

      // Top content
      topTracks,

      // Revenue data
      revenueBreakdown: revenueBreakdown.map((item) => ({
        tier: `$${item.amount}/month`,
        subscribers: item._count.id,
        revenue: parseFloat(item._sum.amount?.toString() || '0'),
      })),

      // Geographic data
      geographicData,

      // Recent activity
      recentActivity,

      // Metadata
      timeframe,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
