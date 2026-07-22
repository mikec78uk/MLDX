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
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <h1 className="text-4xl sm:text-5xl">Ownership</h1>
      </div>

      <div className="mt-8">
        <VehicleLookupHero brand={brand} content={content} />
      </div>

      <ClickableCardGrid
        title="Need Assistance"
        cards={content.assistance}
        columns={2}
      />
      <ClickableCardGrid title="Explore Ownership" cards={content.exploreCards} />
      <FinancePromo promo={content.financePromo} />
    </div>
  );
}
