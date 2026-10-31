import type { Metadata } from "next";
import { categories, effects } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { EffectCard } from "@/components/site/effect-card";

export const metadata: Metadata = {
  title: "Effects",
  description: "Every Hyperblur effect, grouped by category.",
};

export default function EffectsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Effects</h1>
      <p className="mt-2 text-muted">
        {effects.length} copy-paste components. Hover a card to play it, open it for install and props.
      </p>
      {categories.map((cat) => {
        const items = effects.filter((e) => e.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} className="mt-10">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">
              {cat.label} · {items.length}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((meta) => (
                <EffectCard key={meta.slug} meta={meta} demo={demos[meta.slug]} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
