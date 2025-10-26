"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChange } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { StepShell } from '@/components/StepShell';
import { Doodle } from '@/components/Doodle';
import { DoodleDevOverlay } from '@/components/DoodleDevOverlay';
import { getStepMetadata, jobBoardsSchema } from '@/lib/onboarding';
import { MAJOR_JOB_BOARDS, ADDITIONAL_JOB_BOARDS } from '@/lib/constants/job-boards';

type JobBoardsFormData = {
  jobBoards: string[];
  jobBoardsOther?: string;
  jobBoardsConsent: boolean;
  gmailConsent: boolean;
  aiTrackingConsent: boolean;
};

export default function JobBoardsStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doodleMode = searchParams.get('doodle');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAdditionalBoards, setShowAdditionalBoards] = useState(false);
  const [showGmailInfo, setShowGmailInfo] = useState(false);
  const [showAIInfo, setShowAIInfo] = useState(false);
  const metadata = getStepMetadata(4);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register
  } = useForm<JobBoardsFormData>({
    resolver: zodResolver(jobBoardsSchema),
    defaultValues: {
      jobBoards: [],
      jobBoardsOther: '',
      jobBoardsConsent: false,
      gmailConsent: false,
      aiTrackingConsent: false
    }
  });

  const jobBoardsValue = watch('jobBoards');

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff',
    info: '#3b82f6',
    warning: '#f59e0b',
    success: '#10b981'
  };

  // Load user data and prefill form
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (!user) return;
      setUserId(user.uid);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          
          if (data.jobBoards && Array.isArray(data.jobBoards)) {
            setValue('jobBoards', data.jobBoards);
            // If any additional boards are selected, expand the section
            const hasAdditionalBoards = data.jobBoards.some((board: string) => 
              ADDITIONAL_JOB_BOARDS.includes(board as any)
            );
            if (hasAdditionalBoards) {
              setShowAdditionalBoards(true);
            }
          }
          
          if (data.jobBoardsOther) {
            setValue('jobBoardsOther', data.jobBoardsOther);
          }
          
          if (data.jobBoardsConsent !== undefined) {
            setValue('jobBoardsConsent', data.jobBoardsConsent);
          }

          if (data.gmailConsent !== undefined) {
            setValue('gmailConsent', data.gmailConsent);
          }

          if (data.aiTrackingConsent !== undefined) {
            setValue('aiTrackingConsent', data.aiTrackingConsent);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    });

    return unsubscribe;
  }, [setValue]);

  const onSubmit = async (data: JobBoardsFormData) => {
    if (!userId) return;

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      
      const updateData: any = {
        jobBoards: data.jobBoards,
        jobBoardsOther: data.jobBoardsOther || null,
        jobBoardsConsent: data.jobBoardsConsent,
        gmailConsent: data.gmailConsent,
        aiTrackingConsent: data.aiTrackingConsent,
        stepCompleted: 5,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(userDocRef, updateData);

      // Navigate to next step
      router.push('/onboarding/review');
    } catch (error) {
      console.error('Error saving job boards data:', error);
      alert('Failed to save your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBoardToggle = (board: string) => {
    const current = jobBoardsValue || [];
    if (current.includes(board)) {
      setValue('jobBoards', current.filter(b => b !== board), { shouldValidate: true });
    } else {
      setValue('jobBoards', [...current, board], { shouldValidate: true });
    }
  };

  const isOtherSelected = jobBoardsValue?.includes('Other');

  return (
    <StepShell
      title={metadata.title}
      subtitle={metadata.subtitle}
      onBack={() => router.push('/onboarding/contact')}
      onContinue={handleSubmit(onSubmit)}
      isContinueLoading={loading}
    >
      {/* Doodle: Job boards illustration */}
      {doodleMode !== '2' && (
        <Doodle
          src="/doodles/2.svg"
          alt="Job boards platforms"
          position="top-left"
          offset={{ x: -295, y: 19 }}
          desktopScale={1.50}
          mobilePosition="hidden"
        />
      )}
      
      {doodleMode === '2' && (
        <DoodleDevOverlay
          src="/doodles/2.svg"
          alt="Job boards platforms"
          position="top-left"
          initialOffset={{ x: -295, y: 19 }}
          initialScale={1.50}
          maxWidth={"320px"}
        />
      )}
      
      {/* Doodle: Woman with AI/chatbot (beside AI Email Tracking consent section) */}
      {doodleMode !== '4' && (
        <Doodle
          src="/doodles/4.svg"
          alt="AI email tracking"
          position="bottom-right"
          offset={{ x: -408, y: 134 }}
          desktopScale={1.50}
          mobilePosition="hidden"
        />
      )}
      
      {doodleMode === '4' && (
        <DoodleDevOverlay
          src="/doodles/4.svg"
          alt="AI email tracking"
          position="bottom-right"
          initialOffset={{ x: -408, y: 134 }}
          initialScale={1.50}
          maxWidth={"320px"}
        />
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Info banner */}
        <div style={{
          padding: 20,
          background: '#fef3c7',
          border: '2px solid #fbbf24',
          borderRadius: 8,
          marginBottom: 32,
          fontSize: 15,
          color: '#78350f',
          lineHeight: 1.6
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📋</span>
            <span>What You'll Need to Provide Later</span>
          </div>
          <p style={{ margin: '8px 0 0 0' }}>
            This step helps us understand your job search preferences. <strong>You will NOT provide actual credentials now.</strong> After onboarding, our staff will guide you through securely setting up access to your selected job boards and Gmail in your dashboard.
          </p>
        </div>

        {/* SECTION 1: MAJOR JOB BOARDS */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <h3 style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: colors.primary
            }}>
              Major Job Boards (Required)
            </h3>
            <span style={{
              fontSize: 12,
              color: colors.textLight,
              fontWeight: 500
            }}>
              {jobBoardsValue?.filter(b => MAJOR_JOB_BOARDS.includes(b)).length || 0} / {MAJOR_JOB_BOARDS.length} selected
            </span>
          </div>

          <div style={{
            fontSize: 13,
            color: colors.textLight,
            marginBottom: 16,
            lineHeight: 1.5
          }}>
            These are the primary platforms we use for job applications. Select all that apply to your job search.
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12
          }}>
            {MAJOR_JOB_BOARDS.map((board) => {
              const isSelected = jobBoardsValue?.includes(board);
              
              return (
                <label
                  key={board}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    background: isSelected ? '#e8f5f3' : colors.white,
                    border: `2px solid ${isSelected ? colors.accent : colors.border}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: 14,
                    fontWeight: isSelected ? 600 : 400
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = colors.accent;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = colors.white;
                      e.currentTarget.style.borderColor = colors.border;
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleBoardToggle(board)}
                    style={{
                      width: 18,
                      height: 18,
                      cursor: 'pointer',
                      accentColor: colors.accent,
                      flexShrink: 0
                    }}
                  />
                  <span style={{ color: colors.text }}>
                    {board}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: ADDITIONAL JOB BOARDS (Collapsible) */}
        <div style={{ marginBottom: 32 }}>
          <button
            type="button"
            onClick={() => setShowAdditionalBoards(!showAdditionalBoards)}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: showAdditionalBoards ? colors.accent + '10' : colors.white,
              color: colors.accent,
              border: `2px dashed ${colors.accent}`,
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = colors.accent + '20'}
            onMouseLeave={(e) => e.currentTarget.style.background = showAdditionalBoards ? colors.accent + '10' : colors.white}
          >
            <span>{showAdditionalBoards ? '▼' : '▶'}</span>
            <span>
              {showAdditionalBoards ? 'Hide' : 'Request'} Additional Job Boards
            </span>
            {jobBoardsValue?.filter(b => ADDITIONAL_JOB_BOARDS.includes(b as any)).length > 0 && (
              <span style={{
                padding: '2px 8px',
                background: colors.accent,
                color: colors.white,
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700
              }}>
                {jobBoardsValue?.filter(b => ADDITIONAL_JOB_BOARDS.includes(b as any)).length}
              </span>
            )}
          </button>

          {showAdditionalBoards && (
            <div style={{
              marginTop: 16,
              padding: 20,
              background: '#f9fafb',
              border: `1px solid ${colors.border}`,
              borderRadius: 8
            }}>
              <div style={{
                fontSize: 13,
                color: colors.textLight,
                marginBottom: 16,
                lineHeight: 1.5
              }}>
                Select any additional job boards you'd like us to include in your job search.
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 12
              }}>
                {ADDITIONAL_JOB_BOARDS.map((board) => {
                  const isSelected = jobBoardsValue?.includes(board);
                  
                  return (
                    <label
                      key={board}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        background: isSelected ? '#e8f5f3' : colors.white,
                        border: `1px solid ${isSelected ? colors.accent : colors.border}`,
                        borderRadius: 6,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: 13,
                        fontWeight: isSelected ? 600 : 400
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = '#f9fafb';
                          e.currentTarget.style.borderColor = colors.accent;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = colors.white;
                          e.currentTarget.style.borderColor = colors.border;
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleBoardToggle(board)}
                        style={{
                          width: 16,
                          height: 16,
                          cursor: 'pointer',
                          accentColor: colors.accent,
                          flexShrink: 0
                        }}
                      />
                      <span style={{ color: colors.text }}>
                        {board}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Other boards input */}
        {isOtherSelected && (
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 8
            }}>
              Specify Other Job Boards <span style={{ color: colors.error }}>*</span>
            </label>
            <input
              type="text"
              {...register('jobBoardsOther')}
              placeholder="e.g., Stack Overflow Jobs, AngelList"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.jobBoardsOther ? colors.error : colors.border}`,
                borderRadius: 8,
                fontSize: 15,
                backgroundColor: colors.white,
                boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: errors.jobBoardsOther ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none'
            }}
            onFocus={(e) => !errors.jobBoardsOther && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !errors.jobBoardsOther && (e.currentTarget.style.borderColor = colors.border)}
          />
          </div>
        )}

        {/* Removed error text message - using subtle glow on checkboxes only */}

        {/* SECTION 3: JOB BOARD ACCESS REQUIREMENTS */}
        <div style={{
          marginTop: 40,
          marginBottom: 32,
          padding: 24,
          background: colors.white,
          border: `2px solid ${colors.info}`,
          borderRadius: 12
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: 18,
            fontWeight: 700,
            color: colors.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span>🔐</span>
            <span>Job Board Access (Required Later)</span>
          </h3>

          <div style={{
            fontSize: 14,
            color: colors.text,
            marginBottom: 20,
            lineHeight: 1.6
          }}>
            To submit applications on your behalf, we'll need access to your accounts on the selected job boards.
          </div>

          <div style={{
            padding: 16,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 8,
            marginBottom: 20
          }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1e40af',
              marginBottom: 8
            }}>
              🔒 How We Secure Your Accounts
            </div>
            <div style={{
              fontSize: 13,
              color: '#1e40af',
              lineHeight: 1.6
            }}>
              <p style={{ margin: '8px 0' }}>
                <strong>1. Random Password System:</strong> Our staff will provide you with a secure, randomly-generated password.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong>2. Change Your Password:</strong> You'll use this password to update your job board account passwords.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong>3. Limited Access:</strong> Only you and your assigned staff member will have access to this password.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong>4. Secure Storage:</strong> All credentials are encrypted and stored securely in our system.
              </p>
            </div>
          </div>

          {/* Job Board Consent Checkbox */}
          <div style={{
            padding: 16,
            background: colors.white,
            border: `2px solid ${errors.jobBoardsConsent ? colors.error : colors.border}`,
            borderRadius: 8,
            boxShadow: errors.jobBoardsConsent ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none',
            transition: 'box-shadow 0.2s'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              cursor: 'pointer'
            }}>
              <div style={{ position: 'relative', flexShrink: 0, marginTop: 2 }}>
                <input
                  type="checkbox"
                  {...register('jobBoardsConsent')}
                  style={{
                    width: 20,
                    height: 20,
                    cursor: 'pointer',
                    accentColor: colors.accent
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  color: colors.text,
                  lineHeight: 1.6
                }}>
                  I understand that I will need to provide access to my selected job boards using a secure password system. PyroINC staff will provide me with a random password to use for these accounts.
                  <span style={{ color: colors.error, marginLeft: 4 }}>*</span>
                </div>
              </div>
            </label>
            {/* Removed error text - using subtle glow only */}
          </div>
        </div>

        {/* SECTION 4: GMAIL ACCESS REQUIREMENTS */}
        <div style={{
          marginBottom: 32,
          padding: 24,
          background: colors.white,
          border: `2px solid ${colors.accent}`,
          borderRadius: 12
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: 18,
            fontWeight: 700,
            color: colors.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span>📧</span>
            <span>Gmail Access (Required Later)</span>
          </h3>

          <div style={{
            fontSize: 14,
            color: colors.text,
            marginBottom: 20,
            lineHeight: 1.6
          }}>
            We need access to a Gmail account to log into job boards, receive OTP verification codes, and track application responses.
          </div>

          {/* Gmail Info Box */}
          <div style={{
            padding: 16,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 8,
            marginBottom: 20
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1e40af'
              }}>
                🔐 Why We Need Gmail Access
              </div>
              <button
                type="button"
                onClick={() => setShowGmailInfo(!showGmailInfo)}
                style={{
                  padding: '4px 12px',
                  background: 'transparent',
                  color: '#1e40af',
                  border: '1px solid #bfdbfe',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {showGmailInfo ? 'Less' : 'More'} Info
              </button>
            </div>
            <div style={{
              fontSize: 13,
              color: '#1e40af',
              lineHeight: 1.6
            }}>
              {showGmailInfo ? (
                <>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Job Board Login:</strong> Most job boards require email verification and OTP codes sent to your Gmail.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Application Tracking:</strong> We receive confirmation emails when applications are submitted.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Response Monitoring:</strong> We track interview invitations, rejections, and follow-ups automatically.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>Security:</strong> We'll provide you with a random password to use for a dedicated Gmail account. You can create a new Gmail specifically for this purpose if you prefer.
                  </p>
                </>
              ) : (
                <p style={{ margin: 0 }}>
                  We use Gmail to log into job boards, receive verification codes, and track application responses. Click "More Info" to learn more.
                </p>
              )}
            </div>
          </div>

          <div style={{
            padding: 16,
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 13,
            color: '#78350f',
            lineHeight: 1.5
          }}>
            <strong>💡 Recommendation:</strong> Create a new Gmail account specifically for job applications. Our staff will provide you with a secure password to use for this account.
          </div>

          {/* Gmail Consent Checkbox */}
          <div style={{
            padding: 16,
            background: colors.white,
            border: `2px solid ${errors.gmailConsent ? colors.error : colors.border}`,
            borderRadius: 8,
            boxShadow: errors.gmailConsent ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none',
            transition: 'box-shadow 0.2s'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              cursor: 'pointer'
            }}>
              <div style={{ position: 'relative', flexShrink: 0, marginTop: 2 }}>
                <input
                  type="checkbox"
                  {...register('gmailConsent')}
                  style={{
                    width: 20,
                    height: 20,
                    cursor: 'pointer',
                    accentColor: colors.accent
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  color: colors.text,
                  lineHeight: 1.6
                }}>
                  I understand that I will need to provide access to a Gmail account using a secure password provided by PyroINC staff. This Gmail will be used for job board logins, OTP verification, and application tracking.
                  <span style={{ color: colors.error, marginLeft: 4 }}>*</span>
                </div>
              </div>
            </label>
            {/* Removed error text - using subtle glow only */}
          </div>
        </div>

        {/* SECTION 5: AI EMAIL TRACKING */}
        <div style={{
          marginBottom: 32,
          padding: 24,
          background: '#f0fdf4',
          border: `2px solid ${colors.success}`,
          borderRadius: 12
        }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: 18,
            fontWeight: 700,
            color: colors.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span>🤖</span>
            <span>AI-Powered Email Tracking</span>
          </h3>

          <div style={{
            fontSize: 14,
            color: '#166534',
            marginBottom: 20,
            lineHeight: 1.6
          }}>
            Our AI automatically reads your job-related emails to track application status, interview invitations, and responses.
          </div>

          {/* AI Info Box */}
          <div style={{
            padding: 16,
            background: colors.white,
            border: '1px solid #bbf7d0',
            borderRadius: 8,
            marginBottom: 20
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#166534'
              }}>
                ✨ What Our AI Tracks
              </div>
              <button
                type="button"
                onClick={() => setShowAIInfo(!showAIInfo)}
                style={{
                  padding: '4px 12px',
                  background: 'transparent',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {showAIInfo ? 'Less' : 'More'} Info
              </button>
            </div>
            <div style={{
              fontSize: 13,
              color: '#166534',
              lineHeight: 1.6
            }}>
              {showAIInfo ? (
                <>
                  <p style={{ margin: '8px 0' }}>
                    <strong>✅ Application Confirmations:</strong> Detects when your application has been successfully submitted.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>📧 Interview Invitations:</strong> Identifies interview requests and scheduling emails.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>❌ Rejections:</strong> Recognizes rejection emails to update your application status.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>⏳ Pending Status:</strong> Tracks "application under review" and follow-up emails.
                  </p>
                  <p style={{ margin: '8px 0' }}>
                    <strong>📊 Analytics:</strong> Provides insights on response rates, average response times, and success metrics.
                  </p>
                  <p style={{ margin: '8px 0', fontStyle: 'italic' }}>
                    <strong>🔒 Privacy:</strong> AI only reads job-related emails from known job boards and companies. Personal emails are never accessed.
                  </p>
                </>
              ) : (
                <p style={{ margin: 0 }}>
                  Automatically detects: Application confirmations • Interview invitations • Rejections • Pending status • Response analytics
                </p>
              )}
            </div>
          </div>

          {/* AI Tracking Consent Checkbox */}
          <div style={{
            padding: 16,
            background: colors.white,
            border: `2px solid ${errors.aiTrackingConsent ? colors.error : colors.success}`,
            borderRadius: 8,
            boxShadow: errors.aiTrackingConsent ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none',
            transition: 'box-shadow 0.2s'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              cursor: 'pointer'
            }}>
              <div style={{ position: 'relative', flexShrink: 0, marginTop: 2 }}>
                <input
                  type="checkbox"
                  {...register('aiTrackingConsent')}
                  style={{
                    width: 20,
                    height: 20,
                    cursor: 'pointer',
                    accentColor: colors.success
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  color: '#166534',
                  lineHeight: 1.6,
                  fontWeight: 500
                }}>
                  I understand that PyroINC's AI system will read my job-related emails to automatically track application statuses, interview invitations, rejections, and provide analytics on my job search progress.
                  <span style={{ color: colors.error, marginLeft: 4 }}>*</span>
                </div>
              </div>
            </label>
            {/* Removed error text - using subtle glow only */}
          </div>
        </div>

        {/* Final Note */}
        <div style={{
          padding: 16,
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 8,
          fontSize: 13,
          color: '#166534',
          lineHeight: 1.5
        }}>
          <strong>📝 Next Steps:</strong> After completing onboarding, you'll be placed on our waitlist. Once activated, our staff will contact you via your dashboard to securely set up all required access.
        </div>
      </form>
    </StepShell>
  );
}
