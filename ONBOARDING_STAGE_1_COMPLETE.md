# Stage 1: Foundation & Data Model ✅ COMPLETE

## Files Created

### Constants
1. **`src/lib/constants/countries.ts`**
   - 195 countries (UN members + observers)
   - Alphabetically sorted
   - TypeScript const assertion for type safety

2. **`src/lib/constants/genders.ts`**
   - Male & Female pinned to top
   - 11 inclusive options including "Self-describe"
   - Allows custom string for self-description

3. **`src/lib/constants/job-boards.ts`**
   - 47 job boards covering:
     - Global platforms (LinkedIn, Indeed, etc.)
     - Remote-first (Remote OK, We Work Remotely)
     - Regional (UK, EU, North America, AU/NZ, India, MENA)
     - Nigeria emphasis (Jobberman, HotNigerianJobs, MyJobMag, Jobzilla)
     - Tech/niche (Otta, Hacker News)
     - "Other" option for custom boards

4. **`src/lib/constants/index.ts`**
   - Clean re-export of all constants

### Core Logic
5. **`src/lib/residency-alias.ts`**
   - Maps "Permanent Resident" to country-specific terms
   - Examples: Green Card (US), ILR (UK), PR (Canada/AU/NZ)
   - Covers major regions (EU, Africa, etc.)

6. **`src/lib/onboarding.ts`** (Main file)
   - **TypeScript Types:**
     - `ResidencyStatus` enum
     - `OnboardingData` interface (complete schema)
   
   - **Zod Validation Schemas:**
     - `basicsSchema` (Step 1)
     - `locationSchema` (Step 2)
     - `resumeSchema` (Step 3)
     - `contactSchema` (Step 4)
     - `jobBoardsSchema` (Step 5)
     - `onboardingSchema` (master schema)
   
   - **Helper Functions:**
     - `getStepRoute(step)` - Convert step number to route
     - `getStepFromRoute(pathname)` - Convert route to step number
     - `getStepMetadata(step)` - Get title, subtitle, progress %
     - `parseDisplayName(name)` - Split Firebase displayName
     - `validateStep(step, data)` - Validate individual step data
   
   - **Default Values:**
     - `defaultOnboardingData` - Initial state for new users

## Packages Installed
- ✅ `zod@4.1.12` - Schema validation
- ✅ `react-hook-form@7.65.0` - Form state management
- ✅ `@hookform/resolvers@5.2.2` - Zod integration for react-hook-form

## Data Model (Firestore Schema)

```typescript
interface OnboardingData {
  onboardingVersion: 1;
  
  // Step 1 – Basics
  firstName: string;
  lastName: string;
  gender: string;
  genderCustom?: string;
  
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
  
  // Step 5 – Job Boards & Consent
  jobBoards: string[];
  jobBoardsOther?: string;
  jobBoardsConsent: boolean;
  
  // System
  stepCompleted: number; // 0..6
  createdAt: string;
  updatedAt: string;
}
```

## Validation Rules

### Step 1 (Basics)
- First name: 1-60 chars, required
- Last name: 1-60 chars, required
- Gender: required; if "Self-describe", custom text required

### Step 2 (Location & Status)
- Country: must be from COUNTRIES list
- Age: integer, 16-100
- Residency status: required
- Visa type: required if work_visa_holder, student, or temporary_other

### Step 3 (Résumé)
- Optional step (no required fields)
- If uploaded: must be PDF, max 10MB

### Step 4 (Contact)
- Preferred email: valid email format
- Phone: required if allowPhoneContact is true

### Step 5 (Job Boards)
- At least 1 job board selected
- If "Other" selected, jobBoardsOther text required
- Consent checkbox must be true

## Step Metadata

| Step | Route | Title | Progress |
|------|-------|-------|----------|
| 0 | `/onboarding/basics` | Basic Information | 17% |
| 1 | `/onboarding/location` | Location & Status | 33% |
| 2 | `/onboarding/resume` | Résumé Upload | 50% |
| 3 | `/onboarding/contact` | Contact Preferences | 67% |
| 4 | `/onboarding/job-boards` | Job Boards & Consent | 83% |
| 5 | `/onboarding/review` | Review & Submit | 100% |

## Next Steps (Stage 2)

Ready to build:
- Layout with stepper UI
- Progress bar component
- Step shell component
- Routing logic

---

**Status:** ✅ Foundation complete and ready for Stage 2
**No linting errors:** All files pass TypeScript checks







