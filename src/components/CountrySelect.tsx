"use client";

import { useState, useMemo } from 'react';
import { COUNTRIES } from '@/lib/constants';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CountrySelect({ value, onChange, error }: CountrySelectProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const colors = {
    primary: '#2e2e2e',
    accent: '#7aa3a1',
    border: '#e0e0e0',
    text: '#1a1a1a',
    textLight: '#666',
    error: '#dc2626',
    white: '#ffffff',
    hover: '#f5f5f5'
  };

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return COUNTRIES;
    const term = searchTerm.toLowerCase();
    return COUNTRIES.filter(country => 
      country.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSelect = (country: string) => {
    onChange(country);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: 20, position: 'relative' }}>
      <label style={{ 
        display: 'block', 
        fontSize: 14, 
        fontWeight: 600, 
        color: colors.text, 
        marginBottom: 8 
      }}>
        Country <span style={{ color: colors.error }}>*</span>
      </label>

      {/* Selected value or search input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={isOpen ? searchTerm : value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={(e) => {
            setIsOpen(true);
            !error && (e.currentTarget.style.borderColor = colors.accent);
          }}
          onBlur={(e) => {
            // Delay to allow click on dropdown
            setTimeout(() => {
              !error && (e.currentTarget.style.borderColor = colors.border);
              setIsOpen(false);
              setSearchTerm('');
            }, 200);
          }}
          placeholder={value || "Search or select your country"}
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: 8,
            fontSize: 15,
            backgroundColor: colors.white,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s',
            cursor: 'text'
          }}
        />
        
        {/* Dropdown arrow */}
        <div style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: colors.textLight,
          fontSize: 12
        }}>
          {isOpen ? '▲' : '▼'}
        </div>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 4,
          maxHeight: 300,
          overflowY: 'auto',
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country}
                onMouseDown={() => handleSelect(country)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: colors.text,
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.hover}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.white}
              >
                {country}
              </div>
            ))
          ) : (
            <div style={{
              padding: '16px',
              textAlign: 'center',
              color: colors.textLight,
              fontSize: 14
            }}>
              No countries found
            </div>
          )}
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
        Type to search from 195 countries
      </div>
    </div>
  );
}

