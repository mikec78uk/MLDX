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
 * Dealer-stock listings for the "Available Cars" carousel teaser on the
 * model overview page. Content and photography sourced from the user's
 * Figma mockup (fileKey xC9svLeoUtl9O7Bl329BcF, node 13:2).
 */
const defender110: AvailableVehiclesData = {
  hasData: true,
  vehicles: [
    {
      slug: "hard-top-x-dynamic-hse-new",
      image: "/models/available-cars/vehicle-1.png",
      condition: "New",
      name: "Defender 110 Hard Top X-Dynamic HSE",
      engine: "D350 Diesel Mild Hybrid",
      priceLabel: "On The Road Price (VAT Included)",
      price: "£71,720",
      fuelType: "Diesel",
      collection: "Collection 5 days",
      dealer: "Lookers Land Rover, West London",
    },
    {
      slug: "xs-edition-preowned",
      image: "/models/available-cars/vehicle-2.png",
      condition: "Pre-Owned",
      name: "Defender 110 XS Edition",
      engine: "P400 Automatic Petrol",
      priceLabel: "Purchase Price",
      price: "£55,699",
      fuelType: "Petrol",
      collection: "Collection 5 days",
      mileage: "28,927 miles",
      dealer: "Stratstone Land Rover, Tonbridge",
    },
    {
      slug: "x-preowned",
      image: "/models/available-cars/vehicle-3.png",
      condition: "Pre-Owned",
      name: "Defender 110 X",
      engine: "P400 Automatic Petrol",
      priceLabel: "Purchase Price",
      price: "£52,000",
      fuelType: "Petrol",
      collection: "Collection 5 days",
      mileage: "30,803 miles",
      dealer: "Group 1 Land Rover, Sidcup",
    },
  ],
};

const bySlug: Record<string, AvailableVehiclesData> = {
  "defender-110": defender110,
};

export function getAvailableVehicles(slug: string): AvailableVehiclesData {
  return bySlug[slug] ?? EMPTY;
}
