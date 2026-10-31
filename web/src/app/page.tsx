import Image from "next/image";
import Link from "next/link";
import { effects, categories } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { EffectCard } from "@/components/site/effect-card";
import { CopyButton } from "@/components/site/copy-button";
import { SpeedLines } from "@/registry/hyperblur/speed-lines";

const quickPrompt =
  "Browse https://hyperblur.dev for copy-paste visual effects. Each effect installs with `npx shadcn@latest add https://hyperblur.dev/r/<name>.json` and ships as a single client component with no dependencies besides React. Pick the one that fits and wire it in.";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <SpeedLines count={18} opacity={0.18} />
        <div className="hb-grid absolute inset-0 -z-10" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Image
            src="/brand/hyperblur-logo.svg"
            alt="Hyperblur"
            width={720}
            height={132}
            priority
            className="h-20 w-auto sm:h-28"
          />
          <h1 className="mt-10 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-5xl">
            Visual effects, <span className="text-blue">one command away</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Glitch, blur, scanlines, speed. Copy-paste React components with no
            dependencies. Install with one shadcn command, or hand the prompt to
            your coding agent and let it do the work.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#effects"
              className="hb-slant inline-flex items-center bg-blue px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-blue-soft hover:text-bg"
            >
              Browse effects
            </Link>
            <CopyButton value={quickPrompt} label="Copy prompt for your agent" />
          </div>
        </div>
      </section>

      <section id="effects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            Effects <span className="text-muted">· {effects.length}</span>
          </h2>
          <p className="text-sm text-muted">Hover the cards to play them.</p>
        </div>
        {categories.map((cat) => {
          const items = effects.filter((e) => e.category === cat.id);
          if (items.length === 0) return null;
          return (
            <div key={cat.id} className="mb-12">
              <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-muted">
                {cat.label} <span className="font-sans text-sm font-normal">· {items.length}</span>
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((meta) => (
                  <EffectCard key={meta.slug} meta={meta} demo={demos[meta.slug]} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section id="agents" className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Built for agents
            </h2>
            <p className="mt-3 text-muted">
              Every effect has three doors in. Pick the one your tool speaks.
            </p>
          </div>
          <ol className="space-y-5 md:col-span-2">
            <li className="flex gap-4">
              <span className="font-display text-2xl font-bold text-blue">01</span>
              <div>
                <h3 className="font-semibold">shadcn registry</h3>
                <p className="text-sm text-muted">
                  <code className="break-all font-mono text-ink/80">npx shadcn@latest add https://hyperblur.dev/r/glitch-text.json</code>{" "}
                  drops the component straight into your project, deps included.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-2xl font-bold text-blue">02</span>
              <div>
                <h3 className="font-semibold">Copy prompt</h3>
                <p className="text-sm text-muted">
                  One button on each effect page gives your agent the install command,
                  the import, the props and a usage example. Paste, done.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-2xl font-bold text-blue">03</span>
              <div>
                <h3 className="font-semibold">MCP server and Claude Code plugin</h3>
                <p className="text-sm text-muted">
                  <code className="break-all font-mono text-ink/80">claude plugin install hyperblur --marketplace Hyperblur/Hyperblur</code>{" "}
                  gives Claude Code the catalog as tools. Any MCP client can run{" "}
                  <code className="font-mono text-ink/80">npx -y @hyperblur/mcp</code>.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
