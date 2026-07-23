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
}

const EMPTY_HERO: ModelHero = { hasData: false };

const defender110Hero: ModelHero = {
  hasData: true,
  backgroundImage: "/models/hero-defender-110.avif",
  tagline: "The ultimate all-rounder",
  priceFrom: "£64,315",
  monthlyPayment: "£629",
  financeSummary:
    "per month, based on a customer deposit of £5,865.50 and optional final payment of £30,945.00 with 7.9% APR*",
  representativeExample:
    "On the Road Price £74,270.00, Finance Deposit Allowance £3,000.00, Customer Deposit £16,511.00, Total Amount of Credit £54,759.00, Duration of Agreement 49 months, 48 monthly payments of £629.00, Purchase Fee £10.00 (included in the final payment), Optional Final Payment £39,298.00, Total Amount Payable £89,001.00, Representative APR 7.9%, Interest Rate (Fixed) 7.62%, Annual Mileage 10,000 miles.",
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
