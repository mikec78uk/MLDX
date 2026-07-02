import type { BrandConfig } from "./types";

export const defender: BrandConfig = {
  id: "defender",
  name: "Land Rover Defender",
  shortName: "Defender",
  tagline: "Embrace the impossible",
  description:
    "Explore the Defender family and everything that comes with ownership.",
  logo: {
    src: "/brands/defender/logo.svg",
    alt: "Land Rover Defender",
  },
  colors: {
    ink: "#141414",
    inkSoft: "#4a4f54",
    paper: "#ffffff",
    paperMuted: "#f5f5f5",
    border: "rgba(12, 18, 28, 0.16)",
    overlay: "rgba(12, 18, 28, 0.6)",
    // Verified against the live landrover.co.uk/defender stylesheet.
    accent: "#ff7f00",
    accentInk: "#141414",
  },
  fonts: {
    display: "var(--font-display)",
    body: "var(--font-body)",
  },
};
