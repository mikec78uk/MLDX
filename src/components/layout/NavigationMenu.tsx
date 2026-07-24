"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/registerPlugins";
import { withBasePath } from "@/lib/basePath";
import type { NavLinkItem, NavSection } from "@/data/navigation";
import { ArrowRightIcon, ChevronIcon, ExternalLinkIcon } from "@/components/icons";

function LinkItemRow({
  item,
  className,
}: {
  item: NavLinkItem;
  className: string;
}) {
  const content = (
    <>
      {item.label}
      {item.external && (
        <ExternalLinkIcon className="h-3 w-3 shrink-0 text-[var(--color-ink-soft)]" />
      )}
    </>
  );
  return item.href ? (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  ) : (
    <span className={`${className} text-[var(--color-ink-soft)]`}>{content}</span>
  );
}

/**
 * Full-screen mega menu, fixed below SiteHeader (which stays visible with
 * its Menu button swapped to a Close icon — see SiteHeader). Always
 * mounted; `open` only toggles visibility classes, so the entrance/exit
 * transition has a "before" state to animate from/to (same reasoning as
 * SpecsFlyout's persistent-mount fix earlier in this codebase).
 *
 * Desktop (lg+) renders the 3-column layout from the Figma reference:
 * sections / this section's items / a detail panel (model detail, or a
 * fixed representative image for non-model sections). Below lg, a
 * single-column drill-down replaces it — tapping a section slides to its
 * item list with a back button; tapping a model or linked item navigates
 * immediately (no column-3 preview on mobile, confirmed with the user).
 */
export function NavigationMenu({
  open,
  onClose,
  sections,
}: {
  open: boolean;
  onClose: () => void;
  sections: NavSection[];
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultSection = sections[0];
  const defaultModelKey =
    defaultSection.kind === "models" ? defaultSection.items[0]?.key : undefined;

  const [activeSectionKey, setActiveSectionKey] = useState(defaultSection.key);
  const [activeModelKey, setActiveModelKey] = useState(defaultModelKey);
  const [mobileStep, setMobileStep] = useState<"sections" | "items">("sections");

  // Reset to the default state every time the menu opens — the "adjust
  // state during render" pattern (see SpecsFlyout/ModelVariantsSection)
  // rather than useEffect, since this repo's lint config forbids
  // synchronous setState inside a plain effect that just mirrors a
  // changing value. This is only safe for state this component owns;
  // closing on navigation (below) updates SiteHeader's state instead, so
  // that one has to be a real effect (React forbids updating a different
  // component while this one is rendering).
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setActiveSectionKey(defaultSection.key);
      setActiveModelKey(defaultModelKey);
      setMobileStep("sections");
    }
  }

  useEffect(() => {
    if (open) onClose();
    // Intentionally omits `open`/`onClose` — this should only fire when
    // pathname actually changes (a real navigation), not on every open/close.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .from(".nav-section-item", { opacity: 0, y: 12, stagger: 0.05, duration: 0.35 })
          .from(
            ".nav-item-row",
            { opacity: 0, y: 12, stagger: 0.04, duration: 0.35 },
            "-=0.25",
          )
          .from(".nav-detail-panel", { opacity: 0, y: 12, duration: 0.4 }, "-=0.25");
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [open] },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".nav-detail-panel",
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power1.out" },
        );
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [activeModelKey, activeSectionKey] },
  );

  const activeSection = sections.find((s) => s.key === activeSectionKey) ?? defaultSection;
  const activeModel =
    activeSection.kind === "models"
      ? (activeSection.items.find((item) => item.key === activeModelKey) ??
        activeSection.items[0])
      : undefined;

  return (
    <div
      ref={containerRef}
      role="navigation"
      aria-label="Main menu"
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 top-[var(--header-height)] z-[45] bg-[var(--color-paper)] transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Desktop: 3 columns */}
      <div className="hidden h-full lg:grid lg:grid-cols-[332px_372px_1fr]">
        <div className="overflow-y-auto bg-[var(--color-paper-muted)] px-7 py-10">
          <nav className="flex flex-col gap-5">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onMouseEnter={() => setActiveSectionKey(section.key)}
                onFocus={() => setActiveSectionKey(section.key)}
                className={`nav-section-item flex items-center justify-between gap-3 border-l-2 py-0.5 pl-3 text-left text-sm transition-colors ${
                  activeSectionKey === section.key
                    ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                    : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                }`}
              >
                {section.label}
                <ChevronIcon
                  direction="right"
                  className="h-2 w-3.5 shrink-0 text-[var(--color-ink-soft)]"
                />
              </button>
            ))}
          </nav>
        </div>

        <div className="overflow-y-auto border-r border-[var(--color-border)] px-7 py-10">
          {activeSection.kind === "models" && (
            <ul className="flex flex-col gap-4">
              {activeSection.items.map((item) => (
                <li key={item.key} className="nav-item-row">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveModelKey(item.key)}
                    onFocus={() => setActiveModelKey(item.key)}
                    className={`flex w-full items-center gap-4 border p-3 text-left transition-colors ${
                      activeModelKey === item.key
                        ? "border-[var(--color-ink)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-ink)]"
                    }`}
                  >
                    {item.image && (
                      <span className="relative h-[45px] w-[80px] shrink-0 overflow-hidden bg-[var(--color-paper)]">
                        <Image
                          src={withBasePath(item.image)}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </span>
                    )}
                    <span className="flex-1">
                      <span className="block text-sm">{item.name}</span>
                      {item.priceLabel && (
                        <span className="mt-1 block text-xs text-[var(--color-ink-soft)]">
                          {item.priceLabel}
                        </span>
                      )}
                    </span>
                    {activeModelKey === item.key && (
                      <ChevronIcon direction="right" className="h-2 w-3.5 shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {activeSection.kind === "links" && (
            <ul className="flex flex-col gap-4">
              {activeSection.items.map((item) => (
                <li key={item.key} className="nav-item-row">
                  <LinkItemRow
                    item={item}
                    className="flex items-center gap-2 text-sm text-[var(--color-ink)] transition-opacity hover:opacity-70"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="overflow-y-auto bg-[var(--color-paper-muted)] px-10 py-10">
          {activeSection.kind === "models" ? (
            activeModel && (
            <div key={activeModel.key} className="nav-detail-panel max-w-md">
              <p className="font-[family-name:var(--font-display-bold)] text-lg uppercase tracking-tight">
                {activeModel.name}
              </p>
              {activeModel.description && (
                <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
                  {activeModel.description}
                </p>
              )}
              {activeModel.image && (
                <div className="relative mt-6 aspect-[369/255] w-full">
                  <Image
                    src={withBasePath(activeModel.image)}
                    alt={activeModel.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {activeModel.href ? (
                  <Link
                    href={activeModel.href}
                    className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
                  >
                    <ArrowRightIcon />
                    Explore
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
                  >
                    <ArrowRightIcon />
                    Explore
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  className="cta-label flex items-center gap-2 whitespace-nowrap text-xs text-[var(--color-ink)] transition-opacity hover:opacity-70"
                >
                  <ArrowRightIcon />
                  Configure
                </button>
                <button
                  type="button"
                  className="cta-label flex items-center gap-2 whitespace-nowrap text-xs text-[var(--color-ink)] transition-opacity hover:opacity-70"
                >
                  <ArrowRightIcon />
                  Book Test Drive
                </button>
              </div>
            </div>
            )
          ) : (
            activeSection.image && (
              <div
                key={activeSection.key}
                className="nav-detail-panel relative -my-10 -mr-10 ml-0 h-[calc(100%+5rem)] w-[calc(100%+2.5rem)]"
              >
                <Image
                  src={withBasePath(activeSection.image)}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile: single-column drill-down */}
      <div className="flex h-full flex-col overflow-y-auto lg:hidden">
        {mobileStep === "sections" ? (
          <nav className="flex flex-col divide-y divide-[var(--color-border)]">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => {
                  setActiveSectionKey(section.key);
                  setMobileStep("items");
                }}
                className="flex items-center justify-between px-6 py-4 text-left text-base"
              >
                {section.label}
                <ChevronIcon
                  direction="right"
                  className="h-2.5 w-4 shrink-0 text-[var(--color-ink-soft)]"
                />
              </button>
            ))}
          </nav>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => setMobileStep("sections")}
              className="cta-label flex items-center gap-3 px-6 py-4 text-xs text-[var(--color-ink-soft)]"
            >
              <ChevronIcon direction="left" className="h-2.5 w-4" />
              {activeSection.label}
            </button>

            {activeSection.kind === "models" && (
              <ul className="flex flex-col divide-y divide-[var(--color-border)]">
                {activeSection.items.map((item) => {
                  const row = (
                    <>
                      {item.image && (
                        <span className="relative h-[50px] w-[88px] shrink-0 overflow-hidden bg-[var(--color-paper-muted)]">
                          <Image
                            src={withBasePath(item.image)}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </span>
                      )}
                      <span className="flex-1">
                        <span className="block text-sm">{item.name}</span>
                        {item.priceLabel && (
                          <span className="mt-1 block text-xs text-[var(--color-ink-soft)]">
                            {item.priceLabel}
                          </span>
                        )}
                      </span>
                    </>
                  );
                  return (
                    <li key={item.key}>
                      {item.href ? (
                        <Link href={item.href} className="flex items-center gap-4 px-6 py-4">
                          {row}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-4 px-6 py-4 text-[var(--color-ink-soft)]">
                          {row}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {activeSection.kind === "links" && (
              <ul className="flex flex-col divide-y divide-[var(--color-border)]">
                {activeSection.items.map((item) => (
                  <li key={item.key}>
                    <LinkItemRow item={item} className="flex items-center gap-2 px-6 py-4 text-sm" />
                  </li>
                ))}
              </ul>
            )}

            {activeSection.kind === "none" && activeSection.image && (
              <div className="relative mx-6 mt-4 aspect-[4/3] overflow-hidden">
                <Image src={withBasePath(activeSection.image)} alt="" fill className="object-cover" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
