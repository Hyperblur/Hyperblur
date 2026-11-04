"use client";

import * as React from "react";

export type GalleryShowcaseImage = { src?: string; title: string; caption?: string };

export interface GalleryShowcaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  images?: GalleryShowcaseImage[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  autoplay?: boolean;
  interval?: number;
  ratio?: string;
  thumbHeight?: number;
  accent?: string;
  label?: string;
}

const sampleImages: GalleryShowcaseImage[] = [
  { title: "Dune Hour", caption: "Erg Chebbi, the last light before dusk" },
  { title: "Harbor Lights", caption: "Lisbon waterfront after the rain" },
  { title: "Glacier Line", caption: "Jokulsarlon lagoon, early blue" },
  { title: "Pine Ridge", caption: "Fog lifting off the Cascades" },
  { title: "Polar Night", caption: "Aurora over the fjord near Tromso" },
  { title: "Sun Room", caption: "Studio still life, morning light" },
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

function wrap(n: number, m: number) {
  return ((n % m) + m) % m;
}

const css = `
.hb-zw1 {
  --hb-zw1-accent: #2f7bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-zw1 *, .hb-zw1 *::before, .hb-zw1 *::after { box-sizing: border-box; }
.hb-zw1-stage {
  position: relative;
  width: 100%;
  aspect-ratio: var(--hb-zw1-ratio);
  overflow: hidden;
  isolation: isolate;
  border: 1px solid #262626;
  border-radius: 14px;
  background: #111111;
}
.hb-zw1-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.07);
  transition: opacity 0.7s ease, transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zw1-layer[data-on="true"] { opacity: 1; transform: scale(1); }
.hb-zw1-shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.66) 100%);
}
.hb-zw1-cap {
  position: absolute;
  left: 14px;
  right: 64px;
  bottom: 11px;
  z-index: 2;
  min-width: 0;
}
.hb-zw1-title {
  margin: 0;
  font-size: 1.08em;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: hb-zw1-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-zw1-sub {
  margin: 2px 0 0;
  font-size: 0.8em;
  line-height: 1.3;
  color: rgba(237, 237, 237, 0.72);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: hb-zw1-rise 0.6s 0.08s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-zw1-count {
  position: absolute;
  right: 13px;
  bottom: 12px;
  z-index: 2;
  font-size: 0.74em;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
  color: rgba(237, 237, 237, 0.7);
}
.hb-zw1-count b { color: #ffffff; font-weight: 600; }
.hb-zw1-nav {
  position: absolute;
  top: 50%;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: -15px 0 0;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.5);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: #ededed;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}
.hb-zw1-nav:hover { background: rgba(10, 10, 10, 0.75); }
.hb-zw1-stage:hover .hb-zw1-nav, .hb-zw1-nav:focus-visible { opacity: 1; }
.hb-zw1-nav:focus-visible { outline: 2px solid var(--hb-zw1-accent); outline-offset: 2px; }
.hb-zw1-prev { left: 10px; }
.hb-zw1-next { right: 10px; }
.hb-zw1-nav svg { width: 14px; height: 14px; }
.hb-zw1-thumbs {
  display: flex;
  gap: 6px;
  height: var(--hb-zw1-th);
  padding: 2px;
  margin: -2px;
  overflow-x: auto;
  scrollbar-width: none;
}
.hb-zw1-thumbs::-webkit-scrollbar { display: none; }
.hb-zw1-thumb {
  position: relative;
  flex: 1 1 0;
  min-width: 40px;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 9px;
  overflow: hidden;
  background: #171717;
  cursor: pointer;
  opacity: 0.5;
  outline: none;
  transition: opacity 0.25s ease;
}
.hb-zw1-thumb:hover { opacity: 0.85; }
.hb-zw1-thumb[aria-selected="true"] { opacity: 1; }
.hb-zw1-thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: box-shadow 0.25s ease;
}
.hb-zw1-thumb[aria-selected="true"]::after { box-shadow: inset 0 0 0 2px var(--hb-zw1-accent); }
.hb-zw1-thumb:focus-visible::after { box-shadow: inset 0 0 0 2px #ffffff; }
.hb-zw1-tbg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zw1-thumb:hover .hb-zw1-tbg { transform: scale(1.08); }
.hb-zw1-bar {
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: 5px;
  z-index: 1;
  height: 2px;
  border-radius: 2px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.28);
}
.hb-zw1-fill {
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
  transform: scaleX(0);
  transform-origin: 0 50%;
  animation: hb-zw1-fill var(--hb-zw1-int) linear forwards;
}
.hb-zw1[data-paused="true"] .hb-zw1-fill { animation-play-state: paused; }
.hb-zw1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@keyframes hb-zw1-fill { to { transform: scaleX(1); } }
@keyframes hb-zw1-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-zw1-layer, .hb-zw1-tbg, .hb-zw1-thumb, .hb-zw1-nav { transition: none; }
  .hb-zw1-layer { transform: none; }
  .hb-zw1-title, .hb-zw1-sub, .hb-zw1-fill { animation: none; }
}
`;

function Arrow({ dir }: { dir: 1 | -1 }) {
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

export function GalleryShowcase({
  images,
  value,
  defaultValue = 0,
  onChange,
  autoplay = true,
  interval = 4200,
  ratio = "16 / 9",
  thumbHeight = 56,
  accent = "#2f7bff",
  label = "Image gallery",
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: GalleryShowcaseProps) {
  const list = images && images.length ? images : sampleImages;
  const n = list.length;
  const [inner, setInner] = React.useState(defaultValue);
  const current = wrap(value ?? inner, n);
  const [cycle, setCycle] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const thumbRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (next: number, focusThumb = false) => {
    const k = wrap(next, n);
    if (value === undefined) setInner(k);
    setCycle((c) => c + 1);
    if (k !== current) onChange?.(k);
    if (focusThumb) thumbRefs.current[k]?.focus();
  };

  const onThumbKey = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = current + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    go(next, true);
  };

  const paused = hover || focused || !visible;
  const item = list[current];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="gallery"
      aria-label={label}
      data-paused={paused ? "true" : "false"}
      className={className ? `hb-zw1 ${className}` : "hb-zw1"}
      style={
        {
          "--hb-zw1-accent": accent,
          "--hb-zw1-ratio": ratio,
          "--hb-zw1-th": `${thumbHeight}px`,
          "--hb-zw1-int": `${interval}ms`,
          ...style,
        } as React.CSSProperties
      }
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setHover(false);
        onPointerLeave?.(e);
      }}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        onBlur?.(e);
      }}
      {...rest}
    >
      <style href="hb-gallery-showcase" precedence="default">
        {css}
      </style>
      <div className="hb-zw1-stage">
        {list.map((img, i) => (
          <div
            key={i}
            className="hb-zw1-layer"
            data-on={i === current ? "true" : "false"}
            role="img"
            aria-label={img.title}
            aria-hidden={i === current ? undefined : true}
            style={{ backgroundImage: imageUrl(img.src, i) }}
          />
        ))}
        <div className="hb-zw1-shade" />
        <div className="hb-zw1-cap" key={current} aria-live="polite">
          <p className="hb-zw1-title">
            {item.title}
          </p>
          {item.caption ? <p className="hb-zw1-sub">{item.caption}</p> : null}
        </div>
        <div className="hb-zw1-count" aria-hidden="true">
          <b>{String(current + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
        </div>
        <button type="button" className="hb-zw1-nav hb-zw1-prev" aria-label="Previous image" onClick={() => go(current - 1)}>
          <Arrow dir={-1} />
        </button>
        <button type="button" className="hb-zw1-nav hb-zw1-next" aria-label="Next image" onClick={() => go(current + 1)}>
          <Arrow dir={1} />
        </button>
      </div>
      <div className="hb-zw1-thumbs" role="tablist" aria-label={`${label} thumbnails`} onKeyDown={onThumbKey}>
        {list.map((img, i) => (
          <button
            key={i}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            className="hb-zw1-thumb"
            aria-selected={i === current}
            aria-label={img.title}
            tabIndex={i === current ? 0 : -1}
            onClick={() => go(i)}
          >
            <span className="hb-zw1-tbg" style={{ backgroundImage: imageUrl(img.src, i) }} />
            {i === current && autoplay && n > 1 ? (
              <span className="hb-zw1-bar" aria-hidden="true">
                <span
                  key={cycle}
                  className="hb-zw1-fill"
                  onAnimationEnd={(e) => {
                    if (e.animationName === "hb-zw1-fill") go(current + 1);
                  }}
                />
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
