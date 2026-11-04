"use client";

import * as React from "react";

export interface TextScrambleCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  speed?: number;
  charset?: string;
  accent?: string;
  glow?: number;
  replay?: boolean;
}

const css = `
.hb-zz2 {
  display: block;
  position: relative;
  box-sizing: border-box;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.hb-zz2 *, .hb-zz2 *::before, .hb-zz2 *::after { box-sizing: border-box; }
.hb-zz2[data-replay] { cursor: pointer; }
.hb-zz2[data-replay]:focus-visible { outline: 2px solid var(--hb-zz2-accent); outline-offset: 4px; border-radius: 4px; }
.hb-zz2-sr {
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
.hb-zz2-t { display: block; }
.hb-zz2-w { display: inline-block; white-space: nowrap; }
.hb-zz2-c { position: relative; display: inline-block; }
.hb-zz2[data-idle] .hb-zz2-g { opacity: 0; }
.hb-zz2-g {
  color: color-mix(in srgb, var(--hb-zz2-accent) calc(var(--hb-zz2-k, 0) * 100%), currentColor);
  text-shadow: 0 0 calc(var(--hb-zz2-k, 0) * 0.55em) var(--hb-zz2-accent), 0 0 calc(var(--hb-zz2-k, 0) * 1.2em) color-mix(in srgb, var(--hb-zz2-accent) 55%, transparent);
}
.hb-zz2-o {
  position: absolute;
  top: 0;
  left: -1em;
  right: -1em;
  text-align: center;
  color: color-mix(in srgb, var(--hb-zz2-accent) 70%, transparent);
  pointer-events: none;
}
.hb-zz2-c[data-s] .hb-zz2-g { opacity: 0; }
`;

function mix(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

type Word = { space: boolean; letters: { ch: string; n: number }[] };
type Cell = { glyph: string | null; k: number };

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

export function TextScrambleCenter({
  text,
  speed = 70,
  charset = "!<>-_/[]{}=+*^?#%&$01",
  accent = "#7fb3ff",
  glow = 1,
  replay = true,
  className = "",
  style,
  onClick,
  onKeyDown,
  ...rest
}: TextScrambleCenterProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);
  const [phase, setPhase] = React.useState<"idle" | "run" | "done">("idle");
  const [frame, setFrame] = React.useState<Cell[]>([]);
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
    const mid = (total - 1) / 2;
    const reveal = Array.from(
      { length: total },
      (_, i) => 180 + Math.abs(i - mid) * gap + (mix(i * 211 + 29) % 1000) / 1000 * gap * 0.9,
    );
    const fade = 520;
    const start = performance.now();
    let lastKey = "";
    setPhase("run");
    const tick = (now: number) => {
      const t = now - start;
      const step = Math.floor(t / 50);
      const cells: Cell[] = [];
      let alive = 0;
      for (let i = 0; i < total; i++) {
        if (t < reveal[i]) {
          alive++;
          cells.push({ glyph: pool[mix(i * 7919 + step * 104729 + 5) % pool.length], k: 0 });
        } else {
          const age = (t - reveal[i]) / fade;
          if (age < 1) {
            alive++;
            const k = Math.round((1 - age) * (1 - age) * 10) / 10;
            cells.push({ glyph: null, k });
          } else cells.push({ glyph: null, k: 0 });
        }
      }
      if (alive === 0) {
        setFrame([]);
        setPhase("done");
        return;
      }
      const key = cells.map((c) => `${c.glyph ?? ""}${c.k}`).join("|");
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
  const strength = Math.max(0, glow);

  return (
    <div
      {...rest}
      ref={ref}
      className={`hb-zz2${className ? ` ${className}` : ""}`}
      style={{ ["--hb-zz2-accent" as string]: accent, ...style }}
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
      <style href="hb-text-scramble-center" precedence="default">{css}</style>
      {replay ? null : <span className="hb-zz2-sr">{text}</span>}
      <span className="hb-zz2-t" aria-hidden="true">
        {words.map((word, wi) =>
          word.space ? (
            <React.Fragment key={wi}>{" "}</React.Fragment>
          ) : (
            <span key={wi} className="hb-zz2-w">
              {word.letters.map((l) => {
                const cell = running ? frame[l.n] : undefined;
                const glyph = cell?.glyph ?? null;
                const k = cell && !glyph ? Math.min(1, cell.k * strength) : 0;
                return (
                  <span key={l.n} className="hb-zz2-c" data-s={glyph ? "" : undefined}>
                    <span className="hb-zz2-g" style={k > 0 ? { ["--hb-zz2-k" as string]: k.toFixed(2) } : undefined}>
                      {l.ch}
                    </span>
                    {glyph ? <span className="hb-zz2-o">{glyph}</span> : null}
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
