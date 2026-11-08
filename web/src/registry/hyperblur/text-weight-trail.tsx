"use client";

import * as React from "react";

export interface TextWeightTrailProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  minWeight?: number;
  maxWeight?: number;
  accent?: string;
  radius?: number;
  sensitivity?: number;
  decay?: number;
  autoPlay?: boolean;
}

const css = `
.hb-vi7 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  white-space: pre-wrap;
  box-sizing: border-box;
  touch-action: pan-y;
}
.hb-vi7 *, .hb-vi7 *::before, .hb-vi7 *::after { box-sizing: border-box; }
.hb-vi7-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi7-w { display: inline-block; white-space: nowrap; }
.hb-vi7-c {
  position: relative;
  display: inline-grid;
  justify-items: center;
}
.hb-vi7-c > span { grid-area: 1 / 1; }
.hb-vi7-g { visibility: hidden; font-weight: var(--hb-vi7-max); }
.hb-vi7-l {
  font-weight: var(--hb-vi7-min);
  color: color-mix(in oklab, var(--hb-vi7-accent) calc(var(--hb-vi7-h, 0) * 100%), currentColor);
}
.hb-vi7-c::after {
  content: "";
  position: absolute;
  left: 12%; right: 12%;
  bottom: -0.12em;
  height: 0.07em;
  border-radius: 0.04em;
  background: var(--hb-vi7-accent);
  transform: scaleX(var(--hb-vi7-h, 0));
  opacity: var(--hb-vi7-h, 0);
}
`;

function smooth(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export function TextWeightTrail({
  text,
  minWeight = 250,
  maxWeight = 900,
  accent = "#7fb3ff",
  radius = 70,
  sensitivity = 1,
  decay = 0.93,
  autoPlay = false,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TextWeightTrailProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const cells = React.useRef<(HTMLSpanElement | null)[]>([]);
  const words = React.useMemo(() => text.split(/(\s+)/), [text]);
  const total = React.useMemo(() => Array.from(text).filter((c) => c.trim() !== "").length, [text]);
  const engine = React.useRef<{ kick: (x: number, y: number, speed: number) => void; wake: () => void } | null>(null);
  const lastMove = React.useRef<{ x: number; y: number; t: number } | null>(null);
  const userAt = React.useRef(0);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const list = cells.current.slice(0, total);
    const heat = new Float32Array(total);
    let centers: { x: number; y: number }[] = [];
    let raf = 0;
    let visible = true;
    let ghostT = 0;
    let ghostPrev: { x: number; y: number } | null = null;
    let lastFrame = 0;

    const measure = () => {
      const r = root.getBoundingClientRect();
      centers = list.map((el) => {
        if (!el) return { x: -9999, y: -9999 };
        const b = el.getBoundingClientRect();
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 };
      });
    };

    const apply = () => {
      list.forEach((el, i) => {
        if (!el) return;
        const h = smooth(heat[i]);
        el.style.setProperty("--hb-vi7-h", h.toFixed(3));
        const label = el.lastElementChild as HTMLSpanElement | null;
        if (label) label.style.fontWeight = String(Math.round(minWeight + (maxWeight - minWeight) * h));
      });
    };

    const kick = (x: number, y: number, speed: number) => {
      const s = Math.min(1.6, speed * sensitivity * 0.9);
      for (let i = 0; i < centers.length; i++) {
        const dx = centers[i].x - x;
        const dy = (centers[i].y - y) * 1.6;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > radius) continue;
        const f = 1 - d / radius;
        heat[i] = Math.min(1, heat[i] + s * f * f * 0.5);
      }
    };

    const frame = (now: number) => {
      const dt = lastFrame ? Math.min(48, now - lastFrame) : 16;
      lastFrame = now;
      const k = Math.pow(decay, dt / 16.67);
      let active = false;
      for (let i = 0; i < heat.length; i++) {
        heat[i] *= k;
        if (heat[i] > 0.002) active = true;
        else heat[i] = 0;
      }
      if (autoPlay && visible && now - userAt.current > 1600) {
        const w = root.clientWidth;
        const hgt = root.clientHeight;
        ghostT += dt / 1000;
        const u = (Math.sin(ghostT * 1.25) + 1) / 2;
        const x = w * (0.04 + u * 0.92);
        const y = hgt * (0.5 + Math.sin(ghostT * 2.7) * 0.18);
        if (ghostPrev) {
          const sp = Math.hypot(x - ghostPrev.x, y - ghostPrev.y) / dt;
          kick(x, y, sp * 1.4);
        }
        ghostPrev = { x, y };
        active = true;
      } else {
        ghostPrev = null;
      }
      apply();
      raf = active && visible ? requestAnimationFrame(frame) : 0;
      if (!raf) lastFrame = 0;
    };

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    engine.current = {
      kick: (x, y, speed) => {
        kick(x, y, speed);
        wake();
      },
      wake,
    };

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
      engine.current = null;
    };
  }, [minWeight, maxWeight, radius, sensitivity, decay, autoPlay, words, total]);

  const vars = {
    "--hb-vi7-min": minWeight,
    "--hb-vi7-max": maxWeight,
    "--hb-vi7-accent": accent,
    ...style,
  } as React.CSSProperties;

  let n = 0;

  return (
    <span
      ref={ref}
      className={`hb-vi7 ${className}`}
      style={vars}
      onPointerMove={(e) => {
        const root = ref.current;
        if (!root) return;
        const r = root.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const now = e.timeStamp;
        userAt.current = performance.now();
        const prev = lastMove.current;
        lastMove.current = { x, y, t: now };
        if (prev) {
          const dt = Math.max(8, now - prev.t);
          const speed = Math.hypot(x - prev.x, y - prev.y) / dt;
          engine.current?.kick(x, y, speed);
        }
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        lastMove.current = null;
        onPointerLeave?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-weight-trail" precedence="default">{css}</style>
      <span className="hb-vi7-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          if (word.trim() === "") return <React.Fragment key={wi}>{word}</React.Fragment>;
          return (
            <span className="hb-vi7-w" key={wi}>
              {Array.from(word).map((ch, ci) => {
                const i = n++;
                return (
                  <span
                    key={ci}
                    className="hb-vi7-c"
                    ref={(el) => {
                      cells.current[i] = el;
                    }}
                  >
                    <span className="hb-vi7-g">{ch}</span>
                    <span className="hb-vi7-l">{ch}</span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
