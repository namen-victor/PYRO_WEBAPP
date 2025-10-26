# Role-Based Access Control (RBAC)

This document defines the access control matrix for the PyroSolutions Inc. platform.

## Overview

The platform has three primary roles:
- **Client**: End users who receive job application services
- **Staff**: Employees who manage client applications
- **Admin**: Administrators with full system access

## Access Control Matrix

### Firestore Collections

| Collection     | Resource          | Client | Staff | Admin | Notes                           |
|-------------- |------------------|--------|-------|-------|----------------------------------|
| `users`       | `{userId}` (own)  | R/W    | R/W   | R/W   | Users can update their own data  |
| `users`       | All documents     | -      | R     | R/W   | Staff can read, Admin can write  |
| `applications`| Own              | R      | R/W   | R/W   | Client sees own, Staff manages   |
| `applications`| All              | -      | R/W   | R/W   | Staff and Admin see all           |
| `notifications`| Own             | R/W    | R     | R/W   | Users receive notifications       |
| `notifications`| All             | -      | R     | R/W   | Staff can read, Admin manages     |
| `onboarding`  | Own              | R/W    | R     | R/W   | Client completes own onboarding  |
| `chats`       | Own conversations | R/W   | R/W   | R/W   | Users can chat with assigned Staff|

**Legend**: R = Read, W = Write, - = No access

### Page Routes

| Route                    | Client | Staff | Admin | Unauthenticated | Notes                          |
|-------------------------|--------|-------|-------|-----------------|--------------------------------|
| `/` (Home)              | ✓      | ✓     | ✓     | ✓               | Public landing page            |
| `/about`                 | ✓      | ✓     | ✓     | ✓               | Public                      |
| `/pricing`               | ✓      | ✓     | ✓     | ✓               | Public pricing page            |
| `/contact`               | ✓      | ✓     | ✓     | ✓               | Public contact form            |
| `/login`                 | ✓      | ✓     | ✓     | ✓               | Authentication required         |
| `/signup`                | ✓      | -     | -     | ✓               | New client registration        |
| `/dashboard`             | ✓      | -     | -     | -               | Client's main dashboard        |
| `/staff/dashboard`       | -      | ✓     | ✓     | -               | Staff management dashboard     |
| `/staff/applications`    | -      | ✓     | ✓     | -               | Staff application management  |
| `/staff/chat`            | -      | ✓     | ✓     | -               | Staff client communication     |
| `/admin/dashboard`       | -      | -     | ✓     | -               | Admin analytics dashboard      |
| `/admin/clients`         | -      | -     | ✓     | -               | Admin client management        |
| `/onboarding/*`          | ✓      | -     | ✓     | -               | Client onboarding flow         |

**Legend**: ✓ = Allowed, - = Denied/Redirected

### UI Component Access

Certain UI components and features are conditionally rendered based on role:

| Feature                   | Client | Staff | Admin | Notes                                   |
|---------------------------|--------|-------|-------|-----------------------------------------|
| Application submissions   | -      | ✓     | ✓     | Only staff creates applications         |
| View all clients          | -      | ✓     | ✓     | Staff/Admin can manage clients          |
| User role management      | -      | -     | ✓     | Only Admin can change user roles        |
| Application tracking       | ✓      | ✓     | ✓     | All auth users can track                |
| Chat with staff/client     | ✓      | ✓     | ✓     | Staff-Client communication             |
| View analytics/reports     | -      | -     | ✓     | Admin-only dashboard metrics            |
| Upload applications (CSV) | -      | -     | ✓     | Admin-only bulk upload                   |

## Security Enforcement

### Client-Side Protection
- Route guards in `src/middleware.ts` check authentication before rendering
- Client-side checks in individual page components (`useEffect` hooks)
- Conditional rendering based on `user.role` from Firebase Auth

### Server-Side Protection
- Firestore Security Rules enforce database-level access
- Functions enforce role checks before data access
- Middleware intercepts requests before pages load

### Defense in Depth Strategy

1. **Client-Side** (UI): Redirect unauthorized users immediately
2. **Server-Side** (Middleware): Block unauthorized requests at edge
3. **Database** (Firestore Rules): Enforce access at data layer
4. **Functions** (Cloud Functions): Validate permissions in business logic

## Testing Access Control

See `firestore.rules.test.js` for automated tests of Firestore security rules.

To test manually:
1. Login as each role type (client, staff, admin)
2. Attempt to access protected routes
3. Verify redirects and error messages
4. Test CRUD operations on different collections

## Common Access Scenarios

### Client Journey
1. Signs up → Creates `users/{userId}` document
2. Completes onboarding → Updates `onboarding/{userId}`
3. Gets assigned staff → `users/{userId}.assignedStaffId` populated
4. Can chat with staff → Access to `chats/{conversationId}`
5. Receives applications → Reads `applications` where `userId == self`

### Staff Journey
1. Can view all clients → Reads `users/*`
2. Can create applications → Writes to `applications` collection
3. Can chat with assigned clients → Access to relevant `chats/*`
4. Can track all applications → Reads `applications` where assigned
5. Cannot modify user roles → No write access to `users/{userId}.role`

### Admin Journey
1. Full access to all collections → R/W on `users`, `applications`, etc.
2. Can manage user roles → Writes to `users/{userId}.role`
3. Can upload CSV of applications → Writes to `applications`
4. Can view all analytics → Reads aggregated data
5. Can manage system-wide settings → Access to `settings` collection

## Role Escalation Prevention

The following measures prevent unauthorized role escalation:

1. **Firestore Rules**: No user can write `users/{userId}.role` except Admin
2. **Middleware**: Redirects based on token claims, not database data
3. **Client Components**: Re-checks role on every render
4. **Functions**: Server-side validation before sensitive operations

## Updating Access Control

When adding new features:

1. Define access requirements in this document
2. Update Firestore security rules (`firestore.rules`)
3. Add route guards to middleware (`src/middleware.ts`)
4. Update UI components with conditional rendering
5. Add tests to `firestore.rules.test.js`
6. Update this document

## References

- `firestore.rules` - Database security rules
- `src/middleware.ts` - Route protection middleware
- `src/lib/auth.ts` - Authentication utilities
- `firestore.rules.test.js` - Automated security tests

