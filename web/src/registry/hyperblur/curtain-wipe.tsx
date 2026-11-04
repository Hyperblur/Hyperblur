"use client";

import * as React from "react";

export type CurtainWipeTrigger = "mount" | "view" | "manual";

export interface CurtainWipeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainWipeTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  direction?: "left" | "right" | "up" | "down";
  feather?: number;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
@property --hb-zy7-p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
.hb-zy7 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  --hb-zy7-p: 0;
  transition: --hb-zy7-p var(--hb-zy7-d) cubic-bezier(0.6, 0, 0.3, 1);
}
.hb-zy7[data-open="true"] { --hb-zy7-p: 1; }
.hb-zy7 *, .hb-zy7 *::before, .hb-zy7 *::after { box-sizing: border-box; }
.hb-zy7-c { position: relative; z-index: 0; height: 100%; }
.hb-zy7-k, .hb-zy7-g {
  --hb-zy7-e: calc(var(--hb-zy7-p) * (100% + var(--hb-zy7-fm)));
  --hb-zy7-w: calc(6% + var(--hb-zy7-p) * (var(--hb-zy7-fm) - 6%));
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hb-zy7-k {
  z-index: 1;
  background:
    linear-gradient(var(--hb-zy7-a), color-mix(in srgb, var(--hb-zy7-acc) 30%, var(--hb-zy7-col)) 0%, var(--hb-zy7-col) 45%, color-mix(in srgb, var(--hb-zy7-col) 80%, #000000) 100%);
  -webkit-mask-image: linear-gradient(var(--hb-zy7-a), transparent calc(var(--hb-zy7-e) - var(--hb-zy7-w)), #000000 var(--hb-zy7-e));
  mask-image: linear-gradient(var(--hb-zy7-a), transparent calc(var(--hb-zy7-e) - var(--hb-zy7-w)), #000000 var(--hb-zy7-e));
}
.hb-zy7[data-open="false"] .hb-zy7-k { pointer-events: auto; }
.hb-zy7-g {
  z-index: 2;
  background: linear-gradient(var(--hb-zy7-a), var(--hb-zy7-acc), #ffffff);
  mix-blend-mode: screen;
  opacity: 0.55;
  -webkit-mask-image: linear-gradient(var(--hb-zy7-a), transparent calc(var(--hb-zy7-e) - var(--hb-zy7-w)), #000000 calc(var(--hb-zy7-e) - var(--hb-zy7-w) * 0.25), transparent calc(var(--hb-zy7-e) + var(--hb-zy7-p) * 2%));
  mask-image: linear-gradient(var(--hb-zy7-a), transparent calc(var(--hb-zy7-e) - var(--hb-zy7-w)), #000000 calc(var(--hb-zy7-e) - var(--hb-zy7-w) * 0.25), transparent calc(var(--hb-zy7-e) + var(--hb-zy7-p) * 2%));
}
.hb-zy7[data-instant="true"] { transition: none !important; }
.hb-zy7-s {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  padding: 22px;
  color: #ededed;
  background:
    radial-gradient(circle at 25% 25%, rgba(255, 140, 90, 0.5), transparent 40%),
    linear-gradient(200deg, #1a1420 0%, #0a0a0f 100%);
}
.hb-zy7-s small {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.6);
}
.hb-zy7-s strong { font-size: 26px; line-height: 1.1; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-zy7 { transition: none !important; }
}
`;

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainWipeTrigger,
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

const angles = { right: "90deg", left: "270deg", down: "180deg", up: "0deg" } as const;

export function CurtainWipe({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 1200,
  color = "#111111",
  accent = "#2f7bff",
  direction = "right",
  feather = 0.4,
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  ...rest
}: CurtainWipeProps) {
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
  const soft = Math.max(0.08, Math.min(0.9, feather));

  const vars = {
    "--hb-zy7-col": color,
    "--hb-zy7-acc": accent,
    "--hb-zy7-d": `${duration}ms`,
    "--hb-zy7-a": angles[direction],
    "--hb-zy7-fm": `${(soft * 100).toFixed(1)}%`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-curtain-wipe" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy7 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        {...rest}
      >
        <div className="hb-zy7-c">
          {children ?? (
            <div className="hb-zy7-s">
              <small>Tonight</small>
              <strong>Low tide at Harbor Point</strong>
            </div>
          )}
        </div>
        <div className="hb-zy7-k" aria-hidden="true" />
        <div className="hb-zy7-g" aria-hidden="true" />
      </div>
    </>
  );
}
