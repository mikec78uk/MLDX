import type { BrandConfig } from "./types";

export const rangeRover: BrandConfig = {
  id: "range-rover",
  name: "Range Rover",
  shortName: "Range Rover",
  tagline: "Modern luxury, uncompromised",
  description:
    "Explore the Range Rover family and everything that comes with ownership.",
  logo: {
    src: "/brands/range-rover/logo.svg",
    alt: "Range Rover",
  },
  colors: {
    ink: "#141414",
    inkSoft: "#4a4f54",
    paper: "#ffffff",
    paperMuted: "#f5f5f5",
    border: "rgba(12, 18, 28, 0.16)",
    overlay: "rgba(12, 18, 28, 0.6)",
    // Placeholder accent — swap for the approved Range Rover brand hex
    // once supplied by the client (not present in publicly readable CSS).
    accent: "#8a7256",
    accentInk: "#ffffff",
  },
  fonts: {
    display: "var(--font-display)",
    body: "var(--font-body)",
  },
};
