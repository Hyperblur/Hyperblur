"use client";

import * as React from "react";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  rowHeight?: number;
}

export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

const css = `
.hb-bg {
  display: grid;
  grid-template-columns: repeat(var(--hb-bg-cols), minmax(0, 1fr));
  grid-auto-rows: var(--hb-bg-row);
  grid-auto-flow: dense;
  gap: var(--hb-bg-gap);
  width: 100%;
}
.hb-bc {
  --hb-x: 50%;
  --hb-y: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, .1);
  background: rgba(255, 255, 255, .04);
  color: #f2f2f5;
  grid-column: span var(--hb-bc-c);
  grid-row: span var(--hb-bc-r);
  transition: transform .3s cubic-bezier(.22, .8, .24, 1), border-color .3s ease, box-shadow .3s ease;
}
.hb-bc::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(260px circle at var(--hb-x) var(--hb-y), rgba(47, 123, 255, .2), transparent 70%);
  opacity: 0;
  transition: opacity .3s ease;
}
.hb-bc:hover {
  transform: translate3d(0, -3px, 0);
  border-color: rgba(255, 255, 255, .22);
  box-shadow: 0 16px 32px -14px rgba(0, 0, 0, .7);
}
.hb-bc:hover::before { opacity: 1; }
.hb-bc-vis {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  border-radius: 10px;
}
.hb-bc-body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
}
.hb-bc-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-bottom: 4px;
  color: #2f7bff;
}
.hb-bc-title { font-size: 15px; font-weight: 600; line-height: 1.3; }
.hb-bc-desc { font-size: 13px; line-height: 1.45; color: rgba(255, 255, 255, .6); }
@media (max-width: 639px) {
  .hb-bg {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: minmax(var(--hb-bg-row), auto);
  }
  .hb-bc { grid-column: span 1; grid-row: span 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-bc { transition: none; }
  .hb-bc::before { transition: none; }
  .hb-bc:hover { transform: none; }
}
`;

function span(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.round(value));
}

export function BentoGrid({
  children,
  columns = 3,
  gap = 16,
  rowHeight = 160,
  className = "",
  style,
  ...rest
}: BentoGridProps) {
  const vars = {
    "--hb-bg-cols": span(columns),
    "--hb-bg-gap": `${Math.max(0, gap)}px`,
    "--hb-bg-row": `${Math.max(0, rowHeight)}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-bg ${className}`} style={vars} {...rest}>
      <style href="hb-bento-grid" precedence="default">{css}</style>
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  colSpan = 1,
  rowSpan = 1,
  title,
  description,
  icon,
  className = "",
  style,
  onPointerMove,
  ...rest
}: BentoCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hb-x", `${(e.clientX - r.left).toFixed(1)}px`);
    el.style.setProperty("--hb-y", `${(e.clientY - r.top).toFixed(1)}px`);
  }

  const vars = {
    "--hb-bc-c": span(colSpan),
    "--hb-bc-r": span(rowSpan),
    ...style,
  } as React.CSSProperties;

  const hasBody = icon != null || title != null || description != null;

  return (
    <div ref={ref} className={`hb-bc ${className}`} style={vars} onPointerMove={handleMove} {...rest}>
      <style href="hb-bento-grid" precedence="default">{css}</style>
      {children != null && <div className="hb-bc-vis">{children}</div>}
      {hasBody && (
        <div className="hb-bc-body">
          {icon != null && <span className="hb-bc-icon">{icon}</span>}
          {title != null && <div className="hb-bc-title">{title}</div>}
          {description != null && <div className="hb-bc-desc">{description}</div>}
        </div>
      )}
    </div>
  );
}
