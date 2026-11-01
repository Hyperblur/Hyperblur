"use client";

import * as React from "react";

export interface ToolCallCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  name?: string;
  status?: "running" | "done" | "error";
  duration?: number | string;
  args?: Record<string, unknown> | unknown[] | string;
  result?: Record<string, unknown> | unknown[] | string;
  defaultOpen?: boolean;
  color?: string;
}

const css = `
@keyframes hb-tc-spin { to { transform: rotate(360deg); } }
@keyframes hb-tc-draw { from { stroke-dashoffset: 16; } to { stroke-dashoffset: 0; } }
.hb-tc {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  border: 1px solid #262626;
  border-radius: 12px;
  color: #ededed;
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  background: #111111;
}
.hb-tc-head { margin: 0; font: inherit; }
.hb-tc-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px 12px;
  border: 0;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
}
.hb-tc-toggle:hover { background: #151515; }
.hb-tc-toggle:focus-visible { outline: 2px solid var(--hb-tc-accent, #2f7bff); outline-offset: -2px; }
.hb-tc-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  color: #8b5cf6;
  background: rgba(139,92,246,.14);
}
.hb-tc-icon svg { width: 13px; height: 13px; }
.hb-tc-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-tc-meta { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 6px; color: #8f8f8f; font-size: 11.5px; }
.hb-tc-status { display: inline-flex; align-items: center; gap: 5px; }
.hb-tc-status[data-status="done"] { color: #34d399; }
.hb-tc-status[data-status="error"] { color: #f87171; }
.hb-tc-status[data-status="running"] { color: var(--hb-tc-accent, #2f7bff); }
.hb-tc-status svg { width: 12px; height: 12px; }
.hb-tc-spinner {
  width: 11px;
  height: 11px;
  border: 1.5px solid rgba(255,255,255,.14);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: hb-tc-spin .8s linear infinite;
}
.hb-tc-check { stroke-dasharray: 16; animation: hb-tc-draw .4s ease both; }
.hb-tc-time { font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
.hb-tc-chevron {
  width: 14px;
  height: 14px;
  color: #8f8f8f;
  transition: transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-tc-toggle[aria-expanded="true"] .hb-tc-chevron { transform: rotate(180deg); }
.hb-tc-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .3s;
}
.hb-tc[data-open="true"] .hb-tc-panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1), visibility 0s linear 0s;
}
.hb-tc-inner { min-height: 0; overflow: hidden; }
.hb-tc-row {
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 8px;
  padding: 8px 12px;
  border-top: 1px solid #262626;
  background: #0d0d0d;
}
.hb-tc-label {
  padding-top: 1px;
  color: #8f8f8f;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.hb-tc-code {
  margin: 0;
  max-height: 132px;
  overflow: auto;
  color: #ededed;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  line-height: 16px;
  white-space: pre;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
}
.hb-tc-code:focus-visible { outline: 2px solid var(--hb-tc-accent, #2f7bff); outline-offset: 2px; }
.hb-tc-row[data-has-copy="true"] .hb-tc-code { padding-right: 28px; }
.hb-tc-k { color: #7cb0ff; }
.hb-tc-s { color: #86d9a3; }
.hb-tc-n { color: #f0b072; }
.hb-tc-empty { color: #8f8f8f; font-size: 12px; }
.hb-tc-copy {
  position: absolute;
  top: 6px;
  right: 8px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 1px solid #262626;
  border-radius: 6px;
  color: #8f8f8f;
  cursor: pointer;
  background: #171717;
  transition: color .15s ease, border-color .15s ease;
}
.hb-tc-copy:hover { color: #ededed; border-color: #333333; }
.hb-tc-copy[data-copied="true"] { color: #34d399; }
.hb-tc-copy:focus-visible { outline: 2px solid var(--hb-tc-accent, #2f7bff); outline-offset: 1px; }
.hb-tc-copy svg { width: 13px; height: 13px; }
.hb-tc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-tc-spinner { animation-duration: 2.4s; }
  .hb-tc-check { animation: none; }
  .hb-tc-panel, .hb-tc[data-open="true"] .hb-tc-panel, .hb-tc-chevron { transition: none; }
}
`;

const LABELS = { running: "Running", done: "Done", error: "Failed" } as const;

function stringify(value: unknown): string {
  if (value === undefined) return "";
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (parsed !== null && typeof parsed === "object") return stringify(parsed);
    } catch {
      return value;
    }
    return value;
  }
  const flat = JSON.stringify(value);
  if (flat === undefined) return String(value);
  if (flat.length <= 44) {
    return flat.replace(/^\{/, "{ ").replace(/\}$/, " }").replace(/":/g, '": ').replace(/,"/g, ', "');
  }
  return JSON.stringify(value, null, 2);
}

function highlight(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <span key={match.index} className={match[2] ? "hb-tc-k" : "hb-tc-s"}>
          {match[1]}
        </span>
      );
      if (match[2]) nodes.push(match[2]);
    } else {
      nodes.push(
        <span key={match.index} className="hb-tc-n">
          {match[3]}
        </span>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function formatDuration(value: number | string | undefined) {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}s`;
  return `${Math.round(value)}ms`;
}

export function ToolCallCard({
  name = "tool_call",
  status = "done",
  duration,
  args,
  result,
  defaultOpen = false,
  color = "#2f7bff",
  className = "",
  style,
  ...rest
}: ToolCallCardProps) {
  const uid = React.useId();
  const [open, setOpen] = React.useState(defaultOpen);
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const argsText = stringify(args);
  const resultText = stringify(result);
  const time = formatDuration(duration);
  const panelId = `${uid}-panel`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`hb-tc ${className}`}
      style={{ "--hb-tc-accent": color, ...style } as React.CSSProperties}
      data-open={open}
      data-status={status}
      {...rest}
    >
      <style href="hb-tool-call-card" precedence="default">{css}</style>
      <h3 className="hb-tc-head">
        <button
          className="hb-tc-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="hb-tc-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.6 3.4a3 3 0 0 0 3 3.9l-6.7 6.7a1.4 1.4 0 0 1-2-2l6.7-6.7a3 3 0 0 0-1-1.9z" />
            </svg>
          </span>
          <span className="hb-tc-name">{name}</span>
          <span className="hb-tc-meta">
            <span className="hb-tc-status" data-status={status}>
              {status === "running" ? (
                <span className="hb-tc-spinner" aria-hidden="true" />
              ) : status === "done" ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="hb-tc-check" d="M3 8.5l3.2 3.2L13 4.8" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              )}
              <span className="hb-tc-sr">{LABELS[status]}</span>
            </span>
            {time ? <span className="hb-tc-time">{time}</span> : null}
          </span>
          <svg className="hb-tc-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 6l4.5 4.5L12.5 6" />
          </svg>
        </button>
      </h3>
      <div id={panelId} className="hb-tc-panel" role="region" aria-label={`${name} details`}>
        <div className="hb-tc-inner">
          <div className="hb-tc-row">
            <span className="hb-tc-label">Args</span>
            {argsText ? (
              <pre className="hb-tc-code" tabIndex={0}>{highlight(argsText)}</pre>
            ) : (
              <span className="hb-tc-empty">No arguments</span>
            )}
          </div>
          <div className="hb-tc-row" data-has-copy={resultText ? "true" : "false"}>
            <span className="hb-tc-label">Result</span>
            {resultText ? (
              <>
                <pre className="hb-tc-code" tabIndex={0}>{highlight(resultText)}</pre>
                <button
                  className="hb-tc-copy"
                  type="button"
                  data-copied={copied}
                  aria-label={copied ? "Result copied" : "Copy result"}
                  onClick={copy}
                >
                  {copied ? (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5l3.2 3.2L13 4.8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5.5" y="5.5" width="8" height="8" rx="1.8" />
                      <path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <span className="hb-tc-empty">{status === "running" ? "Waiting for result" : "No result"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
