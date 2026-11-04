import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, effects, groups } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { EffectCard } from "@/components/site/effect-card";

type Params = PageProps<"/category/[id]">["params"];

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const cat = categories.find((c) => c.id === id);
  if (!cat) return {};
  return { title: cat.label, description: `Every ${cat.label.toLowerCase()} item in the Hyperblur catalog.` };
}

export default async function CategoryPage({ params }: PageProps<"/category/[id]">) {
  const { id } = await params;
  const index = categories.findIndex((c) => c.id === id);
  if (index < 0) notFound();
  const cat = categories[index];
  const group = groups.find((g) => g.id === cat.group);
  const items = effects.filter((e) => e.category === cat.id);
  const prev = categories.slice(0, index).reverse().find((c) => effects.some((e) => e.category === c.id));
  const next = categories.slice(index + 1).find((c) => effects.some((e) => e.category === c.id));

  return (
    <div>
      <nav className="mb-5 text-sm text-muted">
        <Link href={group?.href ?? "/effects"} className="hover:text-ink">
          {group?.label}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{cat.label}</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight">{cat.label}</h1>
      <p className="mt-2 text-muted">{items.length} copy-paste items in this section.</p>
      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6">
        {items.map((meta) => (
          <EffectCard key={meta.slug} meta={meta} demo={demos[meta.slug]} large />
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-3xl gap-3 border-t border-line pt-6">
        {prev ? (
          <Link
            href={`/category/${prev.id}`}
            className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-line-2"
          >
            <span className="block text-xs text-muted">Previous section</span>
            <span className="block truncate text-sm font-medium">{prev.label}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/category/${next.id}`}
            className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-right transition-colors hover:border-line-2"
          >
            <span className="block text-xs text-muted">Next section</span>
            <span className="block truncate text-sm font-medium">{next.label}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </div>
  );
}
