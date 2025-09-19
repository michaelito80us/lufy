import { NextResponse } from 'next/server'

export async function GET() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
  const betterAuthUrl = process.env.BETTER_AUTH_URL

  return NextResponse.json({
    hasGoogleClientId: !!googleClientId,
    hasGoogleClientSecret: !!googleClientSecret,
    betterAuthUrl,
    googleClientIdLength: googleClientId?.length,
    // Don't expose the actual secret, just check if it exists
  })
}
