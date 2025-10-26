import { z } from 'zod';
import { COUNTRIES } from './constants/countries';
import { GENDERS } from './constants/genders';
import { JOB_BOARDS } from './constants/job-boards';

// ============================================================================
// Types
// ============================================================================

export type ResidencyStatus =
  | 'citizen'
  | 'permanent_resident'
  | 'work_visa_holder'
  | 'student'
  | 'refugee_asylee'
  | 'temporary_other';

export interface OnboardingData {
  onboardingVersion: 1;
  
  // Step 1 – Basics
  firstName: string;
  lastName: string;
  jobTitle: string;
  gender: string;
  genderCustom?: string; // For "Self-describe"
  
  // Step 2 – Location & Status
  country: string;
  age: number;
  residencyStatus: ResidencyStatus;
  residencyAlias?: string;
  visaType?: string;
  
  // Step 3 – Résumé (Optional)
  resumeUploaded: boolean;
  resumeUrl?: string;
  
  // Step 4 – Contact Preferences
  preferredEmail: string;
  allowPhoneContact: boolean;
  phoneNumber?: string;
  phoneNumberMismatchConfirmed?: boolean;
  
  // Step 5 – Job Boards, Gmail & Consent (Informational - actual credentials collected later in dashboard)
  jobBoards: string[];
  jobBoardsOther?: string;
  jobBoardsConsent: boolean;
  gmailConsent: boolean;
  aiTrackingConsent: boolean;
  
  // System
  stepCompleted: number; // 0..6
  createdAt: string;
  updatedAt: string;
  onboardingCompletedAt?: string;
  archivedResumes?: {
    resumeUrl: string;
    uploadedAt: string;
    archivedAt: string;
    isArchived: boolean;
  }[];
  
  // Subscription fields
  subscriptionStatus?: 'active' | 'inactive' | 'trial';
  subscriptionPlan?: string;
  billingCycle?: 'bi-weekly' | 'monthly';
  applicationsPerDay?: number;
  applicationProgress?: number; // 0-100
}

// ============================================================================
// Zod Schemas (per step)
// ============================================================================

// Step 1: Basics
export const basicsSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(60, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(60, 'Last name too long'),
  jobTitle: z.string().min(1, 'Job title is required').max(100, 'Job title too long'),
  gender: z.string().min(1, 'Gender is required'),
  genderCustom: z.string().optional(),
}).refine((data) => {
  // If "Self-describe" is selected, genderCustom must be provided
  if (data.gender === 'Self-describe') {
    return data.genderCustom && data.genderCustom.trim().length > 0;
  }
  return true;
}, {
  message: 'Please describe your gender',
  path: ['genderCustom']
});

// Step 2: Location & Status
export const locationSchema = z.object({
  country: z.enum(COUNTRIES as any).refine((val) => val !== undefined, {
    message: 'Please select a country'
  }),
  age: z.number()
    .int('Age must be a whole number')
    .min(16, 'You must be at least 16 years old')
    .max(100, 'Please enter a valid age'),
  residencyStatus: z.enum([
    'citizen',
    'permanent_resident',
    'work_visa_holder',
    'student',
    'refugee_asylee',
    'temporary_other'
  ]).refine((val) => val !== undefined, {
    message: 'Please select your residency status'
  }),
  residencyAlias: z.string().optional(),
  visaType: z.string().optional(),
}).refine((data) => {
  // If work_visa_holder, student, or temporary_other, visaType is required
  if (['work_visa_holder', 'student', 'temporary_other'].includes(data.residencyStatus)) {
    return data.visaType && data.visaType.trim().length > 0;
  }
  return true;
}, {
  message: 'Please specify your visa type',
  path: ['visaType']
});

// Step 3: Résumé (Optional - no required fields)
export const resumeSchema = z.object({
  resumeUploaded: z.boolean(),
  resumeUrl: z.string().url().optional(),
});

// Step 4: Contact Preferences
export const contactSchema = z.object({
  preferredEmail: z.string().email('Please enter a valid email'),
  allowPhoneContact: z.boolean(),
  phoneNumber: z.string().optional(),
}).refine((data) => {
  // If allowPhoneContact is true, phoneNumber is required
  if (data.allowPhoneContact) {
    return data.phoneNumber && data.phoneNumber.trim().length > 0;
  }
  return true;
}, {
  message: 'Please enter your phone number',
  path: ['phoneNumber']
});

// Step 5: Job Boards & Consent (Informational)
export const jobBoardsSchema = z.object({
  jobBoards: z.array(z.string()).min(1, 'Please select at least one job board'),
  jobBoardsOther: z.string().optional(),
  jobBoardsConsent: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the requirements to continue'
  }),
  gmailConsent: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the Gmail requirements to continue'
  }),
  aiTrackingConsent: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the AI tracking to continue'
  }),
}).refine((data) => {
  // If "Other" is selected, jobBoardsOther must be provided
  if (data.jobBoards.includes('Other')) {
    return data.jobBoardsOther && data.jobBoardsOther.trim().length > 0;
  }
  return true;
}, {
  message: 'Please specify other job boards',
  path: ['jobBoardsOther']
});

// Master schema (all steps combined)
export const onboardingSchema = basicsSchema
  .merge(locationSchema)
  .merge(resumeSchema)
  .merge(contactSchema)
  .merge(jobBoardsSchema);

// ============================================================================
// Default Values
// ============================================================================

export const defaultOnboardingData: Partial<OnboardingData> = {
  onboardingVersion: 1,
  firstName: '',
  lastName: '',
  gender: '',
  country: '',
  age: undefined,
  residencyStatus: undefined,
  resumeUploaded: false,
  preferredEmail: '',
  allowPhoneContact: false,
  jobBoards: [],
  jobBoardsConsent: false,
  stepCompleted: 0,
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the route path for a given step number
 */
export function getStepRoute(step: number): string {
  const routes = [
    '/onboarding/basics',
    '/onboarding/location',
    '/onboarding/resume',
    '/onboarding/contact',
    '/onboarding/job-boards',
    '/onboarding/review',
  ];
  return routes[step] || routes[0];
}

/**
 * Get step number from route path
 */
export function getStepFromRoute(pathname: string): number {
  if (pathname.includes('/basics')) return 0;
  if (pathname.includes('/location')) return 1;
  if (pathname.includes('/resume')) return 2;
  if (pathname.includes('/contact')) return 3;
  if (pathname.includes('/job-boards')) return 4;
  if (pathname.includes('/review')) return 5;
  return 0;
}

/**
 * Get step metadata (title, subtitle, etc.)
 */
export function getStepMetadata(step: number) {
  const metadata = [
    {
      title: 'Basic Information',
      subtitle: 'Let\'s start with the essentials',
      progress: 17,
    },
    {
      title: 'Location & Status',
      subtitle: 'Tell us where you are and your residency status',
      progress: 33,
    },
    {
      title: 'Résumé Upload',
      subtitle: 'Upload your résumé or skip for now',
      progress: 50,
    },
    {
      title: 'Contact Preferences',
      subtitle: 'How should we reach you?',
      progress: 67,
    },
    {
      title: 'Job Boards, Gmail & Consent',
      subtitle: 'Select job boards and provide Gmail access',
      progress: 83,
    },
    {
      title: 'Review & Submit',
      subtitle: 'Review your information before submitting',
      progress: 100,
    },
  ];
  return metadata[step] || metadata[0];
}

/**
 * Parse Firebase Auth displayName into firstName and lastName
 */
export function parseDisplayName(displayName: string | null): { firstName: string; lastName: string } {
  if (!displayName) return { firstName: '', lastName: '' };
  
  const parts = displayName.trim().split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  return { firstName, lastName };
}

/**
 * Validate a single step's data
 */
export function validateStep(step: number, data: any): { success: boolean; errors?: any } {
  try {
    switch (step) {
      case 0:
        basicsSchema.parse(data);
        break;
      case 1:
        locationSchema.parse(data);
        break;
      case 2:
        resumeSchema.parse(data);
        break;
      case 3:
        contactSchema.parse(data);
        break;
      case 4:
        jobBoardsSchema.parse(data);
        break;
      case 5:
        // Review step - validate all
        onboardingSchema.parse(data);
        break;
      default:
        return { success: false, errors: { _form: 'Invalid step' } };
    }
    return { success: true };
  } catch (error: any) {
    if (error.errors) {
      const formattedErrors: any = {};
      error.errors.forEach((err: any) => {
        const path = err.path.join('.');
        formattedErrors[path] = err.message;
      });
      return { success: false, errors: formattedErrors };
    }
    return { success: false, errors: { _form: error.message } };
  }
}

