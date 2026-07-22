import type { BrandId } from "@/lib/brand";

export interface InertLink {
  label: string;
}

export interface CardLink {
  slug: string;
  title: string;
  /** Shown on the card grid (assistance only — explore cards are title-only). */
  summary?: string;
  /** Body copy for the card's stub detail page. */
  detail: string;
}

export interface OwnershipContent {
  /** Full-bleed background for the pre-lookup hero only. No asset yet. */
  heroBackground?: string;
  lookup: {
    heading: string;
    inputLabel: string;
    inputPlaceholder: string;
    ctaLabel: string;
    quickActions: InertLink[];
    notFoundMessage: string;
  };
  vehicle: {
    name: string;
    ownershipRange: string;
    modelUrl?: string;
  };
  securityNotice: {
    title: string;
    description: string;
  };
  popularActions: InertLink[];
  aboutVehicle: InertLink[];
  /** Rendered after an inert "Log in" button, e.g. "[Log in] {loginPrompt}". */
  loginPrompt: string;
  remoteApp: {
    name: string;
    description: string;
    learnMoreLabel: string;
    /** Value encoded in the QR — kept same-origin since there's no real app link yet. */
    qrValue: string;
  };
  assistance: CardLink[];
  exploreCards: CardLink[];
  financePromo: {
    title: string;
    description: string;
    ctaLabel: string;
    disclaimer: string;
    /** Lifestyle image for the banner. No asset yet. */
    image?: string;
  };
}

/**
 * Generic "explore ownership" topics — content is intentionally identical
 * across brands for now (the 70% "core" in the client's 70/20/10 reskin
 * split). Only marque-specific copy (vehicle, remote app, hero) diverges.
 */
const exploreCards: CardLink[] = [
  {
    slug: "service-plans",
    title: "Service Plans",
    detail:
      "Prepay for servicing at a fixed price and protect against rising costs.",
  },
  {
    slug: "maintenance-care",
    title: "Maintenance & Care",
    detail: "Guidance on keeping your vehicle in peak condition year-round.",
  },
  {
    slug: "warranty-information",
    title: "Warranty Information",
    detail: "What's covered, for how long, and how to make a claim.",
  },
  {
    slug: "security-and-protection",
    title: "Security and Protection",
    detail: "Features and services designed to keep your vehicle secure.",
  },
  {
    slug: "electric-vehicle-owners",
    title: "Electric Vehicle Owners",
    detail: "Charging, range, and everything specific to owning an EV.",
  },
  {
    slug: "connected-services",
    title: "Connected Services",
    detail: "Manage subscriptions and connected features from anywhere.",
  },
];

const assistance: CardLink[] = [
  {
    slug: "accident-assistance",
    title: "Accident Assistance",
    summary:
      "Complimentary support when the unexpected happens - even after your warranty expires.",
    detail:
      "Complimentary support when the unexpected happens - even after your warranty expires.",
  },
  {
    slug: "roadside-assistance",
    title: "Roadside Assistance",
    summary:
      "24/7 roadside assistance across the UK and Europe, including recovery and onward travel when needed.",
    detail:
      "24/7 roadside assistance across the UK and Europe, including recovery and onward travel when needed.",
  },
];

/**
 * Everything that isn't an unavoidable brand-specific fact. Defender is the
 * one brand being actively iterated on right now — Range Rover mirrors this
 * copy verbatim (see `overridesByBrand` below) until it gets its own
 * finalisation pass, so a Defender wording change never needs a matching
 * manual edit on the Range Rover side.
 */
const sharedCopy = {
  lookup: {
    heading: "Find support for your vehicle",
    inputLabel: "Registration",
    inputPlaceholder: "Enter your reg",
    ctaLabel: "Find my Vehicle",
    quickActions: [
      { label: "Book MOT or Service" },
      { label: "Explore Service Plans" },
      { label: "Explore Warranty Options" },
    ],
    notFoundMessage:
      "We couldn't find a vehicle matching that registration. Double-check the plate and try again.",
  },
  securityNotice: {
    title: "Complimentary Security Update Available",
    description: "Book your update using our online tool.",
  },
  popularActions: [
    { label: "Book an MOT or Service" },
    { label: "Buy Service Plan" },
    { label: "Extend Warranty" },
    { label: "Activate your InControl Account" },
  ],
  aboutVehicle: [
    { label: "Managing Infotainment" },
    { label: "Available Subscriptions" },
    { label: "View Accessories" },
  ],
  loginPrompt:
    "to view personalised information such as warranty, service history and connected services.",
  remoteApp: {
    description:
      "Check vehicle status, manage subscriptions and access connected features with the Remote App.",
    learnMoreLabel: "Learn more",
    qrValue: "/ownership",
  },
  financePromo: {
    title: "0% Finance on servicing, maintenance and accessories",
    description:
      "Spread the cost of servicing, maintenance, tyres and accessories over up to nine months with 0% finance. Choose a flexible payment plan, with nothing to pay for up to 40 days.*",
    ctaLabel: "Learn more",
  },
};

/** The handful of facts that can't be mirrored — real names, real assets. */
interface BrandOverrides {
  vehicle: OwnershipContent["vehicle"];
  remoteAppName: string;
  retailerName: string;
  heroBackground?: string;
}

const overridesByBrand: Record<BrandId, BrandOverrides> = {
  defender: {
    vehicle: {
      name: "Defender 110",
      ownershipRange: "2020 - Present",
      modelUrl: "/models/defender-110.glb",
    },
    remoteAppName: "Land Rover Remote",
    retailerName: "Land Rover",
    heroBackground: "/ownership/hero-defender.avif",
  },
  "range-rover": {
    // Mirrors Defender until Range Rover gets its own finalisation pass.
    vehicle: {
      name: "Defender 110",
      ownershipRange: "2020 - Present",
      modelUrl: "/models/defender-110.glb",
    },
    remoteAppName: "Land Rover Remote",
    retailerName: "Land Rover",
  },
};

export function getOwnershipContent(brandId: BrandId): OwnershipContent {
  const overrides = overridesByBrand[brandId];
  return {
    ...sharedCopy,
    heroBackground: overrides.heroBackground,
    vehicle: overrides.vehicle,
    remoteApp: {
      ...sharedCopy.remoteApp,
      name: overrides.remoteAppName,
    },
    assistance,
    exploreCards,
    financePromo: {
      ...sharedCopy.financePromo,
      disclaimer: `*Subject to status and terms. Available through participating ${overrides.retailerName} Retailers.`,
    },
  };
}

export function getAllOwnershipCards(brandId: BrandId): CardLink[] {
  const content = getOwnershipContent(brandId);
  return [...content.assistance, ...content.exploreCards];
}

export function getOwnershipCard(
  brandId: BrandId,
  slug: string,
): CardLink | undefined {
  return getAllOwnershipCards(brandId).find((card) => card.slug === slug);
}
