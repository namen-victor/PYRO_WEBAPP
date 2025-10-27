"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChange } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { StepShell } from '@/components/StepShell';
import { CountrySelect } from '@/components/CountrySelect';
import { ResidencySelect } from '@/components/ResidencySelect';
import { Doodle } from '@/components/Doodle';
import DoodleDevOverlay from '@/components/DoodleDevOverlay';
import { getStepMetadata, locationSchema, ResidencyStatus } from '@/lib/onboarding';
import { residencyAliasForCountry } from '@/lib/residency-alias';

type LocationFormData = {
  country: string;
  age: number;
  residencyStatus: ResidencyStatus;
  residencyAlias?: string;
  visaType?: string;
};

export default function LocationStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const metadata = getStepMetadata(1);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: '',
      age: undefined,
      residencyStatus: undefined as any,
      visaType: ''
    }
  });

  const countryValue = watch('country');
  const residencyStatusValue = watch('residencyStatus');
  const visaTypeValue = watch('visaType');
  // no-op

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
          
          // Prefill from saved data if exists
          if (data.country) setValue('country', data.country);
          if (data.age) setValue('age', data.age);
          if (data.residencyStatus) setValue('residencyStatus', data.residencyStatus);
          if (data.visaType) setValue('visaType', data.visaType);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    });

    return unsubscribe;
  }, [setValue]);

  const onSubmit = async (data: LocationFormData) => {
    if (!userId) return;

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      
      const updateData: any = {
        country: data.country,
        age: data.age,
        residencyStatus: data.residencyStatus,
        residencyAlias: residencyAliasForCountry(data.country),
        visaType: data.visaType || null,
        stepCompleted: 2, // Mark step 1 as completed, ready for step 2
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(userDocRef, updateData);

      // Navigate to next step
      router.push('/onboarding/resume');
    } catch (error) {
      console.error('Error saving location data:', error);
      alert('Failed to save your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndExit = async () => {
    if (!userId) return;

    const formData = watch();
    
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        country: formData.country || null,
        age: formData.age || null,
        residencyStatus: formData.residencyStatus || null,
        residencyAlias: formData.country ? residencyAliasForCountry(formData.country) : null,
        visaType: formData.visaType || null,
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
      onBack={() => router.push('/onboarding/basics')}
      onContinue={handleSubmit(onSubmit)}
      isContinueLoading={loading}
    >
      {/* FINAL: Doodle 7.0 placement (hidden when editing via ?doodle=7.0) */}
      {!(typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '7.0') && (
        <Doodle
          src="/doodles/7.0.svg"
          alt="Traveler with luggage"
          position="bottom-right"
          offset={{ x: -560, y: -404 }}
          desktopScale={0.35}
          mobilePosition="hidden"
          maxWidth="none"
        />
      )}

      {/* DEV OVERLAY: enable with ?doodle=1 */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '1' && (
        <DoodleDevOverlay
          src="/doodles/7.1.svg"
          alt="Traveler luggage extension"
          position="bottom-right"
          initialOffset={{ x: 478, y: 488 }}
          initialScale={0.15}
          maxWidth={"none"}
        />
      )}

      {/* DEV OVERLAY: edit 7.0 precisely with ?doodle=7.0 */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '7.0' && (
        <DoodleDevOverlay
          src="/doodles/7.0.svg"
          alt="Traveler with luggage"
          position="bottom-right"
          initialOffset={{ x: -300, y: -18 }}
          initialScale={0.35}
          maxWidth={"none"}
        />
      )}

      {/* FINAL: Doodle 7.1 placement (hidden when editing via ?doodle=7.1) */}
      {!(typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '7.1') && (
        <Doodle
          src="/doodles/7.1.svg"
          alt="Traveler luggage extension"
          position="bottom-right"
          offset={{ x: 478, y: 488 }}
          desktopScale={0.15}
          mobilePosition="hidden"
          maxWidth="none"
        />
      )}

      {/* DEV OVERLAY: edit 7.1 precisely with ?doodle=7.1 */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '7.1' && (
        <DoodleDevOverlay
          src="/doodles/7.1.svg"
          alt="Traveler luggage extension"
          position="bottom-right"
          initialOffset={{ x: 478, y: 488 }}
          initialScale={0.15}
          maxWidth={"none"}
        />
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Country */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={field.value}
              onChange={field.onChange}
              error={errors.country?.message}
            />
          )}
        />

        {/* Age */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            Age <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            placeholder="Enter your age"
            min={16}
            max={100}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.age ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: errors.age ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none'
            }}
            onFocus={(e) => !errors.age && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !errors.age && (e.currentTarget.style.borderColor = colors.border)}
          />
          <div style={{ 
            marginTop: 8, 
            fontSize: 12, 
            color: colors.textLight,
            fontStyle: 'italic'
          }}>
            You must be at least 16 years old
          </div>
        </div>

        {/* Residency Status */}
        <Controller
          name="residencyStatus"
          control={control}
          render={({ field }) => (
            <ResidencySelect
              value={field.value}
              onChange={field.onChange}
              error={errors.residencyStatus?.message}
              country={countryValue}
              visaType={visaTypeValue}
              onVisaTypeChange={(value) => setValue('visaType', value, { shouldValidate: true })}
              visaTypeError={errors.visaType?.message}
            />
          )}
        />
      </form>
    </StepShell>
  );
}
