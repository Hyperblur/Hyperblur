"use client";

import * as React from "react";

export interface CurtainRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  trigger?: "mount" | "view" | "hover";
  direction?: "horizontal" | "vertical";
  color?: string;
  duration?: number;
  delay?: number;
  label?: React.ReactNode;
}

const css = `
.hb-cu { position: relative; overflow: hidden; }
.hb-cu-content { position: relative; }
.hb-cu-layer { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
.hb-cu-panel {
  position: absolute;
  background-color: var(--hb-cu-c);
  transition: transform var(--hb-cu-d) cubic-bezier(.77, 0, .18, 1);
}
.hb-cu-h .hb-cu-a { top: 0; bottom: 0; left: 0; width: calc(50% + 0.5px); background-image: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 14px, rgba(0, 0, 0, 0.14) 14px 28px), linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)); box-shadow: 1px 0 0 rgba(255, 255, 255, 0.07); }
.hb-cu-h .hb-cu-b { top: 0; bottom: 0; right: 0; width: calc(50% + 0.5px); background-image: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 14px, rgba(0, 0, 0, 0.14) 14px 28px), linear-gradient(270deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)); box-shadow: -1px 0 0 rgba(255, 255, 255, 0.07); }
.hb-cu-v .hb-cu-a { left: 0; right: 0; top: 0; height: calc(50% + 0.5px); background-image: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0 14px, rgba(0, 0, 0, 0.14) 14px 28px), linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)); box-shadow: 0 1px 0 rgba(255, 255, 255, 0.07); }
.hb-cu-v .hb-cu-b { left: 0; right: 0; bottom: 0; height: calc(50% + 0.5px); background-image: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0 14px, rgba(0, 0, 0, 0.14) 14px 28px), linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)); box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.07); }
.hb-cu-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ededed;
  opacity: 1;
  transition: opacity 0.3s ease;
}
.hb-cu-open .hb-cu-label {
  opacity: 0;
  transition: opacity 0.35s ease var(--hb-cu-dl);
}
.hb-cu-open .hb-cu-panel { transition-delay: calc(var(--hb-cu-dl) + var(--hb-cu-lead)); }
.hb-cu-open.hb-cu-h .hb-cu-a { transform: translateX(-100%); }
.hb-cu-open.hb-cu-h .hb-cu-b { transform: translateX(100%); }
.hb-cu-open.hb-cu-v .hb-cu-a { transform: translateY(-100%); }
.hb-cu-open.hb-cu-v .hb-cu-b { transform: translateY(100%); }
.hb-cu:focus-visible { outline: 2px solid #2f7bff; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .hb-cu-panel { transition: opacity 0.3s ease; }
  .hb-cu-open .hb-cu-panel { transition-delay: 0s; opacity: 0; }
  .hb-cu-open.hb-cu-h .hb-cu-a, .hb-cu-open.hb-cu-h .hb-cu-b,
  .hb-cu-open.hb-cu-v .hb-cu-a, .hb-cu-open.hb-cu-v .hb-cu-b { transform: none; }
  .hb-cu-open .hb-cu-label { transition-delay: 0s; }
}
`;

export function CurtainReveal({
  children,
  trigger = "mount",
  direction = "horizontal",
  color = "#0f0f0f",
  duration = 1.1,
  delay = 0.3,
  label,
  className = "",
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: CurtainRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (trigger === "mount") {
      let second = 0;
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setOpen(true));
      });
      return () => {
        cancelAnimationFrame(first);
        cancelAnimationFrame(second);
      };
    }
    if (trigger === "view") {
      const el = ref.current;
      if (!el) return;
      if (typeof IntersectionObserver === "undefined") {
        const id = requestAnimationFrame(() => setOpen(true));
        return () => cancelAnimationFrame(id);
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setOpen(true);
            io.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [trigger]);

  function handleEnter(e: React.MouseEvent<HTMLDivElement>) {
    onMouseEnter?.(e);
    if (trigger === "hover") setOpen(true);
  }

  function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
    onMouseLeave?.(e);
    if (trigger === "hover") setOpen(false);
  }

  function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    onFocus?.(e);
    if (trigger === "hover") setOpen(true);
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    onBlur?.(e);
    if (trigger === "hover") setOpen(false);
  }

  const vars = {
    "--hb-cu-c": color,
    "--hb-cu-d": `${Math.max(0.1, duration)}s`,
    "--hb-cu-dl": `${Math.max(0, delay)}s`,
    "--hb-cu-lead": label ? "0.3s" : "0s",
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`hb-cu ${direction === "vertical" ? "hb-cu-v" : "hb-cu-h"}${open ? " hb-cu-open" : ""} ${className}`}
      style={vars}
      tabIndex={trigger === "hover" ? 0 : undefined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      <style href="hb-curtain-reveal" precedence="default">{css}</style>
      <div className="hb-cu-content">{children}</div>
      <div className="hb-cu-layer" aria-hidden="true">
        <div className="hb-cu-panel hb-cu-a" />
        <div className="hb-cu-panel hb-cu-b" />
        {label && <div className="hb-cu-label">{label}</div>}
      </div>
    </div>
  );
}
