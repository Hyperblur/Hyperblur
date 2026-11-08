"use client";

import * as React from "react";

export type NavbarMegaPreviewArt = "graph" | "terminal" | "globe" | "shield" | "bars" | "stack";

export interface NavbarMegaPreviewItem {
  title: string;
  description: string;
  href: string;
  art?: NavbarMegaPreviewArt;
  tag?: string;
}

export interface NavbarMegaPreviewMenu {
  id: string;
  label: string;
  href?: string;
  items?: NavbarMegaPreviewItem[];
  footer?: { label: string; href: string };
}

export interface NavbarMegaPreviewProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  brand?: string;
  menus?: NavbarMegaPreviewMenu[];
  openId?: string | null;
  defaultOpenId?: string | null;
  onOpenChange?: (id: string | null) => void;
  defaultItem?: number;
  signIn?: { label: string; href: string } | null;
  cta?: { label: string; href: string } | null;
  accent?: string;
  showBackdrop?: boolean;
}

const css = `
.hb-xi6 {
  --hb-xi6-accent: #22d3a5;
  --hb-xi6-ease: cubic-bezier(.22,1,.36,1);
  position: relative;
  z-index: 40;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #09090b;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-xi6 *, .hb-xi6 *::before, .hb-xi6 *::after { box-sizing: border-box; }
.hb-xi6-bar { position: relative; z-index: 3; border-bottom: 1px solid #1f1f23; background: rgba(9,9,11,.92); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
.hb-xi6-row { display: flex; align-items: center; gap: 22px; max-width: 1140px; height: 62px; margin: 0 auto; padding: 0 24px; }
.hb-xi6-brand { display: inline-flex; align-items: center; gap: 10px; color: #fff; font-size: 16px; font-weight: 650; letter-spacing: -.02em; text-decoration: none; border-radius: 6px; }
.hb-xi6-mark { display: grid; grid-template-columns: repeat(2, 7px); gap: 3px; padding: 4px; border-radius: 7px; background: #fff; }
.hb-xi6-mark i { width: 7px; height: 7px; border-radius: 2px; background: #09090b; font-style: normal; }
.hb-xi6-mark i:nth-child(2) { background: var(--hb-xi6-accent); }
.hb-xi6-menus { display: flex; align-items: center; gap: 2px; margin: 0; padding: 0; list-style: none; }
.hb-xi6-trig { display: inline-flex; align-items: center; gap: 6px; height: 36px; margin: 0; padding: 0 12px; border: 0; border-radius: 9px; background: transparent; color: #a1a1aa; font: inherit; font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer; transition: color .2s ease, background-color .2s ease; }
.hb-xi6-trig:hover, .hb-xi6-trig[aria-expanded="true"] { color: #fff; background: rgba(255,255,255,.06); }
.hb-xi6-trig svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; opacity: .7; transition: transform .35s var(--hb-xi6-ease); }
.hb-xi6-trig[aria-expanded="true"] svg { transform: rotate(180deg); }
.hb-xi6-end { display: flex; align-items: center; gap: 6px; margin-left: auto; }
.hb-xi6-in { display: inline-flex; align-items: center; height: 36px; padding: 0 12px; border-radius: 9px; color: #d4d4d8; font-size: 14px; font-weight: 500; text-decoration: none; transition: background-color .2s ease; }
.hb-xi6-in:hover { background: rgba(255,255,255,.06); }
.hb-xi6-cta { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px; border-radius: 9px; background: linear-gradient(180deg, #fafafa, #d9d9de); color: #09090b; font-size: 14px; font-weight: 600; text-decoration: none; box-shadow: 0 1px 0 #fff inset, 0 6px 18px -8px color-mix(in srgb, var(--hb-xi6-accent) 70%, transparent); transition: transform .2s var(--hb-xi6-ease); }
.hb-xi6-cta:hover { transform: translateY(-1px); }
.hb-xi6-cta:active { transform: scale(.97); }
.hb-xi6-panel {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  z-index: 5;
  width: min(900px, calc(100% - 32px));
  border-radius: 18px;
  background: linear-gradient(180deg, #131316, #0e0e11);
  box-shadow: 0 0 0 1px rgba(255,255,255,.08) inset, 0 1px 0 rgba(255,255,255,.06) inset, 0 40px 80px -30px rgba(0,0,0,.85), 0 12px 24px -12px rgba(0,0,0,.6);
  transform: translateX(-50%);
  transform-origin: 50% 0;
  overflow: hidden;
  animation: hb-xi6-pop .38s var(--hb-xi6-ease) both;
}
.hb-xi6-grid { display: grid; grid-template-columns: 330px 1fr; min-height: 300px; }
.hb-xi6-list { display: grid; align-content: start; gap: 2px; margin: 0; padding: 10px; list-style: none; border-right: 1px solid #1f1f23; animation: hb-xi6-slide .42s var(--hb-xi6-ease) both; }
.hb-xi6-list[data-dir="left"] { animation-name: hb-xi6-slide-l; }
.hb-xi6-item { display: grid; grid-template-columns: 34px 1fr; gap: 12px; align-items: start; padding: 10px; border-radius: 12px; color: inherit; text-decoration: none; transition: background-color .2s ease; }
.hb-xi6-item[data-hot="true"] { background: rgba(255,255,255,.05); }
.hb-xi6-ico { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: #18181c; box-shadow: 0 0 0 1px rgba(255,255,255,.07) inset; color: #a1a1aa; transition: color .2s ease, background-color .2s ease, box-shadow .2s ease; }
.hb-xi6-ico svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.hb-xi6-item[data-hot="true"] .hb-xi6-ico { color: var(--hb-xi6-accent); background: color-mix(in srgb, var(--hb-xi6-accent) 12%, #18181c); box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-xi6-accent) 35%, transparent) inset; }
.hb-xi6-it { display: flex; align-items: center; gap: 8px; color: #fafafa; font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.hb-xi6-tag { padding: 1px 6px; border-radius: 5px; background: color-mix(in srgb, var(--hb-xi6-accent) 16%, transparent); color: var(--hb-xi6-accent); font-size: 10.5px; font-weight: 650; }
.hb-xi6-id { margin-top: 3px; color: #8b8b94; font-size: 12.5px; line-height: 1.45; }
.hb-xi6-prev { position: relative; display: flex; flex-direction: column; padding: 14px; }
.hb-xi6-art { position: relative; color: var(--hb-xi6-accent); flex: 1; min-height: 190px; border-radius: 12px; overflow: hidden; background: radial-gradient(120% 100% at 80% 0%, color-mix(in srgb, var(--hb-xi6-accent) 18%, transparent), transparent 60%), #0b0b0d; box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset; animation: hb-xi6-fade .45s var(--hb-xi6-ease) both; }
.hb-xi6-art::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 24px 24px; }
.hb-xi6-art svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-xi6-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: hb-xi6-draw 1.1s var(--hb-xi6-ease) .1s forwards; }
.hb-xi6-rise { transform-box: fill-box; transform-origin: 50% 100%; animation: hb-xi6-rise .7s var(--hb-xi6-ease) both; }
.hb-xi6-blip { transform-box: fill-box; transform-origin: center; animation: hb-xi6-blip .5s var(--hb-xi6-ease) both; }
.hb-xi6-cap { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding: 14px 4px 2px; animation: hb-xi6-fade .45s var(--hb-xi6-ease) .05s both; }
.hb-xi6-cap b { display: block; color: #fafafa; font-size: 15px; font-weight: 600; }
.hb-xi6-cap span { display: block; margin-top: 3px; color: #8b8b94; font-size: 12.5px; }
.hb-xi6-go { display: inline-flex; flex: none; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 8px; background: rgba(255,255,255,.06); color: #fafafa; font-size: 13px; font-weight: 550; text-decoration: none; transition: background-color .2s ease; }
.hb-xi6-go:hover { background: rgba(255,255,255,.1); }
.hb-xi6-go svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; transition: transform .25s var(--hb-xi6-ease); }
.hb-xi6-go:hover svg { transform: translateX(2px); }
.hb-xi6-foot { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-top: 1px solid #1f1f23; background: rgba(255,255,255,.015); color: #8b8b94; font-size: 12.5px; }
.hb-xi6-foot a { color: #fafafa; font-weight: 550; text-decoration: none; }
.hb-xi6-foot a:hover { color: var(--hb-xi6-accent); }
.hb-xi6-burger { display: none; place-items: center; width: 38px; height: 38px; margin: 0; padding: 0; border: 0; border-radius: 9px; background: rgba(255,255,255,.06); color: #fff; cursor: pointer; }
.hb-xi6-burger svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.hb-xi6-sheet { display: none; }
.hb-xi6-panel:focus { outline: none; }
.hb-xi6 a:focus-visible, .hb-xi6 button:focus-visible { outline: 2px solid var(--hb-xi6-accent); outline-offset: 2px; }
.hb-xi6-stage { position: relative; z-index: 1; height: 620px; overflow: hidden; }
.hb-xi6-hero { max-width: 1140px; margin: 0 auto; padding: 120px 24px 0; }
.hb-xi6-h { max-width: 720px; margin: 0; font-size: clamp(34px, 6cqi, 64px); font-weight: 600; letter-spacing: -.045em; line-height: 1.02; }
.hb-xi6-h span { color: var(--hb-xi6-accent); }
.hb-xi6-sub { max-width: 520px; margin: 18px 0 0; color: #8b8b94; font-size: 17px; line-height: 1.55; }
.hb-xi6-glow { position: absolute; right: -120px; top: 40px; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-xi6-accent) 22%, transparent), transparent); }
@keyframes hb-xi6-pop { from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(.97); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
@keyframes hb-xi6-slide { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
@keyframes hb-xi6-slide-l { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
@keyframes hb-xi6-fade { from { opacity: 0; transform: translateY(6px) scale(.985); } to { opacity: 1; transform: none; } }
@keyframes hb-xi6-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-xi6-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes hb-xi6-blip { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
@keyframes hb-xi6-acc { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@container (max-width: 820px) {
  .hb-xi6-menus, .hb-xi6-in, .hb-xi6-panel { display: none; }
  .hb-xi6-burger { display: grid; }
  .hb-xi6-row { height: 58px; padding: 0 16px; gap: 12px; }
  .hb-xi6-sheet[data-open="true"] { position: relative; z-index: 3; display: block; padding: 6px 12px 14px; border-bottom: 1px solid #1f1f23; background: #0b0b0d; }
  .hb-xi6-acc { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 50px; margin: 0; padding: 0 8px; border: 0; border-bottom: 1px solid #18181c; background: transparent; color: #fafafa; font: inherit; font-size: 15px; font-weight: 550; text-align: left; text-decoration: none; cursor: pointer; }
  .hb-xi6-acc svg { width: 12px; height: 12px; fill: none; stroke: #8b8b94; stroke-width: 1.8; stroke-linecap: round; transition: transform .3s var(--hb-xi6-ease); }
  .hb-xi6-acc[aria-expanded="true"] svg { transform: rotate(180deg); }
  .hb-xi6-accp { display: grid; gap: 2px; padding: 6px 0 10px; animation: hb-xi6-acc .3s var(--hb-xi6-ease) both; }
  .hb-xi6-accp .hb-xi6-item { padding: 8px; }
  .hb-xi6-glow { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-xi6 *, .hb-xi6 *::before, .hb-xi6 *::after { animation: none !important; transition: none !important; }
  .hb-xi6-draw { stroke-dashoffset: 0; }
}
`;

const defaultMenus: NavbarMegaPreviewMenu[] = [
  {
    id: "platform",
    label: "Platform",
    items: [
      { title: "Workflows", description: "Chain jobs into durable, retryable pipelines.", href: "#", art: "graph" },
      { title: "Edge functions", description: "Run TypeScript in 38 regions with cold starts under 5 ms.", href: "#", art: "globe", tag: "Beta" },
      { title: "Observability", description: "Traces, logs and metrics in one timeline.", href: "#", art: "bars" },
      { title: "Secrets", description: "Rotate keys without a redeploy.", href: "#", art: "shield" },
    ],
    footer: { label: "See the platform tour", href: "#" },
  },
  {
    id: "developers",
    label: "Developers",
    items: [
      { title: "CLI", description: "Deploy, tail logs and roll back from your terminal.", href: "#", art: "terminal" },
      { title: "SDKs", description: "Typed clients for TypeScript, Go, Python and Rust.", href: "#", art: "stack" },
      { title: "Status", description: "Live uptime across every region.", href: "#", art: "bars" },
    ],
    footer: { label: "Read the docs", href: "#" },
  },
  {
    id: "solutions",
    label: "Solutions",
    items: [
      { title: "Fintech", description: "Ledger-grade queues with exactly-once delivery.", href: "#", art: "shield" },
      { title: "Media pipelines", description: "Long-running transcode jobs that never time out.", href: "#", art: "graph", tag: "New" },
      { title: "Commerce", description: "Absorb launch-day traffic without warming servers.", href: "#", art: "globe" },
    ],
    footer: { label: "Talk to solutions engineering", href: "#" },
  },
  { id: "pricing", label: "Pricing", href: "#" },
  { id: "changelog", label: "Changelog", href: "#" },
];

const icons: Record<NavbarMegaPreviewArt, React.ReactNode> = {
  graph: <path d="M4 5.5a1.5 1.5 0 1 0 0-.01M12 4a1.5 1.5 0 1 0 0-.01M12 12a1.5 1.5 0 1 0 0-.01M5.4 5.2L10.6 4.3M5.2 6.3l5.6 5" />,
  terminal: <path d="M2.5 3.5h11v9h-11zM5 7l2 1.5L5 10M8.5 10.5H11" />,
  globe: <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" />,
  shield: <path d="M8 2l5 2v4c0 3-2.2 5-5 6-2.8-1-5-3-5-6V4zM5.8 8l1.6 1.6L10.4 6.6" />,
  bars: <path d="M3 13V8M6.3 13V4M9.6 13V6.5M13 13V3" />,
  stack: <path d="M8 2.5l5.5 2.8L8 8 2.5 5.3zM2.5 8L8 10.7 13.5 8M2.5 10.7L8 13.4l5.5-2.7" />,
};

function Art({ kind }: { kind: NavbarMegaPreviewArt }) {
  const a = "currentColor";
  if (kind === "graph") {
    const nodes = [
      [60, 50], [150, 40], [240, 70], [100, 120], [200, 135], [280, 140],
    ];
    const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [4, 5], [2, 5]];
    return (
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
        {edges.map(([p, q], i) => (
          <path key={i} className="hb-xi6-draw" pathLength={1} d={`M${nodes[p][0]} ${nodes[p][1]}L${nodes[q][0]} ${nodes[q][1]}`} stroke={i % 3 === 0 ? a : "rgba(255,255,255,.22)"} strokeWidth="1.5" fill="none" style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }} />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i} className="hb-xi6-blip" style={{ animationDelay: `${(0.2 + i * 0.07).toFixed(2)}s` }}>
            <rect x={x - 22} y={y - 11} width="44" height="22" rx="7" fill="#141418" stroke={i === 1 || i === 4 ? a : "rgba(255,255,255,.14)"} />
            <circle cx={x - 12} cy={y} r="3" fill={i === 1 || i === 4 ? a : "#55555c"} />
            <rect x={x - 5} y={y - 2} width="20" height="4" rx="2" fill="rgba(255,255,255,.25)" />
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "terminal") {
    const rows = [[22, 90, a], [22, 150, "#55555c"], [34, 120, "#55555c"], [34, 70, a], [22, 180, "#55555c"], [22, 60, "#f5a524"]];
    return (
      <svg viewBox="0 0 320 180">
        <rect x="30" y="22" width="260" height="140" rx="10" fill="#111114" stroke="rgba(255,255,255,.1)" />
        <circle cx="46" cy="36" r="3.5" fill="#3a3a40" />
        <circle cx="58" cy="36" r="3.5" fill="#3a3a40" />
        <circle cx="70" cy="36" r="3.5" fill="#3a3a40" />
        {rows.map(([x, w, c], i) => (
          <rect key={i} className="hb-xi6-blip" x={30 + Number(x)} y={58 + i * 15} width={Number(w)} height="6" rx="3" fill={String(c)} style={{ animationDelay: `${(i * 0.09).toFixed(2)}s`, transformOrigin: "left center" }} />
        ))}
        <rect x="52" y="148" width="7" height="10" fill={a}>
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
        </rect>
      </svg>
    );
  }
  if (kind === "globe") {
    const dots = [[118, 72], [176, 60], [202, 104], [140, 118], [160, 90]];
    return (
      <svg viewBox="0 0 320 180" fill="none">
        <circle cx="160" cy="90" r="64" stroke="rgba(255,255,255,.18)" />
        <ellipse cx="160" cy="90" rx="64" ry="22" stroke="rgba(255,255,255,.1)" />
        <ellipse cx="160" cy="90" rx="26" ry="64" stroke="rgba(255,255,255,.1)" />
        <path d="M96 90h128" stroke="rgba(255,255,255,.08)" />
        <path className="hb-xi6-draw" pathLength={1} d="M118 72Q150 30 176 60" stroke={a} strokeWidth="1.6" />
        <path className="hb-xi6-draw" pathLength={1} d="M176 60Q215 70 202 104" stroke={a} strokeWidth="1.6" style={{ animationDelay: ".25s" }} />
        <path className="hb-xi6-draw" pathLength={1} d="M202 104Q175 135 140 118" stroke={a} strokeWidth="1.6" style={{ animationDelay: ".45s" }} />
        {dots.map(([x, y], i) => (
          <g key={i} className="hb-xi6-blip" style={{ animationDelay: `${(i * 0.1).toFixed(2)}s` }}>
            <circle cx={x} cy={y} r="8" fill={a} opacity=".15" />
            <circle cx={x} cy={y} r="3" fill={a} />
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "shield") {
    return (
      <svg viewBox="0 0 320 180" fill="none">
        <circle cx="160" cy="90" r="70" stroke="rgba(255,255,255,.06)" />
        <circle cx="160" cy="90" r="52" stroke="rgba(255,255,255,.09)" />
        <path className="hb-xi6-draw" pathLength={1} d="M160 44l36 14v28c0 22-16 38-36 46-20-8-36-24-36-46V58z" stroke={a} strokeWidth="2" fill="rgba(255,255,255,.02)" />
        <path className="hb-xi6-draw" pathLength={1} d="M144 90l11 11 22-24" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: ".5s" }} />
        <rect x="216" y="56" width="70" height="20" rx="6" fill="#141418" stroke="rgba(255,255,255,.1)" className="hb-xi6-blip" style={{ animationDelay: ".7s" }} />
        <rect x="224" y="64" width="40" height="4" rx="2" fill={a} className="hb-xi6-blip" style={{ animationDelay: ".75s" }} />
      </svg>
    );
  }
  if (kind === "bars") {
    const h = [38, 62, 48, 86, 70, 104, 92, 118];
    return (
      <svg viewBox="0 0 320 180">
        {h.map((v, i) => (
          <rect key={i} className="hb-xi6-rise" x={48 + i * 30} y={150 - v} width="18" height={v} rx="4" fill={i === h.length - 1 ? a : "rgba(255,255,255,.13)"} style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }} />
        ))}
        <path className="hb-xi6-draw" pathLength={1} d="M57 104L87 84L117 96L147 62L177 76L207 44L237 54L267 30" stroke={a} strokeWidth="1.6" fill="none" style={{ animationDelay: ".3s" }} />
        <path d="M40 150h240" stroke="rgba(255,255,255,.12)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 180" fill="none">
      {[0, 1, 2].map((i) => (
        <path key={i} className="hb-xi6-blip" d={`M160 ${48 + i * 26}l64 26-64 26-64-26z`} fill="#141418" stroke={i === 0 ? a : "rgba(255,255,255,.16)"} style={{ fill: i === 0 ? "color-mix(in srgb, var(--hb-xi6-accent) 30%, #141418)" : undefined, animationDelay: `${(0.3 - i * 0.12).toFixed(2)}s` }} />
      ))}
    </svg>
  );
}

export function NavbarMegaPreview({
  brand = "Lattice",
  menus = defaultMenus,
  openId,
  defaultOpenId = null,
  onOpenChange,
  defaultItem = 0,
  signIn = { label: "Log in", href: "#" },
  cta = { label: "Deploy free", href: "#" },
  accent = "#22d3a5",
  showBackdrop = true,
  className = "",
  style,
  ...rest
}: NavbarMegaPreviewProps) {
  const uid = React.useId();
  const rootRef = React.useRef<HTMLElement>(null);
  const [innerOpen, setInnerOpen] = React.useState<string | null>(defaultOpenId);
  const [hot, setHot] = React.useState(defaultItem);
  const [dir, setDir] = React.useState<"left" | "right">("right");
  const [sheet, setSheet] = React.useState(false);
  const [acc, setAcc] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = openId === undefined ? innerOpen : openId;
  const menu = menus.find((m) => m.id === current && m.items?.length);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const setOpen = (id: string | null, item = 0) => {
    if (id && current && id !== current) {
      const a = menus.findIndex((m) => m.id === current);
      const b = menus.findIndex((m) => m.id === id);
      setDir(b < a ? "left" : "right");
    }
    if (id !== current) setHot(item);
    if (openId === undefined) setInnerOpen(id);
    if (id !== current) onOpenChange?.(id);
  };

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const intent = (id: string) => {
    clear();
    if (current) setOpen(id);
    else timer.current = setTimeout(() => setOpen(id), 90);
  };

  const scheduleClose = () => {
    clear();
    timer.current = setTimeout(() => setOpen(null), 220);
  };

  const focusItem = (index: number) => {
    const el = rootRef.current?.querySelectorAll<HTMLElement>("[data-hb-xi6-item]")[index];
    el?.focus();
  };

  const onTrigKey = (e: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(id, 0);
      window.requestAnimationFrame(() => focusItem(0));
    }
  };

  const onPanelKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!menu?.items) return;
    const n = menu.items.length;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (hot + (e.key === "ArrowDown" ? 1 : -1) + n) % n;
      setHot(next);
      focusItem(next);
    }
  };

  const closeToTrigger = () => {
    const id = current;
    setOpen(null);
    if (id) rootRef.current?.querySelector<HTMLElement>(`[data-hb-xi6-trig="${id}"]`)?.focus();
  };

  const chevron = (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 3.5l3 3 3-3" />
    </svg>
  );
  const arrow = (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6h7M6.5 3l3 3-3 3" />
    </svg>
  );

  const item = menu?.items ? menu.items[Math.min(hot, menu.items.length - 1)] : null;

  return (
    <header
      ref={rootRef}
      className={`hb-xi6 ${className}`}
      style={{ "--hb-xi6-accent": accent, ...style } as React.CSSProperties}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        if (current) closeToTrigger();
        else if (sheet) setSheet(false);
      }}
      onBlur={(e) => {
        if (current && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
      }}
      {...rest}
    >
      <style href="hb-navbar-mega-preview" precedence="default">
        {css}
      </style>
      <div className="hb-xi6-bar" onPointerLeave={scheduleClose} onPointerEnter={() => current && clear()}>
        <nav className="hb-xi6-row" aria-label="Main">
          <a href="#" className="hb-xi6-brand" aria-label={`${brand} home`}>
            <span className="hb-xi6-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            {brand}
          </a>
          <ul className="hb-xi6-menus">
            {menus.map((m) => (
              <li key={m.id}>
                {m.items?.length ? (
                  <button
                    type="button"
                    className="hb-xi6-trig"
                    data-hb-xi6-trig={m.id}
                    aria-expanded={current === m.id}
                    aria-controls={`${uid}-panel`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") intent(m.id);
                    }}
                    onClick={() => setOpen(current === m.id ? null : m.id)}
                    onKeyDown={(e) => onTrigKey(e, m.id)}
                  >
                    {m.label}
                    {chevron}
                  </button>
                ) : (
                  <a href={m.href ?? "#"} className="hb-xi6-trig" onPointerEnter={() => current && scheduleClose()}>
                    {m.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="hb-xi6-end">
            {signIn && (
              <a href={signIn.href} className="hb-xi6-in">
                {signIn.label}
              </a>
            )}
            {cta && (
              <a href={cta.href} className="hb-xi6-cta">
                {cta.label}
              </a>
            )}
            <button
              type="button"
              className="hb-xi6-burger"
              aria-label={sheet ? "Close menu" : "Open menu"}
              aria-expanded={sheet}
              aria-controls={`${uid}-sheet`}
              onClick={() => setSheet((v) => !v)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {sheet ? <path d="M4 4l8 8M12 4l-8 8" /> : <path d="M2.5 5h11M2.5 8h11M2.5 11h7" />}
              </svg>
            </button>
          </div>
        </nav>
        {menu?.items && item && (
          <div id={`${uid}-panel`} className="hb-xi6-panel" tabIndex={-1} role="region" aria-label={`${menu.label} menu`} onKeyDown={onPanelKey}>
            <div className="hb-xi6-grid">
              <ul key={menu.id} className="hb-xi6-list" data-dir={dir}>
                {menu.items.map((it, i) => (
                  <li key={it.title}>
                    <a
                      href={it.href}
                      className="hb-xi6-item"
                      data-hb-xi6-item=""
                      data-hot={i === hot ? "true" : "false"}
                      onPointerEnter={() => setHot(i)}
                      onFocus={() => setHot(i)}
                    >
                      <span className="hb-xi6-ico" aria-hidden="true">
                        <svg viewBox="0 0 16 16">{icons[it.art ?? "graph"]}</svg>
                      </span>
                      <span>
                        <span className="hb-xi6-it">
                          {it.title}
                          {it.tag && <span className="hb-xi6-tag">{it.tag}</span>}
                        </span>
                        <span className="hb-xi6-id">{it.description}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="hb-xi6-prev">
                <div key={`${menu.id}-${hot}`} className="hb-xi6-art" aria-hidden="true">
                  <Art kind={item.art ?? "graph"} />
                </div>
                <div key={`${menu.id}-${hot}-c`} className="hb-xi6-cap">
                  <div>
                    <b>{item.title}</b>
                    <span>{item.description}</span>
                  </div>
                  <a href={item.href} className="hb-xi6-go" tabIndex={-1}>
                    Explore
                    {arrow}
                  </a>
                </div>
              </div>
            </div>
            {menu.footer && (
              <div className="hb-xi6-foot">
                <span>Trusted by 4,200 engineering teams</span>
                <a href={menu.footer.href}>{menu.footer.label}</a>
              </div>
            )}
          </div>
        )}
      </div>
      <div id={`${uid}-sheet`} className="hb-xi6-sheet" data-open={sheet ? "true" : "false"}>
        {menus.map((m) =>
          m.items?.length ? (
            <div key={m.id}>
              <button type="button" className="hb-xi6-acc" aria-expanded={acc === m.id} onClick={() => setAcc(acc === m.id ? null : m.id)}>
                {m.label}
                {chevron}
              </button>
              {acc === m.id && (
                <div className="hb-xi6-accp">
                  {m.items.map((it) => (
                    <a key={it.title} href={it.href} className="hb-xi6-item" onClick={() => setSheet(false)}>
                      <span className="hb-xi6-ico" aria-hidden="true">
                        <svg viewBox="0 0 16 16">{icons[it.art ?? "graph"]}</svg>
                      </span>
                      <span>
                        <span className="hb-xi6-it">{it.title}</span>
                        <span className="hb-xi6-id">{it.description}</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <a key={m.id} href={m.href ?? "#"} className="hb-xi6-acc" onClick={() => setSheet(false)}>
              {m.label}
            </a>
          ),
        )}
        {signIn && (
          <a href={signIn.href} className="hb-xi6-acc" onClick={() => setSheet(false)}>
            {signIn.label}
          </a>
        )}
      </div>
      {showBackdrop && (
        <div className="hb-xi6-stage" aria-hidden="true">
          <span className="hb-xi6-glow" />
          <div className="hb-xi6-hero">
            <h2 className="hb-xi6-h">
              Background jobs that <span>finish</span>, every single time.
            </h2>
            <p className="hb-xi6-sub">Durable workflows, edge functions and queues on one platform, with retries and tracing built in.</p>
          </div>
        </div>
      )}
    </header>
  );
}
