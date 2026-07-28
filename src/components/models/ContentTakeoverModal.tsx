"use client";

import { useEffect } from "react";

/**
 * Generic full-screen takeover shell for content that doesn't exist yet
 * (the category cards below, and any optional-pack tab without real copy).
 * Permanently mounted — `open` only toggles visibility classes — so the
 * entrance/exit transition has a "before" state to animate from/to, same
 * reasoning as SpecsFlyout's persistent-mount fix.
 */
export function ContentTakeoverModal({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
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
        aria-label={title}
        className={
          "fixed inset-0 z-50 flex flex-col bg-[var(--color-paper)] transition-[translate,visibility] duration-500 ease-out motion-reduce:transition-none " +
          (open ? "visible translate-y-0" : "invisible translate-y-full")
        }
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <p className="text-lg">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="cta-label flex items-center gap-2 text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
          >
            Close ✕
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center px-6">
          <p className="text-[var(--color-ink-soft)]">
            {title} content is coming soon.
          </p>
        </div>
      </div>
    </>
  );
}
