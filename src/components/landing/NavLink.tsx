'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Handle smooth scrolling for anchor links
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    } else {
      // For external links, navigate normally
      window.location.href = href
    }
    
    onClick?.()
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'nav-item text-white/80 hover:text-white transition-all duration-300 cursor-pointer',
        className
      )}
    >
      {children}
    </a>
  )
}

export { NavLink }