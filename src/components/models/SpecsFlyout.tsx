"use client";

import { useEffect } from "react";

/**
 * Full-screen flyout shell, sliding in from the right. Content is a
 * placeholder for now — what it actually shows will be defined later.
 */
export function SpecsFlyout({
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
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${
        open ? "visible" : "invisible delay-300"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[var(--color-overlay)] transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-xl flex-col bg-[var(--color-paper)] shadow-xl transition-transform duration-300 motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
          <p className="text-lg">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cta-label text-xs text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
          >
            Close ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <p className="max-w-md text-[var(--color-ink-soft)]">
            Full specifications for {title} are coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
