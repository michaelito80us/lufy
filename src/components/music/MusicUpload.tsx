'use client';

import React, { useState, useCallback } from 'react';
import { Upload, Music, X, CheckCircle, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface MusicUploadProps {
  onUploadComplete?: (files: UploadFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

export function MusicUpload({ 
  onUploadComplete, 
  maxFiles = 10, 
  maxFileSize = 100 
}: MusicUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/flac', 'audio/aac'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|flac|aac|m4a)$/i)) {
      return 'Invalid file type. Please upload audio files only.';
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit.`;
    }

    return null;
  };

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadFile[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const error = validateFile(file);
      
      if (files.length + newFiles.length >= maxFiles) {
        break;
      }

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: error ? 'error' : 'uploading',
        error
      });
    }

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress for valid files
    newFiles.forEach(uploadFile => {
      if (!uploadFile.error) {
        simulateUpload(uploadFile.id);
      }
    });
  }, [files.length, maxFiles]);

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 20, 100);
          const isComplete = newProgress >= 100;
          
          return {
            ...file,
            progress: newProgress,
            status: isComplete ? 'completed' : 'uploading'
          };
        }
        return file;
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, progress: 100, status: 'completed' }
          : file
      ));
    }, 3000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFiles(selectedFiles);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Music className="w-5 h-5 text-blue-400 animate-pulse" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <GlassCard className="p-8">
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
            ${isDragOver 
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
                Supports MP3, WAV, FLAC, AAC • Max {maxFileSize}MB per file • Up to {maxFiles} files
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Upload Progress */}
      {files.length > 0 && (
        <GlassCard className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Upload Progress ({files.length} files)
          </h4>
          
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center space-x-4 p-3 bg-black/20 rounded-lg">
                {getStatusIcon(file.status)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white truncate">
                      {file.file.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {(file.file.size / (1024 * 1024)).toFixed(1)}MB
                    </span>
                  </div>
                  
                  {file.error ? (
                    <p className="text-xs text-red-400">{file.error}</p>
                  ) : (
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-fuchsia-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-red-500/20 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
          
          {files.some(f => f.status === 'completed') && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => onUploadComplete?.(files.filter(f => f.status === 'completed'))}
                className="w-full py-2 px-4 bg-gradient-to-r from-fuchsia-500 to-teal-500 text-white rounded-lg font-medium hover:from-fuchsia-600 hover:to-teal-600 transition-all duration-300"
              >
                Continue with {files.filter(f => f.status === 'completed').length} uploaded files
              </button>
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}