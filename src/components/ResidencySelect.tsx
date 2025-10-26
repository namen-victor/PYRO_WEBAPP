"use client";

import { ResidencyStatus } from '@/lib/onboarding';
import { residencyAliasForCountry } from '@/lib/residency-alias';

interface ResidencySelectProps {
  value: ResidencyStatus | '' | undefined;
  onChange: (value: ResidencyStatus) => void;
  error?: string;
  country: string;
  visaType?: string;
  onVisaTypeChange?: (value: string) => void;
  visaTypeError?: string;
}

export function ResidencySelect({ 
  value, 
  onChange, 
  error,
  country,
  visaType = '',
  onVisaTypeChange,
  visaTypeError
}: ResidencySelectProps) {
  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff',
    selected: '#e8f5f3'
  };

  const residencyAlias = country ? residencyAliasForCountry(country) : 'Permanent Resident';

  const options: { value: ResidencyStatus; label: string; description: string; requiresVisa?: boolean }[] = [
    {
      value: 'citizen',
      label: 'Citizen / National',
      description: 'You are a citizen or national of this country'
    },
    {
      value: 'permanent_resident',
      label: residencyAlias,
      description: 'You have permanent residency rights'
    },
    {
      value: 'work_visa_holder',
      label: 'Work Visa Holder',
      description: 'You hold a work visa or permit',
      requiresVisa: true
    },
    {
      value: 'student',
      label: 'Student',
      description: 'You are on a student visa',
      requiresVisa: true
    },
    {
      value: 'refugee_asylee',
      label: 'Refugee / Asylee',
      description: 'You have refugee or asylum status'
    },
    {
      value: 'temporary_other',
      label: 'Temporary / Other',
      description: 'Other temporary status',
      requiresVisa: true
    }
  ];

  const selectedOption = options.find(opt => opt.value === value);
  const showVisaField = selectedOption?.requiresVisa;

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ 
        display: 'block', 
        fontSize: 14, 
        fontWeight: 600, 
        color: colors.text, 
        marginBottom: 8 
      }}>
        Residency Status <span style={{ color: colors.error }}>*</span>
      </label>

      {/* Radio cards */}
      <div style={{ display: 'grid', gap: 12 }}>
        {options.map((option) => {
          const isSelected = value === option.value;
          
          return (
            <div
              key={option.value}
              onClick={() => onChange(option.value)}
              style={{
                padding: 16,
                border: `2px solid ${isSelected ? colors.accent : colors.border}`,
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: isSelected ? colors.selected : colors.white
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.background = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.background = colors.white;
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {/* Radio button */}
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? colors.accent : colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2
                }}>
                  {isSelected && (
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: colors.accent
                    }} />
                  )}
                </div>

                {/* Label and description */}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: 15, 
                    fontWeight: 600, 
                    color: colors.text,
                    marginBottom: 4
                  }}>
                    {option.label}
                  </div>
                  <div style={{ 
                    fontSize: 13, 
                    color: colors.textLight,
                    lineHeight: 1.4
                  }}>
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visa type input (conditional) */}
      {showVisaField && (
        <div style={{ marginTop: 16 }}>
          <label style={{ 
            display: 'block', 
            fontSize: 14, 
            fontWeight: 600, 
            color: colors.text, 
            marginBottom: 8 
          }}>
            Visa Type <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            value={visaType}
            onChange={(e) => onVisaTypeChange && onVisaTypeChange(e.target.value)}
            placeholder="e.g., H-1B, Tier 2, 482, etc."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${visaTypeError ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => !visaTypeError && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !visaTypeError && (e.currentTarget.style.borderColor = colors.border)}
          />
          {visaTypeError && (
            <div style={{ 
              marginTop: 6, 
              fontSize: 13, 
              color: colors.error,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <span>⚠</span>
              <span>{visaTypeError}</span>
            </div>
          )}
        </div>
      )}

      {error && !showVisaField && (
        <div style={{ 
          marginTop: 8, 
          fontSize: 13, 
          color: colors.error,
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div style={{ 
        marginTop: 8, 
        fontSize: 12, 
        color: colors.textLight,
        fontStyle: 'italic'
      }}>
        This helps us understand your work eligibility
      </div>
    </div>
  );
}

