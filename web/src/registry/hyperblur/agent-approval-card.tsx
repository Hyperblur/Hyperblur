"use client";

import * as React from "react";

export interface ApprovalChange {
  label: string;
  before?: string;
  after: string;
}

export interface AgentApprovalCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  summary?: string;
  tool?: string;
  changes?: ApprovalChange[];
  timeout?: number;
  resetAfter?: number;
  accent?: string;
  onApprove?: (changes: ApprovalChange[]) => void;
  onReject?: (reason: "manual" | "timeout") => void;
  onEdit?: (changes: ApprovalChange[]) => void;
}

type Mode = "idle" | "confirm" | "edit" | "approved" | "rejected";

const defaultChanges: ApprovalChange[] = [
  { label: "amount", before: "$0.00", after: "$48.00" },
  { label: "reason", after: "damaged_on_arrival" },
];

const css = `
.hb-yf2 {
  --hb-yf2-ok: #3ecf8e;
  --hb-yf2-err: #ff5d5d;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 12px 14px 12px;
  overflow: hidden;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.35;
  color: #ededed;
  background: #111111;
  border: 1px solid #262626;
  border-radius: 14px;
  text-align: left;
}
.hb-yf2 *, .hb-yf2 *::before, .hb-yf2 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf2-count { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #1c1c1c; }
.hb-yf2-fill {
  height: 100%;
  width: var(--hb-yf2-p, 100%);
  background: var(--hb-yf2-a, #2f7bff);
  transition: width 0.1s linear, background-color 0.3s ease;
}
.hb-yf2[data-low="true"] .hb-yf2-fill { background: var(--hb-yf2-err); }
.hb-yf2[data-paused="true"] .hb-yf2-fill { opacity: 0.45; }
.hb-yf2-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 2px; }
.hb-yf2-title { display: flex; align-items: center; gap: 7px; min-width: 0; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
.hb-yf2-title span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yf2-shield { flex: none; width: 15px; height: 15px; color: var(--hb-yf2-a, #2f7bff); }
.hb-yf2-tool {
  flex: none;
  padding: 2px 7px;
  font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10.5px;
  color: #a1a1a1;
  background: #171717;
  border: 1px solid #262626;
  border-radius: 999px;
}
.hb-yf2-sum { margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #a1a1a1; }
.hb-yf2-diff { border: 1px solid #222222; border-radius: 10px; background: #0d0d0d; overflow: hidden; }
.hb-yf2-dh { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 5px 10px; font-size: 10px; letter-spacing: 0.07em; text-transform: uppercase; color: #6b6b6b; border-bottom: 1px solid #1c1c1c; }
.hb-yf2-time { font-variant-numeric: tabular-nums; letter-spacing: 0.02em; text-transform: none; color: #8f8f8f; }
.hb-yf2[data-low="true"] .hb-yf2-time { color: var(--hb-yf2-err); }
.hb-yf2-row { display: grid; grid-template-columns: 56px minmax(0, 1fr); align-items: center; gap: 8px; min-height: 26px; padding: 3px 10px; }
.hb-yf2-row + .hb-yf2-row { border-top: 1px solid #181818; }
.hb-yf2-key { font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11px; color: #8f8f8f; }
.hb-yf2-val { display: flex; align-items: center; gap: 6px; min-width: 0; font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11px; }
.hb-yf2-old { flex: none; padding: 1px 5px; color: #ff9a9a; text-decoration: line-through; background: rgba(255, 93, 93, 0.1); border-radius: 4px; }
.hb-yf2-arrow { flex: none; color: #6b6b6b; }
.hb-yf2-new { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 1px 5px; color: #7de6b4; background: rgba(62, 207, 142, 0.1); border-radius: 4px; }
.hb-yf2-input {
  width: 100%;
  min-width: 0;
  padding: 3px 7px;
  font: inherit;
  font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  color: #ededed;
  background: #171717;
  border: 1px solid #333333;
  border-radius: 6px;
  outline: none;
}
.hb-yf2-input:focus-visible { border-color: var(--hb-yf2-a, #2f7bff); box-shadow: 0 0 0 2px color-mix(in srgb, var(--hb-yf2-a, #2f7bff) 30%, transparent); }
.hb-yf2-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 30px; }
.hb-yf2-grp { display: flex; align-items: center; gap: 6px; }
.hb-yf2-note { min-width: 0; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; color: #a1a1a1; }
.hb-yf2-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 30px;
  margin: 0;
  padding: 0 12px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #ededed;
  white-space: nowrap;
  background: transparent;
  border: 1px solid #2f2f2f;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}
.hb-yf2-btn:hover { background: rgba(255, 255, 255, 0.06); border-color: #444444; }
.hb-yf2-btn:active { transform: scale(0.97); }
.hb-yf2-btn:focus-visible { outline: 2px solid var(--hb-yf2-a, #2f7bff); outline-offset: 2px; }
.hb-yf2-btn svg { width: 12px; height: 12px; }
.hb-yf2-btn[data-kind="ghost"] { border-color: transparent; color: #a1a1a1; padding: 0 8px; }
.hb-yf2-btn[data-kind="reject"]:hover { color: #ff9a9a; border-color: rgba(255, 93, 93, 0.5); background: rgba(255, 93, 93, 0.08); }
.hb-yf2-btn[data-kind="primary"] { color: #fff; background: var(--hb-yf2-a, #2f7bff); border-color: var(--hb-yf2-a, #2f7bff); }
.hb-yf2-btn[data-kind="primary"]:hover { background: color-mix(in srgb, var(--hb-yf2-a, #2f7bff) 86%, #fff); }
.hb-yf2-result { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 12px; font-weight: 500; animation: hb-yf2-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.hb-yf2-dot { flex: none; display: grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; color: #0a0a0a; }
.hb-yf2-dot svg { width: 10px; height: 10px; }
.hb-yf2[data-mode="approved"] .hb-yf2-dot { background: var(--hb-yf2-ok); }
.hb-yf2[data-mode="rejected"] .hb-yf2-dot { background: var(--hb-yf2-err); }
.hb-yf2[data-mode="approved"] .hb-yf2-diff, .hb-yf2[data-mode="rejected"] .hb-yf2-diff { opacity: 0.55; }
.hb-yf2-diff { transition: opacity 0.3s ease; }
@keyframes hb-yf2-pop { from { opacity: 0; transform: translateY(4px) scale(0.96); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf2-fill, .hb-yf2-btn, .hb-yf2-diff { transition: none; }
  .hb-yf2-result { animation: none; }
}
`;

export function AgentApprovalCard({
  title = "Refund order #4821",
  summary = "Partial refund to the card on file.",
  tool = "payments.refund",
  changes = defaultChanges,
  timeout = 30,
  resetAfter = 0,
  accent = "#2f7bff",
  onApprove,
  onReject,
  onEdit,
  className = "",
  style,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: AgentApprovalCardProps) {
  const total = Math.max(0, timeout) * 1000;
  const [mode, setMode] = React.useState<Mode>("idle");
  const [reason, setReason] = React.useState<"manual" | "timeout">("manual");
  const [remaining, setRemaining] = React.useState(total);
  const [values, setValues] = React.useState<string[]>(() => changes.map((c) => c.after));
  const [draft, setDraft] = React.useState<string[]>([]);
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const confirmRef = React.useRef<HTMLButtonElement>(null);
  const firstInput = React.useRef<HTMLInputElement>(null);
  const notified = React.useRef(false);

  const expired = total > 0 && remaining <= 0 && mode === "idle";
  const view: Mode = expired ? "rejected" : mode;
  const viewReason = expired ? "timeout" : reason;
  const paused = hover || focus || mode !== "idle";
  const spent = remaining <= 0;

  const current = React.useMemo(
    () => changes.map((c, i) => ({ ...c, after: values[i] ?? c.after })),
    [changes, values],
  );

  React.useEffect(() => {
    if (total <= 0 || paused || mode !== "idle" || spent) return;
    const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 100)), 100);
    return () => window.clearInterval(id);
  }, [total, paused, mode, spent]);

  React.useEffect(() => {
    if (expired && !notified.current) {
      notified.current = true;
      onReject?.("timeout");
    }
  }, [expired, onReject]);

  React.useEffect(() => {
    if (mode === "confirm") confirmRef.current?.focus({ preventScroll: true });
    if (mode === "edit") firstInput.current?.focus({ preventScroll: true });
  }, [mode]);

  React.useEffect(() => {
    if (resetAfter <= 0 || (view !== "approved" && view !== "rejected")) return;
    const id = window.setTimeout(() => {
      notified.current = false;
      setMode("idle");
      setReason("manual");
      setRemaining(total);
      setValues(changes.map((c) => c.after));
    }, resetAfter);
    return () => window.clearTimeout(id);
  }, [view, resetAfter, total, changes]);

  function reset() {
    notified.current = false;
    setMode("idle");
    setReason("manual");
    setRemaining(total);
  }

  function approve() {
    setMode("approved");
    onApprove?.(current);
  }

  function reject() {
    notified.current = true;
    setReason("manual");
    setMode("rejected");
    onReject?.("manual");
  }

  function saveEdit() {
    setValues(draft);
    setMode("idle");
    onEdit?.(changes.map((c, i) => ({ ...c, after: draft[i] ?? c.after })));
  }

  const seconds = Math.ceil(remaining / 1000);
  const pct = total > 0 ? (remaining / total) * 100 : 100;
  const low = total > 0 && remaining <= total * 0.25;

  return (
    <>
      <style href="hb-agent-approval-card" precedence="default">{css}</style>
      <div
        role="group"
        aria-label={title}
        className={`hb-yf2 ${className}`}
        data-mode={view}
        data-low={low && view === "idle"}
        data-paused={paused && view === "idle"}
        style={
          {
            "--hb-yf2-a": accent,
            "--hb-yf2-p": `${pct.toFixed(2)}%`,
            ...style,
          } as React.CSSProperties
        }
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          setHover(true);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          setHover(false);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setFocus(true);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key === "Escape" && (mode === "confirm" || mode === "edit")) {
            e.stopPropagation();
            setMode("idle");
          }
        }}
        {...rest}
      >
        {total > 0 ? (
          <div className="hb-yf2-count" aria-hidden="true">
            <div className="hb-yf2-fill" />
          </div>
        ) : null}
        <div className="hb-yf2-top">
          <h3 className="hb-yf2-title">
            <svg className="hb-yf2-shield" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.6l5 1.9v4c0 3-2 5.2-5 6.9-3-1.7-5-3.9-5-6.9v-4l5-1.9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5.8 8.1l1.6 1.6 2.9-3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{title}</span>
          </h3>
          <span className="hb-yf2-tool">{tool}</span>
        </div>
        <p className="hb-yf2-sum">{summary}</p>
        <div className="hb-yf2-diff">
          <div className="hb-yf2-dh">
            <span>Proposed changes</span>
            {total > 0 && view !== "approved" && view !== "rejected" ? (
              <span className="hb-yf2-time" role="timer" aria-live="off">
                {paused ? "paused" : `auto-reject ${seconds}s`}
              </span>
            ) : null}
          </div>
          {changes.map((c, i) => (
            <div className="hb-yf2-row" key={c.label}>
              <span className="hb-yf2-key">{c.label}</span>
              <span className="hb-yf2-val">
                {mode === "edit" ? (
                  <input
                    ref={i === 0 ? firstInput : undefined}
                    className="hb-yf2-input"
                    aria-label={c.label}
                    value={draft[i] ?? ""}
                    onChange={(e) => {
                      const next = draft.slice();
                      next[i] = e.target.value;
                      setDraft(next);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                    }}
                  />
                ) : (
                  <>
                    {c.before ? (
                      <>
                        <span className="hb-yf2-old">{c.before}</span>
                        <span className="hb-yf2-arrow" aria-hidden="true">→</span>
                      </>
                    ) : null}
                    <span className="hb-yf2-new">{values[i] ?? c.after}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="hb-yf2-foot">
          {view === "approved" || view === "rejected" ? (
            <>
              <div className="hb-yf2-result" role="status">
                <span className="hb-yf2-dot" aria-hidden="true">
                  <svg viewBox="0 0 10 10" fill="none">
                    {view === "approved" ? (
                      <path d="M2 5.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path d="M2.6 2.6l4.8 4.8M7.4 2.6l-4.8 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    )}
                  </svg>
                </span>
                <span>
                  {view === "approved"
                    ? "Approved, running now"
                    : viewReason === "timeout"
                      ? "Auto-rejected, no reply"
                      : "Rejected, agent notified"}
                </span>
              </div>
              {resetAfter <= 0 ? (
                <button type="button" className="hb-yf2-btn" data-kind="ghost" onClick={reset}>
                  Review again
                </button>
              ) : null}
            </>
          ) : mode === "confirm" ? (
            <>
              <p className="hb-yf2-note">Run {tool} with these values?</p>
              <span className="hb-yf2-grp">
                <button type="button" className="hb-yf2-btn" data-kind="ghost" onClick={() => setMode("idle")}>
                  Back
                </button>
                <button type="button" ref={confirmRef} className="hb-yf2-btn" data-kind="primary" onClick={approve}>
                  Confirm
                </button>
              </span>
            </>
          ) : mode === "edit" ? (
            <>
              <p className="hb-yf2-note">Editing values</p>
              <span className="hb-yf2-grp">
                <button type="button" className="hb-yf2-btn" data-kind="ghost" onClick={() => setMode("idle")}>
                  Cancel
                </button>
                <button type="button" className="hb-yf2-btn" data-kind="primary" onClick={saveEdit}>
                  Save
                </button>
              </span>
            </>
          ) : (
            <>
              <button
                type="button"
                className="hb-yf2-btn"
                data-kind="ghost"
                onClick={() => {
                  setDraft(values.length ? values.slice() : changes.map((c) => c.after));
                  setMode("edit");
                }}
              >
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10l.6-2.6L8.4 1.6a1.2 1.2 0 0 1 1.7 1.7L4.6 9.4 2 10z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                Edit
              </button>
              <span className="hb-yf2-grp">
                <button type="button" className="hb-yf2-btn" data-kind="reject" onClick={reject}>
                  Reject
                </button>
                <button type="button" className="hb-yf2-btn" data-kind="primary" onClick={() => setMode("confirm")}>
                  Approve
                </button>
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
