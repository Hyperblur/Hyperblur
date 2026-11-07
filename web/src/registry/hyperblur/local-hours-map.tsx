"use client";

import * as React from "react";

export interface LocalHoursRow {
  day: string;
  hours: string;
  note?: string;
}

export interface LocalHoursMapProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  name?: string;
  address?: string[];
  phone?: string;
  hours?: LocalHoursRow[];
  todayIndex?: number;
  openNow?: boolean;
  statusText?: string;
  directions?: { label: string; href: string };
  streets?: string[];
  accent?: string;
}

const defaultHours: LocalHoursRow[] = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "10:00 – 7:00" },
  { day: "Wednesday", hours: "10:00 – 7:00" },
  { day: "Thursday", hours: "10:00 – 8:30", note: "Late night" },
  { day: "Friday", hours: "10:00 – 8:30" },
  { day: "Saturday", hours: "9:00 – 6:00" },
  { day: "Sunday", hours: "11:00 – 5:00" },
];

const css = `
.hb-kl3 {
  --hb-kl3-accent: #2f5d3a;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #efe8da;
  color: #1f2a20;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kl3 *, .hb-kl3 *::before, .hb-kl3 *::after { box-sizing: border-box; }
.hb-kl3-wrap { max-width: 1120px; margin: 0 auto; padding: 88px 24px 96px; }
.hb-kl3-head { max-width: 620px; margin-bottom: 36px; }
.hb-kl3-eyebrow { margin: 0 0 12px; color: var(--hb-kl3-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; }
.hb-kl3-title { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-weight: 600; font-size: clamp(32px, 4.6cqw, 52px); line-height: 1.02; letter-spacing: -.035em; color: #18241a; text-wrap: balance; }
.hb-kl3-sub { margin: 14px 0 0; color: #5d6455; font-size: 16px; line-height: 1.6; }
.hb-kl3-grid { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1.25fr); gap: 20px; align-items: stretch; }
.hb-kl3-card { min-width: 0; padding: 28px; border-radius: 22px; background: #fbf8f1; border: 1px solid #e0d6c3; box-shadow: 0 24px 50px -36px rgba(40, 50, 30, .5); display: flex; flex-direction: column; }
.hb-kl3-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.hb-kl3-name { margin: 0; font-family: var(--font-grotesk, ui-sans-serif, system-ui, sans-serif); font-size: 20px; font-weight: 600; letter-spacing: -.02em; }
.hb-kl3-badge { display: inline-flex; align-items: center; gap: 7px; padding: 5px 11px; border-radius: 999px; background: color-mix(in srgb, var(--hb-kl3-accent) 12%, #fff); color: var(--hb-kl3-accent); font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.hb-kl3-badge[data-closed] { background: #f6e3dc; color: #a2442a; }
.hb-kl3-live { position: relative; width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.hb-kl3-live::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 2px solid currentColor; opacity: 0; animation: hb-kl3-ping 2s ease-out infinite; }
@keyframes hb-kl3-ping { 0% { transform: scale(.4); opacity: .8; } 100% { transform: scale(1.6); opacity: 0; } }
.hb-kl3-table { width: 100%; border-collapse: collapse; font-size: 14.5px; }
.hb-kl3-table th, .hb-kl3-table td { padding: 10px 12px; text-align: left; font-weight: 400; border-top: 1px solid #ebe3d3; }
.hb-kl3-table tr:first-child th, .hb-kl3-table tr:first-child td { border-top: 0; }
.hb-kl3-table td { text-align: right; font-variant-numeric: tabular-nums; color: #2d382e; white-space: nowrap; }
.hb-kl3-table th { color: #5d6455; }
.hb-kl3-table tr[data-today] th, .hb-kl3-table tr[data-today] td { background: var(--hb-kl3-accent); color: #f4efe2; border-color: transparent; font-weight: 600; }
.hb-kl3-table tr[data-today] th { border-radius: 10px 0 0 10px; }
.hb-kl3-table tr[data-today] td { border-radius: 0 10px 10px 0; }
.hb-kl3-table tr[data-today] + tr th, .hb-kl3-table tr[data-today] + tr td { border-top-color: transparent; }
.hb-kl3-today { display: inline-block; margin-left: 8px; padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,.18); font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; vertical-align: 1px; }
.hb-kl3-closed { color: #a2442a; }
.hb-kl3-note { margin-left: 6px; color: #8b7f68; font-size: 12px; }
.hb-kl3-table tr[data-today] .hb-kl3-note { color: rgba(244,239,226,.75); }
.hb-kl3-contact { margin-top: auto; padding-top: 20px; display: grid; gap: 10px; font-size: 14.5px; color: #2d382e; }
.hb-kl3-line { display: flex; align-items: flex-start; gap: 10px; line-height: 1.45; }
.hb-kl3-line svg { flex: none; margin-top: 2px; color: var(--hb-kl3-accent); }
.hb-kl3-line a { color: inherit; text-decoration: none; border-bottom: 1px solid #cfc3aa; }
.hb-kl3-line a:hover { border-color: var(--hb-kl3-accent); }
.hb-kl3-line a:focus-visible, .hb-kl3-btn:focus-visible { outline: 2px solid var(--hb-kl3-accent); outline-offset: 3px; border-radius: 4px; }
.hb-kl3-mapcard { position: relative; min-width: 0; min-height: 420px; border-radius: 22px; overflow: hidden; border: 1px solid #d7ccb6; background: #e9e1cf; }
.hb-kl3-map { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.hb-kl3-route { stroke-dasharray: 7 7; animation: hb-kl3-dash 1.6s linear infinite; }
@keyframes hb-kl3-dash { to { stroke-dashoffset: -28; } }
.hb-kl3-pin { animation: hb-kl3-drop .9s cubic-bezier(.3,1.5,.5,1) .2s both; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes hb-kl3-drop { from { transform: translateY(-40px); opacity: 0; } }
.hb-kl3-halo { transform-box: fill-box; transform-origin: center; animation: hb-kl3-halo 2.4s ease-out infinite; }
@keyframes hb-kl3-halo { 0% { transform: scale(.4); opacity: .55; } 100% { transform: scale(1.8); opacity: 0; } }
.hb-kl3-float { position: absolute; left: 16px; right: 16px; bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 14px 14px 18px; border-radius: 16px; background: rgba(251, 248, 241, .92); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.6); box-shadow: 0 16px 32px -20px rgba(30, 40, 20, .5); }
.hb-kl3-eta { min-width: 0; font-size: 13px; color: #5d6455; line-height: 1.35; }
.hb-kl3-eta b { display: block; color: #1f2a20; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-kl3-btn { flex: none; display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: var(--hb-kl3-accent); color: #f4efe2; font-size: 14px; font-weight: 600; text-decoration: none; transition: transform .2s, box-shadow .2s, filter .2s; }
.hb-kl3-btn:hover { transform: translateY(-1px); filter: brightness(1.1); box-shadow: 0 12px 24px -12px var(--hb-kl3-accent); }
@container (max-width: 820px) {
  .hb-kl3-grid { grid-template-columns: minmax(0, 1fr); }
  .hb-kl3-wrap { padding: 64px 20px 72px; }
  .hb-kl3-mapcard { min-height: 340px; }
}
@container (max-width: 420px) {
  .hb-kl3-card { padding: 20px; }
  .hb-kl3-table th, .hb-kl3-table td { padding: 9px 8px; font-size: 13.5px; }
  .hb-kl3-note { display: none; }
  .hb-kl3-float { flex-direction: column; align-items: stretch; }
  .hb-kl3-btn { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kl3 *, .hb-kl3 *::before, .hb-kl3 *::after { animation: none !important; transition: none !important; }
}
`;

function StreetMap({ accent, streets }: { accent: string; streets: string[] }) {
  const blocks: { x: number; y: number; w: number; h: number; park?: boolean }[] = [];
  const cols = [0, 130, 250, 380, 500, 630];
  const rows = [0, 110, 210, 330, 430];
  for (let c = 0; c < cols.length - 1; c++) {
    for (let r = 0; r < rows.length - 1; r++) {
      const h = ((c * 7 + r * 13) % 5) === 0;
      blocks.push({ x: cols[c] + 14, y: rows[r] + 14, w: cols[c + 1] - cols[c] - 28, h: rows[r + 1] - rows[r] - 28, park: h });
    }
  }
  return (
    <svg className="hb-kl3-map" viewBox="0 0 630 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="630" height="430" fill="#e4dbc6" />
      <path d="M-20 360 C 120 320, 220 400, 360 350 S 560 300, 660 330 L 660 470 L -20 470 Z" fill="#c9d8d3" />
      <path d="M-20 360 C 120 320, 220 400, 360 350 S 560 300, 660 330" fill="none" stroke="#b5c8c2" strokeWidth="3" />
      {blocks.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill={b.park ? "#c8d4b0" : "#efe8d8"} stroke={b.park ? "#b6c59a" : "#ddd2bc"} />
      ))}
      {blocks.filter((b) => b.park).map((b, i) => (
        <g key={`t${i}`} fill="#9fb383">
          <circle cx={(b.x + b.w * 0.3).toFixed(1)} cy={(b.y + b.h * 0.4).toFixed(1)} r="7" />
          <circle cx={(b.x + b.w * 0.6).toFixed(1)} cy={(b.y + b.h * 0.6).toFixed(1)} r="9" />
          <circle cx={(b.x + b.w * 0.75).toFixed(1)} cy={(b.y + b.h * 0.3).toFixed(1)} r="5" />
        </g>
      ))}
      <path d="M-20 228 L 660 160" stroke="#fbf6ea" strokeWidth="18" />
      <path d="M-20 228 L 660 160" stroke="#e2c98f" strokeWidth="2" strokeDasharray="10 10" />
      <path d="M60 470 L 60 330 L 250 330 L 250 210 L 380 210" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="hb-kl3-route" />
      <circle cx="60" cy="400" r="7" fill="#fbf8f1" stroke={accent} strokeWidth="3" />
      <text x="140" y="104" fontSize="11" fill="#8b7f68" fontFamily="inherit" letterSpacing="1.5">{(streets[0] ?? "").toUpperCase()}</text>
      <text x="390" y="324" fontSize="11" fill="#8b7f68" fontFamily="inherit" letterSpacing="1.5">{(streets[1] ?? "").toUpperCase()}</text>
      <text x="470" y="160" fontSize="11" fill="#7d6a40" fontFamily="inherit" letterSpacing="1.5" transform="rotate(-5.7 470 160)">{(streets[2] ?? "").toUpperCase()}</text>
      <circle cx="380" cy="210" r="26" fill={accent} opacity=".35" className="hb-kl3-halo" />
      <g className="hb-kl3-pin">
        <path d="M380 212 c-4-10-20-22-20-38 a20 20 0 0 1 40 0 c0 16-16 28-20 38z" fill={accent} stroke="#fbf8f1" strokeWidth="3" />
        <circle cx="380" cy="174" r="7" fill="#fbf8f1" />
      </g>
    </svg>
  );
}

export function LocalHoursMap({
  eyebrow = "Visit the shop",
  title = "Come say hello on Larch Street.",
  subtitle = "Plants, pots and repotting help, five minutes from the Clinton Street stop. Free parking behind the building.",
  name = "Fern & Field",
  address = ["214 Larch Street", "Portland, OR 97214"],
  phone = "(503) 555-0187",
  hours = defaultHours,
  todayIndex = 3,
  openNow = true,
  statusText,
  directions = { label: "Get directions", href: "https://maps.google.com/?q=214+Larch+Street+Portland" },
  streets = ["Larch St", "Clinton St", "Hawthorne Blvd"],
  accent = "#2f5d3a",
  className,
  style,
  ...rest
}: LocalHoursMapProps) {
  const today = hours[todayIndex];
  const status = statusText ?? (openNow ? `Open now · until ${today?.hours.split("–")[1]?.trim() ?? "close"}` : "Closed now");

  return (
    <section
      className={["hb-kl3", className].filter(Boolean).join(" ")}
      style={{ "--hb-kl3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-local-hours-map" precedence="default">{css}</style>
      <div className="hb-kl3-wrap">
        <div className="hb-kl3-head">
          <p className="hb-kl3-eyebrow">{eyebrow}</p>
          <h2 className="hb-kl3-title">{title}</h2>
          <p className="hb-kl3-sub">{subtitle}</p>
        </div>
        <div className="hb-kl3-grid">
          <div className="hb-kl3-card">
            <div className="hb-kl3-top">
              <h3 className="hb-kl3-name">{name}</h3>
              <span className="hb-kl3-badge" data-closed={openNow ? undefined : ""}>
                <span className="hb-kl3-live" aria-hidden="true" />
                {status}
              </span>
            </div>
            <table className="hb-kl3-table">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Opening hours</caption>
              <tbody>
                {hours.map((h, i) => (
                  <tr key={h.day} data-today={i === todayIndex ? "" : undefined} aria-current={i === todayIndex ? "date" : undefined}>
                    <th scope="row">
                      {h.day}
                      {i === todayIndex ? <span className="hb-kl3-today">Today</span> : null}
                    </th>
                    <td>
                      <span className={h.hours.toLowerCase() === "closed" ? "hb-kl3-closed" : undefined}>{h.hours}</span>
                      {h.note ? <span className="hb-kl3-note">{h.note}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="hb-kl3-contact">
              <div className="hb-kl3-line">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <address style={{ fontStyle: "normal" }}>{address.map((l, i) => <React.Fragment key={l}>{i > 0 ? <br /> : null}{l}</React.Fragment>)}</address>
              </div>
              {phone ? (
                <div className="hb-kl3-line">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6.6 3.5h2.7l1.4 4-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4 1.4v2.7a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                </div>
              ) : null}
            </div>
          </div>
          <div className="hb-kl3-mapcard">
            <StreetMap accent={accent} streets={streets} />
            <div className="hb-kl3-float">
              <div className="hb-kl3-eta">
                <b>{address[0]}</b>
                6 min walk from {streets[1] ?? "the station"}
              </div>
              {directions ? (
                <a className="hb-kl3-btn" href={directions.href} target="_blank" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 11l18-8-8 18-2-8-8-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  {directions.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
