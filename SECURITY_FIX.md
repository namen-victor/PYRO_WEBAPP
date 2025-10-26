# 🔒 SECURITY FIX - Exposed API Keys

## ⚠️ CRITICAL ISSUE DISCOVERED

Your API keys were **EXPOSED** in the public GitHub repository. This is a serious security breach.

## What Was Exposed

1. **Brevo API Key** - Found in `src/lib/brevo.ts` (Hardcoded)
2. **Firebase API Keys** - Found in `src/lib/firebase.ts` (Hardcoded fallback values)

## 🚨 IMMEDIATE ACTION REQUIRED

### 1. **ROTATE YOUR COMPROMISED API KEYS**

#### Brevo API Key
1. Go to: https://app.brevo.com/settings/keys/api
2. Click on your existing API key
3. Click "Delete" or "Revoke"
4. Create a new API key
5. Update Firebase Secret Manager:
   ```bash
   echo -n "YOUR_NEW_KEY" | firebase functions:secrets:set BREVO_API_KEY
   ```

#### Firebase Keys
- Your Firebase project is already compromised
- Consider creating a new Firebase project
- Or monitor for unauthorized usage

### 2. **Update Your Local Environment**

Create a `.env.local` file in the root directory:

```bash
# Copy from env.example
cp env.example .env.local
```

Then edit `.env.local` with your **new** credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZl7XUwQ85FaNb1aOzvSvHfE8X1mIBoQ4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pyro-webapp-cfd1b.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pyro-webapp-cfd1b
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pyro-webapp-cfd1b.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=427820106971
NEXT_PUBLIC_FIREBASE_APP_ID=1:427820106971:web:64579e22143e2ea886f8fe
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-K9Q5G0SZER
```

### 3. **What We Fixed**

✅ Removed hardcoded Brevo API key from `src/lib/brevo.ts`
✅ Removed hardcoded Firebase keys from `src/lib/firebase.ts`
✅ Created `env.example` as a template
✅ Updated `.gitignore` to exclude `.env.local`

### 4. **NEVER DO THIS AGAIN**

❌ **DON'T** hardcode API keys in source files
❌ **DON'T** commit `.env.local` to git
❌ **DON'T** put secrets in public repositories

✅ **DO** use environment variables
✅ **DO** use Firebase Secret Manager for server-side keys
✅ **DO** create an `env.example` file with placeholders
✅ **DO** rotate keys immediately after exposure

### 5. **Check Your Git History**

You may need to rewrite git history to remove the exposed keys:

```bash
# Use git filter-branch or BFG Repo Cleaner to remove secrets from history
# Or simply force-push with new commits that fix the issue
```

### 6. **Monitor for Unauthorized Access**

- Check Firebase Console for unusual activity
- Check Brevo dashboard for email sending activity
- Monitor your website for unusual traffic

## Next Steps

1. ✅ **Rotate all compromised API keys** (Brevo, Firebase)
2. ✅ Create `.env.local` with new credentials
3. ✅ Commit these security fixes
4. ✅ Update Firebase Functions with new Brevo key
5. ✅ Deploy updated code
6. ⚠️ Consider creating a new Firebase project

## Current Status

- **Risk Level**: 🔴 CRITICAL
- **Keys Exposed**: ✅ YES
- **Keys Rotated**: ⏳ PENDING (YOU NEED TO DO THIS)
- **Code Fixed**: ✅ YES (waiting for deployment)

