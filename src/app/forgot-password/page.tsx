"use client";
import { useState } from 'react';
import { Logo } from '@/components/Logo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Implement Firebase password reset
      // await sendPasswordResetEmail(auth, email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (error) {
      setError('Failed to send reset email. Please check your email address and try again.');
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  }

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    text: '#1a1a1a',
    textLight: '#666',
    border: '#e0e0e0',
    bg: '#f5f5f5',
    white: '#ffffff',
    success: '#10b981',
    error: '#dc2626'
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .forgot-password-container {
            padding: 20px !important;
          }
          .forgot-password-card {
            padding: 32px 24px !important;
          }
        }
      `}</style>
      
      <div 
        className="forgot-password-container"
        style={{ 
          minHeight: '100vh', 
          background: colors.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}
      >
        <div 
          className="forgot-password-card"
          style={{
            background: colors.white,
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '48px 40px',
            width: '100%',
            maxWidth: '460px'
          }}
        >
          {/* Icon */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: `${colors.accent}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {/* Small decorative dots */}
              <div style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.accent
              }}/>
              <div style={{
                position: 'absolute',
                top: 8,
                left: -8,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: colors.accent,
                opacity: 0.5
              }}/>
            </div>
          </div>

          {/* Header */}
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            color: colors.text, 
            margin: '0 0 12px 0',
            textAlign: 'center'
          }}>
            Forgot your password?
          </h1>
          
          <p style={{ 
            color: colors.textLight, 
            margin: '0 0 32px 0',
            textAlign: 'center',
            fontSize: '15px',
            lineHeight: 1.5
          }}>
            Enter your email to reset your password.
          </p>

          {/* Success Message */}
          {success ? (
            <div>
              <div style={{
                padding: '16px 20px',
                backgroundColor: `${colors.success}10`,
                border: `1px solid ${colors.success}`,
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <div>
                    <div style={{ 
                      color: colors.success, 
                      fontWeight: 600,
                      fontSize: '15px',
                      marginBottom: 4
                    }}>
                      Reset email sent!
                    </div>
                    <div style={{ 
                      color: colors.textLight, 
                      fontSize: '14px',
                      lineHeight: 1.5
                    }}>
                      Check your inbox for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href="/login"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 20px',
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                Back to Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              {/* Error Message */}
              {error && (
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#fee',
                  border: `1px solid ${colors.error}`,
                  borderRadius: '8px',
                  color: colors.error,
                  fontSize: '14px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: colors.text, 
                  marginBottom: '8px' 
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: loading ? '#f9f9f9' : colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    cursor: loading ? 'not-allowed' : 'text'
                  }}
                  onFocus={(e) => {
                    if (!loading) e.currentTarget.style.borderColor = colors.accent;
                  }}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
              </div>

              {/* Reset Password Button */}
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  backgroundColor: loading ? '#999' : colors.primary,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '20px'
                }}
                onMouseOver={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#1a1a1a';
                }}
                onMouseOut={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = colors.primary;
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>

              {/* Back to Login Link */}
              <div style={{ textAlign: 'center' }}>
                <a 
                  href="/login" 
                  style={{ 
                    fontSize: '15px', 
                    color: colors.text, 
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = colors.accent}
                  onMouseOut={(e) => e.currentTarget.style.color = colors.text}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Back to Login
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Spinner Animation */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}













