'use client';

import AdSense from './AdSense';
import { useUser } from '@clerk/nextjs';

interface AdSidebarProps {
  slot: string;
  className?: string;
}

export default function AdSidebar({ slot, className = '' }: AdSidebarProps) {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const { user } = hasClerk ? (useUser() as any) : ({ user: null } as any);
  const isPremium = Boolean(user?.publicMetadata?.isPremium);
  if (isPremium) return null;

  return (
    <div className={`ad-sidebar ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sticky top-20">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
          Advertisement
        </div>
        <AdSense
          adSlot={slot}
          style={{ display: 'block', width: '300px', height: '600px' }}
          adFormat="vertical"
          className="mx-auto"
        />
      </div>
    </div>
  );
}