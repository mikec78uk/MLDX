"use client";

import { useEffect } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { CategoryOverlayContent, OverlaySection } from "@/data/categoryOverlayContent";

/**
 * Full-screen takeover shell for the category cards. Permanently mounted —
 * `open` only toggles visibility classes — so the entrance/exit transition
 * has a "before" state to animate from/to, same reasoning as SpecsFlyout's
 * persistent-mount fix. The title+close row stays fixed; only the content
 * area below it scrolls (`overflow-y-auto`), and the page behind the
 * takeover is prevented from scrolling while it's open.
 */
export function ContentTakeoverModal({
  open,
  onClose,
  content,
}: {
  open: boolean;
  onClose: () => void;
  content: CategoryOverlayContent;
}) {
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

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={
          "fixed inset-0 z-40 bg-[var(--color-overlay)] transition-[opacity,visibility] duration-500 motion-reduce:transition-none " +
          (open ? "visible opacity-100" : "invisible opacity-0")
        }
      />
      <div
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        className={
          "fixed inset-0 z-50 flex flex-col bg-[var(--color-paper)] transition-[translate,visibility] duration-500 ease-out motion-reduce:transition-none " +
          (open ? "visible translate-y-0" : "invisible translate-y-full")
        }
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <p className="text-lg">{content.title}</p>
          <button
            type="button"
            onClick={onClose}
            className="cta-label flex items-center gap-2 text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
          >
            Close ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {content.hasData ? (
            <>
              <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
                <Image
                  src={withBasePath(content.heroImage)}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-16 px-6 py-16">
                {content.sections.map((section, index) => (
                  <OverlaySectionBlock key={index} section={section} />
                ))}
              </div>

              {content.legalFootnote && (
                <div className="px-6 pb-16">
                  <p className="max-w-4xl whitespace-pre-line text-[10px] text-[var(--color-ink-soft)]">
                    {content.legalFootnote}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center px-6">
              <p className="text-[var(--color-ink-soft)]">
                {content.title} content is coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FindOutMoreButton({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <button
      type="button"
      className={`cta-label mt-6 flex w-fit items-center gap-2 whitespace-nowrap border border-white bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90 ${
        center ? "mx-auto" : ""
      }`}
    >
      {label}
    </button>
  );
}

function OverlayImage({ image }: { image: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[5px]">
      <Image src={withBasePath(image)} alt="" fill className="object-cover" />
    </div>
  );
}

function OverlaySectionBlock({ section }: { section: OverlaySection }) {
  if (section.layout === "standalone") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        {section.headline && <p className="text-3xl sm:text-4xl">{section.headline}</p>}
        {section.body && (
          <p className="mt-4 whitespace-pre-line text-[var(--color-ink-soft)]">{section.body}</p>
        )}
      </div>
    );
  }

  if (section.layout === "image-then-text") {
    return (
      <div>
        {section.image && <OverlayImage image={section.image} />}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          {section.headline && <p className="text-3xl sm:text-4xl">{section.headline}</p>}
          {section.body && (
            <p className="mt-4 whitespace-pre-line text-[var(--color-ink-soft)]">{section.body}</p>
          )}
          {section.cta && <FindOutMoreButton label={section.cta} center />}
        </div>
      </div>
    );
  }

  if (section.layout === "image-text" || section.layout === "text-image") {
    const text = (
      <div className="flex flex-col justify-center">
        {section.headline && <p className="text-3xl sm:text-4xl">{section.headline}</p>}
        {section.body && (
          <p className="mt-4 whitespace-pre-line text-[var(--color-ink-soft)]">{section.body}</p>
        )}
        {section.cta && <FindOutMoreButton label={section.cta} />}
      </div>
    );
    const image = section.image ? <OverlayImage image={section.image} /> : null;

    return (
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        {section.layout === "image-text" ? (
          <>
            {image}
            {text}
          </>
        ) : (
          <>
            {text}
            {image}
          </>
        )}
      </div>
    );
  }

  if (section.layout === "pair") {
    return (
      <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
        {section.items?.map((item) => (
          <div key={item.headline}>
            {item.image && <OverlayImage image={item.image} />}
            <p className="mt-6 text-2xl">{item.headline}</p>
            <p className="mt-3 whitespace-pre-line text-[var(--color-ink-soft)]">{item.body}</p>
            {item.cta && <FindOutMoreButton label={item.cta} />}
          </div>
        ))}
      </div>
    );
  }

  if (section.layout === "three-col") {
    return (
      <div>
        <div className="mx-auto max-w-2xl text-center">
          {section.headline && <p className="text-3xl sm:text-4xl">{section.headline}</p>}
          {section.body && (
            <p className="mt-4 whitespace-pre-line text-[var(--color-ink-soft)]">{section.body}</p>
          )}
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {section.items?.map((item) => (
            <div key={item.headline}>
              {item.image && <OverlayImage image={item.image} />}
              <p className="mt-4 text-lg">{item.headline}</p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
