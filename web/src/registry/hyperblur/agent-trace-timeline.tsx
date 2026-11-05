"use client";

import * as React from "react";

export type TraceStatus = "ok" | "error" | "running";

export interface TraceSpan {
  id: string;
  name: string;
  kind?: string;
  start: number;
  duration: number;
  depth?: number;
  status?: TraceStatus;
  payload?: string;
}

export interface AgentTraceTimelineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  spans?: TraceSpan[];
  title?: string;
  total?: number;
  accent?: string;
  expandedId?: string | null;
  defaultExpandedId?: string | null;
  onExpandedChange?: (id: string | null) => void;
}

const defaultSpans: TraceSpan[] = [
  { id: "run", name: "support_agent.run", kind: "agent", start: 0, duration: 4800, depth: 0, status: "ok" },
  { id: "plan", name: "plan_next_step", kind: "model", start: 40, duration: 760, depth: 1, status: "ok", payload: '{\n  "tokens_in": 1840,\n  "tokens_out": 126,\n  "decision": "search_docs"\n}' },
  { id: "search", name: "search_docs", kind: "tool", start: 840, duration: 1320, depth: 1, status: "ok", payload: '{\n  "query": "refund window annual plan",\n  "results": 6\n}' },
  { id: "fetch", name: "http.get /v2/policies", kind: "http", start: 900, duration: 980, depth: 2, status: "ok", payload: '{\n  "status": 200,\n  "bytes": 18240\n}' },
  { id: "refund", name: "issue_refund", kind: "tool", start: 2260, duration: 640, depth: 1, status: "error", payload: '{\n  "error": "amount_exceeds_limit",\n  "limit": 200\n}' },
  { id: "reply", name: "write_reply", kind: "model", start: 2980, duration: 1820, depth: 1, status: "running" },
];

const css = `
.hb-yf1 {
  --hb-yf1-ok: #3ecf8e;
  --hb-yf1-err: #ff5d5d;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px 6px;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.3;
  color: #ededed;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 14px;
  text-align: left;
}
.hb-yf1 *, .hb-yf1 *::before, .hb-yf1 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf1-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
.hb-yf1-title { font-size: 12px; font-weight: 600; letter-spacing: -0.005em; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yf1-total { flex: none; font-variant-numeric: tabular-nums; color: #8f8f8f; font-size: 11px; }
.hb-yf1-ruler {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  padding-bottom: 4px;
  border-bottom: 1px solid #1f1f1f;
  font-size: 10px;
  color: #6b6b6b;
  font-variant-numeric: tabular-nums;
}
.hb-yf1-ticks { display: flex; justify-content: space-between; }
.hb-yf1-list { list-style: none; margin: 0; padding: 0; }
.hb-yf1-item { border-bottom: 1px solid #191919; }
.hb-yf1-item:last-child { border-bottom: 0; }
.hb-yf1-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  width: 100%;
  min-height: 24px;
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: default;
}
button.hb-yf1-row { cursor: pointer; }
button.hb-yf1-row:hover { background: rgba(255, 255, 255, 0.035); }
.hb-yf1-row:focus-visible { outline: 2px solid var(--hb-yf1-a, #2f7bff); outline-offset: -2px; }
.hb-yf1-name { display: flex; align-items: center; gap: 6px; min-width: 0; padding-right: 8px; }
.hb-yf1-guides {
  flex: none;
  width: calc(var(--hb-yf1-d, 0) * 12px);
  align-self: stretch;
  background: repeating-linear-gradient(90deg, transparent 0 5px, #2a2a2a 5px 6px, transparent 6px 12px);
}
.hb-yf1-icon { flex: none; width: 14px; height: 14px; }
.hb-yf1-item[data-status="ok"] .hb-yf1-icon { color: var(--hb-yf1-ok); }
.hb-yf1-item[data-status="error"] .hb-yf1-icon { color: var(--hb-yf1-err); }
.hb-yf1-item[data-status="running"] .hb-yf1-icon { color: var(--hb-yf1-a, #2f7bff); animation: hb-yf1-spin 0.9s linear infinite; }
.hb-yf1-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; }
.hb-yf1-chev { flex: none; width: 10px; height: 10px; margin-left: auto; color: #6b6b6b; transition: transform 0.2s ease; }
.hb-yf1-item[data-open="true"] .hb-yf1-chev { transform: rotate(90deg); color: #ededed; }
.hb-yf1-track { position: relative; height: 24px; }
.hb-yf1-track::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: #1f1f1f; }
.hb-yf1-bar {
  position: absolute;
  top: 7px;
  bottom: 7px;
  min-width: 3px;
  border-radius: 4px;
  background: var(--hb-yf1-ok);
  transform-origin: left center;
  animation: hb-yf1-grow 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--hb-yf1-i, 0) * 70ms);
}
.hb-yf1-item[data-status="error"] .hb-yf1-bar { background: var(--hb-yf1-err); }
.hb-yf1-item[data-status="running"] .hb-yf1-bar {
  background: repeating-linear-gradient(115deg, var(--hb-yf1-a, #2f7bff) 0 6px, color-mix(in srgb, var(--hb-yf1-a, #2f7bff) 55%, #0a0a0a) 6px 12px);
  background-size: 24px 100%;
  animation: hb-yf1-grow 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both, hb-yf1-run 0.8s linear infinite;
  animation-delay: calc(var(--hb-yf1-i, 0) * 70ms), 0s;
}
.hb-yf1-dur {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  color: #a1a1a1;
  white-space: nowrap;
}
.hb-yf1-dur[data-side="right"] { padding-left: 6px; }
.hb-yf1-dur[data-side="left"] { padding-right: 6px; }
.hb-yf1-pay {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.hb-yf1-item[data-open="true"] .hb-yf1-pay { grid-template-rows: 1fr; }
.hb-yf1-payin { min-height: 0; overflow: hidden; }
.hb-yf1-meta { padding: 4px 0 0 calc(20px + var(--hb-yf1-d, 0) * 12px); font-size: 10px; color: #6b6b6b; text-transform: uppercase; letter-spacing: 0.06em; }
.hb-yf1-code {
  margin: 4px 0 8px calc(20px + var(--hb-yf1-d, 0) * 12px);
  padding: 8px 10px;
  overflow-x: auto;
  font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  line-height: 1.5;
  color: #c9d4e8;
  background: #0a0a0a;
  border: 1px solid #1f1f1f;
  border-radius: 8px;
}
@keyframes hb-yf1-grow { from { transform: scaleX(0); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }
@keyframes hb-yf1-run { from { background-position: 0 0; } to { background-position: 24px 0; } }
@keyframes hb-yf1-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf1-bar, .hb-yf1-item[data-status="running"] .hb-yf1-bar, .hb-yf1-item[data-status="running"] .hb-yf1-icon { animation: none; }
  .hb-yf1-pay, .hb-yf1-chev { transition: none; }
}
`;

function fmt(ms: number) {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

function StatusIcon({ status }: { status: TraceStatus }) {
  return (
    <svg className="hb-yf1-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {status === "running" ? (
        <>
          <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <path d="M8 1.8a6.2 6.2 0 0 1 6.2 6.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.4" />
          {status === "ok" ? (
            <path d="M5.2 8.2l2 2 3.6-4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </>
      )}
    </svg>
  );
}

export function AgentTraceTimeline({
  spans = defaultSpans,
  title = "Run 4821",
  total,
  accent = "#2f7bff",
  expandedId,
  defaultExpandedId = null,
  onExpandedChange,
  className = "",
  style,
  onKeyDown,
  ...rest
}: AgentTraceTimelineProps) {
  const baseId = React.useId();
  const listRef = React.useRef<HTMLOListElement>(null);
  const [inner, setInner] = React.useState<string | null>(defaultExpandedId);
  const controlled = expandedId !== undefined;
  const openId = controlled ? expandedId : inner;

  const span = total ?? Math.max(1, ...spans.map((s) => s.start + s.duration));

  function toggle(id: string) {
    const next = openId === id ? null : id;
    if (!controlled) setInner(next);
    onExpandedChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const rows = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("button.hb-yf1-row") ?? []);
    if (!rows.length) return;
    const at = rows.indexOf(document.activeElement as HTMLButtonElement);
    if (at < 0) return;
    e.preventDefault();
    let next = at;
    if (e.key === "ArrowDown") next = Math.min(rows.length - 1, at + 1);
    if (e.key === "ArrowUp") next = Math.max(0, at - 1);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = rows.length - 1;
    rows[next].focus();
  }

  return (
    <>
      <style href="hb-agent-trace-timeline" precedence="default">{css}</style>
      <div
        className={`hb-yf1 ${className}`}
        style={{ "--hb-yf1-a": accent, ...style } as React.CSSProperties}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="hb-yf1-head">
          <span className="hb-yf1-title">{title}</span>
          <span className="hb-yf1-total">{fmt(span)} total</span>
        </div>
        <div className="hb-yf1-ruler" aria-hidden="true">
          <span>Span</span>
          <span className="hb-yf1-ticks">
            <span>0</span>
            <span>{fmt(span / 2)}</span>
            <span>{fmt(span)}</span>
          </span>
        </div>
        <ol className="hb-yf1-list" ref={listRef}>
          {spans.map((s, i) => {
            const status = s.status ?? "ok";
            const depth = s.depth ?? 0;
            const open = openId === s.id && !!s.payload;
            const left = Math.min(100, Math.max(0, (s.start / span) * 100));
            const width = Math.min(100 - left, Math.max(0.8, (s.duration / span) * 100));
            const flip = left + width > 70;
            const payloadId = `${baseId}-${s.id}`;
            const rowInner = (
              <>
                <span className="hb-yf1-name">
                  <span className="hb-yf1-guides" aria-hidden="true" />
                  <StatusIcon status={status} />
                  <span className="hb-yf1-label">{s.name}</span>
                  {s.payload ? (
                    <svg className="hb-yf1-chev" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M3.5 1.5L7 5L3.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
                <span className="hb-yf1-track" aria-hidden="true">
                  <span className="hb-yf1-bar" style={{ left: `${left.toFixed(2)}%`, width: `${width.toFixed(2)}%` }} />
                  <span
                    className="hb-yf1-dur"
                    data-side={flip ? "left" : "right"}
                    style={
                      flip
                        ? { right: `${(100 - left).toFixed(2)}%` }
                        : { left: `${(left + width).toFixed(2)}%` }
                    }
                  >
                    {status === "running" ? "running" : fmt(s.duration)}
                  </span>
                </span>
              </>
            );
            return (
              <li
                key={s.id}
                className="hb-yf1-item"
                data-status={status}
                data-open={open}
                style={{ "--hb-yf1-i": i, "--hb-yf1-d": depth } as React.CSSProperties}
              >
                {s.payload ? (
                  <button
                    type="button"
                    className="hb-yf1-row"
                    aria-expanded={open}
                    aria-controls={payloadId}
                    aria-label={`${s.name}, ${status}, ${fmt(s.duration)}`}
                    onClick={() => toggle(s.id)}
                  >
                    {rowInner}
                  </button>
                ) : (
                  <div className="hb-yf1-row" role="group" aria-label={`${s.name}, ${status}, ${fmt(s.duration)}`}>
                    {rowInner}
                  </div>
                )}
                {s.payload ? (
                  <div id={payloadId} className="hb-yf1-pay" aria-hidden={!open}>
                    <div className="hb-yf1-payin">
                      <div className="hb-yf1-meta">
                        {s.kind ? `${s.kind} · ` : ""}starts +{fmt(s.start)} · took {fmt(s.duration)}
                      </div>
                      <pre className="hb-yf1-code">{s.payload}</pre>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
