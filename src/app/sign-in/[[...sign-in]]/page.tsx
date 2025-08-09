'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={{ variables: { colorPrimary: '#2563eb' } }}
      />
    </div>
  );
}


