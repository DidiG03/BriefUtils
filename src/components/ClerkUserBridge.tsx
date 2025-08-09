'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function ClerkUserBridge() {
  const { user } = useUser();

  useEffect(() => {
    try {
      // Expose only minimal info needed for client feature toggles
      (window as any).__clerk_user__ = user
        ? { id: user.id, publicMetadata: user.publicMetadata }
        : null;
    } catch {}
  }, [user]);

  return null;
}


