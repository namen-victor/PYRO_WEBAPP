"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChange } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { StepShell } from '@/components/StepShell';
import { GenderSelect } from '@/components/GenderSelect';
import { getStepMetadata, basicsSchema, parseDisplayName } from '@/lib/onboarding';

type BasicsFormData = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  gender: string;
  genderCustom?: string;
};

export default function BasicsStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasDoodleParam = searchParams?.has('doodle');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const metadata = getStepMetadata(0);

  // Hard-delete the overlay URL by redirecting to the canonical path with no query
  useEffect(() => {
    if (hasDoodleParam) {
      router.replace('/onboarding/basics');
    }
  }, [hasDoodleParam, router]);

  if (hasDoodleParam) {
    return null; // prevent any render while redirecting
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BasicsFormData>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      gender: '',
      genderCustom: ''
    }
  });

  const genderValue = watch('gender');
  const genderCustomValue = watch('genderCustom');

  // Load user data and prefill form
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (!user) return;
      setUserId(user.uid);

      try {
        // Try to load existing onboarding data
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          
          // Prefill from saved data if exists
          if (data.firstName) setValue('firstName', data.firstName);
          if (data.lastName) setValue('lastName', data.lastName);
          if (data.jobTitle) setValue('jobTitle', data.jobTitle);
          if (data.gender) setValue('gender', data.gender);
          if (data.genderCustom) setValue('genderCustom', data.genderCustom);
        } else {
          // Prefill from Firebase Auth displayName
          const { firstName, lastName } = parseDisplayName(user.name);
          if (firstName) setValue('firstName', firstName);
          if (lastName) setValue('lastName', lastName);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    });

    return unsubscribe;
  }, [setValue]);

  const onSubmit = async (data: BasicsFormData) => {
    if (!userId) return;

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle,
        gender: data.gender,
        genderCustom: data.genderCustom || null,
        name: `${data.firstName} ${data.lastName}`, // Update full name
        stepCompleted: 1, // Mark step 0 as completed, ready for step 1
        updatedAt: new Date().toISOString(),
      };

      if (userDoc.exists()) {
        // Update existing document
        await updateDoc(userDocRef, updateData);
      } else {
        // Create new document (shouldn't happen, but handle it)
        await setDoc(userDocRef, {
          ...updateData,
          onboardingVersion: 1,
          createdAt: new Date().toISOString(),
        });
      }

      // Navigate to next step
      router.push('/onboarding/location');
    } catch (error) {
      console.error('Error saving basics data:', error);
      alert('Failed to save your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndExit = async () => {
    if (!userId) return;

    const formData = watch();
    
    // Only save if user has entered some data
    if (!formData.firstName && !formData.lastName && !formData.gender) {
      router.push('/dashboard');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        gender: formData.gender || null,
        genderCustom: formData.genderCustom || null,
        updatedAt: new Date().toISOString(),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving progress:', error);
      router.push('/dashboard');
    }
  };

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff'
  };

  return (
    <StepShell
      title={metadata.title}
      subtitle={metadata.subtitle}
      onContinue={handleSubmit(onSubmit)}
      isContinueLoading={loading}
      showBackButton={false}
    >
      {/* Doodle and dev overlay removed per request */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            First Name <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            {...register('firstName')}
            placeholder="Enter your first name"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.firstName ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: errors.firstName ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none'
            }}
            onFocus={(e) => !errors.firstName && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !errors.firstName && (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            Last Name <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            {...register('lastName')}
            placeholder="Enter your last name"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.lastName ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: errors.lastName ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none'
            }}
            onFocus={(e) => !errors.lastName && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !errors.lastName && (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>

        {/* Job Title */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            Current/Desired Job Title <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            {...register('jobTitle')}
            placeholder="e.g., Software Engineer, Product Manager"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.jobTitle ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: errors.jobTitle ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none'
            }}
            onFocus={(e) => !errors.jobTitle && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !errors.jobTitle && (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>

        {/* Gender */}
        <GenderSelect
          value={genderValue || ''}
          onChange={(value) => setValue('gender', value, { shouldValidate: true })}
          error={errors.gender?.message || errors.genderCustom?.message}
          customValue={genderCustomValue || ''}
          onCustomChange={(value) => setValue('genderCustom', value, { shouldValidate: true })}
        />
      </form>
    </StepShell>
  );
}