'use client'

import React, { useState, useCallback, useRef } from 'react'
import {
  Upload,
  Music,
  X,
  CheckCircle,
  AlertCircle,
  Image,
  Edit3,
  Save,
  Eye,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

interface UploadFile {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error' | 'metadata'
  error?: string
  metadata?: {
    title: string
    description?: string
    genre?: string
    isExclusive: boolean
    coverArt?: File
    coverArtPreview?: string
    tags?: string[]
    bpm?: number
    key?: string
    mood?: string
  }
}

interface MusicUploadProps {
  onUploadComplete?: (files: UploadFile[]) => void
  maxFiles?: number
  maxFileSize?: number // in MB
}

const GENRES = [
  'Electronic',
  'Hip Hop',
  'Pop',
  'Rock',
  'Jazz',
  'Classical',
  'R&B',
  'Country',
  'Reggae',
  'Blues',
  'Folk',
  'Punk',
  'Metal',
  'Ambient',
  'House',
  'Techno',
  'Dubstep',
  'Trap',
  'Lo-fi',
  'Synthwave',
  'Indie',
  'Alternative',
]

const MOODS = [
  'Energetic',
  'Chill',
  'Melancholic',
  'Happy',
  'Aggressive',
  'Peaceful',
  'Dark',
  'Uplifting',
  'Romantic',
  'Mysterious',
  'Dreamy',
  'Intense',
]

const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function MusicUpload({
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 100,
}: MusicUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const [currentStep, setCurrentStep] = useState<
    'upload' | 'metadata' | 'complete'
  >('upload')
  const [editingFile, setEditingFile] = useState<string | null>(null)
  const coverArtInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/mp3',
      'audio/flac',
      'audio/aac',
    ]
    if (
      !allowedTypes.includes(file.type) &&
      !file.name.match(/\.(mp3|wav|flac|aac|m4a)$/i)
    ) {
      return 'Invalid file type. Please upload audio files only.'
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit.`
    }

    return null
  }

  const extractFileName = (filename: string): string => {
    return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
  }

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: UploadFile[] = []

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        const error = validateFile(file)

        if (files.length + newFiles.length >= maxFiles) {
          break
        }

        const fileId = Math.random().toString(36).substr(2, 9)
        newFiles.push({
          id: fileId,
          file,
          progress: 0,
          status: error ? 'error' : 'uploading',
          error: error || undefined,
          metadata: error
            ? undefined
            : {
                title: extractFileName(file.name),
                genre: '',
                isExclusive: false,
                tags: [],
                mood: '',
              },
        })
      }

      setFiles((prev) => [...prev, ...newFiles])

      // Simulate upload progress for valid files
      newFiles.forEach((uploadFile) => {
        if (!uploadFile.error) {
          simulateUpload(uploadFile.id)
        }
      })
    },
    [files.length, maxFiles]
  )

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === 'uploading') {
            const newProgress = Math.min(
              file.progress + Math.random() * 25,
              100
            )
            const isComplete = newProgress >= 100

            return {
              ...file,
              progress: newProgress,
              status: isComplete ? 'metadata' : 'uploading',
            }
          }
          return file
        })
      )
    }, 150)

    setTimeout(() => {
      clearInterval(interval)
      setFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, progress: 100, status: 'metadata' }
            : file
        )
      )
    }, 2000)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = e.dataTransfer.files
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles)
      }
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      handleFiles(selectedFiles)
    }
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleCoverArtSelect = (
    fileId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Implement cover art upload
      console.log('Cover art selected for file:', fileId, file)
    }
  }

  const updateMetadata = (
    fileId: string,
    updates: Partial<UploadFile['metadata']>
  ) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId && file.metadata
          ? {
              ...file,
              metadata: {
                ...file.metadata,
                ...updates,
              } as UploadFile['metadata'],
            }
          : file
      )
    )
  }

  const removeTag = (fileId: string, tagIndex: number) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId && file.metadata
          ? {
              ...file,
              metadata: {
                ...file.metadata,
                tags: (file.metadata.tags || []).filter(
                  (_, index) => index !== tagIndex
                ),
              } as UploadFile['metadata'],
            }
          : file
      )
    )
  }

  const addTag = (fileId: string, tag: string) => {
    const trimmedTag = tag.trim()
    if (!trimmedTag) return

    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId && file.metadata
          ? {
              ...file,
              metadata: {
                ...file.metadata,
                tags: [...(file.metadata.tags || []), trimmedTag],
              } as UploadFile['metadata'],
            }
          : file
      )
    )
  }

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'metadata':
        return <Edit3 className="w-5 h-5 text-blue-400" />
      default:
        return <Music className="w-5 h-5 text-blue-400 animate-pulse" />
    }
  }

  const metadataFiles = files.filter((f) => f.status === 'metadata')
  const hasCompletedUploads = files.some((f) => f.status === 'uploading')
  const allMetadataComplete = metadataFiles.every((f) =>
    f.metadata?.title.trim()
  )

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {currentStep === 'upload' && (
        <GlassCard className="p-8">
          <div
            className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
            ${
              isDragOver
                ? 'border-fuchsia-400 bg-fuchsia-500/10 scale-105'
                : 'border-gray-600 hover:border-gray-500'
            }
          `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              multiple
              accept="audio/*,.mp3,.wav,.flac,.aac,.m4a"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-teal-500 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop your music files here
                </h3>
                <p className="text-gray-400 mb-4">
                  or click to browse your computer
                </p>
                <p className="text-sm text-gray-500">
                  Supports MP3, WAV, FLAC, AAC • Max {maxFileSize}MB per file •
                  Up to {maxFiles} files
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Upload Progress */}
      {files.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">
              {currentStep === 'complete'
                ? 'Upload Complete'
                : `Processing ${files.length} files`}
            </h4>
            {/* TODO: Implement handleFinalUpload function
            {metadataFiles.length > 0 && !hasCompletedUploads && (
              <Button
                onClick={handleFinalUpload}
                disabled={!allMetadataComplete}
                className="bg-gradient-to-r from-fuchsia-500 to-teal-500 hover:from-fuchsia-600 hover:to-teal-600 disabled:opacity-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload All
              </Button>
            )}
            */}
          </div>

          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-black/20 rounded-lg overflow-hidden"
              >
                {/* File Header */}
                <div className="flex items-center space-x-4 p-4">
                  {getStatusIcon(file.status)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-white truncate">
                        {file.metadata?.title || file.file.name}
                      </p>
                      <span className="text-xs text-gray-400">
                        {(file.file.size / (1024 * 1024)).toFixed(1)}MB
                      </span>
                    </div>

                    {file.error ? (
                      <p className="text-xs text-red-400">{file.error}</p>
                    ) : file.status === 'uploading' ? (
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-fuchsia-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    ) : file.status === 'metadata' ? (
                      <p className="text-xs text-blue-400">
                        Ready for metadata
                      </p>
                    ) : file.status === 'completed' ? (
                      <p className="text-xs text-green-400">Upload complete</p>
                    ) : null}
                  </div>

                  <div className="flex items-center space-x-2">
                    {file.status === 'metadata' && (
                      <button
                        onClick={() =>
                          setEditingFile(
                            editingFile === file.id ? null : file.id
                          )
                        }
                        className="p-2 hover:bg-fuchsia-500/20 rounded transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-fuchsia-400" />
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Metadata Editor */}
                {file.status === 'metadata' &&
                  editingFile === file.id &&
                  file.metadata && (
                    <div className="border-t border-gray-700 p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Cover Art */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Cover Art
                          </label>
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-teal-500 rounded-lg overflow-hidden flex items-center justify-center">
                              {file.metadata.coverArtPreview ? (
                                <img
                                  src={file.metadata.coverArtPreview}
                                  alt="Cover"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Image className="w-8 h-8 text-white" />
                              )}
                            </div>
                            <div>
                              <input
                                ref={coverArtInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleCoverArtSelect(file.id, e)
                                }
                                className="hidden"
                              />
                              <Button
                                onClick={() =>
                                  coverArtInputRef.current?.click()
                                }
                                variant="outline"
                                size="sm"
                              >
                                Choose Image
                              </Button>
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
                            value={file.metadata.title}
                            onChange={(e) =>
                              updateMetadata(file.id, { title: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
                            placeholder="Enter track title"
                          />
                        </div>

                        {/* Genre */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Genre
                          </label>
                          <select
                            value={file.metadata.genre || ''}
                            onChange={(e) =>
                              updateMetadata(file.id, { genre: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                          >
                            <option value="">Select genre...</option>
                            {GENRES.map((genre) => (
                              <option key={genre} value={genre}>
                                {genre}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Mood */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Mood
                          </label>
                          <select
                            value={file.metadata.mood || ''}
                            onChange={(e) =>
                              updateMetadata(file.id, { mood: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                          >
                            <option value="">Select mood...</option>
                            {MOODS.map((mood) => (
                              <option key={mood} value={mood}>
                                {mood}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* BPM */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            BPM
                          </label>
                          <input
                            type="number"
                            value={file.metadata.bpm || ''}
                            onChange={(e) =>
                              updateMetadata(file.id, {
                                bpm: parseInt(e.target.value) || undefined,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
                            placeholder="e.g. 120"
                            min="60"
                            max="200"
                          />
                        </div>

                        {/* Key */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Key
                          </label>
                          <select
                            value={file.metadata.key || ''}
                            onChange={(e) =>
                              updateMetadata(file.id, { key: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                          >
                            <option value="">Select key...</option>
                            {KEYS.map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          value={file.metadata.description || ''}
                          onChange={(e) =>
                            updateMetadata(file.id, {
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
                          placeholder="Describe your track..."
                          rows={3}
                        />
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {file.metadata.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-full text-xs flex items-center gap-1"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(file.id, index)}
                                className="hover:text-red-400"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTag(file.id, e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
                          placeholder="Add tags and press Enter"
                        />
                      </div>

                      {/* Exclusive Toggle */}
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`exclusive-${file.id}`}
                          checked={file.metadata.isExclusive}
                          onChange={(e) =>
                            updateMetadata(file.id, {
                              isExclusive: e.target.checked,
                            })
                          }
                          className="rounded border-gray-600 text-fuchsia-500 focus:ring-fuchsia-500"
                        />
                        <label
                          htmlFor={`exclusive-${file.id}`}
                          className="text-sm text-gray-300"
                        >
                          Make this track exclusive to subscribers
                        </label>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}
