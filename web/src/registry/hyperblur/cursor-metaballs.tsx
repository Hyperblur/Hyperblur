"use client";

import * as React from "react";

export interface CursorMetaballsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  color2?: string;
  size?: number;
  count?: number;
  goo?: number;
  idle?: boolean;
}

const css = `
.hb-qi6 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; }
.hb-qi6 *, .hb-qi6 *::before, .hb-qi6 *::after { box-sizing: border-box; }
.hb-qi6-svg { position: absolute; inset: 0; z-index: 0; display: block; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
.hb-qi6-content { position: relative; z-index: 1; width: 100%; height: 100%; }
`;

function hash(n: number) {
  let x = (Math.imul(n | 0, 374761393) + 668265263) | 0;
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export function CursorMetaballs({
  color = "#2f7bff",
  color2 = "#7fb3ff",
  size = 34,
  count = 5,
  goo = 10,
  idle = true,
  className = "",
  style,
  children,
  ...rest
}: CursorMetaballsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `hb-qi6-f${uid}`;
  const gradId = `hb-qi6-g${uid}`;
  const n = Math.max(1, Math.min(12, Math.floor(count)));
  const sats = Array.from({ length: n }, (_, i) => ({
    r: size * (0.38 + hash(i * 7 + 1) * 0.26),
    speed: (0.7 + hash(i * 7 + 2) * 0.9) * (i % 2 ? -1 : 1),
    phase: hash(i * 7 + 3) * Math.PI * 2,
    lag: 3 + hash(i * 7 + 4) * 5,
  }));
  const satKey = sats.map((s) => `${s.r.toFixed(2)},${s.speed.toFixed(3)},${s.phase.toFixed(3)},${s.lag.toFixed(2)}`).join(";");

  React.useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const data = satKey.split(";").map((row) => {
      const [r, speed, phase, lag] = row.split(",").map(Number);
      return { r, speed, phase, lag, x: 0, y: 0 };
    });
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("circle"));
    const main = nodes[0];
    const others = nodes.slice(1);
    let w = root.clientWidth;
    let h = root.clientHeight;
    let px = w / 2;
    let py = h / 2;
    let mx = w / 2;
    let my = h / 2;
    let active = false;
    let mix = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let visible = true;

    const set = (el: SVGCircleElement | undefined, x: number, y: number) => {
      if (!el) return;
      el.setAttribute("cx", x.toFixed(2));
      el.setAttribute("cy", y.toFixed(2));
    };

    const step = (dt: number, snap: boolean) => {
      t += dt;
      w = root.clientWidth;
      h = root.clientHeight;
      mix += ((active ? 1 : 0) - mix) * (1 - Math.exp(-dt * 3));
      const ix = idle ? w * (0.5 + 0.3 * Math.sin(t * 0.5) + 0.05 * Math.sin(t * 1.7)) : px;
      const iy = idle ? h * (0.5 + 0.24 * Math.sin(t * 0.8 + 0.6)) : py;
      const tx = ix + (px - ix) * mix;
      const ty = iy + (py - iy) * mix;
      const km = snap ? 1 : 1 - Math.exp(-dt * 9);
      mx += (tx - mx) * km;
      my += (ty - my) * km;
      set(main, mx, my);
      data.forEach((s, i) => {
        const breathe = 0.5 + 0.5 * Math.sin(t * 0.9 + i * 1.7);
        const orbit = size * (0.75 + breathe * 0.95);
        const a = t * s.speed + s.phase;
        const gx = mx + Math.cos(a) * orbit;
        const gy = my + Math.sin(a) * orbit * 0.8;
        const k = snap ? 1 : 1 - Math.exp(-dt * s.lag);
        s.x += (gx - s.x) * k;
        s.y += (gy - s.y) * k;
        set(others[i], s.x, s.y);
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.04, Math.max(0.001, (now - last) / 1000));
      last = now;
      step(dt, false);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? w / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      active = true;
      if (reduced) step(0, true);
    };
    const onLeave = () => {
      active = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") onLeave();
    };

    step(0, true);
    if (reduced) {
      t = 1.3;
      step(0, true);
    }
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    root.addEventListener("pointerup", onUp);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    start();

    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      root.removeEventListener("pointerup", onUp);
    };
  }, [satKey, size, idle]);

  return (
    <div ref={rootRef} className={`hb-qi6 ${className}`} style={style} {...rest}>
      <style href="hb-cursor-metaballs" precedence="default">{css}</style>
      <svg ref={svgRef} className="hb-qi6-svg" aria-hidden="true">
        <defs>
          <filter id={filterId} filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={goo} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" />
          </filter>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" stopColor={color} />
            <stop offset="1" stopColor={color2} />
          </linearGradient>
        </defs>
        <g filter={`url(#${filterId})`} fill={`url(#${gradId})`}>
          <circle cx="50%" cy="50%" r={size.toFixed(2)} />
          {sats.map((s, i) => (
            <circle key={i} cx="50%" cy="50%" r={s.r.toFixed(2)} />
          ))}
        </g>
      </svg>
      <div className="hb-qi6-content">{children}</div>
    </div>
  );
}
