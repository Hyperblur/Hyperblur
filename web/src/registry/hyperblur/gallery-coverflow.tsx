"use client";

import * as React from "react";

export type GalleryCoverflowImage = { src?: string; title: string; caption?: string };

export interface GalleryCoverflowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  images?: GalleryCoverflowImage[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
  autoplay?: boolean;
  interval?: number;
  height?: number;
  angle?: number;
  reflection?: boolean;
  accent?: string;
  label?: string;
}

const sampleImages: GalleryCoverflowImage[] = [
  { title: "Dune Hour", caption: "Erg Chebbi, Morocco" },
  { title: "Harbor Lights", caption: "Lisbon, Portugal" },
  { title: "Glacier Line", caption: "Jokulsarlon, Iceland" },
  { title: "Pine Ridge", caption: "Cascade Range, Oregon" },
  { title: "Polar Night", caption: "Tromso, Norway" },
  { title: "Sun Room", caption: "Brooklyn, New York" },
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

const css = `
.hb-zw5 {
  --hb-zw5-accent: #2f7bff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #ededed;
  font-family: inherit;
}
.hb-zw5 *, .hb-zw5 *::before, .hb-zw5 *::after { box-sizing: border-box; }
.hb-zw5-stage {
  position: relative;
  width: 100%;
  height: var(--hb-zw5-h);
  overflow: hidden;
  perspective: var(--hb-zw5-persp);
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.hb-zw5-stage[data-drag="true"] { cursor: grabbing; }
.hb-zw5-track {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}
.hb-zw5-item {
  position: absolute;
  left: 50%;
  top: var(--hb-zw5-top);
  width: var(--hb-zw5-s);
  height: var(--hb-zw5-s);
  margin: 0 0 0 calc(var(--hb-zw5-s) / -2);
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
}
.hb-zw5-stage[data-drag="true"] .hb-zw5-item { transition: none; }
.hb-zw5-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 6px;
  background-color: #171717;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 14px 30px -12px rgba(0, 0, 0, 0.8);
}
.hb-zw5-shade {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: #000000;
  pointer-events: none;
  transition: opacity 0.6s ease;
}
.hb-zw5-stage[data-drag="true"] .hb-zw5-shade { transition: none; }
.hb-zw5-ref {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 2px);
  height: 100%;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  transform: scaleY(-1);
  opacity: 0.9;
  -webkit-mask-image: linear-gradient(180deg, transparent 58%, rgba(0, 0, 0, 0.42) 100%);
  mask-image: linear-gradient(180deg, transparent 58%, rgba(0, 0, 0, 0.42) 100%);
  pointer-events: none;
}
.hb-zw5-item:focus-visible .hb-zw5-face { box-shadow: 0 0 0 2px var(--hb-zw5-accent), 0 14px 30px -12px rgba(0, 0, 0, 0.8); }
.hb-zw5-floor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34%;
  background: linear-gradient(180deg, transparent, rgba(10, 10, 10, 0.6));
  pointer-events: none;
}
.hb-zw5-cap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 2.6em;
  max-width: 100%;
  margin-top: 4px;
  text-align: center;
}
.hb-zw5-title {
  margin: 0;
  max-width: 100%;
  font-size: 1em;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: hb-zw5-in 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.hb-zw5-sub {
  margin: 1px 0 0;
  max-width: 100%;
  font-size: 0.76em;
  color: #8f8f8f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: hb-zw5-in 0.5s 0.06s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes hb-zw5-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-zw5-item, .hb-zw5-shade { transition: none; }
  .hb-zw5-title, .hb-zw5-sub { animation: none; }
}
`;

export function GalleryCoverflow({
  images,
  value,
  defaultValue,
  onChange,
  autoplay = true,
  interval = 2600,
  height = 300,
  angle = 55,
  reflection = true,
  accent = "#2f7bff",
  label = "Cover flow",
  className,
  style,
  ...rest
}: GalleryCoverflowProps) {
  const list = images && images.length ? images : sampleImages;
  const n = list.length;
  const clamp = (v: number) => Math.min(Math.max(v, 0), n - 1);
  const [inner, setInner] = React.useState(() => clamp(defaultValue ?? Math.floor((n - 1) / 2)));
  const current = clamp(Math.round(value ?? inner));
  const [width, setWidth] = React.useState(360);
  const [dragPos, setDragPos] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const drag = React.useRef<{ id: number; x: number; start: number; moved: boolean; lastX: number; lastT: number; v: number } | null>(null);
  const dirRef = React.useRef(1);

  const size = Math.max(40, Math.min(height * 0.6, width * 0.4));
  const top = Math.max(4, height * 0.42 - size / 2);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(([e]) => setWidth(e.contentRect.width)) : null;
    ro?.observe(el);
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
        : null;
    io?.observe(el);
    return () => {
      ro?.disconnect();
      io?.disconnect();
    };
  }, []);

  const go = React.useCallback(
    (next: number, focusItem = false) => {
      const k = Math.min(Math.max(Math.round(next), 0), n - 1);
      if (value === undefined) setInner(k);
      if (k !== current) onChange?.(k);
      if (focusItem) itemRefs.current[k]?.focus({ preventScroll: true });
    },
    [n, value, current, onChange],
  );

  const goRef = React.useRef(go);
  React.useEffect(() => {
    goRef.current = go;
  }, [go]);

  React.useEffect(() => {
    if (!autoplay || hover || focused || !visible || dragPos !== null || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      let d = dirRef.current;
      if (current + d > n - 1 || current + d < 0) d = -d;
      dirRef.current = d;
      goRef.current(current + d);
    }, interval);
    return () => window.clearInterval(t);
  }, [autoplay, hover, focused, visible, dragPos, n, interval, current]);

  const step = size * 0.45;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, start: current, moved: false, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved) {
      if (Math.abs(e.clientX - d.x) < 5) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    const p = d.start - (e.clientX - d.x) / step;
    setDragPos(Math.min(Math.max(p, -0.45), n - 0.55));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const p = d.start - (e.clientX - d.x) / step - d.v * 6;
    setDragPos(null);
    go(p);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = current + 1;
    else if (e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    go(next, true);
  };

  const pos = dragPos ?? current;
  const item = list[current];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className ? `hb-zw5 ${className}` : "hb-zw5"}
      style={
        {
          "--hb-zw5-accent": accent,
          "--hb-zw5-h": `${height}px`,
          "--hb-zw5-s": `${size.toFixed(1)}px`,
          "--hb-zw5-top": `${top.toFixed(1)}px`,
          "--hb-zw5-persp": `${(size * 3.4).toFixed(0)}px`,
          ...style,
        } as React.CSSProperties
      }
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-gallery-coverflow" precedence="default">
        {css}
      </style>
      <div
        ref={stageRef}
        className="hb-zw5-stage"
        data-drag={dragPos !== null ? "true" : "false"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="hb-zw5-track">
          {list.map((img, i) => {
            const d = i - pos;
            const a = Math.abs(d);
            const sg = d === 0 ? 0 : d > 0 ? 1 : -1;
            const near = Math.min(a, 1);
            const far = Math.max(a - 1, 0);
            const x = sg * (near * size * 0.72 + far * size * 0.3);
            const z = -(near * size * 0.6 + far * size * 0.14);
            const ry = -sg * near * angle;
            const opacity = a > 4.6 ? 0 : Math.min(1, 4.6 - a);
            const bg = imageUrl(img.src, i);
            return (
              <button
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                className="hb-zw5-item"
                aria-label={img.title}
                aria-current={i === current ? "true" : undefined}
                tabIndex={i === current ? 0 : -1}
                style={{
                  transform: `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`,
                  zIndex: 100 - Math.round(a * 10),
                  opacity: Number(opacity.toFixed(3)),
                  pointerEvents: opacity < 0.05 ? "none" : undefined,
                }}
                onClick={() => {
                  if (i !== current) go(i);
                }}
              >
                <span className="hb-zw5-face" style={{ backgroundImage: bg }}>
                  <span className="hb-zw5-shade" style={{ opacity: Number((near * 0.42 + Math.min(far, 3) * 0.08).toFixed(3)) }} />
                </span>
                {reflection ? <span className="hb-zw5-ref" style={{ backgroundImage: bg }} aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
        <div className="hb-zw5-floor" />
      </div>
      <div className="hb-zw5-cap" key={current} aria-live="polite">
        <p className="hb-zw5-title">{item.title}</p>
        {item.caption ? <p className="hb-zw5-sub">{item.caption}</p> : null}
      </div>
    </div>
  );
}
