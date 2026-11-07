"use client";

import * as React from "react";

export interface HudBootRow {
  label: string;
  value?: string;
}

export interface HudBootScreenProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  rows?: HudBootRow[];
  duration?: number;
  autoStart?: boolean;
  waitLabel?: string;
  readyLabel?: string;
  accent?: string;
  onComplete?: () => void;
}

const defaultRows: HudBootRow[] = [
  { label: "Core" },
  { label: "Shaders", value: "42 / 42" },
  { label: "Audio", value: "48 kHz" },
  { label: "Input" },
];

const css = `
.hb-ua3 {
  --hb-ua3-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255,255,255,.12);
  background:
    radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, var(--hb-ua3-accent) 8%, transparent), transparent 60%),
    #0a0a0a;
  color: #ededed;
  font-family: inherit;
  cursor: default;
}
.hb-ua3[data-done="true"] { cursor: pointer; }
.hb-ua3 *, .hb-ua3 *::before, .hb-ua3 *::after { box-sizing: border-box; }
.hb-ua3-k { position: absolute; width: 9px; height: 9px; border: 0 solid rgba(255,255,255,.6); pointer-events: none; }
.hb-ua3-k-tl { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; }
.hb-ua3-k-tr { right: -1px; top: -1px; border-right-width: 1px; border-top-width: 1px; }
.hb-ua3-k-bl { left: -1px; bottom: -1px; border-left-width: 1px; border-bottom-width: 1px; }
.hb-ua3-k-br { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-ua3-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-ua3-head { display: flex; align-items: center; gap: 12px; min-width: 0; }
.hb-ua3-logo {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  color: var(--hb-ua3-accent);
}
.hb-ua3-logo svg { width: 100%; height: 100%; }
.hb-ua3-titles { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.hb-ua3-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .06em;
  line-height: 1.1;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-ua3-sub { color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-ua3-prog { display: flex; flex-direction: column; gap: 6px; }
.hb-ua3-plabel { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #a1a1a1; min-height: 14px; }
.hb-ua3-pct { color: #ededed; font-variant-numeric: tabular-nums; }
.hb-ua3-replay {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--hb-ua3-accent);
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
}
.hb-ua3-replay:focus-visible { outline: 1px solid var(--hb-ua3-accent); outline-offset: 3px; }
.hb-ua3-track {
  position: relative;
  height: 4px;
  overflow: hidden;
  background: rgba(255,255,255,.08);
}
.hb-ua3-fill {
  position: absolute;
  inset: 0;
  background: var(--hb-ua3-accent);
  box-shadow: 0 0 12px var(--hb-ua3-accent);
  transform-origin: left center;
  transform: scaleX(var(--hb-ua3-p, 0));
}
.hb-ua3-track::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, transparent 0 7px, #0a0a0a 7px 9px);
}
.hb-ua3-rows { display: flex; flex-direction: column; gap: 5px; margin: 0; padding: 0; list-style: none; }
.hb-ua3-row { display: flex; align-items: center; gap: 8px; min-width: 0; color: #a1a1a1; }
.hb-ua3-lead { flex: 1 1 auto; min-width: 12px; height: 1px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.2) 0 1px, transparent 1px 4px); }
.hb-ua3-rl { white-space: nowrap; }
.hb-ua3-val { white-space: nowrap; color: #5f5f5f; animation: hb-ua3-wait 1s steps(2, jump-none) infinite; }
.hb-ua3-row[data-ready="true"] .hb-ua3-rl { color: #ededed; }
.hb-ua3-row[data-ready="true"] .hb-ua3-val { color: #ededed; animation: hb-ua3-in .35s ease-out both; }
.hb-ua3-row[data-ready="true"] .hb-ua3-val::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 6px;
  vertical-align: 1px;
  background: var(--hb-ua3-accent);
}
@keyframes hb-ua3-wait { 50% { opacity: .35; } }
@keyframes hb-ua3-in { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ua3-val, .hb-ua3-row[data-ready="true"] .hb-ua3-val { animation: none; }
}
`;

function Mark() {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M3 8V3h5M22 3h5v5M27 22v5h-5M8 27H3v-5" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
      <path d="M8 9l7 13 7-13" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
      <path d="M11.5 9h7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function HudBootScreen({
  title = "Vector Lab",
  subtitle = "Boot sequence 2.4",
  logo,
  rows = defaultRows,
  duration = 3200,
  autoStart = true,
  waitLabel = "Wait",
  readyLabel = "Ready",
  accent = "#ff4d4d",
  onComplete,
  className,
  style,
  onClick,
  ...rest
}: HudBootScreenProps) {
  const [run, setRun] = React.useState(autoStart ? 1 : 0);
  const [progress, setProgress] = React.useState(0);
  const completeRef = React.useRef(onComplete);

  React.useEffect(() => {
    completeRef.current = onComplete;
  });

  React.useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = Math.max(300, duration);
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const raw = reduced ? 1 : Math.min(1, (t - t0) / total);
      const eased = raw < 1 ? raw - Math.sin(raw * Math.PI * 6) * 0.018 * (1 - raw) : 1;
      setProgress(Math.max(0, Math.min(1, eased)));
      if (raw < 1) raf = requestAnimationFrame(step);
      else completeRef.current?.();
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, duration]);

  const done = run > 0 && progress >= 1;
  const replay = () => {
    setProgress(0);
    setRun((r) => r + 1);
  };
  const n = rows.length;

  return (
    <div
      className={["hb-ua3", className].filter(Boolean).join(" ")}
      data-done={done ? "true" : "false"}
      style={{ ["--hb-ua3-accent" as string]: accent, ...style }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && (done || !run)) replay();
      }}
      {...rest}
    >
      <style href="hb-hud-boot-screen" precedence="default">{css}</style>
      <span className="hb-ua3-k hb-ua3-k-tl" aria-hidden="true" />
      <span className="hb-ua3-k hb-ua3-k-tr" aria-hidden="true" />
      <span className="hb-ua3-k hb-ua3-k-bl" aria-hidden="true" />
      <span className="hb-ua3-k hb-ua3-k-br" aria-hidden="true" />
      <div className="hb-ua3-head">
        <span className="hb-ua3-logo">{logo ?? <Mark />}</span>
        <span className="hb-ua3-titles">
          <span className="hb-ua3-title">{title}</span>
          {subtitle ? <span className="hb-ua3-mono hb-ua3-sub">{subtitle}</span> : null}
        </span>
      </div>
      <div className="hb-ua3-prog">
        <div className="hb-ua3-mono hb-ua3-plabel">
          <span>{done ? "System ready" : run ? "Loading" : "Standby"}</span>
          {done || !run ? (
            <button type="button" className="hb-ua3-replay" onClick={(e) => { e.stopPropagation(); replay(); }}>
              {run ? "Replay" : "Start"}
            </button>
          ) : (
            <span className="hb-ua3-pct">{String(Math.round(progress * 100)).padStart(3, "0")}%</span>
          )}
        </div>
        <div
          className="hb-ua3-track"
          role="progressbar"
          aria-label={`${title} boot progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span className="hb-ua3-fill" style={{ ["--hb-ua3-p" as string]: progress.toFixed(4) }} />
        </div>
      </div>
      <ul className="hb-ua3-rows">
        {rows.map((row, i) => {
          const ready = run > 0 && progress >= ((i + 1) / n) * 0.96;
          return (
            <li key={row.label} className="hb-ua3-mono hb-ua3-row" data-ready={ready ? "true" : "false"}>
              <span className="hb-ua3-rl">{row.label}</span>
              <span className="hb-ua3-lead" aria-hidden="true" />
              <span className="hb-ua3-val">{ready ? row.value ?? readyLabel : waitLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HudBootScreen;
