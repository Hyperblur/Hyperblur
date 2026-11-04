"use client";

import * as React from "react";

export type GalleryGridExpandImage = { src?: string; title: string; caption?: string };

export interface GalleryGridExpandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  images?: GalleryGridExpandImage[];
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (index: number | null) => void;
  columns?: number;
  gap?: number;
  ratio?: string;
  idle?: boolean;
  accent?: string;
  label?: string;
}

const sampleImages: GalleryGridExpandImage[] = [
  { title: "Dune Hour", caption: "Erg Chebbi, Morocco. Shot from the ridge twenty minutes before sunset." },
  { title: "Harbor Lights", caption: "Lisbon, Portugal. The waterfront an hour after the rain stopped." },
  { title: "Glacier Line", caption: "Jokulsarlon, Iceland. Icebergs drifting out toward the sea." },
  { title: "Pine Ridge", caption: "Cascade Range, Oregon. Morning fog lifting off the valley." },
  { title: "Polar Night", caption: "Tromso, Norway. A quiet aurora over the fjord at 1 a.m." },
  { title: "Sun Room", caption: "Brooklyn studio. Clay, glass and the first light of the day." },
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
.hb-zw4 {
  --hb-zw4-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-zw4 *, .hb-zw4 *::before, .hb-zw4 *::after { box-sizing: border-box; }
.hb-zw4-grid {
  display: grid;
  grid-template-columns: repeat(var(--hb-zw4-cols), minmax(0, 1fr));
  gap: var(--hb-zw4-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-zw4-grid li { margin: 0; padding: 0; min-width: 0; }
.hb-zw4-card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: var(--hb-zw4-ratio);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #171717;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: opacity 0.35s ease, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zw4-card:hover { transform: translateY(-2px); }
.hb-zw4-card:focus-visible { box-shadow: 0 0 0 2px var(--hb-zw4-accent); }
.hb-zw4-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.55));
  pointer-events: none;
}
.hb-zw4-cbg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zw4-card:hover .hb-zw4-cbg { transform: scale(1.06); }
.hb-zw4-ctitle {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 6px;
  z-index: 1;
  font-size: 0.74em;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-zw4[data-open="true"] .hb-zw4-card { opacity: 0.25; transform: none; }
.hb-zw4-panel {
  position: absolute;
  inset: 0;
  z-index: 5;
  overflow: hidden;
  border-radius: 14px;
  background: #111111;
  clip-path: inset(0 0 0 0 round 14px);
}
.hb-zw4-pimg {
  position: absolute;
  inset: 0;
  transform-origin: 50% 50%;
}
.hb-zw4-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.45s ease;
}
.hb-zw4-layer[data-on="true"] { opacity: 1; }
.hb-zw4-info {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12px 12px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 32%, transparent 45%, rgba(0, 0, 0, 0.78) 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.hb-zw4-panel[data-phase="open"] .hb-zw4-info { opacity: 1; transition: opacity 0.4s 0.22s ease; }
.hb-zw4-top, .hb-zw4-bottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hb-zw4-bottom { align-items: flex-end; }
.hb-zw4-text { min-width: 0; }
.hb-zw4-index {
  margin: 0 0 3px;
  font-size: 0.68em;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;
  color: rgba(237, 237, 237, 0.7);
}
.hb-zw4-title { margin: 0; font-size: 1.3em; font-weight: 600; line-height: 1.15; letter-spacing: -0.015em; }
.hb-zw4-caption {
  margin: 4px 0 0;
  max-width: 34em;
  font-size: 0.8em;
  line-height: 1.4;
  color: rgba(237, 237, 237, 0.78);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hb-zw4-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin: 0;
  padding: 0 11px 0 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.55);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: #ededed;
  font: inherit;
  font-size: 0.78em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.hb-zw4-btn:hover { background: rgba(10, 10, 10, 0.8); }
.hb-zw4-btn:focus-visible { outline: 2px solid var(--hb-zw4-accent); outline-offset: 2px; }
.hb-zw4-btn svg { width: 13px; height: 13px; flex: none; }
.hb-zw4-round { width: 28px; padding: 0; justify-content: center; }
.hb-zw4-pair { display: flex; gap: 6px; flex: none; }
@container (max-width: 260px) {
  .hb-zw4-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zw4-card, .hb-zw4-cbg, .hb-zw4-layer, .hb-zw4-info, .hb-zw4-btn { transition: none !important; }
  .hb-zw4-card:hover, .hb-zw4-card:hover .hb-zw4-cbg { transform: none; }
}
`;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const DURATION = 560;

export function GalleryGridExpand({
  images,
  value,
  defaultValue = null,
  onChange,
  columns = 3,
  gap = 8,
  ratio = "4 / 3",
  idle = true,
  accent = "#2f7bff",
  label = "Gallery",
  className,
  style,
  onKeyDown,
  ...rest
}: GalleryGridExpandProps) {
  const list = images && images.length ? images : sampleImages;
  const n = list.length;
  const [inner, setInner] = React.useState<number | null>(defaultValue);
  const raw = value !== undefined ? value : inner;
  const open = raw === null || raw < 0 || raw >= n ? null : raw;
  const [prevOpen, setPrevOpen] = React.useState<number | null>(open);
  const [shown, setShown] = React.useState<number | null>(open);
  const [hover, setHover] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLButtonElement>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpen = React.useRef<number | null>(open);
  const userAction = React.useRef(false);
  const idleOpened = React.useRef(false);
  const lastIdle = React.useRef(-1);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open !== null) setShown(open);
  }

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const request = React.useCallback(
    (next: number | null, fromUser: boolean) => {
      userAction.current = fromUser;
      if (fromUser) idleOpened.current = false;
      if (value === undefined) setInner(next);
      if (fromUser) onChange?.(next);
    },
    [value, onChange],
  );

  React.useLayoutEffect(() => {
    const before = lastOpen.current;
    lastOpen.current = open;
    const root = rootRef.current;
    const panel = panelRef.current;
    const img = imgRef.current;
    if (!root || !panel || !img) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const geometry = (i: number) => {
      const card = cardRefs.current[i];
      const rr = root.getBoundingClientRect();
      if (!card || rr.width === 0 || rr.height === 0) return null;
      const cr = card.getBoundingClientRect();
      const x = cr.left - rr.left;
      const y = cr.top - rr.top;
      const s = Math.max(cr.width / rr.width, cr.height / rr.height);
      const dx = x + cr.width / 2 - rr.width / 2;
      const dy = y + cr.height / 2 - rr.height / 2;
      return {
        clip: `inset(${y.toFixed(1)}px ${(rr.width - x - cr.width).toFixed(1)}px ${(rr.height - y - cr.height).toFixed(1)}px ${x.toFixed(1)}px round 10px)`,
        transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${s.toFixed(4)})`,
      };
    };
    const full = { clip: "inset(0px 0px 0px 0px round 14px)", transform: "translate(0px, 0px) scale(1)" };
    const apply = (g: { clip: string; transform: string }, animate: boolean) => {
      const t = animate && !reduce ? `clip-path ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}` : "none";
      panel.style.transition = t;
      img.style.transition = t;
      panel.style.clipPath = g.clip;
      img.style.transform = g.transform;
    };

    if (open !== null && before === null) {
      const g = geometry(open);
      if (g) {
        apply(g, false);
        panel.dataset.phase = "from";
        void panel.getBoundingClientRect();
      }
      apply(full, true);
      panel.dataset.phase = "open";
      if (userAction.current) backRef.current?.focus({ preventScroll: true });
      return;
    }
    if (open === null && before !== null) {
      const g = geometry(before);
      panel.dataset.phase = "closing";
      if (userAction.current) cardRefs.current[before]?.focus({ preventScroll: true });
      if (g && !reduce) {
        apply(g, true);
        const t = window.setTimeout(() => {
          if (lastOpen.current === null) setShown(null);
        }, DURATION + 20);
        return () => window.clearTimeout(t);
      }
      setShown(null);
    }
  }, [open]);

  React.useEffect(() => {
    if (!idle || value !== undefined || hover || focused || !visible || n < 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (open !== null && !idleOpened.current) return;
    const t = window.setTimeout(
      () => {
        if (open === null) {
          idleOpened.current = true;
          userAction.current = false;
          lastIdle.current = (lastIdle.current + 1) % n;
          setInner(lastIdle.current);
        } else {
          userAction.current = false;
          setInner(null);
        }
      },
      open === null ? 1500 : 2600,
    );
    return () => window.clearTimeout(t);
  }, [idle, value, hover, focused, visible, open, n]);


  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (open !== null) {
      if (e.key === "Escape") {
        e.preventDefault();
        request(null, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        request((open + 1) % n, true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        request((open - 1 + n) % n, true);
      }
      return;
    }
    const i = cardRefs.current.findIndex((el) => el === document.activeElement);
    if (i < 0) return;
    const cols = Math.max(1, Math.min(columns, n));
    let next: number | null = null;
    if (e.key === "ArrowRight") next = i + 1;
    else if (e.key === "ArrowLeft") next = i - 1;
    else if (e.key === "ArrowDown") next = i + cols;
    else if (e.key === "ArrowUp") next = i - cols;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null || next < 0 || next >= n) return;
    e.preventDefault();
    cardRefs.current[next]?.focus();
  };

  const item = shown !== null ? list[shown] : null;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="gallery"
      aria-label={label}
      data-open={open !== null ? "true" : "false"}
      className={className ? `hb-zw4 ${className}` : "hb-zw4"}
      style={
        {
          "--hb-zw4-accent": accent,
          "--hb-zw4-cols": columns,
          "--hb-zw4-gap": `${gap}px`,
          "--hb-zw4-ratio": ratio,
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
      onKeyDown={keyDown}
      {...rest}
    >
      <style href="hb-gallery-grid-expand" precedence="default">
        {css}
      </style>
      <ul className="hb-zw4-grid">
        {list.map((img, i) => (
          <li key={i}>
            <button
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              className="hb-zw4-card"
              aria-label={`Open ${img.title}`}
              aria-expanded={open === i}
              tabIndex={open !== null ? -1 : 0}
              onClick={() => request(i, true)}
            >
              <span className="hb-zw4-cbg" style={{ backgroundImage: imageUrl(img.src, i) }} />
              <span className="hb-zw4-ctitle">{img.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {item !== null && shown !== null ? (
        <div
          ref={panelRef}
          className="hb-zw4-panel"
          role="dialog"
          aria-label={item.title}
          data-phase="from"
        >
          <div ref={imgRef} className="hb-zw4-pimg">
            {list.map((img, i) => (
              <div
                key={i}
                className="hb-zw4-layer"
                data-on={i === shown ? "true" : "false"}
                style={{ backgroundImage: imageUrl(img.src, i) }}
              />
            ))}
          </div>
          <div className="hb-zw4-info">
            <div className="hb-zw4-top">
              <button ref={backRef} type="button" className="hb-zw4-btn" onClick={() => request(null, true)}>
                <Icon d="M10 3.5 5.5 8 10 12.5" />
                Back
              </button>
            </div>
            <div className="hb-zw4-bottom">
              <div className="hb-zw4-text" aria-live="polite">
                <p className="hb-zw4-index">
                  {String(shown + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </p>
                <p className="hb-zw4-title">{item.title}</p>
                {item.caption ? <p className="hb-zw4-caption">{item.caption}</p> : null}
              </div>
              {n > 1 ? (
                <div className="hb-zw4-pair">
                  <button
                    type="button"
                    className="hb-zw4-btn hb-zw4-round"
                    aria-label="Previous image"
                    onClick={() => request(((shown - 1) % n + n) % n, true)}
                  >
                    <Icon d="M10 3.5 5.5 8 10 12.5" />
                  </button>
                  <button
                    type="button"
                    className="hb-zw4-btn hb-zw4-round"
                    aria-label="Next image"
                    onClick={() => request((shown + 1) % n, true)}
                  >
                    <Icon d="M6 3.5 10.5 8 6 12.5" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
