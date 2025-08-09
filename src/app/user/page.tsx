'use client';

import { UserProfile } from '@clerk/nextjs';

export default function UserPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <UserProfile appearance={{ variables: { colorPrimary: '#2563eb' } }} />
    </div>
  );
}


