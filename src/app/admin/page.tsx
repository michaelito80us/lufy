'use client'

import { useState } from 'react'
import {
  AdminSidebar,
  AdminHeader,
  PageBuilder,
  MobileNav,
} from '@/components/admin'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pages')

  const renderContent = () => {
    switch (activeTab) {
      case 'pages':
        return <PageBuilder />
      case 'music':
        return (
          <section className="p-3 md:p-6">
            <div className="glass-card fuchsia-aura rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <i className="fa-solid fa-music text-neon-blue mr-3"></i>
                Music Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Upload New Track</h3>
                  <div className="space-y-3">
                    <input
                      className="w-full bg-darker-bg border border-white/10 rounded-lg px-4 py-2 text-sm"
                      placeholder="Track title"
                    />
                    <button className="w-full py-2 bg-gradient-to-r from-neon-pink to-neon-blue rounded-lg text-sm">
                      Upload Audio
                    </button>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Recent Uploads</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-darker-bg rounded">
                      <span>Neon Dreams</span>
                      <span className="text-green-400">Live</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-darker-bg rounded">
                      <span>Digital Heartbeat</span>
                      <span className="text-yellow-400">Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      case 'branding':
        return (
          <section className="p-3 md:p-6">
            <div className="glass-card fuchsia-aura rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <i className="fa-solid fa-palette text-neon-pink mr-3"></i>
                Brand Settings
              </h2>
              <p className="text-gray-400">
                Customize your artist branding and visual identity.
              </p>
            </div>
          </section>
        )
      default:
        return (
          <section className="p-3 md:p-6">
            <div className="glass-card fuchsia-aura rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Coming Soon</h2>
              <p className="text-gray-400">
                This section is under development.
              </p>
            </div>
          </section>
        )
    }
  }

  return (
    <div className="circuit-bg text-white antialiased overflow-x-hidden font-sans min-h-screen">
      {/* Left Sidebar Navigation */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile Bottom Tab Bar */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="md:pl-64 pb-20 md:pb-0 relative z-10">
        {/* Top Header */}
        <AdminHeader activeTab={activeTab} />

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  )
}
