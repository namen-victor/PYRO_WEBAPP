"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChange, signInWithEmail, signInWithGoogle, logout, getUserProfile, type User, isEmailVerified } from '@/lib/auth';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<'email' | 'password' | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    
    const unsubscribe = onAuthStateChange((user) => {
      clearTimeout(timeout);
      setUser(user);
      setAuthLoading(false);
      if (user) {
        redirectByRole(user.role, user.status);
      }
    });
    
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  function redirectByRole(role: string, status: string) {
    // Check email verification first
    if (!isEmailVerified()) {
      return router.replace('/verify-email');
    }
    
    if (role === 'admin') {
      return router.replace('/admin/dashboard');
    }
    if (role === 'staff') {
      return router.replace('/staff/dashboard');
    }
    if (role === 'client') {
      if (status === 'active') {
        return router.replace('/dashboard');
      }
      if (status === 'pendingProfile') {
        return router.replace('/onboarding');
      }
      return router.replace('/waiting');
    }
  }

  function getFirebaseErrorMessage(error: any): { message: string; field: 'email' | 'password' | null } {
    const errorCode = error?.code || '';
    
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/invalid-email':
        return { 
          message: 'No account found with this email address. Please sign up or check your email.', 
          field: 'email' 
        };
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return { 
          message: 'Incorrect password. Please try again or reset your password.', 
          field: 'password' 
        };
      case 'auth/user-disabled':
        return { 
          message: 'This account has been disabled. Please contact support.', 
          field: 'email' 
        };
      case 'auth/too-many-requests':
        return { 
          message: 'Too many failed attempts. Please wait a moment and try again.', 
          field: 'password' 
        };
      case 'auth/network-request-failed':
        return { 
          message: 'Network error. Please check your internet connection and try again.', 
          field: null 
        };
      default:
        return { 
          message: 'Login failed. Please check your credentials and try again.', 
          field: null 
        };
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorField(null);
    
    try {
      await signInWithEmail(email, password);
      const user = await getUserProfile('admin_123');
      if (user) {
        setUser(user);
        redirectByRole(user.role, user.status);
      } else {
        router.replace('/admin/dashboard');
      }
    } catch (error) {
      console.error('Firebase login error:', error);
      const { message, field } = getFirebaseErrorMessage(error);
      setError(message);
      setErrorField(field);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const firebaseUser = result.user;
      
      // Check if user document exists in Firestore
      const { doc, getDoc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // New user - create Firestore document with pendingProfile status
        console.log('New Google user detected, creating Firestore document');
        await setDoc(userDocRef, {
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Google User',
          role: 'client',
          status: 'pendingProfile',
          stepCompleted: 0,
          resumeUploaded: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        // Redirect to onboarding for new users
        router.push('/onboarding');
      } else {
        // Existing user - auth state listener will handle redirect
        console.log('Existing Google user, auth listener will redirect');
      }
    } catch (error) {
      console.error('Google login error:', error);
      if ((error as Error).message === 'Firebase not configured') {
        alert('Firebase not configured. Please set up Firebase config in .env.local');
      } else {
        alert('Google login failed: ' + (error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
  }

  if (authLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in, show a nice loading state while redirecting
  if (user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #7aa3a1',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: 20, color: '#666', fontSize: 16 }}>
            Logging you in...
          </p>
          <p style={{ marginTop: 8, color: '#999', fontSize: 14 }}>
            Welcome back, {user.name}
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    text: '#1a1a1a',
    textLight: '#666',
    border: '#e0e0e0',
    bg: '#f5f5f5',
    white: '#ffffff'
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .login-container {
            padding: 20px !important;
          }
          .login-card {
            padding: 32px 24px !important;
          }
          .login-logo {
            margin-bottom: 24px !important;
          }
        }
      `}</style>
      
      <div 
        className="login-container"
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
          className="login-card"
          style={{
            background: colors.white,
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '48px 40px',
            width: '100%',
            maxWidth: '460px'
          }}
        >
          {/* Logo */}
          <div 
            className="login-logo"
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 32
            }}
          >
            <Logo size="lg" />
          </div>

          {/* Google Sign In Button */}
          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: colors.white,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '24px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#fafafa';
                e.currentTarget.style.borderColor = '#ccc';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.white;
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Log in with Google
          </button>

          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '24px 0',
            color: colors.textLight,
            fontSize: '14px'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }}></div>
            <span style={{ padding: '0 16px', fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }}></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin}>
            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                  setErrorField(null);
                }}
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${errorField === 'email' ? '#ef4444' : colors.border}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  backgroundColor: colors.white,
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = errorField === 'email' ? '#ef4444' : colors.accent}
                onBlur={(e) => e.currentTarget.style.borderColor = errorField === 'email' ? '#ef4444' : colors.border}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: 600, 
                color: colors.text, 
                marginBottom: '8px' 
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                    setErrorField(null);
                  }}
                  placeholder="Password"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '48px',
                    border: `1px solid ${errorField === 'password' ? '#ef4444' : colors.border}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = errorField === 'password' ? '#ef4444' : colors.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = errorField === 'password' ? '#ef4444' : colors.border}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: colors.textLight
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                marginBottom: '16px',
                padding: '12px 16px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#dc2626',
                  fontWeight: 500
                }}>
                  {error}
                </p>
              </div>
            )}

            {/* Forgot Password Link */}
            <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <a 
                href="/forgot-password" 
                style={{ 
                  fontSize: '14px', 
                  color: colors.accent, 
                  textDecoration: 'none',
                  fontWeight: 500
                }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                Forgot your password?
              </a>
            </div>

            {/* Login Button */}
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
                marginBottom: '24px'
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#1a1a1a';
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = colors.primary;
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div style={{ 
            textAlign: 'center',
            fontSize: '14px',
            color: colors.text
          }}>
            Don't have an account?{' '}
            <a 
              href="/signup" 
              style={{ 
                color: colors.accent, 
                textDecoration: 'none',
                fontWeight: 600
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
