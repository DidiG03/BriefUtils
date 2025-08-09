export type PopunderConfig = {
  enabled: boolean;
  url: string | null;
  maxPerDay: number;
  minIntervalMinutes: number;
};

export const getPopunderConfig = (): PopunderConfig => {
  const enabled = (process.env.NEXT_PUBLIC_POPUNDER_ENABLED || '').toLowerCase() === 'true';
  const url = process.env.NEXT_PUBLIC_POPUNDER_URL || null;
  const maxPerDay = Number(process.env.NEXT_PUBLIC_POPUNDER_MAX_PER_DAY || 2);
  const minIntervalMinutes = Number(process.env.NEXT_PUBLIC_POPUNDER_MIN_INTERVAL_MINUTES || 60);
  return { enabled, url, maxPerDay, minIntervalMinutes };
};

export const isPremiumUserClient = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clerkUser = (window as any).__clerk_user__;
    return Boolean(clerkUser?.publicMetadata?.isPremium);
  } catch {
    return false;
  }
};

const STORAGE_KEY = 'tt_popunder_events_v1';

type PopStore = {
  timestamps: number[]; // unix ms
};

const readStore = (): PopStore => {
  if (typeof window === 'undefined') return { timestamps: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { timestamps: [] };
    const parsed = JSON.parse(raw) as PopStore;
    return { timestamps: Array.isArray(parsed.timestamps) ? parsed.timestamps : [] };
  } catch {
    return { timestamps: [] };
  }
};

const writeStore = (store: PopStore) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
};

export const shouldOpenPopunder = (config: PopunderConfig): boolean => {
  if (typeof window === 'undefined') return false;
  if (!config.enabled || !config.url) return false;
  if (isPremiumUserClient()) return false;

  const now = Date.now();
  const store = readStore();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const recent = store.timestamps.filter((t) => t > oneDayAgo);

  if (recent.length >= config.maxPerDay) return false;

  if (recent.length > 0) {
    const last = Math.max(...recent);
    const minutesSinceLast = (now - last) / 60000;
    if (minutesSinceLast < config.minIntervalMinutes) return false;
  }

  return true;
};

export const recordPopunder = () => {
  if (typeof window === 'undefined') return;
  const store = readStore();
  store.timestamps = [...store.timestamps, Date.now()].slice(-20);
  writeStore(store);
};


