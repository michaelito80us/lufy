import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'
import { z } from 'zod'

const prisma = new PrismaClient()

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('coverArt') as File
    const trackId = formData.get('trackId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!trackId) {
      return NextResponse.json(
        { error: 'Track ID is required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Verify user owns the track
    const track = await prisma.track.findFirst({
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

    if (!track) {
      return NextResponse.json(
        { error: 'Track not found or access denied' },
        { status: 404 }
      )
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${randomUUID()}.${fileExtension}`

    // Create directory structure
    const uploadDir = join(
      process.cwd(),
      'public',
      'uploads',
      'cover-art',
      track.artist.id
    )
    await mkdir(uploadDir, { recursive: true })

    // Save file
    const filePath = join(uploadDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Generate public URL
    const coverArtUrl = `/uploads/cover-art/${track.artist.id}/${fileName}`

    // Update track with new cover art URL
    const updatedTrack = await prisma.track.update({
      where: { id: trackId },
      data: { coverArt: coverArtUrl },
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

    return NextResponse.json({
      coverArtUrl,
      track: updatedTrack,
    })
  } catch (error) {
    console.error('Error uploading cover art:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const trackId = searchParams.get('trackId')

    if (!trackId) {
      return NextResponse.json(
        { error: 'Track ID is required' },
        { status: 400 }
      )
    }

    // Verify user owns the track
    const track = await prisma.track.findFirst({
      where: {
        id: trackId,
        artist: {
          userId: session.user.id,
        },
      },
    })

    if (!track) {
      return NextResponse.json(
        { error: 'Track not found or access denied' },
        { status: 404 }
      )
    }

    // Remove cover art from track
    const updatedTrack = await prisma.track.update({
      where: { id: trackId },
      data: { coverArt: null },
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

    // Note: In a production environment, you might also want to delete the physical file
    // from the filesystem, but be careful about race conditions and ensure the file
    // isn't being used by other tracks

    return NextResponse.json({
      message: 'Cover art removed successfully',
      track: updatedTrack,
    })
  } catch (error) {
    console.error('Error removing cover art:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
