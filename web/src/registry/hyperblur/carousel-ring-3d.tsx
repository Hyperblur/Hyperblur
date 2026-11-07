"use client";

import * as React from "react";

export interface CarouselRing3dItem {
  id: string;
  title: string;
  kicker?: string;
  text?: string;
  tag?: string;
}

export interface CarouselRing3dProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: CarouselRing3dItem[];
  index?: number;
  defaultIndex?: number;
  onActiveChange?: (index: number, item: CarouselRing3dItem) => void;
  autoplay?: number;
  height?: number;
  spread?: number;
  accent?: string;
  label?: string;
  showControls?: boolean;
}

const defaultItems: CarouselRing3dItem[] = [
  { id: "ion-drift", kicker: "EXP 014", title: "Ion Drift", text: "Charged particles bending around the cursor in a slow magnetic field.", tag: "WEBGL" },
  { id: "parallax-atlas", kicker: "EXP 021", title: "Parallax Atlas", text: "A folded paper map that opens in layered depth as you scroll.", tag: "CSS 3D" },
  { id: "signal-garden", kicker: "EXP 027", title: "Signal Garden", text: "Audio-reactive stems that sway with the room microphone.", tag: "AUDIO" },
  { id: "night-grid", kicker: "EXP 033", title: "Night Grid", text: "An endless synth horizon drawn with a single fragment shader.", tag: "SHADER" },
  { id: "orbital-type", kicker: "EXP 038", title: "Orbital Type", text: "Letters circling a baseline that tilts with device motion.", tag: "TYPE" },
  { id: "pulse-lattice", kicker: "EXP 042", title: "Pulse Lattice", text: "A spring mesh that ripples outward from every click.", tag: "PHYSICS" },
  { id: "echo-room", kicker: "EXP 047", title: "Echo Room", text: "Footsteps rendered as fading rings across a dark floor plan.", tag: "CANVAS" },
];

const css = `
.hb-ua1 {
  --hb-ua1-accent: #ff4d4d;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: inherit;
  color: #ededed;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
}
.hb-ua1 *, .hb-ua1 *::before, .hb-ua1 *::after { box-sizing: border-box; }
.hb-ua1:focus-visible .hb-ua1-stage { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-ua1-accent) 60%, transparent); }
.hb-ua1-stage {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  container-type: inline-size;
  perspective: calc(var(--hb-ua1-h) * 3.4);
  perspective-origin: 50% 8%;
  touch-action: pan-y;
  cursor: grab;
  border-radius: 6px;
  background:
    radial-gradient(60% 46% at 50% 92%, color-mix(in srgb, var(--hb-ua1-accent) 12%, transparent), transparent 70%),
    radial-gradient(circle, rgba(255,255,255,.07) 1px, transparent 1.2px) 0 0 / 14px 14px;
}
.hb-ua1-stage[data-drag="true"] { cursor: grabbing; }
.hb-ua1-world {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}
.hb-ua1-floor {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--hb-ua1-sp) * 200cqw);
  aspect-ratio: 1;
  transform: translate(-50%, -50%) translateY(calc(var(--hb-ua1-h) * .35)) translateZ(calc(var(--hb-ua1-sp) * -100cqw)) rotateX(90deg);
  pointer-events: none;
}
.hb-ua1-floor svg { display: block; width: 100%; height: 100%; overflow: visible; }
.hb-ua1-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(calc(var(--hb-ua1-h) * .52), 38cqw);
  height: calc(var(--hb-ua1-h) * .7);
  margin-top: calc(var(--hb-ua1-h) * -.02);
  container-type: inline-size;
  font-size: clamp(8px, calc(var(--hb-ua1-h) * .043), 14px);
  transform:
    translate(-50%, -50%)
    translate3d(calc(var(--hb-ua1-x, 0) * var(--hb-ua1-sp) * 100cqw), 0, calc(var(--hb-ua1-z, 0) * var(--hb-ua1-sp) * 100cqw))
    rotateY(calc(var(--hb-ua1-r, 0) * 1deg));
  opacity: var(--hb-ua1-o, 1);
  backface-visibility: hidden;
  will-change: transform, opacity;
  cursor: pointer;
}
.hb-ua1-face {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 4px;
  background: linear-gradient(180deg, #151515 0%, #0d0d0d 100%);
  box-shadow: 0 18px 40px -18px rgba(0,0,0,.9);
  transition: border-color .35s ease, box-shadow .35s ease;
}
.hb-ua1-card[data-active="true"] .hb-ua1-face {
  border-color: color-mix(in srgb, var(--hb-ua1-accent) 55%, rgba(255,255,255,.12));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--hb-ua1-accent) 18%, transparent), 0 0 28px -6px color-mix(in srgb, var(--hb-ua1-accent) 45%, transparent), 0 22px 44px -18px rgba(0,0,0,.95);
}
.hb-ua1-k {
  position: absolute;
  width: 9px;
  height: 9px;
  border-color: rgba(255,255,255,.55);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  z-index: 2;
  transition: border-color .35s ease, transform .35s ease;
}
.hb-ua1-k-tl { left: 4px; top: 4px; border-left-width: 1px; border-top-width: 1px; }
.hb-ua1-k-tr { right: 4px; top: 4px; border-right-width: 1px; border-top-width: 1px; }
.hb-ua1-k-bl { left: 4px; bottom: 4px; border-left-width: 1px; border-bottom-width: 1px; }
.hb-ua1-k-br { right: 4px; bottom: 4px; border-right-width: 1px; border-bottom-width: 1px; }
.hb-ua1-card[data-active="true"] .hb-ua1-k { border-color: var(--hb-ua1-accent); }
.hb-ua1-art {
  position: relative;
  flex: 0 0 46%;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: radial-gradient(80% 90% at 50% 100%, color-mix(in srgb, var(--hb-ua1-accent) 16%, transparent), transparent 70%), #0b0b0b;
}
.hb-ua1-art svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-ua1-body {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  flex-direction: column;
  gap: .35em;
  padding: .8em .9em .85em;
}
.hb-ua1-meta {
  display: flex;
  justify-content: space-between;
  gap: .5em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .68em;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #8f8f8f;
  white-space: nowrap;
}
.hb-ua1-card[data-active="true"] .hb-ua1-meta span:last-child { color: var(--hb-ua1-accent); }
.hb-ua1-title {
  margin: 0;
  font-size: 1.18em;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-ua1-text {
  margin: 0;
  font-size: .82em;
  line-height: 1.4;
  color: #a1a1a1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hb-ua1-tag {
  align-self: flex-start;
  margin-top: auto;
  padding: .28em .55em;
  border: 1px solid rgba(255,255,255,.14);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .62em;
  letter-spacing: .14em;
  color: #cfcfcf;
  text-transform: uppercase;
}
.hb-ua1-card[data-active="true"] .hb-ua1-tag { border-color: color-mix(in srgb, var(--hb-ua1-accent) 60%, transparent); color: #fff; }
@container (max-width: 118px) {
  .hb-ua1-text { display: none; }
  .hb-ua1-body { gap: .3em; padding: .65em .7em .7em; }
}
.hb-ua1-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 30px;
  flex: 0 0 30px;
  padding: 0 2px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-ua1-btn {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 2px;
  background: rgba(255,255,255,.025);
  color: #ededed;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease, transform .12s ease;
}
.hb-ua1-btn:hover { border-color: color-mix(in srgb, var(--hb-ua1-accent) 70%, transparent); background: color-mix(in srgb, var(--hb-ua1-accent) 10%, transparent); }
.hb-ua1-btn:active { transform: scale(.94); }
.hb-ua1-btn:focus-visible { outline: 1px solid var(--hb-ua1-accent); outline-offset: 2px; }
.hb-ua1-btn svg { width: 12px; height: 12px; }
.hb-ua1-mid {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.hb-ua1-count { color: #ededed; white-space: nowrap; }
.hb-ua1-count b { color: var(--hb-ua1-accent); font-weight: 500; }
.hb-ua1-dots { display: flex; gap: 4px; }
.hb-ua1-dot {
  width: 10px;
  height: 2px;
  background: rgba(255,255,255,.18);
  transition: background-color .3s ease, width .3s ease;
}
.hb-ua1-dot[data-on="true"] { width: 18px; background: var(--hb-ua1-accent); }
.hb-ua1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@keyframes hb-ua1-spin { to { transform: rotate(360deg); } }
.hb-ua1-spin { transform-origin: 50% 50%; transform-box: fill-box; animation: hb-ua1-spin 60s linear infinite; }
@media (max-width: 420px) { .hb-ua1-dots { display: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-ua1-face, .hb-ua1-k, .hb-ua1-btn, .hb-ua1-dot { transition: none; }
  .hb-ua1-spin { animation: none; }
}
`;

function hash(n: number) {
  let x = (n + 1) * 2654435761;
  x = (x ^ (x >>> 15)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  return (x ^ (x >>> 13)) >>> 0;
}

function mod(i: number, n: number) {
  return ((i % n) + n) % n;
}

function wrap(d: number, n: number) {
  let x = mod(d, n);
  if (x > n / 2) x -= n;
  return x;
}

function pose(d: number, n: number) {
  const w = wrap(d, n);
  const theta = (w * Math.PI * 2) / n;
  const front = (Math.cos(theta) + 1) / 2;
  return {
    x: Math.sin(theta).toFixed(4),
    z: (Math.cos(theta) - 1).toFixed(4),
    r: ((theta * 180) / Math.PI * 0.58).toFixed(2),
    o: (0.22 + 0.78 * Math.pow(front, 1.6)).toFixed(3),
    zi: String(Math.round(front * 100)),
  };
}

function Art({ seed }: { seed: number }) {
  const h = hash(seed);
  const kind = h % 4;
  const shapes: React.ReactNode[] = [];
  if (kind === 0) {
    for (let i = 0; i < 6; i++) {
      const r = 6 + i * 6;
      shapes.push(<circle key={i} cx="50" cy="62" r={r} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth=".5" strokeDasharray={i % 2 ? "1 2" : undefined} />);
    }
    shapes.push(<circle key="a" cx={(30 + (h % 40)).toFixed(0)} cy="34" r="2" fill="var(--hb-ua1-accent)" />);
  } else if (kind === 1) {
    for (let i = 0; i < 7; i++) {
      const y = 12 + i * 6;
      const amp = 2 + ((h >>> (i * 3)) % 5);
      shapes.push(
        <path
          key={i}
          d={`M0 ${y} C 25 ${(y - amp).toFixed(1)}, 50 ${(y + amp).toFixed(1)}, 75 ${y} S 100 ${(y - amp).toFixed(1)}, 100 ${y}`}
          fill="none"
          stroke={i === 3 ? "var(--hb-ua1-accent)" : "rgba(255,255,255,.26)"}
          strokeWidth={i === 3 ? ".8" : ".5"}
        />,
      );
    }
  } else if (kind === 2) {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 11; c++) {
        const v = hash(seed * 97 + r * 11 + c) % 10;
        shapes.push(<circle key={`${r}-${c}`} cx={(8 + c * 8.4).toFixed(1)} cy={(12 + r * 9).toFixed(1)} r={v > 7 ? 1.4 : 0.7} fill={v === 9 ? "var(--hb-ua1-accent)" : "rgba(255,255,255,.32)"} />);
      }
    }
  } else {
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const len = 10 + (hash(seed + i) % 16);
      shapes.push(
        <line
          key={i}
          x1="50"
          y1="30"
          x2={(50 + Math.cos(a) * len).toFixed(2)}
          y2={(30 + Math.sin(a) * len * 0.8).toFixed(2)}
          stroke={i === 4 ? "var(--hb-ua1-accent)" : "rgba(255,255,255,.28)"}
          strokeWidth=".5"
        />,
      );
    }
    shapes.push(<circle key="c" cx="50" cy="30" r="3" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth=".5" />);
  }
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <line x1="0" y1="59.5" x2="100" y2="59.5" stroke="rgba(255,255,255,.1)" strokeWidth=".5" />
      {shapes}
    </svg>
  );
}

interface Engine {
  go: (delta: number) => void;
  goTo: (i: number) => void;
  down: (e: React.PointerEvent<HTMLDivElement>) => void;
  move: (e: React.PointerEvent<HTMLDivElement>) => void;
  up: (e: React.PointerEvent<HTMLDivElement>) => void;
  dragging: () => boolean;
  moved: () => boolean;
}

export function CarouselRing3d({
  items = defaultItems,
  index,
  defaultIndex = 0,
  onActiveChange,
  autoplay = 0,
  height = 340,
  spread = 0.36,
  accent = "#ff4d4d",
  label = "Experiments",
  showControls = true,
  className,
  style,
  onKeyDown,
  ...rest
}: CarouselRing3dProps) {
  const list = items.length ? items : defaultItems;
  const n = list.length;
  const [start] = React.useState(() => mod(index ?? defaultIndex, Math.max(1, n)));
  const [active, setActive] = React.useState(start);
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [drag, setDrag] = React.useState(false);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const engine = React.useRef<Engine | null>(null);
  const state = React.useRef({ rot: start, target: start, vel: 0, active: start });
  const listRef = React.useRef(list);
  const onActiveRef = React.useRef(onActiveChange);

  React.useEffect(() => {
    listRef.current = list;
    onActiveRef.current = onActiveChange;
  });

  React.useEffect(() => {
    const s = state.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let pointer: { id: number; x: number; rot: number; t: number; unit: number; moved: boolean } | null = null;
    let dragging = false;
    let moved = false;

    const apply = () => {
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const p = pose(i - s.rot, n);
        el.style.setProperty("--hb-ua1-x", p.x);
        el.style.setProperty("--hb-ua1-z", p.z);
        el.style.setProperty("--hb-ua1-r", p.r);
        el.style.setProperty("--hb-ua1-o", p.o);
        el.style.zIndex = p.zi;
      }
      const idx = mod(Math.round(s.rot), n);
      if (idx !== s.active) {
        s.active = idx;
        setActive(idx);
        onActiveRef.current?.(idx, listRef.current[idx]);
      }
    };

    const tick = (t: number) => {
      const dt = last ? Math.min(0.034, (t - last) / 1000) : 0.016;
      last = t;
      const k = 110;
      const c = 2 * Math.sqrt(k) * 0.9;
      const a = (s.target - s.rot) * k - s.vel * c;
      s.vel += a * dt;
      s.rot += s.vel * dt;
      if (Math.abs(s.target - s.rot) < 0.0005 && Math.abs(s.vel) < 0.003) {
        s.rot = s.target;
        s.vel = 0;
        apply();
        raf = 0;
        last = 0;
        return;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (reduced) {
        s.rot = s.target;
        s.vel = 0;
        apply();
        return;
      }
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    s.rot = Math.round(s.rot);
    s.target = s.rot;
    s.vel = 0;
    apply();

    engine.current = {
      go(delta) {
        if (dragging) return;
        s.target = Math.round(s.target) + delta;
        kick();
      },
      goTo(i) {
        if (dragging) return;
        const base = Math.round(s.target);
        const d = wrap(i - base, n);
        if (Math.abs(d) < 0.001 && Math.abs(s.rot - base) < 0.001) return;
        s.target = base + Math.round(d);
        kick();
      },
      down(e) {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        const w = stageRef.current?.clientWidth ?? 400;
        pointer = { id: e.pointerId, x: e.clientX, rot: s.rot, t: e.timeStamp, unit: Math.max(60, w * 0.34), moved: false };
        moved = false;
        s.vel = 0;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      move(e) {
        if (!pointer || pointer.id !== e.pointerId) return;
        const dx = e.clientX - pointer.x;
        if (!pointer.moved && Math.abs(dx) > 5) {
          pointer.moved = true;
          moved = true;
          dragging = true;
          setDrag(true);
          stageRef.current?.setPointerCapture(e.pointerId);
        }
        if (!pointer.moved) return;
        const next = pointer.rot - dx / pointer.unit;
        const dt = Math.max(1, e.timeStamp - pointer.t) / 1000;
        const v = (next - s.rot) / dt;
        s.vel = s.vel * 0.6 + v * 0.4;
        pointer.t = e.timeStamp;
        s.rot = next;
        s.target = next;
        apply();
      },
      up(e) {
        if (!pointer || pointer.id !== e.pointerId) return;
        const wasDrag = pointer.moved;
        pointer = null;
        if (!wasDrag) return;
        dragging = false;
        setDrag(false);
        const v = Math.max(-12, Math.min(12, s.vel));
        const projected = s.rot + v * 0.22;
        const base = Math.round(s.rot);
        s.target = Math.max(base - 3, Math.min(base + 3, Math.round(projected)));
        s.vel = v;
        kick();
      },
      dragging: () => dragging,
      moved: () => moved,
    };

    return () => {
      if (raf) cancelAnimationFrame(raf);
      engine.current = null;
    };
  }, [n]);

  React.useEffect(() => {
    if (index === undefined) return;
    engine.current?.goTo(mod(index, n));
  }, [index, n]);

  React.useEffect(() => {
    if (!autoplay || autoplay < 400 || hover || focus || drag) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) engine.current?.go(1);
    }, autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, hover, focus, drag]);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      engine.current?.go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      engine.current?.go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      engine.current?.goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      engine.current?.goTo(n - 1);
    }
  };

  const current = list[active] ?? list[0];
  const pad = (v: number) => String(v).padStart(2, "0");
  const stageHeight = Math.max(120, height - (showControls ? 30 : 0));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      className={["hb-ua1", className].filter(Boolean).join(" ")}
      style={{ ["--hb-ua1-accent" as string]: accent, height, ...style }}
      onKeyDown={handleKey}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
      }}
      {...rest}
    >
      <style href="hb-carousel-ring-3d" precedence="default">{css}</style>
      <div
        ref={stageRef}
        className="hb-ua1-stage"
        data-drag={drag ? "true" : "false"}
        style={{ ["--hb-ua1-h" as string]: `${stageHeight}px`, ["--hb-ua1-sp" as string]: spread.toFixed(3) }}
        onPointerDown={(e) => engine.current?.down(e)}
        onPointerMove={(e) => engine.current?.move(e)}
        onPointerUp={(e) => engine.current?.up(e)}
        onPointerCancel={(e) => engine.current?.up(e)}
      >
        <div className="hb-ua1-world">
          <div className="hb-ua1-floor" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <g className="hb-ua1-spin">
                <circle cx="100" cy="100" r="99" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth=".8" strokeDasharray="0.8 3.2" strokeLinecap="round" />
                <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth=".5" strokeDasharray="0.6 4" />
                {Array.from({ length: 24 }, (_, i) => {
                  const a = (i / 24) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1={(100 + Math.cos(a) * 92).toFixed(2)}
                      y1={(100 + Math.sin(a) * 92).toFixed(2)}
                      x2={(100 + Math.cos(a) * (i % 6 === 0 ? 104 : 96)).toFixed(2)}
                      y2={(100 + Math.sin(a) * (i % 6 === 0 ? 104 : 96)).toFixed(2)}
                      stroke={i % 6 === 0 ? "var(--hb-ua1-accent)" : "rgba(255,255,255,.25)"}
                      strokeWidth=".6"
                    />
                  );
                })}
              </g>
              <circle cx="100" cy="199" r="2" fill="var(--hb-ua1-accent)" />
            </svg>
          </div>
          {list.map((item, i) => {
            const p = pose(i - start, n);
            const on = i === active;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="hb-ua1-card"
                data-active={on ? "true" : "false"}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${item.title}`}
                aria-hidden={on ? undefined : true}
                style={{
                  ["--hb-ua1-x" as string]: p.x,
                  ["--hb-ua1-z" as string]: p.z,
                  ["--hb-ua1-r" as string]: p.r,
                  ["--hb-ua1-o" as string]: p.o,
                  zIndex: Number(p.zi),
                }}
                onClick={() => {
                  if (engine.current?.moved()) return;
                  engine.current?.goTo(i);
                }}
              >
                <div className="hb-ua1-face">
                  <span className="hb-ua1-k hb-ua1-k-tl" />
                  <span className="hb-ua1-k hb-ua1-k-tr" />
                  <span className="hb-ua1-k hb-ua1-k-bl" />
                  <span className="hb-ua1-k hb-ua1-k-br" />
                  <div className="hb-ua1-art">
                    <Art seed={i + item.id.length * 7} />
                  </div>
                  <div className="hb-ua1-body">
                    <div className="hb-ua1-meta">
                      <span>{item.kicker ?? `ITEM ${pad(i + 1)}`}</span>
                      <span>{pad(i + 1)}</span>
                    </div>
                    <h3 className="hb-ua1-title">{item.title}</h3>
                    {item.text ? <p className="hb-ua1-text">{item.text}</p> : null}
                    {item.tag ? <span className="hb-ua1-tag">{item.tag}</span> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showControls ? (
        <div className="hb-ua1-bar">
          <button type="button" className="hb-ua1-btn" aria-label="Previous" onClick={() => engine.current?.go(-1)}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M7.5 2.5 4 6l3.5 3.5" />
            </svg>
          </button>
          <div className="hb-ua1-mid">
            <span className="hb-ua1-count">
              <b>{pad(active + 1)}</b> / {pad(n)}
            </span>
            <span className="hb-ua1-dots" aria-hidden="true">
              {list.map((item, i) => (
                <span key={item.id} className="hb-ua1-dot" data-on={i === active ? "true" : "false"} />
              ))}
            </span>
          </div>
          <button type="button" className="hb-ua1-btn" aria-label="Next" onClick={() => engine.current?.go(1)}>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M4.5 2.5 8 6l-3.5 3.5" />
            </svg>
          </button>
        </div>
      ) : null}
      <span className="hb-ua1-sr" aria-live="polite">
        {current ? `${current.title}, ${active + 1} of ${n}` : ""}
      </span>
    </div>
  );
}

export default CarouselRing3d;
