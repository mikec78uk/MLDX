import type { Option } from "@/data/helpMeChoose";

/**
 * The one selectable-tile shape reused across every "Help Me Choose" step —
 * Figma's "Guided Sell Option" component is identical everywhere except
 * whether it carries an image placeholder (usage/passengers/priorities/
 * journeys) or not (the three Requirements sub-questions, which are plain
 * text rows).
 */
export function OptionCard({
  option,
  selected,
  onToggle,
  showImage = false,
}: {
  option: Option;
  selected: boolean;
  onToggle: () => void;
  showImage?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex w-full flex-col gap-3 border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] shadow-[0_12px_28px_rgba(20,20,20,0.25)]"
          : "border-[var(--color-border)] bg-[var(--color-paper)] shadow-[0_2px_6px_rgba(20,20,20,0.06)] hover:-translate-y-0.5 hover:border-[var(--color-ink)] hover:shadow-[0_10px_24px_rgba(20,20,20,0.12)]"
      }`}
    >
      {showImage && (
        <div
          className={`aspect-[16/9] w-full bg-gradient-to-br ${
            selected
              ? "from-white/15 to-white/5"
              : "from-[var(--color-paper-muted)] to-[var(--color-border)]/40"
          }`}
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm">{option.title}</p>
          {option.description && (
            <p
              className={`mt-1 text-xs ${selected ? "text-white/70" : "text-[var(--color-ink-soft)]"}`}
            >
              {option.description}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
            selected
              ? "border-white bg-white text-[var(--color-ink)]"
              : "border-[var(--color-border)] text-[var(--color-ink-soft)]"
          }`}
        >
          {selected ? "✓" : "+"}
        </span>
      </div>
    </button>
  );
}
