"use client";

import * as React from "react";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: "top" | "bottom";
  delay?: number;
  follow?: boolean;
}

const css = `
.hb-tt {
  position: relative;
  display: inline-flex;
}
.hb-tt > .hb-tt-t {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  z-index: 50;
  pointer-events: none;
  will-change: transform;
}
.hb-tt-b {
  display: block;
  width: max-content;
  max-width: 240px;
  box-sizing: border-box;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, .14);
  background: rgba(17, 17, 17, .96);
  color: #f5f5f5;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .45);
  font: 500 12px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif;
  letter-spacing: .01em;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, calc(-100% - 14px)) scale(.94);
  transform-origin: 50% 100%;
  transition: opacity .16s ease, transform .16s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .16s;
}
.hb-tt-t[data-p="bottom"] > .hb-tt-b {
  transform: translate(-50%, 18px) scale(.94);
  transform-origin: 50% 0;
}
.hb-tt-t[data-open="true"] > .hb-tt-b {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, calc(-100% - 14px)) scale(1);
  transition-delay: 0s;
}
.hb-tt-t[data-open="true"][data-p="bottom"] > .hb-tt-b {
  transform: translate(-50%, 18px) scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .hb-tt-b,
  .hb-tt-t[data-p="bottom"] > .hb-tt-b {
    transition: none;
    transform: translate(-50%, calc(-100% - 14px));
  }
  .hb-tt-t[data-p="bottom"] > .hb-tt-b,
  .hb-tt-t[data-open="true"][data-p="bottom"] > .hb-tt-b {
    transform: translate(-50%, 18px);
  }
  .hb-tt-t[data-open="true"] > .hb-tt-b {
    transform: translate(-50%, calc(-100% - 14px));
  }
}
`;

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 120,
  follow = true,
  className = "",
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: TooltipProps) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  const wrap = React.useRef<HTMLSpanElement>(null);
  const tip = React.useRef<HTMLSpanElement>(null);
  const target = React.useRef({ x: 0, y: 0 });
  const current = React.useRef({ x: 0, y: 0 });
  const following = React.useRef(false);
  const hovering = React.useRef(false);
  const focused = React.useRef(false);
  const timer = React.useRef<number | undefined>(undefined);

  function reduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function anchor() {
    const el = wrap.current;
    if (!el) return;
    target.current = { x: el.offsetWidth / 2, y: placement === "top" ? 0 : el.offsetHeight };
    following.current = false;
  }

  function aim(e: React.PointerEvent<HTMLSpanElement>) {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    following.current = true;
  }

  function reveal() {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  }

  function hide() {
    window.clearTimeout(timer.current);
    setOpen(false);
  }

  function handleEnter(e: React.PointerEvent<HTMLSpanElement>) {
    onPointerEnter?.(e);
    if (e.pointerType === "touch") return;
    hovering.current = true;
    if (follow && !reduced()) aim(e);
    else anchor();
    reveal();
  }

  function handleMove(e: React.PointerEvent<HTMLSpanElement>) {
    onPointerMove?.(e);
    if (!hovering.current || !follow || reduced()) return;
    aim(e);
  }

  function handleLeave(e: React.PointerEvent<HTMLSpanElement>) {
    onPointerLeave?.(e);
    hovering.current = false;
    if (focused.current) anchor();
    else hide();
  }

  function handleFocus(e: React.FocusEvent<HTMLSpanElement>) {
    onFocus?.(e);
    if (!(e.target as HTMLElement).matches(":focus-visible")) return;
    focused.current = true;
    if (hovering.current) return;
    anchor();
    reveal();
  }

  function handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
    onBlur?.(e);
    focused.current = false;
    if (!hovering.current) hide();
  }

  React.useEffect(() => {
    const el = tip.current;
    if (!el || !open) return;
    current.current = { ...target.current };
    let raf = 0;

    function apply() {
      if (!el) return;
      el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
    }

    function tick() {
      const c = current.current;
      const t = target.current;
      const k = following.current ? 0.16 : 0.3;
      c.x += (t.x - c.x) * k;
      c.y += (t.y - c.y) * k;
      apply();
      raf = requestAnimationFrame(tick);
    }

    function key(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      window.clearTimeout(timer.current);
      setOpen(false);
    }

    apply();
    raf = requestAnimationFrame(tick);
    window.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  React.useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <span
      {...rest}
      ref={wrap}
      className={`hb-tt ${className}`}
      aria-describedby={id}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <style href="hb-tooltip" precedence="default">{css}</style>
      {children}
      <span ref={tip} id={id} role="tooltip" className="hb-tt-t" data-open={open} data-p={placement}>
        <span className="hb-tt-b">{content}</span>
      </span>
    </span>
  );
}
