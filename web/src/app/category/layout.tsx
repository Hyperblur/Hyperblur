import type { ReactNode } from "react";
import { CatalogLayout } from "@/components/site/catalog-layout";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return <CatalogLayout>{children}</CatalogLayout>;
}
