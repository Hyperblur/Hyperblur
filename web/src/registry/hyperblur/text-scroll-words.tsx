"use client";

import * as React from "react";

export interface TextScrollWordsProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  minOpacity?: number;
  maxBlur?: number;
  start?: number;
  end?: number;
  loop?: boolean;
  loopDuration?: number;
}

const css = `
.hb-qt3 {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  font-family: inherit;
}
.hb-qt3-w {
  display: inline-block;
  will-change: opacity, filter;
}
.hb-qt3-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qt3 .hb-qt3-w { opacity: 1 !important; filter: none !important; will-change: auto; }
}
`;

const WINDOW = 0.22;

function clamp(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function loopValue(ms: number, period: number) {
  const u = (ms / 1000 / period) % 1;
  if (u < 0.55) {
    const k = u / 0.55;
    return k * k * (3 - 2 * k);
  }
  if (u < 0.78) return 1;
  if (u < 0.94) {
    const k = (u - 0.78) / 0.16;
    return 1 - k * k * (3 - 2 * k);
  }
  return 0;
}

export function TextScrollWords({
  text,
  minOpacity = 0.16,
  maxBlur = 5,
  start = 0.9,
  end = 0.5,
  loop = false,
  loopDuration = 7,
  className = "",
  style,
  ...rest
}: TextScrollWordsProps) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const items = React.useRef<HTMLSpanElement[]>([]);

  const words = text.split(/\s+/).filter((w) => w !== "");
  const count = words.length;

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = items.current;
    const denom = Math.max(1, count);
    const floor = clamp(minOpacity);
    const apply = (p: number) => {
      for (let i = 0; i < count; i++) {
        const el = els[i];
        if (!el) continue;
        const l = clamp((p - (i / denom) * (1 - WINDOW)) / WINDOW);
        el.style.opacity = (floor + (1 - floor) * l).toFixed(3);
        el.style.filter = maxBlur > 0 && l < 1 ? `blur(${((1 - l) * maxBlur).toFixed(2)}px)` : "none";
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    const period = Math.max(1, loopDuration);
    const origin = performance.now();
    let display = 0;
    let pointer: number | null = null;
    let seen = true;
    let raf = 0;

    const tick = (now: number) => {
      raf = 0;
      if (!seen) return;
      let target: number;
      if (loop && pointer !== null) target = pointer;
      else if (loop) target = loopValue(now - origin, period);
      else {
        const rect = root.getBoundingClientRect();
        const vh = window.innerHeight;
        target = clamp((start * vh - rect.top) / (start * vh - end * vh + rect.height));
      }
      display += (target - display) * 0.2;
      const settled = Math.abs(target - display) < 0.0005;
      apply(settled ? target : display);
      if (settled && !loop) display = target;
      if (loop || !settled) raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!raf && seen) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        seen = entry.isIntersecting;
        if (seen) schedule();
      }
    });
    io.observe(root);

    const move = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer = clamp((e.clientX - rect.left) / Math.max(1, rect.width));
      schedule();
    };
    const leave = () => {
      pointer = null;
    };
    if (loop) {
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerdown", move);
      root.addEventListener("pointerleave", leave);
      root.addEventListener("pointercancel", leave);
    } else {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }
    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [count, minOpacity, maxBlur, start, end, loop, loopDuration]);

  const initial = {
    opacity: clamp(minOpacity).toFixed(3),
    filter: maxBlur > 0 ? `blur(${maxBlur.toFixed(2)}px)` : "none",
  };

  return (
    <p ref={ref} className={`hb-qt3 ${className}`} style={style} {...rest}>
      <style href="hb-text-scroll-words" precedence="default">{css}</style>
      <span className="hb-qt3-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 ? " " : null}
            <span
              ref={(el) => {
                if (el) items.current[i] = el;
              }}
              className="hb-qt3-w"
              style={initial}
            >
              {w}
            </span>
          </React.Fragment>
        ))}
      </span>
    </p>
  );
}
