// Phone number formatting utilities

export interface PhoneFormat {
  length: number;
  format: string; // Pattern like "XX-(XXXXX)-XXX"
  placeholder: string;
}

// Phone formats by country
export const PHONE_FORMATS: { [country: string]: PhoneFormat } = {
  // North America (10 digits: XXX-XXX-XXXX)
  'Canada': {
    length: 10,
    format: 'XXX-XXX-XXXX',
    placeholder: '000-000-0000'
  },
  'United States': {
    length: 10,
    format: 'XXX-XXX-XXXX',
    placeholder: '000-000-0000'
  },
  
  // Nigeria (10 digits: XX-XXXXX-XXX)
  'Nigeria': {
    length: 10,
    format: 'XX-(XXXXX)-XXX',
    placeholder: '00-(00000)-000'
  },
  
  // UK (10 digits: XXXX-XXX-XXX)
  'United Kingdom': {
    length: 10,
    format: 'XXXX-XXX-XXX',
    placeholder: '0000-000-000'
  },
  
  // China (11 digits: XXX-XXXX-XXXX)
  'China': {
    length: 11,
    format: 'XXX-XXXX-XXXX',
    placeholder: '000-0000-0000'
  },
  
  // India (10 digits: XXXXX-XXXXX)
  'India': {
    length: 10,
    format: 'XXXXX-XXXXX',
    placeholder: '00000-00000'
  },
  
  // Australia (9 digits: XXXX-XXX-XXX)
  'Australia': {
    length: 9,
    format: 'XXXX-XXX-XXX',
    placeholder: '0000-000-000'
  },
  
  // France (9 digits: XX-XX-XX-XX-XX)
  'France': {
    length: 9,
    format: 'XX-XX-XX-XX-XX',
    placeholder: '00-00-00-00-00'
  },
  
  // Germany (10 digits: XXX-XXX-XXXX)
  'Germany': {
    length: 10,
    format: 'XXX-XXX-XXXX',
    placeholder: '000-000-0000'
  },
  
  // Brazil (11 digits: XX-XXXXX-XXXX)
  'Brazil': {
    length: 11,
    format: 'XX-XXXXX-XXXX',
    placeholder: '00-00000-0000'
  },
  
  // Mexico (10 digits: XXX-XXX-XXXX)
  'Mexico': {
    length: 10,
    format: 'XXX-XXX-XXXX',
    placeholder: '000-000-0000'
  },
  
  // Japan (10 digits: XX-XXXX-XXXX)
  'Japan': {
    length: 10,
    format: 'XX-XXXX-XXXX',
    placeholder: '00-0000-0000'
  },
  
  // South Korea (10 digits: XX-XXXX-XXXX)
  'South Korea': {
    length: 10,
    format: 'XX-XXXX-XXXX',
    placeholder: '00-0000-0000'
  },
};

// Default format for countries not listed
const DEFAULT_FORMAT: PhoneFormat = {
  length: 10,
  format: 'XXX-XXX-XXXX',
  placeholder: '000-000-0000'
};

/**
 * Get phone format for a country
 */
export function getPhoneFormat(country: string): PhoneFormat {
  return PHONE_FORMATS[country] || DEFAULT_FORMAT;
}

/**
 * Format phone number as user types
 * @param value - Raw numeric input
 * @param format - Format pattern (e.g., "XX-(XXXXX)-XXX")
 * @returns Formatted phone number
 */
export function formatPhoneNumber(value: string, format: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  let formatted = '';
  let digitIndex = 0;
  
  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    const char = format[i];
    if (char === 'X') {
      formatted += digits[digitIndex];
      digitIndex++;
    } else {
      formatted += char;
    }
  }
  
  return formatted;
}

/**
 * Remove formatting from phone number
 * @param formatted - Formatted phone number
 * @returns Raw digits only
 */
export function unformatPhoneNumber(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

/**
 * Validate phone number length
 * @param value - Raw numeric input
 * @param expectedLength - Expected length for the country
 * @returns Validation result
 */
export function validatePhoneLength(value: string, expectedLength: number): {
  isValid: boolean;
  isTooShort: boolean;
  isTooLong: boolean;
  message: string;
} {
  const digits = value.replace(/\D/g, '');
  const length = digits.length;
  
  if (length === 0) {
    return {
      isValid: false,
      isTooShort: true,
      isTooLong: false,
      message: 'Phone number is required'
    };
  }
  
  if (length < expectedLength) {
    return {
      isValid: false,
      isTooShort: true,
      isTooLong: false,
      message: `Phone number is too short (${length}/${expectedLength} digits)`
    };
  }
  
  if (length > expectedLength) {
    return {
      isValid: false,
      isTooShort: false,
      isTooLong: true,
      message: `Phone number is too long (${length}/${expectedLength} digits)`
    };
  }
  
  return {
    isValid: true,
    isTooShort: false,
    isTooLong: false,
    message: 'Valid'
  };
}

/**
 * Restrict input to numbers only
 * @param value - Input value
 * @returns Numeric value only
 */
export function restrictToNumbers(value: string): string {
  return value.replace(/\D/g, '');
}






