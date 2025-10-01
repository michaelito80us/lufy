'use client'

import React, { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isSocialLoading, setIsSocialLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSocialSignIn = async (provider: 'google') => {
    setIsSocialLoading(true)
    setError('')
    console.log('Attempting social sign in with:', provider)
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard',
      })
      console.log('Social sign in result:', result)
      // If successful, we should be redirected, so no need to reset loading
    } catch (err) {
      console.error(`${provider} sign in error:`, err)
      setError(`Failed to sign in with ${provider}. Please try again.`)
      toast.error(`Failed to sign in with ${provider}`)
      setIsSocialLoading(false)
    }
  }

  return (
    <div className="circuit-bg text-white antialiased overflow-x-hidden min-h-screen font-sans">
      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute top-3/4 left-1/2 w-64 h-64 bg-neon-pink/3 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '4s' }}
      ></div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <GlassCard className="glass-card rounded-xl p-3 hover:border-neon-pink/50 transition-all duration-300 inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-blue rounded-2xl flex items-center justify-center mx-auto fuchsia-aura">
                <i className="fas fa-music text-xl sm:text-2xl"></i>
              </div>
            </GlassCard>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome to Lufy
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Sign in to access your artist dashboard
            </p>
          </div>

          {/* Social Login */}
          <GlassCard className="glass-ultra rounded-3xl p-8 fuchsia-aura animate-slideIn">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-6">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-center mb-6">
                Sign in to continue
              </h2>

              <button
                onClick={() => handleSocialSignIn('google')}
                disabled={isSocialLoading}
                className="social-btn google disabled:opacity-50"
              >
                {isSocialLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin text-lg"></i>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <i className="fab fa-google text-lg"></i>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>
          </GlassCard>

          {/* Footer */}
          <div className="mt-8 text-center">
            <GlassCard className="glass-card rounded-2xl p-6">
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                Join the revolution in music creation and distribution
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span>10K+ Artists</span>
                <span>2M+ Fans</span>
                <span>$5M+ Revenue</span>
              </div>
            </GlassCard>
          </div>

          {/* Floating Feature Cards */}
          <div className="fixed bottom-20 left-4 hidden lg:block">
            <GlassCard className="glass-card rounded-full px-4 py-2 animate-float teal-aura">
              <span className="text-xs">🎵 Music Player</span>
            </GlassCard>
          </div>

          <div className="fixed top-20 right-4 hidden lg:block">
            <GlassCard
              className="glass-card rounded-full px-4 py-2 animate-float fuchsia-aura"
              style={{ animationDelay: '1s' }}
            >
              <span className="text-xs">🥁 Beat Store</span>
            </GlassCard>
          </div>

          <div className="fixed bottom-40 right-8 hidden lg:block">
            <GlassCard
              className="glass-card rounded-full px-4 py-2 animate-float teal-aura"
              style={{ animationDelay: '3s' }}
            >
              <span className="text-xs">❤️ Fan Hub</span>
            </GlassCard>
          </div>

          <div className="fixed top-1/2 left-8 hidden xl:block">
            <GlassCard
              className="glass-card rounded-full px-4 py-2 animate-float fuchsia-aura"
              style={{ animationDelay: '2s' }}
            >
              <span className="text-xs">📊 Analytics</span>
            </GlassCard>
          </div>

          <div className="fixed bottom-1/3 left-12 hidden xl:block">
            <GlassCard
              className="glass-card rounded-full px-4 py-2 animate-float teal-aura"
              style={{ animationDelay: '4s' }}
            >
              <span className="text-xs">👕 Merch Store</span>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
