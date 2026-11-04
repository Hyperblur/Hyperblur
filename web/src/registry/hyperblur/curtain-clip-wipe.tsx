"use client";

import * as React from "react";

export type CurtainClipWipeTrigger = "mount" | "view" | "manual";
export type CurtainClipWipeDirection = "left" | "right" | "up" | "down" | "diagonal";

export interface CurtainClipWipeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: CurtainClipWipeTrigger;
  duration?: number;
  color?: string;
  accent?: string;
  direction?: CurtainClipWipeDirection;
  replay?: string | number;
  closeAfter?: number;
  loop?: boolean;
}

const css = `
.hb-zy2 {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
}
.hb-zy2 *, .hb-zy2 *::before, .hb-zy2 *::after { box-sizing: border-box; }
.hb-zy2-c { position: relative; z-index: 0; height: 100%; }
.hb-zy2-k, .hb-zy2-e {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: clip-path var(--hb-zy2-d) cubic-bezier(0.76, 0, 0.24, 1);
}
.hb-zy2-g {
  position: absolute;
  pointer-events: none;
  transition: transform var(--hb-zy2-d) cubic-bezier(0.76, 0, 0.24, 1);
}
.hb-zy2-k {
  z-index: 1;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--hb-zy2-col) 88%, #ffffff) 0%, var(--hb-zy2-col) 55%),
    var(--hb-zy2-col);
}
.hb-zy2[data-open="false"] .hb-zy2-k { pointer-events: auto; }
.hb-zy2-g {
  z-index: 2;
  background: linear-gradient(var(--hb-zy2-a), transparent 0%, color-mix(in srgb, var(--hb-zy2-acc) 55%, transparent) 100%);
  mix-blend-mode: screen;
}
.hb-zy2-e {
  z-index: 3;
  background: color-mix(in srgb, var(--hb-zy2-acc) 35%, #ffffff);
  box-shadow: 0 0 12px var(--hb-zy2-acc);
}
.hb-zy2[data-instant="true"] .hb-zy2-k,
.hb-zy2[data-instant="true"] .hb-zy2-g,
.hb-zy2[data-instant="true"] .hb-zy2-e { transition: none !important; }
.hb-zy2-s {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 24px;
  color: #ededed;
  background:
    radial-gradient(circle at 85% 50%, rgba(47, 123, 255, 0.45), transparent 45%),
    linear-gradient(120deg, #101114 0%, #16181f 100%);
}
.hb-zy2-s small {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-zy2-s strong { font-size: 24px; line-height: 1.15; font-weight: 600; }
@media (prefers-reduced-motion: reduce) {
  .hb-zy2-k, .hb-zy2-g, .hb-zy2-e { transition: none !important; }
}
`;

const angles: Record<CurtainClipWipeDirection, string> = {
  right: "90deg",
  left: "270deg",
  down: "180deg",
  up: "0deg",
  diagonal: "90deg",
};

function haloStyle(dir: CurtainClipWipeDirection, size: number, open: boolean): React.CSSProperties {
  const span = dir === "diagonal" ? size + 30 : size;
  const far = `${((100 / span) * 100).toFixed(2)}%`;
  const len = `${span.toFixed(2)}%`;
  if (dir === "left") {
    return { top: 0, bottom: 0, right: 0, width: len, transform: `translateX(${open ? `-${far}` : "100%"})` };
  }
  if (dir === "down") {
    return { left: 0, right: 0, top: 0, height: len, transform: `translateY(${open ? far : "-100%"})` };
  }
  if (dir === "up") {
    return { left: 0, right: 0, bottom: 0, height: len, transform: `translateY(${open ? `-${far}` : "100%"})` };
  }
  const shape =
    dir === "diagonal"
      ? `polygon(${((30 / span) * 100).toFixed(2)}% 0%, 100% 0%, ${((size / span) * 100).toFixed(2)}% 100%, 0% 100%)`
      : undefined;
  return { top: 0, bottom: 0, left: 0, width: len, clipPath: shape, transform: `translateX(${open ? far : "-100%"})` };
}

function band(dir: CurtainClipWipeDirection, a: number, b: number) {
  const f = (n: number) => `${n.toFixed(2)}%`;
  if (dir === "right") return `polygon(${f(a)} 0%, ${f(b)} 0%, ${f(b)} 100%, ${f(a)} 100%)`;
  if (dir === "left") return `polygon(${f(100 - b)} 0%, ${f(100 - a)} 0%, ${f(100 - a)} 100%, ${f(100 - b)} 100%)`;
  if (dir === "down") return `polygon(0% ${f(a)}, 100% ${f(a)}, 100% ${f(b)}, 0% ${f(b)})`;
  if (dir === "up") return `polygon(0% ${f(100 - b)}, 100% ${f(100 - b)}, 100% ${f(100 - a)}, 0% ${f(100 - a)})`;
  return `polygon(${f(a)} 0%, ${f(b)} 0%, ${f(b - 30)} 100%, ${f(a - 30)} 100%)`;
}

function useCurtain(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange: ((open: boolean) => void) | undefined,
  trigger: CurtainClipWipeTrigger,
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

export function CurtainClipWipe({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  trigger = "mount",
  duration = 900,
  color = "#171717",
  accent = "#2f7bff",
  direction = "right",
  replay,
  closeAfter,
  loop = false,
  className = "",
  style,
  ...rest
}: CurtainClipWipeProps) {
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

  const end = direction === "diagonal" ? 130 : 100;
  const vertical = direction === "up" || direction === "down";
  const line = vertical ? 2.4 : 1.1;
  const glow = vertical ? 26 : 16;
  const curtain = isOpen ? band(direction, end, end) : band(direction, 0, end);
  const edge = isOpen ? band(direction, end, end + line) : band(direction, -line, 0);

  const vars = {
    "--hb-zy2-col": color,
    "--hb-zy2-acc": accent,
    "--hb-zy2-d": `${duration}ms`,
    "--hb-zy2-a": angles[direction],
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-curtain-clip-wipe" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-zy2 ${className}`}
        style={vars}
        data-open={isOpen}
        data-instant={instant}
        {...rest}
      >
        <div className="hb-zy2-c">
          {children ?? (
            <div className="hb-zy2-s">
              <small>Release 4.2</small>
              <strong>Faster builds, quieter logs</strong>
            </div>
          )}
        </div>
        <div className="hb-zy2-k" aria-hidden="true" style={{ clipPath: curtain }} />
        <div className="hb-zy2-g" aria-hidden="true" style={haloStyle(direction, glow, isOpen)} />
        <div className="hb-zy2-e" aria-hidden="true" style={{ clipPath: edge }} />
      </div>
    </>
  );
}
