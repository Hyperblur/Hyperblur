"use client";

import * as React from "react";

export interface ButtonOdometerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "onChange"> {
  count?: number;
  defaultCount?: number;
  voted?: boolean;
  defaultVoted?: boolean;
  onVoteChange?: (voted: boolean, count: number) => void;
  accent?: string;
  label?: string;
  locale?: string;
}

const css = `
.hb-xa11 {
  --hb-xa11-c: #ff6b3d;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.55em 1em 0.55em 0.6em;
  font: inherit;
  font-size: 15px;
  font-weight: 650;
  line-height: 1;
  color: #ededed;
  background: linear-gradient(180deg, #1a1a1a, #121212);
  border: 0;
  border-radius: 12px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), inset 0 0 0 1px #2a2a2a, 0 10px 24px -16px rgba(0, 0, 0, 0.9);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.35s ease, background 0.35s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa11 *, .hb-xa11 *::before, .hb-xa11 *::after { box-sizing: border-box; }
.hb-xa11:hover:not(:disabled) { box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px #363636, 0 10px 24px -16px rgba(0, 0, 0, 0.9); }
.hb-xa11:active:not(:disabled) { transform: scale(0.96); }
.hb-xa11:focus-visible { outline: 2px solid var(--hb-xa11-c); outline-offset: 3px; }
.hb-xa11:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa11[aria-pressed="true"] {
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-xa11-c) 16%, #161616), #121212);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px color-mix(in srgb, var(--hb-xa11-c) 50%, #2a2a2a), 0 12px 28px -14px color-mix(in srgb, var(--hb-xa11-c) 55%, transparent);
}
.hb-xa11-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 2em;
  height: 2em;
  flex: none;
  color: #a1a1a1;
  background: #1f1f1f;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #2c2c2c;
  overflow: hidden;
  transition: color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}
.hb-xa11[aria-pressed="true"] .hb-xa11-icon { color: #fff; background: var(--hb-xa11-c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 12px -4px var(--hb-xa11-c); }
.hb-xa11-icon svg { width: 1em; height: 1em; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xa11:hover:not(:disabled) .hb-xa11-icon svg { transform: translateY(-2px); }
.hb-xa11[data-kick="a"] .hb-xa11-icon svg { animation: hb-xa11-ka 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xa11[data-kick="b"] .hb-xa11-icon svg { animation: hb-xa11-kb 0.55s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xa11-body { display: flex; flex-direction: column; align-items: flex-start; gap: 0.3em; }
.hb-xa11-label { font-size: 0.68em; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #8f8f8f; }
.hb-xa11[aria-pressed="true"] .hb-xa11-label { color: color-mix(in srgb, var(--hb-xa11-c) 70%, #fff); }
.hb-xa11-num {
  position: relative;
  display: inline-flex;
  height: 1.15em;
  font-family: var(--font-grotesk, inherit);
  font-size: 1.05em;
  font-variant-numeric: tabular-nums;
  overflow: hidden;
  -webkit-mask: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
  mask: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
}
.hb-xa11-col { display: inline-block; width: 0.62em; height: 1.15em; text-align: center; }
.hb-xa11-sep { display: inline-block; width: 0.3em; text-align: center; color: #8f8f8f; }
.hb-xa11-strip {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--hb-xa11-d) * -1.15em));
  transition: transform 0.75s cubic-bezier(0.3, 1.35, 0.5, 1);
  transition-delay: var(--hb-xa11-dl);
}
.hb-xa11-strip span { display: block; height: 1.15em; line-height: 1.15em; }
.hb-xa11-plus {
  position: absolute;
  right: 0.7em;
  top: 0.2em;
  font-size: 0.72em;
  font-weight: 700;
  color: var(--hb-xa11-c);
  opacity: 0;
  pointer-events: none;
}
.hb-xa11[data-kick][aria-pressed="true"] .hb-xa11-plus { animation: hb-xa11-plus 0.9s cubic-bezier(0.2, 0.8, 0.2, 1); }
@keyframes hb-xa11-ka { 0% { transform: translateY(0); } 35% { transform: translateY(-140%); } 36% { transform: translateY(140%); } 100% { transform: translateY(0); } }
@keyframes hb-xa11-kb { 0% { transform: translateY(0); } 35% { transform: translateY(-140%); } 36% { transform: translateY(140%); } 100% { transform: translateY(0); } }
@keyframes hb-xa11-plus { 0% { opacity: 0; transform: translateY(6px) scale(0.8); } 25% { opacity: 1; transform: translateY(-4px) scale(1); } 100% { opacity: 0; transform: translateY(-18px) scale(1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa11, .hb-xa11-icon, .hb-xa11-icon svg, .hb-xa11-strip { transition: none; }
  .hb-xa11[data-kick] .hb-xa11-icon svg, .hb-xa11[data-kick][aria-pressed="true"] .hb-xa11-plus { animation: none; }
}
`;

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function ButtonOdometer({
  count,
  defaultCount = 1284,
  voted,
  defaultVoted = false,
  onVoteChange,
  accent = "#ff6b3d",
  label = "Upvote",
  locale = "en-US",
  type = "button",
  className = "",
  style,
  onClick,
  ...rest
}: ButtonOdometerProps) {
  const [innerCount, setInnerCount] = React.useState(defaultCount);
  const [innerVoted, setInnerVoted] = React.useState(defaultVoted);
  const [kick, setKick] = React.useState<"a" | "b" | undefined>(undefined);
  const isVoted = voted ?? innerVoted;
  const value = Math.max(0, Math.round(count ?? innerCount));
  const text = new Intl.NumberFormat(locale).format(value);
  const chars = Array.from(text);
  let digitIndex = 0;
  const totalDigits = chars.filter((c) => c >= "0" && c <= "9").length;

  const vars = { "--hb-xa11-c": accent, ...style } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-odometer" precedence="default">{css}</style>
      <button
        type={type}
        className={`hb-xa11 ${className}`}
        style={vars}
        aria-pressed={isVoted}
        aria-label={`${label}, ${text} votes`}
        data-kick={kick}
        onClick={(e) => {
          const next = !isVoted;
          const nextCount = Math.max(0, value + (next ? 1 : -1));
          if (voted === undefined) setInnerVoted(next);
          if (count === undefined) setInnerCount(nextCount);
          if (next) setKick((k) => (k === "a" ? "b" : "a"));
          onVoteChange?.(next, nextCount);
          onClick?.(e);
        }}
        {...rest}
      >
        <span className="hb-xa11-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2.6c.3 0 .6.14.8.38l5 6.1c.5.62.06 1.52-.74 1.52H10.5v2.6c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1V10.6H2.94c-.8 0-1.24-.9-.74-1.52l5-6.1c.2-.24.5-.38.8-.38Z" />
          </svg>
        </span>
        <span className="hb-xa11-body" aria-hidden="true">
          <span className="hb-xa11-label">{isVoted ? "Upvoted" : label}</span>
          <span className="hb-xa11-num">
            {chars.map((c, i) => {
              const fromRight = chars.length - i;
              if (c < "0" || c > "9") {
                return (
                  <span className="hb-xa11-sep" key={`s${fromRight}`}>
                    {c}
                  </span>
                );
              }
              const order = totalDigits - 1 - digitIndex;
              digitIndex += 1;
              const v = {
                "--hb-xa11-d": c,
                "--hb-xa11-dl": `${(order * 0.06).toFixed(2)}s`,
              } as React.CSSProperties;
              return (
                <span className="hb-xa11-col" key={`d${fromRight}`}>
                  <span className="hb-xa11-strip" style={v}>
                    {digits.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </span>
                </span>
              );
            })}
          </span>
        </span>
        <span className="hb-xa11-plus" aria-hidden="true">+1</span>
      </button>
    </>
  );
}
