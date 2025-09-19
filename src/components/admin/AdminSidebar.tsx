import { GlassCard, Button } from '@/components/ui'

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'branding', icon: 'fa-palette', label: 'Branding' },
  { id: 'pages', icon: 'fa-file-lines', label: 'Site Layout' },
  { id: 'music', icon: 'fa-music', label: 'Music' },
  { id: 'beats', icon: 'fa-waveform-lines', label: 'Beats' },
  { id: 'merch', icon: 'fa-shirt', label: 'Merch' },
  { id: 'subscriptions', icon: 'fa-crown', label: 'Subscriptions' },
  { id: 'shows', icon: 'fa-calendar', label: 'Shows' },
  { id: 'analytics', icon: 'fa-chart-line', label: 'Analytics' },
  { id: 'settings', icon: 'fa-gear', label: 'Settings' },
]

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 glass-ultra fuchsia-aura z-30 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              LUFY
            </h1>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            Artist Dashboard
          </p>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`nav-item flex items-center px-4 py-3 rounded-xl transition-colors cursor-pointer w-full text-left ${
                    activeTab === item.id
                      ? 'glass-card fuchsia-aura text-white'
                      : 'text-gray-400 hover:text-white glass-card hover-fuchsia-aura'
                  }`}
                >
                  <i
                    className={`fa-solid ${item.icon} w-5 ${
                      activeTab === item.id ? 'text-neon-pink' : ''
                    }`}
                  ></i>
                  <span
                    className={`ml-3 ${
                      activeTab === item.id ? 'font-medium' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button className="w-full fuchsia-aura">
            <i className="fa-solid fa-rocket mr-2"></i>
            Publish Site
          </Button>
          <div className="flex items-center justify-center mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
