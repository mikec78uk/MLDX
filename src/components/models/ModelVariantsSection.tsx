"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { ModelVariantsData } from "@/data/modelVariants";
import { ArrowRightIcon } from "@/components/icons";
import { SpecsFlyout } from "@/components/models/SpecsFlyout";

/**
 * "See full specs" opens the flyout shell; "Build and order" has no real
 * destination yet — rendered as a real-looking but inert control, matching
 * the pattern already used for undetermined links elsewhere.
 */
export function ModelVariantsSection({
  modelName,
  variants,
}: {
  modelName: string;
  variants: ModelVariantsData;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openVariant = variants.variants.find((variant) => variant.slug === openSlug);

  return (
    <section className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Models</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">{modelName} Model Variants</h2>

        {!variants.hasData ? (
          <p className="mt-8 max-w-lg text-[var(--color-ink-soft)]">
            Model variants for {modelName} are coming soon.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {variants.variants.map((variant) => (
                <div
                  key={variant.slug}
                  className="flex flex-col gap-4 border border-[var(--color-border)] p-6 sm:p-8"
                >
                  <div className="relative aspect-[640/360] w-full bg-[var(--color-paper-muted)]">
                    <Image
                      src={withBasePath(variant.image)}
                      alt={variant.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-xl">{variant.name}</p>
                  <p className="-mt-2 text-sm text-[var(--color-ink-soft)]">
                    OTR Price from {variant.priceFrom}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {variant.fuelTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--color-paper-muted)] px-3 py-1 text-xs text-[var(--color-ink)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">Key Features</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-ink-soft)]">
                      {variant.keyFeatures.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setOpenSlug(variant.slug)}
                      className="cta-label flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 py-4 text-xs transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                    >
                      <ArrowRightIcon />
                      See full specs
                    </button>
                    <button
                      type="button"
                      className="cta-label flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-4 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
                    >
                      <ArrowRightIcon />
                      Build and order
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 border border-[var(--color-border)] bg-[var(--color-paper-muted)] px-6 py-16 text-center">
              <h3 className="text-2xl sm:text-3xl">Find your Defender</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-ink-soft)]">
                Tell us what matters to you, and we&rsquo;ll help you discover
                the Defender that best fits your life.
              </p>
              <button
                type="button"
                className="cta-label mt-6 inline-flex items-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-4 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90"
              >
                <ArrowRightIcon />
                Start exploring
              </button>
            </div>
          </>
        )}
      </div>

      {openVariant && (
        <SpecsFlyout
          open={Boolean(openVariant)}
          onClose={() => setOpenSlug(null)}
          title={openVariant.name}
        />
      )}
    </section>
  );
}
