"use client";

import * as React from "react";

export interface TypewriterSwapProps extends React.HTMLAttributes<HTMLSpanElement> {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
  loop?: boolean;
  accent?: string;
}

const css = `
@keyframes hb-zz4-blink {
  0%, 49.9% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.hb-zz4 {
  display: inline;
  font-family: inherit;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.hb-zz4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.hb-zz4-s { opacity: 0.62; transition: opacity 0.3s ease; }
.hb-zz4-k { position: relative; }
.hb-zz4-k::after {
  content: "";
  position: absolute;
  left: 0.04em;
  top: 0.12em;
  bottom: 0.08em;
  width: 0.095em;
  border-radius: 1px;
  background: var(--hb-zz4-accent);
  animation: hb-zz4-blink 1.05s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .hb-zz4-k::after { animation: none; }
  .hb-zz4-s { transition: none; }
}
`;

function mix(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

function shared(a: string[], b: string[]) {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
}

export function TypewriterSwap({
  phrases,
  typeSpeed = 62,
  deleteSpeed = 30,
  hold = 1700,
  loop = true,
  accent = "#7fb3ff",
  className = "",
  style,
  ...rest
}: TypewriterSwapProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [typed, setTyped] = React.useState("");
  const [keep, setKeep] = React.useState(0);
  const [active, setActive] = React.useState(false);
  const key = phrases.join("\u0001");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setActive(e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!active) return;
    const list = key === "" ? [] : key.split("\u0001").map((p) => Array.from(p));
    if (list.length === 0) return;
    let timer = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setTimeout(() => {
        setTyped(list[0].join(""));
        setKeep(0);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    let index = 0;
    let cur: string[] = [];
    let target = list[0];
    let floor = 0;
    let deleting = false;
    let tick = 0;

    const show = () => {
      setTyped(cur.join(""));
      setKeep(deleting ? floor : 0);
    };

    const step = () => {
      if (!deleting) {
        if (cur.length < target.length) {
          cur.push(target[cur.length]);
          show();
          tick++;
          const jitter = 0.7 + ((mix(tick * 31 + index) % 100) / 100) * 0.6;
          timer = window.setTimeout(step, typeSpeed * jitter);
          return;
        }
        if (!loop && index === list.length - 1) return;
        const next = (index + 1) % list.length;
        floor = shared(cur, list[next]);
        if (list.length === 1) floor = 0;
        index = next;
        deleting = true;
        show();
        timer = window.setTimeout(step, hold);
        return;
      }
      if (cur.length > floor) {
        cur.pop();
        show();
        timer = window.setTimeout(step, deleteSpeed);
        return;
      }
      deleting = false;
      target = list[index];
      show();
      timer = window.setTimeout(step, typeSpeed * 1.6);
    };

    cur = [];
    timer = window.setTimeout(step, 350);
    return () => window.clearTimeout(timer);
  }, [active, key, typeSpeed, deleteSpeed, hold, loop]);

  const chars = Array.from(typed);
  const stem = Math.min(keep, chars.length);

  return (
    <span
      {...rest}
      ref={ref}
      className={`hb-zz4${className ? ` ${className}` : ""}`}
      style={{ ["--hb-zz4-accent" as string]: accent, ...style }}
    >
      <style href="hb-typewriter-swap" precedence="default">{css}</style>
      <span className="hb-zz4-sr">{phrases.join(". ")}</span>
      <span aria-hidden="true">
        {stem > 0 ? <span className="hb-zz4-s">{chars.slice(0, stem).join("")}</span> : null}
        {chars.slice(stem).join("")}
        <span className="hb-zz4-k" />
      </span>
    </span>
  );
}
