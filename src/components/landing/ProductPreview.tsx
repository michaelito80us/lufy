'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/GlassCard'

export interface ProductPreviewProps {
  className?: string
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ className }) => {
  return (
    <div
      className={`flex-1 flex items-center justify-center p-6 lg:p-12 relative ${
        className || ''
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-pink/10 via-transparent to-neon-blue/10 opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Main Preview Container */}
      <div
        className="relative w-full max-w-2xl animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        {/* Device Frame */}
        <div
          className="relative transform-gpu"
          style={{
            transform: 'perspective(1200px) rotateY(-8deg) rotateX(2deg)',
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
            className="-top-6 -right-6"
            animationDelay="1s"
            aura="teal"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Live</span>
            </div>
          </FloatingElement>

          <FloatingElement
            className="-bottom-6 -left-6"
            animationDelay="0.5s"
            aura="fuchsia"
          >
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-heart text-neon-pink text-sm"></i>
              <span className="text-xs text-gray-300">1.2k fans</span>
            </div>
          </FloatingElement>
        </div>

        {/* Feature Callouts */}
        <div className="absolute -left-8 top-1/3 hidden lg:block">
          <FeatureCallout
            title="Interactive Player"
            animationDelay="2s"
            aura="fuchsia"
          >
            <div className="w-20 h-1 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></div>
          </FeatureCallout>
        </div>

        <div className="absolute -right-8 top-2/3 hidden lg:block">
          <FeatureCallout title="Beat Store" animationDelay="1.5s" aura="teal">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
              <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
              <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
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
      className={`absolute p-4 animate-float ${
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
      className={`p-3 animate-float ${
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
