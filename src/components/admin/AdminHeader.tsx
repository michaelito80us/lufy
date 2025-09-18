import { Button } from '@/components/ui'

interface AdminHeaderProps {
  activeTab: string
}

const tabTitles = {
  branding: {
    title: 'Brand Settings',
    subtitle: 'Customize your artist branding and visual identity',
  },
  pages: { title: 'Page Builder', subtitle: 'Design your artist website' },
  music: {
    title: 'Music Management',
    subtitle: 'Upload and manage your tracks',
  },
  beats: { title: 'Beat Store', subtitle: 'Manage your beat marketplace' },
  merch: { title: 'Merchandise', subtitle: 'Set up your merch store' },
  subscriptions: {
    title: 'Subscriptions',
    subtitle: 'Manage fan subscriptions',
  },
  shows: {
    title: 'Shows & Events',
    subtitle: 'Schedule and promote your shows',
  },
  analytics: { title: 'Analytics', subtitle: 'Track your performance metrics' },
  settings: { title: 'Settings', subtitle: 'Configure your account settings' },
}

export function AdminHeader({ activeTab }: AdminHeaderProps) {
  const currentTab =
    tabTitles[activeTab as keyof typeof tabTitles] || tabTitles.pages

  return (
    <header className="glass-ultra border-b border-white/10 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-semibold">
            {currentTab.title}
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            {currentTab.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {activeTab === 'pages' && (
            <Button variant="secondary" size="sm">
              <i className="fa-solid fa-eye mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Preview</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
