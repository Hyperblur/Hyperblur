import Link from "next/link";
import { categories, effects, groups, type EffectGroup } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { EffectCard } from "@/components/site/effect-card";

const intro: Record<EffectGroup, string> = {
  effects: "Text, motion, backgrounds, hover and pointer effects, buttons and transitions. Hover a card to play it.",
  components: "Charts, lists, sidebars, dashboards, app screens, agent UI and website elements.",
  blocks: "Full page sections: heroes, features, pricing, footers, auth, blog, ecommerce and more.",
};

export function CatalogIndex({ group }: { group: EffectGroup }) {
  const meta = groups.find((g) => g.id === group);
  const cats = categories.filter((c) => c.group === group);
  const total = effects.filter((e) => cats.some((c) => c.id === e.category)).length;
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{meta?.label}</h1>
      <p className="mt-2 text-muted">
        {total} copy-paste items. {intro[group]}
      </p>
      {cats.length > 3 && (
        <nav aria-label="Categories" className="mt-5 flex flex-wrap gap-2">
          {cats.map((cat) => {
            const count = effects.filter((e) => e.category === cat.id).length;
            if (!count) return null;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-line-2 hover:text-ink"
              >
                {cat.label} <span className="ml-1 font-mono text-[11px] opacity-70">{count}</span>
              </a>
            );
          })}
        </nav>
      )}
      {cats.map((cat) => {
        const items = effects.filter((e) => e.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="mt-10 scroll-mt-20">
            <h2 className="mb-4 flex items-center justify-between gap-3 text-sm font-medium uppercase tracking-wide text-muted">
              <span>
                {cat.label} · {items.length}
              </span>
              <Link
                href={`/category/${cat.id}`}
                className="rounded-full border border-line px-3 py-1 text-xs normal-case tracking-normal transition-colors hover:border-line-2 hover:text-ink"
              >
                View all
              </Link>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <EffectCard key={item.slug} meta={item} demo={demos[item.slug]} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
