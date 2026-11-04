"use client";

import * as React from "react";

export interface TechReadoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text?: string;
  meta?: string[];
  glyphs?: string;
  duration?: number;
  size?: number;
  accent?: string;
  replayEvery?: number;
}

const css = `
.hb-qs5 {
  --hb-qs5-c: #2f7bff;
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  padding: 16px 22px 14px;
  font-family: ui-monospace, "Geist Mono", SFMono-Regular, Menlo, Consolas, monospace;
  color: #ededed;
  text-align: center;
}
.hb-qs5 *, .hb-qs5 *::before, .hb-qs5 *::after { box-sizing: border-box; }
.hb-qs5[data-state="idle"] .hb-qs5-in { opacity: 0; }
.hb-qs5-in { display: block; }
.hb-qs5-k { position: absolute; width: 14px; height: 14px; pointer-events: none; }
.hb-qs5-k::before, .hb-qs5-k::after {
  content: "";
  position: absolute;
  background: var(--hb-qs5-c);
  animation-duration: 0.55s;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-fill-mode: both;
}
.hb-qs5-k::before { height: 1.5px; width: 100%; animation-name: hb-qs5-armx; }
.hb-qs5-k::after { width: 1.5px; height: 100%; animation-name: hb-qs5-army; animation-delay: 0.12s; }
.hb-qs5-tl { top: 0; left: 0; }
.hb-qs5-tl::before { top: 0; left: 0; transform-origin: left center; }
.hb-qs5-tl::after { top: 0; left: 0; transform-origin: center top; }
.hb-qs5-tr { top: 0; right: 0; }
.hb-qs5-tr::before { top: 0; right: 0; transform-origin: right center; }
.hb-qs5-tr::after { top: 0; right: 0; transform-origin: center top; }
.hb-qs5-bl { bottom: 0; left: 0; }
.hb-qs5-bl::before { bottom: 0; left: 0; transform-origin: left center; }
.hb-qs5-bl::after { bottom: 0; left: 0; transform-origin: center bottom; }
.hb-qs5-br { bottom: 0; right: 0; }
.hb-qs5-br::before { bottom: 0; right: 0; transform-origin: right center; }
.hb-qs5-br::after { bottom: 0; right: 0; transform-origin: center bottom; }
.hb-qs5-m {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 12px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8f8f8f;
  white-space: nowrap;
}
.hb-qs5-m span { animation: hb-qs5-fade 0.5s ease both; animation-delay: calc(0.5s + var(--hb-qs5-n) * 0.14s); }
.hb-qs5-m span:first-child { color: color-mix(in srgb, var(--hb-qs5-c) 70%, #ffffff); }
.hb-qs5-tx {
  display: block;
  margin: 10px 0 9px;
  font-size: var(--hb-qs5-s, 30px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0.04em;
  white-space: pre;
}
.hb-qs5-r { color: #f4f4f4; }
.hb-qs5-x { color: var(--hb-qs5-c); opacity: 0.8; }
.hb-qs5-tk {
  display: block;
  height: 8px;
  margin-bottom: 8px;
  background:
    repeating-linear-gradient(90deg, var(--hb-qs5-c) 0 1px, transparent 1px 30px) left bottom / 100% 8px no-repeat,
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--hb-qs5-c) 55%, transparent) 0 1px, transparent 1px 6px) left bottom / 100% 4px no-repeat;
  animation: hb-qs5-tick 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}
.hb-qs5-sr {
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
@keyframes hb-qs5-armx {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes hb-qs5-army {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes hb-qs5-fade {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hb-qs5-tick {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qs5-k::before, .hb-qs5-k::after, .hb-qs5-m span, .hb-qs5-tk { animation: none; }
}
`;

function mix(a: number, b: number) {
  return (Math.imul(a + 1, 2654435761) ^ Math.imul(b + 7, 40503)) >>> 0;
}

function scramble(text: string, from: number, frame: number, glyphs: string) {
  const pool = Array.from(glyphs);
  let out = "";
  for (let i = from; i < text.length; i++) {
    out += text[i] === " " || pool.length === 0 ? text[i] : pool[mix(i, frame) % pool.length];
  }
  return out;
}

export function TechReadout({
  text = "TELEMETRY 04",
  meta = ["SYS / NOMINAL", "98.2%", "LAT 37.77", "T+00:14"],
  glyphs = "01<>/\\|#%+=[]",
  duration = 1100,
  size = 30,
  accent = "#2f7bff",
  replayEvery = 0,
  className = "",
  style,
  onPointerEnter,
  ...rest
}: TechReadoutProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const finished = React.useRef(false);
  const [mode, setMode] = React.useState<"idle" | "play" | "static">("idle");
  const [run, setRun] = React.useState(0);
  const [frame, setFrame] = React.useState<{ k: number; tail: string } | null>(null);

  const begin = React.useCallback(() => {
    finished.current = false;
    setFrame({ k: 0, tail: scramble(text, 0, 0, glyphs) });
    setRun((r) => r + 1);
  }, [text, glyphs]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setMode("static");
          return;
        }
        setMode("play");
        begin();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [begin]);

  React.useEffect(() => {
    if (run === 0) return;
    const total = Math.max(200, duration);
    const lead = total * 0.3;
    const per = (total - lead) / Math.max(1, text.length);
    const t0 = performance.now();
    let raf = 0;
    let lastKey = "";
    function tick(now: number) {
      const t = now - t0;
      const k = Math.min(text.length, Math.max(0, Math.floor((t - lead) / per) + 1));
      const f = Math.floor(t / 55);
      const key = `${k}:${f}`;
      if (key !== lastKey) {
        lastKey = key;
        setFrame({ k, tail: scramble(text, k, f, glyphs) });
      }
      if (k >= text.length) {
        finished.current = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, text, glyphs, duration]);

  React.useEffect(() => {
    if (!replayEvery || mode !== "play") return;
    const id = window.setInterval(begin, Math.max(1200, replayEvery));
    return () => window.clearInterval(id);
  }, [replayEvery, mode, begin]);

  const shown = mode === "play" && frame ? frame : { k: text.length, tail: "" };
  const slots = [meta[0], meta[1], meta[2], meta[3]];
  const vars = { "--hb-qs5-c": accent, "--hb-qs5-s": `${size}px`, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-text-tech-readout" precedence="default">{css}</style>
      <div
        ref={rootRef}
        className={`hb-qs5 ${className}`}
        style={vars}
        data-state={mode}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          if (mode === "play" && finished.current) begin();
        }}
        {...rest}
      >
        <span className="hb-qs5-sr">{text}</span>
        <span key={run} className="hb-qs5-in" aria-hidden="true">
          <span className="hb-qs5-k hb-qs5-tl" />
          <span className="hb-qs5-k hb-qs5-tr" />
          <span className="hb-qs5-k hb-qs5-bl" />
          <span className="hb-qs5-k hb-qs5-br" />
          <span className="hb-qs5-m">
            <span style={{ "--hb-qs5-n": 0 } as React.CSSProperties}>{slots[0] ?? ""}</span>
            <span style={{ "--hb-qs5-n": 1 } as React.CSSProperties}>{slots[1] ?? ""}</span>
          </span>
          <span className="hb-qs5-tx">
            <span className="hb-qs5-r">{text.slice(0, shown.k)}</span>
            <span className="hb-qs5-x">{shown.tail}</span>
          </span>
          <span className="hb-qs5-tk" />
          <span className="hb-qs5-m">
            <span style={{ "--hb-qs5-n": 2 } as React.CSSProperties}>{slots[2] ?? ""}</span>
            <span style={{ "--hb-qs5-n": 3 } as React.CSSProperties}>{slots[3] ?? ""}</span>
          </span>
        </span>
      </div>
    </>
  );
}
