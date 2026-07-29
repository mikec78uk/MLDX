"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import { withBasePath } from "@/lib/basePath";
import type { CategoryCard } from "@/data/modelOverviewContent";
import { ContentTakeoverModal } from "@/components/models/ContentTakeoverModal";
import { ArrowRightIcon } from "@/components/icons";

/** Each card opens a full-screen takeover — content lands in a later pass. */
export function ModelCategoryCards({ cards }: { cards: CategoryCard[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openCard = cards.find((card) => card.key === openKey);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".category-card", {
          opacity: 0,
          y: 32,
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => setOpenKey(card.key)}
            className="category-card group relative aspect-[284/339] w-full overflow-hidden rounded-[5px]"
          >
            <Image
              src={withBasePath(card.image)}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[rgba(20,20,20,0.5)]" aria-hidden />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 text-left text-2xl text-white">
              {card.label}
              <ArrowRightIcon />
            </span>
          </button>
        ))}
      </div>

      <ContentTakeoverModal
        open={openKey !== null}
        onClose={() => setOpenKey(null)}
        title={openCard?.label ?? ""}
      />
    </div>
  );
}
