"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChange } from '@/lib/auth';
import { db, storage } from '@/lib/firebase';
import { StepShell } from '@/components/StepShell';
import { FileDrop } from '@/components/FileDrop';
import { SimplePDFViewer } from '@/components/SimplePDFViewer';
import { Toast } from '@/components/Toast';
import { ConfirmModal } from '@/components/ConfirmModal';
import { getStepMetadata } from '@/lib/onboarding';

export default function ResumeStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [existingResumeUrl, setExistingResumeUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const [showConfirmReplace, setShowConfirmReplace] = useState(false);
  const metadata = getStepMetadata(2);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    white: '#ffffff'
  };

  // Load user data and check for existing resume
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (!user) return;
      setUserId(user.uid);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.resumeUrl) {
            setExistingResumeUrl(data.resumeUrl);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    });

    return unsubscribe;
  }, []);

  const handleFileSelect = async (file: File) => {
    setResumeFile(file);
    // Auto-upload when file is selected
    await handleUploadFile(file);
  };

  const handleFileRemove = () => {
    setResumeFile(null);
  };

  const handleUploadFile = async (file: File) => {
    if (!userId || !file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `resumes/${userId}.pdf`);
      await uploadBytes(storageRef, file);
      
      setUploadProgress(50);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      setUploadProgress(75);

      // Update Firestore
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        resumeUrl: downloadURL,
        resumeUploaded: true,
        stepCompleted: 3, // Mark step as completed on upload
        updatedAt: new Date().toISOString(),
      });

      setUploadProgress(100);
      setExistingResumeUrl(downloadURL);
      setResumeFile(null);
      
      // Show success toast
      setToast({ message: 'Resume uploaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Error uploading resume:', error);
      setToast({ message: 'Failed to upload resume. Please try again.', type: 'error' });
      setResumeFile(null); // Clear file on error
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleReplaceConfirm = async () => {
    if (!userId || !existingResumeUrl) return;
    setShowConfirmReplace(false);

    try {
      // Delete old file from Storage
      const oldRef = ref(storage, `resumes/${userId}.pdf`);
      await deleteObject(oldRef).catch(() => {
        // Ignore error if file doesn't exist
      });

      // Clear existing resume
      setExistingResumeUrl(null);
      
      // Update Firestore
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        resumeUrl: null,
        resumeUploaded: false,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error replacing resume:', error);
      alert('Failed to replace resume. Please try again.');
    }
  };

  const handleContinue = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Update step completion
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        stepCompleted: 3, // Mark step 2 as completed
        updatedAt: new Date().toISOString(),
      });

      // Navigate to next step
      router.push('/onboarding/contact');
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Failed to save progress. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndExit = async () => {
    if (!userId) return;
    router.push('/dashboard');
  };

  return (
    <>
    <StepShell
      title={metadata.title}
      subtitle={metadata.subtitle}
      onBack={() => router.push('/onboarding/location')}
      onContinue={handleContinue}
      isContinueLoading={loading}
      continueLabel="Continue"
    >
      {/* All doodles removed per request */}

      <div>
        {/* Info banner */}
        <div style={{
          padding: 16,
          background: '#f0f9ff',
          border: '1px solid #bfdbfe',
          borderRadius: 8,
          marginBottom: 24
        }}>
          <div style={{ 
            fontSize: 14, 
            color: '#1e40af',
            lineHeight: 1.5
          }}>
            <strong>Optional:</strong> Upload your résumé now to help us prepare faster, or skip and add it later once you're accepted.
          </div>
        </div>

        {/* Existing resume preview */}
        {existingResumeUrl && !resumeFile && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 12
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: 16, 
                fontWeight: 600, 
                color: colors.text 
              }}>
                Your Current Résumé
              </h3>
              <button
                onClick={() => setShowConfirmReplace(true)}
                style={{
                  padding: '8px 16px',
                  background: colors.white,
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
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.color = colors.accent;
                }}
              >
                Replace
              </button>
            </div>

            <div style={{
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              overflow: 'hidden',
              background: colors.white
            }}>
              <SimplePDFViewer pdfUrl={existingResumeUrl} height="400px" />
            </div>
          </div>
        )}

        {/* File upload area (show if no existing resume or replacing) */}
        {!existingResumeUrl && (
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: 16, 
              fontWeight: 600, 
              color: colors.text 
            }}>
              Upload Your Résumé
            </h3>

            <FileDrop
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              currentFile={resumeFile}
              disabled={uploading}
              maxSizeMB={10}
            />

            {/* Upload progress */}
            {uploading && (
              <div style={{ marginTop: 16 }}>
                <div style={{
                  width: '100%',
                  height: 8,
                  background: colors.border,
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${uploadProgress}%`,
                    height: '100%',
                    background: colors.accent,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{
                  marginTop: 8,
                  textAlign: 'center',
                  fontSize: 13,
                  color: colors.textLight
                }}>
                  Uploading... {uploadProgress}%
                </div>
              </div>
            )}
          </div>
        )}

        {/* Helper text */}
        <div style={{
          padding: 16,
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: 8,
          fontSize: 13,
          color: '#92400e',
          lineHeight: 1.5,
          marginBottom: 24
        }}>
          <strong>💡 Tip:</strong> A well-formatted résumé helps us match you with the right opportunities faster. Make sure it's up-to-date and highlights your key achievements.
        </div>

        {/* Skip option - only show if no resume uploaded */}
        {!existingResumeUrl && !uploading && (
          <div style={{
            textAlign: 'center',
            padding: '24px 16px',
            background: '#f9fafb',
            border: `1px dashed ${colors.border}`,
            borderRadius: 12,
            marginTop: 8
          }}>
            <p style={{
              margin: '0 0 16px 0',
              fontSize: 14,
              color: colors.textLight,
              lineHeight: 1.6
            }}>
              Don't have your résumé ready? No problem!
            </p>
            <button
              onClick={async () => {
                if (!userId) return;
                setLoading(true);
                try {
                  const userDocRef = doc(db, 'users', userId);
                  await updateDoc(userDocRef, {
                    stepCompleted: 3,
                    updatedAt: new Date().toISOString(),
                  });
                  router.push('/onboarding/contact');
                } catch (error) {
                  console.error('Error skipping resume:', error);
                  alert('Failed to skip. Please try again.');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              style={{
                padding: '12px 32px',
                background: 'transparent',
                color: colors.accent,
                border: `2px solid ${colors.accent}`,
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.color = colors.white;
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.accent;
                }
              }}
            >
              {loading ? 'Skipping...' : 'Skip for Now →'}
            </button>
            <p style={{
              margin: '12px 0 0 0',
              fontSize: 12,
              color: colors.textLight,
              fontStyle: 'italic'
            }}>
              You can upload it later from your dashboard
            </p>
          </div>
        )}
      </div>
    </StepShell>

    {/* Toast Notification */}
    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}

    {/* Confirm Replace Modal */}
    {showConfirmReplace && (
      <ConfirmModal
        title="Replace Résumé?"
        message="Are you sure you want to replace your current résumé? This action cannot be undone."
        confirmText="Yes, Replace"
        cancelText="Cancel"
        type="warning"
        onConfirm={handleReplaceConfirm}
        onCancel={() => setShowConfirmReplace(false)}
      />
    )}
  </>
  );
}
