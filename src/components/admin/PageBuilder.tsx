'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui'

const blockTemplates = {
  music: {
    id: 'music-block',
    title: 'Music',
    icon: 'fa-music',
    color: 'neon-blue',
    description: 'Player, top tracks, and videos',
  },
  'music-player': {
    id: 'music-player-block',
    title: 'Music Player',
    icon: 'fa-play',
    color: 'neon-blue',
    description: 'Audio player controls',
  },
  'music-tracks': {
    id: 'music-tracks-block',
    title: 'Top Tracks',
    icon: 'fa-fire',
    color: 'neon-pink',
    description: 'Popular tracks list',
  },
  'music-videos': {
    id: 'music-videos-block',
    title: 'Videos',
    icon: 'fa-video',
    color: 'neon-pink',
    description: 'Music video gallery',
  },
  beats: {
    id: 'beats-block',
    title: 'Beat Store',
    icon: 'fa-waveform-lines',
    color: 'neon-pink',
    description: 'Beat marketplace',
  },
  merch: {
    id: 'merch-block',
    title: 'Merch',
    icon: 'fa-shirt',
    color: 'neon-blue',
    description: 'Merchandise store',
  },
  shows: {
    id: 'shows-block',
    title: 'Upcoming Shows',
    icon: 'fa-calendar',
    color: 'neon-pink',
    description: 'Concert dates and venues',
  },
}

export function PageBuilder() {
  const [visibleBlocks, setVisibleBlocks] = useState<Set<string>>(new Set())

  const toggleBlock = (blockType: string) => {
    const newVisibleBlocks = new Set(visibleBlocks)
    if (newVisibleBlocks.has(blockType)) {
      newVisibleBlocks.delete(blockType)
    } else {
      newVisibleBlocks.add(blockType)
    }
    setVisibleBlocks(newVisibleBlocks)
  }

  return (
    <section className="p-3 md:p-6">
      <div className="w-full">
        {/* Preview Frame */}
        <div
          className="preview-frame w-full"
          style={{ height: '600px', minHeight: '400px' }}
        >
          <div className="h-full overflow-auto circuit-bg">
            {/* Hero Banner - Always visible */}
            <div className="relative h-32 md:h-48 overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9fe6571c1c-b062c9549a7477911619.png"
                alt="futuristic silhouetted artist with neon gradient glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">
                  LUFY
                </h1>
                <p className="text-gray-300 mb-3">
                  Experience the future of sound
                </p>
                <button className="py-2 px-6 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full font-medium w-fit">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Main Content Grid - All sections inline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 p-3 md:p-4">
              {/* Music Components - Individual toggles */}
              {/* Music Player */}
              {visibleBlocks.has('music-player') && (
                <GlassCard aura="fuchsia" className="p-3 md:p-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-music text-neon-blue mr-2"></i>
                    Music Player
                  </h3>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-darker-bg rounded-lg mx-auto mb-3 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8c4df2391b-07291eea8f01736f2de4.png"
                        alt="album cover"
                      />
                    </div>
                    <p className="text-sm font-medium mb-1">Neon Dreams</p>
                    <p className="text-xs text-gray-400 mb-3">
                      LUFY • Cybernetic EP
                    </p>
                    <div className="flex justify-center space-x-3 mb-3">
                      <button className="text-gray-400 hover:text-white">
                        <i className="fa-solid fa-backward-step"></i>
                      </button>
                      <button className="w-8 h-8 rounded-full bg-neon-pink/20 flex items-center justify-center">
                        <i className="fa-solid fa-pause text-xs"></i>
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <i className="fa-solid fa-forward-step"></i>
                      </button>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full">
                      <div className="h-1 w-2/3 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></div>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Top Tracks */}
              {visibleBlocks.has('music-tracks') && (
                <GlassCard aura="fuchsia" className="p-3 md:p-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-between text-sm md:text-base">
                    <span>
                      <i className="fa-solid fa-fire text-neon-pink mr-2"></i>
                      Top Tracks
                    </span>
                    <span className="text-xs text-neon-pink hover:text-neon-blue cursor-pointer">
                      View All
                    </span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-gray-400 w-6">01</span>
                      <div className="ml-2 flex-1">
                        <div className="font-medium">Neon Dreams</div>
                        <div className="text-xs text-gray-400">
                          3:45 • 2.4M plays
                        </div>
                      </div>
                      <button className="text-neon-blue">
                        <i className="fa-solid fa-play text-sm"></i>
                      </button>
                    </div>
                    <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-gray-400 w-6">02</span>
                      <div className="ml-2 flex-1">
                        <div className="font-medium">Digital Heartbeat</div>
                        <div className="text-xs text-gray-400">
                          4:12 • 1.8M plays
                        </div>
                      </div>
                      <button className="text-neon-blue">
                        <i className="fa-solid fa-play text-sm"></i>
                      </button>
                    </div>
                    <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-gray-400 w-6">03</span>
                      <div className="ml-2 flex-1">
                        <div className="font-medium">Cybernetic Love</div>
                        <div className="text-xs text-gray-400">
                          3:58 • 1.5M plays
                        </div>
                      </div>
                      <button className="text-neon-blue">
                        <i className="fa-solid fa-play text-sm"></i>
                      </button>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Videos */}
              {visibleBlocks.has('music-videos') && (
                <GlassCard aura="teal" className="p-3 md:p-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-between text-sm md:text-base">
                    <span>
                      <i className="fa-solid fa-video text-neon-pink mr-2"></i>
                      New Videos
                    </span>
                    <span className="text-xs text-neon-pink hover:text-neon-blue cursor-pointer">
                      View All
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-video bg-darker-bg rounded-md overflow-hidden group">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2c45a6e817-00bf2a73db133528722d.png"
                        alt="futuristic music video still"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-full bg-neon-pink/80 flex items-center justify-center">
                          <i className="fa-solid fa-play text-xs"></i>
                        </button>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-darker-bg rounded-md overflow-hidden group">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6e0992c5ba-c590638b7ffb652c1ebd.png"
                        alt="cyberpunk music video scene"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-full bg-neon-pink/80 flex items-center justify-center">
                          <i className="fa-solid fa-play text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Beats Section - Single card when toggled */}
              {visibleBlocks.has('beats') && (
                <GlassCard aura="fuchsia" className="p-3 md:p-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-shopping-cart text-neon-pink mr-2"></i>
                    Beat Store
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 rounded-lg bg-white/5">
                      <div className="w-8 h-8 bg-darker-bg rounded-md flex items-center justify-center mr-2">
                        <i className="fa-solid fa-waveform-lines text-neon-blue text-xs"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Cyber Trap Beat
                        </div>
                        <div className="text-xs text-gray-400">140 BPM</div>
                      </div>
                      <span className="text-neon-pink font-bold text-sm">
                        $25
                      </span>
                    </div>
                    <div className="flex items-center p-2 rounded-lg bg-white/5">
                      <div className="w-8 h-8 bg-darker-bg rounded-md flex items-center justify-center mr-2">
                        <i className="fa-solid fa-waveform-lines text-neon-blue text-xs"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Neon Synthwave
                        </div>
                        <div className="text-xs text-gray-400">128 BPM</div>
                      </div>
                      <span className="text-neon-pink font-bold text-sm">
                        $30
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-neon-pink hover:text-neon-blue cursor-pointer">
                      View All Beats
                    </span>
                  </div>
                </GlassCard>
              )}

              {/* Merch Section - Single card when toggled */}
              {visibleBlocks.has('merch') && (
                <GlassCard aura="teal" className="p-3 md:p-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-shirt text-neon-pink mr-2"></i>
                    Merch
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-darker-bg rounded-md overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1ba5b10d4b-2015555b1c2bb36fc781.png"
                        alt="t-shirt"
                      />
                    </div>
                    <div className="aspect-square bg-darker-bg rounded-md overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a2b9482bef-7fe9a5de4dc27cb420ad.png"
                        alt="hoodie"
                      />
                    </div>
                    <div className="aspect-square bg-darker-bg rounded-md overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6af2c1024e-7db90792abe4082f0daa.png"
                        alt="cap"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-neon-pink hover:text-neon-blue cursor-pointer">
                      View All Merch
                    </span>
                  </div>
                </GlassCard>
              )}

              {/* Shows Section - Single card when toggled */}
              {visibleBlocks.has('shows') && (
                <GlassCard aura="fuchsia" className="p-3 md:p-4">
                  <h3 className="font-semibold mb-3 flex items-center justify-center">
                    <i className="fa-solid fa-calendar text-neon-blue mr-2"></i>
                    Upcoming Shows
                  </h3>
                  <div className="h-16 bg-darker-bg rounded-md flex items-center justify-center mb-3">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e1f17dea39-9af08c3d9d38505add97.png"
                      alt="world map"
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Tokyo - Cyber Arena</span>
                      <span className="text-xs text-gray-400">Aug 15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>London - Future Hall</span>
                      <span className="text-xs text-gray-400">Sep 03</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-neon-pink hover:text-neon-blue cursor-pointer">
                      View All Shows
                    </span>
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Sections Palette */}
        <div className="mt-6 md:mt-8">
          <h3 className="text-base md:text-lg font-semibold mb-4">
            Toggle Sections
          </h3>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {Object.entries(blockTemplates)
              .filter(([blockType]) => blockType !== 'music') // Remove the main music toggle
              .map(([blockType, block]) => (
                <button
                  key={blockType}
                  onClick={() => toggleBlock(blockType)}
                  className={`glass-card hover-fuchsia-aura p-2 md:p-3 rounded-lg cursor-pointer transition-all ${
                    visibleBlocks.has(blockType) ? 'fuchsia-aura' : ''
                  }`}
                >
                  <i
                    className={`fa-solid ${block.icon} text-${block.color} mb-1 md:mb-2 block text-center text-sm`}
                  ></i>
                  <span className="text-xs text-center block font-medium leading-tight">
                    {block.title}
                  </span>
                  <span className="text-xs text-center block text-gray-400 mt-1 leading-tight">
                    {block.description}
                  </span>
                  <i
                    className={`fa-solid ${
                      visibleBlocks.has(blockType)
                        ? 'fa-eye text-neon-blue'
                        : 'fa-eye-slash text-gray-400'
                    } text-xs mt-1 md:mt-2 block text-center`}
                  ></i>
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
