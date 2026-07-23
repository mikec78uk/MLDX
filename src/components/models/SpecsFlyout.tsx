"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { FullSpecs, SpecCategory } from "@/data/modelFullSpecs";

const SECTIONS = [
  { id: "key-features", label: "Key Features" },
  { id: "standard-features", label: "Standard Features" },
  { id: "engine-specifications", label: "Engine and Specifications" },
] as const;

/** How far past the top of the flyout's own scroll area before the header condenses. */
const CONDENSE_THRESHOLD = 40;

function AccordionCategory({
  category,
  defaultOpen,
}: {
  category: SpecCategory;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasContent = Boolean(category.items?.length || category.rows?.length);

  return (
    <div className="border-t border-[var(--color-border)]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 py-4 text-left"
      >
        <span aria-hidden className="text-lg leading-none text-[var(--color-ink-soft)]">
          {open ? "−" : "+"}
        </span>
        <span className="text-sm">
          {category.title}
          {category.count !== undefined && ` (${category.count})`}
        </span>
      </button>

      {open && (
        <div className="pb-4 pl-8">
          {!hasContent && (
            <p className="text-sm text-[var(--color-ink-soft)]">Coming soon.</p>
          )}
          {category.items && (
            <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--color-ink-soft)]">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {category.rows && (
            <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {category.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-6 py-3 text-sm"
                >
                  <dt>{row.label}</dt>
                  <dd className="text-[var(--color-ink-soft)]">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </div>
  );
}

export function SpecsFlyout({
  open,
  onClose,
  variantName,
  variantImage,
  fullSpecs,
}: {
  open: boolean;
  onClose: () => void;
  variantName: string;
  variantImage: string;
  fullSpecs: FullSpecs;
}) {
  const [condensed, setCondensed] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [engine, setEngine] = useState(fullSpecs.engines[0] ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current;
    if (!container) return;

    const sectionElements = SECTIONS.map((section) => ({
      id: section.id as string,
      el: container.querySelector<HTMLElement>(`#${section.id}`),
    })).filter((entry): entry is { id: string; el: HTMLElement } => entry.el !== null);

    function onScroll() {
      if (!container) return;
      setCondensed(container.scrollTop > CONDENSE_THRESHOLD);

      // Scrolled to the foot of the panel: the last section may be too
      // short for its top to ever cross the offset below, so force it.
      const atBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      if (atBottom) {
        const last = sectionElements[sectionElements.length - 1]?.id;
        if (last) setActiveSection(last);
        return;
      }

      const offset = container.getBoundingClientRect().top + 140;
      let current = sectionElements[0]?.id;
      for (const { id, el } of sectionElements) {
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      if (current) setActiveSection(current);
    }

    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [open]);

  function scrollToSection(id: string) {
    const container = scrollRef.current;
    const target = container?.querySelector<HTMLElement>(`#${id}`);
    if (!container || !target) return;
    container.scrollTo({
      top: target.offsetTop - container.clientHeight * 0 - 16,
      behavior: "smooth",
    });
  }

  return (
    <div
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label={variantName}
      className={`fixed inset-0 z-50 flex flex-col bg-[var(--color-paper)] transition-[transform,visibility] duration-300 motion-reduce:transition-none ${
        open ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="shrink-0 border-b border-[var(--color-border)] shadow-[0_8px_32px_rgba(52,58,63,0.05)]">
        <div className="mx-auto flex max-w-6xl items-start justify-between px-6 pt-4">
          <span />
          <button
            type="button"
            onClick={onClose}
            className="cta-label flex items-center gap-2 text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
          >
            Close ✕
          </button>
        </div>

        <div
          className={`mx-auto flex max-w-6xl flex-col gap-4 px-6 transition-[padding] duration-300 sm:flex-row sm:items-center ${
            condensed ? "pb-4 pt-2" : "pb-6 pt-2"
          }`}
        >
          <div
            className={`relative shrink-0 bg-[var(--color-paper-muted)] transition-all duration-300 ${
              condensed ? "h-[70px] w-[124px]" : "h-[160px] w-[280px]"
            }`}
          >
            <Image
              src={withBasePath(variantImage)}
              alt={variantName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <p className="text-xl">{variantName}</p>
              {fullSpecs.engines.length > 0 && (
                <label className="flex items-center border border-[var(--color-border)] px-3 py-2 text-sm">
                  <select
                    value={engine}
                    onChange={(event) => setEngine(event.target.value)}
                    className="bg-transparent pr-2 outline-none"
                  >
                    {fullSpecs.engines.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {!condensed && (
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="eyebrow text-[10px] text-[var(--color-ink-soft)]">
                      Retail price (inc VAT and Delivery)
                    </p>
                    <p className="mt-1 text-lg">{fullSpecs.retailPrice}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-[10px] text-[var(--color-ink-soft)]">
                      On the Road
                    </p>
                    <p className="mt-1 text-lg">{fullSpecs.onTheRoadPrice}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-5 py-3 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
              >
                Build and order
              </button>
              <button
                type="button"
                className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-5 py-3 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
              >
                Compare
              </button>
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 pb-4">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`cta-label whitespace-nowrap rounded-full border px-5 py-2 text-xs transition-colors ${
                activeSection === section.id
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {!fullSpecs.hasData ? (
            <p className="text-[var(--color-ink-soft)]">
              Full specifications for {variantName} are coming soon.
            </p>
          ) : (
            <>
              <section id="key-features" className="scroll-mt-6">
                <p className="text-xl">Key Features</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-ink-soft)]">
                  {fullSpecs.keyFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>

              <section id="standard-features" className="mt-12 scroll-mt-6">
                <p className="text-xl">Standard Features</p>
                <div className="mt-4">
                  {fullSpecs.standardFeatures.map((category, index) => (
                    <AccordionCategory
                      key={category.title}
                      category={category}
                      defaultOpen={index === 0}
                    />
                  ))}
                </div>
              </section>

              <section id="engine-specifications" className="mt-12 scroll-mt-6">
                <p className="text-xl">Engine and Specifications</p>
                <div className="mt-4">
                  {fullSpecs.engineSpecs.map((category, index) => (
                    <AccordionCategory
                      key={category.title}
                      category={category}
                      defaultOpen={index === 0}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
