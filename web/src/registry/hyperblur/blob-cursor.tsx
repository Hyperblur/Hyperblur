"use client";

import * as React from "react";

export interface BlobCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
  lag?: number;
  blend?: "screen" | "normal" | "difference";
  global?: boolean;
}

const css = `
.hb-bc { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hb-bc[data-global="true"] { position: fixed; }
.hb-bc-svg { position: absolute; width: 0; height: 0; overflow: hidden; }
.hb-bc-b {
  position: absolute; left: 0; top: 0;
  width: var(--hb-w); height: var(--hb-w);
  opacity: 0; transition: opacity .25s ease;
  mix-blend-mode: var(--hb-bm);
  will-change: transform;
}
.hb-bc[data-on="true"] .hb-bc-b { opacity: 1; }
.hb-bc-c {
  position: absolute; left: 0; top: 0;
  border-radius: 50%; background: var(--hb-c);
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .hb-bc { display: none; }
}
`;

export function BlobCursor({
  color = "#2f7bff",
  size = 48,
  lag = 0.15,
  blend = "screen",
  global = false,
  className = "",
  style,
  ...rest
}: BlobCursorProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const fid = `hb-bc-${uid}`;
  const s = Math.max(4, size);

  React.useEffect(() => {
    const el = rootRef.current;
    const box = boxRef.current;
    const host = el?.parentElement;
    if (!el || !box || !host) return;

    const circles = Array.from(box.children) as HTMLElement[];
    const radii = [s * 0.5, s * 0.35, s * 0.22];
    const rates = [1, 0.6, 0.38];
    const half = s * 3;
    const limit = half - s * 0.8;
    const base = Math.min(1, Math.max(0.01, lag));
    const px = [0, 0, 0];
    const py = [0, 0, 0];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const moveTarget: EventTarget = global ? window : host;
    const leaveTarget: EventTarget = global ? document.documentElement : host;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let prev = 0;
    let placed = false;

    const clamp = (v: number) => Math.max(-limit, Math.min(limit, v));

    const paint = () => {
      const lx = px[0];
      const ly = py[0];
      const k = 1 + Math.min(0.35, Math.hypot(tx - lx, ty - ly) / (s * 8));
      box.style.transform = `translate3d(${(lx - half).toFixed(1)}px, ${(ly - half).toFixed(1)}px, 0)`;
      for (let i = 0; i < circles.length; i++) {
        const ox = clamp(px[i] - lx);
        const oy = clamp(py[i] - ly);
        circles[i].style.transform = `translate3d(${(half + ox - radii[i]).toFixed(1)}px, ${(half + oy - radii[i]).toFixed(1)}px, 0) scale(${k.toFixed(3)})`;
      }
    };

    const step = (now: number) => {
      const f = Math.min(0.05, Math.max(0, (now - prev) / 1000)) * 60;
      prev = now;
      let fx = tx;
      let fy = ty;
      let moving = false;
      for (let i = 0; i < 3; i++) {
        const rate = Math.min(1, base * rates[i]);
        const k = rate >= 1 ? 1 : 1 - Math.pow(1 - rate, f);
        px[i] += (fx - px[i]) * k;
        py[i] += (fy - py[i]) * k;
        if (Math.abs(fx - px[i]) + Math.abs(fy - py[i]) > 0.05) moving = true;
        fx = px[i];
        fy = py[i];
      }
      paint();
      raf = moving ? requestAnimationFrame(step) : 0;
    };

    const move = (ev: Event) => {
      const e = ev as PointerEvent;
      if (e.pointerType === "touch" || motion.matches) return;
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!placed) {
        placed = true;
        px.fill(tx);
        py.fill(ty);
        paint();
        el.dataset.on = "true";
      }
      if (!raf) {
        prev = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    const leave = () => {
      placed = false;
      el.dataset.on = "false";
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    moveTarget.addEventListener("pointermove", move, { passive: true });
    leaveTarget.addEventListener("pointerleave", leave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      moveTarget.removeEventListener("pointermove", move);
      leaveTarget.removeEventListener("pointerleave", leave);
    };
  }, [s, lag, global]);

  const vars = {
    "--hb-c": color,
    "--hb-bm": blend,
    "--hb-w": `${s * 6}px`,
    ...style,
  } as React.CSSProperties;

  const diameters = [s, s * 0.7, s * 0.44];

  return (
    <div
      ref={rootRef}
      className={`hb-bc ${className}`}
      style={vars}
      data-global={global ? "true" : "false"}
      aria-hidden="true"
      {...rest}
    >
      <style href="hb-blob-cursor" precedence="default">{css}</style>
      <svg className="hb-bc-svg" width="0" height="0" focusable="false">
        <defs>
          <filter id={fid} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={s * 0.12} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
          </filter>
        </defs>
      </svg>
      <div ref={boxRef} className="hb-bc-b" style={{ filter: `url(#${fid})` }}>
        {diameters.map((d, i) => (
          <span key={i} className="hb-bc-c" style={{ width: d, height: d }} />
        ))}
      </div>
    </div>
  );
}
