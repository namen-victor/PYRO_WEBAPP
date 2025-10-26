"use client";
import { useState } from 'react';

interface SimplePDFViewerProps {
  pdfUrl: string;
  title?: string;
  height?: string;
}

export function SimplePDFViewer({ 
  pdfUrl, 
  title = "PDF Document", 
  height = "600px" 
}: SimplePDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError('Failed to load PDF');
    setLoading(false);
  };

  if (error) {
    return (
      <div style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        color: '#dc3545'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>PDF Viewer Error</div>
          <div style={{ fontSize: '14px' }}>{error}</div>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            Open in New Tab
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #dee2e6', 
      borderRadius: '8px', 
      overflow: 'hidden',
      backgroundColor: '#fff',
      position: 'relative'
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              border: '3px solid #007bff', 
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <div style={{ color: '#666' }}>Loading PDF...</div>
          </div>
        </div>
      )}
      
      <iframe
        src={pdfUrl}
        title={title}
        style={{
          width: '100%',
          height,
          border: 'none'
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
