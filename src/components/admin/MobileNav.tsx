interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const mobileNavItems = [
  { id: 'branding', icon: 'fa-palette', label: 'Brand' },
  { id: 'pages', icon: 'fa-file-lines', label: 'Pages' },
  { id: 'music', icon: 'fa-music', label: 'Music' },
  { id: 'merch', icon: 'fa-shirt', label: 'Merch' },
  { id: 'settings', icon: 'fa-gear', label: 'More' },
]

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-ultra border-t border-white/10 z-30 md:hidden safe-area-bottom">
      <div className="flex justify-around py-2">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`mobile-nav-item flex flex-col items-center py-2 px-4 ${
              activeTab === item.id
                ? 'text-neon-pink'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-sm mb-1`}></i>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
