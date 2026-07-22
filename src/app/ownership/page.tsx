import type { Metadata } from "next";
import { getBrand } from "@/lib/brand";
import { getOwnershipContent } from "@/data/ownership";
import { VehicleLookupHero } from "@/components/ownership/VehicleLookupHero";
import { ClickableCardGrid } from "@/components/ownership/ClickableCardGrid";
import { FinancePromo } from "@/components/ownership/FinancePromo";

const brand = getBrand();

export const metadata: Metadata = {
  title: `Ownership | ${brand.name}`,
};

export default function OwnershipPage() {
  const content = getOwnershipContent(brand.id);

  return (
    <div>
      <VehicleLookupHero brand={brand} content={content} />

      <ClickableCardGrid
        title="Need Assistance"
        cards={content.assistance}
        columns={2}
      />
      <ClickableCardGrid
        title="Explore Ownership"
        cards={content.exploreCards}
        variant="tile"
      />
      <FinancePromo promo={content.financePromo} />
    </div>
  );
}
