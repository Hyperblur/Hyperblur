"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { GlitchText } from "@/registry/hyperblur/glitch-text";
import { NeonText } from "@/registry/hyperblur/neon-text";
import { Typewriter } from "@/registry/hyperblur/typewriter";
import { Aurora } from "@/registry/hyperblur/aurora";
import { GridFloor } from "@/registry/hyperblur/grid-floor";
import { DotGrid } from "@/registry/hyperblur/dot-grid";

interface Preset {
  id: string;
  label: string;
  file: string;
  code: string[];
  render: () => ReactNode;
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 ${className}`}>{children}</span>;
}

const terminal = (
  <div className="w-full max-w-[340px] overflow-hidden rounded-xl border border-white/10 bg-[#0e0e10] text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
    <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 font-mono text-[10px] text-white/40">~/studio — zsh</span>
    </div>
    <div className="space-y-2 px-4 py-4 font-mono">
      <div className="text-[11px] text-white/40">$ npx shadcn add</div>
      <div className="text-2xl text-white">
        <span className="text-blue-soft">@hyperblur/</span>
        <Typewriter words={["aurora", "silk", "dock", "beams"]} typeSpeed={70} />
      </div>
      <div className="text-[11px] text-emerald-400/80">✓ 1 file written in 0.8s</div>
    </div>
  </div>
);

const presets: Preset[] = [
  {
    id: "glitch",
    label: "Glitch",
    file: "Hero.tsx",
    code: [
      'import { GlitchText } from "@/components/hyperblur/glitch-text";',
      "",
      "export default function Hero() {",
      "  return (",
      "    <GlitchText",
      '      text="SIGNAL LOST"',
      "      intensity={3}",
      "      speed={1}",
      "    />",
      "  );",
      "}",
    ],
    render: () => (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 12% 15%, rgba(255,47,160,0.18), rgba(255,47,160,0) 60%), radial-gradient(60% 80% at 88% 85%, rgba(25,195,245,0.18), rgba(25,195,245,0) 60%)",
        }}
      >
        <div className="absolute left-5 top-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff2fa0]" />
          <Label>CH 07 · feed lost</Label>
        </div>
        <Label className="absolute right-5 top-4">03:14:07</Label>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <GlitchText text="SIGNAL LOST" intensity={3} className="font-grotesk text-5xl font-bold tracking-tight text-white sm:text-6xl" />
        </div>
        <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
          <Label>Node fra-02</Label>
          <Label className="text-[#19c3f5]/80">Retrying in 4s</Label>
        </div>
      </div>
    ),
  },
  {
    id: "neon",
    label: "Neon",
    file: "Sign.tsx",
    code: [
      'import { NeonText } from "@/components/hyperblur/neon-text";',
      "",
      "export default function Sign() {",
      "  return (",
      "    <NeonText",
      '      text="Open late"',
      '      color="#ff2fa0"',
      "      intensity={3}",
      "    />",
      "  );",
      "}",
    ],
    render: () => (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 45%, rgba(255,47,160,0.16), rgba(255,47,160,0) 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, rgba(255,255,255,0) 1px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, rgba(255,255,255,0) 1px 44px), #0b0709",
        }}
      >
        <NeonText text="Open late" color="#ff2fa0" intensity={3} className="font-serif text-6xl italic sm:text-7xl" />
        <span className="font-grotesk text-[11px] uppercase tracking-[0.4em] text-white/55">Bar Lumen · Est. 1987</span>
      </div>
    ),
  },
  {
    id: "typewriter",
    label: "Typewriter",
    file: "Install.tsx",
    code: [
      'import { Typewriter } from "@/components/hyperblur/typewriter";',
      "",
      "export default function Install() {",
      "  return (",
      "    <Typewriter",
      '      words={["aurora", "silk", "dock"]}',
      "      typeSpeed={70}",
      "    />",
      "  );",
      "}",
    ],
    render: () => (
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(47,123,255,0.18), rgba(47,123,255,0) 70%)" }}
      >
        {terminal}
      </div>
    ),
  },
  {
    id: "aurora",
    label: "Aurora",
    file: "Background.tsx",
    code: [
      'import { Aurora } from "@/components/hyperblur/aurora";',
      "",
      "export default function Background() {",
      "  return (",
      '    <section className="relative">',
      '      <Aurora colors={["#19f5a0", "#19c3f5", "#8b5cf6"]} />',
      "      <h1>Northern lights</h1>",
      "    </section>",
      "  );",
      "}",
    ],
    render: () => (
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #030814 0%, #06121f 60%, #0a0a0a 100%)" }}>
        <Aurora colors={["#19f5a0", "#19c3f5", "#8b5cf6"]} opacity={0.6} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <Label className="text-[#8dffd0]/80">Tromsø · 69.6° N</Label>
          <span className="font-serif text-5xl text-white sm:text-6xl">Northern lights</span>
          <span className="font-mono text-[11px] text-white/55">Kp 6 · tonight 22:00 – 02:00</span>
        </div>
      </div>
    ),
  },
  {
    id: "grid",
    label: "Grid Floor",
    file: "Stage.tsx",
    code: [
      'import { GridFloor } from "@/components/hyperblur/grid-floor";',
      "",
      "export default function Stage() {",
      "  return (",
      '    <section className="relative">',
      '      <GridFloor color="#ff2fa0" horizon={0.58} />',
      "      <h1>Night Drive</h1>",
      "    </section>",
      "  );",
      "}",
    ],
    render: () => (
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0d0418 0%, #2a0a3a 56%, #0a0a0a 58%)" }}>
        <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
          <div
            className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full"
            style={{
              background: "linear-gradient(180deg, #ffd36b 0%, #ff6a3d 50%, #ff2fa0 100%)",
              boxShadow: "0 0 80px rgba(255,106,61,0.45)",
              maskImage:
                "linear-gradient(to bottom, #000 0 30%, transparent 30% 34%, #000 34% 40%, transparent 40% 44%, #000 44% 48%, transparent 48% 52%, #000 52%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0 30%, transparent 30% 34%, #000 34% 40%, transparent 40% 44%, #000 44% 48%, transparent 48% 52%, #000 52%)",
            }}
          />
        </div>
        <GridFloor color="#ff2fa0" horizon={0.58} cell={44} />
        <div
          className="absolute inset-x-0 top-6 text-center font-display text-3xl font-bold uppercase tracking-[0.32em] text-white sm:text-4xl"
          style={{ textShadow: "0 0 18px rgba(255,47,160,0.6)" }}
        >
          Night Drive
        </div>
        <Label className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/70">Vol. 2 · 11 tracks</Label>
      </div>
    ),
  },
  {
    id: "dots",
    label: "Dot Grid",
    file: "Canvas.tsx",
    code: [
      'import { DotGrid } from "@/components/hyperblur/dot-grid";',
      "",
      "export default function Canvas() {",
      "  return (",
      '    <section className="relative">',
      "      <DotGrid radius={180} />",
      "      <h1>Infinite canvas</h1>",
      "    </section>",
      "  );",
      "}",
    ],
    render: () => (
      <div className="absolute inset-0">
        <DotGrid size={20} glowColor="#2f7bff" radius={180} intensity={0.8} />
        <Label className="absolute right-5 top-4">Zoom 100%</Label>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="font-serif text-5xl italic text-white sm:text-6xl">Infinite canvas</span>
          <span className="text-xs text-white/50">move the cursor across the grid</span>
        </div>
      </div>
    ),
  },
];

function highlight(line: string) {
  const parts = line.split(/("[^"]*"|\{[^}]*\}|\b(?:import|from|export|default|function|return)\b)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('"')) return <span key={i} className="text-blue-soft">{part}</span>;
    if (part.startsWith("{")) return <span key={i} className="text-[#d7a86e]">{part}</span>;
    if (/^(import|from|export|default|function|return)$/.test(part)) return <span key={i} className="text-[#c792ea]">{part}</span>;
    return <span key={i}>{part}</span>;
  });
}

export function HeroShowcase() {
  const [active, setActive] = React.useState(0);
  const [key, setKey] = React.useState(0);
  const preset = presets[active];

  function select(i: number) {
    setActive(i);
    setKey((k) => k + 1);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(47,123,255,0.25)]">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0 border-b border-line lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-muted">{preset.file}</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-ink/90">
            {preset.code.map((line, i) => (
              <div key={i} className="flex">
                <span className="w-7 shrink-0 select-none text-right text-muted/60">{i + 1}</span>
                <span className="pl-4 whitespace-pre">{highlight(line)}</span>
              </div>
            ))}
          </pre>
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="font-mono text-xs text-muted">preview</span>
            <button type="button" onClick={() => setKey((k) => k + 1)} className="hb-btn hb-btn-ghost hb-btn-sm">
              Replay
            </button>
          </div>
          <div key={key} className="hb-dots relative flex min-h-72 flex-1 items-center justify-center overflow-hidden bg-bg">
            {preset.render()}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line p-3">
            {presets.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => select(i)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  i === active
                    ? "border-ink bg-ink text-bg"
                    : "border-line-2 text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
