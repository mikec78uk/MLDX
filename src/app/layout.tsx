import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getBrand } from "@/lib/brand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const brand = getBrand();

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description,
};

const brandStyle = {
  "--color-ink": brand.colors.ink,
  "--color-ink-soft": brand.colors.inkSoft,
  "--color-paper": brand.colors.paper,
  "--color-paper-muted": brand.colors.paperMuted,
  "--color-border": brand.colors.border,
  "--color-overlay": brand.colors.overlay,
  "--color-accent": brand.colors.accent,
  "--color-accent-ink": brand.colors.accentInk,
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-brand={brand.id} style={brandStyle} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader brand={brand} />
        <main className="flex-1">{children}</main>
        <SiteFooter brand={brand} />
      </body>
    </html>
  );
}
