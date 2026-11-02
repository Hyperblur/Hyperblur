"use client";

import * as React from "react";

export interface BentoTerminalLink {
  label: string;
  href: string;
}

export interface BentoTerminalLine {
  text: string;
  meta?: string;
  tone?: "default" | "success" | "muted";
}

export interface BentoTerminalCommit {
  message: string;
  sha: string;
  lane: 0 | 1 | 2;
  tag?: string;
}

export interface BentoTerminalProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: BentoTerminalLink | null;
  secondaryCta?: BentoTerminalLink | null;
  command?: string;
  lines?: BentoTerminalLine[];
  commits?: BentoTerminalCommit[];
  regions?: string[];
  accent?: string;
}

const css = `
@keyframes hb-kb4-rise { from { opacity: 0; transform: translate3d(0, 16px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb4-type { from { width: 0; } }
@keyframes hb-kb4-show { from { opacity: 0; transform: translate3d(-6px, 0, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-kb4-caret { 50% { opacity: 0; } }
@keyframes hb-kb4-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-kb4-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-kb4-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-kb4-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-kb4-sweep { from { background-position: 100% 0; } to { background-position: 0 0; } }
@keyframes hb-kb4-pop { from { transform: scale(0); } to { transform: scale(1); } }
.hb-kb4 {
  --hb-kb4-accent: #f59e0b;
  --hb-kb4-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kb4 *, .hb-kb4 *::before, .hb-kb4 *::after { box-sizing: border-box; }
.hb-kb4::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(45% 35% at 85% 0%, color-mix(in srgb, var(--hb-kb4-accent) 11%, transparent), transparent 70%);
}
.hb-kb4-in { position: relative; max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-kb4-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px 40px; margin-bottom: clamp(28px, 4cqi, 44px); animation: hb-kb4-rise .7s cubic-bezier(.2, .8, .2, 1) backwards; }
.hb-kb4-head > div:first-child { max-width: 620px; }
.hb-kb4-eyebrow { margin: 0 0 14px; color: #8f8f8f; font-family: var(--hb-kb4-mono); font-size: 12.5px; }
.hb-kb4-eyebrow b { color: var(--hb-kb4-accent); font-weight: 500; }
.hb-kb4-title { margin: 0; font-size: clamp(28px, 4.2cqi, 46px); font-weight: 600; line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; }
.hb-kb4-sub { margin: 14px 0 0; color: #8f8f8f; font-size: 15.5px; line-height: 1.6; text-wrap: pretty; }
.hb-kb4-ctas { display: flex; flex: none; flex-wrap: wrap; gap: 10px; }
.hb-kb4-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 10px; color: #ededed; font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s ease, transform .2s ease, border-color .2s ease; }
.hb-kb4-btn:hover { background: rgba(255, 255, 255, .05); border-color: rgba(255, 255, 255, .2); }
.hb-kb4-btn[data-primary="true"] { border-color: transparent; background: var(--hb-kb4-accent); color: #140d00; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 10px 24px -12px var(--hb-kb4-accent); }
.hb-kb4-btn[data-primary="true"]:hover { transform: translate3d(0, -1px, 0); filter: brightness(1.06); }
.hb-kb4-btn:focus-visible { outline: 2px solid var(--hb-kb4-accent); outline-offset: 3px; }
.hb-kb4-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas: "term term diff diff" "term term deploy git" "heat heat heat git";
  gap: 12px;
}
.hb-kb4-cell {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: #0f0f0f;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .04);
  animation: hb-kb4-rise .7s cubic-bezier(.2, .8, .2, 1) backwards;
  animation-delay: calc(var(--hb-kb4-i, 0) * 70ms + 120ms);
  transition: border-color .25s ease;
}
.hb-kb4-cell:hover { border-color: rgba(255, 255, 255, .16); }
.hb-kb4-bar { display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 14px; border-bottom: 1px solid rgba(255, 255, 255, .06); background: rgba(255, 255, 255, .015); color: #8f8f8f; font-family: var(--hb-kb4-mono); font-size: 11.5px; }
.hb-kb4-bar b { margin-left: auto; color: #6f6f6f; font-weight: 400; }
.hb-kb4-dots { display: flex; gap: 6px; }
.hb-kb4-dots i { width: 10px; height: 10px; border-radius: 50%; background: #2a2a2a; }
.hb-kb4-cell:hover .hb-kb4-dots i:nth-child(1) { background: #ff5f57; }
.hb-kb4-cell:hover .hb-kb4-dots i:nth-child(2) { background: #febc2e; }
.hb-kb4-cell:hover .hb-kb4-dots i:nth-child(3) { background: #28c840; }
.hb-kb4-body { padding: 16px; }
.hb-kb4-cap { padding: 14px 16px 16px; }
.hb-kb4-cap h3 { margin: 0; font-size: 14px; font-weight: 600; }
.hb-kb4-cap p { margin: 3px 0 0; color: #8f8f8f; font-size: 12.5px; line-height: 1.5; }
.hb-kb4-term { grid-area: term; display: flex; flex-direction: column; background: #0b0b0b; }
.hb-kb4-term .hb-kb4-body { flex: 1; font-family: var(--hb-kb4-mono); font-size: 12.5px; line-height: 1.95; }
.hb-kb4-cmd { display: flex; align-items: center; white-space: nowrap; }
.hb-kb4-cmd > span:first-child { color: var(--hb-kb4-accent); margin-right: 1ch; }
.hb-kb4-typed { display: inline-block; overflow: hidden; width: calc(var(--hb-kb4-n) * 1ch); animation: hb-kb4-type 1.2s steps(var(--hb-kb4-n)) .6s both; }
.hb-kb4-line { display: flex; justify-content: space-between; gap: 12px; color: #a1a1a1; white-space: nowrap; animation: hb-kb4-show .35s ease both; animation-delay: calc(var(--hb-kb4-j) * 420ms + 2s); }
.hb-kb4-line span { overflow: hidden; text-overflow: ellipsis; }
.hb-kb4-line small { flex: none; color: #5f5f5f; font-size: 12px; }
.hb-kb4-line[data-tone="success"] { color: #4ade80; }
.hb-kb4-line[data-tone="success"] small { color: #4ade80; }
.hb-kb4-line[data-tone="muted"] { color: #6f6f6f; }
.hb-kb4-caret { display: inline-block; width: .6em; height: 1.1em; margin-left: 1ch; background: #ededed; vertical-align: -3px; animation: hb-kb4-caret 1s steps(1) infinite; }
.hb-kb4-last { animation: hb-kb4-show .35s ease both; animation-delay: calc(var(--hb-kb4-j) * 420ms + 2s); }
.hb-kb4-last > span:first-child { color: var(--hb-kb4-accent); }
.hb-kb4-diff { grid-area: diff; }
.hb-kb4-stat { display: inline-flex; gap: 8px; }
.hb-kb4-stat em { font-style: normal; color: #4ade80; }
.hb-kb4-stat i { font-style: normal; color: #fb7185; }
.hb-kb4-code { padding: 8px 0; font-family: var(--hb-kb4-mono); font-size: 11.5px; line-height: 1.85; }
.hb-kb4-dl { display: grid; grid-template-columns: 34px 14px minmax(0, 1fr); padding-right: 12px; white-space: pre; animation: hb-kb4-show .4s ease both; animation-delay: calc(var(--hb-kb4-j) * 70ms + 500ms); }
.hb-kb4-dl > span { overflow: hidden; text-overflow: ellipsis; }
.hb-kb4-dl b { color: #4a4a4a; font-weight: 400; text-align: right; padding-right: 10px; }
.hb-kb4-dl i { color: #5f5f5f; font-style: normal; }
.hb-kb4-dl[data-k="add"] { background: linear-gradient(90deg, rgba(34, 197, 94, .14) 50%, transparent 50%) 0 0 / 200% 100% no-repeat; animation: hb-kb4-show .4s ease both, hb-kb4-sweep .8s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--hb-kb4-j) * 70ms + 500ms), calc(var(--hb-kb4-j) * 70ms + 700ms); color: #bbf7d0; }
.hb-kb4-dl[data-k="add"] i { color: #4ade80; }
.hb-kb4-dl[data-k="del"] { background: rgba(244, 63, 94, .1); color: #fecdd3; text-decoration: line-through; text-decoration-color: rgba(244, 63, 94, .4); }
.hb-kb4-dl[data-k="del"] i { color: #fb7185; }
.hb-kb4-dl[data-k="ctx"] { color: #8f8f8f; }
.hb-kb4-deploy { grid-area: deploy; display: flex; flex-direction: column; }
.hb-kb4-steps { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; font-size: 12.5px; }
.hb-kb4-steps li { display: grid; grid-template-columns: 18px minmax(0, 1fr) auto; align-items: center; gap: 8px; }
.hb-kb4-steps li > span:nth-child(2) { color: #d4d4d4; }
.hb-kb4-steps small { color: #5f5f5f; font-family: var(--hb-kb4-mono); font-size: 11px; }
.hb-kb4-ok { display: grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; background: rgba(34, 197, 94, .16); color: #4ade80; }
.hb-kb4-run { position: relative; display: grid; place-items: center; width: 16px; height: 16px; }
.hb-kb4-run > * { grid-area: 1 / 1; }
.hb-kb4-run svg:first-child { animation: hb-kb4-out .2s ease 4.2s both; }
.hb-kb4-run .hb-kb4-ok { animation: hb-kb4-pop .35s cubic-bezier(.34, 1.56, .64, 1) 4.2s both; }
.hb-kb4-prog { height: 4px; margin: 12px 0 4px; overflow: hidden; border-radius: 4px; background: #1d1d1d; }
.hb-kb4-prog i { display: block; height: 100%; background: linear-gradient(90deg, color-mix(in srgb, var(--hb-kb4-accent) 50%, #111), var(--hb-kb4-accent)); transform-origin: left; animation: hb-kb4-fill 3.2s cubic-bezier(.4, 0, .2, 1) 1s both; }
.hb-kb4-state { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 12px; font-size: 12px; }
.hb-kb4-state > span { display: grid; }
.hb-kb4-state > span > * { grid-area: 1 / 1; }
.hb-kb4-building { color: var(--hb-kb4-accent); animation: hb-kb4-out .2s ease 4.2s both; }
.hb-kb4-ready { display: inline-flex; align-items: center; gap: 6px; color: #4ade80; font-weight: 600; animation: hb-kb4-in .3s ease 4.2s both; }
.hb-kb4-ready::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; }
.hb-kb4-regions { display: flex; gap: 4px; }
.hb-kb4-regions span { padding: 2px 6px; border-radius: 5px; background: #171717; color: #8f8f8f; font-family: var(--hb-kb4-mono); font-size: 10.5px; animation: hb-kb4-in .3s ease both; animation-delay: calc(var(--hb-kb4-j) * 150ms + 4.3s); }
.hb-kb4-git { grid-area: git; display: flex; flex-direction: column; }
.hb-kb4-graph { position: relative; display: flex; gap: 6px; padding: 14px 14px 0; }
.hb-kb4-graph svg { flex: none; overflow: visible; }
.hb-kb4-gline { fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 1; animation: hb-kb4-draw 1s cubic-bezier(.65, 0, .35, 1) both; animation-delay: calc(var(--hb-kb4-j) * 200ms + 400ms); }
.hb-kb4-gdot { transform-box: fill-box; transform-origin: center; animation: hb-kb4-pop .35s cubic-bezier(.34, 1.56, .64, 1) both; animation-delay: calc(var(--hb-kb4-j) * 90ms + 700ms); }
.hb-kb4-commits { flex: 1; min-width: 0; margin: 0; padding: 0; list-style: none; }
.hb-kb4-commits li { display: flex; flex-direction: column; justify-content: center; height: 40px; min-width: 0; padding: 0 6px; border-radius: 8px; transition: background .15s ease; }
.hb-kb4-commits li:hover { background: rgba(255, 255, 255, .04); }
.hb-kb4-commits span { overflow: hidden; color: #d4d4d4; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.hb-kb4-commits small { display: flex; gap: 6px; color: #5f5f5f; font-family: var(--hb-kb4-mono); font-size: 10.5px; }
.hb-kb4-commits em { padding: 0 5px; border-radius: 4px; background: color-mix(in srgb, var(--hb-kb4-accent) 18%, transparent); color: var(--hb-kb4-accent); font-style: normal; }
.hb-kb4-heat { grid-area: heat; }
.hb-kb4-hgrid { display: grid; gap: 4px; padding: 14px 16px 0; }
.hb-kb4-hrow { display: grid; grid-template-columns: 38px minmax(0, 1fr); align-items: center; gap: 8px; }
.hb-kb4-hrow > span { color: #6f6f6f; font-family: var(--hb-kb4-mono); font-size: 10.5px; }
.hb-kb4-hcells { display: grid; grid-template-columns: repeat(36, minmax(0, 1fr)); gap: 3px; }
.hb-kb4-hcells i { position: relative; height: 16px; border-radius: 3px; background: var(--c); animation: hb-kb4-in .4s ease both; animation-delay: calc(var(--hb-kb4-j) * 22ms + 600ms); transition: transform .15s ease, filter .15s ease; }
.hb-kb4-hcells i:hover { z-index: 2; transform: scale(1.35); filter: brightness(1.3); }
.hb-kb4-hcells i::after { content: attr(data-ms); position: absolute; bottom: calc(100% + 8px); left: 50%; padding: 3px 6px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 6px; background: #1a1a1a; color: #ededed; font-family: var(--hb-kb4-mono); font-size: 9px; white-space: nowrap; opacity: 0; pointer-events: none; transform: translateX(-50%); transition: opacity .12s ease; }
.hb-kb4-hcells i:hover::after { opacity: 1; }
.hb-kb4-legend { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 12px 16px 0; color: #6f6f6f; font-family: var(--hb-kb4-mono); font-size: 11px; }
.hb-kb4-legend b { color: #ededed; font-weight: 500; }
.hb-kb4-scale { display: inline-flex; align-items: center; gap: 3px; }
.hb-kb4-scale i { width: 10px; height: 10px; border-radius: 2px; background: var(--c); }
@container (max-width: 860px) {
  .hb-kb4-head { flex-direction: column; align-items: flex-start; }
  .hb-kb4-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-areas: "term term" "diff diff" "deploy git" "heat heat"; }
}
@container (max-width: 540px) {
  .hb-kb4-grid { grid-template-columns: minmax(0, 1fr); grid-template-areas: "term" "diff" "deploy" "git" "heat"; }
  .hb-kb4-hcells { grid-template-columns: repeat(18, minmax(0, 1fr)); }
  .hb-kb4-hcells i:nth-child(n + 19) { display: none; }
  .hb-kb4-term .hb-kb4-body { font-size: 11.5px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kb4 *, .hb-kb4 *::before, .hb-kb4 *::after { animation: none !important; transition: none !important; }
  .hb-kb4-run svg:first-child, .hb-kb4-building { visibility: hidden; }
}
`;

const defaultLines: BentoTerminalLine[] = [
  { text: "Linking acme/web on main at 4f2a91c", tone: "muted" },
  { text: "Installing dependencies", meta: "1.8s" },
  { text: "Building 214 routes", meta: "4.2s" },
  { text: "Running 1,206 checks", meta: "6.9s" },
  { text: "Uploading 3.1 MB to 4 regions", meta: "0.6s" },
  { text: "✓ Live at acme.app", meta: "38s", tone: "success" },
];

const defaultCommits: BentoTerminalCommit[] = [
  { message: "feat: cache user lookups at the edge", sha: "4f2a91c", lane: 0, tag: "prod" },
  { message: "Merge pull request #482", sha: "b81e03d", lane: 0 },
  { message: "fix: guard empty carts on checkout", sha: "7c9d4aa", lane: 1 },
  { message: "chore: bump runtime to 26.1", sha: "2e6f118", lane: 0 },
  { message: "feat: regional rate limits", sha: "91ab7f0", lane: 2 },
  { message: "docs: deploy hooks guide", sha: "c03d5e2", lane: 0 },
];

const diffLines: { k: "ctx" | "add" | "del"; n: string; code: string }[] = [
  { k: "ctx", n: "41", code: "export async function getUser(id: string) {" },
  { k: "del", n: "42", code: "  const user = await db.user.find(id);" },
  { k: "add", n: "42", code: "  const hit = await kv.get(`user:${id}`);" },
  { k: "add", n: "43", code: "  if (hit) return hit;" },
  { k: "add", n: "44", code: "  const user = await db.user.find(id);" },
  { k: "add", n: "45", code: "  await kv.set(`user:${id}`, user, { ex: 60 });" },
  { k: "ctx", n: "46", code: "  return user;" },
];

const laneColors = ["var(--hb-kb4-accent)", "#60a5fa", "#c084fc"];

function heatColor(ms: number) {
  if (ms < 45) return "#14532d";
  if (ms < 70) return "#15803d";
  if (ms < 110) return "#4d7c0f";
  if (ms < 160) return "#b45309";
  return "#b91c1c";
}

function latency(row: number, col: number) {
  let x = (row * 97 + col * 31 + 7) * 2654435761;
  x = (x ^ (x >>> 13)) >>> 0;
  const noise = (x % 1000) / 1000;
  const base = [38, 52, 84, 66][row % 4];
  const spike = col === 22 && row === 2 ? 140 : col === 23 && row === 2 ? 90 : 0;
  return Math.round(base + noise * 40 + spike);
}

const Check = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function BentoTerminal({
  eyebrow = "acme",
  title = "From commit to production in under a minute",
  subtitle = "Push to main and watch it build, check and roll out to every region, with diffs, history and latency in one place.",
  primaryCta = { label: "Start deploying", href: "#" },
  secondaryCta = { label: "Read the CLI docs", href: "#" },
  command = "hb deploy --prod",
  lines = defaultLines,
  commits = defaultCommits,
  regions = ["iad1", "fra1", "gru1", "hnd1"],
  accent = "#f59e0b",
  className,
  style,
  ...rest
}: BentoTerminalProps) {
  const rowH = 40;
  const laneX = [10, 26, 42];
  const shown = commits.slice(0, 6);
  const graphH = shown.length * rowH;
  const y = (i: number) => i * rowH + rowH / 2;
  const branchPaths: { d: string; lane: number }[] = [];
  shown.forEach((c, i) => {
    if (c.lane === 0) return;
    const top = Math.max(0, i - 1);
    const bottom = Math.min(shown.length - 1, i + 1);
    const x = laneX[c.lane];
    branchPaths.push({
      lane: c.lane,
      d: `M${laneX[0]} ${y(top)} C${laneX[0]} ${y(top) + 16} ${x} ${y(i) - 20} ${x} ${y(i)} C${x} ${y(i) + 20} ${laneX[0]} ${y(bottom) - 16} ${laneX[0]} ${y(bottom)}`,
    });
  });

  return (
    <section
      className={["hb-kb4", className].filter(Boolean).join(" ")}
      style={{ "--hb-kb4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-bento-terminal" precedence="default">{css}</style>
      <div className="hb-kb4-in">
        <header className="hb-kb4-head">
          <div>
            {eyebrow ? (
              <p className="hb-kb4-eyebrow">
                ~/{eyebrow} <b>$</b> {command}
              </p>
            ) : null}
            <h2 className="hb-kb4-title">{title}</h2>
            {subtitle ? <p className="hb-kb4-sub">{subtitle}</p> : null}
          </div>
          {primaryCta || secondaryCta ? (
            <div className="hb-kb4-ctas">
              {primaryCta ? (
                <a className="hb-kb4-btn" data-primary="true" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a className="hb-kb4-btn" href={secondaryCta.href}>
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="hb-kb4-grid">
          <article className="hb-kb4-cell hb-kb4-term" style={{ "--hb-kb4-i": 0 } as React.CSSProperties}>
            <div className="hb-kb4-bar">
              <span className="hb-kb4-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              zsh · {eyebrow}-web
              <b>⌥ main</b>
            </div>
            <div className="hb-kb4-body" role="log" aria-label="Deploy output">
              <div className="hb-kb4-cmd">
                <span>$</span>
                <span className="hb-kb4-typed" style={{ "--hb-kb4-n": command.length } as React.CSSProperties}>
                  {command}
                </span>
              </div>
              {lines.map((l, j) => (
                <div key={l.text} className="hb-kb4-line" data-tone={l.tone ?? "default"} style={{ "--hb-kb4-j": j } as React.CSSProperties}>
                  <span>
                    {l.tone === "success" ? "" : "› "}
                    {l.text}
                  </span>
                  {l.meta ? <small>{l.meta}</small> : null}
                </div>
              ))}
              <div className="hb-kb4-last" style={{ "--hb-kb4-j": lines.length } as React.CSSProperties}>
                <span>$</span>
                <span className="hb-kb4-caret" aria-hidden="true" />
              </div>
            </div>
            <div className="hb-kb4-cap">
              <h3>One command, every region</h3>
              <p>Builds are cached per route, so most deploys finish before your coffee does.</p>
            </div>
          </article>

          <article className="hb-kb4-cell hb-kb4-diff" style={{ "--hb-kb4-i": 1 } as React.CSSProperties}>
            <div className="hb-kb4-bar">
              src/lib/users.ts
              <b className="hb-kb4-stat">
                <em>+4</em>
                <i>−1</i>
              </b>
            </div>
            <div className="hb-kb4-code" aria-label="Code diff">
              {diffLines.map((l, j) => (
                <div key={`${l.k}-${l.n}-${j}`} className="hb-kb4-dl" data-k={l.k} style={{ "--hb-kb4-j": j } as React.CSSProperties}>
                  <b>{l.n}</b>
                  <i>{l.k === "add" ? "+" : l.k === "del" ? "−" : " "}</i>
                  <span>{l.code}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="hb-kb4-cell hb-kb4-deploy" style={{ "--hb-kb4-i": 2 } as React.CSSProperties}>
            <div className="hb-kb4-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <ul className="hb-kb4-steps">
                <li>
                  <span className="hb-kb4-ok">
                    <Check />
                  </span>
                  <span>Build</span>
                  <small>12s</small>
                </li>
                <li>
                  <span className="hb-kb4-ok">
                    <Check />
                  </span>
                  <span>Checks</span>
                  <small>8s</small>
                </li>
                <li>
                  <span className="hb-kb4-run">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke={accent} strokeOpacity=".3" strokeWidth="2" />
                      <path d="M8 2a6 6 0 016 6" stroke={accent} strokeWidth="2" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.9s" repeatCount="indefinite" />
                      </path>
                    </svg>
                    <span className="hb-kb4-ok">
                      <Check />
                    </span>
                  </span>
                  <span>Promote</span>
                  <small>18s</small>
                </li>
              </ul>
              <div className="hb-kb4-prog" aria-hidden="true">
                <i />
              </div>
              <div className="hb-kb4-state">
                <span>
                  <span className="hb-kb4-building">Rolling out…</span>
                  <span className="hb-kb4-ready">Ready</span>
                </span>
                <span className="hb-kb4-regions">
                  {regions.slice(0, 4).map((r, j) => (
                    <span key={r} style={{ "--hb-kb4-j": j } as React.CSSProperties}>
                      {r}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </article>

          <article className="hb-kb4-cell hb-kb4-git" style={{ "--hb-kb4-i": 3 } as React.CSSProperties}>
            <div className="hb-kb4-graph">
              <svg width="52" height={graphH} viewBox={`0 0 52 ${graphH}`} aria-hidden="true">
                <path className="hb-kb4-gline" d={`M${laneX[0]} ${y(0)} L${laneX[0]} ${y(shown.length - 1)}`} pathLength={1} stroke={laneColors[0]} style={{ "--hb-kb4-j": 0 } as React.CSSProperties} />
                {branchPaths.map((b, j) => (
                  <path key={j} className="hb-kb4-gline" d={b.d} pathLength={1} stroke={laneColors[b.lane]} style={{ "--hb-kb4-j": j + 1 } as React.CSSProperties} />
                ))}
                {shown.map((c, i) => (
                  <circle
                    key={c.sha}
                    className="hb-kb4-gdot"
                    cx={laneX[c.lane]}
                    cy={y(i)}
                    r={i === 0 ? 5.5 : 4.5}
                    fill={i === 0 ? laneColors[c.lane] : "#0f0f0f"}
                    stroke={laneColors[c.lane]}
                    strokeWidth="2"
                    style={{ "--hb-kb4-j": i } as React.CSSProperties}
                  />
                ))}
              </svg>
              <ul className="hb-kb4-commits">
                {shown.map((c) => (
                  <li key={c.sha}>
                    <span>{c.message}</span>
                    <small>
                      {c.sha}
                      {c.tag ? <em>{c.tag}</em> : null}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hb-kb4-cap" style={{ marginTop: "auto" }}>
              <h3>History you can read</h3>
              <p>Every deploy maps to a commit you can roll back in one click.</p>
            </div>
          </article>

          <article className="hb-kb4-cell hb-kb4-heat" style={{ "--hb-kb4-i": 4 } as React.CSSProperties}>
            <div className="hb-kb4-hgrid" aria-hidden="true">
              {regions.slice(0, 4).map((r, row) => (
                <div key={r} className="hb-kb4-hrow">
                  <span>{r}</span>
                  <div className="hb-kb4-hcells">
                    {Array.from({ length: 36 }, (_, col) => {
                      const ms = latency(row, col);
                      return <i key={col} data-ms={`${ms} ms`} style={{ "--c": heatColor(ms), "--hb-kb4-j": col } as React.CSSProperties} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="hb-kb4-legend">
              <span>
                p50 <b>58 ms</b> · p99 <b>184 ms</b> · last 36 hours
              </span>
              <span className="hb-kb4-scale">
                fast
                {[30, 60, 90, 130, 200].map((m) => (
                  <i key={m} style={{ "--c": heatColor(m) } as React.CSSProperties} />
                ))}
                slow
              </span>
            </div>
            <div className="hb-kb4-cap">
              <h3>Latency, region by region</h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
