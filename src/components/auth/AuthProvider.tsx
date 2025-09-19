'use client'

import React from 'react'

// Better Auth doesn't require a provider like Next Auth
// Session management is handled through hooks and server-side utilities
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
