"use client";

import * as React from "react";

export interface LoaderSkeletonFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  variant?: "post" | "inbox" | "card";
  rows?: number;
  base?: string;
  highlight?: string;
  accent?: string;
  speed?: number;
  label?: string;
  children?: React.ReactNode;
}

function hash(n: number) {
  let x = (n + 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967295;
}

const css = `
.hb-vk3 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
}
.hb-vk3 *, .hb-vk3 *::before, .hb-vk3 *::after { box-sizing: border-box; }
.hb-vk3-sk { display: flex; flex-direction: column; gap: 14px; }
.hb-vk3-b {
  display: block;
  flex: none;
  border-radius: 6px;
  background-color: var(--hb-vk3-base);
  background-image: linear-gradient(100deg, transparent 30%, var(--hb-vk3-hi) 50%, transparent 70%);
  background-size: 300% 100%;
  background-repeat: no-repeat;
  background-position: 150% 0;
  animation: hb-vk3-sweep var(--hb-vk3-d) cubic-bezier(0.45, 0, 0.25, 1) infinite;
  animation-delay: var(--hb-vk3-delay, 0s);
}
.hb-vk3-round { border-radius: 999px; }
.hb-vk3-row { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hb-vk3-col { display: flex; flex-direction: column; gap: 7px; flex: 1; min-width: 0; }
.hb-vk3-post { display: flex; flex-direction: column; gap: 11px; }
.hb-vk3-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 7;
  border-radius: 10px;
  overflow: hidden;
}
.hb-vk3-media::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  border: 1.5px solid color-mix(in srgb, var(--hb-vk3-a) 55%, var(--hb-vk3-hi));
  opacity: 0.5;
}
.hb-vk3-acts { display: flex; gap: 8px; }
.hb-vk3-inbox { display: flex; flex-direction: column; }
.hb-vk3-irow { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #1c1c1c; }
.hb-vk3-irow:last-child { border-bottom: 0; }
.hb-vk3-card { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
.hb-vk3-tile { display: flex; flex-direction: column; gap: 8px; padding: 8px; border: 1px solid #1c1c1c; border-radius: 12px; background: #0e0e0e; }
.hb-vk3-tile .hb-vk3-media { aspect-ratio: 4 / 3; border-radius: 8px; }
.hb-vk3-in { animation: hb-vk3-reveal 520ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.hb-vk3-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk3-sweep {
  0% { background-position: 150% 0; }
  70%, 100% { background-position: -50% 0; }
}
@keyframes hb-vk3-reveal {
  from { opacity: 0; transform: translateY(6px); filter: blur(4px); }
  to { opacity: 1; transform: none; filter: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vk3-b, .hb-vk3-in { animation: none; }
}
`;

export function LoaderSkeletonFeed({
  loading = true,
  variant = "post",
  rows = 3,
  base = "#1a1a1a",
  highlight = "#2c2c2c",
  accent = "#2f7bff",
  speed = 1.8,
  label = "Loading content",
  children,
  className = "",
  style,
  ...rest
}: LoaderSkeletonFeedProps) {
  const count = Math.max(1, Math.min(8, Math.round(rows)));
  const d = Math.max(0.6, speed);
  const vars = {
    "--hb-vk3-base": base,
    "--hb-vk3-hi": highlight,
    "--hb-vk3-a": accent,
    "--hb-vk3-d": `${d}s`,
    ...style,
  } as React.CSSProperties;

  const bone = (key: string, w: string, h: number, x: number, y: number, round = false, extra?: string) => (
    <span
      key={key}
      className={`hb-vk3-b${round ? " hb-vk3-round" : ""}${extra ? ` ${extra}` : ""}`}
      style={
        {
          width: w,
          height: h ? `${h}px` : undefined,
          "--hb-vk3-delay": `${((x * 0.35 + y * 0.12) * d).toFixed(3)}s`,
        } as React.CSSProperties
      }
    />
  );

  const width = (seed: number, min: number, max: number) => `${(min + hash(seed) * (max - min)).toFixed(1)}%`;

  let skeleton: React.ReactNode;
  if (variant === "inbox") {
    skeleton = (
      <div className="hb-vk3-inbox">
        {Array.from({ length: count }, (_, i) => (
          <div className="hb-vk3-irow" key={i}>
            {bone(`a${i}`, "32px", 32, 0, i, true)}
            <div className="hb-vk3-col">
              {bone(`n${i}`, width(i * 7 + 1, 32, 48), 9, 0.15, i)}
              {bone(`s${i}`, width(i * 7 + 2, 62, 92), 8, 0.2, i + 0.3)}
            </div>
            {bone(`t${i}`, "34px", 16, 0.9, i, true)}
          </div>
        ))}
      </div>
    );
  } else if (variant === "card") {
    skeleton = (
      <div className="hb-vk3-card">
        {Array.from({ length: count }, (_, i) => (
          <div className="hb-vk3-tile" key={i}>
            {bone(`m${i}`, "100%", 0, i * 0.3, 0, false, "hb-vk3-media")}
            {bone(`h${i}`, width(i * 5 + 3, 60, 85), 10, i * 0.3, 1)}
            {bone(`p${i}`, width(i * 5 + 4, 30, 45), 8, i * 0.3, 1.4)}
          </div>
        ))}
      </div>
    );
  } else {
    skeleton = (
      <div className="hb-vk3-sk">
        {Array.from({ length: count }, (_, i) => (
          <div className="hb-vk3-post" key={i}>
            <div className="hb-vk3-row">
              {bone(`a${i}`, "34px", 34, 0, i * 3, true)}
              <div className="hb-vk3-col">
                {bone(`n${i}`, width(i * 9 + 1, 28, 40), 9, 0.12, i * 3)}
                {bone(`h${i}`, width(i * 9 + 2, 16, 24), 7, 0.12, i * 3 + 0.3)}
              </div>
            </div>
            {bone(`l1${i}`, "100%", 8, 0, i * 3 + 0.8)}
            {bone(`l2${i}`, width(i * 9 + 3, 64, 88), 8, 0, i * 3 + 1)}
            {i === 0 ? bone(`m${i}`, "100%", 0, 0, 1.4, false, "hb-vk3-media") : null}
            <div className="hb-vk3-acts">
              {bone(`x1${i}`, "38px", 14, 0, i * 3 + 2, true)}
              {bone(`x2${i}`, "38px", 14, 0.1, i * 3 + 2, true)}
              {bone(`x3${i}`, "38px", 14, 0.2, i * 3 + 2, true)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <style href="hb-loader-skeleton-feed" precedence="default">{css}</style>
      <div className={`hb-vk3 ${className}`} style={vars} aria-busy={loading} {...rest}>
        {loading ? (
          <div role="status">
            <span className="hb-vk3-sr">{label}</span>
            <div aria-hidden="true">{skeleton}</div>
          </div>
        ) : (
          <div className="hb-vk3-in">{children}</div>
        )}
      </div>
    </>
  );
}
