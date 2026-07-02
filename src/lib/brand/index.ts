import { defender } from "./defender";
import { rangeRover } from "./range-rover";
import type { BrandConfig, BrandId } from "./types";

const brands: Record<BrandId, BrandConfig> = {
  "range-rover": rangeRover,
  defender: defender,
};

const DEFAULT_BRAND: BrandId = "range-rover";

function isBrandId(value: string | undefined): value is BrandId {
  return value === "range-rover" || value === "defender";
}

/**
 * Resolves the active brand from NEXT_PUBLIC_BRAND. Each brand ships as its
 * own Vercel deployment/env var rather than a runtime switch, per the
 * client's 70/10/20 (core/localisation/content) reskin approach.
 */
export function getBrand(): BrandConfig {
  const requested = process.env.NEXT_PUBLIC_BRAND;
  return brands[isBrandId(requested) ? requested : DEFAULT_BRAND];
}

export type { BrandConfig, BrandId } from "./types";
