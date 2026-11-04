import fs from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, effects, getEffect, getNeighbors, groups, installCommand, agentPrompt } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { CopyButton } from "@/components/site/copy-button";
import { NewBadge } from "@/components/site/new-badge";
import { PagerBottom, PagerMobileBar, PagerTop } from "@/components/site/item-pager";
import { CodeBlock } from "@/components/site/code-block";
import { EffectTabs } from "@/components/site/effect-tabs";

type Params = PageProps<"/effects/[slug]">["params"];

export function generateStaticParams() {
  return effects.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getEffect(slug);
  if (!meta) return {};
  return { title: meta.title, description: meta.description };
}

function readSource(slug: string): string {
  const file = path.join(process.cwd(), "src/registry/hyperblur", `${slug}.tsx`);
  return fs.readFileSync(file, "utf8");
}

export default function EffectPage({ params }: PageProps<"/effects/[slug]">) {
  return (
    <article className="min-w-0">
      <Suspense fallback={<Skeleton />}>
        <EffectContent params={params} />
      </Suspense>
    </article>
  );
}

function Skeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="h-4 w-40 rounded bg-surface-2" />
      <div className="mt-6 h-9 w-72 rounded bg-surface-2" />
      <div className="mt-3 h-5 w-96 max-w-full rounded bg-surface-2" />
      <div className="mt-8 h-80 rounded-xl border border-line bg-surface" />
    </div>
  );
}

async function EffectContent({ params }: { params: Params }) {
  const { slug } = await params;
  const meta = getEffect(slug);
  if (!meta) notFound();

  const source = readSource(meta.slug);
  const install = installCommand(meta);
  const prompt = agentPrompt(meta);
  const importLine = `import { ${meta.component} } from "@/components/hyperblur/${meta.slug}"`;
  const nav = getNeighbors(meta.slug);
  const group = groups.find((g) => g.id === categories.find((c) => c.id === meta.category)?.group);

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3">
        <nav className="min-w-0 truncate text-sm text-muted">
          <Link href={group?.href ?? "/effects"} className="hover:text-ink">
            {group?.label ?? "Effects"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{meta.title}</span>
        </nav>
        <PagerTop {...nav} />
      </div>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {meta.title}
            {meta.isNew && <NewBadge className="hb-new-lg" />}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">{meta.description}</p>
        </div>
        <CopyButton value={prompt} label="Copy prompt" variant="primary" />
      </header>

      <div className="mt-6">
        <EffectTabs preview={demos[meta.slug]} source={source} sourceTitle={`${meta.slug}.tsx`} prompt={prompt} />
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Install</h2>
        <CodeBlock code={install} title="terminal" />
        <p className="mt-2 text-sm text-muted">
          Works in any React project set up with the shadcn CLI. The file lands in{" "}
          <code className="break-all font-mono text-ink/80">components/hyperblur/{meta.slug}.tsx</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Use</h2>
        <CodeBlock code={`${importLine}\n\n${meta.usage}`} title="example.tsx" />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Props</h2>
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Prop</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Default</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {meta.props.map((p) => (
                <tr key={p.name} className="align-top">
                  <td className="px-4 py-2.5 font-mono text-blue-soft">{p.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted">{p.type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted">
                    {p.required ? "required" : (p.default ?? "")}
                  </td>
                  <td className="px-4 py-2.5 text-muted">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PagerBottom {...nav} />
      <div className="h-20 sm:hidden" aria-hidden="true" />
      <PagerMobileBar {...nav} />
    </>
  );
}
