"use client";

import { useState, useCallback } from 'react';

interface FileDropProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  currentFile: File | null;
  disabled?: boolean;
  maxSizeMB?: number;
}

export function FileDrop({ 
  onFileSelect, 
  onFileRemove, 
  currentFile, 
  disabled = false,
  maxSizeMB = 10 
}: FileDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff',
    hover: '#f0f9ff'
  };

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    // Check file type
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed';
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [disabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      {!currentFile ? (
        // Upload area
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `2px dashed ${isDragging ? colors.accent : error ? colors.error : colors.border}`,
            borderRadius: 12,
            padding: 40,
            textAlign: 'center',
            background: isDragging ? colors.hover : colors.white,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: disabled ? 0.6 : 1
          }}
          onClick={() => {
            if (!disabled) {
              document.getElementById('file-input')?.click();
            }
          }}
        >
          {/* Upload icon */}
          <div style={{ 
            fontSize: 48, 
            marginBottom: 16,
            color: isDragging ? colors.accent : colors.textLight
          }}>
            📄
          </div>

          {/* Instructions */}
          <div style={{ marginBottom: 8 }}>
            <span style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              color: colors.text 
            }}>
              Drop your résumé here, or{' '}
            </span>
            <span style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              color: colors.accent,
              textDecoration: 'underline'
            }}>
              browse
            </span>
          </div>

          <div style={{ 
            fontSize: 13, 
            color: colors.textLight,
            marginBottom: 12
          }}>
            PDF only, max {maxSizeMB}MB
          </div>

          {/* Hidden file input */}
          <input
            id="file-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            disabled={disabled}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        // File preview
        <div style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: 20,
          background: colors.white
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* PDF icon */}
            <div style={{
              width: 48,
              height: 48,
              background: '#fee',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0
            }}>
              📄
            </div>

            {/* File info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontSize: 15, 
                fontWeight: 600, 
                color: colors.text,
                marginBottom: 4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {currentFile.name}
              </div>
              <div style={{ 
                fontSize: 13, 
                color: colors.textLight 
              }}>
                {formatFileSize(currentFile.size)}
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={onFileRemove}
              disabled={disabled}
              style={{
                padding: '8px 16px',
                background: colors.white,
                color: colors.error,
                border: `1px solid ${colors.error}`,
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = '#fee')}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.white)}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={{ 
          marginTop: 12, 
          padding: '12px 16px',
          background: '#fee',
          border: `1px solid ${colors.error}`,
          borderRadius: 8,
          fontSize: 13, 
          color: colors.error,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}






