"use client";

import * as React from "react";

export interface CircuitStep {
  title: string;
  caption: string;
  detail: string;
  log: string[];
}

export interface StepsCircuitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: CircuitStep[];
  defaultStep?: number;
  step?: number;
  onStepChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  accent?: string;
}

const defaultSteps: CircuitStep[] = [
  {
    title: "Connect a source",
    caption: "Postgres, MySQL, S3",
    detail: "Paste a read-only connection string. Relay opens a tunnel, reads the schema and never writes to your database.",
    log: ["relay connect postgres://ro@db.internal:5432/app", "tunnel open · tls 1.3", "found 42 tables · 1.8M rows"],
  },
  {
    title: "Map the fields",
    caption: "Rename, cast, drop",
    detail: "Relay proposes types and joins from the schema. Accept them, or rename and cast columns before anything moves.",
    log: ["orders.total -> numeric(12,2)", "users.email -> lowercase, unique", "3 columns dropped · pii.ssn masked"],
  },
  {
    title: "Validate a sample",
    caption: "10,000 rows, dry run",
    detail: "A dry run on a sample checks every rule and shows the rows that would fail, with the reason next to each one.",
    log: ["sampling 10,000 rows", "9,987 passed · 13 flagged", "flagged: null customer_id (13)"],
  },
  {
    title: "Sync on a schedule",
    caption: "Every 15 minutes",
    detail: "Turn the pipeline on. Incremental syncs pick up only changed rows and alert the channel you choose when one fails.",
    log: ["schedule 0,15,30,45 * * * *", "first sync 1,802,114 rows in 4m 12s", "next run in 15m · alerts #data-ops"],
  },
];

const css = `
.hb-we4 {
  --hb-we4-accent: #34d399;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we4 *, .hb-we4 *::before, .hb-we4 *::after { box-sizing: border-box; }
.hb-we4-inner { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(18px, 4cqi, 40px); }
.hb-we4-head { display: grid; gap: 14px; justify-items: center; text-align: center; margin-bottom: clamp(28px, 4cqi, 48px); }
.hb-we4-eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; height: 28px; padding: 0 12px; border-radius: 999px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: var(--hb-we4-accent); background: color-mix(in srgb, var(--hb-we4-accent) 9%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-we4-accent) 25%, transparent); }
.hb-we4-title { margin: 0; max-width: 20ch; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 48px); font-weight: 600; line-height: 1.05; letter-spacing: -.035em; text-wrap: balance; }
.hb-we4-sub { margin: 0; max-width: 54ch; color: #a1a1a1; font-size: 15px; line-height: 1.6; }
.hb-we4-board {
  position: relative; border-radius: 24px; overflow: hidden;
  background:
    radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--hb-we4-accent) 8%, transparent), transparent 70%),
    radial-gradient(circle, rgba(255,255,255,.07) 1px, transparent 1.2px) 0 0 / 22px 22px,
    #0d0f0e;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.07), inset 0 1px 0 rgba(255,255,255,.05);
}
.hb-we4-map { position: relative; width: 100%; }
.hb-we4-map[data-o="h"] { aspect-ratio: 1000 / 340; }
.hb-we4-map[data-o="v"] { aspect-ratio: 360 / 760; display: none; }
.hb-we4-map svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.hb-we4-trace { fill: none; stroke: rgba(255,255,255,.1); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.hb-we4-via { fill: #0d0f0e; stroke: rgba(255,255,255,.16); stroke-width: 2; }
.hb-we4-fill { fill: none; stroke: var(--hb-we4-accent); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 100 100; stroke-dashoffset: var(--hb-we4-off, 100); transition: stroke-dashoffset 1.1s cubic-bezier(.65,0,.25,1); filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-we4-accent) 70%, transparent)); }
.hb-we4-packet { fill: none; stroke: #fff; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 1.5 98.5; animation: hb-we4-run 3.2s cubic-bezier(.45,0,.55,1) infinite; opacity: .85; }
.hb-we4-chip {
  position: absolute; left: var(--hb-we4-x); top: var(--hb-we4-y); transform: translate(-50%, -50%);
  display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 10px 12px; width: clamp(150px, 19cqi, 210px);
  padding: 12px 14px; border: 0; border-radius: 14px; cursor: pointer; text-align: left; color: inherit; font: inherit;
  background: linear-gradient(180deg, #1a1c1b, #121413); box-shadow: inset 0 0 0 1px rgba(255,255,255,.09), inset 0 1px 0 rgba(255,255,255,.07), 0 18px 30px -16px rgba(0,0,0,.9);
  transition: box-shadow .4s ease, transform .4s cubic-bezier(.2,.8,.2,1);
}
.hb-we4-chip::before, .hb-we4-chip::after { content: ""; position: absolute; left: 18px; right: 18px; height: 4px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.22) 0 3px, transparent 3px 8px); }
.hb-we4-chip::before { top: -4px; }
.hb-we4-chip::after { bottom: -4px; }
.hb-we4-chip:hover { transform: translate(-50%, -50%) translateY(-2px); }
.hb-we4-chip[data-s="active"] { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-we4-accent) 70%, transparent), inset 0 1px 0 rgba(255,255,255,.08), 0 0 0 4px color-mix(in srgb, var(--hb-we4-accent) 12%, transparent), 0 20px 40px -16px color-mix(in srgb, var(--hb-we4-accent) 40%, #000); }
.hb-we4-chip:focus-visible { outline: 2px solid var(--hb-we4-accent); outline-offset: 4px; }
.hb-we4-num { grid-row: span 2; display: grid; place-items: center; width: 34px; height: 34px; border-radius: 9px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #8f8f8f; background: #0b0c0c; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); transition: color .3s ease, background .3s ease; }
.hb-we4-chip[data-s="done"] .hb-we4-num { color: var(--hb-we4-accent); }
.hb-we4-chip[data-s="active"] .hb-we4-num { color: #062014; background: var(--hb-we4-accent); box-shadow: none; }
.hb-we4-ct { min-width: 0; font-size: 13.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-we4-cc { display: flex; align-items: center; gap: 6px; min-width: 0; color: #8f8f8f; font-size: 12px; white-space: nowrap; }
.hb-we4-led { flex: none; width: 6px; height: 6px; border-radius: 50%; background: #3a3a3a; }
.hb-we4-chip[data-s="done"] .hb-we4-led { background: var(--hb-we4-accent); }
.hb-we4-chip[data-s="active"] .hb-we4-led { background: var(--hb-we4-accent); animation: hb-we4-blink 1.2s ease-in-out infinite; }
.hb-we4-panel { display: grid; gap: 16px; margin: 0 clamp(12px, 2.4cqi, 24px) clamp(12px, 2.4cqi, 24px); padding: clamp(16px, 2.4cqi, 24px); border-radius: 18px; background: rgba(10,10,10,.75); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.hb-we4-pt { display: flex; align-items: baseline; gap: 12px; margin: 0 0 6px; font-size: 17px; font-weight: 600; }
.hb-we4-pt span { color: var(--hb-we4-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; font-weight: 500; }
.hb-we4-pd { margin: 0; color: #a1a1a1; font-size: 14px; line-height: 1.6; max-width: 52ch; }
.hb-we4-term { margin: 0; padding: 14px 16px; border-radius: 12px; background: #070807; box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; line-height: 1.8; color: #cfcfcf; overflow: hidden; min-width: 0; }
.hb-we4-line { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0; animation: hb-we4-type .5s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(var(--hb-we4-k) * 380ms + 250ms); }
.hb-we4-line::before { content: "$ "; color: var(--hb-we4-accent); }
.hb-we4-line + .hb-we4-line::before { content: "› "; color: #6b6b6b; }
.hb-we4-panel > * { animation: hb-we4-in .5s cubic-bezier(.2,.8,.2,1) both; }
@keyframes hb-we4-run { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes hb-we4-blink { 50% { opacity: .25; } }
@keyframes hb-we4-type { from { opacity: 0; clip-path: inset(0 100% 0 0); } to { opacity: 1; clip-path: inset(0 0 0 0); } }
@keyframes hb-we4-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@container (min-width: 820px) {
  .hb-we4-panel { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); align-items: center; }
}
@container (max-width: 719px) {
  .hb-we4-map[data-o="h"] { display: none; }
  .hb-we4-map[data-o="v"] { display: block; }
  .hb-we4-chip { width: min(62%, 220px); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we4 *, .hb-we4 *::before, .hb-we4 *::after { transition: none !important; animation: none !important; }
  .hb-we4-line { opacity: 1; }
  .hb-we4-packet { display: none; }
}
`;

type Pt = { x: number; y: number };

function route(points: Pt[], vertical: boolean) {
  const r = 18;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (!vertical) {
      const mx = (a.x + b.x) / 2;
      const dir = b.y > a.y ? 1 : -1;
      d += ` L ${mx - r} ${a.y} Q ${mx} ${a.y} ${mx} ${a.y + dir * r} L ${mx} ${b.y - dir * r} Q ${mx} ${b.y} ${mx + r} ${b.y} L ${b.x} ${b.y}`;
    } else {
      const my = (a.y + b.y) / 2;
      const dir = b.x > a.x ? 1 : -1;
      d += ` L ${a.x} ${my - r} Q ${a.x} ${my} ${a.x + dir * r} ${my} L ${b.x - dir * r} ${my} Q ${b.x} ${my} ${b.x} ${my + r} L ${b.x} ${b.y}`;
    }
  }
  return d;
}

function layout(n: number, vertical: boolean): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const alt = i % 2 === 0;
    return vertical ? { x: alt ? 120 : 240, y: Math.round(t * 760) } : { x: Math.round(t * 1000), y: alt ? 105 : 235 };
  });
}

export function StepsCircuit({
  eyebrow = "How Relay works",
  title = "From a connection string to a live pipeline in four moves",
  subtitle = "Every step is wired to the next. Click any stage to jump there, or let the signal run on its own.",
  steps = defaultSteps,
  defaultStep = 0,
  step,
  onStepChange,
  autoPlay = true,
  interval = 3400,
  accent = "#34d399",
  className,
  style,
  ...rest
}: StepsCircuitProps) {
  const [inner, setInner] = React.useState(defaultStep);
  const active = Math.max(0, Math.min(steps.length - 1, step ?? inner));
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const uid = React.useId().replace(/:/g, "");

  const go = React.useCallback(
    (i: number) => {
      if (step === undefined) setInner(i);
      onStepChange?.(i);
    },
    [step, onStepChange],
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    const t = window.setTimeout(on, 0);
    mq.addEventListener("change", on);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", on);
    };
  }, []);

  const playing = autoPlay && !paused && !reduced && steps.length > 1;
  React.useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go((active + 1) % steps.length), interval);
    return () => window.clearTimeout(t);
  }, [playing, active, interval, steps.length, go]);

  const n = steps.length;
  const off = n > 1 ? 100 - (active / (n - 1)) * 100 : 0;
  const info = steps[active];

  const map = (vertical: boolean) => {
    const pts = layout(n, vertical);
    const d = route(pts, vertical);
    const w = vertical ? 360 : 1000;
    const h = vertical ? 760 : 340;
    return (
      <div className="hb-we4-map" data-o={vertical ? "v" : "h"}>
        <svg viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}${vertical ? "v" : "h"}`} x1="0" x2={vertical ? "0" : "1"} y1="0" y2={vertical ? "1" : "0"}>
              <stop offset="0" stopColor="rgba(255,255,255,.04)" />
              <stop offset=".5" stopColor="rgba(255,255,255,.12)" />
              <stop offset="1" stopColor="rgba(255,255,255,.04)" />
            </linearGradient>
          </defs>
          {[0.2, 0.8].map((k) =>
            vertical ? (
              <path key={k} d={`M ${k * w} 0 V ${h}`} stroke={`url(#${uid}v)`} strokeWidth="1" strokeDasharray="2 8" fill="none" />
            ) : (
              <path key={k} d={`M 0 ${k * h} H ${w}`} stroke={`url(#${uid}h)`} strokeWidth="1" strokeDasharray="2 8" fill="none" />
            ),
          )}
          <path className="hb-we4-trace" d={d} />
          <path className="hb-we4-fill" d={d} pathLength={100} style={{ "--hb-we4-off": off.toFixed(2) } as React.CSSProperties} />
          {playing ? <path className="hb-we4-packet" d={d} pathLength={100} /> : null}
          {pts.slice(0, -1).map((p, i) => {
            const q = pts[i + 1];
            const c = vertical ? { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 } : { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
            return <circle key={i} className="hb-we4-via" cx={c.x} cy={c.y} r="5" />;
          })}
        </svg>
        {steps.map((s, i) => {
          const p = pts[i];
          const state = i < active ? "done" : i === active ? "active" : "next";
          return (
            <button
              key={s.title}
              type="button"
              className="hb-we4-chip"
              data-s={state}
              aria-current={i === active ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.title}`}
              style={{ "--hb-we4-x": `${((p.x / w) * 100).toFixed(2)}%`, "--hb-we4-y": `${((p.y / h) * 100).toFixed(2)}%` } as React.CSSProperties}
              onClick={() => go(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  go(Math.min(n - 1, i + 1));
                  const next = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(".hb-we4-chip")[Math.min(n - 1, i + 1)];
                  next?.focus();
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  go(Math.max(0, i - 1));
                  const prev = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(".hb-we4-chip")[Math.max(0, i - 1)];
                  prev?.focus();
                }
              }}
            >
              <span className="hb-we4-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="hb-we4-ct">{s.title}</span>
              <span className="hb-we4-cc"><span className="hb-we4-led" />{s.caption}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section
      className={["hb-we4", className].filter(Boolean).join(" ")}
      style={{ "--hb-we4-accent": accent, ...style } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      {...rest}
    >
      <style href="hb-steps-circuit" precedence="default">{css}</style>
      <div className="hb-we4-inner">
        <header className="hb-we4-head">
          {eyebrow ? <p className="hb-we4-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-we4-title">{title}</h2>
          {subtitle ? <p className="hb-we4-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-we4-board">
          {map(false)}
          {map(true)}
          <div className="hb-we4-panel" key={active} aria-live="polite">
            <div>
              <h3 className="hb-we4-pt"><span>{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>{info.title}</h3>
              <p className="hb-we4-pd">{info.detail}</p>
            </div>
            <pre className="hb-we4-term">
              {info.log.map((l, k) => (
                <span key={k} className="hb-we4-line" style={{ "--hb-we4-k": k } as React.CSSProperties}>{l}</span>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
