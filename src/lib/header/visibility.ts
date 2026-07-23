/**
 * Cross-component signal for whether SiteHeader is currently hidden
 * (scrolled away). Page-level sticky bars (e.g. ModelStickyNav) read this
 * so they can slide up and close the gap the header leaves behind, since
 * they live in a different part of the tree and can't just take a prop.
 */
const listeners = new Set<() => void>();
let hidden = false;

export function getHeaderHiddenSnapshot(): boolean {
  return hidden;
}

export function getServerHeaderHiddenSnapshot(): boolean {
  return false;
}

export function setHeaderHidden(next: boolean): void {
  if (next === hidden) return;
  hidden = next;
  listeners.forEach((listener) => listener());
}

export function subscribeToHeaderHidden(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
