"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChange, type User } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { ProgressBar } from '@/components/ProgressBar';
import { getStepFromRoute } from '@/lib/onboarding';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const currentStep = getStepFromRoute(pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        // Not logged in - redirect to login
        router.replace('/login');
        return;
      }

      if (user.role !== 'client') {
        // Not a client - redirect to appropriate dashboard
        if (user.role === 'admin') router.replace('/admin/dashboard');
        else if (user.role === 'staff') router.replace('/staff/dashboard');
        else router.replace('/login');
        return;
      }

      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    bg: '#ebebeb',
    white: '#ffffff',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666'
  };

  if (loading || !user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: colors.bg
      }}>
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
          .onboarding-container {
            padding: 20px 16px !important;
          }
          .progress-container {
            padding: 16px !important;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: colors.bg }}>
        {/* Header */}
        <header style={{ 
          background: colors.white, 
          borderBottom: `1px solid ${colors.border}`,
          padding: '16px 24px'
        }}>
          <div style={{ 
            maxWidth: 1200, 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Logo size="sm" />
            <div style={{ 
              fontSize: 14, 
              color: colors.textLight,
              fontWeight: 500
            }}>
              Welcome, {user.name}
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="progress-container" style={{ 
          background: colors.white,
          borderBottom: `1px solid ${colors.border}`,
          padding: '24px'
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <ProgressBar currentStep={currentStep} />
          </div>
        </div>

        {/* Main Content */}
        <main className="onboarding-container" style={{ 
          padding: '48px 24px',
          maxWidth: 900,
          margin: '0 auto'
        }}>
          {children}
        </main>
      </div>
    </>
  );
}

