"use client";

import * as React from "react";

export interface LocalTeamMember {
  name: string;
  role: string;
  specialties: string[];
  years: number;
  colors?: [string, string];
  href?: string;
}

export interface LocalTeamGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  members?: LocalTeamMember[];
  bookLabel?: string;
  cta?: { label: string; href: string };
  accent?: string;
}

const defaultMembers: LocalTeamMember[] = [
  { name: "Camille Durand", role: "Founder, master colorist", specialties: ["Balayage", "Color correction"], years: 14, colors: ["#f4c9c1", "#e79a8f"], href: "#book" },
  { name: "Jonah Reyes", role: "Senior stylist", specialties: ["Precision cuts", "Curly hair"], years: 9, colors: ["#e8d5c4", "#c9a58a"], href: "#book" },
  { name: "Amara Okafor", role: "Texture specialist", specialties: ["Silk press", "Braids", "Treatments"], years: 11, colors: ["#f0d9e2", "#d79bb2"], href: "#book" },
  { name: "Lena Park", role: "Stylist, bridal lead", specialties: ["Updos", "Bridal"], years: 7, colors: ["#e6dfd3", "#b9a68e"], href: "#book" },
];

const skin = ["#f1c7a5", "#c78d62", "#7a4a2e", "#e8b892"];
const hair = ["#3a2a22", "#1f1a17", "#121010", "#5a3b26"];

const css = `
.hb-kl4 {
  --hb-kl4-accent: #d0667a;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: linear-gradient(180deg, #fbf3f1 0%, #f7ece9 100%);
  color: #26201f;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl4 *, .hb-kl4 *::before, .hb-kl4 *::after { box-sizing: border-box; }
.hb-kl4-wrap { max-width: 1120px; margin: 0 auto; padding: 88px 24px 100px; }
.hb-kl4-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 40px; flex-wrap: wrap; }
.hb-kl4-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 14px; color: #8a6c6a; font-size: 13px; font-weight: 500; letter-spacing: .02em; }
.hb-kl4-eyebrow::before { content: ""; width: 28px; height: 1px; background: var(--hb-kl4-accent); }
.hb-kl4-title { margin: 0; max-width: 560px; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: clamp(38px, 5.2cqw, 60px); line-height: 1; letter-spacing: -.02em; color: #221b1a; text-wrap: balance; }
.hb-kl4-title i { color: var(--hb-kl4-accent); }
.hb-kl4-sub { margin: 14px 0 0; max-width: 460px; color: #6f5f5d; font-size: 16px; line-height: 1.6; }
.hb-kl4-cta { display: inline-flex; align-items: center; gap: 8px; padding: 13px 20px; border-radius: 999px; background: #26201f; color: #fbf3f1; font-size: 14.5px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s; }
.hb-kl4-cta:hover { background: var(--hb-kl4-accent); transform: translateY(-1px); }
.hb-kl4-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.hb-kl4-card {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  background: #fffaf8;
  border: 1px solid #efdeda;
  overflow: hidden;
  box-shadow: 0 1px 0 #fff inset, 0 10px 30px -24px rgba(80, 30, 30, .4);
  transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s cubic-bezier(.2,.8,.2,1);
  animation: hb-kl4-in .7s cubic-bezier(.2,.8,.2,1) both;
  animation-delay: calc(var(--hb-kl4-i) * 90ms);
}
@keyframes hb-kl4-in { from { opacity: 0; transform: translateY(20px); } }
.hb-kl4-card:hover, .hb-kl4-card:focus-within { transform: translateY(-8px); box-shadow: 0 1px 0 #fff inset, 0 30px 50px -28px rgba(80, 30, 30, .45); }
.hb-kl4-art { position: relative; aspect-ratio: 4 / 4.4; overflow: hidden; }
.hb-kl4-art svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; transition: transform .6s cubic-bezier(.2,.8,.2,1); }
.hb-kl4-card:hover .hb-kl4-art svg { transform: scale(1.05); }
.hb-kl4-years { position: absolute; top: 12px; left: 12px; padding: 5px 10px; border-radius: 999px; background: rgba(255, 250, 248, .85); backdrop-filter: blur(6px); color: #26201f; font-size: 12px; font-weight: 600; }
.hb-kl4-info { padding: 18px 18px 20px; display: flex; flex-direction: column; flex: 1; }
.hb-kl4-name { margin: 0; font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif); font-weight: 400; font-size: 24px; line-height: 1.1; color: #221b1a; }
.hb-kl4-role { margin: 4px 0 14px; color: #8a6c6a; font-size: 13.5px; }
.hb-kl4-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.hb-kl4-chip { padding: 4px 10px; border-radius: 999px; background: color-mix(in srgb, var(--hb-kl4-accent) 10%, #fff); color: color-mix(in srgb, var(--hb-kl4-accent) 75%, #2a1010); font-size: 12px; font-weight: 500; }
.hb-kl4-book { margin-top: auto; display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; padding-top: 14px; border-top: 1px solid #f1e4e1; color: #26201f; font-size: 14px; font-weight: 600; text-decoration: none; }
.hb-kl4-book svg { transition: transform .3s; }
.hb-kl4-book:hover { color: var(--hb-kl4-accent); }
.hb-kl4-book:hover svg { transform: translateX(4px); }
.hb-kl4-book:focus-visible, .hb-kl4-cta:focus-visible { outline: 2px solid var(--hb-kl4-accent); outline-offset: 3px; border-radius: 6px; }
@container (max-width: 920px) { .hb-kl4-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (max-width: 560px) { .hb-kl4-wrap { padding: 64px 20px 72px; } }
@container (max-width: 400px) { .hb-kl4-grid { grid-template-columns: minmax(0, 1fr); } }
@media (prefers-reduced-motion: reduce) {
  .hb-kl4 *, .hb-kl4 *::before, .hb-kl4 *::after { animation: none !important; transition: none !important; }
}
`;

function Portrait({ index, colors, name }: { index: number; colors: [string, string]; name: string }) {
  const s = skin[index % skin.length];
  const h = hair[index % hair.length];
  const style = index % 4;
  const gid = `hb-kl4-g${index}`;
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="200" height="220" fill={`url(#${gid})`} />
      <circle cx="160" cy="40" r="46" fill="#fff" opacity=".18" />
      <text x="16" y="208" fontSize="64" fontFamily="Georgia, serif" fill="#fff" opacity=".22">{initials}</text>
      {style === 0 ? <path d="M58 104 C 50 40, 150 40, 142 104 L 150 170 L 50 170 Z" fill={h} /> : null}
      {style === 2 ? <g fill={h}><circle cx="100" cy="72" r="46" /><circle cx="62" cy="96" r="22" /><circle cx="138" cy="96" r="22" /></g> : null}
      {style === 3 ? <path d="M60 100 C 54 46, 146 46, 140 100 L 146 130 C 130 120, 70 120, 54 130 Z" fill={h} /> : null}
      <path d="M30 220 C 34 170, 70 152, 100 152 C 130 152, 166 170, 170 220 Z" fill="#26201f" opacity=".9" />
      <path d="M86 132 L 86 156 C 92 164, 108 164, 114 156 L 114 132 Z" fill={s} />
      <ellipse cx="100" cy="100" rx="34" ry="40" fill={s} />
      {style === 0 ? <path d="M66 92 C 70 58, 130 52, 136 96 C 120 76, 92 70, 66 92 Z" fill={h} /> : null}
      {style === 1 ? <path d="M64 94 C 62 56, 138 52, 136 92 C 130 74, 118 70, 104 72 C 90 74, 74 76, 64 94 Z" fill={h} /> : null}
      {style === 2 ? <path d="M68 86 C 76 62, 124 62, 132 86 C 116 76, 84 76, 68 86 Z" fill={h} /> : null}
      {style === 3 ? <path d="M66 96 C 66 60, 134 58, 134 96 C 118 80, 100 74, 66 96 Z" fill={h} /> : null}
      <g fill="#2a1d18">
        <ellipse cx="87" cy="102" rx="3" ry="3.4" />
        <ellipse cx="113" cy="102" rx="3" ry="3.4" />
      </g>
      <path d="M90 121 C 95 126, 105 126, 110 121" stroke="#7a3a32" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="114" r="5" fill="#e88" opacity=".22" />
      <circle cx="120" cy="114" r="5" fill="#e88" opacity=".22" />
    </svg>
  );
}

export function LocalTeamGrid({
  eyebrow = "The chairs at Maison Rose",
  title = "Meet the hands behind your hair.",
  subtitle = "Four stylists, one shared obsession with healthy hair. Every visit starts with a ten-minute consultation, on us.",
  members = defaultMembers,
  bookLabel = "Book with",
  cta = { label: "Book a chair", href: "#book" },
  accent = "#d0667a",
  className,
  style,
  ...rest
}: LocalTeamGridProps) {
  const words = title.split(" ");
  const tail = words.splice(-2).join(" ");
  return (
    <section
      className={["hb-kl4", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl4-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-team-grid" precedence="default">{css}</style>
      <div className="hb-kl4-wrap">
        <div className="hb-kl4-head">
          <div>
            <p className="hb-kl4-eyebrow">{eyebrow}</p>
            <h2 className="hb-kl4-title">{words.join(" ")} <i>{tail}</i></h2>
            <p className="hb-kl4-sub">{subtitle}</p>
          </div>
          {cta ? (
            <a className="hb-kl4-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
        </div>
        <ul className="hb-kl4-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {members.map((m, i) => (
            <li key={m.name} className="hb-kl4-card" style={{ "--hb-kl4-i": i } as React.CSSProperties}>
              <div className="hb-kl4-art">
                <Portrait index={i} name={m.name} colors={m.colors ?? ["#f4d6cf", "#dba49a"]} />
                <span className="hb-kl4-years">{m.years} yrs</span>
              </div>
              <div className="hb-kl4-info">
                <h3 className="hb-kl4-name">{m.name}</h3>
                <p className="hb-kl4-role">{m.role}</p>
                <div className="hb-kl4-chips">
                  {m.specialties.map((sp) => <span key={sp} className="hb-kl4-chip">{sp}</span>)}
                </div>
                {m.href ? (
                  <a className="hb-kl4-book" href={m.href}>
                    {bookLabel} {m.name.split(" ")[0]}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
