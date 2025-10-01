'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'

export interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={`${className || ''}`}>
      {/* Main Hero Text */}
      <div className="animate-slideIn">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 border border-white/20 rounded-full text-sm text-gray-300">
            ✨ The Future of Music Platforms
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-neon-pink to-neon-blue bg-clip-text text-transparent">
            Create Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            Artist Empire
          </span>
        </h1>

        <p className="text-lg lg:text-xl text-gray-300 mb-6 leading-relaxed max-w-lg">
          Build a stunning futuristic dashboard that showcases your music,
          engages fans, and grows your brand.
        </p>

        <p className="text-base text-gray-400 mb-12 max-w-lg">
          Join thousands of artists using LUFY's cutting-edge platform with
          holographic interfaces, beat stores, and direct fan monetization.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="/auth/login">
            <Button variant="primary" size="lg" className="shadow-2xl">
              Start Building Free
            </Button>
          </a>
          <Button
            variant="secondary"
            size="lg"
            icon={<i className="fa-solid fa-play"></i>}
            className="border-white/20 hover:border-white/40"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Hero }
