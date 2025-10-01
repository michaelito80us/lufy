'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

export interface CTAProps {
  className?: string
}

const CTA: React.FC<CTAProps> = ({ className }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission here
    console.log('Email submitted:', email)
    if (email) {
      // Redirect to /auth/login?email=...
      window.location.href = `/auth/login?email=${encodeURIComponent(email)}`
    }
    setEmail('')
  }

  return (
    <div
      className={`glass-ultra border-t border-white/10 p-6 ${className || ''}`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm sm:text-base text-gray-400 mb-4">
          Ready to transform your music career?
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors min-w-[300px]"
            required
            suppressHydrationWarning
          />
          <Button
            type="submit"
            variant="primary"
            className="hover:scale-105 transition-transform"
          >
            Get Early Access
          </Button>
        </form>
      </div>
    </div>
  )
}

export { CTA }
