"use client";

import * as React from "react";

export type MemoryScope = "user" | "project" | "chat";

export interface ScopedFact {
  id: string;
  text: string;
  scope: MemoryScope;
  pinned?: boolean;
  enabled?: boolean;
}

export interface AgentMemoryScopesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  facts?: ScopedFact[];
  defaultFacts?: ScopedFact[];
  onFactsChange?: (facts: ScopedFact[]) => void;
  recalledIds?: string[];
  budget?: number;
  defaultScope?: MemoryScope;
  title?: string;
  accent?: string;
}

const sampleFacts: ScopedFact[] = [
  { id: "f1", scope: "user", text: "Goes by Sam, writes in British English.", pinned: true },
  { id: "f2", scope: "user", text: "Prefers diffs over full files when reviewing code." },
  { id: "f3", scope: "user", text: "Works 9:00 to 17:30 Lisbon time, no meetings on Fridays." },
  { id: "f4", scope: "project", text: "Monorepo uses pnpm workspaces and Turborepo.", pinned: true },
  { id: "f5", scope: "project", text: "API errors follow RFC 9457 problem+json." },
  { id: "f6", scope: "project", text: "Money is stored as integer cents, never floats." },
  { id: "f7", scope: "project", text: "Feature flags live in config/flags.yaml and ship dark by default." },
  { id: "f8", scope: "chat", text: "We are fixing proration for February invoices." },
  { id: "f9", scope: "chat", text: "Tests must pass on Node 22 and 24." },
];

const scopeMeta: Record<MemoryScope, { label: string; color: string; hint: string }> = {
  user: { label: "You", color: "#9a7bff", hint: "Follows you across projects" },
  project: { label: "Project", color: "#3cc6e0", hint: "Shared with everyone in harbor-api" },
  chat: { label: "This chat", color: "#f0b24a", hint: "Forgotten when the chat ends" },
};
const order: MemoryScope[] = ["user", "project", "chat"];
const tokens = (t: string) => Math.ceil(t.length / 4) + 3;

const css = `
.hb-wj7 {
  --hb-wj7-a: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  font-family: inherit;
  font-size: 12px;
  color: #ededed;
  background: linear-gradient(180deg, #141414, #0f0f0f);
  border: 1px solid #262626;
  border-radius: 14px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 60px -36px rgba(0,0,0,0.9);
  overflow: hidden;
}
.hb-wj7 *, .hb-wj7 *::before, .hb-wj7 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj7-top { padding: 11px 12px 9px; }
.hb-wj7-hr { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.hb-wj7-h { margin: 0; font-size: 12.5px; font-weight: 600; letter-spacing: -0.01em; }
.hb-wj7-use { font-size: 10.5px; color: #8f8f8f; font-variant-numeric: tabular-nums; }
.hb-wj7-use b { color: #ededed; font-weight: 600; }
.hb-wj7-use[data-over="true"] b { color: #ff6b5f; }
.hb-wj7-meter { position: relative; display: flex; gap: 2px; height: 6px; margin-top: 7px; padding: 0; overflow: hidden; background: #1c1c1c; border-radius: 4px; }
.hb-wj7-seg { height: 100%; background: var(--c); border-radius: 2px; transition: width .45s cubic-bezier(.2,.8,.2,1); }
.hb-wj7-tabs { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); margin: 0 12px; border-bottom: 1px solid #222; }
.hb-wj7-tab { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 4px 8px; font: inherit; font-size: 11.5px; font-weight: 500; color: #8f8f8f; background: none; border: 0; cursor: pointer; transition: color .15s ease; }
.hb-wj7-tab i { width: 6px; height: 6px; border-radius: 50%; background: var(--c); font-style: normal; opacity: .55; transition: opacity .15s ease; }
.hb-wj7-tab small { font-size: 10px; color: #5f5f5f; font-variant-numeric: tabular-nums; }
.hb-wj7-tab[aria-selected="true"] { color: #fff; }
.hb-wj7-tab[aria-selected="true"] i { opacity: 1; }
.hb-wj7-ind { position: absolute; bottom: -1px; left: 0; width: calc(100% / 3); height: 2px; background: var(--c); border-radius: 2px; transition: transform .35s cubic-bezier(.3,1.2,.4,1), background-color .3s ease; }
.hb-wj7-hint { margin: 7px 12px 2px; font-size: 10.5px; color: #6f6f6f; }
.hb-wj7-list { margin: 0; padding: 2px 6px; list-style: none; }
.hb-wj7-f { position: relative; display: grid; grid-template-columns: 26px 1fr auto; align-items: center; gap: 4px; padding: 4px 4px 4px 2px; border-radius: 9px; animation: hb-wj7-in .32s cubic-bezier(.2,.8,.2,1) both; transition: background-color .15s ease, opacity .2s ease; }
.hb-wj7-f:hover, .hb-wj7-f:focus-within { background: #191919; }
.hb-wj7-f[data-off="true"] .hb-wj7-tx, .hb-wj7-f[data-cut="true"] .hb-wj7-tx { color: #6a6a6a; }
.hb-wj7-f[data-recalled="true"]::before { content: ""; position: absolute; inset: 0; border-radius: 9px; border: 1px solid color-mix(in srgb, var(--c) 55%, transparent); background: color-mix(in srgb, var(--c) 7%, transparent); animation: hb-wj7-glow 2.4s ease-in-out infinite; pointer-events: none; }
.hb-wj7-sw { position: relative; justify-self: center; width: 20px; height: 12px; padding: 0; background: #2a2a2a; border: 0; border-radius: 999px; cursor: pointer; transition: background-color .2s ease; }
.hb-wj7-sw::after { content: ""; position: absolute; top: 2px; left: 2px; width: 8px; height: 8px; border-radius: 50%; background: #8f8f8f; transition: transform .25s cubic-bezier(.3,1.5,.5,1), background-color .2s ease; }
.hb-wj7-sw[aria-checked="true"] { background: color-mix(in srgb, var(--c) 45%, #1a1a1a); }
.hb-wj7-sw[aria-checked="true"]::after { transform: translateX(8px); background: #fff; }
.hb-wj7-body { min-width: 0; }
.hb-wj7-tx { display: block; width: 100%; padding: 2px 4px; font: inherit; font-size: 12px; line-height: 1.35; text-align: left; color: #e5e5e5; background: none; border: 0; border-radius: 5px; cursor: text; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .2s ease; }
.hb-wj7-ed { display: block; width: 100%; padding: 2px 6px; font: inherit; font-size: 12px; line-height: 1.35; color: #fff; background: #0a0a0a; border: 1px solid var(--hb-wj7-a); border-radius: 6px; outline: none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wj7-a) 22%, transparent); }
.hb-wj7-tags { display: flex; gap: 5px; padding: 0 4px; min-height: 0; }
.hb-wj7-tag { margin-top: 1px; font-size: 9.5px; font-weight: 500; color: #6f6f6f; white-space: nowrap; font-variant-numeric: tabular-nums; }
.hb-wj7-tag[data-k="recall"] { color: var(--c); }
.hb-wj7-tag[data-k="cut"] { color: #ff8a80; }
.hb-wj7-acts { display: flex; gap: 1px; }
.hb-wj7-ib { display: grid; place-items: center; width: 22px; height: 22px; padding: 0; color: #6f6f6f; background: none; border: 0; border-radius: 6px; cursor: pointer; transition: color .15s ease, background-color .15s ease, opacity .15s ease; }
.hb-wj7-ib svg { width: 12px; height: 12px; }
.hb-wj7-ib:hover { color: #fff; background: #242424; }
.hb-wj7-ib[data-k="del"] { opacity: 0; }
.hb-wj7-f:hover .hb-wj7-ib[data-k="del"], .hb-wj7-ib[data-k="del"]:focus-visible { opacity: 1; }
.hb-wj7-ib[data-k="del"]:hover { color: #ff7a7a; background: rgba(255,90,79,0.12); }
.hb-wj7-ib[aria-pressed="true"] { color: var(--c); }
.hb-wj7-add { display: flex; align-items: center; gap: 8px; margin: 4px 12px 12px; padding: 0 4px 0 10px; height: 32px; background: #0b0b0b; border: 1px solid #262626; border-radius: 9px; transition: border-color .15s ease, box-shadow .2s ease; }
.hb-wj7-add:focus-within { border-color: color-mix(in srgb, var(--hb-wj7-a) 70%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wj7-a) 18%, transparent); }
.hb-wj7-add svg { flex: none; width: 13px; height: 13px; color: #6f6f6f; }
.hb-wj7-add input { flex: 1; min-width: 0; height: 100%; padding: 0; font: inherit; font-size: 12px; color: #ededed; background: none; border: 0; outline: none; }
.hb-wj7-add input::placeholder { color: #5f5f5f; }
.hb-wj7-add button { height: 24px; padding: 0 9px; font: inherit; font-size: 11px; font-weight: 500; color: #fff; background: var(--hb-wj7-a); border: 0; border-radius: 6px; cursor: pointer; transition: opacity .15s ease; }
.hb-wj7-add button:disabled { opacity: .3; cursor: default; }
.hb-wj7-tab:focus-visible, .hb-wj7-sw:focus-visible, .hb-wj7-tx:focus-visible, .hb-wj7-ib:focus-visible, .hb-wj7-add button:focus-visible { outline: 2px solid var(--hb-wj7-a); outline-offset: 1px; }
@keyframes hb-wj7-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@keyframes hb-wj7-glow { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .hb-wj7 *, .hb-wj7 *::before, .hb-wj7 *::after { transition: none !important; animation: none !important; }
}
`;

export function AgentMemoryScopes({
  facts,
  defaultFacts = sampleFacts,
  onFactsChange,
  recalledIds = ["f6", "f8"],
  budget = 120,
  defaultScope = "project",
  title = "Memory",
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: AgentMemoryScopesProps) {
  const [inner, setInner] = React.useState(defaultFacts);
  const list = facts ?? inner;
  const [scope, setScope] = React.useState<MemoryScope>(defaultScope);
  const [editing, setEditing] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState("");
  const [adding, setAdding] = React.useState("");
  const counter = React.useRef(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const commit = (next: ScopedFact[]) => {
    if (facts === undefined) setInner(next);
    onFactsChange?.(next);
  };

  const packed = React.useMemo(() => {
    const included = new Set<string>();
    let used = 0;
    const live = list.filter((f) => f.enabled !== false);
    const ranked = [...live.filter((f) => f.pinned), ...live.filter((f) => !f.pinned)];
    for (const f of ranked) {
      const t = tokens(f.text);
      if (f.pinned || used + t <= budget) {
        included.add(f.id);
        used += t;
      }
    }
    const byScope = order.map((s) => list.filter((f) => f.scope === s && included.has(f.id)).reduce((n, f) => n + tokens(f.text), 0));
    return { included, used, byScope };
  }, [list, budget]);

  const patch = (id: string, p: Partial<ScopedFact>) => commit(list.map((f) => (f.id === id ? { ...f, ...p } : f)));
  const shown = list.filter((f) => f.scope === scope);
  const idx = order.indexOf(scope);
  const c = scopeMeta[scope].color;
  const recalled = new Set(recalledIds);

  const saveEdit = () => {
    if (editing && draft.trim()) patch(editing, { text: draft.trim() });
    setEditing(null);
  };

  const add = () => {
    const text = adding.trim();
    if (!text) return;
    counter.current += 1;
    commit([...list, { id: `new-${counter.current}`, text, scope, enabled: true }]);
    setAdding("");
  };

  return (
    <div className={["hb-wj7", className].filter(Boolean).join(" ")} style={{ "--hb-wj7-a": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-agent-memory-scopes" precedence="default">{css}</style>
      <div className="hb-wj7-top">
        <div className="hb-wj7-hr">
          <h3 className="hb-wj7-h">{title}</h3>
          <span className="hb-wj7-use" data-over={packed.used > budget}>
            <b>{packed.used}</b> / {budget} tokens in context
          </span>
        </div>
        <div className="hb-wj7-meter" role="meter" aria-label="Context budget" aria-valuemin={0} aria-valuemax={budget} aria-valuenow={packed.used}>
          {order.map((s, i) => (
            <span key={s} className="hb-wj7-seg" title={`${scopeMeta[s].label}: ${packed.byScope[i]} tokens`} style={{ "--c": scopeMeta[s].color, width: `${Math.min(100, (packed.byScope[i] / Math.max(budget, packed.used)) * 100).toFixed(2)}%` } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="hb-wj7-tabs" role="tablist" aria-label="Memory scope">
        {order.map((s, i) => (
          <button
            key={s}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={scope === s}
            tabIndex={scope === s ? 0 : -1}
            className="hb-wj7-tab"
            style={{ "--c": scopeMeta[s].color } as React.CSSProperties}
            onClick={() => setScope(s)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const n = (i + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3;
              setScope(order[n]);
              tabRefs.current[n]?.focus();
            }}
          >
            <i />
            {scopeMeta[s].label}
            <small>{list.filter((f) => f.scope === s).length}</small>
          </button>
        ))}
        <span className="hb-wj7-ind" style={{ "--c": c, transform: `translateX(${idx * 100}%)` } as React.CSSProperties} />
      </div>
      <p className="hb-wj7-hint">{scopeMeta[scope].hint}</p>
      <ul className="hb-wj7-list" role="tabpanel" aria-label={`${scopeMeta[scope].label} memories`}>
        {shown.map((f) => {
          const on = f.enabled !== false;
          const cut = on && !packed.included.has(f.id);
          const isRecalled = recalled.has(f.id) && on && !cut;
          return (
            <li key={f.id} className="hb-wj7-f" data-off={!on} data-cut={cut} data-recalled={isRecalled} style={{ "--c": c } as React.CSSProperties}>
              <button type="button" role="switch" aria-checked={on} aria-label={on ? "Exclude from context" : "Include in context"} className="hb-wj7-sw" onClick={() => patch(f.id, { enabled: !on })} />
              <div className="hb-wj7-body">
                {editing === f.id ? (
                  <input
                    className="hb-wj7-ed"
                    autoFocus
                    value={draft}
                    aria-label="Edit memory"
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") setEditing(null);
                    }}
                  />
                ) : (
                  <button type="button" className="hb-wj7-tx" title={`${f.text} (click to edit)`} onClick={() => { setEditing(f.id); setDraft(f.text); }}>
                    {f.text}
                  </button>
                )}
                <div className="hb-wj7-tags">
                  <span className="hb-wj7-tag">{tokens(f.text)} tok</span>
                  {isRecalled && <span className="hb-wj7-tag" data-k="recall">Used in last reply</span>}
                  {cut && <span className="hb-wj7-tag" data-k="cut">Over budget, not sent</span>}
                  {!on && <span className="hb-wj7-tag">Paused</span>}
                </div>
              </div>
              <div className="hb-wj7-acts">
                <button type="button" className="hb-wj7-ib" aria-pressed={!!f.pinned} aria-label={f.pinned ? "Unpin" : "Pin, always send"} onClick={() => patch(f.id, { pinned: !f.pinned })}>
                  <svg viewBox="0 0 16 16" fill={f.pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M9.5 2.5 13.5 6.5 11 7.5 8.5 10l.5 3-6.5-6.5 3 .5L8 4.5Z" /><path d="m5 11-2.5 2.5" /></svg>
                </button>
                <button type="button" className="hb-wj7-ib" data-k="del" aria-label="Forget" onClick={() => commit(list.filter((x) => x.id !== f.id))}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" /></svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <form className="hb-wj7-add" onSubmit={(e) => { e.preventDefault(); add(); }}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>
        <input value={adding} onChange={(e) => setAdding(e.target.value)} placeholder={`Remember for ${scopeMeta[scope].label.toLowerCase()}…`} aria-label="New memory" />
        <button type="submit" disabled={!adding.trim()}>Save</button>
      </form>
    </div>
  );
}
