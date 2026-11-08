"use client";

import * as React from "react";

export interface HoverRevealLensProps extends React.HTMLAttributes<HTMLDivElement> {
  base?: React.ReactNode;
  reveal?: React.ReactNode;
  radius?: number;
  accent?: string;
  autoPlay?: boolean;
  label?: string;
  ratio?: number;
}

function hash(n: number) {
  let x = Math.imul((n | 0) ^ 0x9e3779b9, 0x85ebca6b) >>> 0;
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35) >>> 0;
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

const W = 400;
const H = 250;
const cols = [0, 46, 98, 140, 196, 238, 292, 338, 400];
const rows = [0, 40, 84, 122, 170, 208, 250];
const blocks: { x: number; y: number; w: number; h: number; v: number; park: boolean }[] = [];
for (let r = 0; r < rows.length - 1; r++) {
  for (let c = 0; c < cols.length - 1; c++) {
    const i = r * 10 + c;
    const x = cols[c] + 5;
    const y = rows[r] + 5;
    const w = cols[c + 1] - cols[c] - 10;
    const h = rows[r + 1] - rows[r] - 10;
    blocks.push({ x, y, w, h, v: hash(i + 7), park: hash(i + 91) > 0.86 });
  }
}
const river = "M-10 150 C 60 128, 110 190, 180 168 S 300 112, 410 138";
const heat = (v: number) => (v > 0.78 ? "#ff5a5f" : v > 0.55 ? "#ff9f43" : v > 0.32 ? "#f6d365" : "#3ddc97");
const pins = [
  { x: 120, y: 60, t: "Depot 4" },
  { x: 262, y: 96, t: "Hub" },
  { x: 70, y: 196, t: "Dock B" },
  { x: 318, y: 186, t: "Yard 2" },
];

function Blueprint() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width={W} height={H} fill="#0b1020" />
      <g stroke="#1b2847" strokeWidth=".6">
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2={H} />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2={W} y2={i * 20} />
        ))}
      </g>
      <g fill="none" stroke="#3a5288" strokeWidth=".9">
        {blocks.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" strokeDasharray={b.park ? "3 3" : undefined} />
        ))}
      </g>
      <path d={river} fill="none" stroke="#4e6aa8" strokeWidth="10" strokeOpacity=".25" />
      <path d={river} fill="none" stroke="#5f7cc0" strokeWidth=".9" />
      {pins.map((p) => (
        <circle key={p.t} cx={p.x} cy={p.y} r="2.5" fill="none" stroke="#5f7cc0" />
      ))}
    </svg>
  );
}

function Live({ accent }: { accent: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width={W} height={H} fill="#121212" />
      {blocks.map((b, i) =>
        b.park ? (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="#1f3d2a" />
        ) : (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="#1d1d1d" />
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill={heat(b.v)} opacity={(0.18 + b.v * 0.5).toFixed(3)} />
          </g>
        ),
      )}
      <path d={river} fill="none" stroke="#1d4f8a" strokeWidth="11" />
      <path d={river} fill="none" stroke="#3d86d8" strokeWidth="1.2" strokeOpacity=".7" />
      <g stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".9">
        <path d="M120 60 L120 84 L262 84 L262 96" />
        <path d="M262 96 L292 96 L292 186 L318 186" />
        <path d="M70 196 L98 196 L98 122 L120 122 L120 60" />
      </g>
      {pins.map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="6" fill={accent} opacity=".25" />
          <circle cx={p.x} cy={p.y} r="3" fill="#fff" stroke={accent} strokeWidth="1.5" />
          <rect x={p.x + 6} y={p.y - 15} width={p.t.length * 5.2 + 8} height="12" rx="3" fill="#0a0a0a" opacity=".85" />
          <text x={p.x + 10} y={p.y - 6} fontSize="8" fill="#ededed" fontFamily="var(--font-mono, ui-monospace, monospace)">{p.t}</text>
        </g>
      ))}
    </svg>
  );
}

const css = `
.hb-wg8 { --hb-wg8-accent: #2f7bff; --hb-wg8-x: 50%; --hb-wg8-y: 50%; --hb-wg8-r: 52px; position: relative; box-sizing: border-box; width: 100%; overflow: hidden; border-radius: 14px; font-family: inherit; color: #ededed; background: #0b1020; box-shadow: 0 0 0 1px #262626, 0 20px 40px -24px rgba(0,0,0,.9); touch-action: pan-y; cursor: none; outline: none; }
.hb-wg8 *, .hb-wg8 *::before, .hb-wg8 *::after { box-sizing: border-box; }
.hb-wg8:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg8-accent); }
.hb-wg8-layer { position: absolute; inset: 0; }
.hb-wg8-layer > svg { display: block; }
.hb-wg8-reveal { clip-path: circle(var(--hb-wg8-r) at var(--hb-wg8-x) var(--hb-wg8-y)); }
.hb-wg8-ring { position: absolute; left: var(--hb-wg8-x); top: var(--hb-wg8-y); width: calc(var(--hb-wg8-r) * 2); height: calc(var(--hb-wg8-r) * 2); margin: calc(var(--hb-wg8-r) * -1) 0 0 calc(var(--hb-wg8-r) * -1); border-radius: 50%; pointer-events: none; box-shadow: 0 0 0 1.5px rgba(255,255,255,.85), 0 0 0 5px rgba(10,10,10,.35), 0 10px 30px rgba(0,0,0,.55), inset 0 0 24px rgba(0,0,0,.35); }
.hb-wg8-ring::before, .hb-wg8-ring::after { content: ""; position: absolute; left: 50%; top: 50%; background: rgba(255,255,255,.7); }
.hb-wg8-ring::before { width: 10px; height: 1px; margin: 0 0 0 -5px; }
.hb-wg8-ring::after { width: 1px; height: 10px; margin: -5px 0 0 0; }
.hb-wg8-tick { position: absolute; inset: -7px; border-radius: 50%; background: repeating-conic-gradient(from 0deg, rgba(255,255,255,.55) 0 1.2deg, transparent 1.2deg 15deg); -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 4px), #000 calc(100% - 4px)); mask: radial-gradient(closest-side, transparent calc(100% - 4px), #000 calc(100% - 4px)); animation: hb-wg8-spin 18s linear infinite; }
.hb-wg8-read { position: absolute; left: 50%; top: calc(100% + 8px); transform: translateX(-50%); padding: 2px 6px; border-radius: 5px; background: rgba(10,10,10,.82); box-shadow: 0 0 0 1px #262626; font-family: var(--font-mono, ui-monospace, monospace); font-size: 8.5px; letter-spacing: .04em; white-space: nowrap; color: #ededed; }
.hb-wg8-tag { position: absolute; left: 10px; top: 10px; display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 999px; background: rgba(10,10,10,.75); box-shadow: 0 0 0 1px #262626; font-size: 10px; color: #a1a1a1; pointer-events: none; }
.hb-wg8-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-wg8-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wg8-accent) 25%, transparent); }
@keyframes hb-wg8-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-wg8-tick { animation: none; }
}
`;

export function HoverRevealLens({
  base,
  reveal,
  radius = 52,
  accent = "#2f7bff",
  autoPlay = true,
  label = "Live load",
  ratio = 0.625,
  className = "",
  style,
  ...rest
}: HoverRevealLensProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const readRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const read = readRef.current;
    if (!root || !read) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = root.offsetWidth;
    let h = root.offsetHeight;
    let x = w * 0.5;
    let y = h * 0.5;
    let vx = 0;
    let vy = 0;
    let px = x;
    let py = y;
    let r = radius;
    let goalR = radius;
    let inside = false;
    let keyMode = false;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const paint = () => {
      root.style.setProperty("--hb-wg8-x", `${x.toFixed(1)}px`);
      root.style.setProperty("--hb-wg8-y", `${y.toFixed(1)}px`);
      root.style.setProperty("--hb-wg8-r", `${r.toFixed(1)}px`);
      const gx = w ? (x / w) * 100 : 0;
      const gy = h ? (y / h) * 100 : 0;
      read.textContent = `${gx.toFixed(1).padStart(4, "0")} · ${gy.toFixed(1).padStart(4, "0")}`;
    };
    const frame = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      t += dt;
      w = root.offsetWidth;
      h = root.offsetHeight;
      let tx = px;
      let ty = py;
      if (!inside && !keyMode && autoPlay) {
        tx = w * (0.5 + 0.34 * Math.sin(t * 0.45) + 0.06 * Math.sin(t * 1.7));
        ty = h * (0.5 + 0.26 * Math.sin(t * 0.7 + 1.2));
      }
      const k = 170;
      const d = 22;
      vx += ((tx - x) * k - vx * d) * dt;
      vy += ((ty - y) * k - vy * d) * dt;
      x += vx * dt;
      y += vy * dt;
      r += (goalR - r) * (1 - Math.exp(-dt * 12));
      paint();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const locate = (e: PointerEvent) => {
      const b = root.getBoundingClientRect();
      const s = b.width ? root.offsetWidth / b.width : 1;
      px = (e.clientX - b.left) * s;
      py = (e.clientY - b.top) * s;
      inside = true;
      keyMode = false;
      if (reduce) {
        x = px;
        y = py;
        paint();
      }
    };
    const onDown = (e: PointerEvent) => {
      locate(e);
      goalR = radius * 1.45;
      if (reduce) {
        r = goalR;
        paint();
      }
    };
    const onUp = (e: PointerEvent) => {
      goalR = radius;
      if (reduce) {
        r = goalR;
        paint();
      }
      if (e.pointerType !== "mouse") window.setTimeout(() => {
          inside = false;
        }, 1600);
    };
    const onLeave = () => {
      inside = false;
      goalR = radius;
    };
    const onKey = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 30 : 12;
      let used = true;
      if (e.key === "ArrowLeft") px -= step;
      else if (e.key === "ArrowRight") px += step;
      else if (e.key === "ArrowUp") py -= step;
      else if (e.key === "ArrowDown") py += step;
      else if (e.key === "+" || e.key === "=") goalR = Math.min(radius * 2, goalR + 8);
      else if (e.key === "-") goalR = Math.max(radius * 0.6, goalR - 8);
      else used = false;
      if (!used) return;
      e.preventDefault();
      if (!keyMode) {
        keyMode = true;
        px = Math.min(Math.max(px, 0), w);
        py = Math.min(Math.max(py, 0), h);
      }
      px = Math.min(Math.max(px, 0), w);
      py = Math.min(Math.max(py, 0), h);
      if (reduce) {
        x = px;
        y = py;
        r = goalR;
        paint();
      }
    };
    const onBlur = () => {
      keyMode = false;
    };
    root.addEventListener("pointermove", locate);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    root.addEventListener("keydown", onKey);
    root.addEventListener("blur", onBlur);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) start();
      else stop();
    });
    io.observe(root);
    paint();
    if (!reduce) start();
    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", locate);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      root.removeEventListener("keydown", onKey);
      root.removeEventListener("blur", onBlur);
    };
  }, [radius, autoPlay]);

  const vars = { "--hb-wg8-accent": accent, "--hb-wg8-r": `${radius}px`, aspectRatio: `1 / ${ratio}` } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`hb-wg8 ${className}`}
      style={{ ...vars, ...style }}
      tabIndex={0}
      role="img"
      aria-label={`${label}. Move the pointer or use the arrow keys to inspect, plus and minus to resize the lens.`}
      {...rest}
    >
      <style href="hb-hover-reveal-lens" precedence="default">{css}</style>
      <div className="hb-wg8-layer">{base ?? <Blueprint />}</div>
      <div className="hb-wg8-layer hb-wg8-reveal">{reveal ?? <Live accent={accent} />}</div>
      <span className="hb-wg8-ring" aria-hidden="true">
        <span className="hb-wg8-tick" />
        <span ref={readRef} className="hb-wg8-read" />
      </span>
      <span className="hb-wg8-tag" aria-hidden="true">
        <span className="hb-wg8-dot" />
        {label}
      </span>
    </div>
  );
}
