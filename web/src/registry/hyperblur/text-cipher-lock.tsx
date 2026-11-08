"use client";

import * as React from "react";

export interface TextCipherLockProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  glyphs?: string;
  duration?: number;
  accent?: string;
  trigger?: "view" | "hover" | "mount";
  loop?: number;
  ticks?: boolean;
}

const css = `
@keyframes hb-vi2-flash {
  0% { color: var(--hb-vi2-accent); text-shadow: 0 0 0.5em var(--hb-vi2-glow); }
  100% { color: inherit; text-shadow: 0 0 0 transparent; }
}
@keyframes hb-vi2-tick {
  0% { transform: scaleX(0); opacity: 1; }
  45% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0; }
}
.hb-vi2 {
  position: relative;
  display: inline-block;
  font-family: inherit;
  white-space: pre-wrap;
  box-sizing: border-box;
}
.hb-vi2 *, .hb-vi2 *::before, .hb-vi2 *::after { box-sizing: border-box; }
.hb-vi2-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.hb-vi2-c {
  position: relative;
  display: inline-grid;
  justify-items: center;
}
.hb-vi2-c > span { grid-area: 1 / 1; }
.hb-vi2-k { visibility: hidden; }
.hb-vi2-n {
  color: var(--hb-vi2-dim);
  font-variant-numeric: tabular-nums;
}
.hb-vi2-on .hb-vi2-k {
  visibility: visible;
  animation: hb-vi2-flash 0.7s cubic-bezier(.22, 1, .36, 1) both;
}
.hb-vi2-on .hb-vi2-n { visibility: hidden; }
.hb-vi2-c::after {
  content: "";
  position: absolute;
  left: 8%; right: 8%;
  bottom: 0.02em;
  height: max(1px, 0.06em);
  border-radius: 1px;
  background: var(--hb-vi2-accent);
  transform: scaleX(0);
  opacity: 0;
}
.hb-vi2[data-ticks] .hb-vi2-on::after { animation: hb-vi2-tick 0.8s cubic-bezier(.22, 1, .36, 1) both; }
.hb-vi2[data-rest] .hb-vi2-on .hb-vi2-k, .hb-vi2[data-rest] .hb-vi2-on::after { animation: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-vi2 .hb-vi2-k { visibility: visible !important; animation: none !important; }
  .hb-vi2 .hb-vi2-n { visibility: hidden !important; }
  .hb-vi2 .hb-vi2-c::after { display: none; }
}
`;

function hash(n: number) {
  let x = (n | 0) ^ 0x9e3779b9;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

export function TextCipherLock({
  text,
  glyphs = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=?",
  duration = 1.6,
  accent = "#7fb3ff",
  trigger = "view",
  loop = 0,
  ticks = true,
  className = "",
  style,
  onMouseEnter,
  onFocus,
  ...rest
}: TextCipherLockProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const chars = React.useMemo(() => Array.from(text), [text]);
  const order = React.useMemo(() => {
    const idx = chars.map((_, i) => i).filter((i) => chars[i].trim() !== "");
    const ranked = idx
      .map((i) => ({ i, k: hash(i * 7919 + chars.length) % 1000 + i * 38 }))
      .sort((a, b) => a.k - b.k);
    const at = new Array<number>(chars.length).fill(0);
    ranked.forEach((r, n) => {
      at[r.i] = ranked.length > 1 ? 0.18 + (n / (ranked.length - 1)) * 0.82 : 1;
    });
    return at;
  }, [chars]);
  const [progress, setProgress] = React.useState(trigger === "hover" ? 1 : 0);
  const [frame, setFrame] = React.useState(0);
  const [run, setRun] = React.useState(0);
  const running = React.useRef(false);

  const start = React.useCallback(() => {
    if (running.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    running.current = true;
    setProgress(0);
    setRun((r) => r + 1);
  }, []);

  React.useEffect(() => {
    if (run === 0) return;
    let raf = 0;
    let begin = 0;
    let last = 0;
    const tick = (now: number) => {
      if (!begin) begin = now;
      const p = Math.min(1, (now - begin) / (duration * 1000));
      setProgress(p);
      if (now - last > 46) {
        last = now;
        setFrame((f) => f + 1);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else running.current = false;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      running.current = false;
    };
  }, [run, duration]);

  React.useEffect(() => {
    if (trigger === "hover") return;
    if (trigger === "mount") {
      const id = requestAnimationFrame(start);
      return () => cancelAnimationFrame(id);
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(start);
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, start]);

  React.useEffect(() => {
    if (loop <= 0 || progress < 1 || run === 0) return;
    const id = setTimeout(start, loop * 1000);
    return () => clearTimeout(id);
  }, [loop, progress, run, start]);

  const vars = {
    "--hb-vi2-accent": accent,
    "--hb-vi2-glow": `color-mix(in srgb, ${accent} 55%, transparent)`,
    "--hb-vi2-dim": `color-mix(in srgb, currentColor 42%, transparent)`,
    ...style,
  } as React.CSSProperties;

  const pool = glyphs.length ? glyphs : "#";

  return (
    <span
      ref={ref}
      className={`hb-vi2 ${className}`}
      style={vars}
      data-ticks={ticks ? "" : undefined}
      data-rest={run === 0 ? "" : undefined}
      onMouseEnter={(e) => {
        if (trigger === "hover") start();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        if (trigger === "hover") start();
        onFocus?.(e);
      }}
      {...rest}
    >
      <style href="hb-text-cipher-lock" precedence="default">{css}</style>
      <span className="hb-vi2-sr">{text}</span>
      <span aria-hidden="true">
        {chars.map((ch, i) => {
          if (ch.trim() === "") return <React.Fragment key={i}>{ch}</React.Fragment>;
          const locked = progress >= order[i];
          const g = pool[hash(i * 131 + frame * 17 + run) % pool.length];
          return (
            <span key={i} className={`hb-vi2-c${locked ? " hb-vi2-on" : ""}`}>
              <span className="hb-vi2-k">{ch}</span>
              <span className="hb-vi2-n">{g}</span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
