# PyroSolutions Inc. WebApp

A full-stack job application automation platform that helps job seekers get noticed and hired.

## 🌟 Features

- **Automated Job Applications**: We apply to jobs for you every weekday in your target location
- **4-Step Application Process**: Simple, streamlined onboarding experience
- **Real-time Tracking**: Monitor application progress in real-time
- **Multi-Role Support**: Client, Staff, and Admin dashboards
- **Secure Authentication**: Firebase Authentication with role-based access control
- **Contact Form**: Functional contact form with email notifications
- **Social Media Integration**: Beautiful Open Graph and Twitter Card meta tags
- **Responsive Design**: Mobile-first, fully responsive across all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Backend**: Firebase (Authentication, Firestore, Hosting, Functions)
- **Email**: Brevo (Sendinblue) for transactional emails
- **Styling**: CSS Modules, Tailwind CSS (where applicable)
- **Deployment**: Firebase Hosting

## 📁 Project Structure

```
/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/        # Reusable React components
│   ├── lib/              # Utilities and helpers
│   └── dataconnect-generated/  # Firebase Data Connect types
├── functions/            # Firebase Cloud Functions
├── public/              # Static assets
│   ├── company-logos/   # Partner company logos
│   └── doodles/         # Landing page decorative SVGs
├── dataconnect/         # Firebase Data Connect schema
├── firestore.rules      # Firestore security rules
└── firebase.json        # Firebase configuration
```

## 🔑 Key Pages

- **Landing Page** (`/`): Main marketing page with 4-step process and hero section
- **Contact** (`/contact`): Functional contact form with email notifications
- **Guarantee** (`/guarantee`): Coverage & Visibility Promise page
- **Onboarding** (`/onboarding/*`): Multi-step onboarding flow
- **Dashboard** (`/dashboard`): Client dashboard
- **Admin** (`/admin/*`): Admin panel
- **Staff** (`/staff/*`): Staff dashboard

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase CLI

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Functions Setup

Set up the Brevo API key as a secret:

```bash
cd functions
echo -n "your_brevo_api_key" | firebase functions:secrets:set BREVO_API_KEY
```

### Build

```bash
npm run build
```

### Deploy

```bash
firebase deploy
```

## 🔐 Security

- Role-based access control (Client, Staff, Admin)
- Firestore security rules
- Firebase Authentication
- Environment variables for sensitive data
- Brevo API key stored in Firebase Secret Manager

## 📧 Contact Form

The contact form sends emails to `pyrosolutionsinc@gmail.com` using Firebase Cloud Functions and Brevo.

## 🎨 Design System

- **Colors**: Defined in `src/app/globals.css`
- **Typography**: Custom font stack with fallbacks
- **Responsive**: Mobile-first breakpoints
- **Components**: Reusable components in `src/components/`

## 📝 License

Private repository - All rights reserved

## 👥 Contact

Email: pyrosolutionsinc@gmail.com  
Website: https://www.pyrosolutionsinc.com

