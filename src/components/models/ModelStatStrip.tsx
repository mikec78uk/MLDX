"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import type { StatStripItem } from "@/data/modelOverviewContent";

export function ModelStatStrip({
  items,
  disclaimer,
}: {
  items: StatStripItem[];
  disclaimer: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".stat-item", {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div className="px-6" ref={containerRef}>
      <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="stat-item">
            <dt className="eyebrow text-xs text-[var(--color-ink-soft)]">
              {item.label}
            </dt>
            <dd className="mt-1 text-4xl">
              {item.value}
              {item.unit && (
                <span className="ml-1 text-xs text-[var(--color-ink-soft)]">
                  {item.unit}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-2xl text-[10px] text-[var(--color-ink-soft)]">
        {disclaimer}
      </p>
    </div>
  );
}
