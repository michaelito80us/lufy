import React from 'react'
import { cn } from '@/lib/utils'

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string
  gradient?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, icon, gradient = 'primary', size = 'md', ...props }, ref) => {
    const gradients = {
      primary: 'bg-gradient-to-r from-neon-pink to-neon-blue',
      secondary: 'bg-gradient-to-r from-neon-blue to-neon-pink',
    }

    const sizes = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-lg',
      lg: 'w-16 h-16 text-2xl',
    }

    return (
      <div
        className={cn(
          'rounded-xl flex items-center justify-center flex-shrink-0',
          gradients[gradient],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        <i className={`${icon} text-white`}></i>
      </div>
    )
  }
)

IconBox.displayName = 'IconBox'

export { IconBox }
