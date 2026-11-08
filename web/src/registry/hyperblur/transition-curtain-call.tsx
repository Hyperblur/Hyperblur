"use client";

import * as React from "react";

export interface TransitionCurtainCallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  from?: React.ReactNode;
  to?: React.ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  autoPlay?: boolean;
  interval?: number;
  duration?: number;
  color?: string;
  trim?: string;
  spotlight?: boolean;
}

const css = `
.hb-vj5 {
  position: relative;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: #050506;
}
.hb-vj5 *, .hb-vj5 *::before, .hb-vj5 *::after { box-sizing: border-box; }
.hb-vj5-l {
  grid-area: 1 / 1;
  display: grid;
  min-width: 0;
  min-height: 0;
  visibility: hidden;
  transition: visibility 0s linear calc(var(--hb-vj5-d) * 0.5);
}
.hb-vj5-l[data-on="true"] { visibility: visible; }
.hb-vj5-stage {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}
.hb-vj5-p {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 51%;
  transform: scaleX(0);
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.55)),
    repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--hb-vj5-c) 55%, #000000) 0px,
      var(--hb-vj5-c) 9px,
      color-mix(in srgb, var(--hb-vj5-c) 78%, #ffffff) 15px,
      var(--hb-vj5-c) 21px,
      color-mix(in srgb, var(--hb-vj5-c) 48%, #000000) 30px
    );
  box-shadow: inset 0 -5px 0 var(--hb-vj5-trim), inset 0 -7px 0 rgba(0, 0, 0, 0.5);
}
.hb-vj5-p[data-side="l"] { left: 0; transform-origin: 0 0; }
.hb-vj5-p[data-side="r"] { right: 0; transform-origin: 100% 0; }
.hb-vj5-p::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 18px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
}
.hb-vj5-p[data-side="l"]::after { right: 0; transform: scaleX(-1); }
.hb-vj5-p[data-side="r"]::after { left: 0; }
.hb-vj5-val {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 15%;
  min-height: 16px;
  transform: translateY(-110%);
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 60%),
    repeating-linear-gradient(90deg, color-mix(in srgb, var(--hb-vj5-c) 70%, #000000) 0 2px, var(--hb-vj5-c) 2px 16px, color-mix(in srgb, var(--hb-vj5-c) 85%, #ffffff) 16px 20px, var(--hb-vj5-c) 20px 34px);
  border-bottom: 2px solid var(--hb-vj5-trim);
  -webkit-mask: linear-gradient(#000, #000) top / 100% calc(100% - 7px) no-repeat, radial-gradient(circle 9px at 50% 0, #000 96%, transparent 100%) bottom / 18px 7px repeat-x;
  mask: linear-gradient(#000, #000) top / 100% calc(100% - 7px) no-repeat, radial-gradient(circle 9px at 50% 0, #000 96%, transparent 100%) bottom / 18px 7px repeat-x;
}
.hb-vj5-spot {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(ellipse 34% 58% at 50% 62%, rgba(255, 236, 200, 0.42), rgba(255, 236, 200, 0.08) 55%, transparent 72%);
  mix-blend-mode: screen;
}
.hb-vj5[data-ran="true"][data-active="true"] .hb-vj5-p[data-side="l"] { animation: hb-vj5-l-a var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="false"] .hb-vj5-p[data-side="l"] { animation: hb-vj5-l-b var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="true"] .hb-vj5-p[data-side="r"] { animation: hb-vj5-r-a var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="false"] .hb-vj5-p[data-side="r"] { animation: hb-vj5-r-b var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="true"] .hb-vj5-val { animation: hb-vj5-v-a var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="false"] .hb-vj5-val { animation: hb-vj5-v-b var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="true"] .hb-vj5-spot { animation: hb-vj5-s-a var(--hb-vj5-d) linear both; }
.hb-vj5[data-ran="true"][data-active="false"] .hb-vj5-spot { animation: hb-vj5-s-b var(--hb-vj5-d) linear both; }
@keyframes hb-vj5-l-a {
  0% { transform: scaleX(0) skewX(0deg); animation-timing-function: cubic-bezier(0.55, 0, 0.3, 1); }
  30% { transform: scaleX(0.82) skewX(-4deg); animation-timing-function: cubic-bezier(0.3, 0, 0.3, 1); }
  42% { transform: scaleX(1.02) skewX(1.5deg); animation-timing-function: ease-out; }
  48% { transform: scaleX(1) skewX(0deg); }
  58% { transform: scaleX(1) skewX(0deg); animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1); }
  84% { transform: scaleX(0.12) skewX(5deg); animation-timing-function: ease-out; }
  100% { transform: scaleX(0) skewX(0deg); }
}
@keyframes hb-vj5-l-b {
  0% { transform: scaleX(0) skewX(0deg); animation-timing-function: cubic-bezier(0.55, 0, 0.3, 1); }
  30% { transform: scaleX(0.82) skewX(-4deg); animation-timing-function: cubic-bezier(0.3, 0, 0.3, 1); }
  42% { transform: scaleX(1.02) skewX(1.5deg); animation-timing-function: ease-out; }
  48% { transform: scaleX(1) skewX(0deg); }
  58% { transform: scaleX(1) skewX(0deg); animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1); }
  84% { transform: scaleX(0.12) skewX(5deg); animation-timing-function: ease-out; }
  100% { transform: scaleX(0) skewX(0deg); }
}
@keyframes hb-vj5-r-a {
  0% { transform: scaleX(0) skewX(0deg); animation-timing-function: cubic-bezier(0.55, 0, 0.3, 1); }
  30% { transform: scaleX(0.82) skewX(4deg); animation-timing-function: cubic-bezier(0.3, 0, 0.3, 1); }
  42% { transform: scaleX(1.02) skewX(-1.5deg); animation-timing-function: ease-out; }
  48% { transform: scaleX(1) skewX(0deg); }
  58% { transform: scaleX(1) skewX(0deg); animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1); }
  84% { transform: scaleX(0.12) skewX(-5deg); animation-timing-function: ease-out; }
  100% { transform: scaleX(0) skewX(0deg); }
}
@keyframes hb-vj5-r-b {
  0% { transform: scaleX(0) skewX(0deg); animation-timing-function: cubic-bezier(0.55, 0, 0.3, 1); }
  30% { transform: scaleX(0.82) skewX(4deg); animation-timing-function: cubic-bezier(0.3, 0, 0.3, 1); }
  42% { transform: scaleX(1.02) skewX(-1.5deg); animation-timing-function: ease-out; }
  48% { transform: scaleX(1) skewX(0deg); }
  58% { transform: scaleX(1) skewX(0deg); animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1); }
  84% { transform: scaleX(0.12) skewX(-5deg); animation-timing-function: ease-out; }
  100% { transform: scaleX(0) skewX(0deg); }
}
@keyframes hb-vj5-v-a {
  0% { transform: translateY(-110%); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
  26% { transform: translateY(0); }
  70% { transform: translateY(0); animation-timing-function: cubic-bezier(0.6, 0, 0.8, 0.4); }
  100% { transform: translateY(-110%); }
}
@keyframes hb-vj5-v-b {
  0% { transform: translateY(-110%); animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
  26% { transform: translateY(0); }
  70% { transform: translateY(0); animation-timing-function: cubic-bezier(0.6, 0, 0.8, 0.4); }
  100% { transform: translateY(-110%); }
}
@keyframes hb-vj5-s-a {
  0%, 40% { opacity: 0; }
  50% { opacity: 1; }
  58% { opacity: 0.85; }
  66%, 100% { opacity: 0; }
}
@keyframes hb-vj5-s-b {
  0%, 40% { opacity: 0; }
  50% { opacity: 1; }
  58% { opacity: 0.85; }
  66%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vj5-l { transition: none; }
  .hb-vj5[data-ran="true"] .hb-vj5-p,
  .hb-vj5[data-ran="true"] .hb-vj5-val,
  .hb-vj5[data-ran="true"] .hb-vj5-spot { animation: none !important; }
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

export function TransitionCurtainCall({
  children,
  from,
  to,
  active,
  defaultActive = false,
  onActiveChange,
  autoPlay = false,
  interval = 3600,
  duration = 2000,
  color = "#5a1220",
  trim = "#c9a45c",
  spotlight = true,
  className,
  style,
  ...rest
}: TransitionCurtainCallProps) {
  const value = useSwap(active, defaultActive, onActiveChange, autoPlay, interval);
  const [prev, setPrev] = React.useState(value);
  const [ran, setRan] = React.useState(false);
  if (prev !== value) {
    setPrev(value);
    setRan(true);
  }
  const kids = React.Children.toArray(children);
  const a = from ?? kids[0] ?? <Scene tone="radial-gradient(circle at 50% 30%, #3b2a1a, #0c0906 70%)" kicker="Act one" title="The letter arrives" />;
  const b = to ?? kids[1] ?? <Scene tone="radial-gradient(circle at 50% 30%, #1a2b3b, #06090c 70%)" kicker="Act two" title="A storm at sea" />;

  const vars = {
    "--hb-vj5-d": `${duration}ms`,
    "--hb-vj5-c": color,
    "--hb-vj5-trim": trim,
  } as React.CSSProperties;

  return (
    <div className={["hb-vj5", className].filter(Boolean).join(" ")} style={{ ...vars, ...style }} data-active={value} data-ran={ran} {...rest}>
      <style href="hb-transition-curtain-call" precedence="default">{css}</style>
      <div className="hb-vj5-l" data-on={!value} aria-hidden={value} inert={value}>{a}</div>
      <div className="hb-vj5-l" data-on={value} aria-hidden={!value} inert={!value}>{b}</div>
      <div className="hb-vj5-stage" aria-hidden="true">
        <div className="hb-vj5-p" data-side="l" />
        <div className="hb-vj5-p" data-side="r" />
        {spotlight ? <div className="hb-vj5-spot" /> : null}
        <div className="hb-vj5-val" />
      </div>
    </div>
  );
}
