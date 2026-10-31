import fs from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { effects, getEffect, installCommand, agentPrompt } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { CopyButton } from "@/components/site/copy-button";
import { CodeBlock } from "@/components/site/code-block";

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
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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
      <div className="mt-6 h-10 w-72 rounded bg-surface-2" />
      <div className="mt-3 h-5 w-96 max-w-full rounded bg-surface-2" />
      <div className="mt-8 h-72 rounded-lg border border-line bg-surface" />
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

  return (
    <>
      <nav className="mb-6 text-sm text-muted">
        <Link href="/#effects" className="hover:text-ink">
          Effects
        </Link>{" "}
        / <span className="text-ink">{meta.title}</span>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide">{meta.title}</h1>
          <p className="mt-2 max-w-2xl text-lg text-muted">{meta.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <CopyButton value={prompt} label="Copy prompt" variant="primary" />
      </header>

      <section className="hb-grid relative mt-8 flex min-h-72 items-center justify-center overflow-hidden rounded-lg border border-line bg-bg">
        {demos[meta.slug]}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide">Install</h2>
            <CodeBlock code={install} title="terminal" />
            <p className="mt-2 text-sm text-muted">
              Works in any React project set up with the shadcn CLI. The file lands in{" "}
              <code className="font-mono text-ink/80">components/hyperblur/{meta.slug}.tsx</code>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide">Use</h2>
            <CodeBlock code={`${importLine}\n\n${meta.usage}`} title="example.tsx" />
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide">Prompt for your agent</h2>
            <CodeBlock code={prompt} title="paste into Claude Code, Cursor, Lovable, v0…" />
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide">Source</h2>
            <CodeBlock code={source} title={`${meta.slug}.tsx`} collapsible />
          </section>
        </div>

        <aside>
          <h2 className="mb-3 font-display text-xl font-bold uppercase tracking-wide">Props</h2>
          <dl className="divide-y divide-line rounded-lg border border-line bg-surface">
            {meta.props.map((p) => (
              <div key={p.name} className="p-4">
                <dt className="flex flex-wrap items-baseline gap-2">
                  <code className="font-mono text-sm text-blue-soft">{p.name}</code>
                  <code className="font-mono text-xs text-muted">{p.type}</code>
                  {p.required ? (
                    <span className="font-mono text-[10px] uppercase text-blue">required</span>
                  ) : p.default ? (
                    <span className="font-mono text-[10px] text-muted">= {p.default}</span>
                  ) : null}
                </dt>
                <dd className="mt-1 text-sm text-muted">{p.description}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </>
  );
}
