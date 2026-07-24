import type { BrandId } from "@/lib/brand";
import { getModels } from "@/data/models";

export interface NavModelItem {
  key: string;
  name: string;
  /** Absent renders as a plain text row (e.g. "Help Me Choose") — no thumbnail. */
  image?: string;
  priceLabel?: string;
  href?: string;
  description?: string;
}

export interface NavLinkItem {
  key: string;
  label: string;
  href?: string;
  /** Shows an external-link icon; doesn't imply `href` actually leaves the site yet. */
  external?: boolean;
}

export type NavSection =
  | { key: string; label: string; kind: "models"; items: NavModelItem[] }
  | { key: string; label: string; kind: "links"; items: NavLinkItem[]; image?: string }
  | { key: string; label: string; kind: "none"; image?: string };

/**
 * Extra Defender trim lines beyond the three in src/data/models.ts (which
 * only covers the model pages this prototype actually renders). No real
 * pages exist for these yet, so they're inert — same "real-looking but
 * inert" pattern used throughout this codebase. No distinct photography
 * exists for them either, so they share one placeholder shot.
 */
const PLACEHOLDER_MODEL_IMAGE = "/models/variants/defender-110-x.png";

const DEFENDER_ONLY_MODEL_ITEMS: NavModelItem[] = [
  {
    key: "defender-octa",
    name: "Defender OCTA",
    image: PLACEHOLDER_MODEL_IMAGE,
    priceLabel: "From £147,245",
    description: "Extreme performance, engineered for the world's toughest terrain.",
  },
  {
    key: "defender-hard-top",
    name: "Defender Hard Top",
    image: PLACEHOLDER_MODEL_IMAGE,
    priceLabel: "Finance Available",
    description: "Commercial capability with five- and six-seat configurations.",
  },
  {
    key: "classic-defender",
    name: "Classic Defender",
    image: PLACEHOLDER_MODEL_IMAGE,
    description: "Bespoke restoration of the original Defender, reborn.",
  },
  {
    key: "help-me-choose",
    name: "Help Me Choose",
    description: "Answer a few questions and we'll recommend your ideal Defender.",
  },
];

/**
 * Ownership sub-items are brand-agnostic (src/data/ownership.ts content is
 * intentionally identical across brands) — only two of the five requested
 * labels have a real page today; the rest are inert.
 */
const OWNERSHIP_ITEMS: NavLinkItem[] = [
  { key: "all-ownership", label: "All Ownership", href: "/ownership" },
  { key: "your-vehicle", label: "Your Vehicle" },
  {
    key: "service-and-maintenance",
    label: "Service and Maintenance",
    href: "/ownership/maintenance-care",
  },
  {
    key: "breakdown-and-repair",
    label: "Breakdown and Repair",
    href: "/ownership/roadside-assistance",
  },
  { key: "book-an-appointment", label: "Book an Appointment" },
];

const BUY_ITEMS: NavLinkItem[] = [
  { key: "new-vehicles", label: "New Vehicles Available Now", external: true },
  { key: "approved-used", label: "Approved Used", external: true },
  { key: "accessories", label: "Accessories" },
  { key: "subscriptions", label: "Subscriptions" },
  { key: "offers-and-finance", label: "Offers and Finance" },
];

export function getNavigation(brandId: BrandId, brandName: string): NavSection[] {
  const modelItems: NavModelItem[] = getModels(brandId).map((model) => ({
    key: model.slug,
    name: model.name,
    image:
      model.slug === "defender-110"
        ? "/models/available-cars/vehicle-1.png"
        : PLACEHOLDER_MODEL_IMAGE,
    priceLabel: `From ${model.priceFrom}`,
    href: `/models/${model.slug}`,
    description: model.summary,
  }));

  if (brandId === "defender") {
    modelItems.push(...DEFENDER_ONLY_MODEL_ITEMS);
  }

  return [
    { key: "explore-models", label: "Explore Models", kind: "models", items: modelItems },
    {
      key: "world",
      label: brandId === "defender" ? "The World of Defender" : `The World of ${brandName}`,
      kind: "none",
      image: "/models/available-cars/promo-background.png",
    },
    {
      key: "ownership",
      label: "Ownership",
      kind: "links",
      image: "/ownership/hero-defender.avif",
      items: OWNERSHIP_ITEMS,
    },
    {
      key: "buy",
      label: "Buy",
      kind: "links",
      image: "/ownership/finance-defender.avif",
      items: BUY_ITEMS,
    },
  ];
}
