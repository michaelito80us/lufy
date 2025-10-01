'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { IconBox } from '@/components/ui/IconBox'

export interface FeaturesProps {
  className?: string
}

const Features: React.FC<FeaturesProps> = ({ className }) => {
  const features = [
    {
      icon: 'fa-solid fa-music',
      title: 'Interactive Music Player',
      description:
        'Showcase your tracks with a stunning holographic player featuring real-time visualizations and seamless streaming.',
      gradient: 'primary' as const,
      aura: 'fuchsia' as const,
      items: [
        'Real-time audio visualizations',
        'Playlist management',
        'Social sharing integration',
      ],
      checkColor: 'text-neon-pink',
    },
    {
      icon: 'fa-solid fa-shopping-cart',
      title: 'Beat Store',
      description:
        'Monetize your beats with an integrated store featuring instant downloads and licensing options.',
      gradient: 'secondary' as const,
      aura: 'teal' as const,
      items: [
        'Instant beat sales',
        'Licensing management',
        'Revenue analytics',
      ],
      checkColor: 'text-neon-blue',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Fan Engagement Hub',
      description:
        'Connect directly with your audience through exclusive content, live streams, and fan subscriptions.',
      gradient: 'primary' as const,
      aura: 'fuchsia' as const,
      items: ['Exclusive content drops', 'Live streaming', 'Fan subscriptions'],
      checkColor: 'text-neon-pink',
    },
    {
      icon: 'fa-solid fa-chart-line',
      title: 'Advanced Analytics',
      description:
        'Track your growth with detailed insights on plays, sales, and fan engagement metrics.',
      gradient: 'secondary' as const,
      aura: 'teal' as const,
      items: ['Real-time statistics', 'Revenue tracking', 'Audience insights'],
      checkColor: 'text-neon-blue',
    },
    {
      icon: 'fa-solid fa-tshirt',
      title: 'Merchandise Store',
      description:
        'Sell branded merchandise with integrated inventory management and order fulfillment.',
      gradient: 'primary' as const,
      aura: 'fuchsia' as const,
      items: ['Product catalog', 'Order management', 'Shipping integration'],
      checkColor: 'text-neon-pink',
    },
    {
      icon: 'fa-solid fa-calendar',
      title: 'Tour Management',
      description:
        'Manage your shows and tours with interactive maps, ticket sales, and fan notifications.',
      gradient: 'secondary' as const,
      aura: 'teal' as const,
      items: ['Event calendar', 'Ticket integration', 'Fan notifications'],
      checkColor: 'text-neon-blue',
    },
  ]

  return (
    <section className={`py-20 px-6 lg:px-12 relative ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Professional tools designed for modern artists who want to build,
            engage, and monetize their fanbase
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              aura={feature.aura}
              className="p-8 hover:scale-105 transition-all duration-300"
            >
              <IconBox
                icon={feature.icon}
                gradient={feature.gradient}
                size="lg"
                className="mb-6"
              />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <i
                      className={`fa-solid fa-check ${feature.checkColor} mr-2`}
                    ></i>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Features }
