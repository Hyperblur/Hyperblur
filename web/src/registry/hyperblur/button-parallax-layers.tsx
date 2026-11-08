"use client";

import * as React from "react";

export interface ButtonParallaxLayersProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  accent?: string;
  depth?: number;
  reach?: number;
  hint?: string;
  size?: "sm" | "md" | "lg";
}

const css = `
.hb-xa9 {
  --hb-xa9-c: #2f7bff;
  --hb-xa9-x: 0;
  --hb-xa9-y: 0;
  --hb-xa9-r: 22px;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: var(--hb-xa9-r);
  margin: calc(var(--hb-xa9-r) * -1);
  touch-action: manipulation;
}
.hb-xa9 *, .hb-xa9 *::before, .hb-xa9 *::after { box-sizing: border-box; }
.hb-xa9-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.85em;
  margin: 0;
  padding: 0.42em 1.3em 0.42em 0.42em;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #f5f5f5;
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  isolation: isolate;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform: translate(calc(var(--hb-xa9-x) * 0.22px), calc(var(--hb-xa9-y) * 0.22px));
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xa9[data-active="true"] .hb-xa9-btn,
.hb-xa9[data-active="true"] .hb-xa9-l { transition-duration: 0.18s; transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
.hb-xa9-btn[data-size="sm"] { font-size: 13px; }
.hb-xa9-btn[data-size="lg"] { font-size: 17px; }
.hb-xa9-btn:focus-visible { outline: 2px solid var(--hb-xa9-c); outline-offset: 4px; }
.hb-xa9-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hb-xa9-plate {
  position: absolute;
  inset: 0;
  z-index: -2;
  border-radius: inherit;
  background:
    radial-gradient(90% 140% at calc(50% + var(--hb-xa9-x) * 1%) 0%, rgba(255, 255, 255, 0.12), transparent 60%),
    linear-gradient(180deg, #1b1b1d, #0e0e10);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 0 1px #2a2a2e,
    calc(var(--hb-xa9-x) * -0.25px) calc(10px + var(--hb-xa9-y) * -0.25px) 26px -12px rgba(0, 0, 0, 0.95);
}
.hb-xa9-glow {
  position: absolute;
  left: 0;
  top: 50%;
  width: 3.4em;
  height: 3.4em;
  margin-top: -1.7em;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-xa9-c) 55%, transparent), transparent 70%);
  filter: blur(6px);
  opacity: 0.6;
  pointer-events: none;
}
.hb-xa9-l {
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-xa9-l[data-d="1"] { transform: translate(calc(var(--hb-xa9-x) * 0.14px), calc(var(--hb-xa9-y) * 0.14px)); }
.hb-xa9-l[data-d="2"] { transform: translate(calc(var(--hb-xa9-x) * 0.3px), calc(var(--hb-xa9-y) * 0.3px)); }
.hb-xa9-chip {
  display: grid;
  place-items: center;
  width: 2.4em;
  height: 2.4em;
  color: #fff;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 25%, color-mix(in srgb, var(--hb-xa9-c) 55%, #fff), var(--hb-xa9-c) 65%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.25), 0 6px 14px -6px var(--hb-xa9-c);
}
.hb-xa9-chip svg { width: 1.05em; height: 1.05em; }
.hb-xa9-txt { display: flex; flex-direction: column; gap: 0.28em; white-space: nowrap; text-align: left; }
.hb-xa9-sub { font-size: 0.72em; font-weight: 500; color: #8f8f8f; letter-spacing: 0.01em; }
@media (prefers-reduced-motion: reduce) {
  .hb-xa9-btn, .hb-xa9-l, .hb-xa9[data-active="true"] .hb-xa9-btn, .hb-xa9[data-active="true"] .hb-xa9-l { transition: none; transform: none; }
}
`;

export function ButtonParallaxLayers({
  children = "Download for macOS",
  accent = "#2f7bff",
  depth = 1,
  reach = 22,
  size = "md",
  hint = "Apple silicon · 48 MB",
  type = "button",
  className = "",
  style,
  ...rest
}: ButtonParallaxLayersProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(false);

  function move(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const k = Math.max(0, depth);
    const x = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 60 * k;
    const y = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 40 * k;
    el.style.setProperty("--hb-xa9-x", x.toFixed(2));
    el.style.setProperty("--hb-xa9-y", y.toFixed(2));
    if (!active) setActive(true);
  }

  function leave() {
    const el = ref.current;
    if (el) {
      el.style.setProperty("--hb-xa9-x", "0");
      el.style.setProperty("--hb-xa9-y", "0");
    }
    setActive(false);
  }

  const vars = { "--hb-xa9-c": accent, "--hb-xa9-r": `${Math.max(0, reach).toFixed(0)}px` } as React.CSSProperties;

  return (
    <>
      <style href="hb-button-parallax-layers" precedence="default">{css}</style>
      <span
        ref={ref}
        className={`hb-xa9 ${className}`}
        style={vars}
        data-active={active || undefined}
        onPointerMove={move}
        onPointerLeave={leave}
      >
        <button type={type} className="hb-xa9-btn" style={style} data-size={size} {...rest}>
          <span className="hb-xa9-plate" aria-hidden="true" />
          <span className="hb-xa9-glow" aria-hidden="true" />
          <span className="hb-xa9-l" data-d="2">
            <span className="hb-xa9-chip" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 3.5v9" />
                <path d="M6 8.8l4 4 4-4" />
                <path d="M4.5 16h11" />
              </svg>
            </span>
          </span>
          <span className="hb-xa9-l" data-d="1">
            <span className="hb-xa9-txt">
              <span>{children}</span>
              {hint ? <span className="hb-xa9-sub">{hint}</span> : null}
            </span>
          </span>
        </button>
      </span>
    </>
  );
}
