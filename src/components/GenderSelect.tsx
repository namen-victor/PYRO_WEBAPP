"use client";

import { useState } from 'react';
import { GENDERS } from '@/lib/constants';

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  customValue?: string;
  onCustomChange?: (value: string) => void;
}

export function GenderSelect({ 
  value, 
  onChange, 
  error,
  customValue = '',
  onCustomChange 
}: GenderSelectProps) {
  const [showCustomInput, setShowCustomInput] = useState(value === 'Self-describe');

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff'
  };

  const handleGenderChange = (newValue: string) => {
    onChange(newValue);
    if (newValue === 'Self-describe') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      if (onCustomChange) onCustomChange('');
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ 
        display: 'block', 
        fontSize: 14, 
        fontWeight: 600, 
        color: colors.text, 
        marginBottom: 8 
      }}>
        Gender <span style={{ color: colors.error }}>*</span>
      </label>

      <select
        value={value}
        onChange={(e) => handleGenderChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `1px solid ${error ? colors.error : colors.border}`,
          borderRadius: 8,
          fontSize: 15,
          backgroundColor: colors.white,
          color: colors.text,
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 40
        }}
        onFocus={(e) => !error && (e.currentTarget.style.borderColor = colors.accent)}
        onBlur={(e) => !error && (e.currentTarget.style.borderColor = colors.border)}
      >
        <option value="">Select your gender</option>
        {GENDERS.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>

      {/* Custom gender input (shown when "Self-describe" is selected) */}
      {showCustomInput && (
        <div style={{ marginTop: 12 }}>
          <input
            type="text"
            value={customValue}
            onChange={(e) => onCustomChange && onCustomChange(e.target.value)}
            placeholder="Please describe your gender"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${error ? colors.error : colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => !error && (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => !error && (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>
      )}

      {error && (
        <div style={{ 
          marginTop: 6, 
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
        This information helps us provide inclusive and personalized service
      </div>
    </div>
  );
}
