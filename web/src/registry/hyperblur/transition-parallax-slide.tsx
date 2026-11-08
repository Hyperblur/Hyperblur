"use client";

import * as React from "react";

export interface TransitionParallaxSlideProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  direction?: "left" | "right";
  parallax?: number;
}

const css = `
.hb-vj12 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #050506;
  --hb-vj12-s: 1;
}
.hb-vj12[data-direction="right"] { --hb-vj12-s: -1; }
.hb-vj12 *, .hb-vj12 *::before, .hb-vj12 *::after { box-sizing: border-box; }
.hb-vj12-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  position: relative;
  transition: transform var(--hb-vj12-d) var(--hb-vj12-e), box-shadow var(--hb-vj12-d) var(--hb-vj12-e), visibility 0s linear 0s;
}
.hb-vj12-l [data-depth] { transition: transform var(--hb-vj12-d) var(--hb-vj12-e); }
.hb-vj12-from { z-index: 1; }
.hb-vj12-from::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75));
  opacity: 0;
  transition: opacity var(--hb-vj12-d) var(--hb-vj12-e);
}
.hb-vj12-to {
  z-index: 2;
  transform: translateX(calc(var(--hb-vj12-s) * 101%));
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  visibility: hidden;
  transition: transform var(--hb-vj12-d) var(--hb-vj12-e), box-shadow var(--hb-vj12-d) var(--hb-vj12-e), visibility 0s linear var(--hb-vj12-d);
}
.hb-vj12-to::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  left: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));
}
.hb-vj12[data-direction="right"] .hb-vj12-to::before { left: auto; right: 0; }
.hb-vj12[data-active="true"] .hb-vj12-to {
  transform: translateX(0);
  visibility: visible;
  box-shadow: calc(var(--hb-vj12-s) * -28px) 0 56px -10px rgba(0, 0, 0, 0.75);
  transition: transform var(--hb-vj12-d) var(--hb-vj12-e), box-shadow var(--hb-vj12-d) var(--hb-vj12-e), visibility 0s linear 0s;
}
.hb-vj12[data-active="true"] .hb-vj12-from {
  transform: translateX(calc(var(--hb-vj12-s) * -30%)) scale(0.97);
  visibility: hidden;
  transition: transform var(--hb-vj12-d) var(--hb-vj12-e), box-shadow var(--hb-vj12-d) var(--hb-vj12-e), visibility 0s linear var(--hb-vj12-d);
}
.hb-vj12[data-active="true"] .hb-vj12-from::after { opacity: 1; }
.hb-vj12-to [data-depth="1"] { transform: translateX(calc(var(--hb-vj12-s) * var(--hb-vj12-px) * 1)); }
.hb-vj12-to [data-depth="2"] { transform: translateX(calc(var(--hb-vj12-s) * var(--hb-vj12-px) * 2)); }
.hb-vj12-to [data-depth="3"] { transform: translateX(calc(var(--hb-vj12-s) * var(--hb-vj12-px) * 3.2)); }
.hb-vj12[data-active="true"] .hb-vj12-to [data-depth] { transform: none; }
.hb-vj12[data-active="true"] .hb-vj12-from [data-depth="1"] { transform: translateX(calc(var(--hb-vj12-s) * var(--hb-vj12-px) * -0.6)); }
.hb-vj12[data-active="true"] .hb-vj12-from [data-depth="2"] { transform: translateX(calc(var(--hb-vj12-s) * var(--hb-vj12-px) * -1.2)); }
.hb-vj12[data-active="true"] .hb-vj12-from [data-depth="3"] { transform: translateX(calc(var(--hb-vj12-s) * var(--hb-vj12-px) * -2)); }
@media (prefers-reduced-motion: reduce) {
  .hb-vj12-l, .hb-vj12-l [data-depth], .hb-vj12-from::after,
  .hb-vj12[data-active="true"] .hb-vj12-to, .hb-vj12[data-active="true"] .hb-vj12-from { transition: none; }
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

function Scene({ tone, kicker, title, mark }: { tone: string; kicker: string; title: string; mark: string }) {
  return (
    <div style={{ position: "relative", display: "grid", alignContent: "end", gap: 4, padding: 20, minHeight: 180, background: tone, color: "#ededed", overflow: "hidden" }}>
      <div data-depth="1" style={{ position: "absolute", right: -30, top: -40, width: 160, height: 160, borderRadius: "50%", background: mark, opacity: 0.35 }} />
      <div data-depth="2" style={{ position: "absolute", right: 36, top: 26, width: 54, height: 54, borderRadius: 14, background: mark }} />
      <span data-depth="3" style={{ position: "relative", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(237,237,237,0.6)" }}>{kicker}</span>
      <strong data-depth="3" style={{ position: "relative", fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</strong>
    </div>
  );
}

export function TransitionParallaxSlide({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 2800,
  duration = 900,
  direction = "left",
  parallax = 24,
  className,
  style,
  ...rest
}: TransitionParallaxSlideProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(160deg, #13203a, #090d16)" kicker="Step 1 of 3" title="Plan the route" mark="#2f7bff" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(160deg, #2a1838, #0e0913)" kicker="Step 2 of 3" title="Book in one tap" mark="#b46bff" />;

  const vars = {
    "--hb-vj12-d": `${duration}ms`,
    "--hb-vj12-e": "cubic-bezier(0.32, 0.72, 0, 1)",
    "--hb-vj12-px": `${parallax}px`,
  } as React.CSSProperties;

  return (
    <div
      className={["hb-vj12", className].filter(Boolean).join(" ")}
      style={{ ...vars, ...style }}
      data-active={value}
      data-direction={direction}
      {...rest}
    >
      <style href="hb-transition-parallax-slide" precedence="default">{css}</style>
      <div className="hb-vj12-l hb-vj12-from" aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj12-l hb-vj12-to" aria-hidden={!value} inert={!value}>{b}</div>
    </div>
  );
}
