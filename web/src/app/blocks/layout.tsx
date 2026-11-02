import { CatalogLayout } from "@/components/site/catalog-layout";

export default function BlocksLayout({ children }: LayoutProps<"/blocks">) {
  return <CatalogLayout>{children}</CatalogLayout>;
}
