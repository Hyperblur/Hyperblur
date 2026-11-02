"use client";

import * as React from "react";

export interface HowFlowDiagramStat {
  label: string;
  value: string;
}

export interface HowFlowDiagramNode {
  stage: string;
  title: string;
  metric: string;
  description: string;
  stats?: HowFlowDiagramStat[];
}

export interface HowFlowDiagramProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  live?: string;
  nodes?: HowFlowDiagramNode[];
  skipLabel?: string;
  loopLabel?: string;
  defaultActive?: number;
  onNodeActive?: (index: number) => void;
  accent?: string;
}

const css = `
@keyframes hb-kh4-flow { to { stroke-dashoffset: -24; } }
@keyframes hb-kh4-blink {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-kh4-accent) 60%, transparent); }
  100% { box-shadow: 0 0 0 7px transparent; }
}
@keyframes hb-kh4-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: none; }
}
.hb-kh4 {
  --hb-kh4-accent: #22d3ee;
  --hb-kh4-warn: #fbbf24;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container: hb-kh4-root / inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kh4 *, .hb-kh4 *::before, .hb-kh4 *::after { box-sizing: border-box; }
.hb-kh4::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(50% 50% at 50% 55%, color-mix(in srgb, var(--hb-kh4-accent) 9%, transparent), transparent 70%),
    linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.015));
}
.hb-kh4-in {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px 80px;
}
.hb-kh4-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px 32px;
}
.hb-kh4-copy { max-width: 580px; }
.hb-kh4-eyebrow {
  font-family: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, monospace;
  color: var(--hb-kh4-accent);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hb-kh4-title {
  margin: 12px 0 0;
  font-size: clamp(30px, 4.3cqw, 42px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.hb-kh4-sub {
  margin: 14px 0 0;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-kh4-live {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #c9c9c9;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.hb-kh4-live::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--hb-kh4-accent);
  animation: hb-kh4-blink 1.6s ease-out infinite;
}
.hb-kh4-frame {
  margin-top: 40px;
  padding: 18px 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  background:
    radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px) 0 0 / 18px 18px,
    linear-gradient(180deg, #0f0f0f, #0b0b0b);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.hb-kh4-dia {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 360 / 820;
  container-type: inline-size;
}
.hb-kh4-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hb-kh4-svg-w { display: none; }
.hb-kh4-path { fill: none; stroke: rgba(255, 255, 255, 0.12); stroke-width: 1.5; transition: stroke 0.3s ease; }
.hb-kh4-path[data-on="true"] { stroke: color-mix(in srgb, var(--hb-kh4-accent) 45%, rgba(255, 255, 255, 0.15)); }
.hb-kh4-flow { fill: none; stroke: var(--hb-kh4-accent); stroke-width: 1.5; stroke-dasharray: 2 10; stroke-linecap: round; opacity: 0.55; animation: hb-kh4-flow 1.1s linear infinite; }
.hb-kh4-flow-warn { stroke: var(--hb-kh4-warn); opacity: 0.45; }
.hb-kh4-pkt { fill: #ffffff; filter: drop-shadow(0 0 5px var(--hb-kh4-accent)); }
.hb-kh4-pkt-warn { fill: var(--hb-kh4-warn); filter: drop-shadow(0 0 5px var(--hb-kh4-warn)); }
.hb-kh4-tip { fill: rgba(255, 255, 255, 0.35); }
.hb-kh4-node {
  position: absolute;
  left: var(--nx);
  top: var(--ny);
  width: var(--nw);
  height: var(--nh);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 3.6cqw 4.2cqw;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4.4cqw;
  background: linear-gradient(180deg, #171717, #111111);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 20px 40px -24px rgba(0, 0, 0, 0.9);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.hb-kh4-node:hover { border-color: rgba(255, 255, 255, 0.2); transform: translateY(-2px); }
.hb-kh4-node[data-active="true"] {
  border-color: var(--hb-kh4-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 4px color-mix(in srgb, var(--hb-kh4-accent) 12%, transparent), 0 20px 50px -20px color-mix(in srgb, var(--hb-kh4-accent) 50%, transparent);
}
.hb-kh4-node:focus-visible { outline: 2px solid var(--hb-kh4-accent); outline-offset: 3px; }
.hb-kh4-ntop { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.hb-kh4-ico {
  display: grid;
  place-items: center;
  width: 8.4cqw;
  height: 8.4cqw;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2.4cqw;
  background: #0d0d0d;
  color: #bdbdbd;
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.hb-kh4-node[data-active="true"] .hb-kh4-ico {
  border-color: color-mix(in srgb, var(--hb-kh4-accent) 50%, transparent);
  background: color-mix(in srgb, var(--hb-kh4-accent) 14%, #0d0d0d);
  color: var(--hb-kh4-accent);
}
.hb-kh4-ico svg { width: 55%; height: 55%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-kh4-stage {
  font-family: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, monospace;
  color: #8f8f8f;
  font-size: max(10px, 3.1cqw);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hb-kh4-ntitle {
  display: block;
  font-size: max(13px, 4.6cqw);
  font-weight: 600;
  letter-spacing: -0.015em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-kh4-metric {
  display: block;
  margin-top: 0.6cqw;
  color: #9a9a9a;
  font-size: max(10.5px, 3.4cqw);
  font-variant-numeric: tabular-nums;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hb-kh4-node[data-active="true"] .hb-kh4-metric { color: var(--hb-kh4-accent); }
.hb-kh4-lbl {
  position: absolute;
  left: var(--lx);
  top: var(--ly);
  display: none;
  align-items: center;
  gap: 6px;
  padding: 0.5cqw 1.2cqw;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: #0d0d0d;
  color: #bdbdbd;
  font-size: max(10px, 1.15cqw);
  white-space: nowrap;
  transform: translate(-50%, -50%);
}
.hb-kh4-lbl i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kh4-accent); }
.hb-kh4-lbl[data-warn="true"] i { background: var(--hb-kh4-warn); }
.hb-kh4-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 16px;
  margin-top: 14px;
  color: #8f8f8f;
  font-size: 12.5px;
}
.hb-kh4-legend span { display: inline-flex; align-items: center; gap: 6px; }
.hb-kh4-legend i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-kh4-accent); }
.hb-kh4-legend span:last-child i { background: var(--hb-kh4-warn); }
.hb-kh4-detail {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.hb-kh4-dcopy { animation: hb-kh4-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.hb-kh4-dstage {
  font-family: var(--font-mono, ui-monospace), SFMono-Regular, Menlo, monospace;
  color: var(--hb-kh4-accent);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.hb-kh4-dtitle { margin: 6px 0 0; font-size: 18px; font-weight: 600; letter-spacing: -0.015em; }
.hb-kh4-ddesc { margin: 6px 0 0; color: #9a9a9a; font-size: 14px; line-height: 1.55; }
.hb-kh4-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
}
.hb-kh4-stat {
  min-width: 0;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  background: #0b0b0b;
  animation: hb-kh4-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--i) * 60ms + 60ms);
}
.hb-kh4-stat dt { color: #8f8f8f; font-size: 11.5px; }
.hb-kh4-stat dd {
  margin: 4px 0 0;
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}
@container hb-kh4-root (min-width: 720px) {
  .hb-kh4-in { padding: 88px 40px 104px; }
  .hb-kh4-detail { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); align-items: center; gap: 24px; padding: 22px 24px; }
}
@container hb-kh4-root (min-width: 840px) {
  .hb-kh4-frame { padding: 24px 28px; }
  .hb-kh4-dia { max-width: none; aspect-ratio: 1000 / 320; }
  .hb-kh4-svg-n { display: none; }
  .hb-kh4-svg-w { display: block; }
  .hb-kh4-node {
    left: var(--wx);
    top: var(--wy);
    width: var(--ww);
    height: var(--wh);
    padding: 1.6cqw 1.7cqw;
    border-radius: 1.8cqw;
  }
  .hb-kh4-ico { width: 3.2cqw; height: 3.2cqw; border-radius: 0.9cqw; }
  .hb-kh4-stage { font-size: max(10px, 1.1cqw); }
  .hb-kh4-ntitle { font-size: max(13px, 1.8cqw); }
  .hb-kh4-metric { font-size: max(10.5px, 1.25cqw); margin-top: 0.3cqw; }
  .hb-kh4-lbl { display: inline-flex; }
  .hb-kh4-legend { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kh4 *, .hb-kh4 *::before, .hb-kh4 *::after { animation: none !important; transition: none !important; }
  .hb-kh4-pkt, .hb-kh4-pkt-warn { display: none; }
}
`;

const defaultNodes: HowFlowDiagramNode[] = [
  {
    stage: "Input",
    title: "Inbox",
    metric: "1,284 today",
    description: "Invoices arrive by email, upload or API. Duplicates are caught before they ever reach your books.",
    stats: [
      { label: "Sources", value: "Email, upload, API" },
      { label: "Duplicates blocked", value: "37 this week" },
      { label: "Average length", value: "2.4 pages" },
    ],
  },
  {
    stage: "Process",
    title: "Extract",
    metric: "98.7% matched",
    description: "Line items are read, coded to the right GL account and matched against open purchase orders.",
    stats: [
      { label: "Fields read", value: "42 per invoice" },
      { label: "PO match rate", value: "98.7%" },
      { label: "Time per invoice", value: "8 seconds" },
    ],
  },
  {
    stage: "Review",
    title: "Exceptions",
    metric: "Median 6 min",
    description: "Only exceptions reach a person: price mismatches, new vendors or anything above your threshold.",
    stats: [
      { label: "Needs a person", value: "18%" },
      { label: "Median wait", value: "6 minutes" },
      { label: "Threshold", value: "$5,000" },
    ],
  },
  {
    stage: "Output",
    title: "Pay and sync",
    metric: "0 manual entries",
    description: "Approved bills post to your ledger and are paid on their due date, with the audit trail attached.",
    stats: [
      { label: "Posted today", value: "1,191" },
      { label: "Paid on time", value: "99.4%" },
      { label: "Audit trail", value: "Every step" },
    ],
  },
];

const W = { w: 1000, h: 320, nw: 180, nh: 130, xs: [110, 370, 630, 890], y: 160 };
const N = { w: 360, h: 820, nw: 240, nh: 112, x: 180, ys: [96, 300, 504, 708] };

const wide = {
  main: ["M200 160 L280 160", "M460 160 L540 160", "M720 160 L800 160"],
  skip: "M370 95 C370 30 890 30 890 95",
  loop: "M630 225 C630 300 370 300 370 225",
};

const narrow = {
  main: ["M180 152 L180 244", "M180 356 L180 448", "M180 560 L180 652"],
  skip: "M300 300 C350 300 350 708 300 708",
  loop: "M60 504 C10 504 10 300 60 300",
};

const touches: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

function pct(n: number, total: number) {
  return `${((n / total) * 100).toFixed(3)}%`;
}

const icons = [
  <path key="0" d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
  <path key="1" d="M4 6h10M4 12h16M4 18h7M17 4l3 3-3 3M14 18l2 2 4-4" />,
  <path key="2" d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4zM8.5 12l2.5 2.5 4.5-5" />,
  <path key="3" d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />,
];

function Packets({ path, count, dur, offset, warn }: { path: string; count: number; dur: number; offset: number; warn?: boolean }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} className={warn ? "hb-kh4-pkt-warn" : "hb-kh4-pkt"} r="3.5" cx="0" cy="0">
          <animateMotion
            dur={`${dur.toFixed(2)}s`}
            begin={`${(-(offset + (i * dur) / count)).toFixed(2)}s`}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      ))}
    </>
  );
}

function Layer({ paths, active, variant, uid }: { paths: typeof wide; active: number; variant: "w" | "n"; uid: string }) {
  const markerId = `${uid}-${variant}`;
  const vb = variant === "w" ? `0 0 ${W.w} ${W.h}` : `0 0 ${N.w} ${N.h}`;
  const flowAll = [...paths.main, paths.skip].join(" ");
  return (
    <svg className={`hb-kh4-svg hb-kh4-svg-${variant}`} viewBox={vb} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="hb-kh4-tip" d="M0 0L8 4L0 8z" />
        </marker>
      </defs>
      {paths.main.map((d, i) => (
        <path
          key={d}
          className="hb-kh4-path"
          d={d}
          markerEnd={`url(#${markerId})`}
          data-on={touches[i].includes(active) ? "true" : "false"}
        />
      ))}
      <path className="hb-kh4-path" d={paths.skip} markerEnd={`url(#${markerId})`} data-on={active === 1 || active === 3 ? "true" : "false"} />
      <path className="hb-kh4-path" d={paths.loop} markerEnd={`url(#${markerId})`} data-on={active === 1 || active === 2 ? "true" : "false"} />
      <path className="hb-kh4-flow" d={flowAll} />
      <path className="hb-kh4-flow hb-kh4-flow-warn" d={paths.loop} />
      {paths.main.map((d, i) => (
        <Packets key={d} path={d} count={2} dur={1.6} offset={i * 0.35} />
      ))}
      <Packets path={paths.skip} count={3} dur={3.2} offset={0.5} />
      <Packets path={paths.loop} count={1} dur={3.6} offset={1.2} warn />
    </svg>
  );
}

export function HowFlowDiagram({
  eyebrow = "Under the hood",
  title = "Every invoice takes the same four-stop route",
  subtitle = "Ledgerline reads, matches and routes bills on its own. People only see the few that need a decision.",
  live = "1,284 invoices processed today",
  nodes = defaultNodes,
  skipLabel = "Auto-approved 82%",
  loopLabel = "Sent back 3%",
  defaultActive = 1,
  onNodeActive,
  accent = "#22d3ee",
  className,
  style,
  ...rest
}: HowFlowDiagramProps) {
  const list = nodes.slice(0, 4);
  const [active, setActive] = React.useState(Math.min(Math.max(defaultActive, 0), list.length - 1));
  const btns = React.useRef<(HTMLButtonElement | null)[]>([]);
  const uid = `kh4tip${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const activate = (i: number) => {
    setActive(i);
    onNodeActive?.(i);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % list.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + list.length) % list.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = list.length - 1;
    if (next < 0) return;
    e.preventDefault();
    btns.current[next]?.focus();
    activate(next);
  };

  const current = list[active] ?? list[0];

  return (
    <section
      className={["hb-kh4", className].filter(Boolean).join(" ")}
      style={{ ["--hb-kh4-accent" as string]: accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-how-flow-diagram" precedence="default">{css}</style>
      <div className="hb-kh4-in">
        <header className="hb-kh4-head">
          <div className="hb-kh4-copy">
            {eyebrow ? <div className="hb-kh4-eyebrow">{eyebrow}</div> : null}
            <h2 className="hb-kh4-title">{title}</h2>
            {subtitle ? <p className="hb-kh4-sub">{subtitle}</p> : null}
          </div>
          {live ? <span className="hb-kh4-live">{live}</span> : null}
        </header>
        <div className="hb-kh4-frame">
          <div className="hb-kh4-dia">
            <Layer paths={narrow} active={active} variant="n" uid={uid} />
            <Layer paths={wide} active={active} variant="w" uid={uid} />
            {list.map((node, i) => {
              const vars = {
                "--wx": pct(W.xs[i] - W.nw / 2, W.w),
                "--wy": pct(W.y - W.nh / 2, W.h),
                "--ww": pct(W.nw, W.w),
                "--wh": pct(W.nh, W.h),
                "--nx": pct(N.x - N.nw / 2, N.w),
                "--ny": pct(N.ys[i] - N.nh / 2, N.h),
                "--nw": pct(N.nw, N.w),
                "--nh": pct(N.nh, N.h),
              } as React.CSSProperties;
              return (
                <button
                  key={node.title + i}
                  ref={(el) => {
                    btns.current[i] = el;
                  }}
                  type="button"
                  className="hb-kh4-node"
                  style={vars}
                  data-active={active === i ? "true" : "false"}
                  aria-pressed={active === i}
                  aria-label={`${node.stage}: ${node.title}, ${node.metric}`}
                  tabIndex={active === i ? 0 : -1}
                  onMouseEnter={() => activate(i)}
                  onFocus={() => activate(i)}
                  onClick={() => activate(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="hb-kh4-ntop">
                    <span className="hb-kh4-ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24">{icons[i % icons.length]}</svg>
                    </span>
                    <span className="hb-kh4-stage">{node.stage}</span>
                  </span>
                  <span>
                    <span className="hb-kh4-ntitle">{node.title}</span>
                    <span className="hb-kh4-metric">{node.metric}</span>
                  </span>
                </button>
              );
            })}
            {skipLabel ? (
              <span className="hb-kh4-lbl" style={{ ["--lx" as string]: pct(630, W.w), ["--ly" as string]: pct(46, W.h) } as React.CSSProperties}>
                <i aria-hidden="true" />
                {skipLabel}
              </span>
            ) : null}
            {loopLabel ? (
              <span
                className="hb-kh4-lbl"
                data-warn="true"
                style={{ ["--lx" as string]: pct(500, W.w), ["--ly" as string]: pct(281, W.h) } as React.CSSProperties}
              >
                <i aria-hidden="true" />
                {loopLabel}
              </span>
            ) : null}
          </div>
          <div className="hb-kh4-legend">
            {skipLabel ? (
              <span>
                <i aria-hidden="true" />
                {skipLabel}
              </span>
            ) : null}
            {loopLabel ? (
              <span>
                <i aria-hidden="true" />
                {loopLabel}
              </span>
            ) : null}
          </div>
        </div>
        {current ? (
          <div className="hb-kh4-detail" aria-live="polite">
            <div className="hb-kh4-dcopy" key={`c${active}`}>
              <div className="hb-kh4-dstage">
                {String(active + 1).padStart(2, "0")} · {current.stage}
              </div>
              <h3 className="hb-kh4-dtitle">{current.title}</h3>
              <p className="hb-kh4-ddesc">{current.description}</p>
            </div>
            {current.stats && current.stats.length ? (
              <dl className="hb-kh4-stats" key={`s${active}`}>
                {current.stats.slice(0, 3).map((s, i) => (
                  <div key={s.label} className="hb-kh4-stat" style={{ ["--i" as string]: i } as React.CSSProperties}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
