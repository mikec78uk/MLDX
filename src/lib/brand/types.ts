export type BrandId = "range-rover" | "defender";

export interface BrandColors {
  ink: string;
  inkSoft: string;
  paper: string;
  paperMuted: string;
  border: string;
  overlay: string;
  accent: string;
  accentInk: string;
}

export interface BrandFonts {
  /** Display face used for headings and CTAs. */
  display: string;
  /** Body copy face. */
  body: string;
}

export interface BrandConfig {
  id: BrandId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: {
    src: string;
    alt: string;
  };
  colors: BrandColors;
  fonts: BrandFonts;
}
