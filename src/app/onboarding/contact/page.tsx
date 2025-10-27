"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChange } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { StepShell } from '@/components/StepShell';
import { Doodle } from '@/components/Doodle';
import DoodleDevOverlay from '@/components/DoodleDevOverlay';
import { getStepMetadata, contactSchema } from '@/lib/onboarding';
import { getCountryCode } from '@/lib/constants/country-codes';
import { 
  getPhoneFormat, 
  formatPhoneNumber, 
  unformatPhoneNumber, 
  validatePhoneLength,
  restrictToNumbers 
} from '@/lib/utils/phone-formatter';

type ContactFormData = {
  preferredEmail: string;
  allowPhoneContact: boolean;
  phoneNumber?: string;
};

export default function ContactStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userCountry, setUserCountry] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [phoneNumberWithoutCode, setPhoneNumberWithoutCode] = useState<string>(''); // Raw digits
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>(''); // Formatted display
  const [phoneValidation, setPhoneValidation] = useState<{
    isValid: boolean;
    isTooShort: boolean;
    isTooLong: boolean;
    message: string;
  } | null>(null);
  const [showMismatchWarning, setShowMismatchWarning] = useState(false);
  const [mismatchConfirmed, setMismatchConfirmed] = useState(false);
  const mismatchConfirmedRef = useRef(false); // Use ref for immediate access
  const metadata = getStepMetadata(3);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredEmail: '',
      allowPhoneContact: false,
      phoneNumber: ''
    }
  });

  const allowPhoneContactValue = watch('allowPhoneContact');
  const preferredEmailValue = watch('preferredEmail');

  // Get current phone format based on country
  const currentPhoneFormat = getPhoneFormat(userCountry);

  // Update formatting when country changes
  useEffect(() => {
    if (phoneNumberWithoutCode && userCountry) {
      const format = getPhoneFormat(userCountry);
      const formatted = formatPhoneNumber(phoneNumberWithoutCode, format.format);
      setFormattedPhoneNumber(formatted);
      
      // Validate length
      const validation = validatePhoneLength(phoneNumberWithoutCode, format.length);
      setPhoneValidation(validation);
    }
  }, [userCountry, phoneNumberWithoutCode]);

  // Auto-save contact preferences to Firestore
  useEffect(() => {
    if (!userId) return;
    
    const saveContactData = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const updateData: any = {
          preferredEmail: preferredEmailValue || null,
          allowPhoneContact: allowPhoneContactValue || false,
          updatedAt: new Date().toISOString(),
        };

        // Save phone number if provided
        if (allowPhoneContactValue && phoneNumberWithoutCode && countryCode) {
          const fullPhoneNumber = `${countryCode}${phoneNumberWithoutCode}`.replace(/\s+/g, '');
          updateData.phoneNumber = fullPhoneNumber;
        } else if (!allowPhoneContactValue) {
          updateData.phoneNumber = null;
        }

        await updateDoc(userDocRef, updateData);
      } catch (error) {
        console.error('Error auto-saving contact data:', error);
      }
    };

    // Debounce the save (1 second after last change)
    const timeoutId = setTimeout(saveContactData, 1000);
    return () => clearTimeout(timeoutId);
  }, [phoneNumberWithoutCode, countryCode, userId, allowPhoneContactValue, preferredEmailValue]);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff',
    success: '#10b981',
    warning: '#f59e0b'
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
          
          // Get user's country for display
          if (data.country) {
            setUserCountry(data.country);
          }
          
          // Prefill from saved data if exists
          if (data.preferredEmail) {
            setValue('preferredEmail', data.preferredEmail);
          } else {
            // Default to auth email
            setValue('preferredEmail', user.email);
          }
          
          if (data.allowPhoneContact !== undefined) {
            setValue('allowPhoneContact', data.allowPhoneContact);
          }

          // Load mismatch confirmation if it exists
          if (data.phoneNumberMismatchConfirmed) {
            setMismatchConfirmed(true);
            mismatchConfirmedRef.current = true;
          }
          
          // Handle phone number and country code
          if (data.phoneNumber) {
            // Phone number exists, parse it
            const phoneStr = data.phoneNumber.trim();
            
            // Try to extract country code (starts with + followed by 1-3 digits)
            // Most country codes are 1-3 digits (e.g., +1, +44, +234, +886)
            const codeMatch = phoneStr.match(/^(\+\d{1,3})/);
            
            if (codeMatch) {
              const savedCode = codeMatch[1];
              // Remove the country code and get only the digits after it
              const numberAfterCode = phoneStr.substring(savedCode.length);
              const rawNumber = numberAfterCode.replace(/\D/g, '');
              
              console.log('Loading phone:', {
                phoneStr,
                savedCode,
                numberAfterCode,
                rawNumber,
                rawNumberLength: rawNumber.length
              });
              
              setCountryCode(savedCode);
              setPhoneNumberWithoutCode(rawNumber);
              
              // Format the number for display
              if (data.country) {
                const format = getPhoneFormat(data.country);
                const formatted = formatPhoneNumber(rawNumber, format.format);
                setFormattedPhoneNumber(formatted);
                console.log('Formatted:', formatted, 'Expected length:', format.length);
              }
              
              setValue('phoneNumber', data.phoneNumber);
            } else {
              // No code in saved number, use country's default code
              if (data.country) {
                setCountryCode(getCountryCode(data.country));
              }
              const rawNumber = phoneStr.replace(/\D/g, '');
              setPhoneNumberWithoutCode(rawNumber);
              
              // Format for display
              if (data.country) {
                const format = getPhoneFormat(data.country);
                const formatted = formatPhoneNumber(rawNumber, format.format);
                setFormattedPhoneNumber(formatted);
              }
              
              setValue('phoneNumber', phoneStr);
            }
          } else {
            // No phone number saved, use country code from selected country
            if (data.country) {
              const code = getCountryCode(data.country);
              setCountryCode(code);
            }
          }
        } else {
          // Default to auth email for new users
          setValue('preferredEmail', user.email);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    });

    return unsubscribe;
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    if (!userId) return;

    // Check for country code mismatch
    if (data.allowPhoneContact && phoneNumberWithoutCode.length > 0 && userCountry) {
      const expectedCode = getCountryCode(userCountry);
      
      console.log('Mismatch Check:', {
        countryCode,
        expectedCode,
        userCountry,
        phoneNumberWithoutCode,
        mismatchConfirmed: mismatchConfirmedRef.current
      });
      
      if (countryCode !== expectedCode && !mismatchConfirmedRef.current) {
        console.log('Showing mismatch warning!');
        setShowMismatchWarning(true);
        return; // Don't proceed until user confirms
      }
    }

    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      
      // Combine country code and phone number
      let fullPhoneNumber = null;
      if (data.allowPhoneContact && phoneNumberWithoutCode) {
        fullPhoneNumber = `${countryCode}${phoneNumberWithoutCode}`.replace(/\s+/g, '');
      }
      
      const updateData: any = {
        preferredEmail: data.preferredEmail,
        allowPhoneContact: data.allowPhoneContact,
        phoneNumber: fullPhoneNumber,
        stepCompleted: 4, // Mark step 3 as completed, ready for step 4
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(userDocRef, updateData);

      // Navigate to next step
      router.push('/onboarding/job-boards');
    } catch (error) {
      console.error('Error saving contact data:', error);
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
        preferredEmail: formData.preferredEmail || null,
        allowPhoneContact: formData.allowPhoneContact || false,
        phoneNumber: formData.phoneNumber || null,
        updatedAt: new Date().toISOString(),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving progress:', error);
      router.push('/dashboard');
    }
  };

  return (
    <StepShell
      title={metadata.title}
      subtitle={metadata.subtitle}
      onBack={() => router.push('/onboarding/resume')}
      onContinue={handleSubmit(onSubmit)}
      isContinueLoading={loading}
    >
      {/* Doodle: Man at desktop (upper left, near email/phone fields) */}
      {!(typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '6') && (
        <Doodle
          src="/doodles/6.0.svg"
          alt="Person at computer"
          position="top-left"
          offset={{ x: -58, y: -448 }}
          desktopScale={0.80}
          mobilePosition="hidden"
        />
      )}

      {/* DEV OVERLAY: enable with ?doodle=6 for precise placement */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '6' && (
        <DoodleDevOverlay
          src="/doodles/6.0.svg"
          alt="Person at computer"
          position="top-left"
          initialOffset={{ x: -58, y: -448 }}
          initialScale={0.80}
          maxWidth={"320px"}
        />
      )}
      
      {/* Doodle: Man on phone (right side, near phone field, talking to #6) */}
      {!(typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '3') && (
        <Doodle
          src="/doodles/3.svg?v=2"
          alt="Person on phone"
          position="top-right"
          offset={{ x: -317, y: 17 }}
          desktopScale={0.85}
          mobilePosition="hidden"
        />
      )}

      {/* DEV OVERLAY: enable with ?doodle=3 for precise placement */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('doodle') === '3' && (
        <DoodleDevOverlay
          src="/doodles/3.svg?v=2"
          alt="Person on phone"
          position="top-right"
          initialOffset={{ x: -317, y: 17 }}
          initialScale={0.85}
          maxWidth={"320px"}
        />
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Info banner */}
        <div style={{
          padding: 16,
          background: '#f0f9ff',
          border: '1px solid #bfdbfe',
          borderRadius: 8,
          marginBottom: 24,
          fontSize: 14,
          color: '#1e40af',
          lineHeight: 1.5
        }}>
          <strong>📧 Stay Connected:</strong> We'll use these contact details for important updates about your job search and application status.
        </div>

        {/* Preferred Email */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            Preferred Email <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="email"
            {...register('preferredEmail')}
            placeholder="your.email@example.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.preferredEmail ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: errors.preferredEmail ? `0 0 0 3px rgba(220, 38, 38, 0.15)` : 'none'
            }}
            onFocus={(e) => !errors.preferredEmail && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !errors.preferredEmail && (e.currentTarget.style.borderColor = colors.border)}
          />
          <div style={{ 
            marginTop: 8, 
            fontSize: 12, 
            color: colors.textLight,
            fontStyle: 'italic'
          }}>
            This is where we'll send important updates and notifications
          </div>
        </div>

        {/* Phone Contact Toggle */}
        <div style={{ 
          marginBottom: allowPhoneContactValue ? 20 : 24,
          padding: 20,
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: 8
        }}>
          <label style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            cursor: 'pointer'
          }}>
            {/* Custom checkbox */}
            <div style={{ position: 'relative', flexShrink: 0, marginTop: 2 }}>
              <input
                type="checkbox"
                {...register('allowPhoneContact')}
                style={{
                  width: 20,
                  height: 20,
                  cursor: 'pointer',
                  accentColor: colors.accent
                }}
              />
            </div>

            {/* Label text */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: 15, 
                fontWeight: 600, 
                color: colors.text,
                marginBottom: 4
              }}>
                Allow phone contact
              </div>
              <div style={{ 
                fontSize: 13, 
                color: colors.textLight,
                lineHeight: 1.5
              }}>
                Enable us to contact you via phone or WhatsApp for time-sensitive updates, interview scheduling, and urgent matters.
              </div>
            </div>
          </label>
        </div>

        {/* Phone Number (conditional) */}
        {allowPhoneContactValue && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: 'block', 
              fontSize: 14, 
              fontWeight: 600, 
              color: colors.text, 
              marginBottom: 8 
            }}>
              Phone Number <span style={{ color: colors.error }}>*</span>
            </label>
            
            {/* Split input: Country Code + Phone Number */}
            <div style={{ 
              display: 'flex', 
              gap: 12,
              alignItems: 'flex-start'
            }}>
              {/* Country Code Input (editable) */}
              <div style={{ width: 100, flexShrink: 0 }}>
                <input
                  type="text"
                  value={countryCode}
                  onChange={(e) => {
                    let value = e.target.value;
                    
                    // Remove all non-digits except the leading +
                    value = value.replace(/[^\d+]/g, '');
                    
                    // Ensure it starts with +
                    if (!value.startsWith('+')) {
                      value = '+' + value.replace(/\+/g, '');
                    }
                    
                    // Remove any extra + signs after the first one
                    value = '+' + value.substring(1).replace(/\+/g, '');
                    
                    // Limit to +XXX (max 3 digits after +)
                    // Most country codes are 1-3 digits: +1, +44, +234, +886
                    const match = value.match(/^(\+\d{0,3})/);
                    if (match) {
                      value = match[1];
                    }
                    
                    setCountryCode(value);
                    
                    // Update formatting when country code changes
                    if (phoneNumberWithoutCode && userCountry) {
                      const format = getPhoneFormat(userCountry);
                      const formatted = formatPhoneNumber(phoneNumberWithoutCode, format.format);
                      setFormattedPhoneNumber(formatted);
                    }
                  }}
                  placeholder="+1"
                  maxLength={4}
                  style={{
                    width: '100%',
                    padding: '12px 12px',
                    border: `1px solid ${errors.phoneNumber ? colors.error : colors.border}`,
                    borderRadius: 8,
                    fontSize: 15,
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    textAlign: 'center',
                    fontWeight: 600
                  }}
                  onFocus={(e) => !errors.phoneNumber && (e.currentTarget.style.borderColor = colors.accent)}
                  onBlur={(e) => !errors.phoneNumber && (e.currentTarget.style.borderColor = colors.border)}
                />
              </div>

              {/* Phone Number Input (formatted) */}
              <div style={{ flex: 1 }}>
                <input
                  type="tel"
                  value={formattedPhoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Restrict to numbers only
                    const numbersOnly = restrictToNumbers(value);
                    
                    // Don't allow more digits than expected
                    if (numbersOnly.length > currentPhoneFormat.length) {
                      return; // Block input if too long
                    }
                    
                    // Update raw number
                    setPhoneNumberWithoutCode(numbersOnly);
                    
                    // Format for display
                    const formatted = formatPhoneNumber(numbersOnly, currentPhoneFormat.format);
                    setFormattedPhoneNumber(formatted);
                    
                    // Validate
                    const validation = validatePhoneLength(numbersOnly, currentPhoneFormat.length);
                    setPhoneValidation(validation);
                    
                    // Update hidden field for form validation
                    const fullNumber = `${countryCode}${numbersOnly}`;
                    setValue('phoneNumber', fullNumber, { shouldValidate: true });
                  }}
                  placeholder={currentPhoneFormat.placeholder}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${
                      phoneValidation?.isTooLong || phoneValidation?.isTooShort 
                        ? colors.error 
                        : errors.phoneNumber 
                        ? colors.error 
                        : colors.border
                    }`,
                    borderRadius: 8,
                    fontSize: 15,
                    backgroundColor: colors.white,
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxShadow: (phoneValidation?.isTooLong || phoneValidation?.isTooShort || errors.phoneNumber) 
                      ? `0 0 0 3px rgba(220, 38, 38, 0.15)` 
                      : 'none',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px'
                  }}
                  onFocus={(e) => {
                    if (!phoneValidation?.isTooLong && !phoneValidation?.isTooShort && !errors.phoneNumber) {
                      e.currentTarget.style.borderColor = colors.accent;
                    }
                  }}
                  onBlur={(e) => {
                    if (!phoneValidation?.isTooLong && !phoneValidation?.isTooShort && !errors.phoneNumber) {
                      e.currentTarget.style.borderColor = colors.border;
                    }
                  }}
                />
              </div>
            </div>

            {/* Removed error text messages - using subtle glow only */}
            
            <div style={{ 
              marginTop: 8, 
              fontSize: 12, 
              color: colors.textLight,
              fontStyle: 'italic'
            }}>
              {userCountry && `Format: ${currentPhoneFormat.format.replace(/X/g, '0')} • `}
              {currentPhoneFormat.length} digits required
            </div>
          </div>
        )}

        {/* Privacy note */}
        <div style={{
          padding: 16,
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: 8,
          fontSize: 13,
          color: '#92400e',
          lineHeight: 1.5
        }}>
          <strong>🔒 Privacy:</strong> Your contact information is secure and will only be used for job-related communications. We never share your details with third parties without your consent.
        </div>
      </form>

      {/* Country Code Mismatch Warning Modal */}
      {showMismatchWarning && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(46, 46, 46, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setShowMismatchWarning(false)}
        >
          <div
            style={{
              background: colors.white,
              borderRadius: 16,
              padding: 40,
              maxWidth: 520,
              width: '100%',
              boxShadow: '0 24px 48px rgba(46, 46, 46, 0.2), 0 8px 16px rgba(46, 46, 46, 0.1)',
              border: `2px solid ${colors.accent}`,
              animation: 'slideIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon with accent background */}
            <div style={{
              width: 64,
              height: 64,
              background: `linear-gradient(135deg, ${colors.accent}, #6b9492)`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: 32
            }}>
              ⚠️
            </div>
            
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: 24,
              fontWeight: 700,
              color: colors.primary,
              textAlign: 'center',
              letterSpacing: '-0.5px'
            }}>
              Country Code Mismatch Detected
            </h3>

            <div style={{
              fontSize: 15,
              color: colors.textLight,
              lineHeight: 1.6,
              marginBottom: 24,
              textAlign: 'center'
            }}>
              Your phone number's country code <strong style={{ color: colors.accent, fontWeight: 600 }}>{countryCode}</strong> doesn't match your selected country <strong style={{ color: colors.accent, fontWeight: 600 }}>{userCountry}</strong> (expected <strong style={{ color: colors.accent, fontWeight: 600 }}>{getCountryCode(userCountry)}</strong>).
            </div>

            <div style={{
              padding: 20,
              background: '#f0f9f8',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 12,
              fontSize: 14,
              color: colors.text,
              lineHeight: 1.6,
              marginBottom: 28
            }}>
              <div style={{ 
                fontSize: 15, 
                fontWeight: 600, 
                color: colors.primary,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span style={{ fontSize: 18 }}>💡</span>
                <span>Is your phone number from a different country?</span>
              </div>
              <div style={{ color: colors.textLight }}>
                For example, you might be in {userCountry} but using a phone number from another country.
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              <button
                onClick={async () => {
                  // Set ref IMMEDIATELY (synchronous)
                  mismatchConfirmedRef.current = true;
                  setMismatchConfirmed(true);
                  setShowMismatchWarning(false);
                  
                  // Save the confirmation to Firestore
                  if (userId) {
                    try {
                      const userDocRef = doc(db, 'users', userId);
                      await updateDoc(userDocRef, {
                        phoneNumberMismatchConfirmed: true,
                        updatedAt: new Date().toISOString(),
                      });
                    } catch (error) {
                      console.error('Error saving mismatch confirmation:', error);
                    }
                  }
                  
                  // Trigger form submission again
                  handleSubmit(onSubmit)();
                }}
                style={{
                  padding: '16px 24px',
                  background: colors.accent,
                  color: colors.white,
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: `0 4px 12px ${colors.accent}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#6b9492';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 6px 16px ${colors.accent}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.accent}40`;
                }}
              >
                ✓ Yes, my phone is from a different country
              </button>

              <button
                onClick={() => {
                  setShowMismatchWarning(false);
                  // Reset to expected country code
                  const expectedCode = getCountryCode(userCountry);
                  setCountryCode(expectedCode);
                  setPhoneNumberWithoutCode('');
                }}
                style={{
                  padding: '16px 24px',
                  background: colors.white,
                  color: colors.primary,
                  border: `2px solid ${colors.border}`,
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.color = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.color = colors.primary;
                }}
              >
                ✕ No, let me fix it
              </button>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(-10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </StepShell>
  );
}
