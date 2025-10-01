'use client'

import { useEffect, useState, useCallback } from 'react'

interface UseScrollDetectionOptions {
  threshold?: number
  debounceMs?: number
}

export function useScrollDetection({
  threshold = 5,
  debounceMs = 150,
}: UseScrollDetectionOptions = {}) {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  )
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Determine scroll direction
    if (Math.abs(currentScrollY - lastScrollY) > threshold) {
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setLastScrollY(currentScrollY)
    }

    // Set scrolling state
    setIsScrolling(true)
  }, [lastScrollY, threshold])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const debouncedScrollEnd = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, debounceMs)
    }

    const scrollListener = () => {
      handleScroll()
      debouncedScrollEnd()
    }

    window.addEventListener('scroll', scrollListener, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollListener)
      clearTimeout(timeoutId)
    }
  }, [handleScroll, debounceMs])

  return {
    isScrolling,
    scrollDirection,
    scrollY: lastScrollY,
  }
}
