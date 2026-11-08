"use client";

import * as React from "react";

export interface TransitionRippleRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  interactive?: boolean;
  label?: string;
  accent?: string;
}

const css = `
.hb-vj6 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
}
.hb-vj6 *, .hb-vj6 *::before, .hb-vj6 *::after { box-sizing: border-box; }
.hb-vj6[data-interactive="true"] { cursor: pointer; }
.hb-vj6:focus-visible { outline: 2px solid var(--hb-vj6-acc); outline-offset: 2px; }
.hb-vj6-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  z-index: 1;
}
.hb-vj6-l[data-on="true"] { z-index: 2; }
.hb-vj6[data-ran="true"] .hb-vj6-l[data-on="true"] {
  animation: hb-vj6-grow var(--hb-vj6-d) cubic-bezier(0.65, 0, 0.2, 1) both;
}
@keyframes hb-vj6-grow {
  0% { clip-path: circle(0% at var(--hb-vj6-x) var(--hb-vj6-y)); }
  100% { clip-path: circle(150% at var(--hb-vj6-x) var(--hb-vj6-y)); }
}
.hb-vj6-ring {
  position: absolute;
  z-index: 3;
  left: var(--hb-vj6-x);
  top: var(--hb-vj6-y);
  width: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  border: 1.5px solid var(--hb-vj6-acc);
  box-shadow: 0 0 18px color-mix(in srgb, var(--hb-vj6-acc) 55%, transparent), inset 0 0 14px color-mix(in srgb, var(--hb-vj6-acc) 35%, transparent);
  opacity: 0;
  animation: hb-vj6-ring var(--hb-vj6-d) cubic-bezier(0.65, 0, 0.2, 1) both;
}
.hb-vj6-ring + .hb-vj6-ring {
  border-width: 1px;
  box-shadow: none;
  animation-duration: calc(var(--hb-vj6-d) * 1.25);
  animation-delay: calc(var(--hb-vj6-d) * 0.12);
}
.hb-vj6-dot {
  position: absolute;
  z-index: 3;
  left: var(--hb-vj6-x);
  top: var(--hb-vj6-y);
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: var(--hb-vj6-acc);
  pointer-events: none;
  animation: hb-vj6-dot calc(var(--hb-vj6-d) * 0.6) cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes hb-vj6-ring {
  0% { width: 0; opacity: 0.95; }
  70% { opacity: 0.55; }
  100% { width: 300%; opacity: 0; }
}
@keyframes hb-vj6-dot {
  0% { transform: scale(0.4); opacity: 1; }
  100% { transform: scale(2.6); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj6[data-ran="true"] .hb-vj6-l[data-on="true"] { animation: none; }
  .hb-vj6-ring, .hb-vj6-dot { display: none; }
}
`;

const presets = [
  { x: 78, y: 26 },
  { x: 22, y: 74 },
  { x: 64, y: 70 },
  { x: 30, y: 30 },
];

function Scene({ tone, kicker, title }: { tone: string; kicker: string; title: string }) {
  return (
    <div style={{ display: "grid", alignContent: "end", gap: 4, padding: 20, minHeight: 180, background: tone, color: "#ededed" }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(237,237,237,0.6)" }}>{kicker}</span>
      <strong style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</strong>
    </div>
  );
}

export function TransitionRippleReveal({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2400,
  duration = 900,
  interactive = true,
  label = "Switch view",
  accent = "#2f7bff",
  className,
  style,
  onClick,
  onKeyDown,
  ...rest
}: TransitionRippleRevealProps) {
  const [inner, setInner] = React.useState(defaultActive);
  const controlled = active !== undefined;
  const value = controlled ? active : inner;
  const [pt, setPt] = React.useState({ x: 50, y: 50 });
  const [count, setCount] = React.useState(0);
  const [prev, setPrev] = React.useState(value);
  if (prev !== value) {
    setPrev(value);
    setCount((c) => c + 1);
  }
  const set = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInner(next);
      onActiveChange?.(next);
    },
    [controlled, onActiveChange],
  );

  React.useEffect(() => {
    if (!autoPlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      setPt(presets[count % presets.length]);
      set(!value);
    }, interval);
    return () => window.clearTimeout(id);
  }, [autoPlay, interval, value, set, count]);

  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(160deg, #f4f2ec, #dcd8ce)" kicker="Appearance" title="Light" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(160deg, #15171c, #08090b)" kicker="Appearance" title="Dark" />;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (!interactive || e.defaultPrevented) return;
    const r = e.currentTarget.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      setPt({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    }
    set(!value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (!interactive || e.defaultPrevented || e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPt({ x: 50, y: 50 });
      set(!value);
    }
  };

  const vars = {
    "--hb-vj6-x": `${pt.x.toFixed(2)}%`,
    "--hb-vj6-y": `${pt.y.toFixed(2)}%`,
    "--hb-vj6-d": `${duration}ms`,
    "--hb-vj6-acc": accent,
  } as React.CSSProperties;

  return (
    <div
      className={["hb-vj6", className].filter(Boolean).join(" ")}
      style={{ ...vars, ...style }}
      data-active={value}
      data-ran={count > 0}
      data-interactive={interactive}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? value : undefined}
      aria-label={interactive ? label : undefined}
      onClick={handleClick}
      onKeyDown={handleKey}
      {...rest}
    >
      <style href="hb-transition-ripple-reveal" precedence="default">{css}</style>
      <div className="hb-vj6-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj6-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
      {count > 0 ? (
        <React.Fragment key={count}>
          <span className="hb-vj6-ring" aria-hidden="true" />
          <span className="hb-vj6-ring" aria-hidden="true" />
          <span className="hb-vj6-dot" aria-hidden="true" />
        </React.Fragment>
      ) : null}
    </div>
  );
}
