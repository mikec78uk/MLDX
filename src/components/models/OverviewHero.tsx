"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import { withBasePath } from "@/lib/basePath";
import type { ModelHero } from "@/data/modelHero";
import { ArrowRightIcon } from "@/components/icons";

/**
 * "Book a test drive" and "Discover finance offers" have no real
 * destinations yet — rendered as real-looking but inert controls, matching
 * the pattern already used for undetermined links elsewhere (sticky nav
 * CTAs, ownership page).
 */
export function OverviewHero({
  modelName,
  hero,
}: {
  modelName: string;
  hero: ModelHero;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".overview-hero-title", { opacity: 0, y: 24, duration: 0.7 })
          .from(
            ".overview-hero-tagline",
            { opacity: 0, y: 16, duration: 0.6 },
            "-=0.4",
          )
          .from(
            ".overview-hero-price",
            { opacity: 0, y: 16, duration: 0.6 },
            "-=0.4",
          )
          .from(
            ".overview-hero-ctas",
            { opacity: 0, y: 16, duration: 0.6 },
            "-=0.4",
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  const textContent = (
    <>
      <h1 className="overview-hero-title text-4xl sm:text-5xl">{modelName}</h1>
      {hero.tagline && (
        <p className="overview-hero-tagline mt-3 text-lg text-white/90">
          {hero.tagline}
        </p>
      )}
      {hero.priceFrom && (
        <p className="overview-hero-price mt-6 text-lg">
          From{" "}
          <span className="font-[family-name:var(--font-display-bold)]">
            {hero.priceFrom}
          </span>
        </p>
      )}
      {hero.monthlyPayment && hero.financeSummary && (
        <p className="overview-hero-price mt-3 max-w-sm text-sm text-white/80">
          Available from{" "}
          <span className="font-semibold">{hero.monthlyPayment}</span>{" "}
          {hero.financeSummary}
        </p>
      )}
      <div className="overview-hero-ctas mt-8 flex flex-col items-stretch gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-4">
        <button
          type="button"
          className="cta-label flex w-full items-center justify-center gap-2 whitespace-nowrap border border-white bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90 lg:w-auto"
        >
          <ArrowRightIcon />
          Book a test drive
        </button>
        <button
          type="button"
          className="cta-label flex w-full items-center justify-center gap-2 whitespace-nowrap bg-[var(--color-paper)] px-6 py-3.5 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90 lg:w-auto"
        >
          <ArrowRightIcon />
          Discover finance offers
        </button>
      </div>
    </>
  );

  return (
    <section
      ref={containerRef}
      className="relative -mt-[70px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      {/* Image layer — fixed-aspect stacked block on mobile, full-height overlay on desktop */}
      <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-[88vh] lg:min-h-[640px]">
        {hero.backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${withBasePath(hero.backgroundImage)})`,
            }}
            aria-hidden
          />
        )}
        {/* Mobile only — desktop keeps the image undarkened, per Figma. */}
        <div className="absolute inset-0 bg-[rgba(23,23,23,0.2)] lg:hidden" aria-hidden />
        {/* Fades the photo into whatever the section below uses, so the hero
            doesn't end on a hard edge. Desktop only — mobile's solid text
            block below handles its own transition. */}
        <div
          className={`absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-b from-transparent lg:block ${
            hero.darkOverview ? "to-[var(--color-ink)]" : "to-[var(--color-paper)]"
          }`}
          aria-hidden
        />

        {/* Desktop: bounded dark card behind the text, overlaid on the image. */}
        <div className="relative z-10 hidden h-full w-full items-center px-6 lg:flex">
          <div className="max-w-[506px] rounded-[10px] bg-[rgba(20,20,20,0.5)] p-5">
            {textContent}
          </div>
        </div>
      </div>

      {/* Mobile: solid dark text block stacked below the image, not overlaid on it. */}
      <div className="bg-[var(--color-ink)] px-5 py-5 lg:hidden">{textContent}</div>
    </section>
  );
}
