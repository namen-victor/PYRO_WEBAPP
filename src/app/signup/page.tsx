"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGoogleSignup() {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      // Check if this is a new user and create Firestore document
      const { doc, getDoc, setDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // New user - create Firestore document with pendingProfile status (needs onboarding)
        await setDoc(userDocRef, {
          email: user.email,
          name: user.displayName || 'Google User',
          role: 'client',
          status: 'pendingProfile',
          stepCompleted: 0,
          resumeUploaded: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        // Google users don't need email verification - redirect to onboarding
        router.push('/onboarding');
      } else {
        // Existing user - redirect based on their status
        const userData = userDoc.data();
        if (userData.status === 'active') {
          router.push('/dashboard');
        } else {
          router.push('/waiting');
        }
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setError((error as Error).message || 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Create Firebase Auth user and Firestore document + send verification + admin notify
      await signUpWithEmail(email, password, firstName.trim(), lastName.trim());
      
      // Redirect to email verification
      router.push('/verify-email');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use at least 8 characters.');
      } else {
        setError(error.message || 'Failed to create account. Please try again.');
      }
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
    error: '#dc2626'
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .signup-container {
            padding: 20px !important;
          }
          .signup-card {
            padding: 32px 24px !important;
          }
          .signup-logo {
            margin-bottom: 24px !important;
          }
          .name-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      <div 
        className="signup-container"
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
          className="signup-card"
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
            className="signup-logo"
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 32
            }}
          >
            <Logo size="lg" />
          </div>

          {/* Google Sign Up Button */}
          <button 
            onClick={handleGoogleSignup} 
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
            Sign up with Google
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

          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fee',
              border: `1px solid ${colors.error}`,
              borderRadius: '8px',
              color: colors.error,
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleEmailSignup}>
            {/* First Name & Last Name */}
            <div 
              className="name-grid"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '16px',
                marginBottom: '20px' 
              }}
            >
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: colors.text, 
                  marginBottom: '8px' 
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: colors.text, 
                  marginBottom: '8px' 
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
              </div>
            </div>

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  backgroundColor: colors.white,
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = colors.accent}
                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={8}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '48px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
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

            {/* Confirm Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: 600, 
                color: colors.text, 
                marginBottom: '8px' 
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  minLength={8}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '48px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? (
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

            {/* Register Button */}
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
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <div style={{ 
            textAlign: 'center',
            fontSize: '14px',
            color: colors.text,
            marginBottom: '20px'
          }}>
            Already have an account?{' '}
            <a 
              href="/login" 
              style={{ 
                color: colors.accent, 
                textDecoration: 'none',
                fontWeight: 600
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Login
            </a>
          </div>

          {/* Terms & Privacy */}
          <div style={{ 
            textAlign: 'center',
            fontSize: '12px',
            color: colors.textLight,
            lineHeight: 1.5
          }}>
            By creating an account, you agree to our{' '}
            <a 
              href="/terms" 
              style={{ 
                color: colors.accent, 
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Terms of Use
            </a>
            {' '}and{' '}
            <a 
              href="/privacy" 
              style={{ 
                color: colors.accent, 
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
