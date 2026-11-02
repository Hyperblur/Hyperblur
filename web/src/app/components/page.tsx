import type { Metadata } from "next";
import { CatalogIndex } from "@/components/site/catalog-index";

export const metadata: Metadata = {
  title: "Components",
  description: "Charts, lists, sidebars, dashboards, app UI and agent UI components for React.",
};

export default function ComponentsIndex() {
  return <CatalogIndex group="components" />;
}
