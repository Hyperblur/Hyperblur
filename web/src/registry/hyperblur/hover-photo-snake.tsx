"use client";

import * as React from "react";

export interface HoverPhotoSnakeFrame {
  caption: string;
  background?: string;
}

export interface HoverPhotoSnakeProps extends React.HTMLAttributes<HTMLDivElement> {
  frames?: HoverPhotoSnakeFrame[];
  size?: number;
  gap?: number;
  follow?: number;
  autoPlay?: boolean;
  showCaptions?: boolean;
}

const defaults: HoverPhotoSnakeFrame[] = [
  { caption: "Lisbon 06:12", background: "radial-gradient(circle at 68% 30%, #ffe6b0 0 10%, transparent 11%), linear-gradient(180deg, #ffb07a 0%, #e0607a 55%, #3b1e4a 100%)" },
  { caption: "Faroe 09:40", background: "linear-gradient(165deg, transparent 58%, #1d3b2c 59%), linear-gradient(195deg, transparent 50%, #2f5a3f 51%), linear-gradient(180deg, #c9dde6 0%, #7da3b5 100%)" },
  { caption: "Kyoto 17:05", background: "radial-gradient(70% 45% at 50% 100%, #2a1530 0%, transparent 70%), repeating-linear-gradient(90deg, transparent 0 14px, rgba(40,10,20,.55) 14px 16px), linear-gradient(180deg, #ff8f5a 0%, #c43d55 70%, #2a1530 100%)" },
  { caption: "Atacama 22:30", background: "radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 70% 20%, #fff, transparent), radial-gradient(1.5px 1.5px at 45% 55%, #fff, transparent), radial-gradient(80% 50% at 60% 40%, rgba(140,120,255,.45), transparent 70%), linear-gradient(180deg, #0a1030 0%, #1c2350 70%, #3a2a3f 100%)" },
  { caption: "Reykjavik 01:14", background: "radial-gradient(90% 40% at 30% 35%, rgba(90,255,190,.7), transparent 70%), radial-gradient(60% 30% at 70% 25%, rgba(120,140,255,.55), transparent 70%), linear-gradient(180deg, #061428 0%, #0d2440 80%, #10161f 100%)" },
  { caption: "Marrakesh 13:50", background: "linear-gradient(0deg, #b45a2c 0 26%, transparent 26%), repeating-linear-gradient(90deg, #d98a4f 0 18px, #c2703a 18px 20px), linear-gradient(180deg, #f6d6a4 0%, #e3a062 100%)" },
  { caption: "Oslo 08:02", background: "linear-gradient(180deg, transparent 62%, #0f2a3a 62%), radial-gradient(circle at 30% 40%, #f1f5f8 0 18%, transparent 19%), linear-gradient(180deg, #a8c8de 0%, #e3eef5 100%)" },
];

const css = `
.hb-wg2 { position: relative; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; isolation: isolate; font-family: inherit; touch-action: pan-y; }
.hb-wg2 *, .hb-wg2 *::before, .hb-wg2 *::after { box-sizing: border-box; }
.hb-wg2-content { position: relative; z-index: 1; width: 100%; height: 100%; }
.hb-wg2-layer { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
.hb-wg2-frame { position: absolute; left: 0; top: 0; border-radius: 9px; padding: 3px 3px 15px; background: #f4f1ea; box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 14px 24px -10px rgba(0,0,0,.75), 0 2px 5px rgba(0,0,0,.45); will-change: transform, opacity; opacity: 0; }
.hb-wg2-photo { width: 100%; height: 100%; border-radius: 6px; background-size: cover; background-position: center; box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); }
.hb-wg2-cap { position: absolute; left: 5px; right: 5px; bottom: 2px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 7.5px; line-height: 12px; letter-spacing: .04em; color: #3b3a36; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg2-layer { display: none; }
}
`;

export function HoverPhotoSnake({
  frames = defaults,
  size = 58,
  gap = 26,
  follow = 0.22,
  autoPlay = true,
  showCaptions = true,
  className = "",
  style,
  children,
  ...rest
}: HoverPhotoSnakeProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const layerRef = React.useRef<HTMLDivElement>(null);
  const list = frames.length ? frames : defaults;
  const n = list.length;

  React.useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(layer.children) as HTMLElement[];
    const pts = els.map(() => ({ x: root.clientWidth / 2, y: root.clientHeight / 2, r: 0 }));
    let px = 0;
    let py = 0;
    let inside = false;
    let mix = 0;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let shown = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const w = root.clientWidth;
      const h = root.clientHeight;
      const ax = w * (0.5 + 0.34 * Math.sin(t * 0.8));
      const ay = h * (0.5 + 0.26 * Math.sin(t * 1.6));
      mix += ((inside ? 1 : 0) - mix) * (1 - Math.exp(-dt * 5));
      const hx = ax + (px - ax) * mix;
      const hy = ay + (py - ay) * mix;
      const goal = inside || autoPlay ? 1 : 0;
      shown += (goal - shown) * (1 - Math.exp(-dt * 6));
      const k = 1 - Math.pow(1 - Math.min(0.9, Math.max(0.02, follow)), dt * 60);
      pts.forEach((p, i) => {
        const lx = i === 0 ? hx : pts[i - 1].x;
        const ly = i === 0 ? hy : pts[i - 1].y;
        let nx = p.x + (lx - p.x) * k;
        let ny = p.y + (ly - p.y) * k;
        if (i > 0) {
          const dx = nx - lx;
          const dy = ny - ly;
          const d = Math.hypot(dx, dy);
          const lim = gap;
          if (d > lim) {
            nx = lx + (dx / d) * lim;
            ny = ly + (dy / d) * lim;
          }
        }
        const vx = nx - p.x;
        const vy = ny - p.y;
        const speed = Math.hypot(vx, vy);
        const goalR = Math.max(-28, Math.min(28, vx * 2.2)) + (i % 2 ? 4 : -4) * (1 - Math.min(1, speed / 3));
        p.r += (goalR - p.r) * (1 - Math.exp(-dt * 8));
        p.x = nx;
        p.y = ny;
        const scale = (1 - i * (0.5 / Math.max(1, els.length))) * (0.6 + 0.4 * shown);
        const el = els[i];
        el.style.transform = `translate3d(${(p.x - size / 2).toFixed(1)}px, ${(p.y - size * 0.62).toFixed(1)}px, 0) rotate(${p.r.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = (shown * (1 - i * 0.06)).toFixed(3);
      });
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? root.offsetWidth / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
      inside = true;
    };
    const onLeave = () => {
      inside = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 1200);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerup", onUp);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    start();
    return () => {
      stop();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerup", onUp);
    };
  }, [n, size, gap, follow, autoPlay]);

  return (
    <div ref={rootRef} className={`hb-wg2 ${className}`} style={style} {...rest}>
      <style href="hb-hover-photo-snake" precedence="default">{css}</style>
      <div className="hb-wg2-content">{children}</div>
      <div ref={layerRef} className="hb-wg2-layer" aria-hidden="true">
        {list.map((f, i) => (
          <div
            key={i}
            className="hb-wg2-frame"
            style={{ width: size, height: (size * 1.12 + 12).toFixed(1) + "px", zIndex: n - i, paddingBottom: showCaptions ? 15 : 3 }}
          >
            <div className="hb-wg2-photo" style={{ background: f.background ?? defaults[i % defaults.length].background }} />
            {showCaptions ? <span className="hb-wg2-cap">{f.caption}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
