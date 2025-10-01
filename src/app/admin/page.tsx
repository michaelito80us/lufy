'use client'

import { useState } from 'react'
import {
  AdminSidebar,
  AdminHeader,
  PageBuilder,
  MobileNav,
} from '@/components/admin'
import { MusicAdminDashboard } from '@/components/music'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pages')

  const renderContent = () => {
    switch (activeTab) {
      case 'pages':
        return <PageBuilder />
      case 'music':
        return <MusicAdminDashboard />
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
