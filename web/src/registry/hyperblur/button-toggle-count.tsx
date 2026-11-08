"use client";

import * as React from "react";

export type ButtonToggleCountKind = "like" | "save" | "bookmark" | "star";

export interface ButtonToggleCountProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "children"> {
  kind?: ButtonToggleCountKind;
  count?: number;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  label?: string;
  accent?: string;
  icon?: React.ReactNode;
  compact?: boolean;
}

const css = `
.hb-xb6 {
  --hb-xb6-c: #ff4d6d;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  height: 38px;
  margin: 0;
  padding: 0 14px 0 11px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #d4d4d4;
  background: linear-gradient(180deg, #1b1b1b, #141414);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px #2a2a2a, 0 6px 14px -8px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.3s ease, box-shadow 0.35s ease, background 0.35s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xb6 *, .hb-xb6 *::before, .hb-xb6 *::after { box-sizing: border-box; }
.hb-xb6:hover:not(:disabled) { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px #363636, 0 6px 14px -8px rgba(0, 0, 0, 0.9); color: #ededed; }
.hb-xb6:active:not(:disabled) { transform: scale(0.95); }
.hb-xb6:focus-visible { outline: 2px solid var(--hb-xb6-c); outline-offset: 3px; }
.hb-xb6:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xb6[aria-pressed="true"] {
  color: color-mix(in srgb, var(--hb-xb6-c) 40%, #fff);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xb6-c) 16%, #161616), color-mix(in srgb, var(--hb-xb6-c) 8%, #121212));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), inset 0 0 0 1px color-mix(in srgb, var(--hb-xb6-c) 45%, transparent), 0 8px 22px -12px var(--hb-xb6-c);
}
.hb-xb6[data-compact="true"] { height: 32px; padding: 0 11px 0 9px; font-size: 13px; gap: 6px; }
.hb-xb6-ic { position: relative; width: 20px; height: 20px; flex: none; display: grid; place-items: center; }
.hb-xb6[data-compact="true"] .hb-xb6-ic { width: 17px; height: 17px; }
.hb-xb6-ic svg { position: absolute; inset: 0; width: 100%; height: 100%; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.hb-xb6-o { fill: none; stroke: currentColor; }
.hb-xb6-f { fill: var(--hb-xb6-c); stroke: var(--hb-xb6-c); clip-path: inset(100% 0 0 0); transition: clip-path 0.45s cubic-bezier(0.65, 0, 0.35, 1); }
.hb-xb6[aria-pressed="true"] .hb-xb6-f { clip-path: inset(0 0 0 0); }
.hb-xb6[data-pop="true"] .hb-xb6-ic { animation: hb-xb6-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xb6[data-pop="false"] .hb-xb6-ic { animation: hb-xb6-dip 0.35s ease; }
.hb-xb6-spark { position: absolute; left: 50%; top: 50%; width: 3px; height: 3px; margin: -1.5px; border-radius: 50%; background: var(--hb-xb6-c); opacity: 0; pointer-events: none; }
.hb-xb6[data-pop="true"] .hb-xb6-spark { animation: hb-xb6-spark 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.06s; }
.hb-xb6-ring { position: absolute; inset: -4px; border-radius: 50%; border: 1.5px solid var(--hb-xb6-c); opacity: 0; pointer-events: none; }
.hb-xb6[data-pop="true"] .hb-xb6-ring { animation: hb-xb6-ring 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xb6-num { display: inline-flex; font-variant-numeric: tabular-nums; height: 1.2em; line-height: 1.2em; overflow: hidden; }
.hb-xb6-col { display: inline-block; height: 1.2em; overflow: hidden; }
.hb-xb6-reel { display: flex; flex-direction: column; transform: translateY(calc(var(--hb-xb6-d) * -1.2em)); transition: transform 0.55s cubic-bezier(0.34, 1.3, 0.64, 1) var(--hb-xb6-dl, 0s); }
.hb-xb6-reel > span { height: 1.2em; display: block; text-align: center; }
.hb-xb6-sep { display: inline-block; }
@keyframes hb-xb6-pop { 0% { transform: scale(1); } 30% { transform: scale(0.7) rotate(-8deg); } 60% { transform: scale(1.28) rotate(4deg); } 100% { transform: scale(1) rotate(0); } }
@keyframes hb-xb6-dip { 0% { transform: scale(1); } 40% { transform: scale(0.82); } 100% { transform: scale(1); } }
@keyframes hb-xb6-spark { 0% { opacity: 1; transform: rotate(var(--hb-xb6-a)) translateY(0) scale(1); } 100% { opacity: 0; transform: rotate(var(--hb-xb6-a)) translateY(-17px) scale(0.3); } }
@keyframes hb-xb6-ring { 0% { opacity: 0.8; transform: scale(0.5); } 100% { opacity: 0; transform: scale(1.4); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xb6, .hb-xb6 * { transition-duration: 0.01s !important; transition-delay: 0s !important; }
  .hb-xb6 .hb-xb6-ic, .hb-xb6 .hb-xb6-spark, .hb-xb6 .hb-xb6-ring { animation: none !important; }
}
`;

const paths: Record<ButtonToggleCountKind, string> = {
  like: "M12 20.3s-7.6-4.6-9-9.6C2 7.1 4.4 4 7.6 4c1.9 0 3.4 1 4.4 2.5C13 5 14.5 4 16.4 4 19.6 4 22 7.1 21 10.7c-1.4 5-9 9.6-9 9.6z",
  save: "M3.5 7.2c0-1 .8-1.7 1.7-1.7h4.2l2 2.2h7.4c1 0 1.7.8 1.7 1.7v8.4c0 1-.8 1.7-1.7 1.7H5.2c-1 0-1.7-.8-1.7-1.7z",
  bookmark: "M6.5 4.8c0-.7.6-1.3 1.3-1.3h8.4c.7 0 1.3.6 1.3 1.3v15.4l-5.5-3.9-5.5 3.9z",
  star: "M12 3.4l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.7l-5.3 2.8 1.1-5.8-4.3-4.1 5.9-.8z",
};

const defaults: Record<ButtonToggleCountKind, { accent: string; label: string }> = {
  like: { accent: "#ff4d6d", label: "Like" },
  save: { accent: "#2f7bff", label: "Save" },
  bookmark: { accent: "#f5b301", label: "Bookmark" },
  star: { accent: "#ffc83d", label: "Star" },
};

function format(n: number, compact: boolean) {
  if (compact && n >= 10000) {
    const k = n / 1000;
    return `${k >= 100 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return n.toLocaleString("en-US");
}

function Odometer({ value }: { value: string }) {
  const chars = Array.from(value);
  return (
    <span className="hb-xb6-num" aria-hidden="true">
      {chars.map((ch, i) => {
        const key = chars.length - i;
        if (!/\d/.test(ch)) {
          return (
            <span key={`s${key}`} className="hb-xb6-sep">
              {ch}
            </span>
          );
        }
        return (
          <span key={`d${key}`} className="hb-xb6-col">
            <span className="hb-xb6-reel" style={{ "--hb-xb6-d": ch, "--hb-xb6-dl": `${((chars.length - i - 1) * 0.04).toFixed(2)}s` } as React.CSSProperties}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function ButtonToggleCount({
  kind = "like",
  count = 1284,
  pressed,
  defaultPressed = false,
  onPressedChange,
  label,
  accent,
  icon,
  compact = false,
  disabled = false,
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ButtonToggleCountProps) {
  const [inner, setInner] = React.useState(defaultPressed);
  const [pop, setPop] = React.useState<"true" | "false" | undefined>(undefined);
  const on = pressed ?? inner;
  const total = count + (on ? 1 : 0);
  const name = label ?? defaults[kind].label;
  const color = accent ?? defaults[kind].accent;
  const sparks = [0, 60, 120, 180, 240, 300];

  return (
    <button
      type={type}
      disabled={disabled}
      aria-pressed={on}
      aria-label={`${name}, ${total.toLocaleString("en-US")}`}
      className={`hb-xb6 ${className}`.trim()}
      data-pop={pop}
      data-compact={compact ? "true" : "false"}
      style={{ "--hb-xb6-c": color, ...style } as React.CSSProperties}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        const next = !on;
        if (pressed === undefined) setInner(next);
        setPop(next ? "true" : "false");
        onPressedChange?.(next);
      }}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget.querySelector(".hb-xb6-ic")) setPop(undefined);
      }}
      {...rest}
    >
      <style href="hb-button-toggle-count" precedence="default">{css}</style>
      <span className="hb-xb6-ic" aria-hidden="true">
        <span className="hb-xb6-ring" />
        {sparks.map((a) => (
          <span key={a} className="hb-xb6-spark" style={{ "--hb-xb6-a": `${a}deg` } as React.CSSProperties} />
        ))}
        {icon ?? (
          <>
            <svg viewBox="0 0 24 24" className="hb-xb6-o">
              <path d={paths[kind]} />
            </svg>
            <svg viewBox="0 0 24 24" className="hb-xb6-f">
              <path d={paths[kind]} />
            </svg>
          </>
        )}
      </span>
      <Odometer value={format(total, compact)} />
    </button>
  );
}
