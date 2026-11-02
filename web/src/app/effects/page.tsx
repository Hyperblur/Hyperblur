import type { Metadata } from "next";
import { CatalogIndex } from "@/components/site/catalog-index";

export const metadata: Metadata = {
  title: "Effects",
  description: "Text, motion, background, hover and button effects for React.",
};

export default function EffectsIndex() {
  return <CatalogIndex group="effects" />;
}
