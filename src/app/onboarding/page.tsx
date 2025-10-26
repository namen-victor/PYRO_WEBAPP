"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getStepRoute } from '@/lib/onboarding';

/**
 * Onboarding index page
 * Redirects to the first incomplete step or to /waiting if completed
 */
export default function OnboardingIndexPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (!user) {
        router.replace('/login');
        return;
      }

      if (user.role !== 'client') {
        router.replace('/login');
        return;
      }

      try {
        // Check user's onboarding progress
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const stepCompleted = userData.stepCompleted || 0;

          // If all steps completed (step 6), redirect to waiting
          if (stepCompleted >= 6) {
            router.replace('/waiting');
            return;
          }

          // Redirect to next incomplete step
          const nextStep = stepCompleted;
          router.replace(getStepRoute(nextStep));
        } else {
          // No onboarding data yet - start from beginning
          router.replace('/onboarding/basics');
        }
      } catch (error) {
        console.error('Error checking onboarding progress:', error);
        // Default to first step on error
        router.replace('/onboarding/basics');
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#ebebeb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #7aa3a1',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: 20, color: '#666' }}>Loading your onboarding...</p>
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

  return null;
}
