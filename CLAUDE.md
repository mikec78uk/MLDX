@AGENTS.md

# MLDX Prototype

Usability-testing prototype for Land Rover Defender: model exploration +
ownership details only, no configurator.

- Brand copy/colours live in `src/lib/brand.ts` — never hardcode brand
  colours, copy, or names directly in components. Import `brand` from
  `@/lib/brand`, or reference the CSS vars (`var(--color-*)`,
  `var(--font-*)`) for styling.
- GSAP: register plugins via `src/lib/gsap/registerPlugins.ts`, animate
  with `@gsap/react`'s `useGSAP` hook, and gate motion behind
  `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- Three.js: `src/components/three/ModelViewer.tsx` is a placeholder rig
  (lighting/shadows/OrbitControls) around abstract geometry — swap the
  geometry for real glTF assets via `useGLTF`, don't rebuild the rig.
- Use GSAP/Three.js where they earn their place (hero motion, product
  viewers) — not by default on every element.
