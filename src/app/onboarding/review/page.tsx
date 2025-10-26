"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChange } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { StepShell } from '@/components/StepShell';
import { Doodle } from '@/components/Doodle';
import { DoodleDevOverlay } from '@/components/DoodleDevOverlay';
import { getStepMetadata, getStepRoute } from '@/lib/onboarding';
import { residencyAliasForCountry } from '@/lib/residency-alias';

export default function ReviewStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doodleMode = searchParams.get('doodle');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const metadata = getStepMetadata(5);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    bg: '#f5f5f5',
    white: '#ffffff',
    success: '#10b981',
    info: '#3b82f6'
  };

  // Load user data
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUserId(user.uid);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [router]);

  const handleSubmit = async () => {
    if (!userId) return;

    setSubmitting(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      
      await updateDoc(userDocRef, {
        stepCompleted: 6, // All steps completed
        status: 'waitlisted', // Update status to waitlisted
        onboardingCompletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Redirect to waiting page
      router.push('/waiting');
    } catch (error) {
      console.error('Error submitting onboarding:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !userData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: colors.bg 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: `4px solid ${colors.border}`,
            borderTop: `4px solid ${colors.accent}`,
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: 20, color: colors.textLight }}>Loading your information...</p>
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

  // Helper function to render a review section
  const ReviewSection = ({ 
    title, 
    stepPath, 
    children 
  }: { 
    title: string; 
    stepPath: string; 
    children: React.ReactNode;
  }) => (
    <div style={{
      background: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: 24,
      marginBottom: 16
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <h3 style={{ 
          fontSize: 18, 
          fontWeight: 700, 
          color: colors.primary,
          margin: 0 
        }}>
          {title}
        </h3>
        <button
          onClick={() => router.push(stepPath)}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            color: colors.accent,
            border: `1px solid ${colors.accent}`,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.accent;
            e.currentTarget.style.color = colors.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = colors.accent;
          }}
        >
          Edit
        </button>
      </div>
      <div style={{ fontSize: 14, color: colors.text, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );

  // Helper function to render a data row
  const DataRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div style={{ 
      display: 'flex', 
      marginBottom: 8,
      gap: 12
    }}>
      <span style={{ 
        fontWeight: 600, 
        color: colors.textLight,
        minWidth: 140,
        flexShrink: 0
      }}>
        {label}:
      </span>
      <span style={{ 
        color: colors.text, 
        flex: 1,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        minWidth: 0
      }}>
        {value || <em style={{ color: colors.textLight }}>Not provided</em>}
      </span>
    </div>
  );

  // Get residency alias if applicable
  const residencyAlias = userData.residencyStatus === 'permanent_resident' 
    ? residencyAliasForCountry(userData.country) 
    : null;

  return (
    <StepShell
      title={metadata.title}
      subtitle={metadata.subtitle}
      onBack={() => router.push(getStepRoute(4))}
      onContinue={handleSubmit}
      isContinueLoading={submitting}
      continueLabel={submitting ? 'Submitting...' : 'Submit & Join Waitlist'}
    >
      {/* All 7 doodles positioned beside their respective review sections */}
      
      {/* 1. Basics Section - Woman with laptop (top left, near Basic Information) */}
      {doodleMode !== '1' && (
        <Doodle
          src="/doodles/1.svg"
          alt="Person with laptop"
          position="top-left"
          offset={{ x: -279, y: 79 }}
          desktopScale={0.70}
          mobilePosition="hidden"
        />
      )}
      
      {doodleMode === '1' && (
        <DoodleDevOverlay
          src="/doodles/1.svg"
          alt="Person with laptop"
          position="top-left"
          initialOffset={{ x: -279, y: 79 }}
          initialScale={0.70}
          maxWidth={"320px"}
        />
      )}
      
      {/* 2. Location Section - Woman with luggage (top right, near Location) - SPLIT INTO 7.0 and 7.1 */}
      {doodleMode !== '7.0' && (
        <Doodle
          src="/doodles/7.0.svg"
          alt="Traveler with luggage"
          position="top-right"
          offset={{ x: -541, y: -145 }}
          desktopScale={0.30}
          mobilePosition="hidden"
          maxWidth="none"
        />
      )}
      {doodleMode === '7.0' && (
        <DoodleDevOverlay
          src="/doodles/7.0.svg"
          alt="Traveler with luggage"
          position="top-right"
          initialOffset={{ x: -541, y: -145 }}
          initialScale={0.30}
          maxWidth={"none"}
        />
      )}
      
      {doodleMode !== '7.1' && (
        <Doodle
          src="/doodles/7.1.svg"
          alt="Traveler luggage extension"
          position="top-right"
          offset={{ x: 577, y: 272 }}
          desktopScale={0.35}
          mobilePosition="hidden"
        />
      )}
      {doodleMode === '7.1' && (
        <DoodleDevOverlay
          src="/doodles/7.1.svg"
          alt="Traveler luggage extension"
          position="top-right"
          initialOffset={{ x: 577, y: 272 }}
          initialScale={0.35}
          maxWidth={"320px"}
        />
      )}
      
      {/* 3. Resume Section - Man with briefcase (middle left, near Resume) */}
      {doodleMode !== '5' && (
        <Doodle
          src="/doodles/5.svg"
          alt="Professional with resume"
          position="middle-left"
          offset={{ x: -246, y: -54 }}
          desktopScale={0.45}
          mobilePosition="hidden"
        />
      )}
      {doodleMode === '5' && (
        <DoodleDevOverlay
          src="/doodles/5.svg"
          alt="Professional with resume"
          position="middle-left"
          initialOffset={{ x: -246, y: -54 }}
          initialScale={0.45}
          maxWidth={"320px"}
        />
      )}
      
      {/* 4. Contact Section - Man at desktop (left) and Man on phone (right) */}
      {doodleMode !== '6' && (
        <Doodle
          src="/doodles/6.0.svg"
          alt="Person at computer"
          position="middle-left"
          offset={{ x: -276, y: 139 }}
          desktopScale={0.60}
          mobilePosition="hidden"
        />
      )}
      {doodleMode === '6' && (
        <DoodleDevOverlay
          src="/doodles/6.0.svg"
          alt="Person at computer"
          position="middle-left"
          initialOffset={{ x: -276, y: 139 }}
          initialScale={0.60}
          maxWidth={"320px"}
        />
      )}
      {doodleMode !== '3' && (
        <Doodle
          src="/doodles/3.svg?v=2"
          alt="Person on phone"
          position="middle-right"
          offset={{ x: -275, y: 86 }}
          desktopScale={0.60}
          mobilePosition="hidden"
        />
      )}
      
      {doodleMode === '3' && (
        <DoodleDevOverlay
          src="/doodles/3.svg?v=2"
          alt="Person on phone"
          position="middle-right"
          initialOffset={{ x: -275, y: 86 }}
          initialScale={0.60}
          maxWidth={"320px"}
        />
      )}
      
      {/* 5. Job Boards Section - Job boards illustration (left) and AI woman (right) */}
      {doodleMode !== '2' && (
        <Doodle
          src="/doodles/2.svg"
          alt="Job boards platforms"
          position="bottom-left"
          offset={{ x: -220, y: 138 }}
          desktopScale={0.60}
          mobilePosition="hidden"
        />
      )}
      
      {doodleMode === '2' && (
        <DoodleDevOverlay
          src="/doodles/2.svg"
          alt="Job boards platforms"
          position="bottom-left"
          initialOffset={{ x: -220, y: 138 }}
          initialScale={0.60}
          maxWidth={"320px"}
        />
      )}
      {doodleMode !== '4' && (
        <Doodle
          src="/doodles/4.svg"
          alt="AI email tracking"
          position="bottom-right"
          offset={{ x: -332, y: 40 }}
          desktopScale={1.00}
          mobilePosition="hidden"
        />
      )}
      
      {doodleMode === '4' && (
        <DoodleDevOverlay
          src="/doodles/4.svg"
          alt="AI email tracking"
          position="bottom-right"
          initialOffset={{ x: -332, y: 40 }}
          initialScale={1.00}
          maxWidth={"320px"}
        />
      )}
      
      {/* Success banner */}
      <div style={{
        padding: 16,
        background: '#ecfdf5',
        border: '1px solid #10b981',
        borderRadius: 8,
        marginBottom: 24,
        fontSize: 14,
        color: '#065f46',
        lineHeight: 1.6
      }}>
        <strong>🎉 Almost there!</strong> Review your information below. You can edit any section by clicking the "Edit" button. Once you submit, you'll join our waitlist and we'll notify you when your profile is reviewed.
      </div>

      {/* Step 1: Basics */}
      <ReviewSection title="1. Basic Information" stepPath={getStepRoute(0)}>
        <DataRow label="First Name" value={userData.firstName} />
        <DataRow label="Last Name" value={userData.lastName} />
        <DataRow label="Full Name" value={userData.name || `${userData.firstName} ${userData.lastName}`} />
        <DataRow label="Job Title" value={userData.jobTitle} />
        <DataRow label="Gender" value={
          userData.gender === 'Self-describe' && userData.genderCustom
            ? `${userData.gender} (${userData.genderCustom})`
            : userData.gender
        } />
      </ReviewSection>

      {/* Step 2: Location & Status */}
      <ReviewSection title="2. Location & Residency" stepPath={getStepRoute(1)}>
        <DataRow label="Country" value={userData.country} />
        <DataRow label="Age" value={userData.age?.toString()} />
        <DataRow label="Residency Status" value={
          <>
            {userData.residencyStatus?.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            {residencyAlias && (
              <span style={{ 
                marginLeft: 8, 
                padding: '2px 8px',
                background: colors.accent + '20',
                color: colors.accent,
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600
              }}>
                {residencyAlias}
              </span>
            )}
          </>
        } />
        {userData.visaType && (
          <DataRow label="Visa Type" value={userData.visaType} />
        )}
      </ReviewSection>

      {/* Step 3: Resume */}
      <ReviewSection title="3. Résumé" stepPath={getStepRoute(2)}>
        {userData.resumeUrl ? (
          <>
            <DataRow label="Status" value={
              <span style={{ 
                color: colors.success, 
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Uploaded
              </span>
            } />
            <DataRow label="File" value={
              <a 
                href={userData.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: colors.accent, 
                  textDecoration: 'none',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                View Résumé →
              </a>
            } />
          </>
        ) : (
          <DataRow label="Status" value={
            <span style={{ color: colors.textLight, fontStyle: 'italic' }}>
              Skipped (you can upload later)
            </span>
          } />
        )}
      </ReviewSection>

      {/* Step 4: Contact Preferences */}
      <ReviewSection title="4. Contact Information" stepPath={getStepRoute(3)}>
        <DataRow label="Preferred Email" value={userData.preferredEmail} />
        <DataRow label="Phone Contact" value={
          userData.allowPhoneContact ? (
            <span style={{ color: colors.success, fontWeight: 600 }}>
              ✓ Allowed
            </span>
          ) : (
            <span style={{ color: colors.textLight }}>
              Not allowed
            </span>
          )
        } />
        {userData.allowPhoneContact && userData.phoneNumber && (
          <DataRow label="Phone Number" value={userData.phoneNumber} />
        )}
      </ReviewSection>

      {/* Step 5: Job Boards, Gmail & Consent */}
      <ReviewSection title="5. Job Boards, Gmail & Consent" stepPath={getStepRoute(4)}>
        <DataRow label="Selected Boards" value={
          userData.jobBoards && userData.jobBoards.length > 0 ? (
            <div>
              <div style={{ marginBottom: 8 }}>
                <strong>{userData.jobBoards.length}</strong> board{userData.jobBoards.length !== 1 ? 's' : ''} selected
              </div>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 6,
                marginTop: 8
              }}>
                {userData.jobBoards.map((board: string) => (
                  <span 
                    key={board}
                    style={{
                      padding: '4px 10px',
                      background: colors.accent + '15',
                      color: colors.accent,
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      border: `1px solid ${colors.accent}40`
                    }}
                  >
                    {board}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <em style={{ color: colors.textLight }}>None selected</em>
          )
        } />
        {userData.jobBoardsOther && (
          <DataRow label="Other Boards" value={userData.jobBoardsOther} />
        )}
        <DataRow label="Job Board Access" value={
          userData.jobBoardsConsent ? (
            <span style={{ color: colors.success, fontWeight: 600 }}>
              ✓ Acknowledged (credentials will be set up later)
            </span>
          ) : (
            <span style={{ color: colors.textLight }}>
              Not acknowledged
            </span>
          )
        } />
        <DataRow label="Gmail Access" value={
          userData.gmailConsent ? (
            <span style={{ color: colors.success, fontWeight: 600 }}>
              ✓ Acknowledged (will be set up later)
            </span>
          ) : (
            <span style={{ color: colors.textLight }}>
              Not acknowledged
            </span>
          )
        } />
        <DataRow label="AI Email Tracking" value={
          userData.aiTrackingConsent ? (
            <span style={{ color: colors.success, fontWeight: 600 }}>
              ✓ Acknowledged
            </span>
          ) : (
            <span style={{ color: colors.textLight }}>
              Not acknowledged
            </span>
          )
        } />
      </ReviewSection>

      {/* Final info banner */}
      <div style={{
        padding: 16,
        background: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: 8,
        marginTop: 24,
        fontSize: 14,
        color: '#1e40af',
        lineHeight: 1.6
      }}>
        <strong>📋 What happens next?</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
          <li>You'll join our waitlist</li>
          <li>Our team will review your profile</li>
          <li>We'll notify you via email when you're approved</li>
          <li>Once approved, you'll get full access to your dashboard</li>
        </ul>
      </div>
    </StepShell>
  );
}
