import type { Metadata } from "next";
import { getBrand } from "@/lib/brand";
import { ownershipPillars } from "@/data/ownership";
import { OwnershipPillars } from "@/components/ownership/OwnershipPillars";

const brand = getBrand();

export const metadata: Metadata = {
  title: `Ownership | ${brand.name}`,
};

export default function OwnershipPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="eyebrow text-xs text-[var(--color-ink-soft)]">
        Ownership
      </p>
      <h1 className="mt-3 max-w-xl text-4xl sm:text-5xl">
        Everything that comes with owning a {brand.shortName}
      </h1>
      <div className="mt-16">
        <OwnershipPillars pillars={ownershipPillars} />
      </div>
    </div>
  );
}
