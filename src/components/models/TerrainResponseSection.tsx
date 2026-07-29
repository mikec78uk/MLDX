"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { TerrainMode } from "@/data/modelOverviewContent";

export function TerrainResponseSection({ modes }: { modes: TerrainMode[] }) {
  const [activeKey, setActiveKey] = useState(modes[0]?.key);
  const active = modes.find((mode) => mode.key === activeKey) ?? modes[0];
  if (!active) return null;

  return (
    <div className="px-6">
      <h2 className="text-3xl sm:text-4xl">
        Built to take you <span className="italic">ANYWHERE</span>
      </h2>
      <p className="mt-4 max-w-3xl text-[var(--color-ink-soft)]">
        Terrain Response reads the surface and sets throttle, gearshifts,
        traction and ride height together. Pick a mode below to see what
        actually changes.
      </p>

      <div className="mt-6 flex flex-wrap gap-6 border-b border-[var(--color-border)] pb-4">
        {modes.map((mode) => (
          <button
            key={mode.key}
            type="button"
            onClick={() => setActiveKey(mode.key)}
            className={`cta-label whitespace-nowrap text-xs transition-colors ${
              activeKey === mode.key
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-8 rounded-[5px] bg-[var(--color-paper-muted)] p-6 shadow-[0_2px_6px_rgba(0,0,0,0.08)] lg:grid-cols-2 lg:items-center">
        {active.hasData ? (
          <>
            <div>
              <p className="text-4xl sm:text-5xl">{active.title}</p>
              <p className="mt-4 max-w-sm text-sm text-[var(--color-ink-soft)]">
                {active.body}
              </p>
              {active.readout && (
                <dl className="mt-6 max-w-sm space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs text-[var(--color-ink-soft)]">
                      Ride height
                    </dt>
                    <dd className="text-lg">{active.readout.rideHeight}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs text-[var(--color-ink-soft)]">
                      Throttle
                    </dt>
                    <dd className="text-lg">{active.readout.throttle}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs text-[var(--color-ink-soft)]">
                      Traction
                    </dt>
                    <dd className="text-lg">{active.readout.traction}</dd>
                  </div>
                </dl>
              )}
            </div>
            <div className="relative aspect-[819/532] w-full overflow-hidden rounded-[5px]">
              <Image
                src={withBasePath(active.image)}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </>
        ) : (
          <p className="text-[var(--color-ink-soft)]">
            {active.label} content is coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
