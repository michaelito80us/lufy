import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import MusicAdminDashboard from '@/components/music/MusicAdminDashboard'

const prisma = new PrismaClient()

export const metadata: Metadata = {
  title: 'Dashboard - Lufy',
  description: 'Manage your music library and fan engagement',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    redirect('/auth/login')
  }

  // Check if user is an artist
  const artist = await prisma.artist.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      stageName: true,
      bio: true,
      tier: true,
      subscriptionPrice: true,
      isActive: true,
    },
  })

  if (!artist) {
    // Redirect to artist setup if not an artist yet
    redirect('/setup/artist')
  }

  return (
    <div className="min-h-screen">
      <MusicAdminDashboard />
    </div>
  )
}
