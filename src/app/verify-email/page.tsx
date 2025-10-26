"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Logo } from '@/components/Logo';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let unsubscribe: (() => void) | undefined;
    let isChecking = false;

    const performVerificationCheck = async () => {
      if (isChecking) return; // Prevent concurrent checks
      isChecking = true;

      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Force reload user to get fresh emailVerified status
          await currentUser.reload();
          
          // Get the reloaded user
          const reloadedUser = auth.currentUser;
          
          if (reloadedUser && reloadedUser.emailVerified) {
            console.log('Email verified detected! Redirecting...');
            if (interval) clearInterval(interval);
            
            // Email verified! Redirect
            const { getUserProfile } = await import('@/lib/auth');
            const userProfile = await getUserProfile(reloadedUser.uid);
            if (userProfile) {
              redirectByRole(userProfile.role, userProfile.status);
            } else {
              router.push('/onboarding');
            }
          }
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      } finally {
        isChecking = false;
      }
    };

    const checkVerification = async () => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Reload user to get fresh emailVerified status
          try {
            await firebaseUser.reload();
            const refreshedUser = auth.currentUser;
            
            if (refreshedUser) {
              setUser(refreshedUser);
              
              // If email is already verified, redirect based on role and status
              if (refreshedUser.emailVerified) {
                // Get user profile to determine role and status
                const { getUserProfile } = await import('@/lib/auth');
                const userProfile = await getUserProfile(refreshedUser.uid);
                if (userProfile) {
                  redirectByRole(userProfile.role, userProfile.status);
                } else {
                  // Fallback to onboarding if no profile found
                  router.push('/onboarding');
                }
              }
            }
          } catch (error) {
            console.error('Error in auth state change:', error);
          }
        } else {
          // No user, redirect to login
          router.push('/login');
        }
        setLoading(false);
      });
    };

    checkVerification();

    // Set up interval to check verification status every 2 seconds
    interval = setInterval(() => {
      performVerificationCheck();
    }, 2000);

    // Cross-browser event listeners for tab visibility
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Tab focused - checking verification status...');
        performVerificationCheck();
      }
    };

    const handleFocus = () => {
      console.log('Window focused - checking verification status...');
      performVerificationCheck();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // Safari iOS compatibility - fires when returning to page
      if (event.persisted) {
        console.log('Page shown from cache - checking verification status...');
        performVerificationCheck();
      }
    };

    // Listen for localStorage changes (when verification happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'emailVerified') {
        console.log('Email verification detected in another tab!');
        performVerificationCheck();
      }
    };

    // Add multiple event listeners for cross-browser compatibility
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
      window.addEventListener('pageshow', handlePageShow);
      window.addEventListener('storage', handleStorageChange as EventListener);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (unsubscribe) unsubscribe();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('pageshow', handlePageShow);
        window.removeEventListener('storage', handleStorageChange as EventListener);
      }
    };
  }, [router]);

  function redirectByRole(role: string, status: string) {
    if (role === 'admin') {
      return router.replace('/admin/dashboard');
    }
    if (role === 'staff') {
      return router.replace('/staff/dashboard');
    }
    if (role === 'client') {
      if (status === 'active') {
        return router.replace('/dashboard');
      } else if (status === 'waitlisted') {
        return router.replace('/waiting');
      } else {
        return router.replace('/onboarding');
      }
    }
    // Default fallback
    return router.replace('/dashboard');
  }

  const handleResendVerification = async () => {
    if (!user) return;
    
    setResending(true);
    setError('');
    
    try {
      await sendEmailVerification(user);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
      console.log('Firebase verification email resent to:', user.email);
      console.log('Check your inbox for email from Pyrosolutionsinc@gmail.com');
    } catch (err: any) {
      console.error('Failed to resend Firebase verification email:', err);
      setError(err.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

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
          <p style={{ marginTop: 20, color: colors.textLight }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
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

        {/* Email Icon */}
        <div style={{ 
          width: 80, 
          height: 80, 
          background: '#f0f9ff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '2px solid #e0f2fe'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7aa3a1" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: 28, 
          fontWeight: 700, 
          color: colors.text, 
          margin: '0 0 16px 0' 
        }}>
          Verify Your Email
        </h1>

        {/* Description */}
        <p style={{ 
          fontSize: 16, 
          color: colors.textLight, 
          lineHeight: 1.6, 
          margin: '0 0 16px 0' 
        }}>
          We've sent a verification link to <strong>{user.email}</strong>. 
          Please check your email (including spam folder) for an email from 
          <strong> Pyrosolutionsinc@gmail.com</strong> and click the link to verify your account.
        </p>

        {/* Auto-checking indicator */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f0f9ff',
          border: '1px solid #7aa3a1',
          borderRadius: '8px',
          fontSize: '14px',
          color: colors.accent,
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: 16,
            height: 16,
            border: '2px solid ' + colors.accent,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Checking for verification...
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        {/* Success Message */}
        {resendSuccess && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #16a34a',
            borderRadius: '8px',
            color: colors.success,
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            ✅ Verification email sent! Check your inbox and spam folder.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fee',
            border: '1px solid #dc2626',
            borderRadius: '8px',
            color: colors.error,
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {/* Resend Button */}
        <button 
          onClick={handleResendVerification}
          disabled={resending}
          style={{
            width: '100%',
            padding: '14px 20px',
            backgroundColor: resending ? '#999' : colors.accent,
            color: colors.white,
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: resending ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            marginBottom: '20px'
          }}
          onMouseOver={(e) => {
            if (!resending) e.currentTarget.style.backgroundColor = '#5e8c89';
          }}
          onMouseOut={(e) => {
            if (!resending) e.currentTarget.style.backgroundColor = colors.accent;
          }}
        >
          {resending ? 'Sending...' : 'Resend Verification Email'}
        </button>

        {/* Sign Out Link */}
        <button 
          onClick={handleSignOut}
          style={{
            background: 'none',
            border: 'none',
            color: colors.textLight,
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = colors.text}
          onMouseOut={(e) => e.currentTarget.style.color = colors.textLight}
        >
          Sign out and use different account
        </button>

        {/* Help Text */}
        <div style={{ 
          marginTop: 32, 
          padding: '16px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '14px',
          color: colors.textLight,
          lineHeight: 1.5
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Didn't receive the email?</p>
          <p style={{ margin: 0 }}>
            Check your spam folder or try resending. The verification link expires in 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

