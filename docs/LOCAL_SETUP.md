# Local Development Setup

## Prerequisites

- Node.js 18+ (recommend 20 LTS)
- Firebase CLI: `npm install -g firebase-tools`
- Git

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/namen-victor/PYRO_WEBAPP.git
cd PYRO_WEBAPP
npm install

# 2. Set up environment variables
cp env.example .env.local
# Edit .env.local with your Firebase credentials

# 3. Run development server
npm run dev
# Open http://localhost:3000
```

## Environment Variables

Create `.env.local` from `env.example`:

```bash
cp env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase Web API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Google Analytics measurement ID

Optional:
- `NEXT_PUBLIC_BREVO_API_KEY` - Brevo API key (for local email testing)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Firebase Setup

### 1. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `pyro-webapp-cfd1b`
3. Go to Project Settings (gear icon)
4. Scroll to "Your apps" → Web apps
5. Copy the config values to `.env.local`

### 2. Firebase Emulators (Optional)

Run local Firebase emulators for testing:

```bash
npm run emulators
```

This starts:
- Auth Emulator (localhost:9099)
- Firestore Emulator (localhost:8080)
- Functions Emulator (localhost:5001)

### 3. Deploy Functions (Production Only)

```bash
cd functions
npm install
firebase deploy --only functions
```

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server (after build)
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run emulators    # Start Firebase emulators
```

## Common Issues

### "Firebase config not found"

**Solution**: Make sure `.env.local` exists and contains all required Firebase variables.

### "Module not found" errors

**Solution**: Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

### Brevo emails not sending

**Solution**: 
- For local dev: Add `NEXT_PUBLIC_BREVO_API_KEY` to `.env.local`
- For production: Brevo key is in Firebase Secret Manager

### Build fails with TypeScript errors

**Solution**: TypeScript strict checking is disabled in production builds. To see all errors:
```bash
npm run typecheck
```

## Project Structure

```
/Users/bukola/Projects/PYRO_WEBAPP/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # Reusable React components
│   ├── lib/             # Utilities & Firebase config
│   └── middleware.ts    # Route protection
├── functions/           # Firebase Cloud Functions
├── public/             # Static assets
├── firestore.rules     # Firestore security rules
├── firebase.json       # Firebase config
└── .env.local          # Local environment (git-ignored)
```

## Next Steps

1. Review [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines
2. Check [docs/RBAC.md](./RBAC.md) for role-based access control
3. See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for production deployment

