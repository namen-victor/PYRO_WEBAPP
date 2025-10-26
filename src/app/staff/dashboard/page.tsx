"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';

export default function StaffDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user && user.role !== 'staff') {
        router.replace('/login');
        return;
      }
      setLoading(false);
    });
    
    // If Firebase isn't configured, simulate staff user after a short delay
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setTimeout(() => {
        setUser({
          uid: 'mock_staff',
          email: 'staff@pyrosolutions.com',
          name: 'Staff User',
          role: 'staff',
          status: 'active'
        });
        setLoading(false);
      }, 1000);
    }
    
    return unsubscribe;
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'staff') {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to be logged in as staff to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  async function handleLogout() {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Staff Dashboard</h1>
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
      <p>Welcome, {user.name}!</p>
      
      <div style={{ marginTop: 32 }}>
        <h2 style={{ margin: '0 0 16px 0', color: '#1C1C1E' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <a 
            href="/staff/applications" 
            style={{
              display: 'block',
              padding: '16px 20px',
              backgroundColor: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#1C1C1E',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>📋 Manage Applications</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Update application statuses</div>
          </a>
          
          <a 
            href="/staff/chat" 
            style={{
              display: 'block',
              padding: '16px 20px',
              backgroundColor: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#1C1C1E',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>💬 Chat with Clients</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Private messaging with clients</div>
          </a>
        </div>
      </div>
    </div>
  );
}