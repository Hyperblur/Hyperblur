"use client";

import * as React from "react";

export interface AgentFileDiffProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> {
  patch?: string;
  fileName?: string;
  context?: number;
  accent?: string;
  onCopy?: (patch: string) => void;
}

interface DiffLine {
  kind: "add" | "del" | "ctx";
  text: string;
  oldNo?: number;
  newNo?: number;
}

interface Hunk {
  header: string;
  lines: DiffLine[];
}

type Item =
  | { type: "line"; line: DiffLine }
  | { type: "fold"; id: string; lines: DiffLine[] };

const samplePatch = [
  "--- a/src/session.ts",
  "+++ b/src/session.ts",
  "@@ -18,7 +18,8 @@ export async function loadSession(req)",
  "   const token = readToken(req);",
  "   const store = await openStore();",
  "-  const user = store.get(token);",
  "+  const user = token ? store.get(token) : null;",
  "+  if (!user) return redirect(\"/login\");",
  "   const prefs = await loadPrefs(user.id);",
  "   const flags = await loadFlags(user.id);",
  "   const theme = prefs.theme ?? \"dark\";",
  "   return { user, prefs, flags, theme };",
].join("\n");

const css = `
.hb-yf5 {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  font-family: inherit;
  font-size: 12px;
  color: #ededed;
  background: #0d0d0d;
  border: 1px solid #262626;
  border-radius: 12px;
  text-align: left;
}
.hb-yf5 *, .hb-yf5 *::before, .hb-yf5 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf5-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; height: 34px; padding: 0 6px 0 12px; background: #131313; border-bottom: 1px solid #222222; }
.hb-yf5-file { display: flex; align-items: center; gap: 7px; min-width: 0; font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11.5px; }
.hb-yf5-file svg { flex: none; width: 13px; height: 13px; color: #8f8f8f; }
.hb-yf5-file span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-yf5-stat { display: flex; align-items: center; gap: 8px; flex: none; }
.hb-yf5-n { font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11px; font-variant-numeric: tabular-nums; }
.hb-yf5-n[data-k="add"] { color: #3ecf8e; }
.hb-yf5-n[data-k="del"] { color: #ff6b6b; }
.hb-yf5-copy {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  margin: 0;
  padding: 0 9px;
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  color: #a1a1a1;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}
.hb-yf5-copy svg { width: 11px; height: 11px; }
.hb-yf5-copy:hover { color: #ededed; border-color: #3c3c3c; background: rgba(255, 255, 255, 0.05); }
.hb-yf5-copy[data-done="true"] { color: #3ecf8e; border-color: rgba(62, 207, 142, 0.45); }
.hb-yf5-copy:focus-visible, .hb-yf5-fold:focus-visible { outline: 2px solid var(--hb-yf5-a, #2f7bff); outline-offset: -2px; }
.hb-yf5-body { overflow-x: auto; scrollbar-width: thin; scrollbar-color: #333333 transparent; }
.hb-yf5-grid { min-width: max-content; font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 11px; line-height: 16px; }
.hb-yf5-hunk { display: block; padding: 3px 12px 3px 88px; color: color-mix(in srgb, var(--hb-yf5-a, #2f7bff) 60%, #ededed); background: color-mix(in srgb, var(--hb-yf5-a, #2f7bff) 9%, #0d0d0d); white-space: pre; }
.hb-yf5-row { display: flex; min-width: 100%; width: max-content; }
.hb-yf5-no { flex: none; width: 36px; padding-right: 8px; text-align: right; color: #565656; user-select: none; font-variant-numeric: tabular-nums; }
.hb-yf5-sign { flex: none; width: 16px; text-align: center; user-select: none; color: #6b6b6b; }
.hb-yf5-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.hb-yf5-code { position: relative; flex: 1; padding-right: 14px; white-space: pre; color: #d4d4d4; }
.hb-yf5-row[data-k="add"] { background: rgba(62, 207, 142, 0.1); }
.hb-yf5-row[data-k="add"] .hb-yf5-no { background: rgba(62, 207, 142, 0.08); color: #4f9a77; }
.hb-yf5-row[data-k="add"] .hb-yf5-sign { color: #3ecf8e; }
.hb-yf5-row[data-k="add"] .hb-yf5-code { color: #c8f2dc; }
.hb-yf5-row[data-k="del"] { background: rgba(255, 93, 93, 0.1); }
.hb-yf5-row[data-k="del"] .hb-yf5-no { background: rgba(255, 93, 93, 0.08); color: #a36060; }
.hb-yf5-row[data-k="del"] .hb-yf5-sign { color: #ff6b6b; }
.hb-yf5-row[data-k="del"] .hb-yf5-code { color: #f6c9c9; }
.hb-yf5-row[data-new="true"] { animation: hb-yf5-in 0.25s ease both; }
.hb-yf5-fold {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 100%;
  height: 22px;
  margin: 0;
  padding: 0 12px 0 14px;
  font: inherit;
  font-family: inherit;
  font-size: 11px;
  color: #6f8fbf;
  text-align: left;
  background: #101114;
  border: 0;
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
  cursor: pointer;
}
.hb-yf5-fold:hover { color: #9dbdf0; background: #14161b; }
.hb-yf5-fold svg { width: 11px; height: 11px; }
@keyframes hb-yf5-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf5-row[data-new="true"] { animation: none; }
  .hb-yf5-copy { transition: none; }
}
`;

function parsePatch(patch: string) {
  const hunks: Hunk[] = [];
  let file: string | undefined;
  let hunk: Hunk | null = null;
  let oldNo = 0;
  let newNo = 0;
  const rows = patch.replace(/\r\n/g, "\n").split("\n");
  if (rows[rows.length - 1] === "") rows.pop();
  for (const raw of rows) {
    if (raw.startsWith("@@")) {
      const m = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw);
      oldNo = m ? Number(m[1]) : 1;
      newNo = m ? Number(m[2]) : 1;
      hunk = { header: raw, lines: [] };
      hunks.push(hunk);
      continue;
    }
    if (!hunk) {
      if (raw.startsWith("+++ ")) {
        const path = raw.slice(4).trim();
        file = path.startsWith("b/") ? path.slice(2) : path;
      }
      continue;
    }
    if (raw.startsWith("\\")) continue;
    const mark = raw[0];
    const text = raw.slice(1);
    if (mark === "+") hunk.lines.push({ kind: "add", text, newNo: newNo++ });
    else if (mark === "-") hunk.lines.push({ kind: "del", text, oldNo: oldNo++ });
    else hunk.lines.push({ kind: "ctx", text, oldNo: oldNo++, newNo: newNo++ });
  }
  return { file, hunks };
}

function fold(hunk: Hunk, index: number, context: number): Item[] {
  const lines = hunk.lines;
  const changed = lines.some((l) => l.kind !== "ctx");
  const items: Item[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].kind !== "ctx") {
      items.push({ type: "line", line: lines[i] });
      i += 1;
      continue;
    }
    let j = i;
    while (j < lines.length && lines[j].kind === "ctx") j += 1;
    const run = lines.slice(i, j);
    const head = i === 0 ? 0 : context;
    const tail = j === lines.length ? 0 : context;
    const hidden = run.length - head - tail;
    if (!changed || hidden < 2) {
      run.forEach((line) => items.push({ type: "line", line }));
    } else {
      run.slice(0, head).forEach((line) => items.push({ type: "line", line }));
      items.push({ type: "fold", id: `${index}-${i}`, lines: run.slice(head, run.length - tail) });
      run.slice(run.length - tail).forEach((line) => items.push({ type: "line", line }));
    }
    i = j;
  }
  return items;
}

export function AgentFileDiff({
  patch = samplePatch,
  fileName,
  context = 2,
  accent = "#2f7bff",
  onCopy,
  className = "",
  style,
  ...rest
}: AgentFileDiffProps) {
  const [open, setOpen] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(0);
  const parsed = React.useMemo(() => parsePatch(patch), [patch]);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const adds = parsed.hunks.reduce((n, h) => n + h.lines.filter((l) => l.kind === "add").length, 0);
  const dels = parsed.hunks.reduce((n, h) => n + h.lines.filter((l) => l.kind === "del").length, 0);

  async function copy() {
    try {
      await navigator.clipboard.writeText(patch);
    } catch {
      const area = document.createElement("textarea");
      area.value = patch;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    onCopy?.(patch);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  function renderLine(line: DiffLine, key: string, isNew: boolean) {
    return (
      <div className="hb-yf5-row" data-k={line.kind} data-new={isNew} key={key}>
        <span className="hb-yf5-no" aria-hidden="true">{line.oldNo ?? ""}</span>
        <span className="hb-yf5-no" aria-hidden="true">{line.newNo ?? ""}</span>
        <span className="hb-yf5-sign" aria-hidden="true">{line.kind === "add" ? "+" : line.kind === "del" ? "-" : ""}</span>
        <span className="hb-yf5-code">
          <span className="hb-yf5-sr">
            {line.kind === "add" ? "Added: " : line.kind === "del" ? "Removed: " : ""}
          </span>
          {line.text || " "}
        </span>
      </div>
    );
  }

  return (
    <>
      <style href="hb-agent-file-diff" precedence="default">{css}</style>
      <div
        className={`hb-yf5 ${className}`}
        style={{ "--hb-yf5-a": accent, ...style } as React.CSSProperties}
        {...rest}
      >
        <div className="hb-yf5-head">
          <span className="hb-yf5-file">
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 1.8h5l3 3v7.4H3z M8 1.8v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span>{fileName ?? parsed.file ?? "changes.patch"}</span>
          </span>
          <span className="hb-yf5-stat">
            <span className="hb-yf5-n" data-k="add">+{adds}</span>
            <span className="hb-yf5-n" data-k="del">-{dels}</span>
            <button type="button" className="hb-yf5-copy" data-done={copied} onClick={copy} aria-live="polite">
              {copied ? (
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.4 6.4l2.4 2.4 4.8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="4" y="4" width="6.2" height="6.2" rx="1.4" stroke="currentColor" strokeWidth="1.2" /><path d="M8 4V3a1.2 1.2 0 0 0-1.2-1.2H3A1.2 1.2 0 0 0 1.8 3v3.8A1.2 1.2 0 0 0 3 8h1" stroke="currentColor" strokeWidth="1.2" /></svg>
              )}
              {copied ? "Copied" : "Copy patch"}
            </button>
          </span>
        </div>
        <div className="hb-yf5-body" role="region" aria-label="Diff" tabIndex={0}>
          <div className="hb-yf5-grid">
            {parsed.hunks.map((h, hi) => (
              <div key={hi}>
                <span className="hb-yf5-hunk">{h.header}</span>
                {fold(h, hi, context).map((item, ii) => {
                  if (item.type === "line") return renderLine(item.line, `${hi}-l-${ii}`, false);
                  const shown = open.includes(item.id);
                  if (shown) return <React.Fragment key={item.id}>{item.lines.map((l, k) => renderLine(l, `${item.id}-${k}`, true))}</React.Fragment>;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className="hb-yf5-fold"
                      aria-label={`Show ${item.lines.length} unchanged lines`}
                      onClick={() => setOpen((o) => [...o, item.id])}
                    >
                      <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M3 4.5L6 1.8l3 2.7M3 7.5L6 10.2l3-2.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item.lines.length} unchanged lines
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
