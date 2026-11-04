"use client";

import * as React from "react";

export type CurtainDoorsTrigger = "mount" | "view" | "manual";

export interface CurtainDoorsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainDoorsTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  direction?: "horizontal" | "vertical";
  angle?: number;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
.hb-zy3 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-zy3 *, .hb-zy3 *::before, .hb-zy3 *::after { box-sizing: border-box; }
.hb-zy3-c {
  position: relative;
  z-index: 0;
  height: 100%;
  transform: scale(0.96);
  filter: brightness(0.6);
  transition: transform var(--hb-zy3-d) cubic-bezier(0.22, 1, 0.36, 1), filter var(--hb-zy3-d) ease;
}
.hb-zy3[data-open="true"] .hb-zy3-c { transform: scale(1); filter: none; }
.hb-zy3-k {
  position: absolute;
  inset: 0;
  z-index: 1;
  perspective: 1100px;
  pointer-events: none;
}
.hb-zy3[data-open="false"] .hb-zy3-k { pointer-events: auto; }
.hb-zy3-p {
  position: absolute;
  overflow: hidden;
  background:
    linear-gradient(var(--hb-zy3-a), color-mix(in srgb, var(--hb-zy3-col) 86%, #ffffff), var(--hb-zy3-col) 60%, color-mix(in srgb, var(--hb-zy3-col) 78%, #000000));
  backface-visibility: hidden;
  transition: transform var(--hb-zy3-d) cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-zy3-p::before {
  content: "";
  position: absolute;
  inset: 12%;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  box-shadow: inset 0 0 0 6px rgba(0, 0, 0, 0.12), inset 0 0 0 7px rgba(255, 255, 255, 0.04);
}
.hb-zy3-p::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(var(--hb-zy3-a), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.9));
  opacity: 0;
  transition: opacity var(--hb-zy3-d) cubic-bezier(0.7, 0, 0.2, 1);
}
.hb-zy3[data-open="true"] .hb-zy3-p::after { opacity: 1; }
.hb-zy3-h {
  position: absolute;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffffff, color-mix(in srgb, var(--hb-zy3-acc) 60%, #ffffff));
  box-shadow: 0 0 10px color-mix(in srgb, var(--hb-zy3-acc) 70%, transparent);
}
.hb-zy3[data-dir="horizontal"] .hb-zy3-p { top: 0; bottom: 0; width: calc(50% + 0.5px); }
.hb-zy3[data-dir="horizontal"] .hb-zy3-p:first-child { left: 0; transform-origin: 0% 50%; --hb-zy3-a: 90deg; }
.hb-zy3[data-dir="horizontal"] .hb-zy3-p:nth-child(2) { right: 0; transform-origin: 100% 50%; --hb-zy3-a: 270deg; }
.hb-zy3[data-dir="horizontal"] .hb-zy3-h { top: 39%; width: 3px; height: 22%; }
.hb-zy3[data-dir="horizontal"] .hb-zy3-p:first-child .hb-zy3-h { right: 8%; }
.hb-zy3[data-dir="horizontal"] .hb-zy3-p:nth-child(2) .hb-zy3-h { left: 8%; }
.hb-zy3[data-dir="vertical"] .hb-zy3-p { left: 0; right: 0; height: calc(50% + 0.5px); }
.hb-zy3[data-dir="vertical"] .hb-zy3-p:first-child { top: 0; transform-origin: 50% 0%; --hb-zy3-a: 180deg; }
.hb-zy3[data-dir="vertical"] .hb-zy3-p:nth-child(2) { bottom: 0; transform-origin: 50% 100%; --hb-zy3-a: 0deg; }
.hb-zy3[data-dir="vertical"] .hb-zy3-h { left: 39%; height: 3px; width: 22%; }
.hb-zy3[data-dir="vertical"] .hb-zy3-p:first-child .hb-zy3-h { bottom: 10%; }
.hb-zy3[data-dir="vertical"] .hb-zy3-p:nth-child(2) .hb-zy3-h { top: 10%; }
.hb-zy3[data-open="true"][data-dir="horizontal"] .hb-zy3-p:first-child { transform: rotateY(var(--hb-zy3-r)); }
.hb-zy3[data-open="true"][data-dir="horizontal"] .hb-zy3-p:nth-child(2) { transform: rotateY(calc(var(--hb-zy3-r) * -1)); }
.hb-zy3[data-open="true"][data-dir="vertical"] .hb-zy3-p:first-child { transform: rotateX(calc(var(--hb-zy3-r) * -1)); }
.hb-zy3[data-open="true"][data-dir="vertical"] .hb-zy3-p:nth-child(2) { transform: rotateX(var(--hb-zy3-r)); }
.hb-zy3-m {
  position: absolute;
  z-index: 2;
  background: var(--hb-zy3-acc);
  box-shadow: 0 0 14px 2px var(--hb-zy3-acc);
  opacity: 0.85;
  transition: opacity calc(var(--hb-zy3-d) * 0.25) ease;
}
.hb-zy3[data-dir="horizontal"] .hb-zy3-m { top: 0; bottom: 0; left: 50%; width: 1px; margin-left: -0.5px; }
.hb-zy3[data-dir="vertical"] .hb-zy3-m { left: 0; right: 0; top: 50%; height: 1px; margin-top: -0.5px; }
.hb-zy3[data-open="true"] .hb-zy3-m { opacity: 0; }
.hb-zy3[data-instant="true"] .hb-zy3-c,
.hb-zy3[data-instant="true"] .hb-zy3-k *,
.hb-zy3[data-instant="true"] .hb-zy3-k *::after { transition: none !important; }
.hb-zy3-s {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 24px;
  text-align: center;
  color: #ededed;
  background:
    radial-gradient(ellipse at 50% 110%, rgba(255, 186, 105, 0.5), transparent 60%),
    linear-gradient(180deg, #17120d 0%, #0b0907 100%);
}
.hb-zy3-s small {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.6);
}
.hb-zy3-s strong { font-size: 26px; line-height: 1.1; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-zy3-c, .hb-zy3-k *, .hb-zy3-k *::after { transition: none !important; }
}
`;

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainDoorsTrigger,
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

export function CurtainDoors({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 1100,
  color = "#1c1c1f",
  accent = "#2f7bff",
  direction = "horizontal",
  angle = 96,
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  ...rest
}: CurtainDoorsProps) {
  const { ref, isOpen, instant } = useCurtain(
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    replay,
    closeAfter,
    loop,
    duration,
  );

  const vars = {
    "--hb-zy3-col": color,
    "--hb-zy3-acc": accent,
    "--hb-zy3-d": `${duration}ms`,
    "--hb-zy3-r": `${Math.max(0, Math.min(180, angle))}deg`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-curtain-doors" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy3 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        data-dir={direction}
        {...rest}
      >
        <div className="hb-zy3-c">
          {children ?? (
            <div className="hb-zy3-s">
              <small>Doors open at 7 pm</small>
              <strong>The Lantern Room</strong>
            </div>
          )}
        </div>
        <div className="hb-zy3-k" aria-hidden="true">
          <span className="hb-zy3-p">
            <span className="hb-zy3-h" />
          </span>
          <span className="hb-zy3-p">
            <span className="hb-zy3-h" />
          </span>
          <span className="hb-zy3-m" />
        </div>
      </div>
    </>
  );
}
