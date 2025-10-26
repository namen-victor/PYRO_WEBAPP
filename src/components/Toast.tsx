"use client";

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: {
      bg: '#10b981',
      border: '#059669',
      icon: '✓'
    },
    error: {
      bg: '#ef4444',
      border: '#dc2626',
      icon: '✕'
    },
    info: {
      bg: '#3b82f6',
      border: '#2563eb',
      icon: 'ℹ'
    },
    warning: {
      bg: '#f59e0b',
      border: '#d97706',
      icon: '⚠'
    }
  };

  const config = colors[type];

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        background: config.bg,
        color: 'white',
        padding: '16px 20px',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minWidth: 300,
        maxWidth: 500,
        animation: 'slideIn 0.3s ease-out',
        border: `2px solid ${config.border}`
      }}
    >
      <div style={{
        fontSize: 20,
        fontWeight: 'bold',
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {config.icon}
      </div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: 18,
          cursor: 'pointer',
          padding: 4,
          opacity: 0.8,
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media (max-width: 640px) {
          div[style*="position: fixed"] {
            left: 10px !important;
            right: 10px !important;
            min-width: auto !important;
          }
        }
      `}</style>
    </div>
  );
}






