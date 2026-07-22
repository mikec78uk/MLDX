"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import type { BrandConfig } from "@/lib/brand";
import type { OwnershipContent } from "@/data/ownership";
import { withBasePath } from "@/lib/basePath";
import { ModelViewer } from "@/components/three/ModelViewerLoader";
import { QrPromo } from "./QrPromo";
import { ArrowRightIcon, PencilIcon, WarningIcon } from "./icons";
import {
  getLookupSnapshot,
  getServerLookupSnapshot,
  lookupReg,
  subscribeToLookup,
  writeStoredLookup,
} from "@/lib/ownership/session";

function InertRow({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between border-b border-[var(--color-border)] py-3 text-left text-sm last:border-b-0"
    >
      <span>{label}</span>
      <span aria-hidden className="text-[var(--color-ink-soft)]">
        &rsaquo;
      </span>
    </button>
  );
}

export function VehicleLookupHero({
  brand,
  content,
}: {
  brand: BrandConfig;
  content: OwnershipContent;
}) {
  // sessionStorage is an external store — useSyncExternalStore reads it
  // safely across server/client without the hydration-mismatch risk of
  // seeding state from an effect (see ModelViewerLoader for the same
  // concern with Canvas/WebGL).
  const lookup = useSyncExternalStore(
    subscribeToLookup,
    getLookupSnapshot,
    getServerLookupSnapshot,
  );
  const [regInput, setRegInput] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!regInput.trim()) return;
    writeStoredLookup(lookupReg(regInput));
  }

  function handleEdit() {
    setRegInput(lookup?.reg ?? "");
    writeStoredLookup(null);
  }

  const isFound = lookup?.status === "found";

  if (!isFound) {
    return (
      <section className="relative -mt-16 min-h-[560px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] lg:h-[60vh] lg:min-h-[560px]">
        {content.heroBackground && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${withBasePath(content.heroBackground)})`,
            }}
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl">Owners</h1>
            <h2 className="mt-4 text-xl text-white/90">
              {content.lookup.heading}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="reg-input">
                {content.lookup.inputLabel}
              </label>
              <input
                id="reg-input"
                type="text"
                value={regInput}
                onChange={(event) => setRegInput(event.target.value)}
                placeholder={content.lookup.inputPlaceholder}
                className="w-[200px] border border-white/40 bg-white/10 px-4 py-3 text-sm uppercase tracking-wide text-white placeholder:normal-case placeholder:text-white/60"
              />
              <button
                type="submit"
                className="cta-label flex items-center justify-center gap-2 whitespace-nowrap bg-[var(--color-paper)] px-6 py-3 text-xs text-[var(--color-ink)] transition-opacity hover:opacity-90"
              >
                <ArrowRightIcon />
                {content.lookup.ctaLabel}
              </button>
            </form>

            {lookup?.status === "not-found" && (
              <p className="mt-3 text-sm text-red-300">
                {content.lookup.notFoundMessage}
              </p>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-6xl px-6 pb-10">
          <div className="flex flex-wrap gap-3">
            {content.lookup.quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="cta-label border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-paper-muted)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl sm:text-5xl">Ownership</h1>

        {lookup && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            {content.vehicle.image ? (
              <div className="relative h-[420px] w-full overflow-hidden rounded-sm bg-[var(--color-paper-muted)] sm:h-[520px]">
                <Image
                  src={withBasePath(content.vehicle.image)}
                  alt={content.vehicle.name}
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            ) : (
              <ModelViewer
                accent={brand.colors.accent}
                modelUrl={content.vehicle.modelUrl}
              />
            )}

            <div>
              <p className="eyebrow text-xs text-[var(--color-ink-soft)]">
                Your vehicle
              </p>
              <h2 className="mt-2 text-3xl">{content.vehicle.name}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                {content.vehicle.ownershipRange} &bull; Registration{" "}
                {lookup.reg}
                <button
                  type="button"
                  onClick={handleEdit}
                  aria-label="Edit registration"
                  className="text-[var(--color-ink)] hover:opacity-60"
                >
                  <PencilIcon />
                </button>
              </p>

              <div className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
                <WarningIcon />
                <div>
                  <p className="text-sm font-medium">
                    {content.securityNotice.title}
                  </p>
                  <p className="text-sm">
                    {content.securityNotice.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow text-xs text-[var(--color-ink-soft)]">
                    Popular Actions
                  </p>
                  <div className="mt-2">
                    {content.popularActions.map((action) => (
                      <InertRow key={action.label} label={action.label} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow text-xs text-[var(--color-ink-soft)]">
                    About your vehicle
                  </p>
                  <div className="mt-2">
                    {content.aboutVehicle.map((action) => (
                      <InertRow key={action.label} label={action.label} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-[var(--color-ink-soft)]">
                <button
                  type="button"
                  className="text-[var(--color-ink)] underline underline-offset-4"
                >
                  Log in
                </button>{" "}
                {content.loginPrompt}
              </p>

              <div className="mt-8">
                <QrPromo
                  appName={content.remoteApp.name}
                  description={content.remoteApp.description}
                  learnMoreLabel={content.remoteApp.learnMoreLabel}
                  qrValue={content.remoteApp.qrValue}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
