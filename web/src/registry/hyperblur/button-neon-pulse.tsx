"use client";

import * as React from "react";

export interface ButtonNeonPulseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: "outline" | "filled";
  accent?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const css = `
.hb-qa5 {
  --hb-qa5-c: #ff3df0;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.8em 1.8em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1.2;
  color: color-mix(in srgb, var(--hb-qa5-c) 55%, #ffffff);
  background: color-mix(in srgb, var(--hb-qa5-c) 5%, #070707);
  border: 1.5px solid var(--hb-qa5-c);
  border-radius: 999px;
  text-shadow: 0 0 10px color-mix(in srgb, var(--hb-qa5-c) 70%, transparent);
  box-shadow: inset 0 0 12px color-mix(in srgb, var(--hb-qa5-c) 28%, transparent), 0 0 14px color-mix(in srgb, var(--hb-qa5-c) 35%, transparent);
  animation: hb-qa5-breathe 2.8s ease-in-out infinite;
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.25s ease, color 0.25s ease;
}
.hb-qa5[data-size="sm"] { font-size: 13px; }
.hb-qa5[data-size="lg"] { font-size: 17px; }
.hb-qa5[data-variant="filled"] {
  color: #08060a;
  background: var(--hb-qa5-c);
  text-shadow: none;
}
.hb-qa5-rc {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}
.hb-qa5-r {
  position: absolute;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid color-mix(in srgb, var(--hb-qa5-c) 40%, #ffffff);
  border-radius: 50%;
  box-shadow: 0 0 14px var(--hb-qa5-c);
  transform: scale(0.2);
  opacity: 0.95;
  animation: hb-qa5-ring 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.hb-qa5-t { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 0.6em; white-space: nowrap; }
.hb-qa5:hover:not(:disabled), .hb-qa5:focus-visible:not(:disabled) {
  background: color-mix(in srgb, var(--hb-qa5-c) 14%, #070707);
  color: #ffffff;
}
.hb-qa5[data-variant="filled"]:hover:not(:disabled), .hb-qa5[data-variant="filled"]:focus-visible:not(:disabled) {
  background: color-mix(in srgb, var(--hb-qa5-c) 82%, #ffffff);
  color: #08060a;
}
.hb-qa5:hover:not(:disabled), .hb-qa5:focus-visible:not(:disabled) { animation-duration: 1.4s; }
.hb-qa5:active:not(:disabled) { transform: scale(0.96); }
.hb-qa5:focus-visible { outline: 2px solid color-mix(in srgb, var(--hb-qa5-c) 60%, #ffffff); outline-offset: 4px; }
.hb-qa5:disabled { cursor: not-allowed; }
.hb-qa5:disabled:not([aria-busy="true"]) { opacity: 0.4; }
.hb-qa5:disabled { animation: none; box-shadow: inset 0 0 8px color-mix(in srgb, var(--hb-qa5-c) 18%, transparent); }
.hb-qa5-sp {
  width: 1em;
  height: 1em;
  flex: none;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: hb-qa5-spin 0.7s linear infinite;
}
@keyframes hb-qa5-spin { to { transform: rotate(360deg); } }
@keyframes hb-qa5-breathe {
  0%, 100% {
    box-shadow: inset 0 0 10px color-mix(in srgb, var(--hb-qa5-c) 22%, transparent), 0 0 8px color-mix(in srgb, var(--hb-qa5-c) 28%, transparent), 0 0 0 0 transparent;
  }
  50% {
    box-shadow: inset 0 0 16px color-mix(in srgb, var(--hb-qa5-c) 40%, transparent), 0 0 20px color-mix(in srgb, var(--hb-qa5-c) 60%, transparent), 0 0 44px 2px color-mix(in srgb, var(--hb-qa5-c) 24%, transparent);
  }
}
@keyframes hb-qa5-ring {
  to { transform: scale(9); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qa5 { transition: none; }
  .hb-qa5 { animation: none; }
  .hb-qa5-r { animation-duration: 0.01s; }
  .hb-qa5:active:not(:disabled) { transform: none; }
  .hb-qa5-sp { animation-duration: 1.6s; }
}
`;

export function ButtonNeonPulse({
  children = "Get tickets",
  variant = "outline",
  accent = "#ff3df0",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ButtonNeonPulseProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const counter = React.useRef(0);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const keyboard = e.detail === 0;
    const x = keyboard ? rect.width / 2 : e.clientX - rect.left;
    const y = keyboard ? rect.height / 2 : e.clientY - rect.top;
    counter.current += 1;
    const id = counter.current;
    setRipples((list) => [...list.slice(-3), { id, x, y }]);
    onClick?.(e);
  }

  const vars = { "--hb-qa5-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-neon-pulse" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-qa5 ${className}`}
        style={vars}
        data-variant={variant}
        data-size={size}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onClick={handleClick}
        {...rest}
      >
        <span className="hb-qa5-rc" aria-hidden="true">
          {ripples.map((r) => (
            <span
              key={r.id}
              className="hb-qa5-r"
              style={{ left: `${r.x.toFixed(1)}px`, top: `${r.y.toFixed(1)}px` }}
              onAnimationEnd={() => setRipples((list) => list.filter((item) => item.id !== r.id))}
            />
          ))}
        </span>
        <span className="hb-qa5-t">
          {loading ? <span className="hb-qa5-sp" aria-hidden="true" /> : null}
          {children}
        </span>
      </button>
    </>
  );
}
