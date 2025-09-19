import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is an artist
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { artistProfile: true }
    });

    if (!user?.artistProfile) {
      return NextResponse.json({ error: 'Artist profile required' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const genre = formData.get('genre') as string;
    const isExclusive = formData.get('isExclusive') === 'true';
    const isPublic = formData.get('isPublic') !== 'false';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/flac', 'audio/aac'];
    const isValidType = allowedTypes.includes(file.type) || 
                       file.name.match(/\.(mp3|wav|flac|aac|m4a)$/i);
    
    if (!isValidType) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Create upload directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'music', user.artistProfile.id);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${title.replace(/[^a-zA-Z0-9]/g, '-')}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create database record
    const track = await prisma.track.create({
      data: {
        artistId: user.artistProfile.id,
        title,
        description,
        genre,
        audioUrl: `/uploads/music/${user.artistProfile.id}/${fileName}`,
        isExclusive,
        isPublic,
        duration: null, // Will be extracted later
      }
    });

    // TODO: Extract metadata and generate waveform in background job
    // For now, we'll return the track immediately

    return NextResponse.json({
      success: true,
      track: {
        id: track.id,
        title: track.title,
        audioUrl: track.audioUrl,
        isExclusive: track.isExclusive,
        isPublic: track.isPublic
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}