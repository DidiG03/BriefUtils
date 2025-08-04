'use client';

import { useEffect } from 'react';
import { AD_CONFIG, shouldShowAds, trackAdInteraction } from '@/lib/ads';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' }, 
  className = '',
  responsive = true 
}: AdSenseProps) {
  useEffect(() => {
    if (!shouldShowAds()) return;
    
    try {
      // Check if AdSense script is loaded
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        trackAdInteraction(adSlot, 'loaded');
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adSlot]);

  // Don't render ads if disabled
  if (!shouldShowAds()) {
    return (
      <div className={`adsense-placeholder ${className}`} style={style}>
        <div className="bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm p-4">
          Ad Placeholder ({adSlot})
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={AD_CONFIG.PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}