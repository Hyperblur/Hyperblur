"use client";

import * as React from "react";

export type CurtainStaggerWipeTrigger = "mount" | "view" | "manual";

export interface CurtainStaggerWipeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainStaggerWipeTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  colors?: string[];
  direction?: "up" | "down";
  bars?: number;
  stagger?: number;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
.hb-zy6 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-zy6 *, .hb-zy6 *::before, .hb-zy6 *::after { box-sizing: border-box; }
.hb-zy6-c { position: relative; z-index: 0; height: 100%; }
.hb-zy6-k {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  pointer-events: none;
}
.hb-zy6[data-open="false"] .hb-zy6-k { pointer-events: auto; }
.hb-zy6-b {
  position: relative;
  flex: 1 1 0;
  margin: 0 -0.5px;
}
.hb-zy6-f, .hb-zy6-u {
  position: absolute;
  inset: 0;
  transition: transform var(--hb-zy6-d) cubic-bezier(0.76, 0, 0.24, 1);
}
.hb-zy6-u { background: var(--hb-zy6-u); }
.hb-zy6-f {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--hb-zy6-col) 90%, #ffffff), var(--hb-zy6-col) 40%),
    var(--hb-zy6-col);
  box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.04);
}
.hb-zy6-f::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--hb-zy6-acc);
  box-shadow: 0 0 10px var(--hb-zy6-acc);
}
.hb-zy6[data-dir="up"] .hb-zy6-f::after { bottom: 0; }
.hb-zy6[data-dir="down"] .hb-zy6-f::after { top: 0; }
.hb-zy6-u { transition-delay: calc(var(--hb-zy6-i) * var(--hb-zy6-s)); }
.hb-zy6-f { transition-delay: calc(var(--hb-zy6-i) * var(--hb-zy6-s) + var(--hb-zy6-l)); }
.hb-zy6[data-open="true"] .hb-zy6-f { transition-delay: calc(var(--hb-zy6-i) * var(--hb-zy6-s)); }
.hb-zy6[data-open="true"] .hb-zy6-u { transition-delay: calc(var(--hb-zy6-i) * var(--hb-zy6-s) + var(--hb-zy6-l)); }
.hb-zy6[data-open="true"][data-dir="up"] .hb-zy6-f,
.hb-zy6[data-open="true"][data-dir="up"] .hb-zy6-u { transform: translateY(-101%); }
.hb-zy6[data-open="true"][data-dir="down"] .hb-zy6-f,
.hb-zy6[data-open="true"][data-dir="down"] .hb-zy6-u { transform: translateY(101%); }
.hb-zy6[data-instant="true"] .hb-zy6-f,
.hb-zy6[data-instant="true"] .hb-zy6-u { transition: none !important; }
.hb-zy6-s {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 24px;
  color: #ededed;
  background:
    radial-gradient(circle at 90% 10%, rgba(127, 179, 255, 0.4), transparent 45%),
    linear-gradient(150deg, #111318, #0a0a0a);
}
.hb-zy6-s small {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.6);
}
.hb-zy6-s strong { font-size: 26px; line-height: 1.1; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-zy6-f, .hb-zy6-u { transition: none !important; }
}
`;

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainStaggerWipeTrigger,
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

  return { ref, isOpen, instant };
}

const palette = ["#2f7bff", "#7fb3ff", "#ededed", "#5b5bff", "#1d4ed8"];

export function CurtainStaggerWipe({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 750,
  color = "#111111",
  accent = "#2f7bff",
  colors = palette,
  direction = "up",
  bars = 5,
  stagger = 70,
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  ...rest
}: CurtainStaggerWipeProps) {
  const count = Math.max(1, Math.min(24, Math.round(bars)));
  const lag = Math.round(duration * 0.2);
  const total = duration + lag + stagger * (count - 1);
  const { ref, isOpen, instant } = useCurtain(
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    replay,
    closeAfter,
    loop,
    total,
  );
  const list = colors.length ? colors : palette;

  const vars = {
    "--hb-zy6-col": color,
    "--hb-zy6-acc": accent,
    "--hb-zy6-d": `${duration}ms`,
    "--hb-zy6-s": `${stagger}ms`,
    "--hb-zy6-l": `${lag}ms`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-curtain-stagger-wipe" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy6 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        data-dir={direction}
        {...rest}
      >
        <div className="hb-zy6-c">
          {children ?? (
            <div className="hb-zy6-s">
              <small>Spring 2027</small>
              <strong>The Field Collection</strong>
            </div>
          )}
        </div>
        <div className="hb-zy6-k" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className="hb-zy6-b"
              style={{ "--hb-zy6-i": i, "--hb-zy6-u": list[i % list.length] } as React.CSSProperties}
            >
              <span className="hb-zy6-u" />
              <span className="hb-zy6-f" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
