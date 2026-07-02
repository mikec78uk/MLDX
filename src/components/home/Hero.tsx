"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import type { BrandConfig } from "@/lib/brand";

export function Hero({ brand }: { brand: BrandConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
          .from(".hero-title", { opacity: 0, y: 32, duration: 0.8 }, "-=0.35")
          .from(".hero-tagline", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4");

        gsap.to(".hero-media", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-[90vh] min-h-[560px] items-end overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div
        className="hero-media absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <p className="hero-eyebrow eyebrow text-xs text-white/70">
          Model exploration
        </p>
        <h1 className="hero-title mt-4 max-w-2xl text-5xl leading-[1.05] sm:text-6xl">
          {brand.tagline}
        </h1>
        <p className="hero-tagline mt-6 max-w-md text-base text-white/80">
          {brand.description}
        </p>
      </div>
    </section>
  );
}
