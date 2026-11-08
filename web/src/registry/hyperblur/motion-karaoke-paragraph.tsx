"use client";

import * as React from "react";

export interface MotionKaraokeParagraphProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  text?: string;
  eyebrow?: string;
  author?: string;
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const defaultText =
  "We stopped measuring how much we shipped and started measuring *how it felt to use*. The roadmap got shorter, the releases got quieter, and for the first time our customers wrote to say *thank you* instead of asking where things had gone.";

const css = `
.hb-wh4 {
  --hb-wh4-a: #2f7bff;
  --hb-wh4-p: 0;
  position: relative;
  width: 100%;
  height: var(--hb-wh4-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-wh4[data-pinned="true"] { height: calc(var(--hb-wh4-h) * var(--hb-wh4-len)); }
.hb-wh4 *, .hb-wh4 *::before, .hb-wh4 *::after { box-sizing: border-box; }
.hb-wh4-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh4-h);
  overflow: hidden;
  container-type: size;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(8px, 4cqh, 36px);
  padding: 6cqh max(16px, 8cqw);
  background: radial-gradient(80% 60% at 50% 110%, color-mix(in srgb, var(--hb-wh4-a) 9%, transparent), transparent 70%), #0a0a0a;
}
.hb-wh4-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: clamp(8px, 1.6cqw, 12px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #7c7c7c;
}
.hb-wh4-count { font-variant-numeric: tabular-nums; color: #a1a1a1; }
.hb-wh4-count b { font-weight: 500; color: #ededed; }
.hb-wh4-text {
  margin: 0;
  max-width: 34ch;
  font-family: var(--font-grotesk, var(--font-sans, system-ui));
  font-size: clamp(13px, min(4.6cqw, 7cqh), 54px);
  font-weight: 500;
  line-height: 1.32;
  letter-spacing: -0.02em;
}
.hb-wh4-w {
  --hb-wh4-f: clamp(0, calc(var(--hb-wh4-p) * var(--hb-wh4-n) * 1.08 - var(--i)), 1);
  position: relative;
  display: inline;
  color: transparent;
  background:
    linear-gradient(90deg, #f5f5f5, #f5f5f5) no-repeat 0 0 / calc(var(--hb-wh4-f) * 100%) 100%,
    #3a3a3a;
  -webkit-background-clip: text;
  background-clip: text;
}
.hb-wh4-w[data-em="true"] {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--hb-wh4-a) 40%, #fff), color-mix(in srgb, var(--hb-wh4-a) 40%, #fff)) no-repeat 0 0 / calc(var(--hb-wh4-f) * 100%) 100%,
    #3a3a3a;
  -webkit-background-clip: text;
  background-clip: text;
}
.hb-wh4-mk {
  position: relative;
  display: inline;
  background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wh4-a) 30%, transparent), color-mix(in srgb, var(--hb-wh4-a) 18%, transparent)) no-repeat 0 88% / calc(var(--hb-wh4-mk) * 100%) 0.42em;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.hb-wh4-caret {
  display: inline-block;
  width: 0.08em;
  height: 0.95em;
  margin-left: 0.04em;
  vertical-align: -0.12em;
  border-radius: 1px;
  background: var(--hb-wh4-a);
  box-shadow: 0 0 10px var(--hb-wh4-a);
  opacity: calc(1 - clamp(0, (var(--hb-wh4-p) - 0.9) * 10, 1));
  animation: hb-wh4-blink 1s steps(1) infinite;
}
@keyframes hb-wh4-blink { 50% { visibility: hidden; } }
.hb-wh4-foot {
  display: flex;
  align-items: center;
  gap: 0.75em;
  font-size: clamp(9px, 1.7cqw, 14px);
  color: #8f8f8f;
}
.hb-wh4-bar {
  position: relative;
  flex: 0 0 clamp(40px, 16cqw, 160px);
  height: 2px;
  border-radius: 2px;
  background: #232323;
  overflow: hidden;
}
.hb-wh4-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--hb-wh4-a);
  transform-origin: left;
  transform: scaleX(var(--hb-wh4-p));
}
.hb-wh4-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh4-caret { animation: none; display: none; }
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function inOut(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function findScroller(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const oy = getComputedStyle(node).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && node.scrollHeight > node.clientHeight + 1) return node;
    node = node.parentElement;
  }
  return null;
}

function loopAt(ms: number, duration: number) {
  const d = Math.max(1, duration) * 1000;
  const back = d * 0.3;
  const hold = 1800;
  const t = ms % (d + hold + back + 500);
  if (t < d) return t / d;
  if (t < d + hold) return 1;
  if (t < d + hold + back) return 1 - inOut((t - d - hold) / back);
  return 0;
}

function useProgress(
  ref: React.RefObject<HTMLElement | null>,
  apply: (p: number) => void,
  progress: number | undefined,
  autoPlay: boolean,
  duration: number,
) {
  const applyRef = React.useRef(apply);
  React.useLayoutEffect(() => {
    applyRef.current = apply;
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = (p: number) => applyRef.current(clamp01(p));
    if (typeof progress === "number") {
      run(progress);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      run(1);
      return;
    }
    let raf = 0;
    if (autoPlay) {
      let visible = true;
      let last = 0;
      let t = 0;
      const io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      });
      io.observe(el);
      const loop = (now: number) => {
        const dt = last ? Math.min(64, now - last) : 0;
        last = now;
        if (visible) {
          t += dt;
          run(loopAt(t, duration));
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
      };
    }
    const sc = findScroller(el);
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const top = sc ? r.top - sc.getBoundingClientRect().top : r.top;
      const vh = sc ? sc.clientHeight : window.innerHeight;
      const span = r.height - vh;
      run(span > 1 ? -top / span : (vh - top) / (vh + r.height));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    const target: HTMLElement | Window = sc ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, progress, autoPlay, duration]);
}

interface Word {
  w: string;
  em: boolean;
  i: number;
}

function parse(text: string) {
  const groups: { em: boolean; words: Word[] }[] = [];
  let n = 0;
  text.split("*").forEach((part, k) => {
    const em = k % 2 === 1;
    const words = part.split(/\s+/).filter(Boolean).map((w) => ({ w, em, i: n++ }));
    if (words.length) groups.push({ em, words });
  });
  return groups;
}

export function MotionKaraokeParagraph({
  text = defaultText,
  eyebrow = "Field notes · Chapter 04",
  author = "Mara Ellison, Head of Product at Tessel",
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 7,
  length = 3,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionKaraokeParagraphProps) {
  const ref = React.useRef<HTMLElement>(null);
  const countRef = React.useRef<HTMLElement>(null);
  const groups = React.useMemo(() => parse(text), [text]);
  const total = groups.reduce((n, g) => n + g.words.length, 0);
  const pinned = progress === undefined && !autoPlay;
  const plain = text.split("*").join("");

  useProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hb-wh4-p", p.toFixed(4));
      if (countRef.current) {
        const read = Math.min(total, Math.floor(p * total * 1.08));
        countRef.current.textContent = String(read).padStart(String(total).length, "0");
      }
    },
    progress,
    autoPlay,
    duration,
  );

  return (
    <section
      ref={ref}
      className={["hb-wh4", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh4-a": accent,
          "--hb-wh4-h": height,
          "--hb-wh4-len": length,
          "--hb-wh4-n": total,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-karaoke-paragraph" precedence="default">{css}</style>
      <div className="hb-wh4-stage">
        <div className="hb-wh4-head" aria-hidden="true">
          <span>{eyebrow}</span>
          <span className="hb-wh4-count">
            <b ref={countRef}>{"0".padStart(String(total).length, "0")}</b> / {total} words
          </span>
        </div>
        <p className="hb-wh4-text">
          <span className="hb-wh4-sr">{plain}</span>
          <span aria-hidden="true">
            {groups.map((g, gi) => {
              const words = g.words.map((word, wi) => {
                const i = word.i;
                return (
                  <React.Fragment key={i}>
                    <span className="hb-wh4-w" data-em={word.em ? "true" : "false"} style={{ "--i": i } as React.CSSProperties}>
                      {word.w}
                    </span>
                    {wi < g.words.length - 1 ? " " : null}
                  </React.Fragment>
                );
              });
              const gap = gi < groups.length - 1 ? " " : null;
              if (!g.em) {
                return (
                  <React.Fragment key={`g${gi}`}>
                    {words}
                    {gap}
                  </React.Fragment>
                );
              }
              const end = g.words[g.words.length - 1].i + 1;
              return (
                <React.Fragment key={`g${gi}`}>
                  <span
                    className="hb-wh4-mk"
                    style={
                      {
                        "--hb-wh4-mk": `clamp(0, calc((var(--hb-wh4-p) * var(--hb-wh4-n) * 1.08 - ${end}) / 2.5), 1)`,
                      } as React.CSSProperties
                    }
                  >
                    {words}
                  </span>
                  {gap}
                </React.Fragment>
              );
            })}
            <span className="hb-wh4-caret" />
          </span>
        </p>
        {author ? (
          <div className="hb-wh4-foot">
            <span className="hb-wh4-bar" aria-hidden="true" />
            <span>{author}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
