import Link from "next/link";
import { effects, categories } from "@/registry/meta";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { ShowcaseTile } from "@/components/site/showcase-tile";
import { CopyButton } from "@/components/site/copy-button";
import { Aurora } from "@/registry/hyperblur/aurora";
import { GridFloor } from "@/registry/hyperblur/grid-floor";
import { DotGrid } from "@/registry/hyperblur/dot-grid";
import { GlowBorder } from "@/registry/hyperblur/glow-border";
import { Marquee } from "@/registry/hyperblur/marquee";
import { ShutterReveal } from "@/registry/hyperblur/shutter-reveal";
import { Scanlines } from "@/registry/hyperblur/scanlines";
import { DecodeText } from "@/registry/hyperblur/decode-text";

const quickPrompt =
  "Browse https://hyperblur.vercel.app for copy-paste visual effects. Each effect installs with `npx shadcn@latest add https://hyperblur.vercel.app/r/<name>.json` and ships as a single client component with no dependencies besides React. Pick the one that fits and wire it in.";

const display = "font-display text-4xl font-bold uppercase tracking-wide";

export default function Home() {
  return (
    <>
      <section className="hb-dots relative border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <Link
            href="/effects"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-3 py-1 text-xs text-muted hover:text-ink"
          >
            <span className="rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-semibold uppercase text-bg">New</span>
            Second batch: {effects.length} effects →
          </Link>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Visual effects for React, one command away.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            {effects.length} copy-paste effects with no dependencies. Tune them yourself, or hand them to
            your coding agent.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/effects" className="hb-btn hb-btn-primary">
              Browse effects →
            </Link>
            <a
              href="https://github.com/Hyperblur/Hyperblur"
              target="_blank"
              rel="noreferrer"
              className="hb-btn hb-btn-ghost"
            >
              Star on GitHub
            </a>
          </div>
          <div className="mt-14">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">What&apos;s inside</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="relative h-52 overflow-hidden border-b border-line bg-bg p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface" />
              <div className="flex flex-wrap gap-2">
                {effects.map((e) => (
                  <span key={e.slug} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {e.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-medium">{effects.length} effects</h3>
              <p className="mt-1 text-sm text-muted">
                Text, reveals, backgrounds and pointer effects. The stuff you would build from scratch,
                already done and battle-tested.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex h-52 items-center justify-center border-b border-line bg-bg">
              <div className="grid grid-cols-2 gap-3">
                {categories.map((c) => (
                  <div key={c.id} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">
                    <span className="block font-medium">{c.label}</span>
                    <span className="text-xs text-muted">
                      {effects.filter((e) => e.category === c.id).length} effects
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-medium">Well organized</h3>
              <p className="mt-1 text-sm text-muted">
                Four clear categories, so you find the right effect without scrolling through a wall of
                demos.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex h-52 items-center justify-center border-b border-line bg-bg px-6">
              <ul className="w-full max-w-xs space-y-2 font-mono text-xs">
                <li className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <span>react</span>
                  <span className="text-muted">peer</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <span>framer-motion</span>
                  <span className="text-muted line-through">not needed</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <span>gsap</span>
                  <span className="text-muted line-through">not needed</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
                  <span>three</span>
                  <span className="text-muted line-through">not needed</span>
                </li>
              </ul>
            </div>
            <div className="p-5">
              <h3 className="font-medium">Zero dependencies</h3>
              <p className="mt-1 text-sm text-muted">
                Every effect is one file of React and CSS. Nothing to update, nothing to lock you in,
                nothing that breaks on the next major.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex h-52 flex-col justify-center gap-2 border-b border-line bg-bg px-6 font-mono text-xs">
              <div className="rounded-lg border border-line px-3 py-2">
                <span className="text-muted">$</span> npx shadcn@latest add …/r/glitch-text.json
              </div>
              <div className="rounded-lg border border-line px-3 py-2">
                <span className="text-muted">$</span> claude plugin install hyperblur
              </div>
              <div className="rounded-lg border border-line px-3 py-2">
                <span className="text-muted">$</span> npx -y @hyperblur/mcp
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-medium">Agent-ready</h3>
              <p className="mt-1 text-sm text-muted">
                A shadcn registry, a Copy prompt on every page, an MCP server and a Claude Code plugin.
                Your agent installs effects without leaving the chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">See them in action</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <ShowcaseTile href="/effects/aurora" title="Aurora" category="Overlays" tall>
              <Aurora />
              <span className={`${display} relative`}>AURORA</span>
            </ShowcaseTile>
            <ShowcaseTile href="/effects/grid-floor" title="Grid Floor" category="Overlays" tall>
              <GridFloor />
              <span className={`${display} absolute top-10`}>SYNTHWAVE</span>
            </ShowcaseTile>
            <ShowcaseTile href="/effects/glow-border" title="Glow Border + Dot Grid" category="Hover">
              <DotGrid />
              <GlowBorder className="relative bg-surface">
                <div className="px-10 py-8 text-center">
                  <span className={display}>GLOW</span>
                  <p className="mt-1 text-sm text-muted">move the cursor</p>
                </div>
              </GlowBorder>
            </ShowcaseTile>
            <ShowcaseTile href="/effects/shutter-reveal" title="Shutter Reveal + Scanlines" category="Motion">
              <ShutterReveal trigger="hover">
                <span className={`${display} px-6 py-3`}>REVEAL</span>
              </ShutterReveal>
              <Scanlines opacity={0.18} />
            </ShowcaseTile>
            <ShowcaseTile href="/effects/decode-text" title="Decode Text" category="Text">
              <DecodeText text="DECRYPTING" trigger="hover" className={`${display} text-blue`} />
            </ShowcaseTile>
            <ShowcaseTile href="/effects/marquee" title="Marquee" category="Motion">
              <Marquee className={`${display} w-full`} gap={56}>
                <span>GLITCH</span>
                <span>BLUR</span>
                <span>NEON</span>
                <span>SPEED</span>
                <span>REVEAL</span>
              </Marquee>
            </ShowcaseTile>
          </div>
          <div className="mt-8 text-center">
            <Link href="/effects" className="hb-btn hb-btn-ghost">
              See all {effects.length} effects →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold tracking-tight">One command, and the code is yours.</h2>
            <p className="mt-4 max-w-md text-muted">
              The shadcn CLI copies the effect&apos;s source into your Next.js, Vite, Astro or Remix project.
              No wrapper library, no runtime dependency, nothing to lock you in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/effects" className="hb-btn hb-btn-primary">
                Pick an effect
              </Link>
              <CopyButton value={quickPrompt} label="Copy prompt for your agent" />
            </div>
          </div>
          <div className="min-w-0 space-y-3">
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <div className="border-b border-line px-4 py-2 font-mono text-xs text-muted">Terminal</div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-ink/90">
                <span className="text-muted">$</span> npx shadcn@latest add https://hyperblur.vercel.app/r/glitch-text.json{"\n"}
                <span className="text-[#28c840]">✔</span> Checking registry.{"\n"}
                <span className="text-[#28c840]">✔</span> Created 1 file:{"\n"}
                {"  "}- components/hyperblur/glitch-text.tsx
              </pre>
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <div className="border-b border-line px-4 py-2 font-mono text-xs text-muted">glitch-text.tsx</div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-ink/90">
                <span className="text-blue-soft">&quot;use client&quot;</span>;{"\n"}
                {"\n"}
                <span className="text-[#c792ea]">import</span> * <span className="text-[#c792ea]">as</span> React{" "}
                <span className="text-[#c792ea]">from</span> <span className="text-blue-soft">&quot;react&quot;</span>;{"\n"}
                {"\n"}
                <span className="text-[#c792ea]">export function</span> GlitchText({"{"} text, intensity = 2 {"}"}) {"{"}{"\n"}
                {"  "}…{"\n"}
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
