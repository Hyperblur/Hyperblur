"use client";

import * as React from "react";

export interface LoaderTickRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: number;
  ticks?: number;
  color?: string;
  accent?: string;
  phases?: string[];
  duration?: number;
  label?: string;
}

const css = `
.hb-vk5 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk5 *, .hb-vk5 *::before, .hb-vk5 *::after { box-sizing: border-box; }
.hb-vk5-g {
  position: relative;
  width: var(--hb-vk5-s);
  height: var(--hb-vk5-s);
  flex: none;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 38%, #171717 0 46%, #0d0d0d 47% 100%);
  box-shadow: inset 0 0 0 1px #1f1f1f, 0 10px 30px rgba(0,0,0,0.45);
}
.hb-vk5-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; }
.hb-vk5-t {
  stroke: #2a2a2a;
  stroke-width: 1.6;
  stroke-linecap: round;
  transition: stroke 220ms ease, stroke-width 220ms ease;
}
.hb-vk5-t[data-on="true"] { stroke: var(--hb-vk5-c); }
.hb-vk5-t[data-head="true"] {
  stroke: var(--hb-vk5-a);
  stroke-width: 2.4;
  filter: drop-shadow(0 0 2.5px var(--hb-vk5-a));
}
.hb-vk5-m { fill: #3a3a3a; transition: fill 300ms ease; }
.hb-vk5-m[data-on="true"] { fill: var(--hb-vk5-a); }
.hb-vk5-c {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25em;
  text-align: center;
  pointer-events: none;
}
.hb-vk5-n {
  font-size: calc(var(--hb-vk5-s) * 0.2);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.hb-vk5-n small { font-size: 0.5em; color: #8f8f8f; font-weight: 500; margin-left: 0.06em; }
.hb-vk5-ph {
  font-size: calc(var(--hb-vk5-s) * 0.085);
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hb-vk5-a);
  white-space: nowrap;
  animation: hb-vk5-in 380ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hb-vk5-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-vk5-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk5-in { from { opacity: 0; transform: translateY(3px); } }
@media (prefers-reduced-motion: reduce) {
  .hb-vk5-t, .hb-vk5-m { transition: none; }
  .hb-vk5-ph { animation: none; }
}
`;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function LoaderTickRing({
  value,
  size = 128,
  ticks = 60,
  color = "#2f7bff",
  accent = "#7fb3ff",
  phases = ["Install", "Build", "Optimize", "Upload"],
  duration = 5600,
  label,
  className = "",
  style,
  ...rest
}: LoaderTickRingProps) {
  const controlled = typeof value === "number" && Number.isFinite(value);
  const [loop, setLoop] = React.useState(0);

  React.useEffect(() => {
    if (controlled) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setLoop(100));
      return () => cancelAnimationFrame(raf);
    }
    let t0 = 0;
    const total = Math.max(1200, duration);
    const hold = 1100;
    function tick(now: number) {
      if (!t0) t0 = now;
      const t = (now - t0) % (total + hold);
      setLoop(t >= total ? 100 : easeInOut(t / total) * 100);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controlled, duration]);

  const n = Math.max(12, Math.min(120, Math.round(ticks)));
  const pct = Math.min(100, Math.max(0, controlled ? (value as number) : loop));
  const lit = (pct / 100) * n;
  const head = pct >= 100 ? -1 : Math.floor(lit);
  const list = phases.length ? phases : ["Working"];
  const phase = pct >= 100 ? "Done" : list[Math.min(list.length - 1, Math.floor((pct / 100) * list.length))];
  const vars = {
    "--hb-vk5-s": `${size}px`,
    "--hb-vk5-c": color,
    "--hb-vk5-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-tick-ring" precedence="default">{css}</style>
      <div className={`hb-vk5 ${className}`} style={vars} {...rest}>
        <div
          className="hb-vk5-g"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={`${Math.round(pct)}%, ${phase}`}
          aria-label={label ?? "Progress"}
        >
          <svg className="hb-vk5-svg" viewBox="0 0 100 100" aria-hidden="true">
            {Array.from({ length: n }, (_, i) => {
              const a = (i / n) * Math.PI * 2 - Math.PI / 2;
              const cos = Math.cos(a);
              const sin = Math.sin(a);
              const isHead = i === head;
              const r1 = isHead ? 36.5 : 39;
              const r2 = 45;
              return (
                <line
                  key={i}
                  className="hb-vk5-t"
                  data-on={i < lit}
                  data-head={isHead}
                  x1={(50 + cos * r1).toFixed(2)}
                  y1={(50 + sin * r1).toFixed(2)}
                  x2={(50 + cos * r2).toFixed(2)}
                  y2={(50 + sin * r2).toFixed(2)}
                />
              );
            })}
            {list.map((p, i) => {
              const a = (i / list.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <circle
                  key={p + i}
                  className="hb-vk5-m"
                  data-on={pct >= (i / list.length) * 100}
                  cx={(50 + Math.cos(a) * 49).toFixed(2)}
                  cy={(50 + Math.sin(a) * 49).toFixed(2)}
                  r="1.3"
                />
              );
            })}
          </svg>
          <span className="hb-vk5-c" aria-hidden="true">
            <span className="hb-vk5-n">
              {Math.floor(pct)}
              <small>%</small>
            </span>
            <span className="hb-vk5-ph" key={phase}>{phase}</span>
          </span>
        </div>
        {label ? <span className="hb-vk5-l">{label}</span> : null}
      </div>
    </>
  );
}
