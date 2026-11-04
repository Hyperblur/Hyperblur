"use client";

import * as React from "react";

export type CurtainIrisTrigger = "mount" | "view" | "manual";
export type CurtainIrisOrigin = "center" | "pointer" | { x: number; y: number };

export interface CurtainIrisProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainIrisTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  origin?: CurtainIrisOrigin;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
@property --hb-zy5-r {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
.hb-zy5 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  background: var(--hb-zy5-col);
}
.hb-zy5 *, .hb-zy5 *::before, .hb-zy5 *::after { box-sizing: border-box; }
.hb-zy5[data-pick="true"][data-open="false"] { cursor: crosshair; }
.hb-zy5:focus-visible { outline: 2px solid var(--hb-zy5-acc); outline-offset: 2px; }
.hb-zy5-k {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    repeating-radial-gradient(circle at var(--hb-zy5-x) var(--hb-zy5-y), rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 24px),
    repeating-conic-gradient(from 0deg at var(--hb-zy5-x) var(--hb-zy5-y), rgba(255, 255, 255, 0.025) 0deg 15deg, transparent 15deg 30deg),
    radial-gradient(circle at var(--hb-zy5-x) var(--hb-zy5-y), color-mix(in srgb, var(--hb-zy5-acc) 22%, transparent), transparent 55%);
}
.hb-zy5-v, .hb-zy5-h, .hb-zy5-o {
  position: absolute;
  background: color-mix(in srgb, var(--hb-zy5-acc) 45%, transparent);
}
.hb-zy5-v { top: 0; bottom: 0; left: var(--hb-zy5-x); width: 1px; }
.hb-zy5-h { left: 0; right: 0; top: var(--hb-zy5-y); height: 1px; }
.hb-zy5-o {
  left: var(--hb-zy5-x);
  top: var(--hb-zy5-y);
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 1px solid color-mix(in srgb, var(--hb-zy5-acc) 80%, #ffffff);
  border-radius: 50%;
  background: transparent;
  animation: hb-zy5-pulse 1.6s ease-in-out infinite;
}
.hb-zy5-g {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(circle at var(--hb-zy5-x) var(--hb-zy5-y), #ffffff, var(--hb-zy5-acc) 30%);
  --hb-zy5-r: 0%;
  clip-path: circle(var(--hb-zy5-r) at var(--hb-zy5-x) var(--hb-zy5-y));
  transition: --hb-zy5-r calc(var(--hb-zy5-d) * 1.12) cubic-bezier(0.65, 0, 0.25, 1);
}
.hb-zy5-c {
  position: relative;
  z-index: 2;
  height: 100%;
  --hb-zy5-r: 0%;
  clip-path: circle(var(--hb-zy5-r) at var(--hb-zy5-x) var(--hb-zy5-y));
  transition: --hb-zy5-r var(--hb-zy5-d) cubic-bezier(0.65, 0, 0.25, 1);
}
.hb-zy5[data-open="true"] .hb-zy5-g {
  --hb-zy5-r: 149%;
  transition-duration: calc(var(--hb-zy5-d) * 0.86);
}
.hb-zy5[data-open="true"] .hb-zy5-c { --hb-zy5-r: 145%; }
.hb-zy5[data-instant="true"] .hb-zy5-g,
.hb-zy5[data-instant="true"] .hb-zy5-c { transition: none !important; }
.hb-zy5-s {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  padding: 22px;
  color: #ededed;
  background:
    radial-gradient(circle at 70% 30%, rgba(185, 140, 255, 0.5), transparent 40%),
    radial-gradient(circle at 30% 80%, rgba(47, 123, 255, 0.4), transparent 45%),
    #07080d;
}
.hb-zy5-s small {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.6);
}
.hb-zy5-s strong { font-size: 26px; line-height: 1.1; font-weight: 600; }
@keyframes hb-zy5-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.15); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zy5-g, .hb-zy5-c { transition: none !important; }
  .hb-zy5-o { animation: none; }
}
`;

const spots = [
  { x: 50, y: 50 },
  { x: 24, y: 32 },
  { x: 76, y: 68 },
  { x: 68, y: 26 },
  { x: 30, y: 72 },
];

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainIrisTrigger,
  replay: string | number | undefined,
  closeAfter: number | undefined,
  loop: boolean,
  total: number,
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const controlled = open !== undefined;
  const [inner, setInner] = React.useState(defaultOpen);
  const [instant, setInstant] = React.useState(false);
  const isOpen = controlled ? open : inner;
  const live = React.useRef({ controlled, onOpenChange, isOpen });
  const opened = React.useRef(defaultOpen);
  const prevReplay = React.useRef(replay);

  React.useEffect(() => {
    live.current = { controlled, onOpenChange, isOpen };
    if (isOpen) opened.current = true;
  });

  const setOpen = React.useCallback((next: boolean) => {
    if (live.current.isOpen === next) return;
    live.current.isOpen = next;
    if (!live.current.controlled) setInner(next);
    live.current.onOpenChange?.(next);
  }, []);

  React.useEffect(() => {
    if (trigger !== "mount") return;
    let b = 0;
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => setOpen(true));
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [trigger, setOpen]);

  React.useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setOpen(true);
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, setOpen]);

  React.useEffect(() => {
    if (prevReplay.current === replay) return;
    prevReplay.current = replay;
    let b = 0;
    let c = 0;
    const a = requestAnimationFrame(() => {
      setInstant(true);
      setOpen(false);
      b = requestAnimationFrame(() => {
        c = requestAnimationFrame(() => {
          setInstant(false);
          setOpen(true);
        });
      });
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
      cancelAnimationFrame(c);
    };
  }, [replay, setOpen]);

  React.useEffect(() => {
    if (instant) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    if (isOpen && closeAfter !== undefined) {
      t = window.setTimeout(() => setOpen(false), total + closeAfter);
    } else if (!isOpen && loop && opened.current) {
      t = window.setTimeout(() => setOpen(true), total + 800);
    }
    return () => window.clearTimeout(t);
  }, [isOpen, instant, closeAfter, loop, total, setOpen]);

  return { ref, isOpen, instant, setOpen };
}

export function CurtainIris({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 1000,
  color = "#0b0c10",
  accent = "#2f7bff",
  origin = "center",
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  onPointerDown,
  onKeyDown,
  ...rest
}: CurtainIrisProps) {
  const pick = origin === "pointer";
  const [point, setPoint] = React.useState(() =>
    typeof origin === "object" ? { x: origin.x, y: origin.y } : spots[0],
  );
  const clicked = React.useRef(false);
  const step = React.useRef(0);
  const timer = React.useRef(0);
  const live = React.useRef({ pick, onOpenChange, duration });

  React.useEffect(() => {
    live.current = { pick, onOpenChange, duration };
  });

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleChange = React.useCallback((next: boolean) => {
    const cur = live.current;
    if (!next && cur.pick && !clicked.current) {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        step.current = (step.current + 1) % spots.length;
        setPoint(spots[step.current]);
      }, cur.duration * 1.15);
    }
    cur.onOpenChange?.(next);
  }, []);

  const { ref, isOpen, instant, setOpen } = useCurtain(
    open,
    defaultOpen,
    handleChange,
    trigger,
    replay,
    closeAfter,
    loop,
    duration,
  );

  const at = typeof origin === "object" ? origin : pick ? point : spots[0];

  const reveal = (x: number, y: number) => {
    clicked.current = true;
    window.clearTimeout(timer.current);
    setPoint({ x, y });
    requestAnimationFrame(() => setOpen(true));
  };

  const vars = {
    "--hb-zy5-col": color,
    "--hb-zy5-acc": accent,
    "--hb-zy5-d": `${duration}ms`,
    "--hb-zy5-x": `${at.x.toFixed(2)}%`,
    "--hb-zy5-y": `${at.y.toFixed(2)}%`,
    ...style,
  } as React.CSSProperties;

  const interactive = pick && !isOpen;

  return (
    <>
      <style href="hb-curtain-iris" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy5 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        data-pick={pick}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? "Reveal content" : undefined}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (!interactive || e.button !== 0) return;
          const r = e.currentTarget.getBoundingClientRect();
          if (!r.width || !r.height) return;
          reveal(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!interactive || (e.key !== "Enter" && e.key !== " ")) return;
          e.preventDefault();
          reveal(50, 50);
        }}
        {...rest}
      >
        <div className="hb-zy5-k" aria-hidden="true">
          <span className="hb-zy5-v" />
          <span className="hb-zy5-h" />
          <span className="hb-zy5-o" />
        </div>
        <div className="hb-zy5-g" aria-hidden="true" />
        <div className="hb-zy5-c">
          {children ?? (
            <div className="hb-zy5-s">
              <small>Live from the observatory</small>
              <strong>Saturn at opposition</strong>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
