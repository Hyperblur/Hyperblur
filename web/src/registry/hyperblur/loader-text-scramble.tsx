"use client";

import * as React from "react";

export interface LoaderTextScrambleProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  glyphs?: string;
  size?: number;
  color?: string;
  accent?: string;
  interval?: number;
  label?: string;
}

const css = `
.hb-qcc {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  box-sizing: border-box;
  font-family: inherit;
  color: #ededed;
  vertical-align: middle;
}
.hb-qcc *, .hb-qcc *::before, .hb-qcc *::after { box-sizing: border-box; }
.hb-qcc-t {
  display: inline-flex;
  align-items: baseline;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--hb-qcc-s);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.02em;
  white-space: pre;
}
.hb-qcc-ch { color: var(--hb-qcc-c); }
.hb-qcc-ch[data-s="1"] { color: var(--hb-qcc-a); opacity: 0.8; }
.hb-qcc-cur {
  display: inline-block;
  width: 0.55em;
  height: 0.12em;
  margin-left: 0.12em;
  background: var(--hb-qcc-a);
  animation: hb-qcc-blink 1s steps(1) infinite;
}
.hb-qcc-l { font-size: 12px; line-height: 1.3; color: #a1a1a1; white-space: nowrap; }
.hb-qcc-sr {
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
@keyframes hb-qcc-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qcc-cur { animation: none; }
}
`;

const SCRAMBLE = 8;
const STAGGER = 3;
const HOLD = 22;

function hash(a: number, b: number) {
  let h = Math.imul(a + 1, 374761393) ^ Math.imul(b + 7, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

export function LoaderTextScramble({
  text = "Loading",
  glyphs = "!<>-_/[]{}=+*^?#%&",
  size = 20,
  color = "#ededed",
  accent = "#2f7bff",
  interval = 55,
  label,
  className = "",
  style,
  ...rest
}: LoaderTextScrambleProps) {
  const chars = React.useMemo(() => Array.from(text), [text]);
  const pool = React.useMemo(() => Array.from(glyphs || "#"), [glyphs]);
  const [frame, setFrame] = React.useState(-1);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cycle = SCRAMBLE + chars.length * STAGGER + STAGGER + HOLD;
    let f = 0;
    const id = window.setInterval(() => {
      f = (f + 1) % cycle;
      setFrame(f);
    }, Math.max(16, interval));
    return () => window.clearInterval(id);
  }, [chars.length, interval]);

  const shown = chars.map((ch, i) => {
    if (frame < 0 || ch === " ") return { ch, s: 0 };
    const resolveAt = SCRAMBLE + i * STAGGER + STAGGER;
    if (frame >= resolveAt) return { ch, s: 0 };
    return { ch: pool[hash(frame, i) % pool.length], s: 1 };
  });

  const vars = {
    "--hb-qcc-s": `${size}px`,
    "--hb-qcc-c": color,
    "--hb-qcc-a": accent,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-loader-text-scramble" precedence="default">{css}</style>
      <span role="status" className={`hb-qcc ${className}`} style={vars} {...rest}>
        <span className="hb-qcc-t" aria-hidden="true">
          {shown.map((c, i) => (
            <span key={i} className="hb-qcc-ch" data-s={c.s}>
              {c.ch}
            </span>
          ))}
          <span className="hb-qcc-cur" />
        </span>
        {label ? (
          <span className="hb-qcc-l" aria-hidden="true">
            {label}
          </span>
        ) : null}
        <span className="hb-qcc-sr">{label ?? text}</span>
      </span>
    </>
  );
}
