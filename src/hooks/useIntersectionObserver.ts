'use client'

import { useEffect, useState, useRef, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  enabled?: boolean
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  enabled = true,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!enabled) return

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting

        setIsIntersecting(isCurrentlyIntersecting)

        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true)

          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, enabled, hasIntersected])

  return {
    elementRef: elementRef as RefObject<T>,
    isIntersecting,
    hasIntersected,
    isVisible: triggerOnce ? hasIntersected : isIntersecting,
  }
}
