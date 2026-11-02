import type { Metadata } from "next";
import Link from "next/link";
import { AnnouncementBar } from "@/registry/hyperblur/announcement-bar";
import { NavbarGlass } from "@/registry/hyperblur/navbar-glass";
import { ProductGrid } from "@/registry/hyperblur/product-grid";
import { Pagination } from "@/registry/hyperblur/pagination";
import { FooterColumns } from "@/registry/hyperblur/footer-columns";

export const metadata: Metadata = {
  title: "Shop template",
  description: "A product listing page with filters, sorting, pagination and a full footer, built only from Hyperblur components.",
};

export default function ShopTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Shop · built from 5 components</p>
          <Link href="/components#site" className="hb-btn hb-btn-ghost hb-btn-sm">
            View components
          </Link>
        </div>
      </div>
      <main className="bg-[#0a0a0a]">
        <AnnouncementBar />
        <NavbarGlass />
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h1 className="font-serif text-4xl italic tracking-tight sm:text-5xl">All products</h1>
          <p className="mt-2 max-w-lg text-muted">Filter by category, sort by price and save your favorites.</p>
          <div className="mt-8">
            <ProductGrid />
          </div>
          <div className="mt-10 flex justify-center">
            <Pagination total={8} defaultPage={1} />
          </div>
        </section>
        <FooterColumns />
      </main>
    </>
  );
}
