'use client';

import { useEffect } from 'react';

export default function AdsterraPopunder() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Gate by env flag
    const enabled = (process.env.NEXT_PUBLIC_POPUNDER_ENABLED || '').toLowerCase() === 'true';
    const src = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_SRC;
    if (!enabled || !src) return;

    // Skip for premium users
    try {
      const user = (window as any).__clerk_user__;
      if (user?.publicMetadata?.isPremium) return;
    } catch {}

    // Ensure only one inclusion per page
    if ((window as any).__adsterra_loaded__) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src; // allow protocol-relative URL
    // Adsterra recommends sync script; we intentionally do not set async

    document.head.appendChild(script);
    (window as any).__adsterra_loaded__ = true;

    return () => {
      // Do not remove to avoid re-injection loops during client navigations
    };
  }, []);

  return null;
}


