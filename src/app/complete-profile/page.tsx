"use client";
import { useRouter } from 'next/navigation';

export default function CompleteProfilePage() {
  const router = useRouter();
  return (
    <div>
      <h1>Complete Profile</h1>
      <p>Collects profile details. On submit → waitlisted → /waiting.</p>
      <button
        onClick={() => {
          // Mock profile completion - redirect to waiting
          router.replace('/waiting');
        }}
      >
        Submit Profile
      </button>
    </div>
  );
}





