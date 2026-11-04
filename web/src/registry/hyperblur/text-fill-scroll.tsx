"use client";

import * as React from "react";

export interface TextFillScrollProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  fillColor?: string;
  baseColor?: string;
  startAt?: number;
  endAt?: number;
  idleLoop?: boolean;
  idleDuration?: number;
  resumeDelay?: number;
}

const css = `
.hb-qda { margin: 0; font-family: inherit; box-sizing: border-box; }
.hb-qda-w {
  --hb-qda-f: 0;
  color: var(--hb-qda-base);
  background-image: linear-gradient(
    90deg,
    var(--hb-qda-fill) 0,
    var(--hb-qda-fill) calc(var(--hb-qda-f) * 112% - 12%),
    var(--hb-qda-base) calc(var(--hb-qda-f) * 112%),
    var(--hb-qda-base) 100%
  );
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qda-w { transition: none; }
}
`;

function clamp(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function TextFillScroll({
  text,
  fillColor = "#ededed",
  baseColor = "#3b3b3b",
  startAt = 0.85,
  endAt = 0.4,
  idleLoop = false,
  idleDuration = 5,
  resumeDelay = 1.6,
  className = "",
  style,
  ...rest
}: TextFillScrollProps) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-w]"));
    const n = nodes.length;
    if (n === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const painted = nodes.map(() => -1);
    const holdSeconds = 1.2;
    const t0 = performance.now();
    let lastScroll = -1e9;
    let lastFrame = t0;
    let shown = 0;
    let visible = false;
    let raf = 0;

    const measure = () => {
      const box = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const span = box.height + vh * (startAt - endAt);
      return clamp((vh * startAt - box.top) / Math.max(1, span));
    };

    const paint = (p: number) => {
      for (let i = 0; i < n; i++) {
        const f = clamp(p * n - i);
        if (Math.abs(f - painted[i]) > 0.002) {
          painted[i] = f;
          nodes[i].style.setProperty("--hb-qda-f", f.toFixed(3));
        }
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.1, (now - lastFrame) / 1000);
      lastFrame = now;
      const scrolling = now - lastScroll < resumeDelay * 1000;
      let target: number;
      if (idleLoop && !scrolling && !reduce) {
        const cycle = idleDuration + holdSeconds;
        const phase = (((now - t0) / 1000) % cycle) / idleDuration;
        target = clamp(phase);
      } else {
        target = measure();
      }
      shown += (target - shown) * (reduce ? 1 : 1 - Math.exp(-dt * 7));
      paint(shown);
      if (idleLoop || Math.abs(target - shown) > 0.0008) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf && visible) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const onScroll = () => {
      lastScroll = performance.now();
      kick();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        kick();
      },
      { rootMargin: "120px" },
    );
    io.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [words, startAt, endAt, idleLoop, idleDuration, resumeDelay]);

  const vars = {
    "--hb-qda-fill": fillColor,
    "--hb-qda-base": baseColor,
    ...style,
  } as React.CSSProperties;

  return (
    <p ref={ref} className={`hb-qda ${className}`} style={vars} {...rest}>
      <style href="hb-text-fill-scroll" precedence="default">{css}</style>
      {words.map((w, i) => (
        <React.Fragment key={`${i}-${w}`}>
          <span className="hb-qda-w" data-w="">
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </p>
  );
}
