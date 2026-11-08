"use client";

import * as React from "react";

export interface FeaturesHoverRevealItem {
  title: string;
  caption: string;
  detail: string;
}

export interface FeaturesHoverRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  items?: FeaturesHoverRevealItem[];
  cta?: { label: string; href: string } | null;
  accent?: string;
  defaultIndex?: number;
  onItemFocus?: (index: number) => void;
}

const css = `
@keyframes hb-wa3-in { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes hb-wa3-cur { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
@keyframes hb-wa3-blink { 50% { opacity: .2; } }
@keyframes hb-wa3-log { from { opacity: 0; transform: translate3d(0, 6px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa3-queue { 0%, 20% { transform: translateX(0); opacity: 1; } 60% { transform: translateX(120%); opacity: 0; } 61%, 100% { transform: translateX(0); opacity: 0; } }
@keyframes hb-wa3-pkt { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hb-wa3-cell { 0%, 40% { background: #1c1c1c; } 50%, 90% { background: var(--hb-wa3-accent); } 100% { background: #1c1c1c; } }
.hb-wa3 {
  --hb-wa3-accent: #ff6b4a;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa3 *, .hb-wa3 *::before, .hb-wa3 *::after { box-sizing: border-box; }
.hb-wa3 em, .hb-wa3 i { font-style: normal; }
.hb-wa3-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa3-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 40px; flex-wrap: wrap; margin-bottom: clamp(20px, 3cqi, 36px); }
.hb-wa3-eyebrow { margin: 0 0 12px; color: var(--hb-wa3-accent); font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
.hb-wa3-title { margin: 0; max-width: 560px; font-size: clamp(26px, 3.4cqi, 38px); font-weight: 600; line-height: 1.1; letter-spacing: -.03em; text-wrap: balance; }
.hb-wa3-cta { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid rgba(255, 255, 255, .14); border-radius: 999px; color: #ededed; font-size: 14px; font-weight: 500; text-decoration: none; transition: background .2s ease, border-color .2s ease; }
.hb-wa3-cta:hover { background: rgba(255, 255, 255, .06); border-color: rgba(255, 255, 255, .26); }
.hb-wa3-cta:focus-visible { outline: 2px solid var(--hb-wa3-accent); outline-offset: 3px; }
.hb-wa3-body { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 380px); gap: clamp(20px, 4cqi, 56px); }
.hb-wa3-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255, 255, 255, .08); }
.hb-wa3-row { border-bottom: 1px solid rgba(255, 255, 255, .08); }
.hb-wa3-btn { position: relative; display: grid; grid-template-columns: 40px minmax(0, 1fr) auto; align-items: baseline; gap: 12px; width: 100%; padding: clamp(14px, 2cqi, 22px) 0; border: 0; background: none; color: #4a4a4a; font: inherit; text-align: left; cursor: pointer; transition: color .35s ease; }
.hb-wa3-btn:focus-visible { outline: 2px solid var(--hb-wa3-accent); outline-offset: 2px; border-radius: 6px; }
.hb-wa3-btn small { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; }
.hb-wa3-btn strong { font-family: var(--font-grotesk, inherit); font-size: clamp(26px, 4.6cqi, 52px); font-weight: 600; line-height: 1; letter-spacing: -.04em; transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.hb-wa3-btn span { color: #5f5f5f; font-size: 13px; text-align: right; transition: color .35s ease, opacity .35s ease; opacity: 0; }
.hb-wa3-row[data-active="true"] .hb-wa3-btn { color: #ededed; }
.hb-wa3-row[data-active="true"] .hb-wa3-btn small { color: var(--hb-wa3-accent); }
.hb-wa3-row[data-active="true"] .hb-wa3-btn strong { transform: translateX(10px); }
.hb-wa3-row[data-active="true"] .hb-wa3-btn span { color: #a1a1a1; opacity: 1; }
.hb-wa3-btn::after { content: ""; position: absolute; left: 0; bottom: -1px; width: 100%; height: 1px; background: var(--hb-wa3-accent); transform: scaleX(0); transform-origin: left; transition: transform .6s cubic-bezier(.22, 1, .36, 1); }
.hb-wa3-row[data-active="true"] .hb-wa3-btn::after { transform: scaleX(1); }
.hb-wa3-side { position: relative; }
.hb-wa3-card { position: absolute; left: 0; right: 0; top: 0; transform: translate3d(0, var(--hb-wa3-y, 0px), 0); transition: transform .65s cubic-bezier(.34, 1.3, .5, 1); }
.hb-wa3-shell { overflow: hidden; border: 1px solid rgba(255, 255, 255, .1); border-radius: 18px; background: #111; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 60px -30px rgba(0, 0, 0, .9), 0 0 0 1px color-mix(in srgb, var(--hb-wa3-accent) 12%, transparent); }
.hb-wa3-vis { position: relative; height: 200px; overflow: hidden; background: radial-gradient(90% 80% at 50% 0%, color-mix(in srgb, var(--hb-wa3-accent) 14%, transparent), transparent 70%), #0d0d0d; animation: hb-wa3-in .6s cubic-bezier(.65, 0, .35, 1) both; }
.hb-wa3-txt { padding: 14px 16px 16px; border-top: 1px solid rgba(255, 255, 255, .07); color: #a1a1a1; font-size: 13px; line-height: 1.55; }
.hb-wa3-txt b { display: block; margin-bottom: 4px; color: #ededed; font-size: 14px; font-weight: 600; }
.hb-wa3-doc { position: absolute; left: 14%; right: 14%; top: 22px; bottom: 22px; padding: 16px; border-radius: 10px; background: #171717; border: 1px solid rgba(255, 255, 255, .06); }
.hb-wa3-doc i { display: block; height: 7px; margin-bottom: 9px; border-radius: 4px; background: #262626; }
.hb-wa3-doc i[data-sel="a"] { background: color-mix(in srgb, #60a5fa 45%, #262626); }
.hb-wa3-doc i[data-sel="b"] { background: color-mix(in srgb, #4ade80 40%, #262626); }
.hb-wa3-pt { position: absolute; display: flex; align-items: flex-start; gap: 2px; animation: hb-wa3-cur 3.4s cubic-bezier(.65, 0, .35, 1) infinite; }
.hb-wa3-pt b { margin-top: 12px; padding: 2px 6px; border-radius: 5px; color: #0a0a0a; font-size: 10px; font-weight: 700; }
.hb-wa3-net { position: absolute; left: 20px; right: 20px; top: 24px; display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 10px; background: #171717; font-size: 12px; color: #d4d4d4; }
.hb-wa3-net em { display: inline-flex; align-items: center; gap: 6px; color: #fbbf24; font-size: 11px; }
.hb-wa3-net em::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #fbbf24; animation: hb-wa3-blink 1.2s ease infinite; }
.hb-wa3-q { position: absolute; left: 20px; right: 20px; top: 76px; display: grid; gap: 6px; }
.hb-wa3-q div { display: flex; justify-content: space-between; padding: 8px 12px; border: 1px dashed rgba(255, 255, 255, .12); border-radius: 8px; color: #a1a1a1; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; animation: hb-wa3-queue 4s cubic-bezier(.65, 0, .35, 1) infinite; animation-delay: calc(var(--j) * .35s + 1s); }
.hb-wa3-logs { position: absolute; inset: 18px 18px; display: grid; align-content: start; gap: 6px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; }
.hb-wa3-logs div { display: grid; grid-template-columns: 52px 1fr; gap: 10px; padding: 6px 8px; border-radius: 6px; background: #151515; color: #bdbdbd; animation: hb-wa3-log .4s ease both; animation-delay: calc(var(--j) * 180ms + 200ms); white-space: nowrap; overflow: hidden; }
.hb-wa3-logs div span:first-child { color: #5f5f5f; }
.hb-wa3-logs b { color: var(--hb-wa3-accent); font-weight: 500; }
.hb-wa3-mx { position: absolute; inset: 20px; display: grid; grid-template-columns: 88px repeat(4, 1fr); gap: 5px; align-content: center; font-size: 11px; color: #8f8f8f; }
.hb-wa3-mx > span { display: flex; align-items: center; height: 22px; }
.hb-wa3-mx > span[data-h="true"] { justify-content: center; color: #6f6f6f; font-size: 10px; }
.hb-wa3-mx i { height: 22px; border-radius: 6px; background: #1c1c1c; }
.hb-wa3-mx i[data-on="true"] { background: color-mix(in srgb, var(--hb-wa3-accent) 70%, #1c1c1c); }
.hb-wa3-mx i[data-anim="true"] { animation: hb-wa3-cell 3s ease infinite; }
.hb-wa3-hook { position: absolute; inset: 0; width: 100%; height: 100%; }
.hb-wa3-hook path[data-p="true"] { fill: none; stroke: var(--hb-wa3-accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: .14 .86; animation: hb-wa3-pkt 1.8s linear infinite; }
.hb-wa3-payload { position: absolute; right: 18px; bottom: 16px; width: 54%; padding: 10px 12px; border-radius: 8px; background: #171717; border: 1px solid rgba(255, 255, 255, .06); color: #a1a1a1; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10.5px; line-height: 1.6; white-space: pre; }
.hb-wa3-payload b { color: #ededed; font-weight: 500; }
.hb-wa3-node { position: absolute; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px; background: #1a1a1a; border: 1px solid rgba(255, 255, 255, .1); color: #ededed; font-size: 10px; font-weight: 600; }
@container (max-width: 760px) {
  .hb-wa3-body { grid-template-columns: minmax(0, 1fr); }
  .hb-wa3-side { order: -1; }
  .hb-wa3-card { position: relative; transform: none; }
  .hb-wa3-btn span { display: none; }
  .hb-wa3-btn { grid-template-columns: 32px minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa3 *, .hb-wa3 *::before, .hb-wa3 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultItems: FeaturesHoverRevealItem[] = [
  { title: "Realtime sync", caption: "Under 40 ms between cursors", detail: "Every keystroke reaches teammates in under 40 ms, with conflict-free merging when two people edit the same line." },
  { title: "Offline first", caption: "Edits queue, then replay", detail: "Lose the connection on a train and keep working. Changes queue locally and replay in order the moment you are back." },
  { title: "Audit trail", caption: "Every change, signed", detail: "A tamper-evident log of who changed what and when, exportable to your warehouse on a schedule." },
  { title: "Granular roles", caption: "Down to a single block", detail: "Grant view, comment or edit rights per workspace, page or block. Guests never see more than you share." },
  { title: "Webhooks", caption: "Signed, retried, replayable", detail: "Subscribe to 38 event types. Deliveries are signed, retried with backoff and replayable from the dashboard." },
];

function VisSync() {
  return (
    <>
      <div className="hb-wa3-doc">
        <i style={{ width: "70%" }} />
        <i style={{ width: "92%" }} data-sel="a" />
        <i style={{ width: "84%" }} />
        <i style={{ width: "56%" }} data-sel="b" />
        <i style={{ width: "76%" }} />
        <i style={{ width: "40%" }} />
      </div>
      <span className="hb-wa3-pt" style={{ left: "38%", top: "52px", "--dx": "60px", "--dy": "18px" } as React.CSSProperties}>
        <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l9 4-4 1.2L4.6 11z" fill="#60a5fa" /></svg>
        <b style={{ background: "#60a5fa" }}>Ines</b>
      </span>
      <span className="hb-wa3-pt" style={{ left: "58%", top: "104px", "--dx": "-70px", "--dy": "-10px", animationDelay: "-1.2s" } as React.CSSProperties}>
        <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l9 4-4 1.2L4.6 11z" fill="#4ade80" /></svg>
        <b style={{ background: "#4ade80" }}>Ravi</b>
      </span>
    </>
  );
}

function VisOffline() {
  return (
    <>
      <div className="hb-wa3-net">
        Reconnecting
        <em>3 changes queued</em>
      </div>
      <div className="hb-wa3-q">
        {["edit  block#a41", "move  card#227", "title page#09"].map((t, j) => (
          <div key={t} style={{ "--j": j } as React.CSSProperties}>
            <span>{t}</span>
            <span>local</span>
          </div>
        ))}
      </div>
    </>
  );
}

function VisAudit() {
  const rows = [
    ["09:41:07", "jonas", "renamed", "Pricing v3"],
    ["09:41:52", "amara", "shared", "Q3 plan"],
    ["09:43:10", "jonas", "deleted", "Draft 7"],
    ["09:44:31", "system", "exported", "audit.csv"],
    ["09:46:02", "lena", "restored", "Draft 7"],
  ];
  return (
    <div className="hb-wa3-logs">
      {rows.map((r, j) => (
        <div key={r[0]} style={{ "--j": j } as React.CSSProperties}>
          <span>{r[0]}</span>
          <span>{r[1]} <b>{r[2]}</b> {r[3]}</span>
        </div>
      ))}
    </div>
  );
}

function VisRoles() {
  const people = ["Owner", "Editor", "Commenter", "Guest"];
  const grid = [[1, 1, 1, 1], [1, 1, 1, 0], [1, 1, 0, 0], [1, 0, 0, 0]];
  return (
    <div className="hb-wa3-mx">
      <span />
      {["View", "Comment", "Edit", "Share"].map((h) => (
        <span key={h} data-h="true">{h}</span>
      ))}
      {people.map((p, r) => (
        <React.Fragment key={p}>
          <span>{p}</span>
          {grid[r].map((v, c) => (
            <i key={c} data-on={v === 1} data-anim={r === 2 && c === 2} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

function VisHooks() {
  return (
    <>
      <svg className="hb-wa3-hook" viewBox="0 0 380 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M60 50 C 140 50, 160 100, 240 100" fill="none" stroke="#262626" strokeWidth="2" />
        <path d="M60 50 C 140 50, 160 100, 240 100" data-p="true" pathLength={1} />
      </svg>
      <span className="hb-wa3-node" style={{ left: "38px", top: "29px" }}>App</span>
      <span className="hb-wa3-node" style={{ left: "240px", top: "79px", borderColor: "rgba(255,107,74,.5)" }}>POST</span>
      <div className="hb-wa3-payload">
        {"{\n  "}<b>&quot;type&quot;</b>{": \"page.published\",\n  "}<b>&quot;attempt&quot;</b>{": 1\n}"}
      </div>
    </>
  );
}

const visuals = [VisSync, VisOffline, VisAudit, VisRoles, VisHooks];

export function FeaturesHoverReveal({
  eyebrow = "Platform",
  title = "Built for teams who cannot afford to lose a word",
  items = defaultItems,
  cta = { label: "Read the architecture notes", href: "#" },
  accent = "#ff6b4a",
  defaultIndex = 0,
  onItemFocus,
  className,
  style,
  ...rest
}: FeaturesHoverRevealProps) {
  const [active, setActive] = React.useState(defaultIndex);
  const [y, setY] = React.useState(0);
  const rows = React.useRef<(HTMLLIElement | null)[]>([]);
  const side = React.useRef<HTMLDivElement>(null);
  const card = React.useRef<HTMLDivElement>(null);

  const activate = (i: number) => {
    const row = rows.current[i];
    const s = side.current;
    const c = card.current;
    if (row && s && c) {
      const max = Math.max(0, (row.parentElement?.offsetHeight ?? 0) - c.offsetHeight);
      const target = row.offsetTop + row.offsetHeight / 2 - c.offsetHeight / 2;
      setY(Math.round(Math.min(max, Math.max(0, target))));
    }
    if (i !== active) {
      setActive(i);
      onItemFocus?.(i);
    }
  };

  const Vis = visuals[active % visuals.length];
  const item = items[active];

  return (
    <section className={["hb-wa3", className].filter(Boolean).join(" ")} style={{ "--hb-wa3-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-features-hover-reveal" precedence="default">{css}</style>
      <div className="hb-wa3-in">
        <div className="hb-wa3-head">
          <div>
            <p className="hb-wa3-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa3-title">{title}</h2>
          </div>
          {cta && (
            <a className="hb-wa3-cta" href={cta.href}>
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          )}
        </div>
        <div className="hb-wa3-body">
          <ul className="hb-wa3-list">
            {items.map((it, i) => (
              <li
                key={it.title}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="hb-wa3-row"
                data-active={i === active}
              >
                <button type="button" className="hb-wa3-btn" aria-pressed={i === active} onPointerEnter={() => activate(i)} onFocus={() => activate(i)} onClick={() => activate(i)}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <strong>{it.title}</strong>
                  <span>{it.caption}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="hb-wa3-side" ref={side}>
            <div className="hb-wa3-card" ref={card} style={{ "--hb-wa3-y": `${y}px` } as React.CSSProperties}>
              <div className="hb-wa3-shell" aria-live="polite">
                <div key={active} className="hb-wa3-vis" aria-hidden="true">
                  <Vis />
                </div>
                <div className="hb-wa3-txt">
                  <b>{item.title}</b>
                  {item.detail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
