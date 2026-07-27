import { ChatIcon } from "@/components/icons";

/**
 * Purely representative — signals that live chat support exists without
 * actually wiring one up, matching the "real-looking but inert" pattern
 * used throughout this codebase for undetermined functionality.
 */
export function FloatingChatButton() {
  return (
    <button
      type="button"
      aria-label="Chat with us"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] shadow-[0_8px_24px_rgba(20,20,20,0.3)] transition-opacity hover:opacity-90"
    >
      <ChatIcon />
    </button>
  );
}
