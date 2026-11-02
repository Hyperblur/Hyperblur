import { CatalogLayout } from "@/components/site/catalog-layout";

export default function ComponentsLayout({ children }: LayoutProps<"/components">) {
  return <CatalogLayout>{children}</CatalogLayout>;
}
