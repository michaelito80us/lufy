'use client'

import React from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { IconBox } from '@/components/ui/IconBox'

export interface StatsRowProps {
  className?: string
}

const StatsRow: React.FC<StatsRowProps> = ({ className }) => {
  const stats = [
    {
      value: '10K+',
      label: 'Active Artists',
      gradient: 'from-neon-pink to-neon-blue',
    },
    {
      value: '2M+',
      label: 'Fans Connected',
      gradient: 'from-neon-blue to-neon-pink',
    },
    {
      value: '$5M+',
      label: 'Revenue Generated',
      gradient: 'from-neon-pink to-neon-blue',
    },
  ]

  return (
    <div className={`grid grid-cols-3 gap-3 sm:gap-6 mb-12 ${className || ''}`}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div
            className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
          >
            {stat.value}
          </div>
          <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export interface QuickFeaturesProps {
  className?: string
}

const QuickFeatures: React.FC<QuickFeaturesProps> = ({ className }) => {
  const features = [
    {
      icon: 'fa-solid fa-music',
      label: 'Music Player',
      gradient: 'primary' as const,
    },
    {
      icon: 'fa-solid fa-shopping-cart',
      label: 'Beat Store',
      gradient: 'secondary' as const,
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Fan Hub',
      gradient: 'primary' as const,
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Analytics',
      gradient: 'secondary' as const,
    },
  ]

  return (
    <div className="flex justify-center mt-6 w-full">
      <div className="w-full max-w-full">
        {/* Mobile: 2x2 Grid, Desktop: Horizontal row */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:gap-2 px-2 sm:px-4">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 sm:py-3 min-w-0 flex-shrink-0 justify-center sm:justify-start"
            >
              <IconBox
                icon={feature.icon}
                gradient={feature.gradient}
                size="sm"
              />
              <span className="text-xs text-gray-300 whitespace-nowrap">
                {feature.label}
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export { StatsRow, QuickFeatures }
