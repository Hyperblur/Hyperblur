import type { Metadata } from "next";
import { CatalogIndex } from "@/components/site/catalog-index";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Full page sections for React: heroes, features, pricing, footers, auth, blog and ecommerce.",
};

export default function BlocksIndex() {
  return <CatalogIndex group="blocks" />;
}
