// Ad slot configuration
export const AD_SLOTS = {
  // Header banner ads
  HEADER_BANNER: '1234567890',
  
  // Homepage ads
  HOME_HERO_BANNER: '2345678901', 
  HOME_FEATURES_INLINE: '3456789012',
  HOME_CTA_BANNER: '4567890123',
  
  // Tool page ads
  TOOL_TOP_BANNER: '5678901234',
  TOOL_SIDEBAR: '6789012345',
  TOOL_BOTTOM_BANNER: '7890123456',
  TOOL_INLINE: '8901234567',
  
  // Footer and general
  FOOTER_BANNER: '9012345678',
  SIDEBAR_SQUARE: '0123456789',
  
  // Tools listing page
  TOOLS_LIST_TOP: '1234567891',
  TOOLS_LIST_GRID: '2345678902',
  
  // About page
  ABOUT_TOP: '3456789013',
  ABOUT_BOTTOM: '4567890124',
} as const;

// Ad configuration
export const AD_CONFIG = {
  PUBLISHER_ID: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '',
  ENABLED: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SHOW_ADS === 'true',
  AUTO_ADS: (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_SHOW_ADS === 'true') && process.env.NEXT_PUBLIC_ENABLE_AUTO_ADS !== 'false',
} as const;

// Ad sizes for different placements
export const AD_SIZES = {
  BANNER: { width: '728px', height: '90px' },
  LEADERBOARD: { width: '970px', height: '250px' },
  RECTANGLE: { width: '300px', height: '250px' },
  LARGE_RECTANGLE: { width: '336px', height: '280px' },
  SKYSCRAPER: { width: '300px', height: '600px' },
  MOBILE_BANNER: { width: '320px', height: '100px' },
} as const;

// Check if ads should be displayed
export const shouldShowAds = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Don't show ads if no publisher ID is set
  if (!AD_CONFIG.PUBLISHER_ID) {
    return false;
  }
  
  // Don't show ads in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SHOW_ADS !== 'true') {
    return false;
  }
  
  return AD_CONFIG.ENABLED;
};

// Analytics tracking for ad interactions
export const trackAdInteraction = (adSlot: string, action: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ad_interaction', {
      ad_slot: adSlot,
      action: action,
      event_category: 'advertising',
    });
  }
};