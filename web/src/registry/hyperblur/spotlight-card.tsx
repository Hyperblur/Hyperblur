"use client";

import * as React from "react";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  radius?: number;
  borderWidth?: number;
  idle?: number;
}

export interface SpotlightGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const css = `
.hb-spc {
  --hb-spc-x: 50%;
  --hb-spc-y: 0%;
  position: relative;
  box-sizing: border-box;
  isolation: isolate;
  overflow: hidden;
  border-radius: var(--hb-spc-r);
  background: #0f0f10;
  color: #ededed;
  font-family: inherit;
  box-shadow: inset 0 0 0 var(--hb-spc-bw) rgba(255, 255, 255, 0.07);
}
.hb-spc *, .hb-spc *::before, .hb-spc *::after { box-sizing: border-box; }
.hb-spc::before, .hb-spc::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity .45s ease;
}
.hb-spc::before {
  z-index: -1;
  background: radial-gradient(var(--hb-spc-sz) circle at var(--hb-spc-x) var(--hb-spc-y), color-mix(in srgb, var(--hb-spc-c) 20%, transparent), transparent 70%);
}
.hb-spc::after {
  z-index: 2;
  padding: var(--hb-spc-bw);
  background: radial-gradient(calc(var(--hb-spc-sz) * 0.75) circle at var(--hb-spc-x) var(--hb-spc-y), var(--hb-spc-c), color-mix(in srgb, var(--hb-spc-c) 30%, transparent) 40%, transparent 72%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-spc::before { opacity: var(--hb-spc-idle); }
.hb-spc::after { opacity: calc(var(--hb-spc-idle) * 0.8); }
.hb-spc[data-on]::before, .hb-spc[data-on]::after { opacity: 1; transition: opacity .2s ease; }
.hb-spc-group { position: relative; }
@media (hover: none) {
  .hb-spc::before, .hb-spc::after { opacity: 1; }
  .hb-spc::before {
    background: radial-gradient(var(--hb-spc-sz) circle at 30% 0%, color-mix(in srgb, var(--hb-spc-c) 14%, transparent), transparent 70%);
  }
  .hb-spc::after {
    background: radial-gradient(calc(var(--hb-spc-sz) * 0.75) circle at 30% 0%, var(--hb-spc-c), color-mix(in srgb, var(--hb-spc-c) 25%, transparent) 40%, transparent 72%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hb-spc::before, .hb-spc::after { transition: none; }
}
`;

const GroupContext = React.createContext(false);

function unlight(card: HTMLElement) {
  card.removeAttribute("data-on");
  card.style.removeProperty("--hb-spc-x");
  card.style.removeProperty("--hb-spc-y");
}

function place(card: HTMLElement, x: number, y: number) {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--hb-spc-x", `${(x - r.left).toFixed(1)}px`);
  card.style.setProperty("--hb-spc-y", `${(y - r.top).toFixed(1)}px`);
}

function useRafPointer(apply: (x: number, y: number) => void) {
  const frame = React.useRef(0);
  const point = React.useRef({ x: 0, y: 0 });
  const latest = React.useRef(apply);

  React.useEffect(() => {
    latest.current = apply;
  });

  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return React.useCallback((x: number, y: number) => {
    point.current = { x, y };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      latest.current(point.current.x, point.current.y);
    });
  }, []);
}

export function SpotlightGroup({
  children,
  className = "",
  onPointerMove,
  onPointerLeave,
  ...rest
}: SpotlightGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const schedule = useRafPointer((x, y) => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".hb-spc").forEach((card) => {
      place(card, x, y);
      card.setAttribute("data-on", "");
    });
  });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    if (e.pointerType === "touch") return;
    schedule(e.clientX, e.clientY);
  }

  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".hb-spc").forEach(unlight);
  }

  return (
    <GroupContext.Provider value={true}>
      <div ref={ref} className={`hb-spc-group ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave} {...rest}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}

export function SpotlightCard({
  children,
  color = "#7fb3ff",
  size = 320,
  radius = 16,
  borderWidth = 1,
  idle = 0.35,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: SpotlightCardProps) {
  const grouped = React.useContext(GroupContext);
  const ref = React.useRef<HTMLDivElement>(null);

  const schedule = useRafPointer((x, y) => {
    const el = ref.current;
    if (!el) return;
    place(el, x, y);
    el.setAttribute("data-on", "");
  });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    if (grouped || e.pointerType === "touch") return;
    schedule(e.clientX, e.clientY);
  }

  function handleLeave(e: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(e);
    if (grouped) return;
    if (ref.current) unlight(ref.current);
  }

  const vars = {
    "--hb-spc-c": color,
    "--hb-spc-sz": `${Math.max(40, size)}px`,
    "--hb-spc-r": `${Math.max(0, radius)}px`,
    "--hb-spc-bw": `${Math.max(0, borderWidth)}px`,
    "--hb-spc-idle": Math.min(1, Math.max(0, idle)).toFixed(2),
    ...style,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`hb-spc ${className}`} style={vars} onPointerMove={handleMove} onPointerLeave={handleLeave} {...rest}>
      <style href="hb-spotlight-card" precedence="default">{css}</style>
      {children}
    </div>
  );
}
