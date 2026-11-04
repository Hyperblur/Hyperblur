"use client";

import * as React from "react";

export type BentoVisual = "bars" | "toggles" | "avatars" | "spark" | "none";
export type BentoSize = "sm" | "wide" | "tall" | "large";

export interface BentoPointerGlowItem {
  id: string;
  title: string;
  description?: string;
  caption?: string;
  visual?: BentoVisual | React.ReactNode;
  size?: BentoSize;
}

export interface BentoPointerGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: BentoPointerGlowItem[];
  accent?: string;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  glowSize?: number;
  idle?: boolean;
}

const defaultItems: BentoPointerGlowItem[] = [
  { id: "traffic", title: "Traffic", description: "Visits this week", caption: "Up 18% on the week before", visual: "bars", size: "wide" },
  { id: "team", title: "Team", description: "Online right now", caption: "Four teammates are editing", visual: "avatars", size: "tall" },
  { id: "alerts", title: "Alerts", description: "Notification rules", caption: "Three rules are switched on", visual: "toggles" },
  { id: "latency", title: "Latency", description: "p95 response time", caption: "Down to 112 ms today", visual: "spark" },
];

const avatarPeople = [
  { initials: "AO", color: "#2f7bff" },
  { initials: "BH", color: "#8b5cf6" },
  { initials: "CT", color: "#14b8a6" },
  { initials: "DS", color: "#f59e0b" },
];

const css = `
.hb-qv3 {
  --hb-qv3-acc: #2f7bff;
  --hb-qv3-gap: 10px;
  --hb-qv3-row: 132px;
  --hb-qv3-r: 18px;
  --hb-qv3-g: 220px;
  --hb-qv3-k: 0.7;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: var(--hb-qv3-row);
  gap: var(--hb-qv3-gap);
  box-sizing: border-box;
  width: 100%;
  font: inherit;
  color: #ededed;
}
.hb-qv3 *, .hb-qv3 *::before, .hb-qv3 *::after { box-sizing: border-box; }
.hb-qv3-t {
  --hb-qv3-mx: -400px;
  --hb-qv3-my: -400px;
  position: relative;
  min-width: 0;
  min-height: 0;
  border-radius: var(--hb-qv3-r);
  background: #111111;
  outline: none;
  isolation: isolate;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
}
.hb-qv3-t[data-size="wide"] { grid-column: span 2; }
.hb-qv3-t[data-size="tall"] { grid-row: span 2; }
.hb-qv3-t[data-size="large"] { grid-column: span 2; grid-row: span 2; }
.hb-qv3-t:hover, .hb-qv3-t:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 18px 30px -18px rgba(0, 0, 0, 0.9);
}
.hb-qv3-t:focus-visible { box-shadow: 0 0 0 2px #7fb3ff; }
.hb-qv3-bd {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  padding: 1px;
  pointer-events: none;
  background:
    radial-gradient(
      circle var(--hb-qv3-g) at var(--hb-qv3-mx) var(--hb-qv3-my),
      color-mix(in srgb, var(--hb-qv3-acc) 45%, #ffffff) 0%,
      color-mix(in srgb, var(--hb-qv3-acc) 70%, transparent) 38%,
      transparent 72%
    ),
    rgba(255, 255, 255, 0.08);
  opacity: 1;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.hb-qv3-sf {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: var(--hb-qv3-k);
  background: radial-gradient(
    circle calc(var(--hb-qv3-g) * 1.1) at var(--hb-qv3-mx) var(--hb-qv3-my),
    color-mix(in srgb, var(--hb-qv3-acc) 20%, transparent),
    transparent 70%
  );
  transition: opacity 0.3s ease;
}
.hb-qv3-t:hover .hb-qv3-sf, .hb-qv3-t:focus-visible .hb-qv3-sf { opacity: 1; }
.hb-qv3-in {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  padding: 10px 12px;
  overflow: hidden;
  border-radius: inherit;
}
.hb-qv3-ti {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #ededed;
}
.hb-qv3-vz {
  position: relative;
  display: flex;
  flex: 1;
  align-items: flex-end;
  min-height: 0;
  overflow: hidden;
}
.hb-qv3-sw {
  display: grid;
  min-height: 15px;
  font-size: 11px;
  line-height: 15px;
}
.hb-qv3-sw > span {
  grid-area: 1 / 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-qv3-d { color: #8f8f8f; }
.hb-qv3-p { color: color-mix(in srgb, var(--hb-qv3-acc) 40%, #ffffff); opacity: 0; transform: translateY(8px); }
.hb-qv3-t:hover .hb-qv3-d, .hb-qv3-t:focus-visible .hb-qv3-d { opacity: 0; transform: translateY(-8px); }
.hb-qv3-t:hover .hb-qv3-p, .hb-qv3-t:focus-visible .hb-qv3-p { opacity: 1; transform: translateY(0); }
.hb-qv3-bars { display: flex; align-items: flex-end; gap: 4px; width: 100%; height: 100%; }
.hb-qv3-bar {
  flex: 1;
  min-width: 0;
  height: var(--hb-qv3-h);
  border-radius: 3px 3px 1px 1px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-qv3-acc) 80%, #ffffff), color-mix(in srgb, var(--hb-qv3-acc) 30%, transparent));
  transform-origin: bottom;
  animation: hb-qv3-rise 2.6s ease-in-out infinite;
  animation-delay: var(--hb-qv3-dl);
}
.hb-qv3-tgs { display: flex; align-items: flex-end; gap: 8px; width: 100%; }
.hb-qv3-tg {
  position: relative;
  width: 24px;
  height: 14px;
  border-radius: 999px;
  background: #2a2a2a;
  animation: hb-qv3-trk 4.2s ease-in-out infinite;
  animation-delay: var(--hb-qv3-dl);
}
.hb-qv3-tg::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  animation: hb-qv3-knob 4.2s cubic-bezier(0.4, 1.4, 0.5, 1) infinite;
  animation-delay: var(--hb-qv3-dl);
}
.hb-qv3-av { display: flex; align-items: center; width: 100%; padding-left: 8px; }
.hb-qv3-a {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  margin-left: -8px;
  border: 2px solid #111111;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;
  color: #ffffff;
  background: var(--hb-qv3-c);
  animation: hb-qv3-bob 3s ease-in-out infinite;
  animation-delay: var(--hb-qv3-dl);
}
.hb-qv3-sp { width: 100%; height: 100%; animation: hb-qv3-draw 4.4s ease-in-out infinite; }
.hb-qv3-sl {
  fill: none;
  stroke: color-mix(in srgb, var(--hb-qv3-acc) 70%, #ffffff);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qv3-sa { fill: color-mix(in srgb, var(--hb-qv3-acc) 22%, transparent); stroke: none; }
@keyframes hb-qv3-rise {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.62); }
}
@keyframes hb-qv3-trk {
  0%, 30% { background: #2a2a2a; }
  40%, 80% { background: var(--hb-qv3-acc); }
  90%, 100% { background: #2a2a2a; }
}
@keyframes hb-qv3-knob {
  0%, 30% { transform: translateX(0); }
  40%, 80% { transform: translateX(10px); }
  90%, 100% { transform: translateX(0); }
}
@keyframes hb-qv3-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes hb-qv3-draw {
  0% { clip-path: inset(0 100% 0 0); }
  50%, 82% { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 0 0 100%); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-qv3-t, .hb-qv3-sf, .hb-qv3-sw > span { transition: none; }
  .hb-qv3-bar, .hb-qv3-tg, .hb-qv3-tg::after, .hb-qv3-a, .hb-qv3-sp { animation: none; }
  .hb-qv3-t:hover, .hb-qv3-t:focus-visible { transform: none; }
}
`;

function hashAt(i: number, mod: number) {
  return (Math.imul(i + 7, 2654435761) >>> 0) % mod;
}

function Bars() {
  return (
    <div className="hb-qv3-bars" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="hb-qv3-bar"
          style={{ "--hb-qv3-h": `${30 + hashAt(i, 66)}%`, "--hb-qv3-dl": `${(-i * 0.19).toFixed(2)}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function Toggles() {
  return (
    <div className="hb-qv3-tgs" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="hb-qv3-tg" style={{ "--hb-qv3-dl": `${(-i * 1.1).toFixed(2)}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}

function Avatars() {
  return (
    <div className="hb-qv3-av" aria-hidden="true">
      {avatarPeople.map((p, i) => (
        <span
          key={p.initials}
          className="hb-qv3-a"
          style={{ "--hb-qv3-c": p.color, "--hb-qv3-dl": `${(-i * 0.5).toFixed(2)}s` } as React.CSSProperties}
        >
          {p.initials}
        </span>
      ))}
    </div>
  );
}

function Spark() {
  return (
    <svg className="hb-qv3-sp" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path className="hb-qv3-sa" d="M0 22 L14 18 L28 24 L42 12 L56 16 L70 7 L84 11 L100 3 L100 30 L0 30 Z" />
      <path
        className="hb-qv3-sl"
        vectorEffect="non-scaling-stroke"
        d="M0 22 L14 18 L28 24 L42 12 L56 16 L70 7 L84 11 L100 3"
      />
    </svg>
  );
}

function renderVisual(visual: BentoPointerGlowItem["visual"]) {
  if (visual === "bars") return <Bars />;
  if (visual === "toggles") return <Toggles />;
  if (visual === "avatars") return <Avatars />;
  if (visual === "spark") return <Spark />;
  if (visual === "none" || visual === undefined || visual === null) return null;
  return visual;
}

export function BentoPointerGlow({
  items = defaultItems,
  accent = "#2f7bff",
  rowHeight = 132,
  gap = 10,
  radius = 18,
  glowSize = 220,
  idle = true,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: BentoPointerGlowProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const wake = React.useRef<(() => void) | null>(null);
  const sim = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, k: 0.7, active: false, visible: true, running: false, raf: 0, seeded: false });

  React.useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const s = sim.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function write() {
      if (!grid) return;
      const tiles = grid.children;
      for (let n = 0; n < tiles.length; n++) {
        const tile = tiles[n] as HTMLElement;
        tile.style.setProperty("--hb-qv3-mx", `${(s.x - tile.offsetLeft).toFixed(1)}px`);
        tile.style.setProperty("--hb-qv3-my", `${(s.y - tile.offsetTop).toFixed(1)}px`);
      }
      grid.style.setProperty("--hb-qv3-k", s.k.toFixed(3));
    }

    function tick(ts: number) {
      s.running = false;
      if (!s.visible || !grid) return;
      const w = grid.clientWidth;
      const h = grid.clientHeight;
      if (!s.active && idle) {
        const t = ts / 1000;
        s.tx = w * (0.5 + 0.42 * Math.sin(t * 0.55));
        s.ty = h * (0.5 + 0.36 * Math.sin(t * 0.83 + 1.2));
      }
      if (!s.seeded) {
        s.x = s.tx;
        s.y = s.ty;
        s.seeded = true;
      }
      s.x += (s.tx - s.x) * 0.12;
      s.y += (s.ty - s.y) * 0.12;
      s.k += ((s.active ? 1 : 0.7) - s.k) * 0.1;
      write();
      const moving = Math.abs(s.tx - s.x) > 0.3 || Math.abs(s.ty - s.y) > 0.3;
      if (idle || s.active || moving) {
        s.running = true;
        s.raf = requestAnimationFrame(tick);
      }
    }

    function ensure() {
      if (reduced) {
        s.x = s.tx;
        s.y = s.ty;
        write();
        return;
      }
      if (s.running || !s.visible) return;
      s.running = true;
      s.raf = requestAnimationFrame(tick);
    }

    wake.current = ensure;
    if (reduced) {
      s.tx = grid.clientWidth * 0.5;
      s.ty = grid.clientHeight * 0.4;
    }
    ensure();

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
      if (s.visible) ensure();
    });
    io.observe(grid);

    return () => {
      wake.current = null;
      io.disconnect();
      cancelAnimationFrame(s.raf);
      s.running = false;
    };
  }, [idle, items.length]);

  function aim(e: React.PointerEvent<HTMLDivElement>) {
    const grid = ref.current;
    if (!grid) return;
    const r = grid.getBoundingClientRect();
    const s = sim.current;
    s.active = true;
    s.tx = e.clientX - r.left;
    s.ty = e.clientY - r.top;
    wake.current?.();
  }

  const vars = {
    "--hb-qv3-acc": accent,
    "--hb-qv3-row": `${rowHeight}px`,
    "--hb-qv3-gap": `${gap}px`,
    "--hb-qv3-r": `${radius}px`,
    "--hb-qv3-g": `${glowSize}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <>
      <style href="hb-bento-pointer-glow" precedence="default">{css}</style>
      <div
        ref={ref}
        className={`hb-qv3 ${className}`}
        style={vars}
        onPointerMove={(e) => {
          onPointerMove?.(e);
          aim(e);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          sim.current.active = false;
          wake.current?.();
        }}
        {...rest}
      >
        {items.map((item) => (
          <div key={item.id} className="hb-qv3-t" data-size={item.size ?? "sm"} tabIndex={0}>
            <span className="hb-qv3-sf" aria-hidden="true" />
            <span className="hb-qv3-bd" aria-hidden="true" />
            <div className="hb-qv3-in">
              <h3 className="hb-qv3-ti">{item.title}</h3>
              <div className="hb-qv3-vz">{renderVisual(item.visual)}</div>
              <div className="hb-qv3-sw">
                <span className="hb-qv3-d">{item.description}</span>
                <span className="hb-qv3-p">{item.caption ?? item.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
