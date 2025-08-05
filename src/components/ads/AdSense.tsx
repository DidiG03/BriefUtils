'use client';

import { useEffect, useState } from 'react';
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
  const [isClient, setIsClient] = useState(false);
  const [showAds, setShowAds] = useState(false);

  useEffect(() => {
    // Set client-side state after hydration
    setIsClient(true);
    setShowAds(shouldShowAds());
  }, []);

  useEffect(() => {
    if (!isClient || !showAds) return;
    
    const initAd = () => {
      try {
        // Check if AdSense script is loaded
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          // Only push if auto ads are disabled or manual ads are explicitly enabled
          if (!AD_CONFIG.AUTO_ADS || AD_CONFIG.USE_MANUAL_ADS) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            trackAdInteraction(adSlot, 'loaded');
          } else {
            // For auto ads, just track the ad slot
            trackAdInteraction(adSlot, 'auto_ad_slot');
          }
        } else {
          // Retry if script not loaded yet
          setTimeout(initAd, 100);
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };
    
    // Delay initialization to avoid conflicts
    setTimeout(initAd, 50);
  }, [adSlot, isClient, showAds]);

  // Always render placeholder during SSR and when ads are disabled
  if (!isClient || !showAds) {
    return (
      <div className={`adsense-placeholder ${className}`} style={style}>
        <div className="bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm p-4">
          {!isClient ? 'Loading...' : `Ad Placeholder (${adSlot})`}
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