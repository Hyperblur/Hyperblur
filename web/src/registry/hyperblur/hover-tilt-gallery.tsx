"use client";

import * as React from "react";

export interface HoverTiltGalleryItem {
  title: string;
  meta: string;
  background: string;
}

export interface HoverTiltGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: HoverTiltGalleryItem[];
  height?: number;
  maxTilt?: number;
  lift?: number;
  autoPlay?: boolean;
  accent?: string;
  onSelect?: (index: number, item: HoverTiltGalleryItem) => void;
}

const defaults: HoverTiltGalleryItem[] = [
  { title: "Dune Study", meta: "Oil · 2024", background: "radial-gradient(circle at 70% 26%, #fff1c9 0 9%, transparent 10%), linear-gradient(170deg, transparent 58%, #a8582c 59%), linear-gradient(190deg, transparent 66%, #7a3a1c 67%), linear-gradient(180deg, #f4b67a 0%, #e0805a 100%)" },
  { title: "Harbor Blue", meta: "Print · 2023", background: "repeating-linear-gradient(0deg, rgba(255,255,255,.12) 0 2px, transparent 2px 10px), linear-gradient(180deg, transparent 55%, #0b2a4a 55%), linear-gradient(180deg, #8ec5ff 0%, #2f7bff 100%)" },
  { title: "Moss Room", meta: "Photo · 2025", background: "radial-gradient(60% 40% at 50% 80%, #2c5a35 0%, transparent 70%), radial-gradient(circle at 30% 30%, #b9e08f 0 16%, transparent 17%), linear-gradient(180deg, #4d7d48 0%, #12261a 100%)" },
  { title: "Neon Rain", meta: "Digital · 2025", background: "repeating-linear-gradient(100deg, transparent 0 9px, rgba(255,90,170,.35) 9px 10px), radial-gradient(70% 50% at 50% 100%, #ff4f9a 0%, transparent 70%), linear-gradient(180deg, #120a2a 0%, #36104a 100%)" },
  { title: "Salt Flat", meta: "Photo · 2022", background: "linear-gradient(180deg, transparent 52%, #e8eef2 52%, #c3ccd4 100%), radial-gradient(circle at 50% 50%, #ffffff 0 7%, transparent 8%), linear-gradient(180deg, #9cb8d6 0%, #dbe6f0 100%)" },
];

const css = `
.hb-wg7 { --hb-wg7-accent: #2f7bff; --hb-wg7-h: 132px; position: relative; box-sizing: border-box; width: 100%; perspective: 760px; font-family: inherit; color: #ededed; touch-action: pan-y; }
.hb-wg7 *, .hb-wg7 *::before, .hb-wg7 *::after { box-sizing: border-box; }
.hb-wg7-strip { display: flex; gap: 8px; height: var(--hb-wg7-h); transform-style: preserve-3d; will-change: transform; }
.hb-wg7-card { appearance: none; border: 0; margin: 0; padding: 0; font: inherit; color: inherit; cursor: pointer; position: relative; flex: 1 1 0; min-width: 0; height: 100%; border-radius: 12px; overflow: hidden; transform-style: preserve-3d; will-change: transform; outline: none; background: var(--hb-wg7-bg); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), 0 18px 28px -18px rgba(0,0,0,.95); transition: flex-grow .55s cubic-bezier(.2,.9,.25,1), box-shadow .35s ease, filter .35s ease; -webkit-tap-highlight-color: transparent; }
.hb-wg7-card[data-hot="true"] { flex-grow: 1.7; box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 26px 40px -18px rgba(0,0,0,.95); }
.hb-wg7[data-active="true"] .hb-wg7-card:not([data-hot="true"]) { filter: brightness(.72) saturate(.85); }
.hb-wg7-card:focus-visible { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px var(--hb-wg7-accent); }
.hb-wg7-sheen { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,.28) 48%, transparent 62%); background-size: 260% 100%; background-position: var(--hb-wg7-sx, 50%) 0; mix-blend-mode: overlay; opacity: .9; }
.hb-wg7-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 9px 8px; display: grid; gap: 1px; text-align: left; background: linear-gradient(180deg, transparent, rgba(0,0,0,.62)); transform: translateZ(18px); opacity: 0; translate: 0 6px; transition: opacity .35s ease, translate .45s cubic-bezier(.2,.9,.25,1); }
.hb-wg7-card[data-hot="true"] .hb-wg7-cap, .hb-wg7-card:focus-visible .hb-wg7-cap { opacity: 1; translate: 0 0; }
.hb-wg7-t { font-size: 11.5px; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wg7-m { font-size: 9.5px; color: rgba(237,237,237,.72); white-space: nowrap; }
.hb-wg7-floor { position: absolute; left: 6%; right: 6%; bottom: -14px; height: 14px; border-radius: 50%; background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.65), transparent); filter: blur(4px); pointer-events: none; }
@media (prefers-reduced-motion: reduce) {
  .hb-wg7-strip, .hb-wg7-card { transform: none !important; transition: none; }
  .hb-wg7-cap { transition: none; }
}
`;

export function HoverTiltGallery({
  items = defaults,
  height = 132,
  maxTilt = 22,
  lift = 34,
  autoPlay = true,
  accent = "#2f7bff",
  onSelect,
  className = "",
  style,
  ...rest
}: HoverTiltGalleryProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const n = items.length;

  React.useEffect(() => {
    const root = rootRef.current;
    const strip = stripRef.current;
    if (!root || !strip) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.slice(0, n).filter((c): c is HTMLButtonElement => !!c);
    const st = cards.map(() => ({ r: 0, z: 0 }));
    let px = 0;
    let py = 0;
    let inside = false;
    let focusIdx = -1;
    let cx = root.offsetWidth / 2;
    let cy = 0;
    let mix = 0;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let hot = -1;
    let sr = 0;
    let sx = 0;

    const setHot = (i: number) => {
      if (i === hot) return;
      if (hot >= 0 && cards[hot]) cards[hot].dataset.hot = "false";
      hot = i;
      if (i >= 0 && cards[i]) cards[i].dataset.hot = "true";
      root.dataset.active = i >= 0 ? "true" : "false";
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      const live = inside || focusIdx >= 0 || autoPlay;
      mix += ((live ? 1 : 0) - mix) * (1 - Math.exp(-dt * 5));
      let tx = w * (0.5 + 0.42 * Math.sin(t * 0.6));
      let ty = h * 0.5;
      if (focusIdx >= 0 && cards[focusIdx]) {
        tx = cards[focusIdx].offsetLeft + cards[focusIdx].offsetWidth / 2;
      } else if (inside) {
        tx = px;
        ty = py;
      }
      const k = 1 - Math.exp(-dt * (inside ? 12 : 4));
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      const nx = w ? (cx / w) * 2 - 1 : 0;
      const ny = h ? (cy / h) * 2 - 1 : 0;
      sr += (nx * 9 * mix - sr) * k;
      sx += (ny * -5 * mix - sx) * k;
      strip.style.transform = `rotateY(${sr.toFixed(2)}deg) rotateX(${sx.toFixed(2)}deg)`;
      let best = -1;
      let bestD = Infinity;
      cards.forEach((c, i) => {
        const center = c.offsetLeft + c.offsetWidth / 2;
        const d = cx - center;
        const ad = Math.abs(d);
        if (ad < bestD) {
          bestD = ad;
          best = i;
        }
        const gr = Math.max(-1, Math.min(1, d / (w * 0.35))) * maxTilt * mix;
        const prox = Math.max(0, 1 - ad / (w * 0.4)) * mix;
        const s = st[i];
        s.r += (gr - s.r) * k;
        s.z += (prox * lift - s.z) * k;
        c.style.transform = `translateZ(${s.z.toFixed(1)}px) rotateY(${s.r.toFixed(2)}deg)`;
        c.style.setProperty("--hb-wg7-sx", `${(50 - (d / (c.offsetWidth || 1)) * 30).toFixed(1)}%`);
      });
      setHot(live && mix > 0.4 ? best : -1);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible || reduce) return;
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
      if (reduce) {
        let best = -1;
        cards.forEach((c, i) => {
          if (px >= c.offsetLeft && px <= c.offsetLeft + c.offsetWidth) best = i;
        });
        setHot(best);
      }
    };
    const onLeave = () => {
      inside = false;
      if (reduce) setHot(-1);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 1500);
    };
    const onFocusIn = (e: FocusEvent) => {
      focusIdx = cards.indexOf(e.target as HTMLButtonElement);
      if (reduce) setHot(focusIdx);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node | null)) {
        focusIdx = -1;
        if (reduce) setHot(-1);
      }
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
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
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, [n, maxTilt, lift, autoPlay]);

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (next >= 0) {
      e.preventDefault();
      cardRefs.current[next]?.focus();
    }
  };

  const vars = { "--hb-wg7-accent": accent, "--hb-wg7-h": `${height}px` } as React.CSSProperties;

  return (
    <div ref={rootRef} className={`hb-wg7 ${className}`} style={{ ...vars, ...style }} data-active="false" {...rest}>
      <style href="hb-hover-tilt-gallery" precedence="default">{css}</style>
      <div ref={stripRef} className="hb-wg7-strip" role="group" aria-label="Gallery">
        {items.map((item, i) => (
          <button
            key={`${item.title}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            type="button"
            className="hb-wg7-card"
            data-hot="false"
            aria-label={`${item.title}, ${item.meta}`}
            onKeyDown={(e) => onKey(e, i)}
            onClick={() => onSelect?.(i, item)}
            style={{ "--hb-wg7-bg": item.background } as React.CSSProperties}
          >
            <span className="hb-wg7-sheen" aria-hidden="true" />
            <span className="hb-wg7-cap" aria-hidden="true">
              <span className="hb-wg7-t">{item.title}</span>
              <span className="hb-wg7-m">{item.meta}</span>
            </span>
          </button>
        ))}
      </div>
      <span className="hb-wg7-floor" aria-hidden="true" />
    </div>
  );
}
