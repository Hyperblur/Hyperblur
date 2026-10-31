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

const display = "font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl";

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
      '      text="HYPERBLUR"',
      "      intensity={2}",
      "      speed={1}",
      "    />",
      "  );",
      "}",
    ],
    render: () => <GlitchText text="HYPERBLUR" className={display} />,
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
      '      text="OPEN"',
      '      color="#2f7bff"',
      "      intensity={3}",
      "    />",
      "  );",
      "}",
    ],
    render: () => <NeonText text="OPEN" intensity={3} className={display} />,
  },
  {
    id: "typewriter",
    label: "Typewriter",
    file: "Tagline.tsx",
    code: [
      'import { Typewriter } from "@/components/hyperblur/typewriter";',
      "",
      "export default function Tagline() {",
      "  return (",
      "    <Typewriter",
      '      words={["DESIGN", "BUILD", "SHIP"]}',
      "      typeSpeed={70}",
      "    />",
      "  );",
      "}",
    ],
    render: () => <Typewriter words={["DESIGN", "BUILD", "SHIP"]} className={`${display} text-blue`} />,
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
      "      <Aurora speed={1} opacity={0.6} />",
      "      <h1>Your headline</h1>",
      "    </section>",
      "  );",
      "}",
    ],
    render: () => (
      <div className="absolute inset-0">
        <Aurora opacity={0.6} />
        <div className={`${display} absolute inset-0 flex items-center justify-center`}>AURORA</div>
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
      '      <GridFloor color="#2f7bff" speed={1} />',
      "      <h1>Synthwave</h1>",
      "    </section>",
      "  );",
      "}",
    ],
    render: () => (
      <div className="absolute inset-0">
        <GridFloor />
        <div className={`${display} absolute inset-0 flex items-start justify-center pt-10`}>STAGE</div>
      </div>
    ),
  },
  {
    id: "dots",
    label: "Dot Grid",
    file: "Section.tsx",
    code: [
      'import { DotGrid } from "@/components/hyperblur/dot-grid";',
      "",
      "export default function Section() {",
      "  return (",
      '    <section className="relative">',
      "      <DotGrid radius={180} />",
      "      <h1>Move the cursor</h1>",
      "    </section>",
      "  );",
      "}",
    ],
    render: () => (
      <div className="absolute inset-0">
        <DotGrid radius={180} />
        <div className={`${display} absolute inset-0 flex items-center justify-center`}>MOVE</div>
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
