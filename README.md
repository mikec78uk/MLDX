# MLDX Prototype

A usability-testing prototype for **Range Rover**, reskinned for **Land Rover
Defender**, covering model exploration and ownership details. No car
configurator — that's explicitly out of scope.

Built with Next.js (App Router, TypeScript, Tailwind CSS v4), GSAP for
scroll/entrance motion, and Three.js (via React Three Fiber) for an
in-page 3D model viewer. Both are used deliberately for moments that need
them — not sprinkled in for their own sake.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brand system: one codebase, two skins

The client's reskin approach is **70% core functionality / 20% content /
10% localisation** — meaning Range Rover and Defender share the same
components, layouts and interactions, and differ mainly in content and
brand tokens. This repo implements that as a single codebase with a brand
config layer rather than duplicated folders or branches:

- [`src/lib/brand/`](src/lib/brand) — `BrandConfig` type plus one file per
  brand (`range-rover.ts`, `defender.ts`) holding colour tokens, fonts,
  copy and logo references.
- [`src/lib/brand/index.ts`](src/lib/brand/index.ts) — `getBrand()` reads
  `NEXT_PUBLIC_BRAND` (`range-rover` | `defender`) and resolves the active
  config. Defaults to `range-rover`.
- [`src/app/layout.tsx`](src/app/layout.tsx) — injects the active brand's
  colours as CSS custom properties on `<html>`, so every component just
  references `var(--color-*)` / `var(--font-*)` and never hardcodes a
  brand value.
- [`src/data/`](src/data) — per-brand content (models, ownership copy).
  This is where the "20%" content differences and eventual localisation
  strings should live.

**In practice this means two separate deployments from the same repo**,
one per brand, distinguished only by the `NEXT_PUBLIC_BRAND` env var (see
`.env.example`). To preview the other skin locally:

```bash
NEXT_PUBLIC_BRAND=defender npm run dev
```

## Style guide

Design tokens are seeded from the live [landrover.co.uk/defender](https://www.landrover.co.uk/defender/index.html)
stylesheet (colours, type stack, uppercase CTA treatment, generous
whitespace, full-bleed imagery). See [`src/app/globals.css`](src/app/globals.css).

**Fonts:** the real site uses licensed JLR web fonts — `LandRoverWeb`
(display/headings) and `AvenirNext` (body copy). Those font files are
proprietary and are **not** included in this repo. `@font-face` rules are
already wired up expecting files at `public/fonts/land-rover/`; drop the
licensed `.woff2` files in there (see filenames in `globals.css`) to
activate them. Until then, the site falls back to Helvetica
Neue/Arial, matching the real site's own fallback stack, so it still
renders sensibly.

Brand accent colours: Defender's `#ff7f00` is verified from the live
site's CSS. Range Rover's accent (`#8a7256`) is a placeholder — swap it
for the approved brand hex in `src/lib/brand/range-rover.ts` once
supplied.

## Structure

- `src/app/` — routes: home, `/models`, `/models/[slug]`, `/ownership`.
- `src/components/` — `layout/` (header/footer), `home/` (Hero, GSAP),
  `models/`, `ownership/`, `three/` (`ModelViewer`, the R3F canvas).
- `src/lib/gsap/registerPlugins.ts` — registers GSAP's ScrollTrigger once,
  client-side only. Animations respect `prefers-reduced-motion` via
  `gsap.matchMedia()`.
- `src/components/three/ModelViewer.tsx` — placeholder vehicle geometry
  in a lit, orbit-controlled canvas. Swap the placeholder mesh for a real
  glTF (`useGLTF` from `@react-three/drei`) once per-model 3D assets are
  available; the rig (lighting, shadows, controls) stays as-is.

## Password protection (Vercel)

`src/proxy.ts` adds a Basic Auth gate, active only when `SITE_PASSWORD`
is set. Locally it's a no-op. To protect a Vercel deployment, set these as
environment variables on the Vercel project:

- `SITE_PASSWORD` — required to enable the gate.
- `SITE_USERNAME` — optional, defaults to `preview`.

## Deployment

Two Vercel projects pointing at this same GitHub repo
([mikec78uk/MLDX](https://github.com/mikec78uk/MLDX)), each with its own
`NEXT_PUBLIC_BRAND` env var:

| Vercel project | `NEXT_PUBLIC_BRAND` |
| --- | --- |
| range-rover prototype | `range-rover` |
| defender prototype | `defender` |

Set `SITE_PASSWORD` on both once ready to share for usability testing.
**This is the password-protected link for actual usability-testing
participants.**

## Quick skin preview (GitHub Pages)

For a quick, no-deploy way to eyeball both skins side by side, `.github/workflows/github-pages.yml`
builds a static export of each brand on every push to `main` and publishes
them to GitHub Pages. Because your GitHub user site already has
`playground.hellomike.co.uk` set as its custom domain, this repo's Pages
site inherits it automatically:

- `playground.hellomike.co.uk/MLDX/` — links to both skins
- `playground.hellomike.co.uk/MLDX/range-rover/`
- `playground.hellomike.co.uk/MLDX/defender/`

**This mirror has no password gate** — static export can't run
`src/proxy.ts` (no server), so it's openly viewable. Fine for your own
quick checks; don't use it as the link you send out for testing.

**One-time manual step:** in this repo's GitHub settings, go to
**Settings → Pages → Build and deployment → Source**, and set it to
**"GitHub Actions"**. I can't flip that setting myself (it needs an
authenticated API call I don't have credentials for) — once it's set,
every push to `main` deploys automatically.

To build the same static export locally:

```bash
npm run build:pages   # writes dist/range-rover, dist/defender, dist/index.html
```
