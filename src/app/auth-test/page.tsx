'use client'

import { useEffect, useState } from 'react'

export default function AuthTestPage() {
  const [authConfig, setAuthConfig] = useState(null)

  useEffect(() => {
    fetch('/api/auth-test')
      .then((res) => res.json())
      .then((data) => setAuthConfig(data))
      .catch((err) => console.error('Failed to fetch auth config:', err))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Configuration Test</h1>
      {authConfig ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(authConfig, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}

      <div className="mt-4">
        <h2 className="text-lg font-semibold">
          Expected Google OAuth Redirect URI:
        </h2>
        <code className="bg-gray-100 p-2 rounded block mt-2">
          http://localhost:3000/api/auth/callback/google
        </code>
        <p className="text-sm text-gray-600 mt-2">
          Make sure this URL is added to your Google OAuth app's authorized
          redirect URIs.
        </p>
      </div>
    </div>
  )
}
