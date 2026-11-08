"use client";

import * as React from "react";

export type TransitionLiquidWipeDirection = "right" | "left" | "up";

export interface TransitionLiquidWipeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  direction?: TransitionLiquidWipeDirection;
  accent?: string;
  accentEnd?: string;
}

const css = `
@property --hb-vj10-p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
.hb-vj10 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  --hb-vj10-p: 0;
  transition: --hb-vj10-p var(--hb-vj10-d) cubic-bezier(0.65, 0, 0.3, 1);
}
.hb-vj10[data-active="true"] { --hb-vj10-p: 1; }
.hb-vj10 *, .hb-vj10 *::before, .hb-vj10 *::after { box-sizing: border-box; }
.hb-vj10-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
}
.hb-vj10-rim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(120% 80% at 20% 30%, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 45%),
    linear-gradient(var(--hb-vj10-ang), var(--hb-vj10-a), var(--hb-vj10-b));
}
.hb-vj10-to { position: relative; z-index: 2; }
@media (prefers-reduced-motion: reduce) {
  .hb-vj10 { transition: none; }
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

function edge(direction: TransitionLiquidWipeDirection, lead: number, speed: number, amp: number) {
  const steps = 18;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const phase = t * 540 + lead * 900;
    const belly = Math.sin(t * Math.PI) * 9;
    const front = `calc((var(--hb-vj10-p) * 1.5 - 0.25 + ${lead.toFixed(3)}) * 100% + ${belly.toFixed(2)}% + sin(calc(var(--hb-vj10-p) * ${speed}deg + ${phase.toFixed(1)}deg)) * ${amp}px)`;
    const along = `${(t * 100).toFixed(2)}%`;
    if (direction === "right") pts.push(`${front} ${along}`);
    else if (direction === "left") pts.push(`calc(100% - (${front.slice(5, -1)})) ${along}`);
    else pts.push(`${along} calc(100% - (${front.slice(5, -1)}))`);
  }
  if (direction === "right") return `polygon(-10% 0%, ${pts.join(", ")}, -10% 100%)`;
  if (direction === "left") return `polygon(110% 0%, ${pts.join(", ")}, 110% 100%)`;
  return `polygon(0% 110%, ${pts.join(", ")}, 100% 110%)`;
}

function Scene({ tone, kicker, title, dark }: { tone: string; kicker: string; title: string; dark?: boolean }) {
  const ink = dark ? "#101010" : "#ededed";
  return (
    <div style={{ display: "grid", alignContent: "end", gap: 4, padding: 20, minHeight: 180, background: tone, color: ink }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.65 }}>{kicker}</span>
      <strong style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</strong>
    </div>
  );
}

export function TransitionLiquidWipe({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 1250,
  direction = "right",
  accent = "#2f7bff",
  accentEnd = "#7fb3ff",
  className,
  style,
  ...rest
}: TransitionLiquidWipeProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(150deg, #b8f2d8, #6fd6b0)" kicker="Colorway" title="Mint" dark />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(150deg, #ffb4a2, #ff7a6b)" kicker="Colorway" title="Coral" dark />;
  const clipTo = React.useMemo(() => edge(direction, 0, 620, 10), [direction]);
  const clipRim = React.useMemo(() => edge(direction, 0.08, 760, 14), [direction]);

  const vars = {
    "--hb-vj10-d": `${duration}ms`,
    "--hb-vj10-a": accent,
    "--hb-vj10-b": accentEnd,
    "--hb-vj10-ang": direction === "up" ? "0deg" : direction === "left" ? "270deg" : "90deg",
  } as React.CSSProperties;

  return (
    <div className={["hb-vj10", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} {...rest}>
      <style href="hb-transition-liquid-wipe" precedence="default">{css}</style>
      <div className="hb-vj10-l" aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj10-rim" style={{ clipPath: clipRim }} aria-hidden="true" />
      <div className="hb-vj10-l hb-vj10-to" style={{ clipPath: clipTo }} aria-hidden={!value} inert={!value}>{b}</div>
    </div>
  );
}
