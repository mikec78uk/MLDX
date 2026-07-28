import type { MakeItYoursCard } from "@/data/modelOverviewContent";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Distinct from the dark photo-band "Make it yours" already built for the
 * Help Me Choose recommendation page — this model-page version is a plain
 * light grey band with a 4-card grid underneath, per its own Figma frame.
 */
export function MakeItYoursCardGrid({ cards }: { cards: MakeItYoursCard[] }) {
  return (
    <div className="bg-[var(--color-border)] py-16">
      <div className="px-6">
        <h2 className="font-medium text-7xl sm:text-8xl lg:text-9xl">
          Make it <span className="italic">yours</span>
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <button
              key={card.title}
              type="button"
              className="flex flex-col items-end justify-between gap-6 bg-[var(--color-paper)] p-5 text-left transition-colors hover:bg-[var(--color-paper)]/80"
            >
              <div className="w-full">
                <p className="text-base font-medium uppercase">{card.title}</p>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                  {card.description}
                </p>
              </div>
              <ArrowRightIcon />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
