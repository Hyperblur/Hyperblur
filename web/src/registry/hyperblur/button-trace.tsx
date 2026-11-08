"use client";

import * as React from "react";

export interface ButtonTraceProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  accent?: string;
  radius?: number;
  duration?: number;
  size?: "sm" | "md" | "lg";
  shortcut?: string;
}

const css = `
.hb-xa12 {
  --hb-xa12-c: #7fb3ff;
  --hb-xa12-t: 0.9s;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.65em;
  box-sizing: border-box;
  margin: 0;
  padding: 1em 1.6em;
  font-family: var(--font-grotesk, inherit);
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.005em;
  color: #e6e6e6;
  background: #0d0d0f;
  border: 0;
  box-shadow: inset 0 0 0 1px #2a2a2e, 0 12px 28px -18px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.4s ease, background 0.4s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa12 *, .hb-xa12 *::before, .hb-xa12 *::after { box-sizing: border-box; }
.hb-xa12[data-size="sm"] { font-size: 13px; }
.hb-xa12[data-size="lg"] { font-size: 17px; }
.hb-xa12:hover:not(:disabled), .hb-xa12:focus-visible { color: #fff; background: #0f1219; }
.hb-xa12:active:not(:disabled) { transform: scale(0.98); }
.hb-xa12:focus-visible { outline: 2px solid var(--hb-xa12-c); outline-offset: 5px; }
.hb-xa12:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa12-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: 1;
}
.hb-xa12-draw {
  fill: none;
  stroke: var(--hb-xa12-c);
  stroke-width: 1.4;
  stroke-dasharray: 100 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset var(--hb-xa12-t) cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-xa12-head {
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 6 94;
  stroke-dashoffset: 6;
  opacity: 0;
  filter: drop-shadow(0 0 4px var(--hb-xa12-c));
}
.hb-xa12:hover:not(:disabled) .hb-xa12-draw,
.hb-xa12:focus-visible .hb-xa12-draw { stroke-dashoffset: 0; }
.hb-xa12:hover:not(:disabled) .hb-xa12-head,
.hb-xa12:focus-visible .hb-xa12-head { animation: hb-xa12-lead var(--hb-xa12-t) cubic-bezier(0.7, 0, 0.2, 1), hb-xa12-orbit 3.2s linear var(--hb-xa12-t) infinite; }
.hb-xa12-fill { fill: var(--hb-xa12-c); opacity: 0; }
.hb-xa12[data-flash="a"] .hb-xa12-fill { animation: hb-xa12-fa 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-xa12[data-flash="b"] .hb-xa12-fill { animation: hb-xa12-fb 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-xa12-tick {
  position: absolute;
  width: 7px;
  height: 7px;
  z-index: 2;
  border-color: color-mix(in srgb, var(--hb-xa12-c) 70%, #fff);
  border-style: solid;
  border-width: 0;
  opacity: 0.55;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  pointer-events: none;
}
.hb-xa12-tick[data-k="tl"] { left: -4px; top: -4px; border-left-width: 1.5px; border-top-width: 1.5px; }
.hb-xa12-tick[data-k="tr"] { right: -4px; top: -4px; border-right-width: 1.5px; border-top-width: 1.5px; }
.hb-xa12-tick[data-k="bl"] { left: -4px; bottom: -4px; border-left-width: 1.5px; border-bottom-width: 1.5px; }
.hb-xa12-tick[data-k="br"] { right: -4px; bottom: -4px; border-right-width: 1.5px; border-bottom-width: 1.5px; }
.hb-xa12:hover:not(:disabled) .hb-xa12-tick, .hb-xa12:focus-visible .hb-xa12-tick { opacity: 1; }
.hb-xa12:hover:not(:disabled) .hb-xa12-tick[data-k="tl"], .hb-xa12:focus-visible .hb-xa12-tick[data-k="tl"] { transform: translate(-3px, -3px); }
.hb-xa12:hover:not(:disabled) .hb-xa12-tick[data-k="tr"], .hb-xa12:focus-visible .hb-xa12-tick[data-k="tr"] { transform: translate(3px, -3px); }
.hb-xa12:hover:not(:disabled) .hb-xa12-tick[data-k="bl"], .hb-xa12:focus-visible .hb-xa12-tick[data-k="bl"] { transform: translate(-3px, 3px); }
.hb-xa12:hover:not(:disabled) .hb-xa12-tick[data-k="br"], .hb-xa12:focus-visible .hb-xa12-tick[data-k="br"] { transform: translate(3px, 3px); }
.hb-xa12-label { position: relative; z-index: 2; white-space: nowrap; }
.hb-xa12-kbd {
  position: relative;
  z-index: 2;
  padding: 0.3em 0.45em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.72em;
  color: #8f8f8f;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #2a2a2e;
  transition: color 0.3s ease, box-shadow 0.3s ease;
}
.hb-xa12:hover:not(:disabled) .hb-xa12-kbd, .hb-xa12:focus-visible .hb-xa12-kbd { color: var(--hb-xa12-c); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xa12-c) 45%, transparent); }
@keyframes hb-xa12-lead { 0% { opacity: 1; stroke-dashoffset: 106; } 100% { opacity: 1; stroke-dashoffset: 6; } }
@keyframes hb-xa12-orbit { 0% { opacity: 1; stroke-dashoffset: 6; } 100% { opacity: 1; stroke-dashoffset: -94; } }
@keyframes hb-xa12-fa { 0% { opacity: 0.22; } 100% { opacity: 0; } }
@keyframes hb-xa12-fb { 0% { opacity: 0.22; } 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa12, .hb-xa12-draw, .hb-xa12-tick, .hb-xa12-kbd { transition: none; }
  .hb-xa12:hover:not(:disabled) .hb-xa12-head, .hb-xa12:focus-visible .hb-xa12-head,
  .hb-xa12[data-flash] .hb-xa12-fill { animation: none; }
}
`;

export function ButtonTrace({
  children = "Request access",
  accent = "#7fb3ff",
  radius = 4,
  duration = 0.9,
  size = "md",
  shortcut = "R",
  type = "button",
  disabled = false,
  className = "",
  style,
  onClick,
  ...rest
}: ButtonTraceProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  const [flash, setFlash] = React.useState<"a" | "b" | undefined>(undefined);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const r = Math.max(0, Math.min(radius, box.h / 2));
  const vars = {
    "--hb-xa12-c": accent,
    "--hb-xa12-t": `${Math.max(0.1, duration).toFixed(2)}s`,
    borderRadius: `${r}px`,
    ...style,
  } as React.CSSProperties;
  const rect = { x: 0.5, y: 0.5, width: Math.max(0, box.w - 1), height: Math.max(0, box.h - 1), rx: r, pathLength: 100 };

  return (
    <>
      <style href="hb-button-trace" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-xa12 ${className}`}
        style={vars}
        data-size={size}
        data-flash={flash}
        disabled={disabled}
        onClick={(e) => {
          setFlash((f) => (f === "a" ? "b" : "a"));
          onClick?.(e);
        }}
        {...rest}
      >
        {box.w > 0 ? (
          <svg className="hb-xa12-svg" aria-hidden="true">
            <rect className="hb-xa12-fill" {...rect} />
            <rect className="hb-xa12-draw" {...rect} />
            <rect className="hb-xa12-head" {...rect} />
          </svg>
        ) : null}
        <span className="hb-xa12-tick" data-k="tl" aria-hidden="true" />
        <span className="hb-xa12-tick" data-k="tr" aria-hidden="true" />
        <span className="hb-xa12-tick" data-k="bl" aria-hidden="true" />
        <span className="hb-xa12-tick" data-k="br" aria-hidden="true" />
        <span className="hb-xa12-label">{children}</span>
        {shortcut ? <kbd className="hb-xa12-kbd" aria-hidden="true">{shortcut}</kbd> : null}
      </button>
    </>
  );
}
