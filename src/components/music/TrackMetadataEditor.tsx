'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, Upload, Tag, Lock, Globe, Calendar, Music, User, Hash } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface Track {
  id: string;
  title: string;
  audioUrl: string;
  coverArt?: string;
  duration?: number;
  isExclusive: boolean;
  genre?: string;
  mood?: string;
  tags?: string[];
  description?: string;
  lyrics?: string;
  releaseDate?: string;
  bpm?: number;
  key?: string;
  createdAt: string;
  artist: {
    id: string;
    stageName: string;
    logo?: string;
  };
}

interface TrackMetadataEditorProps {
  track: Track;
  onSave: (updatedTrack: Partial<Track>) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

const GENRES = [
  'Hip Hop', 'R&B', 'Pop', 'Rock', 'Electronic', 'Jazz', 'Blues', 'Country',
  'Reggae', 'Latin', 'Classical', 'Folk', 'Punk', 'Metal', 'Indie', 'Alternative'
];

const MOODS = [
  'Energetic', 'Chill', 'Romantic', 'Melancholic', 'Uplifting', 'Dark',
  'Peaceful', 'Aggressive', 'Nostalgic', 'Mysterious', 'Playful', 'Intense'
];

const MUSICAL_KEYS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

export function TrackMetadataEditor({ track, onSave, onClose, isOpen }: TrackMetadataEditorProps) {
  const [formData, setFormData] = useState({
    title: track.title,
    description: track.description || '',
    genre: track.genre || '',
    mood: track.mood || '',
    tags: track.tags || [],
    lyrics: track.lyrics || '',
    releaseDate: track.releaseDate || '',
    bpm: track.bpm || '',
    key: track.key || '',
    isExclusive: track.isExclusive
  });
  
  const [newTag, setNewTag] = useState('');
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
  const [coverArtPreview, setCoverArtPreview] = useState(track.coverArt || '');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: track.title,
        description: track.description || '',
        genre: track.genre || '',
        mood: track.mood || '',
        tags: track.tags || [],
        lyrics: track.lyrics || '',
        releaseDate: track.releaseDate || '',
        bpm: track.bpm || '',
        key: track.key || '',
        isExclusive: track.isExclusive
      });
      setCoverArtPreview(track.coverArt || '');
      setErrors({});
    }
  }, [track, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverArtFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverArtPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.bpm && (isNaN(Number(formData.bpm)) || Number(formData.bpm) < 1 || Number(formData.bpm) > 300)) {
      newErrors.bpm = 'BPM must be between 1 and 300';
    }
    
    if (formData.releaseDate && new Date(formData.releaseDate) > new Date()) {
      newErrors.releaseDate = 'Release date cannot be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      const updateData: any = {
        ...formData,
        bpm: formData.bpm ? Number(formData.bpm) : null
      };
      
      // Handle cover art upload if a new file was selected
      if (coverArtFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('coverArt', coverArtFile);
        formDataUpload.append('trackId', track.id);
        
        const uploadResponse = await fetch('/api/music/cover-art', {
          method: 'POST',
          body: formDataUpload
        });
        
        if (uploadResponse.ok) {
          const { coverArtUrl } = await uploadResponse.json();
          updateData.coverArt = coverArtUrl;
        }
      }
      
      await onSave(updateData);
      onClose();
    } catch (error) {
      console.error('Error saving track metadata:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Music className="w-6 h-6" />
              Edit Track Metadata
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Cover Art */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Art
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-teal-500 rounded-lg flex items-center justify-center overflow-hidden">
                    {coverArtPreview ? (
                      <img src={coverArtPreview} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-white font-bold text-xl">
                        {formData.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverArtChange}
                      className="hidden"
                      id="cover-art-input"
                    />
                    <label
                      htmlFor="cover-art-input"
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload New
                    </label>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors ${
                    errors.title ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Enter track title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                  placeholder="Describe your track..."
                />
              </div>

              {/* Genre and Mood */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => handleInputChange('genre', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                  >
                    <option value="">Select genre</option>
                    {GENRES.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mood
                  </label>
                  <select
                    value={formData.mood}
                    onChange={(e) => handleInputChange('mood', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                  >
                    <option value="">Select mood</option>
                    {MOODS.map(mood => (
                      <option key={mood} value={mood}>{mood}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Musical Details */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    BPM
                  </label>
                  <input
                    type="number"
                    value={formData.bpm}
                    onChange={(e) => handleInputChange('bpm', e.target.value)}
                    min="1"
                    max="300"
                    className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors ${
                      errors.bpm ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="120"
                  />
                  {errors.bpm && (
                    <p className="text-red-400 text-xs mt-1">{errors.bpm}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key
                  </label>
                  <select
                    value={formData.key}
                    onChange={(e) => handleInputChange('key', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                  >
                    <option value="">Select key</option>
                    {MUSICAL_KEYS.map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Release Date
                  </label>
                  <input
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                    className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors ${
                      errors.releaseDate ? 'border-red-500' : 'border-gray-700'
                    }`}
                  />
                  {errors.releaseDate && (
                    <p className="text-red-400 text-xs mt-1">{errors.releaseDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Tags, Lyrics, Settings */}
            <div className="space-y-6">
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
                      placeholder="Add a tag..."
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lyrics */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lyrics
                </label>
                <textarea
                  value={formData.lyrics}
                  onChange={(e) => handleInputChange('lyrics', e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                  placeholder="Enter lyrics here..."
                />
              </div>

              {/* Access Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Access Control
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="access"
                      checked={!formData.isExclusive}
                      onChange={() => handleInputChange('isExclusive', false)}
                      className="text-fuchsia-500 focus:ring-fuchsia-500"
                    />
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-400" />
                      <span className="text-white">Public</span>
                    </div>
                    <span className="text-sm text-gray-400">Available to everyone</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="access"
                      checked={formData.isExclusive}
                      onChange={() => handleInputChange('isExclusive', true)}
                      className="text-fuchsia-500 focus:ring-fuchsia-500"
                    />
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-fuchsia-400" />
                      <span className="text-white">Exclusive</span>
                    </div>
                    <span className="text-sm text-gray-400">Subscribers only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-teal-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}