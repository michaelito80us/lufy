'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div
      className={`flex-1 flex flex-col justify-center px-6 lg:px-12 py-12 lg:py-20 relative z-10 ${
        className || ''
      }`}
    >
      <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl">
        {/* Main Hero Text */}
        <div className="mb-12 animate-slide-in">
          <div className="mb-2">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 border border-white/20 rounded-full text-sm text-gray-300 mb-6">
              ✨ The Future of Music Platforms
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Create Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Artist Empire
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-6 leading-relaxed">
            Build a stunning futuristic dashboard that showcases your music,
            engages fans, and grows your brand.
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-xl">
            Join thousands of artists using LUFY's cutting-edge platform with
            holographic interfaces, beat stores, and direct fan monetization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="primary" size="lg" className="shadow-2xl">
              Start Building Free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<i className="fa-solid fa-play"></i>}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
