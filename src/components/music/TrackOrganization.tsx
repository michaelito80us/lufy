'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Grid, List, Play, MoreHorizontal, Trash2, Edit, Lock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MusicPlayer } from './MusicPlayer';

interface Track {
  id: string;
  title: string;
  audioUrl: string;
  coverArt?: string;
  duration?: number;
  isExclusive: boolean;
  createdAt: string;
  artist: {
    id: string;
    stageName: string;
    logo?: string;
  };
}

interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt?: string;
  tracks: Track[];
  isPublic: boolean;
  createdAt: string;
}

interface TrackOrganizationProps {
  artistId: string;
  canEdit?: boolean;
}

export function TrackOrganization({ artistId, canEdit = false }: TrackOrganizationProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'tracks' | 'playlists'>('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'exclusive' | 'public'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  // Fetch tracks and playlists
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch tracks
        const tracksResponse = await fetch(`/api/music/tracks?artistId=${artistId}`);
        if (tracksResponse.ok) {
          const tracksData = await tracksResponse.json();
          setTracks(tracksData.tracks || []);
        }
        
        // Fetch playlists
        const playlistsResponse = await fetch(`/api/music/playlists?artistId=${artistId}`);
        if (playlistsResponse.ok) {
          const playlistsData = await playlistsResponse.json();
          setPlaylists(playlistsData.playlists || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [artistId]);

  // Filter tracks based on search and filter type
  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist.stageName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'exclusive' && track.isExclusive) ||
                         (filterType === 'public' && !track.isExclusive);
    
    return matchesSearch && matchesFilter;
  });

  // Filter playlists based on search
  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrackSelect = (trackId: string) => {
    setSelectedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    
    try {
      const response = await fetch('/api/music/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPlaylistName,
          artistId,
          trackIds: selectedTracks
        })
      });
      
      if (response.ok) {
        const newPlaylist = await response.json();
        setPlaylists(prev => [...prev, newPlaylist]);
        setNewPlaylistName('');
        setSelectedTracks([]);
        setShowCreatePlaylist(false);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleDeleteTrack = async (trackId: string) => {
    if (!canEdit) return;
    
    try {
      const response = await fetch(`/api/music/tracks/${trackId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setTracks(prev => prev.filter(track => track.id !== trackId));
        if (currentTrack?.id === trackId) {
          setCurrentTrack(null);
        }
      }
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Music Library</h2>
          <p className="text-gray-400">
            {activeTab === 'tracks' ? `${filteredTracks.length} tracks` : `${filteredPlaylists.length} playlists`}
          </p>
        </div>
        
        {canEdit && (
          <button
            onClick={() => setShowCreatePlaylist(true)}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-teal-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-teal-600 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Playlist
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('tracks')}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            activeTab === 'tracks'
              ? 'bg-gradient-to-r from-fuchsia-500 to-teal-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Tracks
        </button>
        <button
          onClick={() => setActiveTab('playlists')}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            activeTab === 'playlists'
              ? 'bg-gradient-to-r from-fuchsia-500 to-teal-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Playlists
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {activeTab === 'tracks' && (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
            >
              <option value="all">All Tracks</option>
              <option value="exclusive">Exclusive</option>
              <option value="public">Public</option>
            </select>
          )}
          
          <div className="flex bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-fuchsia-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-fuchsia-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'tracks' ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
          {filteredTracks.map((track) => (
            <GlassCard key={track.id} className={viewMode === 'grid' ? 'p-4' : 'p-3'}>
              {viewMode === 'grid' ? (
                <div className="space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-fuchsia-500 to-teal-500 rounded-lg flex items-center justify-center overflow-hidden relative group">
                    {track.coverArt ? (
                      <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-white font-bold text-2xl">
                        {track.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setCurrentTrack(track)}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </button>
                    </div>
                    
                    {track.isExclusive && (
                      <div className="absolute top-2 right-2 bg-fuchsia-500 rounded-full p-1">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white truncate">{track.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{track.artist.stageName}</p>
                    {track.duration && (
                      <p className="text-xs text-gray-500">{formatDuration(track.duration)}</p>
                    )}
                  </div>
                  
                  {canEdit && (
                    <div className="flex items-center justify-between">
                      <input
                        type="checkbox"
                        checked={selectedTracks.includes(track.id)}
                        onChange={() => handleTrackSelect(track.id)}
                        className="rounded border-gray-600 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrack(track.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-teal-500 rounded flex items-center justify-center overflow-hidden relative group cursor-pointer"
                       onClick={() => setCurrentTrack(track)}>
                    {track.coverArt ? (
                      <img src={track.coverArt} alt={track.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-white font-bold text-sm">
                        {track.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    
                    {track.isExclusive && (
                      <div className="absolute -top-1 -right-1 bg-fuchsia-500 rounded-full p-0.5">
                        <Lock className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{track.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{track.artist.stageName}</p>
                  </div>
                  
                  {track.duration && (
                    <div className="text-sm text-gray-500">
                      {formatDuration(track.duration)}
                    </div>
                  )}
                  
                  {canEdit && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTracks.includes(track.id)}
                        onChange={() => handleTrackSelect(track.id)}
                        className="rounded border-gray-600 text-fuchsia-500 focus:ring-fuchsia-500"
                      />
                      
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaylists.map((playlist) => (
            <GlassCard key={playlist.id} className="p-4">
              <div className="space-y-3">
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center overflow-hidden">
                  {playlist.coverArt ? (
                    <img src={playlist.coverArt} alt={playlist.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white font-bold text-2xl">
                      {playlist.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                  <p className="text-sm text-gray-400">{playlist.tracks.length} tracks</p>
                  {playlist.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{playlist.description}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <GlassCard className="p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Playlist</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
              />
              
              <p className="text-sm text-gray-400">
                {selectedTracks.length} tracks selected
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreatePlaylist(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!newPlaylistName.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-teal-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Music Player */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
          <MusicPlayer
            track={currentTrack}
            playlist={filteredTracks}
            onTrackChange={setCurrentTrack}
          />
        </div>
      )}
    </div>
  );
}