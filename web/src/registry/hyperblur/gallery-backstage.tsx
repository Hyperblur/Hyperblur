"use client";

import * as React from "react";

export type GalleryBackstageImage = { src?: string; title: string; caption?: string };

export interface GalleryBackstageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  images?: GalleryBackstageImage[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  idle?: boolean;
  interval?: number;
  height?: number;
  light?: string;
  accent?: string;
  label?: string;
}

const sampleImages: GalleryBackstageImage[] = [
  { title: "Dune Hour", caption: "Erg Chebbi, 2024" },
  { title: "Harbor Lights", caption: "Lisbon, 2023" },
  { title: "Glacier Line", caption: "Jokulsarlon, 2022" },
  { title: "Pine Ridge", caption: "Cascades, 2021" },
  { title: "Polar Night", caption: "Tromso, 2020" },
  { title: "Sun Room", caption: "Brooklyn, 2019" },
];

function mix(n: number) {
  let x = Math.imul((n + 7) | 0, 0x9e3779b1) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

function sky(a: string, b: string, c: string) {
  return `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="0.62" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect width="320" height="240" fill="url(#s)"/>`;
}

function sceneSvg(k: number) {
  let b = "";
  if (k === 0) {
    b =
      sky("#ffd28f", "#f2866b", "#8a4a7c") +
      '<circle cx="214" cy="98" r="54" fill="#fff3cf" opacity="0.18"/><circle cx="214" cy="98" r="30" fill="#fff3cf"/><path d="M0 168 Q90 122 172 160 T320 150 V240 H0Z" fill="#dc8752"/><path d="M0 198 Q110 160 204 194 T320 186 V240 H0Z" fill="#ab5840"/><path d="M0 224 Q120 200 236 222 T320 216 V240 H0Z" fill="#6f3437"/>';
  } else if (k === 1) {
    b = sky("#0c1230", "#28205e", "#5c2c6c") + '<circle cx="258" cy="48" r="13" fill="#fff1d6"/>';
    for (let i = 0; i < 18; i += 1) {
      const v = mix(i + 40);
      b += `<circle cx="${v % 320}" cy="${mix(i + 90) % 90}" r="${(0.6 + (v % 4) / 5).toFixed(2)}" fill="#ffffff" opacity="0.7"/>`;
    }
    for (let i = 0; i < 10; i += 1) {
      const x = i * 34 - 6;
      const w = 30 + (mix(i) % 10);
      const h = 70 + (mix(i + 20) % 96);
      b += `<rect x="${x}" y="${222 - h}" width="${w}" height="${h}" fill="#161333"/>`;
      for (let r = 0; r < Math.floor((h - 12) / 14); r += 1) {
        for (let c = 0; c < Math.floor((w - 8) / 9); c += 1) {
          const q = mix(i * 97 + r * 13 + c);
          if (q % 3 === 0) b += `<rect x="${x + 5 + c * 9}" y="${230 - h + r * 14}" width="4" height="6" fill="${q % 2 ? "#ffcf7a" : "#ff9f86"}"/>`;
        }
      }
    }
    b += '<rect y="222" width="320" height="18" fill="#0b0a1f"/><rect x="40" y="228" width="60" height="2" fill="#ffcf7a" opacity="0.35"/><rect x="190" y="232" width="80" height="2" fill="#ff9f86" opacity="0.3"/>';
  } else if (k === 2) {
    b =
      sky("#d9efff", "#86bde8", "#2f6fa8") +
      '<polygon points="0,150 46,96 82,128 124,78 170,134 214,92 262,140 320,104 320,170 0,170" fill="#f4fbff"/><polygon points="46,96 60,150 30,150" fill="#c4def2"/><polygon points="124,78 142,150 104,150" fill="#c4def2"/><polygon points="214,92 230,150 196,150" fill="#c4def2"/><rect y="164" width="320" height="76" fill="#17508a"/><path d="M0 182 Q40 176 80 182 T160 182 T240 182 T320 182" stroke="#8ec6f0" stroke-width="2" fill="none" opacity="0.5"/><path d="M0 204 Q40 198 80 204 T160 204 T240 204 T320 204" stroke="#8ec6f0" stroke-width="2" fill="none" opacity="0.35"/><polygon points="88,176 126,176 116,190 96,190" fill="#e8f6ff"/><polygon points="220,196 268,196 256,212 230,212" fill="#d2ecff"/>';
  } else if (k === 3) {
    b = sky("#e4ece4", "#a9c2b2", "#6f8f7e");
    const rows: [number, number, string][] = [
      [120, 50, "#86a596"],
      [150, 62, "#4b6d5d"],
      [186, 78, "#22392f"],
    ];
    rows.forEach(([base, tall, fill], r) => {
      for (let i = 0; i < 12; i += 1) {
        const x = i * 30 + (mix(r * 31 + i) % 18) - 10;
        const h = tall - 14 + (mix(r * 57 + i) % 28);
        b += `<polygon points="${x},${base - h} ${x - 15},${base + 6} ${x + 15},${base + 6}" fill="${fill}"/>`;
      }
      b += `<rect y="${base + 4}" width="320" height="${240 - base}" fill="${fill}"/>`;
      if (r === 0) b += '<rect y="118" width="320" height="30" fill="#e4ece4" opacity="0.55"/>';
    });
  } else if (k === 4) {
    b =
      sky("#040a18", "#0b1d38", "#12304a") +
      '<path d="M0 96 C70 40 160 126 320 56 L320 104 C170 168 92 84 0 146Z" fill="#3ef0a8" opacity="0.32"/><path d="M0 70 C90 30 170 96 320 30 L320 60 C180 120 96 60 0 110Z" fill="#8f6bff" opacity="0.22"/><path d="M40 110 C120 76 200 140 300 90" stroke="#9fffd6" stroke-width="3" fill="none" opacity="0.4"/>';
    for (let i = 0; i < 26; i += 1) {
      const v = mix(i + 300);
      b += `<circle cx="${v % 320}" cy="${mix(i + 500) % 120}" r="${(0.5 + (v % 3) / 4).toFixed(2)}" fill="#ffffff" opacity="0.75"/>`;
    }
    b +=
      '<polygon points="0,200 60,140 104,176 160,120 220,180 266,150 320,190 320,240 0,240" fill="#0a1626"/><polygon points="160,120 176,136 168,134 160,142 152,134 146,134" fill="#dfeaf5"/><polygon points="60,140 72,152 60,150 50,152" fill="#dfeaf5"/><rect y="214" width="320" height="26" fill="#06101d"/>';
  } else {
    b =
      '<defs><radialGradient id="s" cx="0.32" cy="0.3" r="0.9"><stop offset="0" stop-color="#ffe2c8"/><stop offset="0.55" stop-color="#e09a7c"/><stop offset="1" stop-color="#7c4648"/></radialGradient><radialGradient id="o" cx="0.35" cy="0.3" r="0.75"><stop offset="0" stop-color="#fff6ea"/><stop offset="1" stop-color="#c46f58"/></radialGradient></defs><rect width="320" height="240" fill="url(#s)"/><path d="M188 240 V112 A52 52 0 0 1 292 112 V240Z" fill="#f6c9a8" opacity="0.55"/><rect x="40" y="176" width="140" height="64" fill="#5d3236"/><rect x="40" y="170" width="140" height="8" fill="#7a4447"/><circle cx="110" cy="138" r="32" fill="url(#o)"/><rect x="150" y="128" width="16" height="42" rx="3" fill="#2f2a44"/><ellipse cx="158" cy="128" rx="8" ry="3" fill="#4a4366"/>';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice">${b}</svg>`;
}

const sceneCache = new Map<number, string>();

function sceneUrl(index: number) {
  const k = ((index % 6) + 6) % 6;
  let url = sceneCache.get(k);
  if (!url) {
    url = `url("data:image/svg+xml,${encodeURIComponent(sceneSvg(k))}")`;
    sceneCache.set(k, url);
  }
  return url;
}

function imageUrl(src: string | undefined, index: number) {
  return src ? `url(${JSON.stringify(src)})` : sceneUrl(index);
}

const motes = Array.from({ length: 9 }, (_, i) => {
  const v = mix(i + 900);
  return {
    left: (18 + (v % 64)).toFixed(0),
    top: (16 + (mix(i + 940) % 64)).toFixed(0),
    size: (1.5 + (v % 3) * 0.6).toFixed(1),
    delay: ((mix(i + 980) % 40) / 10).toFixed(1),
    dur: (4 + (v % 4)).toFixed(1),
  };
});

const css = `
.hb-zw3 {
  --hb-zw3-accent: #2f7bff;
  --hb-zw3-light: #fff2d6;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-zw3 *, .hb-zw3 *::before, .hb-zw3 *::after { box-sizing: border-box; }
.hb-zw3-stage {
  --hb-zw3-iw: min(calc(88cqw / var(--hb-zw3-n) * 1.4), calc(var(--hb-zw3-h) * 0.42));
  position: relative;
  width: 100%;
  height: var(--hb-zw3-h);
  overflow: hidden;
  isolation: isolate;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  background:
    radial-gradient(120% 70% at 50% 0%, #17171b 0%, #0b0b0d 60%, #070708 100%);
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.hb-zw3-stage[data-drag="true"] { cursor: grabbing; }
.hb-zw3-wall {
  position: absolute;
  inset: 0 0 30% 0;
  background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.018) 0 2px, transparent 2px 18px);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 0%, transparent 100%);
}
.hb-zw3-floor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background: linear-gradient(180deg, #0f0f12 0%, #060607 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}
.hb-zw3-beam, .hb-zw3-pool {
  position: absolute;
  left: var(--hb-zw3-x);
  transition: left 0.65s cubic-bezier(0.22, 0.8, 0.2, 1);
  pointer-events: none;
}
.hb-zw3-stage[data-drag="true"] .hb-zw3-beam, .hb-zw3-stage[data-drag="true"] .hb-zw3-pool { transition: none; }
.hb-zw3-beam {
  top: 0;
  bottom: 16%;
  z-index: 2;
  width: calc(var(--hb-zw3-iw) * 1.9);
  transform: translateX(-50%);
}
.hb-zw3-cone {
  position: absolute;
  inset: 0;
  clip-path: polygon(44% 0, 56% 0, 100% 100%, 0 100%);
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--hb-zw3-light) 70%, transparent) 0%,
    color-mix(in srgb, var(--hb-zw3-light) 16%, transparent) 70%,
    transparent 100%);
  filter: blur(5px);
  mix-blend-mode: screen;
  transform-origin: 50% 0;
  animation: hb-zw3-sway 6s ease-in-out infinite alternate;
}
.hb-zw3-mote {
  position: absolute;
  border-radius: 999px;
  background: var(--hb-zw3-light);
  opacity: 0;
  animation: hb-zw3-drift var(--hb-zw3-md) ease-in-out var(--hb-zw3-mdl) infinite;
}
.hb-zw3-lamp {
  position: absolute;
  top: -6px;
  left: 50%;
  width: 34px;
  height: 14px;
  margin-left: -17px;
  border-radius: 0 0 10px 10px;
  background: linear-gradient(180deg, #2a2a2e, #141416);
  box-shadow: 0 6px 18px 2px color-mix(in srgb, var(--hb-zw3-light) 45%, transparent);
}
.hb-zw3-pool {
  bottom: 9%;
  z-index: 1;
  width: calc(var(--hb-zw3-iw) * 2.2);
  height: 18%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-zw3-light) 30%, transparent), transparent);
}
.hb-zw3-item {
  position: absolute;
  bottom: 22%;
  left: calc(6% + (var(--hb-zw3-i) + 0.5) * 88% / var(--hb-zw3-n));
  z-index: 1;
  width: var(--hb-zw3-iw);
  aspect-ratio: 3 / 4;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #171717;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%) scale(0.84);
  transform-origin: 50% 100%;
  filter: brightness(0.3) saturate(0.45);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: transform 0.65s cubic-bezier(0.22, 0.8, 0.2, 1), filter 0.65s ease, box-shadow 0.4s ease;
}
.hb-zw3-item[data-on="true"] {
  z-index: 3;
  transform: translateX(-50%) translateY(-3%) scale(1.12);
  filter: brightness(1.04) saturate(1.05);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14), 0 20px 34px -14px rgba(0, 0, 0, 0.9);
}
.hb-zw3-item:focus-visible { box-shadow: 0 0 0 2px var(--hb-zw3-accent); }
.hb-zw3-cap {
  position: absolute;
  left: 50%;
  bottom: 5%;
  z-index: 4;
  width: 64%;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
}
.hb-zw3-title {
  margin: 0;
  font-size: 0.95em;
  font-weight: 600;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: hb-zw3-in 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-zw3-sub {
  margin: 1px 0 0;
  font-size: 0.72em;
  letter-spacing: 0.06em;
  color: #8f8f8f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: hb-zw3-in 0.55s 0.06s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-zw3-arrow {
  position: absolute;
  bottom: 5%;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.8);
  color: #ededed;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}
.hb-zw3-arrow:hover { background: #1c1c1c; border-color: #3a3a3a; }
.hb-zw3-arrow:focus-visible { outline: 2px solid var(--hb-zw3-accent); outline-offset: 2px; }
.hb-zw3-arrow:disabled { opacity: 0.35; cursor: default; }
.hb-zw3-arrow svg { width: 13px; height: 13px; }
.hb-zw3-left { left: 12px; }
.hb-zw3-right { right: 12px; }
@keyframes hb-zw3-sway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
@keyframes hb-zw3-drift {
  0% { opacity: 0; transform: translate(0, 6px); }
  40% { opacity: 0.8; }
  100% { opacity: 0; transform: translate(6px, -14px); }
}
@keyframes hb-zw3-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-zw3-beam, .hb-zw3-pool, .hb-zw3-item, .hb-zw3-arrow { transition: none; }
  .hb-zw3-cone, .hb-zw3-mote, .hb-zw3-title, .hb-zw3-sub { animation: none; }
}
`;

function Chevron({ dir }: { dir: 1 | -1 }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={dir === 1 ? "M6 3.5 10.5 8 6 12.5" : "M10 3.5 5.5 8 10 12.5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GalleryBackstage({
  images,
  value,
  defaultValue = 0,
  onChange,
  idle = true,
  interval = 2600,
  height = 320,
  light = "#fff2d6",
  accent = "#2f7bff",
  label = "Gallery",
  className,
  style,
  ...rest
}: GalleryBackstageProps) {
  const list = images && images.length ? images : sampleImages;
  const n = list.length;
  const [inner, setInner] = React.useState(Math.min(Math.max(defaultValue, 0), n - 1));
  const current = Math.min(Math.max(value ?? inner, 0), n - 1);
  const [dragX, setDragX] = React.useState<number | null>(null);
  const [inside, setInside] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const drag = React.useRef<{ id: number; x: number; moved: boolean } | null>(null);
  const dirRef = React.useRef(1);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = React.useCallback(
    (next: number, fromUser: boolean) => {
      const k = Math.min(Math.max(next, 0), n - 1);
      if (value === undefined) setInner(k);
      if (fromUser && k !== current) onChange?.(k);
    },
    [n, value, current, onChange],
  );

  React.useEffect(() => {
    if (!idle || inside || focused || !visible || value !== undefined || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      setInner((c) => {
        let d = dirRef.current;
        if (c + d > n - 1 || c + d < 0) d = -d;
        dirRef.current = d;
        return c + d;
      });
    }, interval);
    return () => window.clearInterval(t);
  }, [idle, inside, focused, visible, value, n, interval]);

  const fraction = (clientX: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return 0.5;
    return Math.min(Math.max((clientX - r.left) / r.width, 0), 0.9999);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest(".hb-zw3-arrow")) return;
    drag.current = { id: e.pointerId, x: e.clientX, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved) {
      if (Math.abs(e.clientX - d.x) < 5) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const f = fraction(e.clientX);
    setDragX(f);
    go(Math.floor(Math.min(Math.max((f - 0.06) / 0.88, 0), 0.9999) * n), true);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.moved) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
      setDragX(null);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = current + 1;
    else if (e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    const k = Math.min(Math.max(next, 0), n - 1);
    go(k, true);
    if ((e.target as HTMLElement).classList.contains("hb-zw3-item")) itemRefs.current[k]?.focus();
  };

  const x = dragX !== null ? dragX * 100 : 6 + ((current + 0.5) / n) * 88;
  const item = list[current];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="gallery"
      aria-label={label}
      className={className ? `hb-zw3 ${className}` : "hb-zw3"}
      style={
        {
          "--hb-zw3-accent": accent,
          "--hb-zw3-light": light,
          "--hb-zw3-h": `${height}px`,
          "--hb-zw3-n": n,
          ...style,
        } as React.CSSProperties
      }
      onPointerEnter={() => setInside(true)}
      onPointerLeave={() => setInside(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-gallery-backstage" precedence="default">
        {css}
      </style>
      <div
        ref={stageRef}
        className="hb-zw3-stage"
        data-drag={dragX !== null ? "true" : "false"}
        style={{ "--hb-zw3-x": `${x.toFixed(2)}%` } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="hb-zw3-wall" />
        <div className="hb-zw3-floor" />
        <div className="hb-zw3-pool" />
        {list.map((img, i) => (
          <button
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            className="hb-zw3-item"
            data-on={i === current ? "true" : "false"}
            aria-label={img.title}
            aria-current={i === current ? "true" : undefined}
            tabIndex={i === current ? 0 : -1}
            style={{ "--hb-zw3-i": i, backgroundImage: imageUrl(img.src, i) } as React.CSSProperties}
            onClick={() => go(i, true)}
          />
        ))}
        <div className="hb-zw3-beam" aria-hidden="true">
          <div className="hb-zw3-cone" />
          {motes.map((m, i) => (
            <span
              key={i}
              className="hb-zw3-mote"
              style={
                {
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  width: `${m.size}px`,
                  height: `${m.size}px`,
                  "--hb-zw3-md": `${m.dur}s`,
                  "--hb-zw3-mdl": `${m.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="hb-zw3-lamp" />
        </div>
        <div className="hb-zw3-cap" key={current} aria-live="polite">
          <p className="hb-zw3-title">{item.title}</p>
          {item.caption ? <p className="hb-zw3-sub">{item.caption}</p> : null}
        </div>
        <button
          type="button"
          className="hb-zw3-arrow hb-zw3-left"
          aria-label="Previous image"
          disabled={current === 0}
          onClick={() => go(current - 1, true)}
        >
          <Chevron dir={-1} />
        </button>
        <button
          type="button"
          className="hb-zw3-arrow hb-zw3-right"
          aria-label="Next image"
          disabled={current === n - 1}
          onClick={() => go(current + 1, true)}
        >
          <Chevron dir={1} />
        </button>
      </div>
    </div>
  );
}
