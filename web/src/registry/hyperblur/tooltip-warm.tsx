"use client";

import * as React from "react";

export interface TooltipWarmProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: "auto" | "top" | "bottom" | "left" | "right";
  delay?: number;
  offset?: number;
  accent?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const css = `
.hb-qr8 {
  position: relative;
  display: inline-flex;
  font-family: inherit;
}
.hb-qr8-t {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 60;
  width: max-content;
  max-width: min(240px, calc(100vw - 16px));
  box-sizing: border-box;
  isolation: isolate;
  pointer-events: none;
  visibility: hidden;
}
.hb-qr8-t[data-ready="true"] {
  visibility: visible;
  animation-duration: 0.55s;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-fill-mode: backwards;
}
.hb-qr8-t[data-ready="true"][data-p="top"] { animation-name: hb-qr8-top; }
.hb-qr8-t[data-ready="true"][data-p="bottom"] { animation-name: hb-qr8-bottom; }
.hb-qr8-t[data-ready="true"][data-p="left"] { animation-name: hb-qr8-left; }
.hb-qr8-t[data-ready="true"][data-p="right"] { animation-name: hb-qr8-right; }
.hb-qr8-t::before {
  content: "";
  position: absolute;
  inset: -4px;
  z-index: -1;
  border-radius: 16px;
  background: var(--hb-qr8-a);
  filter: blur(14px);
  opacity: 0.32;
  animation: hb-qr8-glow 2.4s ease-in-out infinite alternate;
}
.hb-qr8-b {
  display: block;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, var(--hb-qr8-a) 60%, transparent);
  border-radius: 12px;
  background: #fff4e4;
  color: #3a2312;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  text-align: left;
  box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--hb-qr8-a) 60%, transparent);
}
.hb-qr8-r {
  position: absolute;
  z-index: 1;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  border-radius: 2px;
  background: #fff4e4;
  border: 1px solid color-mix(in srgb, var(--hb-qr8-a) 60%, transparent);
  transform: rotate(45deg);
}
.hb-qr8-t[data-p="top"] .hb-qr8-r { bottom: -6px; left: calc(var(--hb-qr8-x) - 5px); border-top: 0; border-left: 0; }
.hb-qr8-t[data-p="bottom"] .hb-qr8-r { top: -6px; left: calc(var(--hb-qr8-x) - 5px); border-bottom: 0; border-right: 0; }
.hb-qr8-t[data-p="left"] .hb-qr8-r { right: -6px; top: calc(var(--hb-qr8-y) - 5px); border-bottom: 0; border-left: 0; }
.hb-qr8-t[data-p="right"] .hb-qr8-r { left: -6px; top: calc(var(--hb-qr8-y) - 5px); border-top: 0; border-right: 0; }
.hb-qr8-t[data-ready="true"] .hb-qr8-r { animation: hb-qr8-wobble 0.8s cubic-bezier(0.3, 0.9, 0.3, 1) 0.12s backwards; }
@keyframes hb-qr8-top {
  0% { opacity: 0; transform: translateY(8px) scale(0.5); }
  55% { opacity: 1; transform: translateY(-2px) scale(1.07); }
  78% { transform: translateY(0.5px) scale(0.98); }
  100% { transform: none; }
}
@keyframes hb-qr8-bottom {
  0% { opacity: 0; transform: translateY(-8px) scale(0.5); }
  55% { opacity: 1; transform: translateY(2px) scale(1.07); }
  78% { transform: translateY(-0.5px) scale(0.98); }
  100% { transform: none; }
}
@keyframes hb-qr8-left {
  0% { opacity: 0; transform: translateX(8px) scale(0.5); }
  55% { opacity: 1; transform: translateX(-2px) scale(1.07); }
  78% { transform: translateX(0.5px) scale(0.98); }
  100% { transform: none; }
}
@keyframes hb-qr8-right {
  0% { opacity: 0; transform: translateX(-8px) scale(0.5); }
  55% { opacity: 1; transform: translateX(2px) scale(1.07); }
  78% { transform: translateX(-0.5px) scale(0.98); }
  100% { transform: none; }
}
@keyframes hb-qr8-wobble {
  0% { transform: rotate(45deg) scale(0.2); }
  35% { transform: rotate(78deg) scale(1.2); }
  60% { transform: rotate(32deg) scale(0.95); }
  80% { transform: rotate(50deg) scale(1.02); }
  100% { transform: rotate(45deg) scale(1); }
}
@keyframes hb-qr8-glow {
  from { opacity: 0.22; }
  to { opacity: 0.4; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qr8-t[data-ready="true"],
  .hb-qr8-t[data-ready="true"] .hb-qr8-r,
  .hb-qr8-t::before { animation: none; }
}
`;

const useIsoLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

type Side = "top" | "bottom" | "left" | "right";

const opposite: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

export function TooltipWarm({
  content,
  children,
  placement = "auto",
  delay = 250,
  offset = 12,
  accent = "#ffa94d",
  open,
  defaultOpen = false,
  onOpenChange,
  className = "",
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: TooltipWarmProps) {
  const id = React.useId();
  const wrapRef = React.useRef<HTMLSpanElement>(null);
  const tipRef = React.useRef<HTMLSpanElement>(null);
  const timer = React.useRef(0);
  const [inner, setInner] = React.useState(defaultOpen);
  const controlled = open !== undefined;
  const isOpen = controlled ? open : inner;
  const latest = React.useRef({ controlled, isOpen, onOpenChange });

  React.useEffect(() => {
    latest.current = { controlled, isOpen, onOpenChange };
  });

  const setOpen = React.useCallback((next: boolean) => {
    const cur = latest.current;
    if (!cur.controlled) setInner(next);
    if (next !== cur.isOpen) cur.onOpenChange?.(next);
  }, []);

  const show = (immediate: boolean) => {
    window.clearTimeout(timer.current);
    if (immediate || delay <= 0) setOpen(true);
    else timer.current = window.setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.clearTimeout(timer.current);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  useIsoLayoutEffect(() => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!isOpen || !wrap || !tip) return;
    const compute = () => {
      const wr = wrap.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const room = offset + 6;
      const fits: Record<Side, boolean> = {
        top: wr.top >= th + room,
        bottom: vh - wr.bottom >= th + room,
        left: wr.left >= tw + room,
        right: vw - wr.right >= tw + room,
      };
      let side: Side = placement === "auto" ? "top" : placement;
      if (!fits[side] && fits[opposite[side]]) side = opposite[side];
      let x = 0;
      let y = 0;
      if (side === "top" || side === "bottom") {
        x = wr.width / 2 - tw / 2;
        y = side === "top" ? -th - offset : wr.height + offset;
        const abs = wr.left + x;
        x += Math.min(Math.max(abs, 8), Math.max(8, vw - tw - 8)) - abs;
      } else {
        y = wr.height / 2 - th / 2;
        x = side === "left" ? -tw - offset : wr.width + offset;
        const abs = wr.top + y;
        y += Math.min(Math.max(abs, 8), Math.max(8, vh - th - 8)) - abs;
      }
      const ax = Math.min(Math.max(wr.width / 2 - x, 16), Math.max(16, tw - 16));
      const ay = Math.min(Math.max(wr.height / 2 - y, 14), Math.max(14, th - 14));
      tip.style.left = `${x.toFixed(1)}px`;
      tip.style.top = `${y.toFixed(1)}px`;
      tip.style.setProperty("--hb-qr8-x", `${ax.toFixed(1)}px`);
      tip.style.setProperty("--hb-qr8-y", `${ay.toFixed(1)}px`);
      tip.style.transformOrigin =
        side === "top"
          ? `${ax}px 100%`
          : side === "bottom"
            ? `${ax}px 0`
            : side === "left"
              ? `100% ${ay}px`
              : `0 ${ay}px`;
      tip.dataset.p = side;
      tip.dataset.ready = "true";
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isOpen, placement, offset, content]);

  const trigger =
    React.isValidElement<{ "aria-describedby"?: string }>(children) && isOpen
      ? React.cloneElement(children, {
          "aria-describedby": [children.props["aria-describedby"], id].filter(Boolean).join(" "),
        })
      : children;

  return (
    <span
      ref={wrapRef}
      className={`hb-qr8 ${className}`.trim()}
      style={{ ["--hb-qr8-a" as string]: accent, ...style } as React.CSSProperties}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (e.pointerType !== "touch") show(false);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        hide();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        show(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hide();
      }}
      {...rest}
    >
      <style href="hb-tooltip-warm" precedence="default">
        {css}
      </style>
      {trigger}
      {isOpen ? (
        <span ref={tipRef} id={id} role="tooltip" className="hb-qr8-t">
          <span className="hb-qr8-b">{content}</span>
          <span className="hb-qr8-r" />
        </span>
      ) : null}
    </span>
  );
}
