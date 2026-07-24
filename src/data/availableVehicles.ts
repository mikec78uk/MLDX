export type VehicleCondition = "New" | "Pre-Owned";
export type FuelType = "Petrol" | "Diesel" | "Hybrid";

export interface AvailableVehicle {
  slug: string;
  image: string;
  condition: VehicleCondition;
  name: string;
  engine: string;
  priceLabel: string;
  price: string;
  fuelType: FuelType;
  collection: string;
  mileage?: string;
  dealer: string;
}

export interface AvailableVehiclesData {
  hasData: boolean;
  vehicles: AvailableVehicle[];
}

const EMPTY: AvailableVehiclesData = { hasData: false, vehicles: [] };

/**
 * Placeholder dealer-stock listings for the "Available Cars" carousel teaser
 * on the model overview page. Reuses the same product photography as the
 * Models tab (src/data/modelVariants.ts) since no dealer-stock photography
 * exists yet.
 */
const defender110: AvailableVehiclesData = {
  hasData: true,
  vehicles: [
    {
      slug: "x-dynamic-hse-new",
      image: "/models/variants/defender-110-x-dynamic-hse.png",
      condition: "New",
      name: "Defender 110 X-Dynamic HSE",
      engine: "D350 Diesel Mild Hybrid",
      priceLabel: "On The Road Price (VAT Included)",
      price: "£74,270",
      fuelType: "Diesel",
      collection: "Collection in 5 days",
      dealer: "Lookers Land Rover, West London",
    },
    {
      slug: "vertex-preowned",
      image: "/models/variants/defender-110-vertex.png",
      condition: "Pre-Owned",
      name: "Defender 110 Vertex Edition",
      engine: "P400 Automatic Petrol",
      priceLabel: "Purchase Price",
      price: "£55,699",
      fuelType: "Petrol",
      collection: "Collection in 5 days",
      mileage: "28,927 miles",
      dealer: "Stratstone Land Rover, Tonbridge",
    },
    {
      slug: "x-preowned",
      image: "/models/variants/defender-110-x.png",
      condition: "Pre-Owned",
      name: "Defender 110 X",
      engine: "P400 Automatic Petrol",
      priceLabel: "Purchase Price",
      price: "£52,000",
      fuelType: "Petrol",
      collection: "Collection in 5 days",
      mileage: "30,803 miles",
      dealer: "Group 1 Land Rover, Sidcup",
    },
    {
      slug: "trophy-black-new",
      image: "/models/variants/defender-110-trophy-black.png",
      condition: "New",
      name: "Defender 110 Trophy Edition",
      engine: "P400 Automatic Petrol",
      priceLabel: "On The Road Price (VAT Included)",
      price: "£97,900",
      fuelType: "Petrol",
      collection: "Collection in 7 days",
      dealer: "Land Rover Solihull",
    },
  ],
};

const bySlug: Record<string, AvailableVehiclesData> = {
  "defender-110": defender110,
};

export function getAvailableVehicles(slug: string): AvailableVehiclesData {
  return bySlug[slug] ?? EMPTY;
}
