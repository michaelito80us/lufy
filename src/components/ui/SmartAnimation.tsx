'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface SmartAnimationProps {
  children: React.ReactNode
  animationClass: string
  className?: string
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  pauseOnScroll?: boolean
  fallbackClass?: string
  style?: React.CSSProperties
}

export const SmartAnimation: React.FC<SmartAnimationProps> = ({
  children,
  animationClass,
  className,
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = true,
  pauseOnScroll = true,
  fallbackClass = 'opacity-0',
  style,
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Disable scroll detection to prevent weird animation pausing effects
  const isScrolling = false

  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  })

  // Check if this is an infinite animation
  const isInfiniteAnimation = useMemo(() => {
    return (
      animationClass.includes('float') ||
      animationClass.includes('pulse') ||
      animationClass.includes('breath')
    )
  }, [animationClass])

  // Determine if animation should be active
  const shouldAnimate = useMemo(() => {
    if (isMobile && isInfiniteAnimation) return false // Disable infinite animations on mobile
    if (!isVisible) return false
    return true
  }, [isMobile, isInfiniteAnimation, isVisible])

  // Determine CSS classes
  const animationClasses = useMemo(() => {
    if (isMobile && isInfiniteAnimation) {
      // On mobile, disable infinite animations but keep entrance animations
      return ''
    }
    if (shouldAnimate) {
      return animationClass
    } else if (!isVisible) {
      // Not visible yet - show fallback
      return fallbackClass
    }
    return animationClass
  }, [
    isMobile,
    isInfiniteAnimation,
    shouldAnimate,
    isVisible,
    animationClass,
    fallbackClass,
  ])

  return (
    <div
      ref={elementRef}
      className={cn(animationClasses, className)}
      style={style}
    >
      {children}
    </div>
  )
}

// Convenience components for common animations
export const FadeInAnimation: React.FC<
  Omit<SmartAnimationProps, 'animationClass'>
> = (props) => <SmartAnimation {...props} animationClass="animate-fade-in" />

export const SlideInAnimation: React.FC<
  Omit<SmartAnimationProps, 'animationClass'>
> = (props) => <SmartAnimation {...props} animationClass="animate-slideIn" />

// Optimized FloatAnimation that doesn't block the main thread
export const FloatAnimation: React.FC<
  Omit<
    SmartAnimationProps,
    'animationClass' | 'pauseOnScroll' | 'triggerOnce'
  > & {
    performance?: 'high' | 'standard'
  }
> = ({ performance = 'high', ...props }) => {
  if (performance === 'high') {
    // High-performance version: CSS-only, no JavaScript observers
    return (
      <div
        className={cn('animate-float-optimized', props.className)}
        style={props.style}
      >
        {props.children}
      </div>
    )
  }

  // Standard version with scroll detection (fallback)
  return (
    <SmartAnimation
      {...props}
      animationClass="animate-float"
      triggerOnce={false}
      pauseOnScroll={false} // Disable scroll pausing for better performance
    />
  )
}

// Lightweight floating animation component for background elements
export const BackgroundFloat: React.FC<{
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}> = ({ children, className, style, delay = 0 }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div
      className={cn(isMobile ? '' : 'animate-float-bg', className)}
      style={{
        ...style,
        ...(isMobile
          ? {}
          : {
              animationDelay: `${delay}s`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: 1000,
            }),
      }}
    >
      {children}
    </div>
  )
}
