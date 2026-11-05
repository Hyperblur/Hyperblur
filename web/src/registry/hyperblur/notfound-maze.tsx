"use client";

import * as React from "react";

export interface NotfoundMazeLink {
  label: string;
  href: string;
}

export interface NotfoundMazeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  code?: string;
  title?: string;
  subtitle?: string;
  hint?: string;
  primary?: NotfoundMazeLink;
  secondary?: NotfoundMazeLink;
  cols?: number;
  rows?: number;
  speed?: number;
  accent?: string;
  onExitReached?: () => void;
}

type Cell = { x: number; y: number };

function hash(n: number) {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

function buildWalls(cols: number, rows: number, start: Cell, exit: Cell) {
  const walls: boolean[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pillar = x % 2 === 1 && y % 2 === 1;
      const extra = hash(y * 131 + x * 17 + 7) % 100 < 13;
      const keep = (x === start.x && y === start.y) || (x === exit.x && y === exit.y);
      walls.push(!keep && (pillar || extra));
    }
  }
  return walls;
}

function nextStep(from: Cell, target: Cell, cols: number, rows: number, walls: boolean[]): Cell {
  const total = cols * rows;
  const prev = new Int32Array(total).fill(-1);
  const seen = new Uint8Array(total);
  const startIdx = from.y * cols + from.x;
  const queue = [startIdx];
  seen[startIdx] = 1;
  let best = startIdx;
  let bestScore = Math.abs(from.x - target.x) + Math.abs(from.y - target.y);
  for (let q = 0; q < queue.length; q++) {
    const idx = queue[q];
    const x = idx % cols;
    const y = (idx - x) / cols;
    const score = Math.abs(x - target.x) + Math.abs(y - target.y);
    if (score < bestScore) {
      bestScore = score;
      best = idx;
    }
    const around = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of around) {
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      const n = ny * cols + nx;
      if (seen[n] || walls[n]) continue;
      seen[n] = 1;
      prev[n] = idx;
      queue.push(n);
    }
  }
  if (best === startIdx) return from;
  let cur = best;
  while (prev[cur] !== startIdx && prev[cur] !== -1) cur = prev[cur];
  return { x: cur % cols, y: Math.floor(cur / cols) };
}

const css = `
.hb-yj1 {
  --hb-yj1-accent: #34d399;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj1 *, .hb-yj1 *::before, .hb-yj1 *::after { box-sizing: border-box; }
.hb-yj1::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(50% 70% at 78% 40%, color-mix(in srgb, var(--hb-yj1-accent) 13%, transparent), transparent 70%),
    radial-gradient(40% 50% at 10% 100%, rgba(255, 255, 255, .04), transparent 70%);
  pointer-events: none;
}
.hb-yj1-inner {
  display: grid;
  gap: 44px;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 20px;
}
@container (min-width: 760px) {
  .hb-yj1-inner { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 56px; padding: 104px 32px; }
}
.hb-yj1-code {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 8px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #a1a1a1;
  font: 500 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .04em;
}
.hb-yj1-code b {
  padding: 4px 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-yj1-accent) 18%, transparent);
  color: var(--hb-yj1-accent);
  font-weight: 600;
}
.hb-yj1-title {
  margin: 22px 0 0;
  font-size: clamp(34px, 6.4cqw, 58px);
  line-height: 1.02;
  letter-spacing: -.035em;
  font-weight: 650;
  text-wrap: balance;
}
.hb-yj1-sub {
  margin: 18px 0 0;
  max-width: 440px;
  color: #8f8f8f;
  font-size: 16px;
  line-height: 1.6;
}
.hb-yj1-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
.hb-yj1-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, .1);
  color: #ededed;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}
.hb-yj1-btn:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .18); }
.hb-yj1-btn:focus-visible, .hb-yj1-board:focus-visible { outline: 2px solid var(--hb-yj1-accent); outline-offset: 3px; }
.hb-yj1-btn-primary { background: #ededed; color: #0a0a0a; border-color: #ededed; }
.hb-yj1-btn-primary:hover { background: #fff; transform: translateY(-1px); }
.hb-yj1-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  color: #6b6b6b;
  font-size: 13px;
}
.hb-yj1-key {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-bottom-width: 2px;
  border-radius: 6px;
  color: #a1a1a1;
  font: 500 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}
.hb-yj1-frame {
  position: relative;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22px;
  background: linear-gradient(180deg, #131313, #0d0d0d);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 30px 80px -30px rgba(0, 0, 0, .8);
}
.hb-yj1-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 12px;
  color: #6b6b6b;
  font: 500 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.hb-yj1-live { display: inline-flex; align-items: center; gap: 7px; color: var(--hb-yj1-accent); }
.hb-yj1-live::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 10px currentColor;
  animation: hb-yj1-blink 1.6s ease-in-out infinite;
}
.hb-yj1-board {
  position: relative;
  display: grid;
  gap: 3px;
  padding: 3px;
  border-radius: 12px;
  background: #0a0a0a;
  touch-action: none;
  cursor: crosshair;
}
.hb-yj1-cell {
  aspect-ratio: 1;
  border-radius: 4px;
  background: rgba(255, 255, 255, .025);
}
.hb-yj1-wall {
  background: linear-gradient(180deg, #262626, #1b1b1b);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
}
.hb-yj1-crumb { background: color-mix(in srgb, var(--hb-yj1-accent) 16%, transparent); transition: background .6s ease; }
.hb-yj1-exit {
  position: relative;
  background: color-mix(in srgb, var(--hb-yj1-accent) 22%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-yj1-accent) 60%, transparent);
}
.hb-yj1-exit::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 7px;
  border: 1px solid var(--hb-yj1-accent);
  animation: hb-yj1-ping 2s ease-out infinite;
}
.hb-yj1-target {
  position: absolute;
  border: 1.5px dashed color-mix(in srgb, var(--hb-yj1-accent) 70%, transparent);
  border-radius: 5px;
  pointer-events: none;
  transition: left .25s ease, top .25s ease, opacity .25s ease;
}
.hb-yj1-hero {
  position: absolute;
  display: grid;
  place-items: center;
  pointer-events: none;
  transition: left .17s linear, top .17s linear;
}
.hb-yj1-hero svg {
  width: 74%;
  height: 74%;
  overflow: visible;
  animation: hb-yj1-bob .34s steps(2) infinite;
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--hb-yj1-accent) 55%, transparent));
}
.hb-yj1-flip { transform: scaleX(-1); }
.hb-yj1-found {
  position: absolute;
  left: 50%;
  bottom: 14px;
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--hb-yj1-accent);
  color: #04120c;
  font-size: 12px;
  font-weight: 600;
  transform: translate(-50%, 0);
  animation: hb-yj1-pop .4s cubic-bezier(.2, .9, .3, 1.3);
  pointer-events: none;
}
.hb-yj1-legend {
  display: flex;
  gap: 16px;
  padding: 12px 4px 0;
  color: #6b6b6b;
  font-size: 12px;
}
.hb-yj1-legend span { display: inline-flex; align-items: center; gap: 6px; }
.hb-yj1-legend i { width: 10px; height: 10px; border-radius: 3px; }
@keyframes hb-yj1-bob { 0% { transform: translateY(0); } 100% { transform: translateY(-8%); } }
@keyframes hb-yj1-ping { 0% { opacity: .9; transform: scale(.9); } 100% { opacity: 0; transform: scale(1.5); } }
@keyframes hb-yj1-blink { 50% { opacity: .35; } }
@keyframes hb-yj1-pop { from { opacity: 0; transform: translate(-50%, 8px) scale(.9); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yj1 *, .hb-yj1 *::before, .hb-yj1 *::after { animation: none !important; transition: none !important; }
}
`;

const waypointsFor = (cols: number, rows: number): Cell[] => [
  { x: cols - 1, y: 0 },
  { x: Math.floor(cols / 2), y: rows - 1 },
  { x: 0, y: 0 },
  { x: cols - 1, y: rows - 1 },
  { x: Math.floor(cols / 2), y: Math.floor(rows / 2) },
];

export function NotfoundMaze({
  code = "404",
  title = "You wandered off the map",
  subtitle = "This page moved, or it never existed. Our little explorer is looking for it too. Point anywhere on the grid to guide the search.",
  hint = "Move the pointer, or use the arrow keys",
  primary = { label: "Take me home", href: "/" },
  secondary = { label: "Browse the docs", href: "/docs" },
  cols = 15,
  rows = 9,
  speed = 1,
  accent = "#34d399",
  onExitReached,
  className,
  style,
  ...rest
}: NotfoundMazeProps) {
  const c = Math.max(5, Math.round(cols));
  const r = Math.max(5, Math.round(rows));
  const start = React.useMemo<Cell>(() => ({ x: 0, y: Math.floor(r / 2) }), [r]);
  const exit = React.useMemo<Cell>(() => ({ x: c - 1, y: r - 1 }), [c, r]);
  const walls = React.useMemo(() => buildWalls(c, r, start, exit), [c, r, start, exit]);
  const [pos, setPos] = React.useState<Cell>(start);
  const [trail, setTrail] = React.useState<Cell[]>([]);
  const [target, setTarget] = React.useState<Cell>(() => waypointsFor(c, r)[0]);
  const [manual, setManual] = React.useState(false);
  const [flip, setFlip] = React.useState(false);
  const [found, setFound] = React.useState(false);
  const boardRef = React.useRef<HTMLDivElement>(null);
  const state = React.useRef({ pos: start, target, manual: false, wp: 0, found: false });
  const exitCb = React.useRef(onExitReached);

  React.useEffect(() => {
    exitCb.current = onExitReached;
  }, [onExitReached]);

  React.useEffect(() => {
    state.current.target = target;
    state.current.manual = manual;
  }, [target, manual]);

  React.useEffect(() => {
    const wps = waypointsFor(c, r);
    const id = window.setInterval(() => {
      const s = state.current;
      if (!s.manual && s.pos.x === s.target.x && s.pos.y === s.target.y) {
        s.wp = (s.wp + 1) % wps.length;
        s.target = wps[s.wp];
        setTarget(s.target);
      }
      const next = nextStep(s.pos, s.target, c, r, walls);
      if (next.x === s.pos.x && next.y === s.pos.y) {
        if (!s.manual) {
          s.wp = (s.wp + 1) % wps.length;
          s.target = wps[s.wp];
          setTarget(s.target);
        }
        return;
      }
      if (next.x !== s.pos.x) setFlip(next.x < s.pos.x);
      const prevPos = s.pos;
      s.pos = next;
      setPos(next);
      setTrail((t) => [prevPos, ...t].slice(0, 7));
      const atExit = next.x === exit.x && next.y === exit.y;
      if (atExit && !s.found) {
        s.found = true;
        setFound(true);
        exitCb.current?.();
      } else if (!atExit && s.found) {
        s.found = false;
        setFound(false);
      }
    }, Math.round(170 / Math.max(0.2, speed)));
    return () => window.clearInterval(id);
  }, [c, r, walls, exit, speed]);

  const cellFromPointer = (e: React.PointerEvent<HTMLDivElement>): Cell | null => {
    const el = boardRef.current;
    if (!el) return null;
    const box = el.getBoundingClientRect();
    const x = Math.floor(((e.clientX - box.left) / box.width) * c);
    const y = Math.floor(((e.clientY - box.top) / box.height) * r);
    return { x: Math.min(c - 1, Math.max(0, x)), y: Math.min(r - 1, Math.max(0, y)) };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const cell = cellFromPointer(e);
    if (!cell) return;
    setManual(true);
    setTarget((t) => (t.x === cell.x && t.y === cell.y ? t : cell));
  };

  const onPointerLeave = () => setManual(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, [number, number]> = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const m = moves[e.key];
    if (e.key === "Escape") {
      setManual(false);
      return;
    }
    if (!m) return;
    e.preventDefault();
    setManual(true);
    setTarget((t) => ({ x: Math.min(c - 1, Math.max(0, t.x + m[0])), y: Math.min(r - 1, Math.max(0, t.y + m[1])) }));
  };

  const pad = 3;
  const cellW = `((100% - ${pad * 2}px - ${(c - 1) * 3}px) / ${c})`;
  const cellH = `((100% - ${pad * 2}px - ${(r - 1) * 3}px) / ${r})`;
  const place = (cell: Cell) => ({
    left: `calc(${pad}px + ${cell.x} * (${cellW} + 3px))`,
    top: `calc(${pad}px + ${cell.y} * (${cellH} + 3px))`,
    width: `calc(${cellW})`,
    height: `calc(${cellH})`,
  });
  const crumbSet = new Set(trail.map((t) => t.y * c + t.x));

  return (
    <section
      className={["hb-yj1", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-notfound-maze" precedence="default">{css}</style>
      <div className="hb-yj1-inner">
        <div>
          <span className="hb-yj1-code">
            <b>{code}</b>
            Page not found
          </span>
          <h1 className="hb-yj1-title">{title}</h1>
          <p className="hb-yj1-sub">{subtitle}</p>
          <div className="hb-yj1-actions">
            <a className="hb-yj1-btn hb-yj1-btn-primary" href={primary.href}>
              {primary.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="hb-yj1-btn" href={secondary.href}>
              {secondary.label}
            </a>
          </div>
          <div className="hb-yj1-hint">
            <span className="hb-yj1-key">←</span>
            <span className="hb-yj1-key">→</span>
            {hint}
          </div>
        </div>
        <div className="hb-yj1-frame">
          <div className="hb-yj1-bar">
            <span>Sector {code}</span>
            <span className="hb-yj1-live">{manual ? "Following you" : "Searching"}</span>
          </div>
          <div
            ref={boardRef}
            className="hb-yj1-board"
            style={{ gridTemplateColumns: `repeat(${c}, minmax(0, 1fr))` }}
            role="application"
            tabIndex={0}
            aria-label="Maze. Use the arrow keys to move the target the explorer walks toward."
            onPointerMove={onPointerMove}
            onPointerDown={onPointerMove}
            onPointerLeave={onPointerLeave}
            onBlur={onPointerLeave}
            onKeyDown={onKeyDown}
          >
            {walls.map((w, i) => {
              const isExit = i === exit.y * c + exit.x;
              const cls = w ? "hb-yj1-cell hb-yj1-wall" : isExit ? "hb-yj1-cell hb-yj1-exit" : crumbSet.has(i) ? "hb-yj1-cell hb-yj1-crumb" : "hb-yj1-cell";
              return <div key={i} className={cls} />;
            })}
            <div className="hb-yj1-target" style={{ ...place(target), opacity: manual ? 1 : 0.45 }} />
            <div className={flip ? "hb-yj1-hero hb-yj1-flip" : "hb-yj1-hero"} style={place(pos)}>
              <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
                <rect x="2" y="0" width="4" height="1" fill="var(--hb-yj1-accent)" />
                <rect x="1" y="1" width="6" height="3" fill="var(--hb-yj1-accent)" />
                <rect x="4" y="2" width="1" height="1" fill="#04120c" />
                <rect x="6" y="2" width="1" height="1" fill="#04120c" />
                <rect x="2" y="4" width="4" height="2" fill="#ededed" />
                <rect x="1" y="4" width="1" height="1" fill="#ededed" />
                <rect x="6" y="4" width="1" height="1" fill="#ededed" />
                <rect x="2" y="6" width="1" height="2" fill="#ededed" />
                <rect x="5" y="6" width="1" height="2" fill="#ededed" />
              </svg>
            </div>
            {found ? <div className="hb-yj1-found">Exit found. Still no page here.</div> : null}
          </div>
          <div className="hb-yj1-legend">
            <span>
              <i style={{ background: "#262626" }} />
              Walls
            </span>
            <span>
              <i style={{ background: "color-mix(in srgb, var(--hb-yj1-accent) 30%, transparent)" }} />
              Exit
            </span>
            <span>
              <i style={{ border: "1.5px dashed var(--hb-yj1-accent)" }} />
              Target
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
