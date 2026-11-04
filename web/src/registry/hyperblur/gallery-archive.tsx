"use client";

import * as React from "react";

export type GalleryArchiveImage = {
  src?: string;
  title: string;
  caption?: string;
  year?: string | number;
  tag?: string;
};

export interface GalleryArchiveProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect"> {
  images?: GalleryArchiveImage[];
  onChange?: (index: number | null) => void;
  onSelect?: (index: number) => void;
  idle?: boolean;
  previewWidth?: number;
  showHeader?: boolean;
  columns?: [string, string, string];
  accent?: string;
  label?: string;
}

const sampleImages: GalleryArchiveImage[] = [
  { title: "Dune Hour", caption: "Erg Chebbi, Morocco", year: 2024, tag: "Landscape" },
  { title: "Harbor Lights", caption: "Lisbon, Portugal", year: 2023, tag: "City" },
  { title: "Glacier Line", caption: "Jokulsarlon, Iceland", year: 2022, tag: "Water" },
  { title: "Pine Ridge", caption: "Cascade Range, Oregon", year: 2021, tag: "Forest" },
  { title: "Polar Night", caption: "Tromso, Norway", year: 2020, tag: "Night" },
  { title: "Sun Room", caption: "Studio, Brooklyn", year: 2019, tag: "Studio" },
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
.hb-zw2 {
  --hb-zw2-accent: #2f7bff;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  container-type: inline-size;
}
.hb-zw2 *, .hb-zw2 *::before, .hb-zw2 *::after { box-sizing: border-box; }
.hb-zw2-head, .hb-zw2-row {
  display: grid;
  grid-template-columns: 3.6em minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 1em;
}
.hb-zw2-head {
  padding: 0 0.3em 0.55em;
  font-size: 0.68em;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8f8f8f;
}
.hb-zw2-head span:last-child { text-align: right; }
.hb-zw2-list { list-style: none; margin: 0; padding: 0; border-bottom: 1px solid #222222; }
.hb-zw2-list li { margin: 0; padding: 0; }
.hb-zw2-row {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0.6em 0.3em;
  border: 0;
  border-top: 1px solid #222222;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: opacity 0.35s ease, color 0.35s ease;
}
.hb-zw2[data-active="true"] .hb-zw2-row { opacity: 0.32; }
.hb-zw2[data-active="true"] .hb-zw2-row[data-on="true"] { opacity: 1; }
.hb-zw2-row:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-zw2-accent); border-radius: 6px; }
.hb-zw2-year {
  font-size: 0.78em;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: #8f8f8f;
}
.hb-zw2-title {
  display: flex;
  align-items: baseline;
  gap: 0.5em;
  min-width: 0;
  font-size: 1.16em;
  line-height: 1.3;
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zw2-title span { overflow: hidden; text-overflow: ellipsis; }
.hb-zw2-row[data-on="true"] .hb-zw2-title { transform: translateX(0.4em); }
.hb-zw2-dot {
  flex: none;
  width: 0.4em;
  height: 0.4em;
  border-radius: 999px;
  background: var(--hb-zw2-accent);
  align-self: center;
  transform: scale(0);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hb-zw2-row[data-on="true"] .hb-zw2-dot { transform: scale(1); }
.hb-zw2-tag {
  justify-self: end;
  padding: 0.2em 0.65em;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  font-size: 0.68em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a1a1a1;
  white-space: nowrap;
}
.hb-zw2-float {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: var(--hb-zw2-pw);
  aspect-ratio: 4 / 3;
  pointer-events: none;
  will-change: transform;
}
.hb-zw2-card {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 10px;
  background: #171717;
  box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-zw2-card[data-show="true"] { opacity: 1; transform: scale(1); }
.hb-zw2-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.12);
  transition: opacity 0.4s ease, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.hb-zw2-layer[data-on="true"] { opacity: 1; transform: scale(1); }
.hb-zw2-label {
  position: absolute;
  left: 8px;
  bottom: 7px;
  max-width: calc(100% - 16px);
  padding: 0.25em 0.6em;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.6);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  font-size: 0.66em;
  color: #ededed;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@container (max-width: 300px) {
  .hb-zw2-head, .hb-zw2-row { grid-template-columns: 3em minmax(0, 1fr); }
  .hb-zw2-tag, .hb-zw2-head span:last-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-zw2-row, .hb-zw2-title, .hb-zw2-dot, .hb-zw2-card, .hb-zw2-layer { transition: none; }
  .hb-zw2-layer, .hb-zw2-card { transform: none; }
}
`;

type Vec = { x: number; y: number };

export function GalleryArchive({
  images,
  onChange,
  onSelect,
  idle = true,
  previewWidth = 200,
  showHeader = true,
  columns = ["Year", "Title", "Type"],
  accent = "#2f7bff",
  label = "Archive",
  className,
  style,
  ...rest
}: GalleryArchiveProps) {
  const list = images && images.length ? images : sampleImages;
  const n = list.length;
  const [active, setActive] = React.useState<number | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const floatRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = React.useRef<number | null>(null);
  const userRef = React.useRef(false);
  const target = React.useRef<Vec>({ x: 0, y: 0 });
  const pos = React.useRef<Vec | null>(null);
  const onChangeRef = React.useRef(onChange);
  const resumeRef = React.useRef(0);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setAct = React.useCallback((i: number | null, fromUser: boolean) => {
    if (activeRef.current === i) return;
    activeRef.current = i;
    setActive(i);
    if (fromUser) onChangeRef.current?.(i);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    const float = floatRef.current;
    if (!root || !float) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    let last = 0;
    let idleIndex = -1;
    let idleAt = 0;
    let tilt = 0;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !raf) raf = requestAnimationFrame(tick);
          })
        : null;
    io?.observe(root);

    const rowCenter = (i: number) => {
      const row = rowRefs.current[i];
      if (!row) return root.clientHeight / 2;
      const rr = root.getBoundingClientRect();
      const br = row.getBoundingClientRect();
      return br.top - rr.top + br.height / 2;
    };

    function tick(t: number) {
      raf = 0;
      if (!visible || !root || !float) return;
      const W = root.clientWidth;
      const H = root.clientHeight;
      const fw = float.offsetWidth;
      const fh = float.offsetHeight;
      if (idle && !userRef.current && !reduce && t >= resumeRef.current) {
        if (!idleAt) idleAt = t + 700;
        if (t >= idleAt) {
          idleIndex = (idleIndex + 1) % n;
          idleAt = t + 1800;
          setAct(idleIndex, false);
        }
        if (idleIndex >= 0) {
          target.current = {
            x: W * (0.64 + 0.07 * Math.sin(t / 900)),
            y: rowCenter(idleIndex) + 6 * Math.cos(t / 700),
          };
        }
      }
      const tx = Math.min(Math.max(target.current.x, fw / 2 + 2), W - fw / 2 - 2);
      const ty = Math.min(Math.max(target.current.y, fh / 2 + 2), Math.max(H - fh / 2 - 2, fh / 2 + 2));
      const dt = last ? Math.min(t - last, 64) : 16;
      last = t;
      if (!pos.current || reduce) pos.current = { x: tx, y: ty };
      const k = 1 - Math.pow(0.82, dt / 16);
      const vx = (tx - pos.current.x) * k;
      pos.current = { x: pos.current.x + vx, y: pos.current.y + (ty - pos.current.y) * k };
      tilt += (Math.max(-9, Math.min(9, vx * 0.6)) - tilt) * 0.12;
      float.style.transform = `translate3d(${(pos.current.x - fw / 2).toFixed(1)}px, ${(pos.current.y - fh / 2).toFixed(1)}px, 0) rotate(${(reduce ? 0 : tilt).toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [idle, n, setAct]);

  const toLocal = (e: React.PointerEvent) => {
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return;
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const leave = () => {
    userRef.current = false;
    resumeRef.current = performance.now() + 1400;
    setAct(null, true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = rowRefs.current.findIndex((el) => el === document.activeElement);
    if (i < 0) return;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = Math.min(n - 1, i + 1);
    else if (e.key === "ArrowUp") next = Math.max(0, i - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === "Escape") {
      (document.activeElement as HTMLElement | null)?.blur();
      leave();
      return;
    }
    if (next === null) return;
    e.preventDefault();
    rowRefs.current[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={label}
      data-active={active !== null ? "true" : "false"}
      className={className ? `hb-zw2 ${className}` : "hb-zw2"}
      style={{ "--hb-zw2-accent": accent, "--hb-zw2-pw": `${previewWidth}px`, ...style } as React.CSSProperties}
      onPointerMove={(e) => {
        userRef.current = true;
        toLocal(e);
      }}
      onPointerDown={(e) => {
        userRef.current = true;
        toLocal(e);
      }}
      onPointerLeave={(e) => {
        if (e.currentTarget.contains(document.activeElement)) return;
        leave();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) leave();
      }}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <style href="hb-gallery-archive" precedence="default">
        {css}
      </style>
      {showHeader ? (
        <div className="hb-zw2-head" aria-hidden="true">
          <span>{columns[0]}</span>
          <span>{columns[1]}</span>
          <span>{columns[2]}</span>
        </div>
      ) : null}
      <ul className="hb-zw2-list">
        {list.map((img, i) => (
          <li key={i}>
            <button
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              type="button"
              className="hb-zw2-row"
              data-on={active === i ? "true" : "false"}
              aria-label={[img.title, img.caption, img.year, img.tag].filter(Boolean).join(", ")}
              onPointerEnter={() => {
                userRef.current = true;
                setAct(i, true);
              }}
              onFocus={() => {
                userRef.current = true;
                const root = rootRef.current;
                const row = rowRefs.current[i];
                if (root && row) {
                  const rr = root.getBoundingClientRect();
                  const br = row.getBoundingClientRect();
                  target.current = { x: rr.width * 0.68, y: br.top - rr.top + br.height / 2 };
                }
                setAct(i, true);
              }}
              onClick={() => onSelect?.(i)}
            >
              <span className="hb-zw2-year">{img.year ?? String(i + 1).padStart(2, "0")}</span>
              <span className="hb-zw2-title">
                <i className="hb-zw2-dot" aria-hidden="true" />
                <span>{img.title}</span>
              </span>
              {img.tag ? <span className="hb-zw2-tag">{img.tag}</span> : <span />}
            </button>
          </li>
        ))}
      </ul>
      <div ref={floatRef} className="hb-zw2-float" aria-hidden="true">
        <div className="hb-zw2-card" data-show={active !== null ? "true" : "false"}>
          {list.map((img, i) => (
            <div
              key={i}
              className="hb-zw2-layer"
              data-on={active === i ? "true" : "false"}
              style={{ backgroundImage: imageUrl(img.src, i) }}
            />
          ))}
          {active !== null && list[active].caption ? <span className="hb-zw2-label">{list[active].caption}</span> : null}
        </div>
      </div>
    </div>
  );
}
