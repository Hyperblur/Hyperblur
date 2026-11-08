"use client";

import * as React from "react";

export interface TransitionPageTurnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  paper?: string;
}

const css = `
.hb-vj7 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #050506;
}
.hb-vj7 *, .hb-vj7 *::before, .hb-vj7 *::after { box-sizing: border-box; }
.hb-vj7-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  position: relative;
  z-index: 3;
  visibility: hidden;
  transition: visibility 0s linear 0s;
}
.hb-vj7-l[data-on="true"] {
  visibility: visible;
  transition: visibility 0s linear var(--hb-vj7-d);
}
.hb-vj7-book {
  position: absolute;
  inset: 0;
  z-index: 1;
  perspective: 1600px;
  perspective-origin: 50% 40%;
  pointer-events: none;
}
.hb-vj7-half {
  position: absolute;
  inset: 0;
  display: grid;
}
.hb-vj7-half[data-side="l"] { clip-path: inset(0 50% 0 0); }
.hb-vj7-half[data-side="r"] { clip-path: inset(0 0 0 50%); }
.hb-vj7-half > .hb-vj7-c, .hb-vj7-face > .hb-vj7-c { display: grid; min-width: 0; min-height: 0; }
.hb-vj7-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--hb-vj7-d) cubic-bezier(0.45, 0.05, 0.25, 1);
}
.hb-vj7-half[data-side="l"] .hb-vj7-shade { background: linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6) 50%); }
.hb-vj7-half[data-side="r"] .hb-vj7-shade { background: linear-gradient(90deg, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.15)); opacity: 1; }
.hb-vj7[data-active="true"] .hb-vj7-half[data-side="l"] .hb-vj7-shade { opacity: 1; }
.hb-vj7[data-active="true"] .hb-vj7-half[data-side="r"] .hb-vj7-shade { opacity: 0; }
.hb-vj7-leaf {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 50%;
  transform-origin: 0% 50%;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform var(--hb-vj7-d) cubic-bezier(0.45, 0.05, 0.25, 1);
}
.hb-vj7[data-active="true"] .hb-vj7-leaf { transform: rotateY(-180deg); }
.hb-vj7-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: var(--hb-vj7-paper);
}
.hb-vj7-face[data-face="back"] { transform: rotateY(180deg); }
.hb-vj7-face > .hb-vj7-c {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 200%;
}
.hb-vj7-face[data-face="front"] > .hb-vj7-c { left: -100%; }
.hb-vj7-face[data-face="back"] > .hb-vj7-c { left: 0; }
.hb-vj7-face::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity var(--hb-vj7-d) cubic-bezier(0.45, 0.05, 0.25, 1);
}
.hb-vj7-face[data-face="front"]::after {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.15) 30%, rgba(255, 255, 255, 0.08) 70%, rgba(0, 0, 0, 0.3));
  opacity: 0;
}
.hb-vj7-face[data-face="back"]::after {
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1) 35%, rgba(255, 255, 255, 0.1) 75%, rgba(0, 0, 0, 0.25));
  opacity: 1;
}
.hb-vj7[data-active="true"] .hb-vj7-face[data-face="front"]::after { opacity: 1; }
.hb-vj7[data-active="true"] .hb-vj7-face[data-face="back"]::after { opacity: 0; }
.hb-vj7-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 28px;
  margin-left: -14px;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.38) 46%, rgba(255, 255, 255, 0.06) 50%, rgba(0, 0, 0, 0.38) 54%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj7-l, .hb-vj7-l[data-on="true"], .hb-vj7-leaf, .hb-vj7-shade, .hb-vj7-face::after { transition: none; }
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

export function TransitionPageTurn({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 3000,
  duration = 1100,
  paper = "#111111",
  className,
  style,
  ...rest
}: TransitionPageTurnProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="linear-gradient(120deg, #1b1a17, #0e0d0b)" kicker="Issue 14" title="Field notes from the coast" />;
  const b = to ?? kids[1] ?? <Scene tone="linear-gradient(120deg, #17191d, #0b0c0e)" kicker="Page 2" title="Tide tables and maps" />;

  const vars = { "--hb-vj7-d": `${duration}ms`, "--hb-vj7-paper": paper } as React.CSSProperties;

  return (
    <div className={["hb-vj7", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} {...rest}>
      <style href="hb-transition-page-turn" precedence="default">{css}</style>
      <div className="hb-vj7-book" aria-hidden="true" inert>
        <div className="hb-vj7-half" data-side="l">
          <div className="hb-vj7-c">{a}</div>
          <div className="hb-vj7-shade" />
        </div>
        <div className="hb-vj7-half" data-side="r">
          <div className="hb-vj7-c">{b}</div>
          <div className="hb-vj7-shade" />
        </div>
        <div className="hb-vj7-spine" />
        <div className="hb-vj7-leaf">
          <div className="hb-vj7-face" data-face="front">
            <div className="hb-vj7-c">{a}</div>
          </div>
          <div className="hb-vj7-face" data-face="back">
            <div className="hb-vj7-c">{b}</div>
          </div>
        </div>
      </div>
      <div className="hb-vj7-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj7-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
    </div>
  );
}
