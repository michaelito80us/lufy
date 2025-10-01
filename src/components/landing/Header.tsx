'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { IconBox } from '@/components/ui/IconBox'
import { NavLink } from './NavLink'
import Link from 'next/link'

export interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-enhanced border-b border-white/20 backdrop-blur-xl py-3 lg:py-4'
          : 'glass-ultra border-b border-white/10 py-4 lg:py-6'
      } ${className || ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <IconBox icon="fa-solid fa-music" gradient="primary" size="md" />
          <h1 className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            LUFY
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <Link href="/auth/login">
            <button className="px-6 py-2 bg-gradient-to-r from-neon-pink/25 to-neon-blue/25 border border-white/20 rounded-xl text-white hover:border-neon-pink/50 transition-all">
              Continue
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <i className="fa-solid fa-bars text-lg sm:text-xl"></i>
        </button>
      </div>
    </header>
  )
}

export { Header }
