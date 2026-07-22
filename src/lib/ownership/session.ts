const STORAGE_KEY = "mldx:ownership:reg";

/**
 * Simulated vehicle lookup — there's no real DVLA/backend behind this
 * prototype. Every registration "finds" the brand's mock vehicle, except
 * this one deliberately-unrealistic value (no real UK plate looks like
 * this), which demonstrates the not-found state for usability testing.
 */
export const NOT_FOUND_REG = "NOTFOUND";

export type LookupStatus = "found" | "not-found";

export interface StoredLookup {
  reg: string;
  status: LookupStatus;
}

function normalizeReg(reg: string): string {
  return reg.trim().toUpperCase().replace(/\s+/g, "");
}

export function lookupReg(reg: string): StoredLookup {
  const normalized = normalizeReg(reg);
  return {
    reg: reg.trim().toUpperCase(),
    status: normalized === NOT_FOUND_REG ? "not-found" : "found",
  };
}

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedSnapshot: StoredLookup | null = null;

/**
 * useSyncExternalStore requires getSnapshot to return a referentially
 * stable value when nothing changed, so this only re-parses when the raw
 * sessionStorage string actually differs from what we last saw.
 */
function computeSnapshot(): StoredLookup | null {
  let raw: string | null;
  try {
    raw = window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  try {
    cachedSnapshot = raw ? (JSON.parse(raw) as StoredLookup) : null;
  } catch {
    cachedSnapshot = null;
  }
  return cachedSnapshot;
}

export function getLookupSnapshot(): StoredLookup | null {
  return computeSnapshot();
}

export function getServerLookupSnapshot(): StoredLookup | null {
  return null;
}

export function subscribeToLookup(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function writeStoredLookup(lookup: StoredLookup | null): void {
  if (typeof window === "undefined") return;
  try {
    if (lookup) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lookup));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — lookup just
    // won't persist across navigation, which is a fine degradation.
  }
  listeners.forEach((listener) => listener());
}
