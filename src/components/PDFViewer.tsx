"use client";
import { useEffect, useRef, useState } from 'react';

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
  height?: string;
  showToolbar?: boolean;
}

export function PDFViewer({ 
  pdfUrl, 
  title = "PDF Document", 
  height = "600px",
  showToolbar = true 
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdfUrl) {
      setError('No PDF URL provided');
      setLoading(false);
      return;
    }

    // Load Adobe PDF Embed API
    const loadPDFEmbed = async () => {
      try {
        // Check if Adobe PDF Embed API is already loaded
        if ((window as any).AdobeDC) {
          initializeViewer();
          return;
        }

        // Load Adobe PDF Embed API script
        const script = document.createElement('script');
        script.src = 'https://documentcloud.adobe.com/view-sdk/viewer.js';
        script.onload = () => {
          initializeViewer();
        };
        script.onerror = () => {
          setError('Failed to load PDF viewer');
          setLoading(false);
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error loading PDF viewer:', err);
        setError('Failed to load PDF viewer');
        setLoading(false);
      }
    };

    const initializeViewer = () => {
      if (!containerRef.current) return;

      try {
        const adobeDCView = new (window as any).AdobeDC.View({
          clientId: process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID || 'demo-client-id',
          divId: containerRef.current.id
        });

        adobeDCView.previewFile({
          content: {
            location: {
              url: pdfUrl
            }
          },
          metaData: {
            fileName: title
          }
        }, {
          embedMode: 'SIZED_CONTAINER',
          showDownloadPDF: showToolbar,
          showPrintPDF: showToolbar,
          showLeftHandPanel: false,
          showAnnotationTools: false,
          enableFormFilling: false,
          showBookmarks: false,
          showThumbnails: false
        });

        setLoading(false);
      } catch (err) {
        console.error('Error initializing PDF viewer:', err);
        setError('Failed to initialize PDF viewer');
        setLoading(false);
      }
    };

    loadPDFEmbed();
  }, [pdfUrl, title, showToolbar]);

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
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px'
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
    );
  }

  return (
    <div style={{ 
      border: '1px solid #dee2e6', 
      borderRadius: '8px', 
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      <div 
        ref={containerRef}
        id={`pdf-viewer-${Math.random().toString(36).substr(2, 9)}`}
        style={{ height }}
      />
    </div>
  );
}

// Add CSS for loading animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
