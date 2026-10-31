"use client";

import * as React from "react";

export interface MasonryBreakpoints {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number | MasonryBreakpoints;
  gap?: number;
  stagger?: number;
}

const css = `
.hb-ms {
  column-count: var(--hb-ms-base);
  column-gap: var(--hb-ms-gap);
  width: 100%;
}
@media (min-width: 640px) { .hb-ms { column-count: var(--hb-ms-sm); } }
@media (min-width: 768px) { .hb-ms { column-count: var(--hb-ms-md); } }
@media (min-width: 1024px) { .hb-ms { column-count: var(--hb-ms-lg); } }
.hb-ms-item {
  break-inside: avoid;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  margin-bottom: var(--hb-ms-gap);
  animation: hb-ms-in .6s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-ms-i) * var(--hb-ms-st));
}
@keyframes hb-ms-in {
  from { opacity: 0; transform: translate3d(0, 18px, 0) scale(.97); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ms-item { animation: none; }
}
`;

function count(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(1, Math.round(value));
}

function resolve(columns: number | MasonryBreakpoints) {
  if (typeof columns === "number") {
    const c = count(columns, 1);
    return { base: c, sm: c, md: c, lg: c };
  }
  const base = count(columns.base, 1);
  const sm = count(columns.sm, base);
  const md = count(columns.md, sm);
  const lg = count(columns.lg, md);
  return { base, sm, md, lg };
}

export function Masonry({
  children,
  columns = { base: 1, sm: 2, lg: 3 },
  gap = 16,
  stagger = 0.05,
  className = "",
  style,
  ...rest
}: MasonryProps) {
  const c = resolve(columns);
  const items = React.Children.toArray(children);

  const vars = {
    "--hb-ms-base": c.base,
    "--hb-ms-sm": c.sm,
    "--hb-ms-md": c.md,
    "--hb-ms-lg": c.lg,
    "--hb-ms-gap": `${Math.max(0, gap)}px`,
    "--hb-ms-st": `${Math.max(0, stagger)}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <div className={`hb-ms ${className}`} style={vars} {...rest}>
      <style href="hb-masonry" precedence="default">{css}</style>
      {items.map((child, i) => (
        <div
          key={React.isValidElement(child) && child.key != null ? child.key : i}
          className="hb-ms-item"
          style={{ "--hb-ms-i": i } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
