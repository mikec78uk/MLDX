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
      className={`flex w-full flex-col gap-3 border p-4 text-left transition-colors ${
        selected
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
          : "border-[var(--color-border)] hover:border-[var(--color-ink)]"
      }`}
    >
      {showImage && (
        <div
          className={`aspect-[16/9] w-full ${selected ? "bg-white/10" : "bg-[var(--color-paper-muted)]"}`}
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
