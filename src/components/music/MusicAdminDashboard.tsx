'use client';

import React, { useState, useEffect } from 'react';
import {
  Music,
  Users,
  TrendingUp,
  Upload,
  Settings,
  Eye,
  Heart,
  DollarSign,
  Calendar,
  Play,
  Edit,
  Trash2,
  Crown,
  Lock,
  Unlock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { MusicUpload } from './MusicUpload';
import { TrackMetadataEditor } from './TrackMetadataEditor';

interface Track {
  id: string;
  title: string;
  audioUrl: string;
  duration: number;
  plays: number;
  likes: number;
  isExclusive: boolean;
  coverArt?: string;
  createdAt: string;
  genre?: string;
  mood?: string;
  tags?: string[];
  description?: string;
  lyrics?: string;
  releaseDate?: string;
  bpm?: number;
  key?: string;
  artist: {
    id: string;
    stageName: string;
    logo?: string;
  };
}

interface Subscriber {
  id: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
  startDate: string;
  expiresAt: string;
  amount: number;
}

interface Analytics {
  totalTracks: number;
  totalPlays: number;
  totalLikes: number;
  totalSubscribers: number;
  monthlyRevenue: number;
  recentPlays: Array<{
    date: string;
    plays: number;
  }>;
}

export default function MusicAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [tracksRes, subscribersRes, analyticsRes] = await Promise.all([
        fetch('/api/music/tracks'),
        fetch('/api/admin/subscribers'),
        fetch('/api/admin/analytics')
      ]);

      if (tracksRes.ok) {
        const tracksData = await tracksRes.json();
        setTracks(tracksData.tracks || []);
      }

      if (subscribersRes.ok) {
        const subscribersData = await subscribersRes.json();
        setSubscribers(subscribersData.subscribers || []);
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrack = async (trackId: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;

    try {
      const response = await fetch(`/api/music/tracks/${trackId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTracks(tracks.filter(track => track.id !== trackId));
        toast.success('Track deleted successfully');
      } else {
        toast.error('Failed to delete track');
      }
    } catch (error) {
      console.error('Error deleting track:', error);
      toast.error('Failed to delete track');
    }
  };

  const toggleTrackExclusivity = async (trackId: string, isExclusive: boolean) => {
    try {
      const response = await fetch(`/api/music/tracks/${trackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isExclusive: !isExclusive })
      });

      if (response.ok) {
        setTracks(tracks.map(track => 
          track.id === trackId 
            ? { ...track, isExclusive: !isExclusive }
            : track
        ));
        toast.success(`Track ${!isExclusive ? 'made exclusive' : 'made public'}`);
      } else {
        toast.error('Failed to update track');
      }
    } catch (error) {
      console.error('Error updating track:', error);
      toast.error('Failed to update track');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Music Dashboard</h1>
            <p className="text-gray-400">Manage your music library and fan engagement</p>
          </div>
          <Button
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Track
          </Button>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Tracks</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalTracks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Plays</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalPlays.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Likes</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalLikes.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Subscribers</p>
                    <p className="text-2xl font-bold text-white">{analytics.totalSubscribers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-white">${analytics.monthlyRevenue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800/50 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tracks" className="data-[state=active]:bg-purple-600">
              <Music className="w-4 h-4 mr-2" />
              Tracks
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tracks */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Tracks</CardTitle>
                  <CardDescription>Your latest uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tracks.slice(0, 5).map((track) => (
                      <div key={track.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-700/30">
                        {track.coverArt ? (
                          <img
                            src={track.coverArt}
                            alt={track.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{track.title}</p>
                          <p className="text-xs text-gray-400">{track.plays} plays</p>
                        </div>
                        {track.isExclusive && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Subscribers */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Subscribers</CardTitle>
                  <CardDescription>Your newest fans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subscribers.slice(0, 5).map((subscriber) => (
                      <div key={subscriber.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-700/30">
                        {subscriber.user.image ? (
                          <img
                            src={subscriber.user.image}
                            alt={subscriber.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{subscriber.user.name}</p>
                          <p className="text-xs text-gray-400">${subscriber.amount}/month</p>
                        </div>
                        <Badge
                          variant={subscriber.status === 'ACTIVE' ? 'default' : 'secondary'}
                          className={subscriber.status === 'ACTIVE' ? 'bg-green-600' : 'bg-gray-600'}
                        >
                          {subscriber.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tracks" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">All Tracks</CardTitle>
                <CardDescription>Manage your music library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tracks.map((track) => (
                    <div key={track.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                      {track.coverArt ? (
                        <img
                          src={track.coverArt}
                          alt={track.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Music className="w-6 h-6 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-medium truncate">{track.title}</h3>
                          {track.isExclusive && (
                            <Crown className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{formatDuration(track.duration)}</span>
                          <span>{track.plays} plays</span>
                          <span>{track.likes} likes</span>
                          <span>{formatDate(track.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleTrackExclusivity(track.id, track.isExclusive)}
                          className="text-gray-400 hover:text-white"
                        >
                          {track.isExclusive ? (
                            <Unlock className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingTrack(track)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteTrack(track.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Subscribers</CardTitle>
                <CardDescription>Manage your fan base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscribers.map((subscriber) => (
                    <div key={subscriber.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-700/30">
                      {subscriber.user.image ? (
                        <img
                          src={subscriber.user.image}
                          alt={subscriber.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium">{subscriber.user.name}</h3>
                        <p className="text-sm text-gray-400">{subscriber.user.email}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                          <span>Started: {formatDate(subscriber.startDate)}</span>
                          <span>Expires: {formatDate(subscriber.expiresAt)}</span>
                          <span>${subscriber.amount}/month</span>
                        </div>
                      </div>

                      <Badge
                        variant={subscriber.status === 'ACTIVE' ? 'default' : 'secondary'}
                        className={subscriber.status === 'ACTIVE' ? 'bg-green-600' : 'bg-gray-600'}
                      >
                        {subscriber.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Upload New Track</h2>
              <Button
                variant="ghost"
                onClick={() => setShowUpload(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </Button>
            </div>
            <MusicUpload onUploadComplete={() => {
              setShowUpload(false);
              loadDashboardData();
            }} />
          </div>
        </div>
      )}

      {/* Edit Track Modal */}
      {editingTrack && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Edit Track Metadata</h2>
              <Button
                variant="ghost"
                onClick={() => setEditingTrack(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </Button>
            </div>
            <TrackMetadataEditor
              track={editingTrack}
              onSave={async () => {
                setEditingTrack(null);
                loadDashboardData();
              }}
              onClose={() => setEditingTrack(null)}
              isOpen={!!editingTrack}
            />
          </div>
        </div>
      )}
    </div>
  );
}