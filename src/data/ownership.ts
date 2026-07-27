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
    /** Static cutout shot, preferred over the 3D viewer when set. */
    image?: string;
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

const vehicle: OwnershipContent["vehicle"] = {
  name: "Defender 110",
  ownershipRange: "2020 - Present",
  modelUrl: "/models/defender-110.glb",
  image: "/ownership/vehicle-defender-110.png",
};

const REMOTE_APP_NAME = "Land Rover Remote";
const RETAILER_NAME = "Land Rover";

export function getOwnershipContent(): OwnershipContent {
  return {
    ...sharedCopy,
    heroBackground: "/ownership/hero-defender.avif",
    vehicle,
    remoteApp: {
      ...sharedCopy.remoteApp,
      name: REMOTE_APP_NAME,
    },
    assistance,
    exploreCards,
    financePromo: {
      ...sharedCopy.financePromo,
      disclaimer: `*Subject to status and terms. Available through participating ${RETAILER_NAME} Retailers.`,
      image: "/ownership/finance-defender.avif",
    },
  };
}

export function getAllOwnershipCards(): CardLink[] {
  const content = getOwnershipContent();
  return [...content.assistance, ...content.exploreCards];
}

export function getOwnershipCard(slug: string): CardLink | undefined {
  return getAllOwnershipCards().find((card) => card.slug === slug);
}
