/**
 * Lets the nav menu restart the Help Me Choose flow when the customer picks
 * it while already part-way through it. The whole flow lives in
 * HelpMeChooseFlow's own React state, so a same-route navigation doesn't
 * remount it and nothing would otherwise reset — this is the signal that
 * does, following the same tiny-listener-set pattern as
 * src/lib/header/visibility.ts.
 */
const listeners = new Set<() => void>();

export function requestHelpMeChooseRestart(): void {
  listeners.forEach((listener) => listener());
}

export function onHelpMeChooseRestart(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
