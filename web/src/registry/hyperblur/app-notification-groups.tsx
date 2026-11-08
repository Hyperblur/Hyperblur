"use client";

import * as React from "react";

export interface NotificationGroupItem {
  id: string;
  title: string;
  body: string;
  time: string;
  actions?: string[];
}

export interface NotificationGroup {
  id: string;
  app: string;
  glyph: "deploy" | "billing" | "mention" | "calendar" | "security";
  color: string;
  bulkAction?: string;
  items: NotificationGroupItem[];
}

export interface AppNotificationGroupsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  groups?: NotificationGroup[];
  defaultExpanded?: string | null;
  title?: string;
  accent?: string;
  onAction?: (groupId: string, itemId: string, action: string) => void;
  onBulkAction?: (groupId: string, action: string) => void;
  onDismiss?: (groupId: string, itemId: string | null) => void;
}

const sampleGroups: NotificationGroup[] = [
  {
    id: "deploys",
    app: "Deploys",
    glyph: "deploy",
    color: "#34c78a",
    bulkAction: "Promote latest",
    items: [
      { id: "d1", title: "harbor-web #812 is ready", body: "Preview built in 48s from fix/checkout-tax. 3 checks passed.", time: "2m", actions: ["Promote", "Open preview"] },
      { id: "d2", title: "harbor-api #455 is ready", body: "Migration 0042 applied on staging without errors.", time: "14m", actions: ["Promote"] },
      { id: "d3", title: "harbor-web #811 failed", body: "Type error in src/cart/summary.tsx line 88.", time: "31m", actions: ["View logs"] },
    ],
  },
  {
    id: "mentions",
    app: "Mentions",
    glyph: "mention",
    color: "#7fb3ff",
    bulkAction: "Mark all read",
    items: [
      { id: "m1", title: "Priya Raman in #design-crit", body: "Can you sanity check the empty state copy before Thursday?", time: "6m", actions: ["Reply"] },
      { id: "m2", title: "Marco Silva on PR #1290", body: "Left two nits, otherwise good to merge.", time: "1h", actions: ["Reply", "Open PR"] },
    ],
  },
  {
    id: "billing",
    app: "Billing",
    glyph: "billing",
    color: "#f0b24a",
    items: [{ id: "b1", title: "Invoice INV-2048 paid", body: "$1,240.00 charged to Visa ending 4412.", time: "3h", actions: ["Download PDF"] }],
  },
  {
    id: "calendar",
    app: "Calendar",
    glyph: "calendar",
    color: "#f36fb0",
    bulkAction: "Accept all",
    items: [
      { id: "c1", title: "Quarterly planning", body: "Thu, Nov 12 · 10:00 to 11:30 · Room 4B", time: "5h", actions: ["Accept", "Decline"] },
      { id: "c2", title: "Lumen Bank onboarding call", body: "Fri, Nov 13 · 15:00 to 15:45 · Zoom", time: "6h", actions: ["Accept", "Decline"] },
    ],
  },
];

function Glyph({ kind }: { kind: NotificationGroup["glyph"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      {kind === "deploy" && <path {...p} d="M8 2.5 13.5 12h-11Z" />}
      {kind === "mention" && <><circle {...p} cx="8" cy="8" r="2.4" /><path {...p} d="M10.4 8v1a1.6 1.6 0 0 0 3.2 0V8a5.6 5.6 0 1 0-2.2 4.5" /></>}
      {kind === "billing" && <><rect {...p} x="2" y="4" width="12" height="8.5" rx="1.6" /><path {...p} d="M2 7h12M4.5 10h2.5" /></>}
      {kind === "calendar" && <><rect {...p} x="2.5" y="3.5" width="11" height="10" rx="1.8" /><path {...p} d="M2.5 6.8h11M5.5 2v3M10.5 2v3" /></>}
      {kind === "security" && <path {...p} d="M8 2 13 4v4c0 3-2.2 5-5 6-2.8-1-5-3-5-6V4Z" />}
    </svg>
  );
}

const done: Record<string, string> = { Promote: "Promoted to production", Accept: "Accepted", Decline: "Declined", Reply: "Draft opened", "Mark all read": "Marked read", "Accept all": "All accepted", "Promote latest": "Promoted to production" };

const css = `
.hb-wj3 {
  --hb-wj3-a: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  padding: 14px;
  font-family: inherit;
  font-size: 12.5px;
  color: #ededed;
  background: radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.045), transparent 60%), #0e0e0e;
  border: 1px solid #262626;
  border-radius: 20px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 80px -40px rgba(0,0,0,0.9);
}
.hb-wj3 *, .hb-wj3 *::before, .hb-wj3 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj3-top { display: flex; align-items: center; justify-content: space-between; margin: 0 2px 12px; }
.hb-wj3-h { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -0.015em; }
.hb-wj3-n { min-width: 20px; padding: 1px 7px; font-size: 11px; font-weight: 600; color: #fff; text-align: center; background: var(--hb-wj3-a); border-radius: 999px; font-variant-numeric: tabular-nums; }
.hb-wj3-clear { padding: 4px 8px; font: inherit; font-size: 11.5px; color: #8f8f8f; background: none; border: 0; border-radius: 6px; cursor: pointer; transition: color .15s ease, background-color .15s ease; }
.hb-wj3-clear:hover { color: #fff; background: #1b1b1b; }
.hb-wj3-list { display: flex; flex-direction: column; gap: 14px; margin: 0; padding: 0; list-style: none; }
.hb-wj3-g { animation: hb-wj3-rise .4s cubic-bezier(.2,.8,.2,1) both; }
.hb-wj3-gh { display: flex; align-items: center; gap: 8px; height: 0; overflow: hidden; opacity: 0; transition: height .3s cubic-bezier(.2,.8,.2,1), opacity .2s ease, margin .3s ease; }
.hb-wj3-g[data-open="true"] .hb-wj3-gh { height: 26px; margin-bottom: 6px; opacity: 1; }
.hb-wj3-gt { flex: 1; margin: 0; font-size: 13px; font-weight: 600; }
.hb-wj3-pill { height: 24px; padding: 0 10px; font: inherit; font-size: 11px; font-weight: 500; color: #d4d4d4; background: #1b1b1b; border: 1px solid #2a2a2a; border-radius: 999px; cursor: pointer; transition: background-color .15s ease, color .15s ease; }
.hb-wj3-pill:hover { color: #fff; background: #242424; }
.hb-wj3-pill[data-tone="bulk"] { color: var(--c); border-color: color-mix(in srgb, var(--c) 35%, transparent); background: color-mix(in srgb, var(--c) 10%, #141414); }
.hb-wj3-stack { position: relative; display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.hb-wj3-card {
  position: relative;
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 10px;
  padding: 11px 12px;
  background: linear-gradient(180deg, #1a1a1a, #151515);
  border: 1px solid #262626;
  border-radius: 14px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 10px 24px -14px rgba(0,0,0,0.9);
  transform-origin: 50% 0;
  transition: transform .42s cubic-bezier(.2,1.1,.3,1), max-height .42s cubic-bezier(.2,.9,.2,1), margin .42s cubic-bezier(.2,.9,.2,1), opacity .3s ease, padding .42s ease, border-color .2s ease;
  max-height: 200px;
  overflow: hidden;
}
.hb-wj3-card + .hb-wj3-card { margin-top: 6px; }
.hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="1"] { max-height: 10px; margin-top: -2px; padding-top: 0; padding-bottom: 0; transform: scaleX(.94); opacity: .7; }
.hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="2"] { max-height: 9px; margin-top: -2px; padding-top: 0; padding-bottom: 0; transform: scaleX(.88); opacity: .4; }
.hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="3"] { max-height: 0; margin-top: 0; padding-top: 0; padding-bottom: 0; border-width: 0; opacity: 0; }
.hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="1"] > *, .hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="2"] > *, .hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="3"] > * { opacity: 0; }
.hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="0"] { cursor: pointer; }
.hb-wj3-g[data-open="false"] .hb-wj3-card[data-depth="0"]:hover { border-color: #333; }
.hb-wj3-card > * { transition: opacity .2s ease; }
.hb-wj3-card[data-leaving="true"] { max-height: 0; margin-top: 0; padding-top: 0; padding-bottom: 0; opacity: 0; transform: translateX(40px); border-width: 0; }
.hb-wj3-ic { display: grid; place-items: center; width: 30px; height: 30px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, #121212); border: 1px solid color-mix(in srgb, var(--c) 30%, transparent); border-radius: 9px; }
.hb-wj3-ic svg { width: 15px; height: 15px; }
.hb-wj3-c { min-width: 0; }
.hb-wj3-row { display: flex; align-items: baseline; gap: 8px; }
.hb-wj3-app { font-size: 10.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--c); }
.hb-wj3-time { margin-left: auto; font-size: 10.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-wj3-t { margin: 2px 0 0; font-size: 12.5px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj3-b { margin: 2px 0 0; color: #a1a1a1; line-height: 1.4; }
.hb-wj3-more { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 11px; color: #8f8f8f; }
.hb-wj3-more b { color: #d4d4d4; font-weight: 600; }
.hb-wj3-acts { display: flex; gap: 6px; margin-top: 9px; }
.hb-wj3-btn { height: 26px; padding: 0 11px; font: inherit; font-size: 11.5px; font-weight: 500; color: #ededed; background: #222; border: 1px solid #303030; border-radius: 8px; cursor: pointer; transition: background-color .15s ease, transform .1s ease; }
.hb-wj3-btn:hover { background: #2a2a2a; }
.hb-wj3-btn:active { transform: translateY(1px); }
.hb-wj3-btn[data-primary="true"] { color: #0a0a0a; background: #ededed; border-color: transparent; }
.hb-wj3-btn[data-primary="true"]:hover { background: #fff; }
.hb-wj3-ok { display: inline-flex; align-items: center; gap: 6px; margin-top: 9px; font-size: 11.5px; font-weight: 500; color: #34c78a; animation: hb-wj3-rise .3s ease both; }
.hb-wj3-ok svg { width: 13px; height: 13px; }
.hb-wj3-x { position: absolute; top: 8px; right: 8px; display: grid; place-items: center; width: 20px; height: 20px; padding: 0; color: #8f8f8f; background: #222; border: 1px solid #2e2e2e; border-radius: 50%; cursor: pointer; opacity: 0; transform: scale(.8); transition: opacity .15s ease, transform .15s ease, color .15s ease; }
.hb-wj3-x svg { width: 9px; height: 9px; }
.hb-wj3-card:hover .hb-wj3-x, .hb-wj3-x:focus-visible { opacity: 1; transform: none; }
.hb-wj3-x:hover { color: #fff; }
.hb-wj3-card:hover .hb-wj3-time { visibility: hidden; }
.hb-wj3-empty { display: grid; place-items: center; gap: 6px; padding: 34px 0; color: #8f8f8f; text-align: center; animation: hb-wj3-rise .4s ease both; }
.hb-wj3-empty svg { width: 28px; height: 28px; color: #3a3a3a; }
.hb-wj3-btn:focus-visible, .hb-wj3-pill:focus-visible, .hb-wj3-clear:focus-visible, .hb-wj3-card:focus-visible { outline: 2px solid var(--hb-wj3-a); outline-offset: 2px; }
@keyframes hb-wj3-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-wj3-card, .hb-wj3-gh, .hb-wj3-card > * { transition: none; }
  .hb-wj3-g, .hb-wj3-ok, .hb-wj3-empty { animation: none; }
}
`;

export function AppNotificationGroups({
  groups = sampleGroups,
  defaultExpanded = null,
  title = "Notifications",
  accent = "#2f7bff",
  onAction,
  onBulkAction,
  onDismiss,
  className,
  style,
  ...rest
}: AppNotificationGroupsProps) {
  const [open, setOpen] = React.useState<string | null>(defaultExpanded);
  const [gone, setGone] = React.useState<Set<string>>(() => new Set());
  const [leaving, setLeaving] = React.useState<Set<string>>(() => new Set());
  const [resolved, setResolved] = React.useState<Record<string, string>>({});
  const timers = React.useRef<number[]>([]);

  React.useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const remove = (ids: string[]) => {
    setLeaving((s) => new Set([...s, ...ids]));
    timers.current.push(
      window.setTimeout(() => {
        setGone((s) => new Set([...s, ...ids]));
        setLeaving((s) => {
          const n = new Set(s);
          ids.forEach((id) => n.delete(id));
          return n;
        });
      }, 380),
    );
  };

  const visible = groups.map((g) => ({ ...g, items: g.items.filter((i) => !gone.has(i.id)) })).filter((g) => g.items.length > 0);
  const total = visible.reduce((s, g) => s + g.items.filter((i) => !resolved[i.id]).length, 0);

  const act = (g: NotificationGroup, item: NotificationGroupItem, action: string) => {
    onAction?.(g.id, item.id, action);
    if (done[action]) {
      setResolved((r) => ({ ...r, [item.id]: done[action] }));
      timers.current.push(window.setTimeout(() => remove([item.id]), 1500));
    }
  };

  const bulk = (g: NotificationGroup) => {
    if (!g.bulkAction) return;
    onBulkAction?.(g.id, g.bulkAction);
    const label = done[g.bulkAction] ?? "Done";
    setResolved((r) => ({ ...r, ...Object.fromEntries(g.items.map((i) => [i.id, label])) }));
    timers.current.push(window.setTimeout(() => remove(g.items.map((i) => i.id)), 1300));
  };

  return (
    <div className={["hb-wj3", className].filter(Boolean).join(" ")} style={{ "--hb-wj3-a": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-notification-groups" precedence="default">{css}</style>
      <div className="hb-wj3-top">
        <h3 className="hb-wj3-h">
          {title} {total > 0 && <span className="hb-wj3-n">{total}</span>}
        </h3>
        {visible.length > 0 && (
          <button type="button" className="hb-wj3-clear" onClick={() => { onDismiss?.("all", null); remove(visible.flatMap((g) => g.items.map((i) => i.id))); }}>
            Clear all
          </button>
        )}
      </div>
      {visible.length === 0 ? (
        <div className="hb-wj3-empty" role="status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15ZM10 20.5a2.2 2.2 0 0 0 4 0" /></svg>
          <span>You are all caught up.</span>
        </div>
      ) : (
        <ul className="hb-wj3-list">
          {visible.map((g) => {
            const isOpen = open === g.id || g.items.length === 1;
            return (
              <li key={g.id} className="hb-wj3-g" data-open={isOpen} style={{ "--c": g.color } as React.CSSProperties}>
                <div className="hb-wj3-gh" aria-hidden={!isOpen}>
                  <p className="hb-wj3-gt">{g.app}</p>
                  {g.bulkAction && g.items.length > 1 && (
                    <button type="button" className="hb-wj3-pill" data-tone="bulk" tabIndex={isOpen ? 0 : -1} onClick={() => bulk(g)}>
                      {g.bulkAction}
                    </button>
                  )}
                  {g.items.length > 1 && (
                    <button type="button" className="hb-wj3-pill" tabIndex={isOpen ? 0 : -1} onClick={() => setOpen(null)}>
                      Show less
                    </button>
                  )}
                </div>
                <ul className="hb-wj3-stack">
                  {g.items.map((item, depth) => {
                    const top = depth === 0;
                    const collapsedTop = !isOpen && top;
                    const hidden = !isOpen && !top;
                    return (
                      <li
                        key={item.id}
                        className="hb-wj3-card"
                        data-depth={Math.min(depth, 3)}
                        data-leaving={leaving.has(item.id)}
                        aria-hidden={hidden || undefined}
                        tabIndex={collapsedTop ? 0 : undefined}
                        role={collapsedTop ? "button" : undefined}
                        aria-expanded={collapsedTop ? false : undefined}
                        aria-label={collapsedTop ? `${g.app}: ${g.items.length} notifications. Expand.` : undefined}
                        onClick={collapsedTop ? () => setOpen(g.id) : undefined}
                        onKeyDown={collapsedTop ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(g.id); } } : undefined}
                      >
                        <span className="hb-wj3-ic"><Glyph kind={g.glyph} /></span>
                        <div className="hb-wj3-c">
                          <div className="hb-wj3-row">
                            <span className="hb-wj3-app">{g.app}</span>
                            <span className="hb-wj3-time">{item.time}</span>
                          </div>
                          <p className="hb-wj3-t">{item.title}</p>
                          <p className="hb-wj3-b">{item.body}</p>
                          {collapsedTop && g.items.length > 1 ? (
                            <span className="hb-wj3-more"><b>+{g.items.length - 1}</b> more from {g.app}</span>
                          ) : resolved[item.id] ? (
                            <span className="hb-wj3-ok" role="status">
                              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
                              {resolved[item.id]}
                            </span>
                          ) : (
                            !hidden && item.actions && item.actions.length > 0 && (
                              <div className="hb-wj3-acts">
                                {item.actions.map((a, k) => (
                                  <button key={a} type="button" className="hb-wj3-btn" data-primary={k === 0} onClick={(e) => { e.stopPropagation(); act(g, item, a); }}>
                                    {a}
                                  </button>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                        {!hidden && (
                          <button type="button" className="hb-wj3-x" aria-label={`Dismiss ${item.title}`} onClick={(e) => { e.stopPropagation(); onDismiss?.(g.id, collapsedTop ? null : item.id); remove(collapsedTop ? g.items.map((i) => i.id) : [item.id]); }}>
                            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m2 2 6 6M8 2 2 8" /></svg>
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
