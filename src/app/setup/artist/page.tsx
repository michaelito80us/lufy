'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'
import { GlassCard, Button } from '@/components/ui'

// TODO: This should be fetched from the server or moved to a proper metadata export
// export const metadata: Metadata = {
//   title: 'Artist Setup - Lufy',
//   description: 'Set up your artist profile to get started'
// };

interface ArtistSetupData {
  stageName: string
  bio: string
  website: string
  tier: 'BASIC' | 'PRO' | 'PREMIUM'
  subscriptionPrice: string
  socialLinks: {
    instagram?: string
    twitter?: string
    spotify?: string
    youtube?: string
  }
}

export default function ArtistSetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ArtistSetupData>({
    stageName: '',
    bio: '',
    website: '',
    tier: 'BASIC',
    subscriptionPrice: '9.99',
    socialLinks: {},
  })

  const handleInputChange = (field: keyof ArtistSetupData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log('Submitting form data:', formData)

      const response = await fetch('/api/artist/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stageName: formData.stageName,
          bio: formData.bio || null,
          website: formData.website || undefined,
          tier: formData.tier,
          subscriptionPrice: parseFloat(formData.subscriptionPrice) || 0,
          socialLinks: {
            instagram: formData.socialLinks.instagram || undefined,
            twitter: formData.socialLinks.twitter || undefined,
            spotify: formData.socialLinks.spotify || undefined,
            youtube: formData.socialLinks.youtube || undefined,
          },
        }),
      })

      const result = await response.json()
      console.log('API response:', result)

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Failed to create artist profile')
        console.error('API error:', result)
      }
    } catch (error) {
      console.error('Network error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="circuit-bg text-white antialiased min-h-screen font-sans">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <GlassCard className="glass-card rounded-xl p-3 hover:border-neon-pink/50 transition-all duration-300 inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-blue rounded-2xl flex items-center justify-center mx-auto fuchsia-aura">
                <i className="fas fa-music text-2xl"></i>
              </div>
            </GlassCard>
            <h1 className="text-3xl font-bold mb-2">
              Set Up Your Artist Profile
            </h1>
            <p className="text-gray-400">
              Complete your profile to access the full artist dashboard
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Step {step} of 3</span>
              <span className="text-sm text-gray-400">
                {Math.round((step / 3) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-neon-pink to-neon-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Form */}
          <GlassCard className="glass-ultra rounded-3xl p-8 fuchsia-aura">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-exclamation-triangle text-red-400"></i>
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Basic Information
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Stage Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.stageName}
                      onChange={(e) =>
                        handleInputChange('stageName', e.target.value)
                      }
                      placeholder="Your artist name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell your fans about yourself..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange('website', e.target.value)
                      }
                      placeholder="yourwebsite.com (https:// will be added automatically)"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Protocol (https://) will be added automatically if not
                      provided
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Subscription Settings */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Fan Subscriptions
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Artist Tier
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) =>
                        handleInputChange(
                          'tier',
                          e.target.value as 'BASIC' | 'PRO' | 'PREMIUM'
                        )
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-neon-pink transition-colors"
                    >
                      <option value="BASIC">Basic - Limited features</option>
                      <option value="PRO">
                        Pro - More storage & analytics
                      </option>
                      <option value="PREMIUM">Premium - Full features</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Subscription Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.subscriptionPrice}
                        onChange={(e) =>
                          handleInputChange('subscriptionPrice', e.target.value)
                        }
                        placeholder="9.99"
                        className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Set to 0 for free content only
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Social Links */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Social Media</h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Optional: Add your social media links (https:// will be
                      added automatically)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <i className="fab fa-instagram text-pink-400 mr-2"></i>
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={formData.socialLinks.instagram || ''}
                        onChange={(e) =>
                          handleSocialLinkChange('instagram', e.target.value)
                        }
                        placeholder="instagram.com/yourusername"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <i className="fab fa-twitter text-blue-400 mr-2"></i>
                        Twitter
                      </label>
                      <input
                        type="text"
                        value={formData.socialLinks.twitter || ''}
                        onChange={(e) =>
                          handleSocialLinkChange('twitter', e.target.value)
                        }
                        placeholder="twitter.com/yourusername"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <i className="fab fa-spotify text-green-400 mr-2"></i>
                        Spotify
                      </label>
                      <input
                        type="text"
                        value={formData.socialLinks.spotify || ''}
                        onChange={(e) =>
                          handleSocialLinkChange('spotify', e.target.value)
                        }
                        placeholder="open.spotify.com/artist/..."
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <i className="fab fa-youtube text-red-400 mr-2"></i>
                        YouTube
                      </label>
                      <input
                        type="text"
                        value={formData.socialLinks.youtube || ''}
                        onChange={(e) =>
                          handleSocialLinkChange('youtube', e.target.value)
                        }
                        placeholder="youtube.com/@yourchannel"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <div>
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="ghost"
                      className="px-6"
                    >
                      Previous
                    </Button>
                  )}
                </div>

                <div>
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      variant="primary"
                      className="px-6"
                      disabled={step === 1 && !formData.stageName.trim()}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      className="px-8"
                      disabled={loading || !formData.stageName.trim()}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Creating Profile...
                        </>
                      ) : (
                        'Complete Setup'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </GlassCard>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              Need help?{' '}
              <a
                href="#"
                className="text-neon-pink hover:text-neon-blue transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
