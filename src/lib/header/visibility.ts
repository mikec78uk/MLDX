/**
 * The site header's scroll-hide state is expressed as the `--header-hidden-shift`
 * CSS custom property (declared in globals.css) rather than React state, so
 * the header and any sticky bar below it (e.g. ModelStickyNav) — which live
 * in different parts of the component tree — shift by the exact same value
 * in the exact same paint. Two separate React trees re-rendering off a
 * shared store can (in principle) land a render apart; writing straight to
 * the DOM can't.
 */
export function setHeaderHidden(next: boolean): void {
  document.documentElement.style.setProperty(
    "--header-hidden-shift",
    next ? "calc(var(--header-height) * -1)" : "0px",
  );
}
