import type { Metadata } from "next";
import Link from "next/link";
import { Hyperspeed } from "@/registry/hyperblur/hyperspeed";
import { SplitFlapText } from "@/registry/hyperblur/split-flap-text";
import { Marquee } from "@/registry/hyperblur/marquee";
import { FlipCountdown } from "@/registry/hyperblur/flip-countdown";

export const metadata: Metadata = {
  title: "Coming soon template",
  description: "A full-viewport launch page assembled only from Hyperblur registry blocks.",
};

const product = "Vantablack";
const words = ["True black", "OLED friendly", "48 languages", "Zero glare", "Soft contrast", "Italic ligatures", "Terminal ready"];
const socials = ["X", "GitHub", "Discord"];

export default function ComingSoonTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Coming soon · built from 4 blocks</p>
          <Link href="/effects#blocks" className="hb-btn hb-btn-ghost hb-btn-sm">
            View blocks
          </Link>
        </div>
      </div>

      <main className="relative flex min-h-[calc(100svh-45px)] flex-col overflow-hidden bg-black">
        <Hyperspeed count={260} speed={0.7} accent="#2f7bff" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.8)_100%)]"
        />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 px-4 py-14 text-center sm:gap-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-blue-soft">{product} theme pack</p>

          <h1 className="flex flex-col items-center gap-2 sm:gap-3" aria-label="Launching soon">
            <SplitFlapText text="LAUNCHING" className="text-[clamp(1.5rem,9.5vw,4.5rem)]" stagger={60} />
            <SplitFlapText text="SOON" className="text-[clamp(1.5rem,9.5vw,4.5rem)]" stagger={60} />
          </h1>

          <p className="max-w-md text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Twelve hand-tuned code editor themes, drawn on pure black. Easier on your eyes at 2 a.m., sharper at noon.
          </p>

          <div className="w-full max-w-xl">
            <FlipCountdown target="2026-12-16T00:00:00Z" size={52} labels={["Days", "Hours", "Minutes", "Seconds"]} />
          </div>

          <div className="flex w-full max-w-md flex-col items-stretch gap-2 rounded-3xl border border-white/12 bg-black/50 p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full">
            <input
              type="email"
              disabled
              placeholder="you@studio.dev"
              aria-label="Email address"
              className="min-w-0 flex-1 cursor-not-allowed rounded-full bg-transparent px-4 py-2.5 text-sm text-white/40 placeholder:text-white/35 focus:outline-none"
            />
            <a href="#" className="hb-btn hb-btn-primary justify-center">
              Notify me
            </a>
          </div>
          <p className="-mt-3 text-xs text-white/40">One email on launch day. Nothing else.</p>
        </div>

        <section aria-label="Features" className="relative z-10 border-y border-white/10 bg-black/60 py-4 backdrop-blur-sm">
          <Marquee gap={40} speed={0.6}>
            {words.map((word) => (
              <span key={word} className="text-sm font-medium uppercase tracking-widest text-white/55">
                {word}
              </span>
            ))}
          </Marquee>
        </section>

        <footer className="relative z-10 flex flex-col items-center justify-between gap-4 bg-black/70 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6">
          <p>© 2026 {product}. A fictional product used to demo Hyperblur blocks.</p>
          <nav className="flex gap-2" aria-label="Social">
            {socials.map((name) => (
              <a key={name} href="#" className="hb-btn hb-btn-ghost hb-btn-sm">
                {name}
              </a>
            ))}
          </nav>
        </footer>
      </main>
    </>
  );
}
