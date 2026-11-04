"use client";

import * as React from "react";

export interface HoloStat {
  label: string;
  value: string;
}

export interface CardProfileHoloProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  name?: string;
  role?: string;
  handle?: string;
  serial?: string;
  stats?: HoloStat[];
  avatar?: string;
  hue?: number;
  tilt?: number;
  ratio?: number;
  idle?: boolean;
}

const css = `
.hb-qk2 {
  --hb-qk2-rx: 0deg;
  --hb-qk2-ry: 0deg;
  --hb-qk2-gx: 30%;
  --hb-qk2-gy: 28%;
  --hb-qk2-px: 40%;
  --hb-qk2-py: 40%;
  --hb-qk2-ang: 115deg;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-qk2-r);
  perspective: 900px;
  font-family: inherit;
  box-sizing: border-box;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}
.hb-qk2 *, .hb-qk2 *::before, .hb-qk2 *::after { box-sizing: border-box; }
.hb-qk2-card {
  position: absolute;
  inset: 0;
  overflow: hidden;
  isolation: isolate;
  border-radius: 20px;
  border: 1px solid #2a2a2a;
  background: linear-gradient(145deg, #1a1c23, #0e0f13);
  color: #ededed;
  transform: rotateX(var(--hb-qk2-rx)) rotateY(var(--hb-qk2-ry));
  box-shadow: 0 22px 40px -22px rgba(0, 0, 0, 0.95);
  will-change: transform;
}
.hb-qk2-foil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.42;
  background: repeating-linear-gradient(
    var(--hb-qk2-ang),
    hsl(calc(var(--hb-qk2-h) + 0) 92% 60%) 0%,
    hsl(calc(var(--hb-qk2-h) + 60) 92% 62%) 8%,
    hsl(calc(var(--hb-qk2-h) + 120) 92% 60%) 16%,
    hsl(calc(var(--hb-qk2-h) + 180) 92% 62%) 24%,
    hsl(calc(var(--hb-qk2-h) + 240) 92% 60%) 32%,
    hsl(calc(var(--hb-qk2-h) + 300) 92% 62%) 40%,
    hsl(calc(var(--hb-qk2-h) + 360) 92% 60%) 48%
  );
  background-size: 280% 280%;
  background-position: var(--hb-qk2-px) var(--hb-qk2-py);
}
.hb-qk2-tex {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.6;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.9) 0 1px, transparent 2px) 0 0 / 23px 19px,
    radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.7) 0 1px, transparent 2px) 0 0 / 17px 21px,
    repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.1) 0 2px, transparent 2px 7px);
}
.hb-qk2-shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: overlay;
  background: radial-gradient(farthest-corner circle at var(--hb-qk2-gx) var(--hb-qk2-gy), rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0) 58%);
}
.hb-qk2-in {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 16px 12px;
}
.hb-qk2-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9a9a9a;
}
.hb-qk2-chip {
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #d8d8d8;
}
.hb-qk2-id {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
}
.hb-qk2-av {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff;
  box-shadow: 0 0 0 2px #0e0f13, 0 0 0 3px rgba(255, 255, 255, 0.5);
}
.hb-qk2-who { min-width: 0; }
.hb-qk2-name {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 19px;
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #ffffff;
}
.hb-qk2-role {
  margin: 2px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1.3;
  color: #b4b4b4;
}
.hb-qk2-handle { color: #cfe0ff; }
.hb-qk2-stats {
  display: grid;
  grid-template-columns: repeat(var(--hb-qk2-n), minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding-top: 8px;
}
.hb-qk2-stat { min-width: 0; padding-left: 10px; border-left: 1px solid rgba(255, 255, 255, 0.1); }
.hb-qk2-stat:first-child { padding-left: 0; border-left: 0; }
.hb-qk2-v {
  display: block;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  color: #ffffff;
}
.hb-qk2-l {
  display: block;
  margin-top: 2px;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8f8f8f;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qk2-card { transform: none; will-change: auto; }
}
`;

const defaultStats: HoloStat[] = [
  { label: "Shipped", value: "148" },
  { label: "Reviews", value: "2.4k" },
  { label: "Streak", value: "61d" },
];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function avatarHue(name: string) {
  let h = 7;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

export function CardProfileHolo({
  name = "Mira Kovac",
  role = "Staff Designer, Lumen",
  handle = "@mirak",
  serial = "No. 014 / 120",
  stats = defaultStats,
  avatar,
  hue = 210,
  tilt = 10,
  ratio = 1.75,
  idle = true,
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...rest
}: CardProfileHoloProps) {
  const root = React.useRef<HTMLDivElement>(null);
  const st = React.useRef({ tx: 0.3, ty: 0.28, x: 0.3, y: 0.28, hover: false });

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paint = () => {
      const rx = reduce ? 0 : (0.5 - s.y) * 2 * tilt;
      const ry = reduce ? 0 : (s.x - 0.5) * 2 * tilt;
      const ang = 90 + (s.x - 0.5) * 140 + (s.y - 0.5) * 60;
      el.style.setProperty("--hb-qk2-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--hb-qk2-ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--hb-qk2-gx", `${(s.x * 100).toFixed(1)}%`);
      el.style.setProperty("--hb-qk2-gy", `${(s.y * 100).toFixed(1)}%`);
      el.style.setProperty("--hb-qk2-px", `${(s.x * 100).toFixed(1)}%`);
      el.style.setProperty("--hb-qk2-py", `${(s.y * 100).toFixed(1)}%`);
      el.style.setProperty("--hb-qk2-ang", `${ang.toFixed(1)}deg`);
    };
    if (reduce) {
      s.x = 0.3;
      s.y = 0.28;
      paint();
      return;
    }
    let raf = 0;
    const frame = (now: number) => {
      const t = now / 1000;
      if (!s.hover) {
        if (idle) {
          s.tx = 0.5 + 0.4 * Math.sin(t * 0.7);
          s.ty = 0.5 + 0.32 * Math.sin(t * 0.55 + 0.8);
        } else {
          s.tx = 0.5;
          s.ty = 0.5;
        }
      }
      s.x += (s.tx - s.x) * 0.1;
      s.y += (s.ty - s.y) * 0.1;
      paint();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [tilt, idle]);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const s = st.current;
    s.hover = true;
    s.tx = clamp01((e.clientX - r.left) / r.width);
    s.ty = clamp01((e.clientY - r.top) / r.height);
  };

  const leave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    st.current.hover = false;
  };

  const cancel = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);
    st.current.hover = false;
  };

  const ah = avatarHue(name);
  const avatarStyle: React.CSSProperties = avatar
    ? { backgroundImage: `url(${JSON.stringify(avatar)})` }
    : { background: `linear-gradient(140deg, hsl(${ah} 62% 52%), hsl(${(ah + 40) % 360} 60% 34%))` };

  return (
    <div
      ref={root}
      className={`hb-qk2 ${className}`}
      style={
        {
          "--hb-qk2-r": ratio,
          "--hb-qk2-h": hue,
          "--hb-qk2-n": Math.max(1, stats.length),
          ...style,
        } as React.CSSProperties
      }
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={cancel}
      {...rest}
    >
      <style href="hb-card-profile-holo" precedence="default">{css}</style>
      <div className="hb-qk2-card">
        <div className="hb-qk2-foil" aria-hidden="true" />
        <div className="hb-qk2-tex" aria-hidden="true" />
        <div className="hb-qk2-shine" aria-hidden="true" />
        <div className="hb-qk2-in">
          <div className="hb-qk2-top">
            <span>{serial}</span>
            <span className="hb-qk2-chip">Holo</span>
          </div>
          <div className="hb-qk2-id">
            <span className="hb-qk2-av" style={avatarStyle} aria-hidden="true">
              {avatar ? null : initials(name)}
            </span>
            <div className="hb-qk2-who">
              <h3 className="hb-qk2-name">{name}</h3>
              <p className="hb-qk2-role">{role}</p>
              {handle ? <p className="hb-qk2-role hb-qk2-handle">{handle}</p> : null}
            </div>
          </div>
          <div className="hb-qk2-stats">
            {stats.map((stat) => (
              <div className="hb-qk2-stat" key={stat.label}>
                <span className="hb-qk2-v">{stat.value}</span>
                <span className="hb-qk2-l">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
