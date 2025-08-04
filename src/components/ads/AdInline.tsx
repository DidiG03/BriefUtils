'use client';

import AdSense from './AdSense';

interface AdInlineProps {
  slot: string;
  className?: string;
}

export default function AdInline({ slot, className = '' }: AdInlineProps) {
  return (
    <div className={`ad-inline my-8 ${className}`}>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Sponsored Content
          </div>
          <AdSense
            adSlot={slot}
            style={{ display: 'block' }}
            adFormat="auto"
            responsive={true}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
}