"use client";

import * as React from "react";

export interface HoverMagneticIconsItem {
  label: string;
  icon?: string;
  tone?: string;
}

export interface HoverMagneticIconsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: HoverMagneticIconsItem[];
  columns?: number;
  radius?: number;
  strength?: number;
  autoPlay?: boolean;
  accent?: string;
  onSelect?: (label: string, index: number) => void;
}

const glyphs: Record<string, string> = {
  calendar: "M5 7h14v12H5zM5 10.5h14M9 4.5v4M15 4.5v4",
  mail: "M4.5 7h15v10h-15zM4.5 7.5l7.5 6 7.5-6",
  chat: "M5 6h14v9H11l-4 3.5V15H5z",
  music: "M10 16.5V6.5l9-2v10M10 16.5a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zM19 14.5a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0z",
  camera: "M4.5 8.5h3l1.5-2h6l1.5 2h3v9.5h-15zM12 15.5a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z",
  map: "M4.5 6.5l5-2 5 2 5-2v13l-5 2-5-2-5 2zM9.5 4.5v13M14.5 6.5v13",
  notes: "M6.5 4.5h8l3 3v12h-11zM9 11h6M9 14h6M9 8h3",
  cloud: "M7.5 17.5h9.5a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.6-1A4 4 0 0 0 7.5 17.5z",
  wallet: "M4.5 7.5h14v11h-14zM4.5 7.5l11-3v3M15 13h3.5",
  settings: "M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6zM12 3.8v2.4M12 17.8v2.4M3.8 12h2.4M17.8 12h2.4M6.2 6.2l1.7 1.7M16.1 16.1l1.7 1.7M6.2 17.8l1.7-1.7M16.1 7.9l1.7-1.7",
  photos: "M4.5 6h15v12h-15zM4.5 15l4.5-4 4 3.5 2.5-2 4 3.5M15.5 9.5h.01",
  clock: "M12 19.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM12 8v4.5l3 2",
};

const defaults: HoverMagneticIconsItem[] = [
  { label: "Calendar", icon: "calendar", tone: "#ff6a5c" },
  { label: "Mail", icon: "mail", tone: "#4c8dff" },
  { label: "Messages", icon: "chat", tone: "#3ccf7a" },
  { label: "Music", icon: "music", tone: "#ff4f8b" },
  { label: "Camera", icon: "camera", tone: "#9aa3b2" },
  { label: "Maps", icon: "map", tone: "#38c3a8" },
  { label: "Notes", icon: "notes", tone: "#f5c242" },
  { label: "Drive", icon: "cloud", tone: "#5fb0ff" },
  { label: "Wallet", icon: "wallet", tone: "#8b6bff" },
  { label: "Settings", icon: "settings", tone: "#7c8594" },
];

const css = `
.hb-wg1 { --hb-wg1-accent: #2f7bff; position: relative; box-sizing: border-box; width: 100%; padding: 18px 14px; font-family: inherit; color: #ededed; isolation: isolate; touch-action: pan-y; }
.hb-wg1 *, .hb-wg1 *::before, .hb-wg1 *::after { box-sizing: border-box; }
.hb-wg1-field { position: absolute; left: 0; top: 0; width: 220px; height: 220px; margin: -110px 0 0 -110px; border-radius: 50%; pointer-events: none; z-index: -1; opacity: 0; background: radial-gradient(circle, color-mix(in srgb, var(--hb-wg1-accent) 22%, transparent) 0%, transparent 62%); will-change: transform, opacity; transition: opacity .4s cubic-bezier(.2,.7,.2,1); }
.hb-wg1[data-live="true"] .hb-wg1-field { opacity: 1; }
.hb-wg1-grid { display: grid; grid-template-columns: repeat(var(--hb-wg1-cols), minmax(0, 1fr)); gap: 14px 10px; justify-items: center; }
.hb-wg1-btn { appearance: none; border: 0; padding: 0; margin: 0; background: none; color: inherit; font: inherit; cursor: pointer; display: grid; justify-items: center; gap: 6px; outline: none; will-change: transform; -webkit-tap-highlight-color: transparent; }
.hb-wg1-tile { position: relative; width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; background: linear-gradient(160deg, color-mix(in srgb, var(--hb-wg1-tone) 92%, #fff 8%) 0%, color-mix(in srgb, var(--hb-wg1-tone) 70%, #000 30%) 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(0,0,0,.25), 0 6px 14px -6px color-mix(in srgb, var(--hb-wg1-tone) 70%, transparent), 0 2px 4px rgba(0,0,0,.4); transition: box-shadow .3s ease; }
.hb-wg1-tile::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,0) 48%); pointer-events: none; }
.hb-wg1-tile svg { width: 22px; height: 22px; fill: none; stroke: #fff; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 1px 1px rgba(0,0,0,.25)); }
.hb-wg1-label { font-size: 10px; line-height: 1; letter-spacing: .01em; color: #8f8f8f; white-space: nowrap; transition: color .25s ease; }
.hb-wg1-btn[data-near="true"] .hb-wg1-label { color: #ededed; }
.hb-wg1-btn[data-near="true"] .hb-wg1-tile { box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 0 0 2px #0a0a0a, 0 0 0 3.5px var(--hb-wg1-accent), 0 12px 22px -8px color-mix(in srgb, var(--hb-wg1-tone) 80%, transparent); }
.hb-wg1-btn:focus-visible .hb-wg1-tile { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg1-accent); }
.hb-wg1-btn:active .hb-wg1-tile { filter: brightness(.88); }
@media (prefers-reduced-motion: reduce) {
  .hb-wg1-field { display: none; }
  .hb-wg1-btn { transform: none !important; }
}
`;

export function HoverMagneticIcons({
  items = defaults,
  columns = 5,
  radius = 120,
  strength = 0.32,
  autoPlay = true,
  accent = "#2f7bff",
  onSelect,
  className = "",
  style,
  ...rest
}: HoverMagneticIconsProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const fieldRef = React.useRef<HTMLSpanElement>(null);
  const btnRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const count = items.length;

  React.useEffect(() => {
    const root = rootRef.current;
    const field = fieldRef.current;
    if (!root || !field) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btns = btnRefs.current.slice(0, count).filter((b): b is HTMLButtonElement => !!b);
    const state = btns.map(() => ({ x: 0, y: 0, s: 1 }));
    let px = 0;
    let py = 0;
    let cx = root.clientWidth / 2;
    let cy = root.clientHeight / 2;
    let inside = false;
    let mix = 0;
    let t = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let nearIdx = -1;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const w = root.clientWidth;
      const h = root.clientHeight;
      const ax = w * (0.5 + 0.38 * Math.sin(t * 0.7));
      const ay = h * (0.5 + 0.3 * Math.sin(t * 1.3 + 0.8));
      mix += ((inside ? 1 : 0) - mix) * (1 - Math.exp(-dt * 6));
      const tx = ax + (px - ax) * mix;
      const ty = ay + (py - ay) * mix;
      cx += (tx - cx) * (1 - Math.exp(-dt * 14));
      cy += (ty - cy) * (1 - Math.exp(-dt * 14));
      const live = inside || autoPlay;
      root.dataset.live = live ? "true" : "false";
      field.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      let best = -1;
      let bestD = Infinity;
      btns.forEach((b, i) => {
        const bx = b.offsetLeft + b.offsetWidth / 2;
        const by = b.offsetTop + 22;
        const dx = cx - bx;
        const dy = cy - by;
        const d = Math.hypot(dx, dy);
        const f = live ? Math.max(0, 1 - d / radius) : 0;
        const e = f * f * (3 - 2 * f);
        const goalX = dx * strength * e;
        const goalY = dy * strength * e;
        const goalS = 1 + 0.28 * e;
        const st = state[i];
        const k = 1 - Math.exp(-dt * 16);
        st.x += (goalX - st.x) * k;
        st.y += (goalY - st.y) * k;
        st.s += (goalS - st.s) * k;
        b.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) scale(${st.s.toFixed(3)})`;
        if (d < bestD && d < radius * 0.42) {
          bestD = d;
          best = i;
        }
      });
      if (best !== nearIdx) {
        if (nearIdx >= 0 && btns[nearIdx]) btns[nearIdx].dataset.near = "false";
        if (best >= 0 && btns[best]) btns[best].dataset.near = "true";
        nearIdx = best;
      }
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
    const locate = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const s = r.width ? root.offsetWidth / r.width : 1;
      px = (e.clientX - r.left) * s;
      py = (e.clientY - r.top) * s;
    };
    const onMove = (e: PointerEvent) => {
      locate(e);
      inside = true;
    };
    const onLeave = () => {
      inside = false;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 900);
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
  }, [count, radius, strength, autoPlay]);

  const vars = { "--hb-wg1-accent": accent, "--hb-wg1-cols": Math.max(1, columns) } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-wg1 ${className}`} style={{ ...vars, ...style }} data-live="false" {...rest}>
      <style href="hb-hover-magnetic-icons" precedence="default">{css}</style>
      <span ref={fieldRef} className="hb-wg1-field" aria-hidden="true" />
      <div className="hb-wg1-grid" role="list">
        {items.map((item, i) => (
          <div role="listitem" key={`${item.label}-${i}`}>
            <button
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              className="hb-wg1-btn"
              data-near="false"
              aria-label={item.label}
              onClick={() => onSelect?.(item.label, i)}
              style={{ "--hb-wg1-tone": item.tone ?? "#3a3f4b" } as React.CSSProperties}
            >
              <span className="hb-wg1-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d={glyphs[item.icon ?? ""] ?? glyphs.notes} />
                </svg>
              </span>
              <span className="hb-wg1-label">{item.label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
