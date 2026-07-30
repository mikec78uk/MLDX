"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import { withBasePath } from "@/lib/basePath";
import type { CategoryCard } from "@/data/modelOverviewContent";
import { getCategoryOverlayContent } from "@/data/categoryOverlayContent";
import { ContentTakeoverModal } from "@/components/models/ContentTakeoverModal";
import { ArrowRightIcon } from "@/components/icons";

/** Each card opens a full-screen takeover with that category's content. */
export function ModelCategoryCards({ cards }: { cards: CategoryCard[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const overlayContent = getCategoryOverlayContent(openKey ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Only the desktop grid staggers in — the mobile carousel is a
      // scroll container, so animating its children's transforms fights
      // with scroll-snap and can leave cards mid-offset.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
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
    <div ref={containerRef}>
      {/* Desktop: 4-up grid */}
      <div className="hidden px-6 lg:block">
        <div className="grid grid-cols-4 gap-4">
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
      </div>

      {/* Mobile: peeking scroll-snap carousel with dot pagination */}
      <CategoryCarousel cards={cards} onOpen={setOpenKey} />

      <ContentTakeoverModal
        open={openKey !== null}
        onClose={() => setOpenKey(null)}
        content={overlayContent}
      />
    </div>
  );
}

/**
 * One card at a time, centred, with the neighbouring cards peeking in at
 * either edge so it reads as swipeable without needing arrows. The active dot
 * is derived from scroll position rather than tracked on tap, so it stays
 * correct when the customer swipes (which never fires a click).
 */
function CategoryCarousel({
  cards,
  onOpen,
}: {
  cards: CategoryCard[];
  onOpen: (key: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onScroll() {
      if (!track) return;
      const slide = track.firstElementChild as HTMLElement | null;
      if (!slide) return;
      // Slides are uniform width, so scrollLeft / slide pitch gives the index.
      const pitch = slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
      setActiveIndex(Math.round(track.scrollLeft / pitch));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => onOpen(card.key)}
            className="relative aspect-[3/4] w-[calc(100%-3rem)] shrink-0 snap-center overflow-hidden rounded-[14px] text-left"
          >
            <Image src={withBasePath(card.image)} alt="" fill className="object-cover" />
            {/* Bottom-weighted scrim so the label stays legible without
                flattening the whole photo the way the desktop tile does. */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,20,0.85)] via-[rgba(20,20,20,0.25)] to-transparent"
              aria-hidden
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-6 text-3xl text-white">
              {card.label}
              <ArrowRightIcon />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5">
        {cards.map((card, index) => (
          <button
            key={card.key}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Show ${card.label}`}
            aria-current={index === activeIndex}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-[var(--color-ink)]" : "bg-[var(--color-border)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
