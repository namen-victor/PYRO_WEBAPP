"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { notifyWaitingListWelcome } from '@/lib/notifications';

export default function WaitingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user && user.role === 'client' && user.status === 'active') {
        router.replace('/dashboard');
        return;
      }
      if (user && user.role === 'client' && user.status === 'waitlisted') {
        setUser(user);
        setLoading(false);
        
        // Send welcome email when user reaches waiting page
        try {
          await notifyWaitingListWelcome(user.uid, user.name, user.email);
        } catch (error) {
          console.warn('Failed to send waiting list welcome email:', error);
        }
        
        return;
      }
      // No user or wrong status - redirect to login after brief moment
      if (!user) {
        setTimeout(() => {
          router.replace('/login');
        }, 500);
      }
    });
    
    // If Firebase isn't configured, simulate waitlisted client after a short delay
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setTimeout(() => {
        setUser({
          uid: 'mock_client',
          email: 'client@pyrosolutions.com',
          name: 'Client User',
          role: 'client',
          status: 'waitlisted'
        });
        setLoading(false);
      }, 1000);
    }
    
    return unsubscribe;
  }, [router]);

  async function handleLogout() {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    bg: '#f5f5f5',
    white: '#ffffff',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    success: '#10b981',
    warning: '#f59e0b'
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.bg }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, color: colors.textLight, fontSize: '16px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .waiting-container {
            padding: 20px !important;
          }
          .waiting-card {
            padding: 32px 24px !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: colors.bg }}>
        {/* Header */}
        <header style={{ background: colors.white, borderBottom: `1px solid ${colors.border}`, padding: '16px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Logo size="sm" />
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: colors.primary, 
                color: colors.white, 
                border: 'none', 
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="waiting-container" style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
          {/* Hero Card */}
          <div className="waiting-card" style={{ 
            background: colors.white, 
            borderRadius: 16, 
            padding: '48px 40px', 
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: 40
          }}>
            {/* Icon */}
            <div style={{ 
              width: 80, 
              height: 80, 
              background: `${colors.accent}15`, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: 40
            }}>
              ⏳
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: 32, 
              fontWeight: 800, 
              color: colors.text, 
              margin: '0 0 16px 0',
              lineHeight: 1.2
            }}>
              You're on the Waitlist!
            </h1>

            {/* Subtitle */}
            <p style={{ 
              fontSize: 18, 
              color: colors.textLight, 
              margin: '0 0 32px 0',
              lineHeight: 1.6,
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Welcome, <strong style={{ color: colors.accent }}>{user.name}</strong>! Your account has been created successfully. 
              Our team is reviewing your application and will activate your account shortly.
            </p>

            {/* Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: `${colors.warning}15`,
              border: `1px solid ${colors.warning}`,
              borderRadius: 8,
              color: colors.warning,
              fontWeight: 600,
              fontSize: 14
            }}>
              <span style={{ fontSize: 16 }}>⏱️</span>
              Status: Pending Activation
            </div>
          </div>

          {/* What Happens Next */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: colors.text, 
              marginBottom: 24,
              textAlign: 'center'
            }}>
              What Happens Next?
            </h2>

            <div className="steps-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: 20 
            }}>
              {/* Step 1 */}
              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: `${colors.accent}15`, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 24,
                  fontWeight: 700,
                  color: colors.accent
                }}>
                  1
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
                  Review
                </h3>
                <p style={{ fontSize: 14, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                  Our team reviews your application and verifies your information
                </p>
              </div>

              {/* Step 2 */}
              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: `${colors.accent}15`, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 24,
                  fontWeight: 700,
                  color: colors.accent
                }}>
                  2
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
                  Notification
                </h3>
                <p style={{ fontSize: 14, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                  You'll receive an email when your account is activated
                </p>
              </div>

              {/* Step 3 */}
              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: `${colors.success}15`, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 24,
                  fontWeight: 700,
                  color: colors.success
                }}>
                  3
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
                  Get Started
                </h3>
                <p style={{ fontSize: 14, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                  Log in and access your full dashboard with all features
                </p>
              </div>
            </div>
          </div>

          {/* While You Wait */}
          <div style={{ 
            background: colors.white, 
            borderRadius: 12, 
            padding: 32, 
            border: `1px solid ${colors.border}`,
            marginBottom: 40
          }}>
            <h2 style={{ 
              fontSize: 20, 
              fontWeight: 700, 
              color: colors.text, 
              marginBottom: 20,
              textAlign: 'center'
            }}>
              While You Wait...
            </h2>

            <div className="features-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 20 
            }}>
              {/* Feature 1 */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  background: `${colors.accent}15`, 
                  borderRadius: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 20
                }}>
                  📄
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>
                    Prepare Your Resume
                  </h3>
                  <p style={{ fontSize: 13, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                    Have your latest resume ready in PDF format for upload
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  background: `${colors.accent}15`, 
                  borderRadius: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 20
                }}>
                  🎯
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>
                    Define Your Goals
                  </h3>
                  <p style={{ fontSize: 13, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                    Think about your ideal role, industry, and career objectives
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  background: `${colors.accent}15`, 
                  borderRadius: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 20
                }}>
                  💼
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>
                    Browse Our Services
                  </h3>
                  <p style={{ fontSize: 13, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                    Explore our career services and see what we offer
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  background: `${colors.accent}15`, 
                  borderRadius: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 20
                }}>
                  📚
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.text, margin: '0 0 4px 0' }}>
                    Read Success Stories
                  </h3>
                  <p style={{ fontSize: 13, color: colors.textLight, margin: 0, lineHeight: 1.5 }}>
                    Get inspired by our clients who landed their dream jobs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a 
              href="/services"
              style={{
                padding: '14px 28px',
                background: colors.accent,
                color: colors.white,
                textDecoration: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
            >
              Explore Services
            </a>
            <a 
              href="/success-stories"
              style={{
                padding: '14px 28px',
                background: colors.white,
                color: colors.text,
                textDecoration: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                border: `1px solid ${colors.border}`,
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
            >
              Success Stories
            </a>
            <a 
              href="/resources"
              style={{
                padding: '14px 28px',
                background: colors.white,
                color: colors.text,
                textDecoration: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                border: `1px solid ${colors.border}`,
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
            >
              Free Resources
            </a>
          </div>

          {/* Help Section */}
          <div style={{ 
            marginTop: 40,
            textAlign: 'center',
            padding: 24,
            background: `${colors.accent}10`,
            borderRadius: 12,
            border: `1px solid ${colors.accent}`
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: '0 0 8px 0' }}>
              Questions?
            </h3>
            <p style={{ fontSize: 14, color: colors.textLight, margin: '0 0 16px 0' }}>
              Our support team is here to help you get started
            </p>
            <a 
              href="/contact"
              style={{
                padding: '10px 24px',
                background: colors.accent,
                color: colors.white,
                textDecoration: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                display: 'inline-block'
              }}
            >
              Contact Support
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
