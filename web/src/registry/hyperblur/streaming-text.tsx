"use client";

import * as React from "react";

export interface StreamingTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text?: string;
  speed?: number;
  chunk?: number;
  start?: boolean;
  color?: string;
  cursor?: boolean;
  onDone?: () => void;
}

const css = `
@keyframes hb-st-blink {
  0%, 49.9% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.hb-st {
  margin: 0;
  color: inherit;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.hb-st-b { color: #ffffff; font-weight: 600; }
.hb-st-c {
  padding: 1px 5px;
  border: 1px solid #262626;
  border-radius: 5px;
  color: #ededed;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .88em;
  background: #171717;
}
.hb-st-caret {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.18em;
  border-radius: 1px;
  background: var(--hb-st-color, #2f7bff);
  animation: hb-st-blink 1s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .hb-st-caret { animation: none; } }
`;

type Kind = "t" | "b" | "c" | "n";

interface Unit {
  s: string;
  k: Kind;
}

function parse(text: string, perChar: boolean): Unit[] {
  const out: Unit[] = [];
  text.split("\n").forEach((line, li) => {
    if (li > 0) out.push({ s: "\n", k: "n" });
    line.split(/(\*\*[^*]+\*\*|`[^`]+`)/).forEach((seg) => {
      if (!seg) return;
      let k: Kind = "t";
      let body = seg;
      if (seg.length > 4 && seg.startsWith("**") && seg.endsWith("**")) {
        k = "b";
        body = seg.slice(2, -2);
      } else if (seg.length > 2 && seg.startsWith("`") && seg.endsWith("`")) {
        k = "c";
        body = seg.slice(1, -1);
      }
      const parts = perChar ? Array.from(body) : (body.match(/\S+\s*|\s+/g) ?? []);
      parts.forEach((s) => out.push({ s, k }));
    });
  });
  return out;
}

function render(units: Unit[], count: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const end = Math.min(count, units.length);
  let i = 0;
  while (i < end) {
    const k = units[i].k;
    const from = i;
    if (k === "n") {
      nodes.push(<br key={from} />);
      i += 1;
      continue;
    }
    let s = "";
    while (i < end && units[i].k === k) {
      s += units[i].s;
      i += 1;
    }
    if (k === "b") nodes.push(<strong key={from} className="hb-st-b">{s}</strong>);
    else if (k === "c") nodes.push(<code key={from} className="hb-st-c">{s}</code>);
    else nodes.push(<React.Fragment key={from}>{s}</React.Fragment>);
  }
  return nodes;
}

const subscribe = () => () => {};
const getAnimate = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerAnimate = () => false;

function useStream(
  text: string,
  total: number,
  per: number,
  speed: number,
  start: boolean,
  onDone?: () => void
) {
  const animate = React.useSyncExternalStore(subscribe, getAnimate, getServerAnimate);
  const [count, setCount] = React.useState(0);
  const [prev, setPrev] = React.useState(text);
  const doneRef = React.useRef(onDone);

  if (prev !== text) {
    setPrev(text);
    setCount(0);
  }

  React.useEffect(() => {
    doneRef.current = onDone;
  });

  React.useEffect(() => {
    if (!animate || !start) return;
    let n = 0;
    let timer = 0;
    const step = () => {
      n += per;
      if (n >= total) {
        setCount(total);
        doneRef.current?.();
        return;
      }
      setCount(n);
      timer = window.setTimeout(step, speed);
    };
    timer = window.setTimeout(() => {
      setCount(0);
      timer = window.setTimeout(step, speed);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [animate, start, text, total, per, speed]);

  if (!animate) return { shown: total, active: false };
  const shown = Math.min(count, total);
  return { shown, active: shown < total };
}

export function StreamingText({
  text = "",
  speed = 24,
  chunk = 0,
  start = true,
  color = "#2f7bff",
  cursor = true,
  onDone,
  className = "",
  style,
  ...rest
}: StreamingTextProps) {
  const per = chunk > 0 ? Math.floor(chunk) : 1;
  const units = React.useMemo(() => parse(text, chunk > 0), [text, chunk]);
  const { shown, active } = useStream(text, units.length, per, Math.max(0, speed), start, onDone);

  return (
    <div
      className={`hb-st ${className}`}
      style={{ "--hb-st-color": color, ...style } as React.CSSProperties}
      aria-live="polite"
      aria-busy={active}
      {...rest}
    >
      <style href="hb-streaming-text" precedence="default">{css}</style>
      {render(units, shown)}
      {cursor && active ? <span className="hb-st-caret" aria-hidden="true" /> : null}
    </div>
  );
}
