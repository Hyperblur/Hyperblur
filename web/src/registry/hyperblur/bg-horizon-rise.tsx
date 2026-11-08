"use client";

import * as React from "react";

export interface BgHorizonRiseProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  accent?: string;
  background?: string;
  horizon?: number;
  stars?: number;
  loop?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd13 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: var(--hb-vd13-bg); container-type: size; isolation: isolate; }
.hb-vd13 *, .hb-vd13 *::before, .hb-vd13 *::after { box-sizing: border-box; }
.hb-vd13-sky { position: absolute; inset: 0; background: linear-gradient(180deg, var(--hb-vd13-bg) 0%, color-mix(in srgb, var(--hb-vd13-a) 12%, var(--hb-vd13-bg)) calc(var(--hb-vd13-h) - 4%), var(--hb-vd13-bg) 100%); }
.hb-vd13-warm { position: absolute; inset: 0; background: radial-gradient(70% 46% at 50% var(--hb-vd13-h), color-mix(in srgb, var(--hb-vd13-c) 55%, transparent) 0%, color-mix(in srgb, var(--hb-vd13-a) 22%, transparent) 42%, transparent 72%); }
.hb-vd13-star { position: absolute; width: 1.5px; height: 1.5px; border-radius: 50%; background: #fff; }
.hb-vd13-stars { position: absolute; inset: 0; opacity: 0.15; }
.hb-vd13-sun { position: absolute; left: 50%; top: var(--hb-vd13-h); width: 30cqmin; aspect-ratio: 1; border-radius: 50%; translate: -50% -42%; background: radial-gradient(circle at 50% 50%, #fff 0%, var(--hb-vd13-c) 34%, color-mix(in srgb, var(--hb-vd13-c) 40%, transparent) 52%, transparent 70%); filter: blur(2px); }
.hb-vd13-planet { position: absolute; left: 50%; top: var(--hb-vd13-h); width: 290cqw; aspect-ratio: 1; translate: -50% 0; border-radius: 50%; background: radial-gradient(60% 6% at 50% 0%, color-mix(in srgb, var(--hb-vd13-a) 18%, #05070d) 0%, #04050a 100%); }
.hb-vd13-rim { position: absolute; left: 50%; top: var(--hb-vd13-h); width: 290cqw; aspect-ratio: 1; translate: -50% 0; border-radius: 50%; box-shadow: inset 0 1.5px 0 0 color-mix(in srgb, #fff 80%, var(--hb-vd13-c)), inset 0 10px 22px -8px color-mix(in srgb, var(--hb-vd13-c) 75%, transparent), inset 0 40px 70px -30px color-mix(in srgb, var(--hb-vd13-a) 60%, transparent), 0 -6px 26px -4px color-mix(in srgb, var(--hb-vd13-c) 70%, transparent), 0 -30px 90px -10px color-mix(in srgb, var(--hb-vd13-a) 55%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent 30%, #000 47%, #000 53%, transparent 70%); mask-image: linear-gradient(90deg, transparent 30%, #000 47%, #000 53%, transparent 70%); }
.hb-vd13-flare { position: absolute; left: 50%; top: var(--hb-vd13-h); width: 82%; height: 2px; translate: -50% -1px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vd13-c) 70%, transparent) 30%, #fff 50%, color-mix(in srgb, var(--hb-vd13-c) 70%, transparent) 70%, transparent); filter: blur(0.6px); }
.hb-vd13-streak { position: absolute; left: 50%; top: var(--hb-vd13-h); width: 46%; height: 14px; translate: -50% -50%; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vd13-c) 60%, transparent), transparent); filter: blur(4px); }
.hb-vd13-run .hb-vd13-sun { animation: hb-vd13-sun var(--hb-vd13-d) cubic-bezier(0.45, 0, 0.25, 1) var(--hb-vd13-n) var(--hb-vd13-dir) both; }
.hb-vd13-run .hb-vd13-warm, .hb-vd13-run .hb-vd13-flare, .hb-vd13-run .hb-vd13-streak { animation: hb-vd13-glow var(--hb-vd13-d) cubic-bezier(0.45, 0, 0.25, 1) var(--hb-vd13-n) var(--hb-vd13-dir) both; }
.hb-vd13-run .hb-vd13-rim { animation: hb-vd13-rim var(--hb-vd13-d) cubic-bezier(0.45, 0, 0.25, 1) var(--hb-vd13-n) var(--hb-vd13-dir) both; }
.hb-vd13-run .hb-vd13-stars { animation: hb-vd13-stars var(--hb-vd13-d) cubic-bezier(0.45, 0, 0.25, 1) var(--hb-vd13-n) var(--hb-vd13-dir) both; }
.hb-vd13-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd13-sun { from { translate: -50% 10%; } to { translate: -50% -42%; } }
@keyframes hb-vd13-glow { from { opacity: 0.12; } to { opacity: 1; } }
@keyframes hb-vd13-rim { from { opacity: 0.3; } to { opacity: 1; } }
@keyframes hb-vd13-stars { from { opacity: 1; } to { opacity: 0.15; } }
@media (prefers-reduced-motion: reduce) {
  .hb-vd13-run .hb-vd13-sun, .hb-vd13-run .hb-vd13-warm, .hb-vd13-run .hb-vd13-flare, .hb-vd13-run .hb-vd13-streak, .hb-vd13-run .hb-vd13-rim, .hb-vd13-run .hb-vd13-stars { animation: none; }
}
`;

function hash(i: number) {
  let x = Math.imul(i ^ 0x13198a2e, 0x03707344);
  x ^= x >>> 15;
  x = Math.imul(x, 0xa4093822);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

export function BgHorizonRise({
  color = "#ffd3a1",
  accent = "#2f7bff",
  background = "#03040a",
  horizon = 72,
  stars = 60,
  loop = true,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgHorizonRiseProps) {
  const k = 1 / Math.max(0.05, speed);
  const hz = Math.max(30, Math.min(92, horizon));
  const starList = Array.from({ length: Math.max(0, Math.min(200, Math.round(stars))) }, (_, i) => ({
    x: (hash(i * 3 + 1) * 100).toFixed(2),
    y: (hash(i * 3 + 2) * (hz - 8)).toFixed(2),
    o: (0.2 + 0.7 * hash(i * 3 + 3)).toFixed(2),
  }));

  return (
    <div
      className={`hb-vd13 hb-vd13-run ${className}`}
      style={
        {
          "--hb-vd13-bg": background,
          "--hb-vd13-a": accent,
          "--hb-vd13-c": color,
          "--hb-vd13-h": `${hz}%`,
          "--hb-vd13-d": `${((loop ? 11 : 5) * k).toFixed(2)}s`,
          "--hb-vd13-n": loop ? "infinite" : "1",
          "--hb-vd13-dir": loop ? "alternate" : "normal",
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-bg-horizon-rise" precedence="default">{css}</style>
      <div className="hb-vd13-sky" aria-hidden="true" />
      <div className="hb-vd13-stars" aria-hidden="true">
        {starList.map((s, i) => (
          <span key={i} className="hb-vd13-star" style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.o }} />
        ))}
      </div>
      <div className="hb-vd13-warm" aria-hidden="true" />
      <div className="hb-vd13-sun" aria-hidden="true" />
      <div className="hb-vd13-planet" aria-hidden="true" />
      <div className="hb-vd13-rim" aria-hidden="true" />
      <div className="hb-vd13-streak" aria-hidden="true" />
      <div className="hb-vd13-flare" aria-hidden="true" />
      {children ? <div className="hb-vd13-in">{children}</div> : null}
    </div>
  );
}
