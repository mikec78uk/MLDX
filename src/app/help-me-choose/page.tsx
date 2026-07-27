import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { HelpMeChooseFlow } from "@/components/help-me-choose/HelpMeChooseFlow";

export const metadata: Metadata = {
  title: `Help Me Choose | ${brand.name}`,
};

export default function HelpMeChoosePage() {
  return <HelpMeChooseFlow />;
}
