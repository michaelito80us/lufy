'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { BackgroundFloat } from '@/components/ui/SmartAnimation'

export interface ProductPreviewProps {
  className?: string
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ className }) => {
  return (
    <div
      className={`flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden ${
        className || ''
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-pink/10 via-transparent to-neon-blue/10 opacity-30"></div>
      <BackgroundFloat
        className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-neon-pink/5 rounded-full blur-3xl"
        delay={0}
      >
        <div />
      </BackgroundFloat>
      <BackgroundFloat
        className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-neon-blue/5 rounded-full blur-3xl"
        delay={2}
      >
        <div />
      </BackgroundFloat>

      {/* Main Preview Container */}
      <div className="relative w-full max-w-2xl">
        {/* Device Frame */}
        <div
          className="relative transform-gpu"
          style={{
            transform: 'perspective(800px) rotateY(-4deg) rotateX(1deg)',
          }}
        >
          {/* Screen Content */}
          <GlassCard
            variant="ultra"
            aura="fuchsia"
            className="overflow-hidden border-2 border-white/10 shadow-2xl"
          >
            <img
              className="w-full h-auto object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/01f8938888-b606e52e19c3c6d87162.png"
              alt="LUFY Artist Dashboard Preview"
            />

            {/* Screen Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 via-transparent to-neon-blue/10 pointer-events-none"></div>
          </GlassCard>

          {/* Floating UI Elements */}
          <FloatingElement
            className="-top-3 -right-3 sm:-top-6 sm:-right-6"
            animationDelay="1s"
            aura="teal"
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Live</span>
            </div>
          </FloatingElement>

          <FloatingElement
            className="-bottom-3 -left-3 sm:-bottom-6 sm:-left-6"
            animationDelay="0.5s"
            aura="fuchsia"
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <i className="fa-solid fa-heart text-neon-pink text-xs sm:text-sm"></i>
              <span className="text-xs text-gray-300">1.2k fans</span>
            </div>
          </FloatingElement>
        </div>

        {/* Feature Callouts */}
        <div className="absolute -left-2 sm:-left-4 lg:-left-8 top-1/3">
          <FeatureCallout
            title="Interactive Player"
            animationDelay="2s"
            aura="fuchsia"
          >
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></div>
          </FeatureCallout>
        </div>

        <div className="absolute -right-2 sm:-right-4 lg:-right-8 top-2/3">
          <FeatureCallout title="Beat Store" animationDelay="1.5s" aura="teal">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-blue rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-pink rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-blue rounded-full"></div>
            </div>
          </FeatureCallout>
        </div>
      </div>
    </div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  animationDelay?: string
  aura?: 'fuchsia' | 'teal'
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  animationDelay,
  aura = 'fuchsia',
}) => {
  return (
    <GlassCard
      className={`absolute p-2 sm:p-4 animate-float ${
        aura === 'fuchsia' ? 'fuchsia-aura' : 'teal-aura'
      } ${className || ''}`}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {children}
    </GlassCard>
  )
}

interface FeatureCalloutProps {
  title: string
  children: React.ReactNode
  animationDelay?: string
  aura?: 'fuchsia' | 'teal'
}

const FeatureCallout: React.FC<FeatureCalloutProps> = ({
  title,
  children,
  animationDelay,
  aura = 'fuchsia',
}) => {
  return (
    <GlassCard
      className={`p-2 sm:p-3 animate-float ${
        aura === 'fuchsia' ? 'fuchsia-aura' : 'teal-aura'
      }`}
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className="text-xs text-gray-300 mb-1">{title}</div>
      {children}
    </GlassCard>
  )
}

export { ProductPreview }
