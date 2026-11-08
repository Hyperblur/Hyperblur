"use client";

import * as React from "react";

export interface MotionCodeRevealProps extends React.HTMLAttributes<HTMLElement> {
  code?: string;
  filename?: string;
  tabs?: string[];
  output?: string[];
  accent?: string;
  progress?: number;
  autoPlay?: boolean;
  duration?: number;
  length?: number;
  height?: string;
}

const defaultCode = `import { createServer } from "@tessel/edge";

const app = createServer({ region: "auto" });

app.get("/health", () => ({ ok: true }));

app.post("/orders", async (req) => {
  const order = await req.json();
  const id = await db.orders.insert(order);
  return { id, status: "queued" };
});

app.listen(8080);`;

const defaultOutput = ["$ tessel dev", "Compiled server.ts in 182ms", "Listening on port 8080, 2 routes ready"];

const css = `
.hb-wh10 {
  --hb-wh10-a: #2f7bff;
  position: relative;
  width: 100%;
  height: var(--hb-wh10-h);
  color: #ededed;
  font-family: inherit;
  background: #0a0a0a;
}
.hb-wh10[data-pinned="true"] { height: calc(var(--hb-wh10-h) * var(--hb-wh10-len)); }
.hb-wh10 *, .hb-wh10 *::before, .hb-wh10 *::after { box-sizing: border-box; }
.hb-wh10-stage {
  position: sticky;
  top: 0;
  height: var(--hb-wh10-h);
  overflow: hidden;
  container-type: size;
  display: grid;
  place-items: center;
  padding: clamp(8px, 6cqh, 64px) clamp(8px, 6cqw, 80px);
  background: radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--hb-wh10-a) 12%, transparent), transparent 70%), #0a0a0a;
}
.hb-wh10-win {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  max-width: 880px;
  height: 100%;
  max-height: 560px;
  border-radius: clamp(8px, 2cqh, 14px);
  border: 1px solid #262626;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
  font-family: var(--font-mono, ui-monospace, monospace);
}
.hb-wh10-bar {
  display: flex;
  align-items: center;
  gap: 0.8em;
  height: clamp(22px, 7cqh, 40px);
  padding: 0 0.8em;
  border-bottom: 1px solid #1f1f1f;
  background: #0f0f0f;
  font-size: clamp(8px, 2.2cqh, 12px);
  color: #7a7a7a;
}
.hb-wh10-dots { display: flex; gap: 0.4em; }
.hb-wh10-dots i { width: 0.75em; height: 0.75em; border-radius: 50%; background: #2a2a2a; }
.hb-wh10-tab {
  position: relative;
  padding: 0.35em 0.7em;
  border-radius: 0.4em;
  white-space: nowrap;
}
.hb-wh10-tab[data-on="true"] { color: #e8e8e8; background: #1a1a1a; box-shadow: inset 0 0 0 1px #262626; }
.hb-wh10-state { display: inline-flex; align-items: center; gap: 0.45em; margin-left: auto; white-space: nowrap; }
.hb-wh10-state i {
  width: 0.55em;
  height: 0.55em;
  border-radius: 50%;
  background: #f5b84a;
  box-shadow: 0 0 8px currentColor;
  color: #f5b84a;
}
.hb-wh10-state[data-s="run"] i { background: var(--hb-wh10-a); color: var(--hb-wh10-a); animation: hb-wh10-pulse 0.9s ease-in-out infinite; }
.hb-wh10-state[data-s="ready"] i { background: #3ecf8e; color: #3ecf8e; }
@keyframes hb-wh10-pulse { 50% { opacity: 0.35; } }
.hb-wh10-body { position: relative; display: grid; grid-template-columns: 1fr auto; min-height: 0; }
.hb-wh10-code {
  position: relative;
  overflow: hidden;
  padding: 0.7em 0;
  font-size: clamp(8.5px, 2.9cqh, 15px);
  line-height: 1.62;
}
.hb-wh10-scroll { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-wh10-line {
  position: relative;
  display: flex;
  min-height: 1.62em;
  white-space: pre;
}
.hb-wh10-line[data-cur="true"] { background: linear-gradient(90deg, color-mix(in srgb, var(--hb-wh10-a) 10%, transparent), transparent 70%); }
.hb-wh10-ln {
  flex: none;
  width: 3.4em;
  padding-right: 1.1em;
  text-align: right;
  color: #3a3a3a;
  user-select: none;
}
.hb-wh10-line[data-typed="true"] .hb-wh10-ln { color: #5f5f5f; }
.hb-wh10-line[data-cur="true"] .hb-wh10-ln { color: #cfcfcf; }
.hb-wh10-kw { color: #c792ff; }
.hb-wh10-str { color: #9ee6a8; }
.hb-wh10-num { color: #ffb86b; }
.hb-wh10-fn { color: #7fb3ff; }
.hb-wh10-prop { color: #e6e6e6; }
.hb-wh10-id { color: #d4d4d4; }
.hb-wh10-pu { color: #8a8a8a; }
.hb-wh10-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.2em;
  margin-top: 0.21em;
  background: var(--hb-wh10-a);
  box-shadow: 0 0 10px color-mix(in srgb, var(--hb-wh10-a) 70%, transparent);
  animation: hb-wh10-blink 1.05s steps(1) infinite;
}
@keyframes hb-wh10-blink { 55% { opacity: 0; } }
.hb-wh10-map {
  display: none;
  width: 54px;
  padding: 0.9em 0.7em;
  border-left: 1px solid #1a1a1a;
}
.hb-wh10-map i {
  display: block;
  height: 3px;
  margin-bottom: 3px;
  border-radius: 2px;
  background: #2b2b2b;
  transition: width 0.2s ease;
}
.hb-wh10-map i[data-cur="true"] { background: var(--hb-wh10-a); }
.hb-wh10-term {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.6em 1em 0.8em;
  border-top: 1px solid #262626;
  background: linear-gradient(180deg, rgba(14, 14, 14, 0.94), #0b0b0b);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-size: clamp(8px, 2.6cqh, 13px);
  line-height: 1.6;
  transform: translateY(calc((1 - var(--hb-wh10-t, 0)) * 105%));
}
.hb-wh10-term-h {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3em;
  font-size: 0.82em;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #5c5c5c;
}
.hb-wh10-out { display: flex; gap: 0.6em; opacity: 0; transform: translateY(4px); transition: opacity 0.3s ease, transform 0.35s ease; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wh10-out[data-on="true"] { opacity: 1; transform: none; }
.hb-wh10-out b { font-weight: 500; color: #3ecf8e; }
.hb-wh10-out:first-child b { color: var(--hb-wh10-a); }
.hb-wh10-out span { color: #bdbdbd; }
.hb-wh10-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (min-width: 620px) {
  .hb-wh10-map { display: block; }
}
@container (max-width: 380px) {
  .hb-wh10-tab + .hb-wh10-tab { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wh10-caret, .hb-wh10-state i { animation: none; }
  .hb-wh10-scroll, .hb-wh10-out, .hb-wh10-map i { transition: none; }
}
`;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function inOut(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = Math.imul(x ^ (x >>> 15), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  return (x ^ (x >>> 16)) >>> 0;
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
  const back = d * 0.25;
  const hold = 2200;
  const t = ms % (d + hold + back + 600);
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

interface Token {
  text: string;
  kind: string;
  start: number;
}

const KEYWORDS = new Set([
  "import", "from", "const", "let", "var", "async", "await", "return", "export", "default", "function",
  "new", "if", "else", "true", "false", "null", "undefined", "for", "of", "in", "type", "interface",
]);

const TOKEN = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*)|(\s+)|([^\s])/g;

function tokenize(code: string) {
  const lines: { tokens: Token[]; start: number; length: number }[] = [];
  let offset = 0;
  for (const line of code.split("\n")) {
    const tokens: Token[] = [];
    TOKEN.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = TOKEN.exec(line))) {
      const text = m[0];
      let kind = "pu";
      if (m[1]) kind = "str";
      else if (m[2]) kind = "num";
      else if (m[3]) {
        const before = line[m.index - 1];
        const after = line.slice(m.index + text.length).trimStart()[0];
        if (KEYWORDS.has(text)) kind = "kw";
        else if (after === "(") kind = "fn";
        else if (before === ".") kind = "prop";
        else kind = "id";
      } else if (m[4]) kind = "ws";
      tokens.push({ text, kind, start: offset + m.index });
    }
    lines.push({ tokens, start: offset, length: line.length });
    offset += line.length + 1;
  }
  return lines;
}

function timeline(code: string) {
  const cum: number[] = [];
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    const h = (hash(i) % 1000) / 1000;
    const w = ch === "\n" ? 6 : ch === " " ? 0.7 : 0.55 + h * 0.9;
    sum += w;
    cum.push(sum);
  }
  return { cum, sum };
}

function typedAt(t: { cum: number[]; sum: number }, x: number) {
  const target = x * t.sum;
  let lo = 0;
  let hi = t.cum.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (t.cum[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function MotionCodeReveal({
  code = defaultCode,
  filename = "server.ts",
  tabs = ["db.ts"],
  output = defaultOutput,
  accent = "#2f7bff",
  progress,
  autoPlay = false,
  duration = 7,
  length = 3,
  height = "100vh",
  className,
  style,
  ...rest
}: MotionCodeRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const codeRef = React.useRef<HTMLDivElement>(null);
  const [p, setP] = React.useState(typeof progress === "number" ? clamp01(progress) : 0);
  const [rows, setRows] = React.useState(12);
  const pinned = progress === undefined && !autoPlay;
  const lines = React.useMemo(() => tokenize(code), [code]);
  const time = React.useMemo(() => timeline(code), [code]);

  React.useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
      const r = Math.max(3, Math.floor((el.clientHeight - lh * 0.8) / lh));
      setRows((old) => (old === r ? old : r));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useProgress(
    ref,
    (v) => {
      const q = Math.round(v * 1500) / 1500;
      setP((old) => (old === q ? old : q));
    },
    progress,
    autoPlay,
    duration,
  );

  const typeEnd = output.length ? 0.74 : 0.96;
  const n = typedAt(time, clamp01(p / typeEnd));
  const done = n >= code.length;
  let curLine = 0;
  for (let i = 0; i < lines.length; i++) if (lines[i].start <= n) curLine = i;
  const term = output.length ? inOut(clamp01((p - typeEnd - 0.02) / 0.08)) : 0;
  const visibleRows = term > 0.5 ? Math.max(2, rows - output.length - 1) : rows;
  const shift = Math.max(0, Math.min(curLine - visibleRows + 2, lines.length - visibleRows));
  const outOn = output.map((_, i) => p >= typeEnd + 0.1 + i * ((0.98 - typeEnd - 0.1) / Math.max(1, output.length)));
  const status = !done ? "type" : outOn[outOn.length - 1] || !output.length ? "ready" : "run";

  return (
    <section
      ref={ref}
      className={["hb-wh10", className].filter(Boolean).join(" ")}
      data-pinned={pinned ? "true" : "false"}
      style={
        {
          "--hb-wh10-a": accent,
          "--hb-wh10-h": height,
          "--hb-wh10-len": length,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <style href="hb-motion-code-reveal" precedence="default">{css}</style>
      <div className="hb-wh10-stage">
        <div className="hb-wh10-win">
          <div className="hb-wh10-bar" aria-hidden="true">
            <span className="hb-wh10-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="hb-wh10-tab" data-on="true">
              {filename}
            </span>
            {tabs.map((t) => (
              <span className="hb-wh10-tab" key={t}>
                {t}
              </span>
            ))}
            <span className="hb-wh10-state" data-s={status}>
              <i />
              {status === "type" ? "Editing" : status === "run" ? "Running" : "Ready"}
            </span>
          </div>
          <div className="hb-wh10-body">
            <div className="hb-wh10-code" ref={codeRef}>
              <pre className="hb-wh10-sr">{code}</pre>
              <div
                className="hb-wh10-scroll"
                aria-hidden="true"
                style={{ transform: `translateY(${(-shift * 1.62).toFixed(2)}em)` }}
              >
                {lines.map((line, li) => {
                  const typed = n > line.start || (n === line.start && li === curLine);
                  const cur = li === curLine;
                  return (
                    <div key={li} className="hb-wh10-line" data-typed={typed ? "true" : "false"} data-cur={cur && !done ? "true" : "false"}>
                      <span className="hb-wh10-ln">{li + 1}</span>
                      <span>
                        {line.tokens.map((tk, ti) => {
                          if (tk.start >= n) return null;
                          const text = tk.start + tk.text.length > n ? tk.text.slice(0, n - tk.start) : tk.text;
                          return (
                            <span key={ti} className={tk.kind === "ws" ? undefined : `hb-wh10-${tk.kind}`}>
                              {text}
                            </span>
                          );
                        })}
                        {cur ? <span className="hb-wh10-caret" /> : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hb-wh10-map" aria-hidden="true">
              {lines.map((line, li) => {
                const typedChars = Math.max(0, Math.min(line.length, n - line.start));
                return (
                  <i
                    key={li}
                    data-cur={li === curLine && !done ? "true" : "false"}
                    style={{ width: `${Math.min(100, typedChars * 2.4).toFixed(0)}%` }}
                  />
                );
              })}
            </div>
            {output.length ? (
              <div className="hb-wh10-term" style={{ "--hb-wh10-t": term.toFixed(3) } as React.CSSProperties} aria-hidden={term < 0.5 ? "true" : undefined}>
                <div className="hb-wh10-term-h">
                  <span>Terminal</span>
                  <span>zsh</span>
                </div>
                {output.map((line, i) => (
                  <div key={i} className="hb-wh10-out" data-on={outOn[i] ? "true" : "false"}>
                    <b>{i === 0 ? ">" : "✓"}</b>
                    <span>{i === 0 ? line.replace(/^\$\s+/, "") : line}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
