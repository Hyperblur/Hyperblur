"use client";

import * as React from "react";

export type DockMark = "orbit" | "wing" | "rays" | "wave" | "pine" | "tiles" | "quill" | "tandem" | "hex";

export interface DockCustomer {
  name: string;
  mark?: DockMark;
  metric: string;
  metricLabel: string;
  quote: string;
  person: string;
  href?: string;
}

export interface ProofLogoDockProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  customers?: DockCustomer[];
  defaultActive?: number;
  magnify?: number;
  linkLabel?: string;
  accent?: string;
  onActiveChange?: (index: number) => void;
}

const css = `
.hb-wb3 {
  --hb-wb3-accent: #f59e0b;
  --hb-wb3-base: clamp(56px, 7.2cqw, 78px);
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wb3 *, .hb-wb3 *::before, .hb-wb3 *::after { box-sizing: border-box; }
.hb-wb3::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 46%;
  width: 900px;
  height: 260px;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-wb3-accent) 12%, transparent), transparent);
  pointer-events: none;
}
.hb-wb3-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 88px 24px 96px; text-align: center; }
.hb-wb3-eyebrow { margin: 0 0 14px; color: #8f8f8f; font-size: 13px; font-weight: 500; }
.hb-wb3-eyebrow b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-wb3-title { margin: 0 auto; max-width: 620px; font-size: clamp(26px, 3.6cqw, 40px); font-weight: 600; line-height: 1.1; letter-spacing: -.035em; text-wrap: balance; }
.hb-wb3-dock {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: calc(var(--hb-wb3-base) * 1.75 + 24px);
  margin: 40px auto 0;
  padding: 0 0 18px;
  list-style: none;
  touch-action: pan-y;
}
.hb-wb3-dock::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: min(100%, 860px);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .16), transparent);
}
.hb-wb3-item { position: relative; display: flex; flex-direction: column; align-items: center; }
.hb-wb3-tile {
  position: relative;
  display: grid;
  place-items: center;
  width: calc(var(--hb-wb3-base) * var(--hb-wb3-s, 1));
  height: calc(var(--hb-wb3-base) * var(--hb-wb3-s, 1));
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22%;
  background: linear-gradient(180deg, #1a1a1a, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .07), 0 12px 24px -14px rgba(0, 0, 0, .9);
  color: #7a7a7a;
  cursor: pointer;
  transition: width .22s cubic-bezier(.2, .8, .2, 1), height .22s cubic-bezier(.2, .8, .2, 1), color .3s ease, border-color .3s ease, background .3s ease;
}
.hb-wb3-tile svg { width: 46%; height: 46%; }
.hb-wb3-tile[aria-pressed="true"] {
  color: #fff;
  border-color: color-mix(in srgb, var(--hb-wb3-accent) 55%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-wb3-accent) 22%, #1a1a1a), #101010);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12), 0 0 0 4px color-mix(in srgb, var(--hb-wb3-accent) 10%, transparent), 0 18px 36px -12px color-mix(in srgb, var(--hb-wb3-accent) 45%, transparent);
}
.hb-wb3-tile:hover { color: #d4d4d4; }
.hb-wb3-tile:focus-visible { outline: 2px solid var(--hb-wb3-accent); outline-offset: 3px; }
.hb-wb3-name {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  padding: 4px 9px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 7px;
  background: #1c1c1c;
  color: #ededed;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translate(-50%, 6px);
  transition: opacity .25s ease, transform .3s cubic-bezier(.2, .8, .2, 1);
  pointer-events: none;
}
.hb-wb3-item[data-on="true"] .hb-wb3-name { opacity: 1; transform: translate(-50%, 0); }
.hb-wb3-dot { position: absolute; bottom: -12px; width: 4px; height: 4px; border-radius: 50%; background: var(--hb-wb3-accent); box-shadow: 0 0 8px var(--hb-wb3-accent); opacity: 0; transition: opacity .3s ease; }
.hb-wb3-item[data-on="true"] .hb-wb3-dot { opacity: 1; }
.hb-wb3-story {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  max-width: 680px;
  margin: 26px auto 0;
  padding: 22px 26px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 20px;
  background: linear-gradient(180deg, #151515, #0f0f0f);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 30px 60px -30px rgba(0, 0, 0, .9);
  text-align: left;
}
.hb-wb3-caret {
  position: absolute;
  top: -7px;
  left: 50%;
  width: 12px;
  height: 12px;
  border-top: 1px solid rgba(255, 255, 255, .08);
  border-left: 1px solid rgba(255, 255, 255, .08);
  background: #151515;
  transform: translateX(-50%) rotate(45deg);
  transition: left .45s cubic-bezier(.2, .8, .2, 1);
}
.hb-wb3-metric { padding-right: 28px; border-right: 1px solid rgba(255, 255, 255, .08); animation: hb-wb3-in .55s cubic-bezier(.2, .8, .2, 1) both; }
.hb-wb3-metric b { display: block; color: var(--hb-wb3-accent); font-size: 40px; font-weight: 600; line-height: 1; letter-spacing: -.045em; font-variant-numeric: tabular-nums; }
.hb-wb3-metric span { display: block; margin-top: 8px; color: #8f8f8f; font-size: 12.5px; max-width: 150px; line-height: 1.4; }
.hb-wb3-body { min-width: 0; animation: hb-wb3-in .55s .08s cubic-bezier(.2, .8, .2, 1) both; }
.hb-wb3-quote { margin: 0; color: #d4d4d4; font-size: 15px; line-height: 1.55; }
.hb-wb3-meta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; margin-top: 12px; }
.hb-wb3-person { color: #8f8f8f; font-size: 13px; }
.hb-wb3-link { display: inline-flex; align-items: center; gap: 6px; color: #ededed; font-size: 13px; font-weight: 500; text-decoration: none; border-radius: 4px; }
.hb-wb3-link svg { transition: transform .3s cubic-bezier(.2, .8, .2, 1); }
.hb-wb3-link:hover svg { transform: translateX(3px); }
.hb-wb3-link:focus-visible { outline: 2px solid var(--hb-wb3-accent); outline-offset: 3px; }
@keyframes hb-wb3-in { from { opacity: 0; transform: translateY(8px); filter: blur(4px); } }
@container (max-width: 640px) {
  .hb-wb3-wrap { padding: 64px 16px 72px; }
  .hb-wb3-dock { flex-wrap: wrap; height: auto; gap: 12px; padding: 34px 0 18px; max-width: 360px; }
  .hb-wb3-tile { width: 64px; height: 64px; }
  .hb-wb3-tile[aria-pressed="true"] { transform: scale(1.08); }
  .hb-wb3-dot { bottom: -8px; }
  .hb-wb3-name { display: none; }
  .hb-wb3-caret { display: none; }
  .hb-wb3-story { grid-template-columns: minmax(0, 1fr); gap: 14px; padding: 20px; }
  .hb-wb3-metric { padding: 0 0 14px; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, .08); }
  .hb-wb3-metric span { max-width: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wb3-tile, .hb-wb3-name, .hb-wb3-caret, .hb-wb3-link svg { transition: none; }
  .hb-wb3-metric, .hb-wb3-body { animation: none; }
}
`;

function Mark({ kind }: { kind: DockMark }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "orbit":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="5" fill="currentColor" />
          <ellipse cx="16" cy="16" rx="13" ry="6" {...p} transform="rotate(-28 16 16)" />
        </svg>
      );
    case "wing":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 22L16 6l4 9 9-3-13 14z" fill="currentColor" />
        </svg>
      );
    case "rays":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="5.5" fill="currentColor" />
          <path d="M16 2v5M16 25v5M2 16h5M25 16h5M6 6l3.5 3.5M22.5 22.5L26 26M26 6l-3.5 3.5M9.5 22.5L6 26" {...p} />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 12c4-4 7-4 10 0s6 4 10 0 5-3 6-2M3 20c4-4 7-4 10 0s6 4 10 0 5-3 6-2" {...p} strokeWidth={2.8} />
        </svg>
      );
    case "pine":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3l7 10h-4l6 9H7l6-9H9z" fill="currentColor" />
          <path d="M16 22v7" {...p} strokeWidth={3} />
        </svg>
      );
    case "tiles":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="4" y="4" width="11" height="11" rx="3" fill="currentColor" />
          <rect x="17" y="4" width="11" height="11" rx="5.5" fill="currentColor" opacity=".55" />
          <rect x="4" y="17" width="11" height="11" rx="5.5" fill="currentColor" opacity=".55" />
          <rect x="17" y="17" width="11" height="11" rx="3" fill="currentColor" />
        </svg>
      );
    case "quill":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M27 4C15 6 8 14 6 27c5-9 11-14 21-16-6-1-9 0-12 2 3-4 7-7 12-9z" fill="currentColor" />
        </svg>
      );
    case "tandem":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="11.5" cy="16" r="8" fill="currentColor" />
          <circle cx="20.5" cy="16" r="8" {...p} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3l11 6.5v13L16 29 5 22.5v-13z" {...p} />
          <path d="M16 10l5.5 3.2v6.6L16 23l-5.5-3.2v-6.6z" fill="currentColor" />
        </svg>
      );
  }
}

const defaultCustomers: DockCustomer[] = [
  { name: "Orbitly", mark: "orbit", metric: "3.1x", metricLabel: "more releases per week", quote: "Our release train went from a monthly event to something nobody notices, which is exactly the point.", person: "Mei Lin, Head of Platform", href: "#orbitly" },
  { name: "Kestrel Air", mark: "wing", metric: "-62%", metricLabel: "incident minutes in a quarter", quote: "On-call used to mean a ruined weekend. Now the pager mostly sleeps and so do we.", person: "James Okoro, SRE lead", href: "#kestrel" },
  { name: "Lumen Energy", mark: "rays", metric: "11 wks", metricLabel: "saved on the grid rollout", quote: "We shipped the field app before the hardware arrived. That had never happened before.", person: "Ingrid Sol, Program director", href: "#lumen" },
  { name: "Halcyon", mark: "wave", metric: "99.99%", metricLabel: "uptime across 14 regions", quote: "Clinics in six countries rely on us at 3am local time. The platform has never been the reason they waited.", person: "Ravi Menon, CTO", href: "#halcyon" },
  { name: "Pinecrest", mark: "pine", metric: "$410k", metricLabel: "infrastructure saved per year", quote: "We turned off two data centers and nobody outside the infra channel noticed.", person: "Beatriz Ortega, VP Engineering", href: "#pinecrest" },
  { name: "Mosaic", mark: "tiles", metric: "48 hrs", metricLabel: "from signed contract to live", quote: "Enterprise onboarding used to be a quarter-long project. Now it is a two-day checklist.", person: "Theo Laurent, Solutions lead", href: "#mosaic" },
  { name: "Quillstack", mark: "quill", metric: "1 day", metricLabel: "for new hires to ship", quote: "The first pull request lands on day one. It sets the tone for the whole job.", person: "Hana Sato, Eng manager", href: "#quillstack" },
  { name: "Tandem", mark: "tandem", metric: "4.2x", metricLabel: "faster preview builds", quote: "Designers review real builds instead of screenshots, and the feedback got sharper overnight.", person: "Lucas Moreau, Design lead", href: "#tandem" },
  { name: "Vertex Labs", mark: "hex", metric: "0", metricLabel: "failed deploys since March", quote: "Automatic rollbacks caught the two bad releases before a single customer saw them.", person: "Amara Diallo, Staff engineer", href: "#vertex" },
];

export function ProofLogoDock({
  eyebrow = "Trusted by 3,400 engineering teams",
  title = "The companies you use every day ship with Relay",
  customers = defaultCustomers,
  defaultActive = 3,
  magnify = 0.7,
  linkLabel = "Read the story",
  accent = "#f59e0b",
  onActiveChange,
  className = "",
  style,
  ...rest
}: ProofLogoDockProps) {
  const uid = React.useId();
  const n = customers.length;
  const start = Math.max(0, Math.min(defaultActive, n - 1));
  const [active, setActive] = React.useState(start);
  const [focus, setFocus] = React.useState<number>(start);
  const dockRef = React.useRef<HTMLUListElement>(null);
  const storyRef = React.useRef<HTMLDivElement>(null);
  const caretRef = React.useRef<HTMLSpanElement>(null);

  const select = (i: number) => {
    if (i !== active) {
      setActive(i);
      onActiveChange?.(i);
    }
  };

  React.useEffect(() => {
    const dock = dockRef.current;
    const story = storyRef.current;
    const caret = caretRef.current;
    if (!dock || !story || !caret) return;
    let raf = 0;
    const t0 = performance.now();
    const place = (now: number) => {
      const tile = dock.children[active] as HTMLElement | undefined;
      if (tile) {
        const a = tile.getBoundingClientRect();
        const b = story.getBoundingClientRect();
        const x = Math.max(20, Math.min(b.width - 20, a.left + a.width / 2 - b.left));
        caret.style.left = `${x.toFixed(1)}px`;
      }
      if (now - t0 < 400) raf = requestAnimationFrame(place);
    };
    raf = requestAnimationFrame(place);
    return () => cancelAnimationFrame(raf);
  }, [active, focus]);

  const onMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const items = Array.from(e.currentTarget.children) as HTMLElement[];
    const first = items[0]?.getBoundingClientRect();
    const last = items[items.length - 1]?.getBoundingClientRect();
    const left = first ? first.left : r.left;
    const right = last ? last.right : r.right;
    const f = ((e.clientX - left) / Math.max(right - left, 1)) * n - 0.5;
    const clamped = Math.max(-0.5, Math.min(n - 0.5, f));
    setFocus(clamped);
    select(Math.max(0, Math.min(n - 1, Math.round(clamped))));
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    setFocus(next);
    const btn = dockRef.current?.children[next]?.querySelector("button");
    btn?.focus();
  };

  const c = customers[active];
  const vars = { "--hb-wb3-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-wb3 ${className}`} style={vars} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-proof-logo-dock" precedence="default">{css}</style>
      <div className="hb-wb3-wrap">
        <p className="hb-wb3-eyebrow">{eyebrow}</p>
        <h2 id={`${uid}-t`} className="hb-wb3-title">{title}</h2>
        <ul ref={dockRef} className="hb-wb3-dock" onPointerMove={onMove} onPointerLeave={() => setFocus(active)}>
          {customers.map((cu, i) => {
            const d = i - focus;
            const s = 1 + Math.max(0, magnify) * Math.exp(-(d * d) / 1.6);
            return (
              <li key={`${cu.name}-${i}`} className="hb-wb3-item" data-on={i === active}>
                <span className="hb-wb3-name" aria-hidden="true">{cu.name}</span>
                <button
                  type="button"
                  className="hb-wb3-tile"
                  aria-pressed={i === active}
                  aria-label={cu.name}
                  aria-controls={`${uid}-s`}
                  tabIndex={i === active ? 0 : -1}
                  style={{ "--hb-wb3-s": s.toFixed(3) } as React.CSSProperties}
                  onClick={() => {
                    select(i);
                    setFocus(i);
                  }}
                  onFocus={() => {
                    select(i);
                    setFocus(i);
                  }}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <Mark kind={cu.mark ?? "hex"} />
                </button>
                <span className="hb-wb3-dot" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
        {c && (
          <div ref={storyRef} id={`${uid}-s`} className="hb-wb3-story" aria-live="polite">
            <span ref={caretRef} className="hb-wb3-caret" aria-hidden="true" />
            <div key={`m${active}`} className="hb-wb3-metric">
              <b>{c.metric}</b>
              <span>{c.metricLabel}</span>
            </div>
            <div key={`b${active}`} className="hb-wb3-body">
              <p className="hb-wb3-quote">{c.quote}</p>
              <div className="hb-wb3-meta">
                <span className="hb-wb3-person">{`${c.person}, ${c.name}`}</span>
                {c.href && (
                  <a className="hb-wb3-link" href={c.href}>
                    {linkLabel}
                    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
