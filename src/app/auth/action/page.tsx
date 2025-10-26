"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { applyActionCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Logo } from '@/components/Logo';

function ActionHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleAction = async () => {
      const mode = searchParams.get('mode');
      const oobCode = searchParams.get('oobCode');

      if (!mode || !oobCode) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        if (mode === 'verifyEmail') {
          // Verify the email
          await applyActionCode(auth, oobCode);
          setSuccess(true);
          setLoading(false);
          
          // Try to close this tab and return to the original tab
          // This works if the verification link was opened in a new tab
          try {
            // Signal to any open verify-email pages
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('emailVerified', Date.now().toString());
            }
            
            // Try to close this tab after a brief moment
            setTimeout(() => {
              window.close();
              
              // If window.close() doesn't work (opened not by script), redirect to login
              setTimeout(() => {
                router.push('/login?verified=true');
              }, 300);
            }, 1200);
          } catch (error) {
            // Fallback to redirect if close fails
            setTimeout(() => {
              router.push('/login?verified=true');
            }, 3000);
          }
        } else if (mode === 'resetPassword') {
          // Redirect to password reset page with code
          router.push(`/reset-password?oobCode=${oobCode}`);
        } else {
          setError('Unknown action mode');
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Action error:', err);
        if (err.code === 'auth/invalid-action-code') {
          setError('This verification link has expired or has already been used.');
        } else if (err.code === 'auth/expired-action-code') {
          setError('This verification link has expired. Please request a new one.');
        } else {
          setError(err.message || 'Failed to verify email');
        }
        setLoading(false);
      }
    };

    handleAction();
  }, [searchParams, router]);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    text: '#1a1a1a',
    textLight: '#666',
    border: '#e0e0e0',
    bg: '#f5f5f5',
    white: '#ffffff',
    error: '#dc2626',
    success: '#16a34a'
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Logo size="lg" />
          <div style={{
            marginTop: 24,
            width: 40,
            height: 40,
            border: '4px solid ' + colors.border,
            borderTopColor: colors.accent,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '24px auto 0'
          }}></div>
          <p style={{ marginTop: 16, color: colors.textLight }}>Verifying your email...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: colors.white,
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <Logo size="lg" />
        </div>

        {success ? (
          <>
            {/* Success Icon */}
            <div style={{ 
              width: 80, 
              height: 80, 
              background: '#f0fdf4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '2px solid #16a34a'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: 32, 
              fontWeight: 700, 
              color: colors.text, 
              margin: '0 0 12px 0' 
            }}>
              Welcome to Pyro Solutions!
            </h1>

            {/* Description */}
            <p style={{ 
              fontSize: 18, 
              color: colors.textLight, 
              lineHeight: 1.5, 
              margin: '0 0 20px 0',
              fontWeight: 500
            }}>
              Your email has been verified successfully.
            </p>

            <p style={{ 
              fontSize: 16, 
              color: colors.text, 
              lineHeight: 1.6, 
              margin: '0 0 24px 0' 
            }}>
              You're one step closer to landing your dream job. We're excited to review your profile and match you with our expert team.
            </p>

            {/* Redirecting Message */}
            <div style={{
              padding: '18px 24px',
              backgroundColor: '#f0fdf4',
              border: '2px solid #7aa3a1',
              borderRadius: '12px',
              color: colors.text,
              fontSize: '15px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '4px'
              }}>
                <div style={{
                  width: 18,
                  height: 18,
                  border: '2px solid ' + colors.accent,
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <strong style={{ color: colors.accent, fontSize: '16px' }}>Redirecting you now...</strong>
              </div>
            </div>

            {/* Manual Login Link */}
            <a 
              href="/login"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: colors.accent,
                color: colors.white,
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5e8c89'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.accent}
            >
              Go to Login
            </a>
          </>
        ) : (
          <>
            {/* Error Icon */}
            <div style={{ 
              width: 80, 
              height: 80, 
              background: '#fee',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '2px solid #dc2626'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: 28, 
              fontWeight: 700, 
              color: colors.text, 
              margin: '0 0 16px 0' 
            }}>
              Verification Failed
            </h1>

            {/* Error Message */}
            <p style={{ 
              fontSize: 16, 
              color: colors.textLight, 
              lineHeight: 1.6, 
              margin: '0 0 32px 0' 
            }}>
              {error}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a 
                href="/verify-email"
                style={{
                  display: 'inline-block',
                  padding: '14px 24px',
                  backgroundColor: colors.accent,
                  color: colors.white,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5e8c89'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.accent}
              >
                Resend Link
              </a>
              <a 
                href="/login"
                style={{
                  display: 'inline-block',
                  padding: '14px 24px',
                  backgroundColor: colors.white,
                  color: colors.text,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: '2px solid ' + colors.border,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.color = colors.accent;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.text;
                }}
              >
                Back to Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthActionPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Logo size="lg" />
          <p style={{ marginTop: 20, color: '#666' }}>Loading...</p>
        </div>
      </div>
    }>
      <ActionHandler />
    </Suspense>
  );
}

