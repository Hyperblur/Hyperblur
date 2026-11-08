"use client";

import * as React from "react";

export interface PermissionLine {
  t: "+" | "-" | " ";
  s: string;
}

export interface PermissionHunk {
  id: string;
  header: string;
  lines: PermissionLine[];
}

export interface PermissionFile {
  path: string;
  hunks: PermissionHunk[];
}

export type PermissionScope = "once" | "session" | "always";

export interface AgentToolPermissionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  agent?: string;
  tool?: string;
  reason?: string;
  risk?: "low" | "medium" | "high";
  files?: PermissionFile[];
  defaultScope?: PermissionScope;
  resetAfter?: number;
  accent?: string;
  onApprove?: (result: { hunks: string[]; scope: PermissionScope }) => void;
  onDeny?: () => void;
}

const sampleFiles: PermissionFile[] = [
  {
    path: "src/billing/prorate.ts",
    hunks: [
      {
        id: "h1",
        header: "@@ -12,6 +12,7 @@ export function prorate(",
        lines: [
          { t: " ", s: "  const days = daysBetween(start, end);" },
          { t: "-", s: "  const ratio = days / 30;" },
          { t: "+", s: "  const ratio = days / daysInMonth(start);" },
          { t: "+", s: "  if (ratio <= 0) return 0;" },
          { t: " ", s: "  return round(amount * ratio, 2);" },
        ],
      },
      {
        id: "h2",
        header: "@@ -40,3 +41,4 @@ function round(",
        lines: [
          { t: "-", s: "  return Math.round(n * 100) / 100;" },
          { t: "+", s: "  const f = 10 ** places;" },
          { t: "+", s: "  return Math.round((n + Number.EPSILON) * f) / f;" },
        ],
      },
    ],
  },
  {
    path: "src/billing/prorate.test.ts",
    hunks: [
      {
        id: "h3",
        header: "@@ -58,0 +58,5 @@ describe(\"prorate\"",
        lines: [
          { t: "+", s: "  it(\"uses real month length\", () => {" },
          { t: "+", s: "    expect(prorate(29, feb1, feb15)).toBe(14.5);" },
          { t: "+", s: "  });" },
        ],
      },
    ],
  },
];

const scopes: { v: PermissionScope; t: string; d: string }[] = [
  { v: "once", t: "Once", d: "Ask again next time" },
  { v: "session", t: "This session", d: "Until the chat ends" },
  { v: "always", t: "Always in src/", d: "Saved to project rules" },
];

const css = `
.hb-wj6 {
  --hb-wj6-a: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  font-family: inherit;
  font-size: 12px;
  color: #ededed;
  background: #111;
  border: 1px solid #262626;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 60px -36px rgba(0,0,0,0.9);
}
.hb-wj6 *, .hb-wj6 *::before, .hb-wj6 *::after { box-sizing: border-box; font-family: inherit; }
.hb-wj6-top { display: flex; align-items: flex-start; gap: 10px; padding: 11px 12px 10px; background: linear-gradient(180deg, rgba(240,178,74,0.07), transparent); border-bottom: 1px solid #1f1f1f; }
.hb-wj6-ic { display: grid; place-items: center; flex: none; width: 26px; height: 26px; color: #f0b24a; background: rgba(240,178,74,0.12); border: 1px solid rgba(240,178,74,0.3); border-radius: 8px; }
.hb-wj6-ic svg { width: 14px; height: 14px; }
.hb-wj6-hd { flex: 1; min-width: 0; }
.hb-wj6-t { margin: 0; font-size: 12.5px; font-weight: 600; letter-spacing: -0.01em; }
.hb-wj6-t code { padding: 1px 5px; font-family: var(--font-mono), ui-monospace, monospace; font-size: 11px; font-weight: 500; color: #ffd9a0; background: rgba(240,178,74,0.1); border-radius: 4px; }
.hb-wj6-r { margin: 3px 0 0; color: #8f8f8f; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj6-risk { flex: none; padding: 2px 7px; font-size: 10px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; border-radius: 999px; }
.hb-wj6-risk[data-r="low"] { color: #34c78a; background: rgba(52,199,138,0.12); }
.hb-wj6-risk[data-r="medium"] { color: #f0b24a; background: rgba(240,178,74,0.12); }
.hb-wj6-risk[data-r="high"] { color: #ff6b5f; background: rgba(255,90,79,0.14); }
.hb-wj6-tabs { display: flex; gap: 2px; padding: 6px 8px 0; background: #0d0d0d; border-bottom: 1px solid #1f1f1f; overflow-x: auto; scrollbar-width: none; }
.hb-wj6-tab { display: flex; align-items: center; gap: 6px; flex: none; padding: 6px 9px 7px; font: inherit; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; color: #8f8f8f; background: none; border: 0; border-bottom: 2px solid transparent; cursor: pointer; transition: color .15s ease, border-color .2s ease; }
.hb-wj6-tab[aria-selected="true"] { color: #ededed; border-bottom-color: var(--hb-wj6-a); }
.hb-wj6-tab small { font-size: 10px; font-variant-numeric: tabular-nums; }
.hb-wj6-tab small b { color: #4ade80; font-weight: 500; }
.hb-wj6-tab small i { color: #ff7a7a; font-style: normal; }
.hb-wj6-diff { max-height: 170px; overflow: auto; background: #0a0a0a; font-family: var(--font-mono), ui-monospace, monospace; font-size: 10.5px; line-height: 1.6; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-wj6-hunk { transition: opacity .25s ease, filter .25s ease; }
.hb-wj6-hunk[data-off="true"] { opacity: .38; filter: grayscale(1); }
.hb-wj6-hunk[data-off="true"] .hb-wj6-l { text-decoration: line-through; text-decoration-color: rgba(255,255,255,0.25); }
.hb-wj6-hh { position: sticky; top: 0; z-index: 1; display: flex; align-items: center; gap: 8px; padding: 3px 10px; color: #7fb3ff; background: #0f1520; border-top: 1px solid #172033; border-bottom: 1px solid #172033; }
.hb-wj6-hh span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj6-chk { position: relative; display: inline-flex; align-items: center; gap: 6px; flex: none; font-family: var(--font-sans), sans-serif; font-size: 10.5px; color: #a1a1a1; cursor: pointer; }
.hb-wj6-chk input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.hb-wj6-box { display: grid; place-items: center; width: 14px; height: 14px; background: #161616; border: 1px solid #3a3a3a; border-radius: 4px; transition: background-color .15s ease, border-color .15s ease; }
.hb-wj6-box svg { width: 9px; height: 9px; color: #fff; opacity: 0; transform: scale(.5); transition: opacity .15s ease, transform .2s cubic-bezier(.3,1.6,.5,1); }
.hb-wj6-chk input:checked + .hb-wj6-box { background: var(--hb-wj6-a); border-color: var(--hb-wj6-a); }
.hb-wj6-chk input:checked + .hb-wj6-box svg { opacity: 1; transform: none; }
.hb-wj6-chk input:focus-visible + .hb-wj6-box { outline: 2px solid var(--hb-wj6-a); outline-offset: 2px; }
.hb-wj6-l { display: flex; white-space: pre; }
.hb-wj6-l b { flex: none; width: 22px; text-align: center; font-weight: 400; color: #4a4a4a; user-select: none; }
.hb-wj6-l[data-t="+"] { color: #c8f5d6; background: rgba(52,199,138,0.09); }
.hb-wj6-l[data-t="+"] b { color: #34c78a; }
.hb-wj6-l[data-t="-"] { color: #ffd0cc; background: rgba(255,90,79,0.09); }
.hb-wj6-l[data-t="-"] b { color: #ff6b5f; }
.hb-wj6-l[data-t=" "] { color: #8f8f8f; }
.hb-wj6-foot { display: flex; flex-direction: column; gap: 9px; padding: 10px 12px 12px; }
.hb-wj6-scopes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.hb-wj6-sc { display: flex; flex-direction: column; align-items: flex-start; gap: 1px; padding: 5px 8px; font: inherit; text-align: left; background: #161616; border: 1px solid #262626; border-radius: 8px; cursor: pointer; transition: border-color .15s ease, background-color .15s ease; min-width: 0; }
.hb-wj6-sc b { font-size: 11px; font-weight: 600; color: #d4d4d4; white-space: nowrap; }
.hb-wj6-sc span { font-size: 9.5px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.hb-wj6-sc[aria-checked="true"] { background: color-mix(in srgb, var(--hb-wj6-a) 12%, #141414); border-color: color-mix(in srgb, var(--hb-wj6-a) 60%, transparent); }
.hb-wj6-sc[aria-checked="true"] b { color: #fff; }
.hb-wj6-sc[data-v="always"][aria-checked="true"] { background: rgba(240,178,74,0.1); border-color: rgba(240,178,74,0.5); }
.hb-wj6-row { display: flex; align-items: center; gap: 6px; }
.hb-wj6-sum { flex: 1; min-width: 0; font-size: 11px; color: #8f8f8f; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-wj6-sum b { color: #ededed; font-weight: 600; }
.hb-wj6-btn { display: inline-flex; align-items: center; gap: 7px; height: 30px; padding: 0 11px; font: inherit; font-size: 12px; font-weight: 500; color: #ededed; background: #1b1b1b; border: 1px solid #2c2c2c; border-radius: 8px; cursor: pointer; white-space: nowrap; transition: background-color .15s ease, transform .1s ease, opacity .15s ease; }
.hb-wj6-btn:hover:not(:disabled) { background: #232323; }
.hb-wj6-btn:active:not(:disabled) { transform: translateY(1px); }
.hb-wj6-btn:disabled { opacity: .4; cursor: default; }
.hb-wj6-btn kbd { padding: 0 4px; font-family: inherit; font-size: 10px; color: inherit; opacity: .6; border: 1px solid currentColor; border-radius: 4px; }
.hb-wj6-btn[data-primary="true"] { color: #fff; background: var(--hb-wj6-a); border-color: transparent; box-shadow: 0 1px 0 rgba(255,255,255,0.2) inset, 0 6px 16px -8px var(--hb-wj6-a); }
.hb-wj6-btn[data-primary="true"]:hover:not(:disabled) { background: color-mix(in srgb, var(--hb-wj6-a) 88%, #fff); }
.hb-wj6-done { display: flex; align-items: center; gap: 10px; padding: 12px; animation: hb-wj6-in .35s cubic-bezier(.2,.8,.2,1) both; }
.hb-wj6-badge { display: grid; place-items: center; flex: none; width: 26px; height: 26px; border-radius: 50%; }
.hb-wj6-badge svg { width: 13px; height: 13px; }
.hb-wj6-done[data-d="approved"] .hb-wj6-badge { color: #0a0a0a; background: #34c78a; box-shadow: 0 0 0 4px rgba(52,199,138,0.15); }
.hb-wj6-done[data-d="denied"] .hb-wj6-badge { color: #fff; background: #3a3a3a; }
.hb-wj6-done p { flex: 1; min-width: 0; margin: 0; line-height: 1.4; color: #a1a1a1; }
.hb-wj6-done p b { display: block; color: #ededed; font-weight: 600; }
.hb-wj6-tab:focus-visible, .hb-wj6-sc:focus-visible, .hb-wj6-btn:focus-visible { outline: 2px solid var(--hb-wj6-a); outline-offset: 2px; }
@keyframes hb-wj6-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-wj6 *, .hb-wj6-done { transition: none !important; animation: none !important; }
}
`;

const count = (h: PermissionHunk, t: "+" | "-") => h.lines.filter((l) => l.t === t).length;

export function AgentToolPermission({
  agent = "Coder",
  tool = "fs.write_file",
  reason = "Fix proration for months that are not 30 days long.",
  risk = "medium",
  files = sampleFiles,
  defaultScope = "once",
  resetAfter = 0,
  accent = "#2f7bff",
  onApprove,
  onDeny,
  className,
  style,
  onKeyDown,
  ...rest
}: AgentToolPermissionProps) {
  const all = React.useMemo(() => files.flatMap((f) => f.hunks.map((h) => h.id)), [files]);
  const [on, setOn] = React.useState<Set<string>>(() => new Set(all));
  const [tab, setTab] = React.useState(0);
  const [scope, setScope] = React.useState<PermissionScope>(defaultScope);
  const [decision, setDecision] = React.useState<null | "approved" | "denied">(null);

  React.useEffect(() => {
    if (!decision || resetAfter <= 0) return;
    const t = window.setTimeout(() => {
      setDecision(null);
      setOn(new Set(all));
    }, resetAfter);
    return () => window.clearTimeout(t);
  }, [decision, resetAfter, all]);

  const hunks = files.flatMap((f) => f.hunks);
  const chosen = hunks.filter((h) => on.has(h.id));
  const add = chosen.reduce((s, h) => s + count(h, "+"), 0);
  const del = chosen.reduce((s, h) => s + count(h, "-"), 0);
  const filesTouched = files.filter((f) => f.hunks.some((h) => on.has(h.id))).length;
  const file = files[Math.min(tab, files.length - 1)];

  const approve = () => {
    if (!chosen.length) return;
    setDecision("approved");
    onApprove?.({ hunks: chosen.map((h) => h.id), scope });
  };
  const deny = () => {
    setDecision("denied");
    onDeny?.();
  };

  const toggle = (id: string) =>
    setOn((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const scopeText = scope === "once" ? "for this call" : scope === "session" ? "for this session" : "in src/ from now on";

  return (
    <div
      className={["hb-wj6", className].filter(Boolean).join(" ")}
      style={{ "--hb-wj6-a": accent, ...style } as React.CSSProperties}
      role="group"
      aria-label={`${agent} requests permission to run ${tool}`}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (decision) return;
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          approve();
        }
      }}
      {...rest}
    >
      <style href="hb-agent-tool-permission" precedence="default">{css}</style>
      <div className="hb-wj6-top">
        <span className="hb-wj6-ic">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2 13.5 4.2v3.6c0 3-2.3 5.1-5.5 6.2C4.8 12.9 2.5 10.8 2.5 7.8V4.2Z" /><path d="M8 6v2.6M8 10.8v.1" /></svg>
        </span>
        <div className="hb-wj6-hd">
          <p className="hb-wj6-t">{agent} wants to run <code>{tool}</code></p>
          <p className="hb-wj6-r" title={reason}>{reason}</p>
        </div>
        <span className="hb-wj6-risk" data-r={risk}>{risk} risk</span>
      </div>
      {decision ? (
        <div className="hb-wj6-done" data-d={decision} role="status">
          <span className="hb-wj6-badge">
            {decision === "approved" ? (
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m4.5 4.5 7 7M11.5 4.5l-7 7" /></svg>
            )}
          </span>
          <p>
            <b>{decision === "approved" ? `Applied ${chosen.length} of ${hunks.length} changes to ${filesTouched} ${filesTouched === 1 ? "file" : "files"}` : "Request denied"}</b>
            {decision === "approved" ? `${tool} allowed ${scopeText}.` : `${agent} will propose another approach.`}
          </p>
          <button type="button" className="hb-wj6-btn" onClick={() => { setDecision(null); }}>
            Undo
          </button>
        </div>
      ) : (
        <>
          <div className="hb-wj6-tabs" role="tablist" aria-label="Changed files">
            {files.map((f, i) => {
              const a = f.hunks.filter((h) => on.has(h.id)).reduce((s, h) => s + count(h, "+"), 0);
              const d = f.hunks.filter((h) => on.has(h.id)).reduce((s, h) => s + count(h, "-"), 0);
              return (
                <button
                  key={f.path}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  tabIndex={i === tab ? 0 : -1}
                  className="hb-wj6-tab"
                  onClick={() => setTab(i)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                    e.preventDefault();
                    setTab((i + (e.key === "ArrowRight" ? 1 : -1) + files.length) % files.length);
                  }}
                >
                  {f.path.split("/").pop()}
                  <small><b>+{a}</b> <i>−{d}</i></small>
                </button>
              );
            })}
          </div>
          <div className="hb-wj6-diff" role="tabpanel" aria-label={file.path}>
            {file.hunks.map((h) => (
              <div key={h.id} className="hb-wj6-hunk" data-off={!on.has(h.id)}>
                <div className="hb-wj6-hh">
                  <span>{h.header}</span>
                  <label className="hb-wj6-chk">
                    <input type="checkbox" checked={on.has(h.id)} onChange={() => toggle(h.id)} />
                    <span className="hb-wj6-box"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 5.2 2 2 4-4.4" /></svg></span>
                    Include
                  </label>
                </div>
                {h.lines.map((l, k) => (
                  <div key={k} className="hb-wj6-l" data-t={l.t}>
                    <b>{l.t === " " ? "" : l.t === "-" ? "−" : "+"}</b>
                    {l.s}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="hb-wj6-foot">
            <div className="hb-wj6-scopes" role="radiogroup" aria-label="Allow">
              {scopes.map((s) => (
                <button key={s.v} type="button" role="radio" aria-checked={scope === s.v} data-v={s.v} className="hb-wj6-sc" onClick={() => setScope(s.v)}>
                  <b>{s.t}</b>
                  <span>{s.d}</span>
                </button>
              ))}
            </div>
            <div className="hb-wj6-row">
              <span className="hb-wj6-sum"><b>{chosen.length}/{hunks.length}</b> changes · <b>+{add}</b> −{del}</span>
              <button type="button" className="hb-wj6-btn" onClick={deny}>Deny</button>
              <button type="button" className="hb-wj6-btn" data-primary="true" disabled={!chosen.length} onClick={approve}>
                Approve <kbd>⌘↵</kbd>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
