"use client";

import * as React from "react";

export interface TextMagneticProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  radius?: number;
  strength?: number;
  stiffness?: number;
  damping?: number;
  rotate?: number;
  highlight?: string;
  autoPlay?: boolean;
}

const css = `
.hb-vi9 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  white-space: pre-wrap;
  box-sizing: border-box;
  touch-action: pan-y;
}
.hb-vi9 *, .hb-vi9 *::before, .hb-vi9 *::after { box-sizing: border-box; }
.hb-vi9-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi9-w { display: inline-block; white-space: nowrap; }
.hb-vi9-c {
  display: inline-block;
  transform: translate3d(var(--hb-vi9-x, 0px), var(--hb-vi9-y, 0px), 0) rotate(var(--hb-vi9-r, 0deg)) scale(var(--hb-vi9-s, 1));
  color: color-mix(in oklab, var(--hb-vi9-hi) calc(var(--hb-vi9-p, 0) * 100%), currentColor);
  will-change: transform;
}
.hb-vi9-dot {
  position: absolute;
  left: 0; top: 0;
  width: 0.22em; height: 0.22em;
  margin: -0.11em 0 0 -0.11em;
  border-radius: 50%;
  background: var(--hb-vi9-hi);
  box-shadow: 0 0 0 0.12em color-mix(in srgb, var(--hb-vi9-hi) 22%, transparent), 0 0 1.2em color-mix(in srgb, var(--hb-vi9-hi) 60%, transparent);
  opacity: 0;
  transform: translate3d(var(--hb-vi9-mx, 0px), var(--hb-vi9-my, 0px), 0);
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.hb-vi9[data-ghost] .hb-vi9-dot { opacity: 0.85; }
@media (prefers-reduced-motion: reduce) {
  .hb-vi9 .hb-vi9-c { transform: none; will-change: auto; }
  .hb-vi9 .hb-vi9-dot { display: none; }
}
`;

export function TextMagnetic({
  text,
  radius = 120,
  strength = 18,
  stiffness = 0.12,
  damping = 0.78,
  rotate = 10,
  highlight = "#7fb3ff",
  autoPlay = false,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TextMagneticProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const cells = React.useRef<(HTMLSpanElement | null)[]>([]);
  const words = React.useMemo(() => text.split(/(\s+)/), [text]);
  const total = React.useMemo(() => Array.from(text).filter((c) => c.trim() !== "").length, [text]);
  const pointer = React.useRef<{ x: number; y: number } | null>(null);
  const userAt = React.useRef(0);
  const wakeRef = React.useRef<() => void>(() => undefined);
  const [ghost, setGhost] = React.useState(false);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = cells.current.slice(0, total);
    const n = list.length;
    const px = new Float32Array(n);
    const py = new Float32Array(n);
    const vx = new Float32Array(n);
    const vy = new Float32Array(n);
    let homes: { x: number; y: number }[] = [];
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = 0;
    let ghostOn = false;

    const measure = () => {
      const r = root.getBoundingClientRect();
      homes = list.map((el, i) => {
        if (!el) return { x: -9999, y: -9999 };
        const b = el.getBoundingClientRect();
        return { x: b.left - r.left + b.width / 2 - px[i], y: b.top - r.top + b.height / 2 - py[i] };
      });
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(40, now - last) : 16;
      last = now;
      const step = dt / 16.67;
      let target = pointer.current;
      const idle = now - userAt.current > 1400;
      const useGhost = autoPlay && visible && idle && !target;
      if (useGhost) {
        t += dt / 1000;
        const w = root.clientWidth;
        const h = root.clientHeight;
        target = {
          x: w * (0.5 + Math.sin(t * 0.9) * 0.46),
          y: h * (0.5 + Math.sin(t * 1.7 + 0.6) * 0.75),
        };
        root.style.setProperty("--hb-vi9-mx", `${target.x.toFixed(1)}px`);
        root.style.setProperty("--hb-vi9-my", `${target.y.toFixed(1)}px`);
      }
      if (useGhost !== ghostOn) {
        ghostOn = useGhost;
        setGhost(useGhost);
      }
      let moving = false;
      for (let i = 0; i < n; i++) {
        let tx = 0;
        let ty = 0;
        let pull = 0;
        if (target) {
          const dx = target.x - homes[i].x;
          const dy = target.y - homes[i].y;
          const d = Math.hypot(dx, dy);
          if (d < radius && d > 0.001) {
            const f = 1 - d / radius;
            pull = f * f;
            const m = Math.min(d * 0.6, strength * pull * 1.6);
            tx = (dx / d) * m;
            ty = (dy / d) * m;
          }
        }
        vx[i] = (vx[i] + (tx - px[i]) * stiffness * step) * Math.pow(damping, step);
        vy[i] = (vy[i] + (ty - py[i]) * stiffness * step) * Math.pow(damping, step);
        px[i] += vx[i] * step;
        py[i] += vy[i] * step;
        const el = list[i];
        if (el) {
          el.style.setProperty("--hb-vi9-x", `${px[i].toFixed(2)}px`);
          el.style.setProperty("--hb-vi9-y", `${py[i].toFixed(2)}px`);
          el.style.setProperty("--hb-vi9-r", `${Math.max(-rotate, Math.min(rotate, vx[i] * rotate * 0.35 + px[i] * 0.4)).toFixed(2)}deg`);
          const p = Math.min(1, Math.hypot(px[i], py[i]) / Math.max(1, strength));
          el.style.setProperty("--hb-vi9-p", p.toFixed(3));
          el.style.setProperty("--hb-vi9-s", (1 + p * 0.08).toFixed(3));
        }
        if (Math.abs(vx[i]) + Math.abs(vy[i]) > 0.01 || Math.abs(px[i] - tx) + Math.abs(py[i] - ty) > 0.05) moving = true;
      }
      raf = visible && (moving || autoPlay || pointer.current) ? requestAnimationFrame(frame) : 0;
      if (!raf) last = 0;
    };

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(root);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => undefined);
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((e) => e.isIntersecting);
            if (visible) wake();
          })
        : null;
    io?.observe(root);
    wake();
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      wakeRef.current = () => undefined;
    };
  }, [radius, strength, stiffness, damping, rotate, autoPlay, total, words]);

  const vars = { "--hb-vi9-hi": highlight, ...style } as React.CSSProperties;
  let n = 0;

  return (
    <span
      ref={ref}
      className={`hb-vi9 ${className}`}
      style={vars}
      data-ghost={ghost ? "" : undefined}
      onPointerMove={(e) => {
        const root = ref.current;
        if (root) {
          const r = root.getBoundingClientRect();
          pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          userAt.current = performance.now();
          wakeRef.current();
        }
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        pointer.current = null;
        userAt.current = performance.now();
        wakeRef.current();
        onPointerLeave?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-magnetic" precedence="default">{css}</style>
      <span className="hb-vi9-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          if (word.trim() === "") return <React.Fragment key={wi}>{word}</React.Fragment>;
          return (
            <span className="hb-vi9-w" key={wi}>
              {Array.from(word).map((ch, ci) => {
                const i = n++;
                return (
                  <span
                    key={ci}
                    className="hb-vi9-c"
                    ref={(el) => {
                      cells.current[i] = el;
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
      {autoPlay ? <span className="hb-vi9-dot" aria-hidden="true" /> : null}
    </span>
  );
}
