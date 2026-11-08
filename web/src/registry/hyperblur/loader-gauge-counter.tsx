"use client";

import * as React from "react";

export interface LoaderGaugeCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  size?: number;
  segments?: number;
  color?: string;
  accent?: string;
  detail?: string;
  duration?: number;
  label?: string;
}

const START = 150;
const SWEEP = 240;

function polar(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r];
}

function arc(r: number, a1: number, a2: number) {
  const [x1, y1] = polar(r, a1);
  const [x2, y2] = polar(r, a2);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

const css = `
.hb-vk8 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk8 *, .hb-vk8 *::before, .hb-vk8 *::after { box-sizing: border-box; }
.hb-vk8-g {
  position: relative;
  width: var(--hb-vk8-s);
  height: calc(var(--hb-vk8-s) * 0.84);
  flex: none;
}
.hb-vk8-svg { position: absolute; left: 0; top: 0; width: 100%; height: calc(var(--hb-vk8-s)); display: block; overflow: visible; }
.hb-vk8-seg { fill: none; stroke: #232323; stroke-width: 7; transition: stroke 180ms ease; }
.hb-vk8-seg[data-on="true"] { stroke: var(--hb-vk8-col); }
.hb-vk8-in { fill: none; stroke: #1c1c1c; stroke-width: 0.8; stroke-dasharray: 0.6 2.4; }
.hb-vk8-tip { fill: #fff; filter: drop-shadow(0 0 3px var(--hb-vk8-a)) drop-shadow(0 0 7px var(--hb-vk8-c)); }
.hb-vk8-c {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--hb-vk8-s) * 0.33);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--hb-vk8-s) * 0.03);
}
.hb-vk8-num {
  display: flex;
  align-items: flex-start;
  font-size: calc(var(--hb-vk8-s) * 0.22);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.hb-vk8-col {
  position: relative;
  height: 1em;
  width: 0.62em;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent);
  mask-image: linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent);
}
.hb-vk8-strip {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--hb-vk8-d) * -1em));
  transition: transform 520ms cubic-bezier(0.34, 1.3, 0.64, 1), color 300ms ease;
}
.hb-vk8-strip span { display: block; height: 1em; text-align: center; }
.hb-vk8-col[data-dim="true"] .hb-vk8-strip { color: #343434; }
.hb-vk8-pct { font-size: 0.42em; margin: 0.14em 0 0 0.08em; color: #8f8f8f; font-weight: 500; letter-spacing: 0; }
.hb-vk8-det {
  font-size: calc(var(--hb-vk8-s) * 0.075);
  line-height: 1.2;
  color: var(--hb-vk8-a);
  letter-spacing: 0.02em;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.hb-vk8-scale {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(var(--hb-vk8-s) * 0.02);
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--hb-vk8-s) * 0.17);
  font-size: calc(var(--hb-vk8-s) * 0.06);
  color: #5a5a5a;
  font-variant-numeric: tabular-nums;
}
.hb-vk8-l { margin-top: 0.5em; font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-vk8-seg, .hb-vk8-strip { transition: none; }
}
`;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 2.4);
}

export function LoaderGaugeCounter({
  value,
  size = 150,
  segments = 36,
  color = "#2f7bff",
  accent = "#7fb3ff",
  detail,
  duration = 5200,
  label,
  className = "",
  style,
  ...rest
}: LoaderGaugeCounterProps) {
  const gid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const controlled = typeof value === "number" && Number.isFinite(value);
  const [loop, setLoop] = React.useState(0);

  React.useEffect(() => {
    if (controlled) return;
    let id = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      id = window.setTimeout(() => setLoop(100), 0);
      return () => window.clearTimeout(id);
    }
    const total = Math.max(1500, duration);
    const hold = 1200;
    let t = 0;
    function step() {
      t += 120;
      const local = t % (total + hold);
      setLoop(local >= total ? 100 : Math.floor(easeOut(local / total) * 100));
      id = window.setTimeout(step, 120);
    }
    id = window.setTimeout(step, 120);
    return () => window.clearTimeout(id);
  }, [controlled, duration]);

  const pct = Math.min(100, Math.max(0, controlled ? (value as number) : loop));
  const shown = Math.floor(pct);
  const n = Math.max(8, Math.min(80, Math.round(segments)));
  const slot = SWEEP / n;
  const gap = Math.min(2.2, slot * 0.35);
  const lit = (pct / 100) * n;
  const tipDeg = START + (SWEEP * pct) / 100;
  const [tx, ty] = polar(36.5, tipDeg);
  const digits = [Math.floor(shown / 100) % 10, Math.floor(shown / 10) % 10, shown % 10];
  const vars = {
    "--hb-vk8-s": `${size}px`,
    "--hb-vk8-c": color,
    "--hb-vk8-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-gauge-counter" precedence="default">{css}</style>
      <div className={`hb-vk8 ${className}`} style={vars} {...rest}>
        <div
          className="hb-vk8-g"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shown}
          aria-valuetext={detail ? `${shown}%, ${detail}` : `${shown}%`}
          aria-label={label ?? "Progress"}
        >
          <svg className="hb-vk8-svg" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <filter id={`${gid}b`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
            </defs>
            <path className="hb-vk8-in" d={arc(30, START, START + SWEEP)} />
            {pct > 0 ? (
              <path
                d={arc(40, START, START + Math.max(0.5, (SWEEP * pct) / 100))}
                fill="none"
                stroke={color}
                strokeWidth="7"
                opacity="0.35"
                filter={`url(#${gid}b)`}
              />
            ) : null}
            {Array.from({ length: n }, (_, i) => {
              const a1 = START + i * slot + gap / 2;
              const a2 = START + (i + 1) * slot - gap / 2;
              const mix = Math.round((i / Math.max(1, n - 1)) * 100);
              return (
                <path
                  key={i}
                  className="hb-vk8-seg"
                  data-on={i < lit}
                  d={arc(40, a1, a2)}
                  style={{ "--hb-vk8-col": `color-mix(in srgb, var(--hb-vk8-a) ${mix}%, var(--hb-vk8-c))` } as React.CSSProperties}
                />
              );
            })}
            <circle className="hb-vk8-tip" cx={tx.toFixed(2)} cy={ty.toFixed(2)} r="1.6" />
          </svg>
          <div className="hb-vk8-c" aria-hidden="true">
            <div className="hb-vk8-num">
              {digits.map((d, i) => (
                <span
                  key={i}
                  className="hb-vk8-col"
                  data-dim={(i === 0 && shown < 100) || (i === 1 && shown < 10)}
                  style={{ "--hb-vk8-d": d } as React.CSSProperties}
                >
                  <span className="hb-vk8-strip">
                    {Array.from({ length: 10 }, (_, k) => (
                      <span key={k}>{k}</span>
                    ))}
                  </span>
                </span>
              ))}
              <span className="hb-vk8-pct">%</span>
            </div>
            {detail ? <span className="hb-vk8-det">{detail}</span> : null}
          </div>
          <div className="hb-vk8-scale" aria-hidden="true">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        {label ? <span className="hb-vk8-l">{label}</span> : null}
      </div>
    </>
  );
}
