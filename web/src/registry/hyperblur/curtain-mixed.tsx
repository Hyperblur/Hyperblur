"use client";

import * as React from "react";

export type CurtainMixedTrigger = "mount" | "view" | "manual";

export interface CurtainMixedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainMixedTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  direction?: "horizontal" | "vertical";
  rows?: number;
  cols?: number;
  stagger?: number;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
.hb-zy4 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-zy4 *, .hb-zy4 *::before, .hb-zy4 *::after { box-sizing: border-box; }
.hb-zy4-c { position: relative; z-index: 0; height: 100%; }
.hb-zy4-k {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(var(--hb-zy4-x), minmax(0, 1fr));
  grid-template-rows: repeat(var(--hb-zy4-y), minmax(0, 1fr));
  pointer-events: none;
}
.hb-zy4[data-open="false"] .hb-zy4-k { pointer-events: auto; }
.hb-zy4-t {
  margin: -0.5px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0) 55%),
    var(--hb-zy4-f);
  box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.05);
  clip-path: inset(0 0 0 0);
  transition: clip-path var(--hb-zy4-d) cubic-bezier(0.83, 0, 0.17, 1);
  transition-delay: calc(var(--hb-zy4-j) * var(--hb-zy4-s));
}
.hb-zy4[data-open="true"] .hb-zy4-t { transition-delay: calc(var(--hb-zy4-i) * var(--hb-zy4-s)); }
.hb-zy4[data-open="true"] .hb-zy4-t[data-way="r"] { clip-path: inset(0 0 0 100%); }
.hb-zy4[data-open="true"] .hb-zy4-t[data-way="l"] { clip-path: inset(0 100% 0 0); }
.hb-zy4[data-open="true"] .hb-zy4-t[data-way="d"] { clip-path: inset(100% 0 0 0); }
.hb-zy4[data-open="true"] .hb-zy4-t[data-way="u"] { clip-path: inset(0 0 100% 0); }
.hb-zy4[data-instant="true"] .hb-zy4-t { transition: none !important; }
.hb-zy4-s {
  display: grid;
  min-height: 220px;
  place-content: center;
  gap: 6px;
  padding: 24px;
  text-align: center;
  color: #ededed;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 92, 138, 0.5), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(47, 123, 255, 0.55), transparent 45%),
    #0d0d12;
}
.hb-zy4-s small {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(237, 237, 237, 0.6);
}
.hb-zy4-s strong { font-size: 26px; line-height: 1.1; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-zy4-t { transition: none !important; }
}
`;

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainMixedTrigger,
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

function mix(i: number) {
  return (Math.imul(i + 1, 2654435761) >>> 0) ^ ((i + 7) * 40503);
}

export function CurtainMixed({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 650,
  color = "#141416",
  accent = "#2f7bff",
  direction = "horizontal",
  rows = 4,
  cols = 6,
  stagger = 45,
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  ...rest
}: CurtainMixedProps) {
  const ny = Math.max(1, Math.min(16, Math.round(rows)));
  const nx = Math.max(1, Math.min(16, Math.round(cols)));
  const last = nx - 1 + ny - 1;
  const total = duration + stagger * last;
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

  const tiles = Array.from({ length: nx * ny }, (_, n) => {
    const r = Math.floor(n / nx);
    const c = n % nx;
    const h = mix(n) >>> 0;
    const order =
      direction === "vertical" ? c + (c % 2 === 0 ? r : ny - 1 - r) : r + (r % 2 === 0 ? c : nx - 1 - c);
    const way =
      direction === "vertical" ? (c % 2 === 0 ? "d" : "u") : r % 2 === 0 ? "r" : "l";
    const fill =
      h % 9 === 0
        ? "color-mix(in srgb, var(--hb-zy4-acc) 72%, var(--hb-zy4-col))"
        : `color-mix(in srgb, var(--hb-zy4-col) ${100 - (h % 6) * 2}%, #ffffff)`;
    return { n, order, way, fill };
  });

  const vars = {
    "--hb-zy4-col": color,
    "--hb-zy4-acc": accent,
    "--hb-zy4-d": `${duration}ms`,
    "--hb-zy4-s": `${stagger}ms`,
    "--hb-zy4-x": nx,
    "--hb-zy4-y": ny,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-curtain-mixed" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy4 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        {...rest}
      >
        <div className="hb-zy4-c">
          {children ?? (
            <div className="hb-zy4-s">
              <small>Issue 12</small>
              <strong>Color Field</strong>
            </div>
          )}
        </div>
        <div className="hb-zy4-k" aria-hidden="true">
          {tiles.map((t) => (
            <span
              key={t.n}
              className="hb-zy4-t"
              data-way={t.way}
              style={
                {
                  "--hb-zy4-i": t.order,
                  "--hb-zy4-j": last - t.order,
                  "--hb-zy4-f": t.fill,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
