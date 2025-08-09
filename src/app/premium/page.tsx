'use client';

import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function PremiumPage() {
  const { user } = useUser();
  const isPremium = Boolean(user?.publicMetadata?.isPremium);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const startCheckout = async () => {
    try {
      setLoadingCheckout(true);
      const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
      }
    } finally {
      setLoadingCheckout(false);
    }
  };

  const openPortal = async () => {
    try {
      setLoadingPortal(true);
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
      }
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Premium</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Upgrade to unlock premium features and support development.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-gray-500 mb-4">For casual use</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Access to all free tools</li>
            <li>No account required</li>
            <li>Basic usage</li>
          </ul>
        </div>
        <div className="border rounded-xl p-6 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Premium</h2>
          <p className="text-gray-500 mb-4">Subscription</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li>Advanced and upcoming features</li>
            <li>Priority improvements</li>
            <li>Support BriefUtils</li>
          </ul>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Sign in to upgrade
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {isPremium ? (
              <button onClick={openPortal} disabled={loadingPortal} className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700">
                {loadingPortal ? 'Opening…' : 'Manage subscription'}
              </button>
            ) : (
              <button onClick={startCheckout} disabled={loadingCheckout} className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
                {loadingCheckout ? 'Redirecting…' : 'Upgrade to Premium'}
              </button>
            )}
          </SignedIn>
        </div>
      </div>
    </div>
  );
}


