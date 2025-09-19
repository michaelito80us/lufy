import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get('artistId');
    const isPublic = searchParams.get('public') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    // Build where clause
    const where: any = {};
    
    if (artistId) {
      where.artistId = artistId;
    }
    
    if (isPublic) {
      where.isPublic = true;
    }
    
    if (genre) {
      where.genre = genre;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Check if user can access exclusive content
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { 
        artistProfile: true,
        subscriptions: {
          where: { status: 'ACTIVE' }
        }
      }
    });

    // If not the artist or subscriber, filter out exclusive content
    if (artistId && artistId !== user?.artistProfile?.id) {
      const hasSubscription = user?.subscriptions.some(sub => sub.artistId === artistId);
      if (!hasSubscription) {
        where.isExclusive = false;
      }
    }

    const [tracks, total] = await Promise.all([
      prisma.track.findMany({
        where,
        include: {
          artist: {
            select: {
              id: true,
              stageName: true,
              logo: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.track.count({ where })
    ]);

    return NextResponse.json({
      tracks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Tracks fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get('id');

    if (!trackId) {
      return NextResponse.json({ error: 'Track ID required' }, { status: 400 });
    }

    // Check if user owns the track
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { artistProfile: true }
    });

    if (!user?.artistProfile) {
      return NextResponse.json({ error: 'Artist profile required' }, { status: 403 });
    }

    const track = await prisma.track.findUnique({
      where: { id: trackId }
    });

    if (!track || track.artistId !== user.artistProfile.id) {
      return NextResponse.json({ error: 'Track not found or unauthorized' }, { status: 404 });
    }

    await prisma.track.delete({
      where: { id: trackId }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Track delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}