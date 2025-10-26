// Country code mapping
export const COUNTRY_CODES: Record<string, string> = {
  // North America
  'United States': '+1',
  'Canada': '+1',
  'Mexico': '+52',
  
  // Central & South America
  'Argentina': '+54',
  'Brazil': '+55',
  'Chile': '+56',
  'Colombia': '+57',
  'Peru': '+51',
  'Venezuela': '+58',
  
  // Europe
  'United Kingdom': '+44',
  'Germany': '+49',
  'France': '+33',
  'Italy': '+39',
  'Spain': '+34',
  'Netherlands': '+31',
  'Belgium': '+32',
  'Switzerland': '+41',
  'Austria': '+43',
  'Poland': '+48',
  'Sweden': '+46',
  'Norway': '+47',
  'Denmark': '+45',
  'Finland': '+358',
  'Ireland': '+353',
  'Portugal': '+351',
  'Greece': '+30',
  'Czech Republic': '+420',
  'Hungary': '+36',
  'Romania': '+40',
  
  // Africa
  'Nigeria': '+234',
  'South Africa': '+27',
  'Kenya': '+254',
  'Ghana': '+233',
  'Egypt': '+20',
  'Morocco': '+212',
  'Ethiopia': '+251',
  'Tanzania': '+255',
  'Uganda': '+256',
  'Algeria': '+213',
  
  // Asia
  'China': '+86',
  'India': '+91',
  'Japan': '+81',
  'South Korea': '+82',
  'Singapore': '+65',
  'Malaysia': '+60',
  'Thailand': '+66',
  'Vietnam': '+84',
  'Philippines': '+63',
  'Indonesia': '+62',
  'Pakistan': '+92',
  'Bangladesh': '+880',
  'Sri Lanka': '+94',
  'Nepal': '+977',
  
  // Middle East
  'Saudi Arabia': '+966',
  'United Arab Emirates': '+971',
  'Israel': '+972',
  'Turkey': '+90',
  'Iran': '+98',
  'Iraq': '+964',
  'Jordan': '+962',
  'Lebanon': '+961',
  'Kuwait': '+965',
  'Qatar': '+974',
  'Bahrain': '+973',
  'Oman': '+968',
  
  // Oceania
  'Australia': '+61',
  'New Zealand': '+64',
  'Fiji': '+679',
  'Papua New Guinea': '+675',
  
  // Default fallback
  'default': '+1'
};

export function getCountryCode(country: string): string {
  return COUNTRY_CODES[country] || COUNTRY_CODES['default'];
}






