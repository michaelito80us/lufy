'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  icon?: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      icon,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-white/10 text-white hover:bg-white/20 border border-white/20':
              variant === 'default',
            'bg-gradient-to-r from-neon-pink to-neon-blue text-white hover:shadow-lg hover:shadow-neon-pink/30 fuchsia-aura relative overflow-hidden':
              variant === 'primary',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90':
              variant === 'destructive',
            'border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40':
              variant === 'outline',
            'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10':
              variant === 'secondary',
            'text-white/80 hover:text-white hover:bg-white/10 rounded-xl':
              variant === 'ghost',
            'text-neon-pink hover:text-neon-blue underline-offset-4 hover:underline':
              variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3 text-sm': size === 'sm',
            'h-12 rounded-xl px-8 text-base font-semibold': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
        )}
        <div className="relative z-10 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
