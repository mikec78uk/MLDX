@AGENTS.md

# MLDX Prototype

Usability-testing prototype for Range Rover (reskinned for Defender):
model exploration + ownership details only, no configurator.

- Brand system lives in `src/lib/brand/` — never hardcode brand colours,
  copy, or names in components. Read from `getBrand()` / CSS vars
  (`var(--color-*)`, `var(--font-*)`) instead. See README.md for the full
  brand architecture.
- GSAP: register plugins via `src/lib/gsap/registerPlugins.ts`, animate
  with `@gsap/react`'s `useGSAP` hook, and gate motion behind
  `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- Three.js: `src/components/three/ModelViewer.tsx` is a placeholder rig
  (lighting/shadows/OrbitControls) around abstract geometry — swap the
  geometry for real glTF assets via `useGLTF`, don't rebuild the rig.
- Use GSAP/Three.js where they earn their place (hero motion, product
  viewers) — not by default on every element.
