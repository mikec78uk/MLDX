"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { brand } from "@/lib/brand";
import {
  getLookupSnapshot,
  getServerLookupSnapshot,
  subscribeToLookup,
} from "@/lib/ownership/session";
import { setHeaderHidden } from "@/lib/header/visibility";
import { getNavigation } from "@/data/navigation";
import { NavigationMenu } from "@/components/layout/NavigationMenu";
import { DefenderLogo } from "@/components/layout/DefenderLogo";
import {
  CloseIcon,
  LocationIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

/** How far you need to scroll before the header solidifies. */
const SCROLL_THRESHOLD = 80;

/** Always shown below this scroll depth, regardless of direction. */
const REVEAL_OFFSET = 80;
/** Ignore sub-pixel/jitter scroll deltas so it doesn't flicker. */
const HIDE_DELTA = 8;

/**
 * "Search", "Find a Dealer" and "Sign In" have no real destinations yet —
 * rendered as real-looking but inert controls, matching the pattern
 * already used for undetermined links elsewhere.
 */
export function SiteHeader() {
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
  const navigation = getNavigation();

  return (
    <>
      <header className="sticky top-0 z-50 translate-y-[var(--header-hidden-shift)] transition-transform duration-300 motion-reduce:transition-none">
        <div
          className={`border-b transition-colors duration-300 ${
            transparent
              ? "border-white/15 bg-transparent"
              : "border-[var(--color-border)] bg-[var(--color-paper)]"
          }`}
        >
          {/* Desktop (lg+): bordered Menu pill, centered wordmark, icons right */}
          <div className="hidden w-full items-center justify-between px-7 py-2.5 lg:flex">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`cta-label flex items-center gap-2.5 whitespace-nowrap rounded-full border px-3.5 py-2.5 text-xs transition-colors ${
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
              aria-label={brand.shortName}
              className={transparent ? "text-white" : "text-[var(--color-ink)]"}
            >
              <DefenderLogo className="h-4 w-auto" />
            </Link>

            <div className="flex items-center gap-5">
              <button
                type="button"
                aria-label="Search"
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink)]"}`}
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Find a dealer"
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink)]"}`}
              >
                <LocationIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Sign in"
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink)]"}`}
              >
                <UserIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile (below lg): wordmark left, plain icon row right — no pill, no labels */}
          <div className="flex w-full items-center justify-between px-6 py-[15px] lg:hidden">
            <Link
              href="/"
              aria-label={brand.shortName}
              className={transparent ? "text-white" : "text-[var(--color-ink)]"}
            >
              <DefenderLogo className="h-3.5 w-auto" />
            </Link>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink-soft)]"}`}
              >
                {menuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-5" />}
              </button>
              <button
                type="button"
                aria-label="Search"
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink-soft)]"}`}
              >
                <SearchIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Find a dealer"
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink-soft)]"}`}
              >
                <LocationIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Sign in"
                className={`transition-opacity hover:opacity-70 ${transparent ? "text-white" : "text-[var(--color-ink-soft)]"}`}
              >
                <UserIcon className="h-4 w-4" />
              </button>
            </div>
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
