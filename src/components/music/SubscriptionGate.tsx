'use client'

import React, { useState, useEffect } from 'react'
import { Lock, Crown, Heart, Star, Music } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface Artist {
  id: string
  stageName: string
  logo?: string
  subscriptionPrice: number
  tier: 'EMERGING' | 'RISING' | 'ESTABLISHED' | 'SUPERSTAR'
}

interface SubscriptionGateProps {
  artist: Artist
  isExclusive: boolean
  children: React.ReactNode
  trackTitle?: string
  onSubscribe?: () => void
}

interface Subscription {
  id: string
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED'
  expiresAt: string
}

const tierColors = {
  EMERGING: 'bg-green-500/20 text-green-400 border-green-500/30',
  RISING: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  ESTABLISHED: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  SUPERSTAR: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
}

const tierIcons = {
  EMERGING: Star,
  RISING: Music,
  ESTABLISHED: Crown,
  SUPERSTAR: Heart,
}

export default function SubscriptionGate({
  artist,
  isExclusive,
  children,
  trackTitle,
  onSubscribe,
}: SubscriptionGateProps) {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const getSession = async () => {
      try {
        const sessionData = await authClient.getSession()
        setSession(sessionData)
      } catch (error) {
        console.error('Error getting session:', error)
      }
    }
    getSession()
  }, [])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    if (session?.user && isExclusive) {
      checkSubscription()
    } else {
      setLoading(false)
    }
  }, [session, artist.id, isExclusive])

  const checkSubscription = async () => {
    try {
      const response = await fetch(
        `/api/subscriptions/check?artistId=${artist.id}`
      )
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!session?.user) {
      toast.error('Please sign in to subscribe')
      return
    }

    setSubscribing(true)
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistId: artist.id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
        toast.success(`Successfully subscribed to ${artist.stageName}!`)
        onSubscribe?.()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setSubscribing(false)
    }
  }

  // If not exclusive content, render children directly
  if (!isExclusive) {
    return <>{children}</>
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // If user has active subscription, render children
  if (subscription?.status === 'ACTIVE') {
    return <>{children}</>
  }

  // If user is not subscribed, show subscription gate
  const TierIcon = tierIcons[artist.tier]

  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="filter blur-sm pointer-events-none opacity-50">
        {children}
      </div>

      {/* Subscription gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4 bg-gray-900/95 border-gray-700 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                {artist.logo ? (
                  <img
                    src={artist.logo}
                    alt={artist.stageName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute -top-1 -right-1">
                  <Lock className="w-6 h-6 text-yellow-400 bg-gray-900 rounded-full p-1" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-xl text-white">
                Exclusive Content
              </CardTitle>
              <CardDescription className="text-gray-300">
                {trackTitle ? (
                  <>
                    This track "{trackTitle}" is exclusive to {artist.stageName}{' '}
                    subscribers
                  </>
                ) : (
                  <>
                    This content is exclusive to {artist.stageName} subscribers
                  </>
                )}
              </CardDescription>
            </div>

            <Badge className={`${tierColors[artist.tier]} border`}>
              <TierIcon className="w-3 h-3 mr-1" />
              {artist.tier}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-white">
                ${artist.subscriptionPrice}
                <span className="text-sm text-gray-400 font-normal">
                  /month
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Get unlimited access to all exclusive content
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span>Exclusive tracks and content</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Early access to new releases</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Star className="w-4 h-4 text-purple-400" />
                <span>Behind-the-scenes content</span>
              </div>
            </div>

            <Button
              onClick={handleSubscribe}
              disabled={subscribing || !session?.user}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {subscribing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Subscribing...</span>
                </div>
              ) : !session?.user ? (
                'Sign in to Subscribe'
              ) : (
                `Subscribe for $${artist.subscriptionPrice}/month`
              )}
            </Button>

            {subscription?.status === 'CANCELLED' && (
              <p className="text-xs text-center text-yellow-400">
                Your subscription was cancelled. Resubscribe to access exclusive
                content.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
