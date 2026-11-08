"use client";

import * as React from "react";

export interface TextRackFocusProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  focus?: string;
  duration?: number;
  maxBlur?: number;
  aberration?: boolean;
  trigger?: "view" | "mount";
  loop?: number;
}

const css = `
.hb-vi12 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  white-space: pre-wrap;
  box-sizing: border-box;
}
.hb-vi12 *, .hb-vi12 *::before, .hb-vi12 *::after { box-sizing: border-box; }
.hb-vi12-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi12-w { display: inline-block; white-space: nowrap; }
.hb-vi12-c {
  display: inline-block;
  filter: blur(var(--hb-vi12-max));
  opacity: 0.55;
  transform: scale(1.06);
  will-change: filter, transform;
}
@media (prefers-reduced-motion: reduce) {
  .hb-vi12 .hb-vi12-c { filter: none !important; opacity: 1 !important; transform: none !important; text-shadow: none !important; will-change: auto; }
}
`;

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - clamp(t), 3);
}

function easeInOut(t: number) {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function TextRackFocus({
  text,
  focus,
  duration = 2.2,
  maxBlur = 10,
  aberration = true,
  trigger = "view",
  loop = 0,
  className = "",
  style,
  ...rest
}: TextRackFocusProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const cells = React.useRef<(HTMLSpanElement | null)[]>([]);
  const words = React.useMemo(() => text.split(/(\s+)/), [text]);
  const letters = React.useMemo(() => Array.from(text).filter((c) => c.trim() !== ""), [text]);
  const total = letters.length;
  const target = React.useMemo(() => {
    if (total < 2) return 0.5;
    if (focus) {
      const at = text.toLowerCase().indexOf(focus.toLowerCase());
      if (at >= 0) {
        const before = Array.from(text.slice(0, at)).filter((c) => c.trim() !== "").length;
        const len = Array.from(focus).filter((c) => c.trim() !== "").length;
        return (before + (len - 1) / 2) / (total - 1);
      }
    }
    return 0.5;
  }, [text, focus, total]);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const list = cells.current.slice(0, total);
    let raf = 0;
    let timer = 0;
    let begin = 0;
    let phase: "idle" | "in" | "out" = "idle";

    const paint = (f: number, w: number, k: number) => {
      list.forEach((el, i) => {
        if (!el) return;
        const x = total > 1 ? i / (total - 1) : 0.5;
        const off = clamp((Math.abs(x - f) - w) / 0.32);
        const amt = Math.max(off, k);
        const b = maxBlur * amt;
        el.style.filter = b < 0.05 ? "none" : `blur(${b.toFixed(2)}px)`;
        el.style.opacity = (0.5 + 0.5 * (1 - amt)).toFixed(3);
        el.style.transform = `scale(${(1 + amt * 0.06).toFixed(4)})`;
        if (aberration && b > 0.4) {
          const a = (b * 0.32).toFixed(2);
          el.style.textShadow = `-${a}px 0 rgba(255, 70, 110, 0.55), ${a}px 0 rgba(70, 180, 255, 0.55)`;
        } else {
          el.style.textShadow = "none";
        }
      });
    };

    const frame = (now: number) => {
      if (!begin) begin = now;
      const elapsed = (now - begin) / 1000;
      if (phase === "in") {
        const p = elapsed / duration;
        const f = -0.35 + (target + 0.35) * easeOut(p / 0.55);
        const w = 0.05 + 2 * easeInOut((p - 0.5) / 0.5);
        paint(f, w, 0);
        if (p < 1) raf = requestAnimationFrame(frame);
        else {
          paint(target, 3, 0);
          if (loop > 0) {
            timer = window.setTimeout(() => {
              phase = "out";
              begin = 0;
              raf = requestAnimationFrame(frame);
            }, loop * 1000);
          }
        }
      } else if (phase === "out") {
        const p = elapsed / 0.6;
        paint(target, 3, easeInOut(p));
        if (p < 1) raf = requestAnimationFrame(frame);
        else {
          timer = window.setTimeout(() => {
            phase = "in";
            begin = 0;
            raf = requestAnimationFrame(frame);
          }, 260);
        }
      }
    };

    const start = () => {
      if (phase !== "idle") return;
      phase = "in";
      begin = 0;
      raf = requestAnimationFrame(frame);
    };

    let io: IntersectionObserver | null = null;
    if (trigger === "mount" || typeof IntersectionObserver === "undefined") start();
    else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
            io?.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(root);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io?.disconnect();
    };
  }, [total, target, duration, maxBlur, aberration, trigger, loop, words]);

  const vars = { "--hb-vi12-max": `${maxBlur}px`, ...style } as React.CSSProperties;
  let n = 0;

  return (
    <span ref={ref} className={`hb-vi12 ${className}`} style={vars} {...rest}>
      <style href="hb-text-rack-focus" precedence="default">{css}</style>
      <span className="hb-vi12-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => {
          if (word.trim() === "") return <React.Fragment key={wi}>{word}</React.Fragment>;
          return (
            <span className="hb-vi12-w" key={wi}>
              {Array.from(word).map((ch, ci) => {
                const i = n++;
                return (
                  <span
                    key={ci}
                    className="hb-vi12-c"
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
    </span>
  );
}
