"use client";

import * as React from "react";

export interface LoaderDeviceScanProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  devices?: number;
  color?: string;
  accent?: string;
  speed?: number;
  showCount?: boolean;
  seed?: number;
  label?: string;
}

function hash(n: number) {
  let x = (n * 2246822519 + 374761393) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 0x85ebca77) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae3d) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

const OX = 50;
const OY = 54;
const R = 46;

function pt(r: number, phi: number): [number, number] {
  const a = (phi * Math.PI) / 180;
  return [OX - Math.cos(a) * r, OY - Math.sin(a) * r];
}

function wedge(a1: number, a2: number) {
  const lo = Math.max(0, Math.min(a1, a2));
  const hi = Math.min(180, Math.max(a1, a2));
  const [x1, y1] = pt(R, lo);
  const [x2, y2] = pt(R, hi);
  return `M${OX} ${OY}L${x1.toFixed(2)} ${y1.toFixed(2)}A${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}Z`;
}

const css = `
.hb-vk10 {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk10 *, .hb-vk10 *::before, .hb-vk10 *::after { box-sizing: border-box; }
.hb-vk10-svg { display: block; width: var(--hb-vk10-s); height: calc(var(--hb-vk10-s) * 0.58); overflow: visible; flex: none; }
.hb-vk10-grid { fill: none; stroke: #232323; stroke-width: 0.5; }
.hb-vk10-base { stroke: #2e2e2e; stroke-width: 0.6; }
.hb-vk10-ping {
  fill: none;
  stroke: var(--hb-vk10-a);
  stroke-width: 0.6;
  transform-origin: 50px 54px;
  animation: hb-vk10-ping 2.6s cubic-bezier(0.2, 0.6, 0.35, 1) infinite;
}
.hb-vk10-beam { stroke: var(--hb-vk10-a); stroke-width: 0.7; stroke-linecap: round; filter: drop-shadow(0 0 1.5px var(--hb-vk10-a)); }
.hb-vk10-blip { fill: var(--hb-vk10-a); }
.hb-vk10-halo { fill: none; stroke: var(--hb-vk10-a); stroke-width: 0.5; }
.hb-vk10-hub { fill: #0a0a0a; stroke: var(--hb-vk10-a); stroke-width: 0.8; }
.hb-vk10-cnt {
  font-size: 11.5px;
  line-height: 1;
  color: #8f8f8f;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-vk10-cnt b { color: #ededed; font-weight: 600; }
.hb-vk10-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-vk10-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk10-ping {
  0% { transform: scale(0.08); opacity: 0.9; }
  100% { transform: scale(1); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vk10-ping { animation: none; opacity: 0; }
}
`;

type Frame = { phi: number; dir: number; now: number; hits: number[] };

export function LoaderDeviceScan({
  size = 168,
  devices = 5,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 3.2,
  showCount = true,
  seed = 7,
  label,
  className = "",
  style,
  ...rest
}: LoaderDeviceScanProps) {
  const gid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const n = Math.max(0, Math.min(12, Math.round(devices)));
  const blips = React.useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        phi: 14 + hash(seed * 31 + i * 7) * 152,
        r: 14 + hash(seed * 17 + i * 13 + 5) * 28,
      })),
    [n, seed],
  );
  const [frame, setFrame] = React.useState<Frame>({ phi: 90, dir: 1, now: 0, hits: [] });
  const [still, setStill] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(raf);
    }
    const period = Math.max(1, speed) * 1000;
    let t0 = 0;
    let prev = 0;
    let hits: number[] = blips.map(() => -1e9);
    function tick(now: number) {
      if (!t0) t0 = now;
      const t = (now - t0) / period;
      const phi = 90 - 90 * Math.cos(t * Math.PI * 2);
      if (t > 0) {
        const lo = Math.min(prev, phi);
        const hi = Math.max(prev, phi);
        let changed = false;
        const nextHits = hits.map((h, i) => {
          if (blips[i].phi >= lo && blips[i].phi <= hi) {
            changed = true;
            return now;
          }
          return h;
        });
        if (changed) hits = nextHits;
      }
      const dir = phi >= prev ? 1 : -1;
      prev = phi;
      setFrame({ phi, dir, now, hits });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [blips, speed]);

  const found = still ? n : frame.hits.filter((h) => h > 0).length;
  const trail = 34;
  const [bx, by] = pt(R, frame.phi);
  const vars = {
    "--hb-vk10-s": `${size}px`,
    "--hb-vk10-c": color,
    "--hb-vk10-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-device-scan" precedence="default">{css}</style>
      <span role="status" className={`hb-vk10 ${className}`} style={vars} {...rest}>
        <svg className="hb-vk10-svg" viewBox="0 0 100 58" aria-hidden="true">
          <defs>
            <radialGradient id={`${gid}g`} cx={OX} cy={OY} r={R} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={color} stopOpacity="0.16" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={wedge(0, 180)} fill={`url(#${gid}g)`} />
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <path key={f} className="hb-vk10-grid" d={`M${OX - R * f} ${OY}A${R * f} ${R * f} 0 0 1 ${OX + R * f} ${OY}`} />
          ))}
          {[30, 60, 90, 120, 150].map((a) => {
            const [x, y] = pt(R, a);
            return <line key={a} className="hb-vk10-grid" x1={OX} y1={OY} x2={x.toFixed(2)} y2={y.toFixed(2)} />;
          })}
          <line className="hb-vk10-base" x1={OX - R - 2} y1={OY} x2={OX + R + 2} y2={OY} />
          {!still
            ? [0, 1].map((k) => (
                <path
                  key={k}
                  className="hb-vk10-ping"
                  style={{ animationDelay: `${k * 1.3}s` }}
                  d={`M${OX - R} ${OY}A${R} ${R} 0 0 1 ${OX + R} ${OY}`}
                />
              ))
            : null}
          {!still
            ? Array.from({ length: 6 }, (_, k) => {
                const a2 = frame.phi - frame.dir * (k * trail) / 6;
                const a1 = frame.phi - frame.dir * ((k + 1) * trail) / 6;
                return <path key={k} d={wedge(a1, a2)} fill={accent} opacity={(0.2 * (1 - k / 6)).toFixed(3)} />;
              })
            : null}
          {!still ? <line className="hb-vk10-beam" x1={OX} y1={OY} x2={bx.toFixed(2)} y2={by.toFixed(2)} /> : null}
          {blips.map((b, i) => {
            const [x, y] = pt(b.r, b.phi);
            const age = still ? 0 : frame.now - (frame.hits[i] ?? -1e9);
            const glow = still ? 0.85 : Math.max(0, Math.exp(-age / 1100));
            const seen = still || (frame.hits[i] ?? -1) > 0;
            return (
              <g key={i}>
                <circle
                  className="hb-vk10-halo"
                  cx={x.toFixed(2)}
                  cy={y.toFixed(2)}
                  r={(1.6 + (1 - glow) * 3.2).toFixed(2)}
                  opacity={(glow * 0.8).toFixed(3)}
                />
                <circle
                  className="hb-vk10-blip"
                  cx={x.toFixed(2)}
                  cy={y.toFixed(2)}
                  r="1.25"
                  opacity={(seen ? 0.28 + glow * 0.72 : 0).toFixed(3)}
                />
              </g>
            );
          })}
          <circle className="hb-vk10-hub" cx={OX} cy={OY} r="2.2" />
        </svg>
        {showCount ? (
          <span className="hb-vk10-cnt" aria-hidden="true">
            <b>{found}</b> {found === 1 ? "device" : "devices"} found
          </span>
        ) : null}
        <span className={label ? "hb-vk10-l" : "hb-vk10-sr"}>{label ?? "Scanning"}</span>
      </span>
    </>
  );
}
