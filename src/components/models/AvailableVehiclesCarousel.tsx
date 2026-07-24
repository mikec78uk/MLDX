"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type {
  AvailableVehiclesData,
  VehicleCondition,
} from "@/data/availableVehicles";
import { ArrowRightIcon } from "@/components/icons";

const FILTERS: Array<"All" | VehicleCondition> = ["All", "New", "Pre-Owned"];

/**
 * "Full details" and "Build your own" have no real destinations yet —
 * rendered as real-looking but inert controls, matching the pattern already
 * used for undetermined links elsewhere.
 *
 * The card row breaks out of the page's max-w container to bleed edge to
 * edge (relative/left-1/2/-translate-x-1/2 full-bleed trick), and cards are
 * sized so a sliver of the next one peeks in on mobile — a visual cue that
 * the row scrolls.
 */
export function AvailableVehiclesCarousel({
  modelName,
  vehicles,
}: {
  modelName: string;
  vehicles: AvailableVehiclesData;
}) {
  const [filter, setFilter] = useState<"All" | VehicleCondition>("All");

  if (!vehicles.hasData) return null;

  const visible =
    filter === "All"
      ? vehicles.vehicles
      : vehicles.vehicles.filter((vehicle) => vehicle.condition === filter);

  return (
    <div className="mt-12">
      <p className="eyebrow text-xs text-white/60">Available Cars</p>
      <h3 className="mt-3 max-w-2xl text-2xl sm:text-3xl">
        A selection of {modelName} models available now
      </h3>
      <p className="mt-3 max-w-2xl text-sm text-white/60">
        We recommend that you confirm with your dealer before you visit, that
        your model of interest is available to view.
      </p>

      <div className="mt-6 flex items-center gap-6">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={`cta-label border-b-2 pb-1 text-xs transition-colors ${
              filter === option
                ? "border-white text-white"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden">
          {visible.map((vehicle) => (
            <article
              key={vehicle.slug}
              className="w-[80vw] shrink-0 snap-start rounded-[5px] bg-white/[0.06] p-5 sm:w-[300px]"
            >
              <div className="relative aspect-[283/159] w-full overflow-hidden rounded-[4px] bg-white/5">
                <Image
                  src={withBasePath(vehicle.image)}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] text-[var(--color-ink)]">
                  {vehicle.condition}
                </span>
              </div>

              <p className="mt-4 text-lg text-white/90">{vehicle.name}</p>
              <p className="mt-1 text-sm text-white/60">{vehicle.engine}</p>

              <div className="mt-4 border-t border-white/15 pt-4">
                <p className="text-[11px] text-white/60">
                  {vehicle.priceLabel}
                </p>
                <p className="mt-1 text-xl text-white">{vehicle.price}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/15 pt-4 text-xs text-white/60">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  {vehicle.fuelType}
                </span>
                <span>{vehicle.collection}</span>
                {vehicle.mileage && <span>{vehicle.mileage}</span>}
              </div>

              <button
                type="button"
                className="cta-label mt-5 flex items-center gap-2 whitespace-nowrap bg-white px-5 py-3 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90"
              >
                <ArrowRightIcon />
                Full details
              </button>
              <p className="mt-3 text-xs text-white/50">{vehicle.dealer}</p>
            </article>
          ))}

          <article className="relative flex w-[80vw] shrink-0 snap-start flex-col items-center justify-center overflow-hidden rounded-[5px] bg-white/[0.06] p-8 text-center sm:w-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage: `url(${withBasePath("/ownership/vehicle-defender-110.png")})`,
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="text-2xl text-white">Create your own adventure</p>
              <p className="mt-3 text-sm text-white/70">
                Design your {modelName} exactly how you want it
              </p>
              <button
                type="button"
                className="cta-label mt-6 inline-flex items-center gap-2 whitespace-nowrap bg-white px-5 py-3 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90"
              >
                <ArrowRightIcon />
                Build your own
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
