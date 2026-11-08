"use client";

import * as React from "react";

export type PromptAttachmentKind = "pdf" | "image" | "sheet" | "code" | "doc";

export interface PromptAttachment {
  id: string;
  name: string;
  size: string;
  kind: PromptAttachmentKind;
}

export interface PromptMode {
  id: string;
  label: string;
  placeholder: string;
  working: string;
  color: string;
  icon?: "search" | "think" | "create";
}

export interface PromptBoxSubmit {
  text: string;
  mode: string;
  attachments: PromptAttachment[];
}

export interface PromptBoxModesProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  modes?: PromptMode[];
  mode?: string;
  defaultMode?: string;
  onModeChange?: (mode: string) => void;
  defaultValue?: string;
  defaultAttachments?: PromptAttachment[];
  onSubmit?: (payload: PromptBoxSubmit) => void;
  onStop?: () => void;
  workingTime?: number;
  maxRows?: number;
}

const defaultModes: PromptMode[] = [
  { id: "search", label: "Search", placeholder: "Search the web and your files...", working: "Reading 14 sources", color: "#4c8dff", icon: "search" },
  { id: "think", label: "Think", placeholder: "Ask something that needs a careful answer...", working: "Thinking it through", color: "#a37bff", icon: "think" },
  { id: "create", label: "Create", placeholder: "Describe what you want to make...", working: "Drafting your first version", color: "#ffad42", icon: "create" },
];

const defaultAttachments: PromptAttachment[] = [
  { id: "a1", name: "Q3-board-deck.pdf", size: "2.4 MB", kind: "pdf" },
  { id: "a2", name: "churn-cohorts.csv", size: "184 KB", kind: "sheet" },
];

const kindColor: Record<PromptAttachmentKind, string> = {
  pdf: "#ff5d5d",
  image: "#ff8ad8",
  sheet: "#3ccf7a",
  code: "#7fb3ff",
  doc: "#ffc24a",
};

function kindOf(name: string): PromptAttachmentKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"].includes(ext)) return "image";
  if (["csv", "xls", "xlsx", "numbers", "tsv"].includes(ext)) return "sheet";
  if (["ts", "tsx", "js", "jsx", "py", "json", "go", "rs", "rb", "css", "html", "md"].includes(ext)) return "code";
  return "doc";
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ModeIcon({ name }: { name?: PromptMode["icon"] }) {
  if (name === "think")
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.8l1.5 3.4 3.7.4-2.8 2.5.8 3.6L8 9.9l-3.2 1.8.8-3.6L2.8 5.6l3.7-.4L8 1.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  if (name === "create")
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10.6 2.6l2.8 2.8L6 12.8l-3.4.6.6-3.4 7.4-7.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9.2 4l2.8 2.8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const css = `
.hb-vl7 {
  --hb-vl7-m: #4c8dff;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background: linear-gradient(180deg, #19191c 0%, #121214 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 24px 48px -28px rgba(0, 0, 0, 0.9);
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
  transition: box-shadow 0.4s ease;
}
.hb-vl7 *, .hb-vl7 *::before, .hb-vl7 *::after { box-sizing: border-box; }
.hb-vl7:focus-within {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 1px color-mix(in srgb, var(--hb-vl7-m) 55%, transparent),
    0 0 0 4px color-mix(in srgb, var(--hb-vl7-m) 14%, transparent),
    0 24px 48px -28px rgba(0, 0, 0, 0.9);
}
.hb-vl7-glow {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(60% 80% at 10% 0%, color-mix(in srgb, var(--hb-vl7-m) 16%, transparent), transparent 70%);
  transition: background 0.5s ease;
}
.hb-vl7-files { display: flex; gap: 6px; margin: 0 0 6px; padding: 0; overflow-x: auto; scrollbar-width: none; list-style: none; }
.hb-vl7-files::-webkit-scrollbar { display: none; }
.hb-vl7-file {
  position: relative;
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
  max-width: 190px;
  padding: 5px 26px 5px 5px;
  border-radius: 11px;
  background: #1f1f23;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  animation: hb-vl7-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes hb-vl7-pop { from { opacity: 0; transform: scale(0.85) translateY(4px); } }
.hb-vl7-badge {
  display: grid;
  flex: none;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: color-mix(in srgb, var(--hb-vl7-k) 18%, #141416);
  color: var(--hb-vl7-k);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.hb-vl7-badge[data-kind="image"] { background: linear-gradient(135deg, #ff8ad8, #7f6bff 55%, #2f7bff); color: transparent; }
.hb-vl7-meta { display: flex; flex-direction: column; min-width: 0; line-height: 1.2; }
.hb-vl7-name { overflow: hidden; font-size: 11.5px; font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.hb-vl7-size { font-size: 10px; color: #8f8f8f; }
.hb-vl7-x {
  position: absolute;
  top: 50%;
  right: 5px;
  display: grid;
  place-items: center;
  width: 17px;
  height: 17px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transform: translateY(-50%);
  transition: background 0.2s ease, color 0.2s ease;
}
.hb-vl7-x:hover { background: rgba(255, 255, 255, 0.1); color: #ededed; }
.hb-vl7-x:focus-visible { outline: 2px solid var(--hb-vl7-m); }
.hb-vl7-status {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 0;
  overflow: hidden;
  padding: 0 4px;
  font-size: 11.5px;
  color: #a1a1a1;
  opacity: 0;
  transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}
.hb-vl7[data-state="working"] .hb-vl7-status { height: 22px; opacity: 1; }
.hb-vl7-shimmer {
  background: linear-gradient(90deg, #8f8f8f 0%, #ededed 45%, #8f8f8f 70%) 0 0 / 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: hb-vl7-sweep 1.6s linear infinite;
}
@keyframes hb-vl7-sweep { to { background-position: -200% 0; } }
.hb-vl7-pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-vl7-m); animation: hb-vl7-beat 1.1s ease-in-out infinite; }
@keyframes hb-vl7-beat { 50% { transform: scale(0.55); opacity: 0.5; } }
.hb-vl7-field { position: relative; }
.hb-vl7-ta {
  display: block;
  width: 100%;
  min-height: 42px;
  margin: 0;
  padding: 8px 6px 6px;
  border: 0;
  outline: none;
  resize: none;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
}
.hb-vl7-ph {
  position: absolute;
  left: 6px;
  right: 6px;
  top: 8px;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #6f6f75;
  pointer-events: none;
  animation: hb-vl7-ph 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes hb-vl7-ph { from { opacity: 0; transform: translateY(6px); filter: blur(3px); } }
.hb-vl7-bar { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
.hb-vl7-icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #a1a1a1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.hb-vl7-icon:hover { background: rgba(255, 255, 255, 0.07); color: #ededed; }
.hb-vl7-icon:active { transform: scale(0.92); }
.hb-vl7-icon:focus-visible { outline: 2px solid var(--hb-vl7-m); outline-offset: 1px; }
.hb-vl7-modes {
  position: relative;
  display: flex;
  min-width: 0;
  padding: 2px;
  border-radius: 999px;
  background: #0d0d0f;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}
.hb-vl7-ind {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 0;
  width: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-vl7-m) 18%, #1d1d21);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-vl7-m) 45%, transparent);
  transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), width 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), background 0.4s ease;
}
.hb-vl7-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #8f8f8f;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.3s ease;
}
.hb-vl7-chip[aria-checked="true"] { color: var(--hb-vl7-c); }
.hb-vl7-chip:hover { color: #ededed; }
.hb-vl7-chip[aria-checked="true"]:hover { color: var(--hb-vl7-c); }
.hb-vl7-chip:focus-visible { outline: 2px solid var(--hb-vl7-m); outline-offset: 1px; }
.hb-vl7-spacer { flex: 1 1 auto; }
.hb-vl7-send {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.18), 0 4px 14px -4px rgba(255, 255, 255, 0.3);
  transition: width 0.45s cubic-bezier(0.34, 1.3, 0.64, 1), background 0.3s ease, color 0.3s ease, transform 0.2s ease, opacity 0.2s ease;
}
.hb-vl7-send:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
.hb-vl7-send:not(:disabled):active { transform: scale(0.92); }
.hb-vl7-send:focus-visible { outline: 2px solid var(--hb-vl7-m); outline-offset: 2px; }
.hb-vl7[data-state="working"] .hb-vl7-send { width: 78px; background: #26262b; color: #ededed; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1); }
.hb-vl7[data-state="done"] .hb-vl7-send { background: var(--hb-vl7-m); color: #0a0a0a; }
.hb-vl7-arrow { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease; }
.hb-vl7-send:not(:disabled):hover .hb-vl7-arrow { transform: translateY(-2px); }
.hb-vl7-ring { animation: hb-vl7-spin 0.9s linear infinite; transform-origin: 50% 50%; }
@keyframes hb-vl7-spin { to { transform: rotate(360deg); } }
.hb-vl7-check path { stroke-dasharray: 14; stroke-dashoffset: 14; animation: hb-vl7-draw 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
@keyframes hb-vl7-draw { to { stroke-dashoffset: 0; } }
.hb-vl7-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 330px) {
  .hb-vl7-chip { padding: 5px 7px; }
  .hb-vl7-chip .hb-vl7-lbl { display: none; }
  .hb-vl7-chip[aria-checked="true"] .hb-vl7-lbl { display: inline; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-vl7 *, .hb-vl7 *::before, .hb-vl7 *::after { transition: none !important; animation: none !important; }
  .hb-vl7-check path { stroke-dashoffset: 0; }
}
`;

export function PromptBoxModes({
  modes = defaultModes,
  mode,
  defaultMode,
  onModeChange,
  defaultValue = "",
  defaultAttachments: initialFiles = defaultAttachments,
  onSubmit,
  onStop,
  workingTime = 2600,
  maxRows = 6,
  className,
  style,
  ...rest
}: PromptBoxModesProps) {
  const [innerMode, setInnerMode] = React.useState(defaultMode ?? modes[0]?.id ?? "");
  const current = mode ?? innerMode;
  const active = modes.find((m) => m.id === current) ?? modes[0];
  const [text, setText] = React.useState(defaultValue);
  const [files, setFiles] = React.useState<PromptAttachment[]>(initialFiles);
  const [state, setState] = React.useState<"idle" | "working" | "done">("idle");
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const modesRef = React.useRef<HTMLDivElement>(null);
  const indRef = React.useRef<HTMLSpanElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const counter = React.useRef(0);
  const uid = React.useId();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  React.useLayoutEffect(() => {
    const wrap = modesRef.current;
    const ind = indRef.current;
    if (!wrap || !ind) return;
    const place = () => {
      const chip = wrap.querySelector<HTMLElement>('[aria-checked="true"]');
      if (!chip) return;
      ind.style.width = `${chip.offsetWidth}px`;
      ind.style.transform = `translateX(${chip.offsetLeft}px)`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [current, modes]);

  React.useLayoutEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const line = parseFloat(getComputedStyle(ta).lineHeight) || 21;
    ta.style.height = `${Math.min(ta.scrollHeight, line * maxRows + 14)}px`;
  }, [text, maxRows]);

  const pickMode = (id: string) => {
    if (mode === undefined) setInnerMode(id);
    onModeChange?.(id);
  };

  const onModeKey = (event: React.KeyboardEvent, index: number) => {
    const n = modes.length;
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % n;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + n) % n;
    if (next < 0) return;
    event.preventDefault();
    pickMode(modes[next].id);
    modesRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  const stop = () => {
    window.clearTimeout(timer.current);
    setState("idle");
    onStop?.();
    taRef.current?.focus();
  };

  const submit = () => {
    if (state === "working") {
      stop();
      return;
    }
    const value = text.trim();
    if (!value && files.length === 0) return;
    onSubmit?.({ text: value, mode: active?.id ?? "", attachments: files });
    setText("");
    setFiles([]);
    setState("working");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setState("done");
      timer.current = window.setTimeout(() => setState("idle"), 900);
    }, workingTime);
  };

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const next = Array.from(list).map((file) => {
      counter.current += 1;
      return { id: `f${counter.current}`, name: file.name, size: formatSize(file.size), kind: kindOf(file.name) };
    });
    setFiles((prev) => [...prev, ...next]);
  };

  const canSend = state === "working" || text.trim().length > 0 || files.length > 0;
  const accentStyle = { "--hb-vl7-m": active?.color ?? "#4c8dff", containerType: "inline-size", ...style } as React.CSSProperties;

  return (
    <form
      className={["hb-vl7", className].filter(Boolean).join(" ")}
      style={accentStyle}
      data-state={state}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      {...rest}
    >
      <style href="hb-prompt-box-modes" precedence="default">{css}</style>
      <span className="hb-vl7-glow" aria-hidden="true" />
      {files.length > 0 && (
        <ul className="hb-vl7-files" aria-label="Attachments">
          {files.map((file) => (
            <li key={file.id} className="hb-vl7-file" style={{ "--hb-vl7-k": kindColor[file.kind] } as React.CSSProperties}>
              <span className="hb-vl7-badge" data-kind={file.kind} aria-hidden="true">
                {file.kind === "sheet" ? "csv" : file.kind === "code" ? "</>" : file.kind}
              </span>
              <span className="hb-vl7-meta">
                <span className="hb-vl7-name">{file.name}</span>
                <span className="hb-vl7-size">{file.size}</span>
              </span>
              <button
                type="button"
                className="hb-vl7-x"
                aria-label={`Remove ${file.name}`}
                onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                  <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="hb-vl7-status" role="status" aria-live="polite">
        {state === "working" && (
          <>
            <span className="hb-vl7-pulse" />
            <span className="hb-vl7-shimmer">{active?.working}</span>
          </>
        )}
      </div>
      <div className="hb-vl7-field">
        <label htmlFor={`${uid}-ta`} className="hb-vl7-hidden">
          Message
        </label>
        <textarea
          id={`${uid}-ta`}
          ref={taRef}
          className="hb-vl7-ta"
          rows={1}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              if (state !== "working") submit();
            } else if (event.key === "Escape" && state === "working") {
              event.preventDefault();
              stop();
            }
          }}
        />
        {text.length === 0 && (
          <span key={active?.id} className="hb-vl7-ph" aria-hidden="true">
            {active?.placeholder}
          </span>
        )}
      </div>
      <div className="hb-vl7-bar">
        <input ref={fileRef} type="file" multiple className="hb-vl7-hidden" tabIndex={-1} aria-hidden="true" onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }} />
        <button type="button" className="hb-vl7-icon" aria-label="Attach files" onClick={() => fileRef.current?.click()}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13.2 7.6l-5 5a3.2 3.2 0 01-4.6-4.5l5.4-5.4a2.1 2.1 0 013 3l-5.3 5.3a1 1 0 01-1.5-1.4l4.8-4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div ref={modesRef} className="hb-vl7-modes" role="radiogroup" aria-label="Mode">
          <span ref={indRef} className="hb-vl7-ind" aria-hidden="true" />
          {modes.map((m, i) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={m.id === active?.id}
              tabIndex={m.id === active?.id ? 0 : -1}
              className="hb-vl7-chip"
              style={{ "--hb-vl7-c": m.color } as React.CSSProperties}
              onClick={() => pickMode(m.id)}
              onKeyDown={(event) => onModeKey(event, i)}
            >
              <ModeIcon name={m.icon} />
              <span className="hb-vl7-lbl">{m.label}</span>
            </button>
          ))}
        </div>
        <span className="hb-vl7-spacer" />
        <button
          type="submit"
          className="hb-vl7-send"
          disabled={!canSend}
          aria-label={state === "working" ? "Stop" : "Send"}
        >
          {state === "working" ? (
            <>
              <svg className="hb-vl7-ring" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" />
                <path d="M7 1.5a5.5 5.5 0 015.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Stop
            </>
          ) : state === "done" ? (
            <svg className="hb-vl7-check" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7.3l2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="hb-vl7-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 11.5V2.8M3.2 6.4L7 2.6l3.8 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
