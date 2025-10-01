import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is an artist
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { artistProfile: true },
    })

    if (!user?.artistProfile) {
      return NextResponse.json(
        { error: 'Artist profile required' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const coverArt = formData.get('coverArt') as File | null
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const genre = formData.get('genre') as string
    const mood = formData.get('mood') as string
    const bpm = formData.get('bpm') as string
    const key = formData.get('key') as string
    const tags = formData.get('tags') as string
    const isExclusive = formData.get('isExclusive') === 'true'
    const isPublic = formData.get('isPublic') !== 'false'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/mp3',
      'audio/flac',
      'audio/aac',
    ]
    const isValidType =
      allowedTypes.includes(file.type) ||
      file.name.match(/\.(mp3|wav|flac|aac|m4a)$/i)

    if (!isValidType) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Create upload directories
    const uploadDir = join(
      process.cwd(),
      'public',
      'uploads',
      'music',
      user.artistProfile.id
    )
    const coverArtDir = join(
      process.cwd(),
      'public',
      'uploads',
      'covers',
      user.artistProfile.id
    )

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }
    if (!existsSync(coverArtDir)) {
      await mkdir(coverArtDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${title.replace(
      /[^a-zA-Z0-9]/g,
      '-'
    )}.${fileExtension}`
    const filePath = join(uploadDir, fileName)

    // Save audio file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Handle cover art if provided
    let coverArtUrl = null
    if (coverArt) {
      const coverExtension = coverArt.name.split('.').pop()
      const coverFileName = `${timestamp}-cover.${coverExtension}`
      const coverFilePath = join(coverArtDir, coverFileName)

      const coverBytes = await coverArt.arrayBuffer()
      const coverBuffer = Buffer.from(coverBytes)
      await writeFile(coverFilePath, coverBuffer)

      coverArtUrl = `/uploads/covers/${user.artistProfile.id}/${coverFileName}`
    }

    // Parse tags
    let parsedTags: string[] = []
    try {
      if (tags) {
        parsedTags = JSON.parse(tags)
      }
    } catch (error) {
      console.warn('Failed to parse tags:', error)
    }

    // Create database record
    const track = await prisma.track.create({
      data: {
        artistId: user.artistProfile.id,
        title,
        description,
        genre,
        audioUrl: `/uploads/music/${user.artistProfile.id}/${fileName}`,
        coverArt: coverArtUrl,
        isExclusive,
        isPublic,
        duration: null, // Will be extracted later
      },
    })

    // TODO: Extract metadata and generate waveform in background job
    // For now, we'll return the track immediately

    return NextResponse.json({
      success: true,
      track: {
        id: track.id,
        title: track.title,
        audioUrl: track.audioUrl,
        coverArt: track.coverArt,
        isExclusive: track.isExclusive,
        isPublic: track.isPublic,
        genre: track.genre,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
