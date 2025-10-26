"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';

export default function PaymentCancelPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        <h1 style={{ margin: 0, color: '#1C1C1E' }}>Payment Cancelled</h1>
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
        <div style={{ fontSize: '64px', marginBottom: 24 }}>😔</div>
        
        <h2 style={{ margin: '0 0 16px 0', color: '#1C1C1E' }}>
          Payment Cancelled
        </h2>
        
        <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '18px' }}>
          Your payment was cancelled. No charges have been made to your account.
        </p>

        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: 16,
          borderRadius: '8px',
          marginBottom: 24
        }}>
          <p style={{ margin: 0, color: '#856404' }}>
            <strong>Need help?</strong> If you experienced any issues during checkout, 
            please contact our support team or try again.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <a
            href="/pricing"
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600
            }}
          >
            Try Again
          </a>
          
          <a
            href="/dashboard"
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600
            }}
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

