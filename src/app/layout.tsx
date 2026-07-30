import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingChatButton } from "@/components/layout/FloatingChatButton";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {/* `grow` rather than `flex-1`: flex-1's `flex-basis: 0%` would size
            main from the body's height instead of its own content, which is
            what let page content overflow the body's box. Basis stays auto
            here, so main is at least its content height and still stretches
            to fill a short page. */}
        <main className="grow">{children}</main>
        <SiteFooter />
        <FloatingChatButton />
      </body>
    </html>
  );
}
