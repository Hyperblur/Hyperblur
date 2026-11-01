"use client";

import * as React from "react";

export interface AvatarPerson {
  name: string;
  image?: string;
  color?: string;
}

export interface AvatarStackProps extends React.HTMLAttributes<HTMLUListElement> {
  size?: number;
  max?: number;
  ring?: string;
  people?: AvatarPerson[];
  extra?: number;
}

const css = `
.hb-as {
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: inherit;
}
.hb-as-i {
  position: relative;
  z-index: 1;
  flex: none;
  width: var(--hb-s);
  height: var(--hb-s);
  margin: 0 0 0 calc(var(--hb-s) * -0.3);
  padding: 0;
  transition: margin-left 0.35s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-as-i:first-child { margin-left: 0; }
.hb-as:hover .hb-as-i:not(:first-child),
.hb-as:focus-within .hb-as-i:not(:first-child) { margin-left: 6px; }
.hb-as-i:hover, .hb-as-i:focus-within { z-index: 3; }
.hb-as-a {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  background: var(--hb-bg);
  color: var(--hb-fg);
  box-shadow: 0 0 0 2px var(--hb-r);
  font-size: calc(var(--hb-s) * 0.36);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
  user-select: none;
  outline: none;
  transition: transform 0.25s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-as-img {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
}
.hb-as-i:hover .hb-as-a,
.hb-as-a:focus-visible { transform: translateY(-3px); }
.hb-as-a:focus-visible { box-shadow: 0 0 0 2px var(--hb-r), 0 0 0 4px #ededed; }
.hb-as-tail {
  --hb-bg: #1f1f1f;
  --hb-fg: #bdbdbd;
  font-size: calc(var(--hb-s) * 0.32);
}
.hb-as-tip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  padding: 4px 8px;
  border: 1px solid #262626;
  border-radius: 6px;
  background: #171717;
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.hb-as-i:hover .hb-as-tip,
.hb-as-i:focus-within .hb-as-tip {
  opacity: 1;
  transform: translate(-50%, 0);
}
@media (prefers-reduced-motion: reduce) {
  .hb-as-i, .hb-as-a, .hb-as-tip { transition: none; }
  .hb-as-i:hover .hb-as-a, .hb-as-a:focus-visible { transform: none; }
}
`;

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(h, 31) + input.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function AvatarStack({
  size = 40,
  max = 5,
  ring = "#111111",
  people = [],
  extra = 0,
  className = "",
  style,
  ...rest
}: AvatarStackProps) {
  const limit = Math.max(1, Math.round(max));
  const shown = people.slice(0, limit);
  const hidden = Math.max(0, people.length - shown.length) + Math.max(0, Math.round(extra));

  const vars = {
    "--hb-s": `${size}px`,
    "--hb-r": ring,
    ...style,
  } as React.CSSProperties;

  return (
    <ul
      role="list"
      aria-label={`${people.length + Math.max(0, Math.round(extra))} people`}
      className={`hb-as ${className}`}
      style={vars}
      {...rest}
    >
      <style href="hb-avatar-stack" precedence="default">{css}</style>
      {shown.map((person, i) => {
        const hue = hash(person.name) % 360;
        const colors = {
          "--hb-bg": person.color ?? `hsl(${hue} 42% 30%)`,
          "--hb-fg": person.color ? "#ffffff" : `hsl(${hue} 70% 88%)`,
        } as React.CSSProperties;
        return (
          <li key={`${person.name}-${i}`} className="hb-as-i">
            <span className="hb-as-a" tabIndex={0} role="img" aria-label={person.name} style={colors}>
              {initials(person.name)}
              {person.image && (
                <span
                  className="hb-as-img"
                  style={{ backgroundImage: `url("${person.image.replace(/"/g, "%22")}")` }}
                />
              )}
            </span>
            <span className="hb-as-tip" aria-hidden="true">
              {person.name}
            </span>
          </li>
        );
      })}
      {hidden > 0 && (
        <li className="hb-as-i">
          <span className="hb-as-a hb-as-tail" role="img" aria-label={`${hidden} more`}>
            {`+${hidden.toLocaleString("en-US")}`}
          </span>
        </li>
      )}
    </ul>
  );
}
