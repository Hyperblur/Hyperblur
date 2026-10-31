"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, effects } from "@/registry/meta";
import { docPages } from "./docs-nav";

export function EffectsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="text-sm">
      <div className="mb-6">
        <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-muted">Get started</h3>
        <ul className="space-y-0.5">
          {docPages.map((page) => {
            const active = pathname === page.href;
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className={`block rounded-md px-3 py-1.5 transition-colors ${
                    active ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Link
        href="/effects"
        className={`mb-6 block rounded-lg border border-line px-3 py-2 ${
          pathname === "/effects" ? "bg-surface-2 text-ink" : "bg-surface text-muted hover:text-ink"
        }`}
      >
        All effects
      </Link>
      {categories.map((cat) => {
        const items = effects.filter((e) => e.category === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-muted">{cat.label}</h3>
            <ul className="space-y-0.5">
              {items.map((e) => {
                const active = pathname === `/effects/${e.slug}`;
                return (
                  <li key={e.slug}>
                    <Link
                      href={`/effects/${e.slug}`}
                      className={`block rounded-md px-3 py-1.5 transition-colors ${
                        active ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface hover:text-ink"
                      }`}
                    >
                      {e.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
