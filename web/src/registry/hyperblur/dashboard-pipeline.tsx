"use client";

import * as React from "react";

export interface PipelineStage {
  id: string;
  label: string;
  probability: number;
  color: string;
}

export interface PipelineDeal {
  id: string;
  company: string;
  title: string;
  value: number;
  stage: string;
  owner: string;
  days: number;
  close: string;
}

export interface DashboardPipelineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  brand?: string;
  stages?: PipelineStage[];
  deals?: PipelineDeal[];
  defaultDeals?: PipelineDeal[];
  onChange?: (deals: PipelineDeal[]) => void;
  quota?: number;
  quarter?: string;
  currency?: string;
  accent?: string;
  staleAfter?: number;
}

const defaultStages: PipelineStage[] = [
  { id: "lead", label: "Lead", probability: 0.1, color: "#6b7280" },
  { id: "qualified", label: "Qualified", probability: 0.25, color: "#7fb3ff" },
  { id: "proposal", label: "Proposal", probability: 0.5, color: "#a78bfa" },
  { id: "negotiation", label: "Negotiation", probability: 0.75, color: "#f5b544" },
  { id: "won", label: "Closed won", probability: 1, color: "#4ade80" },
];

const sampleDeals: PipelineDeal[] = [
  { id: "d1", company: "Larkspur Health", title: "Claims team expansion", value: 84000, stage: "negotiation", owner: "Maya Chen", days: 6, close: "Nov 28" },
  { id: "d2", company: "Tidewater Freight", title: "Fleet analytics pilot", value: 36000, stage: "proposal", owner: "Jonah Reyes", days: 19, close: "Dec 12" },
  { id: "d3", company: "Quill & Ledger", title: "Growth to Scale upgrade", value: 18500, stage: "qualified", owner: "Priya Raman", days: 4, close: "Dec 20" },
  { id: "d4", company: "Meridian Civic", title: "Records portal, 3 agencies", value: 126000, stage: "proposal", owner: "Maya Chen", days: 11, close: "Dec 30" },
  { id: "d5", company: "Cobalt Studio", title: "Team plan, 25 seats", value: 9000, stage: "lead", owner: "Leo Marsh", days: 2, close: "Jan 15" },
  { id: "d6", company: "Northbeam Labs", title: "SSO and audit add-on", value: 22000, stage: "won", owner: "Priya Raman", days: 0, close: "Nov 3" },
  { id: "d7", company: "Harbor & Pine", title: "Retail ops rollout", value: 54000, stage: "qualified", owner: "Jonah Reyes", days: 16, close: "Jan 9" },
  { id: "d8", company: "Fernvale Schools", title: "District license", value: 71000, stage: "won", owner: "Maya Chen", days: 0, close: "Oct 29" },
  { id: "d9", company: "Atlas Robotics", title: "Data residency EU", value: 42000, stage: "negotiation", owner: "Leo Marsh", days: 22, close: "Dec 5" },
  { id: "d10", company: "Kestrel Bank", title: "Discovery workshop", value: 150000, stage: "lead", owner: "Priya Raman", days: 7, close: "Feb 27" },
  { id: "d11", company: "Sundial Foods", title: "Supplier portal", value: 27500, stage: "proposal", owner: "Leo Marsh", days: 3, close: "Dec 18" },
];

function money(v: number, c: string) {
  if (v >= 1e6) return `${c}${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${c}${(v / 1e3).toFixed(v >= 1e5 ? 0 : 1)}k`;
  return `${c}${Math.round(v)}`;
}

function hueOf(n: string) {
  let h = 3;
  for (let i = 0; i < n.length; i++) h = (Math.imul(h, 33) + n.charCodeAt(i)) >>> 0;
  return h % 360;
}

const ini = (n: string) =>
  n
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

const css = `
.hb-wi11 {
  --hb-wi11-a: #2f7bff;
  container-type: inline-size;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #222;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
}
.hb-wi11 *, .hb-wi11 *::before, .hb-wi11 *::after { box-sizing: border-box; }
.hb-wi11 button { font-family: inherit; }
.hb-wi11 button:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi11-top { display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
.hb-wi11-h b { display: block; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
.hb-wi11-h span { font-size: 12px; color: #6f6f6f; }
.hb-wi11-owners { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.hb-wi11-owners small { font-size: 11px; color: #6f6f6f; }
.hb-wi11-own { width: 28px; height: 28px; margin-left: -7px; border-radius: 50%; border: 2px solid #0a0a0a; display: grid; place-items: center; font-size: 10px; font-weight: 700; color: #fff; cursor: pointer; padding: 0; transition: transform 0.25s cubic-bezier(0.34, 1.6, 0.64, 1), opacity 0.2s ease, box-shadow 0.2s ease; }
.hb-wi11-own:hover { transform: translateY(-2px); z-index: 1; }
.hb-wi11[data-filter="true"] .hb-wi11-own[aria-pressed="false"] { opacity: 0.35; }
.hb-wi11-own[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--hb-wi11-a); z-index: 1; }
.hb-wi11-quota { padding: 14px 16px; border-radius: 13px; border: 1px solid #1f1f1f; background: linear-gradient(#111, #0e0e0e); margin-bottom: 14px; }
.hb-wi11-qh { display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap; margin-bottom: 12px; }
.hb-wi11-qh div { display: flex; flex-direction: column; gap: 2px; }
.hb-wi11-qh small { font-size: 11px; color: #8f8f8f; display: inline-flex; align-items: center; gap: 6px; }
.hb-wi11-qh small i { width: 8px; height: 8px; border-radius: 2px; }
.hb-wi11-qh strong { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.hb-wi11-qh .hb-wi11-att { margin-left: auto; text-align: right; }
.hb-wi11-att strong { color: var(--hb-wi11-a); }
.hb-wi11-meter { position: relative; height: 12px; border-radius: 6px; background: #1a1a1a; }
.hb-wi11-meter span { position: absolute; top: 0; bottom: 0; left: 0; border-radius: 6px; transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.hb-wi11-won { background: linear-gradient(90deg, #22a35a, #4ade80); box-shadow: 0 0 14px rgba(74, 222, 128, 0.35); z-index: 2; }
.hb-wi11-fc { background: repeating-linear-gradient(-45deg, color-mix(in srgb, var(--hb-wi11-a) 75%, transparent) 0 4px, color-mix(in srgb, var(--hb-wi11-a) 30%, transparent) 4px 8px); z-index: 1; }
.hb-wi11-goal { position: absolute; top: -5px; bottom: -5px; width: 2px; border-radius: 1px; background: #ededed; z-index: 3; }
.hb-wi11-goal::after { content: attr(data-l); position: absolute; top: -16px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #a1a1a1; white-space: nowrap; }
.hb-wi11-board { display: grid; grid-template-columns: repeat(var(--hb-wi11-n, 5), minmax(190px, 1fr)); gap: 10px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-wi11-col { display: flex; flex-direction: column; gap: 6px; min-height: 260px; padding: 8px; border-radius: 12px; background: #0e0e0e; border: 1px solid #1a1a1a; transition: background 0.2s ease, border-color 0.2s ease; }
.hb-wi11-col[data-over="true"] { background: color-mix(in srgb, var(--hb-wi11-s) 7%, #0e0e0e); border-color: color-mix(in srgb, var(--hb-wi11-s) 45%, #1a1a1a); }
.hb-wi11-ch { padding: 4px 4px 8px; border-bottom: 1px solid #1a1a1a; margin-bottom: 2px; }
.hb-wi11-ct { display: flex; align-items: center; gap: 7px; font-weight: 600; font-size: 12px; }
.hb-wi11-ct i { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-wi11-s); }
.hb-wi11-ct span { font-weight: 500; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-wi11-ct em { margin-left: auto; font-style: normal; font-size: 10.5px; font-weight: 500; color: #8f8f8f; padding: 1px 6px; border-radius: 5px; background: #171717; }
.hb-wi11-cv { display: flex; justify-content: space-between; margin-top: 5px; font-size: 11px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-wi11-cv b { color: #ededed; font-weight: 600; font-size: 13px; }
.hb-wi11-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 10px 9px;
  border-radius: 10px;
  border: 1px solid #222;
  background: linear-gradient(#161616, #131313);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035), 0 1px 2px rgba(0, 0, 0, 0.4);
  cursor: grab;
  outline: none;
  animation: hb-wi11-pop 0.4s cubic-bezier(0.34, 1.4, 0.64, 1) both;
  transition: border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
}
@keyframes hb-wi11-pop { from { opacity: 0; transform: translateY(6px) scale(0.97); } }
.hb-wi11-card:hover { border-color: #303030; transform: translateY(-1px); }
.hb-wi11-card:focus-visible { border-color: var(--hb-wi11-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-wi11-a) 25%, transparent); }
.hb-wi11-card[data-dragging="true"] { opacity: 0.35; }
.hb-wi11-card::before { content: ""; position: absolute; left: -1px; top: 10px; bottom: 10px; width: 2px; border-radius: 2px; background: var(--hb-wi11-s); }
.hb-wi11-co { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.hb-wi11-co b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi11-co span { font-weight: 600; font-variant-numeric: tabular-nums; color: #ededed; }
.hb-wi11-ti { font-size: 11.5px; color: #8f8f8f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wi11-ft { display: flex; align-items: center; gap: 6px; font-size: 10.5px; color: #6f6f6f; }
.hb-wi11-av { width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; font-size: 8px; font-weight: 700; color: #fff; }
.hb-wi11-stale { display: inline-flex; align-items: center; gap: 4px; height: 17px; padding: 0 5px; border-radius: 5px; background: rgba(245, 181, 68, 0.1); color: #f5b544; font-weight: 500; }
.hb-wi11-ft time { margin-left: auto; font-variant-numeric: tabular-nums; }
.hb-wi11-drop { height: 36px; border-radius: 9px; border: 1px dashed color-mix(in srgb, var(--hb-wi11-s) 50%, #2a2a2a); display: grid; place-items: center; font-size: 11px; color: #6f6f6f; opacity: 0; transition: opacity 0.2s ease; }
.hb-wi11-col[data-over="true"] .hb-wi11-drop, .hb-wi11-col[data-empty="true"] .hb-wi11-drop { opacity: 1; }
.hb-wi11-hint { margin-top: 10px; font-size: 11px; color: #5f5f5f; }
.hb-wi11-hint kbd { font-family: inherit; font-size: 10px; padding: 1px 5px; border-radius: 4px; border: 1px solid #2a2a2a; background: #141414; color: #a1a1a1; }
.hb-wi11-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 560px) {
  .hb-wi11 { padding: 14px; }
  .hb-wi11-owners { margin-left: 0; }
  .hb-wi11-qh .hb-wi11-att { margin-left: 0; text-align: left; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi11-card { animation: none; transition: none; }
  .hb-wi11-meter span, .hb-wi11-own { transition: none; }
}
`;

export function DashboardPipeline({
  brand = "Dealflow",
  stages = defaultStages,
  deals,
  defaultDeals = sampleDeals,
  onChange,
  quota = 420000,
  quarter = "Q4 2026",
  currency = "$",
  accent = "#2f7bff",
  staleAfter = 14,
  className,
  style,
  ...rest
}: DashboardPipelineProps) {
  const [inner, setInner] = React.useState(defaultDeals);
  const list = deals ?? inner;
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [over, setOver] = React.useState<string | null>(null);
  const [owners, setOwners] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const cardRefs = React.useRef(new Map<string, HTMLDivElement>());

  const commit = (next: PipelineDeal[]) => {
    if (deals === undefined) setInner(next);
    onChange?.(next);
  };

  const moveTo = (id: string, stage: string) => {
    const d = list.find((x) => x.id === id);
    if (!d || d.stage === stage) return;
    const next = list.map((x) => (x.id === id ? { ...x, stage, days: 0 } : x));
    commit(next);
    const s = stages.find((x) => x.id === stage);
    setMessage(`${d.company} moved to ${s?.label ?? stage}`);
  };

  const people = [...new Set(list.map((d) => d.owner))];
  const visible = list.filter((d) => owners.length === 0 || owners.includes(d.owner));
  const prob = (id: string) => stages.find((s) => s.id === id)?.probability ?? 0;
  const won = visible.filter((d) => prob(d.stage) >= 1).reduce((a, d) => a + d.value, 0);
  const weighted = visible.filter((d) => prob(d.stage) < 1).reduce((a, d) => a + d.value * prob(d.stage), 0);
  const open = visible.filter((d) => prob(d.stage) < 1).reduce((a, d) => a + d.value, 0);
  const scale = Math.max(quota, won + weighted) * 1.08;
  const attain = (won / Math.max(1, quota)) * 100;

  return (
    <div
      {...rest}
      className={["hb-wi11", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi11-a" as string]: accent, ["--hb-wi11-n" as string]: stages.length } as React.CSSProperties}
      data-filter={owners.length > 0}
    >
      <style href="hb-dashboard-pipeline" precedence="default">{css}</style>
      <div className="hb-wi11-top">
        <div className="hb-wi11-h">
          <b>{brand} pipeline</b>
          <span>
            {quarter} · {visible.filter((d) => prob(d.stage) < 1).length} open deals · {money(open, currency)} open value
          </span>
        </div>
        <div className="hb-wi11-owners" role="group" aria-label="Filter by owner">
          <small>Owners</small>
          <div style={{ display: "flex", paddingLeft: 7 }}>
            {people.map((p) => (
              <button
                key={p}
                type="button"
                className="hb-wi11-own"
                aria-pressed={owners.includes(p)}
                aria-label={p}
                title={p}
                style={{ background: `linear-gradient(135deg, hsl(${hueOf(p)} 60% 52%), hsl(${(hueOf(p) + 35) % 360} 55% 36%))` }}
                onClick={() => setOwners((o) => (o.includes(p) ? o.filter((x) => x !== p) : [...o, p]))}
              >
                {ini(p)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="hb-wi11-quota">
        <div className="hb-wi11-qh">
          <div>
            <small>
              <i style={{ background: "#4ade80" }} />
              Closed won
            </small>
            <strong>{money(won, currency)}</strong>
          </div>
          <div>
            <small>
              <i style={{ background: `repeating-linear-gradient(-45deg, ${accent} 0 2px, transparent 2px 4px)` }} />
              Weighted forecast
            </small>
            <strong>{money(weighted, currency)}</strong>
          </div>
          <div>
            <small>Quota</small>
            <strong>{money(quota, currency)}</strong>
          </div>
          <div className="hb-wi11-att">
            <small>Attainment</small>
            <strong>{attain.toFixed(0)}%</strong>
          </div>
        </div>
        <div className="hb-wi11-meter" role="img" aria-label={`Closed won ${money(won, currency)} plus weighted forecast ${money(weighted, currency)} against a quota of ${money(quota, currency)}`}>
          <span className="hb-wi11-won" style={{ width: `${((won / scale) * 100).toFixed(2)}%` }} />
          <span className="hb-wi11-fc" style={{ width: `${(((won + weighted) / scale) * 100).toFixed(2)}%` }} />
          <i className="hb-wi11-goal" data-l="Quota" style={{ left: `${((quota / scale) * 100).toFixed(2)}%` }} />
        </div>
      </div>
      <div className="hb-wi11-board">
        {stages.map((s, si) => {
          const items = visible.filter((d) => d.stage === s.id);
          const sum = items.reduce((a, d) => a + d.value, 0);
          return (
            <section
              key={s.id}
              className="hb-wi11-col"
              aria-label={`${s.label}, ${items.length} deals`}
              data-over={over === s.id}
              data-empty={items.length === 0}
              style={{ ["--hb-wi11-s" as string]: s.color } as React.CSSProperties}
              onDragOver={(e) => {
                if (!dragging) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (over !== s.id) setOver(s.id);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver((o) => (o === s.id ? null : o));
              }}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain") || dragging;
                if (id) moveTo(id, s.id);
                setOver(null);
                setDragging(null);
              }}
            >
              <div className="hb-wi11-ch">
                <div className="hb-wi11-ct">
                  <i />
                  {s.label}
                  <span>{items.length}</span>
                  <em>{Math.round(s.probability * 100)}%</em>
                </div>
                <div className="hb-wi11-cv">
                  <b>{money(sum, currency)}</b>
                  <span>{money(sum * s.probability, currency)} weighted</span>
                </div>
              </div>
              {items.map((d, i) => {
                const stale = d.days >= staleAfter && s.probability < 1;
                return (
                  <div
                    key={d.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(d.id, el);
                      else cardRefs.current.delete(d.id);
                    }}
                    className="hb-wi11-card"
                    tabIndex={0}
                    role="button"
                    draggable
                    aria-roledescription="Draggable deal"
                    aria-label={`${d.company}, ${d.title}, ${money(d.value, currency)}, ${s.label}. Shift plus arrow keys move between stages.`}
                    data-dragging={dragging === d.id}
                    style={{ animationDelay: `${i * 40}ms` }}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", d.id);
                      e.dataTransfer.effectAllowed = "move";
                      setDragging(d.id);
                    }}
                    onDragEnd={() => {
                      setDragging(null);
                      setOver(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.shiftKey && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
                        e.preventDefault();
                        const target = stages[si + (e.key === "ArrowRight" ? 1 : -1)];
                        if (target) {
                          moveTo(d.id, target.id);
                          requestAnimationFrame(() => cardRefs.current.get(d.id)?.focus());
                        }
                      }
                    }}
                  >
                    <div className="hb-wi11-co">
                      <b>{d.company}</b>
                      <span>{money(d.value, currency)}</span>
                    </div>
                    <div className="hb-wi11-ti">{d.title}</div>
                    <div className="hb-wi11-ft">
                      <span className="hb-wi11-av" title={d.owner} style={{ background: `hsl(${hueOf(d.owner)} 55% 45%)` }}>
                        {ini(d.owner)}
                      </span>
                      {stale ? (
                        <span className="hb-wi11-stale">
                          <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                            <circle cx="5" cy="5" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M5 3v2.2l1.4.9" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                          {d.days}d
                        </span>
                      ) : (
                        <span>{s.probability >= 1 ? "Signed" : `${d.days}d in stage`}</span>
                      )}
                      <time>{d.close}</time>
                    </div>
                  </div>
                );
              })}
              <div className="hb-wi11-drop" aria-hidden="true">
                {items.length === 0 ? "No deals" : "Drop here"}
              </div>
            </section>
          );
        })}
      </div>
      <p className="hb-wi11-hint">
        Drag a card to change its stage, or focus it and press <kbd>Shift</kbd> + <kbd>←</kbd> <kbd>→</kbd>.
      </p>
      <div className="hb-wi11-sr" aria-live="polite">
        {message}
      </div>
    </div>
  );
}
