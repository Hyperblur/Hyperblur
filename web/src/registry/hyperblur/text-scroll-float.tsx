"use client";

import * as React from "react";

export interface TextScrollFloatProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: string[];
  distance?: number;
  spread?: number;
  start?: number;
  end?: number;
  loop?: boolean;
  loopDuration?: number;
}

const css = `
.hb-qt2 {
  position: relative;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-qt2-l { display: block; }
.hb-qt2-w { display: inline-block; white-space: nowrap; }
.hb-qt2-i {
  display: inline-block;
  will-change: transform, opacity;
}
.hb-qt2-sp { display: inline-block; width: 0.28em; }
.hb-qt2-sr {
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
  .hb-qt2 .hb-qt2-i { opacity: 1 !important; transform: none !important; will-change: auto; }
}
`;

function clamp(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function letterStyle(l: number, distance: number) {
  const e = 1 - Math.pow(1 - l, 3);
  return {
    transform: `translate3d(0, ${((1 - e) * distance).toFixed(3)}em, 0)`,
    opacity: clamp(l * 2.2).toFixed(3),
  };
}

function loopValue(ms: number, period: number) {
  const u = (ms / 1000 / period) % 1;
  if (u < 0.45) {
    const k = u / 0.45;
    return k * k * (3 - 2 * k);
  }
  if (u < 0.75) return 1;
  if (u < 0.95) {
    const k = (u - 0.75) / 0.2;
    return 1 - k * k * (3 - 2 * k);
  }
  return 0;
}

function build(lines: string[]) {
  let n = 0;
  const built = lines.map((line) =>
    line.split(/(\s+)/).filter((t) => t !== "").map((value) =>
      /^\s+$/.test(value)
        ? { space: true, letters: [] as { ch: string; i: number }[] }
        : { space: false, letters: Array.from(value).map((ch) => ({ ch, i: n++ })) }
    )
  );
  return { built, count: n };
}

export function TextScrollFloat({
  lines = ["Rise with", "the scroll."],
  distance = 0.9,
  spread = 0.7,
  start = 0.9,
  end = 0.6,
  loop = false,
  loopDuration = 6,
  className = "",
  style,
  ...rest
}: TextScrollFloatProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const items = React.useRef<HTMLSpanElement[]>([]);

  const { built, count } = build(lines);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = items.current;
    const denom = Math.max(1, count - 1);
    const sp = Math.min(1, Math.max(0, spread));
    const apply = (p: number) => {
      for (let i = 0; i < count; i++) {
        const el = els[i];
        if (!el) continue;
        const l = clamp(p * (1 + sp) - (i / denom) * sp);
        const s = letterStyle(l, distance);
        el.style.transform = s.transform;
        el.style.opacity = s.opacity;
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
  }, [count, distance, spread, start, end, loop, loopDuration]);

  const initial = letterStyle(0, distance);

  return (
    <div ref={ref} className={`hb-qt2 ${className}`} style={style} {...rest}>
      <style href="hb-text-scroll-float" precedence="default">{css}</style>
      <span className="hb-qt2-sr">{lines.join(" ")}</span>
      <div aria-hidden="true">
        {built.map((words, li) => (
          <span key={li} className="hb-qt2-l">
            {words.map((w, wi) =>
              w.space ? (
                <span key={wi} className="hb-qt2-sp" />
              ) : (
                <span key={wi} className="hb-qt2-w">
                  {w.letters.map((l) => (
                    <span
                      key={l.i}
                      ref={(el) => {
                        if (el) items.current[l.i] = el;
                      }}
                      className="hb-qt2-i"
                      style={initial}
                    >
                      {l.ch}
                    </span>
                  ))}
                </span>
              )
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
