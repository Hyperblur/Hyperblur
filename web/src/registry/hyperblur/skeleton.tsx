"use client";

import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rect" | "circle" | "text";
  width?: number | string;
  height?: number | string;
  lines?: number;
  lastLineWidth?: number | string;
  radius?: number | string;
  animate?: boolean;
  color?: string;
  highlight?: string;
  label?: string;
}

export interface SkeletonCompositeProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
  color?: string;
  highlight?: string;
  label?: string;
}

export interface SkeletonCardProps extends SkeletonCompositeProps {
  media?: boolean;
  mediaHeight?: number;
  lines?: number;
}

export interface SkeletonListProps extends SkeletonCompositeProps {
  rows?: number;
  avatarSize?: number;
}

const css = `
.hb-skl, .hb-skl-card, .hb-skl-list, .hb-skl-profile {
  --hb-skl-base: #1d1d1d;
  --hb-skl-hl: rgba(255, 255, 255, 0.075);
  box-sizing: border-box;
}
.hb-skl *, .hb-skl-card *, .hb-skl-list *, .hb-skl-profile * { box-sizing: border-box; }
.hb-skl { display: block; width: 100%; }
.hb-skl[data-variant="text"] { display: flex; flex-direction: column; gap: 8px; }
.hb-skl-b {
  position: relative;
  display: block;
  flex: none;
  overflow: hidden;
  width: 100%;
  background: var(--hb-skl-base);
}
.hb-skl-b[data-animate="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 20%, var(--hb-skl-hl) 50%, transparent 80%);
  transform: translateX(-100%);
  animation: hb-skl-sweep 1.7s ease-in-out infinite;
}
.hb-skl-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
}
.hb-skl-foot { display: flex; align-items: center; gap: 10px; }
.hb-skl-foot .hb-skl { flex: 1; min-width: 0; }
.hb-skl-list { display: flex; flex-direction: column; gap: 14px; width: 100%; }
.hb-skl-row { display: flex; align-items: center; gap: 12px; }
.hb-skl-row > .hb-skl { flex: 1; min-width: 0; }
.hb-skl-profile { display: flex; flex-direction: column; gap: 16px; width: 100%; }
.hb-skl-head { display: flex; align-items: center; gap: 14px; }
.hb-skl-head > .hb-skl { flex: 1; min-width: 0; }
.hb-skl-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.hb-skl[data-variant="circle"] { flex: none; width: auto; }
@keyframes hb-skl-sweep { to { transform: translateX(100%); } }
@keyframes hb-skl-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
@media (prefers-reduced-motion: reduce) {
  .hb-skl-b[data-animate="true"]::after { display: none; animation: none; }
  .hb-skl-b[data-animate="true"] { animation: hb-skl-pulse 2.4s ease-in-out infinite; }
}
`;

function toneVars(color?: string, highlight?: string, style?: React.CSSProperties) {
  const vars: Record<string, string> = {};
  if (color) vars["--hb-skl-base"] = color;
  if (highlight) vars["--hb-skl-hl"] = highlight;
  return { ...vars, ...style } as React.CSSProperties;
}

function size(value: number | string | undefined) {
  return typeof value === "number" ? `${value}px` : value;
}

function Bar({
  width,
  height,
  radius,
  animate,
  circle,
}: {
  width?: number | string;
  height: number | string;
  radius?: number | string;
  animate: boolean;
  circle?: boolean;
}) {
  return (
    <span
      className="hb-skl-b"
      data-animate={animate}
      style={{
        width: size(width),
        height: size(height),
        borderRadius: circle ? "50%" : size(radius ?? 8),
      }}
    />
  );
}

export function Skeleton({
  variant = "rect",
  width,
  height,
  lines = 1,
  lastLineWidth = "62%",
  radius,
  animate = true,
  color,
  highlight,
  label,
  className = "",
  style,
  ...rest
}: SkeletonProps) {
  const a11y = label
    ? ({ role: "status", "aria-label": label, "aria-busy": true } as const)
    : ({ "aria-hidden": true } as const);
  let content: React.ReactNode;
  if (variant === "circle") {
    const d = width ?? height ?? 40;
    content = <Bar width={d} height={d} animate={animate} circle />;
  } else if (variant === "text") {
    const count = Math.max(1, Math.floor(lines));
    content = Array.from({ length: count }, (_, i) => (
      <Bar
        key={i}
        width={count > 1 && i === count - 1 ? lastLineWidth : width}
        height={height ?? 12}
        radius={radius ?? 6}
        animate={animate}
      />
    ));
  } else {
    content = <Bar width={width} height={height ?? 96} radius={radius} animate={animate} />;
  }
  return (
    <div
      className={`hb-skl ${className}`}
      style={toneVars(color, highlight, style)}
      data-variant={variant}
      {...a11y}
      {...rest}
    >
      <style href="hb-skeleton" precedence="default">{css}</style>
      {content}
    </div>
  );
}

function compositeProps(label: string | undefined) {
  return { role: "status", "aria-label": label ?? "Loading", "aria-busy": true } as const;
}

export function SkeletonCard({
  media = true,
  mediaHeight = 110,
  lines = 2,
  animate = true,
  color,
  highlight,
  label,
  className = "",
  style,
  ...rest
}: SkeletonCardProps) {
  return (
    <div className={`hb-skl-card ${className}`} style={toneVars(color, highlight, style)} {...compositeProps(label)} {...rest}>
      <style href="hb-skeleton" precedence="default">{css}</style>
      {media && <Skeleton height={mediaHeight} radius={10} animate={animate} />}
      <Skeleton variant="text" width="48%" height={14} animate={animate} />
      <Skeleton variant="text" lines={lines} height={10} animate={animate} />
      <div className="hb-skl-foot">
        <Skeleton variant="circle" width={24} animate={animate} />
        <Skeleton variant="text" width="42%" height={10} animate={animate} />
      </div>
    </div>
  );
}

export function SkeletonList({
  rows = 3,
  avatarSize = 36,
  animate = true,
  color,
  highlight,
  label,
  className = "",
  style,
  ...rest
}: SkeletonListProps) {
  return (
    <div className={`hb-skl-list ${className}`} style={toneVars(color, highlight, style)} {...compositeProps(label)} {...rest}>
      <style href="hb-skeleton" precedence="default">{css}</style>
      {Array.from({ length: Math.max(1, rows) }, (_, i) => (
        <div key={i} className="hb-skl-row">
          <Skeleton variant="circle" width={avatarSize} animate={animate} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1, minWidth: 0 }}>
            <Skeleton variant="text" width={`${52 + ((i * 17) % 28)}%`} height={11} animate={animate} />
            <Skeleton variant="text" width={`${78 - ((i * 13) % 24)}%`} height={9} animate={animate} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonProfile({
  animate = true,
  color,
  highlight,
  label,
  className = "",
  style,
  ...rest
}: SkeletonCompositeProps) {
  return (
    <div className={`hb-skl-profile ${className}`} style={toneVars(color, highlight, style)} {...compositeProps(label)} {...rest}>
      <style href="hb-skeleton" precedence="default">{css}</style>
      <div className="hb-skl-head">
        <Skeleton variant="circle" width={56} animate={animate} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" width="55%" height={14} animate={animate} />
          <Skeleton variant="text" width="35%" height={10} animate={animate} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} height={10} animate={animate} />
      <div className="hb-skl-stats">
        <Skeleton height={44} radius={10} animate={animate} />
        <Skeleton height={44} radius={10} animate={animate} />
        <Skeleton height={44} radius={10} animate={animate} />
      </div>
    </div>
  );
}
