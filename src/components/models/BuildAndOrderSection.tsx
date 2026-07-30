"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { ModelVariantsData } from "@/data/modelVariants";
import type { BuildGalleryCategory, ExteriorColor } from "@/data/modelOverviewContent";
import { ArrowRightIcon, ChevronIcon } from "@/components/icons";

/**
 * Tab rows wrap on desktop but scroll horizontally on mobile, with a hairline
 * running under the row: trim names like "Trophy Edition in Deep Sandglow
 * Yellow" are far too long to wrap into a readable stack at phone widths.
 */
const TAB_ROW =
  "flex overflow-x-auto border-b border-[var(--color-border)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible lg:border-b-0";

/**
 * Mirrors the real Build and Order configurator pattern (model picker, trim
 * tabs, a main-viewer-plus-thumbnails gallery, an Exterior/Interior/Wheels/
 * Accessories sub-gallery, colour swatches, price + CTAs) rather than a
 * from-scratch layout. "Defender OCTA" is a real-looking but permanently
 * disabled option — it isn't a model this app has any page/spec content
 * for, only included so the picker matches visually.
 */
export function BuildAndOrderSection({
  modelName,
  modelSlug,
  variants,
  colors,
  defaultColor,
  galleryCategories,
}: {
  modelName: string;
  modelSlug: string;
  variants: ModelVariantsData;
  colors: ExteriorColor[];
  defaultColor: string;
  galleryCategories: BuildGalleryCategory[];
}) {
  const [activeSlug, setActiveSlug] = useState(variants.variants[0]?.slug);
  const [activeColor, setActiveColor] = useState(defaultColor);
  const [activeCategoryKey, setActiveCategoryKey] = useState(galleryCategories[0]?.key);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const active = variants.variants.find((v) => v.slug === activeSlug) ?? variants.variants[0];
  const activeCategory =
    galleryCategories.find((c) => c.key === activeCategoryKey) ?? galleryCategories[0];

  if (!variants.hasData || !active || !activeCategory) return null;

  // The "Exterior" category leads with this trim's own photo; every other
  // category only has shared stand-in photography (no real per-trim
  // interior/wheel/accessory shots exist yet).
  const images =
    activeCategory.key === "exterior"
      ? [active.image, "/models/overview/category-exterior.png", "/models/overview/hero-background.png"]
      : activeCategory.images;

  function selectCategory(key: string) {
    setActiveCategoryKey(key);
    setActiveImageIndex(0);
  }

  function stepImage(direction: 1 | -1) {
    setActiveImageIndex((index) => (index + direction + images.length) % images.length);
  }

  return (
    <div id="build-and-order" className="px-6">
      <h2 className="text-3xl sm:text-4xl">Build and order</h2>
      <p className="mt-3 text-[var(--color-ink-soft)]">
        Choose a Defender. Then make it yours.
      </p>

      <div className="mt-8 hidden flex-wrap gap-8 lg:flex">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="build-model"
            checked
            readOnly
            className="h-5 w-5 accent-[var(--color-ink)]"
          />
          <span className="cta-label text-xs">{modelName}</span>
        </label>
        <label className="flex items-center gap-2 text-[var(--color-ink-soft)]">
          <input type="radio" name="build-model" disabled className="h-5 w-5" />
          <span className="cta-label text-xs">Defender OCTA</span>
        </label>
      </div>

      {/* Mobile gets a dropdown instead of the radio row — it's what the live
          configurator uses at this width, and two radios plus the model names
          don't sit on one phone-width line. OCTA stays visible but disabled,
          same as the desktop radio. */}
      <div className="relative mt-8 lg:hidden">
        <select
          aria-label="Choose a model"
          defaultValue={modelName}
          className="w-full appearance-none border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-4 text-sm font-semibold"
        >
          <option>{modelName}</option>
          <option disabled>Defender OCTA</option>
        </select>
        <ChevronIcon
          direction="down"
          className="pointer-events-none absolute right-4 top-1/2 h-2 w-3.5 -translate-y-1/2"
        />
      </div>

      <div className={`mt-6 gap-8 ${TAB_ROW}`}>
        {variants.variants.map((variant) => (
          <button
            key={variant.slug}
            type="button"
            onClick={() => setActiveSlug(variant.slug)}
            className={`cta-label shrink-0 whitespace-nowrap border-b-2 pb-3 text-xs font-semibold transition-colors ${
              activeSlug === variant.slug
                ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {variant.name.replace(/^Defender /, "")}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative">
          <div className="relative aspect-[753/456] w-full overflow-hidden rounded-[5px] bg-[var(--color-paper-muted)]">
            <Image
              src={withBasePath(images[activeImageIndex])}
              alt={active.name}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            /* Overlaid on the photo at phone widths (matching the live
               configurator), dropping below it once there's room. */
            <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-[5px] bg-[var(--color-paper)]/90 px-3 py-2 lg:static lg:mt-3 lg:justify-center lg:bg-transparent lg:px-0 lg:py-0">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => stepImage(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-ink)]"
              >
                <ChevronIcon direction="left" className="h-2.5 w-2" />
              </button>
              <span className="cta-label text-xs text-[var(--color-ink-soft)]">
                {activeImageIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => stepImage(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-ink)]"
              >
                <ChevronIcon direction="right" className="h-2.5 w-2" />
              </button>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="hidden gap-4 lg:grid">
            {images.slice(1, 3).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImageIndex(index + 1)}
                className="relative aspect-[444/223] w-full overflow-hidden rounded-[5px] bg-[var(--color-paper-muted)]"
              >
                <Image src={withBasePath(image)} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`mt-6 gap-6 ${TAB_ROW}`}>
        {galleryCategories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => selectCategory(category.key)}
            className={`cta-label shrink-0 whitespace-nowrap border-b-2 pb-3 text-xs font-semibold transition-colors ${
              activeCategoryKey === category.key
                ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-8 lg:flex-row lg:flex-wrap lg:justify-between">
        <div className="w-full lg:w-auto">
          {/* Eight 70px swatches can't wrap tidily on a phone, so they scroll. */}
          <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                aria-label={color.name}
                onClick={() => setActiveColor(color.name)}
                className={`relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[4px] border-2 transition-colors ${
                  activeColor === color.name
                    ? "border-[var(--color-icon-default,#595959)]"
                    : "border-transparent"
                }`}
              >
                <Image src={withBasePath(color.image)} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold">{activeColor}</p>
        </div>

        <div className="flex w-full flex-col items-start gap-4 lg:w-auto">
          <div>
            <p className="text-xs text-[var(--color-ink-soft)]">From</p>
            <p className="text-2xl">{active.priceFrom}</p>
          </div>
          <button
            type="button"
            className="cta-label flex w-full items-center justify-center gap-2 whitespace-nowrap bg-[var(--color-ink)] px-6 py-3.5 text-xs text-[var(--color-paper)] transition-opacity hover:opacity-90 lg:w-auto lg:justify-start"
          >
            <ArrowRightIcon />
            Build your own
          </button>
          <Link
            href={`/models/${modelSlug}/compare`}
            className="cta-label flex items-center gap-2 whitespace-nowrap text-xs transition-colors hover:text-[var(--color-ink-soft)]"
          >
            <ArrowRightIcon />
            Compare models
          </Link>
        </div>
      </div>
    </div>
  );
}
