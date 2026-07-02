import type { OwnershipPillar } from "@/data/ownership";

export function OwnershipPillars({ pillars }: { pillars: OwnershipPillar[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {pillars.map((pillar) => (
        <div key={pillar.title} className="border-t border-[var(--color-border)] pt-6">
          <h3 className="text-xl">{pillar.title}</h3>
          <p className="mt-2 text-[var(--color-ink-soft)]">
            {pillar.description}
          </p>
        </div>
      ))}
    </div>
  );
}
