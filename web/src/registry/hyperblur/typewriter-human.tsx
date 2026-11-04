"use client";

import * as React from "react";

export interface TypewriterHumanProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  typos?: number;
  seed?: number;
  loop?: boolean;
  pause?: number;
  accent?: string;
}

const css = `
@keyframes hb-zz3-blink {
  0%, 49.9% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.hb-zz3 {
  display: inline;
  font-family: inherit;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.hb-zz3-sr {
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
.hb-zz3-w { color: #ff7a7a; text-decoration: underline wavy rgba(255, 122, 122, 0.7) 1px; text-underline-offset: 0.18em; }
.hb-zz3-h { visibility: hidden; }
.hb-zz3-k { position: relative; }
.hb-zz3-k::after {
  content: "";
  position: absolute;
  left: 0.04em;
  top: 0.12em;
  bottom: 0.08em;
  width: 0.095em;
  border-radius: 1px;
  background: var(--hb-zz3-accent);
  animation: hb-zz3-blink 1.05s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .hb-zz3-k::after { animation: none; }
}
`;

function mix(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

function neighbors(ch: string) {
  const lower = ch.toLowerCase();
  const out: string[] = [];
  rows.forEach((row, r) => {
    const c = row.indexOf(lower);
    if (c < 0) return;
    if (row[c - 1]) out.push(row[c - 1]);
    if (row[c + 1]) out.push(row[c + 1]);
    const above = rows[r - 1];
    if (above?.[c]) out.push(above[c]);
    const below = rows[r + 1];
    if (below?.[c]) out.push(below[c]);
  });
  return out;
}

type Step = { op: "add" | "del"; ch: string; wait: number };

function build(text: string, speed: number, typos: number, seed: number): Step[] {
  const chars = Array.from(text);
  const n = chars.length;
  const steps: Step[] = [];
  const skip = new Set<number>();
  let i = 0;
  while (i < n) {
    const ch = chars[i];
    const prev = i > 0 ? chars[i - 1] : "";
    const h = mix(i * 977 + seed * 131 + 11);
    let wait = speed * (0.55 + ((h % 1000) / 1000) * 0.95);
    if (prev === "." || prev === "!" || prev === "?") wait += speed * 5.5;
    else if (prev === "," || prev === ";" || prev === ":") wait += speed * 2.8;
    else if (prev === " ") wait += speed * 0.3;
    const roll = (mix(i * 613 + seed * 17 + 5) % 1000) / 1000;
    const near = /[a-z]/i.test(ch) ? neighbors(ch) : [];
    const typo = !skip.has(i) && i >= 2 && n - i > 2 && roll < typos && near.length > 0;
    if (typo) {
      const pick = near[h % near.length];
      const wrong = ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? pick.toUpperCase() : pick;
      steps.push({ op: "add", ch: wrong, wait });
      const extra = Math.min(mix(i * 37 + seed * 3 + 1) % 3, n - i - 1);
      for (let k = 1; k <= extra; k++) {
        steps.push({ op: "add", ch: chars[i + k], wait: speed * (0.5 + ((mix(i * 53 + k) % 100) / 100) * 0.5) });
      }
      for (let k = 0; k <= extra; k++) {
        steps.push({ op: "del", ch: "", wait: k === 0 ? speed * (2.4 + ((h % 7) / 7) * 1.4) : speed * 0.42 });
      }
      skip.add(i);
      continue;
    }
    steps.push({ op: "add", ch, wait });
    i++;
  }
  return steps;
}

export function TypewriterHuman({
  text,
  speed = 75,
  typos = 0.05,
  seed = 3,
  loop = true,
  pause = 2600,
  accent = "#7fb3ff",
  className = "",
  style,
  ...rest
}: TypewriterHumanProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [shown, setShown] = React.useState("");
  const [active, setActive] = React.useState(false);
  const script = React.useMemo(
    () => build(text, Math.max(10, speed), Math.min(1, Math.max(0, typos)), seed),
    [text, speed, typos, seed],
  );

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    if (reduced) {
      timer = window.setTimeout(() => setShown(text), 0);
      return () => window.clearTimeout(timer);
    }
    let pos = 0;
    let buf: string[] = [];
    const run = () => {
      if (pos >= script.length) {
        if (!loop) return;
        timer = window.setTimeout(() => {
          pos = 0;
          buf = [];
          setShown("");
          timer = window.setTimeout(run, 600);
        }, pause);
        return;
      }
      const step = script[pos++];
      timer = window.setTimeout(() => {
        if (step.op === "add") buf.push(step.ch);
        else buf.pop();
        setShown(buf.join(""));
        run();
      }, step.wait);
    };
    timer = window.setTimeout(() => {
      setShown("");
      run();
    }, 450);
    return () => window.clearTimeout(timer);
  }, [active, script, loop, pause, text]);

  const target = Array.from(text);
  const typed = Array.from(shown);
  let good = 0;
  while (good < typed.length && good < target.length && typed[good] === target[good]) good++;

  return (
    <span
      {...rest}
      ref={ref}
      className={`hb-zz3${className ? ` ${className}` : ""}`}
      style={{ ["--hb-zz3-accent" as string]: accent, ...style }}
    >
      <style href="hb-typewriter-human" precedence="default">{css}</style>
      <span className="hb-zz3-sr">{text}</span>
      <span aria-hidden="true">
        {target.slice(0, good).join("")}
        {good < typed.length ? <span className="hb-zz3-w">{typed.slice(good).join("")}</span> : null}
        <span className="hb-zz3-k" />
        <span className="hb-zz3-h">{target.slice(good).join("")}</span>
      </span>
    </span>
  );
}
