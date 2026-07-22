"use client";

import { QRCodeSVG } from "qrcode.react";

export function QrPromo({
  appName,
  description,
  learnMoreLabel,
  qrValue,
}: {
  appName: string;
  description: string;
  learnMoreLabel: string;
  qrValue: string;
}) {
  return (
    <div className="flex items-start gap-6 border border-[var(--color-ink)] bg-[var(--color-paper)] p-6">
      <QRCodeSVG
        value={qrValue}
        size={88}
        fgColor="var(--color-ink)"
        bgColor="transparent"
        marginSize={0}
        className="shrink-0"
        title={`QR code linking to ${appName}`}
      />
      <div>
        <p className="text-base">Do more with {appName}</p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          {description}
        </p>
        <button
          type="button"
          className="cta-label mt-3 text-xs underline underline-offset-4"
        >
          {learnMoreLabel}
        </button>
      </div>
    </div>
  );
}
