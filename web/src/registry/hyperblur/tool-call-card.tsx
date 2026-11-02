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
@keyframes hb-tcc-spin { to { transform: rotate(360deg); } }
@keyframes hb-tcc-draw { from { stroke-dashoffset: 16; } to { stroke-dashoffset: 0; } }
.hb-tcc {
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
.hb-tcc-head { margin: 0; font: inherit; }
.hb-tcc-toggle {
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
.hb-tcc-toggle:hover { background: #151515; }
.hb-tcc-toggle:focus-visible { outline: 2px solid var(--hb-tcc-accent, #2f7bff); outline-offset: -2px; }
.hb-tcc-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  color: #8b5cf6;
  background: rgba(139,92,246,.14);
}
.hb-tcc-icon svg { width: 13px; height: 13px; }
.hb-tcc-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hb-tcc-meta { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 6px; color: #8f8f8f; font-size: 11.5px; }
.hb-tcc-status { display: inline-flex; align-items: center; gap: 5px; }
.hb-tcc-status[data-status="done"] { color: #34d399; }
.hb-tcc-status[data-status="error"] { color: #f87171; }
.hb-tcc-status[data-status="running"] { color: var(--hb-tcc-accent, #2f7bff); }
.hb-tcc-status svg { width: 12px; height: 12px; }
.hb-tcc-spinner {
  width: 11px;
  height: 11px;
  border: 1.5px solid rgba(255,255,255,.14);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: hb-tcc-spin .8s linear infinite;
}
.hb-tcc-check { stroke-dasharray: 16; animation: hb-tcc-draw .4s ease both; }
.hb-tcc-time { font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
.hb-tcc-chevron {
  width: 14px;
  height: 14px;
  color: #8f8f8f;
  transition: transform .3s cubic-bezier(.2, .9, .2, 1);
}
.hb-tcc-toggle[aria-expanded="true"] .hb-tcc-chevron { transform: rotate(180deg); }
.hb-tcc-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1), visibility 0s linear .3s;
}
.hb-tcc[data-open="true"] .hb-tcc-panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows .3s cubic-bezier(.2, .9, .2, 1), visibility 0s linear 0s;
}
.hb-tcc-inner { min-height: 0; overflow: hidden; }
.hb-tcc-row {
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 8px;
  padding: 8px 12px;
  border-top: 1px solid #262626;
  background: #0d0d0d;
}
.hb-tcc-label {
  padding-top: 1px;
  color: #8f8f8f;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.hb-tcc-code {
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
.hb-tcc-code:focus-visible { outline: 2px solid var(--hb-tcc-accent, #2f7bff); outline-offset: 2px; }
.hb-tcc-row[data-has-copy="true"] .hb-tcc-code { padding-right: 28px; }
.hb-tcc-k { color: #7cb0ff; }
.hb-tcc-s { color: #86d9a3; }
.hb-tcc-n { color: #f0b072; }
.hb-tcc-empty { color: #8f8f8f; font-size: 12px; }
.hb-tcc-copy {
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
.hb-tcc-copy:hover { color: #ededed; border-color: #333333; }
.hb-tcc-copy[data-copied="true"] { color: #34d399; }
.hb-tcc-copy:focus-visible { outline: 2px solid var(--hb-tcc-accent, #2f7bff); outline-offset: 1px; }
.hb-tcc-copy svg { width: 13px; height: 13px; }
.hb-tcc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-tcc-spinner { animation-duration: 2.4s; }
  .hb-tcc-check { animation: none; }
  .hb-tcc-panel, .hb-tcc[data-open="true"] .hb-tcc-panel, .hb-tcc-chevron { transition: none; }
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
        <span key={match.index} className={match[2] ? "hb-tcc-k" : "hb-tcc-s"}>
          {match[1]}
        </span>
      );
      if (match[2]) nodes.push(match[2]);
    } else {
      nodes.push(
        <span key={match.index} className="hb-tcc-n">
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
      className={`hb-tcc ${className}`}
      style={{ "--hb-tcc-accent": color, ...style } as React.CSSProperties}
      data-open={open}
      data-status={status}
      {...rest}
    >
      <style href="hb-tool-call-card" precedence="default">{css}</style>
      <h3 className="hb-tcc-head">
        <button
          className="hb-tcc-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="hb-tcc-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.6 3.4a3 3 0 0 0 3 3.9l-6.7 6.7a1.4 1.4 0 0 1-2-2l6.7-6.7a3 3 0 0 0-1-1.9z" />
            </svg>
          </span>
          <span className="hb-tcc-name">{name}</span>
          <span className="hb-tcc-meta">
            <span className="hb-tcc-status" data-status={status}>
              {status === "running" ? (
                <span className="hb-tcc-spinner" aria-hidden="true" />
              ) : status === "done" ? (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path className="hb-tcc-check" d="M3 8.5l3.2 3.2L13 4.8" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              )}
              <span className="hb-tcc-sr">{LABELS[status]}</span>
            </span>
            {time ? <span className="hb-tcc-time">{time}</span> : null}
          </span>
          <svg className="hb-tcc-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 6l4.5 4.5L12.5 6" />
          </svg>
        </button>
      </h3>
      <div id={panelId} className="hb-tcc-panel" role="region" aria-label={`${name} details`}>
        <div className="hb-tcc-inner">
          <div className="hb-tcc-row">
            <span className="hb-tcc-label">Args</span>
            {argsText ? (
              <pre className="hb-tcc-code" tabIndex={0}>{highlight(argsText)}</pre>
            ) : (
              <span className="hb-tcc-empty">No arguments</span>
            )}
          </div>
          <div className="hb-tcc-row" data-has-copy={resultText ? "true" : "false"}>
            <span className="hb-tcc-label">Result</span>
            {resultText ? (
              <>
                <pre className="hb-tcc-code" tabIndex={0}>{highlight(resultText)}</pre>
                <button
                  className="hb-tcc-copy"
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
              <span className="hb-tcc-empty">{status === "running" ? "Waiting for result" : "No result"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
