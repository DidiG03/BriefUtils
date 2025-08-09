import { getPopunderConfig, shouldOpenPopunder, recordPopunder } from '@/lib/monetization';
import { useCallback } from 'react';

export function usePopunder() {
  const triggerPopunder = useCallback(() => {
    if (typeof window === 'undefined') return;
    const config = getPopunderConfig();
    if (!shouldOpenPopunder(config)) return;

    try {
      const win = window.open(
        config.url!,
        '_blank',
        'noopener,noreferrer'
      );
      if (win) {
        recordPopunder();
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return { triggerPopunder };
}


