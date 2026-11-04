"use client";

import * as React from "react";

export interface TextScrambleViewProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  speed?: number;
  charset?: string;
  accent?: string;
  replay?: boolean;
}

const css = `
.hb-zz1 {
  display: block;
  position: relative;
  box-sizing: border-box;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-zz1 *, .hb-zz1 *::before, .hb-zz1 *::after { box-sizing: border-box; }
.hb-zz1[data-replay] { cursor: pointer; }
.hb-zz1[data-replay]:focus-visible { outline: 2px solid var(--hb-zz1-accent); outline-offset: 4px; border-radius: 4px; }
.hb-zz1-sr {
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
.hb-zz1-t { display: block; }
.hb-zz1-w { display: inline-block; white-space: nowrap; }
.hb-zz1-c { position: relative; display: inline-block; }
.hb-zz1[data-idle] .hb-zz1-g { opacity: 0; }
.hb-zz1-o {
  position: absolute;
  top: 0;
  left: -1em;
  right: -1em;
  text-align: center;
  color: var(--hb-zz1-accent);
  pointer-events: none;
}
.hb-zz1-c[data-s] .hb-zz1-g { opacity: 0; }
`;

function mix(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

type Word = { space: boolean; letters: { ch: string; n: number }[] };

function tokenize(text: string): Word[] {
  let n = 0;
  return text
    .split(/(\s+)/)
    .filter((t) => t !== "")
    .map((value) => {
      if (/^\s+$/.test(value)) return { space: true, letters: [{ ch: value, n: -1 }] };
      return { space: false, letters: Array.from(value).map((ch) => ({ ch, n: n++ })) };
    });
}

export function TextScrambleView({
  text,
  speed = 45,
  charset = "!<>-_/[]{}=+*^?#%&$01",
  accent = "#7fb3ff",
  replay = true,
  className = "",
  style,
  onClick,
  onKeyDown,
  ...rest
}: TextScrambleViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);
  const [phase, setPhase] = React.useState<"idle" | "run" | "done">("idle");
  const [frame, setFrame] = React.useState<(string | null)[]>([]);
  const words = React.useMemo(() => tokenize(text), [text]);
  const total = React.useMemo(() => Array.from(text.replace(/\s+/g, "")).length, [text]);
  const pool = React.useMemo(() => Array.from(charset), [charset]);

  const play = React.useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (total === 0 || pool.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrame([]);
      setPhase("done");
      return;
    }
    const gap = Math.max(8, speed);
    const reveal = Array.from({ length: total }, (_, i) => 160 + i * gap + (mix(i * 131 + 17) % 1000) / 1000 * gap * 2.5);
    const start = performance.now();
    let lastKey = "";
    setPhase("run");
    const tick = (now: number) => {
      const t = now - start;
      const step = Math.floor(t / 48);
      const cells: (string | null)[] = [];
      let pending = 0;
      for (let i = 0; i < total; i++) {
        if (t >= reveal[i]) cells.push(null);
        else {
          pending++;
          cells.push(pool[mix(i * 7919 + step * 104729 + 3) % pool.length]);
        }
      }
      if (pending === 0) {
        setFrame([]);
        setPhase("done");
        return;
      }
      const key = cells.map((c) => c ?? "").join("");
      if (key !== lastKey) {
        lastKey = key;
        setFrame(cells);
      }
      raf.current = requestAnimationFrame(tick);
    };
    tick(start);
  }, [pool, speed, total]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  const running = phase === "run" && frame.length > 0;

  return (
    <div
      {...rest}
      ref={ref}
      className={`hb-zz1${className ? ` ${className}` : ""}`}
      style={{ ["--hb-zz1-accent" as string]: accent, ...style }}
      data-idle={phase === "idle" ? "" : undefined}
      data-replay={replay ? "" : undefined}
      role={replay ? "button" : undefined}
      tabIndex={replay ? 0 : undefined}
      aria-label={replay ? `${text}. Replay` : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (replay && !e.defaultPrevented) play();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (replay && !e.defaultPrevented && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          play();
        }
      }}
    >
      <style href="hb-text-scramble-view" precedence="default">{css}</style>
      {replay ? null : <span className="hb-zz1-sr">{text}</span>}
      <span className="hb-zz1-t" aria-hidden="true">
        {words.map((word, wi) =>
          word.space ? (
            <React.Fragment key={wi}>{" "}</React.Fragment>
          ) : (
            <span key={wi} className="hb-zz1-w">
              {word.letters.map((l) => {
                const glyph = running ? frame[l.n] : null;
                return (
                  <span key={l.n} className="hb-zz1-c" data-s={glyph ? "" : undefined}>
                    <span className="hb-zz1-g">{l.ch}</span>
                    {glyph ? <span className="hb-zz1-o">{glyph}</span> : null}
                  </span>
                );
              })}
            </span>
          ),
        )}
      </span>
    </div>
  );
}
