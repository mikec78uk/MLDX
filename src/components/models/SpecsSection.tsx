"use client";

import { useState } from "react";
import type { ModelSpecs, SpecGroup } from "@/data/modelSpecs";

function rowIsUniform(values: Record<string, string>): boolean {
  const all = Object.values(values);
  return all.every((value) => value === all[0]);
}

export function SpecsSection({
  modelName,
  specs,
}: {
  modelName: string;
  specs: ModelSpecs;
}) {
  const [onlyDifferences, setOnlyDifferences] = useState(false);

  const visibleGroups: SpecGroup[] = onlyDifferences
    ? specs.groups
        .map((group) => ({
          ...group,
          rows: group.rows.filter((row) => !rowIsUniform(row.values)),
        }))
        .filter((group) => group.rows.length > 0)
    : specs.groups;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-paper-muted)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">Specs</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Models and specifications</h2>

        {!specs.hasData ? (
          <p className="mt-8 max-w-lg text-[var(--color-ink-soft)]">
            Detailed specifications for {modelName} are coming soon.
          </p>
        ) : (
          <>
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={onlyDifferences}
                onClick={() => setOnlyDifferences((value) => !value)}
                className={`flex h-6 w-11 shrink-0 items-center border border-[var(--color-ink)] p-0.5 transition-colors ${
                  onlyDifferences ? "bg-[var(--color-ink)]" : "bg-[var(--color-paper)]"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-4 w-4 transition-transform ${
                    onlyDifferences
                      ? "translate-x-5 bg-[var(--color-paper)]"
                      : "translate-x-0 bg-[var(--color-ink)]"
                  }`}
                />
              </button>
              <label className="cta-label text-xs">
                Show only differences between models
              </label>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[900px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <th className="w-[220px] min-w-[220px] px-4 py-3 text-left align-bottom" />
                    {specs.trims.map((trim) => (
                      <th
                        key={trim.slug}
                        className="min-w-[170px] border-b border-[var(--color-border)] px-4 py-3 text-left align-bottom font-normal"
                      >
                        <p className="text-base">{trim.name}</p>
                        <p className="eyebrow mt-1 text-xs text-[var(--color-ink-soft)]">
                          From {trim.priceFrom}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                {visibleGroups.map((group) => (
                  <tbody key={group.title}>
                    <tr>
                      <th
                        colSpan={specs.trims.length + 1}
                        scope="colgroup"
                        className="px-4 pt-8 pb-2 text-left"
                      >
                        <p className="eyebrow text-xs text-[var(--color-ink-soft)]">
                          {group.title}
                        </p>
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-t border-[var(--color-border)]">
                        <th
                          scope="row"
                          className="px-4 py-3 text-left align-top font-normal whitespace-nowrap text-[var(--color-ink-soft)]"
                        >
                          {row.label}
                        </th>
                        {specs.trims.map((trim) => (
                          <td key={trim.slug} className="px-4 py-3 align-top">
                            {row.values[trim.slug] ?? "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            <div className="mt-10 space-y-2">
              {specs.footnotes.map((note) => (
                <p key={note} className="max-w-2xl text-xs text-[var(--color-ink-soft)]">
                  {note}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
