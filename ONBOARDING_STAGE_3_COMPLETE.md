# Stage 3: Step 1 - Basics Form ✅ COMPLETE

## Files Created/Updated

### New Components
1. **`src/components/GenderSelect.tsx`**
   - Custom select dropdown for gender
   - Male & Female pinned to top of list
   - 11 inclusive options (from GENDERS constant)
   - "Self-describe" option reveals custom text input
   - Features:
     - Custom styled dropdown (no default browser styling)
     - Error state styling
     - Focus states with accent color
     - Helper text for context
     - Conditional custom input field
     - Accessible labels and validation

### Updated Pages
2. **`src/app/onboarding/basics/page.tsx`**
   - Full implementation of Step 1 form
   - Features:
     - **react-hook-form** for form state management
     - **zod validation** via zodResolver
     - **Firestore integration** for data persistence
     - **Auto-prefill** from Firebase Auth displayName
     - **Resume from saved data** if user returns
     - **Save & exit** functionality
     - **Progress tracking** (sets stepCompleted = 1)
     - **Error handling** with user-friendly messages
     - **Loading states** during submission

## Form Fields

### 1. First Name
- **Type:** Text input
- **Validation:** 
  - Required
  - 1-60 characters
- **Prefill:** From Firebase Auth displayName (first word)
- **Styling:** 
  - Border changes on focus (accent color)
  - Error state (red border + message)
  - Full width, rounded corners

### 2. Last Name
- **Type:** Text input
- **Validation:**
  - Required
  - 1-60 characters
- **Prefill:** From Firebase Auth displayName (remaining words)
- **Styling:** Same as First Name

### 3. Gender
- **Type:** Custom select dropdown
- **Options:** 11 choices from GENDERS constant
  - Male (pinned)
  - Female (pinned)
  - Agender
  - Genderqueer
  - Intersex
  - Non-binary
  - Transgender Man
  - Transgender Woman
  - Two-Spirit
  - Prefer not to say
  - Self-describe (reveals text input)
- **Validation:**
  - Required
  - If "Self-describe", custom text required
- **Styling:**
  - Custom dropdown arrow
  - Helper text below
  - Conditional custom input

## Data Flow

### On Page Load:
1. Check Firebase Auth for user
2. Load existing onboarding data from Firestore
3. If data exists → prefill form
4. If no data → prefill from Auth displayName
5. User can edit all fields

### On Submit (Continue):
1. Validate form with zod schema
2. If valid:
   - Save to Firestore `users/{uid}`
   - Update fields: firstName, lastName, gender, genderCustom, name
   - Set `stepCompleted = 1`
   - Set `updatedAt` timestamp
   - Navigate to `/onboarding/location`
3. If invalid:
   - Show field-specific error messages
   - Prevent navigation

### On Save & Exit:
1. Save current form state (even if incomplete)
2. Don't validate or update stepCompleted
3. Navigate to `/dashboard`
4. User can resume later from `/onboarding`

## Firestore Schema Updates

```typescript
// users/{uid}
{
  // New fields from Step 1
  firstName: string;
  lastName: string;
  gender: string;
  genderCustom?: string | null;
  name: string; // Updated to "firstName lastName"
  
  // Progress tracking
  stepCompleted: number; // Set to 1 after Step 1
  onboardingVersion: 1;
  updatedAt: string; // ISO timestamp
  createdAt: string; // ISO timestamp (if new doc)
  
  // Existing fields preserved
  email: string;
  role: 'client';
  status: 'waitlisted' | 'active';
  // ... other fields
}
```

## Validation Rules (Zod)

```typescript
basicsSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(60, 'First name too long'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(60, 'Last name too long'),
  
  gender: z.string()
    .min(1, 'Gender is required'),
  
  genderCustom: z.string().optional(),
}).refine((data) => {
  // If "Self-describe", custom text required
  if (data.gender === 'Self-describe') {
    return data.genderCustom && data.genderCustom.trim().length > 0;
  }
  return true;
}, {
  message: 'Please describe your gender',
  path: ['genderCustom']
});
```

## User Experience Features

### ✅ Smart Prefilling
- Parses Firebase Auth `displayName` into first/last name
- Loads saved data if user returns to step
- Editable even when prefilled

### ✅ Progressive Validation
- Real-time validation on blur
- Error messages appear below fields
- Visual indicators (red border, warning icon)
- Submit button remains enabled (validates on click)

### ✅ Inclusive Gender Options
- Male & Female prominently placed
- 9 additional inclusive options
- "Self-describe" for full inclusivity
- Helper text explains purpose

### ✅ Save & Resume
- "Save & exit" link always visible
- Partial progress saved
- Resume from last position
- No data loss

### ✅ Loading States
- Submit button shows spinner
- "Loading..." text during save
- Button disabled while processing
- Prevents double-submission

## Testing Checklist

### ✅ Form Functionality
- [ ] Visit `/onboarding` → redirects to `/onboarding/basics`
- [ ] Fields prefill from Firebase Auth displayName
- [ ] Can edit all fields
- [ ] Gender dropdown shows all 11 options
- [ ] "Self-describe" reveals custom input
- [ ] Validation errors show on empty submit
- [ ] Valid data saves to Firestore
- [ ] Navigate to `/onboarding/location` on success
- [ ] "Save & exit" saves partial data
- [ ] Return to step shows saved data

### ✅ Validation
- [ ] Empty first name → error
- [ ] Empty last name → error
- [ ] No gender selected → error
- [ ] "Self-describe" without text → error
- [ ] Valid data → no errors

### ✅ Firestore
- [ ] Check `users/{uid}` document created/updated
- [ ] `firstName`, `lastName`, `gender` saved
- [ ] `name` updated to full name
- [ ] `stepCompleted` set to 1
- [ ] `updatedAt` timestamp updated

## Build & Deploy Status

✅ **Build successful**
- TypeScript compilation: ✅
- Linting: ✅ No errors
- All routes compile: ✅
- Bundle size: Optimized

✅ **Deployed to Firebase**
- URL: https://pyro-webapp-cfd1b.web.app
- Onboarding: https://pyro-webapp-cfd1b.web.app/onboarding
- Step 1: https://pyro-webapp-cfd1b.web.app/onboarding/basics

## Next Steps (Stage 4)

Ready to build:
- **Step 2: Location & Status**
  - Country select (searchable, 195 countries)
  - Age input (16-100)
  - Residency status (6 options)
  - Dynamic residency alias (country-specific)
  - Conditional visa type field
  - Form validation + Firestore save

---

**Status:** ✅ Step 1 (Basics) fully implemented and deployed
**Form:** First Name, Last Name, Gender with validation
**Data:** Saves to Firestore with progress tracking
**UX:** Prefilling, validation, save & resume
**Ready for:** Stage 4 - Step 2 (Location & Status)






