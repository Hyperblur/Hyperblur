"use client";

import * as React from "react";

export interface ButtonWaveLettersProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children"> {
  label?: string;
  accent?: string;
  stagger?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa7 {
  --hb-xa7-c: #5eead4;
  --hb-xa7-st: 45ms;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.95em 1.5em 1.05em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #ededed;
  background: #0f1312;
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px #24302d, inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 26px -16px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.35s ease, background 0.35s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa7 *, .hb-xa7 *::before, .hb-xa7 *::after { box-sizing: border-box; }
.hb-xa7[data-size="sm"] { font-size: 13px; }
.hb-xa7[data-size="lg"] { font-size: 17px; }
.hb-xa7:hover:not(:disabled), .hb-xa7:focus-visible {
  background: #0e1716;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-xa7-c) 40%, #24302d), inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 12px 30px -16px color-mix(in srgb, var(--hb-xa7-c) 45%, transparent);
}
.hb-xa7:active:not(:disabled) { transform: scale(0.97); }
.hb-xa7:focus-visible { outline: 2px solid var(--hb-xa7-c); outline-offset: 3px; }
.hb-xa7:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa7-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hb-xa7-word { position: relative; display: inline-flex; white-space: pre; }
.hb-xa7-ch {
  display: inline-block;
  transition: color 0.3s ease;
  animation-delay: calc(var(--hb-xa7-i) * var(--hb-xa7-st));
}
.hb-xa7:hover:not(:disabled) .hb-xa7-ch,
.hb-xa7:focus-visible .hb-xa7-ch { animation: hb-xa7-wave 1.5s cubic-bezier(0.45, 0, 0.55, 1) infinite; animation-delay: calc(var(--hb-xa7-i) * var(--hb-xa7-st)); }
.hb-xa7-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.55em;
  height: 0.45em;
  overflow: hidden;
  color: var(--hb-xa7-c);
}
.hb-xa7-line svg {
  display: block;
  width: 200%;
  height: 100%;
  transform: translateX(0);
}
.hb-xa7-line path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.6s cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-xa7:hover:not(:disabled) .hb-xa7-line path,
.hb-xa7:focus-visible .hb-xa7-line path { stroke-dashoffset: 0; }
.hb-xa7:hover:not(:disabled) .hb-xa7-line svg,
.hb-xa7:focus-visible .hb-xa7-line svg { animation: hb-xa7-slide 1.2s linear infinite; }
.hb-xa7-dot {
  width: 0.5em;
  height: 0.5em;
  flex: none;
  border-radius: 50%;
  background: var(--hb-xa7-c);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xa7-c) 20%, transparent), 0 0 10px var(--hb-xa7-c);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xa7:hover:not(:disabled) .hb-xa7-dot { transform: scale(1.25); }
@keyframes hb-xa7-wave {
  0%, 60%, 100% { transform: translateY(0) scale(1); color: #ededed; }
  20% { transform: translateY(-0.32em) scale(1.08); color: var(--hb-xa7-c); }
  40% { transform: translateY(0.06em) scale(0.98); color: #ededed; }
}
@keyframes hb-xa7-slide { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa7, .hb-xa7-ch, .hb-xa7-line path, .hb-xa7-dot { transition: none; }
  .hb-xa7:hover:not(:disabled) .hb-xa7-ch, .hb-xa7:focus-visible .hb-xa7-ch,
  .hb-xa7:hover:not(:disabled) .hb-xa7-line svg, .hb-xa7:focus-visible .hb-xa7-line svg { animation: none; }
}
`;

export function ButtonWaveLetters({
  label = "Start free trial",
  accent = "#5eead4",
  stagger = 45,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonWaveLettersProps) {
  const chars = Array.from(label);
  const vars = {
    "--hb-xa7-c": accent,
    "--hb-xa7-st": `${Math.max(0, stagger).toFixed(0)}ms`,
    ...style,
  } as React.CSSProperties;
  const wave = "M0 5 Q 5 1 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5 T 110 5 T 120 5 T 130 5 T 140 5 T 150 5 T 160 5";

  return (
    <>
      <style href="hb-button-wave-letters" precedence="default">{css}</style>
      <button type={type} className={`hb-xa7 ${className}`} style={vars} data-size={size} {...rest}>
        <span className="hb-xa7-dot" aria-hidden="true" />
        <span className="hb-xa7-sr">{label}</span>
        <span className="hb-xa7-word" aria-hidden="true">
          {chars.map((ch, i) => (
            <span className="hb-xa7-ch" style={{ "--hb-xa7-i": i } as React.CSSProperties} key={i}>
              {ch}
            </span>
          ))}
          <span className="hb-xa7-line">
            <svg viewBox="0 0 160 10" preserveAspectRatio="none" fill="none">
              <path d={wave} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" pathLength={1} vectorEffect="non-scaling-stroke" />
            </svg>
          </span>
        </span>
      </button>
    </>
  );
}
