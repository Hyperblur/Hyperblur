"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, effects, groups, type EffectGroup } from "@/registry/meta";
import { docPages } from "./docs-nav";

function activeGroup(pathname: string): EffectGroup {
  if (pathname.startsWith("/components")) return "components";
  if (pathname.startsWith("/blocks")) return "blocks";
  const slug = pathname.startsWith("/effects/") ? pathname.slice("/effects/".length) : null;
  const category = slug ? effects.find((e) => e.slug === slug)?.category : null;
  const group = category ? categories.find((c) => c.id === category)?.group : null;
  return group ?? "effects";
}

export function EffectsSidebar() {
  const pathname = usePathname();
  const group = activeGroup(pathname);
  const current = groups.find((g) => g.id === group);

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
      <div className="mb-3 flex gap-1 rounded-lg border border-line bg-surface p-1 text-xs">
        {groups.map((g) => (
          <Link
            key={g.id}
            href={g.href}
            aria-current={g.id === group ? "page" : undefined}
            className={`flex-auto whitespace-nowrap rounded-md px-1.5 py-1.5 text-center transition-colors ${
              g.id === group ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {g.label}
          </Link>
        ))}
      </div>
      <Link
        href={current?.href ?? "/effects"}
        className={`mb-6 block rounded-lg border border-line px-3 py-2 ${
          pathname === current?.href ? "bg-surface-2 text-ink" : "bg-surface text-muted hover:text-ink"
        }`}
      >
        All {current?.label.toLowerCase()}
      </Link>
      {categories.filter((c) => c.group === group).map((cat) => {
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
