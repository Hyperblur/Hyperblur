"use client";

import * as React from "react";

export interface ButtonDotMatrixProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  accent?: string;
  pitch?: number;
  status?: string;
  size?: "sm" | "md" | "lg";
}

const css = `
@property --hb-xa10-r {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
.hb-xa10 {
  --hb-xa10-c: #3dffa2;
  --hb-xa10-p: 6px;
  --hb-xa10-x: 50%;
  --hb-xa10-y: 50%;
  --hb-xa10-cx: 50%;
  --hb-xa10-cy: 50%;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.95em 1.4em;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e9fff3;
  background: #07100b;
  border: 0;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px #17301f, inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 12px 28px -18px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa10 *, .hb-xa10 *::before, .hb-xa10 *::after { box-sizing: border-box; }
.hb-xa10[data-size="sm"] { font-size: 11px; }
.hb-xa10[data-size="lg"] { font-size: 15px; }
.hb-xa10:hover:not(:disabled), .hb-xa10:focus-visible { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xa10-c) 45%, #17301f), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 32px -18px color-mix(in srgb, var(--hb-xa10-c) 55%, transparent); }
.hb-xa10:active:not(:disabled) { transform: scale(0.97); }
.hb-xa10:focus-visible { outline: 2px solid var(--hb-xa10-c); outline-offset: 3px; }
.hb-xa10:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa10-dots, .hb-xa10-lit, .hb-xa10-scan, .hb-xa10-ring {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: radial-gradient(circle, var(--hb-xa10-dc) 0.9px, transparent 1.3px);
  background-size: var(--hb-xa10-p) var(--hb-xa10-p);
  background-position: center;
}
.hb-xa10-dots { --hb-xa10-dc: color-mix(in srgb, var(--hb-xa10-c) 16%, #0f1a14); }
.hb-xa10-lit {
  --hb-xa10-dc: var(--hb-xa10-c);
  opacity: 0;
  transition: opacity 0.35s ease;
  -webkit-mask: radial-gradient(60px circle at var(--hb-xa10-x) var(--hb-xa10-y), #000, rgba(0, 0, 0, 0.35) 45%, transparent 75%);
  mask: radial-gradient(60px circle at var(--hb-xa10-x) var(--hb-xa10-y), #000, rgba(0, 0, 0, 0.35) 45%, transparent 75%);
  filter: drop-shadow(0 0 2px var(--hb-xa10-c));
}
.hb-xa10:hover:not(:disabled) .hb-xa10-lit, .hb-xa10:focus-visible .hb-xa10-lit { opacity: 1; }
.hb-xa10-scan {
  --hb-xa10-dc: color-mix(in srgb, var(--hb-xa10-c) 70%, transparent);
  -webkit-mask: linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%) no-repeat;
  mask: linear-gradient(90deg, transparent 0%, #000 50%, transparent 100%) no-repeat;
  -webkit-mask-size: 30% 100%;
  mask-size: 30% 100%;
  animation: hb-xa10-scan 3.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  transition: opacity 0.3s ease;
}
.hb-xa10:hover:not(:disabled) .hb-xa10-scan, .hb-xa10:focus-visible .hb-xa10-scan { opacity: 0; }
.hb-xa10-ring {
  --hb-xa10-dc: #fff;
  --hb-xa10-r: 0px;
  opacity: 0;
  -webkit-mask: radial-gradient(circle at var(--hb-xa10-cx) var(--hb-xa10-cy), transparent calc(var(--hb-xa10-r) - 16px), #000 var(--hb-xa10-r), transparent calc(var(--hb-xa10-r) + 10px));
  mask: radial-gradient(circle at var(--hb-xa10-cx) var(--hb-xa10-cy), transparent calc(var(--hb-xa10-r) - 16px), #000 var(--hb-xa10-r), transparent calc(var(--hb-xa10-r) + 10px));
  filter: drop-shadow(0 0 3px var(--hb-xa10-c));
}
.hb-xa10[data-pulse="a"] .hb-xa10-ring { animation: hb-xa10-ra 0.9s cubic-bezier(0.2, 0.7, 0.3, 1); }
.hb-xa10[data-pulse="b"] .hb-xa10-ring { animation: hb-xa10-rb 0.9s cubic-bezier(0.2, 0.7, 0.3, 1); }
.hb-xa10-led {
  position: relative;
  width: 0.62em;
  height: 0.62em;
  flex: none;
  border-radius: 2px;
  background: var(--hb-xa10-c);
  box-shadow: 0 0 8px var(--hb-xa10-c), inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  animation: hb-xa10-blink 2.2s steps(1, end) infinite;
}
.hb-xa10-label { white-space: nowrap; text-shadow: 0 0 12px color-mix(in srgb, var(--hb-xa10-c) 40%, transparent); }
.hb-xa10-status {
  padding: 0.35em 0.5em;
  font-size: 0.78em;
  letter-spacing: 0.08em;
  color: var(--hb-xa10-c);
  background: color-mix(in srgb, var(--hb-xa10-c) 10%, transparent);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xa10-c) 30%, transparent);
  white-space: nowrap;
}
@keyframes hb-xa10-scan {
  0% { -webkit-mask-position: -40% 0; mask-position: -40% 0; }
  100% { -webkit-mask-position: 140% 0; mask-position: 140% 0; }
}
@keyframes hb-xa10-ra { 0% { opacity: 1; --hb-xa10-r: 0px; } 100% { opacity: 0; --hb-xa10-r: 220px; } }
@keyframes hb-xa10-rb { 0% { opacity: 1; --hb-xa10-r: 0px; } 100% { opacity: 0; --hb-xa10-r: 220px; } }
@keyframes hb-xa10-blink { 0%, 86% { opacity: 1; } 90% { opacity: 0.25; } 94% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa10, .hb-xa10-lit, .hb-xa10-scan { transition: none; }
  .hb-xa10-scan { animation: none; opacity: 0; }
  .hb-xa10-led { animation: none; }
  .hb-xa10[data-pulse] .hb-xa10-ring { animation: none; }
}
`;

export function ButtonDotMatrix({
  children = "Deploy to edge",
  accent = "#3dffa2",
  pitch = 6,
  status = "v2.4.1",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  style,
  onClick,
  onPointerMove,
  ...rest
}: ButtonDotMatrixProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [pulse, setPulse] = React.useState<"a" | "b" | undefined>(undefined);

  function pos(e: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>, kx: string, ky: string) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const hasPoint = e.clientX !== 0 || e.clientY !== 0;
    const x = hasPoint ? e.clientX - r.left : r.width / 2;
    const y = hasPoint ? e.clientY - r.top : r.height / 2;
    el.style.setProperty(kx, `${x.toFixed(1)}px`);
    el.style.setProperty(ky, `${y.toFixed(1)}px`);
  }

  const vars = {
    "--hb-xa10-c": accent,
    "--hb-xa10-p": `${Math.max(3, pitch).toFixed(1)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-dot-matrix" precedence="default">{css}</style>
      <button
        ref={ref}
        type={type}
        className={`hb-xa10 ${className}`}
        style={vars}
        data-size={size}
        data-pulse={pulse}
        disabled={disabled}
        onPointerMove={(e) => {
          pos(e, "--hb-xa10-x", "--hb-xa10-y");
          onPointerMove?.(e);
        }}
        onClick={(e) => {
          pos(e, "--hb-xa10-cx", "--hb-xa10-cy");
          setPulse((p) => (p === "a" ? "b" : "a"));
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-xa10-dots" aria-hidden="true" />
        <span className="hb-xa10-scan" aria-hidden="true" />
        <span className="hb-xa10-lit" aria-hidden="true" />
        <span className="hb-xa10-ring" aria-hidden="true" />
        <span className="hb-xa10-led" aria-hidden="true" />
        <span className="hb-xa10-label">{children}</span>
        {status ? <span className="hb-xa10-status">{status}</span> : null}
      </button>
    </>
  );
}
