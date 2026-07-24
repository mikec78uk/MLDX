/**
 * Total SiteHeader height (utility bar + main bar), as the `--header-height`
 * CSS custom property defined in globals.css. Consumed via
 * `var(--header-height)` in Tailwind arbitrary values (e.g.
 * `top-[var(--header-height)]`) — never interpolate this into a template
 * literal class name, since Tailwind can't statically see a JS-built string.
 */
export const HEADER_HEIGHT_VAR = "var(--header-height)";
