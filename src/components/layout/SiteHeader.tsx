"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { BrandConfig } from "@/lib/brand";
import {
  getLookupSnapshot,
  getServerLookupSnapshot,
  subscribeToLookup,
} from "@/lib/ownership/session";
import { setHeaderHidden } from "@/lib/header/visibility";
import { getNavigation } from "@/data/navigation";
import { NavigationMenu } from "@/components/layout/NavigationMenu";
import {
  ArrowRightIcon,
  CloseIcon,
  LocationIcon,
  MenuIcon,
  UserIcon,
} from "@/components/icons";

/** How far you need to scroll before the header solidifies. */
const SCROLL_THRESHOLD = 80;

/** Always shown below this scroll depth, regardless of direction. */
const REVEAL_OFFSET = 80;
/** Ignore sub-pixel/jitter scroll deltas so it doesn't flicker. */
const HIDE_DELTA = 8;

/**
 * "Find a Dealer", "Sign In" and "Configure Yours" have no real
 * destinations yet — rendered as real-looking but inert controls, matching
 * the pattern already used for undetermined links elsewhere.
 */
export function SiteHeader({ brand }: { brand: BrandConfig }) {
  const pathname = usePathname();
  // Coupling the shared header to the ownership lookup store is a
  // deliberate one-off: the ownership hero is the only place the header
  // needs to go transparent-over-image, and it's the only page with a
  // dark full-bleed hero directly under it. Revisit if a second page
  // needs the same treatment.
  const lookup = useSyncExternalStore(
    subscribeToLookup,
    getLookupSnapshot,
    getServerLookupSnapshot,
  );
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const hasTransparentHero = pathname === "/ownership" && lookup?.status !== "found";

  useEffect(() => {
    if (!hasTransparentHero) return;
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasTransparentHero]);

  // Hides on scroll-down, reappears on scroll-up — independent of the
  // transparent-hero colour logic above, so it applies on every page.
  useEffect(() => {
    let lastY = window.scrollY;
    let isHidden = false;

    function apply(next: boolean) {
      if (next === isHidden) return;
      isHidden = next;
      setHidden(next);
      setHeaderHidden(next);
    }

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      if (currentY <= REVEAL_OFFSET) {
        apply(false);
      } else if (delta > HIDE_DELTA) {
        apply(true);
      } else if (delta < -HIDE_DELTA) {
        apply(false);
      }
      lastY = currentY;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      setHeaderHidden(false);
    };
  }, []);

  const transparent = hasTransparentHero && !scrolled && !menuOpen;
  const navigation = getNavigation(brand.id, brand.name);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-transform duration-300 motion-reduce:transition-none ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`border-b transition-colors duration-300 ${
            transparent
              ? "border-white/15 bg-transparent"
              : "border-[var(--color-border)] bg-[var(--color-paper-muted)]"
          }`}
        >
          <div className="mx-auto flex h-[29px] max-w-6xl items-center justify-end gap-6 px-6">
            <button
              type="button"
              className={`cta-label flex items-center gap-1.5 whitespace-nowrap text-[11px] transition-opacity hover:opacity-70 ${
                transparent ? "text-white" : "text-[var(--color-ink)]"
              }`}
            >
              <LocationIcon className="h-3.5 w-3.5" />
              Find a Dealer
            </button>
            <button
              type="button"
              className={`cta-label flex items-center gap-1.5 whitespace-nowrap text-[11px] transition-opacity hover:opacity-70 ${
                transparent ? "text-white" : "text-[var(--color-ink)]"
              }`}
            >
              <UserIcon className="h-3.5 w-3.5" />
              Sign In
            </button>
          </div>
        </div>

        <div
          className={`border-b transition-colors duration-300 ${
            transparent
              ? "border-white/15 bg-transparent"
              : "border-[var(--color-border)] bg-[var(--color-paper)]"
          }`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`cta-label flex items-center gap-2.5 whitespace-nowrap border px-3 py-2 text-xs transition-colors ${
                transparent
                  ? "border-white/40 text-white"
                  : "border-[var(--color-border)] text-[var(--color-ink)]"
              }`}
            >
              {menuOpen ? <CloseIcon className="h-3 w-3" /> : <MenuIcon className="h-3 w-4" />}
              Menu
            </button>

            <Link
              href="/"
              className={`font-[family-name:var(--font-display-bold)] text-lg tracking-tight uppercase ${
                transparent ? "text-white" : "text-[var(--color-ink)]"
              }`}
            >
              {brand.shortName}
            </Link>

            <button
              type="button"
              aria-label="Configure yours"
              className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-3 py-2 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90 sm:px-4"
            >
              <span className="hidden sm:inline">Configure Yours</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </header>

      <NavigationMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={navigation}
      />
    </>
  );
}
