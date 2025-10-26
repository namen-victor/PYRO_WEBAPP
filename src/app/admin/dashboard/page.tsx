"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { RoleBadge } from '@/components/RoleBadge';
import { Logo } from '@/components/Logo';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user && user.role !== 'admin') {
        router.replace('/login');
        return;
      }
      setLoading(false);
    });
    
    // If Firebase isn't configured, simulate admin user after a short delay
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setTimeout(() => {
        setUser({
          uid: 'mock_admin',
          email: 'admin@pyrosolutions.com',
          name: 'Admin User',
          role: 'admin',
          status: 'active'
        });
        setLoading(false);
      }, 1000);
    }
    
    return unsubscribe;
  }, [router]);

  // Update header role badge
  useEffect(() => {
    const headerBadge = document.getElementById('header-role-badge');
    if (headerBadge && user) {
      headerBadge.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>${user.name}</span>
          <span class="pill ${user.role === 'admin' ? 'pill-admin' : 'pill-staff'}" aria-label="User role: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}">
            ${user.role.toUpperCase()}
          </span>
        </div>
      `;
    }
  }, [user]);

  if (loading) {
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

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f5f5f5' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#dc3545', marginBottom: 16 }}>Access Denied</h1>
          <p style={{ color: '#666', marginBottom: 24 }}>You need to be logged in as an admin to view this page.</p>
          <a 
            href="/login" 
            style={{
              padding: '12px 24px',
              backgroundColor: '#7aa3a1',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600
            }}
          >
            Go to Login
          </a>
        </div>
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

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    bg: '#f5f5f5',
    white: '#ffffff',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  };

  // Mock data for demonstration
  const stats = {
    totalClients: 47,
    activeClients: 23,
    waitlistedClients: 18,
    pendingClients: 6,
    totalApplications: 1247,
    applicationsThisWeek: 89,
    responseRate: 23.4,
    interviewsScheduled: 12
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: colors.bg }}>
        {/* Header */}
        <header style={{ 
          background: colors.white, 
          borderBottom: `1px solid ${colors.border}`, 
          padding: '20px 0',
          marginBottom: 32
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Logo size="sm" />
                <div>
                  <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colors.text }}>
                    Admin Dashboard
                  </h1>
                  <p style={{ margin: 0, fontSize: 14, color: colors.textLight }}>
                    Welcome back, {user.name}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: colors.error, 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.error}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Statistics Overview */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 600, color: colors.text }}>
              Overview
            </h2>
            <div className="stats-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: 20,
              marginBottom: 32
            }}>
              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    background: `${colors.info}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    👥
                  </div>
                  <span style={{ fontSize: 12, color: colors.success, fontWeight: 600 }}>
                    +12% this month
                  </span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 4 }}>
                  {stats.totalClients}
                </div>
                <div style={{ fontSize: 14, color: colors.textLight }}>
                  Total Clients
                </div>
              </div>

              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    background: `${colors.success}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    ✅
                  </div>
                  <span style={{ fontSize: 12, color: colors.success, fontWeight: 600 }}>
                    Active
                  </span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 4 }}>
                  {stats.activeClients}
                </div>
                <div style={{ fontSize: 14, color: colors.textLight }}>
                  Active Clients
                </div>
              </div>

              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    background: `${colors.warning}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    ⏳
                  </div>
                  <span style={{ fontSize: 12, color: colors.warning, fontWeight: 600 }}>
                    Waiting
                  </span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 4 }}>
                  {stats.waitlistedClients}
                </div>
                <div style={{ fontSize: 14, color: colors.textLight }}>
                  Waitlisted
                </div>
              </div>

              <div style={{ 
                background: colors.white, 
                padding: 24, 
                borderRadius: 12, 
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 8, 
                    background: `${colors.accent}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    📊
                  </div>
                  <span style={{ fontSize: 12, color: colors.info, fontWeight: 600 }}>
                    +{stats.applicationsThisWeek} this week
                  </span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 4 }}>
                  {stats.totalApplications}
                </div>
                <div style={{ fontSize: 14, color: colors.textLight }}>
                  Total Applications
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 600, color: colors.text }}>
              Quick Actions
            </h2>
            <div className="dashboard-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: 20
            }}>
              <a 
                href="/admin/clients" 
                style={{
                  display: 'block',
                  padding: '24px',
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  textDecoration: 'none',
                  color: colors.text,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: `${colors.info}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 24
                  }}>
                    👥
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.text }}>
                      Manage Clients
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: colors.textLight }}>
                      View and manage client accounts
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: 14, color: colors.textLight }}>
                  View client profiles, onboarding data, and subscription status
                </div>
              </a>
              
              <a 
                href="/admin/upload-applications" 
                style={{
                  display: 'block',
                  padding: '24px',
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  textDecoration: 'none',
                  color: colors.text,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: `${colors.success}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 24
                  }}>
                    📊
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.text }}>
                      Upload Applications
                    </h3>
                    <p style={{ margin: 0, fontSize: 14, color: colors.textLight }}>
                      Bulk upload job applications
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: 14, color: colors.textLight }}>
                  Upload CSV files with job application data
                </div>
              </a>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 600, color: colors.text }}>
              Recent Activity
            </h2>
            <div style={{ 
              background: colors.white, 
              borderRadius: 12, 
              border: `1px solid ${colors.border}`,
              padding: 24,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
                  <div style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    background: colors.success 
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>
                      New client registered: John Doe
                    </div>
                    <div style={{ fontSize: 12, color: colors.textLight }}>
                      2 hours ago
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
                  <div style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    background: colors.info 
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>
                      15 applications uploaded successfully
                    </div>
                    <div style={{ fontSize: 12, color: colors.textLight }}>
                      4 hours ago
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
                  <div style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    background: colors.warning 
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>
                      Client status updated: Jane Smith → Active
                    </div>
                    <div style={{ fontSize: 12, color: colors.textLight }}>
                      6 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}