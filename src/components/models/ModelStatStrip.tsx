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
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

        // Counts each figure up from 0 as the strip scrolls into view, for
        // a more dynamic feel — reduced-motion users just get the static
        // final value rendered below, no animation at all.
        items.forEach((item, index) => {
          const el = valueRefs.current[index];
          const target = Number(item.value.replace(/,/g, ""));
          if (!el || Number.isNaN(target)) return;

          el.textContent = "0";
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              el.textContent = Math.round(counter.value).toLocaleString("en-GB");
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [items] },
  );

  return (
    <div className="px-6" ref={containerRef}>
      <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((item, index) => (
          <div key={item.label} className="stat-item text-center">
            <dd className="flex items-baseline justify-center gap-2 text-6xl sm:text-7xl">
              {item.prefix && (
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {item.prefix}
                </span>
              )}
              <span
                ref={(el) => {
                  valueRefs.current[index] = el;
                }}
              >
                {item.value}
              </span>
              {item.unit && (
                <span className="text-xs text-[var(--color-ink-soft)]">
                  {item.unit}
                </span>
              )}
            </dd>
            <dt className="eyebrow mt-2 text-xs text-[var(--color-ink-soft)]">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-2xl text-[10px] text-[var(--color-ink-soft)]">
        {disclaimer}
      </p>
    </div>
  );
}
