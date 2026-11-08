"use client";

import * as React from "react";

export interface TransitionIrisWipeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  origin?: { x: number; y: number };
  accent?: string;
  backdrop?: string;
}

const css = `
@property --hb-vj1-r {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}
.hb-vj1 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: var(--hb-vj1-bg);
  --hb-vj1-max: 1200px;
}
.hb-vj1 *, .hb-vj1 *::before, .hb-vj1 *::after { box-sizing: border-box; }
.hb-vj1-bd {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at var(--hb-vj1-x) var(--hb-vj1-y), var(--hb-vj1-acc) 0 2px, transparent 2.5px),
    radial-gradient(circle at var(--hb-vj1-x) var(--hb-vj1-y), transparent 0 13px, color-mix(in srgb, var(--hb-vj1-acc) 55%, transparent) 13.5px 14.5px, transparent 15px),
    repeating-radial-gradient(circle at var(--hb-vj1-x) var(--hb-vj1-y), rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 34px);
}
.hb-vj1-l {
  grid-area: 1 / 1;
  position: relative;
  z-index: 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  --hb-vj1-r: var(--hb-vj1-max);
  clip-path: circle(var(--hb-vj1-r) at var(--hb-vj1-x) var(--hb-vj1-y));
  transition: --hb-vj1-r calc(var(--hb-vj1-d) * 0.5) cubic-bezier(0.22, 1, 0.36, 1) calc(var(--hb-vj1-d) * 0.5);
}
.hb-vj1-l::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--hb-vj1-x) var(--hb-vj1-y),
    transparent calc(var(--hb-vj1-r) - 26px),
    color-mix(in srgb, var(--hb-vj1-acc) 16%, transparent) calc(var(--hb-vj1-r) - 3px),
    color-mix(in srgb, var(--hb-vj1-acc) 85%, #ffffff) calc(var(--hb-vj1-r) - 1.5px),
    var(--hb-vj1-acc) var(--hb-vj1-r),
    transparent calc(var(--hb-vj1-r) + 0.5px)
  );
}
.hb-vj1-in {
  display: grid;
  min-width: 0;
  min-height: 0;
  transform-origin: var(--hb-vj1-x) var(--hb-vj1-y);
  transition: transform calc(var(--hb-vj1-d) * 0.5) cubic-bezier(0.22, 1, 0.36, 1) calc(var(--hb-vj1-d) * 0.5), filter calc(var(--hb-vj1-d) * 0.5) ease calc(var(--hb-vj1-d) * 0.5);
}
.hb-vj1-l[data-on="false"] {
  --hb-vj1-r: 0px;
  transition: --hb-vj1-r calc(var(--hb-vj1-d) * 0.5) cubic-bezier(0.64, 0, 0.78, 0);
}
.hb-vj1-l[data-on="false"] .hb-vj1-in {
  transform: scale(0.9);
  filter: brightness(0.55);
  transition: transform calc(var(--hb-vj1-d) * 0.5) cubic-bezier(0.64, 0, 0.78, 0), filter calc(var(--hb-vj1-d) * 0.5) ease;
}
.hb-vj1-l[data-on="false"][data-role="to"] .hb-vj1-in { transform: scale(1.12); }
@media (prefers-reduced-motion: reduce) {
  .hb-vj1-l, .hb-vj1-l[data-on="false"], .hb-vj1-in, .hb-vj1-l[data-on="false"] .hb-vj1-in { transition: none; }
}
`;

function useSwap(
  active: boolean | undefined,
  defaultActive: boolean,
  onActiveChange: ((active: boolean) => void) | undefined,
  autoPlay: boolean,
  interval: number,
) {
  const [inner, setInner] = React.useState(defaultActive);
  const controlled = active !== undefined;
  const value = controlled ? active : inner;
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
    const id = window.setTimeout(() => set(!value), interval);
    return () => window.clearTimeout(id);
  }, [autoPlay, interval, value, set]);
  return value;
}

function Scene({ tone, kicker, title }: { tone: string; kicker: string; title: string }) {
  return (
    <div style={{ display: "grid", alignContent: "end", gap: 4, padding: 20, minHeight: 180, background: tone, color: "#ededed" }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(237,237,237,0.6)" }}>{kicker}</span>
      <strong style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</strong>
    </div>
  );
}

export function TransitionIrisWipe({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 1200,
  origin = { x: 50, y: 50 },
  accent = "#2f7bff",
  backdrop = "#050506",
  className,
  style,
  ...rest
}: TransitionIrisWipeProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(160deg, #1d2a4a, #0c0f18)" kicker="Chapter 1" title="The harbor at dawn" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(160deg, #3a1d2e, #120a10)" kicker="Chapter 2" title="Night shift" />;
  const { x, y } = origin;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const ox = (w * x) / 100;
      const oy = (h * y) / 100;
      const r = Math.hypot(Math.max(ox, w - ox), Math.max(oy, h - oy)) + 30;
      el.style.setProperty("--hb-vj1-max", `${r.toFixed(1)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x, y]);

  const vars = {
    "--hb-vj1-x": `${x}%`,
    "--hb-vj1-y": `${y}%`,
    "--hb-vj1-d": `${duration}ms`,
    "--hb-vj1-acc": accent,
    "--hb-vj1-bg": backdrop,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={["hb-vj1", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} {...rest}>
      <style href="hb-transition-iris-wipe" precedence="default">{css}</style>
      <div className="hb-vj1-bd" aria-hidden="true" />
      <div className="hb-vj1-l" data-role="from" data-on={!value} aria-hidden={value} inert={value}>
        <div className="hb-vj1-in">{a}</div>
      </div>
      <div className="hb-vj1-l" data-role="to" data-on={value} aria-hidden={!value} inert={!value}>
        <div className="hb-vj1-in">{b}</div>
      </div>
    </div>
  );
}
