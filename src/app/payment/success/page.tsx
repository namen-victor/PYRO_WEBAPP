"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');
  const planId = searchParams.get('plan_id');

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 style={{ margin: 0, color: '#1C1C1E' }}>Payment Successful</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{
        backgroundColor: '#fff',
        padding: 48,
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '64px', marginBottom: 24 }}>🎉</div>
        
        <h2 style={{ margin: '0 0 16px 0', color: '#1C1C1E' }}>
          Welcome to Pyro Solutions!
        </h2>
        
        <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '18px' }}>
          Your payment has been processed successfully. You now have access to our premium job search services.
        </p>

        {sessionId && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: 16,
            borderRadius: '8px',
            marginBottom: 24,
            fontSize: '14px',
            color: '#666'
          }}>
            <strong>Session ID:</strong> {sessionId}
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 16,
          marginBottom: 32
        }}>
          <div style={{
            padding: 20,
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            border: '1px solid #bbdefb'
          }}>
            <div style={{ fontSize: '24px', marginBottom: 8 }}>📋</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>Track Applications</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Monitor your job applications in real-time
            </p>
          </div>
          
          <div style={{
            padding: 20,
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            border: '1px solid #c8e6c9'
          }}>
            <div style={{ fontSize: '24px', marginBottom: 8 }}>💬</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>Chat with Staff</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Get personalized support from your assigned staff member
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <a
            href="/dashboard"
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600
            }}
          >
            Go to Dashboard
          </a>
          
          <a
            href="/pricing"
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600
            }}
          >
            View Plans
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
