"use client";

import * as React from "react";

export interface BgSpotlightGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cell?: number;
  radius?: number;
  color?: string;
  accent?: string;
  background?: string;
  cells?: number;
  follow?: boolean;
  speed?: number;
  children?: React.ReactNode;
}

const css = `
.hb-vd11 { position: absolute; inset: 0; overflow: hidden; pointer-events: none; box-sizing: border-box; background: var(--hb-vd11-bg); --hb-vd11-x: 50%; --hb-vd11-y: 40%; }
.hb-vd11 *, .hb-vd11 *::before, .hb-vd11 *::after { box-sizing: border-box; }
.hb-vd11-dim { position: absolute; inset: 0; background-image: linear-gradient(to right, color-mix(in srgb, var(--hb-vd11-c) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--hb-vd11-c) 7%, transparent) 1px, transparent 1px); background-size: var(--hb-vd11-cell) var(--hb-vd11-cell); }
.hb-vd11-halo { position: absolute; inset: 0; background: radial-gradient(circle var(--hb-vd11-r) at var(--hb-vd11-x) var(--hb-vd11-y), color-mix(in srgb, var(--hb-vd11-a) 20%, transparent), transparent 70%); }
.hb-vd11-lit { position: absolute; inset: 0; -webkit-mask-image: radial-gradient(circle var(--hb-vd11-r) at var(--hb-vd11-x) var(--hb-vd11-y), #000 0%, rgba(0,0,0,0.5) 45%, transparent 100%); mask-image: radial-gradient(circle var(--hb-vd11-r) at var(--hb-vd11-x) var(--hb-vd11-y), #000 0%, rgba(0,0,0,0.5) 45%, transparent 100%); }
.hb-vd11-lines { position: absolute; inset: 0; background-image: radial-gradient(circle at 0.5px 0.5px, #fff 0 1px, transparent 1.6px), linear-gradient(to right, color-mix(in srgb, var(--hb-vd11-c) 34%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--hb-vd11-c) 34%, transparent) 1px, transparent 1px); background-size: var(--hb-vd11-cell) var(--hb-vd11-cell); }
.hb-vd11-cell { position: absolute; left: var(--x); top: var(--y); width: var(--hb-vd11-cell); height: var(--hb-vd11-cell); background: linear-gradient(160deg, color-mix(in srgb, var(--hb-vd11-a) 42%, transparent), color-mix(in srgb, var(--hb-vd11-a) 12%, transparent)); box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent), inset 0 0 0 1px color-mix(in srgb, var(--hb-vd11-a) 70%, transparent), 0 0 22px color-mix(in srgb, var(--hb-vd11-a) 45%, transparent); opacity: 0; animation: hb-vd11-blink calc(var(--d) * var(--hb-vd11-k)) cubic-bezier(0.4, 0, 0.2, 1) infinite; animation-delay: var(--dl); }
.hb-vd11-in { position: relative; z-index: 1; width: 100%; height: 100%; pointer-events: auto; font-family: inherit; }
@keyframes hb-vd11-blink {
  0%, 100% { opacity: 0; }
  12% { opacity: 1; }
  40% { opacity: 0.8; }
  58% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vd11-cell { animation: none; opacity: var(--rest); }
}
`;

function hash(i: number) {
  let x = Math.imul(i ^ 0x082efa98, 0xec4e6c89);
  x ^= x >>> 15;
  x = Math.imul(x, 0x452821e6);
  x ^= x >>> 14;
  return (x >>> 0) / 4294967296;
}

export function BgSpotlightGrid({
  cell = 34,
  radius = 220,
  color = "#ffffff",
  accent = "#2f7bff",
  background = "#060607",
  cells = 22,
  follow = true,
  speed = 1,
  children,
  className = "",
  style,
  ...rest
}: BgSpotlightGridProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ cols: 24, rows: 14 });
  const c = Math.max(12, cell);

  React.useEffect(() => {
    const el = wrapRef.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const node: HTMLDivElement = el;
    const parent: HTMLElement = host;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let prev = 0;
    let visible = true;
    let inside = false;
    let tx = 0;
    let ty = 0;
    let px = 0;
    let py = 0;
    let placed = false;

    function apply() {
      node.style.setProperty("--hb-vd11-x", `${px.toFixed(1)}px`);
      node.style.setProperty("--hb-vd11-y", `${py.toFixed(1)}px`);
    }

    function idle() {
      return {
        x: w * (0.5 + 0.34 * Math.sin(t * 0.37)),
        y: h * (0.45 + 0.28 * Math.sin(t * 0.53 + 1.2)),
      };
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      t += dt * speed;
      const target = inside && follow ? { x: tx, y: ty } : idle();
      if (!placed) {
        px = target.x;
        py = target.y;
        placed = true;
      }
      const k = 1 - Math.exp(-dt * (inside ? 9 : 2.4));
      px += (target.x - px) * k;
      py += (target.y - py) * k;
      apply();
      raf = requestAnimationFrame(frame);
    }

    function resize() {
      w = node.clientWidth;
      h = node.clientHeight;
      const cols = Math.max(2, Math.floor(w / c));
      const rows = Math.max(2, Math.floor(h / c));
      setSize((s) => (s.cols === cols && s.rows === rows ? s : { cols, rows }));
      if (motion.matches || !placed) {
        px = w * 0.5;
        py = h * 0.42;
        apply();
      }
    }

    function sync() {
      const run = visible && !document.hidden && !motion.matches;
      if (run && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (motion.matches) {
        px = w * 0.5;
        py = h * 0.42;
        apply();
      }
    }

    function move(e: PointerEvent) {
      const rect = node.getBoundingClientRect();
      const sx = rect.width ? node.clientWidth / rect.width : 1;
      const sy = rect.height ? node.clientHeight / rect.height : 1;
      tx = (e.clientX - rect.left) * sx;
      ty = (e.clientY - rect.top) * sy;
      inside = true;
    }

    function leave() {
      inside = false;
    }

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      sync();
    });
    ro.observe(node);
    io.observe(node);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerleave", leave);
    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [c, follow, speed]);

  const n = Math.max(0, Math.min(120, Math.round(cells)));
  const lit = Array.from({ length: n }, (_, i) => ({
    x: Math.floor(hash(i * 4 + 1) * size.cols) * c,
    y: Math.floor(hash(i * 4 + 2) * size.rows) * c,
    d: 3 + hash(i * 4 + 3) * 4,
    dl: -hash(i * 4 + 4) * 7,
    rest: hash(i * 4 + 5) > 0.6 ? 0.8 : 0,
  }));

  return (
    <div
      ref={wrapRef}
      className={`hb-vd11 ${className}`}
      style={
        {
          "--hb-vd11-bg": background,
          "--hb-vd11-a": accent,
          "--hb-vd11-c": color,
          "--hb-vd11-cell": `${c}px`,
          "--hb-vd11-r": `${Math.max(40, radius)}px`,
          "--hb-vd11-k": (1 / Math.max(0.05, speed)).toFixed(3),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-bg-spotlight-grid" precedence="default">{css}</style>
      <div className="hb-vd11-dim" aria-hidden="true" />
      <div className="hb-vd11-halo" aria-hidden="true" />
      <div className="hb-vd11-lit" aria-hidden="true">
        {lit.map((l, i) => (
          <span
            key={i}
            className="hb-vd11-cell"
            style={{ "--x": `${l.x}px`, "--y": `${l.y}px`, "--d": `${l.d.toFixed(2)}s`, "--dl": `${l.dl.toFixed(2)}s`, "--rest": l.rest } as React.CSSProperties}
          />
        ))}
        <div className="hb-vd11-lines" />
      </div>
      {children ? <div className="hb-vd11-in">{children}</div> : null}
    </div>
  );
}
