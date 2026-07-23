"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import { withBasePath } from "@/lib/basePath";
import type { ModelHero } from "@/data/modelHero";
import { ArrowRightIcon } from "@/components/icons";
import { HeroHotspot } from "@/components/models/HeroHotspot";

/**
 * "Build your <brand>" and "Get a personalised quote" have no real
 * destinations yet — rendered as real-looking but inert controls, matching
 * the pattern already used for undetermined links elsewhere (sticky nav
 * CTAs, ownership page).
 */
export function OverviewHero({
  modelName,
  modelSlug,
  brandShortName,
  hero,
}: {
  modelName: string;
  modelSlug: string;
  brandShortName: string;
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

  return (
    <section
      ref={containerRef}
      className="relative -mt-[60px] flex h-[88vh] min-h-[640px] items-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      {hero.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${withBasePath(hero.backgroundImage)})`,
          }}
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent"
        aria-hidden
      />
      {/* Fades the photo into whatever the section below uses, so the hero
          doesn't end on a hard edge. */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent ${
          hero.darkOverview ? "to-[var(--color-ink)]" : "to-[var(--color-paper)]"
        }`}
        aria-hidden
      />

      {hero.hotspot && (
        <HeroHotspot
          hotspot={hero.hotspot}
          specsHref={`/models/${modelSlug}/specs`}
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-md">
          <h1 className="overview-hero-title text-4xl sm:text-5xl">
            {modelName}
          </h1>
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
          <div className="overview-hero-ctas mt-8 flex flex-col items-start gap-4">
            <button
              type="button"
              className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-paper)] px-6 py-3 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90"
            >
              <ArrowRightIcon />
              Build your {brandShortName}
            </button>
            <button
              type="button"
              className="cta-label flex items-center gap-2 text-xs text-white/90 transition-opacity hover:opacity-70"
            >
              Get a personalised quote
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
