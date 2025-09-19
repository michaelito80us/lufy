import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createArtistSchema = z.object({
  stageName: z.string().min(1).max(100),
  bio: z.string().optional().nullable(),
  website: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === '') return undefined
      // Add protocol if missing
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        return `https://${val}`
      }
      return val
    })
    .refine(
      (val) => {
        if (!val) return true // Allow empty/undefined
        try {
          new URL(val)
          return true
        } catch {
          return false
        }
      },
      { message: 'Invalid URL format' }
    ),
  tier: z.enum(['BASIC', 'PRO', 'PREMIUM']).default('BASIC'),
  subscriptionPrice: z.number().min(0).optional(),
  socialLinks: z
    .object({
      instagram: z
        .string()
        .optional()
        .transform((val) => {
          if (!val || val.trim() === '') return undefined
          if (!val.startsWith('http://') && !val.startsWith('https://')) {
            return `https://${val}`
          }
          return val
        })
        .refine(
          (val) => {
            if (!val) return true
            try {
              new URL(val)
              return true
            } catch {
              return false
            }
          },
          { message: 'Invalid Instagram URL' }
        ),
      twitter: z
        .string()
        .optional()
        .transform((val) => {
          if (!val || val.trim() === '') return undefined
          if (!val.startsWith('http://') && !val.startsWith('https://')) {
            return `https://${val}`
          }
          return val
        })
        .refine(
          (val) => {
            if (!val) return true
            try {
              new URL(val)
              return true
            } catch {
              return false
            }
          },
          { message: 'Invalid Twitter URL' }
        ),
      spotify: z
        .string()
        .optional()
        .transform((val) => {
          if (!val || val.trim() === '') return undefined
          if (!val.startsWith('http://') && !val.startsWith('https://')) {
            return `https://${val}`
          }
          return val
        })
        .refine(
          (val) => {
            if (!val) return true
            try {
              new URL(val)
              return true
            } catch {
              return false
            }
          },
          { message: 'Invalid Spotify URL' }
        ),
      youtube: z
        .string()
        .optional()
        .transform((val) => {
          if (!val || val.trim() === '') return undefined
          if (!val.startsWith('http://') && !val.startsWith('https://')) {
            return `https://${val}`
          }
          return val
        })
        .refine(
          (val) => {
            if (!val) return true
            try {
              new URL(val)
              return true
            } catch {
              return false
            }
          },
          { message: 'Invalid YouTube URL' }
        ),
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already has an artist profile
    const existingArtist = await prisma.artist.findUnique({
      where: { userId: session.user.id },
    })

    if (existingArtist) {
      return NextResponse.json(
        { error: 'Artist profile already exists' },
        { status: 400 }
      )
    }

    const body = await request.json()
    console.log('Received body:', JSON.stringify(body, null, 2))

    const validatedData = createArtistSchema.parse(body)
    console.log('Validated data:', JSON.stringify(validatedData, null, 2))

    // Filter out empty string URLs from social links
    const socialLinks = validatedData.socialLinks
      ? Object.fromEntries(
          Object.entries(validatedData.socialLinks).filter(
            ([_, value]) => value && value.trim() !== ''
          )
        )
      : {}

    console.log('Processed socialLinks:', socialLinks)

    // Create artist profile
    const artist = await prisma.artist.create({
      data: {
        userId: session.user.id,
        stageName: validatedData.stageName,
        bio: validatedData.bio || null,
        website: validatedData.website || null,
        tier: validatedData.tier,
        subscriptionPrice: validatedData.subscriptionPrice
          ? parseFloat(validatedData.subscriptionPrice.toString())
          : null,
        subscriptionActive: validatedData.subscriptionPrice
          ? validatedData.subscriptionPrice > 0
          : false,
        socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : null,
        isActive: true,
      },
      select: {
        id: true,
        stageName: true,
        bio: true,
        tier: true,
        subscriptionPrice: true,
        subscriptionActive: true,
        createdAt: true,
      },
    })

    // Update user role to ARTIST
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: 'ARTIST' },
    })

    return NextResponse.json({
      artist,
      message: 'Artist profile created successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating artist profile:', error)
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    )
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
