'use client'

import React from 'react'
import Link from 'next/link'

export interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={`border-t border-white/10 bg-black/20 backdrop-blur-sm ${
        className || ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-xl sm:text-2xl font-display font-bold">
                <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                  LUFY
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
              The future of music platforms. Create your artist empire with
              cutting-edge tools for music streaming, fan engagement, and
              monetization.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                <i className="fab fa-discord text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                <i className="fab fa-youtube text-lg"></i>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/auth/login"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca"
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} Lufy, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Status
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
