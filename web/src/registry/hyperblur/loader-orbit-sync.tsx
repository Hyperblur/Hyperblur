"use client";

import * as React from "react";

export interface LoaderOrbitSyncProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: string;
  accent?: string;
  speed?: number;
  satellites?: number;
  label?: string;
}

const css = `
.hb-vk1 {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-vk1 *, .hb-vk1 *::before, .hb-vk1 *::after { box-sizing: border-box; }
.hb-vk1-stage {
  position: relative;
  flex: none;
  width: var(--hb-vk1-s);
  height: var(--hb-vk1-s);
}
.hb-vk1-plane {
  position: absolute;
  inset: 0;
  transform: rotate(var(--hb-vk1-tilt)) scaleY(0.36);
}
.hb-vk1-ring {
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, var(--hb-vk1-c) 26%, transparent);
}
.hb-vk1-spin {
  position: absolute;
  inset: 0;
  animation: hb-vk1-rot var(--hb-vk1-d) linear infinite;
  animation-delay: var(--hb-vk1-delay);
}
.hb-vk1-arm {
  position: absolute;
  top: 50%;
  left: 96%;
  width: 0;
  height: 0;
  animation: hb-vk1-rot var(--hb-vk1-d) linear infinite reverse;
  animation-delay: var(--hb-vk1-delay);
}
.hb-vk1-fix {
  position: absolute;
  left: 0;
  top: 0;
  transform: scaleY(2.7778) rotate(calc(var(--hb-vk1-tilt) * -1));
}
.hb-vk1-dot {
  position: absolute;
  left: calc(var(--hb-vk1-s) * -0.055);
  top: calc(var(--hb-vk1-s) * -0.055);
  width: calc(var(--hb-vk1-s) * 0.11);
  height: calc(var(--hb-vk1-s) * 0.11);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 0 18%, var(--hb-vk1-a) 42%, var(--hb-vk1-c) 100%);
  box-shadow: 0 0 0 2px #0a0a0a, 0 0 12px color-mix(in srgb, var(--hb-vk1-a) 70%, transparent);
  animation: hb-vk1-depth var(--hb-vk1-d) linear infinite;
  animation-delay: var(--hb-vk1-delay);
}
.hb-vk1-hub {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 34%;
  height: 34%;
  transform: translate(-50%, -50%);
  border-radius: 28%;
  background: linear-gradient(160deg, #262a33, #121418 70%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.6), 0 6px 18px rgba(0,0,0,0.55);
  display: grid;
  place-items: center;
}
.hb-vk1-hub::before {
  content: "";
  position: absolute;
  inset: -8%;
  border-radius: 32%;
  border: 1.5px solid var(--hb-vk1-a);
  opacity: 0;
  animation: hb-vk1-ping calc(var(--hb-vk1-d) / var(--hb-vk1-n)) cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
}
.hb-vk1-hub svg { width: 52%; height: 52%; display: block; }
.hb-vk1-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-vk1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-vk1-rot { to { transform: rotate(360deg); } }
@keyframes hb-vk1-depth {
  0% { transform: scale(0.95); opacity: 0.9; }
  25% { transform: scale(1.25); opacity: 1; }
  50% { transform: scale(0.95); opacity: 0.9; }
  75% { transform: scale(0.6); opacity: 0.45; }
  100% { transform: scale(0.95); opacity: 0.9; }
}
@keyframes hb-vk1-ping {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vk1-spin, .hb-vk1-arm, .hb-vk1-dot, .hb-vk1-hub::before { animation: none; }
}
`;

export function LoaderOrbitSync({
  size = 96,
  color = "#2f7bff",
  accent = "#7fb3ff",
  speed = 2.8,
  satellites = 3,
  label,
  className = "",
  style,
  ...rest
}: LoaderOrbitSyncProps) {
  const count = Math.max(1, Math.min(5, Math.round(satellites)));
  const tilts = Array.from({ length: count }, (_, i) => (i * 180) / count - 30);
  const vars = {
    "--hb-vk1-s": `${size}px`,
    "--hb-vk1-c": color,
    "--hb-vk1-a": accent,
    "--hb-vk1-d": `${Math.max(0.6, speed)}s`,
    "--hb-vk1-n": count,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-orbit-sync" precedence="default">{css}</style>
      <span role="status" className={`hb-vk1 ${className}`} style={vars} {...rest}>
        <span className="hb-vk1-stage" aria-hidden="true">
          {tilts.map((t, i) => (
            <span
              key={`r${i}`}
              className="hb-vk1-plane"
              style={{ "--hb-vk1-tilt": `${t.toFixed(1)}deg` } as React.CSSProperties}
            >
              <span className="hb-vk1-ring" />
            </span>
          ))}
          <span className="hb-vk1-hub">
            <svg viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" />
              <path d="M20 4v4.5h-4.5" />
              <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" />
              <path d="M4 20v-4.5h4.5" />
            </svg>
          </span>
          {tilts.map((t, i) => (
            <span
              key={`p${i}`}
              className="hb-vk1-plane"
              style={
                {
                  "--hb-vk1-tilt": `${t.toFixed(1)}deg`,
                  "--hb-vk1-delay": `${((-i * Math.max(0.6, speed)) / count).toFixed(2)}s`,
                } as React.CSSProperties
              }
            >
              <span className="hb-vk1-spin">
                <span className="hb-vk1-arm">
                  <span className="hb-vk1-fix">
                    <span className="hb-vk1-dot" />
                  </span>
                </span>
              </span>
            </span>
          ))}
        </span>
        <span className={label ? "hb-vk1-l" : "hb-vk1-sr"}>{label ?? "Syncing"}</span>
      </span>
    </>
  );
}
