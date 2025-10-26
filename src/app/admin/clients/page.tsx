"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, updateUserStatus, logout, type User } from '@/lib/auth';
import { notifyAccountActivated } from '@/lib/notifications';
import { RoleBadge } from '@/components/RoleBadge';
import { Drawer } from '@/components/Drawer';
import { SimplePDFViewer } from '@/components/SimplePDFViewer';
import { db } from '@/lib/firebase';
import { OnboardingData } from '@/lib/onboarding';

// Extended user interface with onboarding data
interface ExtendedUser extends User {
  onboardingData?: OnboardingData;
  createdAt?: string;
  lastLoginAt?: string;
}

// Mock data for when Firebase isn't configured
const MOCK_USERS: ExtendedUser[] = [
  { 
    uid: 'admin_123', 
    name: 'Admin User', 
    email: 'admin@pyrosolutions.com', 
    role: 'admin' as const, 
    status: 'active' as const, 
    resumeUrl: undefined,
    createdAt: '2024-01-15T10:30:00Z',
    lastLoginAt: '2024-01-20T14:22:00Z'
  },
  { 
    uid: 'staff_456', 
    name: 'Staff User', 
    email: 'staff@pyrosolutions.com', 
    role: 'staff' as const, 
    status: 'active' as const, 
    resumeUrl: undefined,
    createdAt: '2024-01-16T09:15:00Z',
    lastLoginAt: '2024-01-20T16:45:00Z'
  },
  { 
    uid: 'client_789', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'client' as const, 
    status: 'waitlisted' as const, 
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    createdAt: '2024-01-18T11:20:00Z',
    lastLoginAt: '2024-01-19T08:30:00Z',
    onboardingData: {
      onboardingVersion: 1,
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Software Engineer',
      gender: 'Male',
      country: 'United States',
      age: 28,
      residencyStatus: 'citizen',
      resumeUploaded: true,
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      preferredEmail: 'john.doe@example.com',
      allowPhoneContact: true,
      phoneNumber: '+1-555-123-4567',
      jobBoards: ['LinkedIn', 'Indeed', 'Glassdoor'],
      jobBoardsConsent: true,
      gmailConsent: true,
      aiTrackingConsent: true,
      stepCompleted: 6,
      createdAt: '2024-01-18T11:20:00Z',
      updatedAt: '2024-01-19T08:30:00Z'
    }
  },
  { 
    uid: 'client_101', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com', 
    role: 'client' as const, 
    status: 'pendingProfile' as const, 
    resumeUrl: undefined,
    createdAt: '2024-01-19T14:45:00Z',
    lastLoginAt: '2024-01-19T14:45:00Z',
    onboardingData: {
      onboardingVersion: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      jobTitle: 'Marketing Manager',
      gender: 'Female',
      country: 'Canada',
      age: 32,
      residencyStatus: 'permanent_resident',
      resumeUploaded: false,
      preferredEmail: 'sarah.j@example.com',
      allowPhoneContact: false,
      jobBoards: ['LinkedIn', 'Indeed'],
      jobBoardsConsent: true,
      gmailConsent: true,
      aiTrackingConsent: true,
      stepCompleted: 2,
      createdAt: '2024-01-19T14:45:00Z',
      updatedAt: '2024-01-19T14:45:00Z'
    }
  }
];

export default function AdminClientsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [rows, setRows] = useState<ExtendedUser[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false); // Stop loading once we get auth state
      
      if (user && user.role !== 'admin') {
        router.replace('/login');
        return;
      }
      // If user is null and we're not logging out, it means they were logged out
      if (!user && !loggingOut) {
        router.replace('/login');
        return;
      }
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
    
    return () => {
      unsubscribe();
    };
  }, [router, loggingOut]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadUsers();
    }
  }, [user]);

  async function loadUsers() {
    try {
      console.log('Loading users...', { db: !!db });
      
      if (!db) {
        console.log('Firebase not configured, using mock data');
        // Use mock data when Firebase isn't configured
        setRows(MOCK_USERS);
        setLoading(false);
        return;
      }
      
      const { collection, getDocs, doc, getDoc } = await import('firebase/firestore');
      console.log('Fetching users from Firestore...');
      const usersSnapshot = await getDocs(collection(db, 'users'));
      console.log(`Found ${usersSnapshot.docs.length} users in Firestore`);
      
      // Load users with their onboarding data
      const usersWithOnboarding = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
          const userData = userDoc.data();
          console.log(`Processing user: ${userDoc.id}`, userData);
          
          const extendedUser: ExtendedUser = {
            uid: userDoc.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            status: userData.status,
            resumeUrl: userData.resumeUrl,
            createdAt: userData.createdAt,
            lastLoginAt: userData.lastLoginAt,
          };

          // Check if onboarding data is stored directly in the user document
          if (userData.stepCompleted !== undefined || userData.firstName || userData.jobTitle) {
            console.log(`Found onboarding data directly in user document for ${userDoc.id}`);
            const onboardingData: OnboardingData = {
              onboardingVersion: 1,
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              jobTitle: userData.jobTitle || '',
              gender: userData.gender || '',
              genderCustom: userData.genderCustom,
              country: userData.country || '',
              age: userData.age || 0,
              residencyStatus: userData.residencyStatus || 'citizen',
              residencyAlias: userData.residencyAlias,
              visaType: userData.visaType,
              resumeUploaded: userData.resumeUploaded || false,
              resumeUrl: userData.resumeUrl,
              preferredEmail: userData.preferredEmail || userData.email,
              allowPhoneContact: userData.allowPhoneContact || false,
              phoneNumber: userData.phoneNumber,
              phoneNumberMismatchConfirmed: userData.phoneNumberMismatchConfirmed,
              jobBoards: userData.jobBoards || [],
              jobBoardsOther: userData.jobBoardsOther,
              jobBoardsConsent: userData.jobBoardsConsent || false,
              gmailConsent: userData.gmailConsent || false,
              aiTrackingConsent: userData.aiTrackingConsent || false,
              stepCompleted: userData.stepCompleted || 0,
              createdAt: userData.createdAt || new Date().toISOString(),
              updatedAt: userData.updatedAt || new Date().toISOString(),
              onboardingCompletedAt: userData.onboardingCompletedAt,
              archivedResumes: userData.archivedResumes || [],
              subscriptionStatus: userData.subscriptionStatus,
              subscriptionPlan: userData.subscriptionPlan,
              billingCycle: userData.billingCycle,
              applicationsPerDay: userData.applicationsPerDay,
              applicationProgress: userData.applicationProgress,
            };
            extendedUser.onboardingData = onboardingData;
          } else {
            // Try to fetch onboarding data from separate collection
            try {
              console.log(`Fetching onboarding data from separate collection for user: ${userDoc.id}`);
              const onboardingDoc = await getDoc(doc(db, 'onboarding', userDoc.id));
              if (onboardingDoc.exists()) {
                const onboardingData = onboardingDoc.data() as OnboardingData;
                console.log(`Found onboarding data for ${userDoc.id}:`, onboardingData);
                extendedUser.onboardingData = onboardingData;
              } else {
                console.log(`No onboarding data found for user: ${userDoc.id}`);
              }
            } catch (onboardingError) {
              console.log(`Error fetching onboarding data for user ${userDoc.id}:`, onboardingError);
            }
          }

          return extendedUser;
        })
      );
      
      console.log('Final users with onboarding data:', usersWithOnboarding);
      setRows(usersWithOnboarding);
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to mock data
      setRows(MOCK_USERS);
    } finally {
      setLoading(false);
    }
  }

  async function handleActivate(uid: string) {
    try {
      if (!db) {
        // Mock activation when Firebase isn't configured
        setRows(prev => prev.map(u => u.uid === uid ? { ...u, status: 'active' } : u));
        setOpenId(null);
        return;
      }
      
      await updateUserStatus(uid, 'active');
      setRows(prev => prev.map(u => u.uid === uid ? { ...u, status: 'active' } : u));
      setOpenId(null);
      
      // Send activation email to the user
      try {
        const user = rows.find(u => u.uid === uid);
        if (user) {
          await notifyAccountActivated(uid, user.name, user.email);
        }
      } catch (error) {
        console.warn('Failed to send activation email:', error);
      }
    } catch (error) {
      alert('Failed to activate user: ' + (error as Error).message);
    }
  }

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'waitlisted': return '#f59e0b';
      case 'pendingProfile': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✓';
      case 'waitlisted': return '⏳';
      case 'pendingProfile': return '📝';
      default: return '❓';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOnboardingProgress = (user: ExtendedUser) => {
    if (!user.onboardingData) return 0;
    return Math.round((user.onboardingData.stepCompleted / 6) * 100);
  };

  const getResidencyStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'citizen': 'Citizen',
      'permanent_resident': 'Permanent Resident',
      'work_visa_holder': 'Work Visa Holder',
      'student': 'Student',
      'refugee_asylee': 'Refugee/Asylee',
      'temporary_other': 'Temporary Other'
    };
    return labels[status] || status;
  };

  // Filter and search logic
  const filteredRows = rows.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.onboardingData?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.onboardingData?.country?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Statistics
  const stats = {
    total: rows.length,
    clients: rows.filter(u => u.role === 'client').length,
    active: rows.filter(u => u.status === 'active').length,
    waitlisted: rows.filter(u => u.status === 'waitlisted').length,
    pendingProfile: rows.filter(u => u.status === 'pendingProfile').length,
    withResume: rows.filter(u => u.onboardingData?.resumeUploaded).length,
    completedOnboarding: rows.filter(u => u.onboardingData?.stepCompleted === 6).length
  };

  if (loggingOut) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8fafc',
        gap: '24px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            color: '#1e293b', 
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Logging out...
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#64748b', 
            fontSize: '16px'
          }}>
            Please wait while we sign you out
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading clients...
      </div>
    );
  }
  
  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#ef4444', marginBottom: '16px' }}>Access Denied</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>You need to be logged in as an admin to view this page.</p>
        <a 
          href="/login" 
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px',
            fontWeight: '600'
          }}
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            color: '#1e293b', 
            fontSize: '32px', 
            fontWeight: '700',
            marginBottom: '8px'
          }}>
            Client Management
          </h1>
          <p style={{ 
            margin: 0, 
            color: '#64748b', 
            fontSize: '16px'
          }}>
            Manage clients, view onboarding progress, and track applications
          </p>
        </div>
        <button 
          onClick={async () => {
            try {
              setLoggingOut(true);
              await logout();
              // Add a small delay to ensure the logout state is visible
              setTimeout(() => {
                router.replace('/login');
              }, 500);
            } catch (error) {
              console.error('Logout error:', error);
              setLoggingOut(false);
            }
          }}
          disabled={loggingOut}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: loggingOut ? '#9ca3af' : '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: loggingOut ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'background-color 0.2s',
            opacity: loggingOut ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!loggingOut) {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }
          }}
          onMouseLeave={(e) => {
            if (!loggingOut) {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }
          }}
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      {/* Statistics Dashboard */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#3b82f6', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>👥</span>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{stats.total}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Total Users</div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#10b981', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>✓</span>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{stats.active}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Active Clients</div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#f59e0b', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>⏳</span>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{stats.waitlisted}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Waitlisted</div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#8b5cf6', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>📄</span>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{stats.completedOnboarding}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Completed Onboarding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, email, job title, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="pendingProfile">Pending Profile</option>
            </select>
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Roles</option>
              <option value="client">Clients</option>
              <option value="staff">Staff</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
        gap: '24px' 
      }}>
        {filteredRows.map((client) => (
          <div 
            key={client.uid}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setOpenId(client.uid)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            {/* Card Header */}
            <div style={{ 
              padding: '20px 24px 16px', 
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#1e293b' 
                }}>
                  {client.name}
                </h3>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '14px', 
                  color: '#64748b' 
                }}>
                  {client.email}
                </p>
                {client.onboardingData?.jobTitle && (
                  <p style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '14px', 
                    color: '#3b82f6',
                    fontWeight: '500'
                  }}>
                    {client.onboardingData.jobTitle}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <RoleBadge role={client.role} />
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: getStatusColor(client.status) + '20',
                  color: getStatusColor(client.status)
                }}>
                  {getStatusIcon(client.status)} {client.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: '20px 24px' }}>
              {/* Onboarding Progress */}
              {client.onboardingData && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '8px' 
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                      Onboarding Progress
                    </span>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>
                      {getOnboardingProgress(client)}%
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    backgroundColor: '#e2e8f0', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${getOnboardingProgress(client)}%`, 
                      height: '100%', 
                      backgroundColor: getOnboardingProgress(client) === 100 ? '#10b981' : '#3b82f6',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              )}

              {/* Key Information Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginBottom: '16px'
              }}>
                {client.onboardingData?.country && (
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Country</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>
                      {client.onboardingData.country}
                    </div>
                  </div>
                )}
                
                {client.onboardingData?.age && (
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Age</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>
                      {client.onboardingData.age}
                    </div>
                  </div>
                )}

                {client.onboardingData?.residencyStatus && (
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Residency</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>
                      {getResidencyStatusLabel(client.onboardingData.residencyStatus)}
                    </div>
                  </div>
                )}

                {client.onboardingData?.phoneNumber && (
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Phone</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>
                      {client.onboardingData.phoneNumber}
                    </div>
                  </div>
                )}
              </div>

              {/* Job Boards */}
              {client.onboardingData?.jobBoards && client.onboardingData.jobBoards.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '6px' }}>
                    Selected Job Boards
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {client.onboardingData.jobBoards.slice(0, 3).map((board, index) => (
                      <span 
                        key={index}
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          fontSize: '11px',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}
                      >
                        {board}
                      </span>
                    ))}
                    {client.onboardingData.jobBoards.length > 3 && (
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: '#e2e8f0',
                        color: '#64748b',
                        fontSize: '11px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        +{client.onboardingData.jobBoards.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Resume Status */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: client.onboardingData?.resumeUploaded ? '#f0fdf4' : '#fef2f2',
                borderRadius: '8px',
                border: `1px solid ${client.onboardingData?.resumeUploaded ? '#bbf7d0' : '#fecaca'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>
                    {client.onboardingData?.resumeUploaded ? '📄' : '📝'}
                  </span>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '500',
                    color: client.onboardingData?.resumeUploaded ? '#166534' : '#dc2626'
                  }}>
                    {client.onboardingData?.resumeUploaded ? 'Resume Uploaded' : 'No Resume'}
                  </span>
                </div>
                {client.onboardingData?.resumeUploaded && (
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#166534',
                    fontWeight: '600'
                  }}>
                    ✓
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div style={{ 
              padding: '16px 24px', 
              backgroundColor: '#f8fafc', 
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Created: {formatDate(client.createdAt)}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Last login: {formatDate(client.lastLoginAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRows.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#374151', 
            marginBottom: '8px' 
          }}>
            No clients found
          </h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Try adjusting your search or filter criteria
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setRoleFilter('all');
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Detailed Drawer */}
      <Drawer
        open={!!openId}
        title="Client Details"
        onClose={() => setOpenId(null)}
      >
        {(() => {
          const client = rows.find(x => x.uid === openId);
          if (!client) return <p>No selection.</p>;
          
          return (
            <div style={{ padding: '24px 0' }}>
              {/* Basic Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  margin: '0 0 20px 0', 
                  color: '#1e293b', 
                  fontSize: '20px',
                  fontWeight: '600',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '8px'
                }}>
                  Basic Information
                </h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Name</label>
                      <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.name}</p>
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Email</label>
                      <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.email}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Role</label>
                      <div style={{ margin: 0 }}>
                        <RoleBadge role={client.role} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Status</label>
                      <div style={{ margin: 0 }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: getStatusColor(client.status) + '20',
                          color: getStatusColor(client.status)
                        }}>
                          {getStatusIcon(client.status)} {client.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Onboarding Data */}
              {client.onboardingData && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ 
                    margin: '0 0 20px 0', 
                    color: '#1e293b', 
                    fontSize: '20px',
                    fontWeight: '600',
                    borderBottom: '2px solid #e2e8f0',
                    paddingBottom: '8px'
                  }}>
                    Onboarding Information
                  </h3>
                  
                  {/* Progress Bar */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '8px' 
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Onboarding Progress
                      </span>
                      <span style={{ fontSize: '14px', color: '#64748b' }}>
                        {client.onboardingData.stepCompleted}/6 steps completed
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: '#e2e8f0', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${getOnboardingProgress(client)}%`, 
                        height: '100%', 
                        backgroundColor: getOnboardingProgress(client) === 100 ? '#10b981' : '#3b82f6',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>Personal Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      {client.onboardingData.jobTitle && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Job Title</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.onboardingData.jobTitle}</p>
                        </div>
                      )}
                      
                      {client.onboardingData.gender && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Gender</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
                            {client.onboardingData.gender}
                            {client.onboardingData.genderCustom && ` (${client.onboardingData.genderCustom})`}
                          </p>
                        </div>
                      )}
                      
                      {client.onboardingData.age && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Age</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.onboardingData.age}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location & Status */}
                  <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>Location & Status</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      {client.onboardingData.country && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Country</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.onboardingData.country}</p>
                        </div>
                      )}
                      
                      {client.onboardingData.residencyStatus && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Residency Status</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
                            {getResidencyStatusLabel(client.onboardingData.residencyStatus)}
                            {client.onboardingData.residencyAlias && ` (${client.onboardingData.residencyAlias})`}
                          </p>
                        </div>
                      )}
                      
                      {client.onboardingData.visaType && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Visa Type</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.onboardingData.visaType}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>Contact Information</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preferred Email</label>
                        <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.onboardingData.preferredEmail}</p>
                      </div>
                      
                      {client.onboardingData.phoneNumber && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{client.onboardingData.phoneNumber}</p>
                        </div>
                      )}
                      
                      <div>
                        <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Phone Contact Allowed</label>
                        <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
                          {client.onboardingData.allowPhoneContact ? 'Yes' : 'No'}
                        </p>
                      </div>
                      
                      {client.onboardingData.phoneNumber && (
                        <div>
                          <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Phone Number Mismatch Confirmed</label>
                          <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
                            {client.onboardingData.phoneNumberMismatchConfirmed ? 'Yes' : 'No'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Boards */}
                  {client.onboardingData.jobBoards && client.onboardingData.jobBoards.length > 0 && (
                    <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>Selected Job Boards</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {client.onboardingData.jobBoards.map((board, index) => (
                          <span 
                            key={index}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              fontSize: '12px',
                              borderRadius: '6px',
                              fontWeight: '500'
                            }}
                          >
                            {board}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Consent Status */}
                  <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>Consent Status</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Job Boards Consent</label>
                        <p style={{ margin: 0, fontSize: '16px', color: client.onboardingData.jobBoardsConsent ? '#10b981' : '#ef4444' }}>
                          {client.onboardingData.jobBoardsConsent ? '✓ Granted' : '✗ Not Granted'}
                        </p>
                      </div>
                      
                      <div>
                        <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Gmail Consent</label>
                        <p style={{ margin: 0, fontSize: '16px', color: client.onboardingData.gmailConsent ? '#10b981' : '#ef4444' }}>
                          {client.onboardingData.gmailConsent ? '✓ Granted' : '✗ Not Granted'}
                        </p>
                      </div>
                      
                      <div>
                        <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>AI Tracking Consent</label>
                        <p style={{ margin: 0, fontSize: '16px', color: client.onboardingData.aiTrackingConsent ? '#10b981' : '#ef4444' }}>
                          {client.onboardingData.aiTrackingConsent ? '✓ Granted' : '✗ Not Granted'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resume */}
                  <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>Resume</h4>
                    {client.onboardingData.resumeUploaded && client.onboardingData.resumeUrl ? (
                      <div>
                        <div style={{ 
                          padding: '12px', 
                          backgroundColor: '#f0fdf4', 
                          border: '1px solid #bbf7d0', 
                          borderRadius: '8px',
                          marginBottom: '16px'
                        }}>
                          <p style={{ margin: 0, color: '#166534', fontWeight: '500' }}>
                            ✓ Current resume uploaded successfully
                          </p>
                        </div>
                        <SimplePDFViewer 
                          pdfUrl={client.onboardingData.resumeUrl} 
                          title={`${client.name}'s Current Resume`}
                          height="400px"
                        />
                      </div>
                    ) : (
                      <div style={{ 
                        padding: '12px', 
                        backgroundColor: '#fef2f2', 
                        border: '1px solid #fecaca', 
                        borderRadius: '8px'
                      }}>
                        <p style={{ margin: 0, color: '#dc2626', fontWeight: '500' }}>
                          ✗ No current resume uploaded
                        </p>
                      </div>
                    )}

                    {/* Archived Resumes */}
                    {client.onboardingData.archivedResumes && client.onboardingData.archivedResumes.length > 0 && (
                      <div style={{ marginTop: '24px' }}>
                        <h5 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '14px', fontWeight: '600' }}>
                          Archived Resumes ({client.onboardingData.archivedResumes.length})
                        </h5>
                        <div style={{ display: 'grid', gap: '12px' }}>
                          {client.onboardingData.archivedResumes.map((archivedResume: any, index: number) => (
                            <div key={index} style={{ 
                              padding: '12px', 
                              backgroundColor: '#f8fafc', 
                              border: '1px solid #e2e8f0', 
                              borderRadius: '8px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                                  Archived Resume #{index + 1}
                                </span>
                                <span style={{ fontSize: '12px', color: '#64748b' }}>
                                  Archived: {formatDate(archivedResume.archivedAt)}
                                </span>
                              </div>
                              <div style={{ marginBottom: '8px' }}>
                                <SimplePDFViewer 
                                  pdfUrl={archivedResume.resumeUrl} 
                                  title={`${client.name}'s Archived Resume #${index + 1}`}
                                  height="200px"
                                />
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>
                                Originally uploaded: {formatDate(archivedResume.uploadedAt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* System Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  margin: '0 0 20px 0', 
                  color: '#1e293b', 
                  fontSize: '20px',
                  fontWeight: '600',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '8px'
                }}>
                  System Information
                </h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>User ID</label>
                      <p style={{ margin: 0, fontSize: '14px', fontFamily: 'monospace', color: '#64748b', wordBreak: 'break-all' }}>{client.uid}</p>
                    </div>
                    
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Created</label>
                      <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{formatDate(client.createdAt)}</p>
                    </div>
                    
                    <div>
                      <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Last Login</label>
                      <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{formatDate(client.lastLoginAt)}</p>
                    </div>
                    
                    {client.onboardingData && (
                      <div>
                        <label style={{ fontWeight: '600', color: '#64748b', fontSize: '14px', display: 'block', marginBottom: '4px' }}>Onboarding Completed</label>
                        <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
                          {client.onboardingData.onboardingCompletedAt ? 
                            formatDate(client.onboardingData.onboardingCompletedAt) : 
                            'Not completed'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                {client.status !== 'active' ? (
                  <button
                    onClick={() => handleActivate(client.uid)}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                  >
                    Activate {client.role === 'client' ? 'Client' : 'User'}
                  </button>
                ) : (
                  <div style={{
                    padding: '16px 24px',
                    backgroundColor: '#f0fdf4',
                    color: '#166534',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    border: '1px solid #bbf7d0'
                  }}>
                    ✓ Already Active
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </Drawer>
    </div>
  );
}

