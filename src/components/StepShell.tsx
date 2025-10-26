"use client";

import { ReactNode } from 'react';

interface StepShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  onSaveAndExit?: () => void;
  backLabel?: string;
  continueLabel?: string;
  isBackDisabled?: boolean;
  isContinueDisabled?: boolean;
  isContinueLoading?: boolean;
  showBackButton?: boolean;
}

export function StepShell({
  title,
  subtitle,
  children,
  onBack,
  onContinue,
  onSaveAndExit,
  backLabel = 'Back',
  continueLabel = 'Continue',
  isBackDisabled = false,
  isContinueDisabled = false,
  isContinueLoading = false,
  showBackButton = true,
}: StepShellProps) {
  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    bg: '#ebebeb',
    white: '#ffffff',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666'
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .step-buttons {
            flex-direction: column-reverse !important;
            gap: 12px !important;
          }
          .step-buttons button {
            width: 100% !important;
          }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 28, 
            fontWeight: 800, 
            color: colors.text, 
            margin: '0 0 8px 0',
            lineHeight: 1.2
          }}>
            {title}
          </h1>
          <p style={{ 
            fontSize: 16, 
            color: colors.textLight, 
            margin: 0,
            lineHeight: 1.5
          }}>
            {subtitle}
          </p>
        </div>

        {/* Content Card */}
        <div style={{
          background: colors.white,
          borderRadius: 16,
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          marginBottom: 24,
          position: 'relative' // anchor doodles to the form card
        }}>
          {children}
        </div>

        {/* Navigation Buttons */}
        <div className="step-buttons" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16
        }}>
          {showBackButton && onBack ? (
            <button
              onClick={onBack}
              disabled={isBackDisabled}
              style={{
                padding: '12px 24px',
                background: colors.white,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: isBackDisabled ? 'not-allowed' : 'pointer',
                opacity: isBackDisabled ? 0.5 : 1,
                transition: 'all 0.2s',
                minWidth: 120
              }}
            >
              {backLabel}
            </button>
          ) : (
            <div /> // Spacer
          )}

          {onContinue && (
            <button
              onClick={onContinue}
              disabled={isContinueDisabled || isContinueLoading}
              style={{
                padding: '12px 32px',
                background: isContinueDisabled || isContinueLoading ? '#ccc' : colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: isContinueDisabled || isContinueLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                minWidth: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              {isContinueLoading ? (
                <>
                  <div style={{
                    width: 16,
                    height: 16,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span>Loading...</span>
                </>
              ) : (
                continueLabel
              )}
            </button>
          )}
        </div>

        {/* Save & Exit Link */}
        {onSaveAndExit && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={onSaveAndExit}
              style={{
                background: 'none',
                border: 'none',
                color: colors.accent,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '8px 16px'
              }}
            >
              Save & exit (resume later)
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}





