import React from 'react'
import { cn } from '@/lib/utils'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'ultra' | 'card'
  aura?: 'fuchsia' | 'teal' | 'none'
  floating?: boolean
  animationDelay?: string
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'card',
      aura = 'none',
      floating = false,
      animationDelay,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'rounded-2xl'

    const variants = {
      ultra: 'glass-ultra',
      card: 'glass-card',
    }

    const auras = {
      fuchsia: 'fuchsia-aura',
      teal: 'teal-aura',
      none: '',
    }

    const floatingClass = floating ? 'floating-element' : ''

    const combinedStyle = animationDelay ? { ...style, animationDelay } : style

    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          auras[aura],
          floatingClass,
          className
        )}
        style={combinedStyle}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export { GlassCard }
