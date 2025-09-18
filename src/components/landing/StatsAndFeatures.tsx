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
    <div
      className={`grid grid-cols-3 gap-6 mb-12 animate-fade-in ${
        className || ''
      }`}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div
            className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
          >
            {stat.value}
          </div>
          <div className="text-sm text-gray-400">{stat.label}</div>
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
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in ${
        className || ''
      }`}
    >
      {features.map((feature, index) => (
        <GlassCard key={index} className="flex items-center space-x-3 p-4">
          <IconBox icon={feature.icon} gradient={feature.gradient} size="sm" />
          <span className="text-sm text-gray-300">{feature.label}</span>
        </GlassCard>
      ))}
    </div>
  )
}

export { StatsRow, QuickFeatures }
