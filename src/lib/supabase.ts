import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Admin client for server-side operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Database types (you can generate these with Supabase CLI)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          emailVerified: boolean
          username: string | null
          name: string | null
          image: string | null
          role: 'ARTIST' | 'SUBSCRIBER' | 'ADMIN'
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          email: string
          emailVerified?: boolean
          username?: string | null
          name?: string | null
          image?: string | null
          role?: 'ARTIST' | 'SUBSCRIBER' | 'ADMIN'
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          email?: string
          emailVerified?: boolean
          username?: string | null
          name?: string | null
          image?: string | null
          role?: 'ARTIST' | 'SUBSCRIBER' | 'ADMIN'
          createdAt?: string
          updatedAt?: string
        }
      }
      artists: {
        Row: {
          id: string
          userId: string
          stageName: string
          bio: string | null
          website: string | null
          socialLinks: any | null
          tier: 'BASIC' | 'PRO' | 'PREMIUM'
          isActive: boolean
          brandColors: any | null
          logo: string | null
          bannerImage: string | null
          subscriptionPrice: number | null
          subscriptionActive: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          userId: string
          stageName: string
          bio?: string | null
          website?: string | null
          socialLinks?: any | null
          tier?: 'BASIC' | 'PRO' | 'PREMIUM'
          isActive?: boolean
          brandColors?: any | null
          logo?: string | null
          bannerImage?: string | null
          subscriptionPrice?: number | null
          subscriptionActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          userId?: string
          stageName?: string
          bio?: string | null
          website?: string | null
          socialLinks?: any | null
          tier?: 'BASIC' | 'PRO' | 'PREMIUM'
          isActive?: boolean
          brandColors?: any | null
          logo?: string | null
          bannerImage?: string | null
          subscriptionPrice?: number | null
          subscriptionActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      tracks: {
        Row: {
          id: string
          artistId: string
          title: string
          description: string | null
          audioUrl: string
          coverArt: string | null
          duration: number | null
          genre: string | null
          isExclusive: boolean
          isPublic: boolean
          playCount: number
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          artistId: string
          title: string
          description?: string | null
          audioUrl: string
          coverArt?: string | null
          duration?: number | null
          genre?: string | null
          isExclusive?: boolean
          isPublic?: boolean
          playCount?: number
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          artistId?: string
          title?: string
          description?: string | null
          audioUrl?: string
          coverArt?: string | null
          duration?: number | null
          genre?: string | null
          isExclusive?: boolean
          isPublic?: boolean
          playCount?: number
          createdAt?: string
          updatedAt?: string
        }
      }
      // Add more table types as needed
    }
  }
}

