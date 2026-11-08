"use client";

import * as React from "react";

export interface FeaturesBeforeAfterCallout {
  x: number;
  y: number;
  before: string;
  after: string;
}

export interface FeaturesBeforeAfterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "defaultValue"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  callouts?: FeaturesBeforeAfterCallout[];
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  beforeLabel?: string;
  afterLabel?: string;
  accent?: string;
}

const css = `
@keyframes hb-wa6-hint { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.08); } }
@keyframes hb-wa6-ring { from { transform: scale(1); opacity: .6; } to { transform: scale(1.9); opacity: 0; } }
@keyframes hb-wa6-swap { from { opacity: 0; transform: translate3d(0, 4px, 0); } to { opacity: 1; transform: none; } }
@keyframes hb-wa6-shake { 0%, 100% { transform: rotate(var(--r)); } 50% { transform: rotate(calc(var(--r) + 2deg)); } }
.hb-wa6 {
  --hb-wa6-accent: #f59e0b;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #0c0a09;
  color: #f5f5f4;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-wa6 *, .hb-wa6 *::before, .hb-wa6 *::after { box-sizing: border-box; }
.hb-wa6 em, .hb-wa6 i { font-style: normal; }
.hb-wa6-in { max-width: 1120px; margin: 0 auto; padding: clamp(56px, 8cqi, 104px) clamp(16px, 5cqi, 48px); }
.hb-wa6-head { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 16px 40px; margin-bottom: clamp(22px, 3.4cqi, 40px); }
.hb-wa6-eyebrow { margin: 0 0 12px; color: var(--hb-wa6-accent); font-size: 13px; font-weight: 600; }
.hb-wa6-title { margin: 0; max-width: 640px; font-family: var(--font-grotesk, inherit); font-size: clamp(28px, 4.4cqi, 50px); font-weight: 600; line-height: 1.04; letter-spacing: -.035em; text-wrap: balance; }
.hb-wa6-sub { margin: 14px 0 0; max-width: 560px; color: #a8a29e; font-size: 15.5px; line-height: 1.6; }
.hb-wa6-score { display: flex; gap: 6px; padding: 4px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 999px; background: #1c1917; font-size: 12.5px; }
.hb-wa6-score button { padding: 7px 14px; border: 0; border-radius: 999px; background: none; color: #a8a29e; font: inherit; font-weight: 600; cursor: pointer; transition: background .25s ease, color .25s ease; }
.hb-wa6-score button[aria-pressed="true"] { background: #f5f5f4; color: #0c0a09; }
.hb-wa6-score button:focus-visible { outline: 2px solid var(--hb-wa6-accent); outline-offset: 2px; }
.hb-wa6-stage { position: relative; container-type: inline-size; aspect-ratio: 16 / 8.4; overflow: hidden; border: 1px solid rgba(255, 255, 255, .1); border-radius: 22px; touch-action: pan-y; user-select: none; cursor: ew-resize; box-shadow: 0 40px 80px -40px rgba(0, 0, 0, .9); }
.hb-wa6-layer { position: absolute; inset: 0; font-size: 1.5cqi; }
.hb-wa6-after { background: radial-gradient(60% 80% at 80% 0%, color-mix(in srgb, var(--hb-wa6-accent) 16%, transparent), transparent 70%), #141210; }
.hb-wa6-before { background: #e7e2d8; color: #1c1917; clip-path: inset(0 calc(100% - var(--hb-wa6-p)) 0 0); }
.hb-wa6-sheet { position: absolute; left: 4%; top: 7%; width: 62%; height: 86%; border: 1px solid #c9c2b4; background: #fbfaf7; display: grid; grid-template-columns: 6% repeat(5, 1fr); grid-auto-rows: 1fr; font-family: var(--font-mono, ui-monospace, monospace); font-size: 1.2cqi; }
.hb-wa6-sheet span { display: flex; align-items: center; padding: 0 .6cqi; border-right: 1px solid #e5e0d6; border-bottom: 1px solid #e5e0d6; white-space: nowrap; overflow: hidden; color: #44403c; }
.hb-wa6-sheet span[data-h="true"] { background: #efebe3; color: #78716c; font-weight: 700; }
.hb-wa6-sheet span[data-bad="true"] { background: #fecaca; color: #991b1b; }
.hb-wa6-sheet span[data-warn="true"] { background: #fde68a; }
.hb-wa6-note { position: absolute; width: 15%; padding: 1cqi; background: var(--c); color: #1c1917; font-size: 1.25cqi; line-height: 1.35; font-weight: 600; box-shadow: 0 .6cqi 1.4cqi rgba(0, 0, 0, .18); transform: rotate(var(--r)); animation: hb-wa6-shake 3s ease-in-out infinite; }
.hb-wa6-mail { position: absolute; right: 5%; bottom: 9%; width: 25%; padding: 1.2cqi; border-radius: 1cqi; background: #fff; box-shadow: 0 .8cqi 2cqi rgba(0, 0, 0, .15); font-size: 1.25cqi; }
.hb-wa6-mail b { display: flex; justify-content: space-between; margin-bottom: .6cqi; font-size: 1.4cqi; }
.hb-wa6-mail b span { padding: 0 .8cqi; border-radius: 1cqi; background: #dc2626; color: #fff; }
.hb-wa6-mail p { margin: .4cqi 0 0; padding-top: .4cqi; border-top: 1px solid #eee; color: #57534e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wa6-board { position: absolute; left: 4%; right: 4%; top: 7%; bottom: 7%; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1cqi; }
.hb-wa6-day { display: flex; flex-direction: column; gap: .8cqi; padding: 1cqi; border: 1px solid rgba(255, 255, 255, .07); border-radius: 1.2cqi; background: rgba(255, 255, 255, .02); }
.hb-wa6-day small { display: flex; justify-content: space-between; color: #78716c; font-size: 1.2cqi; font-weight: 600; }
.hb-wa6-day small b { color: #f5f5f4; }
.hb-wa6-post { padding: .9cqi 1cqi; border-radius: .9cqi; border-left: .35cqi solid var(--c); background: #1f1c19; font-size: 1.25cqi; line-height: 1.35; }
.hb-wa6-post b { display: block; margin-bottom: .3cqi; font-weight: 600; color: #f5f5f4; }
.hb-wa6-post span { display: flex; align-items: center; gap: .5cqi; color: #a8a29e; font-size: 1.1cqi; }
.hb-wa6-post span::before { content: ""; width: .8cqi; height: .8cqi; border-radius: 50%; background: var(--s); }
.hb-wa6-tag { position: absolute; top: 2.4cqi; padding: .5cqi 1.2cqi; border-radius: 999px; font-size: 1.3cqi; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.hb-wa6-divider { position: absolute; top: 0; bottom: 0; left: var(--hb-wa6-p); width: 2px; margin-left: -1px; background: #fff; box-shadow: 0 0 20px rgba(255, 255, 255, .5); pointer-events: none; }
.hb-wa6-handle { position: absolute; top: 50%; left: var(--hb-wa6-p); display: grid; place-items: center; width: 44px; height: 44px; border: 0; border-radius: 50%; background: #fff; color: #0c0a09; transform: translate(-50%, -50%); box-shadow: 0 6px 20px rgba(0, 0, 0, .4); cursor: grab; animation: hb-wa6-hint 2.4s ease-in-out infinite; }
.hb-wa6-handle::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 2px solid #fff; animation: hb-wa6-ring 2.4s ease-out infinite; }
.hb-wa6[data-touched="true"] .hb-wa6-handle, .hb-wa6[data-touched="true"] .hb-wa6-handle::after { animation: none; }
.hb-wa6-handle:active { cursor: grabbing; }
.hb-wa6-handle:focus-visible { outline: 3px solid var(--hb-wa6-accent); outline-offset: 3px; }
.hb-wa6-call { position: absolute; z-index: 2; display: flex; align-items: center; gap: 8px; max-width: 44%; padding: 7px 12px 7px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 600; white-space: nowrap; transform: translate(-50%, -50%); box-shadow: 0 8px 24px -8px rgba(0, 0, 0, .5); pointer-events: none; transition: background .3s ease, color .3s ease; }
.hb-wa6-call[data-side="before"] { background: #1c1917; color: #fecaca; }
.hb-wa6-call[data-side="after"] { background: #f5f5f4; color: #1c1917; }
.hb-wa6-call > span:last-child { overflow: hidden; text-overflow: ellipsis; animation: hb-wa6-swap .35s ease both; }
.hb-wa6-call i { display: grid; place-items: center; flex: none; width: 18px; height: 18px; border-radius: 50%; font-size: 11px; font-weight: 800; }
.hb-wa6-call[data-side="before"] i { background: #dc2626; color: #fff; }
.hb-wa6-call[data-side="after"] i { background: var(--hb-wa6-accent); color: #1c1917; }
.hb-wa6-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 14px; }
.hb-wa6-stat { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 14px 16px; border: 1px solid rgba(255, 255, 255, .08); border-radius: 14px; background: #141210; color: #a8a29e; font-size: 13px; }
.hb-wa6-stat b { color: #f5f5f4; font-family: var(--font-grotesk, inherit); font-size: 22px; font-weight: 600; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
@container (max-width: 720px) {
  .hb-wa6-head { grid-template-columns: minmax(0, 1fr); }
  .hb-wa6-stage { aspect-ratio: 4 / 3; }
  .hb-wa6-layer { font-size: 2.1cqi; }
  .hb-wa6-call { font-size: 11px; max-width: 60%; }
  .hb-wa6-stats { grid-template-columns: minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wa6 *, .hb-wa6 *::before, .hb-wa6 *::after { animation: none !important; transition: none !important; }
}
`;

const defaultCallouts: FeaturesBeforeAfterCallout[] = [
  { x: 22, y: 30, before: "Owner? Nobody knows", after: "Every post has an owner" },
  { x: 48, y: 72, before: "Three copies of one deadline", after: "One date, synced everywhere" },
  { x: 78, y: 22, before: "47 unread approval emails", after: "Approvals in one click" },
];

const sheetRows = [
  ["", "Post", "Channel", "Owner", "Due", "Status"],
  ["1", "Fall launch teaser", "LinkedIn", "?", "10/14", "late"],
  ["2", "Founder Q&A", "Newsletter", "Dana", "10/15", "draft v6"],
  ["3", "Fall launch teaser", "Instagram", "Sam?", "10/14", "dup"],
  ["4", "Case study: Ridgeway", "Blog", "", "10/16", "waiting"],
  ["5", "Webinar promo", "X", "Leo", "10/12", "late"],
  ["6", "Hiring post", "LinkedIn", "Dana", "TBD", "?"],
  ["7", "Product tips #4", "Newsletter", "", "10/18", ""],
];

const days = [
  { d: "Mon", n: 14, posts: [{ t: "Fall launch teaser", c: "#f59e0b", s: "#4ade80", o: "Sam · Approved" }, { t: "Hiring post", c: "#60a5fa", s: "#fbbf24", o: "Dana · In review" }] },
  { d: "Tue", n: 15, posts: [{ t: "Founder Q&A", c: "#a78bfa", s: "#4ade80", o: "Dana · Scheduled" }] },
  { d: "Wed", n: 16, posts: [{ t: "Ridgeway case study", c: "#34d399", s: "#4ade80", o: "Ines · Approved" }, { t: "Webinar promo", c: "#f472b6", s: "#4ade80", o: "Leo · Scheduled" }] },
  { d: "Thu", n: 17, posts: [{ t: "Launch recap", c: "#f59e0b", s: "#a8a29e", o: "Sam · Draft" }] },
  { d: "Fri", n: 18, posts: [{ t: "Product tips #4", c: "#60a5fa", s: "#4ade80", o: "Leo · Scheduled" }] },
];

export function FeaturesBeforeAfter({
  eyebrow = "Quillmark content calendar",
  title = "Same week. Same team. One less spreadsheet.",
  subtitle = "Drag the handle across a real Monday. Every pain on the left has a fix on the right.",
  callouts = defaultCallouts,
  value,
  defaultValue = 52,
  onChange,
  beforeLabel = "Before",
  afterLabel = "With Quillmark",
  accent = "#f59e0b",
  className,
  style,
  ...rest
}: FeaturesBeforeAfterProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [touched, setTouched] = React.useState(false);
  const p = Math.max(0, Math.min(100, value ?? inner));
  const stage = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const set = (v: number) => {
    const n = Math.round(Math.max(0, Math.min(100, v)) * 10) / 10;
    if (value === undefined) setInner(n);
    setTouched(true);
    onChange?.(n);
  };

  const fromEvent = (e: React.PointerEvent) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    set(((e.clientX - r.left) / r.width) * 100);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); set(p - step); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); set(p + step); }
    else if (e.key === "Home") { e.preventDefault(); set(0); }
    else if (e.key === "End") { e.preventDefault(); set(100); }
  };

  const hours = (6.5 - (p / 100) * 5.2).toFixed(1);

  return (
    <section
      className={["hb-wa6", className].filter(Boolean).join(" ")}
      data-touched={touched}
      style={{ "--hb-wa6-accent": accent, "--hb-wa6-p": `${p}%`, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-features-before-after" precedence="default">{css}</style>
      <div className="hb-wa6-in">
        <div className="hb-wa6-head">
          <div>
            <p className="hb-wa6-eyebrow">{eyebrow}</p>
            <h2 className="hb-wa6-title">{title}</h2>
            <p className="hb-wa6-sub">{subtitle}</p>
          </div>
          <div className="hb-wa6-score">
            <button type="button" aria-pressed={p >= 50} onClick={() => set(100)}>{beforeLabel}</button>
            <button type="button" aria-pressed={p < 50} onClick={() => set(0)}>{afterLabel}</button>
          </div>
        </div>
        <div
          ref={stage}
          className="hb-wa6-stage"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromEvent(e);
          }}
          onPointerMove={(e) => dragging.current && fromEvent(e)}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          <div className="hb-wa6-layer hb-wa6-after" aria-label={afterLabel} role="img">
            <div className="hb-wa6-board">
              {days.map((d) => (
                <div key={d.d} className="hb-wa6-day">
                  <small>{d.d} <b>{d.n}</b></small>
                  {d.posts.map((post) => (
                    <div key={post.t} className="hb-wa6-post" style={{ "--c": post.c, "--s": post.s } as React.CSSProperties}>
                      <b>{post.t}</b>
                      <span>{post.o}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <span className="hb-wa6-tag" style={{ right: "2.4cqi", background: accent, color: "#1c1917" }}>{afterLabel}</span>
          </div>
          <div className="hb-wa6-layer hb-wa6-before" aria-label={beforeLabel} role="img">
            <div className="hb-wa6-sheet">
              {sheetRows.map((row, r) =>
                row.map((c, ci) => (
                  <span key={`${r}-${ci}`} data-h={r === 0 || ci === 0} data-bad={c === "late" || c === "?" || c === "dup"} data-warn={c === "" && r > 0 && ci > 0}>{c}</span>
                )),
              )}
            </div>
            <div className="hb-wa6-note" style={{ left: "52%", top: "12%", "--c": "#fde047", "--r": "6deg" } as React.CSSProperties}>WHO owns the teaser??</div>
            <div className="hb-wa6-note" style={{ left: "70%", top: "40%", "--c": "#f9a8d4", "--r": "-5deg", animationDelay: "-1s" } as React.CSSProperties}>Legal still has v4 not v6</div>
            <div className="hb-wa6-note" style={{ left: "30%", top: "66%", "--c": "#a7f3d0", "--r": "3deg", animationDelay: "-2s" } as React.CSSProperties}>Move webinar? ask Leo</div>
            <div className="hb-wa6-mail">
              <b>Inbox <span>47</span></b>
              <p>Re: Re: Fwd: teaser copy FINAL</p>
              <p>Approval needed: Founder Q&amp;A</p>
              <p>Where is the Ridgeway draft?</p>
            </div>
            <span className="hb-wa6-tag" style={{ left: "2.4cqi", background: "#1c1917", color: "#fecaca" }}>{beforeLabel}</span>
          </div>
          <i className="hb-wa6-divider" aria-hidden="true" />
          {callouts.map((c) => {
            const side = c.x < p ? "before" : "after";
            return (
              <span key={c.after} className="hb-wa6-call" data-side={side} style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                <i aria-hidden="true">{side === "before" ? "!" : "✓"}</i>
                <span key={side}>{side === "before" ? c.before : c.after}</span>
              </span>
            );
          })}
          <button
            type="button"
            className="hb-wa6-handle"
            role="slider"
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(p)}
            aria-valuetext={`${Math.round(p)}% before`}
            onKeyDown={onKey}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 5 2 10l5 5M13 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className="hb-wa6-stats" aria-live="polite">
          <div className="hb-wa6-stat">Hours on coordination per week <b>{hours}</b></div>
          <div className="hb-wa6-stat">Posts with no owner <b>{p > 50 ? 3 : 0}</b></div>
          <div className="hb-wa6-stat">Approval emails <b>{p > 50 ? 47 : 0}</b></div>
        </div>
      </div>
    </section>
  );
}
