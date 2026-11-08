"use client";

import * as React from "react";

export interface BgGridBeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  cell?: number;
  beams?: number;
  color?: string;
  accent?: string;
  background?: string;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd7 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: var(--hb-vd7-bg); container-type: size; }
.hb-vd7 *, .hb-vd7 *::before, .hb-vd7 *::after { box-sizing: border-box; }
.hb-vd7-stage { position: absolute; inset: 0; -webkit-mask-image: radial-gradient(85% 75% at 50% 0%, #000 30%, rgba(0,0,0,0.35) 62%, transparent 92%); mask-image: radial-gradient(85% 75% at 50% 0%, #000 30%, rgba(0,0,0,0.35) 62%, transparent 92%); }
.hb-vd7-grid { position: absolute; inset: 0; background-image: linear-gradient(to right, var(--hb-vd7-line) 1px, transparent 1px), linear-gradient(to bottom, var(--hb-vd7-line) 1px, transparent 1px); background-size: var(--hb-vd7-cell) var(--hb-vd7-cell); background-position: 0 0; }
.hb-vd7-cross { position: absolute; inset: 0; background-image: radial-gradient(circle at 0 0, color-mix(in srgb, var(--hb-vd7-a) 55%, transparent) 0 1.2px, transparent 1.8px); background-size: var(--hb-vd7-cell) var(--hb-vd7-cell); background-position: 0.5px 0.5px; opacity: 0.45; }
.hb-vd7-v, .hb-vd7-h { position: absolute; overflow: visible; }
.hb-vd7-v { top: 0; bottom: 0; width: 1px; left: var(--p); }
.hb-vd7-h { left: 0; right: 0; height: 1px; top: var(--p); }
.hb-vd7-head { position: absolute; border-radius: 2px; opacity: 0; }
.hb-vd7-v .hb-vd7-head { left: -1px; width: 3px; height: var(--len); background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-vd7-a) 70%, transparent) 72%, #fff); box-shadow: 0 0 10px var(--hb-vd7-a), 0 0 24px color-mix(in srgb, var(--hb-vd7-a) 60%, transparent); animation: hb-vd7-down calc(var(--d) * var(--hb-vd7-k)) cubic-bezier(0.6, 0.05, 0.3, 1) infinite; animation-delay: var(--dl); }
.hb-vd7-h .hb-vd7-head { top: -1px; height: 3px; width: var(--len); background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--hb-vd7-a) 70%, transparent) 72%, #fff); box-shadow: 0 0 10px var(--hb-vd7-a), 0 0 24px color-mix(in srgb, var(--hb-vd7-a) 60%, transparent); animation: hb-vd7-right calc(var(--d) * var(--hb-vd7-k)) cubic-bezier(0.6, 0.05, 0.3, 1) infinite; animation-delay: var(--dl); }
.hb-vd7-spark { position: absolute; left: var(--x); top: var(--y); width: 5px; height: 5px; margin: -2.5px 0 0 -2.5px; border-radius: 1px; background: #fff; box-shadow: 0 0 8px var(--hb-vd7-a), 0 0 18px var(--hb-vd7-a); opacity: 0; animation: hb-vd7-spark calc(var(--d) * var(--hb-vd7-k)) ease-out infinite; animation-delay: var(--dl); }
.hb-vd7-glow { position: absolute; left: 50%; top: -30%; width: 90%; height: 70%; translate: -50% 0; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-vd7-a) 38%, transparent), transparent); filter: blur(10px); }
.hb-vd7-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd7-down {
  0% { transform: translateY(calc(var(--len) * -1)); opacity: 0; }
  6% { opacity: 1; }
  62% { transform: translateY(100cqh); opacity: 1; }
  63%, 100% { transform: translateY(100cqh); opacity: 0; }
}
@keyframes hb-vd7-right {
  0% { transform: translateX(calc(var(--len) * -1)); opacity: 0; }
  6% { opacity: 1; }
  62% { transform: translateX(100cqw); opacity: 1; }
  63%, 100% { transform: translateX(100cqw); opacity: 0; }
}
@keyframes hb-vd7-spark {
  0%, 100% { opacity: 0; transform: scale(0.4) rotate(45deg); }
  8% { opacity: 1; transform: scale(1.3) rotate(45deg); }
  30% { opacity: 0; transform: scale(0.6) rotate(45deg); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vd7-head, .hb-vd7-spark { animation: none; }
  .hb-vd7-v .hb-vd7-head { opacity: 0.8; transform: translateY(var(--rest)); }
  .hb-vd7-h .hb-vd7-head { opacity: 0.8; transform: translateX(var(--rest)); }
}
`;

function hash(i: number) {
  let x = Math.imul(i ^ 0x428a2f98, 0x71374491);
  x ^= x >>> 15;
  x = Math.imul(x, 0xb5c0fbcf);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967296;
}

export function BgGridBeams({
  cell = 40,
  beams = 14,
  color = "rgba(255,255,255,0.07)",
  accent = "#2f7bff",
  background = "#050608",
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgGridBeamsProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ cols: 24, rows: 14 });
  const c = Math.max(12, cell);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const cols = Math.max(2, Math.floor(el.clientWidth / c));
      const rows = Math.max(2, Math.floor(el.clientHeight / c));
      setSize((s) => (s.cols === cols && s.rows === rows ? s : { cols, rows }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [c]);

  const n = Math.max(0, Math.min(60, Math.round(beams)));
  const list = Array.from({ length: n }, (_, i) => {
    const vertical = hash(i * 6 + 1) > 0.38;
    const max = vertical ? size.cols : Math.max(2, Math.ceil(size.rows * 0.6));
    const idx = 1 + Math.floor(hash(i * 6 + 2) * (max - 1));
    const d = 3.6 + hash(i * 6 + 3) * 4.4;
    const dl = -hash(i * 6 + 4) * d * 2;
    const len = 50 + Math.round(hash(i * 6 + 5) * 90);
    return { vertical, p: idx * c, d, dl, len, rest: Math.round(hash(i * 6 + 6) * 300) };
  });
  const sparks = Array.from({ length: Math.round(n * 0.8) }, (_, i) => ({
    x: (1 + Math.floor(hash(i * 5 + 300) * (size.cols - 1))) * c,
    y: (1 + Math.floor(hash(i * 5 + 301) * Math.max(1, Math.ceil(size.rows * 0.55) - 1))) * c,
    d: 2.8 + hash(i * 5 + 302) * 4,
    dl: -hash(i * 5 + 303) * 6,
  }));

  return (
    <div
      ref={wrapRef}
      className={`hb-vd7 ${className}`}
      style={
        {
          "--hb-vd7-bg": background,
          "--hb-vd7-a": accent,
          "--hb-vd7-line": color,
          "--hb-vd7-cell": `${c}px`,
          "--hb-vd7-k": (1 / Math.max(0.05, speed)).toFixed(3),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-bg-grid-beams" precedence="default">{css}</style>
      <div className="hb-vd7-glow" aria-hidden="true" />
      <div className="hb-vd7-stage" aria-hidden="true">
        <div className="hb-vd7-grid" />
        <div className="hb-vd7-cross" />
        {list.map((b, i) => (
          <div
            key={i}
            className={b.vertical ? "hb-vd7-v" : "hb-vd7-h"}
            style={{ "--p": `${b.p}px`, "--len": `${b.len}px`, "--d": `${b.d.toFixed(2)}s`, "--dl": `${b.dl.toFixed(2)}s`, "--rest": `${b.rest}px` } as React.CSSProperties}
          >
            <span className="hb-vd7-head" />
          </div>
        ))}
        {sparks.map((s, i) => (
          <span
            key={`s${i}`}
            className="hb-vd7-spark"
            style={{ "--x": `${s.x}px`, "--y": `${s.y}px`, "--d": `${s.d.toFixed(2)}s`, "--dl": `${s.dl.toFixed(2)}s` } as React.CSSProperties}
          />
        ))}
      </div>
      {children ? <div className="hb-vd7-in">{children}</div> : null}
    </div>
  );
}
