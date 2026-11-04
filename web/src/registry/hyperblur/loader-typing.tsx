"use client";

import * as React from "react";

export interface LoaderTypingProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  avatar?: string;
  size?: number;
  color?: string;
  bubble?: string;
  accent?: string;
  label?: string;
}

const css = `
.hb-qc8 {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  gap: 8px;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-qc8 *, .hb-qc8 *::before, .hb-qc8 *::after { box-sizing: border-box; }
.hb-qc8-av {
  display: grid;
  place-items: center;
  flex: none;
  width: var(--hb-qc8-a);
  height: var(--hb-qc8-a);
  overflow: hidden;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--hb-qc8-ac), #171717);
  color: #fff;
  font-size: calc(var(--hb-qc8-a) * 0.38);
  font-weight: 600;
  line-height: 1;
}
.hb-qc8-av { position: relative; }
.hb-qc8-pic { position: absolute; inset: 0; background-size: cover; background-position: center; }
.hb-qc8-col { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.hb-qc8-name { padding-left: 4px; font-size: 11px; line-height: 1.2; color: #8f8f8f; white-space: nowrap; }
.hb-qc8-row { display: flex; align-items: center; gap: 8px; }
.hb-qc8-bub {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--hb-qc8-s) * 0.14);
  height: var(--hb-qc8-s);
  padding: 0 calc(var(--hb-qc8-s) * 0.46);
  border-radius: calc(var(--hb-qc8-s) / 2);
  border-bottom-left-radius: calc(var(--hb-qc8-s) * 0.16);
  background: var(--hb-qc8-b);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}
.hb-qc8-bub > i {
  flex: none;
  width: calc(var(--hb-qc8-s) * 0.2);
  height: calc(var(--hb-qc8-s) * 0.2);
  border-radius: 50%;
  background: var(--hb-qc8-c);
  animation: hb-qc8-hop 1.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.16s);
}
.hb-qc8-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qc8-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-qc8-hop {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
  30% { transform: translateY(-45%); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qc8-bub > i { animation: none; opacity: 0.75; }
  .hb-qc8-bub > i:nth-child(2) { opacity: 1; }
}
`;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
}

export function LoaderTyping({
  name,
  avatar,
  size = 36,
  color = "#a1a1a1",
  bubble = "#1f1f1f",
  accent = "#2f7bff",
  label,
  className = "",
  style,
  ...rest
}: LoaderTypingProps) {
  const showAvatar = Boolean(name || avatar);
  const avatarSize = Math.round(size * 0.78);
  const spoken = label ?? (name ? `${name} is typing` : "Typing");
  const vars = {
    "--hb-qc8-s": `${size}px`,
    "--hb-qc8-a": `${avatarSize}px`,
    "--hb-qc8-c": color,
    "--hb-qc8-b": bubble,
    "--hb-qc8-ac": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-typing" precedence="default">{css}</style>
      <div role="status" className={`hb-qc8 ${className}`} style={vars} {...rest}>
        {showAvatar ? (
          <span className="hb-qc8-av" aria-hidden="true">
            {initials(name ?? "")}
            {avatar ? (
              <span className="hb-qc8-pic" style={{ backgroundImage: `url("${avatar.replace(/"/g, "%22")}")` }} />
            ) : null}
          </span>
        ) : null}
        <span className="hb-qc8-col">
          {name ? (
            <span className="hb-qc8-name" aria-hidden="true">
              {name}
            </span>
          ) : null}
          <span className="hb-qc8-row">
            <span className="hb-qc8-bub" aria-hidden="true">
              <i style={{ "--i": 0 } as React.CSSProperties} />
              <i style={{ "--i": 1 } as React.CSSProperties} />
              <i style={{ "--i": 2 } as React.CSSProperties} />
            </span>
            {label ? (
              <span className="hb-qc8-l" aria-hidden="true">
                {label}
              </span>
            ) : null}
          </span>
        </span>
        <span className="hb-qc8-sr">{spoken}</span>
      </div>
    </>
  );
}
