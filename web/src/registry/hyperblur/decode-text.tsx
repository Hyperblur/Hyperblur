"use client";

import * as React from "react";

export interface DecodeTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  duration?: number;
  glyphs?: string;
  trigger?: "mount" | "hover";
  stagger?: number;
}

const css = `
.hb-decode { position: relative; display: inline-block; white-space: pre; }
.hb-decode > span:first-child { visibility: hidden; }
.hb-decode > span:last-child { position: absolute; inset: 0; }
.hb-decode [data-s] { color: var(--hb-decode-color, inherit); opacity: var(--hb-decode-opacity, 0.7); }
`;

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@";
const FPS = 24;

function hash(n: number) {
  let h = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  return (h ^ (h >>> 16)) >>> 0;
}

interface Frame {
  value: string;
  settled: number;
}

export function DecodeText({
  text,
  duration = 1.2,
  glyphs = DEFAULT_GLYPHS,
  trigger = "mount",
  stagger = 0.04,
  className = "",
  style,
  onMouseEnter,
  ...rest
}: DecodeTextProps) {
  const [frame, setFrame] = React.useState<Frame | null>(null);
  const raf = React.useRef(0);

  const run = React.useCallback(() => {
    cancelAnimationFrame(raf.current);
    const chars = Array.from(text);
    const pool = Array.from(glyphs);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || pool.length === 0 || chars.length === 0) return;

    const start = performance.now();
    const total = duration + (chars.length - 1) * stagger;
    let last = -1;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      if (t >= total) {
        setFrame(null);
        return;
      }
      const step = Math.floor(t * FPS);
      if (step !== last) {
        last = step;
        let settled = 0;
        let value = "";
        chars.forEach((ch, i) => {
          if (t >= duration + i * stagger) {
            settled = i + 1;
            value += ch;
          } else if (/\s/.test(ch)) {
            value += ch;
          } else {
            value += pool[hash(i * 7919 + step * 104729) % pool.length];
          }
        });
        setFrame({ value, settled });
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
  }, [text, duration, glyphs, stagger]);

  React.useEffect(() => {
    if (trigger === "mount") run();
    return () => cancelAnimationFrame(raf.current);
  }, [run, trigger]);

  const shown = frame ? Array.from(frame.value) : Array.from(text);
  const settled = frame ? frame.settled : shown.length;

  return (
    <span
      className={`hb-decode ${className}`}
      style={style}
      aria-label={text}
      onMouseEnter={(e) => {
        if (trigger === "hover") run();
        onMouseEnter?.(e);
      }}
      {...rest}
    >
      <style href="hb-decode-text" precedence="default">{css}</style>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">
        {shown.map((ch, i) => (
          <span key={i} data-s={i >= settled ? "" : undefined}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
