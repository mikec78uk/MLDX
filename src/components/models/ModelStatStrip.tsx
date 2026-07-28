import type { StatStripItem } from "@/data/modelOverviewContent";

export function ModelStatStrip({
  items,
  disclaimer,
}: {
  items: StatStripItem[];
  disclaimer: string;
}) {
  return (
    <div className="px-6">
      <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
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
