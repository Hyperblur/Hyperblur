"use client";

import * as React from "react";

export interface MicroProgressPillProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value?: number;
  label?: string;
  doneLabel?: string;
  pausedLabel?: string;
  speed?: number;
  autoPlay?: boolean;
  paused?: boolean;
  defaultPaused?: boolean;
  accent?: string;
  onPausedChange?: (paused: boolean) => void;
  onComplete?: () => void;
}

const css = `
.hb-wf12 {
  --hb-wf12-c: #2f7bff;
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 300px;
  height: 46px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  transition: max-width 0.55s cubic-bezier(0.3, 1.25, 0.45, 1);
}
.hb-wf12 *, .hb-wf12 *::before, .hb-wf12 *::after { box-sizing: border-box; }
.hb-wf12[data-done="true"] { max-width: 150px; }
.hb-wf12-b {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 14px 0 6px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #101010;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 24px -14px rgba(0,0,0,0.9);
  transition: transform 0.3s cubic-bezier(0.3, 1.7, 0.45, 1), border-color 0.3s ease, background 0.4s ease;
  -webkit-tap-highlight-color: transparent;
}
.hb-wf12-b:active { transform: scale(0.97, 0.92); transition-duration: 0.08s; }
.hb-wf12-b:focus-visible { outline: 2px solid var(--hb-wf12-c); outline-offset: 3px; }
.hb-wf12[data-done="true"] .hb-wf12-b { border-color: color-mix(in srgb, #3ddc84 50%, #262626); background: color-mix(in srgb, #3ddc84 12%, #101010); cursor: default; }
.hb-wf12-fl {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wf12-c) 18%, transparent), color-mix(in srgb, var(--hb-wf12-c) 42%, transparent));
  transition: background 0.4s ease, opacity 0.4s ease;
  pointer-events: none;
}
.hb-wf12-fl::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(115deg, rgba(255,255,255,0.07) 0 8px, transparent 8px 16px);
  background-size: 37.5px 100%;
  animation: hb-wf12-str 0.9s linear infinite;
}
@keyframes hb-wf12-str { to { background-position: 37.5px 0; } }
.hb-wf12-wv {
  position: absolute;
  top: 0;
  right: -7px;
  width: 8px;
  height: 200%;
  color: color-mix(in srgb, var(--hb-wf12-c) 42%, transparent);
  animation: hb-wf12-wv 1.4s linear infinite;
}
@keyframes hb-wf12-wv { from { transform: translateY(0); } to { transform: translateY(-50%); } }
.hb-wf12[data-paused="true"] .hb-wf12-fl { background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.12)); }
.hb-wf12[data-paused="true"] .hb-wf12-wv { color: rgba(255,255,255,0.12); }
.hb-wf12[data-paused="true"] .hb-wf12-fl::before, .hb-wf12[data-paused="true"] .hb-wf12-wv { animation-play-state: paused; }
.hb-wf12[data-done="true"] .hb-wf12-fl { opacity: 0; }
.hb-wf12-ic {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #1c1c1c;
  border: 1px solid #2c2c2c;
  color: #e8e8e8;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
.hb-wf12[data-done="true"] .hb-wf12-ic { background: #3ddc84; border-color: #3ddc84; color: #04210f; animation: hb-wf12-pop 0.5s cubic-bezier(0.2, 1.8, 0.4, 1); }
@keyframes hb-wf12-pop { 0% { transform: scale(0.6); } 60% { transform: scale(1.15); } 100% { transform: none; } }
.hb-wf12-ic svg { position: absolute; width: 14px; height: 14px; transition: opacity 0.18s ease, transform 0.28s cubic-bezier(0.3, 1.6, 0.5, 1); }
.hb-wf12-ic [data-k] { opacity: 0; transform: scale(0.4); }
.hb-wf12-ic [data-k="on"] { opacity: 1; transform: none; }
.hb-wf12-ck path { stroke-dasharray: 16; stroke-dashoffset: 16; }
.hb-wf12[data-done="true"] .hb-wf12-ck path { animation: hb-wf12-draw 0.35s ease-out 0.12s forwards; }
@keyframes hb-wf12-draw { to { stroke-dashoffset: 0; } }
.hb-wf12-tx { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; line-height: 1; }
.hb-wf12-t1 { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wf12-t2 { font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; color: #8a8a8a; white-space: nowrap; }
.hb-wf12[data-done="true"] .hb-wf12-t2 { display: none; }
.hb-wf12-pc {
  position: relative;
  flex: none;
  display: inline-flex;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  height: 16px;
  overflow: hidden;
  line-height: 16px;
}
.hb-wf12[data-done="true"] .hb-wf12-pc { display: none; }
.hb-wf12-dg { display: block; height: 16px; overflow: hidden; width: 1ch; }
.hb-wf12-col { display: flex; flex-direction: column; transition: transform 0.35s cubic-bezier(0.3, 1.3, 0.45, 1); }
.hb-wf12-col span { display: block; height: 16px; }
.hb-wf12-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wf12, .hb-wf12-b, .hb-wf12-fl, .hb-wf12-ic, .hb-wf12-ic svg, .hb-wf12-col { transition: none; }
  .hb-wf12-fl::before, .hb-wf12-wv, .hb-wf12[data-done="true"] .hb-wf12-ic { animation: none; }
  .hb-wf12[data-done="true"] .hb-wf12-ck path { animation: none; stroke-dashoffset: 0; }
}
`;

const digits = Array.from({ length: 10 }, (_, i) => i);

export function MicroProgressPill({
  value,
  label = "Uploading 3 files",
  doneLabel = "Uploaded",
  pausedLabel = "Paused",
  speed = 9,
  autoPlay = false,
  paused,
  defaultPaused = false,
  accent = "#2f7bff",
  onPausedChange,
  onComplete,
  className = "",
  style,
  ...rest
}: MicroProgressPillProps) {
  const [innerP, setInnerP] = React.useState(0);
  const [innerPaused, setInnerPaused] = React.useState(defaultPaused);
  const isPaused = paused ?? innerPaused;
  const p = Math.max(0, Math.min(100, value ?? innerP));
  const done = p >= 100;
  const cb = React.useRef({ onComplete });
  const fired = React.useRef(false);

  React.useEffect(() => {
    cb.current = { onComplete };
  });

  React.useEffect(() => {
    if (value !== undefined || isPaused || done) return;
    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setInnerP((cur) => {
        const slow = cur > 82 ? 0.45 : cur < 12 ? 1.6 : 1;
        return Math.min(100, cur + speed * slow * dt);
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, isPaused, done, speed]);

  React.useEffect(() => {
    if (done && !fired.current) {
      fired.current = true;
      cb.current.onComplete?.();
    }
    if (!done) fired.current = false;
  }, [done]);

  React.useEffect(() => {
    if (!done || !autoPlay || value !== undefined) return;
    const t = window.setTimeout(() => setInnerP(0), 2200);
    return () => window.clearTimeout(t);
  }, [done, autoPlay, value]);

  const toggle = () => {
    if (done) return;
    const next = !isPaused;
    if (paused === undefined) setInnerPaused(next);
    onPausedChange?.(next);
  };

  const pct = Math.floor(p);
  const left = Math.max(0, Math.ceil((100 - p) / speed));
  const chars = String(pct).padStart(2, "0").split("");

  return (
    <div
      className={`hb-wf12 ${className}`}
      data-done={done}
      data-paused={isPaused}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-valuetext={done ? doneLabel : isPaused ? `${pausedLabel}, ${pct}%` : `${pct}%`}
      style={{ ...style, ["--hb-wf12-c" as string]: accent }}
      {...rest}
    >
      <style href="hb-micro-progress-pill" precedence="default">
        {css}
      </style>
      <button
        type="button"
        className="hb-wf12-b"
        aria-label={done ? doneLabel : isPaused ? `Resume: ${label}` : `Pause: ${label}`}
        aria-pressed={done ? undefined : isPaused}
        aria-disabled={done || undefined}
        onClick={toggle}
      >
        <span className="hb-wf12-fl" style={{ width: `${p.toFixed(2)}%` }} aria-hidden="true">
          <svg className="hb-wf12-wv" viewBox="0 0 8 92" preserveAspectRatio="none">
            <path d="M0 0h4c4 5.75 4 5.75 0 11.5s-4 5.75 0 11.5 4 5.75 0 11.5-4 5.75 0 11.5 4 5.75 0 11.5-4 5.75 0 11.5 4 5.75 0 11.5-4 5.75 0 11.5H0z" fill="currentColor" />
          </svg>
        </span>
        <span className="hb-wf12-ic" aria-hidden="true">
          <svg data-k={!done && !isPaused ? "on" : "off"} viewBox="0 0 16 16" fill="currentColor">
            <rect x="4" y="3.5" width="2.6" height="9" rx="1" />
            <rect x="9.4" y="3.5" width="2.6" height="9" rx="1" />
          </svg>
          <svg data-k={!done && isPaused ? "on" : "off"} viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.2 3.6c0-.7.8-1.2 1.4-.8l5.6 3.9c.5.4.5 1.2 0 1.6l-5.6 3.9c-.6.4-1.4 0-1.4-.8z" />
          </svg>
          <svg className="hb-wf12-ck" data-k={done ? "on" : "off"} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </span>
        <span className="hb-wf12-tx">
          <span className="hb-wf12-t1">{done ? doneLabel : label}</span>
          <span className="hb-wf12-t2">{isPaused ? `${pausedLabel} · tap to resume` : `${left}s left · tap to pause`}</span>
        </span>
        <span className="hb-wf12-pc" aria-hidden="true">
          {chars.map((c, i) => (
            <span key={`${chars.length}-${i}`} className="hb-wf12-dg">
              <span className="hb-wf12-col" style={{ transform: `translateY(${-Number(c) * 16}px)` }}>
                {digits.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ))}
          %
        </span>
      </button>
      <span className="hb-wf12-sr" aria-live="polite">
        {done ? doneLabel : ""}
      </span>
    </div>
  );
}
