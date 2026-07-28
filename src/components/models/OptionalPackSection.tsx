"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { OptionalPack } from "@/data/modelOverviewContent";

export function OptionalPackSection({
  modelName,
  packs,
}: {
  modelName: string;
  packs: OptionalPack[];
}) {
  const [activeKey, setActiveKey] = useState(packs[0]?.key);
  const active = packs.find((pack) => pack.key === activeKey) ?? packs[0];
  if (!active) return null;

  return (
    <div className="px-6">
      <h2 className="text-3xl sm:text-4xl">
        Enhance your {modelName} with an optional pack
      </h2>

      <div className="mt-6 flex flex-wrap gap-6 border-b border-[var(--color-border)] pb-4">
        {packs.map((pack) => (
          <button
            key={pack.key}
            type="button"
            onClick={() => setActiveKey(pack.key)}
            className={`cta-label whitespace-nowrap text-xs transition-colors ${
              activeKey === pack.key
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {pack.label}
          </button>
        ))}
      </div>

      {active.hasData && active.images ? (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[309/193] w-full overflow-hidden rounded-[5px]">
                <Image
                  src={withBasePath(active.images[0])}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[309/174] w-full overflow-hidden rounded-[5px]">
                <Image
                  src={withBasePath(active.images[1])}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative aspect-[315/371] w-full overflow-hidden rounded-[5px]">
              <Image
                src={withBasePath(active.images[2])}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-2xl">{active.title}</p>
            <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
              {active.description}
            </p>
            {active.features && (
              <>
                <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
                  The Adventure Pack includes:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-ink-soft)]">
                  {active.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
            <button
              type="button"
              className="cta-label mt-6 flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-3.5 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            >
              Contact Retailer
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-[var(--color-ink-soft)]">
          {active.label} content is coming soon.
        </p>
      )}
    </div>
  );
}
