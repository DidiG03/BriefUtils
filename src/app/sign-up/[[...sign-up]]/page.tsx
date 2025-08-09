'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{ variables: { colorPrimary: '#2563eb' } }}
      />
    </div>
  );
}


