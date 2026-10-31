import Link from "next/link";
import { effects } from "@/registry/meta";
import { demos } from "@/registry/demos";
import { EffectCard } from "@/components/site/effect-card";
import { CopyButton } from "@/components/site/copy-button";
import { CodeBlock } from "@/components/site/code-block";

const quickPrompt =
  "Browse https://hyperblur.vercel.app for copy-paste visual effects. Each effect installs with `npx shadcn@latest add https://hyperblur.vercel.app/r/<name>.json` and ships as a single client component with no dependencies besides React. Pick the one that fits and wire it in.";

const featured = ["glitch-text", "grid-floor", "tilt-card", "decode-text", "shutter-reveal", "neon-text"];

export default function Home() {
  const picks = featured.map((slug) => effects.find((e) => e.slug === slug)).filter((e) => e !== undefined);

  return (
    <>
      <section className="hb-dots relative border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <Link
            href="/effects"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-3 py-1 text-xs text-muted hover:text-ink"
          >
            <span className="rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase text-bg">New</span>
            {effects.length} effects in the catalog
          </Link>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Visual effects for React, one command away.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Glitch, blur, scanlines, speed. Copy-paste components with no dependencies. Install with
            shadcn, or hand the prompt to your coding agent and let it do the work.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/effects" className="hb-btn hb-btn-primary">
              Browse effects →
            </Link>
            <CopyButton value={quickPrompt} label="Copy prompt for your agent" />
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-surface p-3 sm:p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {picks.map((meta) => (
                <EffectCard key={meta.slug} meta={meta} demo={demos[meta.slug]} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="agents" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Three doors in</h2>
            <p className="mt-3 max-w-md text-muted">
              Every effect is one file. Pick the door your tool speaks and it lands in your project
              as plain code you own.
            </p>
            <ol className="mt-8 space-y-6">
              <li>
                <h3 className="font-medium">shadcn registry</h3>
                <p className="mt-1 text-sm text-muted">
                  One command drops the component in <code className="font-mono text-ink/80">components/hyperblur</code>,
                  dependencies included.
                </p>
              </li>
              <li>
                <h3 className="font-medium">Copy prompt</h3>
                <p className="mt-1 text-sm text-muted">
                  Each effect page has a prompt with the install command, the import, the props and a usage
                  example. Paste it into Claude Code, Cursor, Lovable or v0.
                </p>
              </li>
              <li>
                <h3 className="font-medium">MCP server and Claude Code plugin</h3>
                <p className="mt-1 text-sm text-muted">
                  Search and install effects without leaving the chat. Any MCP client can run{" "}
                  <code className="break-all font-mono text-ink/80">npx -y @hyperblur/mcp</code>.
                </p>
              </li>
            </ol>
          </div>
          <div className="space-y-3">
            <CodeBlock code="npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json" title="terminal" />
            <CodeBlock code="claude plugin install hyperblur --marketplace Hyperblur/Hyperblur" title="Claude Code" />
            <CodeBlock
              code={`import { GlitchText } from "@/components/hyperblur/glitch-text"\n\n<GlitchText text="HYPERBLUR" intensity={2} />`}
              title="hero.tsx"
            />
          </div>
        </div>
      </section>
    </>
  );
}
