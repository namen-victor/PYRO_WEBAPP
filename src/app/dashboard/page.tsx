"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';
import { ApplicationTracker } from '@/components/ApplicationTracker';
import { getSubscriptionStatus } from '@/lib/stripe';
import { ResumeUpload } from '@/components/ResumeUpload';
import { SimplePDFViewer } from '@/components/SimplePDFViewer';
import { Logo } from '@/components/Logo';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ConfirmModal } from '@/components/ConfirmModal';

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [replacingResume, setReplacingResume] = useState(false);
  const [showReplaceSection, setShowReplaceSection] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to load complete user data from Firestore
  const loadUserData = async (uid: string) => {
    try {
      if (!db) return;
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        console.log('Loaded user data:', data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Function to replace resume with versioning
  const handleReplaceResume = async () => {
    if (!user || !resumeFile) return;
    
    try {
      setReplacingResume(true);
      
      // Get current resume info for archiving
      const currentResumeUrl = userData?.resumeUrl;
      const currentResumeUploaded = userData?.resumeUploaded;
      
      // Archive current resume if it exists
      if (currentResumeUrl && currentResumeUploaded) {
        const archiveData = {
          resumeUrl: currentResumeUrl,
          uploadedAt: userData?.updatedAt || new Date().toISOString(),
          archivedAt: new Date().toISOString(),
          isArchived: true
        };
        
        // Store archived resume in a separate collection
        await updateDoc(doc(db, 'users', user.uid), {
          archivedResumes: [...(userData?.archivedResumes || []), archiveData]
        });
      }
      
      // Upload new resume
      const objectRef = ref(storage, `resumes/${user.uid}.pdf`);
      await uploadBytes(objectRef, resumeFile);
      const url = await getDownloadURL(objectRef);
      
      // Update user with new resume
      await updateDoc(doc(db, 'users', user.uid), {
        resumeUrl: url,
        resumeUploaded: true,
        updatedAt: new Date().toISOString()
      });
      
      // Refresh user data
      await loadUserData(user.uid);
      
      // Show success message and collapse section
      setShowSuccessMessage(true);
      setResumeFile(null);
      setShowReplaceModal(false);
      setShowReplaceSection(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
    } catch (error) {
      console.error('Resume replacement failed:', error);
      alert('Failed to replace resume. Please try again.');
    } finally {
      setReplacingResume(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user && user.role !== 'client') {
        // Wrong role, redirect immediately
        router.replace('/login');
        return;
      }
      if (user && user.role === 'client' && user.status !== 'active') {
        // Client but not active, redirect to waiting
        router.replace('/waiting');
        return;
      }
      if (user && user.role === 'client' && user.status === 'active') {
        // Valid client, set user and load complete data
        setUser(user);
        loadUserData(user.uid);
        setLoading(false);
        return;
      }
      // No user - redirect to login after a brief moment
      if (!user) {
        setTimeout(() => {
          router.replace('/login');
        }, 500);
      }
    });
    
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setTimeout(() => {
        setUser({
          uid: 'mock_client',
          email: 'client@pyrosolutions.com',
          name: 'Client User',
          role: 'client',
          status: 'active',
          resumeUploaded: true
        });
        setLoading(false);
      }, 1000);
    }
    
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (user && user.role === 'client') {
      getSubscriptionStatus(user.uid).then(setSubscription);
    }
  }, [user]);

  // Always show loading while checking auth - prevents flash of "Access Denied"
  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>Loading your dashboard...</p>
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
    error: '#ef4444'
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .action-buttons {
            flex-direction: column !important;
          }
          .action-buttons a, .action-buttons button {
            width: 100% !important;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: colors.bg }}>
        {/* Header */}
        <header style={{ background: colors.white, borderBottom: `1px solid ${colors.border}`, padding: '16px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Logo size="sm" />
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: colors.text }}>Dashboard</h1>
                <p style={{ margin: 0, fontSize: 14, color: colors.textLight }}>Welcome back, {user.name}</p>
              </div>
            </div>
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
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          {/* Quick Stats */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
            <div style={{ background: colors.white, padding: 24, borderRadius: 12, border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 14, color: colors.textLight, marginBottom: 8, fontWeight: 600 }}>APPLICATIONS</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.text }}>24</div>
              <div style={{ fontSize: 12, color: colors.success, marginTop: 4 }}>↑ 3 this week</div>
            </div>
            <div style={{ background: colors.white, padding: 24, borderRadius: 12, border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 14, color: colors.textLight, marginBottom: 8, fontWeight: 600 }}>INTERVIEWS</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.text }}>5</div>
              <div style={{ fontSize: 12, color: colors.accent, marginTop: 4 }}>2 upcoming</div>
            </div>
            <div style={{ background: colors.white, padding: 24, borderRadius: 12, border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 14, color: colors.textLight, marginBottom: 8, fontWeight: 600 }}>RESPONSE RATE</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.text }}>21%</div>
              <div style={{ fontSize: 12, color: colors.success, marginTop: 4 }}>Above average</div>
            </div>
          </div>

          {/* Subscription Status */}
          {subscription && (
            <div style={{
              background: subscription.status === 'active' ? `${colors.success}10` : `${colors.warning}10`,
              border: `1px solid ${subscription.status === 'active' ? colors.success : colors.warning}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 32,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16
            }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: colors.text, fontSize: 18, fontWeight: 700 }}>
                  {subscription.status === 'active' ? '✅ Active Subscription' : '⚠️ Subscription Issue'}
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: colors.textLight }}>
                  {subscription.status === 'active' 
                    ? `Plan: ${subscription.planId} • Renews: ${subscription.currentPeriodEnd?.toLocaleDateString()}`
                    : 'Please update your payment method or contact support'
                  }
                </p>
              </div>
              <a 
                href="/pricing"
                style={{
                  padding: '12px 24px',
                  backgroundColor: subscription.status === 'active' ? colors.success : colors.warning,
                  color: colors.white,
                  textDecoration: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {subscription.status === 'active' ? 'Manage Plan' : 'Upgrade Now'}
              </a>
            </div>
          )}

          {/* Main Grid */}
          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }}>
            {/* Resume Section */}
            <div style={{ background: colors.white, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.text }}>Your Resume</h3>
                {userData?.resumeUploaded && (
                  <span style={{ fontSize: 12, color: colors.success, fontWeight: 600, padding: '4px 12px', background: `${colors.success}10`, borderRadius: 20 }}>
                    ✓ Uploaded
                  </span>
                )}
              </div>
              
              {userData?.resumeUploaded && userData?.resumeUrl ? (
                <div>
                  {/* Success Message */}
                  {showSuccessMessage && (
                    <div style={{
                      padding: 16,
                      marginBottom: 16,
                      backgroundColor: `${colors.success}15`,
                      border: `2px solid ${colors.success}`,
                      borderRadius: 8,
                      color: colors.success,
                      fontSize: 14,
                      fontWeight: 600,
                      textAlign: 'center',
                      animation: 'fadeIn 0.3s ease-in'
                    }}>
                      ✓ Resume Updated Successfully!
                    </div>
                  )}
                  
                  <p style={{ margin: '0 0 16px 0', color: colors.textLight, fontSize: 14 }}>
                    Your resume is on file and ready for review by our team.
                  </p>
                  <div style={{ border: `1px solid ${colors.border}`, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
                    <SimplePDFViewer pdfUrl={userData.resumeUrl} height="400px" />
                  </div>
                  
                  {/* Replace Resume Toggle Button */}
                  <button
                    onClick={() => {
                      setShowReplaceSection(!showReplaceSection);
                      if (!showReplaceSection) {
                        setShowSuccessMessage(false); // Hide success message when opening
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      backgroundColor: showReplaceSection ? colors.textLight : colors.accent,
                      color: colors.white,
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: showReplaceSection ? 12 : 0,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                    onMouseOver={(e) => {
                      if (!showReplaceSection) {
                        e.currentTarget.style.backgroundColor = '#5a8a87';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!showReplaceSection) {
                        e.currentTarget.style.backgroundColor = colors.accent;
                      }
                    }}
                  >
                    {showReplaceSection ? '▲ Cancel Replace' : '↻ Replace Resume'}
                  </button>
                  
                  {/* Replace Resume Section - Collapsible */}
                  <div style={{ 
                    maxHeight: showReplaceSection ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
                    opacity: showReplaceSection ? 1 : 0,
                  }}>
                    <div style={{ 
                      border: `1px solid ${colors.border}`, 
                      borderRadius: 8, 
                      padding: 16, 
                      backgroundColor: '#f8fafc',
                      marginBottom: 12
                    }}>
                      <h4 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 600, color: colors.text }}>
                        Upload New Resume
                      </h4>
                      <p style={{ margin: '0 0 16px 0', color: colors.textLight, fontSize: 14 }}>
                        Upload a new resume to replace your current one. Your previous resume will be archived.
                      </p>
                      <ResumeUpload
                        onUpload={(f) => setResumeFile(f)}
                        onRemove={() => setResumeFile(null)}
                        currentFile={resumeFile}
                        disabled={replacingResume}
                      />
                      <button
                        disabled={!resumeFile || replacingResume}
                        onClick={() => setShowReplaceModal(true)}
                        style={{
                          marginTop: 12,
                          width: '100%',
                          padding: '12px 20px',
                          backgroundColor: !resumeFile || replacingResume ? '#ccc' : '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: 6,
                          cursor: !resumeFile || replacingResume ? 'not-allowed' : 'pointer',
                          fontWeight: 600,
                          fontSize: 14,
                          transition: 'all 0.2s'
                        }}
                      >
                        {replacingResume ? 'Replacing...' : 'Replace'}
                      </button>
                    </div>
                  </div>
                  
                  <p style={{ margin: '12px 0 0 0', color: colors.textLight, fontSize: 12 }}>
                    Need help? <a href="/contact" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 600 }}>Contact support</a>
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ margin: '0 0 16px 0', color: colors.textLight, fontSize: 14 }}>
                    Upload your resume so our team can start matching you with opportunities.
                  </p>
                  <ResumeUpload
                    onUpload={(f) => setResumeFile(f)}
                    onRemove={() => setResumeFile(null)}
                    currentFile={resumeFile}
                    disabled={uploading}
                  />
                  <button
                    disabled={!resumeFile || uploading}
                    onClick={async () => {
                      if (!user || !resumeFile) return;
                      try {
                        setUploading(true);
                        const objectRef = ref(storage, `resumes/${user.uid}.pdf`);
                        await uploadBytes(objectRef, resumeFile);
                        const url = await getDownloadURL(objectRef);
                        await updateDoc(doc(db, 'users', user.uid), {
                          resumeUrl: url,
                          resumeUploaded: true
                        });
                        setUser(prev => prev ? { ...prev, resumeUrl: url, resumeUploaded: true } : prev);
                        // Refresh user data to show the uploaded resume
                        await loadUserData(user.uid);
                        alert('Resume uploaded successfully!');
                        setResumeFile(null);
                      } catch (e) {
                        console.error('Resume upload failed', e);
                        alert('Failed to upload resume. Please try again.');
                      } finally {
                        setUploading(false);
                      }
                    }}
                    style={{
                      marginTop: 16,
                      padding: '12px 24px',
                      backgroundColor: !resumeFile || uploading ? '#ccc' : colors.accent,
                      color: colors.white,
                      border: 'none',
                      borderRadius: 8,
                      cursor: !resumeFile || uploading ? 'not-allowed' : 'pointer',
                      fontWeight: 600,
                      fontSize: 14,
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                  >
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: colors.white, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24 }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: colors.text }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a 
                    href="/chat"
                    style={{
                      padding: '14px 20px',
                      background: colors.accent,
                      color: colors.white,
                      textDecoration: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: 18 }}>💬</span>
                    Chat with Your Team
                  </a>
                  <a 
                    href="/notifications"
                    style={{
                      padding: '14px 20px',
                      background: colors.white,
                      color: colors.text,
                      textDecoration: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      border: `1px solid ${colors.border}`,
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: 18 }}>🔔</span>
                    View Notifications
                  </a>
                  <a 
                    href="/services"
                    style={{
                      padding: '14px 20px',
                      background: colors.white,
                      color: colors.text,
                      textDecoration: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      border: `1px solid ${colors.border}`,
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: 18 }}>📋</span>
                    Browse Services
                  </a>
                </div>
              </div>

              {/* Subscription Widget */}
              <div style={{ background: colors.white, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24 }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: colors.text }}>Your Subscription</h3>
                {userData?.subscriptionStatus === 'active' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, color: colors.textLight }}>Job Title:</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
                        {userData?.jobTitle || 'Not specified'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, color: colors.textLight }}>Billing Cycle:</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
                        {userData?.billingCycle || 'Monthly'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, color: colors.textLight }}>Applications per day:</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
                        {userData?.applicationsPerDay || '5'}
                      </span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 14, color: colors.textLight }}>Application Progress:</span>
                        <span style={{ fontSize: 12, color: colors.textLight }}>
                          {userData?.applicationProgress || 0}%
                        </span>
                      </div>
                      <div style={{ 
                        background: colors.border, 
                        borderRadius: 6, 
                        height: 8, 
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: `${userData?.applicationProgress || 0}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.success} 100%)`,
                          borderRadius: 6,
                          transition: 'width 0.5s ease-in-out',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        }}></div>
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: 12, color: colors.textLight, textAlign: 'right' }}>
                        {userData?.applicationProgress || 0}% Complete
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ 
                      fontSize: 16, 
                      fontWeight: 600, 
                      color: colors.text, 
                      marginBottom: 8 
                    }}>
                      No Active Subscription
                    </div>
                    <p style={{ 
                      margin: '0 0 16px 0', 
                      fontSize: 14, 
                      color: colors.textLight,
                      lineHeight: 1.4
                    }}>
                      Unlock full features by subscribing to a plan.
                    </p>
                    <a
                      href="/bundles"
                      style={{
                        padding: '10px 20px',
                        background: colors.accent,
                        color: colors.white,
                        textDecoration: 'none',
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 600,
                        display: 'inline-block',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#5a8a87';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = colors.accent;
                      }}
                    >
                      Begin Your Journey
                    </a>
                  </div>
                )}
              </div>

              <div style={{ background: `${colors.accent}10`, borderRadius: 12, border: `1px solid ${colors.accent}`, padding: 20 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 700, color: colors.text }}>Need Help?</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: 13, color: colors.textLight, lineHeight: 1.5 }}>
                  Our team is here to support you every step of the way.
                </p>
                <a 
                  href="/contact"
                  style={{
                    padding: '10px 16px',
                    background: colors.accent,
                    color: colors.white,
                    textDecoration: 'none',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    display: 'inline-block'
                  }}
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div style={{ background: colors.white, borderRadius: 12, border: `1px solid ${colors.border}`, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.text }}>
                Your Job Applications
              </h2>
              <div className="action-buttons" style={{ display: 'flex', gap: 12 }}>
                <a 
                  href="/full-service-apply"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: colors.primary,
                    color: colors.white,
                    textDecoration: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  + Request Applications
                </a>
              </div>
            </div>
            <ApplicationTracker userId={user.uid} />
          </div>
        </main>
      </div>

      {/* Replace Resume Confirmation Modal */}
      {showReplaceModal && (
        <ConfirmModal
          onConfirm={handleReplaceResume}
          onCancel={() => setShowReplaceModal(false)}
          title="Replace Resume"
          message="Are you sure you want to replace your current resume? Your previous resume will be archived and can be viewed by administrators."
          confirmText="Yes, Replace Resume"
          cancelText="Cancel"
          type="warning"
        />
      )}
    </>
  );
}
