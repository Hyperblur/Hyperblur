"use client";

import * as React from "react";

export interface CursorPreviewProject {
  name: string;
  client: string;
  discipline: string;
  year: string;
  hue: number;
  href: string;
  tagline?: string;
}

export interface ShowcaseCursorPreviewProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  projects?: CursorPreviewProject[];
  defaultActive?: number | null;
  cta?: { label: string; href: string };
  accent?: string;
  onProjectSelect?: (project: CursorPreviewProject, index: number) => void;
}

const defaultProjects: CursorPreviewProject[] = [
  { name: "Halden Bank", client: "Halden Financial", discipline: "Product design", year: "2026", hue: 214, href: "#", tagline: "Mobile banking for 2.4M members" },
  { name: "Quill Studio", client: "Quill Labs", discipline: "Brand system", year: "2026", hue: 28, href: "#", tagline: "Identity and type for a writing tool" },
  { name: "Orbital Freight", client: "Orbital Logistics", discipline: "Dashboard", year: "2025", hue: 162, href: "#", tagline: "Live fleet tracking across 31 ports" },
  { name: "Maren Health", client: "Maren Clinics", discipline: "Web platform", year: "2025", hue: 336, href: "#", tagline: "Booking flow that cut drop-off by 41%" },
  { name: "Tessellate", client: "Tessellate Audio", discipline: "Motion", year: "2024", hue: 262, href: "#", tagline: "Launch film and interface motion" },
];

const css = `
.hb-we1 {
  --hb-we1-accent: #c8ff3d;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-we1 *, .hb-we1 *::before, .hb-we1 *::after { box-sizing: border-box; }
.hb-we1-inner { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 112px) clamp(18px, 4cqi, 40px); }
.hb-we1-head { display: grid; gap: 18px; margin-bottom: clamp(28px, 4cqi, 52px); }
.hb-we1-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  margin: 0; color: #8f8f8f; font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px; letter-spacing: .12em; text-transform: uppercase;
}
.hb-we1-eyebrow::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--hb-we1-accent); box-shadow: 0 0 12px var(--hb-we1-accent); }
.hb-we1-title { margin: 0; max-width: 16ch; font-family: var(--font-grotesk, inherit); font-size: clamp(30px, 5cqi, 54px); font-weight: 600; line-height: 1.02; letter-spacing: -.035em; text-wrap: balance; }
.hb-we1-sub { margin: 0; max-width: 46ch; color: #a1a1a1; font-size: 15px; line-height: 1.6; }
.hb-we1-cta { justify-self: start; display: inline-flex; align-items: center; gap: 8px; color: #ededed; font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.2); padding-bottom: 3px; transition: border-color .25s ease, gap .25s cubic-bezier(.2,.7,.2,1); }
.hb-we1-cta:hover { border-color: var(--hb-we1-accent); gap: 12px; }
.hb-we1-cta:focus-visible { outline: 2px solid var(--hb-we1-accent); outline-offset: 4px; border-radius: 2px; }
.hb-we1-wrap { position: relative; }
.hb-we1-list { position: relative; margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255,255,255,.08); }
.hb-we1-item { border-bottom: 1px solid rgba(255,255,255,.08); }
.hb-we1-row {
  position: relative; display: grid; grid-template-columns: 56px 1fr auto; align-items: center; gap: 14px;
  padding: clamp(16px, 2.4cqi, 26px) 4px; color: inherit; text-decoration: none; outline: none;
  transition: opacity .35s ease;
}
.hb-we1-row::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px;
  background: var(--hb-we1-accent); transform: scaleX(0); transform-origin: left;
  transition: transform .6s cubic-bezier(.2,.8,.2,1);
}
.hb-we1-wrap[data-active="true"] .hb-we1-row { opacity: .32; }
.hb-we1-wrap[data-active="true"] .hb-we1-row[data-on="true"] { opacity: 1; }
.hb-we1-row[data-on="true"]::after { transform: scaleX(1); }
.hb-we1-row:focus-visible { box-shadow: inset 0 0 0 2px var(--hb-we1-accent); border-radius: 6px; }
.hb-we1-idx { color: #6b6b6b; font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .06em; }
.hb-we1-thumb { display: none; width: 56px; height: 56px; border-radius: 12px; overflow: hidden; position: relative; }
.hb-we1-name {
  display: block; font-family: var(--font-grotesk, inherit); font-size: clamp(26px, 5.6cqi, 64px); font-weight: 600;
  line-height: 1; letter-spacing: -.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: transform .5s cubic-bezier(.2,.8,.2,1), color .3s ease;
}
.hb-we1-row[data-on="true"] .hb-we1-name { transform: translateX(14px); }
.hb-we1-tag { display: block; margin-top: 8px; color: #8f8f8f; font-size: 13px; }
.hb-we1-meta { display: flex; align-items: center; gap: clamp(14px, 3cqi, 40px); color: #a1a1a1; font-size: 13px; }
.hb-we1-meta span { white-space: nowrap; }
.hb-we1-disc { min-width: 112px; }
.hb-we1-year { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; color: #6b6b6b; }
.hb-we1-arrow { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); transition: background .3s ease, color .3s ease, transform .45s cubic-bezier(.2,.8,.2,1); }
.hb-we1-arrow svg { width: 14px; height: 14px; }
.hb-we1-row[data-on="true"] .hb-we1-arrow { background: var(--hb-we1-accent); color: #0a0a0a; transform: rotate(-45deg); box-shadow: none; }
.hb-we1-float {
  position: absolute; left: 0; top: 0; z-index: 3; width: clamp(220px, 30cqi, 340px); aspect-ratio: 4 / 3;
  pointer-events: none; left: var(--hb-we1-x, 68%); top: var(--hb-we1-y, 50%); transform: translate(-50%, -50%);
  will-change: left, top;
}
.hb-we1-card {
  position: absolute; inset: 0; border-radius: 16px; overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.1);
  transform: scale(.4) rotate(var(--hb-we1-tilt, 0deg)); opacity: 0;
  transition: transform .5s cubic-bezier(.2,.9,.25,1.15), opacity .3s ease;
}
.hb-we1-wrap[data-active="true"] .hb-we1-card { transform: scale(1) rotate(var(--hb-we1-tilt, 0deg)); opacity: 1; }
.hb-we1-art { position: absolute; inset: 0; clip-path: inset(100% 0 0 0); transition: clip-path .6s cubic-bezier(.7,0,.2,1); }
.hb-we1-art[data-on="true"] { clip-path: inset(0 0 0 0); z-index: 1; }
.hb-we1-art svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-we1-art[data-on="true"] svg { animation: hb-we1-push 1.2s cubic-bezier(.2,.8,.2,1) both; }
.hb-we1-label {
  position: absolute; left: 12px; bottom: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 8px;
  height: 30px; padding: 0 12px; border-radius: 999px; background: rgba(10,10,10,.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  color: #fff; font-size: 12px; font-weight: 500; box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
}
.hb-we1-label i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-we1-accent); font-style: normal; }
.hb-we1 em, .hb-we1 i, .hb-we1 cite { font-style: normal; }
@keyframes hb-we1-push { from { transform: scale(1.18); } to { transform: scale(1); } }
@container (max-width: 720px) {
  .hb-we1-disc, .hb-we1-year { display: none; }
}
@container (max-width: 560px) {
  .hb-we1-float { display: none; }
  .hb-we1-idx { display: none; }
  .hb-we1-thumb { display: block; }
  .hb-we1-row { grid-template-columns: 56px 1fr auto; }
  .hb-we1-wrap[data-active="true"] .hb-we1-row { opacity: 1; }
  .hb-we1-row[data-on="true"] .hb-we1-name { transform: none; }
  .hb-we1-thumb .hb-we1-art { clip-path: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-we1 *, .hb-we1 *::before, .hb-we1 *::after { transition: none !important; animation: none !important; }
}
`;

function hash(n: number) {
  let x = (n + 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

function Art({ project, index }: { project: CursorPreviewProject; index: number }) {
  const h = project.hue;
  const bg = `hsl(${h} 45% 12%)`;
  const mid = `hsl(${h} 70% 52%)`;
  const hi = `hsl(${(h + 30) % 360} 90% 72%)`;
  const id = `hb-we1-g${index}`;
  const kind = index % 4;
  const seed = hash(index + 7);
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="30%" cy="20%" r="90%">
          <stop offset="0" stopColor={`hsl(${h} 60% 26%)`} />
          <stop offset="1" stopColor={bg} />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      {kind === 0 && (
        <g>
          <rect x="120" y="34" width="160" height="300" rx="28" fill="#0b0b0d" stroke="rgba(255,255,255,.18)" />
          <rect x="136" y="70" width="128" height="62" rx="12" fill={mid} />
          <text x="148" y="100" fill="#fff" fontSize="11" fontFamily="inherit" opacity=".8">Balance</text>
          <text x="148" y="120" fill="#fff" fontSize="18" fontWeight="700" fontFamily="inherit">$12,480.22</text>
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <circle cx="152" cy={156 + k * 30} r="9" fill={`hsl(${(h + k * 40) % 360} 60% 40%)`} />
              <rect x="170" y={151 + k * 30} width={60 + ((seed >>> (k * 3)) % 30)} height="5" rx="2.5" fill="rgba(255,255,255,.55)" />
              <rect x="170" y={160 + k * 30} width="38" height="4" rx="2" fill="rgba(255,255,255,.22)" />
            </g>
          ))}
        </g>
      )}
      {kind === 1 && (
        <g>
          <text x="200" y="210" textAnchor="middle" fill={hi} fontSize="210" fontWeight="700" fontFamily="inherit" letterSpacing="-12">
            {project.name.charAt(0)}
          </text>
          <rect x="40" y="236" width="320" height="1" fill="rgba(255,255,255,.25)" />
          {["Aa", "Bb", "Cc", "Dd"].map((t, k) => (
            <text key={t} x={56 + k * 84} y="268" fill="rgba(255,255,255,.7)" fontSize="16" fontFamily="inherit">{t}</text>
          ))}
          <circle cx="330" cy="70" r="26" fill={mid} />
        </g>
      )}
      {kind === 2 && (
        <g>
          {Array.from({ length: 9 }, (_, k) => (
            <line key={k} x1="0" y1={30 + k * 30} x2="400" y2={30 + k * 30} stroke="rgba(255,255,255,.06)" />
          ))}
          <path d="M20 230 C 80 200, 110 120, 170 150 S 260 60, 300 90 S 360 70, 384 40" fill="none" stroke={hi} strokeWidth="3" strokeLinecap="round" />
          <path d="M20 230 C 80 200, 110 120, 170 150 S 260 60, 300 90 S 360 70, 384 40 L 384 300 L 20 300 Z" fill={mid} opacity=".18" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={28 + k * 124} y="24" width="110" height="46" rx="10" fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.12)" />
              <text x={40 + k * 124} y="43" fill="rgba(255,255,255,.6)" fontSize="10" fontFamily="inherit">{["Vessels", "On time", "Ports"][k]}</text>
              <text x={40 + k * 124} y="61" fill="#fff" fontSize="15" fontWeight="700" fontFamily="inherit">{["1,204", "96.8%", "31"][k]}</text>
            </g>
          ))}
          <circle cx="300" cy="90" r="6" fill="#fff" />
        </g>
      )}
      {kind === 3 && (
        <g>
          {[110, 80, 50].map((r, k) => (
            <circle key={r} cx="200" cy="150" r={r} fill="none" stroke={k === 2 ? hi : "rgba(255,255,255,.2)"} strokeWidth={k === 2 ? 3 : 1} strokeDasharray={k === 0 ? "3 7" : undefined} />
          ))}
          <circle cx="200" cy="150" r="22" fill={mid} />
          <circle cx={(200 + 110 * Math.cos(0.7)).toFixed(1)} cy={(150 + 110 * Math.sin(0.7)).toFixed(1)} r="8" fill="#fff" />
          <circle cx={(200 + 80 * Math.cos(3.6)).toFixed(1)} cy={(150 + 80 * Math.sin(3.6)).toFixed(1)} r="6" fill={hi} />
          <rect x="28" y="246" width="120" height="26" rx="13" fill="rgba(255,255,255,.1)" />
          <text x="44" y="263" fill="#fff" fontSize="11" fontFamily="inherit">Tuesday · 10:30</text>
        </g>
      )}
    </svg>
  );
}

type Point = { x: number; y: number };

function followStep(f: HTMLDivElement | null, p: Point & { vx: number }, t: Point) {
  if (!f) return false;
  const nx = p.x + (t.x - p.x) * 0.14;
  const ny = p.y + (t.y - p.y) * 0.14;
  p.vx = nx - p.x;
  p.x = nx;
  p.y = ny;
  const tilt = Math.max(-10, Math.min(10, p.vx * 0.6));
  f.style.setProperty("--hb-we1-x", `${p.x.toFixed(1)}px`);
  f.style.setProperty("--hb-we1-y", `${p.y.toFixed(1)}px`);
  f.style.setProperty("--hb-we1-tilt", `${tilt.toFixed(2)}deg`);
  if (Math.abs(t.x - p.x) > 0.3 || Math.abs(t.y - p.y) > 0.3) return true;
  f.style.setProperty("--hb-we1-tilt", "0deg");
  return false;
}

export function ShowcaseCursorPreview({
  eyebrow = "Selected work 2024 to 2026",
  title = "Work that shipped and kept shipping",
  subtitle = "Five engagements across finance, logistics and health. Hover a project to preview it, or tab through the list.",
  projects = defaultProjects,
  defaultActive = null,
  cta = { label: "All case studies", href: "#" },
  accent = "#c8ff3d",
  onProjectSelect,
  className,
  style,
  ...rest
}: ShowcaseCursorPreviewProps) {
  const [active, setActive] = React.useState<number | null>(defaultActive);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const floatRef = React.useRef<HTMLDivElement | null>(null);
  const target = React.useRef({ x: 0, y: 0, set: false });
  const pos = React.useRef({ x: 0, y: 0, vx: 0 });
  const raf = React.useRef(0);

  const moveTo = React.useCallback(
    (x: number, y: number, instant: boolean) => {
      target.current = { x, y, set: true };
      const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (instant || reduce) {
        pos.current = { x, y, vx: 0 };
        const f = floatRef.current;
        if (f) {
          f.style.setProperty("--hb-we1-x", `${x.toFixed(1)}px`);
          f.style.setProperty("--hb-we1-y", `${y.toFixed(1)}px`);
        }
        return;
      }
      if (!raf.current) {
        const loop = () => {
          raf.current = followStep(floatRef.current, pos.current, target.current) ? requestAnimationFrame(loop) : 0;
        };
        raf.current = requestAnimationFrame(loop);
      }
    },
    [],
  );

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top, !target.current.set);
  };

  const onFocusRow = (i: number, el: HTMLElement) => {
    setActive(i);
    const list = listRef.current;
    if (!list) return;
    const lr = list.getBoundingClientRect();
    const rr = el.getBoundingClientRect();
    moveTo(lr.width * 0.68, rr.top - lr.top + rr.height / 2, !target.current.set);
  };

  const n = projects.length;
  const initial = active ?? 0;
  const floatStyle = {
    "--hb-we1-x": "68%",
    "--hb-we1-y": `${(((initial + 0.5) / Math.max(1, n)) * 100).toFixed(2)}%`,
  } as React.CSSProperties;

  return (
    <section
      className={["hb-we1", className].filter(Boolean).join(" ")}
      style={{ "--hb-we1-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-showcase-cursor-preview" precedence="default">{css}</style>
      <div className="hb-we1-inner">
        <header className="hb-we1-head">
          {eyebrow ? <p className="hb-we1-eyebrow">{eyebrow}</p> : null}
          <h2 className="hb-we1-title">{title}</h2>
          {subtitle ? <p className="hb-we1-sub">{subtitle}</p> : null}
          {cta ? (
            <a className="hb-we1-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          ) : null}
        </header>
        <div
          ref={listRef}
          className="hb-we1-wrap"
          data-active={active !== null ? "true" : "false"}
          onPointerMove={onMove}
          onPointerLeave={(e) => {
            if (e.pointerType !== "touch") setActive(null);
          }}
        >
          <div ref={floatRef} className="hb-we1-float" style={floatStyle} aria-hidden="true">
            <div className="hb-we1-card">
              {projects.map((p, i) => (
                <div key={p.name} className="hb-we1-art" data-on={active === i ? "true" : "false"}>
                  <Art project={p} index={i} />
                </div>
              ))}
              <span className="hb-we1-label"><i />View case</span>
            </div>
          </div>
          <ul className="hb-we1-list">
          {projects.map((p, i) => (
            <li key={p.name} className="hb-we1-item">
              <a
                className="hb-we1-row"
                href={p.href}
                data-on={active === i ? "true" : "false"}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") setActive(i);
                }}
                onFocus={(e) => onFocusRow(i, e.currentTarget)}
                onBlur={() => setActive(null)}
                onClick={() => onProjectSelect?.(p, i)}
              >
                <span className="hb-we1-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="hb-we1-thumb" aria-hidden="true">
                  <span className="hb-we1-art" data-on="true"><Art project={p} index={i} /></span>
                </span>
                <span style={{ minWidth: 0 }}>
                  <span className="hb-we1-name">{p.name}</span>
                  {p.tagline ? <span className="hb-we1-tag">{p.client} · {p.tagline}</span> : <span className="hb-we1-tag">{p.client}</span>}
                </span>
                <span className="hb-we1-meta">
                  <span className="hb-we1-disc">{p.discipline}</span>
                  <span className="hb-we1-year">{p.year}</span>
                  <span className="hb-we1-arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </span>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
