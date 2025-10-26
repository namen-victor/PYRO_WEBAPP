import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export type Role = 'admin' | 'staff' | 'client';
export type Status = 'pendingProfile' | 'waitlisted' | 'active';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: Role;
  status: Status;
  resumeUrl?: string;
  resumeUploaded?: boolean;
}

// Firebase Auth helpers
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string, firstName: string, lastName: string) {
  // Create Firebase Auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;
  
  // Create Firestore user document with pendingProfile status (needs to complete onboarding)
  await setDoc(doc(db, 'users', uid), {
    email,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    role: 'client',
    status: 'pendingProfile',
    stepCompleted: 0,
    resumeUploaded: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  // Send Firebase's default email verification to the client
  try {
    await sendEmailVerification(userCredential.user);
    console.log('Firebase verification email sent successfully to:', email);
    console.log('Check your inbox for email from Pyrosolutionsinc@gmail.com');
  } catch (e) {
    console.error('Failed to send Firebase verification email:', e);
    throw new Error('Failed to send verification email. Please try again.');
  }
  
  // Admin notifications removed per user request
  
  return userCredential;
}

export async function logout() {
  return signOut(auth);
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return null;
    const data = userDoc.data();
    return {
      uid,
      email: data.email,
      name: data.name,
      role: data.role,
      status: data.status,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Update user status (admin only)
export async function updateUserStatus(uid: string, status: Status) {
  try {
    await updateDoc(doc(db, 'users', uid), { status });
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
}

// Auth state listener
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    console.log('Firebase auth state changed:', firebaseUser);
    if (firebaseUser) {
      console.log('Getting user profile for:', firebaseUser.uid);
      const user = await getUserProfile(firebaseUser.uid);
      console.log('User profile from Firestore:', user);
      callback(user);
    } else {
      console.log('No Firebase user, calling callback with null');
      callback(null);
    }
  });
}

// Check if user email is verified
export function isEmailVerified(): boolean {
  return auth.currentUser?.emailVerified || false;
}

// Get current Firebase user
export function getCurrentUser() {
  return auth.currentUser;
}

