"use client";

import * as React from "react";

export interface ButtonMarqueeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  marquee?: string;
  accent?: string;
  speed?: number;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa1 {
  --hb-xa1-c: #c8ff4d;
  --hb-xa1-s: 7s;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
  box-sizing: border-box;
  margin: 0;
  padding: 0.38em 0.38em 0.38em 1.35em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.005em;
  color: #ededed;
  background: linear-gradient(180deg, #1c1c1c, #121212);
  border: 0;
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px #2a2a2a, 0 8px 24px -12px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow 0.3s ease, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-xa1 *, .hb-xa1 *::before, .hb-xa1 *::after { box-sizing: border-box; }
.hb-xa1[data-size="sm"] { font-size: 13px; }
.hb-xa1[data-size="lg"] { font-size: 17px; }
.hb-xa1:hover:not(:disabled), .hb-xa1:focus-visible {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px color-mix(in srgb, var(--hb-xa1-c) 40%, #2a2a2a), 0 10px 30px -14px color-mix(in srgb, var(--hb-xa1-c) 45%, transparent);
}
.hb-xa1:active:not(:disabled) { transform: scale(0.97); }
.hb-xa1:focus-visible { outline: 2px solid var(--hb-xa1-c); outline-offset: 3px; }
.hb-xa1:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa1-face {
  position: relative;
  display: block;
  overflow: hidden;
  padding: 0.3em 0;
  -webkit-mask: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.hb-xa1-static {
  display: block;
  white-space: nowrap;
  padding: 0 0.85em;
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.35s ease;
}
.hb-xa1-run {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: max-content;
  opacity: 0;
  transform: translateY(110%);
  transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.35s ease;
}
.hb-xa1-loop {
  display: flex;
  align-items: center;
  flex: none;
  animation: hb-xa1-roll var(--hb-xa1-s) linear infinite;
  animation-play-state: paused;
}
.hb-xa1-item { display: inline-flex; align-items: center; white-space: nowrap; }
.hb-xa1-star {
  width: 0.55em;
  height: 0.55em;
  margin: 0 0.7em;
  flex: none;
  color: var(--hb-xa1-c);
}
.hb-xa1:hover:not(:disabled) .hb-xa1-static,
.hb-xa1:focus-visible .hb-xa1-static { transform: translateY(-110%); opacity: 0; }
.hb-xa1:hover:not(:disabled) .hb-xa1-run,
.hb-xa1:focus-visible .hb-xa1-run { transform: translateY(0); opacity: 1; }
.hb-xa1:hover:not(:disabled) .hb-xa1-loop,
.hb-xa1:focus-visible .hb-xa1-loop { animation-play-state: running; }
.hb-xa1-chip {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.3em;
  height: 2.3em;
  flex: none;
  color: #0a0a0a;
  background: var(--hb-xa1-c);
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -2px 4px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}
.hb-xa1-arrow {
  width: 1em;
  height: 1em;
  transition: transform 0.55s cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-xa1-arrow + .hb-xa1-arrow { position: absolute; transform: translate(-180%, 180%); }
.hb-xa1:hover:not(:disabled) .hb-xa1-arrow,
.hb-xa1:focus-visible .hb-xa1-arrow { transform: translate(180%, -180%); }
.hb-xa1:hover:not(:disabled) .hb-xa1-arrow + .hb-xa1-arrow,
.hb-xa1:focus-visible .hb-xa1-arrow + .hb-xa1-arrow { transform: translate(0, 0); }
@keyframes hb-xa1-roll { to { transform: translateX(-100%); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xa1, .hb-xa1-static, .hb-xa1-run, .hb-xa1-arrow { transition: none; }
  .hb-xa1-loop { animation: none; }
  .hb-xa1:hover:not(:disabled) .hb-xa1-static, .hb-xa1:focus-visible .hb-xa1-static { transform: none; opacity: 1; }
  .hb-xa1:hover:not(:disabled) .hb-xa1-run, .hb-xa1:focus-visible .hb-xa1-run { opacity: 0; }
  .hb-xa1:hover:not(:disabled) .hb-xa1-arrow, .hb-xa1:focus-visible .hb-xa1-arrow { transform: none; }
}
`;

function Arrow() {
  return (
    <svg className="hb-xa1-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5l7-7M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Star() {
  return (
    <svg className="hb-xa1-star" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="currentColor" />
    </svg>
  );
}

export function ButtonMarquee({
  children = "Book a demo",
  marquee,
  accent = "#c8ff4d",
  speed = 7,
  size = "md",
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonMarqueeProps) {
  const text = marquee ?? (typeof children === "string" ? children : "Book a demo");
  const items = [0, 1, 2];
  const vars = {
    "--hb-xa1-c": accent,
    "--hb-xa1-s": `${Math.max(1, speed).toFixed(2)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-marquee" precedence="default">{css}</style>
      <button type={type} className={`hb-xa1 ${className}`} style={vars} data-size={size} {...rest}>
        <span className="hb-xa1-face">
          <span className="hb-xa1-static">{children}</span>
          <span className="hb-xa1-run" aria-hidden="true">
            {[0, 1].map((loop) => (
              <span className="hb-xa1-loop" key={loop}>
                {items.map((i) => (
                  <span className="hb-xa1-item" key={i}>
                    {text}
                    <Star />
                  </span>
                ))}
              </span>
            ))}
          </span>
        </span>
        <span className="hb-xa1-chip" aria-hidden="true">
          <Arrow />
          <Arrow />
        </span>
      </button>
    </>
  );
}
