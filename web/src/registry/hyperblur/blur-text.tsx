"use client";

import * as React from "react";

export interface BlurTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  by?: "words" | "chars";
  blur?: number;
  stagger?: number;
  duration?: number;
  trigger?: "view" | "mount";
  once?: boolean;
}

const css = `
@keyframes hb-bt-in {
  0% { opacity: 0; filter: blur(var(--hb-blur)); transform: translate3d(0, .35em, 0); }
  55% { opacity: .6; filter: blur(calc(var(--hb-blur) * .4)); transform: translate3d(0, .1em, 0); }
  100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
}
.hb-bt { display: inline-block; white-space: pre-wrap; }
.hb-bt-w { display: inline-block; white-space: nowrap; }
.hb-bt-i { display: inline-block; opacity: 0; filter: blur(var(--hb-blur)); will-change: opacity, transform, filter; }
.hb-bt[data-active="true"] .hb-bt-i {
  animation: hb-bt-in var(--hb-dur) cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-n) * var(--hb-st));
}
@media (prefers-reduced-motion: reduce) {
  .hb-bt .hb-bt-i { opacity: 1; transform: none; filter: none; animation: none !important; will-change: auto; }
}
`;

interface Token {
  space: boolean;
  value: string;
  parts: { value: string; n: number }[];
}

function tokenize(text: string, by: "chars" | "words") {
  let n = 0;
  return text.split(/(\s+)/).filter((t) => t !== "").map((value): Token => {
    const space = /^\s+$/.test(value);
    if (space) return { space, parts: [], value };
    const pieces = by === "chars" ? Array.from(value) : [value];
    return { space, value, parts: pieces.map((p) => ({ value: p, n: n++ })) };
  });
}

export function BlurText({
  text,
  by = "words",
  blur = 12,
  stagger = 0.08,
  duration = 0.7,
  trigger = "view",
  once = true,
  className = "",
  style,
  ...rest
}: BlurTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(false);

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

  const tokens = tokenize(text, by);

  const vars = {
    "--hb-blur": `${Math.max(0, blur)}px`,
    "--hb-st": `${Math.max(0, stagger)}s`,
    "--hb-dur": `${Math.max(0, duration)}s`,
    ...style,
  } as React.CSSProperties;

  const item = (p: { value: string; n: number }) => (
    <span key={p.n} className="hb-bt-i" style={{ "--hb-n": p.n } as React.CSSProperties}>
      {p.value}
    </span>
  );

  return (
    <span
      ref={ref}
      className={`hb-bt ${className}`}
      style={vars}
      aria-label={text}
      data-active={active}
      {...rest}
    >
      <style href="hb-blur-text" precedence="default">{css}</style>
      <span aria-hidden="true">
        {tokens.map((t, i) =>
          t.space ? (
            t.value
          ) : by === "chars" ? (
            <span key={i} className="hb-bt-w">
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
