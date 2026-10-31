"use client";

import * as React from "react";

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  by?: "chars" | "words";
  stagger?: number;
  duration?: number;
  distance?: number;
  trigger?: "view" | "mount";
  once?: boolean;
  onComplete?: () => void;
}

const css = `
@keyframes hb-st-in {
  from { opacity: 0; transform: translate3d(0, var(--hb-dist), 0); filter: blur(4px); }
  to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
.hb-st { display: inline-block; white-space: pre-wrap; }
.hb-st-w { display: inline-block; white-space: nowrap; }
.hb-st-i { display: inline-block; opacity: 0; will-change: opacity, transform, filter; }
.hb-st[data-active="true"] .hb-st-i {
  animation: hb-st-in var(--hb-dur) cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-n) * var(--hb-st));
}
@media (prefers-reduced-motion: reduce) {
  .hb-st .hb-st-i { opacity: 1; transform: none; filter: none; animation: none !important; will-change: auto; }
}
`;

interface Token {
  space: boolean;
  parts: { value: string; n: number }[];
  value: string;
}

function tokenize(text: string, by: "chars" | "words") {
  let n = 0;
  const tokens: Token[] = text.split(/(\s+)/).filter((t) => t !== "").map((value) => {
    const space = /^\s+$/.test(value);
    if (space) return { space, parts: [], value };
    const pieces = by === "chars" ? Array.from(value) : [value];
    return { space, value, parts: pieces.map((p) => ({ value: p, n: n++ })) };
  });
  return { tokens, total: n };
}

export function SplitText({
  text,
  by = "chars",
  stagger = 0.03,
  duration = 0.6,
  distance = 20,
  trigger = "view",
  once = true,
  onComplete,
  className = "",
  style,
  ...rest
}: SplitTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const done = React.useRef(onComplete);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    done.current = onComplete;
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "mount" || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            if (once) io.disconnect();
          } else if (!once) {
            setActive(false);
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger, once]);

  React.useEffect(() => {
    if (!active) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    done.current?.();
  }, [active]);

  const { tokens, total } = tokenize(text, by);

  const vars = {
    "--hb-st": `${Math.max(0, stagger)}s`,
    "--hb-dur": `${Math.max(0, duration)}s`,
    "--hb-dist": `${distance}px`,
    ...style,
  } as React.CSSProperties;

  const item = (p: { value: string; n: number }) => (
    <span
      key={p.n}
      className="hb-st-i"
      style={{ "--hb-n": p.n } as React.CSSProperties}
      data-last={p.n === total - 1 ? "" : undefined}
    >
      {p.value}
    </span>
  );

  return (
    <span
      ref={ref}
      className={`hb-st ${className}`}
      style={vars}
      aria-label={text}
      data-active={active}
      {...rest}
    >
      <style href="hb-split-text" precedence="default">{css}</style>
      <span
        aria-hidden="true"
        onAnimationEnd={(e) => {
          if (
            e.animationName === "hb-st-in" &&
            e.target instanceof HTMLElement &&
            e.target.hasAttribute("data-last")
          ) {
            done.current?.();
          }
        }}
      >
        {tokens.map((t, i) =>
          t.space ? (
            t.value
          ) : by === "chars" ? (
            <span key={i} className="hb-st-w">
              {t.parts.map(item)}
            </span>
          ) : (
            item(t.parts[0])
          )
        )}
      </span>
    </span>
  );
}
