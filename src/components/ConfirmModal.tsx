"use client";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'warning'
}: ConfirmModalProps) {
  const colors = {
    danger: {
      primary: '#ef4444',
      hover: '#dc2626',
      bg: '#fee',
      border: '#fca5a5'
    },
    warning: {
      primary: '#f59e0b',
      hover: '#d97706',
      bg: '#fffbeb',
      border: '#fcd34d'
    },
    info: {
      primary: '#3b82f6',
      hover: '#2563eb',
      bg: '#eff6ff',
      border: '#93c5fd'
    }
  };

  const config = colors[type];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: 16,
          padding: 24,
          maxWidth: 400,
          width: 'calc(100% - 40px)',
          zIndex: 9999,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          animation: 'scaleIn 0.2s ease-out'
        }}
      >
        {/* Icon */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: config.bg,
          border: `2px solid ${config.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 24
        }}>
          {type === 'danger' && '⚠️'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </div>

        {/* Title */}
        <h3 style={{
          margin: '0 0 12px 0',
          fontSize: 18,
          fontWeight: 700,
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          {title}
        </h3>

        {/* Message */}
        <p style={{
          margin: '0 0 24px 0',
          fontSize: 14,
          color: '#666',
          lineHeight: 1.6,
          textAlign: 'center'
        }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center'
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 24px',
              background: 'white',
              color: '#666',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: 100
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5';
              e.currentTarget.style.borderColor = '#ccc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 24px',
              background: config.primary,
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: 100
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = config.hover}
            onMouseLeave={(e) => e.currentTarget.style.background = config.primary}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}






