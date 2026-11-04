"use client";

import * as React from "react";

export type CurtainBlindsTrigger = "mount" | "view" | "manual";

export interface CurtainBlindsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainBlindsTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  direction?: "horizontal" | "vertical";
  slats?: number;
  stagger?: number;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
.hb-zy1 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-zy1 *, .hb-zy1 *::before, .hb-zy1 *::after { box-sizing: border-box; }
.hb-zy1-c { position: relative; z-index: 0; height: 100%; }
.hb-zy1-k {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}
.hb-zy1[data-open="false"] .hb-zy1-k { pointer-events: auto; }
.hb-zy1[data-dir="vertical"] .hb-zy1-k { flex-direction: row; }
.hb-zy1-l {
  position: relative;
  flex: 1 1 0;
  margin: -0.5px 0;
  background:
    linear-gradient(180deg,
      color-mix(in srgb, var(--hb-zy1-col) 82%, #ffffff) 0%,
      var(--hb-zy1-col) 38%,
      color-mix(in srgb, var(--hb-zy1-col) 70%, #000000) 100%);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--hb-zy1-acc) 45%, transparent),
    inset 0 -1px 0 rgba(0, 0, 0, 0.45);
  transform: perspective(520px) rotateX(0deg);
  backface-visibility: hidden;
  transition: transform var(--hb-zy1-d) cubic-bezier(0.65, 0, 0.25, 1);
  transition-delay: calc(var(--hb-zy1-j) * var(--hb-zy1-s));
}
.hb-zy1[data-dir="vertical"] .hb-zy1-l {
  margin: 0 -0.5px;
  background:
    linear-gradient(90deg,
      color-mix(in srgb, var(--hb-zy1-col) 82%, #ffffff) 0%,
      var(--hb-zy1-col) 38%,
      color-mix(in srgb, var(--hb-zy1-col) 70%, #000000) 100%);
  box-shadow:
    inset 1px 0 0 color-mix(in srgb, var(--hb-zy1-acc) 45%, transparent),
    inset -1px 0 0 rgba(0, 0, 0, 0.45);
  transform: perspective(520px) rotateY(0deg);
}
.hb-zy1-l::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #000000;
  opacity: 0;
  transition: opacity var(--hb-zy1-d) ease;
  transition-delay: inherit;
}
.hb-zy1[data-open="true"] .hb-zy1-l {
  transform: perspective(520px) rotateX(90deg);
  transition-delay: calc(var(--hb-zy1-i) * var(--hb-zy1-s));
}
.hb-zy1[data-open="true"][data-dir="vertical"] .hb-zy1-l {
  transform: perspective(520px) rotateY(-90deg);
}
.hb-zy1[data-open="true"] .hb-zy1-l::after { opacity: 0.7; }
.hb-zy1[data-instant="true"] .hb-zy1-k,
.hb-zy1[data-instant="true"] .hb-zy1-k * ,
.hb-zy1[data-instant="true"] .hb-zy1-k *::after { transition: none !important; }
.hb-zy1-s {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  padding: 22px;
  color: #ededed;
  background:
    radial-gradient(circle at 78% 22%, rgba(255, 196, 120, 0.55), transparent 38%),
    linear-gradient(160deg, #1b2440 0%, #0e1324 55%, #070910 100%);
}
.hb-zy1-s small {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.6);
}
.hb-zy1-s strong { font-size: 26px; line-height: 1.1; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-zy1-k, .hb-zy1-k *, .hb-zy1-k *::after { transition: none !important; }
}
`;

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainBlindsTrigger,
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

export function CurtainBlinds({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 700,
  color = "#171717",
  accent = "#2f7bff",
  direction = "horizontal",
  slats = 8,
  stagger = 55,
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  ...rest
}: CurtainBlindsProps) {
  const count = Math.max(2, Math.min(40, Math.round(slats)));
  const total = duration + stagger * (count - 1);
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

  const vars = {
    "--hb-zy1-col": color,
    "--hb-zy1-acc": accent,
    "--hb-zy1-d": `${duration}ms`,
    "--hb-zy1-s": `${stagger}ms`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-curtain-blinds" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy1 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        data-dir={direction}
        {...rest}
      >
        <div className="hb-zy1-c">
          {children ?? (
            <div className="hb-zy1-s">
              <small>Now showing</small>
              <strong>Midnight Ferry</strong>
            </div>
          )}
        </div>
        <div className="hb-zy1-k" aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className="hb-zy1-l"
              style={{ "--hb-zy1-i": i, "--hb-zy1-j": count - 1 - i } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </>
  );
}
