export interface ModelHeroHotspot {
  /** Position as a percentage of the hero section's box (not the raw image). */
  x: number;
  y: number;
  label: string;
  highlights: string[];
}

export interface ModelHero {
  hasData: boolean;
  backgroundImage?: string;
  tagline?: string;
  priceFrom?: string;
  monthlyPayment?: string;
  financeSummary?: string;
  representativeExample?: string;
  hotspot?: ModelHeroHotspot;
  /**
   * Opts the overview content below the hero into a dark theme. A separate
   * flag from hasData on purpose — this is a per-model styling choice (e.g.
   * illustrating that a flagship/adventure model can read darker than a
   * standard one), not something every model with real hero content should
   * automatically inherit.
   */
  darkOverview?: boolean;
}

const EMPTY_HERO: ModelHero = { hasData: false };

const defender110Hero: ModelHero = {
  hasData: true,
  darkOverview: true,
  backgroundImage: "/models/overview/hero-background.png",
  tagline: "Go Anywhere. Bring Everything.",
  priceFrom: "£64,315",
  monthlyPayment: "£599",
  financeSummary: "per month PCP, plus deposit and optional final payment*",
  representativeExample:
    "Representative Example relates to a Defender 110 26MY D250 X-Dynamic SE. 7.9% APR Representative available on Defender 110 models ordered between 24th July 2026 and 30th September 2026, and registered by 31st March 2027 at participating retailers only. With Land Rover Personal Contract Purchase you have the option at the end of the agreement to: (1) return the vehicle and not pay the Optional Final Payment. If the vehicle has exceeded the permitted maximum mileage a charge per excess mile will apply. In this example if the vehicle has exceeded the permitted maximum mileage of 40,833 miles, a charge of 16.8p (including VAT at 20%) will apply per excess mile. If the vehicle is in good condition (fair wear and tear accepted) and has not exceeded 40,833 miles you will have nothing further to pay. (2) pay the Optional Final Payment to own the vehicle or (3) part exchange the vehicle subject to settlement of your existing credit agreement; new credit agreements are subject to status. Finance Example is based upon an annual mileage of 10,000 miles. Credit is subject to status and only available to UK residents, aged 18 and over. This credit offer is only available through Black Horse Limited trading as Land Rover Financial Services, St William House, Tresillian Terrace, Cardiff CF10 5BH.",
  hotspot: {
    x: 64,
    y: 46,
    label: "As shown",
    highlights: [
      "Expedition roof rack with roof cargo bag",
      "All-terrain tyres with rear-mounted spare",
      "Deep green metallic exterior finish",
    ],
  },
};

const heroBySlug: Record<string, ModelHero> = {
  "defender-110": defender110Hero,
};

export function getModelHero(slug: string): ModelHero {
  return heroBySlug[slug] ?? EMPTY_HERO;
}
