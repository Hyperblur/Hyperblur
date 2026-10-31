"use client";

import * as React from "react";

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  loop?: boolean;
  cursor?: string;
}

const css = `
@keyframes hb-type-blink {
  0%, 49.9% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.hb-type { position: relative; display: inline-block; white-space: pre; }
.hb-type-size { display: grid; visibility: hidden; }
.hb-type-size > span { grid-area: 1 / 1; }
.hb-type-live { position: absolute; inset: 0; }
.hb-type-caret { animation: hb-type-blink 1s linear infinite; }
@media (prefers-reduced-motion: reduce) { .hb-type-caret { animation: none; } }
`;

export function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1400,
  loop = true,
  cursor = "|",
  className = "",
  ...rest
}: TypewriterProps) {
  const [typed, setTyped] = React.useState<string | null>(null);
  const key = words.join("\u0001");

  React.useEffect(() => {
    const list = words.length === 0 ? [] : key.split("\u0001").map((w) => Array.from(w));
    if (list.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    let count = 0;
    let deleting = false;
    let timer = 0;

    const show = () => setTyped(list[index].slice(0, count).join(""));

    const step = () => {
      const word = list[index];
      if (!deleting) {
        if (count < word.length) {
          count += 1;
          show();
        }
        if (count < word.length) {
          timer = window.setTimeout(step, typeSpeed);
          return;
        }
        if (!loop && index === list.length - 1) return;
        deleting = true;
        timer = window.setTimeout(step, pause);
        return;
      }
      if (count > 0) {
        count -= 1;
        show();
      }
      if (count > 0) {
        timer = window.setTimeout(step, deleteSpeed);
        return;
      }
      deleting = false;
      index = (index + 1) % list.length;
      timer = window.setTimeout(step, typeSpeed);
    };

    timer = window.setTimeout(() => {
      setTyped("");
      timer = window.setTimeout(step, typeSpeed);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [key, words.length, typeSpeed, deleteSpeed, pause, loop]);

  const shown = typed ?? words[0] ?? "";

  return (
    <span className={`hb-type ${className}`} aria-label={words[0]} {...rest}>
      <style href="hb-typewriter" precedence="default">{css}</style>
      <span className="hb-type-size" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            {w}
            {cursor}
          </span>
        ))}
      </span>
      <span className="hb-type-live" aria-hidden="true">
        {shown}
        <span className="hb-type-caret">{cursor}</span>
      </span>
    </span>
  );
}
